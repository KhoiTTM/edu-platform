# Học bài — IELTS Foundation (Mindset)

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Môn này **không** dùng schema exam-bank
> (`assessment_collections`/`question_bank`) — không có gì trong `docs/luyen-tap/` tương ứng.

## 1. Route & component chính

- Route học sinh học: `app/(app)/(learning)/hoc-tap/mindset-ielts/` — có các trang con
  `page.tsx` (tổng quan), `flow-book/`, `grammar/`, `listening/`, `reading/`, `shadowing/`,
  `speaking/`, `writing/`.
- Component chính: `components/learning/IELTSSkillsNav.tsx`.
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `subject → course →
  unit → lesson`), không phải lesson-engine kiểu Duolingo, không phải flipbook ảnh scan.

## 2. Nguồn nội dung bài học

- Nội dung nằm trong **DB**, không phải file JSON:
  - `universal_subjects` — slug `mindset-ielts`, tên "IELTS Mindset Foundation".
  - `content_sources` — slug `mindset-foundation`, tên "Mindset for IELTS Foundation".
  - `curriculum_nodes` — cây phân cấp `course → unit → lesson`, lọc theo `source_id` của
    `mindset-foundation`.
- Cả `page.tsx` (tổng quan) và `flow-book/page.tsx` đều query **cùng 1 tập node**
  (`type === 'unit' || type === 'lesson'`, không phân biệt thêm) — xem cảnh báo cấu trúc lẫn
  ở mục 3.
- Script từng dùng để đưa dữ liệu vào: `scripts/migrate-ielts-to-universal.ts`,
  `scripts/seed-ielts-concepts.ts`, `scripts/seed-ielts-mindset.ts`.

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **99 `curriculum_nodes`** dưới `content_source = mindset-foundation`: 1 `subject`, 1
  `course`, 42 `unit`, 55 `lesson`.
- ⚠️ **Cảnh báo cấu trúc — 2 hệ thống unit đang tồn tại song song, không phải trùng lặp lỗi
  nhưng dễ nhầm khi audit:**
  1. **36 unit "Buổi N"** (`parent_id` trỏ đúng vào course "IELTS Foundation", slug
     `unit-1`..`unit-36`) — đây là giáo trình chính, theo thứ tự "Buổi 1: U1 - Daily Life
     (Reading & Vocabulary)" → ... → "Buổi 36: Review & Final Assessment", đi qua 10 chủ đề
     (U1 Daily Life .. U10 Tech) chia làm 3-4 buổi/chủ đề theo 4 kỹ năng.
  2. **6 unit "Unit N: {Topic}"** (`parent_id: null`, slug `mindset-unit-2`, `mindset-unit-4`,
     `mindset-unit-5`, `mindset-unit-7`, `mindset-unit-8`, `mindset-unit-9`) — **không có
     course cha**, chứa 55 `lesson` con nhưng nội dung lesson thực chất là "Luyện Nghe Tiếng
     Anh Level A2 - TỔNG KẾT 2021..2025" (các bài luyện nghe tổng kết theo năm, không khớp
     với topic của unit cha).
- Vì cả `page.tsx` và `flow-book/page.tsx` lấy toàn bộ node type `unit`/`lesson` không lọc
  theo course, **cả 2 cấu trúc trên hiển thị lẫn vào nhau trên UI** — cần xác nhận với người
  phụ trách nội dung đây là chủ đích (2 mảng nội dung độc lập cùng hiển thị) hay là dữ liệu di
  sản cần dọn/gán lại `parent_id` đúng trước khi coi là "sạch".
- `node_lessons` (bảng cầu nối `curriculum_nodes` ↔ `lessons` cũ) có 36 dòng — khớp với 36
  "Buổi", gợi ý nhánh "Buổi" là nhánh chính thống được liên kết đầy đủ; nhánh "Unit N" độc lập
  có thể là import sau, chưa nối `node_lessons`.

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Có — kỹ năng Listening/Shadowing dùng audio (chưa khảo sát chi tiết nguồn file
  âm thanh trong phiên này).
- Ràng buộc bản quyền: dựa trên giáo trình "Mindset for IELTS Foundation" — cần xác nhận với
  người phụ trách về giới hạn sử dụng nội dung gốc trước khi mở rộng thêm bài mới.

## 5. Liên kết với Luyện tập

- Môn này **không có** bộ luyện tập tương ứng trong `docs/luyen-tap/` — không dùng
  `assessment_collections`/`question_bank`. Nếu sau này muốn thêm phần luyện tập/kiểm tra dạng
  câu hỏi cho IELTS, đó sẽ là 1 luồng mới hoàn toàn theo `docs/exam_bank.md`, không tái dùng
  trực tiếp `curriculum_nodes` của môn này (dù có thể liên kết qua `concept_id`/`tags`).
- Trước đây `getAssessmentMap` (trang `/luyen-tap`) từng gộp nhầm đề "mindset-ielts" vào
  "tieng_anh" lớp 7 — lỗi này đã được gỡ, xem `docs/exam_bank.md` mục 2.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 3 ở trên trước khi sửa — đặc biệt cảnh báo về 2 cấu trúc unit song song
- [ ] Trước khi thêm bài mới, xác định rõ nó thuộc nhánh "Buổi" (giáo trình chính, có
      `parent_id`) hay nhánh "Unit N" độc lập (luyện nghe tổng kết) — không tạo thêm node
      không có `parent_id` một cách tuỳ tiện, dễ làm rối cấu trúc thêm
- [ ] Nếu phát hiện đây là lỗi dữ liệu (không phải chủ đích), báo người phụ trách trước khi tự
      ý sửa `parent_id` hàng loạt — có thể ảnh hưởng tới bài học đang hiển thị cho học sinh
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm rõ/sửa cấu trúc

## 7. Lịch sử / ghi chú quan trọng

- 2026-07-10: khảo sát lần đầu phát hiện cấu trúc 2 nhánh unit song song mô tả ở mục 3 — chưa
  rõ đây là chủ đích thiết kế hay dữ liệu cần dọn, cần hỏi người phụ trách nội dung môn này
  trước khi có thay đổi cấu trúc lớn.
