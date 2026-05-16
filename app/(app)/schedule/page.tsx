import { createClient } from "@/lib/supabase/server";
import { ensureDemoSchedule } from "./actions";
import { ScheduleClient } from "./ScheduleClient";
import { WeeklyScheduleClient } from "./WeeklyScheduleClient";
import { TOAN_GRADE3_TERM_START } from "@/lib/schedule/term-dates";
import type { Lesson, ScheduleEntry, WeeklyLessonSchedule } from "@/types/database";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user!.id)
    .single();

  const grade = (profile?.grade ?? 3) as 3 | 7;

  if (grade === 3) {
    const { data: scheduleRows } = await supabase
      .from("weekly_lesson_schedule")
      .select("*")
      .eq("grade", 3)
      .eq("subject_slug", "toan")
      .eq("volume", 1)
      .eq("term_start_date", TOAN_GRADE3_TERM_START)
      .order("week_number", { ascending: true })
      .order("weekday", { ascending: true });

    const slots = (scheduleRows ?? []) as WeeklyLessonSchedule[];

    const { data: lessonRows } = await supabase
      .from("lessons")
      .select("*")
      .eq("grade", 3)
      .eq("subject_slug", "toan")
      .eq("volume", 1);

    const lessons = (lessonRows ?? []) as Lesson[];
    const byIndex = new Map(lessons.map((l) => [l.lesson_index, l]));

    const slotsWithLesson = slots.map((s) => ({
      ...s,
      lesson: byIndex.get(s.lesson_index) ?? null,
    }));

    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Lịch học theo tuần
        </h1>
        <p className="mt-2 text-slate-600">
          Lớp 3 — <strong>Toán</strong> mỗi sáng lúc <strong>10:00</strong>, từ{" "}
          <strong>Thứ Hai đến Thứ Sáu</strong>. Mốc năm học:{" "}
          <time dateTime={TOAN_GRADE3_TERM_START}>01/06/2026</time>
          .
        </p>
        {slotsWithLesson.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
            Chưa có lịch theo tuần. Trong Supabase, chạy migration{" "}
            <code className="rounded bg-white px-1 text-xs">
              005_weekly_lesson_schedule.sql
            </code>
            .
          </div>
        ) : (
          <WeeklyScheduleClient
            termStart={TOAN_GRADE3_TERM_START}
            slots={slotsWithLesson}
          />
        )}
      </div>
    );
  }

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
        Lịch học
      </h1>
      <p className="mt-2 text-slate-600">
        Tuần của bạn — thân thiện iPad.
      </p>

      <ScheduleClient days={DAYS} entries={entries} />
    </div>
  );
}
