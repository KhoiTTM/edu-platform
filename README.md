# BrightPath Academy — Tài liệu Dự án Toàn diện

> **Mục đích tài liệu này:** Giúp bất kỳ AI hoặc lập trình viên nào đọc vào hiểu ngay cấu trúc, luồng dữ liệu, và chức năng của toàn bộ dự án mà không cần đặt câu hỏi thêm.

---

## 1. Tổng quan Dự án

**BrightPath Academy** là một **cổng thông tin học sinh** (student portal) dành cho học sinh lớp 3 và lớp 7 (có thêm luồng IELTS Foundation). Ứng dụng cho phép:

- Đăng nhập / đăng ký tài khoản học sinh (kèm chọn khối lớp)
- Xem lịch học theo tuần (môn Toán, Tiếng Anh lớp 3)
- Học bài theo từng môn: đọc PDF sách giáo khoa, xem video YouTube
- Luyện thi IELTS Foundation (Mindset for IELTS) với lộ trình 36 buổi
- Phòng luyện nghe 3 bước (Gist → Bilingual Transcript → Shadowing)
- Làm bài tập trắc nghiệm (quiz) có chấm điểm và lưu lịch sử điểm
- Chat với **Giáo viên AI** (Gemini) tích hợp theo bài học
- **Từ điển nổi** (floating dictionary) tra Anh-Việt nhanh hoặc qua AI

---

## 2. Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Framework | **Next.js 15** (App Router, Server Components) |
| Ngôn ngữ | **TypeScript 5** |
| Styling | **Tailwind CSS 3** |
| Backend / Auth / DB | **Supabase** (PostgreSQL + Row Level Security + Auth) |
| AI | **Google Gemini 1.5 Flash** (`@google/generative-ai`) |
| Font | `Outfit` (display), `DM Sans` (body) — Google Fonts |
| Icons | `lucide-react` |
| PDF Viewer | `react-pdf` |
| Deploy target | Netlify (có `netlify.toml`) |

### Biến môi trường cần thiết (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
GEMINI_API_KEY=<google-gemini-key>
```

---

## 3. Cấu trúc Thư mục

```
edu-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, metadata, viewport
│   ├── globals.css               # CSS gốc, Tailwind base
│   ├── page.tsx                  # Landing page công khai (/)
│   ├── login/                    # Trang đăng nhập / đăng ký
│   │   └── page.tsx
│   ├── (app)/                    # Route group: vùng bảo vệ (cần đăng nhập)
│   │   ├── layout.tsx            # Layout có sidebar + nav + auth guard
│   │   ├── dashboard/page.tsx    # Trang chủ học sinh (/dashboard)
│   │   ├── hoc-tap/              # Học bài (/hoc-tap)
│   │   │   ├── page.tsx          # Danh sách môn học
│   │   │   ├── [subject]/page.tsx # Chi tiết môn (tập 1/2 + danh sách bài)
│   │   │   └── mindset-ielts/    # IELTS Foundation (route riêng)
│   │   │       ├── page.tsx      # Tổng quan 36 buổi, nhóm theo Unit
│   │   │       ├── listening/page.tsx
│   │   │       ├── speaking/page.tsx
│   │   │       ├── reading/page.tsx
│   │   │       ├── writing/page.tsx
│   │   │       └── grammar/page.tsx
│   │   ├── listening/            # Phòng luyện nghe IELTS (/listening)
│   │   │   ├── page.tsx          # Danh sách buổi nghe
│   │   │   └── [id]/page.tsx     # Chi tiết phòng luyện nghe (3 bước)
│   │   ├── lessons/              # Route lessons chung
│   │   │   └── [id]/             # Chi tiết bài học
│   │   ├── quiz/                 # Quiz runner (/quiz)
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── QuizRunner.tsx
│   │   │       └── actions.ts    # Server Actions: lưu điểm vào DB
│   │   ├── schedule/             # Lịch học (/schedule)
│   │   │   ├── page.tsx          # Server: fetch lịch tuần / schedule_entries
│   │   │   ├── ScheduleClient.tsx      # Client: hiển thị lịch lớp 7
│   │   │   ├── WeeklyScheduleClient.tsx # Client: hiển thị lịch tuần lớp 3
│   │   │   └── actions.ts        # Server Action: tạo lịch demo
│   │   └── scores/page.tsx       # Lịch sử điểm quiz (/scores)
│   └── api/                      # API Routes
│       └── ai/
│           ├── teacher/route.ts  # POST /api/ai/teacher — Gemini chat
│           └── dictionary/route.ts # POST /api/ai/dictionary — tra từ AI
│
├── components/                   # Shared UI Components (client)
│   ├── AITeacherChat.tsx         # Chat giáo viên AI (hybrid: scripted + Gemini)
│   ├── DictionaryPopup.tsx       # Từ điển nổi Anh-Việt (quick / AI mode)
│   ├── IELTSSkillsNav.tsx        # Tab lọc kỹ năng IELTS
│   ├── LessonListByTopic.tsx     # Danh sách bài theo chủ đề
│   ├── LessonPractice.tsx        # Bài tập trắc nghiệm chấm từng câu
│   ├── ListeningClient.tsx       # Phòng luyện nghe 3 bước (quiz + transcript)
│   ├── PdfViewer.tsx             # Viewer react-pdf trong browser
│   ├── SignOutButton.tsx         # Nút đăng xuất (client)
│   ├── SubjectVolumeTabs.tsx     # Tab chuyển Tập 1 / Tập 2
│   ├── TextbookSection.tsx       # Hiển thị PDF sách + page_hint
│   └── YouTubeEmbed.tsx          # Nhúng YouTube (youtube-nocookie)
│
├── lib/                          # Thư viện & data tĩnh
│   ├── supabase/
│   │   ├── client.ts             # createBrowserClient (phía client)
│   │   ├── server.ts             # createServerClient (phía server, cookies)
│   │   └── middleware.ts         # updateSession — refresh token, redirect guard
│   ├── curriculum/
│   │   └── toan3-tap1.ts         # Dữ liệu curriculum Toán lớp 3 tập 1
│   ├── schedule/
│   │   └── term-dates.ts         # Hằng số ngày bắt đầu học kỳ
│   ├── ieltsQuizzes.ts           # 15 câu hỏi/unit IELTS + scripted AI chat steps
│   ├── ieltsTranscripts.ts       # Transcript song ngữ + keyVocabulary theo lesson
│   └── storage.ts                # Helper Supabase Storage URL
│
├── types/
│   └── database.ts               # TypeScript types: Profile, Lesson, Quiz, v.v.
│
├── content/                      # PDF sách giáo khoa (phục vụ local dev)
│   ├── toan3-tap1.pdf
│   ├── toan3-tap2.pdf
│   ├── tienganh3-tap1.pdf
│   ├── tienganh3-tap2.pdf
│   └── mindset-for-ielts-foundation.pdf
│
├── supabase/migrations/          # SQL migrations chạy tuần tự
│   ├── 001_schema.sql            # Schema chính + RLS + seed data ban đầu
│   ├── 002_lessons_curriculum_vi.sql  # Môn TV, thứ tự bài, giải thích quiz
│   ├── 003_subjects_textbook.sql      # Bảng subjects, PDF URL, bucket Storage
│   ├── 004_toan3_tap1_curriculum.sql  # 55 bài Toán lớp 3 tập 1 + quiz
│   ├── 005_weekly_lesson_schedule.sql # Lịch tuần Toán lớp 3 (từ 01/06/2026)
│   ├── 006_tienganh3_tap1_curriculum.sql # Tiếng Anh lớp 3 tập 1
│   ├── 008_ielts_foundation_setup.sql # 36 buổi IELTS Foundation
│   ├── 010_ielts_roadmap.sql         # Lộ trình IELTS nâng cao
│   ├── 011_update_cherry_name.sql    # Cập nhật tên học sinh demo
│   ├── 012_add_skill_focus_to_lessons.sql # Thêm cột skill_focus
│   └── 013_fix_ielts_skill_focus.sql # Fix dữ liệu skill_focus IELTS
│
├── scripts/
│   └── generate-toan3-sql.ts     # Script tạo lại 004_toan3_tap1_curriculum.sql
│
├── middleware.ts                  # Next.js middleware entry point (gọi updateSession)
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── netlify.toml
```

---

## 4. Database Schema (Supabase / PostgreSQL)

### Bảng chính

#### `profiles` — thông tin học sinh (1:1 với `auth.users`)
| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `id` | uuid PK | = auth.users.id |
| `email` | text | |
| `display_name` | text | Tên hiển thị |
| `grade` | smallint | 3 hoặc 7 |
| `created_at` | timestamptz | |

**Trigger:** `on_auth_user_created` → tự động tạo profile khi user đăng ký, lấy `grade` và `display_name` từ `raw_user_meta_data`.

#### `subjects` — môn học theo tập sách
| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `id` | uuid PK | |
| `grade` | smallint | 0=tất cả, 3, 7 |
| `slug` | text | `toan`, `tieng_anh`, `mindset-ielts`, v.v. |
| `label_vi` | text | Tên tiếng Việt |
| `volume` | smallint | 1 hoặc 2 |
| `textbook_pdf_url` | text | URL PDF trên Supabase Storage |
| `textbook_title` | text | |

#### `lessons` — từng bài học
| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `id` | uuid PK | |
| `grade` | smallint | 0=tất cả lớp, 3, 7 |
| `subject_slug` | text | |
| `subject_label_vi` | text | |
| `subject_id` | uuid FK subjects | |
| `title` | text | |
| `summary` | text | |
| `youtube_video_id` | text | YouTube video ID |
| `skill_focus` | text | `listening`, `speaking`, `reading`, `writing`, `grammar` |
| `lesson_index` | int | Thứ tự trong môn/tập |
| `volume` | smallint | 1 hoặc 2 |
| `page_hint` | text | Ví dụ: "Trang 12-18" |
| `book_lesson_number` | int | Số bài trong sách |
| `topic_label` | text | Nhãn chủ đề |
| `video_part` | int | Phần video (1, 2, 3...) |
| `duration_minutes` | int | |

**RLS:** học sinh chỉ thấy bài thuộc `grade` của mình (và grade=0).

#### `quizzes` + `quiz_questions` + `quiz_attempts`

```
quizzes: id, lesson_id (FK), title
quiz_questions: id, quiz_id (FK), question, options (jsonb), correct_index, order_index, explanation
quiz_attempts: id, user_id, quiz_id, score, total, created_at
```

**RLS:** `quiz_attempts` — chỉ học sinh đó đọc/ghi được data của mình.

#### `schedule_entries` — lịch học cá nhân (lớp 7)
| Cột | Ghi chú |
|-----|---------|
| `user_id` | FK auth.users |
| `lesson_id` | FK lessons |
| `day_of_week` | 0=CN, 1=T2...6=T7 |
| `start_time`, `end_time` | TIME |

#### `weekly_lesson_schedule` — lịch học theo tuần (lớp 3, dùng chung)
| Cột | Ghi chú |
|-----|---------|
| `grade` | 3 |
| `subject_slug` | `toan`, `tieng_anh` |
| `volume` | 1 |
| `term_start_date` | Mốc bắt đầu học kỳ (`2026-06-01`) |
| `week_number` | Tuần 1..11 |
| `weekday` | 1=T2..5=T6 |
| `lesson_index` | Số thứ tự bài |
| `start_time`, `end_time` | TIME |

---

## 5. Authentication & Middleware

### Luồng xác thực

```
Người dùng truy cập URL
        ↓
middleware.ts (chạy trên mọi request)
        ↓
lib/supabase/middleware.ts → updateSession()
  - Refresh Supabase session token qua cookie
  - Nếu chưa đăng nhập + route không public → redirect /login
  - Nếu đã đăng nhập + đang ở /login hoặc / → redirect /dashboard
        ↓
app/(app)/layout.tsx (Server Component)
  - Gọi supabase.auth.getUser()
  - Nếu không có user → redirect /login
  - Query profiles để lấy display_name, grade
  - Render sidebar (desktop) + top nav (mobile/tablet)
```

**Public routes:** `/` (landing), `/login`  
**Protected routes:** tất cả trong `/(app)/*`

### Supabase Client Strategy

| File | Dùng ở đâu |
|------|-----------|
| `lib/supabase/client.ts` | Client Components (`"use client"`) |
| `lib/supabase/server.ts` | Server Components, Server Actions, Route Handlers |
| `lib/supabase/middleware.ts` | Next.js middleware |

---

## 6. Routing & Pages

### Route Map

| URL | File | Chức năng |
|-----|------|-----------|
| `/` | `app/page.tsx` | Landing page marketing |
| `/login` | `app/login/page.tsx` | Đăng nhập / Đăng ký (chọn lớp) |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | Trang chủ: ds môn học + điểm gần đây |
| `/hoc-tap` | `app/(app)/hoc-tap/page.tsx` | Chọn môn học |
| `/hoc-tap/[subject]` | `app/(app)/hoc-tap/[subject]/page.tsx` | Chọn tập + danh sách bài |
| `/hoc-tap/mindset-ielts` | `app/(app)/hoc-tap/mindset-ielts/page.tsx` | IELTS 36 buổi nhóm theo Unit |
| `/hoc-tap/mindset-ielts/listening` | `...mindset-ielts/listening/page.tsx` | Danh sách bài Listening IELTS |
| `/listening` | `app/(app)/listening/page.tsx` | Phòng luyện nghe catalog |
| `/listening/[id]` | `app/(app)/listening/[id]/page.tsx` | Phòng luyện nghe 3 bước |
| `/quiz/[id]` | `app/(app)/quiz/[id]/page.tsx` | Làm quiz |
| `/schedule` | `app/(app)/schedule/page.tsx` | Lịch học (lớp 3: theo tuần, lớp 7: entries) |
| `/scores` | `app/(app)/scores/page.tsx` | Lịch sử điểm |

### API Routes

| Endpoint | File | Chức năng |
|----------|------|-----------|
| `POST /api/ai/teacher` | `app/api/ai/teacher/route.ts` | Gemini AI giáo viên (chat + speaking mode) |
| `POST /api/ai/dictionary` | `app/api/ai/dictionary/route.ts` | Gemini tra từ thông minh |

---

## 7. Components

### `AITeacherChat.tsx` — Chat Giáo viên AI (Hybrid)

**Kiến trúc Hybrid 90/10:**
- **90% Scripted (local, không tốn API quota):** Giáo viên dẫn dắt theo kịch bản định sẵn từ `lib/ieltsQuizzes.ts`. Kịch bản theo từng Unit IELTS.
- **10% Realtime AI (Gemini):** Khi học sinh đặt câu hỏi chứa từ như "giải thích", "dịch", "tại sao", "?", v.v. → gửi request tới `/api/ai/teacher`.

**Props:**
```typescript
sessionInfo: { title: string; summary: string }
studentName: string
```

### `ListeningClient.tsx` — Phòng Luyện Nghe 3 Bước

4 tab nội dung cho 1 bài nghe:
1. **Bước 1 - Nghe chay** (Gist Listening): học sinh nghe không phụ đề, ghi chú tóm tắt
2. **Bước 2 - Transcript song ngữ**: hiển thị từng dòng EN/VI + phân tích từ vựng tiêu điểm
3. **Bước 3 - Shadowing**: hướng dẫn kỹ thuật nói đuổi
4. **Quiz** (Comprehension): 15 câu trắc nghiệm, phân trang từng câu, hiển thị đáp án + giải thích sau khi nộp

Layout: 7/12 cột trái (player + tabs) + 5/12 cột phải (tóm tắt + đáp án).

**Props:** `lesson: Lesson`, `transcript: IELTSTranscript`, `questions: QuizQuestion[]`

### `DictionaryPopup.tsx` — Từ điển Nổi

Floating button góc phải dưới, 2 chế độ:
- **Tra nhanh**: gọi Google Translate client API (không cần key, ~100ms, offline-like)
- **Giải nghĩa AI**: gọi `/api/ai/dictionary` với Gemini

Lưu lịch sử 10 từ gần nhất vào `localStorage`.

### Các component khác

| Component | Chức năng |
|-----------|-----------|
| `LessonPractice.tsx` | Bài tập trắc nghiệm chấm từng câu ngay (inline, không lưu điểm) |
| `SubjectVolumeTabs.tsx` | Tab chuyển Tập 1 / Tập 2 với query param `?tap=` |
| `LessonListByTopic.tsx` | Render danh sách bài theo `topic_label`, có fallback card |
| `TextbookSection.tsx` | Hiển thị tên PDF + gợi ý trang (`page_hint`) + nút mở PDF |
| `YouTubeEmbed.tsx` | Nhúng YouTube với `youtube-nocookie.com` |
| `PdfViewer.tsx` | Viewer react-pdf trong browser |
| `IELTSSkillsNav.tsx` | Tabs lọc kỹ năng: Listening/Speaking/Reading/Writing/Grammar |
| `SignOutButton.tsx` | Client button gọi `supabase.auth.signOut()` |

---

## 8. AI Integration (Gemini)

### `/api/ai/teacher` — Giáo viên IELTS

- **Model fallback chain:** `gemini-flash-latest` → `gemini-1.5-flash` → `gemini-2.0-flash` → ... → `gemini-1.5-pro`
- **2 System Prompt:**
  - `text` mode: Giáo viên IELTS song ngữ Anh-Việt, hướng dẫn 4 kỹ năng
  - `speaking` mode: Conversation partner 100% tiếng Anh, câu trả lời ngắn (1-3 câu)
- **History sanitization:** đảm bảo messages luân phiên user/model đúng chuẩn Gemini

### `/api/ai/dictionary` — Tra từ AI

- Phân tích từ vựng thông minh: phát âm, nghĩa, ví dụ
- Fallback tương tự teacher route

---

## 9. Data Files tĩnh

### `lib/ieltsTranscripts.ts`

Map `{ [youtube_video_id]: IELTSTranscript }` với cấu trúc:
```typescript
type IELTSTranscript = {
  title: string
  unitTitle: string
  description: string
  keyVocabulary: { word: string; pronunciation: string; meaning: string }[]
  lines: { english: string; vietnamese: string }[]
}
```
Dùng để hiển thị transcript song ngữ trong phòng luyện nghe.

### `lib/ieltsQuizzes.ts`

- `getFallbackQuestionsForUnit(unitNum, quizId)`: 15 câu hỏi comprehension cho mỗi Unit IELTS (1-10) — dùng khi DB chưa có quiz questions
- `getScriptForUnit(unitNum, studentName, summary)`: kịch bản chat giáo viên AI (scripted steps) theo từng Unit

### `lib/schedule/term-dates.ts`

```typescript
export const TOAN_GRADE3_TERM_START = "2026-06-01"
```

---

## 10. Luồng Học Bài Chính

### Học sinh lớp 3/7 — Bài học thông thường

```
/hoc-tap → chọn môn → /hoc-tap/[subject]
    → chọn tập (1 hoặc 2, query ?tap=)
    → danh sách bài theo topic_label
    → click bài → /lessons/[id]
        - TextbookSection: PDF sách + page_hint
        - YouTubeEmbed: video bài giảng
        - LessonPractice: quiz bài tập (inline, không lưu)
        - Bài kiểm tra tổng hợp → /quiz/[id]
            → QuizRunner (client)
            → actions.ts: saveQuizAttempt() → lưu vào quiz_attempts
```

### Học sinh IELTS — Buổi luyện nghe

```
/hoc-tap/mindset-ielts → danh sách 36 buổi (nhóm theo Unit)
    → click buổi có bài nghe → /listening/[id]
        - Server: fetch lesson, transcript, quiz questions
        - Client: ListeningClient (3 bước + quiz)
        - Floating: DictionaryPopup
        - Right panel: AITeacherChat (hybrid scripted + Gemini)
```

---

## 11. Hướng dẫn Setup (cho dev mới)

### Bước 1: Database

Chạy tuần tự các file SQL trong Supabase SQL Editor:
1. `001_schema.sql` — schema cơ bản
2. `002_lessons_curriculum_vi.sql`
3. `003_subjects_textbook.sql`
4. `004_toan3_tap1_curriculum.sql`
5. `005_weekly_lesson_schedule.sql`
6. `006_tienganh3_tap1_curriculum.sql`
7. `008_ielts_foundation_setup.sql`
8. `010_ielts_roadmap.sql`
9. `012_add_skill_focus_to_lessons.sql`
10. `013_fix_ielts_skill_focus.sql`

### Bước 2: Storage PDF

1. Tạo bucket `textbooks` (public) trong Supabase Storage
2. Upload PDF vào đường dẫn: `grade3/toan-tap1.pdf`, `grade3/toan-tap2.pdf`, v.v.
3. Cập nhật `textbook_pdf_url` trong bảng `subjects`

### Bước 3: Môi trường

```bash
cp .env.example .env.local
# Điền NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, GEMINI_API_KEY
```

### Bước 4: Chạy

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

### Scripts

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run generate:toan3` | Tái tạo file `004_toan3_tap1_curriculum.sql` từ `lib/curriculum/toan3-tap1.ts` |

---

## 12. Ghi chú Thiết kế

- **Responsive:** Sidebar ẩn trên mobile/tablet → top bar + bottom nav tabs. Mọi touch target ≥ 44px.
- **Dark mode by default:** Nền `#020617` (slate-950), sidebar `#0f172a` (slate-900).
- **Color system:** Primary = `sky-600`, accent = `emerald`, `amber`, `fuchsia`, `indigo` theo kỹ năng IELTS.
- **PDF cross-origin:** Một số browser chặn PDF trong iframe — có nút "Mở riêng" dự phòng.
- **YouTube:** Nhúng qua `youtube-nocookie.com` không tracking, `modestbranding=1`.
- **IELTS Quiz fallback:** Nếu DB chưa có quiz questions cho bài nghe → dùng 15 câu hardcoded từ `ieltsQuizzes.ts`.
- **Gemini quota:** 90% chat dùng scripted steps (không gọi API) → tiết kiệm quota đáng kể.

---

## 13. Điểm Mở rộng Tương lai

- [ ] Thêm role `teacher` / `admin` để quản lý nội dung
- [ ] Lưu điểm quiz listening vào `quiz_attempts` (hiện chỉ client-side)
- [ ] Thêm lịch học lớp 7 dạng `weekly_lesson_schedule` (hiện dùng `schedule_entries` cá nhân)
- [ ] Speaking practice với Web Speech API + Gemini đánh giá
- [ ] Thêm môn học: Khoa học, Tiếng Việt lớp 3
- [ ] Notifications / reminders học theo lịch

---

## 14. Tài liệu Chi Tiết

Vui lòng tham khảo các tài liệu chi tiết sau trong thư mục `docs/`:
- [Kiến trúc, DB và Gamification (Architecture)](./docs/architecture.md)
- [Thuật toán Adaptive Assessment & Spaced Repetition (SM-2)](./docs/adaptive_engine.md)
