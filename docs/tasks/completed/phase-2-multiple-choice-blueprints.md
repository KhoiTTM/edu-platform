# Title
Map Basic Blueprints to Multiple Choice Renderer

# Goal
Update `AssessmentRenderer.tsx` to handle `tap_correct_word`, `vocab_to_word`, and `fill_blank` using the existing `MultipleChoiceRenderer`.

# Background context
The real database has question types that act like multiple choice (1 correct answer out of an array of choices), but they have different type names. We need to normalize them before passing them to the UI.

# Files involved
- `components/universal/AssessmentRenderer.tsx`

# Implementation checklist
- [ ] Add `tap_correct_word`, `vocab_to_word`, and `fill_blank` as valid cases in the `switch (currentQuestion.type)` statement.
- [ ] For these cases, return the `MultipleChoiceRenderer`.
- [ ] Combine `currentQuestion.instruction` and `currentQuestion.question` (if present) for the `question` prop.
- [ ] Pass `currentQuestion.choices` to the `options` prop.
- [ ] Calculate the `correctIndex` by finding the index of `currentQuestion.correct_word` (or `currentQuestion.correct_answer`) within the `choices` array.
- [ ] Ensure `onAnswer` handles the state progression properly.

# Validation checklist
- [ ] Ensure the component does not crash.
- [ ] Ensure selecting the correct option advances the question and preserves hearts.

# Known risks
- Some data might have `correct_answer` instead of `correct_word`. Code must check both.
