"use client";
import { useRouter } from "next/navigation";

export default function RandomLessonButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  const handleRandom = () => {
    if (!slugs.length) return;
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/hoc-tap/mindset-ielts/phan-xa/${slug}`);
  };
  return (
    <button
      onClick={handleRandom}
      disabled={slugs.length === 0}
      className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500 disabled:opacity-40 transition-colors shadow-lg shadow-green-950/40"
    >
      🎲 Bài ngẫu nhiên
    </button>
  );
}
