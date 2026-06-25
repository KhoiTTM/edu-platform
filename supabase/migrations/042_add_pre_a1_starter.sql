-- Migration 042: Add Pre A1 Starter Subject and Update get_subjects_by_grade RPC

-- 1. Insert Pre A1 Starter into universal_subjects if not exists
INSERT INTO public.universal_subjects (slug, name_vi, name_en, icon)
VALUES ('pre-a1-starter', 'Pre A1 Starter', 'Pre A1 Starter', '⭐')
ON CONFLICT (slug) DO UPDATE
SET name_vi = EXCLUDED.name_vi,
    name_en = EXCLUDED.name_en,
    icon = EXCLUDED.icon;

-- 2. Update the get_subjects_by_grade RPC to return pre-a1-starter for grade 0
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
        (p_grade = 0 AND s.slug IN ('mindset-ielts', 'pre-a1-starter'))
        OR
        -- System D: Legacy subjects check (if any remain)
        EXISTS (
            SELECT 1 FROM public.universal_subjects us WHERE us.id = s.id AND p_grade = 3 AND us.slug IN ('toan', 'tieng_anh')
        );
END;
$$ LANGUAGE plpgsql;
