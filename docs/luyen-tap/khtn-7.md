# Luyện tập — KHTN 7

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `khtn`
- `grade`: `7`
- `volume`: không dùng để chia tập
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 2 — Bám sách bài tập, đề cố định 1-1**
  cho phần SBT (Bài 1–42), cộng thêm 3 collection **Format 1-style** riêng cho ôn lý thuyết
  (`exam_type: review`).

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **45 collections**, **59 exams**, **599 câu hỏi** đã seed:
  - 42 collection `KHTN 7 - Luyện theo sách bài tập - Bài {1..42}` (`exam_type: null`) — **đủ
    toàn bộ 42 bài** của SBT Kết nối tri thức.
  - 3 collection `exam_type: review`: "Ôn Lý Thuyết - Nguyên tử, Nguyên tố, Phân tử", "Ôn Lý
    Thuyết - Sinh học (Trao đổi chất, Cảm ứng)", "Ôn Lý Thuyết - Tốc độ, Âm thanh, Ánh sáng".
- Nguồn soạn thảo (JSON): `content/workbooks/khtn7-questions.json` (395 câu, 42 bài) +
  `content/workbooks/khtn7-answer-key.json` (đáp án đối chiếu, dùng để backfill lúc soạn).
  File `content/khtn7-questions.json` (bản cũ 121 câu, thuộc luồng Quiz Text-Only/flipbook) đã
  **không còn tồn tại** — đã bị thay thế hoàn toàn bởi bộ 395 câu này.
- Script seed: `scripts/migrate-khtn7-bai-to-db.ts <baiNumber>` — seed 1 bài từ
  `khtn7-questions.json`, lọc theo `bai`, có guard chống insert trùng (kiểm tra concept đã có
  câu hỏi chưa trước khi insert). Đã sửa để nhận diện `multiple_choice` dựa trên **có
  `options` hay không**, không chỉ tin field `type` gốc trong JSON (xem mục 5).
- Script hỗ trợ: `scripts/normalize-khtn7-schema.ts` (chuẩn hoá schema JSON — đã chạy xong,
  không cần chạy lại trừ khi lặp lại lỗi tương tự, xem mục 5).

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice`, `essay` (câu tự luận nhiều ý — bảng điền, giải
  thích dài, hình vẽ mô tả nguyên tử...).
- Có công thức toán (KaTeX)? Không (chỉ số/ký hiệu hoá học đơn giản, không cần LaTeX).
- Có audio/TTS? Không.
- Ràng buộc bản quyền: dạng "bám sách bài tập 1-1" — **được chép nguyên văn đề bài**. Có nút
  "Xem sách" (`sourceBookUrl`) trỏ ảnh scan trên Google Drive.
- **Câu `essay` nhiều ý (có mục a/b/c hoặc nhiều giá trị cần điền) KHÔNG chuyển sang
  `multiple_choice`** — chỉ chuyển khi đáp án là 1 kết luận/giá trị rõ ràng duy nhất, không có
  mục con. Đã rà toàn bộ 13 câu essay của Bài 3 làm mẫu: chỉ 1/13 câu đủ đơn giản để chuyển,
  10 câu còn lại giữ essay vì hỏi nhiều ý — coi đây là tiêu chí áp dụng cho các bài khác.
- Câu `essay` hiện có ô nhập câu trả lời (`textarea`) trong `AssessmentRenderer.tsx`, học sinh
  gõ trực tiếp thay vì "làm vào vở" — xem mục 5.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Nếu sửa 1 bài đã seed: xoá concept cũ trước (không có script reset riêng như Tiếng Anh
      7 — xoá thủ công qua Supabase rồi seed lại bằng `migrate-khtn7-bai-to-db.ts <bài>`)
- [ ] Trước khi seed câu trắc nghiệm, luôn kiểm tra `options` có tồn tại trong JSON nguồn —
      đừng chỉ tin field `type` (xem bài học ở mục 5)
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

- **Rủi ro OCR/soạn thảo song song nhiều agent:** 1 agent con (tự spawn để chia việc bài
  21–27) tự đổi schema JSON sang `{question, explanation}` thay vì `{stem, cau, answer}` đã
  thống nhất, làm 162 câu (bài 21–42) lệch schema. Sửa bằng
  `scripts/normalize-khtn7-schema.ts`. **Bài học:** nếu giao nhiều agent cùng sửa 1 file JSON
  lớn song song, luôn backup trước, verify `set(keys)` đồng nhất sau khi tất cả agent xong
  trước khi seed DB.
- **2026-07-10 — 9 câu bị mất phương án trắc nghiệm:** 9 câu (bài 2, 3, 4) có sẵn `options`
  đầy đủ trong JSON gốc nhưng bị gán nhầm `type: "essay"` — script migrate chỉ đọc field
  `type`, bỏ qua `options`, khiến UI render thành "câu tự luận" không có gì để bấm. Đã vá 9
  bản ghi trong Supabase + sửa `migrate-khtn7-bai-to-db.ts` để nhận diện trắc nghiệm dựa trên
  `Array.isArray(options)` thay vì chỉ tin `type`. Cũng sửa 1 lỗi OCR liên quan: đáp án ghi
  `"€."` thay vì `"C."` ở câu `khtn7-2-21` (xác minh lại bằng phép tính trong lời giải).
- **2026-07-10 — Ô nhập câu trả lời cho essay:** trước đó UI chỉ hiện "Câu tự luận — tự làm
  vào vở rồi bấm bên dưới" với 1 nút xem đáp án, không có chỗ nhập gì. Đã thêm `textarea` vào
  `AssessmentRenderer.tsx` để học sinh gõ câu trả lời trực tiếp; câu trả lời hiện lại cùng lúc
  với hướng dẫn giải để đối chiếu. Không đổi cơ chế chấm (vẫn tự đánh giá, không chấm tự động
  tự luận).
