# Technical Specification: AI-Native IELTS Listening Loop (V2)

This document provides a comprehensive overview of the AI-driven IELTS Listening feature for developers and AI agents.

## 1. Core Philosophy
The system transforms passive video listening into an active, 5-phase interactive journey guided by an AI tutor named **Coach Aria**. It focuses on emotional pacing, conversational immersion, and "Learning Moments" rather than traditional testing.

## 2. The 5-Phase Architecture
The learning flow is strictly sequential to ensure a high-quality pedagogical experience.

| Phase | Internal ID | Component | Description |
|---|---|---|---|
| **0. Warmup** | `warmup` | `AITeacherChat` | Aria asks a personal question. Uses "cliffhangers" to lead into audio. |
| **1. Listen** | `listen` | `ChunkCheckpoints` | Video player + interactive tasks. Features a "Learning Moment" retry loop. |
| **2. Discover** | `explore` | `TranscriptLineExpander` | Interactive transcript. Focuses on `keyPhrase` analysis and "Nailed it! 🎯" dopamine hits. |
| **3. Speak** | `speak` | `SpeakingFollowUpBox` | **Multi-turn Chat** with Aria. Integrated Voice-to-Text (Web Speech API). |
| **4. Check** | `check` | `AriaDebrief` | Immediate-feedback quiz followed by a personalized AI session summary. |

## 3. Key Enhancements & Interaction Design

### Conversational Intelligence (Coach Aria)
- **Multi-turn Logic**: Phase 3 uses a functional state update to maintain a real dialogue. Aria is instructed to "throw the ball back" by always ending with a follow-up question.
- **Memory Continuity Illusion**: Mistakes from Phase 1 (`struggledWords`) are passed to the Phase 3 chat backend, allowing Aria to organically reference them.
- **Vibrant Personality**: Tone is witty, supportive, and informal (peer-tutor). Uses short sentences and emotional microcopy (e.g., "Almost! 👀" instead of "Incorrect").

### UI/UX & Micro-interactions
- **Journey Language**: Technical labels are replaced with momentum-driven copy (e.g., "Let's break down the details 🔍", "See my results! 🏆").
- **Back-Navigation**: Clickable progress dots allow students to return to completed phases without losing state.
- **Dopamine Hits**: "Nailed it! 🎯" visual feedback for micro-pronunciation tasks.

## 4. Backend AI API (`/api/ai/teacher/route.ts`)
The backend uses **Gemini 3.5 Flash** (primary) and **Gemini 3.1 Pro** (fallback).

1.  **`warmup`**: Narrative-style instructions to prevent prompt leakage. Handles short answers (e.g., "ok") gracefully.
2.  **`speaking_feedback`**: Multi-turn coaching prompt. Reacts to content first, fixes one error, and asks a follow-up.
3.  **`debrief`**: Implements "Memory Illusion" by picking a word to "save" for next time.

## 5. Data Architecture (Synced for Units 1-10)

### Interactive Transcript (`lib/ieltsTranscripts.ts`)
Enriched with metadata for Phase 2 interactivity.
```typescript
interface TranscriptLine {
  english: string;
  vietnamese: string;
  keyPhrase?: string;   // Targeted focus for pronunciation
  phraseNote?: string;  // Meaning/Usage explanation
}
```

### Checkpoint Library (`lib/checkpoints/index.ts`)
Full synchronization across the 36-session roadmap. Each unit contains 3 distinct interactive tasks (Text, True/False, or Cloze).

## 6. Maintenance & Future Development
- **Voice Support**: Uses `webkitSpeechRecognition`. Ensure HTTPS and Chrome/Edge for full compatibility.
- **Scaling Content**: To add a new unit, simply add the video data to `ieltsTranscripts.ts` and matching logic to `checkpoints/index.ts`.
- **Model Fallbacks**: The API route implements a robust fallback array (3.5 Flash -> 3.1 Pro -> 2.5 Pro) to handle quota and safety blocks.

---
*Last Updated: May 25, 2026 (Refined UI, Conversational Flow, and Build Stability Fixes)*
