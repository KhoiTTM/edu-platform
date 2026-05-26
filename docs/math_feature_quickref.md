# Tài liệu Kỹ thuật: Môn Toán (Math Feature)

Tài liệu này giải thích cách hoạt động của hệ thống bài học môn Toán (ví dụ: Toán lớp 3) trong Edu Platform, nhằm giúp các AI hoặc Developer tiếp theo dễ dàng bảo trì và mở rộng sang các khối lớp/môn học khác.

## 1. Kiến trúc Tổng quan (Architecture)
Khác với module `mindset-ielts` được hardcode một phần (để phục vụ AI Tutor phức tạp), môn Toán sử dụng hoàn toàn cấu trúc **Generic Database** của Supabase.
Mỗi bài học được tổ chức thành 3 tầng dữ liệu chính:
- Bảng `lessons`: Lưu tiêu đề, video bài giảng (YouTube), SGK trang mấy.
- Bảng `quizzes`: Đại diện cho bài tập/kiểm tra của bài học đó.
- Bảng `quiz_questions`: Chứa các câu hỏi trắc nghiệm (Tạo tự động bằng script).

## 2. Quy trình tạo dữ liệu (Data Seeding)
Dữ liệu môn Toán không được nhập thủ công mà được sinh tự động (Programmatic Generation).
- **File thực thi:** `scripts/generate-toan3-sql.ts`
- **Cách thức hoạt động:** Script này định nghĩa danh sách 44 bài học (Toán 3 Tập 1). Ứng với mỗi bài (`book_lesson_number`), nó có một thuật toán sinh tự động **chính xác 15 câu hỏi trắc nghiệm**.
- **Ví dụ Logic sinh câu hỏi:**
  - Nếu là bài Bảng nhân 3 (Bài 5), script sẽ chạy vòng lặp tạo câu hỏi dạng `3 × factor = ?` và tạo các đáp án gây nhiễu hợp lý.
  - Nếu là bài Đo lường (Bài 7), nó sinh ra các câu hỏi đổi đơn vị `m -> dm`, `cm -> mm`.
- **Kết xuất:** Chạy lệnh `npm run generate:toan3` (hoặc `tsx scripts/generate-toan3-sql.ts`) sẽ xuất ra file SQL migration (`004_toan3_tap1_curriculum.sql`). Chạy file SQL này trên Supabase sẽ nạp toàn bộ giáo trình lên Database.

## 3. Luồng Giao diện (UI Flow)
Khi học sinh truy cập vào một bài học Toán (`app/(app)/lessons/[id]/page.tsx`), hệ thống sẽ render theo luồng:
1. **Thông tin chung:** Hiển thị mục tiêu và liên kết đến trang SGK tương ứng (Component `TextbookSection`).
2. **Video bài giảng:** Hiển thị Component `YouTubeEmbed` cho phép học sinh xem video hướng dẫn ngay trên web.
3. **Bài tập thực hành nhanh:** Hiển thị 15 câu hỏi trắc nghiệm sinh tự động thông qua Component `LessonPractice`.
4. **Kiểm tra tổng hợp:** Có một nút dẫn tới route `/quiz/[id]` để học sinh làm bài test lưu điểm vào `quiz_attempts`.

## 4. Hướng dẫn mở rộng (How to scale)
Nếu muốn làm thêm môn **Toán lớp 4** hoặc **Tiếng Việt lớp 3**:
1. Copy script `generate-toan3-sql.ts` thành `generate-toan4-sql.ts`.
2. Sửa lại danh sách bài học và map các ID video YouTube tương ứng của Toán 4.
3. Viết thuật toán sinh câu hỏi tự động (hoặc chuẩn bị sẵn file JSON/CSV câu hỏi).
4. Build ra file `.sql` mới và nạp vào Supabase. UI sẽ tự động tương thích 100% mà không cần sửa code React.
