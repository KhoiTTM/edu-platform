"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, Book, Cpu, Hash, Wand2, RefreshCw } from 'lucide-react';

interface GenerationFormProps {
  onSuccess: (data: any) => void;
}

export function GenerationForm({ onSuccess }: GenerationFormProps) {
  const [loading, setLoading] = useState(false);
  const [autoTitle, setAutoTitle] = useState(true);
  const [fetchingSequence, setFetchingSequence] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: 'tieng_anh',
    grade: 3,
    unitNumbers: '1',
    count: 10,
    prompt: '',
    sourceId: 'tienganh-tap1.pdf',
    modelId: 'gemini-flash-latest',
    manualModel: false,
    sequenceNumber: 1,
    volume: 1,
    examType: 'unit_test',
  });

  // Dynamic Title Generation
  useEffect(() => {
    if (autoTitle) {
      let subName = 'English';
      if (formData.subject === 'math') subName = 'Math';
      if (formData.subject === 'ielts') subName = 'IELTS';
      
      const volSuffix = formData.volume > 0 ? ` - Vol ${formData.volume}` : '';
      const unitLabel = formData.unitNumbers.includes(',') ? `Units ${formData.unitNumbers}` : `Unit ${formData.unitNumbers}`;
      const generated = `${subName} Grade ${formData.grade}${volSuffix} - ${unitLabel} - Ex ${formData.sequenceNumber}`;
      setFormData(prev => ({ ...prev, title: generated }));
    }
  }, [autoTitle, formData.subject, formData.grade, formData.volume, formData.unitNumbers, formData.sequenceNumber]);

  // Auto-Fetch Sequence logic
  const fetchNextSequence = async () => {
    setFetchingSequence(true);
    try {
        const query = new URLSearchParams({
            subject: formData.subject,
            grade: formData.grade.toString(),
            volume: formData.volume.toString(),
            units: formData.unitNumbers
        });
        const res = await fetch(`/api/assessment/next-sequence?${query}`);
        const data = await res.json();
        if (data.nextSequence) {
            setFormData(prev => ({ ...prev, sequenceNumber: data.nextSequence }));
        }
    } catch (e) {
        console.error(e);
    } finally {
        setFetchingSequence(false);
    }
  };

  // Re-fetch sequence when coordinates change
  useEffect(() => {
    fetchNextSequence();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.subject, formData.grade, formData.volume, formData.unitNumbers]);

  const availableModels = [
    { id: 'gemini-flash-latest', name: 'Gemini Flash (Fast & High Limit)' },
    { id: 'models/gemini-pro-latest', name: 'Gemini Pro (Smartest)' },
    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Exp)' },
  ];

  const books = [
    { id: 'tienganh-tap1.pdf', name: 'Global Success 3 - Tập 1', subject: 'tieng_anh' },
    { id: 'tienganh-tap2.pdf', name: 'Global Success 3 - Tập 2', subject: 'tieng_anh' },
    { id: 'toan3-tap1.pdf', name: 'Cánh Diều 3 - Tập 1', subject: 'math' },
    { id: 'toan3-tap2.pdf', name: 'Cánh Diều 3 - Tập 2', subject: 'math' },
    { id: 'mindset-foundation.pdf', name: 'Mindset for IELTS Foundation', subject: 'ielts' },
  ];

  const filteredBooks = books.filter(b => b.subject === formData.subject);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/assessment/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          unitNumbers: formData.unitNumbers.split(',').map(n => parseInt(n.trim())),
        }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      console.error(error);
      alert("Error generating assessment. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">AI Assessment Generator</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Curriculum-Aligned Offline Engine</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Collection Title</label>
          <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-500 dark:text-slate-400 font-black cursor-not-allowed flex items-center justify-between">
                <span>{formData.title || 'Auto-generated upon save'}</span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                    <Wand2 size={12} /> Auto-managed
                </span>
          </div>
        </div>

        {/* AI Prompt */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">AI Instructions (Optional Prompt)</label>
          <textarea
            placeholder="e.g. Focus on phonics /b/ and /h/, use very short sentences for 8 year olds..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all resize-none"
            rows={3}
            value={formData.prompt}
            onChange={(e) => setFormData({...formData, prompt: e.target.value})}
          />
        </div>

        {/* Model Selection */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
           <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <Cpu size={14} /> AI Engine / Model
              </label>
              <button 
                type="button"
                onClick={() => setFormData({...formData, manualModel: !formData.manualModel})}
                className="text-[9px] font-black text-sky-600 uppercase hover:underline"
              >
                {formData.manualModel ? "Select from list" : "Enter manually"}
              </button>
           </div>
           
           {formData.manualModel ? (
             <input
               type="text"
               placeholder="e.g. gemini-1.5-pro-002"
               className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-sky-500/50 transition-all"
               value={formData.modelId}
               onChange={(e) => setFormData({...formData, modelId: e.target.value})}
             />
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableModels.map(m => (
                    <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({...formData, modelId: m.id})}
                        className={`px-4 py-3 rounded-xl border-2 text-xs font-black transition-all text-left ${formData.modelId === m.id ? 'bg-sky-600 border-sky-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-sky-500/50'}`}
                    >
                        {m.name}
                    </button>
                ))}
             </div>
           )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Subject */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Subject</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none appearance-none cursor-pointer focus:border-sky-500/50 transition-all"
              value={formData.subject}
              onChange={(e) => {
                  const sub = e.target.value;
                  const firstBook = books.find(b => b.subject === sub)?.id || '';
                  setFormData({...formData, subject: sub, sourceId: firstBook});
              }}
            >
              <option value="tieng_anh">English</option>
              <option value="math">Mathematics</option>
              <option value="ielts">IELTS</option>
            </select>
          </div>

          {/* Reference Book */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Reference Book (PDF)</label>
            <div className="relative">
                <select
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none appearance-none cursor-pointer focus:border-sky-500/50 transition-all"
                value={formData.sourceId}
                onChange={(e) => setFormData({...formData, sourceId: e.target.value})}
                >
                {filteredBooks.map(book => (
                    <option key={book.id} value={book.id}>{book.name}</option>
                ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                   <Book size={18} />
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Volume */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Textbook Volume (Tập)</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none appearance-none cursor-pointer focus:border-sky-500/50 transition-all"
              value={formData.volume}
              onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value) || 0})}
            >
              <option value={1}>Volume 1</option>
              <option value={2}>Volume 2</option>
              <option value={0}>None</option>
            </select>
          </div>

          {/* Assessment Type */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Assessment Type</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none appearance-none cursor-pointer focus:border-sky-500/50 transition-all"
              value={formData.examType}
              onChange={(e) => setFormData({...formData, examType: e.target.value})}
            >
              <option value="unit_test">Unit Test</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Semester Final</option>
              <option value="year_end">Year-end Assessment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Grade */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Grade</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none appearance-none cursor-pointer focus:border-sky-500/50 transition-all"
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: parseInt(e.target.value)})}
            >
              <option value={3}>Grade 3</option>
              <option value={4}>Grade 4</option>
              <option value={5}>Grade 5</option>
              <option value={0}>N/A (IELTS)</option>
            </select>
          </div>

          {/* Units */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Target Units</label>
            <input
              type="text"
              required
              placeholder="e.g. 1, 2, 5"
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
              value={formData.unitNumbers}
              onChange={(e) => setFormData({...formData, unitNumbers: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
           {/* Sequence Number */}
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Assessment Order (#)</label>
            <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-500 dark:text-slate-400 font-black cursor-not-allowed flex items-center justify-between">
                <span>{formData.sequenceNumber}</span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                    {fetchingSequence ? <Loader2 size={12} className="animate-spin" /> : 'Auto-managed'}
                </span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Question Count</label>
            <input
                type="number"
                min={1}
                max={50}
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
                value={formData.count}
                onChange={(e) => setFormData({...formData, count: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_rgb(3,105,161)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              ORCHESTRATING...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              GENERATE ASSESSMENT DRAFT
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-4">
           <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
           </div>
           <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Retrieving Curriculum • Running Deterministic Engine • Applying AI Layer
           </p>
        </div>
      )}
    </form>
  );
}
