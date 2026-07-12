# Học bài — KHTN 7

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập. Phần luyện tập tương ứng: `docs/luyen-tap/khtn-7.md`.

## 1. Route & component chính

- Route học sinh học thật sự dùng: **`/learn/khtn/lop-7`** (và các node con như
  `/learn/khtn/bai-3-bang-tuan-hoan`) — trang chọn môn `/hoc-tap/page.tsx` (`getSubjectLink()`)
  link thẳng tới `/learn/{slug}/lop-{grade}` cho mọi môn thường, chỉ đặc cách
  `mindset-ielts`/`pre-a1-starter` đi qua `/hoc-tap/{slug}`. Cùng route/engine với Toán 7 —
  xem `docs/hoc-bai/toan-7.md` mục 1.
- Component chính: `components/universal/LearnNodeClient.tsx`.
- Kiểu học: **Universal Learning Engine** (`curriculum_nodes` phân cấp `course → unit →
  lesson`).
- ⚠️ **Route chết không dùng tới:** `app/(app)/(learning)/hoc-tap/[subject]/page.tsx` — nếu
  vào tay bằng URL `/hoc-tap/khtn` (không qua link nào trong app) sẽ 404, vì file này query
  bảng `lessons` **đã không còn tồn tại** trong Supabase (verify trực tiếp:
  `PGRST205 - Could not find the table 'public.lessons'`). Không ảnh hưởng học sinh vì không
  route nào trong app trỏ tới URL này cho môn KHTN — chỉ là code chết, dọn hoặc để đó đều
  không gấp. Xem mục 7 để biết lý do từng nghi ngờ đây là lỗi thật.

## 2. Nguồn nội dung bài học

- Nội dung nằm trong **DB**:
  - `universal_subjects` — slug `khtn`, tên "Khoa học tự nhiên".
  - `content_sources` — slug `khtn-7-ket-noi` (sách Kết nối tri thức) — **cùng
    `source_slug` được dùng lại trong `scripts/migrate-khtn7-bai-to-db.ts` cho phần luyện
    tập** (xem `docs/luyen-tap/khtn-7.md` mục 2), nghĩa là Học bài và Luyện tập của KHTN 7
    chia sẻ chung 1 `content_source`, khác với Toán 7 (2 hệ tách biệt hơn).
  - `curriculum_nodes` — 1 `course` ("KHTN lớp 7", slug `lop-7`) → 8 `unit` (chương, VD
    "Chương I: Nguyên tử. Sơ lược về bảng tuần hoàn các nguyên tố hoá học") → 42 `lesson`
    (bài) — **khớp đúng 42 bài** với bộ luyện tập SBT (Bài 1–42).

## 3. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **51 `curriculum_nodes`**: 1 course, 8 unit, 42 lesson — đầy đủ cả 42 bài, khớp 1-1 với số
  bài đã seed ở phần luyện tập. Học sinh truy cập bình thường qua `/learn/khtn/lop-7` (xem
  mục 1) — đã xác nhận đây là đường đi thật qua `getSubjectLink()` trong `/hoc-tap/page.tsx`,
  không có 404 trên luồng thực tế.

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? Không (chỉ ký hiệu hoá học đơn giản).
- Có audio/TTS? Không.
- Ràng buộc bản quyền: bám theo SGK Kết nối tri thức, giống cách luyện tập bám sách bài tập
  (xem `docs/luyen-tap/khtn-7.md`).

## 5. Liên kết với Luyện tập

- Có bộ luyện tập tương ứng: `docs/luyen-tap/khtn-7.md` — 42 bài học bài khớp đúng 42 bài
  luyện tập, tỷ lệ 1-1 hiếm thấy so với các môn khác (thường học bài có phạm vi khác luyện
  tập).
- Chia sẻ `content_source` (`khtn-7-ket-noi`) giữa 2 phần — khi sửa 1 bên (VD đổi tên bài),
  cân nhắc ảnh hưởng bên còn lại vì cùng trỏ 1 nguồn.

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 1-2 ở trên trước khi sửa — dùng đúng route `/learn/khtn/...`
- [ ] Nếu sửa `LearnNodeClient.tsx` hoặc cấu trúc `curriculum_nodes`, kiểm tra ảnh hưởng tới
      cả Toán 7 (component/engine dùng chung)
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm

## 7. Lịch sử / ghi chú quan trọng

- 2026-07-10: lúc khảo sát ban đầu, nghi ngờ nhầm route `/hoc-tap/[subject]/page.tsx` (query
  bảng `lessons` đã không còn tồn tại — verify `PGRST205`) là đường đi thật của học sinh cho
  KHTN 7, tưởng đây là lỗi 404 nghiêm trọng đang ảnh hưởng người dùng. Sau khi kiểm tra kỹ
  `getSubjectLink()` trong `/hoc-tap/page.tsx`, xác nhận route đó **không** được dùng cho KHTN
  — mọi môn thường (trừ `mindset-ielts`/`pre-a1-starter`) đều link thẳng tới
  `/learn/{slug}/lop-{grade}`. `/hoc-tap/[subject]/page.tsx` là code chết với KHTN, không phải
  lỗi ảnh hưởng thực tế. **Bài học:** khi nghi ngờ 1 lỗi runtime nghiêm trọng, phải verify
  toàn bộ đường link/điều hướng thật (không chỉ đọc 1 file bị nghi ngờ) trước khi báo cáo là
  lỗi — tránh báo động giả.
