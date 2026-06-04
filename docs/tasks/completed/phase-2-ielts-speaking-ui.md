# Title
Speaking Launchpad UI

# Goal
Build a user interface that presents the generated Gemini prompt to the user and facilitates an easy copy-and-redirect workflow.

# Background context
Users need a frictionless way to get the prompt and open Gemini. A dedicated UI component in the lesson flow accomplishes this.

# Files involved
- `components/speaking/SpeakingLaunchpad.tsx` (New)
- `app/(app)/learn/[subject]/[grade]/[unit]/[lesson]/[concept]/speaking/page.tsx` (Update or New)

# DB changes
- None.

# APIs involved
- Browser `navigator.clipboard.writeText`.
- `window.open('https://gemini.google.com')`.

# Dependencies
- Needs `prompt-generator.ts` from Phase 1.

# Implementation checklist
- [ ] Create `components/speaking/SpeakingLaunchpad.tsx`.
- [ ] Implement UI: Beautiful glassmorphism card showing the prompt instructions.
- [ ] Implement "Sao chép Prompt & Mở Gemini" button.
- [ ] Add instructions: "Paste this into Gemini and tap the Live (Wave) icon to start talking!"
- [ ] Integrate into the learning flow (replace existing empty speaking placeholder if any).

# Validation checklist
- [ ] Clicking the button successfully copies text to clipboard.
- [ ] Clicking the button opens Gemini in a new tab.

# Future extension notes
- Could detect if the user is on mobile and open the Gemini native app URI if possible (though `https://gemini.google.com` usually triggers deep linking on Android).

# Known risks
- Clipboard API requires HTTPS or localhost, which is fine for our setup.
