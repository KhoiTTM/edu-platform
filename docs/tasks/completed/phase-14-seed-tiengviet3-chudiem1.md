# Title

Phase 14: Tiếng Việt 3 - Seed Chủ điểm 1 Assessments (Những trải nghiệm thú vị)

# Goal

Implement a seeding script that parses the JSON files for Grade 3 Vietnamese (Tiếng Việt 3) - Chủ điểm 1, dynamically generates interactive questions (Matching, Fill-in-the-blank, Multiple Choice), and links them to the existing curriculum nodes.

# Background context

We have successfully established the curriculum map for Tiếng Việt 3. Now, we have received the detailed JSON content for **Chủ điểm 1: Những trải nghiệm thú vị**. The JSON contains structured sections like `luyện_từ_và_câu`, `đọc`, and `viết`. We need to convert these textbook exercises into gamified Assessment Studio questions. Since the user requested us to reuse the existing framework, we will store the complex UI structures (like matching columns A and B) inside the `metadata` JSONB column of `question_bank`.

# Files involved

- `scripts/seed-tiengviet3-chudiem1.ts` (New)
- JSON files in `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_1/*.json`

# DB changes

- **assessment_collections**: Insert 4 practice exams for each of the 8 lessons in Chủ điểm 1.
- **question_bank**: Insert interactive questions generated from the JSON data.
  - *Example*: For an exercise like "Ghép từ ngữ ở cột A với từ ngữ ở cột B" (page_016.json), the script must generate a `matching` type question and store the pairs in `metadata`.
  - *Example*: For "Phân biệt c/k", generate `fill_in_blank` or `multiple_choice` questions.
- **exams & exam_questions**: Link the generated questions to the exams.
- **exercise_sets & exercise_questions**: Link the questions to the corresponding exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.
- Node.js `fs` module to parse JSON files.

# Dependencies

- Depends on the existing `curriculum_nodes` map for Tiếng Việt 3.

# Implementation checklist

- [ ] Create `scripts/seed-tiengviet3-chudiem1.ts`.
- [ ] Query Supabase to fetch the `curriculum_nodes` IDs for "Chủ điểm 1" and its 8 lessons (Bài 1 -> Bài 8).
- [ ] Loop through the JSON files in `docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_1/`.
- [ ] Map the JSON exercises to the 8 lessons (determine which pages belong to which lesson based on the textbook TOC).
- [ ] For each lesson, generate exactly 4 practice exams (e.g., Đề 1, Đề 2, Đề 3, Đề 4).
- [ ] Implement parser logic for `luyện_từ_và_câu`: 
  - If instruction contains "Ghép từ ngữ", format it as a `matching` question.
  - If instruction asks for sentence creation, format as a `multiple_choice` or `sentence_reorder`.
- [ ] Execute `node --import tsx scripts/seed-tiengviet3-chudiem1.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 32 exams (8 lessons * 4 exams).
- [ ] Navigate to `/luyen-tap/tieng-viet?grade=3` and confirm the 4 assessment options appear under each lesson of Chủ điểm 1.
- [ ] Verify the `metadata` column in `question_bank` properly holds the structural data for matching/fill-in-the-blank questions.

# Known risks

- The JSON files are named by page number (e.g., `page_016.json`), not by lesson. The implementation agent MUST write a mapping function that connects page ranges to the correct lesson (Bài 1, Bài 2...) before parsing.
