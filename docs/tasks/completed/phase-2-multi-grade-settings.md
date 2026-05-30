# Title
Multi-Grade Settings UI

# Goal
Provide a user-friendly UI for selecting which grades they want to learn (e.g., Grade 3, Grade 7), saving this selection to the database.

# Background context
Users need a way to opt-in to new curriculums without losing access to their old ones. A dedicated profile settings page allows parents or students to toggle grade access.

# Files involved
- `app/(app)/settings/page.tsx` (New)
- `app/(app)/settings/actions.ts` (New)
- `components/universal/SettingsForm.tsx` (New, optional client component)

# DB changes
- None (relies on Phase 1 schema changes).

# APIs involved
- Supabase Client/Server updates to `profiles.grades`.

# Dependencies
- `profiles` must have the `grades` array.

# Implementation checklist
- [ ] Create `/settings` route.
- [ ] Implement UI with Glassmorphism/Gamification styling.
- [ ] Provide Multi-select toggles/checkboxes for Grade 3 and Grade 7.
- [ ] Create Server Action `updateUserGrades(grades: number[])`.
- [ ] Handle loading and success states.

# Validation checklist
- [ ] UI renders correctly.
- [ ] Toggling grades and submitting updates the Supabase `profiles` table.
- [ ] Error handling works for DB failures.

# Future extension notes
- More grades can be added easily by expanding the toggle list.

# Known risks
- Users could uncheck all grades, so we should ensure at least one grade is selected or handle an empty dashboard gracefully.
