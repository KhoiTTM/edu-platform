"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ChevronLeft, X } from 'lucide-react';
import { LessonSession } from '@/components/learning/duolingo/lesson-engine/LessonSession';
import { createClient } from '@/lib/supabase/client';

export default function AssessmentStudentPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPreviewData() {
        if (!examId) return;
        setLoading(true);

        const { data: qData, error: qError } = await supabase
            .from('exam_questions')
            .select(`
                id,
                order_index,
                question_bank (
                    id,
                    type,
                    metadata_json
                )
            `)
            .eq('exam_id', examId)
            .order('order_index', { ascending: true });

        if (!qError && qData) {
            const flattened = qData.map((item: any) => ({
                ...item.question_bank.metadata_json,
                id: item.question_bank.id,
                type: item.question_bank.type
            }));
            setQuestions(flattened);
        }
        setLoading(false);
    }
    fetchPreviewData();
  }, [examId, supabase]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-sky-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Preparing student preview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center relative">
      {/* Overlay Header for Studio */}
      <div className="fixed top-4 left-4 z-[100] flex items-center gap-4">
         <button 
            onClick={() => router.back()}
            className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-100 dark:border-slate-700 text-slate-500 hover:scale-105 transition-all flex items-center gap-2 font-black text-xs uppercase"
         >
            <ChevronLeft size={18} /> Exit Preview
         </button>
         <div className="px-4 py-3 bg-emerald-500 text-white rounded-2xl shadow-xl font-black text-xs uppercase tracking-widest">
            STUDENT VIEW MODE 🎓
         </div>
      </div>

      <div className="w-full max-w-[430px] min-h-screen bg-white dark:bg-slate-900 shadow-2xl relative border-x border-slate-100 dark:border-slate-800">
        {questions.length > 0 ? (
          <LessonSession 
            steps={questions} 
            isReviewMode={true} // Sandbox mode: no heart deduction, no SRS sync
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
             <X size={48} className="text-rose-500" />
             <h3 className="text-xl font-black">No Content</h3>
             <p className="text-slate-400 font-bold">This exam has no questions to preview.</p>
             <button onClick={() => router.back()} className="text-sky-600 font-black uppercase text-sm">Go back and add questions</button>
          </div>
        )}
      </div>
    </div>
  );
}
