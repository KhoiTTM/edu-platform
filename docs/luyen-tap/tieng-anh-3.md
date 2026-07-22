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

## 2. Trạng thái hiện tại (2026-07-20)

- **Tab "Luyện tập theo sách bài tập" (`exam_type: null`): 10 collections, 10 exams (Unit 1–10)** — Đã soạn hoàn tất và seed lên DB toàn bộ SBT Tập 1, bám sát 100% bản in gốc từ PDF `sbt_tienganh3.pdf` (xem chi tiết mục 5).
- **Tab "Ôn Tập" (`exam_type: review`): 1 collection, 15 exams, 300 câu** — "Tiếng Anh 3 - Ôn
  tập tổng hợp Học kỳ 1", `units: [201]` (số ảo đánh dấu nhóm ôn tập tổng hợp, theo đúng quy
  ước chung ở `exam_bank.md` mục 6c). Bám sát cả 10 unit của SGK (không phải SBT) — nguồn:
  `content/pdfs/sgk/sgk_tienganh3-tap1.pdf` (Book map trang 4-5, chi tiết từng unit trang
  10-77). Học sinh bấm "Luyện đề Ngẫu nhiên" để random 1 trong 15 đề, mỗi đề 20 câu rải đều
  ~2 câu/unit, kết hợp `multiple_choice`/`fill_blank`/`matching`. Nguồn soạn:
  `content/exam-bank/tieng-anh/tienganh3-hk1-review-full.json`.
  **Lưu ý quan trọng:** MỌI đề trong bộ này đều phủ đều cả 10 unit (2 câu/unit/đề), KHÔNG có đề
  nào chỉ tập trung vào 1 nhóm unit hẹp — dù ban đầu tiêu đề 9/15 đề ghi kiểu "Đề 1 (Unit 1-3)"
  gây hiểu nhầm là đề đó chỉ hỏi unit 1-3. Đã sửa lại tiêu đề ngày 2026-07-15 để khớp thực tế
  (xem mục 5). Nếu cần đề ôn tập CHỈ riêng 1 nhóm unit hẹp (không phủ hết 10 unit), phải soạn
  JSON mới, không dùng lại bộ này.
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

- [x] Đã soạn xong và seed hoàn toàn tab Luyện tập theo SBT cho Tập 1 (Unit 1-10) bám sát sách 100%.
- [ ] Nếu thêm Tập 2 (Unit 11-20): soạn theo JSON chuẩn (`content/exam-bank/tieng-anh/tienganh3-tap2-unit{11..20}.json`), bám sát các trang 52–95 của SBT gốc, sau đó dùng `seed-exam-bank.ts` để seed.
- [ ] Sau khi seed, chạy check các collection mới trên DB để verify.
- [x] Đã cập nhật `app/(app)/(assessment)/test-assessment/page.tsx` hiển thị số trang thực tế (ví dụ: "Sách: Trang 4 - 7") cho học sinh dễ cuộn đúng trang trên iframe.
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed thêm Tập 2.

## 5. Lịch sử / ghi chú quan trọng

- **2026-07-22 — Sửa lỗi "không chọn được đáp án" ở dạng bài `matching`/`match_pair`:**
  người dùng báo "rất nhiều câu không chọn được đáp án". Audit toàn bộ câu hỏi
  `multiple_choice`/`fill_blank`/`sentence_reorder`/`matching` (script kiểm tra cấu trúc +
  đọc thủ công nội dung) chỉ tìm thấy 2 câu lỗi thật, cả 2 đều dạng `matching` có **2 cặp
  khác `left` nhưng trùng `right`** (Unit 1 Q9: "1. Hello." và "2. Bye," đều nối "d. Mai.";
  Ôn tập Exam 10 Q11: "Let's go to the library." và "Let's go to the art room." đều nối "OK,
  let's go."). Đọc `components/universal/MatchPairRenderer.tsx` xác nhận đây là bug nghiêm
  trọng ở component, không chỉ lỗi nội dung: `matchedRights` là `Set<string>` lưu theo
  **giá trị text** của đáp án chứ không theo từng cặp/index riêng — khi 2 lựa chọn bên phải
  trùng text, nối xong 1 cặp sẽ khiến CẢ 2 nút cùng text bị khoá (`isMatched`) dù chỉ mới nối
  đúng 1, nút còn lại vĩnh viễn không bấm được nữa → học sinh kẹt cứng, không hoàn thành được
  bài. Đã sửa dữ liệu (đổi 1 vế phải trùng lặp thành đáp án khác biệt hợp lý) cho cả 2 câu,
  seed lại lên DB, verify trực tiếp trên Supabase (0 câu `matching` còn trùng
  left/right trong toàn bộ `tieng_anh` lớp 3). Cũng quét toàn repo (`content/exam-bank`,
  `content/workbooks`) — không còn câu `matching` nào khác bị lỗi tương tự.
  **Ghi chú kỹ thuật quan trọng:** `SentenceReorderRenderer.tsx` chấm bằng cách nối `words`
  đã chọn bằng dấu cách rồi `normalize` (lowercase + xoá TOÀN BỘ whitespace, không xoá dấu
  câu) so với `correct_sentence` — vì vậy `words` tách dấu câu (`?`/`.`/`!`) thành phần tử
  riêng (kiểu Unit 4-7) vẫn chấm đúng được (dấu câu dù đứng tách hay dính từ đều biến mất khi
  xoá whitespace), KHÔNG phải lỗi như nghi ngờ ban đầu — đã verify bằng cách thử mọi hoán vị
  của `words`. Ngược lại, `MatchPairRenderer` chấm theo Set text nên **matching là dạng bài
  duy nhất bắt buộc mọi giá trị `right` (và `left`) trong 1 câu phải duy nhất**, không được
  trùng nhau dù nội dung ngữ nghĩa hợp lý — cần nhớ luật này khi soạn câu `matching` mới
  (nên thêm assert kiểm tra trùng lặp vào quy trình soạn, xem mục "Luật cứng" ở
  `exam_bank.md`).

- **2026-07-20 — Soạn xong và seed hoàn tất SBT Tập 1 (Unit 1-10):** Chuyển đổi dữ liệu và biên soạn tay 100% bám sát SBT gốc (đầy đủ dạng Phonics, Puzzle, Sentence Patterns, Reading, Writing). Dữ liệu được seed lên DB dưới dạng đề 1-1 cố định (`exam_type: null`). Đồng thời đã cập nhật component làm bài `test-assessment/page.tsx` để tự động tính và hiển thị phạm vi trang SBT thực tế (ví dụ: "Sách: Trang 4 - 7" cho Unit 1) dựa trên dữ liệu `units` lấy từ DB.
- **2026-07-12 — Seed bộ "Ôn tập tổng hợp Học kỳ 1" (15 đề × 20 câu = 300 câu), bám cả 10
  unit SGK:** soạn theo đúng quy trình chuẩn — đọc trực tiếp ảnh render từ
  `content/pdfs/sgk/sgk_tienganh3-tap1.pdf` (không có text layer, phải render bằng
  `pypdfium2` do môi trường thiếu `poppler-utils`/`pdftoppm`), soạn JSON, dry-run, seed.
  **Bài học về kiểm tra chất lượng:** lần soạn đầu tiên (15 đề) bị phát hiện 142/300 câu
  (47%) chỉ khác nhau ở hậu tố `"(Đề N)"` dán vào cuối câu hỏi — nội dung/đáp án giống hệt
  nhau, "lách" qua bước kiểm tra trùng lặp text đơn giản. Đã yêu cầu soạn lại, dùng script
  kiểm tra nghiêm ngặt hơn (chuẩn hoá bỏ hậu tố trước khi so sánh, so cả `options`/`pairs`
  đi kèm) — bản soạn lại đạt 282/300 câu (94%) khác nhau thật. **Khi giao AI soạn số lượng
  lớn câu hỏi tương tự nhau, luôn tự verify độc lập bằng cách chuẩn hoá text trước khi so
  trùng lặp — đừng tin báo cáo "0 trùng lặp" nếu không tự kiểm tra lại logic so sánh.**

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

- **2026-07-15 — Sửa tiêu đề gây hiểu nhầm phạm vi unit trong bộ "Ôn tập tổng hợp":** phát hiện
  khi kiểm tra lại theo yêu cầu người phụ trách rằng 9/15 đề có tiêu đề dạng "Đề N (Unit X-Y)"
  (VD "Đề 1 (Unit 1-3)", "Đề 6 (Unit 1-5 (đợt 2))") dù nội dung thật bên trong luôn rải đều
  2 câu cho MỌI unit 1-10 (verify bằng cách đếm tag `unit-N` trong JSON: đúng 2 câu/unit cho
  mọi đề, không lệch). Đã đổi tên: Đề 1-9 bỏ hẳn phần "(Unit X-Y)" (chỉ còn "Đề N"); Đề 10-15
  vốn đã ghi đúng "(Tổng hợp Unit 1-10)" nên giữ nguyên, chỉ bỏ phần số đề trùng lặp
  "(đề N)" lồng bên trong ngoặc. Sửa trực tiếp trong
  `content/exam-bank/tieng-anh/tienganh3-hk1-review-full.json` rồi chạy lại
  `scripts/seed-exam-bank.ts` (idempotent — xoá câu cũ của từng exam, tạo lại, không tăng số
  lượng collection/exam). Bài học: khi soạn tiêu đề đề "ôn tập tổng hợp", đừng gợi ý phạm vi
  unit hẹp nếu nội dung thật sẽ luôn phủ đều toàn bộ chương trình — gây kỳ vọng sai cho người
  dùng đề (phụ huynh/học sinh chọn đề tưởng đang ôn trọng tâm 1 nhóm unit).

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
