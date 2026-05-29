# Phase 1: Assessment Map Rework & Real Exam Integration

## Phase Goals
- Rework the data layer for the subject map to fetch from `assessment_collections` and `exams` instead of `curriculum_units`.
- Re-architect the UI to support a hierarchical structure: Volume > Unit > Exams, while retaining the Duolingo-style bubble aesthetic.
- Integrate real question data into the `/test-assessment` page, replacing mock data.

## Architecture Overview
Currently, the map fetches data using `getSubjectCurriculum`, which relies on `curriculum_units` and `curriculum_lessons`. 
The new architecture will fetch `assessment_collections` (grouped by volume and units) and join with `exams` to represent the nodes on the map.
The UI will use a nested structure. Each Volume acts as a major section. Each Unit is a subsection. Exams are the clickable nodes that look like Duolingo bubbles.

## Implementation Order
1. **Data Layer** (`phase-1-assessment-data-layer.md`): Build robust Supabase queries in `actions.ts` to fetch and format the map data, and to fetch real exam questions.
2. **UI Layer** (`phase-1-subject-map-ui.md`): Update `app/(app)/english-world/[subject]/page.tsx` to render the new nested map using the Duolingo-style components.
3. **Integration** (`phase-1-real-exam-integration.md`): Update `test-assessment/page.tsx` to take an `examId` param and load real questions using the new data layer function.

## Related Tasks
- `docs/tasks/pending/phase-1-assessment-data-layer.md`
- `docs/tasks/pending/phase-1-subject-map-ui.md`
- `docs/tasks/pending/phase-1-real-exam-integration.md`

## Risks
- The Duolingo "snake" layout calculation (`Math.sin()`) might look strange if split across too many small units. The Execution Agent needs to ensure the math resets or continues cleanly per unit.
- Real questions might have missing concept mappings, so fallback logic is required.

## Success Criteria
- Map loads hierarchically (Volume > Unit > Exams).
- Map nodes look like Duolingo bubbles and animate properly.
- Clicking an exam node redirects to `/test-assessment?examId=...`.
- Test assessment loads real questions from `exam_questions` -> `question_bank`.
