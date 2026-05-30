# Phase: Multi-Grade Profile Settings

## Phase Goals
Enable users (students) to select and learn from multiple grade curriculums simultaneously (e.g., Grade 3 and Grade 7). The Learning Dashboard will automatically aggregate and group subjects by the selected grades, maintaining the "Curriculum Controls AI" architecture.

## Architecture Overview
- **Data Layer:** `profiles` table migrates `grade (smallint)` to `grades (smallint[])`.
- **Logic Layer:** Supabase auth triggers and Server Actions update the `grades` array.
- **UI Layer:** A new `/settings` page for selection, and an updated `/hoc-tap` dashboard that fetches the array and groups subjects accordingly.

## Dependencies
- Supabase migrations setup.
- Existing UI components (neon buttons, layout wrappers).

## Implementation Order
1. `phase-1-multi-grade-schema` - Database adjustments.
2. `phase-2-multi-grade-settings` - UI for user selection.
3. `phase-3-learning-dashboard-multi-grade` - Dashboard UI adjustments to render groups.

## Related Tasks
- `docs/tasks/pending/phase-1-multi-grade-schema.md`
- `docs/tasks/pending/phase-2-multi-grade-settings.md`
- `docs/tasks/pending/phase-3-learning-dashboard-multi-grade.md`

## Risks
- Existing users might have null or scalar `grade` values; the migration must safely convert `grade` to `grades` array.
- RLS policies using `grade` need to be checked for breaking changes.

## Success Criteria
- User can go to `/settings` and check/uncheck Grade 3 and Grade 7.
- Dashboard `/hoc-tap` shows subjects for both grades grouped clearly without breaking existing `/learn/...` routes.
