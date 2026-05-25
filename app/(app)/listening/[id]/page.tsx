import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ListeningClient } from "@/components/ListeningClient";
import { ieltsTranscripts } from "@/lib/ieltsTranscripts";
import { getFallbackQuestionsForUnit } from "@/lib/ieltsQuizzes";
import { DictionaryPopup } from "@/components/DictionaryPopup";
import type { Lesson, Quiz, QuizQuestion } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function ListeningDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Verify User Session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 1b. Fetch student display name for Coach Aria personalisation
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();
  const studentName = profile?.display_name ?? user.email?.split("@")[0] ?? "bạn";

  // 2. Fetch Lesson Detail
  const { data: lessonData, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (lessonError || !lessonData) {
    notFound();
  }

  const lesson = lessonData as Lesson;

  // Verify that the lesson actually has a listening track (youtube_video_id)
  if (!lesson.youtube_video_id) {
    redirect("/listening");
  }

  // 3. Extract Transcript Data — use fallback if no transcript yet
  const transcript = ieltsTranscripts[lesson.youtube_video_id] ?? {
    title: lesson.title,
    unitTitle: lesson.title,
    description: lesson.summary ?? 'Luyện nghe theo giáo trình Mindset for IELTS Foundation.',
    keyVocabulary: [],
    lines: [
      {
        english: 'Transcript for this track is coming soon. Please watch the video and try the quiz below.',
        vietnamese: 'Bản dịch transcript cho bài nghe này sẽ sớm được cập nhật. Vui lòng xem video và làm bài tập bên dưới.',
      },
    ],
  };

  // 4. Fetch Quiz & Quiz Questions
  const { data: quizData } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", id)
    .maybeSingle();

  const quiz = quizData as Quiz | null;
  let questions: QuizQuestion[] = [];

  if (quiz) {
    const { data: questionsData } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", quiz.id)
      .order("order_index", { ascending: true });
    questions = (questionsData ?? []) as QuizQuestion[];
  }

  // Fallback to our robust 15-question set if database doesn't have populated questions
  if (questions.length === 0) {
    const getUnitNumber = (title: string): number => {
      const match = title.match(/U(\d+)/i);
      return match ? parseInt(match[1]) : 1;
    };
    const unitNum = getUnitNumber(lesson.title);
    const dummyQuizId = quiz?.id || `dummy-listening-quiz-${id}`;
    questions = getFallbackQuestionsForUnit(unitNum, dummyQuizId);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Navigation Breadcrumbs */}
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/hoc-tap" className="font-medium text-sky-500 hover:text-sky-400">
          Chọn môn
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <Link href="/hoc-tap/mindset-ielts" className="font-medium text-sky-500 hover:text-sky-400">
          IELTS Foundation
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <Link href="/listening" className="font-medium text-sky-500 hover:text-sky-400">
          Luyện Nghe Chuyên Sâu
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <span className="font-medium text-white">Buổi {lesson.lesson_index}</span>
      </nav>

      {/* Main Interactive Listening Room client interface */}
      <ListeningClient 
        lesson={lesson} 
        transcript={transcript} 
        questions={questions}
        studentName={studentName}
      />

      {/* Floating dictionary helper for instant word translations */}
      <DictionaryPopup />
    </div>
  );
}
