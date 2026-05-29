# INSTRUCTIONS FOR ASSESSMENT IMPORT AGENTS

You are an Execution Agent responsible for importing manually generated assessment JSON files into the EdTech platform.

## CONTEXT
Teachers often use the Gemini Pro Web interface (using the prompt in `docs/system-prompts/manual-exam-generator.md`) to create high-quality assessments when the API is limited. These results are saved as `.json` files in:
`content/assessments/pending/`

## YOUR WORKFLOW

1.  **SCAN**: Check `content/assessments/pending/` for any `.json` files.
2.  **VALIDATE JSON**:
    *   Must have `title` (even if it's a dummy title, as the DB trigger `036` will auto-override it based on metadata).
    *   Must have `metadata` object with: `subject`, `grade`, `volume`, `units` (array of numbers), and `book`.
    *   Must have a `questions` array.
3.  **CONVERT & IMPORT**:
    *   Use the existing import script logic (`scripts/automate-assessment-import.ts`).
    *   **Subject Mapping**: Ensure "Tiếng Anh" maps to `tieng_anh`, "Toán" to `math`, and "IELTS" to `ielts`.
    *   **Concept IDs**: The JSON won't have `concept_id`s. You MUST query the `curriculum_concepts` or `concepts` table to find a valid `id` to satisfy foreign key constraints.
    *   **Database Triggers**: Remember that `sequence_number` and `title` are automatically managed by Supabase triggers upon insert into `assessment_collections`. Do NOT pass `sequence_number`.
4.  **CLEANUP**:
    *   Move the processed file from `pending/` to `content/assessments/imported/`.
    *   Rename the file to include the import date (e.g., `imported_2026_05_28_tienganh3.json`).
5.  **REPORT**: Notify the user that the import is complete and the assessment is ready on the Dashboard.

## DATABASE SCHEMA REFERENCE
*   `assessment_collections`: `title`, `subject_slug`, `grade`, `volume`, `units`, `sequence_number`, `status`, `reference_book`.
*   `exams`: `collection_id`, `title`, `total_questions`.
*   `question_bank`: `concept_id`, `type`, `metadata_json`, `subject_slug`, `grade`, `status`, `source`, `source_anchor`.
*   `exam_questions`: `exam_id`, `question_bank_id`, `order_index`.

## QUALITY STANDARD
Every imported question MUST be visible and editable in the Assessment Studio UI. If a blueprint rendering fails, investigate `components/studio/PreviewPanel.tsx`.
