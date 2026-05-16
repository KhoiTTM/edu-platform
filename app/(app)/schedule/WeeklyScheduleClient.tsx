"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  TOAN_GRADE3_TERM_START,
  formatVnDate,
  schoolDateForSlot,
  weekNumberForDate,
} from "@/lib/schedule/term-dates";
import type { Lesson, WeeklyLessonSchedule } from "@/types/database";

const WEEKDAY_VI = ["", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];

type SlotWithLesson = WeeklyLessonSchedule & { lesson: Lesson | null };

type WeekBlock = {
  weekNumber: number;
  label: string;
  slots: SlotWithLesson[];
};

type Props = {
  termStart: string;
  slots: SlotWithLesson[];
};

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hour = parseInt(h ?? "0", 10);
  const minute = m ?? "00";
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function WeeklyScheduleClient({ termStart, slots }: Props) {
  const totalWeeks = useMemo(() => {
    const m = Math.max(0, ...slots.map((s) => s.week_number));
    return m || 1;
  }, [slots]);

  const weeks: WeekBlock[] = useMemo(() => {
    const byWeek = new Map<number, SlotWithLesson[]>();
    for (const s of slots) {
      const list = byWeek.get(s.week_number) ?? [];
      list.push(s);
      byWeek.set(s.week_number, list);
    }
    return [...byWeek.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([weekNumber, list]) => {
        const sorted = [...list].sort((a, b) => a.weekday - b.weekday);
        const d0 = schoolDateForSlot(termStart, weekNumber, 1);
        const d4 = schoolDateForSlot(termStart, weekNumber, 5);
        return {
          weekNumber,
          label: `Tuần ${weekNumber} · ${formatVnDate(d0)} → ${formatVnDate(d4)}`,
          slots: sorted,
        };
      });
  }, [slots, termStart]);

  const now = new Date();
  const suggestedWeek =
    weekNumberForDate(termStart, now, totalWeeks) ?? 1;

  const [activeWeek, setActiveWeek] = useState(() =>
    Math.min(Math.max(1, suggestedWeek), totalWeeks)
  );

  const active = weeks.find((w) => w.weekNumber === activeWeek) ?? weeks[0];

  return (
    <div className="mt-6">
      <div className="-mx-1 flex gap-2 overflow-x-auto pb-3 scrollbar-thin sm:flex-wrap sm:overflow-visible">
        {weeks.map((w) => {
          const isCurrent =
            weekNumberForDate(termStart, now, totalWeeks) === w.weekNumber;
          const sel = w.weekNumber === activeWeek;
          return (
            <button
              key={w.weekNumber}
              type="button"
              onClick={() => setActiveWeek(w.weekNumber)}
              className={`min-h-[44px] shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:min-h-0 ${
                sel
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                  : isCurrent
                    ? "border-2 border-brand-400 bg-brand-50 text-brand-900"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Tuần {w.weekNumber}
              {isCurrent ? " · Hôm nay" : ""}
            </button>
          );
        })}
      </div>

      {active && (
        <>
          <p className="mt-2 text-sm font-medium text-slate-600">
            {active.label}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Bắt đầu từ{" "}
            <time dateTime={termStart}>
              {formatVnDate(schoolDateForSlot(termStart, 1, 1))}
            </time>
            . Mỗi buổi: <strong>Toán</strong> buổi sáng.
          </p>
          <ul className="mt-6 space-y-3">
            {active.slots.map((slot) => {
              const day = schoolDateForSlot(
                termStart,
                slot.week_number,
                slot.weekday
              );
              const wd = WEEKDAY_VI[slot.weekday] ?? "";
              return (
                <li key={slot.id}>
                  {slot.lesson ? (
                    <Link
                      href={`/lessons/${slot.lesson.id}`}
                      className="flex min-h-[72px] flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card transition hover:border-brand-400 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                          {wd} · {formatVnDate(day)} ·{" "}
                          {formatTime(slot.start_time)} –{" "}
                          {formatTime(slot.end_time)}
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-slate-900 sm:text-lg">
                          Toán — {slot.lesson.title}
                        </p>
                        {slot.lesson.page_hint && (
                          <p className="mt-1 text-sm text-slate-500">
                            📖 Sách: {slot.lesson.page_hint}
                          </p>
                        )}
                      </div>
                      <span className="mt-3 text-sm font-semibold text-brand-600 sm:mt-0">
                        Vào bài →
                      </span>
                    </Link>
                  ) : (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                      <p className="text-sm font-medium text-amber-900">
                        {wd} · {formatVnDate(day)} · Tiết Toán
                      </p>
                      <p className="mt-1 text-sm text-amber-800">
                        Chưa tìm thấy bài học (lesson_index {slot.lesson_index}).
                        Kiểm tra dữ liệu trong Supabase.
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
