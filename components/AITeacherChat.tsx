"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AITeacherChatProps {
  sessionInfo: {
    title: string;
    summary: string;
  };
  studentName: string;
}

export default function AITeacherChat({ sessionInfo, studentName }: AITeacherChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);

  const handleSend = useCallback(async (text: string, silent = false) => {
    const userMessage = text;
    if (!userMessage.trim()) return;

    if (!silent) {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
    }
    
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: silent ? [{ role: "user", content: userMessage }] : [...messages, { role: "user", content: userMessage }],
          sessionInfo,
          studentName,
          mode: "text", // Always text mode
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: `⚠️ Lỗi: ${data.error}${data.details ? `\n\nChi tiết: ${data.details}` : ""}` 
        }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [messages, sessionInfo, studentName]);

  // Initial greeting - ONLY ONCE
  useEffect(() => {
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      handleSend("Chào giáo viên, em đã sẵn sàng cho buổi học hôm nay.", true);
    }
  }, [handleSend]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[620px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/20">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Giáo viên IELTS AI (Syllabus Coach)</h3>
              <p className="text-[10px] text-slate-500">Kỹ năng học tập toàn diện bám sát bài học</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/20"
      >
        {messages.map((m, i) => (
          <div 
            key={i}
            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              m.role === "user" ? "bg-slate-800 text-slate-400" : "bg-sky-900/50 text-sky-400"
            }`}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`group relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "user" 
                ? "bg-sky-600 text-white rounded-tr-none shadow-lg shadow-sky-500/10" 
                : "bg-slate-900/80 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm"
            }`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-sky-900/50 text-sky-400">
              <Bot size={14} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-900/80 border border-slate-800 px-4 py-2">
              <Loader2 size={16} className="animate-spin text-sky-500" />
              <span className="text-xs text-slate-400">Giáo viên đang soạn phản hồi & chấm điểm bài học...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-800 bg-slate-950/80 p-4">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Đặt câu hỏi, nộp bài tập hoặc chat bám sát nội dung sách với AI..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-700 disabled:opacity-50 shadow-lg shadow-sky-500/20"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
