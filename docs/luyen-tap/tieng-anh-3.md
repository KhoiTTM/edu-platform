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

## 2. Trạng thái hiện tại (2026-07-12 — đã XOÁ SẠCH sau audit, xem mục 5)

- **0 collections.** Tab "Luyện tập theo sách bài tập" hiện trống hoàn toàn cho Tiếng Anh 3 —
  đây là chủ đích, không phải sự cố.
- Trạng thái trước khi xoá (2026-07-10): 121 collections, 121 exams, 2416 câu hỏi — 120
  collection `exam_type: null` (10 unit) sinh bằng procedural script + 1 collection
  `exam_type: midterm` lạc (đã xoá riêng trước, xem mục 5).
- File backup trước khi xoá: `content/exam-bank/tieng-anh/tienganh3-tap1-procedural-BACKUP-before-delete-2026-07-12.json`
  (120 collection, 2400 câu, xuất trực tiếp từ Supabase) — giữ lại để tham khảo cách soạn cũ,
  KHÔNG dùng để seed lại (nội dung không bám sách, xem mục 5 lý do xoá).
- File JSON khác vẫn còn trong repo (không liên quan bộ đã xoá):
  - `content/exam-bank/tieng-anh/tienganh3-tap1-unit1.json` (349 dòng) — bản soạn tay mẫu bám
    đúng cấu trúc sách (section A-E, có Phonics/crossword) — **đây là hình mẫu nên theo khi
    soạn lại**, xem mục 6.
  - `content/wordlists/tienganh3-tap1-wordlist.json` — từ điển từ vựng nguồn (word, phonetic,
    meaning), dùng làm dữ liệu đầu vào cho script procedural cũ.
  - `content/assessments/imported/imported_2026_05_28_tienganh3_1.json` — 1 file đã import qua
    luồng phụ Gemini Pro Web (xem `content/assessments/AGENT_INSTRUCTIONS.md`).

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

- **2026-07-12 — Xoá toàn bộ 120 collection procedural, tab "Theo sách bài tập" chờ soạn
  lại:** audit theo yêu cầu người phụ trách phát hiện toàn bộ dữ liệu Unit 1-10 (sinh bằng
  `scripts/seed-english3-dynamic-assessments.ts`) **không hề bám theo dạng bài thật của SBT
  Global Success**. So sánh trực tiếp với file mẫu soạn tay
  (`tienganh3-tap1-unit1.json`, đúng cấu trúc section A-E "PHONICS", có `crossword`) thì dữ
  liệu thật trên DB chỉ là câu hỏi dịch nghĩa từ vựng qua lại
  ("What is the correct English word for...", "Choose the odd one out", "Rearrange the
  letters...") — không có Phonics/Read-and-match/Make-sentences như sách. Nhiều câu còn lặp
  gần giống hệt nhau (chỉ đổi vị trí đáp án). Người phụ trách quyết định **xoá sạch để thiết
  kế lại**, giữ nguyên tab UI (sẽ tự hiện lại khi seed đề mới, xem mục 2). Đã backup trước khi
  xoá — xem mục 2.
- Trước đó (còn hiệu lực cho collection `exam_type: midterm` lạc, id `e8919f74...`, đã xoá
  riêng cùng ngày): title trùng "SBT Tiếng Anh 3 - Tập 1" nhưng chỉ có 1 đề 16 câu, tạo tab
  "Ôn Tập" gần như trống — không phải đề giữa kỳ thật.
- `content/assessments/imported/imported_2026_05_28_tienganh3_1.json` cho thấy môn này từng
  dùng cả luồng import phụ (Gemini Pro Web, xem `content/assessments/AGENT_INSTRUCTIONS.md`)
  song song với procedural — không liên quan tới đợt xoá này, vẫn còn trong repo.

## 6. Hướng soạn lại (khi thiết kế lại "Luyện tập theo sách bài tập")

- Theo đúng nguyên tắc SBT bám sách (giống Tiếng Anh 7/KHTN 7, xem `exam_bank.md` mục 7):
  chép/gõ lại **y như bản in gốc** từ PDF `content/pdfs/sbt/sbt_tienganh3.pdf`, không diễn giải
  lại, không đổi số liệu.
- Dùng `content/exam-bank/tieng-anh/tienganh3-tap1-unit1.json` làm hình mẫu cấu trúc (section
  A-E, các `type` tương ứng theo bảng mapping ở `exam_bank.md` mục 5b) — dù mục 5b viết riêng
  cho Tiếng Anh 3 SBT, đã có sẵn từ trước, dùng lại được.
- Soạn theo quy trình chuẩn ở `exam_bank.md` mục 4: soạn JSON trong `content/exam-bank/tieng-anh/`
  trước, seed bằng `scripts/seed-exam-bank.ts`, giữ lại JSON làm backup — **không lặp lại
  cách procedural cũ** (sinh bằng code, không JSON nguồn) vì đó là nguyên nhân khiến nội dung
  trôi khỏi sách thật mà không ai phát hiện sớm.
