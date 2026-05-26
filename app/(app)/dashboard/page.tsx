import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HeroMomentumCard } from "@/components/dashboard/HeroMomentumCard";
import { LearningHeatmap } from "@/components/dashboard/LearningHeatmap";
import { UnifiedSubjectProgress } from "@/components/dashboard/UnifiedSubjectProgress";
import { AIInsightPanel } from "@/components/dashboard/AIInsightPanel";
import { MemoryVault } from "@/components/dashboard/MemoryVault";
import { Sparkles, Trophy } from "lucide-react";

type Row = {
  subject_slug: string;
  subject_label_vi: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all dashboard data in parallel
  const [profileRes, statsRes, sessionsRes, lessonsRes, quizRes, speakingRes] = await Promise.all([
    supabase.from("profiles").select("grade, display_name").eq("id", user.id).single(),
    supabase.from("user_dashboard_stats").select("*").eq("user_id", user.id).single(),
    supabase.from("learning_sessions").select("started_at").eq("user_id", user.id).order("started_at", { ascending: false }),
    supabase.from("lessons").select("subject_slug, subject_label_vi, grade"),
    supabase.from("quiz_attempts").select("id, score, total, created_at, quizzes(title)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    supabase.from("speaking_sessions").select("best_moment_text, unit_id, session_number, completed_at").eq("user_id", user.id).not("best_moment_text", "is", null).order("completed_at", { ascending: false }).limit(6)
  ]);

  const profile = profileRes.data;
  const dashboardStats = statsRes.data;
  const learningSessions = sessionsRes.data || [];
  const rows = lessonsRes.data;
  const recent = quizRes.data || [];
  const bestMoments = (speakingRes.data || []).map(s => ({
    text: s.best_moment_text as string,
    unit_id: s.unit_id as string,
    session_number: s.session_number as number,
    completed_at: s.completed_at as string
  }));

  const grade = profile?.grade ?? 3;

  const subjectMap = new Map<string, string>();
  for (const r of (rows ?? []) as any[]) {
    if (r.subject_slug && r.subject_label_vi && (r.grade === grade || r.grade === 0)) {
      subjectMap.set(r.subject_slug, r.subject_label_vi);
    }
  }

  const subjects = [...subjectMap.entries()].sort((a, b) =>
    a[1].localeCompare(b[1], "vi")
  );

  const firstName =
    profile?.display_name?.split(/\s+/)[0] ?? "bạn";

  const emoji: Record<string, string> = {
    toan: "🔢",
    tieng_anh: "🌍",
    khoa_hoc: "🔬",
    tieng_viet: "📖",
    "mindset-ielts": "🎓",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* 1. Welcome & Primary CTA */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl flex items-center gap-3">
            Xin chào, {firstName}! <Sparkles className="text-sky-400" />
          </h1>
          <p className="text-slate-400 max-w-md">
            Lớp {grade} — chọn môn học để khám phá bài giảng, video và luyện tập tương tác cùng Aria.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/hoc-tap"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500 active:scale-95"
          >
            Vào học bài
          </Link>
          <Link
            href="/schedule"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Lịch học
          </Link>
        </div>
      </div>

      {/* 2. Hero Section (Stats + AI Insight) */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <HeroMomentumCard 
            streak={dashboardStats?.current_streak || 0}
            totalMinutes={dashboardStats?.total_learning_minutes || 0}
          />
        </div>
        <div className="lg:col-span-5">
          <AIInsightPanel 
            initialInsight={dashboardStats?.last_ai_insight || null}
            lastInsightAt={dashboardStats?.last_ai_insight_at || null}
          />
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Heatmap Section */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Hoạt động gần đây
            </h2>
            <LearningHeatmap dates={learningSessions.map(s => s.started_at)} />
          </section>

          {/* Memory Vault Section */}
          <MemoryVault moments={bestMoments} />

          {/* Subject Progress Section */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Tiến độ học tập
            </h2>
            <UnifiedSubjectProgress subjectProgress={dashboardStats?.subject_progress || {}} />
          </section>

          {/* All Subjects List */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              Khám phá môn học
            </h2>
            {subjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center text-slate-400">
                <p>Chưa có dữ liệu môn học.</p>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {subjects.map(([slug, label]) => (
                  <li key={slug}>
                    <Link
                      href={`/hoc-tap/${slug}`}
                      className="flex h-full min-h-[120px] flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md transition hover:border-sky-500/50 hover:bg-slate-900/80 group"
                    >
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300 origin-left" aria-hidden>
                        {emoji[slug] ?? "📚"}
                      </span>
                      <span className="mt-3 font-display text-xl font-bold text-white">
                        {label}
                      </span>
                      <span className="mt-auto pt-4 text-xs font-bold text-sky-500 uppercase tracking-widest">
                        Xem bài học →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* 4. Sidebar: Recent Scores */}
        <div className="lg:col-span-4">
          <aside className="sticky top-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Bảng vàng 🏆
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 mb-6">
              Kết quả bài tập gần nhất
            </p>
            
            {recent.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy size={20} className="text-slate-600" />
                </div>
                <p className="text-xs text-slate-400 italic">
                  Chưa có điểm bài tập nào. Hãy bắt đầu học ngay nhé!
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {recent.map((row: any) => {
                  const q = row.quizzes as { title?: string } | null;
                  const title = q?.title ?? "Bài kiểm tra";
                  const score = row.score as number;
                  const total = row.total as number;
                  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                  
                  return (
                    <li
                      key={row.id as string}
                      className="group flex items-center justify-between rounded-2xl bg-slate-800/40 p-4 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                    >
                      <div className="min-w-0 pr-3">
                        <p className="truncate text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                          {title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {new Date(row.created_at).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-black text-sky-400">
                          {score}/{total}
                        </p>
                        <p className="text-[10px] font-bold text-slate-600 group-hover:text-slate-500 transition-colors">
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
              className="mt-8 block text-center text-xs font-black text-sky-500 hover:text-sky-400 uppercase tracking-widest transition-colors border-t border-slate-800 pt-4"
            >
              Xem tất cả điểm số ➔
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
