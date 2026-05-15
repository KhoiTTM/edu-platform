import { createClient } from "@/lib/supabase/server";
import { ensureDemoSchedule } from "./actions";
import { ScheduleClient } from "./ScheduleClient";
import type { ScheduleEntry } from "@/types/database";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function SchedulePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await ensureDemoSchedule();

  const { data: rows } = await supabase
    .from("schedule_entries")
    .select("*, lesson:lessons(*)")
    .eq("user_id", user!.id)
    .order("day_of_week")
    .order("start_time");

  const entries = (rows ?? []) as ScheduleEntry[];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-slate-900">
        Lesson schedule
      </h1>
      <p className="mt-2 text-slate-600">
        Your week at a glance — tap-friendly for iPad.
      </p>

      <ScheduleClient days={DAYS} entries={entries} />
    </div>
  );
}
