import Link from "next/link";
import type { Lesson } from "@/types/database";

type Props = {
  lessons: Lesson[];
};

export function LessonListByTopic({ lessons }: Props) {
  const groups = new Map<string, Lesson[]>();
  for (const lesson of lessons) {
    const key = lesson.topic_label ?? "Bài học";
    const list = groups.get(key) ?? [];
    list.push(lesson);
    groups.set(key, list);
  }

  return (
    <div className="mt-8 space-y-8">
      {[...groups.entries()].map(([topic, items]) => (
        <section key={topic}>
          <h2 className="mb-3 font-display text-base font-semibold text-slate-800 sm:text-lg">
            {topic}
          </h2>
          <ul className="space-y-3">
            {items.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="flex min-h-[56px] flex-col rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-card transition hover:border-brand-300 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                        #{lesson.lesson_index}
                        {lesson.book_lesson_number != null &&
                          ` · SGK Bài ${lesson.book_lesson_number}`}
                      </span>
                      {lesson.youtube_video_id ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-800">
                          Video
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                          Sách
                        </span>
                      )}
                      {(lesson.video_part ?? 0) > 1 && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900">
                          Phần {lesson.video_part}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                      {lesson.title}
                    </p>
                    {lesson.page_hint && (
                      <p className="mt-1 text-sm text-slate-500">
                        📖 {lesson.page_hint}
                      </p>
                    )}
                  </div>
                  <span className="mt-3 shrink-0 text-sm font-semibold text-brand-600 sm:mt-0 sm:pl-4">
                    Học bài →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
