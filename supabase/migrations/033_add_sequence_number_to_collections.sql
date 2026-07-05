-- Migration 033: Add sequence_number to assessment_collections
ALTER TABLE public.assessment_collections 
    ADD COLUMN IF NOT EXISTS sequence_number INTEGER DEFAULT 1;

-- Update stats view - Drop first to avoid column name change error
DROP VIEW IF EXISTS public.subject_content_stats CASCADE;

CREATE OR REPLACE VIEW public.subject_content_stats AS
SELECT 
    subject_slug, 
    grade,
    reference_book,
    units,
    COUNT(*) as total_collections,
    MAX(sequence_number) as max_sequence
FROM public.assessment_collections
GROUP BY subject_slug, grade, reference_book, units;
