# Title
Learning Dashboard Multi-Grade Grouping

# Goal
Refactor the `/hoc-tap` dashboard to display subjects grouped by grade, dynamically generated from the user's `grades` array in their profile.

# Background context
When a user selects multiple grades, the single list of subjects in the dashboard becomes confusing. We need to group them (e.g., "Khu vực Lớp 3", "Khu vực Lớp 7") so the user can clearly navigate to the correct curriculum.

# Files involved
- `app/(app)/hoc-tap/page.tsx`
- `supabase/migrations/037_get_subjects_by_grade.sql` (Check if we need to fetch subjects by multiple grades)

# DB changes
- None.

# APIs involved
- Supabase fetch for `universal_subjects` (or we just use the static list and generate links like `/hoc-tap/[slug]/lop-[grade]`, but currently `/hoc-tap/[slug]` handles grade routing based on profile). Wait, if a user has multiple grades, `/hoc-tap/[slug]` will need the grade in the URL or they have to choose.
- Currently, `/learn/[subject]/lop-[grade]` is the actual curriculum map path. The dashboard should link directly to those!

# Dependencies
- Phase 1 & 2 completed.

# Implementation checklist
- [ ] Update `/hoc-tap/page.tsx` to fetch `grades: number[]` from the user's profile.
- [ ] For each grade in the array, render a distinct section (e.g., `<section><h2>Trạm Lớp 3</h2>...<ul>...</ul></section>`).
- [ ] Generate links pointing directly to `/learn/[subject]/lop-[grade]` instead of `/hoc-tap/[slug]`, or update `/hoc-tap/[slug]` to handle grade routing explicitly. (Direct links to `/learn` are safer and skip the intermediate step).
- [ ] Implement robust error handling if no grades are selected.

# Validation checklist
- [ ] Dashboard groups subjects properly by grade.
- [ ] Clicking a subject in "Trạm Lớp 3" takes the user to the Grade 3 curriculum map.
- [ ] UI looks consistent with the Gamification/Glassmorphism design language.

# Future extension notes
- This layout seamlessly supports adding Grade 4, 5, etc., in the future.

# Known risks
- Hardcoded subjects in `/hoc-tap/page.tsx` might need to be filtered so we don't show "Mindset IELTS" under Grade 3. We should query `curriculum_units` to see which subjects actually exist for each grade.
