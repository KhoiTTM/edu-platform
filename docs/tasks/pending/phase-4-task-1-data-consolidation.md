# Title
Task 1: Data Consolidation & Cleanup cho Unit 2-10

# Goal
Chuẩn hoá cấu trúc thư mục chứa file OCR của IELTS Mindset, ghép nối nội dung trang (pages) thành một khối văn bản duy nhất (raw text) để chuẩn bị cho quá trình AI trích xuất.

# Background context
Hệ thống lấy dữ liệu OCR từ đường dẫn `D:\Backups\Projects\convert_pdf_json\output\JSON\mindset-for-ielts-foundation\`. Tuy nhiên tên các thư mục đang bị gõ tay thủ công sai quy chuẩn (ví dụ: `UniT_05`, `Unit_8`). Việc này gây khó khăn cho script tự động.

# Files involved
- Thư mục: `D:\Backups\Projects\convert_pdf_json\output\JSON\mindset-for-ielts-foundation\`
- File tạo mới: `scripts/phase4/task1-consolidate.ts`

# DB changes
Không có.

# APIs involved
Không có. Đọc file local (fs module).

# Dependencies
- `fs`, `path` từ Node.js.

# Implementation checklist
- [ ] Viết script `scripts/phase4/task1-consolidate.ts`.
- [ ] Quét các thư mục con trong đường dẫn OCR.
- [ ] Lọc ra các thư mục tương ứng với Unit 2 -> 10.
- [ ] Viết logic chuẩn hoá tên (vd: đổi `Unit_8`, `UNIT_8` thành `UNIT_08`).
- [ ] Đọc tất cả các file `page_xxx.json` bên trong, parse nội dung trường `content` và gộp lại.
- [ ] Xuất ra một file `UNIT_XX_raw.txt` cho mỗi Unit để dùng cho Task 2.

# Validation checklist
- [ ] Kiểm tra xem thư mục có bị đổi tên hỏng không.
- [ ] Kiểm tra file `UNIT_02_raw.txt` xem các trang có nối liền mạch không.

# Future extension notes
Cách gom file này có thể được áp dụng lại nếu hệ thống OCR chạy cho các sách giáo khoa khác (Global Success lớp 3, 4, 5).

# Known risks
- OCR có thể bị sót số trang khiến script ghép sai thứ tự. Cần đảm bảo sort file theo tên (`page_001`, `page_002`) trước khi ghép.
