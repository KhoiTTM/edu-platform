# Title
Build Sentence Reorder Renderer

# Goal
Create a new UI component for `sentence_reorder` questions where users tap shuffled words to form a correct sentence.

# Background context
Users need a way to answer sentence arrangement questions. To minimize bugs and improve mobile UX, use a "tap-to-select" interface instead of drag-and-drop.

# Files involved
- `components/universal/SentenceReorderRenderer.tsx` (New)
- `components/universal/AssessmentRenderer.tsx`

# Implementation checklist
- [ ] Create `SentenceReorderRenderer.tsx`.
- [ ] Props: `instruction`, `words` (array of shuffled words), `correctSentence` (string), `onAnswer(isCorrect, value)`.
- [ ] State: `selectedWords` (array of words the user has tapped), `availableWords` (words left to tap).
- [ ] UI: Display `availableWords` as tappable chips. Display `selectedWords` above them in a sentence box.
- [ ] Add a "Check Answer" or "Submit" button that becomes active when all words are selected.
- [ ] On submit, join `selectedWords` with spaces and compare to `correctSentence`. Trigger `onAnswer`.
- [ ] Integrate this component into `AssessmentRenderer.tsx` under `case 'sentence_reorder'`.

# Validation checklist
- [ ] Tapping a word moves it between selected and available states.
- [ ] The submit button correctly evaluates the sentence order.
