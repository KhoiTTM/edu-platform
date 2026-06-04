# Title

Phase 10: Seed Grade 3 Math Chapter 4 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 3 Math Chapter 4 (Chủ đề 4: Phép nhân, phép chia trong phạm vi 100) into the Universal Assessment schema.

# Background context

Following the structured roadmap for Grade 3 Math, this task targets Chapter 4 (Chủ đề 4). This chapter is highly procedural, focusing on arithmetic operations (multiplication and division up to 100). Deterministic logic can be easily applied here to generate varied mathematical expressions. There are 7 lessons in total. The goal is to provide a comprehensive set of practice exams without overlapping questions.

# Files involved

- `scripts/seed-math3-chapter4-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/Chuong_4/` (To be created/provided)

# DB changes

- **curriculum_nodes**: Insert Unit `"Chủ đề 4: Phép nhân, phép chia trong phạm vi 100"`.
- **assessment_collections**: Insert collection `"Toán 3 - Tập 1"` mapped to this unit.
- **question_bank**: Insert 560 new questions (7 sections * 4 exams * 20 questions).
- **exams**: Insert 28 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 28 corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.

# Dependencies

- Depends on the Universal schema and previous Math 3 tasks.

# Implementation checklist

- [ ] Create `scripts/seed-math3-chapter4-assessments.ts`.
- [ ] Implement insertion of curriculum unit `"Chủ đề 4: Phép nhân, phép chia trong phạm vi 100"` into `curriculum_nodes`.
- [ ] Define 4 practice exams for **Bài 23. Nhân số có hai chữ số với số có một chữ số**.
- [ ] Define 4 practice exams for **Bài 24. Gấp một số lên một số lần**.
- [ ] Define 4 practice exams for **Bài 25. Phép chia hết, phép chia có dư**.
- [ ] Define 4 practice exams for **Bài 26. Chia số có hai chữ số cho số có một chữ số**.
- [ ] Define 4 practice exams for **Bài 27. Giảm một số đi một số lần**.
- [ ] Define 4 practice exams for **Bài 28. Bài toán giải bằng hai bước tính**.
- [ ] Define 4 practice exams for **Bài 29. Luyện tập chung**.
- [ ] Implement deterministic logic to auto-generate math expressions to prevent repetition.
- [ ] Execute `node --import tsx scripts/seed-math3-chapter4-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 28 exams and 560 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm "Chủ đề 4" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 4 and verify 4 assessment options per section are available.

# Known risks

- Word problems (Bài toán giải bằng hai bước tính) require dynamic text generation. Ensure the script properly constructs logical, grammatically correct Vietnamese sentences for these word problems with changing variables.
