# Title

Phase 9: Seed Grade 3 Math Chapter 3 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 3 Math Chapter 3 (Chủ đề 3: Làm quen với hình phẳng, hình khối) into the Universal Assessment schema.

# Background context

We are continuing the Assessment Studio build-out for Grade 3 Math. This task focuses specifically on Chapter 3 (Chủ đề 3), which covers basic geometry (points, circles, angles, polygons, and 3D shapes). There are 7 lessons in this chapter. We must ensure that the questions are suitable for 3rd graders, heavily utilizing geometry concepts that might require either descriptive text or image support.

# Files involved

- `scripts/seed-math3-chapter3-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/Chuong_3/` (To be created/provided)

# DB changes

- **curriculum_nodes**: Insert Unit `"Chủ đề 3: Làm quen với hình phẳng, hình khối"`.
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

- [ ] Create `scripts/seed-math3-chapter3-assessments.ts`.
- [ ] Implement insertion of curriculum unit `"Chủ đề 3: Làm quen với hình phẳng, hình khối"` into `curriculum_nodes`.
- [ ] Define 4 practice exams for **Bài 16. Điểm ở giữa, trung điểm của đoạn thẳng**.
- [ ] Define 4 practice exams for **Bài 17. Hình tròn. Tâm, bán kính, đường kính của hình tròn**.
- [ ] Define 4 practice exams for **Bài 18. Góc, góc vuông, góc không vuông**.
- [ ] Define 4 practice exams for **Bài 19. Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông**.
- [ ] Define 4 practice exams for **Bài 20. Thực hành vẽ góc vuông, vẽ đường tròn...**.
- [ ] Define 4 practice exams for **Bài 21. Khối lập phương, khối hộp chữ nhật**.
- [ ] Define 4 practice exams for **Bài 22. Luyện tập chung**.
- [ ] Execute `node --import tsx scripts/seed-math3-chapter3-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 28 exams and 560 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm "Chủ đề 3" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 3 and verify 4 assessment options per section are available.

# Known risks

- Geometry questions for Grade 3 rely heavily on visual identification (e.g., "Hình nào sau đây là khối lập phương?"). Ensure the seeding script accounts for `imageUrl` logic in the question bank, or crafts highly descriptive text questions.
