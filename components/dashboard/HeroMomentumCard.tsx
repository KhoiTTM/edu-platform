"use client";

import { Flame, Timer, Trophy } from "lucide-react";

interface HeroMomentumCardProps {
  streak: number;
  totalMinutes: number;
}

export function HeroMomentumCard({ streak, totalMinutes }: HeroMomentumCardProps) {
  const getTitle = () => {
    if (totalMinutes > 300) return "Master Scholar 👑";
    if (totalMinutes > 120) return "Active Learner 🚀";
    if (totalMinutes > 60) return "The Fearless Speaker 🗣️";
    return "Rising Star 🌱";
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-700 p-8 shadow-2xl shadow-sky-600/20">
      {/* Decorative background circles */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-100/80">Current Identity</p>
          <h2 className="text-3xl font-black text-white tracking-tight">{getTitle()}</h2>
          <div className="flex items-center gap-2 text-sky-100">
            <Trophy size={16} />
            <span className="text-sm font-medium">Keep going to unlock new ranks!</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-8">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
              <Flame size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-100/70">Learning Streak</p>
              <p className="text-2xl font-black text-white">{streak} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400 text-white shadow-lg shadow-sky-400/20">
              <Timer size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-100/70">Focus Time</p>
              <p className="text-2xl font-black text-white">{totalMinutes} Mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
