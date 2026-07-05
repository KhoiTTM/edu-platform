"use client";

import { useState, useEffect } from "react";
import { Sparkles, Bot } from "lucide-react";

export function DailySummaryWidget({ initialSummary }: { initialSummary?: string }) {
  const [summary, setSummary] = useState(initialSummary || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If we already have a recent summary from server, don't fetch
    if (initialSummary && initialSummary.length > 5) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/ai/daily-summary");
        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            setSummary(data.summary);
          }
        }
      } catch (e) {
        console.error("Failed to fetch daily summary", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [initialSummary]);

  if (!summary && !isLoading) return null;

  return (
    <div className="mt-3 flex gap-3 items-start bg-purple-900/20 border border-purple-500/30 p-3 rounded-2xl max-w-2xl">
      <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
        <Bot size={16} className="text-purple-400" />
      </div>
      <div>
        <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-1">
          Aria Nhắn Nhủ <Sparkles size={12} />
        </p>
        {isLoading ? (
          <div className="flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <p className="text-sm text-purple-100/90 leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
