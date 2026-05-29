"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface SentenceReorderRendererProps {
  instruction: string;
  words: string[];
  correctSentence: string;
  onAnswer: (isCorrect: boolean, answerValue: string) => void;
  disabled?: boolean;
}

export function SentenceReorderRenderer({
  instruction,
  words = [],
  correctSentence,
  onAnswer,
  disabled = false
}: SentenceReorderRendererProps) {
  const [availableIndices, setAvailableIndices] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isCorrectResult, setIsCorrectResult] = useState<boolean | null>(null);

  useEffect(() => {
    // Initialize available indices from the words array
    setAvailableIndices(words.map((_, i) => i));
    setSelectedIndices([]);
  }, [words]);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setAvailableIndices(prev => prev.filter(i => i !== index));
    setSelectedIndices(prev => [...prev, index]);
  };

  const handleUnselect = (index: number) => {
    if (disabled) return;
    setSelectedIndices(prev => prev.filter(i => i !== index));
    setAvailableIndices(prev => [...prev, index]);
  };

  const handleSubmit = () => {
    const assembledSentence = selectedIndices.map(i => words[i]).join(' ');
    
    // Normalize by removing spaces and lowercasing
    const normalize = (str: string) => (str || '').toLowerCase().replace(/\s+/g, '');
    const isCorrect = normalize(assembledSentence) === normalize(correctSentence);
    
    setIsCorrectResult(isCorrect);
    onAnswer(isCorrect, assembledSentence);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="text-2xl font-bold text-white leading-relaxed">
        {instruction}
      </div>

      {/* Result Box */}
      <div className={`min-h-[80px] p-4 border-2 rounded-2xl flex flex-wrap gap-2 items-center transition-colors ${
          disabled && isCorrectResult === true ? 'bg-emerald-500/10 border-emerald-500' :
          disabled && isCorrectResult === false ? 'bg-rose-500/10 border-rose-500' :
          'bg-slate-800/50 border-dashed border-slate-700'
      }`}>
        <AnimatePresence mode="popLayout">
          {selectedIndices.map((idx) => (
            <motion.button
              key={`selected-${idx}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleUnselect(idx)}
              disabled={disabled}
              className="px-4 py-2 bg-sky-500 text-white font-bold rounded-xl shadow-[0_4px_0_rgb(14,165,233)] active:translate-y-1 active:shadow-none transition-all"
            >
              {words[idx]}
            </motion.button>
          ))}
        </AnimatePresence>
        {selectedIndices.length === 0 && (
          <span className="text-slate-500 font-medium italic">Nhấn vào các phần tử bên dưới để sắp xếp...</span>
        )}
      </div>

      {disabled && isCorrectResult === false && (
        <div className="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-center">
          Đáp án đúng: <span className="text-white">{correctSentence}</span>
        </div>
      )}

      {/* Pool of words */}
      <div className="flex flex-wrap gap-3 justify-center">
        <AnimatePresence mode="popLayout">
          {availableIndices.map((idx) => (
            <motion.button
              key={`available-${idx}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleSelect(idx)}
              disabled={disabled}
              className="px-4 py-2 bg-slate-800 border-2 border-slate-700 text-slate-200 font-bold rounded-xl shadow-[0_4px_0_rgb(30,41,59)] hover:bg-slate-700 active:translate-y-1 active:shadow-none transition-all"
            >
              {words[idx]}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || selectedIndices.length === 0}
        className="mt-4 w-full py-4 bg-emerald-500 disabled:bg-slate-700 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_rgb(16,185,129)] disabled:shadow-none hover:bg-emerald-400 active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2"
      >
        <Check size={24} strokeWidth={3} />
        KIỂM TRA
      </button>
    </div>
  );
}
