import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HeroMomentumCard } from "@/components/administration/dashboard/HeroMomentumCard";
import { Sparkles, ArrowRight, Target, BookOpen, CheckSquare, Flame, Clock, PenTool } from "lucide-react";
import { getTodayTasks, getPendingTasks } from "@/app/(app)/(administration)/phu-huynh/actions";

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
    const type = metrics?.type === 'exam' ? 'quiz' : 'lesson';
    
    allActivities.push({
      id: s.id,
      type: type,
      date: new Date(s.started_at).getTime(),
      dateStr: s.started_at,
      subject: s.subject_slug,
      title: title,
      score: metrics.score ?? null,
      total: metrics.total ?? null
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

  // Fetch next lesson recommendations for each recent activity
  for (const activity of recentSessionsList) {
    const match = activity.title.match(/(?:Bài|Unit|Ex)\s*(\d+)/i);
    if (match) {
      const nextUnitNum = parseInt(match[1]) + 1;
      const { data: nextCol } = await supabase
        .from('assessment_collections')
        .select('exams(id)')
        .eq('subject_slug', activity.subject)
        .contains('units', [nextUnitNum])
        .limit(1)
        .single();
        
      if (nextCol && nextCol.exams && nextCol.exams.length > 0) {
        activity.nextUnit = nextUnitNum;
        activity.nextExamId = (nextCol.exams[0] as any).id;
      }
    }
  }

  const coreSubjects = grade === 7
    ? [
        { slug: 'toan', name: 'Toán 7', icon: '🔢' },
        { slug: 'tieng_viet', name: 'Tiếng Việt 7', icon: '📖' },
        { slug: 'tieng_anh', name: 'Tiếng Anh 7', icon: '🌍' },
        { slug: 'khtn', name: 'KHTN 7', icon: '🧬' },
        { slug: 'mindset-ielts', name: 'IELTS Mindset', icon: '🎓' }
      ]
    : [
        { slug: 'toan', name: 'Toán 3', icon: '🔢' },
        { slug: 'tieng_viet', name: 'Tiếng Việt 3', icon: '📖' },
        { slug: 'tieng_anh', name: 'Tiếng Anh 3', icon: '🌍' },
        { slug: 'pre-a1-starter', name: 'Pre A1 Starter', icon: '⭐' }
      ];

  const sessions = sessionsRes.data || [];

  const recentLessons = coreSubjects.map(subj => {
    const session = sessions.find((s: any) => s.subject_slug === subj.slug && s.summary_metrics?.type !== 'exam');
    return {
      slug: subj.slug,
      name: subj.name,
      icon: subj.icon,
      title: session ? (session.summary_metrics?.unit_topic || "Bài học gần nhất") : "Chưa bắt đầu học bài",
      url: session?.summary_metrics?.lesson_url || (subj.slug === 'pre-a1-starter' ? '/hoc-tap/pre-a1-starter/starters-wordlist' : `/hoc-tap/${subj.slug}`)
    };
  });

  const recentExams = coreSubjects.map(subj => {
    const session = sessions.find((s: any) => s.subject_slug === subj.slug && s.summary_metrics?.type === 'exam');
    const hasScore = session?.summary_metrics?.score !== undefined && session?.summary_metrics?.total !== undefined;
    return {
      slug: subj.slug,
      name: subj.name,
      icon: subj.icon,
      title: session ? (session.summary_metrics?.unit_topic || "Bài luyện tập gần nhất") : "Chưa có tiến độ",
      score: hasScore ? `${session.summary_metrics.score}/${session.summary_metrics.total}` : null,
      url: `/luyen-tap/${subj.slug}?grade=${grade}`
    };
  });

  // Fetch today's assigned tasks from parent
  const todayTasks = await getTodayTasks();
  const pendingOldTasks = await getPendingTasks();

  // Merge: show today tasks first, then any unfinished from previous days (hide completed tasks)
  const allTasksMap = new Map<string, any>();
  for (const t of todayTasks) {
    if (!t.completed_at) {
      allTasksMap.set(t.id, t);
    }
  }
  for (const t of pendingOldTasks) {
    if (!t.completed_at && !allTasksMap.has(t.id)) {
      allTasksMap.set(t.id, t);
    }
  }
  const displayTasks = Array.from(allTasksMap.values());

  const todayStr = new Date().toISOString().split("T")[0];
  const groupedTasks: Record<string, any[]> = {};
  displayTasks.forEach((task: any) => {
    const dateKey = task.task_date === todayStr 
      ? "Hôm nay" 
      : new Date(task.task_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    if (!groupedTasks[dateKey]) groupedTasks[dateKey] = [];
    groupedTasks[dateKey].push(task);
  });

  const SUBJECT_ICONS: Record<string, string> = {
    toan: "🔢",
    tieng_viet: "📖",
    tieng_anh: "🌍",
    "mindset-ielts": "🎓",
    "pre-a1-starter": "⭐",
    khtn: "🧪",
  };

  return (
    <div className="mx-auto max-w-6xl h-[calc(100dvh-6rem)] flex flex-col gap-4 select-none relative z-10 overflow-hidden">
      
      {/* 1. Welcome & Stats Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div className="flex-1 py-1">
          <h1 className="font-['Outfit'] text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            Xin chào, {firstName}! <Sparkles size={24} className="text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">
            Học sinh lớp {grade} — Hành trình tiếp tục
          </p>
        </div>
        
        <div className="shrink-0">
          <HeroMomentumCard 
            streak={dashboardStats?.current_streak || 0}
            totalMinutes={dashboardStats?.total_learning_minutes || 0}
          />
        </div>
      </div>

      {/* 2. Main Layout Grid (fills remaining height) */}
      <div className="grid gap-4 lg:grid-cols-12 flex-1 min-h-0">
        
        {/* Left Column - Môn học (wider) */}
        <div className="lg:col-span-8 flex flex-col gap-4 min-h-0 h-full">

          {/* Continue Learning Section */}
          <section className="bg-slate-900/60 p-4 rounded-2xl border-2 border-emerald-500/30 shadow-md backdrop-blur-xl flex flex-col shrink-0 flex-1 min-h-0">
            <h2 className="font-['Outfit'] text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3 shrink-0">
              <Target size={14} /> Tiến độ học tập của bạn
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Group 1: Bài Học (Lessons) */}
              <div className="flex flex-col gap-2 min-h-0">
                <h3 className="text-xs font-black text-sky-400 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-800/80 shrink-0">
                  📖 Bài Học (Lessons)
                </h3>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {recentLessons.map((item: any) => (
                    <Link
                      key={item.slug}
                      href={item.url}
                      className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800 hover:border-sky-500/30 hover:bg-slate-900/60 shadow-inner flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm shrink-0">{item.icon}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider truncate">{item.name}</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-200 mt-1 truncate group-hover:text-sky-400 transition-colors">
                          {item.title}
                        </p>
                      </div>
                      <ArrowRight size={12} className="text-slate-600 group-hover:text-sky-400 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group 2: Bài Luyện Tập (Practice) */}
              <div className="flex flex-col gap-2 min-h-0">
                <h3 className="text-xs font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-800/80 shrink-0">
                  📝 Bài Luyện Tập (Practice)
                </h3>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {recentExams.map((item: any) => (
                    <Link
                      key={item.slug}
                      href={item.url}
                      className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800 hover:border-violet-500/30 hover:bg-slate-900/60 shadow-inner flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm shrink-0">{item.icon}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider truncate">{item.name}</span>
                          {item.score && (
                            <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400">
                              {item.score}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-slate-200 mt-1 truncate group-hover:text-violet-400 transition-colors">
                          {item.title}
                        </p>
                      </div>
                      <ArrowRight size={12} className="text-slate-600 group-hover:text-violet-400 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column - Nhiệm vụ */}
        <div className="lg:col-span-4 flex flex-col min-h-0 h-full">
          <aside className="flex flex-col rounded-[1.5rem] border-2 border-slate-800 bg-slate-900/50 p-4 shadow-lg backdrop-blur-xl flex-1 min-h-0">
            
            <div className="shrink-0 mb-3">
              <h2 className="font-['Outfit'] text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CheckSquare size={16} className="text-yellow-400" />
                Nhiệm Vụ
              </h2>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                {displayTasks.length > 0 ? `${displayTasks.filter(t => !t.completed_at).length} chưa hoàn thành` : "Hôm nay"}
              </p>
            </div>

            {/* Real daily tasks */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
              {displayTasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-5 text-center mt-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Không có nhiệm vụ</p>
                  <p className="text-[9px] text-slate-600 mt-1">Phụ huynh chưa giao bài hôm nay ✨</p>
                </div>
              ) : (
                Object.entries(groupedTasks).map(([dateKey, dateTasks]) => (
                  <div key={dateKey} className="space-y-2">
                    {/* Date label heading */}
                    <div className="flex items-center gap-1.5 text-slate-500 pl-1">
                      <Clock size={10} />
                      <span className="text-[9px] font-black uppercase tracking-wider">
                        {dateKey === "Hôm nay" ? "Hôm nay" : `Hạn ngày ${dateKey}`}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {dateTasks.map((task: any) => {
                        const isDone = !!task.completed_at;
                        const isLesson = !!task.lesson_node_id;
                        let taskTitle = isLesson ? (task.lesson_node?.title || "Bài học") : (task.exam?.title || "Bài luyện tập");
                        const subjectSlug = task.exam?.collection?.subject_slug || 
                                            task.lesson_node?.source?.subject?.slug || 
                                            task.task?.subject_slug || "";
                        const subjectIcon = isLesson ? "📖" : (SUBJECT_ICONS[subjectSlug] || "📚");
                        const isToday = task.task_date === todayStr;
                        let taskUrl = isLesson
                          ? `/learn/${subjectSlug}/${task.lesson_node?.slug}`
                          : `/test-assessment?examId=${task.exam_id}`;

                        return (
                          <Link
                            key={task.id}
                            href={isDone ? "#" : taskUrl}
                            className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition-all group ${
                              isDone
                                ? "bg-slate-950/30 border-slate-800/50 opacity-60 cursor-default pointer-events-none"
                                : isToday
                                ? "bg-yellow-500/5 border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                                : "bg-orange-500/5 border-orange-500/20 hover:border-orange-400 hover:bg-orange-500/10"
                            }`}
                          >
                            {/* Checkbox */}
                            <div className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                              isDone
                                ? "bg-emerald-500 border-emerald-400"
                                : isToday
                                ? "border-yellow-500 bg-yellow-500/10"
                                : "border-orange-500 bg-orange-500/10"
                            }`}>
                              {isDone && <span className="text-[10px] text-white font-black">✓</span>}
                              {!isDone && isToday && <Flame size={10} className="text-yellow-400" />}
                              {!isDone && !isToday && <Clock size={10} className="text-orange-400" />}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className={`text-[10px] font-black truncate ${
                                isDone ? "line-through text-slate-500" : isToday ? "text-yellow-200" : "text-orange-200"
                              }`}>
                                {subjectIcon} {taskTitle}
                              </p>
                            </div>

                            {!isDone && (
                              <ArrowRight size={11} className={`shrink-0 ${
                                isToday ? "text-yellow-500 group-hover:text-yellow-300" : "text-orange-500 group-hover:text-orange-300"
                              } transition-colors`} />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
