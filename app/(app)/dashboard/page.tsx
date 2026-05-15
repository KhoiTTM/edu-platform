import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Row = {
  subject_slug: string;
  subject_label_vi: string;
};

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

  const { data: rows } = await supabase
    .from("lessons")
    .select("subject_slug, subject_label_vi")
    .eq("grade", grade);

  const subjectMap = new Map<string, string>();
  for (const r of (rows ?? []) as Row[]) {
    if (r.subject_slug && r.subject_label_vi) {
      subjectMap.set(r.subject_slug, r.subject_label_vi);
    }
  }

  const subjects = [...subjectMap.entries()].sort((a, b) =>
    a[1].localeCompare(b[1], "vi")
  );

  const firstName =
    profile?.display_name?.split(/\s+/)[0] ?? "bạn";

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("id, score, total, created_at, quizzes(title)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recent = attempts ?? [];

  const emoji: Record<string, string> = {
    toan: "🔢",
    tieng_anh: "🌍",
    khoa_hoc: "🔬",
    tieng_viet: "📖",
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Xin chào, {firstName}!
        </h1>
        <p className="mt-2 text-slate-600">
          Lớp {grade} — chọn môn học, sau đó chọn bài để đọc PDF, xem video và làm
          bài tập có chấm ngay.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/hoc-tap"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
        >
          Vào học bài
        </Link>
        <Link
          href="/schedule"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Lịch học
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-slate-900">
            Môn học của bạn
          </h2>
          {subjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              <p>Chưa có dữ liệu môn học.</p>
              <p className="mt-2 text-sm">
                Trong Supabase, chạy tiếp file{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                  supabase/migrations/002_lessons_curriculum_vi.sql
                </code>{" "}
                và{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                  003_subjects_textbook.sql
                </code>
                .
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {subjects.map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/hoc-tap/${slug}`}
                    className="flex h-full min-h-[120px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition hover:border-brand-300 hover:shadow-card-lg"
                  >
                    <span className="text-3xl" aria-hidden>
                      {emoji[slug] ?? "📚"}
                    </span>
                    <span className="mt-2 font-display text-lg font-semibold text-slate-900">
                      {label}
                    </span>
                    <span className="mt-auto pt-4 text-sm font-medium text-brand-600">
                      Xem các bài →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card lg:h-fit">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Điểm gần đây (bài kiểm tra)
          </h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
              Hoàn thành một bài kiểm tra tổng hợp để xem điểm ở đây.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recent.map((row: Record<string, unknown>) => {
                const q = row.quizzes as { title?: string } | null;
                const title = q?.title ?? "Bài kiểm tra";
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
            Xem tất cả điểm
          </Link>
        </aside>
      </div>
    </div>
  );
}
