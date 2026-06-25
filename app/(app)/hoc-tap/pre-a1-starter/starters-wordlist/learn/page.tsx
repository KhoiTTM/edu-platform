import { Suspense } from "react";
import StartersLearningEngineWrapper from "./StartersLearningEngineWrapper";

export const dynamic = "force-dynamic";

export default function StartersLearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f19]" />}>
      <StartersLearningEngineWrapper />
    </Suspense>
  );
}
