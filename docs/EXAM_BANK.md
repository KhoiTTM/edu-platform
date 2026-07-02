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

| `exam_type`                | Tab hiển thị                     |
|----------------------------|----------------------------------|
| `lesson` (hoặc NULL)       | Luyện tập theo bài học           |
| `reflex`                   | Luyện tập phản xạ (có timer)     |
| bất kỳ giá trị khác        | **Luyện tập theo ôn tập**        |
| (vd `midterm`, `final`)    | → rơi vào tab "theo ôn tập"      |

Chỉ collection `status = 'published'` mới hiện ra. Đặt `draft` để giấu tạm.
Cả tab "ôn tập" và "bài học" đều có nút **"Luyện đề Ngẫu nhiên"** (`handleRandomFromUnit`).

**Tiếng Anh lớp 7:** `getAssessmentMap` đã GỠ logic gộp `mindset-ielts` vào `tieng_anh`
(trước đây grade 7 kéo đề sách IELTS vào nhầm). Giờ mỗi môn chỉ lấy đề của chính nó.

## 2b. Xem nhanh exam-bank (UI, read-only)

Có màn hình explorer trong khu **Phụ Huynh**: tab "Exam Bank" tại `/phu-huynh`
(`components/administration/parent/ExamBankExplorer.tsx` + action `getExamBankData`).
Lọc theo môn → lớp → loại đề (`exam_type`) → bộ đề, xem chi tiết câu hỏi/đáp án theo schema.
Chỉ ĐỌC — không sửa/seed từ đây; tạo đề vẫn qua generator (mục 4).

## 2c. "Luyện tập theo sách" (answer-sheet) — KHÁC exam-bank

Một cơ chế RIÊNG, dùng cho sách có bản quyền (không được tái tạo đề vào hệ thống):
- Route `/sach-bai-tap/[slug]`, component `components/assessment/AnswerSheetRenderer.tsx`,
  action `app/(app)/(assessment)/sach-bai-tap/actions.ts`.
- Data `content/[slug]-answers.json` — CHỈ chứa đáp án ngắn/từ khóa + số câu + trang,
  KHÔNG chứa đề bài. Học sinh đọc đề ở link sách gốc (Flipbook), nhập đáp án → chấm.
- Loại chấm: `text`/`choice` (khớp đáp án), `keywords` (câu chứa đủ từ khóa), `essay`
  (không chấm, có thể kèm `sample` = đáp án gợi ý gốc để tham khảo sau khi nộp).
- Lưu lịch sử: `learning_sessions` với `type='exam'`, `sub_type='book_practice'`.
- Hiện dùng cho: `sbt-tienganh7-answers.json` (SBT Tiếng Anh 7). Bản quyền: xem `docs/SACH_BAI_TAP.md`.
Đây KHÔNG phải exam-bank (không dùng generator, không vào `assessment_collections`).

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

1. Soạn 1 hoặc nhiều file JSON theo template, đặt trong `content/exam-bank/`.
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
4. Kiểm tra ở `/luyen-tap/<subject>?grade=<grade>` đúng tab theo `exam_type`.

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

**b) Cột `title` của `assessment_collections` bị TRIGGER ghi đè.**
Trigger `trigger_reorder_assessment_collections` (hàm `reorder_assessment_sequences_trigger`
+ `generate_assessment_title`) tự sinh lại `title` từ `units`/`sequence_number` SAU MỖI
INSERT/UPDATE. Vì vậy `UPDATE ... SET title = '...'` thường bị kéo về tên tự sinh ngay
(RETURNING thấy giá trị mới nhưng SELECT sau đó thấy tên cũ — dấu hiệu kinh điển).
→ Muốn đổi tên cố định, phải sửa hàm `generate_assessment_title`. Trạng thái hiện tại
(migration `051`): hàm + trigger nhận thêm `exam_type`. CHỈ `exam_type='midterm'` mới được
tên cố định — Toán giữa kỳ (units chứa 101) → "Kiểm Tra Giữa Kỳ 1"; Tiếng Anh 3 midterm →
"SBT Tiếng Anh 3 - Tập 1". Đề luyện-theo-bài (`exam_type IS NULL`) vẫn ghép tên theo công thức.
⚠️ KHÔNG đổi tên collection bằng `UPDATE ... SET title` — trigger sẽ ghi đè lại theo hàm.
⚠️ Khi UPDATE hàng loạt theo subject+grade, NHỚ lọc `exam_type` để không đổi nhầm tên 120+ đề
luyện-theo-bài (lỗi migration 050 đã từng mắc, 051 sửa lại).

**c) `units = [101]` (Toán) là mã quy ước cho nhóm đề giữa kỳ** (không phải unit học thật).
Tiếng Anh 3 midterm dùng `units=[1..5]` (theo Unit) + `exam_type='midterm'` để phân biệt với
đề luyện-theo-bài cùng units nhưng `exam_type IS NULL`.

**d) Trùng collection cùng tên:** generator tìm collection theo `(subject_slug, grade, title)`.
Nếu `collection.title` trong file JSON KHÁC tên collection đích trong DB, generator tạo
collection MỚI → sinh nhiều thẻ trùng tên ở tab ôn tập. Luôn để `title` trong file khớp
đúng tên collection đích trước khi seed nối thêm đề.
