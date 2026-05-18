import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { LessonPractice } from "@/components/LessonPractice";
import { TextbookSection } from "@/components/TextbookSection";
import AITeacherChat from "@/components/AITeacherChat";
import { DictionaryPopup } from "@/components/DictionaryPopup";
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
    .select("grade, display_name")
    .eq("id", user!.id)
    .single();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (!lesson) notFound();

  const L = lesson as Lesson;
  const userGrade = profile?.grade ?? 3;
  if (L.grade !== userGrade && L.grade !== 0) {
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
      .or(`grade.eq.${L.grade},grade.eq.0`)
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
      <nav className="text-sm text-slate-500">
        <Link
          href="/hoc-tap"
          className="font-medium text-sky-500 hover:text-sky-400"
        >
          Chọn môn
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <Link
          href={`/hoc-tap/${subjectSlug}${tapQuery}`}
          className="font-medium text-sky-500 hover:text-sky-400"
        >
          {subjectLabel}
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <span className="font-medium text-white">
          #{L.lesson_index ?? 1}
          {L.book_lesson_number != null && ` · SGK Bài ${L.book_lesson_number}`}
        </span>
      </nav>

      <header className="mt-4">
        {L.topic_label && (
          <p className="text-sm font-medium text-slate-400">{L.topic_label}</p>
        )}
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
          {L.grade === 0 ? "Mọi khối lớp" : `Khối lớp ${L.grade}`} · {subjectLabel} · Tập {volume}
          {(L.video_part ?? 0) > 0 && L.youtube_video_id && ` · Video phần ${L.video_part}`}
        </p>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {L.title}
        </h1>
        {L.summary && (
          <div className="mt-3 whitespace-pre-wrap text-lg text-slate-400">
            {L.summary}
          </div>
        )}
      </header>

      {/* Top info row: Lesson Goals & Textbook Links */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Lesson Objective */}
        <div className="rounded-2xl border border-sky-950/40 bg-sky-950/20 p-5 text-sm text-sky-400 backdrop-blur-md">
          <h3 className="font-semibold text-base mb-2 text-sky-300 flex items-center gap-1.5">
            🎯 Mục tiêu buổi học
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {L.summary || "Khám phá kiến thức mới thông qua các tài liệu, bài giảng và bài tập thực hành sinh động."}
          </p>
        </div>

        {/* Textbook link/embed */}
        {subjectSlug === "mindset-ielts" ? (
          subjectRow?.textbook_pdf_url && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-white">📖 Sách giáo trình</h3>
                <p className="mt-1.5 text-xs text-slate-300 font-medium">{subjectRow.textbook_title || "Mindset for IELTS Foundation"}</p>
                {L.page_hint && (
                  <p className="mt-1 text-xs text-slate-400">
                    Phần cần học cho bài này: <span className="text-sky-400 font-semibold">{L.page_hint}</span>
                  </p>
                )}
              </div>
              <a
                href={subjectRow.textbook_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-xl bg-sky-600 px-4 text-xs font-semibold text-white transition hover:bg-sky-700 shadow-lg shadow-sky-500/20"
              >
                Mở Sách Học Ở Tab Mới ↗
              </a>
            </div>
          )
        ) : (
          <TextbookSection
            subject={subjectRow}
            pageHint={L.page_hint}
            lessonTitle={L.title}
          />
        )}
      </div>

      <div className={`mt-8 ${subjectSlug === "mindset-ielts" ? "lg:grid lg:grid-cols-12 lg:items-start lg:gap-8" : "space-y-10"}`}>
        <div className={subjectSlug === "mindset-ielts" ? "lg:col-span-4 space-y-10" : "space-y-10"}>
          {L.youtube_video_id && (
            <section>
              <h2 className="mb-3 font-display text-xl font-semibold text-white">
                Tài liệu học tập
              </h2>
              <YouTubeEmbed videoId={L.youtube_video_id} title={L.title} />
              <div className="mt-2 text-right">
                <a 
                  href={`https://www.youtube.com/watch?v=${L.youtube_video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-500 hover:underline"
                >
                  Mở video trực tiếp trên YouTube ↗
                </a>
              </div>
            </section>
          )}

          {subjectSlug !== "mindset-ielts" && (
            <>
              {practiceQuestions.length > 0 ? (
                <LessonPractice questions={practiceQuestions} />
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-center text-sm text-slate-400 backdrop-blur-md">
                  Chưa có bài tập thực hành cho bài này.
                </p>
              )}

              {Q && (
                <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 shadow-xl backdrop-blur-md">
                  <h2 className="font-display text-lg font-semibold text-white">
                    Kiểm tra tổng hợp (tùy chọn)
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Làm một lượt hết các câu và lưu điểm vào bảng điểm.
                  </p>
                  <Link
                    href={`/quiz/${Q.id}`}
                    className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-sky-700 shadow-lg shadow-sky-500/20"
                  >
                    Vào bài kiểm tra
                  </Link>
                </section>
              )}
            </>
          )}
        </div>

        {subjectSlug === "mindset-ielts" && (
          <div className="mt-8 lg:mt-0 lg:col-span-8">
            <div className="sticky top-24 space-y-6">
              <AITeacherChat 
                sessionInfo={{ title: L.title, summary: L.summary || "" }} 
                studentName={profile?.display_name || "Học sinh"} 
              />
              
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-xl backdrop-blur-md">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-950 text-amber-400 text-[10px] border border-amber-800/50">P</span>
                  Dành cho Phụ huynh
                </h3>
                <div className="mt-3 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-600 focus:ring-sky-500" />
                    <span className="text-xs text-slate-400 group-hover:text-white transition">Xác nhận con đã bắt đầu học đúng giờ</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-600 focus:ring-sky-500" />
                    <span className="text-xs text-slate-400 group-hover:text-white transition">Kiểm tra Checklist cuối buổi</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <DictionaryPopup />
    </div>
  );
}
