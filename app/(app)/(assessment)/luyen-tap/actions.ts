"use server";

/**
 * Server action for submitting lesson results from the lesson engine.
 * Called by LessonComplete when a lesson node completes.
 */
export async function submitLesson(
  nodeId: string,
  isVictory: boolean,
  xp: number,
  streak: number
): Promise<void> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("learning_sessions").insert({
      user_id: user.id,
      lesson_node_id: nodeId,
      started_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
      summary_metrics: {
        type: "lesson",
        is_victory: isVictory,
        xp,
        streak,
      },
    });
  } catch (e) {
    console.error("[submitLesson] Error:", e);
  }
}
