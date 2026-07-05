"use client";

import { useMemo } from "react";

interface LearningHeatmapProps {
  dates: string[];
}

export function LearningHeatmap({ dates }: LearningHeatmapProps) {
  const heatmapData = useMemo(() => {
    const today = new Date();
    const result = [];
    
    // Last 14 weeks (98 days)
    for (let i = 97; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      
      const count = dates.filter(date => date.startsWith(dateStr)).length;
      result.push({ date: dateStr, count });
    }
    return result;
  }, [dates]);

  const getLevelColor = (count: number) => {
    if (count === 0) return "bg-surface-raised/50";
    if (count === 1) return "bg-sky-900";
    if (count === 2) return "bg-sky-700";
    if (count >= 3) return "bg-sky-500";
    return "bg-surface-raised/50";
  };

  return (
    <div className="rounded-3xl bg-surface/40 border border-line p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Learning Consistency</h3>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-surface-raised/50" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-900" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {heatmapData.map((item) => (
          <div
            key={item.date}
            title={`${item.date}: ${item.count} sessions`}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-colors duration-500 ${getLevelColor(item.count)}`}
          />
        ))}
      </div>
      
      <p className="text-[10px] text-slate-600 italic">
        Showing your learning activity over the last 14 weeks.
      </p>
    </div>
  );
}
