import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubjectVolumeTabs } from "@/components/learning/SubjectVolumeTabs";
import { LessonListByTopic } from "@/components/learning/LessonListByTopic";
import type { Lesson, Subject, Volume } from "@/types/database";
import { DictionaryPopup } from "@/components/DictionaryPopup";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user.id)
    .single();

  const grade = profile?.grade ?? 3;

  if (subject === "toan" || subject === "tieng_anh") {
    redirect(`/learn/${subject}/lop-${grade}`);
  }
  const { tap } = await searchParams;
  if (!SLUG_RE.test(subject)) notFound();

  const activeVolume = parseVolume(tap);



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
      <nav className="text-sm text-slate-500">
        <Link
          href="/hoc-tap"
          className="font-medium text-sky-500 hover:text-sky-400"
        >
          Chọn môn
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <span className="font-medium text-white">{labelVi}</span>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold text-white">
          {labelVi}
        </h1>
        {subject === "mindset-ielts" ? (
          <div className="mt-4 rounded-2xl border border-sky-900/50 bg-sky-900/20 p-5 shadow-lg shadow-sky-900/10 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-sky-400 flex items-center gap-2">
              🚀 Lộ trình 36 buổi (Core Strategies)
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Em hãy học theo thứ tự từ Buổi 1 đến Buổi 36. Mỗi buổi sẽ có <b>Giáo viên AI</b> hướng dẫn từng bước theo giáo trình Mindset for IELTS Foundation. 
              Hãy chuẩn bị tai nghe và vở ghi chú nhé!
            </p>
          </div>
        ) : (
          <p className="mt-2 text-slate-400">
            Một quyển sách PDF chung cho cả tập — mỗi bài có video và bài tập riêng.
          </p>
        )}
        {activeSubject?.textbook_pdf_url ? (
          <p className="mt-2 text-sm text-emerald-500 font-medium">
            ✓ Đã có sách PDF tập {activeVolume}.
          </p>
        ) : (
          <p className="mt-2 text-sm text-amber-500 font-medium">
            ⚠ Chưa gắn PDF tập {activeVolume} — upload lên Supabase Storage.
          </p>
        )}
      </header>

      <SubjectVolumeTabs
        subjectSlug={subject}
        tabs={tabs}
        activeVolume={activeVolume}
      />

      {lessons.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center text-slate-500">
          Chưa có bài nào cho tập {activeVolume}. Chọn tập khác hoặc thêm dữ liệu
          trong Supabase.
        </p>
      ) : (
        <LessonListByTopic lessons={lessons} />
      )}
      <DictionaryPopup />
    </div>
  );
}
