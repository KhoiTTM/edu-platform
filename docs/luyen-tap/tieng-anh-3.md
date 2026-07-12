# Luyện tập — Tiếng Anh 3

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `tieng_anh`
- `grade`: `3`
- `volume`: `1` (Global Success — chưa thấy dữ liệu Tập 2 trong DB tính đến thời điểm khảo sát)
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 1 — Ngân hàng câu hỏi, đề rút mẫu**, chia
  theo 10 Unit của Tập 1.

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **121 collections, 121 exams, 2416 câu hỏi** đã seed.
- `exam_type: null` (120 collections) — trải đều 10 unit (`units: [1]` .. `[10]`), title hiển
  thị `"SBT Tiếng Anh 3 - Tập 1"`.
- `exam_type: midterm` (1 collection, `units: [1]`) — đề giữa kỳ.
- **Cùng đặc điểm với Toán 3: phần lớn dữ liệu KHÔNG có file JSON nguồn đầy đủ còn lại trong
  repo.** Chỉ có:
  - `content/exam-bank/tieng-anh/tienganh3-tap1-unit1.json` (349 dòng) — có vẻ là bản soạn tay
    mẫu cho Unit 1, dùng để tham khảo cú pháp trước khi các unit sau chuyển sang cách
    Procedural.
  - `content/wordlists/tienganh3-tap1-wordlist.json` — từ điển từ vựng nguồn (word, phonetic,
    meaning), dùng làm dữ liệu đầu vào cho script procedural, KHÔNG phải câu hỏi soạn sẵn.
  - `content/assessments/imported/imported_2026_05_28_tienganh3_1.json` — 1 file đã import qua
    luồng phụ Gemini Pro Web (xem `content/assessments/AGENT_INSTRUCTIONS.md`), không phải
    nguồn chính cho toàn bộ 10 unit.

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice` (chủ yếu — dịch nghĩa, ngữ pháp, phát âm).
- **Cách tạo đề: Procedural, giống Toán 3.** `scripts/seed-english3-dynamic-assessments.ts`
  định nghĩa sẵn 1 dictionary `themes` (10 theme, mỗi theme gồm `vocab`, `grammar`, `qWords`,
  `phonics`) tương ứng 10 unit, sinh câu hỏi bằng code rồi `INSERT` thẳng qua Supabase client
  — không qua file JSON trung gian, không qua `scripts/seed-exam-bank.ts`.
- Có script hỗ trợ: `scripts/generate-tienganh3-sql.ts` (sinh SQL trực tiếp — cách tiếp cận
  khác nữa, cần kiểm tra còn dùng hay đã thay bằng script TS ở trên trước khi chạy lại),
  `scripts/cleanup-tienganh3.ts` (dọn dữ liệu môn này khi cần seed lại từ đầu).
- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? Không thấy trong script hiện tại (khác Pre A1 Starter — môn cùng khối lớp 3
  nhưng có TTS).
- Ràng buộc bản quyền: nội dung soạn mới/sinh bằng code dựa trên wordlist tự tổng hợp, không
  sao chép nguyên văn SBT Global Success có bản quyền.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi thêm đề — môn này KHÔNG theo luồng "soạn JSON →
      `seed-exam-bank.ts`" mặc định cho phần lớn dữ liệu đã có
- [ ] Trước khi chạy lại `seed-english3-dynamic-assessments.ts` hoặc
      `generate-tienganh3-sql.ts`, xác nhận xem cả hai còn đồng bộ logic hay 1 trong 2 đã lỗi
      thời — không chạy cả hai cho cùng 1 unit nếu chưa chắc chúng tạo cùng kết quả
- [ ] Nếu thêm Tập 2: cân nhắc soạn theo JSON chuẩn (`content/exam-bank/tieng-anh/`) thay vì
      tiếp tục mở rộng dictionary procedural — dễ đối chiếu/backup hơn, và giữ nhất quán với
      cách đã làm cho Tiếng Anh 7 (xem `docs/luyen-tap/tieng-anh-7.md`)
- [ ] Nếu cần dọn/seed lại: `npx tsx scripts/cleanup-tienganh3.ts` trước, rồi seed lại — kiểm
      tra kỹ script này xoá đúng phạm vi (chỉ Tiếng Anh 3, không đụng môn khác)
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed thêm

## 5. Lịch sử / ghi chú quan trọng

- Cùng rủi ro như Toán 3: thiếu file JSON nguồn đầy đủ cho 10 unit, khó khôi phục nhanh nếu
  DB mất dữ liệu ngoài chạy lại script procedural.
- `content/assessments/imported/imported_2026_05_28_tienganh3_1.json` cho thấy môn này từng
  dùng cả luồng import phụ (Gemini Pro Web, xem `content/assessments/AGENT_INSTRUCTIONS.md`)
  song song với procedural — nếu thấy dữ liệu trùng/lệch khi audit, kiểm tra cả 2 nguồn này.
