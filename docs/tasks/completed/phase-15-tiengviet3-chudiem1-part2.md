# Title
Phase 15: Sinh dữ liệu đề thi Tiếng Việt 3 Chủ Điểm 1 (Phần 2)

# Goal
Tự động hóa quá trình sinh đề thi trắc nghiệm và tự luận cho 5 bài học còn lại của Chủ Điểm 1 (Bài 2, 3, 4, 6, 8). Mỗi bài sẽ có 1 đề thi chuyên biệt, mỗi đề chứa đúng 20 câu hỏi bao trùm tất cả các loại câu hỏi đa dạng như multiple_choice, true_false, fill_blank, matching, sorting, classification, v.v.

# Background context
Hệ thống hiện tại đã hỗ trợ seed dữ liệu và render giao diện tốt cho các loại câu hỏi Tiếng Việt 3. Các đoạn văn đọc hiểu cũng đã được inject trực tiếp vào câu hỏi để frontend hiển thị trong block `Đoạn văn tham khảo`. Để làm phong phú ngân hàng câu hỏi, ta cần mở rộng số lượng đề dựa trên nội dung số hóa trong SGK JSON.

# Files involved
- `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/chu_diem_1_exams_part2.json` (New)
- `scripts/inject-passages.ts` (Modify)
- `scripts/merge-json.ts` (Modify)
- `scripts/seed-vietnamese3-static.ts` (Execute)

# DB changes
- Bảng `assessment_collections`: Thêm 5 collections mới cho 5 bài học.
- Bảng `exams`: Thêm 5 exams tương ứng (mỗi cái 20 câu).
- Bảng `question_bank` & `exam_questions`: Thêm 100 câu hỏi mới.

# APIs involved
- None (Local script & Supabase Service Role).

# Dependencies
- Quá trình Render trên Frontend đã được xử lý xong ở Phase trước, nên Phase này tập trung 100% vào Data Generation.

# Implementation checklist
- [ ] Parse dữ liệu bài 2, 3, 4, 6, 8.
- [ ] Dùng LLM (Content Creator Agent) sinh file `chu_diem_1_exams_part2.json`.
- [ ] Bổ sung đoạn văn đọc hiểu của 5 bài này vào script `inject-passages.ts`.
- [ ] Cập nhật kịch bản gộp JSON `merge-json.ts` để đọc cả `chu_diem_1_exams_part2.json`.
- [ ] Thực thi xoá DB và seed lại từ đầu.

# Validation checklist
- [ ] Đề thi có đúng số lượng 5 đề * 20 câu = 100 câu không?
- [ ] Có xuất hiện lỗi cấu trúc JSON khi parse không?
- [ ] Giao diện có render được đầy đủ 5 đề mới không?

# Future extension notes
Cách làm tương tự sẽ được sử dụng cho Chủ điểm 2, 3, 4 trong tương lai.

# Known risks
- Token limit của Agent có thể bị vượt quá nếu sinh 100 câu hỏi trong 1 lượt. Giải pháp là yêu cầu sinh gọn, bám sát template, chỉ output JSON hoặc chia thành 2 đợt sinh.
