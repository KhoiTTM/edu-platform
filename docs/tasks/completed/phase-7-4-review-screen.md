# TASK: PHASE 7.4 — ASSESSMENT STUDIO REVIEW SCREEN

# GOAL
Build an interactive review screen for teachers to fine-tune generated assessments.

# BACKGROUND CONTEXT
This is the most critical human-in-the-loop component. Teachers must be able to approve, regenerate, or manually edit every AI-enhanced question before it is finalized.

# FILES INVOLVED
- `app/(studio)/assessment-studio/exams/[examId]/review/page.tsx`
- `components/studio/QuestionEditor.tsx`
- `components/studio/PreviewPanel.tsx`

# DB CHANGES
- Update `exam_questions`.
- Update `question_bank` (if manual edits are made).

# IMPLEMENTATION CHECKLIST
- [ ] Build the interactive question list with status badges (Approved/Pending).
- [ ] Implement the `QuestionEditor` with live preview.
- [ ] Build the 'Regenerate' feature to request a new variation from the API.
- [ ] Implement 'Finalize' action to mark the exam as ready for students.
- [ ] Add drag-and-drop reordering for questions.

# VALIDATION CHECKLIST
- [ ] Verify that manual edits are correctly persisted to the DB.
- [ ] Test the regeneration flow to ensure it adheres to the curriculum scope.
- [ ] Ensure the 'Finalize' button triggers a final validation pass.

# FUTURE EXTENSION NOTES
Add 'Teacher Comments' per question to track internal content review notes.
