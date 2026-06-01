"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getAssessmentMap } from "../actions";
import { useParams } from "next/navigation";
import { Sparkles, Star, ChevronRight } from "lucide-react";

const AssessmentCard = ({
  exam,
  index,
  unitColor,
  unitShadow,
  unitGlow,
  isCompleted,
}: {
  exam: any;
  index: number;
  unitColor: string;
  unitShadow: string;
  unitGlow: string;
  isCompleted?: boolean;
}) => {
  const isLocked = false; // For now all assessments are unlocked
  const isCurrent = index === 0;

  const content = (
    <motion.div
      whileHover={(!isLocked && !isCompleted) ? { scale: 1.03, y: -4 } : {}}
      whileTap={(!isLocked && !isCompleted) ? { scale: 0.97 } : {}}
      className={clsx(
        "relative flex flex-col p-5 rounded-2xl text-white transition-all duration-300 w-full h-full border border-white/10 backdrop-blur-sm",
        isLocked ? "bg-slate-800/50" : (isCompleted ? "bg-slate-900/60" : unitColor),
        isLocked ? "shadow-md" : (isCompleted ? "shadow-inner border-white/5" : unitShadow),
        isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer",
        isCompleted && !isLocked && "opacity-40 grayscale"
      )}
      style={(!isLocked && !isCompleted) ? { boxShadow: `0 8px 32px 0 ${unitGlow}, inset 0 0 20px rgba(255,255,255,0.2)` } : {}}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm backdrop-blur-sm">
          Đã làm
        </div>
      )}
      {isCurrent && !isCompleted && (
        <div className="absolute -top-3 -right-3 animate-pulse">
            <Sparkles className="text-amber-300 w-8 h-8 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/20 rounded-full font-black text-xl border border-white/30 shadow-inner">
          {index + 1}
        </div>
        <div className="flex flex-col flex-1">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 drop-shadow-md text-white">
                {exam.title}
            </h3>
            <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-semibold text-white/90 flex items-center gap-1 bg-black/20 px-2 py-1 rounded-md">
                    <Star size={14} className="inline text-amber-300" fill="currentColor" /> 
                    {exam.total_questions || 15} Câu
                </span>
                {!isLocked && (
                    <ChevronRight size={18} className="text-white/70" />
                )}
            </div>
        </div>
      </div>
    </motion.div>
  );

  const href = `/test-assessment?examId=${exam.id}`;

  return (
    <div className="w-full h-full">
      {!isLocked ? <Link href={href} className="block w-full h-full">{content}</Link> : content}
    </div>
  );
};

export default function SubjectMapPage() {
  const params = useParams();
  const subject = params.subject as string;
  const [mounted, setMounted] = useState(false);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [completedExams, setCompletedExams] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const subjectName = subject ? subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  useEffect(() => {
    setMounted(true);
    if (subject) {
      async function loadData() {
          setIsLoading(true);
          const data = await getAssessmentMap(subject);
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
  }, [subject]);

  if (!mounted || !subject) return (
    <div className="flex items-center justify-center h-full bg-slate-900 text-white">
        <p>Loading subject...</p>
    </div>
  );

  let globalIndex = 0;
  
  // Neon Space Colors
  const unitColors = [
    "bg-indigo-600/80", 
    "bg-fuchsia-600/80", 
    "bg-cyan-600/80", 
    "bg-emerald-600/80"
  ];
  const unitShadows = [
    "shadow-[0_4px_0_rgb(67,56,202)]", 
    "shadow-[0_4px_0_rgb(192,38,211)]", 
    "shadow-[0_4px_0_rgb(8,145,178)]", 
    "shadow-[0_4px_0_rgb(5,150,105)]"
  ];
  const unitGlows = [
    "rgba(79,70,229,0.5)",
    "rgba(217,70,239,0.5)",
    "rgba(6,182,212,0.5)",
    "rgba(16,185,129,0.5)"
  ];

  return (
    <main className="mx-auto flex min-h-dvh w-full flex-col pb-20 relative">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-6 py-4 shadow-lg">
        <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm tracking-wide">
            {subjectName}
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
                return (
                  <div key={`unit-${unit.unit}`} className="mb-12 flex flex-col items-center">
                    {/* Unit Header */}
                    <div className={clsx(
                        "mb-8 w-full rounded-2xl p-6 text-white border border-white/20 backdrop-blur-md relative overflow-hidden", 
                        unitColors[colorIdx]
                    )}
                    style={{ boxShadow: `0 0 30px ${unitGlows[colorIdx]}` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                      <h2 className="text-3xl font-black tracking-wider drop-shadow-md">
                        {(unit.unit === 7 && subject === 'toan') || (unit.unit === 11 && subject === 'tieng_anh') ? "Ôn tập Học kỳ 1" : `Unit ${unit.unit}`}
                      </h2>
                      <p className="font-bold text-white/90 mt-1 uppercase tracking-widest text-sm">Nhiệm vụ vũ trụ</p>
                    </div>

                    {/* Assessments Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
                      {unit.exams.map((exam: any) => {
                        const currentIndex = globalIndex++;
                        return (
                          <AssessmentCard
                            key={exam.id}
                            exam={exam}
                            index={currentIndex}
                            unitColor={unitColors[colorIdx]}
                            unitShadow={unitShadows[colorIdx]}
                            unitGlow={unitGlows[colorIdx]}
                            isCompleted={exam.is_completed || completedExams.includes(exam.id)}
                          />
                        );
                      })}
                    </div>
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
