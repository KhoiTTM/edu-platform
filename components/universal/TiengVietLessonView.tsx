"use client";

import { useState } from "react";
import { Loader2, Lightbulb, CheckCircle2, XCircle, Minus, Plus } from "lucide-react";

const FONT_SIZES = ["text-sm", "text-[15px]", "text-base", "text-lg", "text-xl"];

function GrammarTutorialRenderer({ content, fontSizeClass }: { content: string; fontSizeClass: string }) {
  if (!content) return <p className="text-slate-500 italic">Bài học này chưa có nội dung bài đọc.</p>;

  const formatInline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="text-slate-300 italic">$1</em>');

  const lines = content.split('\n');

  return (
    <div className={`space-y-2 text-slate-300 leading-relaxed ${fontSizeClass}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;
        if (trimmed === '---') return <hr key={i} className="border-line my-4" />;
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={i} className="text-amber-400 font-extrabold mt-6 mb-2" style={{ fontSize: '1.1em' }}>
              {trimmed.replace(/^#### /, '')}
            </h4>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="text-white font-black mt-2 mb-3" style={{ fontSize: '1.4em' }}>
              {trimmed.replace(/^### /, '')}
            </h3>
          );
        }
        if (trimmed.startsWith('*   ') || trimmed.startsWith('- ')) {
          return (
            <p
              key={i}
              className="pl-4 before:content-['•'] before:mr-2 before:text-amber-500"
              dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^(\*   |- )/, '')) }}
            />
          );
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />;
      })}
    </div>
  );
}

type QState = "active" | "revealed";

function HintPanel({ state, onReveal, correctAnswerDisplay, explanation }: {
  state: QState;
  onReveal: () => void;
  correctAnswerDisplay: string | null;
  explanation?: string;
}) {
  return (
    <div className="pl-10">
      {state === 'active' ? (
        <button
          onClick={onReveal}
          title="Bấm để xem gợi ý"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold text-xs transition active:scale-95"
        >
          <Lightbulb size={16} /> Gợi ý
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 animate-in fade-in duration-200">
          {correctAnswerDisplay && (
            <p className="flex items-start gap-2 text-sm text-emerald-300 font-semibold">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
              {correctAnswerDisplay}
            </p>
          )}
          {explanation && <p className="text-xs text-slate-400 pl-6">{explanation}</p>}
        </div>
      )}
    </div>
  );
}

function MultipleChoiceQuestion({ question, fontSizeClass }: { question: any; fontSizeClass: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<QState>("active");
  const options: string[] = question.options || [];

  return (
    <>
      <div className="pl-10 space-y-2">
        {options.map((opt: string, i: number) => {
          const isSelected = selected === i;
          const isCorrectOpt = state === 'revealed' && i === question.correct_index;
          const isWrongSelected = state === 'revealed' && isSelected && i !== question.correct_index;
          return (
            <button
              key={i}
              onClick={() => state === 'active' && setSelected(i)}
              disabled={state === 'revealed'}
              className={`w-full text-left px-4 py-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${fontSizeClass} ${
                isCorrectOpt
                  ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                  : isWrongSelected
                  ? "bg-rose-500/15 border-rose-500/50 text-rose-300"
                  : isSelected
                  ? "bg-sky-500/15 border-sky-500/50 text-sky-300"
                  : "bg-slate-950/60 border-line text-slate-300 hover:border-sky-500/40"
              } disabled:cursor-default`}
            >
              <span>{opt}</span>
              {isCorrectOpt && <CheckCircle2 size={16} className="flex-shrink-0" />}
              {isWrongSelected && <XCircle size={16} className="flex-shrink-0" />}
            </button>
          );
        })}
      </div>
      <HintPanel
        state={state}
        onReveal={() => setState('revealed')}
        correctAnswerDisplay={typeof question.correct_index === 'number' ? options[question.correct_index] : null}
        explanation={question.explanation}
      />
    </>
  );
}

function CategorizationQuestion({ question, fontSizeClass }: { question: any; fontSizeClass: string }) {
  const groups: { name: string; items: string[] }[] = question.groups || [];
  const allItems = groups.flatMap(g => g.items || []);
  const [assignment, setAssignment] = useState<Record<string, string>>({});
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [state, setState] = useState<QState>("active");

  const assignItem = (groupName: string) => {
    if (!activeItem) return;
    setAssignment(prev => ({ ...prev, [activeItem]: groupName }));
    setActiveItem(null);
  };

  const correctAnswerDisplay = groups.map(g => `${g.name}: ${(g.items || []).join(', ')}`).join(' | ');

  return (
    <>
      <div className="pl-10 space-y-3">
        <div className="flex flex-wrap gap-2">
          {allItems.map((item, i) => {
            const isPlaced = assignment[item];
            return (
              <button
                key={i}
                onClick={() => state === 'active' && !isPlaced && setActiveItem(item)}
                disabled={state === 'revealed' || !!isPlaced}
                className={`px-3 py-1.5 rounded-lg border ${fontSizeClass} transition ${
                  isPlaced
                    ? "opacity-30 border-line bg-slate-900"
                    : activeItem === item
                    ? "bg-sky-500/25 border-sky-500 text-sky-300"
                    : "bg-slate-950/60 border-line text-slate-300 hover:border-sky-500/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groups.map((g, gi) => (
            <button
              key={gi}
              onClick={() => assignItem(g.name)}
              disabled={state === 'revealed' || !activeItem}
              className="text-left p-3 rounded-xl border border-dashed border-line bg-slate-950/40 hover:border-sky-500/40 transition disabled:hover:border-line"
            >
              <p className={`font-bold text-slate-300 mb-1 ${fontSizeClass}`}>{g.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(assignment).filter(([, gn]) => gn === g.name).map(([item], i) => (
                  <span key={i} className={`px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 ${fontSizeClass}`}>{item}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
      <HintPanel state={state} onReveal={() => setState('revealed')} correctAnswerDisplay={correctAnswerDisplay} explanation={question.explanation} />
    </>
  );
}

function MatchPairQuestion({ question, fontSizeClass }: { question: any; fontSizeClass: string }) {
  const pairs: { left: string; right: string }[] = question.pairs || [];
  const rightShuffled = [...pairs.map(p => p.right)];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [state, setState] = useState<QState>("active");

  const pickRight = (right: string) => {
    if (!selectedLeft) return;
    setMatches(prev => ({ ...prev, [selectedLeft]: right }));
    setSelectedLeft(null);
  };

  const correctAnswerDisplay = pairs.map(p => `${p.left} — ${p.right}`).join(' | ');

  return (
    <>
      <div className="pl-10 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {pairs.map((p, i) => {
            const isMatched = matches[p.left];
            return (
              <button
                key={i}
                onClick={() => state === 'active' && !isMatched && setSelectedLeft(p.left)}
                disabled={state === 'revealed' || !!isMatched}
                className={`w-full text-left px-3 py-2 rounded-lg border ${fontSizeClass} transition ${
                  isMatched
                    ? "opacity-40 border-line bg-slate-900"
                    : selectedLeft === p.left
                    ? "bg-sky-500/25 border-sky-500 text-sky-300"
                    : "bg-slate-950/60 border-line text-slate-300 hover:border-sky-500/40"
                }`}
              >
                {p.left} {isMatched && `→ ${isMatched}`}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightShuffled.map((r, i) => {
            const used = Object.values(matches).includes(r);
            return (
              <button
                key={i}
                onClick={() => pickRight(r)}
                disabled={state === 'revealed' || used || !selectedLeft}
                className={`w-full text-left px-3 py-2 rounded-lg border ${fontSizeClass} transition ${
                  used ? "opacity-30 border-line bg-slate-900" : "bg-slate-950/60 border-line text-slate-300 hover:border-sky-500/40"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <HintPanel state={state} onReveal={() => setState('revealed')} correctAnswerDisplay={correctAnswerDisplay} explanation={question.explanation} />
    </>
  );
}

function InlineFillBlankQuestion({ question, fontSizeClass }: { question: any; fontSizeClass: string }) {
  const segments: string[] = question.text_segments || [];
  const blanksCount = Math.max(segments.length - 1, question.correct_answers?.length || 0);
  const [values, setValues] = useState<string[]>(Array(blanksCount).fill(""));
  const [state, setState] = useState<QState>("active");

  const correctAnswerDisplay = Array.isArray(question.correct_answers) ? question.correct_answers.join(', ') : null;

  return (
    <>
      <div className={`pl-10 flex flex-wrap items-center gap-1 text-slate-300 ${fontSizeClass}`}>
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1">
            <span>{seg}</span>
            {i < blanksCount && (
              <input
                value={values[i]}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  setValues(next);
                }}
                disabled={state === 'revealed'}
                className={`w-24 px-2 py-1 rounded-lg bg-slate-950/60 border border-sky-500/30 text-white text-center focus:outline-none focus:border-sky-500 disabled:opacity-60 ${fontSizeClass}`}
              />
            )}
          </span>
        ))}
      </div>
      <HintPanel state={state} onReveal={() => setState('revealed')} correctAnswerDisplay={correctAnswerDisplay} explanation={question.explanation} />
    </>
  );
}

function GenericTextQuestion({ question, fontSizeClass }: { question: any; fontSizeClass: string }) {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<QState>("active");
  const correctAnswerDisplay = question.correct_answer || null;

  return (
    <>
      <div className="pl-10">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={state === 'revealed'}
          placeholder="Nhập câu trả lời của em..."
          rows={2}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-line text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 disabled:opacity-60 resize-none ${fontSizeClass}`}
        />
      </div>
      <HintPanel state={state} onReveal={() => setState('revealed')} correctAnswerDisplay={correctAnswerDisplay} explanation={question.explanation} />
    </>
  );
}

function QuestionCard({ question, index, fontSizeClass }: { question: any; index: number; fontSizeClass: string }) {
  const questionText = question.question || question.instruction || "Câu hỏi";

  return (
    <div className="p-5 rounded-2xl bg-surface/50 border border-line space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500/15 text-sky-400 font-bold text-xs flex items-center justify-center mt-0.5">
          {index + 1}
        </div>
        <p className={`text-white font-semibold leading-snug ${fontSizeClass}`}>{questionText}</p>
      </div>

      {question.type === 'multiple_choice' && Array.isArray(question.options) ? (
        <MultipleChoiceQuestion question={question} fontSizeClass={fontSizeClass} />
      ) : question.type === 'categorization' && Array.isArray(question.groups) ? (
        <CategorizationQuestion question={question} fontSizeClass={fontSizeClass} />
      ) : question.type === 'match_pair' && Array.isArray(question.pairs) ? (
        <MatchPairQuestion question={question} fontSizeClass={fontSizeClass} />
      ) : question.type === 'inline_fill_blank' && Array.isArray(question.text_segments) ? (
        <InlineFillBlankQuestion question={question} fontSizeClass={fontSizeClass} />
      ) : (
        <GenericTextQuestion question={question} fontSizeClass={fontSizeClass} />
      )}
    </div>
  );
}

interface TiengVietLessonViewProps {
  node: { title: string; metadata: any };
  isBookOpen: boolean;
  setIsBookOpen: (fn: (prev: boolean) => boolean) => void;
  questions: any[];
  isLoadingQuestions: boolean;
}

export function TiengVietLessonView({ node, isBookOpen, setIsBookOpen, questions, isLoadingQuestions }: TiengVietLessonViewProps) {
  const driveFileId = node.metadata?.drive_file_id;
  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const fontSizeClass = FONT_SIZES[fontSizeIdx];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {node.metadata?.page && driveFileId ? (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 flex-1 min-w-[240px]">
            <p className="text-sm text-slate-300">
              Sách giáo khoa trang <span className="font-bold text-amber-400">{node.metadata.page}</span>
            </p>
            <button
              onClick={() => setIsBookOpen(prev => !prev)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ml-auto ${
                isBookOpen
                  ? "bg-amber-600/20 border-amber-500/40 text-amber-300 hover:bg-amber-600/30"
                  : "bg-sky-600/20 border-sky-500/40 text-sky-300 hover:bg-sky-600/30"
              }`}
            >
              {isBookOpen ? "Ẩn Sách" : "Hiện Sách"}
            </button>
          </div>
        ) : <div />}

        <div className="flex items-center gap-1 p-1.5 rounded-xl bg-surface/50 border border-line">
          <button
            onClick={() => setFontSizeIdx(i => Math.max(0, i - 1))}
            disabled={fontSizeIdx === 0}
            title="Giảm cỡ chữ"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-raised disabled:opacity-30 transition"
          >
            <Minus size={14} />
          </button>
          <span className="text-xs font-bold text-slate-400 w-6 text-center select-none">Aa</span>
          <button
            onClick={() => setFontSizeIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))}
            disabled={fontSizeIdx === FONT_SIZES.length - 1}
            title="Tăng cỡ chữ"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-raised disabled:opacity-30 transition"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch min-h-[600px]">
        {driveFileId && (
          <div
            className={`transition-all duration-300 overflow-hidden rounded-3xl border border-line bg-slate-950 flex flex-col ${
              isBookOpen ? "w-full md:w-1/2 opacity-100" : "w-0 opacity-0 pointer-events-none border-0"
            }`}
          >
            <iframe
              src={`https://drive.google.com/file/d/${driveFileId}/preview`}
              width="100%"
              height="100%"
              allow="autoplay"
              className="border-0 w-full flex-1 min-h-[600px]"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-surface/40 border border-line">
          <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} fontSizeClass={fontSizeClass} />

          <div className="border-t border-line pt-6 space-y-4">
            <h4 className="text-white font-extrabold text-base">Câu hỏi luyện tập</h4>
            {isLoadingQuestions ? (
              <div className="flex items-center justify-center p-10 text-slate-500">
                <Loader2 className="animate-spin mr-2" size={20} /> Đang tải câu hỏi...
              </div>
            ) : questions.length === 0 ? (
              <p className="text-slate-500 italic text-sm">Bài học này chưa có câu hỏi luyện tập.</p>
            ) : (
              questions.map((q, i) => <QuestionCard key={q.id || i} question={q} index={i} fontSizeClass={fontSizeClass} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
