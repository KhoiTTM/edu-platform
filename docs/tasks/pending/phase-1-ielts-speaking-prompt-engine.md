# Title
IELTS Speaking Prompt Engine

# Goal
Build a deterministic prompt generator that enforces the "Curriculum Controls AI" principle, creating a strict persona prompt for Gemini to act as an IELTS Examiner.

# Background context
We cannot use API integrations due to cost/tier limits. Instead, we generate a high-quality prompt containing the curriculum context (topic, part, target band) that the user will paste into the native Gemini app (BYO-Gemini).

# Files involved
- `lib/speaking/prompt-generator.ts` (New)

# DB changes
- None.

# APIs involved
- None.

# Dependencies
- Needs unit topic data (e.g., "Hometown", "Education").

# Implementation checklist
- [ ] Create `lib/speaking/prompt-generator.ts`.
- [ ] Implement `generateIeltsPrompt(unitTopic: string, part: 1 | 2 | 3, targetBand: string): string`.
- [ ] Draft a robust prompt template: "Act as an IELTS Examiner... Ask me one question at a time... Wait for my response... Correct my grammar briefly..."

# Validation checklist
- [ ] Prompt string is formatted correctly without syntax errors.
- [ ] Prompt string includes the dynamic parameters (unitTopic, part).

# Future extension notes
- Extendable to other subjects (e.g., General English) by swapping the template.

# Known risks
- Prompt might be too long for mobile copy-paste buffers, but modern clipboards support MBs of text. Keep it concise.
