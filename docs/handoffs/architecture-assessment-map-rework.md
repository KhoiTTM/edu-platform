# Architecture Handoff: Assessment Map Rework

## What changed
- Designed the architecture for switching the subject map (`/english-world/[subject]`) to use `assessment_collections` and `exams`.
- Designed the hierarchical UI mapping (Volume > Unit > Exam) while preserving Duolingo aesthetics.
- Designed the integration of real questions into `/test-assessment`.

## Why it changed
- User requirement to link the Assessment Studio data directly to the student-facing map.
- User requested a specific hierarchy (Volume > Unit) but wanted to retain the highly polished Duolingo-style UX.
- User confirmed real questions are tested and ready for production use.

## Architectural impact
- Deprecates the hardcoded or old `curriculum_lessons` flow for the map, aligning the game directly with teacher-generated or system-generated `assessment_collections`.
- Enforces the "Curriculum Controls AI" principle by strictly using the deterministic database hierarchy.

## Migration notes
- Ensure `getAssessmentMap` maps the `subject` properly (e.g., using the `universal_subjects` slug logic we fixed earlier).

## Recommended next tasks
- The **Execution Agent** should pick up the 3 tasks in `docs/tasks/pending/` and implement them sequentially.
