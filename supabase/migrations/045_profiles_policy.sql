-- Migration 045: Profiles Select Policy Update
-- Allows authenticated users (like parents/admins) to select/read profiles of other users.

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;

CREATE POLICY "profiles_select_all_authenticated" ON public.profiles
    FOR SELECT USING (auth.role() = 'authenticated');
