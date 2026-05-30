# Handoff: Database Schema Update for Multi-Grade Profiles

## What was implemented
- Migration script `supabase/migrations/040_multi_grades_profile.sql` created.
- Added `grades smallint[]` column to `public.profiles` table.
- Migrated legacy `grade` data to `grades` array for all existing users.
- Updated `public.handle_new_user()` trigger to populate both `grade` and `grades`.
- Updated RLS policies for `lessons`, `quizzes`, `quiz_questions`, `subjects`, and `weekly_lesson_schedule` to use `ANY(grades)` instead of scalar equality.
- Updated `Profile` type in `types/database.ts` to include `grades: Grade[]`.

## Files changed
- `supabase/migrations/040_multi_grades_profile.sql` (New)
- `types/database.ts` (Modified)

## DB migrations
- `040_multi_grades_profile.sql` needs to be run in the Supabase SQL editor.

## APIs added
- N/A (Database level changes).

## Validation added
- SQL migration includes idempotent checks (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`).
- Type safety ensured via TypeScript update.

## Known limitations
- The legacy `grade` column is still present and populated to ensure backward compatibility with any systems not yet updated. It can be removed in a future cleanup phase.

## Recommended next tasks
- Implement UI for multiple grade selection in `/settings` (`phase-2-multi-grade-settings.md`).
- Update the learning dashboard to group subjects by selected grades (`phase-3-learning-dashboard-multi-grade.md`).

## Risks / technical debt
- Ensure that any future RLS policies or queries also use the `grades` array.
- The `grade` scalar should eventually be deprecated.
