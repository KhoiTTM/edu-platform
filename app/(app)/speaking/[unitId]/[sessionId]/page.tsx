import { SpeakingLaunchpad } from "@/components/speaking/SpeakingLaunchpad";
import { generateIeltsPrompt } from "@/lib/speaking/prompt-generator";
import { createClient } from "@/lib/supabase/server";

export default async function SpeakingSessionPage({
  params
}: {
  params: Promise<{ unitId: string; sessionId: string }>
}) {
  const resolvedParams = await params;
  const { unitId, sessionId } = resolvedParams;
  
  const supabase = await createClient();
  const slug = `mindset-foundation-${unitId}`; // "mindset-foundation-unit-1"
  
  const { data: node } = await supabase
    .from('curriculum_nodes')
    .select('title, metadata')
    .eq('slug', slug)
    .maybeSingle();

  // Extract from DB or use fallbacks
  const unitTopic = node?.title?.replace(/^Unit \d+:\s*/i, "") || "General IELTS Speaking";
  const metadata = node?.metadata as any;
  const summary = metadata?.summary || "Practicing basic conversational skills.";
  const vocab = metadata?.vocab || [];

  // Generate the highly structured deterministic prompt
  const promptText = generateIeltsPrompt({
    unitId,
    topic: unitTopic,
    part: 1, // Assume part 1 for foundation
    targetBand: "6.5",
    lessonSummary: summary,
    keyVocab: vocab
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <SpeakingLaunchpad 
        promptText={promptText}
        unitTopic={unitTopic}
        unitId={unitId}
        sessionId={sessionId}
      />
    </div>
  );
}
