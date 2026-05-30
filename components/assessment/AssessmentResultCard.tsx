"use client";

import React, { useEffect, useRef } from 'react';

interface AssessmentResultCardProps {
  score: number;
  correctCount: number;
  totalCount: number;
  onContinue: () => void;
}

export function AssessmentResultCard({ score, correctCount, totalCount, onContinue }: AssessmentResultCardProps) {
  const passed = score >= 50;
  const incorrectCount = totalCount - correctCount;
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playNote = (freq: number, type: OscillatorType, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      if (passed) {
        // Fanfare (Victory)
        playNote(523.25, 'triangle', now, 0.15); // C5
        playNote(523.25, 'triangle', now + 0.15, 0.15); // C5
        playNote(523.25, 'triangle', now + 0.3, 0.15); // C5
        playNote(659.25, 'triangle', now + 0.45, 0.3); // E5
        playNote(783.99, 'triangle', now + 0.75, 0.5); // G5
      } else {
        // Try again (Sad Tromboneish)
        playNote(392.00, 'sawtooth', now, 0.3); // G4
        playNote(370.00, 'sawtooth', now + 0.3, 0.3); // Gb4
        playNote(349.23, 'sawtooth', now + 0.6, 0.3); // F4
        playNote(329.63, 'sawtooth', now + 0.9, 0.6); // E4
      }
    } catch(e) {}
  }, [passed]);

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center border border-slate-200 dark:border-slate-700">
      <div className={`w-32 h-32 flex items-center justify-center rounded-full text-4xl font-bold text-white mb-6 ${passed ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]'} shadow-lg`}>
        {score.toFixed(0)}%
      </div>

      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
        {passed ? 'Tuyệt vời!' : 'Cố gắng lên nhé!'}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {passed ? 'Bạn đã hoàn thành rất tốt bài tập này.' : 'Hãy ôn tập thêm để làm tốt hơn ở lần sau.'}
      </p>

      <div className="w-full mb-8">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Chi tiết bài làm</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Số câu đúng
            </span>
            <span className="font-bold text-emerald-500 text-xl">
              {correctCount}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Số câu sai
            </span>
            <span className="font-bold text-rose-500 text-xl">
              {incorrectCount}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Tổng số câu
            </span>
            <span className="font-bold text-sky-500 text-xl">
              {totalCount}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 bg-sky-500 dark:bg-sky-600 text-white font-bold rounded-xl shadow-[0_6px_0_rgb(14,165,233)] dark:shadow-[0_6px_0_rgb(2,132,199)] active:translate-y-[6px] active:shadow-none hover:bg-sky-400 dark:hover:bg-sky-500 transition-all text-lg tracking-wide"
      >
        Tiếp tục
      </button>
    </div>
  );
}
