# NGÂN HÀNG ĐỀ THI (EXAM BANK) — Quy ước & Quy trình chung

> Phân hệ **exam-bank** chịu trách nhiệm tạo sẵn ngân hàng đề thi/đề kiểm tra theo từng môn–lớp.
> Đề tạo ra ở đây sẽ được dùng tại trang **Luyện tập** (`/luyen-tap/[subject]`).
> Agent **không tự bật đề cho học sinh** — chỉ tạo và để ở trạng thái `published`/`draft`; việc đưa vào dùng do agent/người khác quyết định.

## 1. Mô hình dữ liệu (3 lớp — KHÔNG đổi)

```
assessment_collections   (nhóm đề: "Kiểm tra giữa học kỳ 1")
   id, title, subject_slug, grade, volume, units[], sequence_number,
   exam_type, reference_book, status('draft'|'published')
        │ 1-n
        ▼
exams                    (từng đề trong nhóm)
   id, collection_id, exam_number, title, total_questions, generation_mode
        │ n-n qua exam_questions(order_index, points)
        ▼
question_bank            (câu hỏi)
   id, concept_id(NULLABLE từ migration 048), subject_slug, grade,
   type, difficulty, metadata_json{...}, source, status('approved')
```

Runtime `app/(app)/(assessment)/test-assessment/actions.ts → getExamQuestions()` lấy câu hỏi bằng
`exam_questions JOIN question_bank` rồi **spread `metadata_json`**. Vì vậy **mọi nội dung hiển thị của câu hỏi PHẢI nằm trong `metadata_json`**.

## 2. Phân loại tab ở trang Luyện tập (CỰC KỲ QUAN TRỌNG)

Trang `/luyen-tap/[subject]` (`getAssessmentMap`) phân tab **chỉ dựa vào `exam_type`** của collection:

| `exam_type`                         | Tab hiển thị                   |
|-------------------------------------|--------------------------------|
| `null`                              | Luyện tập theo sách (workbook) |
| `lesson`                            | Luyện tập theo bài học         |
| `reflex`                            | Luyện tập phản xạ (có timer)   |
| `review`, `midterm`, `final`, `exam`| **Tab Ôn Tập**                 |
| bất kỳ giá trị khác                | Luyện tập theo bài học         |

Chỉ collection `status = 'published'` mới hiện ra. Đặt `draft` để giấu tạm.
Cả tab "ôn tập" và "bài học" đều có nút **"Luyện đề Ngẫu nhiên"** (`handleRandomFromUnit`).

**Tiếng Anh lớp 7:** `getAssessmentMap` đã GỠ logic gộp `mindset-ielts` vào `tieng_anh`
(trước đây grade 7 kéo đề sách IELTS vào nhầm). Giờ mỗi môn chỉ lấy đề của chính nó.

## 2b. Xem nhanh exam-bank (UI, read-only)

Có màn hình explorer trong khu **Phụ Huynh**: tab "Exam Bank" tại `/phu-huynh`
(`components/administration/parent/ExamBankExplorer.tsx` + action `getExamBankData`).
Lọc theo môn → lớp → loại đề (`exam_type`) → bộ đề, xem chi tiết câu hỏi/đáp án theo schema.
Chỉ ĐỌC — không sửa/seed từ đây; tạo đề vẫn qua generator (mục 4).

## 2c. "Luyện tập theo sách bài tập" (SBT bám sách) — dùng chung exam-bank, KHÔNG dùng answer-sheet

**Đã ngừng dùng cơ chế "answer-sheet" (chỉ lưu đáp án, giấu đề bài)** mô tả ở bản cũ của mục
này. Quyết định mới (từ khi seed Tiếng Anh 7 + KHTN 7 — xem mục 6): sách bài tập vẫn seed
**đầy đủ đề bài** vào `question_bank.metadata_json` như exam-bank thường, đi kèm nút
**"Xem sách"** trong `AssessmentRenderer` (prop `sourceBookUrl`, trỏ file scan gốc trên
Google Drive — xem mục 6) để học sinh vẫn mở được sách gốc khi cần xem hình/ngữ cảnh.
Lý do đổi: có link mở sách trực tiếp rồi thì không cần giấu đề bài trong DB nữa — trải
nghiệm liền mạch hơn (không phải chuyển qua lại giữa 2 màn hình để tự đối chiếu số câu).

Route `/sach-bai-tap/[slug]` + `components/assessment/AnswerSheetRenderer.tsx` +
`content/[slug]-answers.json` (ví dụ `sbt-tienganh7-answers.json`) vẫn còn trong repo làm
tài liệu tham khảo nhưng **không còn là đường đi khuyến nghị cho sách mới** — không cần đọc
lại trừ khi cần khôi phục cách làm cũ vì lý do bản quyền nghiêm ngặt hơn.

Sách bài tập giờ đi theo **đúng luồng exam-bank chuẩn** (mục 1, 3, 4) với 2 điểm khác:
- `assessment_collections.exam_type = null`, `units = [N]` (N = bài/unit thật trong sách,
  KHÔNG dùng số ảo — xem mục 6.2 lý do).
- Mỗi bài/unit trong sách map thành **đúng 1 exam duy nhất**, dùng hết toàn bộ câu có trong
  bài đó (không random/rút mẫu) — khác nhóm "ngân hàng câu hỏi" ở mục 6.1.

## 3. Định dạng `metadata_json` theo `type` câu hỏi

**`multiple_choice`** — chọn 1 đáp án:
```json
{ "question": "...", "options": ["A","B","C","D"], "correct_index": 0,
  "explanation": "...", "image_url": "/images/....png", "tags": ["unit-1"] }
```

**`fill_blank`** — điền vào chỗ trống (có gợi ý chọn):
```json
{ "question": "... ___ ...", "choices": ["7","8","9"], "correct_answer": "9",
  "explanation": "...", "tags": ["unit-2"] }
```

**`matching` / `match_pair`** — nối cặp (dạng "Read and match" của SBT Tiếng Anh):
```json
{ "question": "Nối câu hỏi với câu trả lời:",
  "pairs": [ {"left":"How are you?","right":"I'm fine."},
             {"left":"What's your name?","right":"My name's Mai."} ],
  "tags": ["unit-1"] }
```
(Field thật renderer đọc: `pairs: [{left,right}]`. Có thể thay bằng `column_a/column_b/correct_pairs` nhưng `pairs` là gọn nhất.)

**`sentence_reorder`** — sắp xếp từ thành câu ("Make sentences"):
```json
{ "question": "Sắp xếp thành câu đúng:",
  "words": ["My","name","is","Nam"],
  "correct_sentence": "My name is Nam",
  "tags": ["unit-2"] }
```
(Renderer đọc `words` + `correct_sentence`. KHÔNG dùng `items`/`correct_order` trừ khi
kèm đủ `items:[{id,text}]` — `words`+`correct_sentence` đơn giản và chắc ăn hơn.
LƯU Ý: renderer KHÔNG tự xáo từ — phải xáo `words` sẵn trong data, nếu không học sinh thấy đáp án.)

**`crossword`** — ô chữ ("Do the puzzle"), renderer `CrosswordRenderer`:
```json
{ "question": "Hoàn thành ô chữ:",
  "rows": 5, "cols": 2,
  "entries": [
    { "number": 1, "direction": "down",   "row": 0, "col": 0, "answer": "HELLO", "clue": "Lời chào đầy đủ" },
    { "number": 2, "direction": "across", "row": 0, "col": 0, "answer": "HI",    "clue": "Lời chào ngắn" }
  ],
  "tags": ["unit-1","puzzle"] }
```
(Mỗi entry trải ô từ (row,col) theo direction; ô giao nhau phải khớp chữ. Học sinh gõ chữ
+ bấm "Kiểm tra" → chấm. Verify ô không vượt lưới và giao điểm khớp trước khi seed.)

`image_url`, `explanation`, `tags` là tùy chọn. `tags` thay cho `concept_id` để truy vết.

Ngoài `multiple_choice` và `fill_blank`, generator + runtime còn hỗ trợ: `true_false`
(`correct_answer: true/false`), `matching`/`match_pair` (`pairs: [{left,right}]`),
`sorting`/`sentence_reorder`/`number_order` (`items` hoặc `correct_order`),
`classification`/`categorization` (`categories[]` + `items[]`), `word_problem`,
`shape_identify`, `clock_read`. Loại `essay`/`short_answer` nạp được nhưng runtime
CHƯA có giao diện riêng (sẽ rơi vào default) — generator sẽ cảnh báo.

## 3b. Render công thức toán học (KaTeX / MathJax)

Môn **Toán** (và bất kỳ môn nào có ký hiệu toán học) dùng **MathJax 3** để render inline.

### Quy ước viết LaTeX trong `metadata_json`

Bọc công thức trong dấu `$...$`:

```json
{ "question": "Khẳng định sai là:",
  "options": [
    "$\\sqrt{25} \\in \\mathbb{I}$",
    "$8{,}(45) \\in \\mathbb{Q}$",
    "$\\dfrac{20}{5} \\in \\mathbb{Z}$",
    "$\\sqrt{7} \\in \\mathbb{I}$"
  ],
  "correct_index": 0,
  "explanation": "$\\sqrt{25} = 5 \\in \\mathbb{Z}$, không phải số vô tỉ $\\mathbb{I}$."
}
```

**Lưu ý JSON escaping:** dấu `\` trong JSON phải viết `\\`, vì vậy:
- `\sqrt{x}` → `"$\\sqrt{x}$"`
- `\dfrac{a}{b}` → `"$\\dfrac{a}{b}$"`
- `\mathbb{Q}` → `"$\\mathbb{Q}$"`

### Cách hoạt động (runtime)

- `MultipleChoiceRenderer.tsx` parse token `$...$` trong chuỗi và render qua component `KaTeXSpan`.
- `KaTeXSpan` dùng **`import("katex")` dynamic** trong `useEffect` (client-only) để tránh Webpack SSR error.
- **MathJax 3** được load từ CDN (jsDelivr) qua `<script>` trong `app/layout.tsx` — làm fallback cho các vị trí ngoài `MultipleChoiceRenderer` nếu cần.
- CSS KaTeX (`app/katex.min.css`) và fonts (`public/fonts/`) được **sinh tự động** khi build/install qua `scripts/setup-katex.mjs` (postinstall + build hook). Hai thư mục này nằm trong `.gitignore`, không commit.

### Lỗi đã biết & fix

| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| `Module not found: Can't resolve 'katex'` | Webpack không resolve ESM package katex | `transpilePackages: ["katex"]` trong `next.config.ts` |
| CSS/fonts katex không load | File `.gitignore`'d, không có trên server | `postinstall` script tự copy |
| `import katex from "katex"` lỗi | Static import trong client component | Dùng dynamic `import("katex")` trong `useEffect` |

### Ký hiệu hay dùng (Toán 7)

| Ký hiệu | LaTeX | Ghi chú |
|---------|-------|---------|
| Căn bậc 2 | `\sqrt{x}` | |
| Phân số | `\dfrac{a}{b}` | `\dfrac` to hơn `\frac` |
| Tập số | `\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{I}` | |
| Số thập phân | `8{,}(45)` | dấu phẩy không bị coi là dấu phân cách |
| Thuộc / Không thuộc | `\in, \notin` | |
| Tuyệt đối | `\|x\|` hoặc `\lvert x \rvert` | |
| Lũy thừa | `x^{2}` | |

## 3 cách tạo file JSON (đều đổ về cùng template này)

- **Procedural**: script sinh tham số (vd cách đã làm cho Toán 3 đề 14–20). Đáp án do code tính nên luôn đúng; nhược điểm là lặp khuôn.
- **AI soạn**: Claude tự viết câu mới đa dạng, BẮT BUỘC verify đáp án bằng code trước khi seed.
- **Bóc đề thật**: chạy `pipeline/` (OCR) trên PDF/ảnh → chuyển kết quả về template. Sát thực tế nhất; OCR công thức Toán cần review kỹ.

## 4. Quy trình chuẩn để thêm đề cho BẤT KỲ môn nào

> **Quy ước hiện tại (từ đợt Tiếng Anh 7 + KHTN 7 SBT):** đích đến cuối cùng luôn là
> **database** — `/luyen-tap` đọc thẳng từ DB, không đọc file JSON. File JSON **vẫn được
> soạn và giữ lại trong repo** (`content/exam-bank/` hoặc `content/workbooks/`) làm bản nháp
> để agent đối chiếu/soạn câu hỏi và làm nguồn backup/tham khảo lâu dài — KHÔNG phải bước
> thừa cần bỏ. Việc "tạo đề trên database" nghĩa là: coi DB là nguồn sự thật khi runtime đọc
> dữ liệu, còn JSON là công cụ soạn thảo trung gian, luôn phải seed lên DB thì đề mới thật sự
> "có" trên app.

1. Agent đọc đề gốc (ảnh/PDF sách, xem mục 4b) và soạn câu hỏi thành 1 hoặc nhiều file JSON
   theo template (mục 3), đặt trong `content/exam-bank/` (ngân hàng câu hỏi) hoặc
   `content/workbooks/` (bám sách bài tập 1-1, xem mục 7). Với dạng luyện tập bám sách
   (SBT), câu hỏi phải đọc/gõ lại **y như bản in gốc** — không diễn giải lại, không đổi số
   liệu — vì học sinh sẽ đối chiếu ngược với sách khi cần.
2. Kiểm tra trước khi ghi (KHÔNG đụng DB):
   ```bash
   npx tsx scripts/seed-exam-bank.ts content/exam-bank/<file>.json --dry-run
   ```
3. Chạy generator chung (idempotent). Nhận 1 file, NHIỀU file, hoặc cả thư mục:
   ```bash
   npx tsx scripts/seed-exam-bank.ts content/exam-bank/<file>.json
   npx tsx scripts/seed-exam-bank.ts content/exam-bank/          # cả thư mục
   ```
   Generator sẽ: tìm/tạo collection theo (subject_slug, grade, title), tạo/cập nhật từng
   exam theo `exam_number`, ghi câu hỏi vào `question_bank` (concept_id = null) và nối qua
   `exam_questions`. Khi seed lại 1 exam, các câu cũ của exam đó bị xóa-tạo lại sạch sẽ.
   Với sách bài tập theo bài/unit 1-1, dùng script migrate riêng của môn đó thay vì
   generator chung (xem mục 7.4, ví dụ `migrate-khtn7-bai-to-db.ts`).
4. Kiểm tra ở `/luyen-tap/<subject>?grade=<grade>` đúng tab theo `exam_type` — đây là bước
   xác nhận đề đã "lên" thật (DB có dữ liệu và render đúng), không chỉ dựa vào file JSON đã
   soạn xong.
5. **Giữ lại file JSON đã soạn trong repo** sau khi seed — không xoá. Dùng để đối chiếu khi
   phát hiện lỗi nội dung về sau (như đợt QC Toán 7 — xem `docs/khtn7_sbt_progress.md` và
   các file `.bak-*` làm ví dụ), hoặc để seed lại/khôi phục nếu DB bị xoá nhầm.

## 4b. Nguồn ảnh/PDF sách gốc — dùng Google Drive, KHÔNG tải về lưu trong repo

Quy ước hiện tại: PDF/ảnh scan sách gốc (dùng để agent đọc lại và soạn câu hỏi, hoặc để học
sinh xem qua nút "Xem sách") lấy trực tiếp từ **Google Drive**, không tải về commit vào
`public/book/`, `content/pdfs/` như cách làm cũ (mục 7.2 mô tả cách làm cũ cho tham khảo).

- **Soạn câu hỏi:** agent mở file trên Google Drive (link do người dùng cung cấp) để đọc/OCR
  thủ công, không cần tải PDF về máy/repo trước.
- **Hiển thị cho học sinh** (`sourceBookUrl`, nút "Xem sách" — xem mục 7.3): trỏ thẳng ra link
  chia sẻ Google Drive thay vì đường dẫn nội bộ `/book/...` hay `/images/...`.
- **Lý do đổi:** tránh phình repo với file ảnh/PDF nặng (ví dụ PDF Tiếng Anh 7 ~143MB từng
  phải loại khỏi git — mục 7.2), và tránh phải tự host/scan lại khi có thêm sách mới.
- **Không áp dụng cho** hình minh hoạ **tự vẽ/tự tạo** riêng cho câu hỏi (SVG, ảnh do agent
  generate) — loại này vẫn theo `image_url` trỏ `public/images/` như trước, vì đó là asset
  của riêng app chứ không phải bản scan sách.

## 5. Luật cứng

- **MUST:** Mọi nội dung câu hỏi nằm trong `metadata_json`. `total_questions` để generator tự tính.
- **MUST:** `exam_number` là DUY NHẤT trong một collection. Generator dùng nó làm khóa nâng cấp.
- **MUST:** Câu cần hình phải có `image_url` trỏ tới file có thật trong `public/images/`.
- **MUST NOT:** Nhúng `score`/`userAnswer` vào JSON (đó là dữ liệu runtime).
- **MUST NOT:** Tự bật đề (đổi sang published mà không được yêu cầu) cho học sinh đang dùng.

## 5b. Mapping type theo Sách bài tập Tiếng Anh 3 (Global Success)

Tham khảo khi tạo exam bank Tiếng Anh 3 **bám sát dạng đề SBT** (chỉ theo type, KHÔNG sao
chép nội dung sách). SBT chia mỗi unit thành 5 section cố định A–E:

| Dạng bài trong SBT | `type` hệ thống | Ghi chú |
|---|---|---|
| A. Phonics — Complete and say (điền âm/chữ) | `fill_blank` | phổ biến |
| A. Do the puzzle / Find and circle (ô chữ) | `crossword` ✅ đã có renderer | xem schema ở mục 3 |
| B. Read and match (nối câu–cụm) | `matching` / `match_pair` | rất nhiều trong sách |
| B. Look, complete and read (nhìn tranh điền) | `fill_blank` + `image_url` | cần tranh |
| B. Make sentences (sắp xếp/viết câu) | `sentence_reorder` (`words`+`correct_sentence`) hoặc `fill_blank` | |
| C. Speaking — Ask and answer | *KHÔNG dùng* | sách ghi "Pupils' answers" → đáp án mở, không tự chấm |
| D. Reading — Read and match | `matching` | |
| D. Read, look and circle (khoanh đáp án) | `multiple_choice` | |
| E. Writing — Look and write (nhìn tranh viết) | `fill_blank` + `image_url` | cần tranh |
| E. Write about you (viết tự do) | *KHÔNG dùng* | tự luận mở, không có đáp án cố định |

**Type dùng được** (đều render): `multiple_choice`, `fill_blank`,
`matching`/`match_pair`, `sentence_reorder`, `crossword`.
Scope từ vựng + phân bổ Unit Tiếng Anh 3 Tập 1: xem `docs/TIENGANH3_TAP1_SCOPE.md`.

**Lưu ý khi làm Tiếng Anh 3:**
- Nhiều bài dựa vào TRANH; không tái dùng tranh sách (bản quyền) → tự tạo hình mới (SVG)
  hoặc chọn dạng text thuần (hỏi–đáp bằng chữ thay vì nhìn tranh).
- Bỏ 2 dạng "đáp án mở" (Speaking C, Write about you E) — hệ thống không có giao diện
  chấm tự luận. Muốn giữ thì phải thêm renderer `essay` trước.
- Ô chữ (puzzle) → dùng `crossword` (đã có renderer, xem schema mục 3).
- CHỈ dùng từ trong wordlist Tập 1 (scope doc trên).

## 6. Bẫy đã biết (ĐỌC trước khi đụng DB — tránh lặp lại lỗi cũ)

**a) `question_bank.concept_id` đã NULLABLE từ migration `048`.**
Bản gốc (021/024) đặt `concept_id NOT NULL`. Câu hỏi đề thi để `concept_id = null`.
Nếu seed báo lỗi `null value in column "concept_id" ... violates not-null constraint`
→ migration 048 CHƯA chạy trên DB đó. Chạy:
`ALTER TABLE public.question_bank ALTER COLUMN concept_id DROP NOT NULL;`

**b) Cột `title` của `assessment_collections` và Trigger tự động sinh tên:**
Từ migration `053`, trigger tự động sinh tên `trigger_reorder_assessment_collections` đã được **xóa bỏ hoàn toàn**. Tiêu đề của `assessment_collections` sẽ do người dùng chỉ định trực tiếp khi nạp/seed dữ liệu (và không bao giờ bị ghi đè tự động nữa).

**c) Quy ước `units` cho đề thi và Gom nhóm UI:**
Hệ thống hiển thị gom các collection có cùng `(subject, grade, volume, units, exam_type)` vào 1 nhóm trên UI.
- **CẢNH BÁO:** Nếu 2 collection khác nhau trong cùng một môn học dùng chung `units`, chúng sẽ bị gộp lại làm một trên UI. Luôn sử dụng các mảng `units` khác nhau (ví dụ: `[101]`, `[102]`, `[99]`, `[2]`) để tách nhóm các kỳ thi độc lập.
- **Ca thật đã gặp:** vì (b) trigger cũ đã bị xoá và (e) generator match theo `(subject_slug, grade, title)`
  chứ không theo `units`, một lần seed cũ đã tạo 16 collection cho môn `khtn` (Bài 1–16) nhưng
  **title lại bị đặt nhầm thành "English Grade 7 - Vol N - Unit N - Ex 1"** (rất có thể do copy
  công thức đặt tên từ một script seed Tiếng Anh khác mà quên đổi phần tên môn), đồng thời
  `exam_questions` của các collection đó **không trỏ tới câu hỏi nào** (0 rows dù `total_questions`
  vẫn ghi đúng số). Phát hiện được nhờ so sánh `title` không khớp `subject_slug`, và đếm
  `exam_questions` = 0. Đã dọn sạch trước khi seed lại đúng ở mục 7. **Bài học:** đừng tin
  `total_questions` một mình — luôn `JOIN exam_questions` để xác nhận có câu hỏi thật.

**d) Hỗ trợ liên kết tài liệu ngoài (External URL):**
Bảng `exams` hỗ trợ cột `external_url`. Khi cột này được gán giá trị link (ví dụ: Link Flipbook), UI sẽ hiển thị nút "Mở Flipbook" hướng học sinh làm bài trên liên kết ngoài thay vì mở giao diện thi/kiểm tra truyền thống.

**e) Trùng collection cùng tên:**
Generator tìm collection theo `(subject_slug, grade, title)`. Nếu `collection.title` trong file JSON khác tên collection đích trong DB, generator tạo collection mới. Vì vậy hãy kiểm tra kỹ `title` trong file JSON trước khi seed.

## 7. Ba format dữ liệu luyện tập hiện có, và việc seed Tiếng Anh 7 + KHTN 7 (SBT)

Repo hiện có **3 format** dùng chung 1 schema DB (mục 1) nhưng khác nhau ở quan hệ
concept↔exam và mục đích của `exam_type` — phân biệt được bằng cách đọc dữ liệu, KHÔNG có
cột nào đánh dấu format trực tiếp:

| Format | Ví dụ môn | Quan hệ concept:exam | Đặc điểm |
|---|---|---|---|
| **1. Ngân hàng câu hỏi, đề rút mẫu** | Toán 7, Toán 3, Tiếng Việt 3 | 1 concept → **nhiều** exam ("Đề 1", "Đề 2"...) | Concept chứa hàng trăm câu (pool); mỗi collection là 1 tập con/đề riêng. Có cả `exam_type` review/midterm/final cho đề tổng hợp nhiều bài. |
| **2. Bám sách bài tập, đề cố định 1-1** | Tiếng Anh 7, KHTN 7 (mục này) | 1 concept → **đúng 1** exam | Concept = đúng 1 bài/unit trong sách, exam dùng hết toàn bộ câu của bài đó, không random. Cần mở sách xem hình/ngữ cảnh → có nút "Xem sách" (xem 7.3). |
| **3. Luyện kỹ năng cắt ngang** | Pre A1 Starter | Không gắn 1 concept/unit cụ thể | Tổ chức theo `exam_type` chuyên biệt (`reflex`, `listening`, `lesson`) chứ không theo cấu trúc bài học; `units` dùng số ảo (`98`, `99`) để đánh dấu nhóm. |

### 7.1. Quy tắc đặt tên chuẩn — `lib/assessment/buildExamTitle.ts`

Vì trigger tự sinh tên đã bị xóa (mục 6b), **mọi script seed phải tự gọi hàm này** để đặt
`title` — không có tầng bảo vệ nào ở DB nữa. Cấu trúc:

```
{Tên môn + Lớp} - {Nhóm luyện tập} - {Vị trí trong nhóm}[ - Đề {STT}]
```

8 nhóm luyện tập chuẩn (`ExamGroup`): `sbt` (Luyện theo sách bài tập), `bank` (Luyện tập
theo bài), `review`, `midterm`, `final`, `reflex`, `listening`, `lesson` — xem label đầy đủ
trong file. `examSeq` chỉ truyền khi 1 vị trí có nhiều đề (Format 1); bỏ qua với Format 2
(luôn đúng 1 đề/vị trí).

Ví dụ: `buildExamTitle({ subjectLabel: 'KHTN 7', group: 'sbt', position: 'Bài 2: Nguyên tử' })`
→ `"KHTN 7 - Luyện theo sách bài tập - Bài 2: Nguyên tử"`.

### 7.2. Nguồn dữ liệu Tiếng Anh 7 + KHTN 7 (lịch sử — thời điểm này CHƯA có quy ước Google Drive ở mục 4b)

- **Tiếng Anh 7** (SBT Global Success, 12 unit): OCR ban đầu qua EasyOCR chất lượng kém →
  đọc lại bằng mắt từng trang scan (`content/pdfs/sbt/sbt_tienganh7.pdf`, không track git vì
  ~143MB), đối chiếu Keys cuối sách. Kết quả: `content/workbooks/tienganh7-sbt-unit{1..12}.json`.
- **KHTN 7** (SBT Kết nối tri thức, 42 bài): dữ liệu cũ (`content/workbooks/khtn7-questions.json`,
  394 câu) cũng bị lỗi OCR nặng (từ đảo vị trí, thiếu chữ đầu câu, watermark "KẾT NỐI TRI THỨC..."
  dính vào đề bài) và 213/394 câu thiếu đáp án. Đọc lại toàn bộ bằng mắt từ ảnh
  `public/book/sbt_khtn_07/page_XXX.png` (đã render sẵn, không cần PDF gốc), backfill đáp án
  còn thiếu từ `content/workbooks/khtn7-answer-key.json` (91/93 câu tìm lại được). Kết quả:
  395 câu (thêm 1 câu `khtn7-2-18` bị OCR bỏ sót hoàn toàn trong bản gốc), chỉ còn 2 câu
  không có đáp án tham khảo (cần xem hình/bảng tuần hoàn thật, answer key gốc cũng không có).
- **Rủi ro khi đọc lại song song bằng nhiều agent cùng ghi 1 file:** 1 agent con (tự spawn để
  chia việc bài 21–27) tự đổi schema JSON sang `{question, explanation}` thay vì
  `{stem, cau, answer}` đã thống nhất, làm 162 câu (bài 21–42) lệch schema. Phát hiện bằng
  cách so `set(keys)` giữa các câu, sửa bằng script chuẩn hoá 1 lần
  (`scripts/normalize-khtn7-schema.ts`, đã chạy xong — không cần chạy lại trừ khi lặp lại lỗi
  tương tự). **Bài học:** nếu giao nhiều agent cùng sửa 1 file JSON lớn song song, luôn
  backup trước, và verify `set(keys)` đồng nhất sau khi tất cả agent xong trước khi seed DB.

### 7.3. Hai cơ chế "mở link ngoài" khác nhau — KHÔNG nhầm lẫn

Repo có **2 cơ chế riêng biệt** để trỏ học sinh ra tài liệu ngoài app, phục vụ 2 tình huống
khác nhau:

| | `exams.external_url` (mục 6d) | `sourceBookUrl` — nút "Xem sách" (mới, mục này) |
|---|---|---|
| Dùng khi | Không số hoá câu hỏi — toàn bộ đề chỉ tồn tại ở trang ngoài | Đã số hoá đầy đủ câu hỏi vào `question_bank`, chỉ cần link tham khảo hình/ngữ cảnh |
| Hành vi khi bấm | UI đổi nút thành "Mở Flipbook", **rời khỏi app**, không vào `test-assessment` | Ở lại `test-assessment`, quiz chấm điểm bình thường trong app, mở **thêm 1 tab** cạnh bên |
| `exams.total_questions` | `0` (không có `exam_questions` nào) | Có giá trị thật, khớp `question_bank` |
| Nơi khai báo | Cột `external_url` trong bảng `exams`, set trực tiếp lúc insert | Prop `sourceBookUrl` trên `AssessmentRenderer`, `test-assessment/page.tsx` tự chọn theo `subject_slug` qua map `BOOK_SOURCE_URLS` khai báo ngay trong file đó |
| Ví dụ đã dùng | Pre A1 Starter — collection "Three Practice Test" (`exam_type: 'lesson'`, 3 exam trỏ `flipbuilder.com`), có sẵn từ trước, không phải seed lần này | Tiếng Anh 7, KHTN 7 (mục 7 này) |

Thêm môn mới bám sách có sẵn câu hỏi số hoá → dùng `sourceBookUrl` (thêm 1 dòng vào
`BOOK_SOURCE_URLS`). Thêm môn hoàn toàn không định số hoá câu hỏi, chỉ muốn link ra ngoài →
dùng `external_url` trên `exams`. Không set cả hai cho cùng 1 exam.

Vì đã có nút mở sách trực tiếp, **quyết định KHÔNG dùng cơ chế answer-sheet cũ** (mục 2c) —
đề bài chép đầy đủ vào `question_bank.metadata_json` như exam-bank thường, không giấu đề.

### 7.4. Script migrate dùng lại được

- `scripts/migrate-tienganh7-unit-to-db.ts <unitNumber>` — seed 1 unit Tiếng Anh 7 từ
  `content/workbooks/tienganh7-sbt-unit{N}.json`. Có guard chống insert trùng (kiểm tra
  concept đã có câu hỏi chưa trước khi insert).
- `scripts/migrate-khtn7-bai-to-db.ts <baiNumber>` — seed 1 bài KHTN 7 từ
  `content/workbooks/khtn7-questions.json`, lọc theo `bai`. Cùng guard chống trùng.
- `scripts/reset-tienganh7-units.ts <unit1> <unit2> ...` — xóa sạch 1 hoặc nhiều unit (cascade
  question_bank → exam_questions → exams → collection) để seed lại từ đầu khi cần sửa lỗi.
- `scripts/survey-tienganh7-all-units.ts` — liệt kê nhanh toàn bộ collection/exam đã seed theo
  unit, kèm tổng số câu — dùng để verify sau mỗi lần seed hàng loạt.

Không có type nào trong 2 script trên dùng `image_url` (không có tranh cần seed); các dạng
bài không thể chấm tự động (`word_search`, `crossword`, `underline_classify`, `paragraph_ordering`,
`error_identification`, `synonym_finding`, luyện phát âm tự do...) bị `skip` có ghi log rõ lý
do, KHÔNG đưa vào DB — vẫn còn nguyên trong file JSON gốc làm tham khảo.

