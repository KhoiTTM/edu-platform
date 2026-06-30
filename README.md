# EduVerse (BrightPath Academy) — Tài liệu Dự án Toàn diện

> **Mục đích tài liệu này:** Giúp bất kỳ AI hoặc lập trình viên nào đọc vào hiểu ngay cấu trúc, luồng dữ liệu, và chức năng của toàn bộ dự án mà không cần đặt câu hỏi thêm.
>
> **BẮT BUỘC ĐỌC THÊM:** [`docs/CONTEXT.md`](./docs/CONTEXT.md) — tài liệu kiến trúc lõi (6 phân hệ, luật cứng cho agent). File README này tóm tắt thực tế thư mục/route hiện có; `docs/CONTEXT.md` giải thích *tại sao* và *luật* phải theo.

---

## 1. Tổng quan Dự án

**EduVerse** (tên project: `edu-platform`) là một cổng thông tin học sinh (student portal) hỗ trợ học sinh nhiều khối lớp (3, 7, và luồng IELTS Foundation) với mô hình **Question-centric**, tách 3 lớp: **Content** (câu hỏi/đề tĩnh) — **Attempts** (bài làm của học sinh) — **Progress** (tiến độ/điểm).

Tính năng chính:

- Đăng nhập/đăng ký, hỗ trợ nhiều khối lớp/profile (multi-grade)
- Học bài theo môn: PDF/ảnh trang sách giáo khoa, video YouTube, IELTS Foundation theo Unit
- Phòng luyện kỹ năng riêng: Nghe (Gist → Transcript song ngữ → Shadowing), Đọc, Viết, Nói (chat AI)
- **Assessment Studio** + **Luyện tập 3 chế độ** (ngân hàng câu hỏi / ngân hàng đề / sách bài tập tương tác)
- **Sách Scan Tương tác (Flipbook)**: pipeline AI cục bộ bóc tách PDF scan thành câu hỏi
- **Phụ huynh**: giao nhiệm vụ, theo dõi tiến độ con
- **Gamification**: XP, streak, energy/heart trên thanh điều hướng
- Chat với **Giáo viên AI** (Gemini) và **Từ điển nổi** (floating dictionary)

---

## 2. Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Framework | **Next.js 15** (App Router, Server Components, Server Actions) |
| Runtime / UI | **React 19** + **TypeScript 5** |
| Styling | **Tailwind CSS 3** |
| Animation | **Framer Motion** |
| Backend / Auth / DB | **Supabase** (PostgreSQL + Row Level Security + Auth) |
| AI | **Google Gemini** (`@google/generative-ai`), model fallback chain |
| Schema validation | `zod` (form/API) |
| Icons | `lucide-react` |
| PDF Viewer | `react-pdf` |
| Pipeline OCR (Python, riêng `pipeline/`) | `pypdfium2`, `opencv-python`, `easyocr`, `Pillow`, `numpy` |
| Deploy target | Netlify (`netlify.toml`, `@netlify/plugin-nextjs`) |

### Biến môi trường cần thiết (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # dùng cho script seed/server action cần bypass RLS
GEMINI_API_KEY=<google-gemini-key>
```

Không có file `.env.example` trong repo hiện tại — tạo `.env.local` thủ công theo mẫu trên.

---

## 3. Kiến trúc 6 Phân hệ (Route Groups)

Toàn bộ route được bảo vệ (cần đăng nhập) nằm trong `app/(app)/`, chia 6 route group theo `docs/CONTEXT.md`. **Route group không xuất hiện trong URL thật** (quy ước Next.js) — ví dụ `app/(app)/(administration)/dashboard/page.tsx` phục vụ tại `/dashboard`, không phải `/administration/dashboard`.

### 3.1 `(learning)` — Học bài đa phương thức

Component tương ứng: `components/learning/`, `components/universal/` (Universal Learning Engine).

| Route | Mô tả |
|---|---|
| `/hoc-tap` | Trang chọn môn học |
| `/hoc-tap/[subject]` | Danh sách bài học theo môn |
| `/hoc-tap/pre-a1-starter`, `/starters-wordlist`, `/starters-wordlist/learn`, `/starters-wordlist/flipbook` | Pre A1 Starter + wordlist + flipbook |
| `/hoc-tap/mindset-ielts` | Roadmap IELTS Foundation theo Unit |
| `/hoc-tap/mindset-ielts/{grammar,listening,reading,speaking,writing,shadowing,flow-book}` | Từng kỹ năng/luồng riêng |
| `/learn/[subject]/[node]` | Universal Learning Engine — coordinator chung |
| `/lessons/[id]` | Chi tiết bài học (PDF/video + practice inline) |
| `/listening/[id]`, `/reading/[id]`, `/writing/[id]` | Phòng luyện kỹ năng riêng biệt |
| `/speaking/[subjectSlug]/[unitId]/[sessionId]` | Phòng luyện nói với AI |

### 3.2 `(assessment)` — Làm bài, chấm điểm, lưu kết quả

Component tương ứng: `components/assessment/`. Engine: `lib/assessment/` (ai-generator, blueprint-mapper, generation-engine, question-selector...).

| Route | Mô tả |
|---|---|
| `/luyen-tap`, `/luyen-tap/[subject]` | Trang Luyện tập, phân tab theo `exam_type` (xem `docs/EXAM_BANK.md`) |
| `/luyen-tap/lesson/[nodeId]` | Luyện tập theo bài học cụ thể |
| `/luyen-tap/review` | Trang xem lại bài đã làm |
| `/assessment-studio`, `/assessment-studio/collections/[id]` | CMS quản lý đề thi |
| `/assessment-studio/exams/[examId]/{preview,review}` | Xem trước / duyệt đề |
| `/test-assessment` | Trang test runtime lấy đề (`getExamQuestions`) |

> Tab "Theo Sách bài tập" (trong `/luyen-tap/[subject]`) bấm vào sẽ **chuyển thẳng** (`router.push`, không qua trang trung gian) sang `/flipbooks/[bookSlug]/quiz` ở phân hệ `(flipbook)` — xem mục 3.3.

### 3.3 `(flipbook)` — Sách flip: nhập liệu + màn hình học sinh làm bài

Component: `components/flipbook/` (`FlipbookClient`, `FlipbookQuizClient`, `FlipbookQuizLessonList`, `KHTNClipper`, `PdfViewer`). Server actions: `app/(app)/(flipbook)/actions.ts` (`saveFlipbookQuizAttempt`). Âm thanh đúng/sai: `lib/quizSound.ts` (Web Audio API, không cần file mp3).

| Route | Mô tả |
|---|---|
| `/flipbooks/[bookSlug]` | Xem flipbook đã hoàn thiện |
| `/flipbooks/[bookSlug]/quiz` | Danh sách Bài của sách (card, số câu hỏi mỗi bài, breadcrumb, link Google Drive xem sách gốc) |
| `/flipbooks/[bookSlug]/quiz/[bai]` | Quiz text-only — chỉ câu hỏi của 1 bài, đọc từ `content/[bookSlug]-questions.json`, lưu kết quả khi "Hoàn Thành" (xem mục 6) |

**Đã loại bỏ hoàn toàn luồng Hotspot/Review** (route `/interactive-workbook`, `/review`, component `BookEditor`/`BookViewer`/`QuestionEditorForm`, `lib/book-viewer-core/`, `lib/schema/`, và toàn bộ ảnh trang scan trong `public/books/[slug]/`) — vì chiếm dung lượng lớn (~28MB/sách) và độ chính xác kém (OpenCV hay gộp nhiều câu hỏi liền nhau vào 1 hotspot). Hiện chỉ còn **luồng Quiz Text-Only** (OCR toàn trang, không cần ảnh hiển thị, không cần hotspot) — xem `docs/CONTEXT.md` mục C và `agent_prompt/implement_text_only_quiz_pipeline_prompt.md` để biết quy trình đầy đủ. **Không tạo lại luồng Hotspot/Review** trừ khi có yêu cầu rõ ràng phải hiển thị ảnh trang gốc.

### 3.4 `(question-bank)` — Tầng Content: lưu trữ câu hỏi tĩnh

Hiện **chưa có `page.tsx`** trong route group này — đây là tầng dữ liệu thuần (`question_bank` table + `scripts/seed-question-bank.ts` và các script `seed-*` khác), chưa có UI quản trị riêng. Component dự kiến: `components/question-bank/` (hiện trống).

### 3.5 `(exam-bank)` — Tầng Content: tổ hợp câu hỏi thành đề

Route group này **chưa có `page.tsx`** (runtime đọc đề qua `(assessment)/test-assessment`), nhưng exam-bank đã có công cụ và UI riêng:

- **Tạo/nạp đề:** generator chung `scripts/seed-exam-bank.ts` — nhận 1 file, nhiều file hoặc cả thư mục `content/exam-bank/`, validate đa loại câu hỏi, hỗ trợ `--dry-run`. Idempotent theo `(subject_slug, grade, title)` + `exam_number`.
- **Xem đề (read-only):** tab **"Exam Bank"** trong `/phu-huynh` (`components/administration/parent/ExamBankExplorer.tsx` + action `getExamBankData`) — lọc môn/lớp/loại đề, xem chi tiết câu hỏi theo schema.
- **Loại câu hỏi:** render bởi `components/universal/AssessmentRenderer.tsx` — gồm `multiple_choice`, `fill_blank`, `matching`, `sentence_reorder`, `crossword` (ô chữ, renderer `CrosswordRenderer.tsx`) và nhiều loại khác.

Tài liệu quy ước dữ liệu + **các bẫy đã biết** (migration 048 `concept_id` nullable; migration 049/050/051 + trigger tự sinh `title` theo `exam_type`; mã `units=[101]` cho đề giữa kỳ Toán): [`docs/EXAM_BANK.md`](./docs/EXAM_BANK.md). Scope từ vựng Tiếng Anh 3: [`docs/TIENGANH3_TAP1_SCOPE.md`](./docs/TIENGANH3_TAP1_SCOPE.md). **Đọc EXAM_BANK.md mục 6 trước khi chạy SQL trực tiếp lên `assessment_collections`/`question_bank`.**

### 3.6 `(administration)` — CMS, Dashboard, quản lý user

Component: `components/administration/`.

| Route | Mô tả |
|---|---|
| `/dashboard` | Trang chủ học sinh |
| `/phu-huynh` | Khu vực phụ huynh — giao nhiệm vụ, theo dõi |
| `/settings` | Cấu hình cá nhân |

---

## 4. Cấu trúc thư mục cấp cao

```
edu-platform/
├── app/
│   ├── layout.tsx, globals.css, page.tsx     # Root layout & landing page (/)
│   ├── login/                                # Đăng nhập / đăng ký
│   ├── (app)/                                # Route group bảo vệ — xem mục 3
│   │   ├── layout.tsx                        # Auth guard + top nav + gamification bar
│   │   ├── (learning)/  (assessment)/
│   │   ├── (flipbook)/  actions.ts            # saveFlipbookQuizAttempt — lưu kết quả quiz
│   │   ├── (question-bank)/  (exam-bank)/  (administration)/
│   └── api/
│       ├── ai/{teacher,daily-summary,insights,universal-tutor}/route.ts
│       ├── assessment/route.ts
│       ├── speaking/, flipbooks/, events/, english-world/
│
├── components/
│   ├── learning/        # AITeacherChat, ListeningClient, ReadingClient, WritingClient,
│   │                     # StartersLearningEngine, SubjectVolumeTabs, YouTubeEmbed, v.v.
│   ├── assessment/       # AssessmentResultCard, SBTWorkbookClient
│   ├── flipbook/         # FlipbookClient, FlipbookQuizClient, FlipbookQuizLessonList,
│   │                     # KHTNClipper, PdfViewer
│   ├── universal/        # Renderer cho Universal Learning Engine (MultipleChoiceRenderer,
│   │                     # FillBlankRenderer, MatchPairRenderer, CategorizationRenderer, LearnNodeClient...)
│   ├── administration/   # CMS components
│   ├── gamification/     # HeartProvider, StreakFlame, XPToast
│   ├── ui/                # SpaceBackground và các UI primitive chung
│   └── DictionaryPopup.tsx, SignOutButton.tsx, TopNavLinks.tsx, AriaDebrief.tsx, v.v.
│
├── lib/
│   ├── assessment/        # ai-generator, blueprint-mapper, engine, generation-engine, question-selector
│   ├── adaptive/           # sync-engine — đồng bộ tiến độ học thích ứng (còn sơ khai)
│   ├── mastery/            # engine.ts — mastery tracking (mới bắt đầu)
│   ├── srs/                # scheduler.ts — Spaced Repetition System (cơ bản)
│   ├── speaking/           # curriculumContextBuilder, prompt-generator
│   ├── curriculum/         # retrieval-service, toan3-tap1.ts
│   ├── subjects/           # adapter theo môn (english/, math/)
│   ├── ai/                 # universalContextBuilder
│   ├── data/                # Dữ liệu tĩnh: từ vựng, sbtUnit*, unit3-10Data...
│   ├── quizSound.ts          # Beep đúng/sai cho FlipbookQuizClient (Web Audio API, không cần file mp3)
│   └── supabase/            # client.ts, middleware.ts, server.ts
│
├── pipeline/                # Python — OCR pipeline (xem mục 3.3 + docs/CONTEXT.md mục C)
│   ├── src/main.py, src/core/{pdf_processor,layout_detector,ocr_engine,packager}.py
│   └── requirements.txt
│
├── content/                  # Dữ liệu tĩnh dạng file (JSON/PDF) — KHÔNG chứa runtime data
│   ├── khtn-7-workbook.json   # Workbook KHTN 7 soạn tay, 10 bài — vẫn dùng bởi components/universal/WorkbookAnswerSheet.tsx (Universal Learning Engine, KHÔNG liên quan flipbook)
│   ├── khtn7-questions.json   # Output luồng Quiz Text-Only — danh sách câu hỏi phẳng có đáp án, dùng bởi /flipbooks/khtn7/quiz
│   ├── khtn7-answer-key.json  # Đáp án thô trích từ phần "HƯỚNG DẪN GIẢI" của sách, key "Bài.Câu"
│   ├── english7-workbook.json
│   ├── assessments/           # Đề thi import thủ công (xem AGENT_INSTRUCTIONS.md trong đó)
│   └── *.pdf                  # Nguồn PDF gốc một số sách (Toán 3, Tiếng Anh 3, IELTS Foundation)
│
├── public/books/                # Hiện trống — từng chứa ảnh trang scan của luồng Hotspot/Review (đã xóa)
│
├── scripts/                   # ~98 script một lần (seed-*, generate-*, check-*, fix-*, migrate-*, cleanup-*)
│
├── supabase/migrations/       # SQL theo thứ tự 001 → 049 (xem mục 7)
│
├── docs/
│   ├── CONTEXT.md             # ⚠️ Bắt buộc đọc — kiến trúc lõi + luật cứng cho agent
│   └── EXAM_BANK.md           # Quy ước dữ liệu phân hệ exam-bank
│
├── agent_prompt/               # Hướng dẫn quy trình cho agent tương lai
│   ├── implement_pdf_scan_pipeline_prompt.md         # Luồng Hotspot/Review
│   ├── implement_text_only_quiz_pipeline_prompt.md   # Luồng Quiz Text-Only (mới, ưu tiên)
│   └── ielts_flow_book_readme.md, implement_next_unit_flow_book_prompt.md
│
└── .agents/AGENTS.md           # Quy tắc bắt buộc cho mọi agent hoạt động trong workspace
```

---

## 5. AI Integration (Gemini)

- `/api/ai/teacher` — Chat giáo viên AI, model fallback chain (`gemini-flash-latest` → `gemini-1.5-flash` → ... → `gemini-1.5-pro`), 2 system prompt (`text` song ngữ, `speaking` toàn tiếng Anh).
- `/api/ai/universal-tutor`, `/api/ai/daily-summary`, `/api/ai/insights` — hỗ trợ Universal Learning Engine và tổng hợp tiến độ.
- `lib/assessment/ai-generator.ts` — sinh câu hỏi tự động cho ngân hàng câu hỏi/đề.
- Từ điển nổi (`DictionaryPopup.tsx`) — tra nhanh hoặc qua AI, lưu lịch sử `localStorage`.

---

## 6. Pipeline OCR Sách Scan (Python, `pipeline/`)

Xem đầy đủ ở `docs/CONTEXT.md` mục C. Quy trình hiện dùng — **Luồng Quiz Text-Only** (luồng Hotspot/Review cũ đã bị xóa hoàn toàn, không tạo lại trừ khi có yêu cầu rõ ràng phải hiển thị ảnh trang gốc):

1. OCR toàn trang sách (không cắt theo khung/bbox) bằng EasyOCR.
2. Tách câu hỏi theo số thứ tự `Bài.Câu` in trong sách, dùng thuật toán quy hoạch động để loại false positive.
3. Tự động tách trắc nghiệm (option A/B/C/D) vs tự luận.
4. Map đáp án từ phần "HƯỚNG DẪN GIẢI" của sách.
5. Output: `content/[bookSlug]-questions.json` — không có ảnh, không có bbox/hotspot.

Render tại `/flipbooks/[bookSlug]/quiz` (danh sách Bài) và `/flipbooks/[bookSlug]/quiz/[bai]` (quiz từng bài). Khi học sinh bấm "Hoàn Thành", kết quả (điểm trắc nghiệm + chi tiết từng câu) được lưu vào bảng `learning_sessions` có sẵn qua `saveFlipbookQuizAttempt` — cùng nguồn dữ liệu mà `/dashboard` và trang Phụ huynh (`/phu-huynh`) đọc để hiện lịch sử học. **Quy ước field bắt buộc** (đặt sai sẽ khiến lịch sử lưu được nhưng hiển thị sai/thiếu — đã xảy ra thật, xem `docs/CONTEXT.md` mục 3.D): `summary_metrics.type` phải là `"exam"` (không phải tên tự đặt), tên bài lưu ở field `unit_topic` (không phải `title`/`lesson_title`).

Hướng dẫn từng bước đầy đủ + các cạm bẫy OCR đã gặp (watermark, số liệu bị OCR sai, mất số thứ tự...): `agent_prompt/implement_text_only_quiz_pipeline_prompt.md`. Cần `pip install -r pipeline/requirements.txt` trước khi chạy.

---

## 7. Hướng dẫn Setup (cho dev mới)

### Bước 1: Database

Chạy lần lượt tất cả file SQL trong `supabase/migrations/` theo số thứ tự (`001` → `049` tại thời điểm viết, kiểm tra file mới nhất thực tế trong thư mục) trong Supabase SQL Editor.

Nhóm migration đáng chú ý gần đây: `043`–`047` (Parent Tasks), `048` (`question_bank.concept_id` nullable — phục vụ exam-bank), `049` (fix tiêu đề đề giữa kỳ).

### Bước 2: Môi trường

Tạo `.env.local` theo mẫu ở mục 2.

### Bước 3: Cài đặt và chạy
```bash
npm install
npm run dev
# Mở http://localhost:3000
```

### Pipeline OCR (tùy chọn, chỉ khi cần nhập liệu sách scan mới)
```bash
cd pipeline
pip install -r requirements.txt
python src/main.py <path-to-pdf> --slug <book-slug> --pages 10
```

### NPM Scripts

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run generate:toan3` | Tái tạo SQL curriculum Toán 3 từ `scripts/generate-toan3-sql.ts` |
| `npx tsx scripts/seed-exam-bank.ts <file\|thư-mục> [--dry-run]` | Generator chung nạp đề exam-bank (xem `docs/EXAM_BANK.md`) |

Ngoài ra có ~98 script một lần trong `scripts/` (tiền tố `seed-*`, `generate-*`, `check-*`, `fix-*`, `migrate-*`, `cleanup-*`) — chạy qua `npx tsx scripts/<file>.ts`, đọc nội dung từng file trước khi chạy vì đây là script tác động trực tiếp DB.

---

## 8. Luật cứng cho Agent (tóm tắt — đọc đầy đủ ở `docs/CONTEXT.md` và `.agents/AGENTS.md`)

- **MUST** đọc `docs/CONTEXT.md` trước khi code bất kỳ task nào trong dự án này.
- **MUST** giữ tách biệt dữ liệu tĩnh (Questions/Exams trong `content/`, `question_bank`, `exams`) với dữ liệu runtime (StudentAnswers/Score) — không bao giờ nhúng `score`/`userAnswer` vào JSON tĩnh hay vào `metadata_json`.
- **MUST** đặt code đúng route group/thư mục component theo phân hệ (mục 3).
- **MUST NOT** phá vỡ cấu trúc layout/routing chung mà không có sự đồng ý của User.
- **MUST NOT** dùng thư viện UI ngoài Tailwind trừ khi được chỉ định rõ.
- Khi quyết định kiến trúc quan trọng, ghi lại vào `docs/` hoặc `agent_prompt/` để agent sau không lặp lại sai lầm.

---

## 9. Điểm Mở rộng Tương lai

- [ ] Xây UI cho `(question-bank)` và `(exam-bank)` — hiện 2 route group này chưa có `page.tsx`, chỉ là tầng dữ liệu.
- [ ] Hoàn thiện `lib/mastery/` (mới có `engine.ts` cơ bản) và `lib/adaptive/` (adaptive recommendation thật, hiện chỉ có sync engine).
- [ ] Mở rộng pipeline OCR Quiz Text-Only cho các bài còn lại của sách SBT KHTN 7 (đã làm Bài 1-5, trang 1-23; còn ~124 trang/nhiều bài).
- [ ] Xây màn hình "Lịch sử làm bài" riêng cho học sinh tự xem lại chi tiết các lần quiz đã làm (hiện dữ liệu chi tiết từng câu đã lưu trong `learning_sessions.summary_metrics.answers`, nhưng chưa có UI đọc lại — `/dashboard` và `/phu-huynh` chỉ hiện tóm tắt điểm, không hiện chi tiết câu).
- [ ] Mở rộng role `teacher`/`admin`.
