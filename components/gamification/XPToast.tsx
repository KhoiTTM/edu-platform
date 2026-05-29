"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  xp: number;
  visible: boolean;
  onComplete?: () => void;
};

export const XPToast: React.FC<Props> = ({ xp, visible, onComplete }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onComplete) onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -40, scale: 1.1 }}
          exit={{ opacity: 0, y: -80, scale: 0.5, transition: { duration: 0.3 } }}
          className="pointer-events-none bg-amber-100 dark:bg-amber-900/60 border-2 border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl backdrop-blur-sm z-[100]"
        >
          <div className="bg-amber-500 rounded-full p-1 shadow-inner">
            <span className="text-white font-black text-[10px]">XP</span>
          </div>
          <span className="text-amber-700 dark:text-amber-400 font-black text-lg">+{xp}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
