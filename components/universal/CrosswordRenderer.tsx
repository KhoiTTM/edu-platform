"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';

// ── Schema (metadata_json cho type 'crossword') ──
// {
//   "instruction": "Hoàn thành ô chữ:",
//   "rows": 5, "cols": 6,
//   "entries": [
//     { "number": 1, "direction": "across", "row": 0, "col": 0, "answer": "HELLO", "clue": "Lời chào" },
//     { "number": 2, "direction": "down",   "row": 0, "col": 2, "answer": "HI",    "clue": "Chào (ngắn)" }
//   ]
// }
// Mỗi entry trải ô từ (row,col) theo direction. Ô giao nhau dùng chung 1 letter.
export interface CrosswordEntry {
  number: number;
  direction: 'across' | 'down';
  row: number;
  col: number;
  answer: string;
  clue: string;
}
interface CrosswordRendererProps {
  instruction: string;
  rows: number;
  cols: number;
  entries: CrosswordEntry[];
  onAnswer: (isCorrect: boolean, answerValue: string) => void;
  disabled?: boolean;
}

type CellKey = string; // `r-c`
const key = (r: number, c: number): CellKey => `${r}-${c}`;

export function CrosswordRenderer({
  instruction,
  rows,
  cols,
  entries,
  onAnswer,
  disabled = false,
}: CrosswordRendererProps) {
  // Tập ô thuộc một entry nào đó (ô "chơi được"), + đáp án đúng mỗi ô.
  const { playable, solution, numberAt } = useMemo(() => {
    const playable = new Set<CellKey>();
    const solution = new Map<CellKey, string>();
    const numberAt = new Map<CellKey, number>();
    entries.forEach((e) => {
      const ans = (e.answer || '').toUpperCase();
      for (let i = 0; i < ans.length; i++) {
        const r = e.direction === 'down' ? e.row + i : e.row;
        const c = e.direction === 'across' ? e.col + i : e.col;
        playable.add(key(r, c));
        solution.set(key(r, c), ans[i]);
      }
      numberAt.set(key(e.row, e.col), e.number);
    });
    return { playable, solution, numberAt };
  }, [entries]);

  const [grid, setGrid] = useState<Record<CellKey, string>>({});
  const [checked, setChecked] = useState(false);
  const answeredRef = useRef(false);

  useEffect(() => {
    setGrid({});
    setChecked(false);
    answeredRef.current = false;
  }, [entries]);

  const setCell = (r: number, c: number, v: string) => {
    const ch = v.slice(-1).toUpperCase().replace(/[^A-Z]/g, '');
    setGrid((prev) => ({ ...prev, [key(r, c)]: ch }));
  };

  const allFilled = useMemo(
    () => Array.from(playable).every((k) => (grid[k] || '').length === 1),
    [playable, grid]
  );

  const handleCheck = () => {
    let correct = true;
    playable.forEach((k) => {
      if ((grid[k] || '') !== solution.get(k)) correct = false;
    });
    setChecked(true);
    if (!answeredRef.current) {
      answeredRef.current = true;
      onAnswer(correct, correct ? 'crossword_solved' : 'crossword_wrong');
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-xl font-bold text-white leading-relaxed">{instruction}</div>

      {/* Lưới ô chữ */}
      <div className="flex justify-center">
        <div
          className="inline-grid gap-1"
          style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)` }}
        >
          {Array.from({ length: rows }).flatMap((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const k = key(r, c);
              const isPlayable = playable.has(k);
              if (!isPlayable) {
                return <div key={k} className="w-10 h-10" />;
              }
              const num = numberAt.get(k);
              const val = grid[k] || '';
              const isWrong = checked && val !== solution.get(k);
              const isRight = checked && val === solution.get(k);
              return (
                <div key={k} className="relative w-10 h-10">
                  {num && (
                    <span className="absolute top-0 left-0.5 text-[9px] font-black text-slate-400 z-10">
                      {num}
                    </span>
                  )}
                  <input
                    type="text"
                    maxLength={1}
                    disabled={disabled || checked}
                    value={val}
                    onChange={(e) => setCell(r, c, e.target.value)}
                    className={`w-10 h-10 text-center text-lg font-black uppercase rounded-md border-2 outline-none transition-colors ${
                      isWrong
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : isRight
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-surface-raised border-slate-600 text-white focus:border-sky-400'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Gợi ý ngang / dọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {(['across', 'down'] as const).map((dir) => {
          const list = entries.filter((e) => e.direction === dir).sort((a, b) => a.number - b.number);
          if (list.length === 0) return null;
          return (
            <div key={dir}>
              <p className="font-black text-slate-400 uppercase text-xs mb-1">
                {dir === 'across' ? 'Hàng ngang' : 'Hàng dọc'}
              </p>
              <ul className="flex flex-col gap-1">
                {list.map((e) => (
                  <li key={`${dir}-${e.number}`} className="text-slate-200">
                    <span className="font-black text-sky-400">{e.number}.</span> {e.clue}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {!checked && (
        <button
          onClick={handleCheck}
          disabled={disabled || !allFilled}
          className="self-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg disabled:opacity-40 transition-all active:scale-95"
        >
          Kiểm tra
        </button>
      )}
    </div>
  );
}
