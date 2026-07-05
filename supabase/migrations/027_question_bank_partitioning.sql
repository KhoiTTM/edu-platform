-- Phase 10: Multi-Subject Foundation
-- Database Scalability: Question Bank Partitioning Strategy

-- 1. Add subject column to question_bank to support easy partitioning and filtering
ALTER TABLE public.question_bank 
    ADD COLUMN IF NOT EXISTS subject_slug TEXT DEFAULT 'english';

-- 2. Create index for subject-based filtering
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON public.question_bank(subject_slug);

-- 3. Partitioning Strategy (Conceptual/Manual for Supabase)
-- Note: PostgreSQL native partitioning requires re-creating the table.
-- For this prototype, we'll implement "Logical Partitioning" via subject_slug.
-- In a high-scale production env, we would:
--   CREATE TABLE question_bank_parts ( ... ) PARTITION BY LIST (subject_slug);
--   CREATE TABLE question_bank_english PARTITION OF question_bank_parts FOR VALUES IN ('english', 'tieng_anh');
--   CREATE TABLE question_bank_math PARTITION OF question_bank_parts FOR VALUES IN ('math', 'toan');

-- 4. Multi-Subject Concept Types
-- Ensure conceptual integrity by allowing more types
-- This is managed via application logic, but we can add check constraints if needed.

-- 5. Helper view for Multi-Subject Question Counts
CREATE OR REPLACE VIEW public.subject_content_stats AS
SELECT 
    subject_slug, 
    blueprint_id, 
    COUNT(*) as total_questions,
    AVG(quality_score) as avg_quality
FROM public.question_bank
GROUP BY subject_slug, blueprint_id;
