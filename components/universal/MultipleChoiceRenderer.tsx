"use client";

import { useState, useEffect } from "react";
import { Check, X, Volume2 } from "lucide-react";
import { formatText } from "./formatText";

interface MultipleChoiceRendererProps {
  question: React.ReactNode;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
  shuffle?: boolean;
  imageUrl?: string;
  audioText?: string;
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-US";
    utt.rate = 0.8;
    window.speechSynthesis.speak(utt);
  } catch (e) {
    console.error("Speech play failed:", e);
  }
}

export function MultipleChoiceRenderer({
  question,
  options,
  correctIndex,
  onAnswer,
  disabled = false,
  shuffle = true,
  imageUrl,
  audioText
}: MultipleChoiceRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [actualCorrectIndex, setActualCorrectIndex] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    const arr = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
    if (shuffle) {
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    setShuffledOptions(arr.map(a => a.opt));
    setActualCorrectIndex(arr.findIndex(a => a.isCorrect));
    setSelectedIndex(null);
    setInitialized(true);
  }, [options, correctIndex, initialized, shuffle]);

  useEffect(() => {
    if (initialized && audioText) {
      speak(audioText);
    }
  }, [initialized, audioText]);

  const handleSelect = (idx: number) => {
    if (disabled) return;
    setSelectedIndex(idx);
    onAnswer(idx === actualCorrectIndex, shuffledOptions[idx]);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-white leading-snug">
        {typeof question === 'string' ? formatText(question) : question}
      </div>

      {audioText && (
        <div className="flex items-center gap-3 py-1">
          <button
            onClick={() => speak(audioText)}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl shadow-[0_4px_0_rgb(14,165,233)] active:translate-y-0.5 active:shadow-none transition-all text-xs"
          >
            <Volume2 size={16} />
            Nghe phát âm (Listen)
          </button>
        </div>
      )}

      {imageUrl && (
        <div className="my-4 overflow-hidden rounded-2xl border border-white/10 bg-surface/50 flex justify-center p-4">
          {imageUrl.startsWith('<svg') ? (
            <div 
              className="max-h-[300px] w-full max-w-[400px] flex items-center justify-center text-white" 
              dangerouslySetInnerHTML={{ __html: imageUrl }} 
            />
          ) : (
            <img src={imageUrl} alt="Question Graphic" className="max-h-[300px] object-contain rounded-xl" />
          )}
        </div>
      )}

      <div className="grid gap-2">
        {shuffledOptions.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === actualCorrectIndex;
          const showResult = disabled && (isSelected || isCorrect);
          
          let borderClass = "border-line bg-surface/50 hover:bg-surface-raised hover:border-line cursor-pointer";
          if (disabled) {
            borderClass = "border-line bg-surface/50 opacity-50 cursor-not-allowed";
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
                  "bg-surface-raised border-line text-slate-400 group-hover:text-white group-hover:border-sky-500/50"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {formatText(option)}
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
