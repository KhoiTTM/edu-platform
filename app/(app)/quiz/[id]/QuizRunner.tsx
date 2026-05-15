"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { QuizQuestion } from "@/types/database";
import { submitQuiz } from "./actions";

type Props = {
  quizId: string;
  questions: QuizQuestion[];
};

export function QuizRunner({ quizId, questions }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const answeredCount = useMemo(
    () => questions.filter((q) => answers[q.id] != null).length,
    [answers, questions]
  );

  function select(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit() {
    setError(null);
    if (answeredCount < questions.length) {
      setError("Please answer every question before submitting.");
      return;
    }
    startTransition(async () => {
      const res = await submitQuiz(quizId, answers);
      if (!res.ok) {
        setError(res.message);
        return;
      }
      setResult({ score: res.score, total: res.total });
      router.refresh();
    });
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          Nice work!
        </p>
        <p className="mt-2 font-display text-4xl font-bold text-emerald-900">
          {result.score}/{result.total}
        </p>
        <p className="mt-1 text-lg text-emerald-800">{pct}% correct</p>
        <button
          type="button"
          onClick={() => {
            setResult(null);
            setAnswers({});
          }}
          className="mt-8 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {questions.map((q, idx) => (
        <fieldset
          key={q.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6"
        >
          <legend className="sr-only">Question {idx + 1}</legend>
          <p className="text-sm font-semibold text-brand-600">
            Question {idx + 1}
          </p>
          <p className="mt-2 text-lg font-medium text-slate-900">{q.question}</p>
          <div className="mt-4 grid gap-3">
            {(q.options as string[]).map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(q.id, i)}
                  className={`flex min-h-[48px] w-full items-center rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    selected
                      ? "border-brand-500 bg-brand-50 text-brand-900"
                      : "border-slate-200 bg-slate-50/50 text-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      selected
                        ? "bg-brand-600 text-white"
                        : "bg-white text-slate-500 ring-1 ring-slate-200"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {error && (
        <p className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          {answeredCount}/{questions.length} answered
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={handleSubmit}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Submit quiz"}
        </button>
      </div>
    </div>
  );
}
