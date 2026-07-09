"use client";

import { useState } from "react";
import Link from "next/link";
import { Book, CheckCircle, XCircle, ChevronRight, ChevronDown, RotateCcw, BookOpen } from "lucide-react";
import clsx from "clsx";

type Exercise = {
  id: string;
  type: string;
  instruction: string;
  page?: number;
  note?: string;
  [key: string]: any;
};

type Section = {
  section: string;
  title: string;
  exercises: Exercise[];
};

interface UnitData {
  unit: number;
  title: string;
  source?: string;
  sections: Section[];
}

interface Props {
  data: UnitData;
  breadcrumbs?: { label: string; href: string }[];
  pdfUrl?: string;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,!?]+$/, "");
}

function OpenBookLink({ pdfUrl, page }: { pdfUrl?: string; page?: number }) {
  if (!pdfUrl) return null;
  // Google Drive's viewer doesn't support #page= deep links like a static file URL would.
  const isDriveLink = pdfUrl.includes("drive.google.com");
  const href = !isDriveLink && page ? `${pdfUrl}#page=${page}` : pdfUrl;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-raised hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-colors border border-line shrink-0"
    >
      <BookOpen size={13} />
      {isDriveLink ? "Xem sách" : `Xem trang ${page ?? ""} sách`}
    </a>
  );
}

function CheckButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold transition-all"
    >
      Kiểm tra đáp án
    </button>
  );
}

export function TiengAnh7QuizClient({ data, breadcrumbs = [], pdfUrl }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [mcqSelected, setMcqSelected] = useState<Record<string, string>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});

  const toggleSection = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const reveal = (id: string) => setRevealed((prev) => ({ ...prev, [id]: true }));

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

  // ---- MCQ: student picks, then check ----
  const renderMCQ = (ex: Exercise, questions: any[]) => (
    <div className="space-y-4">
      {questions.map((q) => {
        const qid = `${ex.id}-${q.num}`;
        const selected = mcqSelected[qid];
        const isRevealed = revealed[qid];
        return (
          <div key={qid} className="bg-surface-raised/40 rounded-lg p-4 border border-line">
            {q.stem && <p className="text-white mb-3 whitespace-pre-wrap">{q.num}. {q.stem}</p>}
            {!q.stem && <p className="text-slate-400 text-sm mb-2">Câu {q.num}</p>}
            <div className="flex flex-wrap gap-2">
              {Object.entries(q.options as Record<string, string>).map(([letter, text]) => {
                const isSelected = selected === letter;
                const isCorrect = q.answer === letter;
                const showResult = isRevealed;
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      if (isRevealed) return;
                      setMcqSelected((prev) => ({ ...prev, [qid]: letter }));
                    }}
                    className={clsx(
                      "px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all text-left flex items-center gap-2",
                      showResult && isCorrect
                        ? "bg-emerald-600/30 border-emerald-500 text-white"
                        : showResult && isSelected && !isCorrect
                        ? "bg-red-600/30 border-red-500 text-white"
                        : isSelected
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-slate-700 border-transparent text-slate-200 hover:bg-slate-600"
                    )}
                  >
                    <span className="font-bold">{letter}.</span> {text}
                    {showResult && isCorrect && <CheckCircle size={14} className="text-emerald-400" />}
                    {showResult && isSelected && !isCorrect && <XCircle size={14} className="text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      {!revealed[ex.id] && (
        <CheckButton
          onClick={() => {
            setRevealed((prev) => {
              const next = { ...prev, [ex.id]: true };
              questions.forEach((q) => (next[`${ex.id}-${q.num}`] = true));
              return next;
            });
          }}
        />
      )}
    </div>
  );

  // ---- Fill-in-the-blank passage (verb form / word bank) ----
  const renderFillBlankTemplate = (ex: Exercise) => {
    const answers: Record<string, string> = ex.answers || {};
    const isRevealed = revealed[ex.id];
    const parts = (ex.passage_template as string).split(/____/g);
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-4">
        <p className="text-white leading-relaxed whitespace-pre-wrap">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <input
                  type="text"
                  disabled={isRevealed}
                  value={textInputs[`${ex.id}-${i + 1}`] || ""}
                  onChange={(e) =>
                    setTextInputs((prev) => ({ ...prev, [`${ex.id}-${i + 1}`]: e.target.value }))
                  }
                  className={clsx(
                    "mx-1 px-2 py-0.5 rounded border-b-2 bg-slate-800 text-cyan-300 text-sm w-28 text-center focus:outline-none disabled:opacity-90",
                    isRevealed
                      ? normalize(textInputs[`${ex.id}-${i + 1}`] || "") === normalize(answers[String(i + 1)] || "")
                        ? "border-emerald-500"
                        : "border-red-500"
                      : "border-slate-500 focus:border-cyan-400"
                  )}
                />
              )}
            </span>
          ))}
        </p>
        {ex.word_bank && (
          <div className="flex flex-wrap gap-2">
            {ex.word_bank.map((w: string) => (
              <span key={w} className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs">{w}</span>
            ))}
          </div>
        )}
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
        {isRevealed && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500 text-sm">
            <p className="text-blue-400 font-bold mb-1">📖 Đáp án đúng:</p>
            <p className="text-white">
              {Object.entries(answers).map(([k, v]) => `(${k}) ${v}`).join("  ·  ")}
            </p>
          </div>
        )}
      </div>
    );
  };

  // ---- Matching: student types e.g. "1-b" style dropdown per item ----
  const renderMatching = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    const colA = ex.column_a as Record<string, string>;
    const colB = ex.column_b as Record<string, string>;
    const answers = ex.answers as Record<string, string>;
    const letters = Object.keys(colB);
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-3">
        <p className="text-xs text-slate-500 italic mb-2">Đoạn văn/ngữ cảnh nằm trong sách bài tập — hãy xem sách để làm bài.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            {Object.entries(colA).map(([num, word]) => {
              const key = `${ex.id}-${num}`;
              const selected = textInputs[key];
              const isCorrect = selected === answers[num];
              return (
                <div key={num} className="flex items-center gap-2 text-white text-sm">
                  <span className="font-bold text-cyan-400 w-5">{num}.</span>
                  <span className="flex-1">{word}</span>
                  <select
                    disabled={isRevealed}
                    value={selected || ""}
                    onChange={(e) => setTextInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={clsx(
                      "px-2 py-1 rounded bg-slate-800 border text-sm focus:outline-none",
                      isRevealed
                        ? isCorrect ? "border-emerald-500 text-emerald-300" : "border-red-500 text-red-300"
                        : "border-slate-600 text-white focus:border-cyan-400"
                    )}
                  >
                    <option value="">--</option>
                    {letters.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  {isRevealed && !isCorrect && (
                    <span className="text-emerald-400 text-xs font-bold">({answers[num]})</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            {Object.entries(colB).map(([letter, def]) => (
              <div key={letter} className="text-slate-300 text-sm">
                <span className="font-bold text-fuchsia-400">{letter}.</span> {def}
              </div>
            ))}
          </div>
        </div>
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  // ---- True/False/No Info ----
  const renderTrueFalse = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    const opts = ["T", "F", "NI"];
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-3">
        <p className="text-xs text-slate-500 italic mb-2">Đoạn văn nằm trong sách bài tập — hãy xem sách để làm bài.</p>
        {ex.questions.map((q: any) => {
          const key = `${ex.id}-${q.num}`;
          const selected = textInputs[key];
          return (
            <div key={q.num} className="flex items-center justify-between gap-3 text-sm flex-wrap">
              <p className="text-white flex-1 min-w-[200px]">{q.num}. {q.stem}</p>
              <div className="flex gap-1.5 shrink-0">
                {opts.map((opt) => {
                  const isSelected = selected === opt;
                  const isCorrect = q.answer === opt;
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => setTextInputs((prev) => ({ ...prev, [key]: opt }))}
                      className={clsx(
                        "px-2.5 py-1 rounded font-bold text-xs border-2 transition-all",
                        isRevealed && isCorrect
                          ? "bg-emerald-600/30 border-emerald-500 text-white"
                          : isRevealed && isSelected && !isCorrect
                          ? "bg-red-600/30 border-red-500 text-white"
                          : isSelected
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-slate-700 border-transparent text-slate-300 hover:bg-slate-600"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  // ---- Dialogue matching: pick a-e for each blank ----
  const renderDialogueMatching = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    const answers = ex.answers as Record<string, string>;
    const options = ex.options as Record<string, string>;
    const letters = Object.keys(options);
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-3">
        <p className="text-xs text-slate-500 italic mb-2">Xem hội thoại trong sách bài tập, chọn câu phù hợp cho mỗi chỗ trống.</p>
        <div className="space-y-2 text-sm">
          {ex.dialogue.map((turn: any, i: number) => {
            if (!turn.blank) {
              return (
                <p key={i} className="text-white">
                  <span className="font-bold text-cyan-400">{turn.speaker}:</span> {turn.line}
                </p>
              );
            }
            const key = `${ex.id}-${turn.blank}`;
            const selected = textInputs[key];
            const isCorrect = selected === answers[String(turn.blank)];
            return (
              <div key={i} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-cyan-400">{turn.speaker}:</span>
                <span className="text-slate-400">({turn.blank})</span>
                <select
                  disabled={isRevealed}
                  value={selected || ""}
                  onChange={(e) => setTextInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                  className={clsx(
                    "px-2 py-1 rounded bg-slate-800 border text-sm focus:outline-none",
                    isRevealed
                      ? isCorrect ? "border-emerald-500 text-emerald-300" : "border-red-500 text-red-300"
                      : "border-slate-600 text-white focus:border-cyan-400"
                  )}
                >
                  <option value="">--</option>
                  {letters.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {isRevealed && !isCorrect && (
                  <span className="text-emerald-400 text-xs font-bold">
                    Đúng: {answers[String(turn.blank)]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 pt-2 border-t border-line/50">
          {Object.entries(options).map(([letter, text]) => (
            <span key={letter} className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs">
              <span className="font-bold">{letter}.</span> {text as string}
            </span>
          ))}
        </div>
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  // ---- Paragraph ordering: pick a position (1st, 2nd, ...) for each labeled paragraph ----
  const renderParagraphOrdering = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    const paragraphs = ex.paragraphs as { label: string; text: string }[];
    const answerOrder = ex.answer_order as string[];
    const positions = paragraphs.map((_, i) => String(i + 1));
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-3">
        {paragraphs.map((p) => {
          const key = `${ex.id}-${p.label}`;
          const selected = textInputs[key];
          const correctPos = String(answerOrder.indexOf(p.label) + 1);
          const isCorrect = selected === correctPos;
          return (
            <div key={p.label} className="flex items-start gap-3">
              <select
                disabled={isRevealed}
                value={selected || ""}
                onChange={(e) => setTextInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                className={clsx(
                  "px-2 py-1 rounded bg-slate-800 border text-sm shrink-0 focus:outline-none",
                  isRevealed
                    ? isCorrect ? "border-emerald-500 text-emerald-300" : "border-red-500 text-red-300"
                    : "border-slate-600 text-white focus:border-cyan-400"
                )}
              >
                <option value="">#</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <div className="flex-1 text-sm">
                <span className="font-bold text-cyan-400">{p.label}.</span>{" "}
                <span className="text-white">{p.text}</span>
                {isRevealed && !isCorrect && (
                  <span className="block text-emerald-400 text-xs font-bold mt-1">Đúng: vị trí {correctPos}</span>
                )}
              </div>
            </div>
          );
        })}
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  // ---- Error identification: pick the incorrect underlined part A/B/C ----
  const renderErrorIdentification = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    return (
      <div className="space-y-3">
        {ex.questions.map((q: any) => {
          const qid = `${ex.id}-${q.num}`;
          const selected = mcqSelected[qid];
          return (
            <div key={q.num} className="bg-surface-raised/40 rounded-lg p-4 border border-line">
              <p className="text-white mb-3">{q.num}. {q.sentence_with_markers}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(q.options as Record<string, string>).map(([letter, text]) => {
                  const isSelected = selected === letter;
                  const isCorrect = q.answer === letter;
                  return (
                    <button
                      key={letter}
                      disabled={isRevealed}
                      onClick={() => setMcqSelected((prev) => ({ ...prev, [qid]: letter }))}
                      className={clsx(
                        "px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                        isRevealed && isCorrect
                          ? "bg-emerald-600/30 border-emerald-500 text-white"
                          : isRevealed && isSelected && !isCorrect
                          ? "bg-red-600/30 border-red-500 text-white"
                          : isSelected
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-slate-700 border-transparent text-slate-200 hover:bg-slate-600"
                      )}
                    >
                      <span className="font-bold">{letter}.</span> {text}
                    </button>
                  );
                })}
              </div>
              {isRevealed && q.correction && (
                <p className="text-emerald-400 text-xs font-bold mt-2">Sửa lại: {q.correction}</p>
              )}
            </div>
          );
        })}
        {!isRevealed && (
          <CheckButton
            onClick={() => {
              setRevealed((prev) => {
                const next = { ...prev, [ex.id]: true };
                ex.questions.forEach((q: any) => (next[`${ex.id}-${q.num}`] = true));
                return next;
              });
            }}
          />
        )}
      </div>
    );
  };

  // ---- Sentence analysis (S/V/O/ADV): reference-only, answer-check impractical for free-text labeling ----
  const renderSentenceAnalysis = (ex: Exercise) => {
    const isRevealed = revealed[ex.id];
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-3">
        {ex.example && (
          <p className="text-xs text-slate-500 italic">
            Ví dụ: "{ex.example.sentence}" → {ex.example.labels.join(" | ")}
          </p>
        )}
        {ex.questions.map((q: any) => (
          <div key={q.num} className="text-sm">
            <p className="text-white">{q.num}. {q.sentence}</p>
            {isRevealed && <p className="text-emerald-400 text-xs font-bold mt-1">{q.answer}</p>}
          </div>
        ))}
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  // ---- Exercises that require looking at pictures in the book: answer-only, no re-display of content ----
  const renderAnswerOnlyFromBook = (ex: Exercise, questions: any[], getAnswer: (q: any) => string) => {
    const isRevealed = revealed[ex.id];
    return (
      <div className="bg-surface-raised/40 rounded-lg p-4 border border-line space-y-2">
        <p className="text-xs text-slate-500 italic mb-2">Bài này cần xem hình/nội dung trong sách bài tập — mở sách và nhập đáp án của bạn vào đây.</p>
        {questions.map((q: any) => {
          const key = `${ex.id}-${q.num}`;
          const correctAnswer = getAnswer(q);
          const value = textInputs[key] || "";
          const isCorrect = normalize(value) === normalize(correctAnswer);
          return (
            <div key={q.num} className="flex items-center gap-3 text-sm">
              <span className="font-bold text-cyan-400 w-20 shrink-0">{q.label ? q.label : `${q.num}.`}</span>
              <input
                type="text"
                disabled={isRevealed}
                value={value}
                onChange={(e) => setTextInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder="Nhập đáp án..."
                className={clsx(
                  "flex-1 px-3 py-1.5 rounded bg-slate-800 border text-sm text-white focus:outline-none",
                  isRevealed
                    ? isCorrect ? "border-emerald-500" : "border-red-500"
                    : "border-slate-600 focus:border-cyan-400"
                )}
              />
              {isRevealed && (
                isCorrect
                  ? <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  : <span className="text-emerald-400 text-xs font-bold shrink-0">{correctAnswer}</span>
              )}
            </div>
          );
        })}
        {!isRevealed && <CheckButton onClick={() => reveal(ex.id)} />}
      </div>
    );
  };

  const renderGeneric = (ex: Exercise) => (
    <div className="bg-surface-raised/40 rounded-lg p-4 border border-line">
      <p className="text-slate-400 text-sm italic">
        Dạng bài "{ex.type}" chưa có giao diện luyện tập chuyên biệt — cần thiết kế thêm.
      </p>
    </div>
  );

  const renderExercise = (ex: Exercise) => {
    switch (ex.type) {
      case "multiple_choice":
      case "multiple_choice_cloze":
        return renderMCQ(ex, ex.questions);
      case "fill_blank_verb_form":
      case "fill_blank_word_bank":
        return renderFillBlankTemplate(ex);
      case "matching":
        return renderMatching(ex);
      case "true_false_no_info":
        return renderTrueFalse(ex);
      case "dialogue_matching":
        return renderDialogueMatching(ex);
      case "picture_fill_blank":
        return renderAnswerOnlyFromBook(ex, ex.questions, (q) => q.answer);
      case "label_and_classify":
        return renderAnswerOnlyFromBook(
          ex,
          ex.items,
          (q) => q.answer
        );
      case "open_table":
        if (Array.isArray(ex.columns)) {
          // Two-column table (e.g. Problems/Solutions per row) — flatten to one question per cell.
          return renderAnswerOnlyFromBook(
            ex,
            (ex.rows as string[]).flatMap((row, ri) =>
              (ex.columns as string[]).map((col, ci) => ({
                num: ri * (ex.columns as string[]).length + ci + 1,
                label: `${row} — ${col}`,
              }))
            ),
            (q) => {
              const [row, col] = (q.label as string).split(" — ");
              return ex.suggested_answers?.[row]?.[col] || "";
            }
          );
        }
        return renderAnswerOnlyFromBook(
          ex,
          ex.rows.map((r: string, i: number) => ({ num: i + 1, label: r })),
          (q) => {
            const val = ex.suggested_answers?.[q.label];
            return Array.isArray(val) ? val.join(", ") : val || "";
          }
        );
      case "paragraph_ordering":
        return renderParagraphOrdering(ex);
      case "error_identification":
        return renderErrorIdentification(ex);
      case "sentence_analysis":
        return renderSentenceAnalysis(ex);
      case "synonym_finding":
        return renderAnswerOnlyFromBook(
          ex,
          Object.entries(ex.column_a as Record<string, string>).map(([num, label]) => ({ num, label })),
          (q) => (ex.answers as Record<string, string>)[q.num]
        );
      default:
        return renderGeneric(ex);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-16">
      {breadcrumbNav}
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <Book size={20} className="text-cyan-400 shrink-0" />
          <h2 className="text-xl font-black text-white truncate">{data.title}</h2>
        </div>
        <OpenBookLink pdfUrl={pdfUrl} />
      </div>
      {data.source && <p className="text-xs text-slate-500 mb-6">{data.source}</p>}

      {data.sections.map((section) => {
        const sectionKey = `sec-${section.section}`;
        const isCollapsed = collapsed[sectionKey];
        return (
          <div key={sectionKey} className="mb-6">
            <div
              onClick={() => toggleSection(sectionKey)}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600/80 to-blue-600/80 cursor-pointer select-none"
            >
              <h3 className="text-white font-black text-lg">{section.section}. {section.title}</h3>
              {isCollapsed ? <ChevronDown size={18} className="text-white" /> : <ChevronDown size={18} className="text-white rotate-180 transition-transform" />}
            </div>
            {!isCollapsed && (
              <div className="mt-4 space-y-6">
                {section.exercises.map((ex) => (
                  <div key={ex.id}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-slate-300 text-sm font-bold flex-1">
                        Bài {ex.id.split(".").slice(1).join(".")}: {ex.instruction}
                      </p>
                      <OpenBookLink pdfUrl={pdfUrl} page={ex.page} />
                    </div>
                    {renderExercise(ex)}
                    {ex.note && (
                      <p className="text-xs text-amber-400/80 mt-2 italic">{ex.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={() => {
          setRevealed({});
          setMcqSelected({});
          setTextInputs({});
        }}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line text-slate-300 text-sm font-bold hover:bg-surface-raised transition-colors"
      >
        <RotateCcw size={14} /> Làm lại từ đầu
      </button>
    </div>
  );
}
