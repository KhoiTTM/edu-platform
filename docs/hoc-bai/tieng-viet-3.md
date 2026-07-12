# Học bài — Tiếng Việt 3

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. **Chưa có bộ luyện tập tương ứng** trong
> `docs/luyen-tap/` — môn này hiện chỉ tồn tại ở phần Học bài.

## 1. Route & component chính

- Route học sinh học: `/hoc-tap` (trang chọn môn) → `getSubjectLink()` → `/learn/tieng_viet/lop-3`
  (dùng slug có gạch dưới `tieng_viet`, xem cảnh báo mục 2) → render qua
  `/learn/[subject]/[node]/page.tsx`.
- Component chính: `components/universal/LearnNodeClient.tsx` (dùng chung với các môn khác).
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes`), nhưng cấu trúc phẳng hơn các
  môn khác — chỉ có `subject → unit` (chủ điểm), chưa thấy `lesson` con.

## 2. Nguồn nội dung bài học

- ⚠️ **2 `universal_subjects` gần giống tên, dễ nhầm:**
  - `tieng-viet` (gạch nối) — `content_sources`: **0 nguồn**, không có dữ liệu.
  - `tieng_viet` (gạch dưới) — có dữ liệu thật, 2 `content_sources`:
    - `tieng-viet-3-kntt` (6 nodes) — sách Kết nối tri thức, có dữ liệu.
    - `minhkhoi/tieng_viet_3` (0 nodes) — tên lạ (có dạng path `user/repo`), rỗng, có thể là
      thử nghiệm/nhầm lẫn khi tạo source, không phải nguồn chính thức.
  - **Khi thêm nội dung Tiếng Việt 3, dùng đúng `subject_slug: tieng_viet` (gạch dưới) và
    `content_source: tieng-viet-3-kntt`** — không tạo thêm dưới `tieng-viet` (gạch nối) vì sẽ
    tạo thêm 1 nhánh dữ liệu song song không được route nào đọc tới.
- `curriculum_nodes` trong `tieng-viet-3-kntt`: 1 `subject` node ("Tiếng Việt 3", slug
  `tieng_viet`), 1 `course` ("Tiếng Việt lớp 3", slug `lop-3`), 4 `unit` (Chủ điểm 1–4: "Những
  trải nghiệm thú vị", "Mái trường mến yêu", "Mái nhà yêu thương", "Cộng đồng gắn bó") — chưa
  thấy `lesson` con nào trong 6 nodes này.

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **6 `curriculum_nodes`** dưới `tieng-viet-3-kntt`: chỉ có subject + course + 4 chủ điểm,
  **chưa có `lesson` (bài học) nào bên trong từng chủ điểm** — nội dung mới ở mức khung sườn,
  chưa soạn bài thật.
- **Chưa có bộ luyện tập** cho môn này trong `docs/luyen-tap/` — không có `assessment_collections`
  nào với `subject_slug` liên quan đến `tieng_viet`/`tieng-viet` (đã khảo sát toàn bộ
  `subject_slug` hiện có trong luyện tập ở phiên trước: chỉ có `toan`, `khtn`, `tieng_anh`,
  `pre-a1-starter`, `tieng-anh-7` — không có Tiếng Việt).

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Chưa rõ — nội dung còn quá sơ khai để đánh giá.
- Ràng buộc bản quyền: bám theo SGK Kết nối tri thức (dự kiến, dựa theo tên source).

## 5. Liên kết với Luyện tập

- **Chưa có.** Nếu triển khai luyện tập cho môn này sau này, làm theo `docs/exam_bank.md`,
  tạo file mới `docs/luyen-tap/tieng-viet-3.md` theo `_template.md`.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2 ở trên trước khi thêm bất kỳ gì — dùng đúng `subject_slug: tieng_viet` (gạch
      dưới), đúng `content_source: tieng-viet-3-kntt`
- [ ] Môn này còn thiếu `lesson` thật trong cả 4 chủ điểm — cần soạn nội dung trước khi học
      sinh có thể học được gì
- [ ] Cân nhắc dọn 2 nguồn rỗng (`tieng-viet` subject, `minhkhoi/tieng_viet_3` source) nếu xác
      nhận không dùng — hỏi người phụ trách trước khi xoá
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi soạn thêm nội dung

## 7. Lịch sử / ghi chú quan trọng

- 2026-07-10: khảo sát lần đầu phát hiện 2 `universal_subjects` gần giống tên
  (`tieng-viet`/`tieng_viet`) và 1 `content_source` rỗng tên lạ (`minhkhoi/tieng_viet_3`) — có
  vẻ là dữ liệu thử nghiệm/nhầm lẫn còn sót lại, chưa xác nhận với người phụ trách nên chưa tự
  ý xoá.
