import {
  calculateMasteryDelta,
  calculateMasteryDecay,
  detectWeakConcepts,
} from '../../lib/mastery/engine';

describe('Mastery Engine', () => {
  describe('calculateMasteryDelta', () => {
    it('should give a positive delta for high accuracy', () => {
      const result = calculateMasteryDelta({
        sessionItems: [
          { difficulty: 'easy', isCorrect: true },
          { difficulty: 'hard', isCorrect: true },
        ],
        daysSinceLastAttempt: 1,
        consecutiveCorrectStreak: 2,
      });
      expect(result.masteryDelta).toBeGreaterThan(0);
      expect(result.weightedAccuracy).toBe(1);
    });

    it('should penalize (negative delta) for low accuracy', () => {
      const result = calculateMasteryDelta({
        sessionItems: [
          { difficulty: 'easy', isCorrect: false },
          { difficulty: 'medium', isCorrect: false },
        ],
        daysSinceLastAttempt: 1,
        consecutiveCorrectStreak: 0,
      });
      expect(result.masteryDelta).toBeLessThan(0);
      expect(result.weightedAccuracy).toBe(0);
    });
  });

  describe('calculateMasteryDecay', () => {
    it('should decay mastery over time', () => {
      const original = 70;
      const decayed = calculateMasteryDecay(original, 10);
      expect(decayed).toBeLessThan(original);
    });

    it('should not decay if daysInactive is 0', () => {
      expect(calculateMasteryDecay(80, 0)).toBe(80);
    });
  });

  describe('detectWeakConcepts', () => {
    it('should detect weakness if score is below 60', () => {
      expect(detectWeakConcepts(50, [true, true, true], 90)).toBe(true);
    });

    it('should detect weakness if recent attempts have multiple fails', () => {
      expect(detectWeakConcepts(80, [false, true, false], 90)).toBe(true);
    });

    it('should not flag as weak if mastery is high and recent attempts are good', () => {
      expect(detectWeakConcepts(85, [true, true, true], 90)).toBe(false);
    });
  });
});
