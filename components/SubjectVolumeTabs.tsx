"use client";

import Link from "next/link";
import type { Volume } from "@/types/database";

type Tab = {
  volume: Volume;
  label: string;
  hasLessons: boolean;
};

type Props = {
  subjectSlug: string;
  tabs: Tab[];
  activeVolume: Volume;
};

export function SubjectVolumeTabs({
  subjectSlug,
  tabs,
  activeVolume,
}: Props) {
  const visible = tabs.filter((t) => t.hasLessons);
  if (visible.length <= 1) return null;

  return (
    <div
      className="mt-6 flex gap-2 rounded-2xl bg-slate-100 p-1"
      role="tablist"
      aria-label="Chọn tập sách"
    >
      {visible.map((tab) => {
        const active = tab.volume === activeVolume;
        return (
          <Link
            key={tab.volume}
            href={`/hoc-tap/${subjectSlug}?tap=${tab.volume}`}
            role="tab"
            aria-selected={active}
            className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition ${
              active
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
