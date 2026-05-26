import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { AnyLearningEvent } from "@/types/events";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event: AnyLearningEvent & { session_id?: string } = await req.json();

    // 1. Ingest into Layer 1 (Raw Events)
    const { error: eventError } = await supabase.from("learning_events").insert({
      user_id: user.id,
      session_id: event.session_id,
      event_type: event.type,
      subject_slug: event.subject_slug,
      metadata: event.metadata,
    });

    if (eventError) {
      console.error("Failed to insert event:", eventError);
      return NextResponse.json({ error: eventError.message }, { status: 500 });
    }

    // 2. Handle Session Logic (Layer 2)
    if (event.type === "speaking_session_started" && event.session_id) {
      // Create session record if it doesn't exist
      await supabase.from("learning_sessions").upsert({
        id: event.session_id,
        user_id: user.id,
        subject_slug: event.subject_slug,
        started_at: new Date().toISOString(),
      });
    }

    if (event.type === "speaking_session_finished" && event.session_id) {
      // Update session record
      await supabase.from("learning_sessions").update({
        ended_at: new Date().toISOString(),
        summary_metrics: event.metadata,
        duration_seconds: (event.metadata as any).duration_seconds || 300, // default 5 min
      }).eq("id", event.session_id);

      // 3. Update Snapshot (Layer 3)
      await updateDashboardStats(supabase, user.id, event.subject_slug, 5);
    }

    if (event.type === "quiz_completed") {
      await updateDashboardStats(supabase, user.id, event.subject_slug, 2);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function updateDashboardStats(supabase: any, userId: string, subjectSlug: string, additionalMinutes: number) {
  try {
    const { data: stats } = await supabase.from("user_dashboard_stats").select("*").eq("user_id", userId).single();
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let currentStreak = 1;
    let totalMinutes = additionalMinutes;
    let subjectProgress: any = {};

    if (stats) {
      totalMinutes = (stats.total_learning_minutes || 0) + additionalMinutes;
      subjectProgress = stats.subject_progress || {};
      
      const lastUpdate = new Date(stats.updated_at || stats.last_ai_insight_at || now);
      const lastDay = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate());
      
      const diffDays = Math.floor((today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        currentStreak = stats.current_streak || 1;
      } else if (diffDays === 1) {
        currentStreak = (stats.current_streak || 0) + 1;
      } else {
        currentStreak = 1;
      }
    }

    // Update subject-specific progress
    if (!subjectProgress[subjectSlug]) {
      subjectProgress[subjectSlug] = { sessions_completed: 0, total_minutes: 0 };
    }
    subjectProgress[subjectSlug].sessions_completed = (subjectProgress[subjectSlug].sessions_completed || 0) + 1;
    subjectProgress[subjectSlug].total_minutes = (subjectProgress[subjectSlug].total_minutes || 0) + additionalMinutes;

    await supabase.from("user_dashboard_stats").upsert({
      user_id: userId,
      current_streak: currentStreak,
      total_learning_minutes: totalMinutes,
      subject_progress: subjectProgress,
      updated_at: now.toISOString()
    });
  } catch (err) {
    console.error("Failed to update dashboard stats:", err);
  }
}
