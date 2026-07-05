import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ReadingClient } from "@/components/learning/ReadingClient";
import { getReadingLessonForUnit } from "@/lib/ieltsReadingPassages";

export const dynamic = "force-dynamic";

type Props = { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ backUrl?: string }>;
};

export default async function ReadingLessonDetailPage({ params, searchParams }: Props) {
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

  const getUnitNumber = (slug: string, title: string): number => {
    const titleMatch = title.match(/U(\d+)/i);
    if (titleMatch) return parseInt(titleMatch[1], 10);
    const slugMatch = slug.match(/unit-(\d+)/i);
    return slugMatch ? parseInt(slugMatch[1], 10) : 1;
  };

  const unitNum = getUnitNumber(node.slug, node.title);

  // Retrieve the static Reading passage, vocabulary, and questions
  const readingLesson = getReadingLessonForUnit(unitNum);

  return (
    <main className="min-h-screen bg-surface p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl">
        <ReadingClient
          lesson={readingLesson}
          studentName={profile?.display_name || "Học sinh"}
          backUrl={backUrl}
        />
      </div>
    </main>
  );
}
