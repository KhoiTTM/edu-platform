"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

interface MultipleChoiceRendererProps {
  question: React.ReactNode;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
  shuffle?: boolean;
  imageUrl?: string;
}

export function MultipleChoiceRenderer({
  question,
  options,
  correctIndex,
  onAnswer,
  disabled = false,
  shuffle = true,
  imageUrl
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

  const handleSelect = (idx: number) => {
    if (disabled) return;
    setSelectedIndex(idx);
    onAnswer(idx === actualCorrectIndex, shuffledOptions[idx]);
  };

  // Helper to format inline tags and math
  const formatText = (text: string) => {
    if (typeof text !== 'string') return text;
    
    // First, translate fractions \frac{A}{B} and \sqrt{X} to styled symbols
    let processed = text
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, 
        '<span class="inline-flex flex-col text-center align-middle mx-1"><span class="border-b border-current px-1 text-[11px] leading-none pb-0.5">$1</span><span class="text-[11px] leading-none pt-0.5">$2</span></span>'
      )
      .replace(/\\sqrt\{([^{}]+)\}/g, '√$1');

    let formatted = processed
      .replace(/\$([^\$]+)\$/g, (match, p1) => {
        let math = p1
          // Geometry & Trig symbols
          .replace(/\\widehat\{([^{}]+)\}/g, '∠$1')
          .replace(/\\circ/g, '°')
          .replace(/\\parallel/g, '∥')
          .replace(/\\perp/g, '⊥')
          // Symbols
          .replace(/\\in/g, '∈')
          .replace(/\\neq/g, '≠')
          .replace(/\\mathbb\{Z\}/g, 'ℤ')
          .replace(/\\mathbb\{Q\}/g, 'ℚ')
          .replace(/\\mathbb\{R\}/g, 'ℝ')
          .replace(/\\mathbb\{N\}/g, 'ℕ')
          .replace(/\\mathbb\{C\}/g, 'ℂ')
          .replace(/\\notin/g, '∉')
          .replace(/\\square/g, '□')
          .replace(/\\subset/g, '⊂')
          .replace(/\\supset/g, '⊃')
          .replace(/\\cap/g, '∩')
          .replace(/\\cup/g, '∪')
          .replace(/\\le/g, '≤')
          .replace(/\\ge/g, '≥')
          .replace(/\\times/g, '×')
          .replace(/\\div/g, '÷')
          .replace(/\\cdot/g, '·')
          .replace(/\\approx/g, '≈')
          .replace(/\\pm/g, '±')
          .replace(/\\degree/g, '°')
          .replace(/\\alpha/g, 'α')
          .replace(/\\beta/g, 'β')
          .replace(/\\gamma/g, 'γ')
          .replace(/\\Delta/g, 'Δ')
          .replace(/\^\{?([^\{\}]+)\}?/g, '<sup>$1</sup>')
          .replace(/_\{?([^\{\}]+)\}?/g, '<sub>$1</sub>');
        return `<span class="font-mono text-amber-300 bg-amber-500/5 px-1 py-0.5 rounded border border-amber-500/10 italic">${math}</span>`;
      })
      .replace(/`([^`]+)`/g, '<code class="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded px-1.5 py-0.5 font-mono text-[13px]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-extrabold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<span class="text-amber-400 font-medium italic">$1</span>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-white leading-snug">
        {typeof question === 'string' ? formatText(question) : question}
      </div>

      {imageUrl && (
        <div className="my-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 flex justify-center p-2">
          <img src={imageUrl} alt="Question Graphic" className="max-h-[300px] object-contain rounded-xl" />
        </div>
      )}

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
