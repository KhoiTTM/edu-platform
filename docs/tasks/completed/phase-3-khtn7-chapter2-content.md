# Title
Implement KHTN 7 Chapter 2 Content & Blueprints

# Goal
Extract theoretical concepts for Chapter 2 (Phân tử. Liên kết hoá học) and create corresponding seed scripts and deterministic blueprints.

# Background context
Phase 1 and 2 successfully set up the curriculum and Chapter 1. Chapter 2 introduces deeper chemistry concepts that require robust validation.

# Files involved
- `scripts/seed-khtn7-chapter2-content.ts`
- `scripts/generators/khtn7/chapter2-blueprints.ts`

# DB changes
- Upsert concepts into `concepts` table.
- Upsert mapping into `lesson_concepts`.

# APIs involved
None. Pure DB and generator logic.

# Dependencies
`seed-khtn7-curriculum.ts` must have been executed.

# Implementation checklist
- [ ] Parse JSON for Chapter 2 (pages 33-47).
- [ ] Create `seed-khtn7-chapter2-content.ts`.
- [ ] Create `chapter2-blueprints.ts`.

# Validation checklist
- [ ] Verify chemistry facts in the blueprints are 100% deterministic and do not hallucinate valences.

# Future extension notes
Will plug into the Assessment Studio UI in a later phase.

# Known risks
Chemistry valences (Hoá trị) can be tricky to model deterministically. Ensure hardcoded correct values.
