import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { redirect, notFound } from "next/navigation";
import { LearnNodeClient } from "@/components/universal/LearnNodeClient";

export const dynamic = "force-dynamic";

interface LearnNodePageProps {
  params: Promise<{
    subject: string;
    node: string;
  }>;
}

export default async function LearnNodePage({ params }: LearnNodePageProps) {
  const { subject, node } = await params;
  const supabase = await createClient();
  const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  // 1. Fetch the Target Node — disambiguate by subject slug via 2-step query
  // Step 1a: Find the universal_subject ID for this subject slug
  const { data: universalSubject } = await adminSupabase
    .from("universal_subjects")
    .select("id")
    .eq("slug", subject)
    .maybeSingle();

  let sourceIds: string[] = [];
  if (universalSubject?.id) {
    // Step 1b: Find all content_sources for this subject
    const { data: sources } = await adminSupabase
      .from("content_sources")
      .select("id")
      .eq("subject_id", universalSubject.id);
    sourceIds = (sources ?? []).map((s: any) => s.id);
  }

  // Step 1c: Query the node, filtered by source if possible
  let nodeQuery = adminSupabase
    .from("curriculum_nodes")
    .select("id, title, slug, path, type, metadata, source_id")
    .eq("slug", node);

  if (sourceIds.length > 0) {
    nodeQuery = nodeQuery.in("source_id", sourceIds);
  }

  const { data: nodeData, error: nodeError } = await nodeQuery.maybeSingle();

  if (nodeError || !nodeData) {
    console.error(`Node not found: subject=${subject}, node=${node}, sourceIds=${sourceIds}, error=`, nodeError);
    return notFound();
  }

  // 2. Fetch Breadcrumbs
  const pathSegments = nodeData.path ? nodeData.path.split('.') : [];
  const ancestorPaths = pathSegments.map((_seg: string, idx: number) => pathSegments.slice(0, idx + 1).join('.'));

  // Fetch titles for all nodes in the path
  const { data: bcNodes } = await adminSupabase
    .from("curriculum_nodes")
    .select("title, slug, path")
    .eq("source_id", nodeData.source_id)
    .in("path", ancestorPaths)
    .order("depth", { ascending: true });

  const breadcrumbs = bcNodes || [];

  // 3. Find associated concept
  const { data: lc } = await supabase
    .from("lesson_concepts")
    .select("concept_id")
    .eq("lesson_id", nodeData.id)
    .maybeSingle();
  
  const conceptId = lc?.concept_id || (nodeData.metadata as any)?.concept_id;

  // Exercise sets and questions are now fetched client-side via Assessment Engine

  // 5. Fetch Child Nodes (Flattened Duolingo style)
  let childNodes: any[] = [];
  if (nodeData.type !== 'lesson') {
    // Fetch all units and lessons for this source
    const { data: allDescendants } = await adminSupabase
      .from("curriculum_nodes")
      .select(`
        id, title, slug, type, parent_id, sort_key
      `)
      .eq("source_id", nodeData.source_id)
      .neq("type", "course");
    
    if (allDescendants) {
      const units = allDescendants.filter(n => n.type === 'unit').sort((a, b) => (a.sort_key || 0) - (b.sort_key || 0));
      const lessons = allDescendants.filter(n => n.type === 'lesson' || n.type === 'exam').sort((a, b) => (a.sort_key || 0) - (b.sort_key || 0));
      
      // Interleave units and lessons/exams
      units.forEach(u => {
        childNodes.push(u);
        const uLessons = lessons.filter(l => l.parent_id === u.id);
        childNodes.push(...uLessons);
      });
    }
  }

  // Questions are fetched dynamically via Assessment Engine on the client side

  return (
    <main className="min-h-screen bg-[#0f172a] p-4 md:p-8 lg:p-12">
      <LearnNodeClient 
        node={nodeData as any}
        breadcrumbs={breadcrumbs as any}
        subjectSlug={subject}
        conceptId={conceptId}
        childNodes={childNodes}
      />
    </main>
  );
}
