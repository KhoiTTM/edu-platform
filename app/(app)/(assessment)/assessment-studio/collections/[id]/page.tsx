"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, FileText, Calendar, ArrowRight, Loader2, Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
        if (!id) return;
        setLoading(true);

        // 1. Fetch Collection
        const { data: colData } = await supabase
            .from('assessment_collections')
            .select('*')
            .eq('id', id)
            .single();
        
        // 2. Fetch Exams
        const { data: examData } = await supabase
            .from('exams')
            .select('*')
            .eq('collection_id', id)
            .order('created_at', { ascending: false });

        setCollection(colData);
        setExams(examData || []);
        setLoading(false);
    }
    fetchData();
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-sky-600" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs text-center">Loading collection...</p>
      </div>
    );
  }

  if (!collection) {
    return <div className="p-8 text-center font-bold">Collection not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
         <button onClick={() => router.push('/assessment-studio')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500">
           <ChevronLeft size={24} />
         </button>
         <div>
            <h1 className="text-3xl font-black tracking-tight">{collection.title}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              {collection.subject_slug} • Grade {collection.grade} • {exams.length} Exams
            </p>
         </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-white">Generated Assessments</h2>
           <button className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase hover:text-sky-500 transition-colors">
              <Plus size={16} /> GENERATE NEW VARIATION
           </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {exams.map((exam) => (
             <div 
               key={exam.id}
               className="group bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-sky-500/50 transition-all flex items-center justify-between"
             >
                <div className="flex items-center gap-6">
                   <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 group-hover:text-sky-600 transition-all">
                      <FileText size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1">{exam.title || "Untitled Assessment"}</h3>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                         <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(exam.created_at).toLocaleDateString()}</span>
                         <span>{exam.total_questions} Questions</span>
                         <span className="uppercase tracking-widest text-sky-600/70">{exam.generation_mode}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={`/assessment-studio/exams/${exam.id}/preview`}
                        className="px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-sky-500 rounded-xl font-black text-xs transition-all flex items-center gap-2 text-slate-500 hover:text-sky-600"
                    >
                        <Eye size={14} /> PREVIEW
                    </Link>
                    <Link 
                        href={`/assessment-studio/exams/${exam.id}/review`}
                        className="px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-sky-600 text-white rounded-xl font-black text-xs transition-all flex items-center gap-2"
                    >
                        REVIEW CONTENT <ArrowRight size={14} />
                    </Link>
                </div>
             </div>
           ))}

           {exams.length === 0 && (
             <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 font-bold uppercase tracking-widest text-sm">
                No exams generated yet in this collection.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
