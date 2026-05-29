"use client";

import { useState } from "react";
import { Check, X, Send } from "lucide-react";

interface FillBlankRendererProps {
  question: string;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
}

export function FillBlankRenderer({
  question,
  correctAnswer,
  onAnswer,
  disabled = false
}: FillBlankRendererProps) {
  const [inputValue, setInputValue] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (disabled || !inputValue.trim()) return;

    setHasSubmitted(true);
    const isCorrect = inputValue.trim().toLowerCase() === correctAnswer.toLowerCase();
    onAnswer(isCorrect, inputValue);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-white leading-relaxed">
        {question}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          placeholder="Nhập câu trả lời của bạn..."
          className={`w-full bg-slate-900/50 border-2 rounded-2xl px-6 py-4 text-white text-lg transition-all outline-none focus:ring-4 focus:ring-sky-500/20 ${
            disabled
              ? inputValue.trim().toLowerCase() === correctAnswer.toLowerCase()
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-rose-500 bg-rose-500/10"
              : "border-slate-800 focus:border-sky-500"
          }`}
        />

        {!disabled && (
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition active:scale-95 flex items-center gap-2"
          >
            Gửi <Send size={18} />
          </button>
        )}

        {disabled && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {inputValue.trim().toLowerCase() === correctAnswer.toLowerCase() ? (
              <Check size={24} className="text-emerald-400" />
            ) : (
              <X size={24} className="text-rose-400" />
            )}
          </div>
        )}
      </form>

      {disabled && inputValue.trim().toLowerCase() !== correctAnswer.toLowerCase() && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <span className="font-bold">Đáp án đúng:</span> {correctAnswer}
        </div>
      )}
    </div>
  );
}
