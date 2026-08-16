import { Suspense } from "react";
import PooyanVocabGame from "@/components/games/PooyanVocabGame";

export default function GamePooyanPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-surface" />}>
      <PooyanVocabGame />
    </Suspense>
  );
}
