-- Môn học: 1 PDF sách chung theo khối + môn + tập (1 hoặc 2)
-- Chạy sau 002_lessons_curriculum_vi.sql
-- Upload PDF lên bucket public "textbooks" rồi cập nhật textbook_pdf_url

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  grade smallint not null check (grade in (3, 7)),
  slug text not null,
  label_vi text not null,
  volume smallint not null check (volume in (1, 2)),
  textbook_pdf_url text,
  textbook_title text,
  created_at timestamptz not null default now(),
  unique (grade, slug, volume)
);

create index if not exists subjects_grade_slug_idx
  on public.subjects (grade, slug);

alter table public.lessons
  add column if not exists volume smallint not null default 1 check (volume in (1, 2)),
  add column if not exists page_hint text,
  add column if not exists subject_id uuid references public.subjects (id) on delete set null;

create index if not exists lessons_grade_subject_volume_idx
  on public.lessons (grade, subject_slug, volume, lesson_index);

alter table public.subjects enable row level security;

drop policy if exists "subjects_select_grade" on public.subjects;
create policy "subjects_select_grade" on public.subjects
  for select using (
    auth.role() = 'authenticated'
    and grade = (select p.grade from public.profiles p where p.id = auth.uid())
  );

-- Storage bucket (chạy trong SQL; nếu bucket đã tồn tại thì bỏ qua lỗi)
insert into storage.buckets (id, name, public)
values ('textbooks', 'textbooks', true)
on conflict (id) do update set public = true;

drop policy if exists "textbooks_public_read" on storage.objects;
create policy "textbooks_public_read" on storage.objects
  for select using (bucket_id = 'textbooks');

drop policy if exists "textbooks_auth_upload" on storage.objects;
create policy "textbooks_auth_upload" on storage.objects
  for insert
  with check (
    bucket_id = 'textbooks'
    and auth.role() = 'authenticated'
  );

-- Seed subjects (thay YOUR_PROJECT bằng ref Supabase sau khi upload file)
-- Ví dụ file: grade3-toan-tap1.pdf, grade3-toan-tap2.pdf

insert into public.subjects (id, grade, slug, label_vi, volume, textbook_title, textbook_pdf_url)
values
  (
    'cccccccc-cccc-cccc-cccc-cccccccc3001',
    3,
    'toan',
    'Toán',
    1,
    'Sách Toán lớp 3 — Tập 1',
    'https://kfqeumtbatgjdlghiuox.supabase.co/storage/v1/object/public/textbooks/grade3/toan-tap1.pdf'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccc3002',
    3,
    'toan',
    'Toán',
    2,
    'Sách Toán lớp 3 — Tập 2',
    'https://kfqeumtbatgjdlghiuox.supabase.co/storage/v1/object/public/textbooks/grade3/toan-tap2.pdf'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccc3003',
    3,
    'tieng_anh',
    'Tiếng Anh',
    1,
    'Sách Tiếng Anh lớp 3 — Tập 1',
    'https://kfqeumtbatgjdlghiuox.supabase.co/storage/v1/object/public/textbooks/grade3/tienganh3-tap1.pdf'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccc7001',
    7,
    'toan',
    'Toán',
    1,
    'Sách Toán lớp 7 — Tập 1',
    null
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccc7002',
    7,
    'tieng_anh',
    'Tiếng Anh',
    1,
    'Sách Tiếng Anh lớp 7 — Tập 1',
    null
  )
on conflict (grade, slug, volume) do update set
  label_vi = excluded.label_vi,
  textbook_title = excluded.textbook_title;

-- Gắn subject_id + volume + page_hint cho bài mẫu
update public.lessons set
  volume = 1,
  page_hint = 'Trang 8–14 (mẫu)',
  subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc3001',
  pdf_url = null
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002';

update public.lessons set
  volume = 1,
  page_hint = 'Trang 6–10 (mẫu)',
  subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc3003',
  pdf_url = null
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001';

update public.lessons set
  volume = 1,
  page_hint = 'Trang 20–26 (mẫu)',
  subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc7001',
  pdf_url = null
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001';

update public.lessons set
  volume = 1,
  page_hint = 'Trang 12–16 (mẫu)',
  subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc7002',
  pdf_url = null
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002';

-- Bài 2 mẫu — Toán lớp 3 tập 1
insert into public.lessons (
  id, grade, title, summary, youtube_video_id,
  subject_slug, subject_label_vi, lesson_index, volume, page_hint, subject_id, pdf_url
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3003',
  3,
  'Bài 2: Phép cộng, trừ trong phạm vi 100',
  'Ôn cách đặt tính và tính nhẩm các phép cộng, trừ.',
  'jNQXAC9IVRw',
  'toan',
  'Toán',
  2,
  1,
  'Trang 15–22 (mẫu)',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null
)
on conflict (id) do update set
  title = excluded.title,
  summary = excluded.summary,
  lesson_index = excluded.lesson_index,
  volume = excluded.volume,
  page_hint = excluded.page_hint,
  subject_id = excluded.subject_id;

insert into public.quizzes (id, lesson_id, title)
values (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3003',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3003',
  'Ôn tập: Cộng trừ trong 100'
)
on conflict (id) do nothing;

delete from public.quiz_questions where quiz_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3003';

insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3003',
  '47 + 25 = ?',
  '["62", "72", "82", "52"]'::jsonb,
  1,
  0,
  '7+5=12, viết 2 nhớ 1; 4+2+1=7 → 72.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3003',
  '90 − 36 = ?',
  '["44", "54", "64", "56"]'::jsonb,
  1,
  1,
  '0−6 không được, mượn 1: 10−6=4; 8−3=5 → 54.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3003',
  'Số liền sau của 99 là:',
  '["98", "100", "101", "90"]'::jsonb,
  1,
  2,
  'Liền sau = cộng 1: 99 + 1 = 100.'
);
