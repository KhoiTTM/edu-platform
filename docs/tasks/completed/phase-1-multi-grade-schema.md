# Title
Database Schema Update for Multi-Grade Profiles

# Goal
Migrate the `profiles` table to support an array of grades (`grades smallint[]`) instead of a single scalar `grade`, enabling users to select multiple curriculums.

# Background context
The platform is expanding to allow students (like Cherry) who are learning multiple grades concurrently (e.g., Grade 3 and Grade 7) to access content for all selected grades from a unified dashboard.

# Files involved
- `supabase/migrations/040_multi_grades_profile.sql` (New)

# DB changes
- Alter table `public.profiles`: add column `grades smallint[] not null default '{3}'`.
- Copy data: `UPDATE public.profiles SET grades = ARRAY[grade];`
- Update trigger function `public.handle_new_user()` to insert default array `'{3}'`.

# APIs involved
- Supabase SQL execution.

# Dependencies
- None.

# Implementation checklist
- [ ] Create `040_multi_grades_profile.sql` migration file.
- [ ] Write ALTER TABLE statements.
- [ ] Write UPDATE trigger statement.
- [ ] Review existing RLS policies in `001_schema.sql` (if any still rely heavily on `p.grade`) to ensure no immediate breakage, though `curriculum_units` is primarily used now with public read.

# Validation checklist
- [ ] Run migration successfully.
- [ ] Check DB to ensure `grades` array exists and contains legacy `grade` values.
- [ ] New user signup sets `grades` correctly.

# Future extension notes
- `grade` scalar column can be dropped in a future cleanup phase after verifying full stability.

# Known risks
- RLS policies on legacy tables (`public.lessons`, `public.quizzes`) that strictly expect `grade = (select p.grade...)` might break. We should update them to `grade = ANY(select p.grades...)` within this migration just in case.
