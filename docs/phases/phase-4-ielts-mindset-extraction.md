# Phase 4 - IELTS Mindset Full Curriculum Extraction

## Phase Goals
Trích xuất tự động và hoàn chỉnh toàn bộ dữ liệu từ sách giáo khoa IELTS Mindset Foundation (từ Unit 2 đến Unit 10) từ dữ liệu OCR JSON thô thành các câu hỏi có cấu trúc trong Database. Tuân thủ tuyệt đối nguyên tắc "CURRICULUM CONTROLS AI" - AI chỉ làm nhiệm vụ parse dữ liệu, không tự ý sáng tác câu hỏi.

## Architecture Overview
Luồng dữ liệu sẽ đi theo các bước (Deterministic Pipeline):
1. **Curriculum Extraction Pipeline**: Quét thư mục `convert_pdf_json`, đọc các file JSON theo từng trang sách, hợp nhất thành text.
2. **AI Enhancer (gemini-2.5-pro)**: Đóng vai trò Data Parser. Đọc text, bóc tách ra các dạng bài tập theo schema hệ thống.
3. **Database Seeding**: Inject dữ liệu vào `question_bank` và khởi tạo `assessment_collections`.

## Dependencies
- `@google/generative-ai` SDK
- API Key của `gemini-2.5-pro` (hiện đã có trong `.env.local`)
- Thư mục dữ liệu OCR gốc tại `D:\Backups\Projects\convert_pdf_json\output\JSON\mindset-for-ielts-foundation`

## Implementation Order
1. Task 1: Data Consolidation & Cleanup
2. Task 2: Deterministic AI Extraction Pipeline
3. Task 3: Database Seeding & Assessment Creation

## Related Tasks
- `docs/tasks/pending/phase-4-task-1-data-consolidation.md`
- `docs/tasks/pending/phase-4-task-2-gemini-extraction-script.md`
- `docs/tasks/pending/phase-4-task-3-database-seeding.md`

## Risks
- **JSON Parsing Errors**: AI trả về JSON lỗi cú pháp. => *Mitigation*: Bắt lỗi bằng try/catch và cho phép chạy lại (retry) hoặc sử dụng tính năng `response_mime_type: "application/json"`.
- **Thiếu Audio cho Listening**: Các bài tập nghe không thể làm được trên UI do thiếu file âm thanh. => *Mitigation*: Prompt cho AI bỏ qua các bài tập yêu cầu bắt buộc phải có Audio track.
- **Thư mục bị lộn xộn**: `UNIT_02`, `Unit_8`... => *Mitigation*: Viết script chuẩn hoá tên thư mục ở Task 1.

## Success Criteria
- Toàn bộ dữ liệu Unit 2 đến Unit 10 xuất hiện đầy đủ trong `question_bank`.
- Học sinh có thể vào Khu vực Lớp 7 trên UI, mở môn IELTS Mindset và làm bài cho Unit 2-10 một cách mượt mà.
- Các câu hỏi Fill-in-blank có chứa ngữ cảnh đầy đủ trong trường `reading_passage`.
