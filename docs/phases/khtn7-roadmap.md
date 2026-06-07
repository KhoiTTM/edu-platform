# Phase 1: KHTN 7 Curriculum Extraction & Canonical Roadmap

## Phase Goals
- Define the `Khoa học tự nhiên 7` (KHTN 7) canonical curriculum in the database.
- Map 10 chapters and their corresponding lessons.
- Ensure the curriculum adheres to the strict hierarchical structure (`Course` -> `Unit` -> `Lesson` -> `Exam`).

## Architecture Overview
Follows the platform's core principle: `Curriculum → Concepts → Blueprints`.
We begin by laying down the `universal_subjects` entry for KHTN, followed by the `content_sources` for the "Kết nối tri thức" textbook. The hierarchy is inserted into `curriculum_nodes` and `learning_path_nodes` for Assessment Studio rendering.

## Dependencies
- Database schema: `universal_subjects`, `content_sources`, `curriculum_nodes`, `learning_path_nodes`.
- TOC JSON Source: `docs/Assement Studio/SGK_KHTN_7_JSON/table_of_contents.json`.

## Implementation Order
1. Execute `scripts/seed-khtn7-curriculum.ts`.
2. Verify nodes appear in the database.

## Risks
- Subject slug collision if KHTN is already seeded differently.
- Path constraints in `curriculum_nodes` might need adjusting for deep nesting.

## Success Criteria
- 10 Chapters and 42 Lessons are successfully seeded into the `curriculum_nodes` table.
- The `khtn_7` subject is available for gameplay rendering.
