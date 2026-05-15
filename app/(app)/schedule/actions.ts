"use server";

import { createClient } from "@/lib/supabase/server";

const slots = [
  { day: 1, start: "09:00:00", end: "09:45:00", offset: 0 },
  { day: 2, start: "09:00:00", end: "09:45:00", offset: 1 },
  { day: 3, start: "09:00:00", end: "09:45:00", offset: 2 },
  { day: 4, start: "09:00:00", end: "09:45:00", offset: 3 },
  { day: 5, start: "09:00:00", end: "09:45:00", offset: 4 },
  { day: 1, start: "10:00:00", end: "10:45:00", offset: 5 },
  { day: 3, start: "10:00:00", end: "10:45:00", offset: 6 },
];

export async function ensureDemoSchedule() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { count, error: countError } = await supabase
    .from("schedule_entries")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (countError) return;
  if (count && count > 0) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user.id)
    .single();

  const grade = profile?.grade ?? 3;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id")
    .eq("grade", grade)
    .order("title");

  const ids = (lessons ?? []).map((l: { id: string }) => l.id);
  if (ids.length === 0) return;

  const rows = slots.map((slot, i) => ({
    user_id: user.id,
    lesson_id: ids[i % ids.length],
    day_of_week: slot.day,
    start_time: slot.start,
    end_time: slot.end,
  }));

  await supabase.from("schedule_entries").insert(rows);
}
