# Title

Phase 5: Seed Grade 7 Math Chapter 4 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 7 Math Chapter 4 (Tam giác bằng nhau) into the database.

# Background context

We are expanding the math curriculum assessments to Chapter 4: "Tam giác bằng nhau". This chapter is extensive and includes 4 main lessons, 3 review sections, and 1 chapter summary (total 8 sections). We must maintain the established pattern: 10 prerequisite questions (Grade 6 geometry, angles) and 10 lesson-specific questions per exam, properly formatted with LaTeX.

# Files involved

- `scripts/seed-chapter4-assessments.ts` (New)

# DB changes

- **curriculum_nodes**: Insert or ensure `"Chương 4: Tam giác bằng nhau"` exists.
- **assessment_collections**: Insert or ensure collection `"Toán 7 - Tập 1"` for Unit 4 exists.
- **question_bank**: Insert up to 640 new questions (32 exams * 20 questions) depending on final scope.
- **exams**: Insert up to 32 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL database connections via `@supabase/supabase-js`.

# Dependencies

- Follows the completion of Chapter 1, 2, and 3 seeding tasks.

# Implementation checklist

- [ ] Create `scripts/seed-chapter4-assessments.ts`.
- [ ] Implement logic to find/insert curriculum unit `"Chương 4: Tam giác bằng nhau"`.
- [ ] Define 4 practice exams for **Bài 12: Tổng các góc trong một tam giác** (20 questions each).
- [ ] Define 4 practice exams for **Bài 13: Hai tam giác bằng nhau. Trường hợp c-c-c** (20 questions each).
- [ ] Define 4 practice exams for **Bài 14: Trường hợp bằng nhau thứ hai và thứ ba của tam giác**.
- [ ] Define 4 practice exams for **Bài 15: Các trường hợp bằng nhau của tam giác vuông**.
- [ ] Define practice exams for the "Luyện tập chung" and "Ôn tập chương" sections (adjust scope if needed).
- [ ] Ensure LaTeX formatting is strictly followed.
- [ ] Execute `node --import tsx scripts/seed-chapter4-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of the correct number of exams.
- [ ] Navigate to `/luyen-tap/toan?grade=7` and confirm "Chương 4" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 4 and verify assessment options.

# Known risks

- High volume of questions (640 questions) might lead to timeout or memory issues during single script execution. Consider batching inserts or splitting the script if necessary.
