import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WritingClient } from "@/components/WritingClient";
import { getWritingTaskForUnit } from "@/lib/ieltsWritingTasks";

export const dynamic = "force-dynamic";

type Props = { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ backUrl?: string }>;
};

export default async function WritingLessonDetailPage({ params, searchParams }: Props) {
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

  // Parse the Unit Number from the node slug or title
  const getUnitNumber = (slug: string, title: string): number => {
    const slugMatch = slug.match(/unit-(\d+)/i);
    if (slugMatch) return parseInt(slugMatch[1], 10);
    const titleMatch = title.match(/U(\d+)/i);
    return titleMatch ? parseInt(titleMatch[1], 10) : 1;
  };

  const unitNum = getUnitNumber(node.slug, node.title);

  // Retrieve the static Writing task details
  const writingTask = getWritingTaskForUnit(unitNum);

  return (
    <main className="min-h-screen bg-[#0f172a] p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl">
        <WritingClient
          task={writingTask}
          studentName={profile?.display_name || "Học sinh"}
          backUrl={backUrl}
        />
      </div>
    </main>
  );
}
