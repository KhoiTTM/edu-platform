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
  unit → lesson`), không phải lesson-engine kiểu Duolingo, không phải flipbook ảnh scan —
  **ngoại lệ: `flow-book/page.tsx` không còn đọc DB nữa, xem mục 3b.**

### 1b. 7 dạng bài (khảo sát trực tiếp Supabase — 2026-07-12)

Tất cả cùng nguồn `curriculum_nodes` (content_source `mindset-foundation`, 97 node
`unit`+`lesson`), mỗi trang lọc theo `metadata.skill_focus` hoặc regex tiêu đề:

| Trang | Route | Số bài | Cách lọc |
|---|---|---|---|
| Tổng quan (36 Buổi) | `/mindset-ielts` | 97 | không lọc, gắn nhãn kỹ năng theo tiêu đề |
| Listening | `/listening` | 70 gắn tag (68 có `youtube_id`) | `skill_focus==='listening'` hoặc regex hoặc có video |
| Shadowing | `/shadowing` | 55 | `skill_focus==='shadowing'` **và** có transcript trong `lib/shadowingData.ts` (~18k dòng) |
| Grammar | `/grammar` | 18 | `skill_focus==='grammar'` hoặc regex |
| Reading | `/reading` | 11 | tương tự |
| Writing | `/writing` | 10 | tương tự |
| Speaking | `/speaking` | 9 | tương tự |
| Flow Book | `/flow-book` | — (đã đổi cơ chế, xem mục 3b) | không còn đọc DB |

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
- **Cấu trúc 2 nhánh unit song song — ĐÃ XÁC NHẬN LÀ CHỦ ĐÍCH (2026-07-12), không phải lỗi
  dữ liệu:**
  1. **36 unit "Buổi N"** (`parent_id` trỏ đúng vào course "IELTS Foundation", slug
     `unit-1`..`unit-36`) — giáo trình chính, "Buổi 1: U1 - Daily Life (Reading &
     Vocabulary)" → ... → "Buổi 36: Review & Final Assessment", 10 chủ đề (U1 Daily Life ..
     U10 Tech) chia 3-4 buổi/chủ đề theo 4 kỹ năng.
  2. **6 unit "Unit N: {Topic}"** (`parent_id: null`, slug `mindset-unit-2/4/5/7/8/9`) — chứa
     55 `lesson` con slug `luyen-nghe-a2-...`. **Đã xác nhận: đây là nguồn Shadowing/Dictation
     thật** — các bài này có transcript đầy đủ trong `lib/shadowingData.ts` (~18k dòng), dùng
     audio "luyện nghe A2" làm ngữ liệu cho bài tập chép chính tả/shadowing, không phải dữ
     liệu lạc. Tên slug gây hiểu lầm ban đầu (đợt khảo sát 2026-07-10) nhưng nội dung có mục
     đích rõ ràng.
- Vì `page.tsx` (tổng quan) lấy toàn bộ node type `unit`/`lesson` không lọc theo course, cả 2
  nhánh trên vẫn hiển thị lẫn vào nhau ở trang tổng quan — chấp nhận được vì đây là chủ đích,
  không cần tách riêng.
- `node_lessons` (bảng cầu nối `curriculum_nodes` ↔ `lessons` cũ) có 36 dòng — khớp với 36
  "Buổi", nhánh "Unit N" (Shadowing) chưa nối `node_lessons` — không ảnh hưởng vì trang
  Shadowing đọc trực tiếp `curriculum_nodes` + `lib/shadowingData.ts`, không qua bảng cầu nối.

## 3b. Flow Book — đã đổi từ đọc DB sang link ngoài (2026-07-12)

- **Trước:** `flow-book/page.tsx` query `curriculum_nodes`, lọc whitelist slug cứng
  (`unit-8`..`unit-35`), hiển thị danh sách card link vào `/learn/mindset-ielts/{slug}`
  (Universal Learning Engine). Có 1 comment sai lệch với code thực tế ("Unit 3 through Unit
  10 are supported" nhưng whitelist thực chất là `unit-8`..`unit-35`, tức "Buổi 8" đến "Buổi
  35", không phải "Unit 3-10" theo nghĩa chủ đề).
- **Sau:** trang không còn đọc DB — chỉ hiển thị 1 nút/thẻ đơn giản yêu cầu học sinh mở link
  flipbook ngoài trong tab mới: `https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p=1`.
  Không xoá `curriculum_nodes` liên quan (28 node slug `unit-8`..`unit-35`) khỏi Supabase —
  các node này vẫn được dùng chung ở trang tổng quan và các trang kỹ năng khác (Listening,
  Grammar...), chỉ riêng Flow Book thôi query chúng.
- Đây là 1 trong 2 cơ chế "mở link ngoài" của hệ thống (không dùng `exams.external_url` như
  luồng exam-bank ở `docs/exam_bank.md` mục 6d/7.3, vì môn này không đi qua exam-bank) — chỉ
  đơn giản là `<a href target="_blank">` trong component học bài.

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

- [ ] Đọc mục 3, 3b ở trên trước khi sửa
- [ ] Trước khi thêm bài mới, xác định rõ nó thuộc nhánh "Buổi" (giáo trình chính, có
      `parent_id`) hay nhánh "Unit N" độc lập (Shadowing/Dictation) — 2 nhánh này là chủ đích,
      không tự ý gộp/xoá
- [ ] Nếu sửa Flow Book, nhớ đây giờ chỉ là link tĩnh, không cần đồng bộ với
      `curriculum_nodes` nữa — nếu muốn quay lại đọc DB, xem lại mục 3b để hiểu whitelist cũ
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm rõ/sửa cấu trúc

## 7. Lịch sử / ghi chú quan trọng

- 2026-07-10: khảo sát lần đầu phát hiện cấu trúc 2 nhánh unit song song — lúc đó chưa rõ chủ
  đích hay lỗi.
- 2026-07-12: đã xác nhận với người phụ trách — nhánh "Unit N" (55 bài `luyen-nghe-a2-...`) là
  nguồn Shadowing/Dictation thật có transcript đầy đủ, không phải dữ liệu lạc. Đồng thời đổi
  Flow Book từ đọc `curriculum_nodes` sang hiển thị link flipbook ngoài
  (`https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p=1`) — không xoá dữ liệu DB
  liên quan vì các node đó vẫn dùng chung ở trang tổng quan/kỹ năng khác.
