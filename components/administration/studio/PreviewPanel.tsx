import React from 'react';
import { Smartphone, Eye } from 'lucide-react';

interface PreviewPanelProps {
  questionData: any;
  type: string;
}

export function PreviewPanel({ questionData, type }: PreviewPanelProps) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 rounded-[3rem] p-4 border-[8px] border-slate-800 dark:border-slate-800 shadow-2xl w-[320px] aspect-[9/19.5] flex flex-col mx-auto relative overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
      
      {/* Screen Content */}
      <div className="flex-1 bg-white dark:bg-slate-950 rounded-[2rem] overflow-y-auto p-6 pt-10 flex flex-col">
        <header className="flex items-center justify-between mb-8">
           <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
           <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
           </div>
        </header>

        <div className="flex-1">
          {(type === 'tap_correct_word' || type === 'vocab_to_word') && (
            <div className="space-y-6">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{questionData.instruction || "Select the correct answer"}</p>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{questionData.question || "Question"}</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {(questionData.choices || ['Option A', 'Option B', 'Option C', 'Option D']).map((choice: string, i: number) => (
                  <div key={i} className="p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400 text-center shadow-sm">
                    {choice}
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'sentence_reorder' && (
             <div className="space-y-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{questionData.instruction || "Arrange the words"}</p>
                <div className="min-h-[100px] border-b-2 border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 py-4">
                  {/* Empty state slots */}
                </div>
                <div className="flex flex-wrap gap-2">
                   {(questionData.words || questionData.tokens || []).map((token: string, i: number) => (
                     <div key={i} className="px-4 py-2 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                       {token}
                     </div>
                   ))}
                </div>
             </div>
          )}

          {type === 'fill_blank' && (
             <div className="space-y-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{questionData.instruction || "Fill in the blank"}</p>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white leading-relaxed">
                        {questionData.question}
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {(questionData.choices || []).map((choice: string, i: number) => (
                        <div key={i} className="p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-500 text-center">
                            {choice}
                        </div>
                    ))}
                </div>
             </div>
          )}

          {type === 'match_pair' && (
             <div className="space-y-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{questionData.instruction || "Match the pairs"}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        {(questionData.pairs || []).map((p: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl border-2 border-sky-100 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-900 text-sky-700 dark:text-sky-400 font-bold text-xs text-center">
                                {p.left}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {(questionData.pairs || []).map((p: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-400 text-xs text-center">
                                {p.right}
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          )}

          {!type && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
               <Eye size={48} className="text-slate-200 dark:text-slate-800" />
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Select a question to see the mobile-first preview</p>
            </div>
          )}
        </div>

        <footer className="mt-8 pt-8">
           <div className="w-full py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           </div>
        </footer>
      </div>
    </div>
  );
}
