# Title

Phase 8: Tiếng Việt 3 (Expand Assessment Question Types)

# Goal

Enhance the Assessment Studio UI to support Trạng Nguyên-style question types (Fill-in-the-blank, Matching, Categorization) and prepare a dynamic seeding script for Grade 3 Vietnamese (Tiếng Việt 3) that will consume upcoming JSON data.

# Background context

We are expanding our subject catalog to include "Tiếng Việt 3". Instead of building a completely new gamified app, we are integrating Trạng Nguyên-style interactive questions directly into our existing Assessment Studio. This requires frontend updates to support new question formats (beyond standard Multiple Choice) and a backend seeding script ready to process the curriculum JSON once provided by the user.

# Files involved

- `components/universal/MultipleChoiceRenderer.tsx` (or new renderers like `MatchingRenderer.tsx`)
- `scripts/seed-tiengviet3-assessments.ts` (New)

# DB changes

- **question_bank**: No schema changes needed, but we will utilize the `metadata` JSONB column to store the rich configurations for new question types (e.g., matching pairs, blank positions).

# APIs involved

- React/Next.js frontend rendering.
- Supabase PostgreSQL for seeding.

# Dependencies

- Depends on the User providing the JSON dataset for Tiếng Việt 3.

# Implementation checklist

- [ ] **Frontend**: Analyze `MultipleChoiceRenderer.tsx` and design new React components to render `fill_in_blank`, `matching`, and `categorization` types seamlessly within the assessment flow.
- [ ] **Frontend**: Update the evaluation logic to properly score these new question types.
- [ ] **Backend Script**: Create `scripts/seed-tiengviet3-assessments.ts`.
- [ ] **Backend Script**: Build the logic to dynamically parse `docs/Assement Studio/Tieng_Viet_3_JSON/` (assuming this will be the path).
- [ ] **Backend Script**: Generate exams by mapping the JSON content into the new interactive question structures stored in `question_bank.metadata`.

# Validation checklist

- [ ] Create mock data in the DB to test the new UI components.
- [ ] Verify that a user can successfully play and submit a "Matching" or "Fill in the blank" question.
- [ ] Once JSON is provided, run the seeding script and verify "Tiếng Việt 3" appears in the learning hub.

# Known risks

- UI complexity for mobile screens (e.g., drag-and-drop matching on phones). Consider fallback tap-to-select mechanisms.
