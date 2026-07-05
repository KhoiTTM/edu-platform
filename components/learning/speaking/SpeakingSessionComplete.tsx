"use client";

import { Trophy, ChevronRight, Share2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface SpeakingSessionCompleteProps {
  unitId: string;
  unitTopic: string;
  sessionNumber: number;
  turnCount: number;
  avgWords: number;
  bestMoment: string | null;
}

export function SpeakingSessionComplete({ 
  unitId,
  unitTopic, 
  sessionNumber, 
  turnCount, 
  avgWords, 
  bestMoment 
}: SpeakingSessionCompleteProps) {
  
  useEffect(() => {
    // Celebration confetti!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-amber-500/20 rotate-3 animate-bounce-slow">
          <Trophy size={40} className="text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <Sparkles className="text-amber-400" /> Session Complete! 🎉
          </h2>
          <p className="text-slate-400">You crushed Speaking Session {sessionNumber} for {unitTopic}.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-surface-raised/50 border border-line rounded-3xl text-center space-y-1 hover:bg-surface-raised transition-colors">
          <p className="text-3xl font-black text-white">{turnCount}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Turns Spoken</p>
        </div>
        <div className="p-6 bg-surface-raised/50 border border-line rounded-3xl text-center space-y-1 hover:bg-surface-raised transition-colors">
          <p className="text-3xl font-black text-white">{avgWords}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Avg Words / Turn</p>
        </div>
      </div>

      {bestMoment && (
        <div className="p-8 bg-gradient-to-br from-sky-900/40 to-indigo-950/40 border border-sky-500/30 rounded-3xl space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Share2 size={40} className="text-sky-400" />
          </div>
          
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
              <Sparkles size={12} /> Your Best Moment
            </h4>
            <p className="text-xl font-medium text-white leading-relaxed italic">
              &ldquo;{bestMoment}&rdquo;
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-500">— Session {sessionNumber} Highlight</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(bestMoment);
                alert("Copied your best moment to clipboard! ✨");
              }}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 transition flex items-center gap-1"
            >
              <Share2 size={12} /> Share this line
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link 
          href="/dashboard"
          className="flex-1 px-8 py-4 bg-surface-raised text-white rounded-2xl font-bold hover:bg-slate-700 transition flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Lessons
        </Link>
        
        {sessionNumber < 4 && (
          <Link
            href={`/speaking/${unitId}/session-${sessionNumber + 1}`}
            className="flex-1 px-8 py-4 bg-sky-600 text-white rounded-2xl font-bold hover:bg-sky-500 transition flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-95"
          >
            Start Session {sessionNumber + 1} <ChevronRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}

