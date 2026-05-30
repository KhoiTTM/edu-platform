"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, Home, Layout, BookOpen, Trophy, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { AssessmentRenderer } from "./AssessmentRenderer";
import { AssessmentResultCard } from "../assessment/AssessmentResultCard";
import { CurriculumMap } from "./CurriculumMap";
import { useRouter, usePathname } from "next/navigation";

interface LearnNodeClientProps {
  node: {
    id: string;
    title: string;
    slug: string;
    path: string;
    type: string;
    metadata: any;
  };
  breadcrumbs: { title: string; slug: string; path: string }[];
  subjectSlug: string;
  conceptId?: string;
  childNodes?: { id: string; title: string; slug: string; type: string }[];
}

export function LearnNodeClient({ 
  node, 
  breadcrumbs, 
  subjectSlug, 
  conceptId, 
  childNodes 
}: LearnNodeClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const backSlug = breadcrumbs.find(b => b.path.split('.').length === 2)?.slug || 
                   (breadcrumbs.length > 0 ? breadcrumbs[0].slug : '');

  // Check if it is an English subject supporting speaking (tieng-anh-3, mindset-foundation, ielts)
  const unitMatch = node.slug ? node.slug.match(/(unit-\d+)/i) : null;
  const unitId = unitMatch ? unitMatch[1].toLowerCase() : null;
  
  const lessonSlug = node.slug;
  const courseSlug = (node as any).content_sources?.slug || 
                     (node.slug ? node.slug.match(/^([a-z0-9-]+)-(unit-\d+)/i)?.[1] : null);

  const hasSpeaking = !!(courseSlug && lessonSlug && (
    courseSlug.includes('tieng-anh') || 
    courseSlug.includes('mindset') || 
    courseSlug.includes('ielts') || 
    subjectSlug.includes('tieng_anh') || 
    subjectSlug.includes('ielts')
  ));

  const isExam = node.type === 'exam';

  const [currentPart, setCurrentPart] = useState<'video' | 'practice' | 'quiz'>(
    isExam ? 'quiz' : 'video'
  );
  
  const [completed, setCompleted] = useState(false);
  const [practiceSession, setPracticeSession] = useState<any>(null);
  const [quizSession, setQuizSession] = useState<any>(null);
  const [isFetchingPractice, setIsFetchingPractice] = useState(false);
  const [isFetchingQuiz, setIsFetchingQuiz] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (!subjectSlug) return;
    
    let isMounted = true;

    const fetchPractice = async () => {
      setIsFetchingPractice(true);
      try {
        const res = await fetch('/api/assessment/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug,
            conceptIds: conceptId ? [conceptId] : [node.id],
            difficulty: 'medium',
            count: 15
          })
        });
        const data = await res.json();
        if (isMounted) setPracticeSession(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsFetchingPractice(false);
      }
    };

    const fetchQuiz = async () => {
      setIsFetchingQuiz(true);
      try {
        const res = await fetch('/api/assessment/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug,
            conceptIds: conceptId ? [conceptId] : [node.id],
            difficulty: 'hard',
            count: 20
          })
        });
        const data = await res.json();
        if (isMounted) setQuizSession(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsFetchingQuiz(false);
      }
    };

    if (!isExam) {
      fetchPractice();
    }
    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [subjectSlug, conceptId, node.id, isExam]);

  const handleAssessmentComplete = async (answers: any[]) => {
    const activeSession = currentPart === 'practice' ? practiceSession : quizSession;
    if (!activeSession) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSession.id,
          answers
        })
      });
      const data = await res.json();
      
      if (currentPart === 'practice') {
        setCurrentPart('quiz');
      } else {
        setResultData(data);
        setCompleted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 select-none">
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        {breadcrumbs.map((bc, idx) => (
          <div key={bc.path} className="flex items-center gap-2">
            <ChevronRight size={10} />
            <span className={idx === breadcrumbs.length - 1 ? "text-sky-400" : ""}>{bc.title}</span>
          </div>
        ))}
      </nav>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isExam ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'}`}>
                {isExam ? <Trophy size={20} /> : (node.type === 'lesson' ? <BookOpen size={20} /> : <Layout size={20} />)}
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                {node.title}
            </h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl">
          {isExam 
            ? "Bài đánh giá năng lực cuối chương. Hãy tập trung làm bài thật tốt nhé!" 
            : "Hoàn thành tuần tự 3 bước học tập: Xem video giảng bài -> Luyện tập hiểu bài -> Làm quiz tính điểm."}
        </p>
      </div>

      {node.type !== 'lesson' && node.type !== 'exam' ? (
        <CurriculumMap nodes={childNodes || []} subjectSlug={subjectSlug} />
      ) : !completed ? (
        <div className="space-y-6">
          {!isExam && (
            <div className="grid grid-cols-3 gap-2 bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800 shadow-inner text-center text-xs font-bold">
              <button 
                onClick={() => currentPart !== 'quiz' && setCurrentPart('video')}
                className={`py-2 rounded-xl transition ${currentPart === 'video' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                1. Bài giảng Video
              </button>
              <button 
                onClick={() => currentPart !== 'quiz' && setCurrentPart('practice')}
                className={`py-2 rounded-xl transition ${currentPart === 'practice' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'} disabled:opacity-30`}
              >
                2. Luyện tập
              </button>
              <div 
                className={`py-2 rounded-xl transition ${currentPart === 'quiz' ? 'bg-amber-500 text-white shadow' : 'text-slate-500'}`}
              >
                3. Đánh giá tính điểm
              </div>
            </div>
          )}

          {currentPart === 'video' && (
            <div className="space-y-8">
              {node.metadata?.youtube_id ? (
                <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${node.metadata.youtube_id}?rel=0`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="p-16 text-center text-slate-500 italic bg-slate-900/50 rounded-3xl border border-slate-800">
                  Bài học này chưa có video bài giảng.
                </div>
              )}

              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="font-extrabold text-white text-base">Xem xong video rồi?</p>
                  <p className="text-xs text-slate-500">
                    {hasSpeaking 
                      ? "Hãy chọn Luyện tập trắc nghiệm hoặc Luyện nói với AI Teacher nhé!" 
                      : "Chuyển sang làm bài luyện tập không tính điểm để hiểu bài nhé!"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-end w-full sm:w-auto">
                  <button 
                    onClick={() => setCurrentPart('practice')}
                    className={`px-5 py-3 ${hasSpeaking ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' : 'bg-sky-600 hover:bg-sky-500 text-white'} font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2`}
                  >
                    Bắt đầu luyện tập <ChevronRight size={18} />
                  </button>
                  {hasSpeaking && (
                    <Link
                      href={`/speaking/${courseSlug}/${lessonSlug}/session-1?backUrl=${encodeURIComponent(pathname)}`}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2"
                    >
                      🗣️ Luyện nói với AI <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {(currentPart === 'practice' || currentPart === 'quiz') && (() => {
            const isLoading = isSubmitting || (currentPart === 'practice' ? isFetchingPractice : isFetchingQuiz);
            const activeSession = currentPart === 'practice' ? practiceSession : quizSession;
            return (
              <div className="space-y-6 animate-in fade-in duration-300">
                {isLoading || !activeSession ? (
                  <div className="flex flex-col items-center justify-center p-16 bg-slate-900/50 rounded-3xl border border-slate-800">
                    <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                    <p className="text-slate-400 font-bold">
                      {isSubmitting ? "Đang chấm điểm..." : "Đang tải câu hỏi..."}
                    </p>
                  </div>
                ) : (
                  <AssessmentRenderer 
                    questions={activeSession.questions || []}
                    mode={currentPart}
                    onComplete={handleAssessmentComplete}
                  />
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mt-10 animate-in zoom-in-95 duration-700">
          <AssessmentResultCard 
            score={resultData?.score || 0}
            correctCount={resultData?.correctCount || 0}
            totalCount={resultData?.totalCount || 0}
            onContinue={() => {
              if (resultData?.score >= 70) {
                router.push(`/learn/${subjectSlug}/${backSlug}`);
              } else {
                setCompleted(false);
                setResultData(null);
                setCurrentPart('video');
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
