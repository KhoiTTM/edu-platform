# Title
Task 2: Deterministic AI Extraction Pipeline

# Goal
Tạo script để đưa text thô (raw text) của từng Unit vào model `gemini-2.5-pro` và yêu cầu model trả về cấu trúc JSON nghiêm ngặt tuân thủ đúng các dạng câu hỏi đã được quy định trong hệ thống, bao gồm ngữ cảnh (`reading_passage`).

# Background context
Hệ thống sử dụng các loại câu hỏi: `inline_fill_blank`, `multiple_choice`, `match_pair`, `sentence_reorder`. Trí tuệ nhân tạo sẽ đóng vai trò parser để nhận diện bài tập trong text của SGK và chuyển thành mảng JSON. 

# Files involved
- Các file raw text: `UNIT_02_raw.txt` -> `UNIT_10_raw.txt`
- File tạo mới: `scripts/phase4/task2-ai-extract.ts`

# DB changes
Không có (Task này chỉ lưu JSON ra đĩa local).

# APIs involved
- Google Generative AI API (`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent`).

# Dependencies
- `@google/generative-ai`

# Implementation checklist
- [ ] Viết script `scripts/phase4/task2-ai-extract.ts`.
- [ ] Khởi tạo `GoogleGenerativeAI` với model `gemini-2.5-pro` (với cấu hình `response_mime_type: "application/json"`).
- [ ] Soạn System Prompt (hay Instruction Prompt) chuẩn kỹ sư: Liệt kê rõ các schema (inline_fill_blank, multiple_choice...), ép buộc AI phải chép nguyên văn chữ trong SGK, cấm tự ý chế từ. 
- [ ] Ép AI loại bỏ các bài tập ghi rõ là "Listen to the audio" hoặc "Listen to track x".
- [ ] Đối với `inline_fill_blank`, bắt buộc AI cung cấp nguyên một đoạn văn dài vào trường `reading_passage` để học sinh đọc.
- [ ] Vòng lặp: Duyệt từng file `UNIT_XX_raw.txt`, gọi API, lấy JSON, lưu vào `extracted_unit_XX.json`.

# Validation checklist
- [ ] Kiểm tra nội dung của `extracted_unit_02.json` xem đúng chuẩn format `question_bank` chưa.
- [ ] Thử ném file JSON đó vào website JSON validator.

# Future extension notes
- Có thể áp dụng system prompt này để bóc tách hàng trăm cuốn sách khác bằng cách làm tương tự.

# Known risks
- AI Hallucinations (AI tự ảo tưởng sinh ra câu hỏi lạ). => Giải quyết bằng prompt thật chi tiết.
- Quá tải Token (Vượt quá giới hạn token của Gemini). => Gemini 2.5 Pro hỗ trợ tới 2 triệu token, nên không lo vấn đề này vì một Unit chỉ khoảng vài ngàn từ.
