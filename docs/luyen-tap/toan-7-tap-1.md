# Luyện tập — Toán 7, Tập 1

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `toan`
- `grade`: `7`
- `volume`: `1`
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 1 — Ngân hàng câu hỏi, đề rút mẫu**
  (1 concept/bài → nhiều đề "Đề 1", "Đề 2"...), cộng thêm các collection tổng hợp
  `exam_type: review/final` (ôn tập, kiểm tra giữa kỳ, thi HK1) gộp nhiều bài lại.

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **10 collections**, **127 exams** đã seed:
  - `Toán 7 - Tập 1 - Bài {1,2,3,4,5} - Đề {N}` — `exam_type: null`, `units: [1]..[5]` (mỗi bài
    có ít nhất 1 đề riêng, Bài 4 có 2 đề).
  - `Toán 7 - Ôn Lý Thuyết Tập 1` — `exam_type: review`, `units: [200]` (số ảo, không phải số
    bài thật — đánh dấu nhóm ôn tập lý thuyết, không phải luyện theo bài học).
  - `Kiểm Tra Giữa Kỳ 1` — `exam_type: final`, `units: [101]`.
  - `Toán 7 - Tập 1 - Bài 102 - Đề 1`, `Toán 7 - Thi HK1 - Đề 01` — cả hai `exam_type: review`,
    `units: [102]` (đề tổng hợp ôn thi HK1, không phải "bài 102" thật).
- **Chưa làm**: Bài 6 trở đi của Tập 1 (SGK Toán 7 Tập 1 — Kết nối tri thức — còn nhiều bài
  chưa có đề luyện tập riêng).
- Nguồn soạn thảo (JSON): `content/exam-bank/toan7/` — gồm
  `toan7-hk1-de01/02/03.json`, `toan7-ly-thuyet-tap1.json`, `toan7-pilot-hk1.json`,
  `toan7-review-hk1.json`.
- Script seed: `scripts/seed-exam-bank.ts content/exam-bank/toan7/<file>.json` (generator
  chuẩn, không có script riêng cho môn này).

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice`, `fill_blank`.
- Có công thức toán (KaTeX)? **Có — bắt buộc.** Mọi câu có ký hiệu toán học phải bọc
  `$...$` theo đúng quy ước ở `exam_bank.md` mục 3b (bao gồm cách escape `\\` trong JSON).
  Đã có sự cố CSS KaTeX không load khiến công thức hiển thị vỡ (xem mục 5) — nếu thấy công
  thức lỗi lại, kiểm tra `app/layout.tsx` có còn `import "katex/dist/katex.min.css"` không
  trước khi nghi ngờ dữ liệu.
- Có audio/TTS? Không.
- Ràng buộc bản quyền: nội dung soạn mới (không sao chép nguyên văn sách có bản quyền) —
  khác với dạng "bám sách bài tập 1-1" (SBT) của KHTN 7/Tiếng Anh 7.
- Quy ước `units` riêng: dùng số ảo `101`, `102`, `200` để nhóm các đề tổng hợp
  (giữa kỳ, ôn thi HK1, ôn lý thuyết) tách khỏi các bài học thật (`units: [1]`, `[2]`...) —
  xem `exam_bank.md` mục 6c về nguyên tắc chung của `units`.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Soạn JSON theo template ở `exam_bank.md` mục 3, đặt trong `content/exam-bank/toan7/`
- [ ] Nếu câu có công thức toán, verify LaTeX render đúng trên UI thật trước khi coi là xong
      (không chỉ tin JSON hợp lệ cú pháp)
- [ ] Seed bằng `npx tsx scripts/seed-exam-bank.ts content/exam-bank/toan7/<file>.json`, verify
      lại số liệu trong Supabase (đếm `exam_questions`, không chỉ tin `total_questions`)
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

- **2026-07-10 — QC "Ôn Lý Thuyết Tập 1":** rà toàn bộ 200 câu, không phát hiện lỗi đáp án
  toán học nào (đã tính lại từng phép tính). Phát hiện 70/200 câu lặp lại y hệt giữa các đề
  (đề 1≈5≈9, 2≈6≈10, 3≈7, 4≈8) — theo quyết định của người phụ trách môn, **giữ nguyên không
  sửa** (không phải lỗi, chỉ là trùng lặp nội dung ôn tập).
- **2026-07-10 — Lỗi hiển thị công thức toán:** KaTeX được cài và gọi đúng nhưng CSS
  (`katex/dist/katex.min.css`) chưa từng được import vào app, khiến số mũ/phân số/dấu nhân
  render dồn chữ vô nghĩa (VD `2^3 \cdot 2^4` hiện thành "2327"). Đã sửa bằng cách import CSS
  này vào `app/layout.tsx` (áp dụng toàn app, không riêng Toán 7).
