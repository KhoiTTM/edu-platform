import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch recent activity (Last 10 sessions)
    const { data: sessions } = await supabase
      .from("learning_sessions")
      .select("subject_slug, started_at, summary_metrics")
      .eq("user_id", user.id)
      .order("started_at", { ascending: false })
      .limit(10);

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ insight: "Bắt đầu bài học đầu tiên để Aria có thể đưa ra nhận xét cho bạn nhé! ✨" });
    }

    // 2. Prepare prompt
    const activitySummary = sessions.map(s => {
      const date = new Date(s.started_at).toLocaleDateString();
      return `- Ngày ${date}: Học môn ${s.subject_slug}. Kết quả: ${JSON.stringify(s.summary_metrics)}`;
    }).join("\n");

    const prompt = `Bạn là Coach Aria, một người đồng hành học tập ấm áp và thông minh. 
Dưới đây là nhật ký học tập gần đây của học sinh:
${activitySummary}

Hãy viết một câu nhận xét ngắn gọn (tối đa 2 câu) để động viên học sinh. 
Yêu cầu:
- Ngôn ngữ: Tiếng Việt.
- Tông giọng: Truyền cảm hứng, mang tính cá nhân, thân thiện.
- KHÔNG nhắc lại các con số thống kê thô khan. 
- Hãy tập trung vào sự nỗ lực hoặc một lời khuyên nhẹ nhàng.
Ví dụ: "Mình thấy bạn đang rất kiên trì với môn IELTS, hãy tiếp tục phát huy phong độ này nhé!"`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const insight = result.response.text().trim();

    // 3. Save to DB (Cache)
    await supabase.from("user_dashboard_stats").upsert({
      user_id: user.id,
      last_ai_insight: insight,
      last_ai_insight_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return NextResponse.json({ insight });
  } catch (err: any) {
    console.error("AI Insight Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
