# Title

Phase 7: Seed Grade 3 Math Assessments (Dynamic/All Available Chapters)

# Goal

Implement a dynamic seeding script for Grade 3 Math (Toán 3 - Tập 1) that automatically scans all available chapter folders in the JSON directory, parses the lessons, and seeds handcrafted 20-question exam papers (4 practice sets per section) into the Universal Assessment schema.

# Background context

We are establishing the Assessment Studio for Grade 3 Math. Instead of writing a rigid, chapter-specific script, the requirement is to build a script that processes any available JSON data in `docs/Assement Studio/Toan_3_Tap1_JSON/`. Currently, Chapters 1 and 2 (and possibly more in the future) are available. 
The script must automatically iterate over `Chuong_1`, `Chuong_2`, etc., extract the lesson metadata from the JSON files, use deterministic generation logic (adapted for the Universal schema), and create exactly 4 exams per lesson. This ensures that as new chapters are added, the agent simply needs to re-run the same task to completion without requiring a new task definition for every single chapter.

# Files involved

- `scripts/seed-math3-dynamic-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/`

# DB changes

- **curriculum_nodes**: Dynamically insert Units corresponding to the scanned chapters (e.g., "Chủ đề 1...", "Chủ đề 2...").
- **assessment_collections**: Insert collection `"Toán 3 - Tập 1"` mapped to the respective units.
- **question_bank**: Insert dynamically generated questions based on the JSON content.
- **exams**: Insert 4 new exams per discovered lesson.
- **exam_questions**: Link generated questions to the exams.
- **exercise_sets**: Insert corresponding exercise sets.
- **exercise_questions**: Link generated questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.
- Node.js `fs` module to dynamically read directory structures.

# Dependencies

- Depends on the Universal Assessment Schema tables being available.

# Implementation checklist

- [ ] Create `scripts/seed-math3-dynamic-assessments.ts`.
- [ ] Build a file scanner in the script that reads `docs/Assement Studio/Toan_3_Tap1_JSON/table_of_contents.json` or scans the `Chuong_X` directories.
- [ ] For each discovered Chapter, find or create the corresponding unit in `curriculum_nodes` (e.g., "Chủ đề 1", "Chủ đề 2").
- [ ] For each Chapter, find or create the assessment collection (`Toán 3 - Tập 1`).
- [ ] Parse the JSON files in the chapter directories to extract the lesson titles.
- [ ] For every extracted lesson, generate 4 practice exams with 20 questions each, utilizing deterministic math logic.
- [ ] Ensure formatting uses simple text (or basic LaTeX) suitable for 3rd graders.
- [ ] Execute `node --import tsx scripts/seed-math3-dynamic-assessments.ts` to process ALL available chapters at once.
- [ ] Verify execution logs confirm that both Chapter 1 and Chapter 2 (and any others found) were successfully seeded.

# Validation checklist

- [ ] Verify script execution logs show successful parsing and insertion for multiple chapters.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm multiple Units (Chủ đề 1, Chủ đề 2, etc.) appear.
- [ ] Open the "Đánh giá tính điểm" tab for each chapter and verify the 4 assessment options per lesson.

# Future extension notes

- This dynamic script is designed to "run to completion" based on the filesystem. Whenever a new chapter is added to the JSON folder, running this script again should safely add the new chapter without duplicating existing ones (ensure idempotent inserts).
