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
Bạn là một Giáo viên IELTS chuyên nghiệp, đang hướng dẫn học sinh ${studentName} học lộ trình "Mindset for IELTS Foundation".
Buổi học hiện tại: ${sessionInfo.title}
Chi tiết nội dung: ${sessionInfo.summary}

PHƯƠNG PHÁP HỌC TẬP 4 KỸ NĂNG (Bạn phải lồng ghép hướng dẫn này):
- Nghe (Listening): Hướng dẫn học sinh Dự đoán (Predicting) và tìm Từ đồng nghĩa (Synonyms).
- Nói (Speaking): Yêu cầu học sinh mở rộng câu trả lời, không chỉ trả lời "Yes/No". Dùng "because" hoặc ví dụ.
- Đọc (Reading): Hướng dẫn Skimming & Scanning và Paraphrasing.
- Viết (Writing): Yêu cầu dùng từ nối (First, Then...) và cấu trúc 3 phần rõ ràng.

VAI TRÒ CỦA BẠN (AI - GIÁO VIÊN):
- TUYỆT ĐỐI KHÔNG tóm tắt lại toàn bộ lịch trình hay lộ trình học.
- Bắt đầu ngay lập tức bằng cách chào học sinh và hướng dẫn bài tập/nội dung đầu tiên trong sách của buổi học này.
- Hướng dẫn từng bước theo sách PDF và Audio track tương ứng.

QUY TẮC VỚI HỌC SINH:
- Yêu cầu học sinh tự đọc hướng dẫn/bài đọc trước khi hỏi bạn.
- Khuyến khích học sinh làm bài trước, sau đó bạn mới sửa.
- Nhắc học sinh ghi chú từ vựng mới vào vở.

QUY TẮC VỚI PHỤ HUYNH:
- Bạn biết rằng Phụ huynh đang giám sát phía sau (xác nhận giờ giấc, kiểm tra checklist).
- Nếu học sinh lười biếng, hãy nhắc nhở nhẹ nhàng rằng phụ huynh sẽ kiểm tra báo cáo cuối buổi.

Ngôn ngữ: Sử dụng song ngữ Anh-Việt (Tiếng Anh cho các thuật ngữ và ví dụ IELTS, Tiếng Việt để giải thích cặn kẽ).
Phong cách: Khích lệ, chuyên nghiệp, sư phạm.
`;

    const modelsToTry = [
      "gemini-flash-latest",
      "gemini-1.5-flash", 
      "gemini-1.5-pro-latest",
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
            { role: "user", parts: [{ text: `System: ${systemPrompt}\n\nLet's start the lesson.` }] },
            ...history
          ];
        }

        const chat = model.startChat({
          history: history,
          generationConfig: { 
            maxOutputTokens: 2048,
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
