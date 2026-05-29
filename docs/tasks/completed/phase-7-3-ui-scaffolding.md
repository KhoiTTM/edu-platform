# TASK: PHASE 7.3 — ASSESSMENT STUDIO UI SCAFFOLDING

# GOAL
Build the core teacher-facing UI for managing assessment collections and initiating generation.

# BACKGROUND CONTEXT
The UI should be playful and "toy-like" to match the platform's aesthetic, but highly functional for curriculum-aware management.

# FILES INVOLVED
- `app/(studio)/assessment-studio/page.tsx`
- `components/studio/CollectionCard.tsx`
- `components/studio/GenerationForm.tsx`

# DB CHANGES
- Fetch from `assessment_collections`.

# IMPLEMENTATION CHECKLIST
- [ ] Create the studio layout with sidebar navigation.
- [ ] Implement the `CollectionCard` component.
- [ ] Build the `GenerationForm` with subject/grade/unit selectors.
- [ ] Integrate the generation API with a loading state (playful progress bar).
- [ ] Implement collection creation and deletion.

# VALIDATION CHECKLIST
- [ ] Verify form validation prevents empty submissions.
- [ ] Test UI responsiveness on desktop and tablet.
- [ ] Ensure navigation between collections and specific exams works smoothly.

# FUTURE EXTENSION NOTES
Add a 'Templates' library for commonly used exam structures.
