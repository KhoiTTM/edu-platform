"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Info } from "lucide-react";

interface Props {
  english: string;
  vietnamese: string;
  index: number;
  keyPhrase?: string;
  phraseNote?: string;
}

export function TranscriptLineExpander({ english, vietnamese, index, keyPhrase, phraseNote }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaid, setIsSaid] = useState(false);

  return (
    <div 
      className={`group rounded-xl border transition-all duration-300 ${
        isExpanded 
          ? "border-emerald-500/50 bg-slate-900/80 shadow-lg" 
          : "border-slate-800 bg-slate-950/30 hover:bg-slate-950/70"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3.5 text-left flex items-start gap-3"
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-slate-500 border border-slate-800">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium leading-relaxed transition-colors ${isExpanded ? "text-emerald-400" : "text-white"}`}>
            {english}
          </p>
          {!isExpanded && (
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1 italic">
              {vietnamese}
            </p>
          )}
        </div>
        <div className="mt-0.5 text-slate-600 group-hover:text-slate-400 transition-colors">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-3.5 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="pt-2 border-t border-white/5">
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {vietnamese}
            </p>
          </div>

          {keyPhrase && (
            <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <Info size={12} className="text-emerald-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  Key Phrase & Note
                </p>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <span className="font-bold text-emerald-400">&quot;{keyPhrase}&quot;</span>
                {phraseNote ? ` — ${phraseNote}` : ""}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] text-slate-500 font-medium">
              🗣️ Say this line out loud to practice!
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSaid(true);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all active:scale-95 shadow-sm ${
                isSaid 
                  ? "bg-emerald-500 text-white ring-2 ring-emerald-500/20" 
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {isSaid ? <CheckCircle2 size={12} /> : null}
              {isSaid ? "Nailed it! 🎯" : "I said it!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
