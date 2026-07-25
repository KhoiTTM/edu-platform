"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2 } from 'lucide-react';

interface SpellBuilderRendererProps {
  instruction: string;
  // Chữ cái đúng của từ, theo đúng thứ tự (VD "apple" -> ["a","p","p","l","e"])
  letters: string[];
  // Pool hiển thị cho học sinh chọn: chữ cái của từ (đã xáo trộn) + distractor, đã trộn sẵn trong data
  letterPool: string[];
  audioText?: string;
  onAnswer: (isCorrect: boolean, answerValue: string) => void;
  disabled?: boolean;
}

// Mỗi phần tử trong pool là 1 "tile" độc lập theo index — bắt buộc để xử lý đúng khi
// từ có chữ cái lặp (VD "apple" có 2 chữ "p"), tránh lỗi trùng-theo-text như
// MatchPairRenderer từng gặp (xem docs/exam_bank.md mục 6f).
export function SpellBuilderRenderer({
  instruction,
  letters,
  letterPool,
  audioText,
  onAnswer,
  disabled = false
}: SpellBuilderRendererProps) {
  // slots[i] = index trong letterPool đã đặt vào ô thứ i, hoặc null nếu còn trống
  const [slots, setSlots] = useState<(number | null)[]>([]);
  const [usedPoolIndices, setUsedPoolIndices] = useState<Set<number>>(new Set());
  const [wrongSlotFlash, setWrongSlotFlash] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [isCorrectResult, setIsCorrectResult] = useState<boolean | null>(null);

  useEffect(() => {
    setSlots(new Array(letters.length).fill(null));
    setUsedPoolIndices(new Set());
    setWrongSlotFlash(null);
    setFinished(false);
    setIsCorrectResult(null);
  }, [letters, letterPool]);

  const playAudio = () => {
    if (!audioText || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(audioText);
      utt.lang = 'en-US';
      window.speechSynthesis.speak(utt);
    } catch (e) {}
  };

  // Ô trống đầu tiên cần điền — luôn điền tuần tự từ trái sang phải, đúng tinh thần
  // "nhớ cấu trúc từ theo thứ tự" thay vì cho điền tự do vào ô bất kỳ.
  const nextEmptySlot = slots.findIndex((s) => s === null);

  const handlePickTile = (poolIdx: number) => {
    if (disabled || finished) return;
    if (usedPoolIndices.has(poolIdx)) return;
    if (nextEmptySlot === -1) return;

    const chosenLetter = letterPool[poolIdx];
    const expectedLetter = letters[nextEmptySlot];

    if (chosenLetter.toLowerCase() !== expectedLetter.toLowerCase()) {
      // Sai — không chấm sai cả câu, chỉ nháy đỏ ô đang điền rồi cho chọn lại chữ khác.
      setWrongSlotFlash(nextEmptySlot);
      setTimeout(() => setWrongSlotFlash(null), 500);
      return;
    }

    const newSlots = [...slots];
    newSlots[nextEmptySlot] = poolIdx;
    setSlots(newSlots);
    setUsedPoolIndices(new Set([...usedPoolIndices, poolIdx]));

    if (newSlots.every((s) => s !== null)) {
      setFinished(true);
      setIsCorrectResult(true);
      const answerValue = newSlots.map((idx) => letterPool[idx!]).join('');
      onAnswer(true, answerValue);
    }
  };

  const handleClearSlot = (slotIdx: number) => {
    if (disabled || finished) return;
    // Chỉ cho xoá từ ô cuối cùng đã điền trở về trước (giữ đúng tính tuần tự)
    const lastFilled = [...slots].reverse().findIndex((s) => s !== null);
    const lastFilledIdx = lastFilled === -1 ? -1 : slots.length - 1 - lastFilled;
    if (slotIdx !== lastFilledIdx) return;

    const poolIdx = slots[slotIdx]!;
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    const newUsed = new Set(usedPoolIndices);
    newUsed.delete(poolIdx);
    setUsedPoolIndices(newUsed);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-lg font-medium text-white leading-relaxed flex items-start gap-2">
        <span className="flex-1">{instruction}</span>
        {audioText && (
          <button
            type="button"
            onClick={playAudio}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-[0_3px_0_rgb(14,165,233)] active:translate-y-0.5 active:shadow-none transition-all text-xs"
          >
            <Volume2 size={14} />
            Nghe
          </button>
        )}
      </div>

      {/* Dãy ô chữ cái — điền tuần tự trái sang phải */}
      <div className="flex flex-wrap gap-2 justify-center py-2">
        {slots.map((poolIdx, slotIdx) => {
          const isNext = slotIdx === nextEmptySlot && !finished;
          const isWrongFlash = wrongSlotFlash === slotIdx;
          const filled = poolIdx !== null;
          return (
            <button
              key={slotIdx}
              type="button"
              onClick={() => handleClearSlot(slotIdx)}
              disabled={disabled || finished || !filled}
              className={`w-11 h-12 flex items-center justify-center rounded-xl border-2 text-xl font-black transition-all ${
                isWrongFlash
                  ? 'border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse'
                  : filled
                  ? (finished && isCorrectResult
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-sky-500 bg-sky-500/10 text-sky-300 cursor-pointer hover:bg-sky-500/20')
                  : isNext
                  ? 'border-amber-400 border-dashed bg-amber-400/5 text-slate-500'
                  : 'border-line border-dashed bg-surface/30 text-slate-600'
              }`}
            >
              {filled ? letterPool[poolIdx] : ''}
            </button>
          );
        })}
      </div>

      {finished && isCorrectResult && (
        <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
          <Check size={20} />
          Chính xác! Em đã ghép đúng từ.
        </div>
      )}

      {/* Pool chữ cái để chọn */}
      <div className="flex flex-wrap gap-3 justify-center">
        <AnimatePresence mode="popLayout">
          {letterPool.map((letter, idx) => {
            const isUsed = usedPoolIndices.has(idx);
            if (isUsed) return null;
            return (
              <motion.button
                key={`tile-${idx}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                type="button"
                onClick={() => handlePickTile(idx)}
                disabled={disabled || finished}
                className="w-12 h-12 flex items-center justify-center bg-surface-raised border-2 border-line text-slate-200 text-xl font-black rounded-xl shadow-[0_4px_0_rgb(30,41,59)] hover:bg-slate-700 active:translate-y-1 active:shadow-none transition-all disabled:opacity-40"
              >
                {letter}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {!finished && (
        <p className="text-center text-xs text-slate-500 italic">
          Chạm vào ô chữ cái theo đúng thứ tự để ghép thành từ đúng.
        </p>
      )}
    </div>
  );
}
