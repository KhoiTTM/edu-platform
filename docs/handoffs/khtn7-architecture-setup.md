# Handoff: KHTN 7 Curriculum & Chapter 1 Architecture

## What Changed
- Set up the canonical curriculum mapping for `Khoa học tự nhiên 7` (KHTN 7) under `universal_subjects` and `curriculum_nodes`.
- Designed Phase 1 and Phase 2 architecture docs in `docs/phases` and `docs/tasks`.
- Created `seed-khtn7-curriculum.ts` to insert Chapter 1 and Chapter 2 roadmap.
- Created `seed-khtn7-chapter1-content.ts` to extract theory concepts for Bài 1, 2, 3 into the `concepts` table.
- Initialized deterministic blueprint definitions in `scripts/generators/khtn7/chapter1-blueprints.ts`.

## Why it Changed
To strictly enforce the rule: `Curriculum → Concepts → Blueprints → Generation`. This prevents AI hallucination when generating KHTN 7 questions by binding it to rigorous DB concepts and static blueprints.

## Architectural Impact
- Expands the platform from Math/English to Natural Science (Multi-subject support).
- Validates that the existing `curriculum_nodes` and `concepts` schema can gracefully handle Science subjects with heavy theory components.

## Recommended Next Tasks
1. Run the seed scripts (`npx ts-node scripts/seed-khtn7-curriculum.ts` and `npx ts-node scripts/seed-khtn7-chapter1-content.ts`).
2. Build the Assessment Studio UI to map the newly created blueprints to actual quiz generation.
3. Proceed to Phase 4 (Validation Engine) to ensure generated distractors for Science are chemically/physically accurate.
