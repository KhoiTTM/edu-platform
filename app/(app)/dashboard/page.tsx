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
    supabase.from("learning_sessions").select("started_at").eq("user_id", user.id).order("started_at", { ascending: false }),
    supabase.from("quiz_attempts").select("id, score, total, created_at, quizzes(title)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
  ]);

  const profile = profileRes.data;
  const dashboardStats = statsRes.data;
  const learningSessions = sessionsRes.data || [];
  const recent = quizRes.data || [];

  const grade = profile?.grade ?? 3;
  const firstName = profile?.display_name?.split(/\s+/)[0] ?? "bạn";

  const lastSession = recent.length > 0 ? recent[0] : null;
  const lastQuiz = lastSession?.quizzes as any;
  // Fallback to tieng_anh if we can't extract the exact subject from quiz attempts right now
  const lastSubject = lastQuiz?.subject_id || lastQuiz?.subject || "tieng_anh"; 
  const continueLink = lastSession ? `/luyen-tap/${lastSubject}` : `/luyen-tap`;

  return (
    <div className="mx-auto max-w-6xl space-y-8 select-none relative z-10">
      
      {/* 1. Welcome & Primary CTA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900/60 p-6 rounded-[2rem] border-2 border-slate-800 shadow-md backdrop-blur-md">
        <div className="space-y-1">
          <h1 className="font-['Outfit'] text-3xl font-black tracking-tight text-white sm:text-4xl flex items-center gap-3">
            Xin chào, {firstName}! <Sparkles className="text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xs text-slate-400 font-semibold tracking-wide">
            Học sinh lớp {grade} — Sẵn sàng cho phiên học tiếp theo chưa?
          </p>
        </div>
        
        {/* Gaming Style Tab Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/assessment-studio"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-800/80 border-2 border-slate-700 text-slate-300 font-extrabold px-6 shadow-[0_4px_0_#1e293b] active:translate-y-[2px] active:shadow-none hover:bg-slate-700 hover:text-white transition-all text-xs uppercase tracking-wider"
          >
            <PenTool size={16} className="mr-2" /> Đánh giá
          </Link>
        </div>
      </div>

      {/* 2. Top Stats Overview Console Panel */}
      <div className="w-full">
        <HeroMomentumCard 
          streak={dashboardStats?.current_streak || 0}
          totalMinutes={dashboardStats?.total_learning_minutes || 0}
        />
      </div>

      {/* 3. Main Dashboard Grid split: Left Column (Main Stats), Right Column (Leaderboard) */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Recent Session History & Continue CTA */}
          <section className="bg-slate-900/60 p-8 rounded-[2.5rem] border-2 border-sky-500/30 shadow-[0_0_40px_rgba(2,132,199,0.15)] backdrop-blur-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-colors pointer-events-none"></div>
             
             <h2 className="font-['Outfit'] text-sm font-black text-sky-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Clock size={16} /> Phiên học gần nhất
            </h2>

            {lastSession ? (
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between relative z-10">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 filter drop-shadow-md">{lastQuiz?.title || "Bài tập không xác định"}</h3>
                  <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                    <Target size={14} className="text-emerald-400" />
                    Điểm số: <strong className="text-white">{lastSession.score}/{lastSession.total}</strong> • {new Date(lastSession.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                
                <Link
                  href={continueLink}
                  className="shrink-0 inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-sky-400 to-sky-600 text-white font-extrabold px-8 shadow-[0_6px_0_#0284c7] active:translate-y-[6px] active:shadow-none hover:from-sky-300 hover:to-sky-500 transition-all text-sm uppercase tracking-wider gap-2 w-full md:w-auto"
                >
                  Tiếp tục học tập <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-6 relative z-10">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700 shadow-inner">
                  <Flame size={24} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Chưa có dữ liệu học tập</h3>
                <p className="text-slate-400 mb-6 text-sm">Bắt đầu bài học đầu tiên để kích hoạt chuỗi ngày học tập của bạn.</p>
                <Link
                  href="/luyen-tap"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white font-extrabold px-8 shadow-[0_6px_0_#059669] active:translate-y-[6px] active:shadow-none hover:from-emerald-300 hover:to-emerald-500 transition-all text-sm uppercase tracking-wider gap-2 w-full md:w-auto"
                >
                  Bắt đầu chặng đường <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </section>

          {/* Recent Study Heatmap */}
          <section className="space-y-4 bg-slate-900/40 p-6 rounded-[2.5rem] border-2 border-slate-800/80 backdrop-blur-md">
            <h2 className="font-['Outfit'] text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Flame size={16} className="text-orange-500 fill-orange-500" /> Tần Suất Luyện Tập
            </h2>
            <div className="overflow-x-auto py-2">
              <LearningHeatmap dates={learningSessions.map(s => s.started_at)} />
            </div>
          </section>
        </div>

        {/* 4. Sidebar: 3D Leaderboard Panel (Bảng Vàng) */}
        <div className="lg:col-span-4">
          <aside className="sticky top-24 rounded-[2.5rem] border-4 border-slate-800 bg-slate-900/50 p-6 shadow-[0_12px_0_#1e293b,0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-6">
            
            <div>
              <h2 className="font-['Outfit'] text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                BẢNG VÀNG DANH DỰ 🏆
              </h2>
              <p className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                Kết quả bài tập gần nhất của bạn
              </p>
            </div>
            
            {recent.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/40 rounded-3xl border border-slate-800/80 p-4 shadow-inner">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-800 shadow-md">
                  <Trophy size={20} className="text-slate-600" />
                </div>
                <p className="text-xs text-slate-400 italic">
                  Chưa có kết quả kiểm tra. Hãy học bài để ghi tên lên bảng vàng nhé!
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {recent.map((row: any, index) => {
                  const q = row.quizzes as { title?: string } | null;
                  const title = q?.title ?? "Bài kiểm tra";
                  const score = row.score as number;
                  const total = row.total as number;
                  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                  
                  // Medals for top positions
                  const medals = ["🥇", "🥈", "🥉"];
                  const badge = index < 3 ? medals[index] : "⚡";
                  
                  return (
                    <li
                      key={row.id as string}
                      className="group flex items-center justify-between rounded-3xl bg-slate-950/40 p-4 border border-slate-800/80 hover:bg-slate-900/40 transition-colors shadow-inner"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg filter drop-shadow select-none">{badge}</span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-extrabold text-slate-200 group-hover:text-white transition-colors">
                            {title}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5 font-bold">
                            {new Date(row.created_at).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right pl-2">
                        <p className="text-xs font-black text-sky-400">
                          {score}/{total}
                        </p>
                        <p className="text-[9px] font-black text-slate-500 group-hover:text-slate-400 transition-colors">
                          {pct}%
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            
            <Link
              href="/scores"
              className="mt-6 block text-center text-[10px] font-black text-sky-500 hover:text-sky-400 uppercase tracking-widest transition-colors border-t border-slate-800/80 pt-4"
            >
              Xem tất cả điểm số ➔
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
