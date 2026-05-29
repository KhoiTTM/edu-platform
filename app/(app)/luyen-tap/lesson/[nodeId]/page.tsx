import React from 'react';
import { LessonSession, StepData } from '@/components/duolingo/lesson-engine/LessonSession';
import { headers } from 'next/headers';

export default async function LessonPage({ params }: { params: Promise<{ nodeId: string }> }) {
  const { nodeId } = await params;
  const headersList = await headers();

  // Fetch steps from runtime selection engine API
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/english-world/runtime?nodeId=${nodeId}`, {
    cache: 'no-store',
    headers: {
      cookie: headersList.get('cookie') || ''
    }
  });

  if (!response.ok) {
    return <div>Failed to load lesson content.</div>;
  }

  const data = await response.json();
  const steps: StepData[] = data.steps || [];

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
      {steps.length > 0 ? (
        <LessonSession steps={steps} nodeId={nodeId} />
      ) : (
        <div className="p-8 text-center">No questions found for this lesson.</div>
      )}
    </div>
  );
}
