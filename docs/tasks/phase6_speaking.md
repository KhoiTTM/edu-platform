# Phase 6 — Mở rộng cho tất cả 10 Unit

Hiện tại hệ thống Speaking Journey hoạt động rất tốt, nhưng phần UI đang bị "cứng" (hardcode) dữ liệu của Unit 1. Ví dụ, trong `ScaffoldingPanel.tsx`, các Sentence Starters cho Session 1 đang bị fix cứng là: *"I live in a...", "My home is in..."*, điều này sẽ vô lý nếu Unit 2 là chủ đề Giáo dục hoặc Du lịch.

Mục tiêu của Phase 6 là biến toàn bộ dữ liệu trở nên linh hoạt (dynamic) cho cả 10 Unit.

- [x] **1. Động hóa Sentence Starters (Sentence Starters Generator)**
  - [x] Trong `lib/speaking/curriculumContextBuilder.ts`, thêm một mảng `sentenceStarters` vào `CurriculumContext`.
  - [x] Xây dựng một logic (có thể dùng switch case hoặc lấy từ metadata của `ieltsQuizzes.ts`) để trả về danh sách Starters phù hợp với từng `topicClean` của Unit.
  - [x] Ví dụ: Nếu topic là "Travel", starter có thể là *"My favorite trip was...", "I usually travel by..."*.

- [x] **2. Cập nhật `ScaffoldingPanel.tsx`**
  - [x] Xóa mảng hardcode `starters` bên trong component.
  - [x] Đọc mảng `starters` trực tiếp từ biến `context.sentenceStarters` đã được truyền từ `buildCurriculumContext`.
  - [x] Đảm bảo fallback (khi không tìm thấy unit) vẫn có các câu starter chung chung (e.g., *"I think that...", "For example..."*).

- [x] **3. Bổ sung dữ liệu Unit 9**
  - [x] Trong `curriculumContextBuilder.ts`, `Unit 9` hiện tại đang không có mapping video (`9: []`).
  - [x] Tìm video phù hợp trong `ieltsTranscripts` để map cho Unit 9 (hoặc ít nhất cung cấp một bộ từ vựng fallback chuẩn để hệ thống không bị rỗng dữ liệu).

- [x] **4. End-to-End Testing cho các Unit khác**
  - [x] Mở UI và truy cập vào Unit 5, Unit 10.
  - [x] Kiểm tra xem thanh ScaffoldingPanel có hiển thị đúng từ vựng và starter của chủ đề đó hay không.
  - [x] Chat thử một câu với Aria trong Unit 5 xem cô ấy có dùng ngữ cảnh của Unit 5 không.
