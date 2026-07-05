import { z } from "zod";

/**
 * Event Schemas for the Universal Learning Engine.
 * Built with Zod for strict runtime validation.
 */

export const QuestionAnsweredEventSchema = z.object({
  type: z.literal("question_answered"),
  subject_slug: z.string(),
  session_id: z.string().uuid().optional(),
  metadata: z.object({
    node_id: z.string().uuid(),
    exercise_id: z.string().uuid(),
    question_id: z.string().uuid(),
    concept_id: z.string().uuid(),
    is_correct: z.boolean(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    time_spent_seconds: z.number().min(0),
    user_answer: z.any().optional(),
  }),
});

export const ConceptMasteredEventSchema = z.object({
  type: z.literal("concept_mastered"),
  subject_slug: z.string(),
  metadata: z.object({
    concept_id: z.string().uuid(),
    mastery_score: z.number().min(0).max(100),
    previous_score: z.number().min(0).max(100).optional(),
  }),
});

export const AIHelpRequestedEventSchema = z.object({
  type: z.literal("ai_help_requested"),
  subject_slug: z.string(),
  session_id: z.string().uuid().optional(),
  metadata: z.object({
    node_id: z.string().uuid(),
    context_type: z.enum(['hint', 'explanation', 're-phrase', 'example']),
    prompt_type: z.string().optional(), // Adding for flexibility as per phase 2
    question_id: z.string().uuid().optional(),
  }),
});

export const UniversalEventSchema = z.discriminatedUnion("type", [
  QuestionAnsweredEventSchema,
  ConceptMasteredEventSchema,
  AIHelpRequestedEventSchema,
]);

export type UniversalEvent = z.infer<typeof UniversalEventSchema>;

// Legacy compatibility types (Phase 1/2 Dashboard)
export type SpeakingTurnCompletedEvent = {
  type: "speaking_turn_completed";
  subject_slug: "mindset-ielts";
  metadata: {
    duration_seconds: number;
    word_count: number;
    target_words_used: string[];
    turn_number: number;
    unit_id: string;
    session_number: number;
  };
};

export type SpeakingSessionStartedEvent = {
  type: "speaking_session_started";
  subject_slug: "mindset-ielts";
  metadata: {
    unit_id: string;
    session_number: number;
    unit_topic: string;
  };
};

export type SpeakingSessionFinishedEvent = {
  type: "speaking_session_finished";
  subject_slug: "mindset-ielts";
  metadata: {
    unit_id: string;
    session_number: number;
    total_turns: number;
    avg_words: number;
    best_moment: string | null;
  };
};

export type QuizCompletedEvent = {
  type: "quiz_completed";
  subject_slug: string;
  metadata: {
    quiz_id: string;
    score: number;
    total: number;
    accuracy: number;
  };
};

export type LessonVisitedEvent = {
  type: "lesson_visited";
  subject_slug: string;
  metadata: {
    title: string;
    url: string;
  };
};

export type ExamVisitedEvent = {
  type: "exam_visited";
  subject_slug: string;
  metadata: {
    title: string;
    url: string;
  };
};

export type AnyLearningEvent = 
  | SpeakingTurnCompletedEvent 
  | SpeakingSessionStartedEvent
  | SpeakingSessionFinishedEvent 
  | QuizCompletedEvent
  | LessonVisitedEvent
  | ExamVisitedEvent
  | UniversalEvent;

export interface LearningEventRecord {
  id?: string;
  user_id: string;
  session_id?: string;
  event_type: string;
  subject_slug: string;
  metadata: any;
  created_at?: string;
}

export interface LearningSessionRecord {
  id: string;
  user_id: string;
  subject_slug: string;
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  summary_metrics: any;
}
