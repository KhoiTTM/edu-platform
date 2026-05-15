"use server";

import { createClient } from "@/lib/supabase/server";
import type { QuizQuestion } from "@/types/database";

export async function submitQuiz(
  quizId: string,
  answers: Record<string, number>
): Promise<
  | { ok: true; score: number; total: number }
  | { ok: false; message: string }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not signed in." };

  const { data: questions, error: qErr } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId);

  if (qErr || !questions?.length) {
    return { ok: false, message: "Could not load quiz." };
  }

  const list = questions as QuizQuestion[];
  let score = 0;
  for (const q of list) {
    if (answers[q.id] === q.correct_index) score += 1;
  }
  const total = list.length;

  const { error: insErr } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    quiz_id: quizId,
    score,
    total,
  });

  if (insErr) {
    return { ok: false, message: insErr.message };
  }

  return { ok: true, score, total };
}
