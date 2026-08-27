import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TeleprompterClient, { type TeleprompterSentence } from "@/components/learning/TeleprompterClient";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PhanXaSessionPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch lesson metadata by slug
  const { data: lesson, error: lessonErr } = await supabase
    .from("shadowing_lessons")
    .select("id, slug, title")
    .eq("slug", slug)
    .maybeSingle();

  if (lessonErr || !lesson) {
    notFound();
  }

  // 2. Fetch all sentences for this lesson
  const { data: rawSentences } = await supabase
    .from("shadowing_sentences")
    .select("sentence_index, content")
    .eq("lesson_id", lesson.id)
    .order("sentence_index", { ascending: true });

  const sentences: TeleprompterSentence[] = (rawSentences ?? []).map((s) => ({
    index: s.sentence_index,
    content: s.content,
  }));

  if (sentences.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="max-w-md text-center rounded-2xl border border-rose-900/40 bg-rose-950/20 p-8">
          <h2 className="text-lg font-bold text-rose-400">Bài chưa có nội dung</h2>
          <p className="mt-2 text-sm text-slate-400">
            Bài <span className="font-mono text-white">{slug}</span> tồn tại trong{" "}
            <code className="text-slate-300">shadowing_lessons</code> nhưng chưa có câu nào trong{" "}
            <code className="text-slate-300">shadowing_sentences</code>.
          </p>
        </div>
      </main>
    );
  }

  // 3. Fetch all slugs for random navigation
  const { data: allLessons } = await supabase
    .from("shadowing_lessons")
    .select("slug")
    .order("title", { ascending: true });

  const allSlugs = (allLessons ?? []).map((l) => l.slug);

  return (
    /* Break out of the app layout's px-4 py-6 pb-24 padding so the
       teleprompter is flush to the edges and exactly fits the viewport
       height below the sticky app nav (~68px).                         */
    <div
      className="-mx-4 md:-mx-8 -mt-6 md:-mt-10 -mb-24 md:-mb-10 overflow-hidden"
      style={{ height: "calc(100vh - 4.25rem)" }}
    >
      <TeleprompterClient
        lessonTitle={lesson.title}
        sentences={sentences}
        backUrl="/hoc-tap/mindset-ielts/phan-xa"
        allSlugs={allSlugs}
      />
    </div>
  );
}
