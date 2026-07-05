import { retrieveQuestions, RetrievedQuestion } from './question-selector';
import { calculateMasteryDelta, SessionItem } from '../mastery/engine';
import { calculateNextReview } from '../srs/scheduler';

export interface AssessmentRequest {
  userId: string;
  type: string;
  subjectSlug: string;
  conceptIds: string[];
  oldConcepts?: { id: string; title: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}

export interface AssessmentSession {
  sessionId: string;
  questions: RetrievedQuestion[];
}

export async function generateAssessmentSession(req: AssessmentRequest): Promise<AssessmentSession> {
  const questions = await retrieveQuestions(req.conceptIds, req.oldConcepts || [], req.difficulty, req.count);
  
  // Create DB records in assessment_sessions and assessment_items
  const sessionId = `session-${Math.random().toString(36).substring(7)}`;

  return {
    sessionId,
    questions,
  };
}

export interface AnswerSubmission {
  questionId: string;
  conceptId: string;
  isCorrect: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export async function submitAssessmentSession(
  userId: string,
  sessionId: string,
  answers: AnswerSubmission[]
) {
  // 1. Calculate Score
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const score = (correctCount / answers.length) * 100;

  // 2. Process Mastery Delta per Concept
  // Group answers by concept
  const conceptMap = new Map<string, SessionItem[]>();
  for (const ans of answers) {
    if (!conceptMap.has(ans.conceptId)) conceptMap.set(ans.conceptId, []);
    conceptMap.get(ans.conceptId)?.push({
      difficulty: ans.difficulty,
      isCorrect: ans.isCorrect,
    });
  }

  const conceptResults = [];
  for (const [conceptId, items] of conceptMap.entries()) {
    // In real app, fetch daysSinceLastAttempt from DB
    const daysSinceLastAttempt = 1; 
    const consecutiveCorrectStreak = items.filter(i => i.isCorrect).length; // simplification

    const deltaResult = calculateMasteryDelta({
      sessionItems: items,
      daysSinceLastAttempt,
      consecutiveCorrectStreak,
    });

    conceptResults.push({
      conceptId,
      delta: deltaResult.masteryDelta,
    });

    // 3. Trigger SRS Update
    // In real app, fetch currentInterval and easeFactor from DB
    const currentInterval = 1;
    const easeFactor = 2.5;
    const quality = deltaResult.weightedAccuracy > 0.8 ? 5 : (deltaResult.weightedAccuracy > 0.5 ? 3 : 1);
    
    const srsResult = calculateNextReview({
      currentInterval,
      easeFactor,
      quality,
    });

    // Here we would UPDATE concept_mastery and concept_reviews tables
  }

  return {
    score,
    conceptResults,
    correctCount,
    totalCount: answers.length,
    message: 'Assessment submitted successfully'
  };
}
