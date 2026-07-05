"use client";

import { MessageCircle, Quote } from "lucide-react";

interface BestMoment {
  text: string;
  unit_id: string;
  session_number: number;
  completed_at: string;
}

interface MemoryVaultProps {
  moments: BestMoment[];
}

export function MemoryVault({ moments }: MemoryVaultProps) {
  if (moments.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
          <MessageCircle size={20} />
        </div>
        <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
          Memory Vault
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moments.map((moment, idx) => (
          <div 
            key={`${moment.unit_id}-${moment.session_number}-${idx}`}
            className="group relative p-6 rounded-3xl bg-surface-raised/30 border border-line/50 hover:bg-surface-raised/50 hover:border-amber-500/30 transition-all duration-300"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-700/50 group-hover:text-amber-500/10 transition-colors" />
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-200 leading-relaxed italic pr-6">
                &ldquo;{moment.text}&rdquo;
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-line/30">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Unit {moment.unit_id.replace('unit-', '')} · S{moment.session_number}
                </span>
                <span className="text-[10px] text-slate-600">
                  {new Date(moment.completed_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
