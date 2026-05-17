"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/types/database";

type Props = {
  questions: QuizQuestion[];
};

type QState = "idle" | "correct" | "wrong";

export function LessonPractice({ questions }: Props) {
  const sorted = useMemo(
    () => [...questions].sort((a, b) => a.order_index - b.order_index),
    [questions]
  );

  const [picked, setPicked] = useState<Record<string, number | null>>({});
  const [revealed, setRevealed] = useState<Record<string, QState>>({});

  function stateFor(q: QuizQuestion): QState {
    return revealed[q.id] ?? "idle";
  }

  function pickOption(q: QuizQuestion, optionIndex: number) {
    setPicked((prev) => ({ ...prev, [q.id]: optionIndex }));
    const ok = optionIndex === q.correct_index;
    setRevealed((prev) => ({ ...prev, [q.id]: ok ? "correct" : "wrong" }));
  }

  if (sorted.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-xl backdrop-blur-md sm:p-6">
      <h2 className="font-display text-xl font-semibold text-white">
        Bài tập — chấm ngay từng câu
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Chọn đáp án: đúng hoặc sai sẽ hiện ngay kèm giải thích.
      </p>

      <ol className="mt-6 space-y-8">
        {sorted.map((q, idx) => {
          const opts = q.options as string[];
          const st = stateFor(q);
          const choice = picked[q.id];

          return (
            <li
              key={q.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4 sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                Câu {idx + 1}
              </p>
              <p className="mt-2 text-base font-medium text-white">
                {q.question}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {opts.map((opt, i) => {
                  let ring = "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80";
                  if (st !== "idle" && selected) {
                    ring = isCorrect
                      ? "border-emerald-500 bg-emerald-950/30 text-emerald-400"
                      : "border-rose-500 bg-rose-950/30 text-rose-400";
                  } else if (st !== "idle" && isCorrect) {
                    ring = "border-emerald-500 bg-emerald-950/30 text-emerald-400";
                  } else if (selected) {
                    ring = "border-sky-500 bg-sky-950/30 text-sky-400";
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pickOption(q, i)}
                      className={`flex min-h-[48px] w-full items-center rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition ${ring}`}
                    >
                      <span className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300 ring-1 ring-slate-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {st === "correct" && (
                <p className="mt-3 rounded-xl bg-emerald-950/20 border border-emerald-900/50 px-3 py-2 text-sm font-medium text-emerald-400">
                  ✓ Đúng rồi!
                </p>
              )}
              {st === "wrong" && (
                <p className="mt-3 rounded-xl bg-rose-950/20 border border-rose-900/50 px-3 py-2 text-sm font-medium text-rose-400">
                  ✗ Chưa đúng — xem gợi ý bên dưới.
                </p>
              )}

              {st !== "idle" && q.explanation && (
                <div className="mt-3 rounded-xl border border-sky-900/30 bg-sky-950/10 px-3 py-3 text-sm text-slate-300">
                  <span className="font-semibold text-sky-400">
                    Giải thích:{" "}
                  </span>
                  {q.explanation}
                </div>
              )}

              {st !== "idle" && (
                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-sky-500 underline-offset-2 hover:underline hover:text-sky-400"
                  onClick={() => {
                    setPicked((prev) => ({ ...prev, [q.id]: null }));
                    setRevealed((prev) => {
                      const n = { ...prev };
                      delete n[q.id];
                      return n;
                    });
                  }}
                >
                  Làm lại câu này
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
