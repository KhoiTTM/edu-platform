-- Migration 029: Assessment Studio Public Access
-- Relaxes RLS for testing purposes so all users can see and manage assessments

-- Drop existing policies first
DROP POLICY IF EXISTS "Enable all access for authenticated users on collections" ON public.assessment_collections;
DROP POLICY IF EXISTS "Enable all access for authenticated users on exams" ON public.exams;
DROP POLICY IF EXISTS "Enable all access for authenticated users on exam_questions" ON public.exam_questions;
DROP POLICY IF EXISTS "Enable all access for authenticated users on sources" ON public.assessment_sources;

-- Create public policies (Allow anon + authenticated)
CREATE POLICY "Public access on collections" ON public.assessment_collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access on exams" ON public.exams FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access on exam_questions" ON public.exam_questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access on sources" ON public.assessment_sources FOR ALL USING (true) WITH CHECK (true);

-- Ensure question_bank is also accessible for updates during review
DROP POLICY IF EXISTS "Enable read access for all users" ON public.question_bank;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.question_bank;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.question_bank;

CREATE POLICY "Public access on question_bank" ON public.question_bank FOR ALL USING (true) WITH CHECK (true);
