import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ScoresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rows } = await supabase
    .from("quiz_attempts")
    .select("id, score, total, created_at, quizzes(title)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const attempts = rows ?? [];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-slate-900">
        Your scores
      </h1>
      <p className="mt-2 text-slate-600">
        Every quiz you complete is saved here.
      </p>

      {attempts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No quiz attempts yet.</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            Go to lessons →
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
          {attempts.map((row: Record<string, unknown>) => {
            const q = row.quizzes as { title?: string } | null;
            const title = q?.title ?? "Quiz";
            const score = row.score as number;
            const total = row.total as number;
            const pct = total > 0 ? Math.round((score / total) * 100) : 0;
            const created = row.created_at as string;
            const date = new Date(created).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            });
            return (
              <li
                key={row.id as string}
                className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div>
                  <p className="font-medium text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{date}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-brand-700">
                    {score}/{total}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    ({pct}%)
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
