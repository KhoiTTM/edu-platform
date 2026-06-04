# Title

Phase 11: Seed Grade 3 Math Chapter 5 Assessments

# Goal

Implement and seed handcrafted, 20-question exam papers (4 practice sets per section) for all topics in Grade 3 Math Chapter 5 (Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ) into the Universal Assessment schema.

# Background context

This task targets Chapter 5 (Chủ đề 5) of Grade 3 Math. This chapter introduces measurement units: millimeters, grams, milliliters, and Celsius degrees. It consists of 6 lessons. The assessments should test students' ability to convert units, perform basic arithmetic with units, and read scales (thermometers, measuring cups). 

# Files involved

- `scripts/seed-math3-chapter5-assessments.ts` (New)
- JSON files in `docs/Assement Studio/Toan_3_Tap1_JSON/Chuong_5/` (To be created/provided)

# DB changes

- **curriculum_nodes**: Insert Unit `"Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ"`.
- **assessment_collections**: Insert collection `"Toán 3 - Tập 1"` mapped to this unit.
- **question_bank**: Insert 480 new questions (6 sections * 4 exams * 20 questions).
- **exams**: Insert 24 new exams.
- **exam_questions**: Link questions to the new exams.
- **exercise_sets**: Insert 24 corresponding exercise sets.
- **exercise_questions**: Link questions to the exercise sets.

# APIs involved

- Supabase PostgreSQL connections via `@supabase/supabase-js`.

# Dependencies

- Depends on the Universal schema and previous Math 3 tasks.

# Implementation checklist

- [ ] Create `scripts/seed-math3-chapter5-assessments.ts`.
- [ ] Implement insertion of curriculum unit `"Chủ đề 5: Một số đơn vị đo độ dài..."` into `curriculum_nodes`.
- [ ] Define 4 practice exams for **Bài 30. Mi-li-mét**.
- [ ] Define 4 practice exams for **Bài 31. Gam**.
- [ ] Define 4 practice exams for **Bài 32. Mi-li-lít**.
- [ ] Define 4 practice exams for **Bài 33. Nhiệt độ. Đơn vị đo nhiệt độ**.
- [ ] Define 4 practice exams for **Bài 34. Thực hành và trải nghiệm với các đơn vị...**.
- [ ] Define 4 practice exams for **Bài 35. Luyện tập chung**.
- [ ] Implement deterministic logic to auto-generate measurement conversions (e.g., changing values like 3kg to 3000g).
- [ ] Execute `node --import tsx scripts/seed-math3-chapter5-assessments.ts`.

# Validation checklist

- [ ] Verify script execution logs show successful insertion of 24 exams and 480 questions.
- [ ] Navigate to `/luyen-tap/toan?grade=3` and confirm "Chủ đề 5" appears.
- [ ] Open the "Đánh giá tính điểm" tab for Chapter 5 and verify 4 assessment options per section are available.

# Known risks

- Reading scales (like a thermometer or measuring jug) heavily relies on images. If images aren't available, the script must synthesize highly descriptive text, e.g., "Mực nước trong bình chỉ vạch 500ml. Cần thêm bao nhiêu để đầy bình 1 lít?" instead of showing a picture.
