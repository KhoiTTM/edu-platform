"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, User, Bot, Loader2, Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"text" | "speaking">("text");
  
  // Voice & Audio States
  const [isRecording, setIsRecording] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(true);
  const [isSpeakingNow, setIsSpeakingNow] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);
  const recognitionRef = useRef<any>(null);
  const speakingUtteranceRef = useRef<any>(null);

  // Helper: Speak Text aloud using SpeechSynthesis API
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // Stop any active speech

      // Clean text from markdown tags for natural speech
      const cleanText = text
        .replace(/[*#_`~[\]()]/g, "")
        .replace(/:\)/g, "")
        .replace(/:\D/g, "");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Attempt to load an English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB"));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = "en-US";
      utterance.rate = 0.9; // Clear speed for learning

      utterance.onstart = () => setIsSpeakingNow(true);
      utterance.onend = () => setIsSpeakingNow(false);
      utterance.onerror = () => setIsSpeakingNow(false);

      speakingUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("SpeechSynthesis error:", e);
    }
  }, []);

  // Stop speaking
  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeakingNow(false);
    }
  };

  const handleSend = useCallback(async (text: string, silent = false) => {
    const userMessage = text;
    if (!userMessage.trim()) return;

    stopSpeaking(); // Stop speaking if student replies

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
        
        // Auto Speak Response
        if (isAutoSpeak) {
          // Delay briefly to feel natural
          setTimeout(() => {
            speakText(data.text);
          }, 400);
        }
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
  }, [messages, sessionInfo, studentName, isAutoSpeak, speakText]);

  // Initial greeting - ONLY ONCE
  useEffect(() => {
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      handleSend("Chào giáo viên, em đã sẵn sàng cho buổi học hôm nay.", true);
    }
  }, [handleSend]);

  // Setup Browser Voice Recognition (Speech-to-Text)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US"; // Expect English for IELTS

        rec.onstart = () => {
          setIsRecording(true);
          setSpeechStatus("🎙️ Em hãy nói (tiếng Anh)...");
        };

        rec.onend = () => {
          setIsRecording(false);
          setSpeechStatus(null);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(transcript);
            handleSend(transcript);
          }
        };

        rec.onerror = (e: any) => {
          console.error("Speech Recognition Error:", e);
          setIsRecording(false);
          setSpeechStatus(null);
          if (e.error === "not-allowed") {
            alert("Vui lòng cấp quyền truy cập Micro trên trình duyệt để luyện nói!");
          }
        };

        recognitionRef.current = rec;
      }
    }
  }, [handleSend]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt này không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome hoặc Safari nhé!");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking(); // Silence AI first
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Ensure voices are loaded for SpeechSynthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="flex h-[620px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Header & Tabs */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/20">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Giáo viên IELTS AI (Speaking Coach)</h3>
              <p className="text-[10px] text-slate-500">Kỹ năng: Luyện Nói & Sửa ngữ pháp</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const newSpeak = !isAutoSpeak;
                setIsAutoSpeak(newSpeak);
                if (!newSpeak) stopSpeaking();
              }}
              className={`rounded-lg p-1.5 transition ${
                isAutoSpeak 
                  ? "bg-sky-950/40 text-sky-400 border border-sky-900/30" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title={isAutoSpeak ? "Tắt tự động đọc tin" : "Bật tự động đọc tin"}
            >
              {isAutoSpeak ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* Tab Toggle buttons */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => {
              setActiveTab("text");
              stopSpeaking();
            }}
            className={`rounded-lg py-1 text-center text-xs font-semibold transition ${
              activeTab === "text"
                ? "bg-slate-800 text-sky-400 shadow-sm"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Học Trực Tuyến (Chat)
          </button>
          <button
            onClick={() => {
              setActiveTab("speaking");
              // Read aloud the last message if active speaking mode
              if (messages.length > 0) {
                const lastAI = [...messages].reverse().find(m => m.role === "assistant");
                if (lastAI) speakText(lastAI.content);
              }
            }}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1 text-center text-xs font-semibold transition ${
              activeTab === "speaking"
                ? "bg-slate-800 text-sky-400 shadow-sm"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Sparkles size={12} />
            Luyện Nói Speaking
          </button>
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
              
              {/* Play Audio Button for Assistant Messages */}
              {m.role === "assistant" && (
                <button
                  onClick={() => speakText(m.content)}
                  className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 rounded-lg p-1 text-slate-400 hover:text-sky-400 transition"
                  title="Đọc to câu này"
                >
                  <Volume2 size={14} />
                </button>
              )}
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
              <span className="text-xs text-slate-400">Giáo viên nói đang chấm điểm & phản hồi...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-800 bg-slate-950/80 p-4">
        {activeTab === "speaking" ? (
          // SPEAKING MODE INTERFACE
          <div className="flex flex-col items-center justify-center space-y-4 py-2 animate-in fade-in">
            {/* Real-time speech recognition indicator */}
            {speechStatus ? (
              <div className="text-xs text-sky-400 font-semibold animate-pulse">
                {speechStatus}
              </div>
            ) : isSpeakingNow ? (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Volume2 size={12} className="animate-bounce" />
                Giáo viên đang nói giảng bài...
              </div>
            ) : (
              <div className="text-xs text-slate-500 font-medium">
                Ấn nút Micro màu xanh và bắt đầu trả lời bằng tiếng Anh nhé!
              </div>
            )}

            {/* Speaking mic button */}
            <div className="relative">
              {isRecording && (
                <span className="absolute -inset-2 rounded-full bg-sky-500/20 animate-ping" />
              )}
              <button
                type="button"
                onClick={toggleRecording}
                disabled={isLoading}
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 ${
                  isRecording
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-red-500/20"
                    : "bg-sky-600 text-white hover:bg-sky-500 shadow-sky-500/20 hover:scale-105"
                } disabled:opacity-50`}
              >
                {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
              </button>
            </div>

            {/* Subtext info */}
            <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">
              {isRecording ? "Đang lắng nghe... bấm để tắt" : "Nhấp để bắt đầu trả lời nói"}
            </span>
          </div>
        ) : (
          // TEXT CHAT MODE INTERFACE
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Trả lời giáo viên IELTS hoặc hỏi bài bằng chữ..."
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
        )}
      </div>
    </div>
  );
}
