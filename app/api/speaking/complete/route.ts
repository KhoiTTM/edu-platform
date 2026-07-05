import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { unitId, sessionId } = await req.json();

    if (!unitId || !sessionId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Extract session number (e.g., 'session-1' -> 1)
    const sessionMatch = sessionId.match(/session-(\d+)/);
    const sessionNumber = sessionMatch ? parseInt(sessionMatch[1], 10) : 1;

    // Upsert speaking session
    const { error } = await supabase.from("speaking_sessions").upsert(
      {
        user_id: user.id,
        unit_id: unitId,
        session_number: sessionNumber,
        status: "complete",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,unit_id,session_number" }
    );

    if (error) {
      console.error("DB Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also update unit_speaking_progress
    const { data: progressData } = await supabase
      .from("unit_speaking_progress")
      .select("sessions_complete")
      .eq("user_id", user.id)
      .eq("unit_id", unitId)
      .maybeSingle();

    const currentSessions = progressData?.sessions_complete || 0;
    const newSessions = Math.max(currentSessions, sessionNumber);

    await supabase.from("unit_speaking_progress").upsert(
      {
        user_id: user.id,
        unit_id: unitId,
        sessions_complete: newSessions,
        unit_complete: newSessions >= 4, // Assuming 4 sessions per unit
        last_session_at: new Date().toISOString(),
      },
      { onConflict: "user_id,unit_id" }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Complete speaking error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
