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

    const { data: nodeData } = await supabase
      .from("curriculum_nodes")
      .select("title, content_sources(universal_subjects(slug))")
      .eq("id", nodeId)
      .single();

    const source = nodeData?.content_sources as any;
    const subjectSlug =
      (Array.isArray(source)
        ? source[0]?.universal_subjects?.slug
        : source?.universal_subjects?.slug) || "khac";

    const { error } = await supabase.from("learning_sessions").insert({
      user_id: user.id,
      subject_slug: subjectSlug,
      started_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
      summary_metrics: {
        type: "lesson",
        lesson_node_id: nodeId,
        unit_topic: nodeData?.title,
        is_victory: isVictory,
        xp,
        streak,
      },
    });

    if (error) {
      console.error("[submitLesson] Insert error:", error);
    }
  } catch (e) {
    console.error("[submitLesson] Error:", e);
  }
}
