# Title

Phase 6: Seed Grade 7 Math Chapter 5 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 7 Math Chapter 5 (Thu thập và biểu diễn dữ liệu) into the database.

# Background context

This is the final chapter for Grade 7 Math Volume 1. The focus is on data collection, pie charts, and line graphs. We will maintain the 20-question structure: 10 prerequisite questions (Grade 6 data handling, bar charts) and 10 lesson-specific questions. Since this chapter heavily relies on visual data representation, the seeding script should accommodate data tables or text-based chart descriptions appropriately.

# Files involved

- `scripts/seed-chapter5-assessments.ts` (New)

# DB changes

- **curriculum_nodes**: Insert or ensure `"Chương 5: Thu thập và biểu diễn dữ liệu"` exists.
- **assessment_collections**: Insert or ensure collection `"Toán 7 - Tập 1"` for Unit 5 exists.
- **question_bank**: Insert 400 new questions (20 exams * 20 questions).
- **exams**: Insert 20 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 20 corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL database connections via `@supabase/supabase-js`.

# Dependencies

- Depends on completion of Chapter 1, 2, 3, and 4.

# Implementation checklist

- [ ] Create `scripts/seed-chapter5-assessments.ts`.
- [ ] Implement logic to find/insert curriculum unit `"Chương 5: Thu thập và biểu diễn dữ liệu"`.
- [ ] Define 4 practice exams for **Bài 17: Thu thập và phân loại dữ liệu**.
- [ ] Define 4 practice exams for **Bài 18: Biểu đồ hình quạt tròn**.
- [ ] Define 4 practice exams for **Bài 19: Biểu đồ đoạn thẳng**.
- [ ] Define 4 practice exams for **Luyện tập chung**.
- [ ] Define 4 practice exams for **Ôn tập chương V**.
- [ ] Ensure LaTeX formatting or markdown table structures are properly used for data presentation in questions.
- [ ] Execute `node --import tsx scripts/seed-chapter5-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 20 exams and 400 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=7` and confirm "Chương 5" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 5 and verify 4 assessment options per section are available.

# Known risks

- Representing pie charts or line graphs in text might be challenging. Ensure the question wording is clear enough for students to deduce the correct answers based on textual data descriptions, or implement image URL support if available.
