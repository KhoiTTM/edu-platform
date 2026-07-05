-- Migration 047: Add support for specific lesson node assignment in parent tasks
ALTER TABLE public.parent_tasks ADD COLUMN IF NOT EXISTS lesson_node_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE SET NULL;
ALTER TABLE public.daily_tasks ADD COLUMN IF NOT EXISTS lesson_node_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE SET NULL;

-- Update RLS and make exam_id nullable in daily_tasks
ALTER TABLE public.daily_tasks ALTER COLUMN exam_id DROP NOT NULL;

-- Update generate_daily_tasks_for_student RPC to support specific lesson node if set
CREATE OR REPLACE FUNCTION public.generate_daily_tasks_for_student(p_student_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_task RECORD;
    v_today DATE := CURRENT_DATE;
    v_dow  INTEGER; -- ISO day of week: 1=Mon..7=Sun
    v_exam_id UUID;
    v_subject_grade INTEGER;
BEGIN
    -- Get current ISO day of week (1=Mon, 7=Sun)
    v_dow := EXTRACT(ISODOW FROM v_today)::INTEGER;

    -- Loop over active tasks assigned to this student
    FOR v_task IN
        SELECT pt.*
        FROM public.parent_tasks pt
        WHERE pt.student_id = p_student_id
          AND pt.is_active = true
    LOOP
        -- Check if today is an active day for this task
        IF NOT (v_dow = ANY(v_task.active_days)) THEN
            CONTINUE;
        END IF;

        -- Skip if already generated for today
        IF EXISTS (
            SELECT 1 FROM public.daily_tasks dt
            WHERE dt.task_id = v_task.id AND dt.task_date = v_today
        ) THEN
            CONTINUE;
        END IF;

        -- If specific lesson node is assigned
        IF v_task.lesson_node_id IS NOT NULL THEN
            INSERT INTO public.daily_tasks (task_id, student_id, lesson_node_id, task_date)
            VALUES (v_task.id, p_student_id, v_task.lesson_node_id, v_today)
            ON CONFLICT (task_id, task_date) DO NOTHING;
            CONTINUE;
        END IF;

        -- If specific exam is assigned, use it directly
        IF v_task.exam_id IS NOT NULL THEN
            v_exam_id := v_task.exam_id;
        ELSE
            -- Get the student's grade for subject lookup
            SELECT grade INTO v_subject_grade
            FROM public.profiles
            WHERE id = p_student_id;

            -- Pick a random exam from collections matching subject + units
            SELECT e.id INTO v_exam_id
            FROM public.exams e
            JOIN public.assessment_collections ac ON ac.id = e.collection_id
            WHERE ac.subject_slug = v_task.subject_slug
              AND ac.grade = v_subject_grade
              AND (
                v_task.unit_numbers = '{}'::INTEGER[]
                OR ac.units && v_task.unit_numbers
              )
              -- Exclude exams already assigned as a daily task in the past 7 days
              AND NOT EXISTS (
                SELECT 1 FROM public.daily_tasks dt2
                WHERE dt2.exam_id = e.id
                  AND dt2.student_id = p_student_id
                  AND dt2.task_date >= v_today - INTERVAL '7 days'
              )
            ORDER BY RANDOM()
            LIMIT 1;

            -- Fallback: pick any exam if all were recently assigned
            IF v_exam_id IS NULL THEN
                SELECT e.id INTO v_exam_id
                FROM public.exams e
                JOIN public.assessment_collections ac ON ac.id = e.collection_id
                WHERE ac.subject_slug = v_task.subject_slug
                  AND ac.grade = v_subject_grade
                  AND (
                    v_task.unit_numbers = '{}'::INTEGER[]
                    OR ac.units && v_task.unit_numbers
                  )
                ORDER BY RANDOM()
                LIMIT 1;
            END IF;
        END IF;

        -- Insert daily task if we found an exam
        IF v_exam_id IS NOT NULL THEN
            INSERT INTO public.daily_tasks (task_id, student_id, exam_id, task_date)
            VALUES (v_task.id, p_student_id, v_exam_id, v_today)
            ON CONFLICT (task_id, task_date) DO NOTHING;
        END IF;
    END LOOP;
END;
$$;
