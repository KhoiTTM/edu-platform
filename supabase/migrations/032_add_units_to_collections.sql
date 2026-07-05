-- Migration 032: Add units array to assessment_collections
ALTER TABLE public.assessment_collections 
    ADD COLUMN IF NOT EXISTS units INTEGER[];

-- Update the stats view to include units
CREATE OR REPLACE VIEW public.subject_content_stats AS
SELECT 
    subject_slug, 
    grade,
    reference_book,
    units,
    COUNT(*) as total_collections
FROM public.assessment_collections
GROUP BY subject_slug, grade, reference_book, units;
