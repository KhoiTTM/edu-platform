import { createClient } from "@/lib/supabase/server";
import IELTSSkillsNav from "@/components/learning/IELTSSkillsNav";
import RandomLessonButton from "@/components/learning/RandomLessonButton";
import Link from "next/link";

export const metadata = {
  title: "Phản xạ đọc IELTS | EduVerse",
  description: "Luyện phản xạ đọc tiếng Anh kiểu teleprompter — đọc theo chữ chạy, tốc độ vừa phải.",
};

export default async function PhanXaPage() {
  const supabase = await createClient();

  const { data: lessons, error } = await supabase
    .from("shadowing_lessons")
    .select("id, slug, title")
    .order("title", { ascending: true });

  const allLessons = lessons ?? [];
  const slugs = allLessons.map((l) => l.slug);

  // Estimate reading time per lesson (rough: ~130 wpm, avg 8 words/sentence, avg 20 sentences)
  // We'll show it from the DB if needed; for now just show lesson count

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <IELTSSkillsNav />

      {/* Header */}
      <header className="rounded-2xl border border-green-900/40 bg-gradient-to-br from-green-950/30 via-slate-900/60 to-slate-950 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
              📖 LUYỆN PHẢN XẠ ĐỌC
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-white">
              Đọc Theo Teleprompter
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              {allLessons.length} bài · Chữ tự chạy lên, tô xanh từng câu · 130 từ/phút · Không chấm điểm
            </p>
          </div>
          <div className="shrink-0">
            <RandomLessonButton slugs={slugs} />
          </div>
        </div>
      </header>

      {/* Lesson grid */}
      {allLessons.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allLessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/hoc-tap/mindset-ielts/phan-xa/${lesson.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-green-700/60 hover:bg-green-950/20 transition-all duration-200 hover:shadow-md hover:shadow-green-950/30"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-green-950/60 px-2 py-0.5 text-[10px] font-bold text-green-400 border border-green-900/40 uppercase">
                  Bài {i + 1}
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-snug text-slate-200 group-hover:text-green-300 transition-colors line-clamp-2">
                {lesson.title}
              </h3>
              <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-green-500 group-hover:text-green-400 transition-colors">
                📖 Bắt đầu đọc →
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-10 text-center">
          <p className="text-slate-400">Chưa có bài nào trong shadowing_lessons.</p>
          <p className="mt-2 text-xs text-slate-600">
            Kiểm tra bảng <code className="text-slate-500">shadowing_lessons</code> trong Supabase.
          </p>
          {error && (
            <p className="mt-2 text-xs text-rose-500">Lỗi: {error.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
