-- Migration 040: Support Multi-Grade Profiles
-- This migration adds a 'grades' array to the profiles table to allow users to select multiple grades.
-- Revised: Removed references to legacy tables (lessons, quizzes, etc.) that were dropped in migration 039.

-- 1. Add grades column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS grades smallint[] NOT NULL DEFAULT '{3}';

-- 2. Migrate existing data
UPDATE public.profiles SET grades = ARRAY[grade] WHERE grades IS NULL OR grades = '{3}';

-- 3. Update trigger function handle_new_user()
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  g int;
BEGIN
  g := COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'grade'), '')::int, 3);
  IF g NOT IN (3, 7) THEN
    g := 3;
  END IF;

  INSERT INTO public.profiles (id, email, display_name, grade, grades)
  VALUES (
    new.id,
    new.email,
    COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'display_name'), ''), SPLIT_PART(new.email, '@', 1)),
    g,
    ARRAY[g]
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name),
    grade = COALESCE(public.profiles.grade, EXCLUDED.grade),
    grades = COALESCE(public.profiles.grades, EXCLUDED.grades);

  RETURN new;
END;
$$;
