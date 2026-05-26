# Speaking Feature — Quick Reference Card
## For Development & Prompt Engineering

---

## Route Map

```
/speaking/[unitId]/[sessionId]
e.g. /speaking/unit-5/session-1
```

---

## API Modes (add to /api/ai/teacher)

| Mode | MaxTokens | Temp | Purpose |
|---|---|---|---|
| `speaking_session_open` | 350 | 0.85 | Session opening question |
| `speaking_session` | 350 | 0.85 | Conversation turns |
| `speaking_session_debrief` | 400 | 0.75 | End-of-session wrap-up |
| `speaking_summary` | 150 | 0.50 | Summary for Aria memory |

---

## Session Progression at a Glance

| Session | Tone | Scaffolding | Turn Goal | Focus |
|---|---|---|---|---|
| 1 | Warmest, safest | Full (starters + word bank) | 4–6 | Basic facts about topic |
| 2 | Supportive, challenging | Medium (connectors only) | 5–7 | Opinions + reasons |
| 3 | Confident, energetic | Minimal (on-request only) | 6–8 | Stories + extended speech |
| 4 | Peer-level | None | 8–10 | Pure conversation |

---

## Supabase Tables (new)

```sql
speaking_sessions        -- one row per user/unit/session combo
unit_speaking_progress   -- denormalized progress tracker
learner_speaking_notes   -- saved vocab + Aria tips
```

---

## New Components / Modules

```
components/speaking/
├── SpeakingJourneyClient.tsx    ← main orchestrator
├── AriaConversationBubble.tsx   ← Aria message display
├── SpeakingInputArea.tsx        ← mic + text + send
├── SessionProgressBar.tsx       ← 1-4 dot progress
├── ScaffoldingPanel.tsx         ← word bank + starters
├── RetryPanel.tsx               ← hints + retry options
├── SpeakingSessionComplete.tsx  ← end celebration
├── BestMomentCard.tsx           ← highlight reel
└── VoiceInputModal.tsx          ← full-screen voice

lib/speaking/
└── curriculumContextBuilder.ts  ← Phase 2: Curriculum Grounding Context
```

---

## Phase 2: Curriculum Grounding Layer
The **Language Recycling Engine** ensures Aria naturally grounds the conversation in the unit's context.

### Context Building Block
Injected into the system prompt for every session:
1. **Topic** (Derived from unit data)
2. **Core Vocabulary** (Recycled naturally in Aria's responses)
3. **Target Expressions** (Subtly reinforced)
4. **Communicative Goals** (e.g. "Apply grammar rule naturally")
5. **Transcript Highlights** (Echoed or paraphrased for continuity)

*Rule: Aria must gently expand vocabulary and recycle lesson expressions WITHOUT dumping lists or sounding robotic.*

---

## New Hooks

```
hooks/useSpeakingSession.ts   ← session state + API calls
hooks/useVoiceInput.ts        ← Web Speech API wrapper
```

---

## Aria's One-Turn Formula

```
[REACT to content] + [RECAST error if needed] + [ONE question]
```

---

## Correction Rules (critical)

1. **Max 1 correction per turn**
2. **Recast first**, explicit correction only if error repeats 3+ times
3. **Never use grammar terminology** in Aria's response
4. **Never say "wrong"** — rephrase and move on
5. **Content reaction ALWAYS before correction**

---

## Retry Triggers

```typescript
type RetryTrigger = 
  | "learner_requested"
  | "very_short_response"  // < 5 words
  | "topic_drift"
  | "silence"              // > 2 min no response
  | "explicit_confusion"
```

---

## Do NOT Build (MVP)

- ❌ Pronunciation scoring
- ❌ Audio recording/playback
- ❌ Real-time AI voice
- ❌ Band score estimation
- ❌ Analytics dashboard
- ❌ Social features

---

## Layer Build Order

```
Layer 0: Route + Aria says hello          (Day 1–2)
Layer 1: Core conversation loop           (Day 3–5)
Layer 2: Scaffolding + retry              (Day 6–7)
Layer 3: Session complete + memory        (Day 8–10)
Layer 4: Sessions 2–4 content            (Day 11–14)
Layer 5: Polish + emotion                 (Day 15–16)
Layer 6: All 10 units                     (Week 3+)
```

---

*See speaking_feature_design.md for full details.*
