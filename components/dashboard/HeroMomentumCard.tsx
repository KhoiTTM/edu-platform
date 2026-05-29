"use client";

import { Flame, Timer, Trophy, ShieldAlert, Zap } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-3xl border-2 border-[#201625] bg-gradient-to-br from-[#2e1c3b] via-[#1a0f26] to-[#0e0717] p-4 sm:p-5 shadow-[0_6px_0_#150b1a,0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-300">
      {/* Decorative magical ambient glows */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Side: Avatar/Rank Info */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-pink-500 border-2 border-purple-200 shadow-[0_4px_0_#3b0764,0_5px_10px_rgba(168,85,247,0.3)]">
            <span className="text-2xl filter drop-shadow-md select-none">{getRankBadge()}</span>
            <div className="absolute top-1 left-2 right-2 h-2.5 bg-white/20 rounded-full pointer-events-none"></div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">DANH HIỆU HIỆN TẠI</p>
            <h2 className="text-xl font-black text-white tracking-tight leading-none uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {getTitle()}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
              <Trophy size={14} className="text-yellow-400" />
              <span>Cố gắng lên nhé!</span>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Grids for Stats */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {/* Streak Card */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-purple-950/50 rounded-2xl p-3 shadow-inner min-w-[120px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-orange-400 to-red-500 border-2 border-orange-200 text-white shadow-[0_4px_0_#9a3412]">
              <Flame size={20} fill="currentColor" className="animate-pulse" />
            </div>
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Chuỗi ngày</p>
              <p className="text-lg font-black text-white">{streak} Ngày</p>
            </div>
          </div>

          {/* Focus Time Card */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-purple-950/50 rounded-2xl p-3 shadow-inner min-w-[120px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-sky-400 to-blue-500 border-2 border-sky-200 text-white shadow-[0_4px_0_#0369a1]">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Thời gian học</p>
              <p className="text-lg font-black text-white">{totalMinutes} Phút</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
