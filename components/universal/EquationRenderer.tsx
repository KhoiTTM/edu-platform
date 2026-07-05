"use client";

import { useState } from "react";
import { Check, X, Send } from "lucide-react";

interface EquationRendererProps {
  question: string; // The text of the question, potentially with LaTeX-like markup
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
}

export function EquationRenderer({
  question,
  correctAnswer,
  onAnswer,
  disabled = false
}: EquationRendererProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (disabled || !inputValue.trim()) return;

    const isCorrect = inputValue.trim() === correctAnswer;
    onAnswer(isCorrect, inputValue);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-950/50 border border-line text-center">
        {/* In a real scenario, we would use KaTeX here to render the question */}
        <div className="text-2xl font-bold text-white mb-2">
            {question}
        </div>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Giải phương trình / Tính toán</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          placeholder="Kết quả..."
          className={`flex-1 bg-surface/50 border-2 rounded-2xl px-6 py-4 text-white text-xl font-bold transition-all outline-none focus:ring-4 focus:ring-sky-500/20 ${
            disabled
              ? inputValue.trim() === correctAnswer
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-rose-500 bg-rose-500/10"
              : "border-line focus:border-sky-500"
          }`}
        />

        {!disabled && (
          <button
            type="submit"
            className="px-8 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl transition active:scale-95"
          >
            NỘP BÀI
          </button>
        )}
      </form>

      {disabled && inputValue.trim() !== correctAnswer && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Check size={20} />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-70">Kết quả đúng là:</span>
            <span className="text-lg font-black">{correctAnswer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
