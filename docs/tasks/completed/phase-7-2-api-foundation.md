# TASK: PHASE 7.2 — ASSESSMENT STUDIO API FOUNDATION

# GOAL
Build the core API logic for curriculum retrieval, question bank searching, and initial assessment structure generation.

# BACKGROUND CONTEXT
The API layer must orchestrate the complex flow of pulling data from the canonical curriculum DB and the question bank to form a coherent assessment.

# FILES INVOLVED
- `app/api/assessment/generate/route.ts`
- `lib/assessment/generation-engine.ts`
- `lib/curriculum/retrieval-service.ts`

# DB CHANGES
- Read-only access to `curriculum_concepts`, `question_bank`.
- Write access to `exams`, `exam_questions` (as draft).

# IMPLEMENTATION CHECKLIST
- [ ] Implement `CurriculumRetrievalService` to fetch concepts by unit/grade.
- [ ] Implement `QuestionBankSearchService` to find existing validated questions.
- [ ] Build the `GenerationEngine` to map concepts to blueprints.
- [ ] Create `POST /api/assessment/generate` endpoint.
- [ ] Integrate Gemini for distractor and explanation generation (as an enhancement layer).

# VALIDATION CHECKLIST
- [ ] Verify API returns a valid structured JSON representing an exam draft.
- [ ] Test generation with different unit combinations.
- [ ] Ensure AI-generated content is passed through the validation layer.

# FUTURE EXTENSION NOTES
Consider supporting different generation modes: 'balanced', 'focus on weak concepts', 'speed-focused'.
