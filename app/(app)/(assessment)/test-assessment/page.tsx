"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AssessmentRenderer } from '@/components/universal/AssessmentRenderer';
import { AssessmentResultCard } from '@/components/assessment/AssessmentResultCard';
import { getExamQuestions, getExamInfo, saveExamResult } from './actions';

// Link đến bản scan/PDF gốc trên Google Drive, theo subject_slug — dùng cho nút "Xem sách" trong AssessmentRenderer.
const BOOK_SOURCE_URLS: Record<string, string> = {
  khtn: "https://drive.google.com/file/d/13zq-lbCJaAHEqSRx1JWhfX1idtn6jgEP/view?usp=sharing",
  "tieng-anh-7": "https://drive.google.com/file/d/1VUrweOeuNiJv3lXmi2xXE2cqYjyIdFOQ/view?usp=sharing",
};

function AssessmentContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get('examId');
  const timerParam = searchParams.get('timer');
  const customTimer = timerParam ? parseInt(timerParam, 10) : undefined;
  const [questions, setQuestions] = useState<any[]>([]);
  const [examTitle, setExamTitle] = useState<string>("Luyện Tập Assessment");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [subjectSlug, setSubjectSlug] = useState<string>("tieng_anh");
  const [examType, setExamType] = useState<string>("lesson");

  useEffect(() => {
    if (examId) {
      async function load() {
        try {
          setIsLoading(true);
          const [info, data] = await Promise.all([
            getExamInfo(examId!),
            getExamQuestions(examId!),
          ]);
          setExamTitle(info.title);
          setSubjectSlug(info.subjectSlug || "tieng_anh");
          setExamType(info.examType || "lesson");

          fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'exam_visited',
              subject_slug: info.subjectSlug,
              metadata: { title: info.title, url: `/test-assessment?examId=${examId}` },
            }),
          }).catch(console.error);

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
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const score = (correctCount / answers.length) * 100;

    if (examId) {
      try {
        const completedExams = JSON.parse(localStorage.getItem('completed_exams') || '[]');
        if (!completedExams.includes(examId)) {
          completedExams.push(examId);
          localStorage.setItem('completed_exams', JSON.stringify(completedExams));
        }
        saveExamResult(examId, correctCount, answers.length);

        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'quiz_completed',
            subject_slug: subjectSlug,
            metadata: { quiz_id: examId, score, total: answers.length },
          }),
        }).catch(console.error);
      } catch (e) {
        console.error("Failed to save progress", e);
      }
    }

    setResults({ score, correctCount, totalCount: answers.length });
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
      <div className="bg-red-900/20 border border-red-800 text-red-400 px-6 py-4 rounded-xl font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl font-black text-ink mb-8 text-center">{examTitle}</h1>
      {!completed ? (
        <AssessmentRenderer
          questions={questions}
          mode="quiz"
          onComplete={handleComplete}
          timerSeconds={customTimer || (examType === 'reflex' ? 30 : undefined)}
          sourceBookUrl={BOOK_SOURCE_URLS[subjectSlug]}
        />
      ) : (
        <AssessmentResultCard
          score={results.score}
          correctCount={results.correctCount}
          totalCount={results.totalCount}
          onContinue={() => window.history.back()}
        />
      )}
    </div>
  );
}

export default function TestAssessmentPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8">
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
