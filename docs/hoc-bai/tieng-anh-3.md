# Học bài — Tiếng Anh 3

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Phần luyện tập tương ứng: `docs/luyen-tap/tieng-anh-3.md`.

## 1. Route & component chính

- Route học sinh học: `/hoc-tap` (trang chọn môn) → `getSubjectLink()` link thẳng tới
  `/learn/tieng_anh/lop-3` → render qua `/learn/[subject]/[node]/page.tsx`.
- Component chính: `components/universal/LearnNodeClient.tsx` (dùng chung với các môn khác).
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `course → unit →
  lesson → exam`).

## 2. Nguồn nội dung bài học

- `universal_subjects` — slug `tieng_anh` (dùng chung với Tiếng Anh 3, KHÔNG chung với
  Tiếng Anh 7 — Tiếng Anh 7 có `universal_subjects` riêng slug `tieng-anh-7`, xem
  `docs/hoc-bai/tieng-anh-7.md`).
- `content_sources` — slug `tieng-anh-3-global-success` (sách Global Success).
- `curriculum_nodes` — 1 `course` ("Tiếng Anh lớp 3", slug `lop-3`) → 10 `unit` (Unit 1–10,
  đúng theo cấu trúc sách) → 30 `lesson` (mỗi unit có nhiều "Lesson", VD "Unit 3 - Lesson 1")
  → 10 `exam`.

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **51 `curriculum_nodes`**: 1 course, 10 unit, 30 lesson, 10 exam — đủ cả 10 unit của Tập 1.
- So với luyện tập (`docs/luyen-tap/tieng-anh-3.md`): luyện tập cũng chia theo 10 unit
  (`units: [1]`..`[10]`) — đây là 1 trong số ít môn mà số unit ở học bài và luyện tập **khớp
  nhau về số lượng** (không có nghĩa là cùng nội dung/schema, chỉ là cùng cách chia 10 unit
  theo sách).

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Chưa khảo sát chi tiết trong phiên này — kiểm tra `LearnNodeClient.tsx` nếu
  cần xác nhận trước khi thêm nội dung nghe.
- Ràng buộc bản quyền: bám theo SGK Global Success.

## 5. Liên kết với Luyện tập

- Có bộ luyện tập tương ứng: `docs/luyen-tap/tieng-anh-3.md` — lưu ý luyện tập seed chủ yếu
  bằng **procedural script** (dictionary theme trong code, không JSON nguồn đầy đủ), khác cách
  học bài dùng `curriculum_nodes` có cấu trúc rõ ràng.
- Không có liên kết `source_id`/`concept_id` trực tiếp — chỉ liên kết lỏng qua
  `subject_slug: tieng_anh`, `grade: 3`.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi sửa
- [ ] Nếu sửa `LearnNodeClient.tsx`, kiểm tra ảnh hưởng tới các môn khác dùng chung
      component/engine
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm

## 7. Lịch sử / ghi chú quan trọng

(Chưa có ghi chú riêng — bổ sung khi có quyết định/lỗi đáng nhớ về môn này)
