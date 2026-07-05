"use client";

import React, { useState, useMemo } from "react";

// Phiếu đáp án: học sinh đọc ĐỀ ở sách gốc (link Flipbook), nhập đáp án vào đây.
// graded=true → chấm (answers[] khớp, hoặc keywords[] chứa đủ từ khóa). graded=false → không chấm.
export interface SheetTask {
  bai: number | string;
  instruction_ref: string;
  type: "text" | "choice" | "essay" | "keywords";
  graded: boolean;
  options?: string[];
  answers?: string[];
  keywords?: string[][];
  count?: number;
  sample?: string;
}
export interface SheetSection {
  code: string;
  name: string;
  page: number;
  tasks: SheetTask[];
}
interface AnswerSheetRendererProps {
  unitTitle: string;
  pages: string;
  flipbookUrl: string;
  sections: SheetSection[];
  onComplete: (score: number, total: number, detail: any[]) => void;
  disabled?: boolean;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
const taskCount = (t: SheetTask): number =>
  t.answers ? t.answers.length : t.keywords ? t.keywords.length : t.count || 0;

export function AnswerSheetRenderer({
  unitTitle,
  pages,
  flipbookUrl,
  sections,
  onComplete,
  disabled = false,
}: AnswerSheetRendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const setAns = (k: string, v: string) => setAnswers((prev) => ({ ...prev, [k]: v }));

  const totalGraded = useMemo(
    () =>
      sections.reduce(
        (a, s) => a + s.tasks.reduce((b, t) => b + (t.graded ? taskCount(t) : 0), 0),
        0
      ),
    [sections]
  );

  const kwOK = (t: SheetTask, i: number, stu: string) =>
    !!t.keywords && stu.trim() !== "" && t.keywords[i].every((kw) => norm(stu).includes(norm(kw)));

  const handleSubmit = () => {
    let score = 0;
    const detail: any[] = [];
    sections.forEach((s) => {
      s.tasks.forEach((t) => {
        const n = taskCount(t);
        for (let i = 0; i < n; i++) {
          const k = `${s.code}-${t.bai}-${i}`;
          const stu = answers[k] || "";
          if (t.graded && t.keywords) {
            const correct = kwOK(t, i, stu);
            if (correct) score++;
            detail.push({ section: s.code, bai: t.bai, cau: i + 1, student: stu, correct });
          } else if (t.graded && t.answers) {
            const correct = norm(stu) === norm(t.answers[i]);
            if (correct) score++;
            detail.push({ section: s.code, bai: t.bai, cau: i + 1, student: stu, correct });
          } else {
            detail.push({ section: s.code, bai: t.bai, cau: i + 1, student: stu, correct: null });
          }
        }
      });
    });
    setResult({ score, total: totalGraded });
    setSubmitted(true);
    onComplete(score, totalGraded, detail);
  };

  return (
    <div className="flex flex-col gap-6 w-full text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface/60 border border-indigo-500/20">
        <div>
          <h2 className="text-xl font-black">{unitTitle}</h2>
          <p className="text-xs text-slate-400 font-bold mt-0.5">
            Đọc đề trong Sách bài tập (trang {pages}), rồi nhập đáp án vào phiếu.
          </p>
        </div>
        <a
          href={flipbookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-extrabold text-sm shadow-lg transition-all active:scale-95"
        >
          📖 Mở Sách bài tập
        </a>
      </div>

      {sections.map((s) => (
        <div key={s.code} className="rounded-2xl border border-line bg-slate-950/40 overflow-hidden">
          <div className="px-4 py-2.5 bg-surface/60 border-b border-line flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xs font-black">
              {s.code}
            </span>
            <span className="font-black text-sm">{s.name}</span>
            <span className="text-[10px] text-slate-500 font-bold ml-auto">trang {s.page}</span>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {s.tasks.map((t) => {
              const n = taskCount(t);
              return (
                <div key={`${s.code}-${t.bai}`} className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-slate-300">
                    {t.instruction_ref}
                    {!t.graded && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        không chấm
                      </span>
                    )}
                  </p>
                  <div className={t.type === "keywords" ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}>
                    {Array.from({ length: n }).map((_, i) => {
                      const k = `${s.code}-${t.bai}-${i}`;
                      const stu = answers[k] || "";
                      const ok =
                        submitted && t.graded
                          ? t.keywords
                            ? kwOK(t, i, stu)
                            : t.answers
                            ? norm(stu) === norm(t.answers[i])
                            : null
                          : null;
                      const border =
                        ok === true
                          ? "border-emerald-500 bg-emerald-500/10"
                          : ok === false
                          ? "border-rose-500 bg-rose-500/10"
                          : "border-line bg-surface-raised";
                      return (
                        <div key={k} className="flex items-start gap-1">
                          <span className="text-[10px] text-slate-500 font-black w-4 text-right mt-2">{i + 1}.</span>
                          {t.type === "choice" && t.options ? (
                            <select
                              disabled={disabled || submitted}
                              value={stu}
                              onChange={(e) => setAns(k, e.target.value)}
                              className={`w-16 h-9 rounded-lg border-2 text-center text-sm font-bold text-white outline-none ${border}`}
                            >
                              <option value=""></option>
                              {t.options.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          ) : t.type === "keywords" && t.keywords ? (
                            <div className="flex-1 flex flex-col gap-1">
                              <input
                                type="text"
                                disabled={disabled || submitted}
                                value={stu}
                                onChange={(e) => setAns(k, e.target.value)}
                                placeholder="viết câu hoàn chỉnh…"
                                className={`w-full h-9 px-2 rounded-lg border-2 text-sm text-white outline-none focus:border-sky-400 ${border}`}
                              />
                              <span className="text-[10px] text-slate-500">
                                Từ khóa cần có: <b className="text-slate-400">{t.keywords[i].join(", ")}</b>
                              </span>
                            </div>
                          ) : (
                            <input
                              type="text"
                              disabled={disabled || submitted}
                              value={stu}
                              onChange={(e) => setAns(k, e.target.value)}
                              className={`w-28 h-9 px-2 rounded-lg border-2 text-sm text-white outline-none focus:border-sky-400 ${border}`}
                            />
                          )}
                          {ok === false && t.answers && (
                            <span className="text-[10px] text-emerald-400 font-bold mt-2">→ {t.answers[i]}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {submitted && !t.graded && t.sample && (
                    <div className="mt-1 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[13px] text-slate-200 leading-relaxed">
                      <span className="font-black text-indigo-300">Đáp án tham khảo: </span>{t.sample}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="self-center px-8 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 font-black text-lg shadow-[0_4px_0_rgb(16,185,129)] active:translate-y-[3px] active:shadow-none transition-all"
        >
          Nộp bài
        </button>
      ) : (
        <div className="self-center text-center p-5 rounded-2xl bg-surface/60 border border-emerald-500/30">
          <p className="text-sm text-slate-400 font-bold">Kết quả (chỉ tính phần chấm được)</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">
            {result?.score}/{result?.total}
          </p>
        </div>
      )}
    </div>
  );
}
