import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Row = {
  subject_slug: string;
  subject_label_vi: string;
};

export default async function HocTapPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade, display_name")
    .eq("id", user!.id)
    .single();

  const grade = profile?.grade ?? 3;

  const { data: rows, error } = await supabase
    .from("lessons")
    .select("subject_slug, subject_label_vi, grade")
    .in("grade", [grade, 0]);

  if (error) {
    console.error("Error fetching lessons:", error);
  }

  const map = new Map<string, string>();
  for (const r of (rows ?? []) as Row[]) {
    if (r.subject_slug && r.subject_label_vi) {
      map.set(r.subject_slug, r.subject_label_vi);
    }
  }

  const subjects = [...map.entries()].sort((a, b) =>
    a[1].localeCompare(b[1], "vi")
  );

  const subjectEmoji: Record<string, string> = {
    toan: "🔢",
    tieng_anh: "🌍",
    khoa_hoc: "🔬",
    tieng_viet: "📖",
    "mindset-ielts": "🎓",
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-sky-500 hover:text-sky-400"
      >
        ← Về trang chủ học sinh
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold text-white">
          Chọn môn học
        </h1>
        <p className="mt-2 text-slate-400">
          Lớp {grade} — chọn môn, sau đó chọn bài (Bài 1, Bài 2, …).
        </p>
      </header>

      {subjects.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400 backdrop-blur-md">
          <p>Chưa có môn học nào.</p>
          <p className="mt-2 text-sm text-slate-500">
            Chạy các file SQL trong thư mục{" "}
            <code className="rounded bg-slate-950 px-1.5 py-0.5 text-xs text-sky-400">
              supabase/migrations
            </code>.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {subjects.map(([slug, label]) => (
            <li key={slug}>
              <Link
                href={`/hoc-tap/${slug}`}
                className="flex min-h-[120px] flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md transition hover:border-sky-500/50 hover:bg-slate-900/80"
              >
                <span className="text-3xl" aria-hidden>
                  {subjectEmoji[slug] ?? "📚"}
                </span>
                <span className="mt-3 font-display text-xl font-semibold text-white">
                  {label}
                </span>
                <span className="mt-2 text-sm font-medium text-sky-500">
                  Xem các bài →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
