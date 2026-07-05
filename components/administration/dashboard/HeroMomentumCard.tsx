"use client";

import { Flame, Timer, Trophy } from "lucide-react";

interface HeroMomentumCardProps {
  streak: number;
  totalMinutes: number;
}

export function HeroMomentumCard({ streak, totalMinutes }: HeroMomentumCardProps) {
  const getTitle = () => {
    if (totalMinutes > 300) return "Master Scholar";
    if (totalMinutes > 120) return "Active Learner";
    if (totalMinutes > 60) return "The Fearless Speaker";
    return "Rising Star";
  };

  const getRankBadge = () => {
    if (totalMinutes > 300) return "👑";
    if (totalMinutes > 120) return "🔥";
    if (totalMinutes > 60) return "🗣️";
    return "🌱";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#201625] bg-gradient-to-br from-[#2e1c3b] via-[#1a0f26] to-[#0e0717] px-3 py-2 shadow-md transition-all duration-300">
      {/* Ambient glows */}
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        
        {/* Rank Badge */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 via-indigo-600 to-pink-500 border border-purple-200 shadow-sm">
          <span className="text-sm filter drop-shadow-md select-none">{getRankBadge()}</span>
        </div>

        {/* Title */}
        <div className="min-w-0">
          <p className="text-[9px] font-black uppercase tracking-widest text-purple-400 leading-none mb-0.5">Danh hiệu</p>
          <p className="text-xs font-black text-white uppercase truncate leading-none">{getTitle()}</p>
        </div>

        {/* Divider */}
        <div className="h-7 w-px bg-purple-900/60 shrink-0" />

        {/* Streak */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-b from-orange-400 to-red-500 text-white shadow-sm">
            <Flame size={12} fill="currentColor" className="animate-pulse" />
          </div>
          <div>
            <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-500 leading-none">Chuỗi</p>
            <p className="text-xs font-black text-white leading-none">{streak}N</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-7 w-px bg-purple-900/60 shrink-0" />

        {/* Time */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-b from-sky-400 to-blue-500 text-white shadow-sm">
            <Timer size={12} />
          </div>
          <div>
            <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-500 leading-none">Giờ học</p>
            <p className="text-xs font-black text-white leading-none">{totalMinutes}P</p>
          </div>
        </div>

      </div>
    </div>
  );
}
