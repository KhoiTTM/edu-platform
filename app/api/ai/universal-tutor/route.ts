import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { buildUniversalContext, formatUniversalContextForPrompt } from "@/lib/ai/universalContextBuilder";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nodeId, questionId, userAnswer, mode } = await req.json();

    // 1. Build hyper-focused context
    const ctx = await buildUniversalContext(user.id, nodeId, questionId);
    if (!ctx) {
      return NextResponse.json({ error: "Could not build learning context" }, { status: 500 });
    }

    const grounding = formatUniversalContextForPrompt(ctx);

    const actionContext = mode === "hint" 
      ? (userAnswer ? `The learner is stuck and their current attempt is "${userAnswer}".` : "The learner is stuck and hasn't attempted an answer yet.")
      : `The learner just answered "${userAnswer}" and it was WRONG.`;

    // 2. Prepare AI System Prompt
    const systemPrompt = `You are Aria, a warm, witty, and highly effective AI tutor.
Your mission is to help the learner understand the target concept WITHOUT just giving them the final answer.

${grounding}

USER ACTION:
${actionContext}

YOUR GOAL IN THIS TURN:
- If mode is "hint": Give a tiny, encouraging nudge or a "Look at X" tip to help them find the right path.
- If mode is "explanation": Explain WHY their specific answer might be wrong, focusing on the Concept. 
- Use the "Standard Explanation" above as a technical reference but sound like a human tutor.
- Use Vietnamese as the primary language.
- Keep it under 3 sentences.
- Be encouraging, concise, and growth-oriented.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text().trim();

    return NextResponse.json({ text: responseText });
  } catch (err: any) {
    console.error("Universal Tutor Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
