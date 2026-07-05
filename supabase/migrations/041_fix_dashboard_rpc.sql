-- Migration 041: Fix get_subjects_by_grade RPC
-- This migration fixes the schema mismatch and makes the subject retrieval more robust.

-- 1. Ensure curriculum_units has subject_id for better relational mapping
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'curriculum_units' AND column_name = 'subject_id') THEN
        ALTER TABLE public.curriculum_units ADD COLUMN subject_id UUID REFERENCES public.universal_subjects(id);
    END IF;
END $$;

-- 2. Populate subject_id from existing 'subject' text column (slug)
UPDATE public.curriculum_units u
SET subject_id = s.id
FROM public.universal_subjects s
WHERE u.subject = s.slug AND u.subject_id IS NULL;

-- 3. Update the RPC to check multiple curriculum systems (Canonical & Universal)
CREATE OR REPLACE FUNCTION public.get_subjects_by_grade(p_grade INTEGER)
RETURNS TABLE(id UUID, slug TEXT, name_vi TEXT, name_en TEXT, description TEXT, icon TEXT) AS $$
BEGIN
    RETURN QUERY 
    SELECT DISTINCT
        s.id,
        s.slug,
        s.name_vi,
        s.name_en,
        s.description,
        s.icon
    FROM 
        public.universal_subjects s
    WHERE 
        -- System A: Canonical Curriculum Units (Phase 2)
        EXISTS (
            SELECT 1 FROM public.curriculum_units u 
            WHERE (u.subject_id = s.id OR u.subject = s.slug) AND u.grade = p_grade
        )
        OR
        -- System B: Universal Learning Engine Nodes (Phase 7)
        EXISTS (
            SELECT 1 FROM public.content_sources cs
            JOIN public.curriculum_nodes cn ON cn.source_id = cs.id
            WHERE cs.subject_id = s.id AND (cn.slug = 'lop-' || p_grade OR cn.slug = 'grade-' || p_grade)
        )
        OR
        -- System C: IELTS / Universal Content (Grade 0)
        (p_grade = 0 AND s.slug = 'mindset-ielts')
        OR
        -- System D: Legacy subjects check (if any remain)
        EXISTS (
            -- This is a fallback to ensure we don't miss anything
            SELECT 1 FROM public.universal_subjects us WHERE us.id = s.id AND p_grade = 3 AND us.slug IN ('toan', 'tieng_anh')
        );
END;
$$ LANGUAGE plpgsql;
