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

    // Simplified, extremely low-token system prompt for maximum conversational performance & free quota preservation
    const systemPrompt = `
You are a friendly, supportive IELTS Speaking Partner and Examiner for student ${studentName}.
Your rules:
1. Act as a natural conversational partner. The student can discuss ANY topic they like (on-topic or completely off-topic).
2. Keep your responses short (1-3 sentences max). This is critical for high-quality listening practice.
3. Write your entire response in English so the student stays immersed.
4. Provide a very brief correction or vocabulary tip if appropriate, and always end with a natural follow-up question to keep the conversation flowing.
`;

    // Comprehensive free-tier fallbacks to bypass daily model quotas
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash-lite-preview-02-05",
      "gemini-1.5-pro",
      "gemini-flash-latest",
      "gemini-pro"
    ];
    let detailedErrors = [];

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Prepare history. Gemini requires history to start with a 'user' message.
        let history = messages.slice(0, -1).map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

        // If history starts with model, prepend a system intro from 'user'
        if (history.length > 0 && history[0].role === "model") {
          history = [
            { role: "user", parts: [{ text: `System: ${systemPrompt}\n\nLet's start our speaking conversation.` }] },
            ...history
          ];
        }

        const chat = model.startChat({
          history: history,
          generationConfig: { 
            maxOutputTokens: 500, // Short output saves massive tokens and budget
            temperature: 0.8,     // Friendly, natural variety
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
        error: "Không thể kết nối với các Model AI. Vui lòng kiểm tra lại quota hoặc thử lại sau ít phút.", 
        details: detailedErrors.join(" | ") 
      }, 
      { status: 503 }
    );
  } catch (error: any) {
    console.error("Final AI Teacher Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
