"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Play, Pause, RotateCcw, CheckCircle2, ChevronLeft, Zap } from "lucide-react";

export interface TeleprompterSentence {
  index: number;
  content: string;
}

interface Props {
  lessonTitle: string;
  sentences: TeleprompterSentence[];
  backUrl?: string;
  allSlugs?: string[];
}

const WPM = 130;

function getReadingDurationMs(text: string, speedMultiplier: number): number {
  const words = text.trim().split(/\s+/).length;
  const baseMs = (words / WPM) * 60 * 1000;
  return Math.max(1500, Math.round(baseMs / speedMultiplier));
}

const SPEEDS = [
  { label: "×0.5", value: 0.5 },
  { label: "×0.75", value: 0.75 },
  { label: "×1", value: 1 },
  { label: "×1.25", value: 1.25 },
  { label: "×1.5", value: 1.5 },
];

export default function TeleprompterClient({
  lessonTitle,
  sentences,
  backUrl = "/hoc-tap/mindset-ielts/phan-xa",
  allSlugs = [],
}: Props) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Core timer: advance sentences while playing
  useEffect(() => {
    if (!isPlaying || isDone) return;
    if (currentIdx === -1) {
      setCurrentIdx(0);
      return;
    }
    const duration = getReadingDurationMs(sentences[currentIdx]?.content ?? "", speed);
    const timer = setTimeout(() => {
      const next = currentIdx + 1;
      if (next >= sentences.length) {
        setIsDone(true);
        setIsPlaying(false);
      } else {
        setCurrentIdx(next);
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [isPlaying, currentIdx, speed, isDone, sentences]);

  // Auto-scroll active sentence to viewport center
  useEffect(() => {
    if (currentIdx >= 0) {
      sentenceRefs.current[currentIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentIdx]);

  const handleReset = () => {
    setCurrentIdx(-1);
    setIsPlaying(false);
    setIsDone(false);
    sentenceRefs.current[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRandom = () => {
    if (!allSlugs.length) return;
    const slug = allSlugs[Math.floor(Math.random() * allSlugs.length)];
    router.push(`/hoc-tap/mindset-ielts/phan-xa/${slug}`);
  };

  const progress =
    currentIdx < 0 ? 0 : Math.round(((currentIdx + 1) / sentences.length) * 100);
  const totalWords = sentences.reduce(
    (acc, s) => acc + s.content.trim().split(/\s+/).length,
    0
  );
  const estimatedMinutes = Math.ceil(totalWords / (WPM * speed));

  return (
    <div className="h-full bg-slate-950 flex flex-col overflow-hidden">
      {/* ── Controls header — always visible, no outer scroll needed ── */}
      <header className="shrink-0 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-2">
        {/* Row 1: back + title + stats */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(backUrl)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </button>
          <span className="flex-1 text-sm font-semibold text-white truncate">{lessonTitle}</span>
          <span className="text-[10px] text-slate-500 shrink-0">
            {sentences.length} câu · ~{estimatedMinutes} phút
          </span>
        </div>

        {/* Row 2: progress bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Row 3: play/pause + speed + counter */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                disabled={isDone}
                className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-green-500 disabled:opacity-40 transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                {currentIdx === -1 ? "Bắt đầu" : "Tiếp tục"}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-amber-500 transition-colors"
              >
                <Pause className="h-3.5 w-3.5" />
                Tạm dừng
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Làm lại
            </button>
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-slate-500 mr-1" />
            {SPEEDS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSpeed(s.value)}
                className={`rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                  speed === s.value
                    ? "bg-green-700 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 tabular-nums shrink-0">
            {Math.max(0, currentIdx + 1)}/{sentences.length}
          </span>
        </div>
      </header>

      {/* ── Scrollable sentence area ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-8 md:px-8">
        {/* Top spacer: first sentence appears near bottom on load */}
        <div className="h-[40vh]" aria-hidden />

        <div className="mx-auto max-w-2xl flex flex-col gap-3">
          {sentences.map((s, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;

            return (
              <div
                key={s.index}
                ref={(el) => {
                  sentenceRefs.current[i] = el;
                }}
                className={`rounded-xl px-5 py-3 transition-all duration-300 ${
                  isCurrent
                    ? "border-l-4 border-green-400 bg-green-950/40 shadow-lg shadow-green-950/30"
                    : isPast
                    ? "opacity-25"
                    : "opacity-60"
                }`}
              >
                <p
                  className={`leading-relaxed transition-all duration-300 ${
                    isCurrent
                      ? "text-green-300 text-xl font-semibold tracking-wide"
                      : isPast
                      ? "text-slate-500 text-sm"
                      : "text-slate-300 text-base"
                  }`}
                >
                  {s.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom spacer: last sentence can scroll to center */}
        <div className="h-[40vh]" aria-hidden />
      </main>

      {/* ── Completion overlay ── */}
      {isDone && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
          <div className="mx-4 max-w-md w-full rounded-3xl border border-green-900/60 bg-gradient-to-br from-green-950/80 via-slate-900 to-slate-950 p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-400 mb-4" />
            <h2 className="text-2xl font-extrabold text-white mb-2">Hoàn thành! 🎉</h2>
            <p className="text-slate-400 text-sm mb-6">
              Bạn vừa đọc xong{" "}
              <span className="text-white font-semibold">{totalWords} từ</span> — tuyệt vời!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Đọc lại bài này
              </button>
              {allSlugs.length > 1 && (
                <button
                  onClick={handleRandom}
                  className="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-bold text-white hover:bg-green-500 transition-colors"
                >
                  🎲 Bài ngẫu nhiên
                </button>
              )}
              <button
                onClick={() => router.push(backUrl)}
                className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Về danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
