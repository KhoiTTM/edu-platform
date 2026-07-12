# INSTRUCTIONS FOR ASSESSMENT IMPORT AGENTS

You are an Execution Agent responsible for importing manually generated assessment JSON files into the EdTech platform.

> **Relationship to the canonical exam-bank workflow (`docs/EXAM_BANK.md`):** this is a
> secondary/manual import path for teacher-authored content, separate from the standard
> `scripts/seed-exam-bank.ts` generator. Both paths write to the same 3-layer schema
> (`assessment_collections` → `exams` → `question_bank`/`exam_questions`) and both are bound
> by the same core rule: **content only "exists" for students once it is actually seeded into
> Supabase.** JSON files (`pending/`, `imported/`) are staging drafts and backup/reference —
> never the runtime source.

## CONTEXT
Teachers often use the Gemini Pro Web interface (using the prompt in `docs/system-prompts/manual-exam-generator.md`) to create high-quality assessments when the API is limited. These results are saved as `.json` files in:
`content/assessments/pending/`

## YOUR WORKFLOW

1.  **SCAN**: Check `content/assessments/pending/` for any `.json` files.
2.  **VALIDATE JSON**:
    *   Must have `title` — set it explicitly and meaningfully. There is **no automatic
        title trigger** (the old auto-naming trigger was removed in migration `053` — see
        `docs/EXAM_BANK.md` mục 6b/7.1). Nothing overrides a wrong title after insert.
    *   Must have `metadata` object with: `subject`, `grade`, `volume`, `units` (array of numbers), and `book`.
    *   Must have a `questions` array.
3.  **CONVERT & IMPORT**:
    *   Use the existing import script logic (`scripts/automate-assessment-import.ts`).
    *   **Subject Mapping**: Ensure "Tiếng Anh" maps to `tieng_anh`, "Toán" to `math`, and "IELTS" to `ielts`.
    *   **Concept IDs**: The JSON won't have `concept_id`s. You MUST query the `curriculum_concepts` or `concepts` table to find a valid `id` to satisfy foreign key constraints. (Note: `question_bank.concept_id` is nullable since migration `048` — `null` is valid if there's no matching concept.)
    *   **Database Triggers**: There are no `assessment_collections` triggers left for
        `sequence_number` or `title` (removed in migration `053`). Both must be supplied
        explicitly by this import step — prefer building `title` with
        `lib/assessment/buildExamTitle.ts` to stay consistent with the rest of the platform.
4.  **CLEANUP**:
    *   Move the processed file from `pending/` to `content/assessments/imported/`.
    *   Rename the file to include the import date (e.g., `imported_2026_05_28_tienganh3.json`).
    *   Keep the file — do not delete it. It stays as the reference/restore copy for this import, same as the exam-bank JSON files.
5.  **VERIFY**: Confirm the data actually landed in Supabase (query `assessment_collections`/`exams`/`exam_questions`, don't just trust the script exited 0) before reporting done.
6.  **REPORT**: Notify the user that the import is complete and the assessment is ready on the Dashboard.

## DATABASE SCHEMA REFERENCE
*   `assessment_collections`: `title`, `subject_slug`, `grade`, `volume`, `units`, `sequence_number`, `status`, `reference_book`.
*   `exams`: `collection_id`, `title`, `total_questions`.
*   `question_bank`: `concept_id`, `type`, `metadata_json`, `subject_slug`, `grade`, `status`, `source`, `source_anchor`.
*   `exam_questions`: `exam_id`, `question_bank_id`, `order_index`.

## QUALITY STANDARD
Every imported question MUST be visible and editable in the Assessment Studio UI. If a blueprint rendering fails, investigate `components/studio/PreviewPanel.tsx`.
