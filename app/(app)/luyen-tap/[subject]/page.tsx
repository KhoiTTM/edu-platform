"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { getAssessmentMap } from "../actions";
import { useParams, useSearchParams } from "next/navigation";
import { Sparkles, Star, ChevronRight, CheckCircle2, Play, Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function SubjectMapPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subject = params.subject as string;
  const gradeParam = searchParams.get("grade");
  const gradeNum = gradeParam ? parseInt(gradeParam, 10) : undefined;
  const [mounted, setMounted] = useState(false);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [completedExams, setCompletedExams] = useState<string[]>([]);
  const [collapsedUnits, setCollapsedUnits] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const subjectName = subject ? subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  useEffect(() => {
    setMounted(true);
    if (subject) {
      async function loadData() {
          setIsLoading(true);
          const data = await getAssessmentMap(subject, gradeNum);
          setVolumes(data);
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

        {!isLoading && volumes.map((volume, volIndex) => (
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
                      <div>
                        <h2 className="text-2xl font-black tracking-wider drop-shadow-md">
                          {(unit.unit === 7 && subject === 'toan') || (unit.unit === 11 && subject === 'tieng_anh') ? "Ôn tập Học kỳ 1" : `Unit ${unit.unit}`}
                        </h2>
                        <p className="font-semibold text-white/80 mt-0.5 uppercase tracking-widest text-[10px]">
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
                                    {/* STT */}
                                    <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                                      {currentIndex}
                                    </td>

                                    {/* Exam Title */}
                                    <td className="px-6 py-4">
                                      <Link href={`/test-assessment?examId=${exam.id}`} className={clsx(
                                        "hover:text-cyan-400 transition-colors block leading-snug",
                                        isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold"
                                      )}>
                                        {exam.title}
                                      </Link>
                                    </td>

                                    {/* Question Count */}
                                    <td className="px-6 py-4 text-center">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-black text-slate-300">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        {exam.total_questions || 15} Câu
                                      </span>
                                    </td>

                                    {/* Status */}
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

                                    {/* Action Button */}
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

        {!isLoading && volumes.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
            No assessments found in this sector.
          </div>
        )}
      </div>
    </main>
  );
}
