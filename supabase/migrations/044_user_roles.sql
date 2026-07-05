-- Migration 044: User Roles Setup
-- Adds a role column to public.profiles and configures the default permissions/roles.

-- 1. Add role column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent', 'admin'));

-- 2. Update trigger function handle_new_user() to support default 'student' role (or customized raw_user_meta_data if present)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  g int;
  r text;
BEGIN
  g := COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'grade'), '')::int, 3);
  IF g NOT IN (3, 7) THEN
    g := 3;
  END IF;

  r := COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'role'), ''), 'student');
  IF r NOT IN ('student', 'parent', 'admin') THEN
    r := 'student';
  END IF;

  INSERT INTO public.profiles (id, email, display_name, grade, grades, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'display_name'), ''), SPLIT_PART(new.email, '@', 1)),
    g,
    ARRAY[g],
    r
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name),
    grade = COALESCE(public.profiles.grade, EXCLUDED.grade),
    grades = COALESCE(public.profiles.grades, EXCLUDED.grades),
    role = COALESCE(public.profiles.role, EXCLUDED.role);

  RETURN new;
END;
$$;

-- 3. Update existing profiles
-- Khoidu -> admin
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'ladochoi@gmail.com'
);

-- Rio -> student
UPDATE public.profiles
SET role = 'student'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'tranngochaidang.rio@gmail.com'
);

-- Cherry -> student
UPDATE public.profiles
SET role = 'student'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'tranngocbaonhi.cherry@gmail.com'
);
