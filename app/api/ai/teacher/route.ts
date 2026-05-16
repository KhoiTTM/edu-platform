import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages, sessionInfo, studentName } = await req.json();

    const systemPrompt = `
You are an expert IELTS Teacher. You are guiding a student named ${studentName} through the "Mindset for IELTS Foundation" curriculum.
Current Session: ${sessionInfo.title}
Session Details: ${sessionInfo.summary}

Your Role:
1. IELTS Teacher:
   - Guide the student step-by-step through the textbook pages mentioned in the session.
   - Explain grammar, vocabulary, and core strategies (Predicting, Skimming/Scanning, Paraphrasing).
   - Ask concept-check questions to ensure understanding.
   - Grade writing tasks and provide constructive feedback.
   - Assign homework at the end of the session.

Rules:
- Be encouraging, professional, and patient.
- Use a mix of English and Vietnamese to ensure clarity.
- Do not just give answers; guide the student to find them.
`;

    const modelsToTry = [
      "gemini-2.0-flash", 
      "gemini-1.5-flash", 
      "gemini-1.5-flash-latest", 
      "gemini-1.5-pro"
    ];
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const chat = model.startChat({
          history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          })),
          generationConfig: { 
            maxOutputTokens: 1000,
            temperature: 0.7,
          },
        });

        const lastMessage = messages[messages.length - 1].content;
        const prompt = messages.length === 1 ? `${systemPrompt}\n\nStudent: ${lastMessage}` : lastMessage;

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) throw new Error("Empty response from AI");

        return NextResponse.json({ text, modelUsed: modelName });
      } catch (err: any) {
        console.error(`Error with model ${modelName}:`, err.message);
        lastError = err;
        // Continue to next model if this one fails
        continue;
      }
    }

    // If we get here, all models failed
    const errorMessage = lastError?.message || "Unknown error";
    console.error("All AI models failed. Last error:", errorMessage);
    
    return NextResponse.json(
      { error: "Hệ thống AI đang quá tải (Rate Limit). Vui lòng thử lại sau 30 giây.", details: errorMessage }, 
      { status: 503 }
    );
  } catch (error: any) {
    console.error("Final AI Teacher Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
