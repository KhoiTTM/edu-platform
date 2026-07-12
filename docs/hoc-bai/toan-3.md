# Học bài — Toán 3

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Phần luyện tập tương ứng: `docs/luyen-tap/toan-3.md`.

## 1. Route & component chính

- Route học sinh học: `/hoc-tap` (trang chọn môn) → `getSubjectLink()` link thẳng tới
  `/learn/toan/lop-3` → render qua `/learn/[subject]/[node]/page.tsx`.
- Component chính: `components/universal/LearnNodeClient.tsx` (dùng chung với Toán 7, KHTN 7).
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `course → unit →
  lesson → exam`).

## 2. Nguồn nội dung bài học

- `universal_subjects` — slug `toan` (dùng chung với Toán 7, phân biệt bằng `content_source`
  và `grade` chứ không phải `universal_subjects` riêng).
- `content_sources` — slug `toan-3-canh-dieu` (sách Cánh Diều).
- `curriculum_nodes` — 1 `course` ("Toán lớp 3", slug `lop-3`) → 8 `unit` (chủ đề/chương, VD
  "Chủ đề 1: Ôn tập và bổ sung", "Chủ đề 2: Bảng nhân, bảng chia") → 45 `lesson` (bài) → 7
  `exam` (đề gắn trực tiếp vào cây curriculum).

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **61 `curriculum_nodes`**: 1 course, 8 unit, 45 lesson, 7 exam.
- So với luyện tập (`docs/luyen-tap/toan-3.md`): luyện tập có 178 collections trải trên 7
  `units` (Bài 1–7, dùng số thứ tự khác — không phải cùng đơn vị với 8 "chủ đề" ở học bài).
  **Cần lưu ý: `units` bên luyện tập và cấu trúc "chủ đề/bài" bên học bài KHÔNG dùng chung 1
  hệ đánh số** — đừng giả định bài học số N ở học bài tương ứng đề luyện tập `units: [N]`.

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Chủ yếu số học đơn giản (cộng trừ nhân chia, hình học cơ bản lớp
  3) — hầu như không cần LaTeX phức tạp.
- Có audio/TTS? Không.
- Ràng buộc bản quyền: bám theo SGK Cánh Diều.

## 5. Liên kết với Luyện tập

- Có bộ luyện tập tương ứng: `docs/luyen-tap/toan-3.md` — nhưng lưu ý luyện tập seed chủ yếu
  bằng **procedural script** (không JSON nguồn đầy đủ), khác hẳn cách học bài dùng
  `curriculum_nodes` có cấu trúc rõ ràng trong DB.
- Không có liên kết `source_id`/`concept_id` trực tiếp giữa 2 phần — chỉ liên kết lỏng qua
  `subject_slug: toan`, `grade: 3`.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi sửa — đặc biệt lưu ý hệ đánh số `units` khác giữa 2 phần
- [ ] Nếu sửa `LearnNodeClient.tsx`, kiểm tra ảnh hưởng tới Toán 7/KHTN 7 (dùng chung
      component/engine)
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm

## 7. Lịch sử / ghi chú quan trọng

(Chưa có ghi chú riêng — bổ sung khi có quyết định/lỗi đáng nhớ về môn này)
