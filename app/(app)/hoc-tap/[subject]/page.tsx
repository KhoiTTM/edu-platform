import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubjectVolumeTabs } from "@/components/SubjectVolumeTabs";
import { LessonListByTopic } from "@/components/LessonListByTopic";
import type { Lesson, Subject, Volume } from "@/types/database";

type Props = {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ tap?: string }>;
};

const SLUG_RE = /^[a-z0-9_-]+$/;

function parseVolume(raw: string | undefined): Volume {
  const n = raw ? parseInt(raw, 10) : 1;
  return n === 2 ? 2 : 1;
}

export default async function HocTapSubjectPage({ params, searchParams }: Props) {
  const { subject } = await params;
  const { tap } = await searchParams;
  if (!SLUG_RE.test(subject)) notFound();

  const activeVolume = parseVolume(tap);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user!.id)
    .single();

  const grade = profile?.grade ?? 3;

  const { data: subjectRows, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .in("grade", [grade, 0])
    .eq("slug", subject)
    .order("volume");

  if (subjectError) {
    console.error("Error fetching subject info:", subjectError);
  }

  const subjectCatalog = (subjectRows ?? []) as Subject[];

  const { data: allLessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("*")
    .in("grade", [grade, 0])
    .eq("subject_slug", subject)
    .order("volume")
    .order("lesson_index", { ascending: true });

  if (lessonsError) {
    console.error("Error fetching subject lessons:", lessonsError);
  }

  const all = (allLessons ?? []) as Lesson[];
  if (all.length === 0) notFound();

  const labelVi = all[0]?.subject_label_vi ?? subject;
  const lessons = all.filter((l) => (l.volume ?? 1) === activeVolume);

  const volumesWithLessons = new Set(all.map((l) => l.volume ?? 1));
  const tabs = ([1, 2] as const).map((v) => ({
    volume: v,
    label: `Tập ${v}`,
    hasLessons: volumesWithLessons.has(v),
  }));

  const activeSubject =
    subjectCatalog.find((s) => s.volume === activeVolume) ?? null;

  return (
    <div className="mx-auto max-w-4xl">
      <nav className="text-sm text-slate-600">
        <Link
          href="/hoc-tap"
          className="font-medium text-brand-600 hover:text-brand-800"
        >
          Chọn môn
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="font-medium text-slate-900">{labelVi}</span>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          {labelVi}
        </h1>
        <p className="mt-2 text-slate-600">
          Một quyển sách PDF chung cho cả tập — mỗi bài có video và bài tập riêng.
        </p>
        {activeSubject?.textbook_pdf_url ? (
          <p className="mt-2 text-sm text-emerald-700">
            Đã có sách PDF tập {activeVolume}.
          </p>
        ) : (
          <p className="mt-2 text-sm text-amber-700">
            Chưa gắn PDF tập {activeVolume} — upload lên Supabase Storage (bucket{" "}
            <code className="text-xs">textbooks</code>).
          </p>
        )}
      </header>

      <SubjectVolumeTabs
        subjectSlug={subject}
        tabs={tabs}
        activeVolume={activeVolume}
      />

      {lessons.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          Chưa có bài nào cho tập {activeVolume}. Chọn tập khác hoặc thêm dữ liệu
          trong Supabase.
        </p>
      ) : (
        <LessonListByTopic lessons={lessons} />
      )}
    </div>
  );
}
