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
    const { messages, sessionInfo, studentName, mode } = await req.json();

    // 1. System Prompt for Text/Syllabus Chat Mode (Song ngữ Anh-Việt, bám sát bài học, viết chi tiết đầy đủ)
    const systemPromptText = `
Bạn là một Giáo viên IELTS chuyên nghiệp và giàu kinh nghiệm, đang hướng dẫn học sinh ${studentName} học lộ trình "Mindset for IELTS Foundation".
Buổi học hiện tại: ${sessionInfo.title}
Chi tiết nội dung: ${sessionInfo.summary}

PHƯƠNG PHÁP HỌC TẬP 4 KỸ NĂNG (Lồng ghép hướng dẫn):
- Nghe (Listening): Hướng dẫn học sinh Dự đoán (Predicting) và tìm Từ đồng nghĩa (Synonyms).
- Nói (Speaking): Yêu cầu học sinh mở rộng câu trả lời, không chỉ trả lời "Yes/No". Dùng "because" hoặc ví dụ.
- Đọc (Reading): Hướng dẫn Skimming & Scanning và Paraphrasing.
- Viết (Writing): Yêu cầu dùng từ nối (First, Then...) và cấu trúc 3 phần rõ ràng.

VAI TRÒ CỦA BẠN (AI - GIÁO VIÊN):
- Bạn cần viết các câu trả lời đầy đủ, chi tiết, giảng giải cặn kẽ từng từ vựng mới, cấu trúc ngữ pháp hay và phương pháp làm bài tập. Không được viết ngắn gọn hời hợt. Hãy giải thích sâu sắc để học sinh hiểu bài tốt nhất.
- Bắt đầu bằng cách chào học sinh và giới thiệu bài học một cách chi tiết, nêu rõ mục tiêu và các nội dung chính cần hoàn thành.
- Hướng dẫn từng bước, đưa ra ví dụ minh họa phong phú và đặt câu hỏi tương tác thú vị.
- Ngôn ngữ: Sử dụng song ngữ Anh-Việt (Tiếng Anh cho các thuật ngữ và ví dụ IELTS, Tiếng Việt để giải thích sâu sắc và cặn kẽ).
- Phong cách: Khích lệ, chuyên nghiệp, sư phạm, giàu tri thức.
`;

    // 2. System Prompt for IELTS Speaking Mode (100% Tiếng Anh, tự do giao tiếp nói, ngắn gọn)
    const systemPromptSpeaking = `
You are a friendly, supportive IELTS Speaking Partner and Examiner for student ${studentName}.
Your rules:
1. Act as a natural conversational partner. The student can discuss ANY topic they like (on-topic or completely off-topic).
2. Keep your responses short (1-3 sentences max). This is critical for high-quality listening practice.
3. Write your entire response in English so the student stays immersed.
4. Provide a very brief correction or vocabulary tip if appropriate, and always end with a natural follow-up question to keep the conversation flowing.
`;

    const systemPrompt = mode === "speaking" ? systemPromptSpeaking : systemPromptText;

    // Comprehensive free-tier fallbacks, PRIORITIZING "gemini-flash-latest" as requested
    const modelsToTry = [
      "gemini-flash-latest", // Prioritized first
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash-lite-preview-02-05",
      "gemini-1.5-pro",
      "gemini-pro"
    ];
    let detailedErrors = [];

    for (const modelName of modelsToTry) {
      try {
        // Instantiate the model with native, high-performance system instructions
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: systemPrompt 
        });
        
        // Prepare history and strictly enforce alternating roles starting with 'user' to prevent Gemini validation errors
        let history: any[] = [];
        let expectedRole: "user" | "model" = "user";
        
        for (let i = 0; i < messages.length - 1; i++) {
          const m = messages[i];
          const mappedRole = m.role === "user" ? "user" : "model";
          if (mappedRole === expectedRole) {
            history.push({
              role: mappedRole,
              parts: [{ text: m.content || "..." }]
            });
            expectedRole = expectedRole === "user" ? "model" : "user";
          }
        }

        const chat = model.startChat({
          history: history,
          generationConfig: { 
            maxOutputTokens: mode === "speaking" ? 500 : 2048,
            temperature: mode === "speaking" ? 0.8 : 0.7,
          },
        });

        const prompt = messages[messages.length - 1].content;
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
