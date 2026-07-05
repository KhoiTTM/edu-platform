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
    <div className="relative rounded-[2.5rem] border-4 border-surface-raised bg-surface/60 p-6 shadow-[0_12px_0_#0f172a,0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden group transition-all duration-300 hover:scale-[1.01] h-full flex flex-col justify-between">
      {/* Glow Effects */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-sky-500/10 blur-3xl group-hover:bg-sky-500/15 transition-colors duration-700" />
      
      <div className="flex items-start gap-4">
        {/* Cute AI Agent Avatar */}
        <div className="relative flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-b from-sky-400 to-blue-500 border-2 border-sky-200 flex items-center justify-center text-white shadow-[0_4px_0_#0369a1]">
          <Bot size={24} className="animate-pulse" />
          <div className="absolute top-0.5 left-1.5 right-1.5 h-1.5 bg-white/20 rounded-full pointer-events-none"></div>
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
              <Sparkles size={12} className="animate-spin-slow" /> Coach Aria&apos;s Insight
            </h3>
            
            <button
              onClick={generateInsight}
              disabled={isLoading}
              className={`p-1.5 rounded-xl transition-all border border-line active:translate-y-[2px] active:shadow-none shadow-[0_2px_0_#1e293b] ${
                isLoading 
                  ? "bg-surface-raised text-slate-500 animate-spin" 
                  : "bg-surface-raised text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              title="Cập nhật nhận xét"
            >
              <RefreshCw size={12} />
            </button>
          </div>
          
          <div className="relative bg-slate-950/40 border border-line/80 rounded-2xl p-4 shadow-inner">
            <p className="text-xs text-slate-200 leading-relaxed italic pr-2 font-medium">
              &ldquo;{insight}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
