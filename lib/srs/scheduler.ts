export interface SM2ReviewParams {
  currentInterval: number;
  easeFactor: number;
  quality: number; // 0-5 scale
}

export interface SM2ReviewResult {
  nextInterval: number;
  newEaseFactor: number;
}

/**
 * Calculates the next review interval and new ease factor using the SM-2 algorithm.
 * Quality:
 * 5 - perfect response
 * 4 - correct response after a hesitation
 * 3 - correct response recalled with serious difficulty
 * 2 - incorrect response; where the correct one seemed easy to recall
 * 1 - incorrect response; the correct one remembered
 * 0 - complete blackout
 */
export function calculateNextReview({
  currentInterval,
  easeFactor,
  quality,
}: SM2ReviewParams): SM2ReviewResult {
  if (quality < 0 || quality > 5) {
    throw new Error('Quality must be between 0 and 5');
  }

  let newEaseFactor = easeFactor;
  let nextInterval = currentInterval;

  // Calculate new ease factor
  newEaseFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  // Calculate next interval
  if (quality < 3) {
    // If failed, start over at 1 day
    nextInterval = 1;
  } else {
    // If successful
    if (currentInterval === 0) {
      nextInterval = 1;
    } else if (currentInterval === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(currentInterval * newEaseFactor);
    }
  }

  return {
    nextInterval,
    newEaseFactor,
  };
}

/**
 * Predicts retention percentage based on the Ebbinghaus forgetting curve.
 * @param daysSince Last review time in days
 * @param reviewStrength Generally mapped to the ease factor (e.g. stability)
 * @returns Retention percentage (0-100)
 */
export function predictRetention(daysSince: number, reviewStrength: number): number {
  if (daysSince < 0) return 100;
  if (reviewStrength <= 0) return 0;

  // Simple decay formula: e^(-t / (stability * 9))
  const stability = reviewStrength * 10; 
  const retention = Math.exp(-daysSince / stability) * 100;
  
  return Math.max(0, Math.min(100, retention));
}
