-- Migration 036: Auto Title Trigger
-- Automatically generates and updates assessment titles based on metadata and sequence

-- 1. Helper Function to generate title
CREATE OR REPLACE FUNCTION public.generate_assessment_title(
    p_subject TEXT, 
    p_grade INTEGER, 
    p_volume INTEGER, 
    p_units INTEGER[], 
    p_seq INTEGER
) RETURNS TEXT AS $$
DECLARE
    v_sub_name TEXT;
    v_vol_str TEXT := '';
    v_unit_str TEXT := '';
BEGIN
    -- Subject Name
    IF p_subject = 'math' THEN v_sub_name := 'Math';
    ELSIF p_subject = 'ielts' THEN v_sub_name := 'IELTS';
    ELSE v_sub_name := 'English';
    END IF;

    -- Volume String
    IF p_volume IS NOT NULL AND p_volume > 0 THEN 
        v_vol_str := ' - Vol ' || p_volume; 
    END IF;

    -- Units String
    IF p_units IS NOT NULL AND array_length(p_units, 1) > 0 THEN
        IF array_length(p_units, 1) > 1 THEN
            v_unit_str := ' - Units ' || array_to_string(p_units, ', ');
        ELSE
            v_unit_str := ' - Unit ' || p_units[1];
        END IF;
    END IF;

    -- Combine
    IF p_grade IS NULL OR p_grade = 0 THEN
        RETURN v_sub_name || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1);
    ELSE
        RETURN v_sub_name || ' Grade ' || p_grade || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1);
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. Update the Reorder Trigger to also update Title
CREATE OR REPLACE FUNCTION public.reorder_assessment_sequences_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_subject TEXT;
    v_grade INTEGER;
    v_volume INTEGER;
    v_units INTEGER[];
BEGIN
    -- Prevent infinite loop when this trigger updates the table
    IF pg_trigger_depth() > 1 THEN
        RETURN NULL;
    END IF;

    -- Determine which groups to reorder based on the operation
    IF TG_OP = 'DELETE' THEN
        v_subject := OLD.subject_slug;
        v_grade := OLD.grade;
        v_volume := OLD.volume;
        v_units := OLD.units;
    ELSE
        v_subject := NEW.subject_slug;
        v_grade := NEW.grade;
        v_volume := NEW.volume;
        v_units := NEW.units;
    END IF;

    -- Reorder the affected group (New group for INSERT/UPDATE, Old group for DELETE)
    WITH ordered AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as new_seq
        FROM public.assessment_collections
        WHERE subject_slug = v_subject
          AND grade = v_grade
          AND (volume = v_volume OR (volume IS NULL AND v_volume IS NULL))
          AND (units = v_units OR (units IS NULL AND v_units IS NULL))
    )
    UPDATE public.assessment_collections
    SET sequence_number = ordered.new_seq,
        title = public.generate_assessment_title(v_subject, v_grade, v_volume, v_units, ordered.new_seq::INTEGER)
    FROM ordered
    WHERE public.assessment_collections.id = ordered.id
      AND (
          public.assessment_collections.sequence_number IS DISTINCT FROM ordered.new_seq
          OR 
          public.assessment_collections.title IS DISTINCT FROM public.generate_assessment_title(v_subject, v_grade, v_volume, v_units, ordered.new_seq::INTEGER)
      );

    -- If UPDATE and the group changed, also reorder the OLD group to fill the gap
    IF TG_OP = 'UPDATE' THEN
        IF OLD.subject_slug IS DISTINCT FROM NEW.subject_slug OR 
           OLD.grade IS DISTINCT FROM NEW.grade OR 
           OLD.volume IS DISTINCT FROM NEW.volume OR 
           OLD.units IS DISTINCT FROM NEW.units THEN
            
            WITH ordered_old AS (
                SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as new_seq
                FROM public.assessment_collections
                WHERE subject_slug = OLD.subject_slug
                  AND grade = OLD.grade
                  AND (volume = OLD.volume OR (volume IS NULL AND OLD.volume IS NULL))
                  AND (units = OLD.units OR (units IS NULL AND OLD.units IS NULL))
            )
            UPDATE public.assessment_collections
            SET sequence_number = ordered_old.new_seq,
                title = public.generate_assessment_title(OLD.subject_slug, OLD.grade, OLD.volume, OLD.units, ordered_old.new_seq::INTEGER)
            FROM ordered_old
            WHERE public.assessment_collections.id = ordered_old.id
              AND (
                  public.assessment_collections.sequence_number IS DISTINCT FROM ordered_old.new_seq
                  OR
                  public.assessment_collections.title IS DISTINCT FROM public.generate_assessment_title(OLD.subject_slug, OLD.grade, OLD.volume, OLD.units, ordered_old.new_seq::INTEGER)
              );
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- To ensure ALL existing records get their title generated immediately:
UPDATE public.assessment_collections 
SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number);
