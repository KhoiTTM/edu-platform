"use client";

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

interface QuestionEditorProps {
  question: any;
  onSave: (updated: any) => void;
  onDelete: (id: string) => void;
  onRegenerate: (id: string) => void;
}

export function QuestionEditor({ question, onSave, onDelete, onRegenerate }: QuestionEditorProps) {
  const [data, setData] = useState(question.question_data || {});

  useEffect(() => {
    setData(question.question_data || {});
  }, [question]);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...data, [field]: value };
    setData(updated);
    onSave({ ...question, question_data: updated });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 sticky top-24 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50 dark:border-slate-800">
        <div>
           <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
             <span className="text-slate-400 text-sm font-bold"># {question.order_index + 1}</span>
             Edit Question
           </h3>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">ID: {question.id}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onRegenerate(question.id)}
            className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all shadow-sm active:translate-y-0.5"
            title="Regenerate with AI"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={() => onDelete(question.id)}
            className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-all shadow-sm active:translate-y-0.5"
            title="Delete Question"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Instruction */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Instruction</label>
          <input
            type="text"
            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
            value={data.instruction || ''}
            onChange={(e) => handleUpdate('instruction', e.target.value)}
          />
        </div>

        {/* Question Text */}
        {data.question !== undefined && (
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Question Text / Sentence</label>
            <textarea
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all resize-none"
              value={data.question || data.correct_sentence || ''}
              onChange={(e) => handleUpdate(data.correct_sentence ? 'correct_sentence' : 'question', e.target.value)}
            />
          </div>
        )}

        {/* Sentence Reorder Tokens */}
        {(question.type === 'sentence_reorder') && (
            <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Sentence Tokens (comma separated)</label>
                <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
                    value={(data.words || data.tokens || []).join(', ')}
                    onChange={(e) => handleUpdate(data.words ? 'words' : 'tokens', e.target.value.split(',').map(s => s.trim()))}
                />
            </div>
        )}

        {/* Match Pairs Editor */}
        {question.type === 'match_pair' && (
            <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Matching Pairs</label>
                <div className="space-y-4">
                    {(data.pairs || []).map((pair: any, i: number) => (
                        <div key={i} className="flex items-center gap-4">
                            <input
                                type="text"
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-sky-500/50 transition-all"
                                value={pair.left}
                                onChange={(e) => {
                                    const nextPairs = [...data.pairs];
                                    nextPairs[i].left = e.target.value;
                                    handleUpdate('pairs', nextPairs);
                                }}
                            />
                            <div className="text-slate-300">↔</div>
                            <input
                                type="text"
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-sky-500/50 transition-all"
                                value={pair.right}
                                onChange={(e) => {
                                    const nextPairs = [...data.pairs];
                                    nextPairs[i].right = e.target.value;
                                    handleUpdate('pairs', nextPairs);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Choices / Options */}
        {(data.choices || data.options) && (
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Options</label>
            <div className="space-y-3">
              {(data.choices || data.options).map((choice: string, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between">
                     <span className="text-slate-800 dark:text-white font-bold">{choice}</span>
                     {(data.correct_answer === choice || data.correct_word === choice) && (
                       <CheckCircle2 size={18} className="text-emerald-500" />
                     )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase mt-3 tracking-widest text-center italic">Distractors are curriculum-validated</p>
          </div>
        )}

        {/* Source Anchor Info */}
        <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
           <div className="flex items-center gap-2 mb-2 text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Source Anchor:</span>
           </div>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Book: {question.source_anchor?.book || 'N/A'}</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Unit: {question.source_anchor?.unit || 'N/A'}</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Page: {question.source_anchor?.page || 'N/A'}</span>
           </div>
        </div>

        <button 
          onClick={() => onSave(question)}
          className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 group"
        >
          <Save size={18} className="group-hover:scale-110 transition-transform" />
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
}
