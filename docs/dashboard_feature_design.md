# Vision
The "Learning Identity Dashboard" moves beyond administrative progress tracking to provide a deeply emotional, momentum-driven experience. It answers: **"What is this learner becoming?"** It creates an AI-aware learning identity that unites all subjects, tracking habits, vocabulary, and growing skills over time.

# Product Philosophy
- **Identity over Metrics:** Focus on streaks, skills, and emotional growth rather than raw completion percentages.
- **Additive Only:** The dashboard strictly *reads* learning behavior; existing learning flows (Speaking, Listening, Quiz) are completely untouched.
- **Laptop-Friendly:** Designed for a solo developer running on localhost/Vercel. No Kafka, Redis, or microservices.

# Architecture
We will use a lightweight, serverless-friendly architecture built on top of Next.js 15 Server Components and Supabase.
- **Data:** A **3-Layer Data Model** (Events -> Sessions -> Snapshots) to ensure fast load times without expensive on-the-fly aggregations.
- **Tracking:** Existing components will fire strongly-typed events to a new API endpoint or Supabase directly.
- **Rendering:** Dashboard pages will read directly from Layer 2 (Sessions) and Layer 3 (Snapshots) to guarantee sub-100ms render times.

# Folder Structure
```text
app/
  api/
    events/
      route.ts       # Validates and ingests Layer 1 events
    ai/
      insights/
        route.ts     # Generates AI insights on demand
components/
  dashboard/
    HeroMomentumCard.tsx
    LearningHeatmap.tsx
    UnifiedSubjectProgress.tsx
    AIInsightPanel.tsx
    MemoryVault.tsx
    SpeakingEvolutionTimeline.tsx
    DangerZone.tsx
hooks/
  useTrackEvent.ts   # Strongly typed tracking hook
types/
  events.ts          # Zod schemas & interfaces for event contracts
```

# DB Schema
We introduce a lightweight **3-Layer Data Model** using Supabase PostgreSQL.

### Layer 1: Raw Events (`learning_events`)
Append-only, high-volume.
- `id` (uuid, pk)
- `user_id` (uuid, fk)
- `session_id` (uuid, fk)
- `event_type` (varchar)
- `subject_slug` (varchar)
- `metadata` (jsonb)
- `created_at` (timestamptz)

### Layer 2: Learning Sessions (`learning_sessions`)
Groups events. Created when a user starts an activity, closed when they finish.
- `id` (uuid, pk)
- `user_id` (uuid, fk)
- `subject_slug` (varchar)
- `started_at` (timestamptz)
- `ended_at` (timestamptz)
- `duration_seconds` (int)
- `summary_metrics` (jsonb) - e.g. `{ total_turns: 5, new_words: 3 }`

### Layer 3: Dashboard Snapshots (`user_dashboard_stats`)
Denormalized for instant UI rendering. Updated asynchronously.
- `user_id` (uuid, pk)
- `current_streak` (int)
- `total_learning_minutes` (int)
- `last_ai_insight` (text)
- `last_ai_insight_at` (timestamptz)
- `subject_progress` (jsonb) - e.g. `{ "toan": { "minutes": 120 }, "mindset-ielts": { "words_learned": 45 } }`

# Event Contracts
No random JSON chaos. We strictly type the `metadata` based on `event_type`.

```typescript
// types/events.ts
export type SpeakingTurnCompletedEvent = {
  type: "speaking_turn_completed";
  subject: "mindset-ielts";
  metadata: { durationSec: number; wordCount: number; targetWordsUsed: string[] };
};

export type QuizCompletedEvent = {
  type: "quiz_completed";
  subject: string;
  metadata: { score: number; total: number; accuracy: number };
};

export type AnyLearningEvent = SpeakingTurnCompletedEvent | QuizCompletedEvent; // Add more as needed
```

# Session Layer Design
- When a user enters `/speaking/[unitId]/[sessionId]`, the client creates a `learning_session` record.
- As the user interacts, `learning_events` are fired with that `session_id`.
- When the user clicks "Finish Session", the session is updated with `ended_at` and `duration_seconds`.

# Dashboard Snapshot Strategy
Instead of grouping/summing `learning_events` on every page load:
- When a session ends, a lightweight Supabase RPC (Postgres Function) or Next.js API route recalculates the `user_dashboard_stats`.
- The dashboard UI simply fetches `SELECT * FROM user_dashboard_stats WHERE user_id = ?`, ensuring O(1) read performance.

# API Design
- `POST /api/events`: Validates incoming events using Zod, inserts into Layer 1, and optionally updates Layer 2/3.
- `POST /api/ai/insights`: Triggered manually or post-session to generate new identity text. Saves result to Layer 3.

# Components
- **HeroMomentumCard:** Reads `current_streak` and `total_learning_minutes` from Layer 3.
- **LearningHeatmap:** Fetches dates from Layer 2 (`learning_sessions.started_at`) to build a GitHub-style grid.
- **UnifiedSubjectProgress:** Reads `subject_progress` JSON from Layer 3.
- **MemoryVault:** Fetches specific `learning_events` where `metadata->>'targetWordsUsed'` exists.
- **SpeakingEvolutionTimeline:** Line chart reading `wordCount` averages from Layer 2/Layer 1.

# Hooks
- `useTrackEvent`: Client-side fire-and-forget hook.
  ```typescript
  const track = useTrackEvent();
  track({ type: "speaking_turn_completed", metadata: { durationSec: 15, wordCount: 20 } });
  ```

# Data Flow
1. User speaks in UI -> `useTrackEvent` fires `speaking_turn_completed`.
2. API validates event -> Inserts into `learning_events`.
3. User finishes session -> API updates `learning_sessions` and incrementally bumps `user_dashboard_stats` (e.g. `total_learning_minutes += 15`).
4. User visits Dashboard -> Page loads instantly by reading `user_dashboard_stats`.

# AI Insight Strategy
**Hybrid Approach:**
1. **Rule-Based (Default):** Show static encouragement based on Layer 3 stats (e.g., "You're on a 3-day streak!").
2. **Gemini Insights (Occasional):** When a user completes a major milestone (e.g., finishes a session) OR clicks a "Generate Insight" button, the system feeds recent Layer 2 summaries to Gemini. The output is saved to `user_dashboard_stats.last_ai_insight` and displayed. **Zero AI calls on regular page loads.**

# Dashboard UI Hierarchy
1. **Top Row:** `HeroMomentumCard` (Streak, Title) + `AIInsightPanel` (Latest cached Gemini insight).
2. **Second Row:** `LearningHeatmap` (Consistency visualizer).
3. **Third Row:** `SpeakingEvolutionTimeline` (Line chart) + `DangerZone` (Alerts for neglected subjects).
4. **Bottom Grid:** `MemoryVault` (Masonry of words/phrases) + `DailyMissions` (Rule-based goals).

# Build Phases
- **Phase 1 (Data Foundation):** Create SQL migrations for the 3 tables. Define TypeScript Event Contracts. Build `useTrackEvent` hook.
- **Phase 2 (Instrumentation):** Inject tracking into existing Speaking and Quiz modules. Ensure Layer 1 and 2 populate correctly.
- **Phase 3 (Snapshot Sync):** Build the logic to update Layer 3 (`user_dashboard_stats`) when sessions end.
- **Phase 4 (UI Construction):** Build Heatmap, Momentum Card, and Memory Vault reading from Layer 2 & 3.
- **Phase 5 (AI Integration):** Build the occasional Gemini insight generator.

# MVP Scope
- Implement the 3-Layer DB.
- Instrument Speaking module.
- Build Hero Card, Heatmap, and AI Insight Panel (triggered manually).
- Avoid complex timelines and Danger Zone until Phase 4.

# Avoid For Now
- Realtime Supabase subscriptions (use simple page refreshes).
- Kafka/Redis for event streaming.
- Complex cron jobs for aggregations (rely on session-end triggers).
- Modifying any logic inside `useSpeakingSession.ts` other than injecting the `trackEvent` call.

# Technical Debt Risks
- **Snapshot Drift:** If Layer 1 events fail to update Layer 3, the dashboard stats might drift. We can write a simple `/api/admin/recalculate` script later to rebuild Layer 3 from Layer 1 if needed.

# Suggested Next Steps
1. Execute Phase 1: Creating the Supabase migration for the `learning_events` table and the `useTrackEvent` hook.
2. Instrument the Speaking module to start generating events.
