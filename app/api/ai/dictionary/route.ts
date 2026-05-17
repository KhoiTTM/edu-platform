import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const rawKey = process.env.GEMINI_API_KEY || "";
const cleanKey = rawKey.trim();
const genAI = new GoogleGenerativeAI(cleanKey);

export async function POST(req: Request) {
  try {
    if (!cleanKey) {
      return NextResponse.json(
        { error: "Thiếu GEMINI_API_KEY trên Vercel. Vui lòng cấu hình Environment Variables." },
        { status: 500 }
      );
    }
    const { query } = await req.json();

    if (!query || !query.trim()) {
      return NextResponse.json({ error: "Vui lòng nhập từ khóa tra cứu." }, { status: 400 });
    }

    const systemPrompt = `
Bạn là một Trợ lý Từ điển Anh - Việt thông minh, thân thiện và đáng yêu dành cho học sinh tiểu học (Lớp 3).
Nhiệm vụ của bạn là tra cứu từ/cụm từ mà học sinh nhập vào:
- Nếu học sinh gõ từ tiếng Anh: Hãy dịch sang tiếng Việt.
- Nếu học sinh gõ từ tiếng Việt: Hãy dịch sang tiếng Anh.

Định dạng câu trả lời của bạn phải thật rõ ràng, ngộ nghĩnh và dễ học (sử dụng Markdown đẹp mắt, có emoji):

1. **Từ tra cứu & Phát âm**: [Từ gốc] - [Phiên âm chuẩn dễ đọc và phiên âm ngộ nghĩnh kiểu tiếng Việt để bé dễ nhẩm theo]
2. **Từ loại**: (Danh từ, Động từ, Tính từ...)
3. **Nghĩa tiếng Việt/tiếng Anh**: Nghĩa chính ngắn gọn, dễ hiểu.
4. **2 Ví dụ vui nhộn (Vừa Anh vừa Việt)**: Đặt câu ví dụ cực kỳ đáng yêu, dễ thương gắn liền với các hoạt động của học sinh (đá bóng, đọc sách, kẹo ngọt, thú cưng...)
5. **Gợi ý từ liên quan (Related words)**: 2-3 từ liên quan đơn giản để bé học thêm.

Hãy giữ câu trả lời ngắn gọn, trực quan, sinh động để bé không bị nản lòng khi đọc nhé!
`;

    const modelName = "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nTừ tra cứu của học sinh: "${query}"` }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
      },
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Không có phản hồi từ AI.");
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Dictionary API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
