"use client";

import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  streak: number;
  showBoost?: boolean;
};

export const StreakFlame: React.FC<Props> = ({ streak, showBoost = false }) => {
  if (streak <= 0) return null;

  return (
    <div className="relative flex items-center gap-1 text-orange-500 font-bold group">
      <motion.div
        key={streak}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1"
      >
        <span className="text-xl animate-pulse">🔥</span>
        <span className="text-lg">{streak}</span>
      </motion.div>

      {/* Simple Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-surface-raised text-white text-[10px] px-2 py-1 rounded-lg font-black whitespace-nowrap z-50">
        {showBoost ? "STREAK BOOST! 🔥" : "STREAK"}
      </div>
    </div>
  );
};
