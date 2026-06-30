import React from 'react';
import { StreakFlame } from '../../../gamification/StreakFlame';
import { XPToast } from '../../../gamification/XPToast';

type Props = {
  currentStepIndex: number;
  totalSteps: number;
  hearts: number;
  streak?: number;
  showXP?: boolean;
  onXPComplete?: () => void;
};

export const LessonProgress: React.FC<Props> = ({ 
  currentStepIndex, 
  totalSteps, 
  hearts, 
  streak = 0, 
  showXP = false,
  onXPComplete
}) => {
  const progressPercent = totalSteps > 0 ? (currentStepIndex / totalSteps) * 100 : 0;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-4 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800">
      {/* Progress Bar Container */}
      <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        >
          {/* Light reflection effect for non-flat UI */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/30 rounded-t-full"></div>
        </div>
        
        {/* XP Floating Toast */}
        <div className="absolute right-0 top-0">
          <XPToast xp={5} visible={showXP} onComplete={onXPComplete} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {streak > 0 && <StreakFlame streak={streak} />}
      </div>
    </div>
  );
};
