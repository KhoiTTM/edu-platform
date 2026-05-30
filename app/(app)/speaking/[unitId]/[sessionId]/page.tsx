import { SpeakingLaunchpad } from "@/components/speaking/SpeakingLaunchpad";
import { generateIeltsPrompt } from "@/lib/speaking/prompt-generator";

// We can look up the topic name based on the unit. 
// In a real app, this would be fetched from the DB based on unitId.
const getTopicForUnit = (unitId: string) => {
  const map: Record<string, string> = {
    "unit-1": "Hometown & Daily Life",
    "unit-2": "Education & Studies",
    "unit-3": "Work & Career",
    "unit-4": "Hobbies & Free Time",
    "unit-5": "Travel & Holidays",
    "unit-6": "Health & Fitness",
    "unit-7": "Technology & Science",
    "unit-8": "Environment & Nature",
  };
  return map[unitId] || "General IELTS Speaking";
};

export default async function SpeakingSessionPage({
  params
}: {
  params: Promise<{ unitId: string; sessionId: string }>
}) {
  const resolvedParams = await params;
  const { unitId, sessionId } = resolvedParams;
  
  const unitTopic = getTopicForUnit(unitId);

  // Generate the highly structured deterministic prompt
  const promptText = generateIeltsPrompt({
    unitId,
    topic: unitTopic,
    part: 1, // Assume part 1 for foundation
    targetBand: "6.5"
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
