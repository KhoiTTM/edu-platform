# Phase 1 MVP — Full Design Document
## AI-Native IELTS Listening Loop · Solo Builder · 2 Tuần

> **Mục tiêu cốt lõi:** Học sinh sau buổi học phải cảm thấy *"Ai đó thông minh vừa dạy tôi"* — không phải *"Tôi vừa làm bài tập".*

---

## 1. Exact Learner Journey

```
TRƯỚC (hiện tại — 4 bước thụ động)
─────────────────────────────────────────────
[Video] → ghi chú tự do → đọc transcript → đọc hướng dẫn shadowing → làm quiz

SAU (MVP — 5 phase tương tác)
─────────────────────────────────────────────
Phase 0 · WARMUP        ~2 phút   Aria hỏi 1 câu cá nhân → học sinh trả lời
Phase 1 · LISTEN        ~8 phút   Video + 3 checkpoint cards (pause-and-think)
Phase 2 · EXPLORE       ~5 phút   Tap transcript lines → vocab flash → nói lại
Phase 3 · SPEAK         ~5 phút   Viết/nói 2 câu về routine mình → Gemini coach
Phase 4 · CHECK         ~5 phút   Quiz rút gọn + retry thông minh + Aria tổng kết
─────────────────────────────────────────────
Tổng: ~25 phút / session (thay vì 40 phút nhàm chán)
```

---

## 2. Step-by-Step Interaction Flow + UX Feeling Goals

---

### Phase 0 · WARMUP (Thay thế: không có gì trước video)

**UX Feeling Goal:** *"Ôi, AI này hỏi tôi thật — không phải đọc script."*

#### Màn hình xuất hiện:

Khi user vào `/listening/[id]`, thay vì thấy video ngay:
1. Aria card nhỏ xuất hiện từ phải (slide-in, ~0.3s)
2. Hiện typing indicator (3 dots, 600ms)
3. Rồi mới hiện message

```
┌──────────────────────────────────────────────────────────┐
│  🤖 Coach Aria                                    ● Live │
│─────────────────────────────────────────────────────────│
│                                                          │
│  Hey [Tên]! Before we listen to Jack's story...         │
│                                                          │
│  Quick question 👇                                       │
│  What's the FIRST thing you do every morning?           │
│  (Even if it's just... checking your phone 😄)          │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Type your answer...                              │   │
│  └──────────────────────────────────────────────────┘   │
│                              [Send →]                    │
└──────────────────────────────────────────────────────────┘
```

#### AI Responses (ví dụ thực tế từ Gemini):

**Nếu user gõ:** *"I check my phone"*
```
AI: "Ha, same as half the world 😄
     In English we say: 'The first thing I do is check my phone.'
     
     Now — Jack has a very different morning. Ready to find out? 🎧"
     
     [▶ Bắt đầu nghe]
```

**Nếu user gõ:** *"I wake up"*
```
AI: "Good start! But what THEN? Morning routines are interesting 
     because everyone's is different.
     
     Jack from the audio? His family is super organized. 
     Let's see if your morning is anything like his! 🎧"
     
     [▶ Bắt đầu nghe]
```

**Nếu user gõ ngắn hoặc tiếng Việt:** *"đánh răng"*
```
AI: "Brushing teeth — smart start 😁
     In English: 'I brush my teeth first thing in the morning.'
     
     Jack might do that too... or maybe not. Let's find out! 🎧"
     
     [▶ Bắt đầu nghe]
```

**Technical note:** Nếu API timeout (>5s) → skip warmup, show video ngay. Không block session.

---

### Phase 1 · LISTEN — Chunk-Based Interactive Listening

**UX Feeling Goal:** *"Tôi đang được test từng đoạn — tôi phải chú ý!"*

#### Layout thay đổi:

```
[Video player — giữ nguyên, full width]

DƯỚI video, THAY textarea cũ bằng 3 checkpoint cards:

┌─────────────────────────────────────────────────────────┐
│  ⚡ CHECKPOINT 1 of 3                                    │
│─────────────────────────────────────────────────────────│
│  "What time does Jack's FATHER set his alarm clock?"    │
│                                                          │
│  💡 Tip: Watch for numbers in the audio!                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Your answer...                               🎙️ │   │
│  └──────────────────────────────────────────────────┘   │
│                              [Check my answer →]         │
└─────────────────────────────────────────────────────────┘
```

**Timing UX:** Checkpoints KHÔNG tự unlock. User xem video → scroll xuống → thấy card → biết phải trả lời.

**Button label thay đổi theo context:**
- Chưa xem video: `▶ Xem video trước`  
- Đang xem: `[Check my answer →]` (active)

#### 3 Checkpoint Cards (Unit 1 hardcoded, các unit sau generate):

```typescript
// lib/checkpoints/unit1.ts
export const unit1Checkpoints = [
  {
    id: "c1",
    question: "What time does Jack's father set his alarm clock?",
    type: "text",
    acceptedAnswers: ["6", "6 am", "6am", "six", "6 o'clock"],
    hint: "It's a specific time in the morning 🕕",
    lineRef: 1,  // transcript.lines[1]
    revealText: "6 AM — Jack's father sets his alarm at 6 in the morning."
  },
  {
    id: "c2", 
    question: "True or False: Jack's mother wakes up AFTER his father.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the word 'same time' 👂",
    lineRef: 2,
    revealText: "FALSE — She wakes up at the SAME time as his father."
  },
  {
    id: "c3",
    question: "Fill in: Jack always _____ his bedroom before leaving.",
    type: "fill",
    blankWord: "tidies up",
    acceptedAnswers: ["tidy up", "tidies up", "cleans", "clean"],
    hint: "It means making something neat and organized 🧹",
    lineRef: 3,
    revealText: "tidy up — Jack always TIDIES UP his bedroom."
  }
]
```

#### Retry Loop cho Checkpoints:

```
Attempt 1 — Sai:
┌─────────────────────────────────────────────┐
│  Hmm, not quite 🤔                          │
│                                             │
│  Hint: "Listen for a specific time —       │
│  Jack's dad is very punctual!"             │
│                                             │
│  [🔄 Try again]    [🔊 Replay this part]   │
└─────────────────────────────────────────────┘

Attempt 2 — Sai lần 2:
┌─────────────────────────────────────────────┐
│  Almost there! Let's look at the answer:    │
│                                             │
│  ✅ The answer is: 6 AM                    │
│  "...sets his alarm clock for 6 AM..."     │
│                                             │
│  [Got it, next checkpoint →]               │
└─────────────────────────────────────────────┘

Attempt 1 — Đúng:
┌─────────────────────────────────────────────┐
│  ✅ Exactly right!                          │
│                                             │
│  "sets his alarm clock for 6 AM" — this    │
│  is a key IELTS phrase: SET + alarm clock. │
│                                             │
│  [Next checkpoint →]                       │
└─────────────────────────────────────────────┘
```

**Mobile:** Replay button mở YouTube embed ở đúng timestamp (nếu có) hoặc replay toàn video.

---

### Phase 2 · EXPLORE — Interactive Transcript

**UX Feeling Goal:** *"Transcript không còn là wall of text — tôi đang chơi với từng câu."*

#### Transcript UI thay đổi:

Mỗi dòng transcript bây giờ:
- Có hover state (highlight nhẹ)
- Click/tap → expand inline
- Không pop-up, không modal — expand tại chỗ

```
┌─────────────────────────────────────────────────────────────┐
│  Bilingual Transcript                                        │
│─────────────────────────────────────────────────────────────│
│                                                              │
│  ○ Line 1  [tap to explore]                                 │
│  "Hello everyone, my name is Jack..."                       │
│  Xin chào mọi người...                                      │
│                                                              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─            │
│  ▼ Line 2  [expanded]                                       │
│  "Every night, my father SETS his alarm clock for 6 AM"    │
│  Mỗi tối, bố mình CÀI đồng hồ báo thức lúc 6 giờ sáng.   │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─            │
│  📌 Key phrase: "sets his alarm"                            │
│     → "Set" + noun = action routine                         │
│     More: set the table, set a goal, set a record          │
│                                                              │
│  🗣️ Say this line out loud:                                  │
│  "Every night, my father sets his alarm clock."             │
│  [I said it! ✓]                                            │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─            │
│                                                              │
│  ○ Line 3  [tap to explore]                                 │
│  "My mother usually gets up at the same time..."            │
└─────────────────────────────────────────────────────────────┘
```

**"I said it! ✓" button** — không track, không score. Chỉ để tạo micro-commitment + feeling of progress.

#### Vocab Flash Cards (giữ nguyên phần vocab hiện tại, nâng UX):

Thay grid cards tĩnh bằng flip interaction:

```
[Front]                    [Back after tap]
┌──────────────┐          ┌──────────────────────────────────┐
│              │          │  routine /ruːˈtiːn/               │
│   routine    │  →  tap  │  (n) thói quen hàng ngày         │
│              │          │                                    │
│   🔄 Tap    │          │  "I have a morning routine."      │
└──────────────┘          │  ✓ IELTS Band 6+ word            │
                          └──────────────────────────────────┘
```

---

### Phase 3 · SPEAK — Speaking Follow-Up

**UX Feeling Goal:** *"AI đang hỏi TÔI — không phải một cái form đang hỏi tôi."*

#### Thiết kế: Mic-First, Text Fallback

**Nguyên tắc quan trọng:** Dù không có voice infra, UX phải cảm giác mic-first.

```
┌──────────────────────────────────────────────────────────┐
│  🎙️ Your Turn!                                           │
│──────────────────────────────────────────────────────────│
│                                                          │
│  Aria: "Jack's family has a very organized morning.     │
│         What about YOUR family?                         │
│         Tell me 2 things. No pressure! 😊"              │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                              🎤 │   │
│  │  My mum usually...                              │   │
│  │                                                  │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  💡 Try to use: usually / always / every morning        │
│                                                          │
│  [Skip for now]              [Get Aria's feedback →]    │
└──────────────────────────────────────────────────────────┘
```

**Design decisions:**
- Textarea có icon mic (🎤) ở góc → visual hint "nói to câu này"  
- Placeholder text = gợi ý mở đầu câu (thay đổi mỗi session)
- "Skip for now" luôn visible — không bắt buộc
- Prompt cá nhân hóa từ topic bài nghe

#### Gemini Feedback — Kiểu "Human Coach"

**Gemini nhận:** user text + lesson context + tone instruction

**Feedback phải trông như thế này:**

```
┌──────────────────────────────────────────────────────────┐
│  Aria: Nice! Let me read what you wrote... 👀           │
│                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─            │
│  ✅ Love this:                                           │
│     "My mum usually cooks breakfast" — perfect!         │
│     'usually' is exactly right here 🎯                   │
│                                                          │
│  💡 One small thing:                                    │
│     "My dad wake up" → "My dad wakes up"                │
│     (he/she/it always needs the -s!)                    │
│                                                          │
│  🔄 Try rewriting that sentence:                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ My dad _______ up at...                          │   │
│  └──────────────────────────────────────────────────┘   │
│  [Check →]                                               │
└──────────────────────────────────────────────────────────┘
```

**KHÔNG được như thế này:**
```
❌  "Your sentence structure shows partial understanding 
     of the Present Simple tense. Grammar accuracy: 65%."
```

**Retry trong Speaking:**
```
User viết lại: "My dad wakes up at 7"
AI: "Yes! 🎉 wakeS — exactly.
     He/she/it always takes the -s.
     Remember: Jack's father SETS his alarm. GETS up. WAKES early.
     Every single one has that -s. You've got it!"
     
     [Next step →]
```

---

### Phase 4 · CHECK — Smart Quiz + Aria Debrief

**UX Feeling Goal:** *"Quiz không còn là kiểm tra — là xác nhận những gì tôi đã học."*

#### Quiz Rút Gọn (5 câu, không phải 15)

Chọn 5 câu từ 15 câu hiện có — ưu tiên câu về nội dung bài nghe thực tế, không phải vocab chung chung.

```
┌──────────────────────────────────────────────────────────┐
│  📝 Quick Check  ●●●○○   Q3 of 5                        │
│──────────────────────────────────────────────────────────│
│                                                          │
│  What does Jack do BEFORE leaving the house?            │
│                                                          │
│  ○  A. He eats breakfast                                │
│  ○  B. He tidies his bedroom ← correct                 │
│  ○  C. He watches TV                                    │
│  ○  D. He calls his friend                              │
│                                                          │
│                              [Submit →]                  │
└──────────────────────────────────────────────────────────┘
```

**Sau mỗi câu (immediate feedback, không phải cuối):**

```
Đúng:
┌──────────────────────────────────┐
│  ✅ Correct!                     │
│  "I always tidy up my bedroom"  │
│  — great listening detail 👂    │
│  [Next question →]              │
└──────────────────────────────────┘

Sai:
┌──────────────────────────────────┐
│  Not quite 🙈                    │
│                                  │
│  The audio says:                 │
│  "I always TIDY UP my bedroom"  │
│  → B was correct                │
│                                  │
│  [Got it, next →]               │
└──────────────────────────────────┘
```

**Không có retry per question** — giải thích ngay, move on. Retry toàn quiz sau khi xong.

#### Aria Debrief — Session End

```
┌──────────────────────────────────────────────────────────┐
│  🎉 Session complete!                                    │
│──────────────────────────────────────────────────────────│
│                                                          │
│  Aria: "4 out of 5 — solid work today, [Tên]! 💪       │
│                                                          │
│         The one you missed was about what Jack does     │
│         before leaving. Listening for verbs like        │
│         'tidy up' is a key IELTS skill!                │
│                                                          │
│         For next time: watch for action verbs in        │
│         daily routines — they're often in the test."   │
│                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─           │
│  📌 Saved for you:                                      │
│  • "tidy up" — remember this phrase!                   │
│  • third-person -s (he/she/it + verb+s)               │
│                                                          │
│  [← Back to lessons]   [Next lesson: Unit 2 →]         │
└──────────────────────────────────────────────────────────┘
```

---

## 3. AI Conversational Behavior — Gemini Prompt Design

### Prompt 1: WARMUP

```typescript
const WARMUP_PROMPT = (studentName: string, lessonTitle: string, lessonDescription: string) => `
You are Coach Aria — a warm, witty, encouraging IELTS tutor.
Student: ${studentName}
They are about to listen to: "${lessonTitle}"
Topic: ${lessonDescription}

YOUR TASK:
1. Ask ONE casual personal question related to the topic.
   Keep it light — like a friend asking, not an exam.
2. When student answers, respond in max 3 sentences:
   a) React naturally to their answer (not just "Good job!")
   b) Sneak in ONE useful phrase or correction, very gently
   c) End with excitement about the audio: make them want to listen

TONE: Warm, fun, slightly cheeky. Like a cool older sibling who tutors.

LANGUAGE: English with Vietnamese only in parentheses if genuinely helpful.
DO NOT: Give grammar lectures. DO NOT be formal. DO NOT use stars or bullet points.
MAX LENGTH: 4 sentences total.

GOOD EXAMPLE:
Student: "I wake up late"
AI: "Ha, honestly same — weekends are dangerous 😄 In English we'd say 'I always wake up late' to show it's a habit. Now let's see how Jack's family is literally the opposite of us! 🎧"

BAD EXAMPLE:
AI: "Thank you for sharing! That is a good sentence. Today we will learn about daily routines."
`
```

### Prompt 2: SPEAKING FEEDBACK

```typescript
const SPEAKING_FEEDBACK_PROMPT = (
  studentName: string,
  userText: string,
  lessonContext: string,
  targetGrammar: string
) => `
You are Coach Aria, giving feedback on a student's written response.
Student: ${studentName}
What they wrote: "${userText}"
Lesson context: ${lessonContext}
Target grammar: ${targetGrammar}

YOUR TASK — give feedback in this EXACT structure (but sound human, not robotic):

1. REACT: Say one genuine thing about their content (not just grammar).
   Sound like you actually read it.

2. PRAISE: Find ONE thing they did correctly. Be specific with quotes.

3. GENTLY CORRECT: If there's an error, fix ONE thing only.
   Format: "[their words]" → "[correction]"
   Then explain in ONE sentence, simply.
   If no errors: skip this and add another praise.

4. INVITE RETRY: Ask them to rewrite just the corrected sentence.
   Or if perfect: express genuine delight.

CRITICAL RULES:
- Max 5 sentences total
- Use emojis sparingly (max 2)
- Never say "Great job!" or "Well done!" — be more specific
- React to CONTENT first, grammar second
- Use student's actual words in feedback

LANGUAGE: Mostly English, Vietnamese only for explaining grammar concepts.

EXAMPLE OF GOOD FEEDBACK:
User: "My mum usually cooks breakfast and my dad wake up at 7"
AI: "Oh your mum cooks every morning — that's lovely 🍳 'Usually cooks' is perfect use of present simple! One small fix: 'my dad wake up' → 'my dad wakes up' — he/she/it always needs that -s. Can you rewrite just that part?"
`
```

### Prompt 3: QUIZ DEBRIEF

```typescript
const QUIZ_DEBRIEF_PROMPT = (
  studentName: string,
  score: number,
  total: number,
  wrongQuestions: QuizQuestion[],
  lessonTitle: string
) => `
You are Coach Aria wrapping up a lesson.
Student: ${studentName}
Score: ${score}/${total}
Lesson: "${lessonTitle}"
Questions they got wrong: ${JSON.stringify(wrongQuestions.map(q => ({
  question: q.question,
  correct: q.options[q.correct_index],
  explanation: q.explanation
})))}

Give a SESSION DEBRIEF in this format — sound like a human tutor, not a grade report:

1. REACTION: One line reacting to their score honestly.
   If 5/5: genuine excitement. If 3/5: encouraging but honest. If 1/5: warm + redirecting.

2. PATTERN: If they got questions wrong, identify ONE pattern (not list all mistakes).
   E.g., "You missed listening for specific numbers" or "Action verbs were tricky today"
   If all correct: skip this.

3. ONE TIP: Give one practical IELTS listening tip based on what they struggled with.
   Format: "For next time: [tip]"

4. SAVE NOTE: End with: "I've saved [specific vocab/grammar] for your next session."

RULES:
- Max 4 sentences
- Conversational, not clinical
- Vietnamese only for the "saved note" part if helpful
- No bullet lists
- Make them feel capable, not tested
`
```

---

## 4. Retry Loop Design

### Phân loại Retry theo tình huống:

#### Type A — Checkpoint sai (factual listening)
```
Wrong attempt 1:
  → Tone: "Hmm, not quite 🤔" (không nói "Wrong!")
  → Action: Hiện 1 hint từ transcript (một phần câu)
  → Button: [Try again] + [Replay section]

Wrong attempt 2:
  → Tone: "Let's look at this together..."
  → Action: Reveal đáp án + highlight câu trong transcript phía trên
  → Button: [Got it, continue →]
  → Mark: weakness_type: "listening_detail"
```

#### Type B — Speaking/writing sai grammar
```
AI feedback chứa lỗi:
  → Không nói "Wrong" — AI nói "One small thing..."
  → Chỉ sửa 1 lỗi, bỏ qua lỗi còn lại
  → Inline retry: textarea mới nhỏ, chỉ cần viết lại 1 câu
  
Retry đúng:
  → AI: "Yes! Exactly." + repeat back đúng câu của họ
  → Không cho retry lần 3 — "You've got this now!"

Retry sai lần 2:
  → AI viết câu đúng ra + "Say this one 3 times later 😊"
  → Move on — không block progress
```

#### Type C — Quiz sai (multiple choice)
```
Immediate after wrong:
  → Highlight đáp án đúng màu green
  → Show quote từ transcript: "The audio said: '...'"
  → Không retry per question
  
Cuối quiz:
  → Nếu score < 3/5: Button "Try 3 hardest questions again"
  → Retry chỉ wrong questions (không quiz lại 5 câu)
  → Lần này có hint nho nhỏ hiện cùng câu hỏi
```

#### Tone Guidelines cho Retry:

| Tình huống | ❌ Không dùng | ✅ Dùng thay thế |
|---|---|---|
| Sai lần 1 | "Incorrect" | "Not quite — let's look again" |
| Sai lần 2 | "Wrong again" | "Let's peek at the answer" |
| Đúng sau retry | "Correct" | "Yes! That's it 🎯" |
| Skip/give up | "You failed" | "No worries — saved for next time" |

---

## 5. Chunk Listening Behavior

### Tại sao checkpoints không dùng timestamps:

Video là YouTube embed → không control được timestamp API đơn giản. Checkpoints xuất hiện **sau khi** video kết thúc (hoặc user dừng). Học sinh đã nghe xong rồi mới làm checkpoint = vẫn training active recall.

### Checkpoint State Machine:

```typescript
type CheckpointState = 
  | "locked"     // chưa xem video
  | "active"     // đang làm
  | "correct"    // đúng lần 1
  | "hinted"     // sai → đã thấy hint
  | "revealed"   // sai lần 2 → đã thấy đáp án
  | "done"       // bất kể kết quả, đã hoàn thành

// Logic unlock: video ended → set all to "active"
// Progress: done khi tất cả checkpoints = done
```

### Input Validation (không cần AI):

```typescript
function checkAnswer(userInput: string, accepted: string[]): boolean {
  const normalized = userInput.trim().toLowerCase()
    .replace(/[.,!?]/g, "")
  return accepted.some(a => 
    normalized.includes(a.toLowerCase()) || 
    a.toLowerCase().includes(normalized)
  )
}
```

> Không cần gọi Gemini để validate checkpoints — giảm API calls.

### Mobile UX cho Checkpoints:

- Cards scroll vào view tự động sau video kết thúc
- Input field trigger keyboard → card scroll lên trên keyboard
- "Replay" button → cuộn lên video, play lại
- Min tap target: 44px tất cả buttons

---

## 6. Speaking Interaction Design

### Mic-First Philosophy (không cần voice infra):

**Nguyên tắc:** UI phải nhắc "speak out loud" ngay cả khi collect text.

```typescript
// SpeakingFollowUpBox.tsx — placeholder rotation
const placeholders = [
  "Say it out loud, then type what you said...",
  "Speak first, then write it down 🗣️",
  "Try saying it before typing...",
]
```

**🎤 Icon behavior:**
- Icon mic trong textarea = decoration + psychological cue
- Không có actual mic functionality trong MVP
- Tooltip on hover: "Speak it out loud, then write what you said!"

### Speaking Prompt Personalization:

Prompt thay đổi theo topic transcript:

```typescript
function getSpeakingPrompt(unitTitle: string): string {
  const prompts: Record<string, string> = {
    "Daily Life": "What does YOUR morning look like? Tell me 2 things.",
    "House and Home": "Describe one room in your home. What's in it?",
    "Hobbies": "What do you do when you have free time?",
    "Travel": "Where would you love to travel? Why?",
    // ...
  }
  // Extract topic from unitTitle
  const topic = Object.keys(prompts).find(k => unitTitle.includes(k))
  return prompts[topic ?? "Daily Life"]
}
```

### Low-Pressure Cues:

```
"No pressure — just 1-2 sentences is perfect!"
"There's no wrong answer here — I'm curious about YOU."
"This isn't a test — it's practice 😊"
```

---

## 7. Weakness Memory Structure

### Chỉ dùng localStorage — không DB:

```typescript
// lib/sessionMemory.ts

interface WeaknessNote {
  type: 'grammar' | 'vocab' | 'listening'
  key: string           // e.g., "third_person_s", "tidy_up"
  note: string          // human-readable, max 50 chars
  count: number         // how many times flagged
}

interface SessionRecord {
  lessonId: string
  unitNum: number
  completedAt: string   // ISO date
  score: { correct: number; total: number }
  speakingDone: boolean
  weaknesses: WeaknessNote[]
  ariaTip: string       // the final Gemini debrief tip
}

// Keys
const SESSION_KEY = (lessonId: string) => `bp_session_${lessonId}`
const WEAKNESS_KEY = `bp_weaknesses`  // cross-session weakness accumulator
```

### Khi nào lưu weakness:

```typescript
// 1. Checkpoint sai lần 2 (listening weakness)
addWeakness({ 
  type: 'listening', 
  key: `detail_${checkpoint.id}`,
  note: `Missed: "${checkpoint.revealText.slice(0, 40)}..."`,
  count: 1
})

// 2. Gemini phát hiện grammar error trong speaking feedback
addWeakness({
  type: 'grammar',
  key: 'third_person_s',   // parsed from Gemini response
  note: 'he/she/it + verb-s',
  count: 1
})

// 3. Quiz câu sai
addWeakness({
  type: 'vocab',
  key: question.explanation?.split(' ')[0] ?? 'unknown',
  note: `Missed quiz Q: "${question.question.slice(0, 40)}"`,
  count: 1
})
```

### Hiển thị weakness khi quay lại:

```
[Khi user vào lại bài đã học]

┌────────────────────────────────────────────┐
│  👋 Welcome back!                          │
│                                            │
│  Last time you wanted to remember:         │
│  • "tidy up" (daily routine verb)         │
│  • third-person -s (he/she/it)            │
│                                            │
│  Keep an eye out for these! 🎯            │
│  [Start →]                                │
└────────────────────────────────────────────┘
```

---

## 8. Component Map — Modify vs New

### ✏️ MODIFY (existing files)

#### `components/ListeningClient.tsx` — Main surgery

**State additions:**
```typescript
// Thêm vào existing state:
const [sessionPhase, setSessionPhase] = 
  useState<"warmup" | "listen" | "explore" | "speak" | "check">("warmup")
const [checkpointStates, setCheckpointStates] = 
  useState<Record<string, CheckpointState>>({})
const [speakingText, setSpeakingText] = useState("")
const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null)
const [selectedTranscriptLine, setSelectedTranscriptLine] = useState<number | null>(null)
const [sessionWeaknesses, setSessionWeaknesses] = useState<WeaknessNote[]>([])
```

**Step 1 changes:**
- Xóa `<textarea>` + submit button hiện tại
- Thêm `<ChunkCheckpoints>` component

**Step 2 changes:**
- Mỗi transcript line thêm `onClick` + expand state
- Vocab cards: thêm flip state
- Cuối step 2: thêm `<SpeakingFollowUpBox>`

**Step 3 changes:**
- Giữ nguyên text hướng dẫn
- Thêm "I said it!" micro-interaction cho mỗi shadowing line

**Quiz changes:**
- Đổi từ navigation-based sang immediate-feedback
- Sau submit: show `<AriaDebrief>` thay vì static result card

**Tab navigation:**
```
HIỆN TẠI: [1️⃣ Nghe Chay] [2️⃣ Transcript] [3️⃣ Shadowing] [📝 Bài Tập]
MỚI:      Session progress flow (không còn tab tự do click)
          Phases unlock tuần tự: warmup → listen → explore → speak → check
```

> **Lý do bỏ tab tự do:** Cho phép skip làm mất đi emotional journey. User biết "tôi đang ở đâu trong bài học."

#### `components/AITeacherChat.tsx` — Warmup mode mới

Thêm prop `isWarmupMode`:
```typescript
// Khi isWarmupMode = true:
// - Compact card (không full height)
// - Chỉ 1 exchange (AI → User → AI)
// - Sau AI respond lần 2: auto-show [▶ Bắt đầu nghe] button
// - Scripted steps bị disable, 100% Gemini
```

#### `app/api/ai/teacher/route.ts` — 2 prompts mới

```typescript
// Thêm vào switch:
case "warmup":    systemPrompt = buildWarmupPrompt(...)     ; break
case "speaking":  systemPrompt = buildSpeakingPrompt(...)   ; break  // đã có, enhance
case "debrief":   systemPrompt = buildDebriefPrompt(...)    ; break
```

### 🆕 NEW (files mới — tổng ~400 lines)

#### `components/ChunkCheckpoints.tsx` (~120 lines)
- Render checkpoint cards tuần tự
- Local validation (không gọi API)
- Retry → hint → reveal flow
- Emit `onComplete` khi tất cả done

#### `components/SpeakingFollowUpBox.tsx` (~100 lines)
- Textarea với mic icon
- Submit → POST `/api/ai/teacher` mode `speaking`
- Show formatted feedback card
- Inline retry textarea

#### `components/TranscriptLineExpander.tsx` (~80 lines)
- Wrap mỗi dòng transcript
- onClick: expand state
- Show: key phrase note + "Say it!" button
- Flip card cho vocab

#### `components/AriaDebrief.tsx` (~80 lines)
- End-of-session card
- Show score + Aria message (từ Gemini)
- Show saved weaknesses
- Next lesson link

#### `lib/sessionMemory.ts` (~60 lines)
- `saveWeakness()`, `loadWeaknesses()`, `clearSession()`
- `saveSessionRecord()`, `loadSessionRecord()`
- `getPreviousWeaknessesForDisplay()`

#### `lib/checkpoints/unit1.ts` (~30 lines)
- Hardcoded 3 checkpoints cho Unit 1
- Cùng structure → dễ thêm unit khác sau

---

## 9. Minimal Technical Architecture

```
listening/[id]/page.tsx      (Server — giữ y chang, không sửa)
        │ props: lesson, transcript, questions
        │ thêm prop: studentName (fetch từ profile đã có)
        ▼
ListeningClient.tsx          (Client — main hub, sửa nhiều nhất)
  │
  ├── [phase = "warmup"]
  │     AITeacherChat (warmup mode)
  │       └── POST /api/ai/teacher { mode: "warmup" }
  │
  ├── [phase = "listen"]
  │     YouTube embed (giữ nguyên)
  │     ChunkCheckpoints
  │       └── local validation (no API)
  │
  ├── [phase = "explore"]
  │     TranscriptLineExpander (wrap dòng transcript hiện tại)
  │     VocabFlipCards (upgrade vocab section hiện tại)
  │     SpeakingFollowUpBox
  │       └── POST /api/ai/teacher { mode: "speaking" }
  │
  ├── [phase = "check"]
  │     Quiz (immediate feedback mode — modify existing)
  │     AriaDebrief
  │       └── POST /api/ai/teacher { mode: "debrief" }
  │       └── saveSessionRecord() → localStorage
  │
  └── [shared]
        DictionaryPopup (giữ nguyên)
        sessionMemory helpers (localStorage)
```

**Gemini calls per session (max):**
- Warmup: 1 call
- Speaking feedback: 1 call (+ 1 retry nếu user chọn retry)
- Debrief: 1 call
- **Total: 3-4 calls per session** — rất an toàn về quota

---

## 10. Microcopy Examples

### Buttons:

| Context | ❌ Hiện tại | ✅ MVP |
|---|---|---|
| Bắt đầu | "Gửi Tóm Tắt & Tiếp Tục" | "I've watched the video →" |
| Checkpoint đúng | — | "Nice! Next →" |
| Checkpoint sai | — | "Not quite — try again 🔄" |
| Reveal answer | — | "Show me the answer" |
| Speaking submit | — | "Get Aria's take 🎤" |
| Skip speaking | — | "Skip for now" |
| Transcript line | — | "Tap to explore 🔍" |
| Vocab card | — | "Tap to flip 🔄" |
| Session end | "Chọn Bài Học Khác →" | "Next lesson →" + "Ôn lại bài này" |

### Phase headers (thay tab labels):

```
"warmup"  →  "👋 Warm Up · 2 min"
"listen"  →  "🎧 Listen Actively · 8 min"
"explore" →  "🔍 Explore + Practice · 5 min"
"speak"   →  "🗣️ Your Turn · 5 min"
"check"   →  "✅ Quick Check · 5 min"
```

### Progress indicator:
```
● ● ○ ○ ○   (5 dots, filled = done)
"Explore • 5 min left"
```

---

## 11. Mobile-First Considerations

### Layout trên mobile:

```
Mobile (< 768px): Single column, full width phases
Desktop (≥ 1024px): Giữ nguyên 7/5 grid layout

Phase cards: Full width trên mobile
Video: aspect-video (giữ nguyên)
Transcript: max-h không quá cao, scroll tốt
Checkpoints: Card stacks, swipe-friendly
```

### Input considerations:

```typescript
// Textarea auto-resize trên mobile:
<textarea
  rows={2}
  className="resize-none"
  style={{ minHeight: '80px' }}
  onInput={(e) => {
    const el = e.target as HTMLTextAreaElement
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }}
/>
```

### Keyboard UX:
- Khi keyboard popup trên mobile → card scroll lên
- Submit button vẫn visible phía trên keyboard
- `inputMode="text"` explicit cho text areas

### Tap targets:
- Tất cả interactive elements: min `min-h-[44px] min-w-[44px]`
- Transcript lines: padding đủ lớn (`py-3`)
- Vocab cards: min height `h-16`

### Loading states:
```typescript
// Khi gọi Gemini (3-5 giây):
// Không dùng generic spinner
// Dùng text animation thay thế:

const loadingMessages = [
  "Aria is reading your answer... 👀",
  "Thinking... 🤔",
  "Getting feedback ready... ✍️",
]
```

---

## 12. Implementation Roadmap — 14 Ngày

### Week 1: Core Loop (ngày 1-7) — COMPLETED ✅

#### Ngày 1 (2-3h) — Setup + Warmup — DONE
- [x] Thêm `mode: "warmup"` vào `/api/ai/teacher/route.ts` với warmup system prompt
- [x] Sửa `AITeacherChat.tsx` nhận `isWarmupMode` prop
- [x] Warmup compact card: 1 AI message → user input → AI respond → button
- [x] Test với Unit 1 data

#### Ngày 2 (3h) — Chunk Checkpoints — DONE
- [x] Tạo `lib/checkpoints/unit1.ts` với 3 checkpoints
- [x] Build `ChunkCheckpoints.tsx`: 3 cards, sequential unlock
- [x] Local validation logic (`checkAnswer()` function)
- [x] Retry → hint → reveal flow (không gọi Gemini)

#### Ngày 3 (2h) — Wire Phase Flow — DONE
- [x] Thêm `sessionPhase` state vào `ListeningClient.tsx`
- [x] Thay tabs bằng phase-based flow
- [x] Phase progress indicator (5 dots)
- [x] Warmup → Listen transition

#### Ngày 4 (3h) — Interactive Transcript — DONE
- [x] Build `TranscriptLineExpander.tsx`
- [x] Wrap transcript lines trong `ListeningClient` Step 2
- [x] Expand on click: key phrase note + "Say it!" button
- [x] Vocab cards: thêm flip state

#### Ngày 5 (3h) — Speaking Follow-up — DONE
- [x] Thêm `mode: "speaking"` vào route với enhanced speaking prompt
- [x] Build `SpeakingFollowUpBox.tsx`
- [x] Integrate vào Step 2 (sau transcript)
- [x] Test feedback quality với Unit 1 topic

#### Ngày 6 (2h) — Quiz Upgrade — DONE
- [x] Đổi quiz từ navigation-based sang immediate feedback
- [x] Show quote từ transcript sau câu sai
- [x] Retry wrong questions only (filter + re-render)

#### Ngày 7 (2h) — Buffer + Testing — DONE
- [x] End-to-end test full session
- [x] Fix bugs, edge cases (empty input, API timeout)
- [x] Loading states quality check

---

### Week 2: Memory + Polish (ngày 8-14) — COMPLETED ✅

#### Ngày 8 (2h) — Session Memory — DONE
- [x] Build `lib/sessionMemory.ts` (localStorage helpers)
- [x] Lưu weakness khi: checkpoint sai lần 2, quiz sai
- [x] Previous weakness note khi vào lại bài

#### Ngày 9 (3h) — Aria Debrief — DONE
- [x] Thêm `mode: "debrief"` vào route
- [x] Build `AriaDebrief.tsx` component
- [x] Wire sau quiz completion
- [x] Save session record vào localStorage

#### Ngày 10 (2h) — Listening page server update — DONE
- [x] Pass `studentName` xuống `ListeningClient` (đã có trong profile fetch)
- [x] Pass unit number để load đúng checkpoints
- [x] Error boundaries cho mọi Gemini calls

#### Ngày 11 (2h) — Mobile Polish — DONE
- [x] Test toàn bộ flow trên mobile viewport
- [x] Fix keyboard/scroll issues
- [x] Touch targets audit

#### Ngày 12 (2h) — Microcopy Pass — DONE
- [x] Thay hết button labels theo bảng microcopy
- [x] Loading messages rotation
- [x] Error states friendly messages

#### Ngày 13 (2h) — Edge Cases — DONE
- [x] Gemini timeout → graceful fallback (không block session)
- [x] localStorage unavailable → silent fail
- [x] Transcript missing → checkpoint fallback

#### Ngày 14 (2h) — Final QA — DONE
- [x] Test Unit 1 full session từ đầu đến cuối
- [x] Test trên 3 kịch bản: đúng hết, sai hết, bỏ qua
- [x] Kiểm tra quota Gemini không bị burn quá mức

---

## Critical Success Check

Sau 2 tuần, test bằng cách tự làm 1 session hoàn chỉnh và trả lời:

- [ ] Phút đầu tiên có cảm giác "AI đang nói chuyện với mình" không?
- [ ] Có bao giờ ngồi chờ >30 giây không có gì xảy ra không?
- [ ] Sau checkpoint sai, có cảm thấy được hướng dẫn không (vs bị phán xét)?
- [ ] Speaking prompt có cảm giác cá nhân không (vs generic)?
- [ ] Cuối session có biết mình cần improve gì không?

Nếu cả 5 đều YES → MVP thành công.
