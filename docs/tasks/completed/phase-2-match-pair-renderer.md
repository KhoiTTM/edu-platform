# Title
Build Match Pair Renderer

# Goal
Create a new UI component for `match_pair` questions where users select matching pairs from two columns.

# Background context
The user needs to match items (e.g., English words to Vietnamese meanings) by tapping an item on the left, then an item on the right.

# Files involved
- `components/universal/MatchPairRenderer.tsx` (New)
- `components/universal/AssessmentRenderer.tsx`

# Implementation checklist
- [ ] Create `MatchPairRenderer.tsx`.
- [ ] Props: `instruction`, `pairs` (array of `{left: string, right: string}`), `onAnswer`.
- [ ] Shuffle the left items and right items independently on mount.
- [ ] State: `selectedLeft`, `selectedRight`, `matchedPairs` (array of successfully matched left keys), `errors`.
- [ ] UI: Display two columns. Highlight selected items.
- [ ] Logic: When a user selects one left and one right, check if they match in the original `pairs` array.
- [ ] If correct, add to `matchedPairs` (disable them in UI).
- [ ] If incorrect, show a brief error state (red flash) then deselect.
- [ ] When `matchedPairs.length === pairs.length`, trigger `onAnswer(true, "matched_all")`.
- [ ] Integrate into `AssessmentRenderer.tsx` under `case 'match_pair'`.

# Validation checklist
- [ ] The component shuffles correctly.
- [ ] Incorrect matches do not lock the UI permanently.
- [ ] The question successfully completes only when all pairs are matched.
