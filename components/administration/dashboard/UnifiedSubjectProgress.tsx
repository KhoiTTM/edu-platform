"use client";

import { GraduationCap, Calculator, BookOpen, Globe, Microscope, ChevronRight, Book } from "lucide-react";
import Link from "next/link";

interface SubjectStats {
  sessions_completed: number;
  total_minutes: number;
}

interface UnifiedSubjectProgressProps {
  subjectsList: [string, string][]; // List of [slug, label_vi] from database
  subjectProgress: Record<string, SubjectStats>;
}

// Config mapper for subjects to match UI styling dynamically
const subjectConfig: Record<string, {
  icon: any;
  color: string;
  barColor: string;
  borderColor: string;
  rootSlug: string;
}> = {
  "mindset-ielts": {
    icon: GraduationCap,
    color: "text-sky-400",
    barColor: "bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]",
    borderColor: "border-sky-500/20",
    rootSlug: "ielts-foundation"
  },
  "toan": {
    icon: Calculator,
    color: "text-emerald-400",
    barColor: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
    borderColor: "border-emerald-500/20",
    rootSlug: "lop-3"
  },
  "tieng_anh": {
    icon: Globe,
    color: "text-indigo-400",
    barColor: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]",
    borderColor: "border-indigo-500/20",
    rootSlug: "lop-3"
  },
  "khoa_hoc": {
    icon: Microscope,
    color: "text-pink-400",
    barColor: "bg-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
    borderColor: "border-pink-500/20",
    rootSlug: "lop-3"
  },
  "tieng_viet": {
    icon: BookOpen,
    color: "text-amber-400",
    barColor: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
    borderColor: "border-amber-500/20",
    rootSlug: "lop-3"
  }
};

export function UnifiedSubjectProgress({ subjectsList, subjectProgress }: UnifiedSubjectProgressProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subjectsList.map(([slug, label]) => {
        // Fallback config if subject is not explicitly configured
        const config = subjectConfig[slug] || {
          icon: Book,
          color: "text-violet-400",
          barColor: "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]",
          borderColor: "border-violet-500/20",
          rootSlug: "lop-3"
        };

        const stats = subjectProgress[slug] || { sessions_completed: 0, total_minutes: 0 };
        const progress = Math.min(100, stats.sessions_completed * 5);
        const Icon = config.icon;

        // Redirect URL logic: use rootSlug if available in config, fallback to legacy route
        const targetUrl = config.rootSlug 
          ? `/learn/${slug}/${config.rootSlug}`
          : `/hoc-tap/${slug}`;

        return (
          <Link 
            key={slug} 
            href={targetUrl}
            className={`
              relative p-6 rounded-[2.5rem] border-4 border-slate-800 bg-slate-900/40 space-y-5
              shadow-[0_10px_0_#1e293b,0_15px_30px_rgba(0,0,0,0.5)] 
              transition-all duration-150 active:translate-y-[4px] active:shadow-[0_6px_0_#1e293b]
              hover:scale-[1.01] hover:border-slate-700/80 group
            `}
          >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 ${config.color}`}>
                        <Icon size={22} />
                    </div>
                    <h3 className="font-black text-white uppercase tracking-wider text-base drop-shadow-md">{label}</h3>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 shadow-inner">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Buổi đã học</p>
                <p className="text-xl font-black text-white">{stats.sessions_completed}</p>
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Thời gian học</p>
                <p className="text-xl font-black text-white">{stats.total_minutes}m</p>
              </div>
            </div>

            {/* Glowing neon progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Tiến độ hiện tại</span>
                <span className={config.color}>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950/60 rounded-full overflow-hidden p-0.5 border border-slate-800/60 shadow-inner">
                <div 
                  className={`h-full rounded-full ${config.barColor} transition-all duration-1000`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
