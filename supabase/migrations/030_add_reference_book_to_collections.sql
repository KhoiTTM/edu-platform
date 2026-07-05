-- Migration 030: Add reference_book to assessment_collections
ALTER TABLE public.assessment_collections 
    ADD COLUMN IF NOT EXISTS reference_book TEXT;

-- Update the stats view to include reference_book if useful
CREATE OR REPLACE VIEW public.subject_content_stats AS
SELECT 
    subject_slug, 
    grade,
    reference_book,
    COUNT(*) as total_collections
FROM public.assessment_collections
GROUP BY subject_slug, grade, reference_book;
