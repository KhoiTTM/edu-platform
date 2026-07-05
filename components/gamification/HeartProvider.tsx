"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HeartContextType {
  hearts: number;
  maxHearts: number;
  decreaseHeart: () => void;
  increaseHeart: (amount?: number) => void;
  isGameOver: boolean;
}

const HeartContext = createContext<HeartContextType | undefined>(undefined);

export const HeartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hearts, setHearts] = useState(5);
  const maxHearts = 5;

  // In a real app, you would load this from the DB/API on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_hearts');
    if (saved) {
      setHearts(parseInt(saved, 10));
    }
  }, []);

  const saveHearts = (newHearts: number) => {
    setHearts(newHearts);
    localStorage.setItem('user_hearts', newHearts.toString());
    // TODO: Sync with backend
  };

  const decreaseHeart = () => {
    if (hearts > 0) {
      saveHearts(hearts - 1);
    }
  };

  const increaseHeart = (amount = 1) => {
    if (hearts < maxHearts) {
      saveHearts(Math.min(maxHearts, hearts + amount));
    }
  };

  const isGameOver = hearts === 0;

  return (
    <HeartContext.Provider value={{ hearts, maxHearts, decreaseHeart, increaseHeart, isGameOver }}>
      {children}
    </HeartContext.Provider>
  );
};

export const useHearts = () => {
  const context = useContext(HeartContext);
  if (context === undefined) {
    throw new Error('useHearts must be used within a HeartProvider');
  }
  return context;
};
