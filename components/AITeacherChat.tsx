"use client";

import { useState, useEffect, useRef } from "react";
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

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      handleSend("Bắt đầu buổi học", true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string, silent = false) => {
    const userMessage = text || input;
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
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-brand-50/50 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
          <Bot size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Giáo viên AI (IELTS Mentor)</h3>
          <p className="text-xs text-slate-500 italic">Đang hỗ trợ: {sessionInfo.title}</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((m, i) => (
          <div 
            key={i}
            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              m.role === "user" ? "bg-slate-100 text-slate-600" : "bg-brand-100 text-brand-600"
            }`}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              m.role === "user" 
                ? "bg-brand-600 text-white rounded-tr-none" 
                : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
            }`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Bot size={14} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-2">
              <Loader2 size={16} className="animate-spin text-brand-600" />
              <span className="text-xs text-slate-500">Giáo viên đang soạn tin...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="border-t border-slate-100 p-3"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Trả lời giáo viên hoặc đặt câu hỏi..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
