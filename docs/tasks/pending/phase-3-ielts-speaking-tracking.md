# Title
Speaking Progress Tracking

# Goal
Provide a way for users to confirm they have completed their Gemini speaking session and update their progress in the database.

# Background context
Since the speaking happens in an external tab (Gemini), the Edu platform doesn't inherently know when the user finishes. We rely on the user to return and click "Mark as Completed".

# Files involved
- `app/api/speaking/complete/route.ts` (New)
- `components/speaking/SpeakingLaunchpad.tsx` (Update)

# DB changes
- Update `speaking_sessions` status to `complete`.

# APIs involved
- Supabase Client (Update row).

# Dependencies
- Phase 1 and Phase 2.

# Implementation checklist
- [ ] Add a "Xác nhận đã luyện tập xong" (Confirm completion) button to `SpeakingLaunchpad.tsx`.
- [ ] Create API route `/api/speaking/complete` (or Server Action) that updates the `status` column in `speaking_sessions`.
- [ ] Show a success state/animation.
- [ ] Redirect user back to the Curriculum Map (`/learn/[subject]/lop-[grade]`).

# Validation checklist
- [ ] Clicking complete updates the database.
- [ ] Progress is reflected on the map.

# Future extension notes
- We could add an optional text area for users to paste Gemini's feedback, which we can parse and store in `learner_speaking_notes`.

# Known risks
- Users might mark as complete without actually practicing. This is an honor-system approach, which is acceptable for BYO-Gemini zero-cost architecture.
