# Title
Task 3: Database Seeding & Assessment Creation

# Goal
Lấy các file `extracted_unit_XX.json` đã được AI sinh ra, đẩy thẳng vào CSDL Supabase, gán đúng Concept và sinh ra các đề thi (Exams/Assessment Collections).

# Background context
Đây là bước cuối cùng để hệ thống hiển thị bài tập ra UI cho học sinh làm.

# Files involved
- `extracted_unit_XX.json`
- File tạo mới: `scripts/phase4/task3-db-seed.ts`

# DB changes
- Bảng `concepts` (Thêm các concept Unit 2-10).
- Bảng `question_bank` (Insert các câu hỏi, `subject_slug: mindset-ielts`).
- Bảng `assessment_collections` (Thêm đề luyện tập).
- Bảng `exams` và `exam_questions` (Tạo mối quan hệ n-n).

# APIs involved
- `@supabase/supabase-js` 

# Dependencies
- `fs`, `path`, `dotenv`

# Implementation checklist
- [ ] Viết script `scripts/phase4/task3-db-seed.ts`.
- [ ] Lấy danh sách các file `extracted_unit_XX.json`.
- [ ] Duyệt từng file, tạo / tìm `concept` tương ứng (`mindset-foundation-unit-XX`).
- [ ] Insert toàn bộ array câu hỏi vào `question_bank`.
- [ ] Trộn câu hỏi (Shuffle) và chia mỗi 10 câu thành 1 đề Luyện tập.
- [ ] Lưu vào `assessment_collections` với `grade: 7` để UI hiện ra ở Lớp 7.
- [ ] Liên kết `exam_questions`.

# Validation checklist
- [ ] Mở ứng dụng, đăng nhập tài khoản học sinh lớp 7.
- [ ] Vào mục Luyện tập -> IELTS Mindset.
- [ ] Xác minh số lượng đề tăng từ 6 đề (Unit 1) lên hơn 50 đề (cho 10 Unit).
- [ ] Chơi thử một đề của Unit 5 để xem ảnh hưởng.

# Future extension notes
- Script này khá độc lập. Nếu sau này có các Unit bổ sung hoặc sách khác, chỉ cần đưa file JSON vào là script sẽ tự động tạo bài tập.

# Known risks
- Lỗi trùng lặp dữ liệu nếu chạy script nhiều lần. => *Giải pháp*: Script cần có lệnh xoá (DELETE) những câu hỏi cũ của các Concept đang chuẩn bị Insert, hoặc sử dụng Upsert.
