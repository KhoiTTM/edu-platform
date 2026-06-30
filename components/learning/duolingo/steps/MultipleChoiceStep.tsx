"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type MultipleChoiceStepData = {
  id: string;
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctOption: string;
};

type Props = {
  data: MultipleChoiceStepData;
  onCorrect: () => void;
  onWrong: () => void;
};

export const MultipleChoiceStep: React.FC<Props> = ({ data, onCorrect, onWrong }) => {
  const [shake, setShake] = useState(false);

  const handleSelect = (option: string) => {
    if (option === data.correctOption) {
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
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-10 text-center">
        {data.question}
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {data.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="flex items-center justify-center min-h-[120px] p-4 text-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-3xl shadow-[0_6px_0_rgb(203,213,225)] dark:shadow-[0_6px_0_rgb(71,85,105)] active:translate-y-[6px] active:shadow-none hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-center"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
