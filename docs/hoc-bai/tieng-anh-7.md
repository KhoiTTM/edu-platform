# Học bài — Tiếng Anh 7

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Phần luyện tập tương ứng: `docs/luyen-tap/tieng-anh-7.md`.

## 1. Route & component chính

- Route học sinh học: `/hoc-tap` (trang chọn môn) → `getSubjectLink()` link thẳng tới
  `/learn/tieng-anh-7/lop-7` → render qua `/learn/[subject]/[node]/page.tsx`.
- Component chính: `components/universal/LearnNodeClient.tsx` (dùng chung với các môn khác).
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `course → unit →
  lesson`).

## 2. Nguồn nội dung bài học

- `universal_subjects` — slug `tieng-anh-7` (**riêng biệt** với `tieng_anh` của lớp 3 — 2
  `universal_subjects` khác nhau dù cùng là môn Tiếng Anh, xem `docs/hoc-bai/tieng-anh-3.md`).
- `content_sources` — **2 nguồn**:
  - `tieng-anh-7-global-success` (105 nodes) — sách giáo khoa, dùng cho phần Học bài.
  - `tieng-anh-7-global-success-sbt` (**0 nodes**) — tồn tại nhưng rỗng hoàn toàn. Đây có vẻ
    là `content_source` từng định dùng cho sách bài tập (SBT) qua Universal Learning Engine,
    nhưng thực tế phần luyện tập SBT lại đi theo đường khác (schema exam-bank
    `assessment_collections`, xem `docs/luyen-tap/tieng-anh-7.md`) — **source rỗng này có thể
    là di sản chưa dọn**, không phải lỗi cần sửa gấp nhưng đáng lưu ý khi audit
    `content_sources`.
- `curriculum_nodes` (trong `tieng-anh-7-global-success`) — 1 `course` ("Tiếng Anh lớp 7",
  slug `lop-7`) → 16 `unit` → 88 `lesson` (nhiều loại: "Getting Started", "Review N", bài
  thường).

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **105 `curriculum_nodes`** dưới `tieng-anh-7-global-success`: 1 course, 16 unit, 88 lesson.
- `tieng-anh-7-global-success-sbt` tồn tại như 1 `content_source` riêng nhưng **0 nodes** —
  không dùng, xem cảnh báo mục 2.
- So với luyện tập (`docs/luyen-tap/tieng-anh-7.md`): luyện tập SBT có đúng 12 unit (khớp
  sách bài tập thật), trong khi Học bài (SGK) có 16 unit — **đây là 2 sách khác nhau** (SGK
  16 unit vs SBT 12 unit), không phải lệch dữ liệu.

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Chưa khảo sát chi tiết trong phiên này.
- Ràng buộc bản quyền: bám theo SGK Global Success (khác SBT Global Success dùng ở luyện tập
  — cùng bộ sách nhưng khác quyển).

## 5. Liên kết với Luyện tập

- Có bộ luyện tập tương ứng: `docs/luyen-tap/tieng-anh-7.md` — nhưng **Học bài dùng SGK (16
  unit), Luyện tập dùng SBT (12 unit)** — 2 nguồn sách khác nhau của cùng bộ Global Success,
  không phải cùng 1 tài liệu chia 2 nơi hiển thị.
- `content_source` rỗng `tieng-anh-7-global-success-sbt` gợi ý từng có ý định đưa SBT vào
  Universal Learning Engine (Học bài) nhưng cuối cùng SBT lại đi theo exam-bank (Luyện tập) —
  nếu cần làm rõ ý định thiết kế ban đầu, hỏi người phụ trách trước khi xoá source rỗng này.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi sửa — phân biệt rõ SGK (học bài, 16 unit) và SBT (luyện
      tập, 12 unit), đừng nhầm 2 nguồn
- [ ] Nếu dọn dẹp `content_sources`, cân nhắc `tieng-anh-7-global-success-sbt` (0 nodes) có
      nên xoá hay giữ làm chỗ đặt trước cho tương lai — hỏi trước khi xoá
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm

## 7. Lịch sử / ghi chú quan trọng

(Chưa có ghi chú riêng — bổ sung khi có quyết định/lỗi đáng nhớ về môn này)
