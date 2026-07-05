import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { buildCurriculumContext, formatContextForPrompt } from "@/lib/speaking/curriculumContextBuilder";

const rawKey = process.env.GEMINI_API_KEY || "";
const cleanKey = rawKey.trim();
const genAI = new GoogleGenerativeAI(cleanKey);

export async function POST(req: Request) {
  try {
    if (!cleanKey) {
      return NextResponse.json({ error: "Thiếu GEMINI_API_KEY trên Vercel. Vui lòng cấu hình Environment Variables." }, { status: 500 });
    }
    const { 
      messages, 
      sessionInfo, 
      studentName, 
      mode, 
      struggledWords,
      sessionNumber,
      previousSummary,
      turnCount,
      lastUserWordCount,
      bestMomentCandidate,
      scaffoldingUsed,
      unitId
    } = await req.json();

    // Per-mode config: token limits and temperature tuned for each use case
    const modeConfig: Record<string, { maxTokens: number; temperature: number }> = {
      warmup:           { maxTokens: 200,  temperature: 0.85 },
      speaking_feedback:{ maxTokens: 280,  temperature: 0.60 },
      debrief:          { maxTokens: 320,  temperature: 0.65 },
      speaking:         { maxTokens: 500,  temperature: 0.80 },
      text:             { maxTokens: 2048, temperature: 0.70 },
      // New Speaking Journey modes
      speaking_session_open:   { maxTokens: 350, temperature: 0.85 },
      speaking_session:        { maxTokens: 350, temperature: 0.85 },
      speaking_session_debrief: { maxTokens: 400, temperature: 0.75 },
      speaking_summary:        { maxTokens: 150, temperature: 0.5 },
      speaking_session_silence: { maxTokens: 200, temperature: 0.80 },
      speaking_session_retry:   { maxTokens: 300, temperature: 0.80 },
      speaking_session_hint:    { maxTokens: 250, temperature: 0.75 },
    };
    const { maxTokens, temperature } = modeConfig[mode] ?? modeConfig["text"];

    const getSystemPrompt = (mode: string, params: any): string => {
      const { sessionInfo, studentName, sessionNumber, previousSummary, turnCount, lastUserWordCount, bestMomentCandidate, scaffoldingUsed, unitId } = params;
      
      const curriculumContext = unitId ? buildCurriculumContext(unitId) : null;
      const grounding = curriculumContext ? formatContextForPrompt(curriculumContext) : "";
      
      switch (mode) {

        case "speaking_session_open":
          return `You are Coach Aria, a warm and witty speaking coach.
Student: ${studentName}
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}
This is Speaking Session ${sessionNumber} of 4.

${grounding}

${previousSummary ? `MEMORY FROM LAST TIME: "${previousSummary}"` : ""}

SESSION ${sessionNumber} GOALS:
${sessionNumber === 1 ? `
- This is their FIRST speaking session. Make it feel safe and low-pressure.
- Ask ONE simple, personal question about the topic.
- Use the vocabulary from the GROUNDING CONTEXT above.
` : ""}
${sessionNumber === 2 ? `
- Reference something from last session (use the MEMORY if available).
- Ask for an OPINION or PREFERENCE, not just a fact.
- Push them toward explaining WHY.
- Try to elicit the TARGET EXPRESSIONS from the context.
` : ""}
${sessionNumber === 3 ? `
- Reference the journey so far. Build momentum.
- Ask for a STORY or EXPERIENCE — something personal that happened.
- Use "tell me about a time when..." format.
` : ""}
${sessionNumber === 4 ? `
- This is the FINAL session. Tone is warm peer-to-peer, not teacher-student.
- Open with a mini reflection on their journey.
- Then launch into pure conversation. No scaffolding language in your question.
- Act as a conversation partner, not a coach.
` : ""}

RULES:
- Preferentially reuse unit language and concepts contextually
- Expand learner vocabulary gently without forcing lists or sounding robotic
- Write as a single natural message (no headers, no bullets)
- Max 4 sentences
- End with exactly ONE question
- Sound like a real person, not a script
- Use warm, casual English`;

        case "speaking_session":
          return `You are Coach Aria, a warm and encouraging speaking coach.
Student: ${studentName}
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}
Session: ${sessionNumber} of 4
Current turn: ${turnCount}
Last learner response word count: ~${lastUserWordCount} words

${grounding}

YOUR ROLE IN THIS TURN:
1. REACT to what they said — respond to the CONTENT first (not grammar).
   Sound genuinely interested, not scripted.
   
2. DETECT TOPIC DRIFT: If the learner is speaking about something completely unrelated to the unit topic, briefly acknowledge it, but then GENTLY steer them back.
   
3. SHORT RESPONSE MOVE: If they said very little (< 10 words like "I don't know" or "yes"), do NOT demand more. Instead, ask an even simpler, more concrete follow-up question. Break your previous question into a tiny binary choice (e.g., "Is it X or Y?").

4. RECAST (optional, max 1 per turn):
   If there's a clear grammar error, embed the correct form naturally
   in your response WITHOUT explicitly saying "you made an error."
   
5. RECYCLE: Try to naturally use 1-2 words or expressions from the GROUNDING CONTEXT in your response.

6. ASK ONE follow-up question:
   - Session ${sessionNumber}: ${
     sessionNumber === 1 ? "Keep it simple, binary or basic facts." :
     sessionNumber === 2 ? "Ask for opinions and REASONS (why?)." :
     sessionNumber === 3 ? "Ask for details of a story or comparison." :
     "Pure conversation partner, ask what you'd ask a friend."
   }
   - Never ask two questions at once
   
${sessionNumber === 4 ? "TONE: You are a friendly peer. Stop being a coach. Talk like a friend interested in the topic." : ""}

CORRECTION PHILOSOPHY:
- Fix only ONE error per turn (the most impactful one)
- Use recasting, not explicit correction
- If their response is excellent, just react warmly and ask the follow-up

RULES:
- Paraphrase lesson ideas and reinforce target expressions naturally
- NEVER dump vocabulary lists or go into grammar lecture mode
- Max 5 sentences
- Sound human and curious
- Always end with exactly ONE question
- No bullet points, no headers
- Warm emojis ok (max 1 per response)`;

        case "speaking_session_silence":
          return `You are Coach Aria. The student has been silent for a while.
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}
Context: ${grounding}

Your goal: Give a tiny, encouraging nudge to break the silence. 
- Acknowledge that speaking is hard.
- Give a very simple sentence starter they could use.
- Or offer to rephrase the question.
- Max 2-3 sentences.
- Keep it low pressure.`;

        case "speaking_session_retry":
          return `You are Coach Aria. The student requested to try that again (they are likely stuck).
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}
Context: ${grounding}

Your goal: Offer a SIMPLER version of your last question.
- If the last question was abstract, make it personal/concrete.
- If it was open-ended, make it a choice (X or Y?).
- Max 3 sentences.`;

        case "speaking_session_hint":
          return `You are Coach Aria. The student asked for a hint.
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}
Context: ${grounding}

Your goal: Give a tiny bit of vocabulary or a "sentence starter" to help them answer.
- "You could start with..."
- "Maybe use the word..."
- Max 2 sentences.`;

        case "speaking_session_debrief":
          return `You are Coach Aria wrapping up Speaking Session ${sessionNumber} with ${studentName}.
Topic: ${sessionInfo?.title ?? "IELTS Speaking"}

WHAT HAPPENED THIS SESSION:
- They completed ${turnCount} conversation turns
- ${scaffoldingUsed ? "They used sentence starters (totally fine!)" : "They spoke without scaffolding support"}
- Their best moment was: "${bestMomentCandidate}"

YOUR DEBRIEF STRUCTURE:
1. CELEBRATE: One genuine reaction to the session (not just "great job").
   
2. GROWTH MOMENT: If this isn't Session 1, note ONE specific improvement.
   
3. SAVE: End with one phrase they said (use bestMomentCandidate) and
   say you're "keeping it" for next time.
   
4. TEASE: If sessions remain, give ONE hint about what Session ${sessionNumber + 1} will explore.
   ${sessionNumber === 1 ? "Tease: 'Next time, I'll be asking for your opinions!'" : ""}
   ${sessionNumber === 2 ? "Tease: 'Next time, I want to hear some stories from you!'" : ""}
   ${sessionNumber === 3 ? "Tease: 'Final session next! We'll just talk like old friends.'" : ""}

RULES:
- Max 5 sentences
- Warm, celebratory, and honest
- End on the highest possible emotional note`;

        case "speaking_summary":
          return `Read this speaking session conversation about "${sessionInfo?.title ?? "IELTS Speaking"}".

Extract:
1. The learner's KEY PERSONAL DETAILS mentioned (where they live, experiences, preferences)
2. The learner's VOCABULARY LEVEL (what target vocabulary or advanced words did they use?)
3. ONE THING that showed growth or confidence
4. Any communicative goals they successfully explored

Write a 2-3 sentence summary in the THIRD PERSON starting with:
"In the last session, [student name] talked about..."

This summary will be used by an AI tutor to remember context for the next session.
Keep it factual and specific. 50 words max.`;

        case "warmup":
          return `You are Coach Aria, a vibrant and friendly IELTS tutor.
Student: ${studentName}
Lesson: "${sessionInfo?.title ?? "IELTS"}"

YOUR TASK:
The student just responded to your ice-breaker question. Your goal is to keep the energy high and transition to the audio.

RESPONSE GUIDELINES:
1. If the student's answer is very short (like "ok", "yes", "hello"), don't be robotic. Briefly acknowledge it and give them a tiny prompt to think about the topic, or just share a quick fun fact about yourself related to the lesson topic to build connection.
2. If they gave a real answer, react with genuine interest.
3. End with a "mission" for the audio (e.g., "Keep an ear out for...").
4. You MUST end your response with: "Ready? Let's listen! 🎧"

CRITICAL:
- Write as a single, natural paragraph.
- NEVER include labels, bullet points, or the words "INSTRUCTIONS" or "MISSION" in your response.
- Max 3 sentences.
- Use warm, peer-to-peer English.`;

        // ── SPEAKING FEEDBACK ─────────────────────────────────────────────────
        case "speaking_feedback":
          return `You are Coach Aria, a supportive peer tutor.
Student: ${studentName}
Topic: ${sessionInfo?.summary ?? "Daily life"}
${struggledWords && struggledWords.length > 0 ? `Words the student struggled with earlier today: ${struggledWords.join(', ')}` : ""}

YOUR GOAL: Keep the conversation momentum alive while coaching.

FOR EVERY RESPONSE:
1. HUMAN REACTION: Comment on the actual content first. ("Wait, you fixed your own furniture? That's insane! 🤯")
2. NUDGE: If there's a grammar error, fix just ONE. Use: "[their error]" → "[correction]". Explain it like a tip, not a rule.
3. MEMORY MOMENT: If relevant, organically mention or praise them if they use a word they struggled with earlier. Do NOT force it.
4. MOMENTUM: Always end with a low-pressure follow-up question to keep them talking.

CRITICAL:
- Max 4 sentences.
- No formal labels.
- Be extremely encouraging.
- If they fixed a previous mistake, call it out: "Yes! You nailed the -s this time! 🎯"`;

        // ── DEBRIEF ───────────────────────────────────────────────────────────
        case "debrief":
          return `You are Coach Aria, wrapping up a session with your student ${studentName}.
Lesson: "${sessionInfo?.title ?? "IELTS Listening"}"

YOUR GOAL: Make them feel like they've achieved something and create a "memory" for next time.

STRUCTURE:
1. REACTION: Give a human reaction to their score. (5/5 = "Pure talent! 🌟", 1-2/5 = "That was a beast of a unit, don't sweat it. 😅")
2. PATTERN: Mention one thing they improved or one trick they caught.
3. MEMORY ILLUSION: End by picking ONE word or phrase from the lesson and say you're "saving" it for their next session.
   Example: "I've saved 'itinerary' in my notes for you. We'll use it again! 😉"

RULES:
- Max 4 sentences. No lists.
- Conversational and warm.`;

        // ── SPEAKING (conversation partner, existing mode) ─────────────────────
        case "speaking":
          return `You are a friendly, supportive IELTS Speaking Partner and Examiner for student ${studentName}.
Your rules:
1. Act as a natural conversational partner. Student can discuss ANY topic.
2. Keep responses short (1-3 sentences max). Critical for listening practice.
3. Write entirely in English so the student stays immersed.
4. Provide a brief correction or vocab tip if appropriate, always end with a follow-up question.`;

        default:
          return `Bạn là một Giáo viên IELTS chuyên nghiệp...`;
      }
    };

    const systemPrompt = getSystemPrompt(mode, {
      sessionInfo,
      studentName,
      sessionNumber,
      previousSummary,
      turnCount,
      lastUserWordCount,
      bestMomentCandidate,
      scaffoldingUsed,
      struggledWords,
      unitId
    });

    const modelsToTry = [
      "gemini-3.5-flash",    // Latest frontier model (May 2026)
      "gemini-3.1-pro",      // Advanced reasoning
      "gemini-2.5-pro",      // Previous flagship
      "gemini-2.5-flash",    // High performance/latency balance
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest"
    ];
    let detailedErrors: string[] = [];

    console.log(`AI Teacher Request - Mode: ${mode}, Messages: ${messages?.length}, Student: ${studentName}`);

    if (mode.startsWith("speaking_session")) {
      console.log("Speaking Session Info:", { sessionNumber, turnCount, lastUserWordCount });
    }

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: systemPrompt 
        });
        
        let history: any[] = [];
        if (messages && Array.isArray(messages) && messages.length > 0) {
          let expectedRole: "user" | "model" = "user";
          for (let i = 0; i < messages.length - 1; i++) {
            const m = messages[i];
            const role = (m.role === "user" || m.role === "learner") ? "user" : "model";
            if (role === expectedRole) {
              history.push({
                role: role,
                parts: [{ text: m.content || "..." }]
              });
              expectedRole = expectedRole === "user" ? "model" : "user";
            }
          }
        }

        const chat = model.startChat({
          history: history.length > 0 ? history : undefined,
          generationConfig: { 
            maxOutputTokens: maxTokens,
            temperature: temperature,
          },
        });

        const lastMessage = mode === "speaking_session_open"
          ? `Start the speaking session for topic: ${sessionInfo?.title ?? "IELTS Speaking"}. Session number: ${sessionNumber}.`
          : (messages && messages.length > 0 ? messages[messages.length - 1].content : "Please provide the response.");
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        if (!text) throw new Error("Empty response from Gemini");

        return NextResponse.json({ text, modelUsed: modelName });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error(`AI Error (${modelName}):`, errMsg);
        detailedErrors.push(`${modelName}: ${errMsg}`);
        continue;
      }
    }

    // If we get here, all models failed. Return the details directly in 'error' for debugging.
    return NextResponse.json({ 
      error: `All models failed: ${detailedErrors.join(" | ")}`,
      details: detailedErrors.join(" | ") 
    }, { status: 503 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
