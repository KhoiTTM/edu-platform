"use client";

import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface InlineFillBlankRendererProps {
  instruction?: string;
  textSegments: string[]; // Length should be blanks.length + 1
  correctAnswers: string[];
  wordPool?: string[]; // Optional: If provided, use tap-to-fill. If not, use text inputs.
  onAnswer: (isCorrect: boolean, answer: any) => void;
  disabled?: boolean;
}

export function InlineFillBlankRenderer({
  instruction = "Điền từ thích hợp vào chỗ trống:",
  textSegments,
  correctAnswers,
  wordPool,
  onAnswer,
  disabled = false
}: InlineFillBlankRendererProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(correctAnswers.length).fill(""));
  const [shuffledPool, setShuffledPool] = useState<string[]>([]);
  const [activeBlankIndex, setActiveBlankIndex] = useState<number | null>(null);

  useEffect(() => {
    if (wordPool && wordPool.length > 0) {
      setShuffledPool([...wordPool].sort(() => 0.5 - Math.random()));
    } else {
      // If no word pool, generate one from correct answers if we want to force tap-to-fill, 
      // but let's just use the provided wordPool or fallback to text inputs.
    }
  }, [wordPool]);

  const handlePoolWordClick = (word: string) => {
    if (disabled || activeBlankIndex === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[activeBlankIndex] = word;
    setUserAnswers(newAnswers);
    
    // Auto-advance to next empty blank
    const nextEmpty = newAnswers.findIndex((a, idx) => idx > activeBlankIndex && a === "");
    if (nextEmpty !== -1) {
      setActiveBlankIndex(nextEmpty);
    } else {
      const firstEmpty = newAnswers.findIndex(a => a === "");
      setActiveBlankIndex(firstEmpty !== -1 ? firstEmpty : null);
    }
  };

  const handleBlankClick = (idx: number) => {
    if (disabled) return;
    setActiveBlankIndex(idx === activeBlankIndex ? null : idx);
    
    // If they click an already filled blank, maybe clear it?
    // Let's just let them overwrite it.
  };

  const handleInputChange = (idx: number, value: string) => {
    if (disabled) return;
    const newAnswers = [...userAnswers];
    newAnswers[idx] = value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    return userAnswers.every((ans, idx) => ans.trim().toLowerCase() === correctAnswers[idx].toLowerCase());
  };

  const handleSubmit = () => {
    if (disabled) return;
    // Check if all filled
    if (userAnswers.some(a => a === "")) return;
    
    const isCorrect = checkAnswer();
    onAnswer(isCorrect, userAnswers);
  };

  const isComplete = userAnswers.every(a => a !== "");
  const useTapToFill = wordPool && wordPool.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-white mb-4">
        {instruction}
      </div>

      <div className="text-xl leading-relaxed text-slate-200 bg-slate-800/30 p-6 rounded-xl border border-slate-700">
        {textSegments.map((segment, idx) => (
          <React.Fragment key={`seg-${idx}`}>
            <span>{segment}</span>
            {idx < correctAnswers.length && (
              <span className="inline-block mx-1">
                {useTapToFill ? (
                  <button
                    onClick={() => handleBlankClick(idx)}
                    disabled={disabled}
                    className={`min-w-[80px] h-10 px-3 border-b-2 font-bold transition-all ${
                      activeBlankIndex === idx
                        ? 'border-sky-500 bg-sky-900/30 text-sky-400'
                        : disabled
                          ? userAnswers[idx].trim().toLowerCase() === correctAnswers[idx].toLowerCase()
                            ? 'border-emerald-500 text-emerald-400'
                            : 'border-rose-500 text-rose-400 line-through'
                          : userAnswers[idx]
                            ? 'border-slate-400 text-sky-300'
                            : 'border-slate-500 bg-slate-800'
                    }`}
                  >
                    {userAnswers[idx] || (activeBlankIndex === idx ? '...' : '')}
                  </button>
                ) : (
                  <input
                    type="text"
                    value={userAnswers[idx]}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    disabled={disabled}
                    className={`w-24 bg-slate-900 border-b-2 px-2 py-1 text-center font-bold text-sky-300 outline-none focus:border-sky-500 transition-all ${
                      disabled
                        ? userAnswers[idx].trim().toLowerCase() === correctAnswers[idx].toLowerCase()
                          ? 'border-emerald-500 text-emerald-400'
                          : 'border-rose-500 text-rose-400 line-through'
                        : 'border-slate-600'
                    }`}
                  />
                )}
                {disabled && userAnswers[idx].trim().toLowerCase() !== correctAnswers[idx].toLowerCase() && (
                  <span className="text-emerald-400 ml-2 font-bold text-sm">
                    {correctAnswers[idx]}
                  </span>
                )}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Word Pool for Tap-to-Fill */}
      {useTapToFill && !disabled && (
        <div className="mt-6">
          <div className="text-sm font-bold text-slate-400 uppercase mb-3">Chọn từ để điền:</div>
          <div className="flex flex-wrap gap-2">
            {shuffledPool.map((word, idx) => {
              const isUsed = userAnswers.includes(word);
              return (
                <button
                  key={`word-${idx}`}
                  onClick={() => handlePoolWordClick(word)}
                  disabled={isUsed || activeBlankIndex === null}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isUsed
                      ? 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                      : activeBlankIndex !== null
                        ? 'bg-white text-slate-800 hover:bg-sky-100 shadow-[0_4px_0_rgb(203,213,225)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(203,213,225)]'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!disabled && isComplete && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-[0_4px_0_rgb(14,165,233)] active:translate-y-[4px] active:shadow-none transition-all"
          >
            Kiểm tra
          </button>
        </div>
      )}
    </div>
  );
}
