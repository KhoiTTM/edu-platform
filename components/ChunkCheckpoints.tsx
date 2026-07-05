"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, RefreshCw, ChevronRight, Sparkles } from "lucide-react";
import type { Checkpoint } from "@/lib/checkpoints";

// ─── Answer validation ────────────────────────────────────────────────────────

function normalise(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?']/g, "");
}

function checkAnswer(userInput: string, accepted: string[]): boolean {
  const n = normalise(userInput);
  if (!n) return false;
  return accepted.some((a) => {
    const na = normalise(a);
    return n === na || n.includes(na) || na.includes(n);
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

type CardState = "active" | "correct" | "hinted" | "revealed";

interface CardResult {
  id: string;
  state: CardState;
}

// ─── Individual checkpoint card ───────────────────────────────────────────────

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  index: number;
  total: number;
  onDone: (id: string, result: CardState) => void;
}

function CheckpointCard({ checkpoint, index, total, onDone }: CheckpointCardProps) {
  const [state, setState] = useState<CardState>("active");
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);

  // ── handlers ───────────────────────────────────────────────────────────────

  const submit = () => {
    const correct = checkAnswer(input, checkpoint.acceptedAnswers);

    if (correct) {
      setState("correct");
      onDone(checkpoint.id, "correct");
    } else if (attempts === 0) {
      // First wrong → show hint
      setAttempts(1);
      setState("hinted");
    } else {
      // Second wrong → reveal answer
      setState("revealed");
      onDone(checkpoint.id, "revealed");
    }
  };

  const handleTFSelect = (answer: "true" | "false") => {
    const correct = checkAnswer(answer, checkpoint.acceptedAnswers);
    if (correct) {
      setState("correct");
      onDone(checkpoint.id, "correct");
    } else if (attempts === 0) {
      setAttempts(1);
      setState("hinted");
    } else {
      setState("revealed");
      onDone(checkpoint.id, "revealed");
    }
  };

  const retry = () => {
    setState("hinted"); // stay in hinted state visually but allow new input
    setInput("");
  };

  const revealAndContinue = () => {
    setState("revealed");
    onDone(checkpoint.id, "revealed");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  // ── render ─────────────────────────────────────────────────────────────────

  const isLocked = state === "correct" || state === "revealed";

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        state === "correct"
          ? "border-emerald-700/60 bg-emerald-950/30"
          : state === "revealed"
          ? "border-line/60 bg-surface/40"
          : state === "hinted"
          ? "border-amber-700/50 bg-amber-950/20"
          : "border-sky-700/40 bg-surface/60"
      }`}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              state === "correct"
                ? "bg-emerald-600 text-white"
                : state === "revealed"
                ? "bg-slate-700 text-slate-400"
                : "bg-sky-700/60 text-sky-300"
            }`}
          >
            {index + 1}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Checkpoint {index + 1} of {total}
          </span>
        </div>

        {state === "correct" && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <CheckCircle2 size={12} /> Correct!
          </span>
        )}
        {state === "hinted" && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
            <Lightbulb size={12} /> Almost! 👀
          </span>
        )}
        {state === "revealed" && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
            Let&apos;s look closer
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4 space-y-3">
        {/* Question */}
        <p className="text-sm font-medium text-white leading-snug">
          {checkpoint.type === "fill" ? checkpoint.clozeSentence : checkpoint.question}
        </p>

        {/* Fill label if different from cloze */}
        {checkpoint.type === "fill" && (
          <p className="text-[11px] text-slate-500">{checkpoint.question}</p>
        )}

        {/* ── Input area (active or hinted) ── */}
        {!isLocked && (
          <>
            {checkpoint.type === "truefalse" ? (
              <div className="flex gap-3">
                {(["true", "false"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleTFSelect(opt)}
                    className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition active:scale-95 ${
                      opt === "true"
                        ? "border-emerald-700/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40"
                        : "border-rose-700/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40"
                    }`}
                  >
                    {opt === "true" ? "✅ True" : "❌ False"}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    checkpoint.type === "fill"
                      ? "Type the missing word(s)..."
                      : "Type your answer..."
                  }
                  className="flex-1 rounded-xl border border-line bg-surface-raised/60 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
                  autoComplete="off"
                />
                <button
                  onClick={submit}
                  disabled={!input.trim()}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-sky-500/15 active:scale-95"
                >
                  Check
                </button>
              </div>
            )}

            {/* Hint (after first wrong) */}
            {state === "hinted" && (
              <div className="flex items-start gap-2 rounded-xl bg-amber-950/30 border border-amber-800/40 px-3.5 py-2.5 mt-1 animate-in slide-in-from-top-1 duration-300">
                <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-amber-300 font-medium">Aria&apos;s Hint: <span className="font-normal opacity-90">{checkpoint.hint}</span></p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={retry}
                      className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition"
                    >
                      <RefreshCw size={11} /> Try again
                    </button>
                    <span className="text-slate-700">|</span>
                    <button
                      onClick={revealAndContinue}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-400 transition"
                    >
                      Show me the answer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Correct state ── */}
        {state === "correct" && (
          <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2.5 animate-in zoom-in-95 duration-300">
            <p className="text-xs text-emerald-300 leading-relaxed">
              <span className="font-bold">Perfect! 🎯 </span>
              <span className="italic text-emerald-400/80">
                &ldquo;{checkpoint.revealText}&rdquo;
              </span>
            </p>
          </div>
        )}

        {/* ── Revealed state ── */}
        {state === "revealed" && (
          <div className="rounded-xl bg-surface-raised/40 border border-line/40 px-3.5 py-2.5 space-y-1.5 animate-in fade-in duration-300">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-sky-400 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Learning Moment</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &ldquo;{checkpoint.revealText}&rdquo;
            </p>
            <p className="text-[10px] text-slate-500 font-medium italic">
              I&apos;ve noted this for your summary. Keep going! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export: ChunkCheckpoints ───────────────────────────────────────────

interface Props {
  checkpoints: Checkpoint[];
  /** Fires when all cards have been completed (correct or revealed) */
  onComplete: (missedIds: string[]) => void;
}

export function ChunkCheckpoints({ checkpoints, onComplete }: Props) {
  const [results, setResults] = useState<CardResult[]>([]);
  const [allDone, setAllDone] = useState(false);

  const handleCardDone = (id: string, cardState: CardState) => {
    setResults((prev) => {
      const next = [...prev.filter((r) => r.id !== id), { id, state: cardState }];
      if (next.length === checkpoints.length) {
        const missed = next
          .filter((r) => r.state === "revealed")
          .map((r) => r.id);
        // Small delay so the last card's animation is visible before banner appears
        setTimeout(() => {
          setAllDone(true);
          onComplete(missed);
        }, 600);
      }
      return next;
    });
  };

  const doneCount = results.length;
  const pct = checkpoints.length > 0 ? Math.round((doneCount / checkpoints.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">
            ⚡ Active Listening Check
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Answer each checkpoint — you can replay the video anytime above.
          </p>
        </div>
        {doneCount > 0 && (
          <span className="text-[11px] font-semibold text-slate-400">
            {doneCount}/{checkpoints.length} done
          </span>
        )}
      </div>

      {/* ── Progress bar ── */}
      <div className="h-1 rounded-full bg-surface-raised overflow-hidden">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* ── Cards ── */}
      <div className="space-y-3">
        {checkpoints.map((cp, i) => (
          <CheckpointCard
            key={cp.id}
            checkpoint={cp}
            index={i}
            total={checkpoints.length}
            onDone={handleCardDone}
          />
        ))}
      </div>

      {/* ── Completion banner ── */}
      {allDone && (
        <div className="rounded-2xl border border-sky-700/40 bg-sky-950/30 px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 size={18} className="text-sky-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              {results.filter((r) => r.state === "correct").length === checkpoints.length
                ? "Perfect listening! 🎯 All checkpoints correct."
                : `Nice work! ${results.filter((r) => r.state === "correct").length}/${checkpoints.length} correct — keep going!`}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Scroll up to replay, or continue to the transcript below.
            </p>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>
      )}
    </div>
  );
}
