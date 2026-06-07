# Title
Implement Exercise Sets for KHTN 7 Lessons

# Goal
To make KHTN 7 lessons visible and playable on the learning dashboard by creating corresponding `exercise_sets` entries, mimicking the structure used in `seed-math7-curriculum.ts`.

# Background context
The curriculum nodes and concepts for KHTN 7 (Chapters 1 & 2) have been successfully seeded. However, the user cannot see playable lessons on the UI. In the Math 7 implementation, every lesson node also receives an `exercise_sets` entry (e.g., `type: 'practice'`, `metadata: { node_id: lessonNode.id }`). KHTN 7 is currently missing this link, making the lessons appear empty or non-interactive on the frontend.

# Files involved
- `scripts/seed-khtn7-exercise-sets.ts` (New script to be created)
- `scripts/seed-khtn7-curriculum.ts` (Reference only)
- `scripts/seed-math7-curriculum.ts` (Reference for the `exercise_sets` logic)

# DB changes
- Upsert entries into the `exercise_sets` table for all existing KHTN 7 `lesson` and `exam` nodes.

# APIs involved
None. Pure DB logic via Supabase client.

# Dependencies
`seed-khtn7-curriculum.ts` and chapter content seeders must have been run.

# Implementation checklist
- [ ] Create a new script `scripts/seed-khtn7-exercise-sets.ts`.
- [ ] Fetch all `curriculum_nodes` that belong to the `khtn-7-ket-noi` source AND are under Chapter 1 and Chapter 2 (e.g. filter by path matching `khtn_7.chuong_1.%` or `khtn_7.chuong_2.%`).
- [ ] Loop through these nodes of type `lesson` and `exam`.
- [ ] For each node, upsert an entry into `exercise_sets`:
      - `title`: `Luyện tập: ${node.title}` (for lessons) or `Kiểm tra: ${node.title}` (for exams)
      - `type`: `practice` (for lessons) or `exam` (for exams)
      - `metadata`: `{ node_id: node.id }`
- [ ] Run the script and verify that the lessons for Chapter 1 and Chapter 2 now show up correctly with practice buttons on the learning page.

# Future extension notes
This bridges the gap between the static curriculum nodes and the Assessment Engine, allowing the UI to fetch question batches via the newly created `exercise_sets`.

# Known risks
Ensure `onConflict` logic is correct so running the script multiple times doesn't duplicate exercise sets. Use `{ onConflict: 'title,type' }` or a custom unique key.
