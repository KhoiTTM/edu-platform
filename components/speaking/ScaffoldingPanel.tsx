"use client";

import { Lightbulb, MessageSquare } from "lucide-react";

interface ScaffoldingPanelProps {
  unitTopic: string;
  sessionNumber: number;
}

const UNIT_SCAFFOLDING: Record<string, { starters: string[]; words: string[] }> = {
  "Daily Life": {
    starters: [
      "I live in a...",
      "My home is in...",
      "I live with...",
      "In the morning, I always...",
      "I'd say my routine is..."
    ],
    words: ["apartment", "flat", "landlord", "rent", "share", "cozy", "noisy"]
  },
  "default": {
    starters: ["Personally, I think...", "In my opinion...", "I'd prefer to...", "The reason is..."],
    words: ["important", "benefit", "challenge", "prefer", "experience"]
  }
};

export function ScaffoldingPanel({ unitTopic, sessionNumber }: ScaffoldingPanelProps) {
  if (sessionNumber > 2) return null;

  const data = UNIT_SCAFFOLDING[unitTopic] || UNIT_SCAFFOLDING["default"];

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
      <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400">
          <MessageSquare size={16} />
          <h4 className="text-[10px] font-bold uppercase tracking-wider">Sentence Starters</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.starters.map((starter) => (
            <span 
              key={starter}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 hover:text-white hover:border-sky-500/50 transition cursor-default"
            >
              {starter}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Lightbulb size={16} />
          <h4 className="text-[10px] font-bold uppercase tracking-wider">Useful Vocabulary</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.words.map((word) => (
            <span 
              key={word}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 hover:text-white hover:border-amber-500/50 transition cursor-default"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
