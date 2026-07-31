"use client";

import React, { useEffect } from 'react';
import { formatText } from './formatText';

interface ReflexFlashcardRendererProps {
  question: string;
  correctAnswer: string;
  hint?: string;
  onNext: () => void;
  disabled: boolean; // true when time is up
  audioText?: string;
}

export function ReflexFlashcardRenderer({
  question,
  correctAnswer,
  hint,
  onNext,
  disabled,
  audioText
}: ReflexFlashcardRendererProps) {
  // If we only want to show the first letter as hint:
  const displayHint = hint ? hint : (correctAnswer ? correctAnswer[0] + ' ' + '_ '.repeat(correctAnswer.length - 1).trim() : '');

  useEffect(() => {
    if (disabled && audioText && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(audioText);
      utt.lang = 'en-US';
      utt.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const matched = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('google')));
        if (matched) utt.voice = matched;
      }
      window.speechSynthesis.speak(utt);
    }
  }, [disabled, audioText]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-6 leading-tight">
          {typeof question === 'string' ? formatText(question) : question}
        </h2>
        
        {!disabled && (
          <div className="text-5xl font-mono text-emerald-500 font-bold tracking-widest mt-8">
            {displayHint}
          </div>
        )}
      </div>

      {disabled && (
        <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
          <div className="text-xl text-slate-500 mb-2 font-bold uppercase tracking-widest">ĐÁP ÁN:</div>
          <div className="text-6xl font-black text-emerald-600 dark:text-emerald-400 mb-10">
            {correctAnswer}
          </div>
        </div>
      )}
    </div>
  );
}
