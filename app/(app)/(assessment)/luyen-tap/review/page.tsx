"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LessonSession, StepData } from '@/components/learning/duolingo/lesson-engine/LessonSession';
import { useHearts } from '@/components/gamification/HeartProvider';
import { LessonComplete } from '@/components/learning/duolingo/lesson-engine/LessonComplete';

function ReviewComponent() {
  const { increaseHeart } = useHearts();
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject') || 'tieng_anh';

  const [reviewSteps, setReviewSteps] = useState<StepData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    async function loadReviewQuestions() {
      try {
        const res = await fetch(`/api/english-world/runtime?isReview=true&subject=${subject}`);
        const data = await res.json();
        if (data.steps) {
          setReviewSteps(data.steps);
        }
      } catch (err) {
        console.error("Failed to load review questions", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviewQuestions();
  }, [subject]);

  const handleComplete = () => {
    increaseHeart(2);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <LessonComplete isVictory={true} xp={15} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-center">
        <p>Loading review for {subject}...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
      {reviewSteps.length > 0 ? (
        <LessonSession 
          steps={reviewSteps} 
          onCompleteOverride={handleComplete}
          isReviewMode={true}
        />
      ) : (
        <div className="p-8 text-center">No review questions available right now for {subject}.</div>
      )}
    </div>
  );
}

// Wrap with Suspense because useSearchParams must be used in a client component wrapped in suspense
export default function ReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReviewComponent />
        </Suspense>
    )
}
