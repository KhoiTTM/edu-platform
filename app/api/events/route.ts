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

      // 4. Universal Engine: Intercept for Concept Mastery (Phase 3 Adapter)
      // Fire and forget, don't await to keep legacy response fast
      trackConceptMastery(supabase, user.id, (event.metadata as any).unit_id || (event.metadata as any).quiz_id).catch(e => console.error("Mastery Adapter Error:", e));
    }

    if (event.type === "quiz_completed") {
      await updateDashboardStats(supabase, user.id, event.subject_slug, 2);
      
      // Universal Engine: Intercept for Concept Mastery
      trackConceptMastery(supabase, user.id, (event.metadata as any).quiz_id || (event.metadata as any).unit_id).catch(e => console.error("Mastery Adapter Error:", e));
    }

    // 5. Universal Engine: Direct Event Processing
    if (event.type === "question_answered") {
      const { concept_id, is_correct } = event.metadata;
      if (concept_id) {
        updateUniversalMastery(supabase, user.id, concept_id, is_correct).catch(e => console.error("Universal Mastery Error:", e));
      }
    }

    // 6. Track Last Visited History
    if (event.type === "lesson_visited" || event.type === "exam_visited") {
      const type = event.type === "lesson_visited" ? 'lesson' : 'exam';
      const { title, url } = event.metadata as any;
      updateLastVisited(supabase, user.id, event.subject_slug, type, title, url).catch(e => console.error("Last Visited Update Error:", e));
    }

    // 7. Write lesson visit to learning_sessions so parent history page can see it
    if (event.type === "lesson_visited") {
      const { title } = event.metadata as any;
      const now = new Date().toISOString();
      supabase.from("learning_sessions").insert({
        user_id: user.id,
        subject_slug: event.subject_slug,
        started_at: now,
        ended_at: now,
        summary_metrics: {
          type: "lesson",
          unit_topic: title,
        },
      }).then(({ error }) => {
        if (error) console.error("Failed to insert lesson session:", error);
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * Universal Engine: Updates mastery score based on question performance.
 */
async function updateUniversalMastery(supabase: any, userId: string, conceptId: string, isCorrect: boolean) {
  try {
    const { data: existing } = await supabase
      .from('user_concept_mastery')
      .select('mastery_score, attempts, correct_attempts')
      .eq('user_id', userId)
      .eq('concept_id', conceptId)
      .maybeSingle();

    const currentScore = Number(existing?.mastery_score || 0);
    const attempts = (existing?.attempts || 0) + 1;
    const correctAttempts = (existing?.correct_attempts || 0) + (isCorrect ? 1 : 0);
    
    // Calculation logic: Correct = +5, Incorrect = +1
    const increment = isCorrect ? 5 : 1;
    const newScore = Math.min(100, currentScore + increment);

    await supabase.from('user_concept_mastery').upsert({
      user_id: userId,
      concept_id: conceptId,
      mastery_score: newScore,
      attempts: attempts,
      correct_attempts: correctAttempts,
      last_attempt_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,concept_id' });
  } catch (err) {
    console.warn("Universal Mastery update failed:", err);
  }
}

/**
 * Universal Engine Adapter: Automatically calculates mastery points for legacy lessons.
 */
async function trackConceptMastery(supabase: any, userId: string, lessonOrQuizId: string) {
  if (!lessonOrQuizId || typeof lessonOrQuizId !== 'string') return;

  try {
    // 1. Find concepts linked to this lesson/unit/quiz
    let targetLessonId = lessonOrQuizId;
    
    // Legacy mapping: If it's a quiz ID (starts with 'bbbbbbbb'), find the lesson ID (starts with 'aaaaaaaa')
    if (lessonOrQuizId.startsWith('bbbbbbbb-')) {
      targetLessonId = lessonOrQuizId.replace('bbbbbbbb', 'aaaaaaaa');
    }

    // Legacy mapping: If it's a unit slug (e.g., 'unit-1'), find its UUID
    if (lessonOrQuizId.startsWith('unit-')) {
       const unitNum = lessonOrQuizId.replace('unit-', '');
       const { data: lesson } = await supabase
         .from('lessons')
         .select('id')
         .eq('subject_slug', 'mindset-ielts')
         .or(`title.ilike.%Unit ${unitNum}%,title.ilike.%U${unitNum}%`)
         .limit(1)
         .maybeSingle();
       
       if (lesson) targetLessonId = lesson.id;
    }

    const { data: links } = await supabase
      .from('lesson_concepts')
      .select('concept_id')
      .eq('lesson_id', targetLessonId);

    if (!links || links.length === 0) {
      console.log(`No concept links found for lesson/quiz: ${targetLessonId}`);
      return;
    }

    // 2. For each concept, increment mastery
    for (const link of links) {
      const { data: existing } = await supabase
        .from('user_concept_mastery')
        .select('mastery_score, attempts, correct_attempts')
        .eq('user_id', userId)
        .eq('concept_id', link.concept_id)
        .maybeSingle();

      const currentScore = Number(existing?.mastery_score || 0);
      const attempts = (existing?.attempts || 0) + 1;
      const correctAttempts = (existing?.correct_attempts || 0) + 1; // Assuming completion is "correct"
      
      const newScore = Math.min(100, currentScore + 5); // Add 5 points per session

      await supabase.from('user_concept_mastery').upsert({
        user_id: userId,
        concept_id: link.concept_id,
        mastery_score: newScore,
        attempts: attempts,
        correct_attempts: correctAttempts,
        subject_slug: 'mindset-ielts',
        last_attempt_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,concept_id' });
    }
  } catch (err) {
    // Silent fail for adapter to protect legacy flow
    console.warn("Concept Mastery Adapter failed silently:", err);
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

async function updateLastVisited(supabase: any, userId: string, subjectSlug: string, type: 'lesson' | 'exam', title: string, url: string) {
  try {
    const { data: stats } = await supabase.from("user_dashboard_stats").select("*").eq("user_id", userId).single();
    
    let subjectProgress: any = {};
    if (stats && stats.subject_progress) {
      subjectProgress = stats.subject_progress;
    }

    if (!subjectProgress[subjectSlug]) {
      subjectProgress[subjectSlug] = { sessions_completed: 0, total_minutes: 0 };
    }

    const updateObj = { title, url, updated_at: new Date().toISOString() };
    if (type === 'lesson') {
      subjectProgress[subjectSlug].last_lesson = updateObj;
    } else {
      subjectProgress[subjectSlug].last_exam = updateObj;
    }

    await supabase.from("user_dashboard_stats").upsert({
      user_id: userId,
      subject_progress: subjectProgress,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error("Failed to update last visited:", err);
  }
}
