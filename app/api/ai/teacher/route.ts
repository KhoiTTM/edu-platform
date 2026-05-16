import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const rawKey = process.env.GEMINI_API_KEY || "";
const cleanKey = rawKey.trim();
const genAI = new GoogleGenerativeAI(cleanKey);

export async function POST(req: Request) {
  try {
    if (!cleanKey) {
      return NextResponse.json({ error: "Thiếu GEMINI_API_KEY trên Vercel. Vui lòng cấu hình Environment Variables." }, { status: 500 });
    }
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
      "gemini-1.5-flash", 
      "gemini-1.5-pro",
      "gemini-pro"
    ];
    let detailedErrors = [];

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

        if (!text) throw new Error("Empty response");

        return NextResponse.json({ text, modelUsed: modelName });
      } catch (err: any) {
        console.error(`Error with model ${modelName}:`, err.message);
        detailedErrors.push(`${modelName}: ${err.message}`);
        continue;
      }
    }

    return NextResponse.json(
      { 
        error: "Không thể kết nối với các Model AI. Vui lòng kiểm tra API Key hoặc khu vực địa lý.", 
        details: detailedErrors.join(" | ") 
      }, 
      { status: 503 }
    );
  } catch (error: any) {
    console.error("Final AI Teacher Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
