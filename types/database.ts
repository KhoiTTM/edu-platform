export type Grade = 3 | 7;
export type Volume = 1 | 2;

export type Subject = {
  id: string;
  grade: Grade;
  slug: string;
  label_vi: string;
  volume: Volume;
  textbook_pdf_url: string | null;
  textbook_title: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  grade: Grade;
  created_at: string;
};

export type Lesson = {
  id: string;
  grade: Grade;
  title: string;
  summary: string | null;
  pdf_url: string | null;
  youtube_video_id: string | null;
  duration_minutes: number | null;
  created_at: string;
  subject_slug: string;
  subject_label_vi: string;
  lesson_index: number;
  volume: Volume;
  page_hint: string | null;
  subject_id: string | null;
};

export type ScheduleEntry = {
  id: string;
  user_id: string;
  lesson_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  lesson?: Lesson;
};

export type Quiz = {
  id: string;
  lesson_id: string;
  title: string;
};

export type QuizQuestion = {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_index: number;
  order_index: number;
  explanation: string | null;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total: number;
  created_at: string;
};
