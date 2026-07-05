import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ListeningClient } from "@/components/learning/ListeningClient";
import DictationShadowingClient from "@/components/DictationShadowingClient";
import { ieltsTranscripts } from "@/lib/ieltsTranscripts";
import { getFallbackQuestionsForUnit } from "@/lib/ieltsQuizzes";

export const dynamic = "force-dynamic";

type Props = { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ backUrl?: string }>;
};

export default async function ListeningLessonDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { backUrl } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  // Fetch the curriculum node by ID
  const { data: node } = await supabase
    .from("curriculum_nodes")
    .select("*")
    .eq("id", id)
    .single();

  if (!node) {
    return notFound();
  }

  const isShadowing = node.metadata?.skill_focus === "shadowing" || node.slug === "luyen-nghe-a2-tong-ket-2025";
  if (isShadowing) {
    return (
      <main className="min-h-screen bg-surface p-4 md:p-8 lg:p-12">
        <div className="mx-auto max-w-5xl">
          <DictationShadowingClient backUrl={backUrl} lessonSlug={node.slug} />
        </div>
      </main>
    );
  }

  // Parse the Unit Number from the node slug or title (e.g., unit-1 -> 1)
  const getUnitNumber = (slug: string, title: string): number => {
    const titleMatch = title.match(/U(\d+)/i);
    if (titleMatch) return parseInt(titleMatch[1], 10);
    const slugMatch = slug.match(/unit-(\d+)/i);
    return slugMatch ? parseInt(slugMatch[1], 10) : 1;
  };

  const unitNum = getUnitNumber(node.slug, node.title);

  // Extract the YouTube video ID from node metadata
  const youtubeVideoId = node.metadata?.youtube_id;
  if (!youtubeVideoId) {
    return (
      <div className="mx-auto max-w-2xl mt-12 rounded-2xl border border-rose-950/40 bg-rose-950/20 p-6 text-center text-rose-400">
        <h2 className="text-lg font-bold">Lỗi bài học</h2>
        <p className="mt-2 text-sm">Buổi học này chưa được liên kết với video track nghe YouTube nào.</p>
      </div>
    );
  }

  // Find the transcript using the YouTube Video ID
  const transcript = ieltsTranscripts[youtubeVideoId];
  if (!transcript) {
    return (
      <div className="mx-auto max-w-2xl mt-12 rounded-2xl border border-rose-950/40 bg-rose-950/20 p-6 text-center text-rose-400">
        <h2 className="text-lg font-bold">Thiếu bản dịch</h2>
        <p className="mt-2 text-sm">
          Không tìm thấy bản dịch & từ vựng (transcript) cho video ID: <span className="font-mono text-white">{youtubeVideoId}</span>.
        </p>
      </div>
    );
  }

  // Fetch fallback questions for this Unit
  const quizId = `listening-quiz-${id}`;
  const questions = getFallbackQuestionsForUnit(unitNum, quizId);

  // Format the node structure into what ListeningClient expects
  const lessonData = {
    id: node.id,
    title: node.title,
    slug: node.slug,
    grade: 0,
    volume: 1,
    subject_slug: "mindset-ielts",
    youtube_video_id: youtubeVideoId,
    summary: node.metadata?.summary || node.metadata?.description || "",
    page_hint: node.metadata?.page_hint || `Unit ${unitNum}`,
    created_at: node.created_at,
    updated_at: node.updated_at,
  } as any;

  return (
    <main className="min-h-screen bg-surface p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl">
        <ListeningClient
          lesson={lessonData}
          transcript={transcript}
          questions={questions}
          studentName={profile?.display_name || "Học sinh"}
          backUrl={backUrl}
        />
      </div>
    </main>
  );
}
