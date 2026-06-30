"use server";

import { createClient } from "@/lib/supabase/server";

interface QuizAnswerDetail {
  questionId: string;
  bai: number;
  cau: number;
  type: "multiple_choice" | "essay";
  studentAnswer: string;
  isCorrect: boolean | null; // null for essay questions (no auto-grading)
}

export async function saveFlipbookQuizAttempt(
  bookSlug: string,
  bai: number,
  lessonTitle: string,
  score: number,
  total: number,
  answers: QuizAnswerDetail[]
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const now = new Date().toISOString();

  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: "khtn",
    started_at: now,
    ended_at: now,
    summary_metrics: {
      // Reuse "exam" so the existing dashboard / parent history UI
      // (which only special-cases metrics.type === "exam" to show a score
      // badge) picks this up correctly. unit_topic is the field both
      // components read for the display title — see
      // app/(app)/(administration)/dashboard/page.tsx and
      // components/administration/parent/StudentHistoryCard.tsx.
      type: "exam",
      sub_type: "flipbook_quiz",
      book_slug: bookSlug,
      bai,
      unit_topic: lessonTitle,
      score,
      total,
      answers,
    },
  });

  if (error) {
    console.error("[saveFlipbookQuizAttempt] insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
