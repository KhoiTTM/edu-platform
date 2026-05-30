import { SpeakingLaunchpad } from "@/components/speaking/SpeakingLaunchpad";
import { generateSpeakingPrompt } from "@/lib/speaking/prompt-generator";
import { createClient } from "@/lib/supabase/server";

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
  
  // Use subjectSlug to find the curriculum node. Example: "mindset-foundation-unit-1"
  const nodeSlug = `${subjectSlug}-${unitId}`;
  
  const { data: node } = await supabase
    .from('curriculum_nodes')
    .select('title, metadata')
    .eq('slug', nodeSlug)
    .maybeSingle();

  const unitTopic = node?.title?.replace(/^Unit \d+:\s*/i, "") || `Topic for ${unitId}`;
  const metadata = node?.metadata as any;
  const summary = metadata?.summary || "Practicing basic conversational skills.";
  const vocab = metadata?.vocab || [];

  const subjectType = subjectSlug.includes('ielts') ? 'ielts' : 'general_k12';
  const studentLevel = subjectSlug.includes('ielts') 
    ? 'IELTS Band 6.5' 
    : (subjectSlug.includes('tieng-anh-3') || subjectSlug.includes('lop-3')
      ? 'Primary School Student (Grade 3)'
      : (subjectSlug.includes('grade') ? 'Primary School Student' : 'English Learner'));

  const promptText = generateSpeakingPrompt({
    subjectType,
    studentLevel,
    topic: unitTopic,
    lessonSummary: summary,
    keyVocab: vocab
  });

  const backUrl = resolvedSearchParams.backUrl || (subjectSlug.includes('mindset') 
    ? '/hoc-tap/mindset-ielts/speaking' 
    : `/hoc-tap/${subjectSlug}/speaking`);

  return (
    <div className="min-h-screen py-10 px-4">
      <SpeakingLaunchpad 
        promptText={promptText}
        unitTopic={unitTopic}
        unitId={unitId}
        sessionId={sessionId}
        backUrl={backUrl}
      />
    </div>
  );
}
