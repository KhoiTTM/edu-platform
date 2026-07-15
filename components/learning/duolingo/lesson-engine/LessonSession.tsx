"use client";

import React, { useState, useRef } from 'react';
import { LessonProgress } from './LessonProgress';
import { TapWordStep, TapWordStepData } from '../steps/TapWordStep';
import { MultipleChoiceStep, MultipleChoiceStepData } from '../steps/MultipleChoiceStep';
import { useHearts } from '@/components/gamification/HeartProvider';
import { LessonComplete } from './LessonComplete';
import { syncLessonResults } from '@/lib/adaptive/actions';
import { SessionResult } from '@/lib/adaptive/sync-engine';

export type StepData = (TapWordStepData | MultipleChoiceStepData) & { concept_id?: string };

type Props = {
  steps: StepData[];
  onCompleteOverride?: () => void;
  isReviewMode?: boolean;
  nodeId?: string;
};

export const LessonSession: React.FC<Props> = ({ steps, onCompleteOverride, isReviewMode, nodeId }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const sessionStartTimeRef = useRef(Date.now());
  const { hearts, decreaseHeart, isGameOver } = useHearts();

  const handleCorrect = () => {
    const duration = Date.now() - stepStartTime;
    const currentStep = steps[currentStepIndex];
    
    if (currentStep.concept_id) {
        setResults(prev => [...prev, {
            concept_id: currentStep.concept_id!,
            is_correct: true,
            duration_ms: duration
        }]);
    }

    setStreak(prev => prev + 1);
    setShowXP(true);
    setCurrentStepIndex(prev => prev + 1);
    setStepStartTime(Date.now());
  };

  const handleWrong = () => {
    const duration = Date.now() - stepStartTime;
    const currentStep = steps[currentStepIndex];

    if (currentStep.concept_id) {
        setResults(prev => [...prev, {
            concept_id: currentStep.concept_id!,
            is_correct: false,
            duration_ms: duration
        }]);
    }

    setStreak(0);
    // We don't advance on wrong, but we might want to reset the timer for the next attempt
    setStepStartTime(Date.now());
  };

  React.useEffect(() => {
    if (currentStepIndex >= steps.length) {
      // Sync results to adaptive engine
      if (results.length > 0) {
        syncLessonResults(results).catch(err => console.error("Sync failed:", err));
      }
      
      if (onCompleteOverride) {
        onCompleteOverride();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, steps.length, results]);

  if (currentStepIndex >= steps.length) {
    if (onCompleteOverride) return null;
    const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTimeRef.current) / 1000));
    return (
      <LessonComplete
        isVictory={true}
        xp={steps.length * 5 + 10}
        streak={streak}
        nodeId={nodeId}
        durationSeconds={durationSeconds}
      />
    );
  }

  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <LessonProgress 
        currentStepIndex={currentStepIndex} 
        totalSteps={steps.length} 
        hearts={hearts}
        streak={streak}
        showXP={showXP}
        onXPComplete={() => setShowXP(false)}
      />
      <div className="flex-1 flex flex-col">
        {currentStep.type === 'tap_word' && (
          <TapWordStep 
            key={currentStep.id}
            data={currentStep} 
            onCorrect={handleCorrect} 
            onWrong={handleWrong} 
          />
        )}
        {currentStep.type === 'multiple_choice' && (
          <MultipleChoiceStep 
            key={currentStep.id}
            data={currentStep} 
            onCorrect={handleCorrect} 
            onWrong={handleWrong} 
          />
        )}
      </div>
    </div>
  );
};
