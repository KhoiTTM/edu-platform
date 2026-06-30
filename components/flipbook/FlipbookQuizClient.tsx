"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Send, Book, AlertCircle, CheckCircle, XCircle, ChevronRight, BookOpen } from "lucide-react";
import clsx from "clsx";
import { playCorrectSound, playIncorrectSound } from "@/lib/quizSound";
import { saveFlipbookQuizAttempt } from "@/app/(app)/(flipbook)/actions";

interface QuizQuestion {
  id: string;
  bai: number;
  cau: number;
  type: "multiple_choice" | "essay";
  stem: string;
  options?: string[];
  answer?: string | null;
}

interface BreadcrumbLink {
  label: string;
  href: string;
}

interface FlipbookQuizClientProps {
  bookSlug: string;
  title: string;
  questions: QuizQuestion[];
  breadcrumbs?: BreadcrumbLink[];
  sourceBookUrl?: string;
}

// Multiple-choice answers are stored as a short label like "B." or "C. Nguyên tử...".
// Extract just the leading letter to compare against the option index (A=0, B=1, ...).
function answerLetterIndex(answer: string | null | undefined): number | null {
  if (!answer) return null;
  const m = answer.trim().match(/^([A-D])\b/i);
  if (!m) return null;
  return m[1].toUpperCase().charCodeAt(0) - 65;
}

export function FlipbookQuizClient({
  bookSlug,
  title,
  questions,
  breadcrumbs = [],
  sourceBookUrl,
}: FlipbookQuizClientProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const current = questions[currentIdx];
  const correctIndex = useMemo(() => answerLetterIndex(current?.answer), [current]);

  const { mcqCount, mcqCorrectCount } = useMemo(() => {
    const mcqQuestions = questions.filter((q) => q.type === "multiple_choice");
    const correctCount = mcqQuestions.filter((q) => {
      const ans = answers[q.id];
      if (ans === undefined) return false;
      return Number(ans) === answerLetterIndex(q.answer);
    }).length;
    return { mcqCount: mcqQuestions.length, mcqCorrectCount: correctCount };
  }, [questions, answers]);

  const handleSelectOption = (idx: number) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: String(idx) }));
    setChecked((prev) => ({ ...prev, [current.id]: true }));
    if (correctIndex !== null) {
      if (idx === correctIndex) playCorrectSound();
      else playIncorrectSound();
    }
  };

  const handleEssayChange = (value: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleCheckEssay = () => {
    if (!current) return;
    setChecked((prev) => ({ ...prev, [current.id]: true }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      submitAttempt();
      setSubmitted(true);
    }
  };

  const submitAttempt = () => {
    const answerDetails = questions
      .filter((q) => answers[q.id] !== undefined)
      .map((q) => {
        const studentAnswer = answers[q.id];
        const isCorrect =
          q.type === "multiple_choice"
            ? Number(studentAnswer) === answerLetterIndex(q.answer)
            : null;
        return {
          questionId: q.id,
          bai: q.bai,
          cau: q.cau,
          type: q.type,
          studentAnswer,
          isCorrect,
        };
      });

    saveFlipbookQuizAttempt(
      bookSlug,
      questions[0]?.bai ?? 0,
      title,
      mcqCorrectCount,
      mcqCount,
      answerDetails
    ).catch((err) => console.error("Failed to save quiz attempt:", err));
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setChecked({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  const breadcrumbNav = breadcrumbs.length > 0 && (
    <nav className="flex items-center flex-wrap gap-1 mb-4 text-sm">
      {breadcrumbs.map((bc) => (
        <span key={bc.href} className="flex items-center gap-1">
          <Link href={bc.href} className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
            {bc.label}
          </Link>
          <ChevronRight size={14} className="text-slate-600" />
        </span>
      ))}
    </nav>
  );

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        {breadcrumbNav}
        <div className="flex items-center justify-center h-64 text-slate-400">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chưa có câu hỏi nào cho sách này.</p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        {breadcrumbNav}
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-800">
          <CheckCircle size={64} className="text-emerald-500 mb-6" />
          <h2 className="text-3xl font-black text-white mb-2">Hoàn Thành!</h2>
          <p className="text-slate-400 mb-2 text-lg">Bạn đã trả lời {answeredCount} / {questions.length} câu hỏi</p>
          {mcqCount > 0 && (
            <p className="text-cyan-400 font-bold mb-8 text-lg">
              Trắc nghiệm: {mcqCorrectCount} / {mcqCount} câu đúng
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Làm Lại
            </button>
            {breadcrumbs.length > 0 && (
              <Link
                href={breadcrumbs[breadcrumbs.length - 1].href}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
              >
                Chọn bài khác
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isChecked = checked[current.id];
  const selectedIdx = answers[current.id] !== undefined ? Number(answers[current.id]) : null;

  return (
    <div className="h-full bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col max-w-2xl mx-auto">
      <div className="mb-6">
        {breadcrumbNav}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Book size={20} className="text-cyan-400 shrink-0" />
            <h2 className="text-xl font-black text-white truncate">{title}</h2>
          </div>
          {sourceBookUrl && (
            <a
              href={sourceBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-colors border border-slate-700"
            >
              <BookOpen size={14} />
              Xem trang sách gốc
            </a>
          )}
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Câu {currentIdx + 1} / {questions.length} — Bài {current.bai}, câu {current.cau}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <p className="text-white mb-6 leading-relaxed whitespace-pre-wrap">{current.stem}</p>

          {current.type === "multiple_choice" && current.options && (
            <div className="space-y-2">
              {current.options.map((option, idx) => {
                const isSelected = selectedIdx === idx;
                const isCorrect = correctIndex === idx;
                const showResult = isChecked && correctIndex !== null;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={clsx(
                      "w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all border-2",
                      showResult && isCorrect
                        ? "bg-emerald-600/30 border-emerald-500"
                        : showResult && isSelected && !isCorrect
                        ? "bg-red-600/30 border-red-500"
                        : isSelected
                        ? "bg-blue-600 border-blue-400"
                        : "bg-slate-700 border-transparent hover:bg-slate-600"
                    )}
                  >
                    <span className="w-6 h-6 shrink-0 rounded-full bg-slate-900/40 flex items-center justify-center text-xs font-bold text-white">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-white text-sm flex-1">{option}</span>
                    {showResult && isCorrect && <CheckCircle size={18} className="text-emerald-400 shrink-0" />}
                    {showResult && isSelected && !isCorrect && <XCircle size={18} className="text-red-400 shrink-0" />}
                  </button>
                );
              })}
              {isChecked && correctIndex === null && current.answer && (
                <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500">
                  <p className="text-xs font-bold text-blue-400 mb-1">📖 Đáp án:</p>
                  <p className="text-sm text-white">{current.answer}</p>
                </div>
              )}
            </div>
          )}

          {current.type === "essay" && (
            <div className="space-y-3">
              <textarea
                placeholder="Viết câu trả lời của bạn tại đây..."
                value={answers[current.id] || ""}
                onChange={(e) => handleEssayChange(e.target.value)}
                className="w-full px-3 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-cyan-400 focus:outline-none min-h-[100px] resize-none"
              />
              {!isChecked && (
                <button
                  onClick={handleCheckEssay}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors"
                >
                  Xem đáp án tham khảo
                </button>
              )}
              {isChecked && current.answer && (
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500">
                  <p className="text-xs font-bold text-blue-400 mb-2">📖 Đáp án tham khảo:</p>
                  <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{current.answer}</p>
                </div>
              )}
              {isChecked && !current.answer && (
                <p className="text-xs text-slate-500 italic">Chưa có đáp án tham khảo cho câu này.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Câu Trước
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {currentIdx === questions.length - 1 ? "Hoàn Thành" : "Câu Tiếp →"}
        </button>
      </div>

      <p className="text-center text-slate-400 text-xs mt-4">
        Đã trả lời: {answeredCount} / {questions.length}
      </p>
    </div>
  );
}
