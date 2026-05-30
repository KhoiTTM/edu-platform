# Handoff: Learning Dashboard Multi-Grade Grouping

## What was implemented
- Refactored `app/(app)/hoc-tap/page.tsx` to support multiple grades.
- Grouped subjects by grade using the `grades` array from the user's profile.
- Added a "Universal" section (Grade 0) for subjects like IELTS that are available to everyone.
- Updated subject links to point directly to `/learn/[subject]/[node-slug]` (e.g., `/learn/toan/lop-3`).
- Enhanced UI with animated sections and consistent gamified styling.
- Added empty state with a link to the new Settings page.

## Files changed
- `app/(app)/hoc-tap/page.tsx` (Modified)

## DB migrations
- Relies on Phase 1 (`040_multi_grades_profile.sql`).

## APIs added
- N/A (Uses existing `get_subjects_by_grade` RPC).

## Validation added
- Handled cases where no subjects are found for a selected grade.
- Handled cases where the user has no grades selected (defaults to Grade 3 or shows empty state).

## Known limitations
- Relies on a convention for root node slugs (`lop-3`, `lop-7`, `ielts-foundation`). If these conventions change, the links will need updating.

## Recommended next tasks
- Verify curriculum node slugs for all subjects to ensure links are perfectly accurate.
- Implement "Grade Switching" in other parts of the app if needed (e.g., Schedule).

## Risks / technical debt
- The hardcoded icons and colors in `hoc-tap/page.tsx` could be moved to the database or a configuration file in the future.
