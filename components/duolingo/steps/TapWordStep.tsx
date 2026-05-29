"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type TapWordStepData = {
  id: string;
  type: 'tap_word';
  instruction: string;
  words: string[];
  correctWord: string;
};

type Props = {
  data: TapWordStepData;
  onCorrect: () => void;
  onWrong: () => void;
};

export const TapWordStep: React.FC<Props> = ({ data, onCorrect, onWrong }) => {
  const [shake, setShake] = useState(false);

  const handleTap = (word: string) => {
    if (word === data.correctWord) {
      onCorrect();
    } else {
      setShake(true);
      onWrong();
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center flex-1 w-full px-6 py-10"
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-10 text-center">
        {data.instruction}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 w-full">
        {data.words.map((word) => (
          <button
            key={word}
            onClick={() => handleTap(word)}
            className="px-6 py-4 text-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-2xl shadow-[0_4px_0_rgb(203,213,225)] dark:shadow-[0_4px_0_rgb(71,85,105)] active:translate-y-1 active:shadow-none hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            {word}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
