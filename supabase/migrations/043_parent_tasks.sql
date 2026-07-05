-- Migration 043: Parent Tasks System
-- Supports parent dashboard: assign practice tasks to students with daily random exam selection

-- 1. Parent Tasks Table
-- Stores the task configuration set by a parent for a student
CREATE TABLE IF NOT EXISTS public.parent_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_slug TEXT NOT NULL,
    unit_numbers INTEGER[] NOT NULL DEFAULT '{}',  -- Which units to pull exams from
    frequency TEXT NOT NULL DEFAULT 'daily'        -- 'daily' | 'weekdays' | 'weekly'
        CHECK (frequency IN ('daily', 'weekdays', 'weekly')),
    active_days INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5,6,7}', -- 1=Mon..7=Sun (ISO weekday)
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Daily Tasks Table
-- Auto-generated per-day task instances for each parent_task
CREATE TABLE IF NOT EXISTS public.daily_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.parent_tasks(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    task_date DATE NOT NULL DEFAULT CURRENT_DATE,
    completed_at TIMESTAMPTZ,   -- NULL = not yet completed
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(task_id, task_date)  -- One instance per task per day
);

-- 3. Enable RLS
ALTER TABLE public.parent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;

-- 4. Policies: parent_tasks
-- Parents can manage their own tasks
DROP POLICY IF EXISTS "parent_tasks_parent_all" ON public.parent_tasks;
CREATE POLICY "parent_tasks_parent_all" ON public.parent_tasks
    FOR ALL USING (auth.uid() = parent_id);

-- Students can read tasks assigned to them (so dashboard can show task info)
DROP POLICY IF EXISTS "parent_tasks_student_select" ON public.parent_tasks;
CREATE POLICY "parent_tasks_student_select" ON public.parent_tasks
    FOR SELECT USING (auth.uid() = student_id);

-- 5. Policies: daily_tasks
-- Students can read and update (complete) their own daily tasks
DROP POLICY IF EXISTS "daily_tasks_student_select" ON public.daily_tasks;
CREATE POLICY "daily_tasks_student_select" ON public.daily_tasks
    FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "daily_tasks_student_update" ON public.daily_tasks;
CREATE POLICY "daily_tasks_student_update" ON public.daily_tasks
    FOR UPDATE USING (auth.uid() = student_id);

-- Parents can manage daily tasks they created (via task_id)
DROP POLICY IF EXISTS "daily_tasks_parent_all" ON public.daily_tasks;
CREATE POLICY "daily_tasks_parent_all" ON public.daily_tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.parent_tasks pt
            WHERE pt.id = daily_tasks.task_id
              AND pt.parent_id = auth.uid()
        )
    );

-- 6. RPC: generate_daily_tasks_for_student
-- Called when a student visits the dashboard.
-- For each active parent_task assigned to the student, if no daily_task exists for today
-- and today is an active day, randomly pick an eligible exam and create the daily_task.
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

        -- Get the student's grade for subject lookup
        SELECT grade INTO v_subject_grade
        FROM public.profiles
        WHERE id = p_student_id;

        -- Pick a random exam from collections matching subject + units
        -- Prefer exams not yet done today
        SELECT e.id INTO v_exam_id
        FROM public.exams e
        JOIN public.assessment_collections ac ON ac.id = e.collection_id
        WHERE ac.subject_slug = v_task.subject_slug
          AND ac.grade = v_subject_grade
          AND (
            -- Filter by units: the collection's units array overlaps with selected units
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

        -- Insert daily task if we found an exam
        IF v_exam_id IS NOT NULL THEN
            INSERT INTO public.daily_tasks (task_id, student_id, exam_id, task_date)
            VALUES (v_task.id, p_student_id, v_exam_id, v_today)
            ON CONFLICT (task_id, task_date) DO NOTHING;
        END IF;
    END LOOP;
END;
$$;

-- 7. RPC: complete_daily_task_by_exam
-- Called after a student finishes an exam. Marks the daily task as completed if one exists.
CREATE OR REPLACE FUNCTION public.complete_daily_task_by_exam(p_student_id UUID, p_exam_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.daily_tasks
    SET completed_at = now()
    WHERE student_id = p_student_id
      AND exam_id = p_exam_id
      AND task_date = CURRENT_DATE
      AND completed_at IS NULL;
END;
$$;

-- 8. Grant execute permissions
GRANT EXECUTE ON FUNCTION public.generate_daily_tasks_for_student(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_daily_task_by_exam(UUID, UUID) TO authenticated;

-- 9. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_parent_tasks_student_id ON public.parent_tasks(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_tasks_parent_id ON public.parent_tasks(parent_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_student_date ON public.daily_tasks(student_id, task_date);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_task_id ON public.daily_tasks(task_id);
