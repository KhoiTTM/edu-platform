# BrightPath Academy (Grades 3 & 7)

Modern student portal built with **Next.js 15**, **Tailwind CSS**, and **Supabase**: login, dashboard, weekly schedule, PDF lessons, embedded YouTube (privacy-enhanced), quizzes, and score history. Layout is touch-friendly for **tablets and iPads**.

## 1. Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier is fine)

## 2. Create the database

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of `supabase/migrations/001_schema.sql` and click **Run**.

This creates tables, Row Level Security policies, a trigger that creates a `profiles` row when a user signs up, and seed lessons/quizzes for grades **3** and **7**.

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

1. Use **Sign up** on `/login`, pick **Grade 3** or **Grade 7**, then open the **Dashboard**.
2. Open a **lesson** to view the **PDF** (iframe) and **YouTube** embed, then **Take the quiz**.
3. Visit **Schedule** — a sample Mon–Fri timetable is created automatically the first time you load that page.
4. Check **Scores** for saved attempts.

## Project map

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Public landing |
| `app/login/page.tsx` | Sign in / sign up |
| `app/(app)/*` | Authenticated student area (dashboard, schedule, lessons, quiz, scores) |
| `middleware.ts` | Keeps routes private; refreshes Supabase session cookies |
| `lib/supabase/*` | Browser + server Supabase clients |
| `supabase/migrations/001_schema.sql` | Schema, RLS, trigger, seed data |

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
