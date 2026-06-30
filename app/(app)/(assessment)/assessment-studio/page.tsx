"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Trash2, Edit3, Eye, Calendar, BookOpen, GraduationCap, ChevronRight, X, Hash, Layers, FileCheck, Settings2 } from 'lucide-react';
import { GenerationForm } from '@/components/administration/studio/GenerationForm';
import { EditCollectionForm } from '@/components/administration/studio/EditCollectionForm';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function StudioDashboard() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [editCollection, setEditCollection] = useState<any | null>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & Sorting
  const [filters, setFilters] = useState({
    subject: 'all',
    grade: 'all',
    book: 'all',
    volume: 'all',
    unit: 'all',
    type: 'all',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

  const supabase = createClient();

  useEffect(() => {
    fetchCollections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCollections() {
    setLoading(true);
    // Hierarchical Sorting: Grade > Subject > Volume > Units > Sequence Number
    // Initial fetch sort
    const { data, error } = await supabase
      .from('assessment_collections')
      .select('*, exams(id)')
      .order('grade', { ascending: true })
      .order('subject_slug', { ascending: true })
      .order('volume', { ascending: true })
      .order('sequence_number', { ascending: true });

    if (error) {
      console.error("Error fetching collections:", error);
    } else {
      const enriched = data?.map((c: any) => ({
          ...c,
          latest_exam_id: c.exams?.[0]?.id
      }));
      setCollections(enriched || []);
    }
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection and all its exams?")) return;
    
    const { error } = await supabase
      .from('assessment_collections')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setCollections(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCollections = collections.filter(c => {
    const matchSubject = filters.subject === 'all' || c.subject_slug === filters.subject;
    const matchGrade = filters.grade === 'all' || c.grade.toString() === filters.grade;
    const matchBook = filters.book === 'all' || c.reference_book === filters.book;
    const matchVolume = filters.volume === 'all' || (c.volume?.toString() || '0') === filters.volume;
    const matchUnit = filters.unit === 'all' || (c.units && c.units.includes(parseInt(filters.unit)));
    const matchType = filters.type === 'all' || c.exam_type === filters.type;
    return matchSubject && matchGrade && matchBook && matchVolume && matchUnit && matchType;
  });

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle special cases
    if (sortConfig.key === 'units') {
        aValue = a.units && a.units.length > 0 ? a.units[0] : 0;
        bValue = b.units && b.units.length > 0 ? b.units[0] : 0;
    }
    if (sortConfig.key === 'created_at') {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
      if (sortConfig.key !== columnKey) return <span className="opacity-0 group-hover:opacity-50 ml-1 inline-block">↕</span>;
      return <span className="ml-1 text-sky-500 inline-block">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="max-w-[1500px] mx-auto pb-20 text-slate-900 dark:text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4">Studio</h1>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <BookOpen size={14} /> {collections.length} Collections
             </div>
             <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
             <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[10px] tracking-widest">
                <Plus size={14} /> Ready to Generate
             </div>
          </div>
        </div>

        <button 
          onClick={() => setShowGenerator(true)}
          className="flex items-center gap-3 px-8 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_rgb(3,105,161)] active:translate-y-1 active:shadow-none transition-all group"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform" />
          NEW ASSESSMENT
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 mb-10 flex flex-wrap items-center gap-4 shadow-sm">
         <div className="flex items-center gap-3 mr-2">
            <Filter size={18} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter:</span>
         </div>

         <select 
            className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            value={filters.subject}
            onChange={(e) => setFilters({...filters, subject: e.target.value})}
        >
            <option value="all">All Subjects</option>
            <option value="tieng_anh">English</option>
            <option value="math">Mathematics</option>
            <option value="ielts">IELTS</option>
        </select>

        <select 
            className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            value={filters.grade}
            onChange={(e) => setFilters({...filters, grade: e.target.value})}
        >
            <option value="all">All Grades</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="7">Grade 7</option>
            <option value="0">IELTS (N/A)</option>
        </select>

        <select 
            className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            value={filters.volume}
            onChange={(e) => setFilters({...filters, volume: e.target.value})}
        >
            <option value="all">All Volumes</option>
            <option value="1">Volume 1</option>
            <option value="2">Volume 2</option>
            <option value="0">Single / None</option>
        </select>

        <select 
            className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            value={filters.unit}
            onChange={(e) => setFilters({...filters, unit: e.target.value})}
        >
            <option value="all">All Units</option>
            {Array.from({length: 20}, (_, i) => i + 1).map(u => (
                <option key={u} value={u.toString()}>Unit {u}</option>
            ))}
        </select>

        <select 
            className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
            <option value="all">All Types</option>
            <option value="unit_test">Unit Test</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
            <option value="year_end">Year-end</option>
        </select>

         {(filters.subject !== 'all' || filters.grade !== 'all' || filters.volume !== 'all' || filters.unit !== 'all' || filters.type !== 'all') && (
             <button 
                onClick={() => setFilters({subject: 'all', grade: 'all', book: 'all', volume: 'all', unit: 'all', type: 'all'})}
                className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors"
             >
                <X size={14} /> Reset
             </button>
         )}
      </div>

      {/* Grid List (Table View) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b-2 border-slate-100 dark:border-slate-800 text-slate-400 select-none">
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center w-16">#</th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('grade')}>
                        Grade <SortIcon columnKey="grade" />
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('subject_slug')}>
                        Subject <SortIcon columnKey="subject_slug" />
                    </th>
                    <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('volume')}>
                        Volume <SortIcon columnKey="volume" />
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('units')}>
                        Unit <SortIcon columnKey="units" />
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('sequence_number')}>
                        Order (#) <SortIcon columnKey="sequence_number" />
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('title')}>
                        Assessment Title <SortIcon columnKey="title" />
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('exam_type')}>
                        Type <SortIcon columnKey="exam_type" />
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest cursor-pointer group hover:text-sky-600 transition-colors" onClick={() => handleSort('created_at')}>
                        Created At <SortIcon columnKey="created_at" />
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50 dark:divide-slate-800">
                {loading ? (
                    [1,2,3,4].map(i => (
                        <tr key={i} className="animate-pulse">
                            <td colSpan={10} className="px-8 py-10">
                                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"></div>
                            </td>
                        </tr>
                    ))
                ) : (
                    sortedCollections.map((c, index) => (
                        <tr key={c.id} className="group hover:bg-slate-50/50 dark:hover:bg-sky-900/5 transition-colors">
                            <td className="px-6 py-6 text-center font-black text-xs text-slate-400">
                                {index + 1}
                            </td>
                            <td className="px-6 py-6 text-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs border border-slate-200 dark:border-slate-700">
                                    {c.grade === 0 ? "I" : c.grade}
                                </span>
                            </td>
                            <td className="px-6 py-6 text-center">
                                <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/50">
                                    {c.subject_slug?.replace('_', ' ')}
                                </span>
                            </td>
                            <td className="px-4 py-6 text-center">
                                <div className="flex items-center justify-center gap-1.5 font-black text-[10px] text-slate-500 uppercase">
                                    <Layers size={12} className="text-slate-300" />
                                    {c.volume ? `Tập ${c.volume}` : "-"}
                                </div>
                            </td>
                            <td className="px-6 py-6 text-center">
                                <div className="flex flex-wrap justify-center gap-1">
                                    {(c.units || []).map((u: number | string) => (
                                        <span key={u} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-black text-slate-500">
                                            U{u}
                                        </span>
                                    ))}
                                    {(!c.units || c.units.length === 0) && <span className="text-slate-300">-</span>}
                                </div>
                            </td>
                            <td className="px-6 py-6 text-center">
                                <span className="font-black text-slate-700 dark:text-slate-300 text-xs bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-full border border-sky-100 dark:border-sky-900">
                                    {c.sequence_number || 1}
                                </span>
                            </td>
                            <td className="px-8 py-6">
                                <Link href={`/assessment-studio/collections/${c.id}`} className="hover:underline">
                                    <p className="font-black text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors line-clamp-1">{c.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 line-clamp-1 max-w-[200px]">
                                        {c.reference_book || "Custom Reference"}
                                    </p>
                                </Link>
                            </td>
                            <td className="px-6 py-6 text-center">
                                <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black text-[9px] uppercase tracking-widest border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                    {c.exam_type?.replace('_', ' ') || 'UNIT TEST'}
                                </span>
                            </td>
                            <td className="px-6 py-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                        <Calendar size={12} className="text-slate-400" />
                                        {new Date(c.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => setEditCollection(c)}
                                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                                        title="Edit Parameters"
                                    >
                                        <Settings2 size={20} />
                                    </button>

                                    {c.latest_exam_id && (
                                        <>
                                            <Link 
                                                href={`/assessment-studio/exams/${c.latest_exam_id}/preview`}
                                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                                                title="Student Preview"
                                            >
                                                <Eye size={20} />
                                            </Link>
                                            <Link 
                                                href={`/assessment-studio/exams/${c.latest_exam_id}/review`}
                                                className="p-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-slate-400 hover:text-white hover:bg-sky-600 transition-all active:scale-95 shadow-md"
                                                title="Review Content"
                                            >
                                                <Edit3 size={20} />
                                            </Link>
                                        </>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(c.id)}
                                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}

                {!loading && sortedCollections.length === 0 && (
                    <tr>
                        <td colSpan={10} className="px-8 py-32 text-center">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-6">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-300 dark:text-slate-700">No assessments found</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Try adjusting your filters or generate a new one</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-900/40 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl animate-in zoom-in-95 duration-300 relative text-slate-900 dark:text-white">
            <button 
                onClick={() => setShowGenerator(false)}
                className="absolute -top-12 right-0 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg hover:scale-110 transition-all text-slate-500 hover:text-rose-500 z-[110]"
            >
                <X size={24} />
            </button>
            <GenerationForm onSuccess={(data) => {
                setShowGenerator(false);
                fetchCollections();
            }} />
          </div>
        </div>
      )}

      {/* Edit Parameters Modal */}
      {editCollection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-900/40 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl animate-in zoom-in-95 duration-300 relative text-slate-900 dark:text-white">
            <EditCollectionForm 
                collection={editCollection} 
                onSuccess={() => {
                    setEditCollection(null);
                    fetchCollections();
                }}
                onCancel={() => setEditCollection(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
