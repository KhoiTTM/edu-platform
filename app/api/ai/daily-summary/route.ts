import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const rawKey = process.env.GEMINI_API_KEY || "";
const cleanKey = rawKey.trim();
const genAI = new GoogleGenerativeAI(cleanKey);

export async function GET(req: Request) {
  try {
    if (!cleanKey) {
      return NextResponse.json({ error: "Thiếu GEMINI_API_KEY" }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, grade")
      .eq("id", user.id)
      .single();

    const studentName = profile?.display_name?.split(" ")[0] || "em";
    const grade = profile?.grade || 3;

    // Fetch dashboard stats
    const { data: stats } = await supabase
      .from("user_dashboard_stats")
      .select("subject_progress, current_streak")
      .eq("user_id", user.id)
      .single();

    // Fetch recent activities (last 48 hours)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const dateStr = twoDaysAgo.toISOString();

    const [sessionsRes, quizRes] = await Promise.all([
      supabase.from("learning_sessions")
        .select("subject_slug, started_at, summary_metrics")
        .eq("user_id", user.id)
        .gte("started_at", dateStr)
        .order("started_at", { ascending: false })
        .limit(10),
      supabase.from("quiz_attempts")
        .select("score, total, created_at, quizzes(title, lessons(subject_slug))")
        .eq("user_id", user.id)
        .gte("created_at", dateStr)
        .order("created_at", { ascending: false })
        .limit(10)
    ]);

    const recentSessions = sessionsRes.data || [];
    const recentQuizzes = quizRes.data || [];

    // Format the context
    let historyContext = "";
    if (recentSessions.length === 0 && recentQuizzes.length === 0) {
      historyContext = "Gần đây học sinh chưa có hoạt động học tập nào đáng kể. Có thể là mới bắt đầu sử dụng app hoặc nghỉ một thời gian.";
    } else {
      const activities = [];
      for (const q of recentQuizzes) {
        const title = (q.quizzes as any)?.title || "Bài kiểm tra";
        const subject = (q.quizzes as any)?.lessons?.subject_slug || "không rõ môn";
        activities.push(`Làm ${title} (môn ${subject}), đạt ${q.score}/${q.total} điểm.`);
      }
      for (const s of recentSessions) {
        if (!s.summary_metrics) continue;
        const title = (s.summary_metrics as any).unit_topic || "Học bài";
        activities.push(`Hoàn thành ${title} (môn ${s.subject_slug}).`);
      }
      // Deduplicate a bit and limit
      const uniqueActivities = Array.from(new Set(activities)).slice(0, 5);
      historyContext = "Các hoạt động gần đây (hôm qua/hôm nay):\n" + uniqueActivities.map(a => "- " + a).join("\n");
    }

    const streakInfo = stats?.current_streak && stats.current_streak > 1 
      ? `Học sinh đang có chuỗi học tập liên tiếp ${stats.current_streak} ngày.` 
      : "";

    const systemPrompt = `Bạn là Aria, một gia sư AI thân thiện, thông minh, hỗ trợ học sinh tiểu học (Lớp ${grade}).
Tên học sinh: ${studentName}.
Giọng điệu: Vui vẻ, xưng "cô" và gọi "em" (hoặc gọi tên học sinh). Sử dụng tiếng Việt chuẩn, không dài dòng. Dùng emoji phù hợp.

Dữ liệu học tập gần đây của học sinh:
${historyContext}
${streakInfo}

NHIỆM VỤ CỦA BẠN:
Hãy viết một đoạn (max 3-4 câu) để tóm tắt những gì học sinh đã làm tốt (nếu có dữ liệu), khen ngợi sự chăm chỉ của em ấy, và đưa ra một gợi ý ngắn gọn để khuyến khích em học tiếp một bài học hoặc làm một bài luyện tập mới trong hôm nay.

Ví dụ:
"Chào Khôi! Cô thấy hôm qua em đã học Toán Unit 1 và đạt 8/10 điểm phần Tiếng Anh đấy, giỏi quá! Hôm nay mình cùng thử sức với bài học tiếp theo nhé, cô luôn ở đây để giúp em!"
`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: systemPrompt 
    });

    const result = await model.generateContent("Hãy tóm tắt và gợi ý học tập.");
    const responseText = result.response.text();

    // Cache the insight in the database so the frontend can display it without querying AI constantly
    await supabase.from("user_dashboard_stats").upsert({
      user_id: user.id,
      last_ai_insight: responseText,
      last_ai_insight_at: new Date().toISOString()
    });

    return NextResponse.json({ summary: responseText });
  } catch (err: any) {
    console.error("AI Daily Summary Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
