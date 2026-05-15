"use client";

import type { ScheduleEntry } from "@/types/database";

type Props = {
  days: string[];
  entries: ScheduleEntry[];
};

const WEEKDAY_INDEXES = [1, 2, 3, 4, 5] as const;

export function ScheduleClient({ days, entries }: Props) {
  const byDay = days.map((_, d) =>
    entries.filter((e) => e.day_of_week === d)
  );

  function formatTime(t: string) {
    const [h, m] = t.split(":");
    const hour = parseInt(h ?? "0", 10);
    const am = hour < 12;
    const hr = hour % 12 || 12;
    return `${hr}:${m ?? "00"} ${am ? "AM" : "PM"}`;
  }

  return (
    <div className="mt-8 space-y-6">
      {WEEKDAY_INDEXES.map((dayIndex) => {
        const label = days[dayIndex] ?? `Day ${dayIndex}`;
        const dayEntries = byDay[dayIndex] ?? [];
        return (
          <section
            key={dayIndex}
            className="rounded-2xl border border-slate-200/80 bg-white shadow-card"
          >
            <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-5">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                {label}
              </h2>
            </div>
            {dayEntries.length === 0 ? (
              <p className="px-4 py-6 text-sm text-slate-500 sm:px-5">
                No classes scheduled.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {dayEntries
                  .slice()
                  .sort((a, b) => a.start_time.localeCompare(b.start_time))
                  .map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-brand-700">
                          {formatTime(e.start_time)} –{" "}
                          {formatTime(e.end_time)}
                        </p>
                        <p className="mt-0.5 font-medium text-slate-900">
                          {e.lesson?.title ?? "Lesson"}
                        </p>
                        {e.lesson?.summary && (
                          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                            {e.lesson.summary}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        );
      })}

      {entries.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No schedule yet — add lessons in Supabase seed, then refresh this
          page.
        </p>
      )}
    </div>
  );
}
