"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, User, Bot, Loader2, HelpCircle } from "lucide-react";
import { getScriptForUnit } from "@/lib/ieltsQuizzes";

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

// Check if user is asking a question that requires real-time Gemini AI explanation
const isQuestionRequestingExplanation = (text: string): boolean => {
  const lowercase = text.toLowerCase().trim();
  const questionWords = [
    "tại sao", "tai sao", "vì sao", "vi sao", "là gì", "la gi", "nghĩa là", "nghia la",
    "giải thích", "giai thich", "hướng dẫn", "huong dan", "dịch", "dich", "như thế nào",
    "nhu the nao", "sao lại", "sao lai", "what", "why", "how", "explain", "translate",
    "meaning", "differ", "khác gì", "khac gi", "?"
  ];
  return questionWords.some(word => lowercase.includes(word));
};

export default function AITeacherChat({ sessionInfo, studentName }: AITeacherChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Track scripted step index
  const [stepIndex, setStepIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Helper to parse Unit Number from lesson title
  const getUnitNumber = (title: string): number => {
    const match = title.match(/U(\d+)/i);
    return match ? parseInt(match[1]) : 1;
  };
  const unitNum = getUnitNumber(sessionInfo.title);
  const script = getScriptForUnit(unitNum, studentName, sessionInfo.summary);

  // Hybrid Flow Send Handler
  const handleSend = useCallback(async (text: string, isInitial = false) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    if (!isInitial) {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
    }

    // 10% Realtime AI: Student asks a custom question requesting explanation or dictionary help
    if (!isInitial && isQuestionRequestingExplanation(userMessage)) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/ai/teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: userMessage }],
            sessionInfo,
            studentName,
            mode: "text",
          }),
        });

        const data = await response.json();
        if (data.text) {
          setMessages((prev) => [...prev, { 
            role: "assistant", 
            content: `🤖 **[Giải thích bằng AI Realtime]**\n\n${data.text}` 
          }]);
        } else if (data.error) {
          setMessages((prev) => [...prev, { 
            role: "assistant", 
            content: `⚠️ Lỗi kết nối AI: ${data.error}` 
          }]);
        }
      } catch (error) {
        console.error("Gemini API error:", error);
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "⚠️ Không thể kết nối với AI lúc này. Hãy kiểm tra mạng và thử lại nhé!" 
        }]);
      } finally {
        setIsLoading(false);
      }
    } 
    // 90% Scripted Flow: Standard lesson steps running completely LOCALLY with zero API quota usage!
    else {
      setIsLoading(true);
      
      // Minor delay to simulate natural teacher typing
      setTimeout(() => {
        if (isInitial) {
          // Render greeting (Step 0)
          setMessages([{ role: "assistant", content: script.steps[0].text }]);
          setStepIndex(0);
        } else {
          const nextIndex = stepIndex + 1;
          if (nextIndex < script.steps.length) {
            setMessages((prev) => [...prev, { role: "assistant", content: script.steps[nextIndex].text }]);
            setStepIndex(nextIndex);
          } else {
            // General scripted fallback encouragement
            setMessages((prev) => [...prev, { 
              role: "assistant", 
              content: `Thầy/Cô rất khen ngợi tinh thần tự học của ${studentName}! 🌟\n\nNếu em gặp câu hỏi khó nào trong phần Bài tập trắc nghiệm ở bên trái hoặc cần dịch nghĩa từ vựng, em hãy gõ trực tiếp câu hỏi ở đây kèm dấu "?" hoặc từ "giải thích" nhé, thầy cô AI Realtime sẽ hướng dẫn chi tiết ngay cho em!` 
            }]);
          }
        }
        setIsLoading(false);
      }, isInitial ? 0 : 600);
    }
  }, [messages, stepIndex, script, sessionInfo, studentName]);

  // Initial mount: load Greeting step
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      handleSend("ready", true);
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
              <h3 className="text-sm font-semibold text-white">Giáo viên IELTS AI (Syllabus Guide)</h3>
              <p className="text-[10px] text-slate-500">Giáo án Tương tác + AI Giải đáp 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-sky-950/30 px-2 py-1 border border-sky-900/30 text-[10px] font-semibold text-sky-400">
            <HelpCircle size={12} />
            Chỉ dùng AI khi đặt câu hỏi
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
              <span className="text-xs text-slate-400">Giáo viên đang xử lý phản hồi...</span>
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
            placeholder="Trả lời giáo viên, hoặc gõ câu hỏi để hỏi AI Realtime..."
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
        <p className="mt-2 text-[10px] text-slate-500 text-center">
          💡 Mẹo: Khi cần AI giải thích ngữ pháp hoặc dịch từ, hãy nhập câu hỏi có chứa từ &ldquo;giải thích&rdquo;, &ldquo;dịch&rdquo; hoặc dấu hỏi &ldquo;?&rdquo;.
        </p>
      </div>
    </div>
  );
}
