"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { AssessmentRenderer } from '@/components/universal/AssessmentRenderer';
import { AssessmentResultCard } from '@/components/assessment/AssessmentResultCard';
import { getExamQuestions, getExamInfo, saveExamResult } from './actions';

// Link đến bản scan/PDF gốc trên Google Drive, theo subject_slug — dùng để nhúng sách bên cạnh phần luyện tập.
const BOOK_SOURCE_URLS: Record<string, string> = {
  khtn: "https://drive.google.com/file/d/13zq-lbCJaAHEqSRx1JWhfX1idtn6jgEP/view?usp=sharing",
  "tieng-anh-7": "https://drive.google.com/file/d/1qYijNRWMqLm6f4gd8zABFQNgRSZSINQe/view?usp=sharing",
  tieng_anh: "https://drive.google.com/file/d/1Gx7c2l1lffYJeLDPHQAJinZrkzP-nETs/view?usp=sharing",
};

function extractDriveFileId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
}

function getBookPageRange(subjectSlug: string, unitNumber: number): string | null {
  if (subjectSlug === 'tieng_anh') {
    switch (unitNumber) {
      case 1: return "4 - 7";
      case 2: return "8 - 11";
      case 3: return "12 - 15";
      case 4: return "16 - 19";
      case 5: return "20 - 23";
      case 6: return "28 - 31";
      case 7: return "32 - 35";
      case 8: return "36 - 39";
      case 9: return "40 - 43";
      case 10: return "44 - 47";
      default: return null;
    }
  }
  if (subjectSlug === 'tieng-anh-7') {
    switch (unitNumber) {
      case 1: return "3 - 9";
      case 2: return "10 - 17";
      case 3: return "18 - 25";
      case 4: return "26 - 33";
      case 5: return "34 - 41";
      case 6: return "42 - 49";
      case 7: return "50 - 57";
      case 8: return "58 - 65";
      case 9: return "66 - 73";
      case 10: return "74 - 81";
      case 11: return "82 - 89";
      case 12: return "90 - 97";
      default: return null;
    }
  }
  return null;
}

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
  const [units, setUnits] = useState<number[]>([]);
  const [isBookOpen, setIsBookOpen] = useState(true);
  const startedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (examId) {
      async function load() {
        try {
          setIsLoading(true);
          startedAtRef.current = Date.now();
          const [info, data] = await Promise.all([
            getExamInfo(examId!),
            getExamQuestions(examId!),
          ]);
          setExamTitle(info.title);
          setSubjectSlug(info.subjectSlug || "tieng_anh");
          setExamType(info.examType || "lesson");
          setUnits(info.units || []);

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
        const durationSeconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
        let ttsSpeed = 1.0;
        try {
          const savedSpeed = localStorage.getItem('tts-speed');
          if (savedSpeed) ttsSpeed = parseFloat(savedSpeed);
        } catch (e) {
          console.error("Failed to read tts-speed from localStorage", e);
        }
        saveExamResult(examId, correctCount, answers.length, durationSeconds, ttsSpeed);

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

  const bookDriveId = extractDriveFileId(BOOK_SOURCE_URLS[subjectSlug]);
  const pageRange = units.length > 0 ? getBookPageRange(subjectSlug, units[0]) : null;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl flex items-center justify-between gap-4 mb-4">
        <h1 className="text-4xl font-black text-ink text-center flex-1">{examTitle}</h1>
        {bookDriveId && (
          <div className="flex items-center gap-3">
            {pageRange && (
              <span className="text-sm font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                Sách: Trang {pageRange}
              </span>
            )}
            <button
              onClick={() => setIsBookOpen((prev) => !prev)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isBookOpen
                  ? "bg-amber-600/20 border-amber-500/40 text-amber-300 hover:bg-amber-600/30"
                  : "bg-sky-600/20 border-sky-500/40 text-sky-300 hover:bg-sky-600/30"
              }`}
            >
              <BookOpen size={16} />
              {isBookOpen ? "Ẩn Sách" : "Hiện Sách"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch min-h-[600px]">
        {bookDriveId && (
          <div
            className={`transition-all duration-300 overflow-hidden rounded-3xl border border-line bg-slate-950 flex flex-col ${
              isBookOpen ? "w-full md:w-1/2 opacity-100" : "w-0 opacity-0 pointer-events-none border-0"
            }`}
          >
            <iframe
              src={`https://drive.google.com/file/d/${bookDriveId}/preview`}
              width="100%"
              height="100%"
              allow="autoplay"
              className="border-0 w-full flex-1 min-h-[600px]"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col items-center">
          {!completed ? (
            <AssessmentRenderer
              questions={questions}
              mode="quiz"
              onComplete={handleComplete}
              timerSeconds={customTimer || (examType === 'reflex' ? 60 : undefined)}
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
      </div>
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
