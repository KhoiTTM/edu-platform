-- Mindset For IELTS Foundation Setup
-- This script relaxes grade constraints to allow Grade 0 (all grades) and adds the IELTS curriculum.

-- 1. Relax check constraints
-- Profiles
alter table public.profiles drop constraint if exists profiles_grade_check;
alter table public.profiles add constraint profiles_grade_check check (grade >= 0);

-- Lessons
alter table public.lessons drop constraint if exists lessons_grade_check;
alter table public.lessons add constraint lessons_grade_check check (grade >= 0);

-- Subjects
alter table public.subjects drop constraint if exists subjects_grade_check;
alter table public.subjects add constraint subjects_grade_check check (grade >= 0);

-- Weekly Schedule
alter table public.weekly_lesson_schedule drop constraint if exists weekly_lesson_schedule_grade_check;
alter table public.weekly_lesson_schedule add constraint weekly_lesson_schedule_grade_check check (grade >= 0);

-- 2. Update RLS Policies to allow Grade 0 visibility
-- Lessons
drop policy if exists "lessons_select_grade" on public.lessons;
create policy "lessons_select_grade" on public.lessons
  for select using (
    auth.role() = 'authenticated'
    and (grade = (select p.grade from public.profiles p where p.id = auth.uid()) or grade = 0)
  );

-- Subjects
drop policy if exists "subjects_select_grade" on public.subjects;
create policy "subjects_select_grade" on public.subjects
  for select using (
    auth.role() = 'authenticated'
    and (grade = (select p.grade from public.profiles p where p.id = auth.uid()) or grade = 0)
  );

-- Quizzes
drop policy if exists "quizzes_select_grade" on public.quizzes;
create policy "quizzes_select_grade" on public.quizzes
  for select using (
    exists (
      select 1 from public.lessons l
      where l.id = quizzes.lesson_id
        and (l.grade = (select p.grade from public.profiles p where p.id = auth.uid()) or l.grade = 0)
    )
  );

-- Questions
drop policy if exists "questions_select_grade" on public.quiz_questions;
create policy "questions_select_grade" on public.quiz_questions
  for select using (
    exists (
      select 1 from public.quizzes q
      join public.lessons l on l.id = q.lesson_id
      where q.id = quiz_questions.quiz_id
        and (l.grade = (select p.grade from public.profiles p where p.id = auth.uid()) or l.grade = 0)
    )
  );

-- 3. Insert IELTS Subject
insert into public.subjects (id, grade, slug, label_vi, volume, textbook_title, textbook_pdf_url)
values (
  'cccccccc-cccc-cccc-cccc-cccccccc0001',
  0,
  'mindset-ielts',
  'Mindset For IELTS Foundation',
  1,
  'Mindset for IELTS Foundation Student''s Book',
  'https://kfqeumtbatgjdlghiuox.supabase.co/storage/v1/object/public/textbooks/ielts/mindset-foundation.pdf'
)
on conflict (grade, slug, volume) do update set
  label_vi = excluded.label_vi,
  textbook_title = excluded.textbook_title;

-- 4. Insert IELTS Listening Lessons (Tracks)
-- We will use summary to store the 3-step instructions
insert into public.lessons (id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi, lesson_index, volume, subject_id)
values
-- Unit 1
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000102', 0, 'Listening Track 02: Unit 1 - Daily life', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1 để hiểu nội dung chính.
2. **Bước 2:** Đọc Audioscript (cuối sách PDF) rồi nghe lại lần 2 để kiểm tra các từ chưa nghe được.
3. **Bước 3:** Nghe lần 3 và tập đọc theo (Shadowing) để cải thiện phát âm.', 
'2r7kEF70Afs', 'mindset-ielts', 'Mindset For IELTS Foundation', 2, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 2
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000103', 0, 'Listening Track 03: Unit 2 - House and home', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1 để hiểu nội dung chính.
2. **Bước 2:** Đọc Audioscript rôi nghe lại lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'RCuvLzqdBZ8', 'mindset-ielts', 'Mindset For IELTS Foundation', 3, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000104', 0, 'Listening Track 04: Unit 2 - House and home', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'LRPNZf_5j-I', 'mindset-ielts', 'Mindset For IELTS Foundation', 4, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 3
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000105', 0, 'Listening Track 05: Unit 3 - Hobbies', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'gzoYfpWvh7Q', 'mindset-ielts', 'Mindset For IELTS Foundation', 5, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 4
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000106', 0, 'Listening Track 06: Unit 4 - Travel', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'rkOatFNUGt4', 'mindset-ielts', 'Mindset For IELTS Foundation', 6, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000107', 0, 'Listening Track 07: Unit 4 - Travel', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'Ou32FRw97Yc', 'mindset-ielts', 'Mindset For IELTS Foundation', 7, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 5
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000108', 0, 'Listening Track 08: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'RXLcmf5GZQ', 'mindset-ielts', 'Mindset For IELTS Foundation', 8, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000109', 0, 'Listening Track 09: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'WnqLsvQuwZk', 'mindset-ielts', 'Mindset For IELTS Foundation', 9, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000110', 0, 'Listening Track 10: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'qCDSyESoNB0', 'mindset-ielts', 'Mindset For IELTS Foundation', 10, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 6
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000111', 0, 'Listening Track 11: Unit 6 - Transport', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'_f8Ciy-r8bM', 'mindset-ielts', 'Mindset For IELTS Foundation', 11, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000112', 0, 'Listening Track 12: Unit 6 - Transport', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'7gFFiqtJzWg', 'mindset-ielts', 'Mindset For IELTS Foundation', 12, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 8
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000114', 0, 'Listening Track 14: Unit 8 - Health', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'jsjIWseiTfM', 'mindset-ielts', 'Mindset For IELTS Foundation', 14, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000115', 0, 'Listening Track 15: Unit 8 - Health', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'SPurU5V7pxw', 'mindset-ielts', 'Mindset For IELTS Foundation', 15, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000116', 0, 'Listening Track 16: Unit 8 - Health', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'mWPZhFuPkF0', 'mindset-ielts', 'Mindset For IELTS Foundation', 16, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

-- Unit 10
('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000118', 0, 'Listening Track 18: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'wr8M6uUzHnY', 'mindset-ielts', 'Mindset For IELTS Foundation', 18, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000119', 0, 'Listening Track 19: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'k-EOYc0zoqo', 'mindset-ielts', 'Mindset For IELTS Foundation', 19, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ie000120', 0, 'Listening Track 20: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'ZN_why11kpc', 'mindset-ielts', 'Mindset For IELTS Foundation', 20, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001')
on conflict (id) do update set
  summary = excluded.summary,
  youtube_video_id = excluded.youtube_video_id;

-- 5. Insert Practice Quizzes for IELTS Listening
insert into public.quizzes (id, lesson_id, title)
select 
  replace(id::text, 'aaaaaaaa', 'bbbbbbbb')::uuid,
  id,
  'Practice: ' || title
from public.lessons
where subject_slug = 'mindset-ielts'
on conflict (id) do nothing;

-- Sample questions for Track 02
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ie000102', 'What is the topic of Unit 1?', '["Food", "Daily life", "Travel", "School"]'::jsonb, 1, 0, 'Unit 1 nói về cuộc sống hàng ngày (Daily life).'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ie000102', 'Did you hear "I get up at 7 AM"?', '["Yes", "No"]'::jsonb, 0, 1, 'Kiểm tra kỹ năng nghe từ vựng thời gian.');
