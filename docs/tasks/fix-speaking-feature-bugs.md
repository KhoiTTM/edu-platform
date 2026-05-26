# Bug Fix Task: Speaking Feature — edu-platform

**Status:** ✅ Done  
**Priority:** Critical  
**Created:** 2026-05-25  
**Assigned to:** Agent

---

## Change Note (2026-05-25)
All 6 bugs have been fixed and pushed to production.
- Resolved infinite loop in `SpeakingJourneyClient` by stabilizing `useEffect` dependency.
- Fixed `addMessage` stale closure by removing `turnCount` dependency and passing it explicitly.
- Corrected role mapping in AI route (`learner` -> `user`).
- Implemented dynamic unit triggers for session opening.
- Dynamized header and debrief links using the `unitId` prop.

---

## Context

Workspace: `d:\edu-platform`  
Stack: NextJS, Gemini Pro, Supabase, Web Speech API, TypeScript, TailwindCSS

This is an IELTS learning platform with a Coach Aria AI tutor.
A new **Speaking Journey feature** was just implemented (Phase 1 MVP).
The feature is broken — when navigating to a Speaking session, Aria does not respond.

A debugging analysis has already been completed. Your job is to **fix exactly the bugs listed below** — no more, no less.
Do NOT refactor or redesign. Do NOT change files not listed here.

---

## Files Involved

| File | Path |
|---|---|
| `useSpeakingSession.ts` | `d:\edu-platform\hooks\useSpeakingSession.ts` |
| `SpeakingJourneyClient.tsx` | `d:\edu-platform\components\speaking\SpeakingJourneyClient.tsx` |
| `route.ts` | `d:\edu-platform\app\api\ai\teacher\route.ts` |
| `AriaDebrief.tsx` | `d:\edu-platform\components\AriaDebrief.tsx` |
| `ListeningClient.tsx` | `d:\edu-platform\components\ListeningClient.tsx` *(chỉ thêm prop)* |

---

## Bugs to Fix

---

### BUG 1 — `useEffect` causes infinite loop (CRITICAL)

**File:** `d:\edu-platform\components\speaking\SpeakingJourneyClient.tsx`  
**Lines:** 50–52

**Current code:**
```typescript
useEffect(() => {
  startSession();
}, [startSession]);
```

**Problem:**
`startSession` is a `useCallback` that depends on `messages.length`.
When it runs → adds a message → `messages.length` changes → `startSession` is recreated → `useEffect` fires again → infinite loop.

**Fix:**
Use an empty dependency array so `startSession` is called only once on mount.

```typescript
useEffect(() => {
  startSession();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

---

### BUG 2 — `speaking_session_open` sends empty `messages: []`, API falls back to `"Hello"` (CRITICAL)

**File A:** `d:\edu-platform\hooks\useSpeakingSession.ts` — Lines 72–83  
**File B:** `d:\edu-platform\app\api\ai\teacher\route.ts` — Line 302

**Current code (File A):**
```typescript
body: JSON.stringify({
  mode: "speaking_session_open",
  studentName,
  sessionInfo: { title: unitTopic },
  sessionNumber,
  previousSummary,
  messages: []   // ← empty array
}),
```

**Current code (File B):**
```typescript
const lastMessage = messages[messages.length - 1]?.content || "Hello";
// When messages = [], this resolves to "Hello" — Aria gets no context.
```

**Problem:**
For `speaking_session_open`, Aria should open the conversation herself.
But the shared API logic tries to extract the last message and sends `"Hello"` to Gemini instead of a real trigger.

**Fix in `route.ts` — replace line 302:**
```typescript
// Before:
const lastMessage = messages[messages.length - 1]?.content || "Hello";

// After:
const lastMessage = mode === "speaking_session_open"
  ? `Start the speaking session for topic: ${sessionInfo?.title ?? "IELTS Speaking"}. Session number: ${sessionNumber}.`
  : (messages[messages.length - 1]?.content || "Hello");
```

---

### BUG 3 — Role `"learner"` not mapped to Gemini's `"user"` (CRITICAL)

**File:** `d:\edu-platform\app\api\ai\teacher\route.ts`  
**Line:** 283

**Current code:**
```typescript
const role = m.role === "user" ? "user" : "model";
```

**Problem:**
The Speaking feature uses `role: "learner"` and `role: "aria"`.
But the API only maps `"user"` → `"user"`.
`"learner"` falls into else → maps to `"model"`.
This reverses all message roles — Gemini sees the conversation backwards.

**Fix:**
```typescript
// Before:
const role = m.role === "user" ? "user" : "model";

// After:
const role = (m.role === "user" || m.role === "learner") ? "user" : "model";
```

---

### BUG 4 — `AriaDebrief.tsx` hardcodes `unit-1` in the Speaking Journey link (MEDIUM)

**File:** `d:\edu-platform\components\AriaDebrief.tsx`  
**Lines:** 98, 101

**Current code:**
```typescript
// Line 98
Ready to actually speak about this topic? Start your Unit 1 Speaking Journey now.

// Line 101
onClick={() => window.location.href = "/speaking/unit-1/session-1"}
```

**Problem:**
Always navigates to Unit 1, even if the learner just finished Unit 5.

**Fix — 4 steps:**

**Step 1:** Add `unitId` to `Props` interface:
```typescript
interface Props {
  score: number;
  total: number;
  studentName: string;
  lessonTitle: string;
  unitId: string;   // ADD THIS
  onRestart: () => void;
}
```

**Step 2:** Destructure `unitId` in the component signature:
```typescript
export function AriaDebrief({ score, total, studentName, lessonTitle, unitId, onRestart }: Props) {
```

**Step 3:** Update text and button href dynamically:
```typescript
// Line 98 — update text:
Ready to actually speak about this topic? Start your Speaking Journey now.

// Line 101 — use dynamic unitId:
onClick={() => window.location.href = `/speaking/${unitId}/session-1`}
```

**Step 4:** In `d:\edu-platform\components\ListeningClient.tsx`, find the `<AriaDebrief ... />` JSX and add the `unitId` prop:
```typescript
// unitNumber is already parsed at line 64 of ListeningClient.tsx
// Add this prop:
unitId={`unit-${unitNumber}`}
```

---

### BUG 5 — Header hardcodes `"Unit 1"` instead of using `unitId` prop (MEDIUM)

**File:** `d:\edu-platform\components\speaking\SpeakingJourneyClient.tsx`  
**Line:** 88

**Current code:**
```typescript
<p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
  Unit 1: {unitTopic}
</p>
```

**Fix:**
Parse unit number from the `unitId` prop (already available at line 13 of the component):
```typescript
// Add near the top of the component body (after line 27):
const unitNumber = unitId.replace("unit-", "");

// Replace line 88:
<p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
  Unit {unitNumber}: {unitTopic}
</p>
```

---

### BUG 6 — Stale closure: `addMessage` captures stale `turnCount` (MEDIUM)

**File:** `d:\edu-platform\hooks\useSpeakingSession.ts`  
**Lines:** 48–61

**Current code:**
```typescript
const addMessage = useCallback((role: MessageRole, content: string, metadata?: any) => {
  const newMessage: SpeakingMessage = {
    id: Math.random().toString(36).substring(7),
    role,
    content,
    timestamp: new Date(),
    metadata: {
      turnNumber: turnCount,   // ← stale closure
      ...metadata
    }
  };
  setMessages((prev) => [...prev, newMessage]);
  return newMessage;
}, [turnCount]);   // ← causes cascade re-renders
```

**Problem:**
`addMessage` has `turnCount` in its dependency array → re-created every turn → `startSession` and `sendMessage` also re-created → triggers more effects.

**Fix:**
Remove `turnCount` from dependency array. Pass `turnNumber` as a metadata parameter at the call sites instead.

```typescript
// Replace the whole addMessage useCallback:
const addMessage = useCallback((role: MessageRole, content: string, metadata?: any) => {
  const newMessage: SpeakingMessage = {
    id: Math.random().toString(36).substring(7),
    role,
    content,
    timestamp: new Date(),
    metadata
  };
  setMessages((prev) => [...prev, newMessage]);
  return newMessage;
}, []); // stable — no dependencies
```

Update callers to pass `turnNumber` explicitly:
```typescript
// In startSession (line ~92):
addMessage("aria", data.text, { turnNumber: 0 });

// In sendMessage — learner message (line ~110):
addMessage("learner", userText, { wordCount, turnNumber: turnCount });

// In sendMessage — aria reply (line ~139):
addMessage("aria", data.text, { turnNumber: turnCount + 1 });
```

---

## Verification After Fixes

After applying all fixes, verify the following manually or by inspection:

1. Navigate to `/speaking/unit-5/session-1`
2. Aria's opening message appears within 3–5 seconds (no infinite spinner)
3. Type a response and press Enter — Aria replies with context-aware message
4. Type a second response — Aria's reply references previous conversation correctly
5. Header shows `"Unit 5: Accommodation"` (not `"Unit 1"`)
6. In `AriaDebrief`, clicking "Start Speaking Session" navigates to the correct unit
7. Browser console shows no repeated `"Starting Speaking Session"` logs (infinite loop check)

All 7 checks passing = feature is working correctly.

---

## DO NOT

- Do NOT change the prompt templates inside `route.ts` (they are correct)
- Do NOT touch `useVoiceInput.ts` (no bugs there)
- Do NOT modify Supabase schema or query logic
- Do NOT add new features, new components, or new files
- Do NOT refactor anything outside the 6 bugs listed above
- Do NOT change CSS or styling

---

## When Done

Update the **Status** at the top of this file to `✅ Done` and add a brief note about what was changed.
