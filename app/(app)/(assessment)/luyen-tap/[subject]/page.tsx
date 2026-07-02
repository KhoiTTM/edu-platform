"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { getAssessmentMap } from "../actions";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Star, ChevronRight, CheckCircle2, Play, Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function SubjectMapPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = params.subject as string;
  const gradeParam = searchParams.get("grade");
  const gradeNum = gradeParam ? parseInt(gradeParam, 10) : undefined;
  const [mounted, setMounted] = useState(false);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [workbooks, setWorkbooks] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reflexes, setReflexes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'lesson' | 'workbook' | 'review' | 'reflex'>('lesson');
  const [completedExams, setCompletedExams] = useState<string[]>([]);
  const [collapsedUnits, setCollapsedUnits] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPickingRandom, setIsPickingRandom] = useState<boolean>(false);
  const [timerLimit, setTimerLimit] = useState<number>(30);

  const handleRandomFromReflex = async (exams: any[]) => {
    if (!exams || exams.length === 0) return;
    setIsPickingRandom(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPickingRandom(false);
        return;
      }

      const { data: sessions } = await supabase
        .from('learning_sessions')
        .select('summary_metrics')
        .eq('user_id', user.id);

      const attemptsMap: Record<string, number> = {};
      sessions?.forEach((s: any) => {
        const metrics = s.summary_metrics as any;
        if (metrics && metrics.type === 'exam' && metrics.exam_id) {
          attemptsMap[metrics.exam_id] = (attemptsMap[metrics.exam_id] || 0) + 1;
        }
      });

      const unattempted = exams.filter(exam => !attemptsMap[exam.id]);
      
      let selectedExam;
      if (unattempted.length > 0) {
        const randomIndex = Math.floor(Math.random() * unattempted.length);
        selectedExam = unattempted[randomIndex];
      } else {
        let minAttempts = Infinity;
        exams.forEach(exam => {
          const count = attemptsMap[exam.id] || 0;
          if (count < minAttempts) {
            minAttempts = count;
          }
        });

        const candidateExams = exams.filter(exam => (attemptsMap[exam.id] || 0) === minAttempts);
        const randomIndex = Math.floor(Math.random() * candidateExams.length);
        selectedExam = candidateExams[randomIndex];
      }

      if (selectedExam) {
        router.push(`/test-assessment?examId=${selectedExam.id}&timer=${timerLimit}`);
      }
    } catch (err) {
      console.error("Error picking random reflex exam:", err);
    } finally {
      setIsPickingRandom(false);
    }
  };

  const handleRandomFromUnit = async (exams: any[]) => {
    if (!exams || exams.length === 0) return;
    setIsPickingRandom(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPickingRandom(false);
        return;
      }

      // Fetch all attempts for this user
      const { data: sessions } = await supabase
        .from('learning_sessions')
        .select('summary_metrics')
        .eq('user_id', user.id);

      const attemptsMap: Record<string, number> = {};
      sessions?.forEach((s: any) => {
        const metrics = s.summary_metrics as any;
        if (metrics && metrics.type === 'exam' && metrics.exam_id) {
          attemptsMap[metrics.exam_id] = (attemptsMap[metrics.exam_id] || 0) + 1;
        }
      });

      // Classify unit exams
      const unattempted = exams.filter(exam => !attemptsMap[exam.id]);
      
      let selectedExam;
      if (unattempted.length > 0) {
        const randomIndex = Math.floor(Math.random() * unattempted.length);
        selectedExam = unattempted[randomIndex];
      } else {
        // Find minimum attempt count
        let minAttempts = Infinity;
        exams.forEach(exam => {
          const count = attemptsMap[exam.id] || 0;
          if (count < minAttempts) {
            minAttempts = count;
          }
        });

        // Filter candidates
        const candidateExams = exams.filter(exam => (attemptsMap[exam.id] || 0) === minAttempts);
        const randomIndex = Math.floor(Math.random() * candidateExams.length);
        selectedExam = candidateExams[randomIndex];
      }

      if (selectedExam) {
        router.push(`/test-assessment?examId=${selectedExam.id}`);
      }
    } catch (err) {
      console.error("Error picking random exam:", err);
    } finally {
      setIsPickingRandom(false);
    }
  };

  const subjectTitles: Record<string, string> = {
    'tieng_anh': 'Tiếng Anh',
    'toan': 'Toán học',
    'tieng-viet': 'Tiếng Việt',
    'tieng_viet': 'Tiếng Việt',
    'khtn': 'Khoa học tự nhiên'
  };
  const subjectName = subject ? (subjectTitles[subject] || subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : '';

  useEffect(() => {
    setMounted(true);
    if (subject) {
      async function loadData() {
          setIsLoading(true);
          const data = await getAssessmentMap(subject, gradeNum);
          setVolumes(data.lessons || []);
          setWorkbooks(data.workbooks || []);
          setReviews(data.reviews || []);
          setReflexes(data.reflex || []);
          try {
            const stored = JSON.parse(localStorage.getItem('completed_exams') || '[]');
            setCompletedExams(stored);
          } catch(e) {}
          setIsLoading(false);
      }
      loadData();
    }

    const handlePageShow = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('completed_exams') || '[]');
        setCompletedExams(stored);
      } catch(e) {}
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [subject, gradeNum]);

  useEffect(() => {
    if (activeTab === 'workbook') {
      if (subject === 'khtn' && gradeNum === 7) {
        router.push('/flipbooks/khtn7/quiz');
      } else if (['tieng_anh', 'tieng-anh-7', 'english', 'mindset-ielts'].includes(subject) && gradeNum === 7) {
        router.push('/sach-bai-tap/sbt-tienganh7');
      }
    }
  }, [activeTab, subject, gradeNum, router]);

  const toggleUnit = (unitKey: string) => {
    setCollapsedUnits(prev => ({
      ...prev,
      [unitKey]: prev[unitKey] === false ? true : false
    }));
  };

  if (!mounted || !subject) return (
    <div className="flex items-center justify-center h-full bg-slate-900 text-white">
        <p>Loading subject...</p>
    </div>
  );

  let globalIndex = 0;
  
  // Neon Space Colors for Unit Banners
  const unitColors = [
    "bg-indigo-600/85", 
    "bg-fuchsia-600/85", 
    "bg-cyan-600/85", 
    "bg-emerald-600/85"
  ];
  const unitGlows = [
    "rgba(79,70,229,0.4)",
    "rgba(217,70,239,0.4)",
    "rgba(6,182,212,0.4)",
    "rgba(16,185,129,0.4)"
  ];

  return (
    <main className="mx-auto flex min-h-dvh w-full flex-col pb-20 relative text-white bg-[#0f172a]">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-6 py-4 shadow-lg">
        <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm tracking-wide">
            {subjectName} {gradeNum ? `- Lớp ${gradeNum}` : ''}
        </div>
        <div className="flex items-center gap-4 font-bold">
          <div className="text-amber-400 flex items-center gap-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            🔥 12 Days
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 relative z-10 max-w-5xl mx-auto w-full">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <p className="mt-6 font-bold text-cyan-400 tracking-widest uppercase animate-pulse">Scanning Universe...</p>
          </div>
        )}

        {/* Tab Toggle Bar */}
        {!isLoading && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-sm gap-1 flex-wrap justify-center">
              <button
                onClick={() => setActiveTab('lesson')}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === 'lesson' 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                Luyện tập theo bài học
              </button>
              <button
                onClick={() => setActiveTab('workbook')}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === 'workbook' 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-teal-500/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                Luyện tập theo Sách bài tập
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === 'review' 
                    ? "bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-pink-500/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                Ôn Tập
              </button>
              <button
                onClick={() => setActiveTab('reflex')}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === 'reflex' 
                    ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg shadow-rose-500/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                Luyện Tập phản xạ
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Lessons */}
        {!isLoading && activeTab === 'lesson' && volumes.map((volume, volIndex) => (
          <div key={`vol-${volume.volume}`} className="mb-16">
             <div className="mb-10 flex items-center gap-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] drop-shadow-lg">
                    Tập {volume.volume}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
             </div>

             {volume.units.map((unit: any, unitIdx: number) => {
                const colorIdx = (volIndex * 2 + unitIdx) % unitColors.length;
                const unitKey = `vol-${volume.volume}-unit-${unit.unit}`;
                const isCollapsed = collapsedUnits[unitKey] !== false; // Default to true (collapsed)
                const completedCount = unit.exams.filter((exam: any) => exam.is_completed || completedExams.includes(exam.id)).length;

                return (
                  <div key={`unit-${unit.unit}`} className="mb-12 flex flex-col items-stretch">
                    {/* Unit Header (Click to Toggle) */}
                    <div 
                      onClick={() => toggleUnit(unitKey)}
                      className={clsx(
                        "mb-6 rounded-2xl p-5 text-white border border-white/20 backdrop-blur-md relative overflow-hidden flex justify-between items-center cursor-pointer select-none active:scale-[0.99] transition-transform duration-100", 
                        unitColors[colorIdx]
                      )}
                      style={{ boxShadow: `0 8px 32px ${unitGlows[colorIdx]}` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                      <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-black tracking-wider drop-shadow-md line-clamp-1">
                          {unit.title}
                        </h2>
                        <p className="text-xs font-bold text-white/80 mt-1 line-clamp-2">
                          {unit.description}
                        </p>
                        <p className="font-bold text-white/60 mt-1.5 uppercase tracking-widest text-[9px]">
                          {isCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 z-10">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">
                          {completedCount}/{unit.exams.length} Đề
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </div>
                      </div>
                    </div>

                    {/* Assessments Table Layout */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md shadow-xl"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/80 bg-slate-900/30">
                            <span className="text-xs font-bold text-slate-400">
                              Luyện tập kiến thức của: {unit.title}
                            </span>
                            <button
                              onClick={() => handleRandomFromUnit(unit.exams)}
                              disabled={isPickingRandom}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Sparkles size={14} className="animate-pulse" />
                              {isPickingRandom ? "Đang chọn..." : "Luyện đề Ngẫu nhiên"}
                            </button>
                          </div>
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-3.5 w-16 text-center">STT</th>
                                <th className="px-6 py-3.5">Tên đề luyện tập</th>
                                <th className="px-6 py-3.5 w-32 text-center">Số câu hỏi</th>
                                <th className="px-6 py-3.5 w-36 text-center">Trạng thái</th>
                                <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
                              {unit.exams.map((exam: any) => {
                                const currentIndex = ++globalIndex;
                                const isCompleted = exam.is_completed || completedExams.includes(exam.id);
                                
                                return (
                                  <tr 
                                    key={exam.id} 
                                    className={clsx(
                                      "transition-all duration-150 group hover:bg-slate-800/20",
                                      isCompleted && "text-slate-500"
                                    )}
                                  >
                                    <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                                      {currentIndex}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Link href={`/test-assessment?examId=${exam.id}`} className={clsx(
                                        "hover:text-cyan-400 transition-colors block leading-snug",
                                        isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold"
                                      )}>
                                        {exam.title}
                                      </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-black text-slate-300">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        {exam.total_questions || 15} Câu
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      {isCompleted ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                          <CheckCircle2 size={12} />
                                          Đã làm
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-black uppercase tracking-wider">
                                          <Play size={12} />
                                          Sẵn sàng
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <Link 
                                        href={`/test-assessment?examId=${exam.id}`}
                                        className={clsx(
                                          "inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                                          isCompleted 
                                            ? "border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white" 
                                            : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/10"
                                        )}
                                      >
                                        {isCompleted ? "Làm lại" : "Luyện tập"}
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
             })}
          </div>
        ))}

        {/* Tab Content: Workbooks */}
        {!isLoading && activeTab === 'workbook' && workbooks.map((volume, volIndex) => (
          <div key={`work-vol-${volume.volume}`} className="mb-16">
             <div className="mb-10 flex items-center gap-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] drop-shadow-lg">
                    Tập {volume.volume}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
             </div>

             {volume.units.map((unit: any, unitIdx: number) => {
                const colorIdx = (volIndex * 2 + unitIdx) % unitColors.length;
                const unitKey = `work-vol-${volume.volume}-unit-${unit.unit}`;
                const isCollapsed = collapsedUnits[unitKey] !== false; // Default to true (collapsed)
                const completedCount = unit.exams.filter((exam: any) => exam.is_completed || completedExams.includes(exam.id)).length;

                return (
                  <div key={`work-unit-${unit.unit}`} className="mb-12 flex flex-col items-stretch">
                    {/* Unit Header (Click to Toggle) */}
                    <div 
                      onClick={() => toggleUnit(unitKey)}
                      className={clsx(
                        "mb-6 rounded-2xl p-5 text-white border border-white/20 backdrop-blur-md relative overflow-hidden flex justify-between items-center cursor-pointer select-none active:scale-[0.99] transition-transform duration-100", 
                        unitColors[colorIdx]
                      )}
                      style={{ boxShadow: `0 8px 32px ${unitGlows[colorIdx]}` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                      <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-black tracking-wider drop-shadow-md line-clamp-1">
                          {unit.title}
                        </h2>
                        <p className="text-xs font-bold text-white/80 mt-1 line-clamp-2">
                          {unit.description}
                        </p>
                        <p className="font-bold text-white/60 mt-1.5 uppercase tracking-widest text-[9px]">
                          {isCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 z-10">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">
                          {completedCount}/{unit.exams.length} Đề
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </div>
                      </div>
                    </div>

                    {/* Assessments Table Layout */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md shadow-xl"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/80 bg-slate-900/30">
                            <span className="text-xs font-bold text-slate-400">
                              Luyện tập kiến thức của: {unit.title}
                            </span>
                            <button
                              onClick={() => handleRandomFromUnit(unit.exams)}
                              disabled={isPickingRandom}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Sparkles size={14} className="animate-pulse" />
                              {isPickingRandom ? "Đang chọn..." : "Luyện đề Ngẫu nhiên"}
                            </button>
                          </div>
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-3.5 w-16 text-center">STT</th>
                                <th className="px-6 py-3.5">Tên đề luyện tập</th>
                                <th className="px-6 py-3.5 w-32 text-center">Số câu hỏi</th>
                                <th className="px-6 py-3.5 w-36 text-center">Trạng thái</th>
                                <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
                              {unit.exams.map((exam: any) => {
                                const currentIndex = ++globalIndex;
                                const isCompleted = exam.is_completed || completedExams.includes(exam.id);
                                
                                return (
                                  <tr 
                                    key={exam.id} 
                                    className={clsx(
                                      "transition-all duration-150 group hover:bg-slate-800/20",
                                      isCompleted && "text-slate-500"
                                    )}
                                  >
                                    <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                                      {currentIndex}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Link href={`/test-assessment?examId=${exam.id}`} className={clsx(
                                        "hover:text-cyan-400 transition-colors block leading-snug",
                                        isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold"
                                      )}>
                                        {exam.title}
                                      </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-black text-slate-300">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        {exam.total_questions || 15} Câu
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      {isCompleted ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                          <CheckCircle2 size={12} />
                                          Đã làm
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-black uppercase tracking-wider">
                                          <Play size={12} />
                                          Sẵn sàng
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <Link 
                                        href={`/test-assessment?examId=${exam.id}`}
                                        className={clsx(
                                          "inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                                          isCompleted 
                                            ? "border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white" 
                                            : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/10"
                                        )}
                                      >
                                        {isCompleted ? "Làm lại" : "Luyện tập"}
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
             })}
          </div>
        ))}

        {/* Tab Content: Reviews */}
        {!isLoading && activeTab === 'review' && (
          <div className="flex flex-col">
             {reviews.map((unit: any, unitIdx: number) => {
                const colorIdx = unitIdx % unitColors.length;
                const unitKey = `review-unit-${unit.unit}`;
                const isCollapsed = collapsedUnits[unitKey] !== false; // Default to true (collapsed)
                const completedCount = unit.exams.filter((exam: any) => exam.is_completed || completedExams.includes(exam.id)).length;
                const isPlaceholder = !unit.exams || unit.exams.length === 0;

                return (
                  <div key={`review-${unit.id}`} className="mb-12 flex flex-col items-stretch">
                    {/* Unit Header (Click to Toggle if not placeholder) */}
                    <div 
                      onClick={() => !isPlaceholder && toggleUnit(unitKey)}
                      className={clsx(
                        "mb-6 rounded-2xl p-5 text-white border relative overflow-hidden flex justify-between items-center transition-transform duration-100", 
                        !isPlaceholder ? "cursor-pointer active:scale-[0.99] select-none border-white/20 backdrop-blur-md" : "border-dashed border-slate-700/60 bg-slate-900/20 text-slate-500",
                        !isPlaceholder ? unitColors[colorIdx] : ""
                      )}
                      style={!isPlaceholder ? { boxShadow: `0 8px 32px ${unitGlows[colorIdx]}` } : undefined}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                      <div className="flex-1 pr-4">
                        <h2 className={clsx("text-2xl font-black tracking-wider drop-shadow-md line-clamp-1", isPlaceholder && "text-slate-500")}>
                          {unit.title}
                        </h2>
                        <p className={clsx("text-xs font-bold mt-1 line-clamp-2", isPlaceholder ? "text-slate-600" : "text-white/80")}>
                          {unit.description}
                        </p>
                        {!isPlaceholder && (
                          <p className="font-bold text-white/60 mt-1.5 uppercase tracking-widest text-[9px]">
                            {isCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 z-10">
                        {!isPlaceholder ? (
                          <>
                            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">
                              {completedCount}/{unit.exams.length} Đề
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                              {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </div>
                          </>
                        ) : (
                          <div className="bg-slate-900/60 px-3 py-1 rounded-full text-xs font-black border border-slate-800 text-slate-500">
                            Sắp ra mắt
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Assessments Table Layout */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && !isPlaceholder && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md shadow-xl"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/80 bg-slate-900/30">
                            <span className="text-xs font-bold text-slate-400">
                              Luyện tập đề: {unit.title}
                            </span>
                            <button
                              onClick={() => handleRandomFromUnit(unit.exams)}
                              disabled={isPickingRandom}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Sparkles size={14} className="animate-pulse" />
                              {isPickingRandom ? "Đang chọn..." : "Luyện đề Ngẫu nhiên"}
                            </button>
                          </div>
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-3.5 w-16 text-center">STT</th>
                                <th className="px-6 py-3.5">Tên đề luyện tập</th>
                                <th className="px-6 py-3.5 w-32 text-center">Số câu hỏi</th>
                                <th className="px-6 py-3.5 w-36 text-center">Trạng thái</th>
                                <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
                              {unit.exams.map((exam: any) => {
                                const currentIndex = ++globalIndex;
                                const isCompleted = exam.is_completed || completedExams.includes(exam.id);

                                return (
                                  <tr
                                    key={exam.id}
                                    className={clsx(
                                      "transition-all duration-150 group hover:bg-slate-800/20",
                                      isCompleted && "text-slate-500"
                                    )}
                                  >
                                    <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                                      {currentIndex}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Link href={`/test-assessment?examId=${exam.id}`} className={clsx(
                                        "hover:text-cyan-400 transition-colors block leading-snug",
                                        isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold"
                                      )}>
                                        {exam.title}
                                      </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-black text-slate-300">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        {exam.total_questions || 15} Câu
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      {isCompleted ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                          <CheckCircle2 size={12} />
                                          Đã làm
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-black uppercase tracking-wider">
                                          <Play size={12} />
                                          Sẵn sàng
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <Link 
                                        href={`/test-assessment?examId=${exam.id}`}
                                        className={clsx(
                                          "inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                                          isCompleted 
                                            ? "border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white" 
                                            : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/10"
                                        )}
                                      >
                                        {isCompleted ? "Làm lại" : "Luyện tập"}
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
             })}
          </div>
        )}

        {/* Tab Content: Reflex */}
        {!isLoading && activeTab === 'reflex' && (
          <div className="flex flex-col">
            {/* Time Settings Selector */}
            <div className="mb-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">⏱️ CÀI ĐẶT THỜI GIAN PHẢN XẠ</h3>
                <p className="text-xs text-slate-400 mt-1 font-bold">Chọn giới hạn thời gian làm bài cho mỗi câu hỏi. Mặc định là 30 giây.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {[10, 20, 30, 60].map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimerLimit(time)}
                    className={clsx(
                      "px-4 py-2 rounded-xl text-xs font-black transition-all select-none duration-150 active:scale-95",
                      timerLimit === time 
                        ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-rose-500/20" 
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {time} giây
                  </button>
                ))}
              </div>
            </div>

            {/* Loop through reflex volumes */}
            {reflexes.map((vol: any, volIdx: number) => {
              const completedCount = vol.exams.filter((exam: any) => exam.is_completed || completedExams.includes(exam.id)).length;

              return (
                <div key={`vol-${vol.volume}`} className="mb-16">
                   {/* Volume Header Banner with Random Exam button */}
                   <div className="mb-6 rounded-2xl p-5 text-white border relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-600/85 to-rose-600/85"
                        style={{ boxShadow: `0 8px 32px rgba(244,63,94,0.4)` }}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                      <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-black tracking-wider drop-shadow-md">
                          {vol.title}
                        </h2>
                        <p className="text-xs font-bold text-white/80 mt-1">
                          Tổng hợp các đề luyện tập phản xạ tính nhẩm nhanh.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 z-10 flex-wrap sm:flex-nowrap">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20 whitespace-nowrap">
                          Đã hoàn thành: {completedCount}/{vol.exams.length}
                        </div>
                        <button
                          onClick={() => handleRandomFromReflex(vol.exams)}
                          disabled={isPickingRandom}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-rose-600 font-extrabold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 hover:bg-slate-50"
                        >
                          <Sparkles size={14} className="animate-pulse" />
                          {isPickingRandom ? "Đang chọn..." : "Luyện đề Ngẫu nhiên"}
                        </button>
                      </div>
                   </div>

                   {/* Flat Exams Table directly under Volume */}
                   <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md shadow-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                            <th className="px-6 py-3.5 w-16 text-center">STT</th>
                            <th className="px-6 py-3.5">Tên đề luyện tập</th>
                            <th className="px-6 py-3.5 w-32 text-center">Số câu hỏi</th>
                            <th className="px-6 py-3.5 w-36 text-center">Trạng thái</th>
                            <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
                          {vol.exams.map((exam: any, examIdx: number) => {
                            const isCompleted = exam.is_completed || completedExams.includes(exam.id);
                            
                            return (
                              <tr 
                                key={exam.id} 
                                className={clsx(
                                  "transition-all duration-150 group hover:bg-slate-800/20",
                                  isCompleted && "text-slate-500"
                                )}
                              >
                                <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-orange-400 transition-colors">
                                  {examIdx + 1}
                                </td>
                                <td className="px-6 py-4">
                                  <Link href={`/test-assessment?examId=${exam.id}&timer=${timerLimit}`} className={clsx(
                                    "hover:text-orange-400 transition-colors block leading-snug",
                                    isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold"
                                  )}>
                                    {exam.title}
                                  </Link>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-black text-slate-300">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    {exam.total_questions || 20} Câu
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  {isCompleted ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                      <CheckCircle2 size={12} />
                                      Đã làm
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-wider">
                                      <Play size={12} />
                                      Sẵn sàng
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <Link 
                                    href={`/test-assessment?examId=${exam.id}&timer=${timerLimit}`}
                                    className={clsx(
                                      "inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                                      isCompleted 
                                        ? "border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white" 
                                        : "bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white shadow-md shadow-rose-500/10"
                                    )}
                                  >
                                    {isCompleted ? "Làm lại" : "Luyện tập"}
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                   </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && activeTab === 'lesson' && volumes.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
            No assessments found in this sector.
          </div>
        )}

        {!isLoading && activeTab === 'review' && reviews.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
            No review assessments found in this sector.
          </div>
        )}

        {!isLoading && activeTab === 'workbook' && workbooks.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5 backdrop-blur-md">
            <Trophy size={48} className="mx-auto text-slate-600 mb-4 animate-bounce" />
            <p className="text-slate-400 font-extrabold tracking-wider text-sm uppercase">Hiện tại chưa có đề luyện tập Sách bài tập</p>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">Hệ thống đang được cập nhật thêm các đề luyện tập mới ✨</p>
          </div>
        )}

        {!isLoading && activeTab === 'reflex' && reflexes.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
            Không tìm thấy đề luyện phản xạ cho môn học này.
          </div>
        )}

      </div>
    </main>
  );
}
