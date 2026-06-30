"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle2, AlertCircle, Save, Smartphone, Laptop, Loader2, RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';
import { QuestionEditor } from '@/components/administration/studio/QuestionEditor';
import { PreviewPanel } from '@/components/administration/studio/PreviewPanel';
import { createClient } from '@/lib/supabase/client';

export default function ExamReviewPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  async function fetchData() {
    if (!examId) return;
    setLoading(true);
    setErrorInfo(null);
    console.log("--- Review Screen: Starting Fetch for Exam:", examId, "---");

    try {
        // 1. Fetch Exam & Collection info
        const { data: examData, error: examError } = await supabase
            .from('exams')
            .select(`
                *,
                assessment_collections (
                    subject_slug,
                    grade
                )
            `)
            .eq('id', examId)
            .single();
        
        if (examError) {
            console.error("Exam Fetch Error:", examError);
            setErrorInfo("Exam not found: " + examError.message);
            setLoading(false);
            return;
        }
        setExam(examData);

        // 2. Fetch Junction table first to verify links
        const { data: junctionData, error: junctionError } = await supabase
            .from('exam_questions')
            .select('*')
            .eq('exam_id', examId)
            .order('order_index', { ascending: true });

        if (junctionError) {
            console.error("Junction Fetch Error:", junctionError);
            setErrorInfo("Failed to load question links: " + junctionError.message);
            setLoading(false);
            return;
        }

        console.log(`Found ${junctionData?.length || 0} links in exam_questions.`);

        if (!junctionData || junctionData.length === 0) {
            setQuestions([]);
            setLoading(false);
            return;
        }

        // 3. Fetch Question details manually to be safe (avoid join issues if RLS is tricky)
        const qIds = junctionData.map(j => j.question_bank_id);
        const { data: qBankData, error: qBankError } = await supabase
            .from('question_bank')
            .select('*')
            .in('id', qIds);

        if (qBankError) {
            console.error("Question Bank Fetch Error:", qBankError);
            setErrorInfo("Failed to load question content: " + qBankError.message);
            setLoading(false);
            return;
        }

        // 4. Merge data to maintain order_index
        const merged = junctionData.map(j => {
            const content = qBankData?.find(q => q.id === j.question_bank_id);
            if (!content) return null;
            return {
                id: content.id,
                exam_question_id: j.id,
                order_index: j.order_index,
                type: content.type,
                status: content.status,
                question_data: content.metadata_json,
                source_anchor: content.source_anchor
            };
        }).filter(Boolean);

        console.log("Successfully merged questions:", merged.length);
        setQuestions(merged);
    } catch (err: any) {
        console.error("Critical Review Screen Error:", err);
        setErrorInfo("Critical Error: " + err.message);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const handleSaveQuestion = async (updated: any) => {
    const { error } = await supabase
        .from('question_bank')
        .update({ 
            metadata_json: updated.question_data,
            status: 'approved' 
        })
        .eq('id', updated.id);

    if (error) {
        alert("Error saving question: " + error.message);
        return;
    }

    const next = [...questions];
    next[selectedQuestionIndex] = { ...updated, status: 'approved' };
    setQuestions(next);
  };

  const handleDeleteQuestion = async (id: string) => {
    const target = questions.find(q => q.id === id);
    if (!target) return;

    if (!confirm("Delete this question from exam?")) return;

    const { error } = await supabase
        .from('exam_questions')
        .delete()
        .eq('id', target.exam_question_id);

    if (error) {
        alert("Error deleting: " + error.message);
    } else {
        setQuestions(prev => prev.filter(q => q.id !== id));
        setSelectedQuestionIndex(0);
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-sky-600" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs text-center">Loading assessment data...</p>
      </div>
    );
  }

  if (errorInfo) {
      return (
        <div className="h-[80vh] flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle size={48} className="text-rose-500 mb-4" />
            <h2 className="text-2xl font-black mb-2">Something went wrong</h2>
            <p className="text-slate-500 font-bold mb-6">{errorInfo}</p>
            <button onClick={() => fetchData()} className="px-6 py-3 bg-sky-600 text-white rounded-xl font-black flex items-center gap-2">
                <RefreshCw size={18} /> TRY AGAIN
            </button>
        </div>
      );
  }

  if (!exam) {
      return <div className="p-8 text-center font-bold">Exam not found.</div>;
  }

  const selectedQuestion = questions[selectedQuestionIndex];

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
           <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500">
             <ChevronLeft size={24} />
           </button>
           <div>
              <h1 className="text-2xl font-black tracking-tight">{exam.title}</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {exam.assessment_collections?.subject_slug} • Grade {exam.assessment_collections?.grade} • Review Mode
              </p>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-4">
              <button 
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Laptop size={18} />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Smartphone size={18} />
              </button>
           </div>

           <Link 
            href={`/assessment-studio/exams/${examId}/preview`}
            className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-sky-500 text-sky-600 rounded-xl font-black text-sm transition-all flex items-center gap-2"
           >
              <Eye size={18} /> STUDENT PREVIEW
           </Link>

           <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 group">
              FINALIZE ASSESSMENT
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Question Navigator */}
        <div className="col-span-12 lg:col-span-3 space-y-3">
          <div className="mb-4">
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Questions ({questions.length})</p>
          </div>
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestionIndex(i)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                selectedQuestionIndex === i 
                  ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-900/10 shadow-sm' 
                  : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                  selectedQuestionIndex === i ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  {i + 1}
                </span>
                <div>
                   <p className={`text-sm font-bold truncate max-w-[120px] ${selectedQuestionIndex === i ? 'text-sky-700 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`}>
                     {q.type?.replace('_', ' ') || 'Unknown'}
                   </p>
                   <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-tighter italic">
                     Page {q.source_anchor?.page || 'N/A'}
                   </p>
                </div>
              </div>
              
              {q.status === 'approved' ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
              ) : (
                <AlertCircle size={16} className="text-amber-500 animate-pulse" />
              )}
            </button>
          ))}
          
          {questions.length === 0 && (
              <div className="p-4 text-center text-slate-400 font-bold italic text-sm">No questions in this exam.</div>
          )}
        </div>

        {/* Middle: Editor */}
        <div className="col-span-12 lg:col-span-5">
           {selectedQuestion ? (
             <QuestionEditor 
               question={selectedQuestion} 
               onSave={handleSaveQuestion}
               onDelete={handleDeleteQuestion} 
               onRegenerate={() => {}} 
             />
           ) : (
             <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                Select a question to edit
             </div>
           )}
        </div>

        {/* Right: Preview */}
        <div className="col-span-12 lg:col-span-4">
           <div className="sticky top-24">
              <div className="mb-6 flex items-center justify-center gap-2 text-slate-400">
                 <Smartphone size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Mobile Gameplay Preview</span>
              </div>
              <PreviewPanel 
                questionData={selectedQuestion?.question_data} 
                type={selectedQuestion?.type} 
              />
              
              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">AI Insights:</p>
                 <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                   &quot;This question uses 100% textbook-aligned vocabulary. The distractors are selected from Unit 1 pool to ensure high relevance and pedagogical consistency.&quot;
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
