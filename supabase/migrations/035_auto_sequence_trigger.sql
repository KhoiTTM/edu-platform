-- Migration 035: Auto Sequence Trigger
-- Automatically maintains contiguous sequence numbers for assessments within the same curriculum group

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
    SET sequence_number = ordered.new_seq
    FROM ordered
    WHERE public.assessment_collections.id = ordered.id
      AND public.assessment_collections.sequence_number IS DISTINCT FROM ordered.new_seq;

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
            SET sequence_number = ordered_old.new_seq
            FROM ordered_old
            WHERE public.assessment_collections.id = ordered_old.id
              AND public.assessment_collections.sequence_number IS DISTINCT FROM ordered_old.new_seq;
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS trigger_reorder_assessment_collections ON public.assessment_collections;

-- Create AFTER trigger to run the reorder logic
CREATE TRIGGER trigger_reorder_assessment_collections
AFTER INSERT OR UPDATE OR DELETE ON public.assessment_collections
FOR EACH ROW
EXECUTE FUNCTION public.reorder_assessment_sequences_trigger();
