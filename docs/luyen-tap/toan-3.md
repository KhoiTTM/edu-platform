# Luyện tập — Toán 3

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `toan`
- `grade`: `3`
- `volume`: `1` (chưa thấy dữ liệu Tập 2 trong DB tính đến thời điểm khảo sát)
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 1 — Ngân hàng câu hỏi, đề rút mẫu**, quy
  mô lớn nhất trong toàn hệ thống (178 collections).

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **178 collections, 209 exams, 4060 câu hỏi** đã seed — môn có khối lượng đề nhiều nhất hệ
  thống.
- `exam_type: null` (176 collections) — chia theo `units` (Bài 1–7), số đề mỗi bài KHÔNG đều:

  | Bài (`units`) | Số đề |
  |---|---|
  | 1 | 32 |
  | 2 | 28 |
  | 3 | 28 |
  | 4 | 28 |
  | 5 | 24 |
  | 6 | 20 |
  | 7 | 16 |

- `exam_type: reflex` (1 collection, `units: [1,2]`) — "Toán 3 - Tập 1 - Phản Xạ".
- `exam_type: midterm` (1 collection, `units: [101]`) — "Kiểm Tra Giữa Kỳ 1", số ảo `101` theo
  đúng quy ước chung (xem `exam_bank.md` mục 6c).
- **Khác biệt quan trọng so với 4 môn đã tài liệu hoá trước đó (Toán 7, Tiếng Anh 7, KHTN 7,
  Pre A1 Starter): phần lớn dữ liệu Bài 1–7 KHÔNG có file JSON nguồn tương ứng còn lại trong
  repo.** Đề Bài 1–7 được sinh bằng **cách Procedural** (script code trực tiếp `INSERT` vào
  Supabase qua `@supabase/supabase-js`, không qua file JSON trung gian) — xem mục 3. File JSON
  hiện có trong `content/exam-bank/toan3/`:
  - `toan3-giua-ky-1-de14-20.json`, `toan3-giua-ky-1-tu-pdf.json` — phần giữa kỳ.
  - `toan3-tap1-phan-xa.json` — **backup xuất trực tiếp từ Supabase** (2026-07-12, sau khi
    thêm field `hint`) cho bộ "Phản Xạ", KHÔNG phải bản nháp soạn trước rồi seed như quy trình
    chuẩn (thứ tự ngược: DB có trước, JSON xuất ra sau để làm backup/đối chiếu). **Không seed
    lại file này** — DB đã có sẵn dữ liệu, seed lại sẽ tạo trùng exam.
  - Bài 1–7 (176 collections còn lại) vẫn **chưa có backup JSON** — rủi ro vẫn còn nguyên,
    xem mục 5.
  - **LƯU Ý QUAN TRỌNG:** Toàn bộ dự án hiện tại đã thống nhất theo flow tạo đề bằng file JSON, seed lên DB và giữ lại file JSON làm backup. Các đề Toán 3 mới **BẮT BUỘC** phải tuân theo flow này.

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice` (chủ yếu).
- **Cách tạo đề (Lịch sử):** Trước đây sử dụng cách Procedural. Các script như `seed-math3-dynamic-assessments.ts` tự sinh câu hỏi bằng code rồi `INSERT` thẳng qua Supabase client không qua JSON.
- **Cách tạo đề (Hiện tại - BẮT BUỘC):** Mọi đề thi mới phải được **soạn bằng file JSON** lưu trong `content/exam-bank/toan3/` và nạp lên DB qua `scripts/seed-exam-bank.ts`. File JSON sau khi seed xong **phải được giữ lại** trong repo làm bản backup và đối chiếu.
- Có `scripts/seed-svg-math3.ts`, `seed-svg-bulk-math3.ts` — sinh câu hỏi kèm hình minh hoạ
  SVG tự vẽ (không phải ảnh scan sách), phù hợp Toán tiểu học cần trực quan hình khối/đếm.
- Có công thức toán (KaTeX)? Chủ yếu là số học đơn giản (cộng trừ nhân chia, hình học cơ bản
  lớp 3) — hầu như không cần LaTeX phức tạp như Toán 7. Nếu có phân số/công thức, áp dụng
  đúng quy ước `$...$` chung.
- Có audio/TTS? Không.
- Ràng buộc bản quyền: nội dung soạn mới/sinh bằng code, không sao chép sách có bản quyền.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] **TUÂN THỦ QUY TRÌNH JSON:** Soạn đề mới dưới dạng file JSON chuẩn theo template ở `docs/EXAM_BANK.md` mục 3. Đặt file trong thư mục `content/exam-bank/toan3/`.
- [ ] **SEED VÀO DB:** Chạy script (ví dụ: `scripts/seed-exam-bank.ts`) để nạp đề từ JSON lên Supabase.
- [ ] **GIỮ LẠI FILE BACKUP:** Sau khi seed thành công và verify trên DB, **tuyệt đối không xoá file JSON**. Phải commit file này vào Git để làm bản backup và đối chiếu sau này.
- [ ] **KHÔNG DÙNG PROCEDURAL CHO ĐỀ MỚI:** Dù các bài cũ dùng code tự sinh, nhưng định hướng toàn dự án hiện tại là quản lý nội dung qua JSON để đảm bảo an toàn dữ liệu. Không viết thêm các script `seed-math3-*.ts` đẩy trực tiếp nữa.
- [ ] Khi cần sửa lỗi các câu hỏi Procedural cũ (không có JSON), đành phải sửa trực tiếp qua Supabase (`question_bank.metadata_json`). Tuy nhiên, với các đề mới, hãy sửa file JSON và cập nhật lại DB để đồng bộ.
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed thêm

## 5. Lịch sử / ghi chú quan trọng

- Vì thiếu file JSON nguồn cho phần lớn dữ liệu, đây là môn **rủi ro nhất nếu DB bị mất dữ
  liệu** trong 5 môn đã tài liệu hoá — không có cách khôi phục nhanh ngoài chạy lại các script
  procedural (nếu logic sinh câu hỏi còn xác định, không phụ thuộc random không seed cố định).
- **2026-07-12 — Thêm cột `hint` (gợi ý phương pháp):** đã cập nhật `hint` cho toàn bộ 200 câu
  của "Toán 3 - Tập 1 - Phản Xạ" (10 đề × 20 câu), phân loại theo 15 dạng bài (cộng trừ nhẩm,
  bảng nhân/chia, biểu thức nhiều bước có/không ngoặc, đổi đơn vị đo, chu vi, tìm x, đọc/viết
  số, so sánh...). Mỗi dạng dùng chung 1 câu gợi ý ngắn nêu quy tắc/công thức, KHÔNG tiết lộ
  đáp án cụ thể. UI hiển thị luôn (không cần bấm) — xem `exam_bank.md` mục 3 phần `hint`. Đây
  là lần đầu field `hint` được dùng trong hệ thống — nếu mở rộng sang môn khác, tham khảo cách
  phân loại theo dạng bài này thay vì soạn hint riêng cho từng câu (đỡ trùng lặp công sức).
