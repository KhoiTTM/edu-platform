"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchPairRendererProps {
  instruction: string;
  pairs: { left: string; right: string }[];
  onAnswer: (isCorrect: boolean, answerValue: string) => void;
  disabled?: boolean;
}

export function MatchPairRenderer({
  instruction,
  pairs,
  onAnswer,
  disabled = false
}: MatchPairRendererProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedLefts, setMatchedLefts] = useState<Set<string>>(new Set());
  const [matchedRights, setMatchedRights] = useState<Set<string>>(new Set());
  const [isError, setIsError] = useState(false);
  const hasAnsweredRef = React.useRef(false);

  // Shuffle left and right items independently
  const leftItems = useMemo(() => {
    return [...pairs].map(p => p.left).sort(() => Math.random() - 0.5);
  }, [pairs]);

  const rightItems = useMemo(() => {
    return [...pairs].map(p => p.right).sort(() => Math.random() - 0.5);
  }, [pairs]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isValid = pairs.some(p => p.left === selectedLeft && p.right === selectedRight);

      if (isValid) {
        setMatchedLefts(prev => new Set(prev).add(selectedLeft));
        setMatchedRights(prev => new Set(prev).add(selectedRight));
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
      }
    }
  }, [selectedLeft, selectedRight, pairs]);

  useEffect(() => {
    if (matchedLefts.size === pairs.length && pairs.length > 0 && !hasAnsweredRef.current) {
      hasAnsweredRef.current = true;
      onAnswer(true, "matched_all");
    }
  }, [matchedLefts, pairs, onAnswer]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-xl font-bold text-white leading-relaxed">
        {instruction}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {leftItems.map((item, idx) => {
            const isMatched = matchedLefts.has(item);
            const isSelected = selectedLeft === item;
            
            return (
              <button
                key={`left-${idx}`}
                disabled={disabled || isMatched || (isError && isSelected)}
                onClick={() => setSelectedLeft(item)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-center min-h-[64px] flex items-center justify-center ${
                  isMatched 
                    ? 'bg-slate-800 border-slate-700 text-slate-500 opacity-50 cursor-default'
                    : isError && isSelected
                    ? 'bg-rose-500 border-rose-400 text-white shadow-[0_4px_0_rgb(225,29,72)]'
                    : isSelected
                    ? 'bg-sky-500 border-sky-400 text-white shadow-[0_4px_0_rgb(14,165,233)]'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 shadow-[0_4px_0_rgb(30,41,59)]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {rightItems.map((item, idx) => {
            const isMatched = matchedRights.has(item);
            const isSelected = selectedRight === item;

            return (
              <button
                key={`right-${idx}`}
                disabled={disabled || isMatched || (isError && isSelected)}
                onClick={() => setSelectedRight(item)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-center min-h-[64px] flex items-center justify-center ${
                  isMatched 
                    ? 'bg-slate-800 border-slate-700 text-slate-500 opacity-50 cursor-default'
                    : isError && isSelected
                    ? 'bg-rose-500 border-rose-400 text-white shadow-[0_4px_0_rgb(225,29,72)]'
                    : isSelected
                    ? 'bg-sky-500 border-sky-400 text-white shadow-[0_4px_0_rgb(14,165,233)]'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 shadow-[0_4px_0_rgb(30,41,59)]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
