import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SpeakingJourneyClient } from "@/components/speaking/SpeakingJourneyClient";
import { getScriptForUnit } from "@/lib/ieltsQuizzes";

export const dynamic = "force-dynamic";

export default async function SpeakingSessionPage({
  params,
}: {
  params: Promise<{ unitId: string; sessionId: string }>;
}) {
  const { unitId, sessionId } = await params;
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Parse session number from sessionId (e.g., "session-1" -> 1)
  const sessionNumber = parseInt(sessionId.split("-")[1]);
  if (isNaN(sessionNumber)) {
    redirect("/dashboard");
  }

  // Parse unit number
  const unitNumber = parseInt(unitId.replace("unit-", ""));

  // Fetch student profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", session.user.id)
    .single();

  // Fetch previous session summary if not Session 1
  let previousSummary = null;
  if (sessionNumber > 1) {
    const { data: prevSession } = await supabase
      .from("speaking_sessions")
      .select("session_summary")
      .eq("user_id", session.user.id)
      .eq("unit_id", unitId)
      .eq("session_number", sessionNumber - 1)
      .single();
    
    previousSummary = prevSession?.session_summary;
  }

  // Use the curriculum lib to get the topic title
  const script = getScriptForUnit(unitNumber, "", "");
  const unitTopic = script.unitTitle.split(":")[1]?.split("(")[0]?.trim() || "Speaking Practice";

  return (
    <main className="min-h-screen bg-[#0f172a] p-4 md:p-8">
      <SpeakingJourneyClient 
        unitId={unitId}
        sessionNumber={sessionNumber}
        unitTopic={unitTopic}
        studentName={profile?.display_name || "bạn"}
        previousSummary={previousSummary}
      />
    </main>
  );
}
