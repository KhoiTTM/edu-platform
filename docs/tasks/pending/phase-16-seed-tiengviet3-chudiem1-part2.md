# Title
Phase 16: Hợp nhất và Seeding dữ liệu Tiếng Việt 3 Chủ Điểm 1 (Phần 2)

# Goal
Tiếp nhận file JSON thô (Part 2A và Part 2B) do Content Creator sinh ra, hợp nhất chúng lại với nhau, cập nhật lại các script seeding hiện có và đẩy toàn bộ 5 đề thi mới (100 câu hỏi) vào hệ thống cơ sở dữ liệu.

# Background context
Content Creator Agent đã sinh ra 2 file JSON là `chu_diem_1_exams_part2a.json` (Bài 2, 3) và `chu_diem_1_exams_part2b.json` (Bài 4, 6, 8). Các file này chứa cấu trúc câu hỏi nhưng chưa có phần văn bản đọc hiểu đính kèm. Cần phải hợp nhất, inject (tiêm) nội dung đọc hiểu và seed vào DB.

# Files involved
- `scripts/merge-json.ts` (Modify)
- `scripts/inject-passages.ts` (Modify)
- `scripts/seed-vietnamese3-static.ts` (Execute)
- `scripts/fix-db.ts` (Execute)

# DB changes
- Xoá các collections Tiếng Việt cũ (để tránh rác).
- Bảng `assessment_collections`: Thêm 5 collections mới cho 5 bài học.
- Bảng `exams`: Thêm 5 exams tương ứng (mỗi cái 20 câu).
- Bảng `question_bank` & `exam_questions`: Thêm 100 câu hỏi mới.

# APIs involved
- Supabase SDK (Local script).

# Dependencies
- Phải đảm bảo file `part2a.json` và `part2b.json` đã được tạo thành công bởi Phase 15.

# Implementation checklist
- [ ] Cập nhật file `scripts/inject-passages.ts` để đọc thêm các văn bản SGK của Bài 2, Bài 3, Bài 4, Bài 6, Bài 8 và tiêm vào thuộc tính `reading_passage` cho các câu hỏi đọc hiểu của file part2.
- [ ] Gộp mảng `exams` của `part2a.json` và `part2b.json` vào file gốc `chu_diem_1_exams.json` thông qua script `merge-json.ts`.
- [ ] Chạy lệnh `node --import tsx scripts/fix-db.ts` để dọn dẹp data Tiếng Việt 3 hiện tại.
- [ ] Chạy lệnh `node --import tsx scripts/seed-vietnamese3-static.ts` để đẩy toàn bộ (Đề cũ + 5 Đề mới) vào database.

# Validation checklist
- [ ] Truy cập UI http://localhost:3000/luyen-tap/tieng_viet?grade=3
- [ ] Kiểm tra xem số lượng bộ đề của Chủ điểm 1 đã hiển thị đủ từ Bài 1 đến Bài 8 chưa.
- [ ] Thử làm 1 đề bất kì xem lỗi "Objects are not valid as a React child" có tái diễn không.

# Known risks
- Định dạng JSON sinh ra từ Content Creator có thể sai sót nhỏ (thiếu dấu phẩy, sai chính tả), cần dùng script cẩn thận trước khi merge.
