# IELTS Flow Book (Học Theo Sách Giáo Trình) - Hướng Dẫn Kỹ Thuật

Tài liệu này giải thích cấu trúc mã nguồn, vị trí các tệp tài nguyên, logic định tuyến và dữ liệu cho tính năng **IELTS Flow Book (Học theo sách giáo trình)** của phân hệ IELTS Foundation.

---

## 1. Tổng quan Tính năng
* **Mục tiêu:** Giúp học sinh học trực quan lý thuyết song song với thực hành bằng cách hiển thị bản quét trang sách (Scan Book) bên trái, và bảng tương tác nhập câu trả lời/làm trắc nghiệm bên phải.
* **Đường dẫn UI:** `/hoc-tap/mindset-ielts/flow-book` (dẫn đến danh sách các buổi học).
* **Định tuyến chi tiết bài học:** `/learn/mindset-ielts/[unit-slug]` (ví dụ: `/learn/mindset-ielts/unit-8`).

---

## 2. Bản Đồ Môn Học & Các Unit Đang Hỗ Trợ
Trên giao diện, hệ thống hiển thị hỗ trợ cho **Unit 3 (Hobbies)** và **Unit 4 (Travel)**. Tuy nhiên trong Database và Router Segments, chúng được ánh xạ dưới dạng các buổi học từ **Buổi 8 đến Buổi 15** thông qua các slug `unit-8` đến `unit-15`:

### 📖 Unit 3: Hobbies
* **Buổi 8 (slug: `unit-8`):** Vocabulary & Listening (Bắt đầu từ trang sách giáo trình: **Page 34**)
* **Buổi 9 (slug: `unit-9`):** Grammar (Bắt đầu từ trang: **Page 36**)
* **Buổi 10 (slug: `unit-10`):** Reading & Speaking (Bắt đầu từ trang: **Page 38**)
* **Buổi 11 (slug: `unit-11`):** Writing & Vocabulary (Bắt đầu từ trang: **Page 41**)

### 📖 Unit 4: Travel and Holidays
* **Buổi 12 (slug: `unit-12`):** Reading & Vocabulary (Bắt đầu từ trang sách giáo trình: **Page 48**)
* **Buổi 13 (slug: `unit-13`):** Listening & Speaking (Bắt đầu từ trang: **Page 50**)
* **Buổi 14 (slug: `unit-14`):** Grammar (Bắt đầu từ trang: **Page 53**)
* **Buổi 15 (slug: `unit-15`):** Writing (Bắt đầu từ trang: **Page 55**)

---

## 3. Cấu trúc Source Code & Cốt Lõi Tính Năng

### 📁 1. Router & Page Logic
* **Trang danh sách buổi học:** [app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/hoc-tap/mindset-ielts/flow-book/page.tsx)
  * Truy vấn danh sách bài học từ table `curriculum_nodes` thuộc `source_id` của IELTS (`slug = 'mindset-foundation'`).
  * Thực hiện lọc các node thuộc danh mục bài học từ `unit-8` đến `unit-15`.
* **Trang hiển thị bài học tương tác:** [app/(app)/learn/[subject]/[node]/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/learn/%5Bsubject%5D/%5Bnode%5D/page.tsx)
  * Đọc tham số `node` (e.g. `unit-8`).
  * Chặn kiểm tra (Intercept):
    * Nếu thuộc `unit-8` -> `unit-11` (Unit 3): Render component `<Unit3TextbookClient />`.
    * Nếu thuộc `unit-12` -> `unit-15` (Unit 4): Render component `<GenericTextbookClient />`.

### 📁 2. UI Components
* **Unit 3 Viewer:** [components/Unit3TextbookClient.tsx](file:///d:/Backups/Projects/edu-platform/components/Unit3TextbookClient.tsx)
  * Hiển thị Layout Split chia 60% bên trái (chứa ảnh scan trang sách giáo trình, hỗ trợ Zoom In/Out) và 40% bên phải (chứa list câu hỏi bài tập tương tác, kiểm tra đáp án, phát âm thanh bài nghe).
* **Unit 4 Viewer:** [components/GenericTextbookClient.tsx](file:///d:/Backups/Projects/edu-platform/components/GenericTextbookClient.tsx)
  * Component tổng quát xử lý hiển thị tương tác sách giáo khoa tương tự Unit 3 nhưng nhận dữ liệu động qua props `pages`.

### 📁 3. Dữ Liệu Tĩnh & Asset Paths (Hình ảnh, Âm thanh)
Dữ liệu câu hỏi bài tập, vị trí trang sách và file nghe âm thanh được cấu hình trong các file dữ liệu tĩnh:
* **Dữ liệu Unit 3:** [lib/data/unit3Data.ts](file:///d:/Backups/Projects/edu-platform/lib/data/unit3Data.ts)
  * Bản quét trang sách: `/book/mindset-foundation/unit_3/page_035.png` (Nằm trong thư mục public: `public/book/mindset-foundation/...`).
  * Đường dẫn tệp âm thanh bài nghe: Được tải trực tiếp từ CDN Cloud (`https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/...`).
* **Dữ liệu Unit 4:** [lib/data/unit4Data.ts](file:///d:/Backups/Projects/edu-platform/lib/data/unit4Data.ts)
  * Bản quét trang sách: `/book/mindset-foundation/unit_4/page_049.png` (Nằm trong thư mục public).

---

## 4. Hướng dẫn cho Agent sau tiếp tục chỉnh sửa & mở rộng
1. **Thêm Unit mới (ví dụ: Unit 5):**
   * Chuẩn bị file hình ảnh quét trang sách tại `public/book/mindset-foundation/unit_5/`.
   * Tạo file dữ liệu câu hỏi tương ứng tại `lib/data/unit5Data.ts` (Bao gồm danh sách câu hỏi, đáp án chuẩn, và link audio CDN nếu có).
   * Cập nhật điều kiện lọc bài trong [flow-book/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/hoc-tap/mindset-ielts/flow-book/page.tsx) để mở khóa các slug bài học tiếp theo (`unit-16`...).
   * Thêm điều kiện intercept trong [learn/[subject]/[node]/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/learn/%5Bsubject%5D/%5Bnode%5D/page.tsx) để liên kết các slug bài học mới với `<GenericTextbookClient />` truyền kèm dữ liệu `unit5Pages` vừa cấu hình.
