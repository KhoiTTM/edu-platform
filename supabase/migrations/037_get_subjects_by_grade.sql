-- Migration 037: Get Subjects by Grade Function
-- Returns a list of distinct subjects that have curriculum content for a given grade

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
    JOIN 
        public.curriculum_units u ON s.id = u.subject_id
    WHERE 
        u.grade = p_grade;
END;
$$ LANGUAGE plpgsql;
