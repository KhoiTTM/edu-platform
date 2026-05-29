"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

interface MultipleChoiceRendererProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceRenderer({
  question,
  options,
  correctIndex,
  onAnswer,
  disabled = false
}: MultipleChoiceRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [actualCorrectIndex, setActualCorrectIndex] = useState<number>(0);

  useEffect(() => {
    const arr = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledOptions(arr.map(a => a.opt));
    setActualCorrectIndex(arr.findIndex(a => a.isCorrect));
    setSelectedIndex(null);
  }, [options, correctIndex]);

  const handleSelect = (idx: number) => {
    if (disabled) return;
    setSelectedIndex(idx);
    onAnswer(idx === actualCorrectIndex, shuffledOptions[idx]);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-white leading-snug">
        {question}
      </div>

      <div className="grid gap-2">
        {shuffledOptions.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === actualCorrectIndex;
          const showResult = disabled && (isSelected || isCorrect);
          
          let borderClass = "border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 cursor-pointer";
          if (disabled) {
            borderClass = "border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed";
          }
          if (showResult) {
            if (isCorrect) borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-100 font-bold z-10";
            else if (isSelected) borderClass = "border-rose-500 bg-rose-500/10 text-rose-400 opacity-100 font-bold z-10";
          }

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3 rounded-2xl border transition-all text-slate-200 text-sm flex items-center justify-between group ${borderClass}`}
            >
              <div className="flex items-center">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold mr-4 transition-colors ${
                  showResult && isCorrect ? "bg-emerald-500 border-emerald-400 text-white" :
                  showResult && isSelected ? "bg-rose-500 border-rose-400 text-white" :
                  "bg-slate-800 border-slate-700 text-slate-400 group-hover:text-white group-hover:border-sky-500/50"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </div>
              
              {showResult && isCorrect && <Check size={18} className="text-emerald-400" />}
              {showResult && isSelected && !isCorrect && <X size={18} className="text-rose-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
