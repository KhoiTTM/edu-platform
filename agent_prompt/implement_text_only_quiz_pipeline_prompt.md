# Hướng dẫn Trích xuất Câu hỏi dạng Quiz Text-Only từ Sách Scan (không cần hotspot/ảnh)

> **LƯU Ý DÀNH CHO AGENT TƯƠNG LAI:** Đây là quy trình ưu tiên dùng khi yêu cầu thực tế chỉ là "học sinh đọc câu hỏi rồi chọn/nhập đáp án" — KHÔNG cần hiển thị ảnh trang sách scan gốc kèm khung tương tác. Nhẹ hơn, chính xác hơn, và không cần xây UI BookViewer so với luồng Hotspot/Review cũ (`implement_pdf_scan_pipeline_prompt.md`).

## Tại sao luồng này thay thế luồng Hotspot cho mục đích quiz

Luồng cũ dùng OpenCV (dilate + contour theo kernel cố định) để khoanh vùng (hotspot) từng khối chữ trên ảnh trang, rồi OCR riêng từng khối. Vấn đề: OpenCV không hiểu ngữ nghĩa "đây là 1 câu hỏi" — nó chỉ thấy "đây là 1 khối chữ gần nhau theo khoảng cách dòng". Khi 2-3 câu hỏi nằm sát nhau trên trang, chúng bị gộp vào 1 hotspot duy nhất, dẫn đến không thể map đáp án 1-1 chính xác.

Luồng text-only né tránh hoàn toàn vấn đề đó: OCR **toàn trang theo thứ tự đọc**, không cắt theo khối, rồi dùng **chính số thứ tự câu hỏi in trong sách** (`Bài.Câu`, ví dụ `2.5.`) để tách — đây là ranh giới chính xác nhất có thể, vì nó dựa vào thông tin do chính cuốn sách cung cấp, không phải suy luận từ khoảng cách pixel.

## Quy trình từng bước

### Bước 0: Xác định đúng range trang PDF cho bài cần làm

KHÔNG đoán range trang theo suy luận tuyến tính (ví dụ "bài trước hết ở trang N nên bài sau bắt đầu N+1") — số trang mỗi bài không đều. Cách an toàn: render thử vài trang nghi ngờ bằng `pypdfium2` thành ảnh PNG, đọc trực tiếp bằng Read tool (xem ảnh) để xác nhận chính xác trang bắt đầu/kết thúc của bài trước khi chạy OCR hàng loạt. Tốn vài giây render nhưng tránh OCR nhầm range, lãng phí thời gian xử lý EasyOCR (chậm trên CPU).

```python
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument(pdf_path)
page = pdf[page_num - 1]  # 0-indexed
bitmap = page.render(scale=2)
bitmap.to_pil().save(f"page_{page_num:03d}.png")
```

### Bước 1: OCR toàn trang (không cắt bbox)

```python
import easyocr
reader = easyocr.Reader(['vi', 'en'], gpu=False)
result = reader.readtext(image_path, detail=1)  # ảnh full page, KHÔNG crop
items = [{"x": bbox[0][0], "y": bbox[0][1], "text": text, "conf": conf} for bbox, text, conf in result]
items.sort(key=lambda it: (round(it["y"] / 15), it["x"]))  # gom hàng ~15px, trái→phải trong hàng
```
Lưu fragment thô ra JSON theo từng trang để debug dễ, rồi ghép `" ".join(...)` các fragment mỗi trang thành 1 chuỗi text, nối các trang bằng `\n`.

### Bước 2: Lọc watermark/rác OCR

Sách quét thường có watermark logo (ví dụ "KẾT NỐI TRI THỨC VỚI CUỘC SỐNG") bị OCR đọc sai thành nhiều biến thể khác nhau mỗi trang (`KẾT NỐL TRI THỨC`, `VÚI CUỘc SỐNG`, `Vutcjocstig`...). **KHÔNG dùng fuzzy-match similarity ratio để lọc** — đã thử và thất bại, vì watermark méo nặng và câu thật ngắn có ratio chồng lấn nhau (ví dụ "Iượng" - chữ "lượng" bị OCR sai - có ratio cao giả với watermark). Cách an toàn: thu thập **danh sách watermark fragment cụ thể đã quan sát được** (exact string match) bằng cách đọc thủ công output OCR vài trang đầu, build whitelist, rồi lọc theo exact match.

**TUYỆT ĐỐI KHÔNG lọc fragment chỉ vì nó toàn là số** (`re.fullmatch(r"\d+", t)`) — số trang đơn lẻ lẫn vào nhưng cũng có nhiều fragment là **số liệu phép tính thật** (ví dụ "1009", "739" là phần của "100%", "73,9%" bị OCR tách rời). Lỗi này đã xảy ra thật trong session trước — xóa nhầm số liệu khiến đáp án phép tính bị mất nội dung. Bài học: thà chấp nhận vài số trang lẻ tẻ còn sót trong text (vô hại, không khớp pattern `X.Y.`) hơn là liều xóa nhầm số liệu.

### Bước 3: Tách câu hỏi theo số thứ tự bằng DP (longest-valid-chain)

Regex tìm candidate marker: `r'(?:(?<=\s)|^)(\d{1,2})\s*\.\s*(\d{1,2})\s*\.?\s*'` (cho phép khoảng trắng quanh dấu chấm, dấu chấm cuối optional vì OCR hay rớt).

**Vấn đề:** Regex này sẽ bắt rất nhiều false positive — số liệu phép tính (`M = 2.16`), nhãn hình vẽ (`Hình 11.1`), số cuối câu trước dính số đầu câu sau (`"...thuộc chu kì 2. 4.22..."` bị đọc nhầm thành marker `2.4`). Không thể lọc bằng regex tinh vi hơn vì các pattern này không phân biệt được cấu trúc với marker thật.

**Giải pháp đã kiểm chứng:** Dùng quy hoạch động để tìm "chuỗi marker hợp lệ dài nhất":
```python
def is_valid_transition(cur_bai, cur_cau, bai, cau):
    if cur_bai == 0: return True  # marker đầu tiên
    if bai == cur_bai and cau > cur_cau: return True  # câu tiếp theo cùng bài
    if bai == cur_bai + 1: return True  # sang bài mới
    return False

# dp[i] = độ dài chuỗi hợp lệ dài nhất kết thúc tại candidate i
# Với mỗi i, thử nối với mọi j < i mà is_valid_transition(j, i) đúng, chọn dp[j]+1 lớn nhất.
# parent[i] lưu lại j để truy vết chuỗi cuối cùng.
```
Đây **không phải heuristic tham lam** (greedy reject ngay khi gặp marker không hợp lệ) — heuristic tham lam đã thử và **thất bại** vì 1 false positive xuất hiện sớm có thể làm state machine "lạc hướng" rồi reject sai cả chuỗi thật dài phía sau (case thực tế: marker giả `6.5` chen vào giữa lúc đang ở `5.8`, khiến state nhảy nhầm sang "bài 6", làm các marker thật `5.10`...`5.16` tiếp theo bị reject vì "nhảy lùi"). DP xét toàn cục nên không bị lỗi này.

### Bước 4: Xử lý OCR mất hẳn 1 chữ số (không sửa được tự động an toàn)

Có 2 dạng lỗi OCR về số thứ tự không thể vá bằng regex an toàn:
- **Dính liền không dấu chấm ngay sau tiêu đề bài học mới**: ví dụ `"BÀI 2. NGUYÊN TỬ <rác> 21.Phát biểu..."` — đáng lẽ là `2.1.` nhưng OCR đọc thành `21.`. Sửa được bằng cách neo cứng vào pattern `BÀI\s*(\d+)\s*\.\s*([^0-9]*?)\s+(\d{2,4})\s*\.` ngay sau tiêu đề, tách `lesson_num` + phần còn lại.
- **Dính liền giữa văn bản, không cạnh tiêu đề bài**: ví dụ `22.` (đáng lẽ `2.2.`) xuất hiện giữa câu, không có gì đánh dấu ranh giới rõ ràng. Cách xử lý: sinh candidate cho MỌI cách tách `\d{2,3}\.` thành `(lesson, question)` khả dĩ (thử split tại vị trí 1 và 2), đưa hết vào DP cùng với candidate gốc — DP tự chọn cách tách đúng vì nó là cách duy nhất tạo ra chuỗi hợp lệ dài hơn.
- **Mất hẳn 1 con số, không còn dấu vết** (ví dụ "2.17" → chỉ còn "2." rời, số "17" biến mất hoàn toàn khỏi OCR): **không sửa được**. Nội dung câu đó sẽ bị dính vào cuối câu trước nó trong kết quả parse. Sau khi parse xong, luôn chạy kiểm tra gap: với mỗi `bai`, liệt kê các `cau` xuất hiện, tìm số bị thiếu trong khoảng min-max — đây chính là các câu bị lỗi này, cần liệt kê rõ cho user biết để tự sửa tay.

### Bước 5: Tách loại câu hỏi (trắc nghiệm vs tự luận)

```python
option_pattern = re.compile(
    r'\bA\s*[\.\)]\s*(.*?)\s*\bB\s*[\.\)]\s*(.*?)\s*\bC\s*[\.\)]\s*(.*?)\s*\bD\s*[\.\)]\s*(.*?)$',
    re.DOTALL,
)
```
Nếu khớp → `type: "multiple_choice"`, tách `stem` (phần trước option A) và `options` (4 phần tử). Không khớp → `type: "essay"`, giữ nguyên toàn bộ text làm `stem`.

**Hạn chế đã biết:** Vì mỗi entry câu hỏi có thể đã bị dính nội dung câu tiếp theo ở cuối (do lỗi mất số thứ tự ở bước 4, hoặc do entry cuối cùng trong 1 bài dính tiêu đề Chương/Bài tiếp theo), option D (cuối cùng) đôi khi dính rác. Cắt rác tiêu đề bằng regex `Ch[uưU][oơ]?ng\b.*|BÀI?\s*\d+\s*\.\s*[A-ZÀ-Ỹ\s,–\-]+.*` (case-insensitive, DOTALL) áp dụng SAU CÙNG lên `stem`/option cuối.

### Bước 6: Map đáp án

Phần "HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN" của sách dùng OCR + DP giống Bước 1-4, ra `content/[slug]-answer-key.json` dạng `{"answers": {"2.5": "...", ...}}`. Map vào câu hỏi bằng key `f"{bai}.{cau}"` — đơn giản, không cần regex tìm số trong text câu hỏi (khác với luồng Hotspot cũ phải tìm số `Bài.Câu` ẩn trong text OCR của hotspot, kém chính xác hơn).

## Output cuối cùng

`content/[slug]-questions.json` — danh sách phẳng, mỗi câu hỏi 1 object:
```json
{
  "id": "khtn7-2-5",
  "bai": 2, "cau": 5,
  "type": "multiple_choice",
  "stem": "...",
  "options": ["...", "...", "...", "..."],
  "answer": "..."
}
```
hoặc với `type: "essay"` thì không có field `options`.

Không có `bbox`, `hotspot`, `image` — vì luồng này không cần ảnh trang gốc. `lib/book-viewer-core/` và `lib/schema/` (Book Package format của luồng Hotspot cũ) đã bị xóa khỏi codebase, không tồn tại nữa.

## UI đã build (tham khảo khi mở rộng cho sách khác)

- `app/(app)/(flipbook)/flipbooks/[bookSlug]/quiz/page.tsx` — đọc `content/[bookSlug]-questions.json`, nhóm theo `bai`, render danh sách Bài dạng card (`components/flipbook/FlipbookQuizLessonList.tsx`). Tên bài lấy từ dict `LESSON_TITLES` hardcode trong file — **bắt buộc cập nhật dict này** (cả trong `quiz/page.tsx` và `quiz/[bai]/page.tsx`, 2 nơi riêng biệt) khi thêm bài mới đã OCR, nếu không trang chỉ hiện "Bài N" trống không có tên.
- `app/(app)/(flipbook)/flipbooks/[bookSlug]/quiz/[bai]/page.tsx` — lọc câu hỏi theo `bai`, render qua `components/flipbook/FlipbookQuizClient.tsx` (UI 1-câu-1-lần, có progress bar, breadcrumb 3 cấp, nút link Google Drive xem ảnh trang gốc, tự chấm trắc nghiệm bằng cách parse chữ cái đầu của `answer`, ví dụ `"B."` → so với index option, phát âm thanh đúng/sai qua `lib/quizSound.ts`).
- Entry point cho học sinh: `/luyen-tap/[subject]` — bấm tab "Theo Sách bài tập" gọi `router.push('/flipbooks/[bookSlug]/quiz')`, **không** dừng ở trang trung gian nào (đã từng có 1 trang card "Sách bài tập tương tác / Chọn bài để luyện tập" làm bước đệm, đã bỏ theo yêu cầu user — đi thẳng vào danh sách Bài).
- Lưu kết quả làm bài: `app/(app)/(flipbook)/actions.ts` (`saveFlipbookQuizAttempt`) ghi vào bảng `learning_sessions` có sẵn khi học sinh bấm "Hoàn Thành". **Quy ước field bắt buộc tuân theo để `/dashboard` và trang Phụ huynh hiển thị đúng** — xem chi tiết đầy đủ ở `docs/CONTEXT.md` mục 3.D, đừng tự đặt tên field khác.

## Tham khảo thực tế đã chạy

`content/khtn7-questions.json` (91 câu, Bài 1-5 sách SBT KHTN 7, trang 1-23) và `content/khtn7-answer-key.json` (361 đáp án, trang 93-138 — đủ dùng cho nhiều bài hơn 5, dự phòng cho lần OCR câu hỏi tiếp theo).
