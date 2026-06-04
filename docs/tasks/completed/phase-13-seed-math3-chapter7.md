# Title

Phase 13: Seed Grade 3 Math Chapter 7 Assessments (Semester 1 Review)

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 3 Math Chapter 7 (Chủ đề 7: Ôn tập học kì I) into the Universal Assessment schema.

# Background context

This is the final phase for Grade 3 Math Volume 1. Chapter 7 serves as the Semester 1 review, covering arithmetic, numerical expressions, geometry, and measurement. There are 4 sections. The script should ideally mix and pull generation logic from Chapters 1 through 6 to create comprehensive review exams.

# Files involved

- `scripts/seed-math3-chapter7-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/Chuong_7/` (To be created/provided)

# DB changes

- **curriculum_nodes**: Insert Unit `"Chủ đề 7: Ôn tập học kì I"`.
- **assessment_collections**: Insert collection `"Toán 3 - Tập 1"` mapped to this unit.
- **question_bank**: Insert 320 new questions (4 sections * 4 exams * 20 questions).
- **exams**: Insert 16 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 16 corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.

# Dependencies

- Depends on the Universal schema and completion of all previous Math 3 Chapters (1-6).

# Implementation checklist

- [ ] Create `scripts/seed-math3-chapter7-assessments.ts`.
- [ ] Implement insertion of curriculum unit `"Chủ đề 7: Ôn tập học kì I"` into `curriculum_nodes`.
- [ ] Define 4 practice exams for **Bài 41. Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000**.
- [ ] Define 4 practice exams for **Bài 42. Ôn tập biểu thức số**.
- [ ] Define 4 practice exams for **Bài 43. Ôn tập hình học và đo lường**.
- [ ] Define 4 practice exams for **Bài 44. Ôn tập chung**.
- [ ] Combine deterministic logic from previous chapters to cover all topics evenly within the review exams.
- [ ] Execute `node --import tsx scripts/seed-math3-chapter7-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 16 exams and 320 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm "Chủ đề 7" appears at the end of Volume 1.
- [ ] Verify that the exams accurately reflect a mix of Semester 1 content.

# Known risks

- Integrating logic from multiple previous scripts might cause code duplication or complexity. Consider refactoring common generation functions into a shared utility file (e.g., `lib/math3-generators.ts`) if possible.
