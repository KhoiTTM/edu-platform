-- Allow read access to quiz_questions for all users (both authenticated and anonymous)
-- This is necessary because the new universal learning engine references quiz questions via exercise_questions bridge table,
-- bypassing the old quizzes -> lessons hierarchy checks.

DROP POLICY IF EXISTS "Allow public read access on quiz_questions" ON public.quiz_questions;
CREATE POLICY "Allow public read access on quiz_questions" ON public.quiz_questions FOR SELECT USING (true);
