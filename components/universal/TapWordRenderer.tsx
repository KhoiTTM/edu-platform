"use client";

import React, { useState } from 'react';

interface TapWordRendererProps {
  instruction: string;
  words: string[];
  correctWord: string;
  onAnswer: (isCorrect: boolean, selectedWord: string) => void;
  disabled?: boolean;
}

export function TapWordRenderer({ instruction, words, correctWord, onAnswer, disabled }: TapWordRendererProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (word: string) => {
    if (disabled) return;
    setSelected(word);
    onAnswer(word === correctWord, word);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl font-bold text-white mb-4">
        {instruction}
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {words.map((word, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => handleSelect(word)}
            className={`px-6 py-4 rounded-2xl border-2 font-bold transition-all ${
              selected === word 
                ? 'bg-sky-500 border-sky-400 text-white shadow-[0_4px_0_rgb(14,165,233)]' 
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 shadow-[0_4px_0_rgb(30,41,59)]'
            } active:translate-y-1 active:shadow-none`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
