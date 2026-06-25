"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import {
  BookOpen, Star, Trophy, ChevronLeft, ChevronRight, ArrowLeft,
  Volume2, RotateCcw, CheckCircle2, XCircle, Sparkles, Brain,
  Eye, PenLine, Shuffle, Target, Zap, Clock
} from "lucide-react";
import { vocabTopics, allVocabWords, VocabWord, VocabTopic, getDistractors } from "@/lib/data/startersVocabulary";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type ExerciseMode = "flashcard" | "multiple-choice" | "type-answer" | "listening";
type QuizDirection = "en-to-vi" | "vi-to-en";

interface SessionStats {
  correct: number;
  incorrect: number;
  total: number;
  streak: number;
  bestStreak: number;
}

interface Props {
  topicId?: string; // null = all topics / mixed
  backUrl?: string;
}

// ─── TTS Helper ───────────────────────────────────────────────────────────────

function speak(text: string, lang = "en-US") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

// ─── Flashcard View ───────────────────────────────────────────────────────────

function FlashcardView({ words }: { words: VocabWord[] }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const word = words[idx];

  const markKnown = () => {
    setKnown(prev => new Set([...prev, word.id]));
    if (idx < words.length - 1) { setIdx(i => i + 1); setFlipped(false); }
  };
  const markUnknown = () => {
    setKnown(prev => { const s = new Set(prev); s.delete(word.id); return s; });
    if (idx < words.length - 1) { setIdx(i => i + 1); setFlipped(false); }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="w-full flex items-center gap-3">
        <span className="text-xs text-slate-400 min-w-[40px]">{idx + 1}/{words.length}</span>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${((idx + 1) / words.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-emerald-400 min-w-[50px] text-right">✓ {known.size} biết</span>
      </div>

      {/* Flashcard */}
      <div
        className="relative w-full cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front - English */}
          <div
            className="w-full rounded-3xl border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-10 flex flex-col items-center justify-center gap-4 min-h-[260px] shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-6xl mb-2">{word.emoji || "📖"}</span>
            <h2 className="text-4xl font-black text-white tracking-tight text-center">{word.english}</h2>
            <span className="text-xs font-semibold bg-slate-700/60 text-slate-400 px-3 py-1 rounded-full uppercase">
              {word.partOfSpeech}
            </span>
            <p className="text-xs text-slate-500 mt-2 italic">Chạm để lật</p>
          </div>

          {/* Back - Vietnamese */}
          <div
            className="absolute inset-0 w-full rounded-3xl border-2 border-sky-500/50 bg-gradient-to-br from-sky-950 to-slate-900 p-10 flex flex-col items-center justify-center gap-4 min-h-[260px] shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-6xl mb-2">{word.emoji || "📖"}</span>
            <h2 className="text-2xl font-black text-sky-300 text-center">{word.vietnamese}</h2>
            <p className="text-lg font-bold text-white mt-1 text-center">{word.english}</p>
            <button
              onClick={e => { e.stopPropagation(); speak(word.english); }}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/20 border border-sky-500/30 rounded-xl text-sky-400 text-xs font-semibold hover:bg-sky-500/30 transition"
            >
              <Volume2 size={13} /> Nghe phát âm
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full">
        <button
          onClick={markUnknown}
          disabled={idx >= words.length - 1 && !flipped}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold text-sm hover:bg-rose-500/20 transition disabled:opacity-40"
        >
          <XCircle size={16} /> Chưa nhớ
        </button>
        <button
          onClick={() => speak(word.english)}
          className="px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <Volume2 size={16} />
        </button>
        <button
          onClick={markKnown}
          disabled={idx >= words.length - 1 && !flipped}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold text-sm hover:bg-emerald-500/20 transition disabled:opacity-40"
        >
          <CheckCircle2 size={16} /> Đã nhớ!
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => { if (idx > 0) { setIdx(i => i - 1); setFlipped(false); } }}
          disabled={idx === 0}
          className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => { if (idx < words.length - 1) { setIdx(i => i + 1); setFlipped(false); } }}
          disabled={idx === words.length - 1}
          className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Multiple Choice Quiz ─────────────────────────────────────────────────────

function MultipleChoiceQuiz({
  words, direction, onComplete
}: {
  words: VocabWord[]; direction: QuizDirection; onComplete: (stats: SessionStats) => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState<SessionStats>({ correct: 0, incorrect: 0, total: 0, streak: 0, bestStreak: 0 });

  const shuffledWords = useRef([...words].sort(() => Math.random() - 0.5));
  const word = shuffledWords.current[qIdx];

  // Generate 4 choices (1 correct + 3 distractors)
  const choices = useRef<VocabWord[]>([]);
  useEffect(() => {
    const distractors = getDistractors(word, 3);
    choices.current = [...distractors, word].sort(() => Math.random() - 0.5);
    setSelected(null);
    setAnswered(false);
    // Auto-speak the word for en-to-vi direction
    if (direction === "en-to-vi") {
      setTimeout(() => speak(word.english), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx]);

  const handleSelect = (choiceWord: VocabWord) => {
    if (answered) return;
    setSelected(choiceWord.id);
    setAnswered(true);
    const isCorrect = choiceWord.id === word.id;
    if (isCorrect) speak(word.english);

    setStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
        total: prev.total + 1,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });

    if (isCorrect && (stats.streak + 1) % 5 === 0) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
    }
  };

  const next = () => {
    if (qIdx >= shuffledWords.current.length - 1) {
      onComplete(stats);
    } else {
      setQIdx(i => i + 1);
    }
  };

  const question = direction === "en-to-vi"
    ? `"${word.english}" nghĩa là gì?`
    : `Từ tiếng Anh của "${word.vietnamese}" là gì?`;

  const choiceLabel = (w: VocabWord) => direction === "en-to-vi" ? w.vietnamese : w.english;

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-bold text-white">{qIdx + 1}</span> / {shuffledWords.current.length}
          {stats.streak >= 3 && (
            <span className="ml-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full font-bold">
              🔥 {stats.streak} liên tiếp!
            </span>
          )}
        </div>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-400 font-bold">✓ {stats.correct}</span>
          <span className="text-rose-400 font-bold">✗ {stats.incorrect}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-500"
          style={{ width: `${((qIdx + 1) / shuffledWords.current.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-3xl border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center shadow-xl">
        <span className="text-5xl mb-4 block">{word.emoji || "📖"}</span>
        {direction === "vi-to-en" && (
          <p className="text-3xl font-black text-white mb-2">{word.vietnamese}</p>
        )}
        {direction === "en-to-vi" && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl font-black text-sky-300">{word.english}</p>
            <button
              onClick={() => speak(word.english)}
              className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs rounded-xl hover:bg-sky-500/20 transition"
            >
              <Volume2 size={12} /> Nghe
            </button>
          </div>
        )}
        <p className="text-sm text-slate-400 mt-4 font-medium">{question}</p>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 gap-3">
        {choices.current.map((choice) => {
          const isCorrect = choice.id === word.id;
          const isSelected = choice.id === selected;
          let style = "border-slate-700 bg-slate-800/40 text-slate-200 hover:border-sky-500/50 hover:bg-slate-700/60";
          if (answered && isCorrect) style = "border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold";
          else if (answered && isSelected && !isCorrect) style = "border-rose-500 bg-rose-500/15 text-rose-300";

          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice)}
              disabled={answered}
              className={`relative w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 ${style} disabled:cursor-default`}
            >
              <span className="mr-3 text-lg">{choice.emoji}</span>
              {choiceLabel(choice)}
              {answered && isCorrect && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />}
              {answered && isSelected && !isCorrect && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-400" size={18} />}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={next}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wide shadow-lg transition active:scale-95"
        >
          {qIdx >= shuffledWords.current.length - 1 ? "Xem kết quả 🏆" : "Câu tiếp theo →"}
        </button>
      )}
    </div>
  );
}

// ─── Listening Quiz ───────────────────────────────────────────────────────────

function ListeningQuiz({
  words, onComplete
}: {
  words: VocabWord[]; onComplete: (stats: SessionStats) => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState<SessionStats>({ correct: 0, incorrect: 0, total: 0, streak: 0, bestStreak: 0 });
  const shuffledWords = useRef([...words].sort(() => Math.random() - 0.5));
  const word = shuffledWords.current[qIdx];
  const choices = useRef<VocabWord[]>([]);

  useEffect(() => {
    const distractors = getDistractors(word, 3);
    choices.current = [...distractors, word].sort(() => Math.random() - 0.5);
    setSelected(null);
    setAnswered(false);
    // Auto play audio
    setTimeout(() => speak(word.english), 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx]);

  const handleSelect = (choiceWord: VocabWord) => {
    if (answered) return;
    setSelected(choiceWord.id);
    setAnswered(true);
    const isCorrect = choiceWord.id === word.id;
    setStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return { correct: prev.correct + (isCorrect ? 1 : 0), incorrect: prev.incorrect + (isCorrect ? 0 : 1), total: prev.total + 1, streak: newStreak, bestStreak: Math.max(prev.bestStreak, newStreak) };
    });
  };

  const next = () => {
    if (qIdx >= shuffledWords.current.length - 1) onComplete(stats);
    else setQIdx(i => i + 1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400"><span className="font-bold text-white">{qIdx + 1}</span> / {shuffledWords.current.length}</span>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-400 font-bold">✓ {stats.correct}</span>
          <span className="text-rose-400 font-bold">✗ {stats.incorrect}</span>
        </div>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${((qIdx + 1) / shuffledWords.current.length) * 100}%` }} />
      </div>

      {/* Audio Card */}
      <div className="rounded-3xl border-2 border-violet-500/40 bg-gradient-to-br from-violet-950/60 to-slate-900 p-10 text-center shadow-xl flex flex-col items-center gap-4">
        <p className="text-sm text-slate-400 font-medium mb-2">Nghe và chọn từ đúng</p>
        <button
          onClick={() => speak(word.english)}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-violet-500/30 hover:scale-105 transition group"
        >
          <Volume2 size={36} className="group-hover:animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-violet-400/30 animate-ping pointer-events-none" />
        </button>
        <p className="text-xs text-slate-500 italic">Nhấn để nghe lại</p>
      </div>

      {/* Choices - show emojis only (not words) to test listening */}
      <div className="grid grid-cols-2 gap-3">
        {choices.current.map((choice) => {
          const isCorrect = choice.id === word.id;
          const isSelected = choice.id === selected;
          let style = "border-slate-700 bg-slate-800/40 hover:border-violet-500/50 hover:bg-slate-700/60";
          if (answered && isCorrect) style = "border-emerald-500 bg-emerald-500/15";
          else if (answered && isSelected && !isCorrect) style = "border-rose-500 bg-rose-500/15";

          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice)}
              disabled={answered}
              className={`relative flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 ${style} disabled:cursor-default`}
            >
              <span className="text-3xl">{choice.emoji || "📖"}</span>
              {answered && (
                <span className={`text-xs font-bold ${isCorrect ? "text-emerald-300" : isSelected ? "text-rose-300" : "text-slate-400"}`}>
                  {choice.english}
                </span>
              )}
              {answered && isCorrect && <CheckCircle2 className="absolute top-2 right-2 text-emerald-400" size={16} />}
              {answered && isSelected && !isCorrect && <XCircle className="absolute top-2 right-2 text-rose-400" size={16} />}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={next}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black text-sm uppercase tracking-wide shadow-lg transition active:scale-95"
        >
          {qIdx >= shuffledWords.current.length - 1 ? "Xem kết quả 🏆" : "Câu tiếp theo →"}
        </button>
      )}
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({ stats, onRetry, onBack }: { stats: SessionStats; onRetry: () => void; onBack: () => void }) {
  const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  useEffect(() => {
    if (pct >= 80) confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  }, [pct]);

  const grade = pct >= 90 ? { label: "Xuất sắc! 🏆", color: "text-amber-400" }
    : pct >= 70 ? { label: "Tốt! 🌟", color: "text-sky-400" }
    : pct >= 50 ? { label: "Khá ổn! 💪", color: "text-emerald-400" }
    : { label: "Cần cố gắng hơn! 📚", color: "text-rose-400" };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto py-8 text-center">
      <div className="text-7xl">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}</div>
      <div>
        <h2 className={`text-3xl font-black ${grade.color}`}>{grade.label}</h2>
        <p className="text-slate-400 text-sm mt-2">Bài luyện tập hoàn thành!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {[
          { label: "Điểm", value: `${pct}%`, color: "text-white", bg: "from-indigo-900/60 to-slate-900" },
          { label: "Chuỗi dài nhất", value: `${stats.bestStreak}🔥`, color: "text-amber-400", bg: "from-amber-900/30 to-slate-900" },
          { label: "Đúng", value: `${stats.correct}/${stats.total}`, color: "text-emerald-400", bg: "from-emerald-900/30 to-slate-900" },
          { label: "Sai", value: `${stats.incorrect}/${stats.total}`, color: "text-rose-400", bg: "from-rose-900/30 to-slate-900" },
        ].map(item => (
          <div key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.bg} border border-slate-800 p-5 text-center`}>
            <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button onClick={onRetry} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wide shadow-lg transition active:scale-95">
          <RotateCcw size={15} /> Luyện lại
        </button>
        <button onClick={onBack} className="w-full py-3 rounded-2xl border border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 font-semibold text-sm transition">
          Chọn chủ đề khác
        </button>
      </div>
    </div>
  );
}

// ─── Topic Selector ───────────────────────────────────────────────────────────

function TopicSelector({ onSelect }: { onSelect: (topicId: string | null) => void }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white mb-1">Chọn chủ đề</h2>
        <p className="text-sm text-slate-400">Học từ vựng theo từng chủ đề hoặc ôn tập toàn bộ</p>
      </div>

      {/* All topics card */}
      <button
        onClick={() => onSelect(null)}
        className="group w-full flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-sky-500/40 bg-gradient-to-r from-sky-950/60 to-indigo-950/60 hover:border-sky-400/70 hover:from-sky-900/60 transition-all duration-300 shadow-lg shadow-sky-500/10"
      >
        <span className="text-4xl">🌐</span>
        <div className="text-left">
          <h3 className="text-base font-black text-white group-hover:text-sky-300 transition">Tất cả từ vựng</h3>
          <p className="text-xs text-slate-400">{allVocabWords.length} từ · Tổng hợp toàn bộ chủ đề</p>
        </div>
        <ChevronRight className="ml-auto text-slate-500 group-hover:text-sky-400 transition" size={20} />
      </button>

      {/* Topic grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vocabTopics.map(topic => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-700/60 transition-all duration-200 text-left"
          >
            <span className="text-3xl">{topic.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition truncate">{topic.title}</h3>
              <p className="text-xs text-slate-500">{topic.words.length} từ · {topic.titleVi}</p>
            </div>
            <ChevronRight className="text-slate-600 group-hover:text-slate-400 transition shrink-0" size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mode Selector ────────────────────────────────────────────────────────────

function ModeSelector({ topic, onSelect, onBack }: { topic: VocabTopic | null; onSelect: (mode: ExerciseMode, dir?: QuizDirection) => void; onBack: () => void }) {
  const modes = [
    { id: "flashcard" as ExerciseMode, icon: <Eye size={20} />, label: "Thẻ ghi nhớ", desc: "Học từ qua thẻ flash 2 mặt", color: "from-sky-500 to-blue-600", glow: "sky" },
    { id: "multiple-choice" as ExerciseMode, icon: <Brain size={20} />, label: "Trắc nghiệm", desc: "4 lựa chọn · kiểm tra nghĩa từ", color: "from-violet-500 to-purple-600", glow: "violet" },
    { id: "listening" as ExerciseMode, icon: <Volume2 size={20} />, label: "Luyện nghe", desc: "Nghe phát âm · chọn từ đúng", color: "from-amber-500 to-orange-600", glow: "amber" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft size={14} /> Chọn chủ đề khác
      </button>
      <div>
        <span className="text-3xl">{topic ? topic.emoji : "🌐"}</span>
        <h2 className="text-xl font-black text-white mt-2">{topic ? topic.title : "Tất cả từ vựng"}</h2>
        <p className="text-sm text-slate-400">{topic ? `${topic.words.length} từ · ${topic.titleVi}` : `${allVocabWords.length} từ · Tổng hợp toàn bộ`}</p>
      </div>

      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Chọn hình thức luyện tập</h3>

      <div className="flex flex-col gap-4">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id, m.id === "multiple-choice" ? "en-to-vi" : undefined)}
            className={`group flex items-center gap-5 px-6 py-5 rounded-2xl bg-gradient-to-r ${m.color} bg-opacity-10 border border-white/10 hover:border-white/30 hover:scale-[1.02] transition-all duration-200 shadow-lg text-left`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              {m.icon}
            </div>
            <div>
              <h4 className="font-black text-white text-base">{m.label}</h4>
              <p className="text-xs text-white/60 mt-0.5">{m.desc}</p>
            </div>
            <ChevronRight className="ml-auto text-white/40 group-hover:text-white/80 transition" size={18} />
          </button>
        ))}

        {/* Multiple choice - vi to en direction variant */}
        <button
          onClick={() => onSelect("multiple-choice", "vi-to-en")}
          className="group flex items-center gap-5 px-6 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 bg-opacity-10 border border-white/10 hover:border-white/30 hover:scale-[1.02] transition-all duration-200 shadow-lg text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
            <PenLine size={20} />
          </div>
          <div>
            <h4 className="font-black text-white text-base">Tiếng Anh → Tiếng Việt ngược lại</h4>
            <p className="text-xs text-white/60 mt-0.5">4 lựa chọn · Xem tiếng Việt · Chọn tiếng Anh</p>
          </div>
          <ChevronRight className="ml-auto text-white/40 group-hover:text-white/80 transition" size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Stage = "topics" | "mode" | "exercise" | "result";

export default function StartersLearningEngine({ topicId, backUrl = "/hoc-tap/pre-a1-starter/starters-wordlist" }: Props) {
  const [stage, setStage] = useState<Stage>(topicId ? "mode" : "topics");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(topicId ?? null);
  const [mode, setMode] = useState<ExerciseMode>("flashcard");
  const [direction, setDirection] = useState<QuizDirection>("en-to-vi");
  const [sessionKey, setSessionKey] = useState(0);
  const [lastStats, setLastStats] = useState<SessionStats | null>(null);

  const selectedTopic = selectedTopicId ? vocabTopics.find(t => t.id === selectedTopicId) ?? null : null;
  const words = selectedTopic ? selectedTopic.words : allVocabWords;

  const handleTopicSelect = (id: string | null) => {
    setSelectedTopicId(id);
    setStage("mode");
  };

  const handleModeSelect = (m: ExerciseMode, dir?: QuizDirection) => {
    setMode(m);
    if (dir) setDirection(dir);
    setSessionKey(k => k + 1);
    setStage("exercise");
  };

  const handleComplete = (stats: SessionStats) => {
    setLastStats(stats);
    setStage("result");
  };

  const handleRetry = () => {
    setSessionKey(k => k + 1);
    setStage("exercise");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-[#0f172a] px-6 py-4 flex items-center gap-4">
        <Link
          href={backUrl}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
        >
          <ChevronLeft size={15} /> Quay lại sách
        </Link>
        <div>
          <h1 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-400" /> Luyện từ vựng
          </h1>
          <p className="text-[10px] text-slate-400">Pre A1 Starters · Cambridge English</p>
        </div>

        {/* Breadcrumb */}
        {stage !== "topics" && (
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <span>Chủ đề</span>
            <ChevronRight size={12} />
            <span className={stage === "mode" ? "text-white" : ""}>Hình thức</span>
            <ChevronRight size={12} />
            <span className={(stage === "exercise" || stage === "result") ? "text-white" : ""}>Luyện tập</span>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-2xl mx-auto w-full">
        {stage === "topics" && <TopicSelector onSelect={handleTopicSelect} />}
        {stage === "mode" && (
          <ModeSelector
            topic={selectedTopic}
            onSelect={handleModeSelect}
            onBack={() => setStage("topics")}
          />
        )}
        {stage === "exercise" && mode === "flashcard" && (
          <FlashcardView key={sessionKey} words={[...words].sort(() => Math.random() - 0.5)} />
        )}
        {stage === "exercise" && mode === "multiple-choice" && (
          <MultipleChoiceQuiz key={sessionKey} words={words} direction={direction} onComplete={handleComplete} />
        )}
        {stage === "exercise" && mode === "listening" && (
          <ListeningQuiz key={sessionKey} words={words} onComplete={handleComplete} />
        )}
        {stage === "result" && lastStats && (
          <ResultScreen stats={lastStats} onRetry={handleRetry} onBack={() => setStage("topics")} />
        )}
      </main>
    </div>
  );
}
