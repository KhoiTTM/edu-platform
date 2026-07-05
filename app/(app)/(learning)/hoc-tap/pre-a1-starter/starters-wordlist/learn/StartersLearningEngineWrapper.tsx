"use client";

import { useSearchParams } from "next/navigation";
import StartersLearningEngine from "@/components/learning/StartersLearningEngine";

export default function StartersLearningEngineWrapper() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topic") ?? undefined;

  return (
    <StartersLearningEngine
      topicId={topicId}
      backUrl="/hoc-tap/pre-a1-starter/starters-wordlist"
    />
  );
}
