# Học bài — Toán 7

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Phần luyện tập tương ứng: `docs/luyen-tap/toan-7-tap-1.md`.

## 1. Route & component chính

- Route học sinh học: `/hoc-tap/toan` → redirect thẳng sang `/learn/toan/lop-{grade}` (xem
  `app/(app)/(learning)/hoc-tap/[subject]/page.tsx` dòng 40-42) → render qua
  `/learn/[subject]/[node]/page.tsx`.
- Component chính: `components/universal/LearnNodeClient.tsx`.
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `course → unit →
  lesson`) + lesson-engine kiểu Duolingo cho phần luyện tập trong bài (xem
  `docs/luyen-tap/toan-7-tap-1.md` về `submitLesson`/`LessonComplete`).

## 2. Nguồn nội dung bài học

- Nội dung nằm trong **DB**, không phải file JSON:
  - `universal_subjects` — slug `toan`, tên "Toán học".
  - `content_sources` — slug `toan-7-ket-noi` (sách Kết nối tri thức).
  - `curriculum_nodes` — 1 `course` ("Toán lớp 7", slug `lop-7`) → 5 `unit` (chương) → 17
    `lesson` (bài) → 5 `exam` (đề gắn trực tiếp vào cây curriculum, khác với
    `assessment_collections` của luyện tập).
- Không có video YouTube nhúng theo kiểu môn khác — kiểm tra `LearnNodeClient.tsx` nếu cần xác
  nhận nội dung từng `lesson` node hiển thị dạng gì (chưa khảo sát sâu trong phiên này).

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **28 `curriculum_nodes`** dưới `content_source = toan-7-ket-noi`: 1 course, 5 unit
  (chương), 17 lesson (bài), 5 exam.
- 5 chương đã có: Chương 1 (Số hữu tỉ), và tối thiểu các bài rải tới "Bài 13: Thu thập và
  phân loại dữ liệu" — chưa khảo sát đủ để liệt kê chính xác hết 5 chương, chỉ xác nhận có 17
  bài học nằm trong đó.
- So với luyện tập (`docs/luyen-tap/toan-7-tap-1.md`): luyện tập hiện chỉ có đề cho Bài 1–5 +
  vài đề tổng hợp — **Học bài (17 lesson) có phạm vi rộng hơn Luyện tập hiện tại**, nghĩa là
  có bài đã học được nhưng chưa có đề luyện tập tương ứng.

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Có — cùng quy ước `$...$` như luyện tập (xem `exam_bank.md` mục
  3b), áp dụng chung toàn app từ khi sửa lỗi CSS KaTeX (2026-07-10).
- Có audio/TTS? Không.
- Ràng buộc bản quyền: bám theo SGK Kết nối tri thức — cần xác nhận mức độ được phép trích
  dẫn/diễn giải lại nội dung khi soạn bài học mới.

## 5. Liên kết với Luyện tập

- Có bộ luyện tập tương ứng: `docs/luyen-tap/toan-7-tap-1.md`.
- Dùng chung `subject_slug: toan`, `grade: 7` — nhưng 2 hệ schema khác nhau:
  Học bài dùng `curriculum_nodes` (source `toan-7-ket-noi`), Luyện tập dùng
  `assessment_collections`/`question_bank` (không có `source_id` chung, chỉ liên kết lỏng qua
  `subject_slug`+`grade`). Khi hoàn thành bài học (lesson-engine), kết quả ghi vào
  `learning_sessions` — xem `docs/luyen-tap/toan-7-tap-1.md` phần liên quan tới
  `submitLesson`.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 1-2 ở trên trước khi sửa
- [ ] Nếu thêm bài học mới, kiểm tra có nên seed thêm đề luyện tập tương ứng vào
      `docs/luyen-tap/toan-7-tap-1.md` không — hiện đang lệch phạm vi (17 bài học vs 5 bài có
      đề luyện tập)
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm

## 7. Lịch sử / ghi chú quan trọng

(Chưa có ghi chú riêng — bổ sung khi có quyết định/lỗi đáng nhớ về môn này)
