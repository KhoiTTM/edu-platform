import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HeroMomentumCard } from "@/components/dashboard/HeroMomentumCard";
import { LearningHeatmap } from "@/components/dashboard/LearningHeatmap";
import { Sparkles, Trophy, Layout, PenTool, Flame, ArrowRight, Clock, Target } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all dashboard data in parallel
  const [profileRes, statsRes, sessionsRes, quizRes] = await Promise.all([
    supabase.from("profiles").select("grade, display_name").eq("id", user.id).single(),
    supabase.from("user_dashboard_stats").select("*").eq("user_id", user.id).single(),
    supabase.from("learning_sessions").select("*").eq("user_id", user.id).order("started_at", { ascending: false }).limit(20),
    supabase.from("quiz_attempts").select("id, score, total, created_at, quizzes(title, lessons(subject_slug))").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
  ]);

  const profile = profileRes.data;
  const dashboardStats = statsRes.data;
  const learningSessions = sessionsRes.data || [];
  const recent = quizRes.data || [];

  const grade = profile?.grade ?? 3;
  const firstName = profile?.display_name?.split(/\s+/)[0] ?? "bạn";

  const allActivities: any[] = [];

  for (const q of recent) {
    const qData = q.quizzes as any;
    const subject = qData?.lessons?.subject_slug || "tieng_anh";
    allActivities.push({
      id: q.id,
      type: "quiz",
      date: new Date(q.created_at).getTime(),
      dateStr: q.created_at,
      subject: subject,
      title: qData?.title || "Bài kiểm tra",
      score: q.score,
      total: q.total
    });
  }

  for (const s of learningSessions) {
    if (!s.summary_metrics || !s.ended_at) continue;
    const metrics = s.summary_metrics as any;
    const title = metrics?.unit_topic || "Học bài / Luyện nói";
    
    allActivities.push({
      id: s.id,
      type: "lesson",
      date: new Date(s.started_at).getTime(),
      dateStr: s.started_at,
      subject: s.subject_slug,
      title: title,
      score: null,
      total: null
    });
  }

  allActivities.sort((a, b) => b.date - a.date);

  const seenSubjectTypes = new Set();
  const recentSessionsList: any[] = [];
  
  for (const activity of allActivities) {
    const key = `${activity.subject}-${activity.type}`;
    if (!seenSubjectTypes.has(key)) {
      seenSubjectTypes.add(key);
      recentSessionsList.push(activity);
      if (recentSessionsList.length === 4) break;
    }
  }

  return (
    <div className="mx-auto max-w-6xl h-[calc(100dvh-6rem)] flex flex-col gap-4 select-none relative z-10 overflow-hidden">
      
      {/* 1. Welcome & Stats Combined Strip */}
      <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-4 shrink-0">
        <div className="bg-slate-900/60 px-5 py-4 rounded-[1.5rem] border-2 border-slate-800 shadow-md backdrop-blur-md flex-1 flex flex-col justify-center">
          <h1 className="font-['Outfit'] text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Xin chào, {firstName}! <Sparkles size={16} className="text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">
            Học sinh lớp {grade} — Hành trình tiếp tục
          </p>
        </div>
        
        <div className="flex-1 max-w-md w-full">
          <HeroMomentumCard 
            streak={dashboardStats?.current_streak || 0}
            totalMinutes={dashboardStats?.total_learning_minutes || 0}
          />
        </div>
      </div>

      {/* 2. Main Layout Grid (fills remaining height) */}
      <div className="grid gap-6 lg:grid-cols-12 flex-1 min-h-0">
        
        {/* Left Column (Recent Sessions + Heatmap) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0 h-full">
          
          {/* Recent Sessions List */}
          <section className="bg-slate-900/60 p-5 rounded-[1.5rem] border-2 border-sky-500/30 shadow-md backdrop-blur-xl flex flex-col min-h-0 flex-1">
            <h2 className="font-['Outfit'] text-sm font-black text-sky-400 uppercase tracking-widest flex items-center gap-2 mb-4 shrink-0">
              <Clock size={16} /> Phiên học gần nhất
            </h2>

            <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
              {recentSessionsList.length > 0 ? (
                recentSessionsList.map((activity: any) => {
                  return (
                    <Link
                      key={`${activity.id}-${activity.type}`}
                      href={`/luyen-tap/${activity.subject}`}
                      className="group flex items-center justify-between rounded-2xl bg-slate-950/60 p-4 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all shadow-inner"
                    >
                      <div>
                        <h3 className="text-sm font-black text-white group-hover:text-sky-400 transition-colors">{activity.title}</h3>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mt-1 flex items-center gap-1.5">
                          <Target size={12} className={activity.type === 'quiz' ? "text-emerald-500" : "text-sky-500"} />
                          {activity.type === 'quiz' ? `Điểm: ${activity.score}/${activity.total}` : "Đã hoàn thành"} • {new Date(activity.dateStr).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-6 opacity-80">
                  <Flame size={32} className="text-slate-600 mb-3" />
                  <p className="text-sm font-bold text-slate-400">Chưa có môn học nào</p>
                  <Link href="/luyen-tap" className="mt-3 text-[11px] font-black text-sky-500 uppercase tracking-widest hover:text-sky-400">
                    Bắt đầu học ngay ➔
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Heatmap */}
          <section className="bg-slate-900/40 p-5 rounded-[1.5rem] border-2 border-slate-800/80 backdrop-blur-md shrink-0">
            <h2 className="font-['Outfit'] text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Flame size={14} className="text-orange-500 fill-orange-500" /> Tần Suất Luyện Tập
            </h2>
            <div className="overflow-x-auto py-1">
              <LearningHeatmap dates={learningSessions.map(s => s.started_at)} />
            </div>
          </section>
        </div>

        {/* Right Column (Leaderboard) */}
        <div className="lg:col-span-4 flex flex-col min-h-0 h-full">
          <aside className="flex flex-col rounded-[1.5rem] border-2 border-slate-800 bg-slate-900/50 p-5 shadow-lg backdrop-blur-xl flex-1 min-h-0">
            
            <div className="shrink-0 mb-4">
              <h2 className="font-['Outfit'] text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                BẢNG VÀNG DANH DỰ 🏆
              </h2>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                Lịch sử điểm số
              </p>
            </div>
            
            <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
              {recent.length === 0 ? (
                <div className="text-center py-8 opacity-60">
                  <Trophy size={24} className="text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-semibold">Chưa có kết quả.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {recent.map((row: any, index: number) => {
                    const q = row.quizzes as { title?: string } | null;
                    const title = q?.title ?? "Bài kiểm tra";
                    const score = row.score as number;
                    const total = row.total as number;
                    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                    const badge = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⚡";
                    
                    return (
                      <li key={row.id as string} className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 border border-slate-800/80 shadow-inner hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base drop-shadow">{badge}</span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-black text-slate-200">
                              {title}
                            </p>
                            <p className="text-[9px] text-slate-500 font-bold">
                              {new Date(row.created_at).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right pl-2">
                          <p className="text-xs font-black text-sky-400">{score}/{total}</p>
                          <p className="text-[9px] font-black text-slate-500">{pct}%</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            <div className="shrink-0 mt-4 border-t border-slate-800/80 pt-4 flex gap-2">
              <Link href="/assessment-studio" className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 py-3 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:bg-slate-700 transition">
                <PenTool size={12} /> Đánh giá năng lực
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
