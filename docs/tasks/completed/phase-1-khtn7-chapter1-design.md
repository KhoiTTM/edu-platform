# Title
Design KHTN 7 Chapter 1 Theory Concepts

# Goal
Extract theoretical concepts from the curriculum JSON (Bài 1, Bài 2, Bài 3) and design them as distinct `concepts` in the database to drive the blueprint engine.

# Background context
Following the architecture lead's principle (`Curriculum → Concepts → Blueprints`), we must define explicit concepts for Chapter 1 before generating any questions.

# Files involved
- `scripts/seed-khtn7-chapter1-content.ts` (New)
- JSON files in `docs/Assement Studio/SGK_KHTN_7_JSON/Chuong_1/`

# DB changes
- Upsert entries into `concepts` table.
- Upsert mappings into `lesson_concepts` linking them to the `curriculum_nodes` created in the roadmap phase.

# Dependencies
- The `seed-khtn7-curriculum.ts` script MUST be run first to generate the `curriculum_nodes`.

# Implementation checklist
- [x] Read JSON pages to extract summarized theory.
- [ ] Create `scripts/seed-khtn7-chapter1-content.ts`.
- [ ] Map "Mô hình nguyên tử" and "Kí hiệu hoá học" as robust conceptual descriptions.

# Future extension notes
These concepts will directly inform the Blueprint engine in Phase 3. The description fields must be rich enough to allow LLMs to safely construct variations without hallucination.
