# Luyện tập — Tiếng Anh 7

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `tieng-anh-7`
- `grade`: `7`
- `volume`: không dùng để chia tập (SBT Global Success chỉ có 1 quyển)
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 2 — Bám sách bài tập, đề cố định 1-1**
  (1 concept = đúng 1 unit trong sách, 1 exam dùng hết toàn bộ câu của unit đó, không random).

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **12 collections** (`exam_type: null`), mỗi collection = 1 unit — đã seed đủ **Unit 1–12**
  (toàn bộ sách SBT Global Success).
- Nguồn soạn thảo (JSON): `content/workbooks/tienganh7-sbt-unit{1..12}.json` (soạn từ scan PDF
  gốc, đọc lại bằng mắt vì OCR ban đầu chất lượng kém — xem mục 5) +
  `content/workbooks/sbt-tienganh7-answers.json` (đáp án đối chiếu, thuộc cơ chế answer-sheet
  cũ — không còn là đường đi khuyến nghị, xem `exam_bank.md` mục 2c).
- Script seed: `scripts/migrate-tienganh7-unit-to-db.ts <unitNumber>` — có guard chống insert
  trùng (kiểm tra concept đã có câu hỏi chưa trước khi insert).
- Script hỗ trợ: `scripts/reset-tienganh7-units.ts <unit1> <unit2>...` (xoá sạch để seed lại
  khi cần sửa lỗi), `scripts/survey-tienganh7-all-units.ts` (liệt kê nhanh toàn bộ
  collection/exam đã seed kèm tổng số câu — dùng để verify sau mỗi lần seed hàng loạt).

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice`, `fill_blank`, `matching`/`match_pair`,
  `sentence_reorder`, `crossword` — xem bảng mapping dạng bài SBT ↔ `type` hệ thống ở
  `exam_bank.md` mục 5b (viết cho Tiếng Anh 3 nhưng áp dụng được tương tự).
- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Không hiện tại (2 script migrate/reset không dùng `image_url`, không có
  tranh cần seed).
- Ràng buộc bản quyền: đây là dạng "bám sách bài tập 1-1" — **được chép nguyên văn đề bài**
  từ sách (khác quy tắc "phải soạn mới" áp dụng cho ngân hàng câu hỏi như Toán 7/Toán 3).
  Trang làm bài (`app/(app)/(assessment)/test-assessment/page.tsx`) nhúng thẳng bản scan gốc
  qua Google Drive iframe (`/preview`) trong layout chia đôi 50:50 (sách bên trái, phần luyện
  tập bên phải), có nút "Ẩn Sách / Hiện Sách" để học sinh lấy toàn bộ không gian khi không cần
  xem sách — không còn dùng nút "Xem sách" mở tab mới (`sourceBookUrl` không còn được truyền
  cho môn này, dù prop vẫn tồn tại trong `AssessmentRenderer` cho các flipbook khác).
  Link Drive hiện tại: xem `BOOK_SOURCE_URLS["tieng-anh-7"]` trong chính file trang đó.
- Dạng bài không thể chấm tự động (`word_search`, `underline_classify`, `paragraph_ordering`,
  `error_identification`, `synonym_finding`, luyện phát âm tự do...) bị `skip` có ghi log lý
  do, KHÔNG đưa vào DB — vẫn còn nguyên trong file JSON gốc làm tham khảo.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Nếu sửa 1 unit đã seed: `npx tsx scripts/reset-tienganh7-units.ts <unit>` trước, rồi
      seed lại bằng `migrate-tienganh7-unit-to-db.ts <unit>` — không seed chồng lên guard
      chống trùng
- [ ] Sau khi seed, chạy `npx tsx scripts/survey-tienganh7-all-units.ts` để verify số liệu
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

- OCR ban đầu qua EasyOCR chất lượng kém → phải đọc lại bằng mắt từng trang scan
  (`content/pdfs/sbt/sbt_tienganh7.pdf`, không track git vì ~143MB), đối chiếu Keys cuối sách.
  Đây là lý do quy ước hiện tại chuyển sang lấy ảnh/PDF nguồn từ **Google Drive** thay vì tải
  về commit vào repo (xem `exam_bank.md` mục 4b).
- **Cơ chế answer-sheet cũ đã ngừng dùng** (route `/sach-bai-tap/[slug]`,
  `AnswerSheetRenderer.tsx`, `content/sbt-tienganh7-answers.json`) — sách bài tập giờ seed đầy
  đủ đề bài vào `question_bank.metadata_json` như exam-bank thường, không giấu đề. Xem
  `exam_bank.md` mục 2c để biết lý do đổi.
