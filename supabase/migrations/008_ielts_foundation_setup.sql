-- Mindset For IELTS Foundation Setup
-- This script relaxes grade constraints to allow Grade 0 (all grades) and adds the IELTS curriculum.

-- 1. Robustly relax grade constraints by dropping all check constraints on the 'grade' column
DO $$ 
DECLARE 
    t text;
    r RECORD;
BEGIN
    FOR t IN SELECT unnest(ARRAY['profiles', 'lessons', 'subjects', 'weekly_lesson_schedule']) LOOP
        FOR r IN (
            SELECT tc.constraint_name 
            FROM information_schema.table_constraints AS tc 
            JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.table_name = t AND kcu.column_name = 'grade' AND tc.constraint_type = 'CHECK'
        ) LOOP
            EXECUTE 'ALTER TABLE public.' || quote_ident(t) || ' DROP CONSTRAINT ' || quote_ident(r.constraint_name);
        END LOOP;
        -- Add back a loose constraint
        EXECUTE 'ALTER TABLE public.' || quote_ident(t) || ' ADD CONSTRAINT ' || quote_ident(t || '_grade_min_check') || ' CHECK (grade >= 0)';
    END LOOP;
END $$;

-- 2. Simplify RLS Policies (Allow all authenticated users to see lessons/subjects)
-- We handle the "Current Grade" filtering in the UI code (hoc-tap/page.tsx)
-- This avoids complex subqueries that might fail or be slow in RLS.

drop policy if exists "lessons_select_grade" on public.lessons;
create policy "lessons_select_grade" on public.lessons
  for select using (auth.role() = 'authenticated');

drop policy if exists "subjects_select_grade" on public.subjects;
create policy "subjects_select_grade" on public.subjects
  for select using (auth.role() = 'authenticated');

drop policy if exists "quizzes_select_grade" on public.quizzes;
create policy "quizzes_select_grade" on public.quizzes
  for select using (auth.role() = 'authenticated');

drop policy if exists "questions_select_grade" on public.quiz_questions;
create policy "questions_select_grade" on public.quiz_questions
  for select using (auth.role() = 'authenticated');

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

-- -- 4. Insert IELTS Listening Lessons (Tracks)
-- We will use summary to store the 3-step instructions
insert into public.lessons (id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi, lesson_index, volume, subject_id, page_hint)
values
-- Unit 1
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000102', 0, 'Listening Track 02: Unit 1 - Daily life', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1 để hiểu nội dung chính.
2. **Bước 2:** Đọc Audioscript (cuối sách PDF) rồi nghe lại lần 2 để kiểm tra các từ chưa nghe được.
3. **Bước 3:** Nghe lần 3 và tập đọc theo (Shadowing) để cải thiện phát âm.', 
'2r7kEF70Afs', 'mindset-ielts', 'Mindset For IELTS Foundation', 2, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 116'),

-- Unit 2
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000103', 0, 'Listening Track 03: Unit 2 - House and home', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1 để hiểu nội dung chính.
2. **Bước 2:** Đọc Audioscript rôi nghe lại lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'RCuvLzqdBZ8', 'mindset-ielts', 'Mindset For IELTS Foundation', 3, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 116'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000104', 0, 'Listening Track 04: Unit 2 - House and home', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'LRPNZf_5j-I', 'mindset-ielts', 'Mindset For IELTS Foundation', 4, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 116'),

-- Unit 3
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000105', 0, 'Listening Track 05: Unit 3 - Hobbies', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'gzoYfpWvh7Q', 'mindset-ielts', 'Mindset For IELTS Foundation', 5, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 117'),

-- Unit 4
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000106', 0, 'Listening Track 06: Unit 4 - Travel', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'rkOatFNUGt4', 'mindset-ielts', 'Mindset For IELTS Foundation', 6, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 117'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000107', 0, 'Listening Track 07: Unit 4 - Travel', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'Ou32FRw97Yc', 'mindset-ielts', 'Mindset For IELTS Foundation', 7, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 117'),

-- Unit 5
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000108', 0, 'Listening Track 08: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'RXLcmf5GZQ', 'mindset-ielts', 'Mindset For IELTS Foundation', 8, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 118'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000109', 0, 'Listening Track 09: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'WnqLsvQuwZk', 'mindset-ielts', 'Mindset For IELTS Foundation', 9, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 118'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000110', 0, 'Listening Track 10: Unit 5 - Food', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'qCDSyESoNB0', 'mindset-ielts', 'Mindset For IELTS Foundation', 10, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 118'),

-- Unit 6
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000111', 0, 'Listening Track 11: Unit 6 - Transport', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'_f8Ciy-r8bM', 'mindset-ielts', 'Mindset For IELTS Foundation', 11, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 119'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000112', 0, 'Listening Track 12: Unit 6 - Transport', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'7gFFiqtJzWg', 'mindset-ielts', 'Mindset For IELTS Foundation', 12, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 119'),

-- Unit 8
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000114', 0, 'Listening Track 14: Unit 8 - Health', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'jsjIWseiTfM', 'mindset-ielts', 'Mindset For IELTS Foundation', 14, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 120'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000115', 0, 'Listening Track 15: Unit 8 - Health', 
'**HƯỚNG DẪN HỌC NGHE (3 BƯỚC):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'SPurU5V7pxw', 'mindset-ielts', 'Mindset For IELTS Foundation', 15, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 120'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000116', 0, 'Listening Track 16: Unit 8 - Health', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'mWPZhFuPkF0', 'mindset-ielts', 'Mindset For IELTS Foundation', 16, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 121'),

-- Unit 10
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000118', 0, 'Listening Track 18: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'wr8M6uUzHnY', 'mindset-ielts', 'Mindset For IELTS Foundation', 18, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 122'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000119', 0, 'Listening Track 19: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'k-EOYc0zoqo', 'mindset-ielts', 'Mindset For IELTS Foundation', 19, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 122'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee000120', 0, 'Listening Track 20: Unit 10 - Nature', 
'**HƯỚNG DẪN học nghe (3 bước):**
1. **Bước 1:** Nghe lần 1.
2. **Bước 2:** Đọc Audioscript rồi nghe lần 2.
3. **Bước 3:** Nghe lần 3 và Shadowing.', 
'ZN_why11kpc', 'mindset-ielts', 'Mindset For IELTS Foundation', 20, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 123')
on conflict (id) do update set
  summary = excluded.summary,
  youtube_video_id = excluded.youtube_video_id,
  page_hint = excluded.page_hint;

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
('bbbbbbbb-aaaa-aaaa-aaaa-0000ee000102', 'What is the topic of Unit 1?', '["Food", "Daily life", "Travel", "School"]'::jsonb, 1, 0, 'Unit 1 nói về cuộc sống hàng ngày (Daily life).'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ee000102', 'Did you hear "I get up at 7 AM"?', '["Yes", "No"]'::jsonb, 0, 1, 'Kiểm tra kỹ năng nghe từ vựng thời gian.');
