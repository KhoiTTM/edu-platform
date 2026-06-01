# Technical Architecture & System Documentation

This document provides a comprehensive developer and AI-oriented overview of the `edu-platform` codebase. It details the system architecture, database schema, routing strategy, core components, and API design.

---

## 1. System Overview

`edu-platform` is an AI-powered, interactive learning platform designed for IELTS preparation (specifically aligning with the *Mindset for IELTS Foundation* curriculum) and school English instruction (e.g., *Tiếng Anh 3*). 

The platform implements a **Spaced Retrieval** and **Cumulative Learning** model:
- **Warmup step**: Retrieves and tests vocabulary learned in all preceding units.
- **Direct Skill Practice**: Routes to dedicated interactive rooms for Reading, Listening, Writing, and Speaking.
- **Theory & Grammar**: Features structured visual tabbed layouts to teach vocabulary and core grammatical structures.
- **Textbook Study Integration**: Instructs students to solve paper textbook exercises, providing a copyable prompt for external AIs (ChatGPT/Claude) to evaluate and grade their work.
- **Cumulative Comprehension Quizzes**: Generates unit-end multiple-choice exams that aggregate questions from the current unit (15 questions) and previous units (10 questions) for retention check.

---

## 2. Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Client Components)
- **Runtime & Language**: React 19, TypeScript
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL database, Row Level Security, Supabase Auth)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI Integrations**: Google Gemini API (`@google/generative-ai` SDK)

---

## 3. Database Schema & Data Models

The PostgreSQL schema is hosted in Supabase. The core tables involved in curriculum layout and question generation are:

### `content_sources`
Represents courses/sources.
- `id` (uuid, PK)
- `name` (text): e.g., "Mindset for IELTS Foundation"
- `slug` (text): e.g., `mindset-foundation`, `tieng-anh-3`
- `subject_id` (uuid, FK -> `universal_subjects`)

### `curriculum_nodes`
Main hierarchical table representing chapters, units, lessons, and exams.
- `id` (uuid, PK)
- `source_id` (uuid, FK -> `content_sources`)
- `parent_id` (uuid, self-FK)
- `title` (text)
- `slug` (text)
- `type` (text): `'course' | 'unit' | 'lesson' | 'exam'`
- `depth` (integer)
- `sort_key` (integer)
- `path` (text): Dot-separated PostgreSQL tree path representation (e.g. `1.2.3` used to calculate ancestor/descendant relationships).
- `metadata` (jsonb): Includes config fields:
  - `skill_focus` (text): `'reading' | 'listening' | 'writing' | 'speaking' | 'grammar'`
  - `youtube_id` (text): video lecture link
  - `page_hint` (text): target textbook pages (e.g. `Page 8 - 10`)
  - `grammar_tutorial` (text): raw markdown content containing the structured grammar tutorial lesson text.

### `lesson_concepts` & `curriculum_concepts`
- Links a curriculum unit or lesson node to pedagogical concepts. Used by the assessment generator to select relevant questions from the database.

### `question_bank`
Stores test bank questions.
- `id` (uuid, PK)
- `concept_id` (uuid, FK)
- `type` (text): e.g., `'multiple_choice'`
- `prompt` (text): The question text
- `options` (jsonb): Array of option strings
- `correct_answer` (text)
- `explanation` (text)

---

## 4. Routing Strategy & Navigation

The platform utilizes Next.js App Router structure.

```mermaid
graph TD
    A[Dashboard / hoc-tap] --> B{Choose Skill / Focus}
    B -->|Grammar Page| C[/hoc-tap/mindset-ielts/grammar]
    B -->|General Roadmap| D[/hoc-tap/mindset-ielts]
    
    C -->|Click Lesson| E[/learn/mindset-ielts/unit-x?focus=grammar]
    D -->|Click Lesson| F[/learn/mindset-ielts/unit-x]
    
    E -->|Force directly| G[Grammar UI: GrammarTutorialRenderer]
    F -->|Displays timeline| H[IELTS Coordinator Layout]
    
    H -->|Step 1: Warmup| I[Warmup Cumulative Quiz]
    H -->|Step 2: Textbook| J[ChatGPT Prompt Copy]
    H -->|Step 3: Theory| K[Sub-view Theory Study]
    H -->|Step 4: Skill Rooms| L{Direct Skill Rooms}
    
    L -->|Reading| M[/reading/node-id]
    L -->|Listening| N[/listening/node-id]
    L -->|Writing| O[/writing/node-id]
    L -->|Speaking| P[/speaking/mindset-ielts/unit-x/session-1]
```

### Route Resolving:
- **`app/(app)/learn/[subject]/[node]/page.tsx`**: Resolves the slug parameter to look up a record in `curriculum_nodes` with corresponding `content_sources.slug`. Fetches ancestor breadcrumbs and child nodes, then passes properties to the client controller.
- **`components/universal/LearnNodeClient.tsx`**: Core client router. Checks if the URL matches standard focus query params:
  - `?focus=grammar`: Sets `isGrammar` to true and bypasses the timeline coordinator, directly rendering the formatted Grammar UI.
  - No query: Evaluates skill matching (via title parsing/metadata) and renders the appropriate template (e.g., standard multi-step Coordinator Timeline).

---

## 5. Core Client Architecture & Components

### `LearnNodeClient.tsx`
The coordinator shell. It handles state switching between sub-views:
- `hub`: The central timeline view (Steps 1 to 5).
- `warmup`: Dedicated cumulative vocabulary quiz.
- `book-work`: Instruction guidelines for physical textbook exercises with quick links to external LLMs and copyable custom prompts.
- `theory`: Dedicated reading container for Grammar lessons.
- `quiz`: Fullscreen 25-question unit-end integration quiz.

### `GrammarTutorialRenderer`
A custom Markdown parser and layout component that processes structured text.
- **Markdown Splitting**: Splits content by `#### [Number]. [Title]` and generates interactive horizontal tabs (e.g., *Giới thiệu, Kiến thức, Cách dùng, Ví dụ, Tổng kết*).
- **Core Knowledge Cardification**: Converts standard bullet lists of vocabulary definitions (`- **A**: B`) into fully animated hover-scale cards.
- **Formula Codeblocks**: Extracts math/sentence structure rules marked by blockquotes (`>`) and places them inside an aesthetic Dark IDE Terminal replica with a one-click copy button.
- **Correct/Incorrect Bubble Comparison**: Detects `✓` (Đúng) or `✗` (Sai) examples and converts them into green/red notification banners side-by-side for rapid visual learning.

### `DictionaryPopup.tsx`
- Hooks onto the mouse double-click action in reading passage views. Extends text selections, queries the dictionary API (`/api/ai/dictionary`), and yields custom IPA pronunciations and Vietnamese translation callouts in a floating bubble.

---

## 6. API Endpoint Layout

### 1. `/api/assessment/generate` (POST)
Dynamically aggregates vocabulary and grammar questions.
- **Body parameters**:
  ```json
  {
    "subjectSlug": "string",
    "conceptIds": ["uuid"],
    "difficulty": "medium | hard",
    "count": 15
  }
  ```
- **Behavior**: Retrieves queries matching target concepts. Under the IELTS profile, handles client-side cumulative retrieval logic using predefined sets (`lib/ieltsQuizzes.ts`).

### 2. `/api/assessment/submit` (POST)
Accepts user selections, scores them, and responds with feedback.
- **Body parameters**:
  ```json
  {
    "sessionId": "string",
    "answers": [
      { "questionId": "string", "selectedOption": "string" }
    ]
  }
  ```

### 3. `/api/ai/teacher` (POST)
Internal proxy to the Google Gemini API. Handles interactive learning query prompts about specific passages or questions. Generates contextual advice in Vietnamese.

---

## 7. Development & Deployment Reference

### Dev Server Startup
```bash
npm run dev
```

### Trigger Database Seed for Grammar Tutorial Text
To load/reset the custom formatted grammar markdown texts into the remote database nodes:
```bash
npx tsx scripts/seed-grammar-tutorials.ts
```

### Clean Codebase Compiling
Checks types and compiles:
```bash
npm run build
```
