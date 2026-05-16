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
          <h2 className="mb-3 font-display text-base font-semibold text-slate-400 sm:text-lg">
            {topic}
          </h2>
          <ul className="space-y-3">
            {items.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="flex min-h-[56px] flex-col rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 shadow-xl backdrop-blur-md transition hover:border-sky-500/50 hover:bg-slate-900/80 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                        #{lesson.lesson_index}
                        {lesson.book_lesson_number != null &&
                          ` · SGK Bài ${lesson.book_lesson_number}`}
                      </span>
                      {lesson.youtube_video_id ? (
                        <span className="rounded-full bg-emerald-900/30 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-400 border border-emerald-800/50">
                          Video
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-400 border border-slate-700">
                          Sách
                        </span>
                      )}
                      {(lesson.video_part ?? 0) > 1 && (
                        <span className="rounded-full bg-amber-900/30 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-800/50">
                          Phần {lesson.video_part}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-base font-semibold leading-snug text-white sm:text-lg">
                      {lesson.title}
                    </p>
                    {lesson.page_hint && (
                      <p className="mt-1 text-sm text-slate-400">
                        📖 {lesson.page_hint}
                      </p>
                    )}
                  </div>
                  <span className="mt-3 shrink-0 text-sm font-semibold text-sky-500 sm:mt-0 sm:pl-4">
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
