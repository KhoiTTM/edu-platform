import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PdfViewer } from "@/components/PdfViewer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import type { Lesson, Quiz } from "@/types/database";

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

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", id)
    .maybeSingle();

  const Q = quiz as Quiz | null;

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Back to lessons
      </Link>

      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Grade {L.grade}
        </p>
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {L.title}
        </h1>
        {L.summary && (
          <p className="mt-3 text-lg text-slate-600">{L.summary}</p>
        )}
      </header>

      <div className="mt-8 space-y-10">
        {L.youtube_video_id && (
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold text-slate-900">
              Video lesson
            </h2>
            <YouTubeEmbed videoId={L.youtube_video_id} title={L.title} />
          </section>
        )}

        {L.pdf_url && (
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold text-slate-900">
              Reading (PDF)
            </h2>
            <PdfViewer url={L.pdf_url} title={L.title} />
          </section>
        )}

        {!L.youtube_video_id && !L.pdf_url && (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            This lesson has no PDF or video attached yet.
          </p>
        )}

        {Q && (
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/quiz/${Q.id}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              Take the quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
