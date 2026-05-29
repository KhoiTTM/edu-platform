# Cẩm Nang Sinh Đề Hệ Thống (Procedural Generation Walkthrough)

Đây là tài liệu hướng dẫn từng bước (Step-by-step) để vận hành cỗ máy sinh đề tự động bằng thuật toán, áp dụng cho môn **Toán** (Kết nối tri thức) và **Tiếng Anh** (Global Success). Thuật toán được lập trình để bám sát 100% vào **từng Bài học (Lesson)** của Sách giáo khoa, tự động tích hợp tính năng ôn tập **Kiến thức lũy kế** chống quên.

---

## 🧹 BƯỚC 1: Dọn Dẹp Rác Cũ (Clear Database & Local)
Trước khi sinh đề mới cho một môn học, bạn nên quét dọn lại Database và các file JSON cũ trên máy để tránh dữ liệu bị đè, rác, hoặc nhảy nhầm sang Unit 0.

- **Dọn rác môn Toán:**
  ```bash
  node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/delete-assessments.ts --subject math
  ```
- **Dọn rác môn Tiếng Anh:**
  ```bash
  node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/delete-assessments.ts --subject english
  ```

---

## ⚙️ BƯỚC 2: Kích Hoạt Cỗ Máy Sinh Đề (Generation)
Quá trình này sẽ gọi thuật toán `Math.random` kết hợp với "Bể chứa Kiến thức" (Pool) của từng bài học để đẻ ra hàng loạt file JSON lưu tại thư mục `content/assessments/pending/`. 

> [!IMPORTANT]
> Tham số `--lessons all` sẽ duyệt qua toàn bộ bài học của Sách Giáo Khoa (Có thể chỉ định `--lessons 6,7,8` để chọn riêng lẻ).
> Tham số `--count X` là số lượng Đề thi được sinh ra CHO MỖI BÀI HỌC (Ví dụ: 44 Bài x 2 Đề = 88 Đề).
> Tham số `--questions Y` là số lượng câu hỏi trong mỗi đề thi.

- **Sinh 88 Đề Môn Toán (Bám sát 44 bài học KNTT):**
  ```bash
  node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/generate-procedural.ts --subject math --grade 3 --volume 1 --lessons all --count 2
  ```

- **Sinh 20 Đề Môn Tiếng Anh (Unit 6 đến Unit 10, mỗi đề 15 câu):**
  ```bash
  node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/generate-procedural.ts --subject english --grade 3 --volume 1 --lessons 6,7,8,9,10 --count 4 --questions 15
  ```

> [!TIP]
> **Tạo 50 đề Ôn tập Học kì:** Nếu bạn chỉ muốn xoáy sâu vào bài ôn tập (Ví dụ Toán Bài 44 hoặc Tiếng Anh Unit 11) và muốn cỗ máy tự động sinh ra 50 đề thi khác nhau (Lấy kiến thức lũy kế của toàn bộ học kì), hãy chỉ định `--lessons` kèm `--count 50` và `--questions 20`:
> 
> **Toán học (Bài 44):**
> ```bash
> node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/generate-procedural.ts --subject math --grade 3 --volume 1 --lessons 44 --count 50 --questions 20
> ```
> 
> **Tiếng Anh (Unit 11):**
> ```bash
> node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/generate-procedural.ts --subject english --grade 3 --volume 1 --lessons 11 --count 50 --questions 20
> ```

---

## 🚀 BƯỚC 3: Đẩy Dữ Liệu Lên Database (Importing)
Sau khi JSON được tạo ra thành công ở thư mục `pending`, hãy chạy lệnh Import để đẩy tất cả lên Supabase. Lệnh này sẽ tự động phân loại, đọc thông số Lesson, và tự động xếp vào đúng Unit / Chủ đề tương ứng trên UI.

```bash
node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/automate-assessment-import.ts
```

> [!TIP]
> Import xong, các file JSON sẽ tự động được dời từ thư mục `pending` sang thư mục `imported` để lưu trữ. 
> Bạn có thể lên trang Luyện Tập (Frontend) và ấn F5 để chiêm ngưỡng thành quả của mình. Các bài thi khi học sinh làm xong sẽ hiển thị nhãn "Đã làm" và tự động mờ đi (Fade out) cực kỳ chuyên nghiệp!

---

**Ghi chú kỹ thuật về tính năng "Kiến Thức Lũy Kế":**
Khi sinh đề của Bài số `X`, cỗ máy sẽ tự động phân bổ:
- **60% - 70%** câu hỏi trọng tâm của Bài `X`.
- **30% - 40%** câu hỏi ngẫu nhiên bốc từ các Bài từ `1` đến `X - 1` để giúp học sinh tự động ôn luyện kiến thức cũ. Tỉ lệ này được thiết lập tại lõi `scripts/generators/math/grade3.ts`.
