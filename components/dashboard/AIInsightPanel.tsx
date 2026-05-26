"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Bot } from "lucide-react";

interface AIInsightPanelProps {
  initialInsight: string | null;
  lastInsightAt: string | null;
}

export function AIInsightPanel({ initialInsight, lastInsightAt }: AIInsightPanelProps) {
  const [insight, setInsight] = useState(initialInsight || "Chào mừng bạn quay trở lại! Hãy bắt đầu bài học hôm nay để Aria có thể đưa ra nhận xét nhé. ✨");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<number>(lastInsightAt ? new Date(lastInsightAt).getTime() : 0);

  const canRefresh = Date.now() - lastRefreshed > 5 * 60 * 1000; // 5 minute cooldown

  const generateInsight = async () => {
    if (!canRefresh && initialInsight) {
      alert("Aria cần thời gian để quan sát thêm. Hãy quay lại sau ít phút nhé! ☕");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/insights", { method: "POST" });
      const data = await res.json();
      if (data.insight) {
        setInsight(data.insight);
        setLastRefreshed(Date.now());
      }
    } catch (err) {
      console.error("Failed to generate insight:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-slate-900/50 border border-sky-500/20 p-6 shadow-xl backdrop-blur-md overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-sky-500/5 blur-2xl group-hover:bg-sky-500/10 transition-colors duration-700" />
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
          <Bot size={24} />
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
              <Sparkles size={12} /> Coach Aria&apos;s Insight
            </h3>
            <button
              onClick={generateInsight}
              disabled={isLoading}
              className={`p-1.5 rounded-lg transition-all ${
                isLoading 
                  ? "bg-slate-800 text-slate-500 animate-spin" 
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              title="Refresh insight"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          
          <div className="relative">
            <p className="text-sm text-slate-200 leading-relaxed italic pr-4">
              &ldquo;{insight}&rdquo;
            </p>
            {/* Bubble tail decoration */}
            <div className="absolute -left-1 top-2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-sky-500/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
