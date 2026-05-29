# PHASE ARCHITECTURE: PHASE 7 — ASSESSMENT STUDIO

# GOAL
Build the **Assessment Studio**, a specialized tool for teachers and content creators to generate, review, and manage high-quality exams aligned with the canonical curriculum.

# ARCHITECTURE OVERVIEW
The Assessment Studio serves as an **offline content generation layer**. It sits between the **Canonical Curriculum Database** and the **Question Bank**, providing a human-in-the-loop interface for generating structured assessments.

## CORE PRINCIPLES
- **Curriculum Controls AI**: AI never "invents" exam topics; it only populates blueprints derived from the database.
- **Blueprint-Driven**: Exams are built using predefined interaction and pedagogy blueprints.
- **Multi-Stage Validation**: Every generated question must pass structural, lexical, and grade-level validation.

# GENERATION FLOW
1. **Teacher Intent**: User selects grade, units, difficulty, and duration.
2. **Curriculum Retrieval**: System pulls target concepts from `curriculum_concepts`.
3. **Question Bank Search**: System checks for existing validated questions in `question_bank`.
4. **Blueprint Selection**: System maps concepts to appropriate interaction blueprints (e.g., `vocab_recall_tap`).
5. **Deterministic Generation**: Generators build the base question structure.
6. **AI Enhancement**: Gemini generates distractors, paraphrases instructions, and writes explanations.
7. **Rigorous Validation**: Zod schema check + lexical scope check (Grade 3 constraints).
8. **Review & Approve**: Teacher reviews the draft, edits if necessary, and saves to the DB.

# TABLES (SUPABASE)
- `assessment_collections`: Logical groups of related exams.
- `exams`: Individual assessment instances.
- `exam_questions`: Junction table linking exams to `question_bank`.
- `assessment_sources`: Links to reference materials (sample tests, textbook sections).

# RELATED TASKS
1. `phase-7-db-schema.md`: Database migrations for Assessment Studio.
2. `phase-7-api-foundation.md`: API routes for generation and retrieval.
3. `phase-7-ui-scaffolding.md`: Core UI layout and collection management.
4. `phase-7-review-screen.md`: Interactive question review and editing interface.

# RISKS
- **AI Hallucination**: Distractors must be strictly within curriculum scope.
- **Cognitive Load**: Grade 3 exams must keep instructions very simple.
- **Latency**: Generation may take time; requires async processing or optimistic UI.

# SUCCESS CRITERIA
- Teacher can generate a 10-question exam for Unit 1 in under 60 seconds.
- Every generated question is 100% aligned with the textbook vocabulary.
- The UI follows the "toy-like" playful aesthetic of the platform.
