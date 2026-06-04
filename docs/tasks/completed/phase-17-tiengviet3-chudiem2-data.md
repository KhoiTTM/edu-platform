# Title
Phase 17: Sinh dữ liệu đề thi Tiếng Việt 3 Chủ Điểm 2 (Cổng Trường Rộng Mở)

# Goal
Tự động hóa quá trình sinh đề thi trắc nghiệm và tự luận cho các bài học thuộc Chủ Điểm 2 (Từ Bài 9 đến Bài 16). Mỗi bài học có đoạn văn đọc hiểu sẽ được tạo 1 bộ đề chuyên biệt gồm đúng 20 câu hỏi đa dạng (multiple_choice, true_false, fill_blank, matching, sorting, classification). 

# Background context
Tiếp nối thành công của Phase 15 và 16 trong việc tự động hóa ngân hàng câu hỏi Tiếng Việt cho Chủ Điểm 1. Giờ đây ta sẽ nhân bản quy trình này cho Chủ Điểm 2 (Cổng Trường Rộng Mở) bằng việc chia nhỏ nhiệm vụ cho các AI Subagent để đọc văn bản SGK và sinh cấu trúc JSON chuẩn. 
**RÚT KINH NGHIỆM TỪ CHỦ ĐIỂM 1:** Lần này Agent sinh dữ liệu (Content Creator) phải tự động trích xuất nguyên văn bài đọc từ SGK và gắn trực tiếp vào trường `reading_passage` của các câu hỏi thuộc loại Đọc hiểu, tránh việc phải dùng mã nguồn để tiêm (inject) dữ liệu thủ công về sau.

# Files involved
- `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_2/*.json` (Source Text)
- `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/chu_diem_2_exams_part1.json` (New - Bài 9, 10, 11, 12)
- `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/chu_diem_2_exams_part2.json` (New - Bài 13, 14, 15, 16)
- `scripts/inject-passages.ts` (Modify - Update Theme 2 texts)
- `scripts/merge-json.ts` (Modify - Merge Theme 2)
- `scripts/seed-vietnamese3-static.ts` (Execute)

# DB changes
- Bảng `assessment_collections`: Thêm 8 collections mới.
- Bảng `exams`: Thêm 8 exams.
- Bảng `question_bank` & `exam_questions`: Thêm 160 câu hỏi mới (8 đề * 20 câu).

# APIs involved
- Supabase SDK (Local scripts).

# Dependencies
- Quá trình Render trên Frontend đã hoàn tất.
- Cấu trúc JSON đã được chuẩn hóa.

# Implementation checklist
- [ ] **Creator C**: Đọc SGK từ Bài 9 đến Bài 12 tại `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_2/`:
  - Bài 9 (Đi học vui sao): `page_044.json` -> `page_046.json`
  - Bài 10 (Con đường đến trường): `page_047.json`, `page_048.json`
  - Bài 11 (Lời giải toán đặc biệt): `page_051.json`, `page_052.json`
  - Bài 12 (Bài tập làm văn): `page_055.json`, `page_056.json`
  => Sinh JSON lưu vào `chu_diem_2_exams_part1.json`. Yêu cầu đặc biệt: Trích xuất trực tiếp bài đọc (hoặc bài thơ) và gắn vào thuộc tính `reading_passage` của các câu Đọc hiểu.
- [ ] **Creator D**: Đọc SGK từ Bài 13 đến Bài 16 tại `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_2/`:
  - Bài 13 (Bàn tay cô giáo): `page_060.json` -> `page_062.json`
  - Bài 14 (Cuộc họp của chữ viết): `page_063.json`, `page_064.json`
  - Bài 15 (Thư viện): `page_067.json`
  - Bài 16 (Ngày em vào đội): `page_070.json` -> `page_072.json`
  => Sinh JSON lưu vào `chu_diem_2_exams_part2.json`. Yêu cầu đặc biệt: Tương tự như Creator C, phải có `reading_passage`.
- [ ] Gộp mảng `exams` từ 2 file thành `chu_diem_2_exams.json` và cập nhật script seeding nếu cần.
- [ ] Xóa DB cũ (nếu có rác) và Seed lên Database.

# Validation checklist
- [ ] Kiểm tra số lượng bộ đề trên màn hình `Luyện tập > Tiếng Việt Lớp 3` có tăng thêm 8 bộ đề Chủ điểm 2 chưa.
- [ ] Đảm bảo UI hiển thị thành công các bài đọc hiểu.

# Future extension notes
Cách làm tương tự cho Chủ điểm 3 và 4.

# Known risks
- Do Chủ điểm 2 chứa nhiều bài thơ (Bài 9, Bài 13, Bài 16), LLM cần được nhắc nhở xử lý ngắt dòng (`\n`) cẩn thận khi lưu vào `reading_passage` và các câu hỏi.
