"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Sparkles, RefreshCw, MessageCircle, User } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface Props {
  studentName: string;
  lessonTitle: string;
  lessonSummary: string;
  struggledWords?: string[];
  onComplete: () => void;
}

export function SpeakingFollowUpBox({ studentName, lessonTitle, lessonSummary, struggledWords = [], onComplete }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Speech Recognition Setup ─────────────────────────────────────────────
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.start();
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isSubmitting) return;

    const userMessage: Message = { role: "user", content: text };
    
    // Optimistically update UI
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSubmitting(true);

    try {
      const currentHistory = [...messages, userMessage];
      const response = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_feedback",
          messages: currentHistory,
          studentName,
          sessionInfo: { title: lessonTitle, summary: lessonSummary },
          struggledWords,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
        // If they've exchanged a few messages, unlock the next phase
        if (currentHistory.length >= 4) {
           onComplete();
        }
      } else {
        const errorDetail = data.error || data.details || "Unknown AI Error";
        throw new Error(`AI Error: ${errorDetail}`);
      }
    } catch (error: any) {
      console.error("Speaking Feedback Error:", error);
      // Fallback message for Aria if AI fails
      setMessages((prev) => [...prev, { 
        role: "model", 
        content: `I'm having a tiny brain freeze 😅 (${error.message}). Could you try saying that again?` 
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 shadow-xl backdrop-blur-md flex flex-col h-[450px]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-indigo-900/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30">
          <MessageCircle className="text-indigo-400" size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Coach Aria: Multi-turn Practice</h3>
          <p className="text-[10px] text-indigo-300/80 italic">Discuss the lesson topic with me!</p>
        </div>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center animate-bounce">
              <Sparkles className="text-indigo-400" size={32} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
              &quot;Jack&apos;s family has many skills. What about yours? Type or speak below!&quot;
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300 ${
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
              m.role === "user" ? "bg-slate-800 border-slate-700" : "bg-indigo-600/20 border-indigo-500/30"
            }`}>
              {m.role === "user" ? <User size={14} className="text-slate-400" /> : <Sparkles size={14} className="text-indigo-400" />}
            </div>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
              m.role === "user" 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-slate-900/80 border border-white/5 text-slate-200 rounded-tl-none"
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {isSubmitting && (
          <div className="flex gap-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles size={14} className="text-indigo-400" />
            </div>
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl px-4 py-2.5 rounded-tl-none">
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" />
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-slate-950/20">
        <div className="relative flex items-center gap-2">
          <button
            onClick={startListening}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-90 shrink-0 ${
              isListening 
                ? "bg-rose-600 text-white animate-pulse" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Mic size={18} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-slate-900 border border-slate-800 px-5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />

          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isSubmitting}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-90"
          >
            <RefreshCw size={18} className={isSubmitting ? "animate-spin" : ""} />
          </button>
        </div>
        <p className="mt-2 text-[9px] text-center text-slate-500">
          Tip: Talk to Aria about your family or hobbies to get feedback!
        </p>
      </div>
    </div>
  );
}
