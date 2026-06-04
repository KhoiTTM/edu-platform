# Title

Phase 12: Seed Grade 3 Math Chapter 6 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 3 Math Chapter 6 (Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000) into the Universal Assessment schema.

# Background context

This task targets Chapter 6 of Grade 3 Math, which scales up arithmetic operations to the 1,000 range. It includes multiplication, division, numerical expressions, and ratio comparisons. There are 5 lessons. Deterministic logic should be utilized heavily to auto-generate diverse calculation questions and word problems.

# Files involved

- `scripts/seed-math3-chapter6-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/Chuong_6/` (To be created/provided)

# DB changes

- **curriculum_nodes**: Insert Unit `"Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000"`.
- **assessment_collections**: Insert collection `"Toán 3 - Tập 1"` mapped to this unit.
- **question_bank**: Insert 400 new questions (5 sections * 4 exams * 20 questions).
- **exams**: Insert 20 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 20 corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.

# Dependencies

- Depends on the Universal schema and previous Math 3 tasks.

# Implementation checklist

- [ ] Create `scripts/seed-math3-chapter6-assessments.ts`.
- [ ] Implement insertion of curriculum unit `"Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000"` into `curriculum_nodes`.
- [ ] Define 4 practice exams for **Bài 36. Nhân số có ba chữ số với số có một chữ số**.
- [ ] Define 4 practice exams for **Bài 37. Chia số có ba chữ số cho số có một chữ số**.
- [ ] Define 4 practice exams for **Bài 38. Biểu thức số. Tính giá trị của biểu thức số**.
- [ ] Define 4 practice exams for **Bài 39. So sánh số lớn gấp mấy lần số bé**.
- [ ] Define 4 practice exams for **Bài 40. Luyện tập chung**.
- [ ] Implement robust deterministic logic to generate expressions with correct operator precedence (BODMAS/PEMDAS) for Lesson 38.
- [ ] Execute `node --import tsx scripts/seed-math3-chapter6-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 20 exams and 400 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm "Chủ đề 6" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 6 and verify 4 assessment options per section are available.

# Known risks

- For expression evaluation (Bài 38), ensure that the generated wrong answers (distractors) are common mistakes students make (e.g., adding before multiplying) to provide educational value.
