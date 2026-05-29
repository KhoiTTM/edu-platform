-- Migration 034: Add volume and enhanced filtering fields
ALTER TABLE public.assessment_collections 
    ADD COLUMN IF NOT EXISTS volume INTEGER; -- 1, 2, or NULL for single-volume books

-- Update the stats view - Drop first to avoid column name change error
DROP VIEW IF EXISTS public.subject_content_stats CASCADE;

CREATE OR REPLACE VIEW public.subject_content_stats AS
SELECT 
    subject_slug, 
    grade,
    reference_book,
    volume,
    units,
    COUNT(*) as total_collections
FROM public.assessment_collections
GROUP BY subject_slug, grade, reference_book, volume, units;
