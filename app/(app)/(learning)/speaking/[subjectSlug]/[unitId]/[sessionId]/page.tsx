import { SpeakingLaunchpad } from "@/components/learning/speaking/SpeakingLaunchpad";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function SpeakingSessionPage({
  params,
  searchParams
}: {
  params: Promise<{ subjectSlug: string; unitId: string; sessionId: string }>;
  searchParams: Promise<{ backUrl?: string }>;
}) {
  const resolvedParams = await params;
  const { subjectSlug, unitId, sessionId } = resolvedParams;
  const resolvedSearchParams = await searchParams;
  
  const supabase = await createClient();
  
  // 1. Fetch content source by slug
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', subjectSlug)
    .maybeSingle();

  let node: any = null;

  if (source) {
    // 2. Query node by source_id and match either slug or prefixed slug
    const { data: matchedNode } = await supabase
      .from('curriculum_nodes')
      .select('id, title, slug, type, parent_id, source_id, metadata')
      .eq('source_id', source.id)
      .or(`slug.eq."${unitId}",slug.eq."${subjectSlug}-${unitId}"`)
      .maybeSingle();
    node = matchedNode;
  }

  // Fallback direct query if not matched above
  if (!node) {
    const { data: fallbackNode } = await supabase
      .from('curriculum_nodes')
      .select('id, title, slug, type, parent_id, source_id, metadata')
      .eq('slug', unitId)
      .maybeSingle();
    node = fallbackNode;
  }

  if (!node) {
    return notFound();
  }

  // 3. Fetch all nodes for this source to build sequence
  let precedingTopics: string[] = [];
  let precedingVocab: string[] = [];
  let parentUnit: any = null;

  if (node.source_id) {
    const { data: allNodes } = await supabase
      .from('curriculum_nodes')
      .select('id, title, slug, type, parent_id, sort_key, metadata')
      .eq('source_id', node.source_id);

    if (allNodes) {
      // Interleave units and lessons to build chronological sequence
      const units = allNodes.filter(n => n.type === 'unit').sort((a, b) => (a.sort_key || 0) - (b.sort_key || 0));
      const lessons = allNodes.filter(n => n.type === 'lesson' || n.type === 'exam').sort((a, b) => (a.sort_key || 0) - (b.sort_key || 0));
      
      const orderedNodes: any[] = [];
      units.forEach(u => {
        orderedNodes.push(u);
        const uLessons = lessons.filter(l => l.parent_id === u.id);
        orderedNodes.push(...uLessons);
      });

      const currentIndex = orderedNodes.findIndex(n => n.id === node.id);
      if (currentIndex !== -1) {
        const preceding = orderedNodes.slice(0, currentIndex);
        precedingTopics = preceding.map(pn => pn.title);
        precedingVocab = preceding.flatMap(pn => pn.metadata?.vocab || []);
      }

      parentUnit = orderedNodes.find(n => n.id === node.parent_id);
    }
  }

  const unitTopic = node.title?.replace(/^Unit \d+:\s*/i, "").replace(/^Unit \d+\s*-\s*Lesson \d+:\s*/i, "") || `Topic for ${unitId}`;
  
  // Inherit vocab/summary from parent unit if lesson metadata is empty
  const metadata = node.metadata as any;
  const parentMetadata = parentUnit?.metadata as any;

  const summary = metadata?.summary || parentMetadata?.summary || "Practicing basic conversational skills.";
  const vocab = metadata?.vocab || parentMetadata?.vocab || [];

  const subjectType = subjectSlug.includes('ielts') ? 'ielts' : 'general_k12';
  const studentLevel = subjectSlug.includes('ielts') 
    ? 'IELTS Band 6.5' 
    : (subjectSlug.includes('tieng-anh-3') || subjectSlug.includes('lop-3')
      ? 'Primary School Student (Grade 3)'
      : (subjectSlug.includes('grade') ? 'Primary School Student' : 'English Learner'));

  const backUrl = resolvedSearchParams.backUrl || (subjectSlug.includes('mindset') 
    ? '/hoc-tap/mindset-ielts/speaking' 
    : `/hoc-tap/${subjectSlug}/speaking`);

  return (
    <div className="min-h-screen py-10 px-4">
      <SpeakingLaunchpad 
        subjectType={subjectType}
        studentLevel={studentLevel}
        unitTopic={unitTopic}
        lessonSummary={summary}
        keyVocab={vocab}
        precedingTopics={precedingTopics}
        precedingVocab={precedingVocab}
        unitId={unitId}
        sessionId={sessionId}
        backUrl={backUrl}
      />
    </div>
  );
}

