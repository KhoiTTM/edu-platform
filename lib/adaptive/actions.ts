"use server";

import { createClient } from "@/lib/supabase/server";
import { AdaptiveSyncEngine, SessionResult } from "./sync-engine";

export async function syncLessonResults(results: SessionResult[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const engine = new AdaptiveSyncEngine();
  await engine.syncSession(user.id, results);
  
  return { success: true };
}
