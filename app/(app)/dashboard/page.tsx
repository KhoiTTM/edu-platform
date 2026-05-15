import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade, display_name")
    .eq("id", user!.id)
    .single();

  const grade = (profile?.grade ?? 3) as 3 | 7;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("grade", grade)
    .order("title");

  const list = (lessons ?? []) as Lesson[];

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("id, score, total, created_at, quizzes(title)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recent = attempts ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Hello, {profile?.display_name?.split(" ")[0] ?? "explorer"}!
        </h1>
        <p className="mt-2 text-slate-600">
          Grade {grade} — pick a lesson to read, watch, and quiz.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-slate-900">
            Your lessons
          </h2>
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              <p>No lessons yet. Run the seed SQL in Supabase.</p>
              <p className="mt-2 text-sm">
                File:{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                  supabase/migrations/001_schema.sql
                </code>
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {list.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition hover:border-brand-300 hover:shadow-card-lg"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      Grade {lesson.grade}
                    </span>
                    <span className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-800">
                      {lesson.title}
                    </span>
                    {lesson.summary && (
                      <span className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {lesson.summary}
                      </span>
                    )}
                    <span className="mt-4 text-sm font-medium text-brand-600">
                      Open lesson →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Recent scores
          </h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
              Complete a quiz to see scores here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recent.map((row: Record<string, unknown>) => {
                const q = row.quizzes as { title?: string } | null;
                const title = q?.title ?? "Quiz";
                const score = row.score as number;
                const total = row.total as number;
                const pct =
                  total > 0 ? Math.round((score / total) * 100) : 0;
                return (
                  <li
                    key={row.id as string}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                  >
                    <span className="truncate text-sm font-medium text-slate-800">
                      {title}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-brand-700">
                      {score}/{total} ({pct}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link
            href="/scores"
            className="mt-5 block text-center text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            View all scores
          </Link>
        </aside>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/schedule"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
        >
          View schedule
        </Link>
      </div>
    </div>
  );
}
