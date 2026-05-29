# Title
Data Layer for Assessment Map and Real Exams

# Goal
Create functions to fetch the hierarchical map data (Volume > Unit > Exam) and to fetch real exam questions.

# Background context
The subject map currently uses old curriculum tables. We need to switch it to use `assessment_collections` and `exams`. We also need a function to fetch real questions for a specific exam instead of using hardcoded mock data.

# Files involved
- `app/(app)/english-world/actions.ts`
- `app/(app)/test-assessment/actions.ts` (Create if needed)

# DB changes
None. Use existing `assessment_collections`, `exams`, `exam_questions`, and `question_bank`.

# APIs involved
Supabase JS client.

# Dependencies
Supabase.

# Implementation checklist
- [ ] In `english-world/actions.ts`, create `getAssessmentMap(subjectSlug: string, grade: number)`.
- [ ] Query `assessment_collections` (filter by slug, grade, status='published') and join with `exams`.
- [ ] Transform the result into a nested structure: `[ { volume: 1, units: [ { unit: 1, exams: [...] } ] } ]`.
- [ ] Create `getExamQuestions(examId: string)` that queries `exam_questions` joined with `question_bank`.
- [ ] Ensure `getExamQuestions` maps the DB columns (`metadata_json`, etc.) to the format expected by `AssessmentRenderer` (e.g. `question`, `options`, `correct_index`, `concept_id`).

# Validation checklist
- [ ] Data returns correctly grouped by Volume and Unit.
- [ ] Real questions include all necessary fields for the renderer.

# Future extension notes
None for now. Keep it specific to the current Grade 3 assessments.

# Known risks
- `units` in `assessment_collections` is an array of integers. Need to handle cases where an assessment spans multiple units. For simplicity, group it under the first unit in the array or a "Review" section if spanning multiple.
