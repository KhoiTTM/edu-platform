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

export type AnyLearningEvent = 
  | SpeakingTurnCompletedEvent 
  | SpeakingSessionStartedEvent
  | SpeakingSessionFinishedEvent 
  | QuizCompletedEvent;

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
