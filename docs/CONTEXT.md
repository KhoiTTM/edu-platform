# NGỮ CẢNH DỰ ÁN (PROJECT CONTEXT) - EDU-PLATFORM

> ⚠️ **BẮT BUỘC ĐỌC CHO TẤT CẢ AGENT:** Đọc toàn bộ file này trước khi thực hiện bất kỳ task nào trong `edu-platform` để hiểu kiến trúc và luồng dữ liệu.

## 1. Mục tiêu hệ thống
Edu-platform là nền tảng giáo dục hỗ trợ học sinh học tập và luyện tập đa phương thức, kết hợp quản trị nội dung linh hoạt. Hệ thống được chia thành 6 phân hệ (module) chính dựa trên mô hình kiến trúc Question-centric và sự phân tách 3 lớp: Content (Tĩnh) - Attempts (Làm bài) - Progress (Tiến độ).

## 2. Kiến trúc 6 Phân hệ (Modules)
Mã nguồn (đặc biệt trong thư mục `app/(app)` và `components`) được tổ chức theo 6 nhóm tính năng này dưới dạng Route Groups của Next.js:

1. **learning (`app/(app)/(learning)`):** Giao diện để học sinh học bài đa phương thức.
2. **assessment (`app/(app)/(assessment)`):** Hệ thống làm bài, chấm điểm và lưu kết quả.
3. **flipbook (`app/(app)/(flipbook)`):** Toàn bộ vòng đời của một "sách flip" — từ nhập PDF scan (Python pipeline) cho đến màn hình học sinh thực sự đọc/làm bài trên một sách flip cụ thể. Mỗi "sách flip" mới (KHTN 7, các sách khác sau này) có route con riêng trong `app/(app)/(flipbook)/flipbooks/[bookSlug]/...`. **Đã bỏ hoàn toàn luồng hiển thị ảnh trang gốc + hotspot tương tác** (route `/interactive-workbook`, `/review`, component `BookEditor`/`BookViewer`/`QuestionEditorForm`, `lib/book-viewer-core`, `lib/schema`, ảnh trong `public/books/[slug]/` — tất cả đã xóa để giảm dung lượng). Hiện chỉ còn luồng Quiz Text-Only (xem mục 3.C).
4. **question-bank (`app/(app)/(question-bank)`):** Tầng Content, lưu trữ tĩnh các câu hỏi.
5. **exam-bank (`app/(app)/(exam-bank)`):** Tầng Content, tổ hợp câu hỏi thành các đề kiểm tra.
6. **administration (`app/(app)/(administration)`):** CMS, Dashboard báo cáo, quản lý users (Bao gồm trang phụ huynh, settings).

**Lưu ý:** Các UI Components cũng được nhóm tương ứng trong `components/learning`, `components/assessment`, `components/flipbook`, `components/administration`. Sách flip hiện không còn dùng ảnh trang gốc — dữ liệu câu hỏi là JSON phẳng trong `content/[bookSlug]-questions.json` (xem mục 3.C).

## 3. Quy trình chi tiết (Core Workflows)

### A. Learning (Học bài đa phương thức)
Các môn học khác nhau sẽ render UI học tập khác nhau:
- **Toán:** UI danh sách bài học + Nhúng Video YouTube để giảng lý thuyết.
- **IELTS / Starter:** Học qua sách PDF hoặc HTML5 Flipbook có sẵn (thường lưu ở nguồn ngoài như Google Drive).
- **KHTN:** Sử dụng kiến trúc Sách Scan Tương tác (Question-centric). Nội dung gen theo từng session (buổi học). 

### B. Assessment (Luyện tập 3 chế độ)
Tầng ghi nhận nỗ lực (Attempts - `StudentAnswer`).
1. **Luyện tập theo Ngân hàng câu hỏi:** Làm ngẫu nhiên hoặc theo chuyên đề (từ `question-bank`).
2. **Luyện tập theo Ngân hàng đề:** Làm bài thi hoàn chỉnh (có timer, nộp bài, lưu điểm) từ `exam-bank`.
3. **Luyện tập theo Sách bài tập:** Vào `/luyen-tap/[subject]` → bấm tab "Theo Sách bài tập" → **chuyển thẳng** (router.push, không qua trang trung gian) sang `/flipbooks/[bookSlug]/quiz` (danh sách Bài, dạng card) → `/flipbooks/[bookSlug]/quiz/[bai]` (quiz text-only chỉ gồm câu hỏi của Bài đó, đọc từ `content/[bookSlug]-questions.json`). Kết quả làm bài được lưu — xem mục D.

### C. Nhập liệu Sách Scan (Thư mục `pipeline/`)

> ⚠️ **Đã loại bỏ luồng Hotspot/Review.** Trước đây có 2 luồng song song: (1) khoanh vùng câu hỏi trên ảnh trang bằng OpenCV + review tay trên `/review`, và (2) OCR toàn trang theo số thứ tự câu hỏi. Luồng (1) đã bị **xóa hoàn toàn** (route `/interactive-workbook`, `/review`, component `BookEditor`/`BookViewer`/`QuestionEditorForm`, `lib/book-viewer-core`, `lib/schema`, toàn bộ ảnh `public/books/[slug]/`) vì chiếm dung lượng lớn (~28MB/sách) và độ chính xác kém (OpenCV hay gộp nhiều câu vào 1 hotspot). Agent tương lai **KHÔNG tạo lại luồng này** trừ khi có yêu cầu rõ ràng phải hiển thị ảnh trang gốc.

**Luồng Quiz Text-Only (duy nhất hiện dùng):**

1. Chạy OCR **toàn trang** (không cắt bbox) bằng EasyOCR, ghép fragment theo thứ tự đọc (sort theo y rồi x). Không cần `pdf_processor.py`/`layout_detector.py` của pipeline cũ cho ảnh trang — chỉ cần `pypdfium2` để render ảnh tạm rồi OCR trực tiếp.
2. Parse câu hỏi/đáp án bằng **regex số thứ tự `Bài.Câu`** (ví dụ `2.5.`) kết hợp **thuật toán quy hoạch động (DP longest-valid-chain)** để loại các false positive (số liệu phép tính, nhãn hình vẽ trùng pattern `X.Y.`). State machine: chỉ chấp nhận marker nếu `cau` tăng dần trong cùng `bai`, hoặc `bai` tăng đúng 1 (sang bài mới).
3. Tự động tách loại câu (trắc nghiệm có pattern `A. ... B. ... C. ... D. ...` → tách options riêng; còn lại là tự luận).
4. Map đáp án (cùng kỹ thuật OCR+DP áp dụng cho phần "HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN" của sách) vào câu hỏi theo key `Bài.Câu`.
5. Output: `content/[slug]-questions.json` — danh sách câu hỏi phẳng `{id, bai, cau, type, stem, options, answer}`, không có bbox/hotspot/ảnh.
6. Render: `app/(app)/(flipbook)/flipbooks/[bookSlug]/quiz/page.tsx` (danh sách Bài, dùng `components/flipbook/FlipbookQuizLessonList.tsx`) → `.../quiz/[bai]/page.tsx` (quiz 1 bài, dùng `components/flipbook/FlipbookQuizClient.tsx`). Cả 2 trang có breadcrumb (Trang chủ → Luyện tập → Sách → Bài, mỗi mục bấm được) và nút mở link Google Drive xem ảnh trang sách gốc (`BOOK_SOURCE_URLS` khai báo trong từng `page.tsx`, theo `bookSlug`). `FlipbookQuizClient` phát âm thanh đúng/sai bằng `lib/quizSound.ts` (Web Audio API, không cần file mp3) khi học sinh chọn trắc nghiệm.
7. Ví dụ tham khảo: `content/khtn7-questions.json` (121 câu, Bài 1–7 sách SBT KHTN 7) và `content/khtn7-answer-key.json` (361 đáp án, đủ cho toàn bộ sách — không cần OCR lại). Tên bài hiển thị khai báo trong `LESSON_TITLES` (cả 2 file route) — **bắt buộc thêm dòng mới khi OCR bài tiếp theo**, nếu không trang danh sách Bài chỉ hiện "Bài N" trống.
8. **Tiến độ OCR và hướng dẫn làm tiếp từng bài:** `docs/khtn7_sbt_progress.md` — bảng bài đã xong/chưa xong, trang PDF, code mẫu đầy đủ từng bước. Agent mới hoặc khi user yêu cầu "làm tiếp bài X" → đọc file này trước, không cần hỏi lại quy trình.
9. **Hạn chế đã biết:** OCR đôi khi đánh rơi hẳn 1 số thứ tự (ví dụ mất số "17" trong "2.17"), khiến nội dung 2 câu liền kề bị dính vào nhau — không sửa được an toàn bằng regex, cần review tay. Cũng có thể gặp case số/dấu chấm ngay trước marker thật bị lookbehind nuốt nhầm (đã gặp ở Bài 5, câu 5.4 và 5.15) — sửa bằng cách patch thủ công xoá cụm gây nhiễu trong text trước khi parse, xác minh đúng vị trí qua ảnh gốc trước khi patch.

Hướng dẫn chi tiết đầy đủ: `agent_prompt/implement_text_only_quiz_pipeline_prompt.md`.

### D. Lưu kết quả & Lịch sử học (Attempts cho Flipbook Quiz)

Khi học sinh bấm "Hoàn Thành" trong `FlipbookQuizClient`, kết quả được lưu qua server action `saveFlipbookQuizAttempt` (`app/(app)/(flipbook)/actions.ts`) vào bảng **`learning_sessions`** có sẵn (không tạo bảng mới) — cùng bảng mà `/dashboard` và trang Phụ huynh (`/phu-huynh`, qua `getStudentHistory` trong `app/(app)/(administration)/phu-huynh/actions.ts`) đọc để hiển thị lịch sử học.

**Quy ước field `summary_metrics` (JSONB) — PHẢI tuân theo, vì UI đọc cứng các field này:**
- `type: "exam"` — bắt buộc đúng giá trị này (không phải `"flipbook_quiz"`) để `/dashboard` và `StudentHistoryCard.tsx` nhận diện đây là hoạt động có điểm số và hiện badge điểm. Dùng field `sub_type: "flipbook_quiz"` riêng để phân biệt nguồn gốc nếu cần.
- `unit_topic` — tên hiển thị (không phải `lesson_title`/`title`) — cả `/dashboard` (dòng đọc `metrics?.unit_topic`) và `StudentHistoryCard.tsx` đều đọc đúng tên field này.
- `score`, `total` — số nguyên, dùng để tính badge màu (xanh ≥80%, vàng ≥50%, đỏ <50%) trong `StudentHistoryCard.tsx`.
- `book_slug`, `bai`, `answers` (mảng chi tiết từng câu: `questionId`, `studentAnswer`, `isCorrect`) — tuỳ chọn, dùng nếu sau này cần xem lại chi tiết bài làm, không bị 2 UI trên đọc.
- Chỉ câu `multiple_choice` được tính vào `score`/`total` (tự luận không tự chấm được, `isCorrect: null`).
- `subject_slug` của bản ghi (cột riêng, không phải trong JSONB) đặt là `"khtn"` — cả `SUBJECT_ICONS` (dashboard) và `SUBJECT_META` (`StudentHistoryCard.tsx`) đều đã có entry cho key này, agent thêm sách mới ở môn khác cần thêm entry tương ứng nếu muốn icon đúng (có fallback, không bắt buộc).

**Bài học:** thiết kế field JSONB mới cho `learning_sessions` PHẢI đọc trước cách `/dashboard` và `StudentHistoryCard.tsx` parse `summary_metrics`, không tự đặt tên field theo ý mình — lần đầu làm việc này đã đặt sai 3 field (`type`, tên title, thiếu subject icon), khiến lịch sử lưu được nhưng hiển thị sai/thiếu, phải sửa lại sau.

## 4. Luật cứng (MUST / MUST NOT) cho Agents
- **MUST:** Giữ tách biệt dữ liệu tĩnh (Questions/Exams) với dữ liệu runtime (StudentAnswers/Score). Không bao giờ nhúng `score`, `userAnswer` vào JSON/Database.
- **MUST:** Khi phát triển tính năng thuộc phân hệ nào, hãy đặt code vào đúng Route Group (VD: `app/(app)/(learning)`) hoặc thư mục component tương ứng.
- **MUST NOT:** Phá vỡ cấu trúc layout/routing chung hiện có mà không có sự đồng ý của User.
- **MUST NOT:** Sử dụng các thư viện UI lạ ngoài hệ thống đã có (TailwindCSS) trừ khi chỉ định rõ.

## 5. Làm việc nhóm giữa các Agent
- **Giao tiếp:** Mọi Agent khi vào dự án đều bắt buộc đọc file này. Nếu bạn cần chuyển giao task cho một sub-agent, hãy nhắc sub-agent đọc `docs/CONTEXT.md`.
- **Nhật ký:** Lưu lại thiết kế hoặc tóm tắt công việc lớn tại các file Markdown trong thư mục `docs/`.
