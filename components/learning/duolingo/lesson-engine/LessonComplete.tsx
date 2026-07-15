"use client";

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy } from 'lucide-react';
import Link from 'next/link';
import { XPToast } from '../../../gamification/XPToast';
import { StreakFlame } from '../../../gamification/StreakFlame';

import { submitLesson } from '@/app/(app)/(assessment)/luyen-tap/actions';

interface LessonCompleteProps {
  isVictory: boolean;
  xp?: number;
  streak?: number;
  nodeId?: string;
  durationSeconds?: number;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({ isVictory, xp = 10, streak = 0, nodeId, durationSeconds }) => {
  useEffect(() => {
    if (!isVictory) return;

    // Trigger confetti once on mount
    const duration = 2000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: any = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    return () => clearInterval(interval);
  }, [isVictory]);

  useEffect(() => {
    console.log('Submitting lesson result:', { isVictory, xp, streak, nodeId, durationSeconds });
    if (nodeId) {
      submitLesson(nodeId, isVictory, xp, streak, durationSeconds).catch(console.error);
    } else {
      fetch('/api/assessment/submit', {
        method: 'POST',
        body: JSON.stringify({ isVictory, xp, streak, durationSeconds })
      }).catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-6 py-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6 w-full max-w-sm">
        <div className={`w-32 h-32 rounded-3xl mx-auto flex items-center justify-center shadow-2xl transition-transform duration-500 hover:rotate-6 ${
          isVictory 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/20' 
            : 'bg-gradient-to-br from-slate-600 to-slate-800 shadow-slate-900/20'
        }`}>
          {isVictory ? (
            <Trophy className="w-16 h-16 text-white" />
          ) : (
            <X className="w-16 h-16 text-white" />
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-ink tracking-tight">
            {isVictory ? 'Mission Accomplished! 🎉' : 'Game Over'}
          </h2>
          <p className="text-lg font-bold text-ink-muted">
            {isVictory ? 'You successfully completed the lesson.' : 'You ran out of hearts.'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          {isVictory && <XPToast xp={xp} visible={true} />}
          {streak > 0 && <StreakFlame streak={streak} showBoost={isVictory} />}
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm mt-8">
        <Link
          href="/luyen-tap"
          className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-3xl font-black text-xl transition-all shadow-[0_6px_0_rgb(16,185,129)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
        >
          {isVictory ? 'CONTINUE' : 'BACK TO MAP'}
        </Link>
        {!isVictory && (
          <Link
            href="/luyen-tap/review"
            className="w-full px-8 py-4 bg-surface-raised text-purple-400 rounded-3xl font-black text-xl transition-all shadow-[0_6px_0_rgb(30,41,59)] border-2 border-line hover:bg-slate-700 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
          >
            RESTORE HEARTS ❤️
          </Link>
        )}
      </div>
    </div>
  );
};
