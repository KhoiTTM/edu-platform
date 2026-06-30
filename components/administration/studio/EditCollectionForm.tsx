"use client";

import React, { useState, useEffect } from 'react';
import { Save, Loader2, X, Info, RefreshCw } from 'lucide-react';

interface EditCollectionFormProps {
  collection: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditCollectionForm({ collection, onSuccess, onCancel }: EditCollectionFormProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingSequence, setFetchingSequence] = useState(false);
  const [formData, setFormData] = useState({
    title: collection.title || '',
    subject_slug: collection.subject_slug || 'tieng_anh',
    grade: collection.grade || 3,
    volume: collection.volume || 1,
    units: (collection.units || []).join(', '),
    sequence_number: collection.sequence_number || 1,
    exam_type: collection.exam_type || 'unit_test',
    status: collection.status || 'draft'
  });

  // Auto-Fetch Sequence logic when metadata changes
  const fetchNextSequence = async () => {
    setFetchingSequence(true);
    try {
        const query = new URLSearchParams({
            subject: formData.subject_slug,
            grade: formData.grade.toString(),
            volume: formData.volume.toString(),
            units: formData.units
        });
        const res = await fetch(`/api/assessment/next-sequence?${query}`);
        const data = await res.json();
        if (data.nextSequence) {
            setFormData(prev => ({ ...prev, sequence_number: data.nextSequence }));
        }
    } catch (e) {
        console.error(e);
    } finally {
        setFetchingSequence(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/assessment/collections/${collection.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          units: formData.units.split(',').map((n: string) => parseInt(n.trim())).filter((n: number) => !isNaN(n)),
        }),
      });

      if (!response.ok) throw new Error("Update failed");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error updating collection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Edit Parameters</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Modify mapping and curriculum data</p>
        </div>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-rose-500 transition-all">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Display Title</label>
          <input
            type="text"
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Subject</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all cursor-pointer appearance-none"
              value={formData.subject_slug}
              onChange={(e) => setFormData({...formData, subject_slug: e.target.value})}
            >
              <option value="tieng_anh">English</option>
              <option value="math">Mathematics</option>
              <option value="ielts">IELTS</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Grade (Lớp)</label>
            <input
              type="number"
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Volume (Tập)</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all cursor-pointer appearance-none"
              value={formData.volume}
              onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value)})}
            >
              <option value={1}>Volume 1</option>
              <option value={2}>Volume 2</option>
              <option value={0}>None</option>
            </select>
          </div>
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Order (# Trong Unit)</label>
            <div className="flex gap-2">
                <input
                type="number"
                className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-black outline-none focus:border-sky-500/50 transition-all"
                value={formData.sequence_number}
                onChange={(e) => setFormData({...formData, sequence_number: parseInt(e.target.value)})}
                />
                <button 
                    type="button"
                    onClick={fetchNextSequence}
                    disabled={fetchingSequence}
                    className="px-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-sky-600 hover:bg-sky-50 transition-all"
                    title="Get next available order"
                >
                    <RefreshCw size={20} className={fetchingSequence ? 'animate-spin' : ''} />
                </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Unit IDs (e.g. 1, 2)</label>
            <input
              type="text"
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all"
              value={formData.units}
              onChange={(e) => setFormData({...formData, units: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Exam Type</label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-sky-500/50 transition-all cursor-pointer appearance-none"
              value={formData.exam_type}
              onChange={(e) => setFormData({...formData, exam_type: e.target.value})}
            >
              <option value="unit_test">Unit Test</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
              <option value="year_end">Year-end</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-100 dark:border-sky-900 rounded-2xl flex gap-3">
            <Info className="text-sky-600 flex-shrink-0" size={20} />
            <p className="text-xs font-bold text-sky-700 dark:text-sky-400 leading-relaxed">
                Changing these parameters will affect how this assessment is mapped onto the learning world. Use the refresh icon next to Order to automatically find the next available sequence for this curriculum spot.
            </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : "APPLY MAPPING CHANGES"}
        </button>
      </div>
    </form>
  );
}
