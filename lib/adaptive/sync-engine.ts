import { createClient } from '@/lib/supabase/server';
import { calculateNextReview } from '../srs/scheduler';

export interface SessionResult {
  concept_id: string;
  is_correct: boolean;
  duration_ms: number;
}

/**
 * Adaptive Sync Engine
 * Processes gameplay session results and updates long-term mastery.
 */
export class AdaptiveSyncEngine {
  
  /**
   * Syncs a batch of results for a user.
   */
  async syncSession(userId: string, results: SessionResult[]) {
    const supabase = await createClient();
    console.log(`Syncing session for user ${userId}...`);

    for (const res of results) {
      // 1. Fetch current mastery state
      const { data: mastery } = await supabase
        .from('mastery_tracking')
        .select('*')
        .eq('user_id', userId)
        .eq('concept_id', res.concept_id)
        .single();

      const currentInterval = mastery?.interval || 0;
      const currentEase = mastery?.ease_factor || 2.5;

      // 2. Map boolean correctness + duration to SM-2 Quality (0-5)
      // 5: Correct, fast
      // 4: Correct, medium
      // 3: Correct, slow
      // 2: Incorrect, but nearly correct (duration high)
      // 1: Incorrect, slow
      // 0: Incorrect, fast (guess or total blackout)
      
      let quality = 0;
      if (res.is_correct) {
        if (res.duration_ms < 5000) quality = 5;
        else if (res.duration_ms < 10000) quality = 4;
        else quality = 3;
      } else {
        if (res.duration_ms > 10000) quality = 2;
        else if (res.duration_ms > 5000) quality = 1;
        else quality = 0;
      }

      // 3. Run SM-2
      const { nextInterval, newEaseFactor } = calculateNextReview({
        currentInterval: currentInterval,
        easeFactor: currentEase,
        quality: quality
      });

      // 4. Update Mastery Tracking
      const newMasteryScore = this.calculateNewMasteryScore(mastery?.mastery_score || 0, res.is_correct);
      const newStreak = res.is_correct ? (mastery?.correct_streak || 0) + 1 : 0;

      await supabase
        .from('mastery_tracking')
        .upsert({
          user_id: userId,
          concept_id: res.concept_id,
          mastery_score: newMasteryScore,
          correct_streak: newStreak,
          last_reviewed_at: new Date().toISOString(),
          interval: nextInterval,
          ease_factor: newEaseFactor
        });

      // 5. Update Review Queue
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

      await supabase
        .from('adaptive_review_queue')
        .upsert({
          user_id: userId,
          concept_id: res.concept_id,
          next_review_at: nextReviewDate.toISOString(),
          priority: quality < 3 ? 2 : 1 // Higher priority for failed concepts
        });
    }

    console.log("Session sync complete.");
  }

  private calculateNewMasteryScore(current: number, isCorrect: boolean): number {
    const delta = isCorrect ? 10 : -15;
    const next = current + delta;
    return Math.max(0, Math.min(100, next));
  }
}
