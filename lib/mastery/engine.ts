export interface SessionItem {
  difficulty: 'easy' | 'medium' | 'hard';
  isCorrect: boolean;
}

export interface MasteryDeltaParams {
  sessionItems: SessionItem[];
  daysSinceLastAttempt: number;
  consecutiveCorrectStreak: number;
}

export interface MasteryDeltaResult {
  weightedAccuracy: number;
  masteryDelta: number;
  newConfidenceBoost: number;
}

const DIFFICULTY_WEIGHTS = {
  easy: 1.0,
  medium: 1.5,
  hard: 2.0,
};

/**
 * Calculates the change in mastery score based on a recent assessment session.
 */
export function calculateMasteryDelta({
  sessionItems,
  daysSinceLastAttempt,
  consecutiveCorrectStreak,
}: MasteryDeltaParams): MasteryDeltaResult {
  if (sessionItems.length === 0) {
    return { weightedAccuracy: 0, masteryDelta: 0, newConfidenceBoost: 1 };
  }

  // 1. Calculate weighted accuracy
  let totalWeight = 0;
  let earnedWeight = 0;

  for (const item of sessionItems) {
    const weight = DIFFICULTY_WEIGHTS[item.difficulty];
    totalWeight += weight;
    if (item.isCorrect) {
      earnedWeight += weight;
    }
  }

  const weightedAccuracy = totalWeight > 0 ? earnedWeight / totalWeight : 0;

  // 2. Recency factor (decay constant = 0.05)
  // If it's been a long time, performing well gives a bigger boost (re-learning bonus)
  const recencyFactor = Math.exp(-0.05 * daysSinceLastAttempt);

  // 3. Confidence boost
  let confidenceBoost = 1 + 0.1 * consecutiveCorrectStreak;
  if (confidenceBoost > 1.5) confidenceBoost = 1.5;

  // Base delta can be positive or negative
  // If accuracy < 0.6, it's a negative delta
  const baseDelta = (weightedAccuracy - 0.5) * 20; // Scale to -10 to +10 per session approx

  // Final delta calculation
  let masteryDelta = baseDelta * confidenceBoost;

  // If they did well after a long time, give a small bonus to regain lost mastery
  if (weightedAccuracy > 0.8 && daysSinceLastAttempt > 7) {
    masteryDelta += 5;
  }

  return {
    weightedAccuracy,
    masteryDelta,
    newConfidenceBoost: confidenceBoost,
  };
}

/**
 * Calculates mastery decay over time of inactivity.
 */
export function calculateMasteryDecay(currentMastery: number, daysInactive: number): number {
  if (daysInactive <= 0) return currentMastery;

  let decayRate = 0.05;
  if (currentMastery > 80) {
    decayRate = 0.02; // Slow decay for well-learned concepts
  } else if (currentMastery < 50) {
    decayRate = 0.08; // Fast decay for fragile knowledge
  }

  const newMastery = currentMastery * Math.exp(-decayRate * daysInactive);
  return Math.max(0, newMastery);
}

/**
 * Determines if a concept should be flagged as weak.
 */
export function detectWeakConcepts(
  masteryScore: number,
  recentAttempts: boolean[], // true = correct, false = incorrect (last 3 attempts)
  confidenceScore: number
): boolean {
  if (masteryScore < 60) return true;
  if (confidenceScore < 40) return true;

  // If last 3 attempts have 2 or more failures
  if (recentAttempts.length >= 3) {
    const recentFails = recentAttempts.slice(-3).filter((isCorrect) => !isCorrect).length;
    if (recentFails >= 2) return true;
  }

  return false;
}
