# Title

Phase 4: Seed Grade 7 Math Chapter 3 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 7 Math Chapter 3 (Hình học trực quan) into the database.

# Background context

We have successfully seeded assessments for Chapter 1 and Chapter 2 of Grade 7 Math. The next step in the implementation roadmap is to expand the curriculum coverage to Chapter 3: "Hình học trực quan". This chapter includes "Bài 8", "Luyện tập chung", and "Ôn tập chương III". 
We must maintain the established pattern: 10 prerequisite questions (Grade 6 geometry) and 10 lesson-specific questions per exam, properly formatted with LaTeX, to ensure a high-quality Assessment Studio experience.

# Files involved

- `scripts/seed-chapter3-assessments.ts` (New)

# DB changes

- **curriculum_nodes**: Insert or ensure `"Chương 3: Hình học trực quan"` exists.
- **assessment_collections**: Insert or ensure collection `"Toán 7 - Tập 1"` for Unit 3 exists.
- **question_bank**: Insert 240 new questions (12 exams * 20 questions).
- **exams**: Insert 12 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 12 exercise sets corresponding to the exams.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL database connections via `@supabase/supabase-js`.

# Dependencies

- Depends on the schema changes from Chapter 1 and Chapter 2 (e.g., `generate_assessment_title` trigger fix for subject "Toán").

# Implementation checklist

- [ ] Create `scripts/seed-chapter3-assessments.ts`.
- [ ] Implement logic to find/insert curriculum unit `"Chương 3: Hình học trực quan"`.
- [ ] Define 4 practice exams for **Bài 8: Hình lăng trụ đứng tam giác. Hình lăng trụ đứng tứ giác** (20 questions each).
- [ ] Define 4 practice exams for **Luyện tập chung** (20 questions each).
- [ ] Define 4 practice exams for **Ôn tập chương III** (20 questions each).
- [ ] Ensure LaTeX formatting is strictly followed for all geometry formulas (e.g., `$S_{xq} = C \cdot h$`).
- [ ] Execute `node --import tsx scripts/seed-chapter3-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 12 exams and 240 questions without errors.
- [ ] Navigate to `/luyen-tap/toan?grade=7` on local dev server and confirm "Chương 3" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 3 and verify that 4 assessment options are available per section.

# Future extension notes

- Image placeholders might be required for geometry questions. If images are not currently supported in the seeder, ensure text-based descriptions are adequate or add `imageUrl` support in the `question_bank` insertion logic.

# Known risks

- Typographical errors in LaTeX syntax could break the frontend `MultipleChoiceRenderer`.
- Ensure exact spelling of lesson names so they match the curriculum map perfectly, avoiding duplicate node generation.
