"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Save progress when a student completes a vocabulary/practice topic in Pre A1 Starters
 */
export async function saveStartersLearningProgress(
  topicId: string,
  topicName: string,
  correct: number,
  total: number,
  durationSeconds: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const now = new Date();
  const startedAt = new Date(now.getTime() - durationSeconds * 1000);

  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: "pre-a1-starter",
    started_at: startedAt.toISOString(),
    ended_at: now.toISOString(),
    duration_seconds: durationSeconds,
    summary_metrics: {
      type: "exam", // Using 'exam' so dashboard shows badge and score
      sub_type: "starters_quiz",
      unit_topic: `Pre A1: ${topicName}`,
      score: correct,
      total: total
    }
  });

  if (error) {
    console.error("[saveStartersLearningProgress] Error:", error);
    return { error: error.message };
  }

  // Also complete daily task if assigned
  await supabase.rpc("complete_daily_task_by_exam", {
    p_student_id: user.id,
    p_exam_id: topicId // In starters context, we can link by topicId as exam_id fallback
  });

  return { success: true };
}

/**
 * Save progress when a student completes studying a textbook page (Tiếng Anh 3, etc.)
 */
export async function saveTextbookLearningProgress(
  subjectSlug: string,
  unitTitle: string,
  pageNumber: number,
  durationSeconds: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const now = new Date();
  const startedAt = new Date(now.getTime() - durationSeconds * 1000);

  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: subjectSlug,
    started_at: startedAt.toISOString(),
    ended_at: now.toISOString(),
    duration_seconds: durationSeconds,
    summary_metrics: {
      type: "lesson",
      sub_type: "textbook_study",
      unit_topic: `${unitTitle} - Trang ${pageNumber}`,
      lesson_url: `/hoc-tap/${subjectSlug}/lesson?page=${pageNumber}` // fallback path
    }
  });

  if (error) {
    console.error("[saveTextbookLearningProgress] Error:", error);
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Save progress when a student completes IELTS Listening Quiz
 */
export async function saveIeltsListeningProgress(
  lessonId: string,
  lessonTitle: string,
  correct: number,
  total: number,
  durationSeconds: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const now = new Date();
  const startedAt = new Date(now.getTime() - durationSeconds * 1000);

  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: "mindset-ielts",
    started_at: startedAt.toISOString(),
    ended_at: now.toISOString(),
    duration_seconds: durationSeconds,
    summary_metrics: {
      type: "exam",
      sub_type: "ielts_listening",
      unit_topic: `Listening: ${lessonTitle.replace(/^Buổi \d+:\s*/, '')}`,
      score: correct,
      total: total
    }
  });

  if (error) {
    console.error("[saveIeltsListeningProgress] Error:", error);
    return { error: error.message };
  }

  // Also complete daily task if assigned for this curriculum node
  await supabase.rpc("complete_daily_task_by_exam", {
    p_student_id: user.id,
    p_exam_id: lessonId
  });

  return { success: true };
}

/**
 * Save progress when a student completes IELTS Dictation & Shadowing
 */
export async function saveIeltsShadowingProgress(
  lessonSlug: string,
  lessonTitle: string,
  averageScore: number,
  durationSeconds: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const now = new Date();
  const startedAt = new Date(now.getTime() - durationSeconds * 1000);

  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: "mindset-ielts",
    started_at: startedAt.toISOString(),
    ended_at: now.toISOString(),
    duration_seconds: durationSeconds,
    summary_metrics: {
      type: "exam",
      sub_type: "ielts_shadowing",
      unit_topic: `Shadowing: ${lessonTitle.replace(/^Bài \d+:\s*/, '')}`,
      score: Math.round(averageScore),
      total: 100 // Out of 100% pronunciation score
    }
  });

  if (error) {
    console.error("[saveIeltsShadowingProgress] Error:", error);
    return { error: error.message };
  }

  // Also complete daily task if assigned
  // In shadowing, we match by lessonSlug which is often used in metadata
  // We can fetch the node id from curriculum_nodes using slug
  const { data: node } = await supabase
    .from("curriculum_nodes")
    .select("id")
    .eq("slug", lessonSlug)
    .maybeSingle();

  if (node) {
    await supabase.rpc("complete_daily_task_by_exam", {
      p_student_id: user.id,
      p_exam_id: node.id
    });
  }

  return { success: true };
}
