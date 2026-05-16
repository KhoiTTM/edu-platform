# BrightPath Academy (Grades 3 & 7)

Modern student portal built with **Next.js 15**, **Tailwind CSS**, and **Supabase**: login, dashboard, weekly schedule, PDF lessons, embedded YouTube (privacy-enhanced), quizzes, and score history. Layout is touch-friendly for **tablets and iPads**.

## 1. Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier is fine)

## 2. Create the database

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of `supabase/migrations/001_schema.sql` and click **Run**.
3. Run **`supabase/migrations/002_lessons_curriculum_vi.sql`** (môn tiếng Việt, thứ tự bài, giải thích câu hỏi).
4. Run **`supabase/migrations/003_subjects_textbook.sql`** (bảng `subjects`, PDF sách chung theo **tập 1 / tập 2**, `page_hint` từng bài, bucket Storage `textbooks`).
5. Run **`supabase/migrations/004_toan3_tap1_curriculum.sql`** — **55 bài** Toán lớp 3 tập 1 (mỗi video = 1 bài trên app khi có), kèm quiz ôn tập.
6. Run **`supabase/migrations/005_weekly_lesson_schedule.sql`** — lịch **theo tuần** cho Toán lớp 3 tập 1: **Thứ Hai → Thứ Sáu**, **10:00**, 11 tuần × 5 ngày → `lesson_index` 1…55; mốc **01/06/2026** (Thứ Hai).

Sau bước 5, cập nhật PDF tập 1:

```sql
update public.subjects
set textbook_pdf_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/textbooks/grade3/toan-tap1.pdf'
where grade = 3 and slug = 'toan' and volume = 1;
```

Chỉnh lại path cho đúng file bạn đã upload. File mẫu local: `content/toan3-tap1.pdf`.

Tạo lại file SQL sau khi sửa dữ liệu: `npm run generate:toan3`

### Upload sách PDF (Supabase Storage)

1. Supabase → **Storage** → bucket **`textbooks`** (public) — tạo tự động bởi migration 003 nếu chưa có.
2. Upload file, ví dụ: `grade3/toan-tap1.pdf`, `grade3/toan-tap2.pdf`.
3. Copy **public URL** (dạng `https://<project>.supabase.co/storage/v1/object/public/textbooks/grade3/toan-tap1.pdf`).
4. Supabase → **Table Editor** → **`subjects`** → dán vào cột **`textbook_pdf_url`** cho đúng `grade`, `slug` (toan, tieng_anh), `volume` (1 hoặc 2).
5. Mỗi **lesson**: cập nhật `youtube_video_id`, `page_hint` (vd. `Trang 12–18`), `volume`, `lesson_index`.

Một file PDF = cả tập sách; mỗi bài chỉ khác **trang đọc**, **video** và **bài tập**.

### Email confirmations (recommended for local demos)

Supabase → **Authentication** → **Providers** → **Email** → for development you can disable **Confirm email** so students can sign in immediately after sign-up.

## 3. Configure environment variables

Copy `.env.example` to `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Fill in from Supabase → **Project Settings** → **API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. Try it out

1. Use **Sign up** on `/login`, pick **Grade 3** or **Grade 7**, then open the dashboard.
2. Go to **Học bài** (`/hoc-tap`): chọn **môn** → **tập 1/2** (nếu có) → **bài**. Trang bài: **sách PDF chung** + gợi ý trang, **YouTube**, **bài tập chấm ngay**, kiểm tra tổng hợp (lưu điểm).
3. Visit **Schedule** — a sample Mon–Fri timetable is created automatically the first time you load that page.
4. Check **Scores** for saved quiz attempts.

## Project map

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Public landing |
| `app/login/page.tsx` | Sign in / sign up |
| `app/(app)/*` | Authenticated student area (dashboard, schedule, lessons, quiz, scores) |
| `middleware.ts` | Keeps routes private; refreshes Supabase session cookies |
| `lib/supabase/*` | Browser + server Supabase clients |
| `supabase/migrations/001_schema.sql` | Schema, RLS, trigger, seed data |
| `supabase/migrations/002_lessons_curriculum_vi.sql` | Vietnamese subjects, lesson order, quiz explanations |
| `supabase/migrations/005_weekly_lesson_schedule.sql` | `weekly_lesson_schedule` — lịch tuần Toán 3 (từ 01/06/2026) |
| `app/(app)/hoc-tap/*` | Chọn môn → tập → bài |
| `components/LessonPractice.tsx` | Bài tập chấm từng câu + giải thích |
| `components/TextbookSection.tsx` | PDF sách chung + `page_hint` |

## Notes

- **PDFs**: Some browsers block cross-origin PDFs inside iframes; students can always use **Open separately**.
- **Videos**: Embeds use `youtube-nocookie.com` with modest branding.
- **Production**: Turn email confirmation back on, add teacher/admin roles as needed, and replace seed YouTube IDs with your own curriculum links.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
