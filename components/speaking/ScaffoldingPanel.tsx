"use client";

import { Lightbulb, MessageSquare } from "lucide-react";
import { buildCurriculumContext } from "@/lib/speaking/curriculumContextBuilder";

interface ScaffoldingPanelProps {
  unitId: string;
  unitTopic: string;
  sessionNumber: number;
}

export function ScaffoldingPanel({ unitId, unitTopic, sessionNumber }: ScaffoldingPanelProps) {
  if (sessionNumber > 2) return null;

  let context;
  try {
    context = buildCurriculumContext(unitId);
  } catch (e) {
    context = {
      vocabulary: ["important", "benefit", "challenge", "prefer", "experience"],
      targetExpressions: [],
      sentenceStarters: ["Personally, I think...", "For example...", "To be honest..."]
    };
  }

  const isSession1 = sessionNumber === 1;

  const starters = isSession1
    ? context.sentenceStarters
    : [
        "Personally, I think...",
        "In my opinion...",
        "I'd prefer to...",
        "The reason is..."
      ];

  const words = isSession1 ? context.vocabulary : context.targetExpressions;
  const wordsTitle = isSession1 ? "Core Vocabulary" : "Target Expressions";

  // If there are no target expressions for session 2, fallback to some opinion words
  const displayWords = words.length > 0 ? words : ["significant", "crucial", "specifically", "therefore"];

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
      <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400">
          <MessageSquare size={16} />
          <h4 className="text-[10px] font-bold uppercase tracking-wider">
            {isSession1 ? "Sentence Starters" : "Opinion Connectors"}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {starters.map((starter) => (
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
          <h4 className="text-[10px] font-bold uppercase tracking-wider">{wordsTitle}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {displayWords.map((word) => (
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
