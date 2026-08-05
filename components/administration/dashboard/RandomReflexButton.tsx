"use client";

import { useRouter } from "next/navigation";

interface RandomReflexButtonProps {
  examIds: string[];
  timer?: number;
}

export function RandomReflexButton({ examIds, timer = 5 }: RandomReflexButtonProps) {
  const router = useRouter();

  const handleRandomRedirect = () => {
    if (examIds.length === 0) return;
    const randomIndex = Math.floor(Math.random() * examIds.length);
    const selectedExamId = examIds[randomIndex];
    router.push(`/test-assessment?examId=${selectedExamId}&timer=${timer}`);
  };

  return (
    <button
      onClick={handleRandomRedirect}
      type="button"
      className="px-6 py-3 shrink-0 w-full md:w-auto text-center bg-white text-rose-600 font-black rounded-xl text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all"
    >
      Luyện tập ngay
    </button>
  );
}
