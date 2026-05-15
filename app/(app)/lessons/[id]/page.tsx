import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { LessonPractice } from "@/components/LessonPractice";
import { TextbookSection } from "@/components/TextbookSection";
import type { Lesson, Quiz, QuizQuestion, Subject, Volume } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user!.id)
    .single();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (!lesson) notFound();

  const L = lesson as Lesson;
  const userGrade = (profile?.grade ?? 3) as 3 | 7;
  if (L.grade !== userGrade) {
    notFound();
  }

  const volume = (L.volume ?? 1) as Volume;
  let subjectRow: Subject | null = null;

  if (L.subject_id) {
    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", L.subject_id)
      .maybeSingle();
    subjectRow = (data as Subject) ?? null;
  }

  if (!subjectRow) {
    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("grade", L.grade)
      .eq("slug", L.subject_slug ?? "toan")
      .eq("volume", volume)
      .maybeSingle();
    subjectRow = (data as Subject) ?? null;
  }

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", id)
    .maybeSingle();

  const Q = quiz as Quiz | null;

  let practiceQuestions: QuizQuestion[] = [];
  if (Q) {
    const { data: questions } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", Q.id)
      .order("order_index", { ascending: true });
    practiceQuestions = (questions ?? []) as QuizQuestion[];
  }

  const subjectSlug = L.subject_slug ?? "toan";
  const subjectLabel = L.subject_label_vi ?? "Môn học";
  const tapQuery = `?tap=${volume}`;

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
        <Link
          href={`/hoc-tap/${subjectSlug}${tapQuery}`}
          className="font-medium text-brand-600 hover:text-brand-800"
        >
          {subjectLabel}
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="font-medium text-slate-900">
          Tập {volume} · Bài {L.lesson_index ?? 1}
        </span>
      </nav>

      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Lớp {L.grade} · {subjectLabel} · Tập {volume}
        </p>
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {L.title}
        </h1>
        {L.summary && (
          <p className="mt-3 text-lg text-slate-600">{L.summary}</p>
        )}
      </header>

      <div className="mt-8 space-y-10">
        <TextbookSection
          subject={subjectRow}
          pageHint={L.page_hint}
          lessonTitle={L.title}
        />

        {L.youtube_video_id ? (
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold text-slate-900">
              Video bài giảng
            </h2>
            <YouTubeEmbed videoId={L.youtube_video_id} title={L.title} />
          </section>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Chưa có video cho bài này — thêm{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">
              youtube_video_id
            </code>{" "}
            trong bảng lessons.
          </p>
        )}

        {practiceQuestions.length > 0 ? (
          <LessonPractice questions={practiceQuestions} />
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
            Chưa có bài tập thực hành cho bài này.
          </p>
        )}

        {Q && (
          <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Kiểm tra tổng hợp (tùy chọn)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Làm một lượt hết các câu và lưu điểm vào bảng điểm.
            </p>
            <Link
              href={`/quiz/${Q.id}`}
              className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-200 bg-white px-8 py-3 text-base font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Vào bài kiểm tra
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
