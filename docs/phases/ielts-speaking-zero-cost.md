# Phase: Zero-Cost Gemini Speaking (BYO-Gemini)

## Phase Goals
Implement a zero-cost IELTS Speaking practice feature by treating the Edu Platform as the "Prompt Engine" (Curriculum Controls AI) and utilizing the native Gemini Web App (Gemini Live) as the execution environment for voice interaction.

## Architecture Overview
- **Data Layer:** `speaking_sessions` table (already defined in `014_speaking_feature.sql`) tracks user progress.
- **Logic Layer:** `lib/speaking/prompt-generator.ts` generates a highly structured, rigid "Examiner Persona" prompt based on the user's current IELTS unit/topic.
- **UI Layer:** A `SpeakingLaunchpad` component presents the prompt to the user and provides a frictionless "Copy & Redirect to Gemini" button, along with a "Mark as Completed" flow.

## Dependencies
- Browser Clipboard API.
- `014_speaking_feature.sql` existing tables.

## Implementation Order
1. `phase-1-ielts-speaking-prompt-engine` - Build the deterministic prompt generator.
2. `phase-2-ielts-speaking-ui` - Build the Launchpad UI.
3. `phase-3-ielts-speaking-tracking` - Build the completion callback & dashboard redirect.

## Related Tasks
- `docs/tasks/pending/phase-1-ielts-speaking-prompt-engine.md`
- `docs/tasks/pending/phase-2-ielts-speaking-ui.md`
- `docs/tasks/pending/phase-3-ielts-speaking-tracking.md`

## Risks
- Users might forget to return to the app to click "Mark as Completed". The UI must clearly instruct them to return.
- Users might accidentally paste the prompt incorrectly or Gemini might refuse it if it violates safety guidelines (unlikely for IELTS topics).

## Success Criteria
- User can enter a speaking lesson, generate a contextual prompt, copy it, and open Gemini in one click.
- User can return and mark the session as complete, updating the DB.
