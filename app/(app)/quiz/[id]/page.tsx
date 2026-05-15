import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuizRunner } from "./QuizRunner";
import type { Quiz, QuizQuestion } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function QuizPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*, lessons(grade, title)")
    .eq("id", id)
    .single();

  if (!quiz) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user!.id)
    .single();

  const lessonMeta = quiz.lessons as { grade?: number; title?: string } | null;
  const lessonGrade = lessonMeta?.grade;
  const userGrade = profile?.grade ?? 3;
  if (lessonGrade != null && lessonGrade !== userGrade) {
    notFound();
  }

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", id)
    .order("order_index", { ascending: true });

  const Q = quiz as Quiz & { lessons?: { title?: string } };
  const list = (questions ?? []) as QuizQuestion[];

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Back to dashboard
      </Link>

      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Quiz
        </p>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          {Q.title}
        </h1>
        {lessonMeta?.title && (
          <p className="mt-2 text-slate-600">Lesson: {lessonMeta.title}</p>
        )}
      </header>

      {list.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          No questions for this quiz yet.
        </p>
      ) : (
        <QuizRunner quizId={id} questions={list} />
      )}
    </div>
  );
}
