-- BrightPath Academy schema for Supabase (PostgreSQL)
-- Run in: Supabase Dashboard → SQL Editor → New query → Paste → Run

-- Extensions
create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  display_name text,
  grade smallint not null default 3 check (grade in (3, 7)),
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  grade smallint not null check (grade in (3, 7)),
  title text not null,
  summary text,
  pdf_url text,
  youtube_video_id text,
  duration_minutes int default 45,
  created_at timestamptz not null default now()
);

create table if not exists public.schedule_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  unique (user_id, day_of_week, start_time)
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons on delete cascade,
  title text not null
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes on delete cascade,
  question text not null,
  options jsonb not null,
  correct_index smallint not null,
  order_index int not null default 0
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  quiz_id uuid not null references public.quizzes on delete cascade,
  score int not null,
  total int not null,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  g int;
begin
  g := coalesce(nullif(trim(new.raw_user_meta_data->>'grade'), '')::int, 3);
  if g not in (3, 7) then
    g := 3;
  end if;

  insert into public.profiles (id, email, display_name, grade)
  values (
    new.id,
    new.email,
    coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), split_part(new.email, '@', 1)),
    g
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(public.profiles.display_name, excluded.display_name),
    grade = coalesce(public.profiles.grade, excluded.grade);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.schedule_entries enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "lessons_select_grade" on public.lessons;
create policy "lessons_select_grade" on public.lessons
  for select using (
    auth.role() = 'authenticated'
    and grade = (select p.grade from public.profiles p where p.id = auth.uid())
  );

drop policy if exists "schedule_select_own" on public.schedule_entries;
create policy "schedule_select_own" on public.schedule_entries
  for select using (auth.uid() = user_id);

drop policy if exists "schedule_insert_own" on public.schedule_entries;
create policy "schedule_insert_own" on public.schedule_entries
  for insert with check (auth.uid() = user_id);

drop policy if exists "schedule_update_own" on public.schedule_entries;
create policy "schedule_update_own" on public.schedule_entries
  for update using (auth.uid() = user_id);

drop policy if exists "schedule_delete_own" on public.schedule_entries;
create policy "schedule_delete_own" on public.schedule_entries
  for delete using (auth.uid() = user_id);

drop policy if exists "quizzes_select_grade" on public.quizzes;
create policy "quizzes_select_grade" on public.quizzes
  for select using (
    exists (
      select 1 from public.lessons l
      where l.id = quizzes.lesson_id
        and l.grade = (select p.grade from public.profiles p where p.id = auth.uid())
    )
  );

drop policy if exists "questions_select_grade" on public.quiz_questions;
create policy "questions_select_grade" on public.quiz_questions
  for select using (
    exists (
      select 1 from public.quizzes q
      join public.lessons l on l.id = q.lesson_id
      where q.id = quiz_questions.quiz_id
        and l.grade = (select p.grade from public.profiles p where p.id = auth.uid())
    )
  );

drop policy if exists "attempts_select_own" on public.quiz_attempts;
create policy "attempts_select_own" on public.quiz_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "attempts_insert_own" on public.quiz_attempts;
create policy "attempts_insert_own" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);

-- Seed content (idempotent-ish: delete by fixed ids then insert)
delete from public.quiz_questions where quiz_id in (
  select id from public.quizzes where lesson_id in (
    select id from public.lessons where id in (
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001',
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002',
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001',
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002'
    )
  )
);
delete from public.quizzes where lesson_id in (
  select id from public.lessons where id in (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002'
  )
);
delete from public.lessons where id in (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002'
);

insert into public.lessons (id, grade, title, summary, pdf_url, youtube_video_id) values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001',
    3,
    'Reading adventure: curious questions',
    'Practice asking who, what, where, when, and why as you read short passages.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'M7lc1UVf-SE'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002',
    3,
    'Math mindset: patterns all around',
    'Spot number patterns in everyday objects — stairs, windows, and tiles.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'jNQXAC9IVRw'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001',
    7,
    'Algebra warm-up: expressions',
    'Translate words into expressions and simplify step by step.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    '9bZkp7q19f0'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002',
    7,
    'Science literacy: reading graphs',
    'Learn how charts tell stories about experiments and the real world.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'L_jWHffIx5E'
  );

insert into public.quizzes (id, lesson_id, title) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001', 'Check-in: reading questions'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002', 'Check-in: patterns'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001', 'Check-in: expressions'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002', 'Check-in: graphs');

insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index) values
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
    'Which question word asks about a person?',
    '["Where", "Who", "When", "Why"]'::jsonb,
    1,
    0
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
    'What do we call the main message of a story?',
    '["Title", "Theme", "Index", "Cover"]'::jsonb,
    1,
    1
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
    'Why do good readers make predictions?',
    '["To finish faster", "To stay curious and check ideas", "To skip hard words", "To avoid pictures"]'::jsonb,
    1,
    2
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
    '2, 4, 6, 8, … What comes next?',
    '["9", "10", "11", "12"]'::jsonb,
    1,
    0
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
    'Which set shows only even numbers?',
    '["1, 3, 5", "2, 4, 6", "1, 2, 3", "5, 7, 9"]'::jsonb,
    1,
    1
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
    'A repeating design is called a …',
    '["Fraction", "Pattern", "Paragraph", "Paragraph break"]'::jsonb,
    1,
    2
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
    'Simplify: 3x + 2x',
    '["5x", "6x", "5x²", "x + 5"]'::jsonb,
    0,
    0
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
    'Which expression means “a number decreased by 7”?',
    '["7 - n", "n - 7", "n + 7", "7n"]'::jsonb,
    1,
    1
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
    'What is the coefficient in 8y + 3?',
    '["3", "8", "y", "11"]'::jsonb,
    1,
    2
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
    'On a line graph, the horizontal axis often shows …',
    '["Frequency only", "Time or categories", "Only colors", "Only titles"]'::jsonb,
    1,
    0
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
    'A steep upward slope usually means …',
    '["Values are falling fast", "Values are rising fast", "The graph is broken", "There is no data"]'::jsonb,
    1,
    1
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
    'Why do scientists repeat experiments?',
    '["To use more colors", "To check if results are reliable", "To remove labels", "To hide outliers"]'::jsonb,
    1,
    2
  );

-- Helpful indexes
create index if not exists schedule_entries_user_day_idx
  on public.schedule_entries (user_id, day_of_week);
create index if not exists quiz_attempts_user_created_idx
  on public.quiz_attempts (user_id, created_at desc);
