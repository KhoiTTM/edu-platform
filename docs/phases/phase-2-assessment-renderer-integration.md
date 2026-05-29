# Phase 2: Assessment Renderer Blueprint Integration

## Phase Goals
- Upgrade the `AssessmentRenderer` to support real question blueprints generated from the textbook (e.g., `tap_correct_word`, `sentence_reorder`, `vocab_to_word`, `fill_blank`, `match_pair`).
- Prevent the "Unsupported question type" error in the test assessment UI.

## Architecture Overview
The backend is correctly fetching `question_bank.metadata_json` containing the real questions. The bottleneck is the frontend UI component. We will integrate these real blueprints into the `AssessmentRenderer`.
1. **Multiple Choice Mapping**: `tap_correct_word`, `vocab_to_word`, and `fill_blank` share a similar structure (question, 4 choices, 1 correct answer). They will be mapped directly to the existing `MultipleChoiceRenderer`.
2. **Sentence Reorder**: A new `SentenceReorderRenderer` will be created using a simple tap-to-select interface for assembling a sentence from shuffled words.
3. **Match Pair**: A new `MatchPairRenderer` will be created to allow users to connect left and right columns.

## Implementation Order
1. **Task 1** (`phase-2-multiple-choice-blueprints.md`): Map basic blueprints to the `MultipleChoiceRenderer`.
2. **Task 2** (`phase-2-sentence-reorder-renderer.md`): Build and integrate `SentenceReorderRenderer`.
3. **Task 3** (`phase-2-match-pair-renderer.md`): Build and integrate `MatchPairRenderer`.

## Risks
- State management inside custom renderers can be tricky (e.g. matching logic). The Execution Agent must ensure `onAnswer` is called correctly with `isCorrect` and the `answerValue`.
- Mobile responsiveness for the MatchPair component must be tested so it doesn't break small screens.

## Success Criteria
- The `/test-assessment` page loads and displays all real questions without unsupported errors.
- Users can answer all question types and progress to the result screen.
