import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages, sessionInfo, studentName } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
- Use a mix of English and Vietnamese to ensure clarity (mostly English for IELTS content, Vietnamese for complex explanations).
- Follow the core strategies provided in the curriculum.
- If the student asks something outside of the lesson, politely bring them back to the topic.
- Do not just give answers; guide the student to find them.

Core Strategies to emphasize:
- Listening: Predicting, Synonyms.
- Speaking: Extending answers (using 'because', 'for example'), Smart notes.
- Reading: Skimming & Scanning, Paraphrasing.
- Writing: Sequencing words, Clear structure (Intro, Body, Conclusion).

Maintain a conversation history and act based on the student's last input.
`;

    const chat = model.startChat({
      history: messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // We prepend the system prompt to the first message if history is empty, 
    // or we can just use the system prompt logic. 
    // For simplicity with Gemini chat, we'll use a single prompt if it's the first message.
    
    const result = await chat.sendMessage(messages.length === 1 ? `${systemPrompt}\n\nStudent: ${messages[0].content}` : messages[messages.length - 1].content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Teacher Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
