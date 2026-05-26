# Phase 3 — Session 2-4 Logic & Content Expansion

- [ ] **Dynamic Scaffolding Progression (`components/speaking/ScaffoldingPanel.tsx`)**
  - [ ] Add `unitId` to props.
  - [ ] Call `buildCurriculumContext(unitId)` to fetch vocabulary and expressions.
  - [ ] For Session 1: Show Core Vocabulary + Basic Sentence Starters.
  - [ ] For Session 2: Show Target Expressions + Opinion Connectors ("Personally, I think...", "The main reason is...").
  - [ ] For Session 3 & 4: Return `null` to hide scaffolding.

- [ ] **Turn Goal Progression (`components/speaking/SpeakingJourneyClient.tsx`)**
  - [ ] Pass `unitId` to `ScaffoldingPanel`.
  - [ ] Update `totalTurnsGoal` based on session:
    - Session 1: 5 turns
    - Session 2: 6 turns
    - Session 3: 7 turns
    - Session 4: 9 turns

- [ ] **AI Prompt Refinement (`app/api/ai/teacher/route.ts`)**
  - [ ] Session 2: Prompt Aria to explicitly push for "WHY" and opinions.
  - [ ] Session 3: Prompt Aria to ask for personal experiences/stories ("Tell me about a time...").
  - [ ] Session 4: Remove teacher persona completely; prompt Aria to act as a peer for pure conversation.
  - [ ] Debrief Mode: Tease the specific goal of the next session (e.g., "Next time, opinions!").

- [ ] **Integration Testing**
  - [ ] Verify Scaffolding Panel transitions (S1 -> S2 -> S3).
  - [ ] Verify Turn count increases per session.
  - [ ] Verify Aria's conversational tone shifts.
