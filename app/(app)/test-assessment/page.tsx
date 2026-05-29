"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AssessmentRenderer } from '@/components/universal/AssessmentRenderer';
import { AssessmentResultCard } from '@/components/assessment/AssessmentResultCard';
import { getExamQuestions } from './actions';

function AssessmentContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get('examId');
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (examId) {
      async function load() {
        try {
          setIsLoading(true);
          const data = await getExamQuestions(examId);
          if (data.length === 0) {
            setError("No questions found for this exam.");
          } else {
            setQuestions(data);
          }
        } catch (err) {
          setError("Failed to load exam questions.");
        } finally {
          setIsLoading(false);
        }
      }
      load();
    } else {
      setError("No exam ID provided.");
      setIsLoading(false);
    }
  }, [examId]);

  const handleComplete = (answers: any[]) => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = (correctCount / answers.length) * 100;
    
    setResults({ 
      score, 
      correctCount, 
      totalCount: answers.length 
    });
    setCompleted(true);
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-slate-500">Loading Exam Questions...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl font-medium">
            {error}
        </div>
    );
  }

  return (
    <>
        {!completed ? (
          <AssessmentRenderer 
            questions={questions}
            mode="quiz"
            onComplete={handleComplete}
          />
        ) : (
          <AssessmentResultCard 
            score={results.score}
            correctCount={results.correctCount}
            totalCount={results.totalCount}
            onContinue={() => {
              window.history.back(); // Go back to the map
            }}
          />
        )}
    </>
  );
}

export default function TestAssessmentPage() {
  return (
      <div className="min-h-screen bg-sky-50 dark:bg-indigo-950 flex flex-col items-center justify-center p-8 transition-colors duration-300">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-8">Luyện Tập Assessment</h1>
        
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-slate-500">Preparing...</p>
          </div>
        }>
            <AssessmentContent />
        </Suspense>
      </div>
  );
}
