# Title
Hierarchical Subject Map UI with Duolingo Aesthetics

# Goal
Update the subject map page to render the nested Volume > Unit > Exam structure while keeping the current Duolingo-style bubble nodes.

# Background context
The current UI is a flat list of nodes. We need to group them visually by Volume and Unit, based on the new data layer.

# Files involved
- `app/(app)/english-world/[subject]/page.tsx`

# DB changes
None.

# APIs involved
Calls `getAssessmentMap` from `actions.ts`.

# Dependencies
Framer Motion, clsx.

# Implementation checklist
- [ ] Call `getAssessmentMap` instead of `getSubjectCurriculum`.
- [ ] Render a Section for each Volume.
- [ ] Render a Sub-section for each Unit inside the Volume.
- [ ] Render the `LevelButton` for each Exam inside the Unit.
- [ ] Maintain the `Math.sin()` logic for the zigzag path. You may need to track a `globalIndex` across units so the path connects smoothly.
- [ ] Update the `LevelButton` href to point to `/test-assessment?examId=${level.id}`.

# Validation checklist
- [ ] Volumes and Units are clearly separated with UI headers.
- [ ] Bubbles still animate and zigzag correctly.
- [ ] Clicking a bubble goes to the correct URL.

# Future extension notes
- Consider adding SVG paths to connect the bubbles if the basic zigzag isn't enough.

# Known risks
- Grouping by units might break the visual flow of the zigzag if not careful with the `globalIndex`.
