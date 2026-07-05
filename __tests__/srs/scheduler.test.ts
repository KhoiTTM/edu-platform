import { calculateNextReview, predictRetention } from '../../lib/srs/scheduler';

describe('SRS Scheduler', () => {
  describe('calculateNextReview', () => {
    it('should drop interval to 1 when failed (quality < 3)', () => {
      const result = calculateNextReview({
        currentInterval: 14,
        easeFactor: 2.5,
        quality: 2,
      });
      expect(result.nextInterval).toBe(1);
      expect(result.newEaseFactor).toBeLessThan(2.5);
    });

    it('should correctly increase interval for successful reviews', () => {
      const result = calculateNextReview({
        currentInterval: 6,
        easeFactor: 2.5,
        quality: 4,
      });
      expect(result.nextInterval).toBe(15); // 6 * 2.5 = 15
      expect(result.newEaseFactor).toBeCloseTo(2.5, 1);
    });

    it('should cap minimum easeFactor to 1.3', () => {
      const result = calculateNextReview({
        currentInterval: 1,
        easeFactor: 1.3,
        quality: 0, // Hard fail
      });
      expect(result.newEaseFactor).toBe(1.3);
    });
  });

  describe('predictRetention', () => {
    it('should return 100% when daysSince is 0', () => {
      expect(predictRetention(0, 2.5)).toBe(100);
    });

    it('should return lower retention over time', () => {
      const day1 = predictRetention(1, 2.5);
      const day5 = predictRetention(5, 2.5);
      expect(day5).toBeLessThan(day1);
    });
  });
});
