"use client";

import { useState, useEffect } from "react";
import { Sparkles, Trophy, ArrowRight, RefreshCw, Star } from "lucide-react";
import { useTrackEvent } from "@/hooks/useTrackEvent";

interface Props {
  score: number;
  total: number;
  studentName: string;
  lessonTitle: string;
  unitId: string;
  onRestart: () => void;
}

export function AriaDebrief({ score, total, studentName, lessonTitle, unitId, onRestart }: Props) {
  const [debrief, setDebrief] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const trackEvent = useTrackEvent();

  useEffect(() => {
    // Track quiz completion
    trackEvent({
      type: "quiz_completed",
      subject_slug: "mindset-ielts",
      session_id: unitId,
      metadata: {
        quiz_id: lessonTitle,
        score,
        total,
        accuracy: Math.round((score / total) * 100)
      }
    });

    const fetchDebrief = async () => {
      try {
        const response = await fetch("/api/ai/teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "debrief",
            studentName,
            sessionInfo: { title: lessonTitle },
            messages: [{ role: "user", content: `I got ${score} out of ${total} correct.` }],
          }),
        });
        const data = await response.json();
        if (data.text) setDebrief(data.text);
      } catch (error) {
        console.error("Debrief Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDebrief();
  }, [score, total, studentName, lessonTitle, trackEvent, unitId]);

  const getRank = () => {
    const pct = (score / total) * 100;
    if (pct === 100) return { label: "Perfect! 🌟", color: "text-amber-400" };
    if (pct >= 80) return { label: "Excellent! 🚀", color: "text-emerald-400" };
    if (pct >= 60) return { label: "Good work! 💪", color: "text-sky-400" };
    return { label: "Keep practicing! 🌱", color: "text-slate-400" };
  };

  const rank = getRank();

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-surface/40 p-6 shadow-2xl backdrop-blur-md space-y-6 animate-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
          <Trophy className="text-amber-500" size={32} />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">SESSION COMPLETE</h2>
        <p className="text-sm text-slate-400 italic">&quot;Another step closer to your IELTS goal, {studentName}!&quot;</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-950/60 border border-line p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Final Score</p>
          <p className="mt-1 text-2xl font-black text-white">{score} <span className="text-sm text-slate-500">/ {total}</span></p>
        </div>
        <div className="rounded-xl bg-slate-950/60 border border-line p-4 text-center flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rank</p>
          <p className={`mt-1 text-xs font-black uppercase tracking-wide ${rank.color}`}>{rank.label}</p>
        </div>
      </div>

      <div className="rounded-xl bg-sky-950/20 border border-sky-900/30 p-5 space-y-3">
        <div className="flex items-center gap-2 border-b border-sky-900/20 pb-2">
          <Sparkles size={14} className="text-sky-400" />
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400">Coach Aria&apos;s Take</p>
        </div>
        
        {isLoading ? (
          <div className="space-y-2 py-2">
            <div className="h-3 w-3/4 rounded bg-surface-raised animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-surface-raised animate-pulse" />
          </div>
        ) : (
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
            {debrief || "You've done a great job today! Keep up the momentum."}
          </p>
        )}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-indigo-900/40 to-sky-900/40 border border-indigo-500/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-indigo-400 fill-indigo-400" />
          <h4 className="text-xs font-black text-white uppercase tracking-tight">Speaking Journey Unlocked</h4>
        </div>
        <p className="text-xs text-indigo-200 leading-relaxed">
          Ready to actually speak about this topic? Start your Speaking Journey now.
        </p>
        <button
          onClick={() => window.location.href = `/speaking/${unitId}/session-1`}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          Start Speaking Session 1 <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-surface-raised py-3 text-xs font-bold text-white transition hover:bg-slate-700 active:scale-95"
        >
          <RefreshCw size={14} /> Review & Retry
        </button>
        <button
          onClick={() => window.location.href = "/listening"}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-xs font-bold text-white transition hover:bg-sky-500 shadow-lg shadow-sky-600/20 active:scale-95"
        >
          Finish Session <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
