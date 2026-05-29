# Title
Integrate Real Questions into Test Assessment Player

# Goal
Replace the mock questions in the test assessment page with real questions fetched from the database using the `examId`.

# Background context
The user confirmed that real questions work and should be used instead of MOCK_QUESTIONS in the test player.

# Files involved
- `app/(app)/test-assessment/page.tsx`

# DB changes
None.

# APIs involved
Calls `getExamQuestions(examId)` from actions.

# Dependencies
React `useSearchParams` or similar to get `examId`.

# Implementation checklist
- [ ] Read `examId` from the URL search params (`?examId=...`).
- [ ] Show a loading state while fetching questions.
- [ ] Call `getExamQuestions(examId)` and store in state.
- [ ] Pass the real questions to `AssessmentRenderer`.
- [ ] If the exam has no questions or `examId` is missing, show an appropriate error message or fallback.

# Validation checklist
- [ ] The assessment player loads successfully with data from the database.
- [ ] Completing the exam still triggers the result card correctly.

# Future extension notes
- Scoring logic will need to be synced with the DB eventually.

# Known risks
- Data format returned by DB must strictly match what `AssessmentRenderer` expects.
