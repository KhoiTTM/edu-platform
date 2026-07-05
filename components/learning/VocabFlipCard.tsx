"use client";

import { useState } from "react";
import { RefreshCw, Star } from "lucide-react";

interface Props {
  word: string;
  meaning: string;
  pronunciation: string;
  example?: string;
}

export function VocabFlipCard({ word, meaning, pronunciation, example }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 h-28 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative h-full w-full transition-all duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-xl border border-line bg-slate-950/60 p-4 flex flex-col justify-center items-center text-center shadow-md">
          <p className="text-sm font-bold text-white tracking-tight">{word}</p>
          <p className="mt-1 text-[10px] font-mono text-slate-500">{pronunciation}</p>
          <div className="mt-3 flex items-center gap-1 text-[9px] font-bold text-sky-400 uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
            <RefreshCw size={10} /> Tap to flip
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 flex flex-col justify-center shadow-inner">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <p className="text-[11px] font-bold text-white leading-tight">
              {meaning}
            </p>
          </div>
          {example && (
            <p className="text-[10px] text-slate-400 italic leading-snug border-l-2 border-emerald-800/50 pl-2">
              &quot;{example}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
