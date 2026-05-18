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
  const audioQueueRef = useRef<HTMLAudioElement[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Stop speaking
  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    audioQueueRef.current.forEach(audio => {
      try {
        audio.pause();
      } catch (err) {
        console.error(err);
      }
    });
    audioQueueRef.current = [];
    setIsSpeakingNow(false);
  };

  // Helper: Speak Text aloud using premium, high-quality Google Translate Neural TTS API
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined") return;

    try {
      stopSpeaking(); // Stop any active speech and clear the queue

      // Clean text from markdown tags for natural speech
      const cleanText = text
        .replace(/[*#_`~[\]()]/g, "")
        .replace(/:\)/g, "")
        .replace(/:\D/g, "");

      // Split text into lines, and then into sentences under 150 characters to avoid Google Translate TTS limit
      const lines = cleanText.split(/\n+/);
      const chunks: { text: string; lang: "vi" | "en" }[] = [];
      const vnChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i;

      for (const line of lines) {
        if (!line.trim()) continue;
        
        const sentences = line.split(/(?<=[.!?])\s+/);
        for (const sentence of sentences) {
          if (!sentence.trim()) continue;
          
          if (sentence.length > 150) {
            // Split long sentences into safe chunks of up to 150 chars
            const subparts = sentence.match(/.{1,150}(?=\s|$)/g) || [sentence];
            for (const part of subparts) {
              if (part.trim()) {
                chunks.push({
                  text: part.trim(),
                  lang: vnChars.test(part) ? "vi" : "en"
                });
              }
            }
          } else {
            chunks.push({
              text: sentence.trim(),
              lang: vnChars.test(sentence) ? "vi" : "en"
            });
          }
        }
      }

      if (chunks.length === 0) return;

      // Construct high-quality neural HTML5 audio elements
      const audios = chunks.map(chunk => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${chunk.lang}&client=tw-ob&q=${encodeURIComponent(chunk.text)}`;
        const audio = new Audio(url);
        return audio;
      });

      audioQueueRef.current = audios;
      setIsSpeakingNow(true);

      const playNext = (index: number) => {
        if (index >= audioQueueRef.current.length) {
          setIsSpeakingNow(false);
          currentAudioRef.current = null;
          return;
        }

        const audio = audioQueueRef.current[index];
        currentAudioRef.current = audio;

        audio.onended = () => {
          playNext(index + 1);
        };

        audio.onerror = () => {
          console.warn("Failed to play audio chunk, skipping to next...");
          playNext(index + 1);
        };

        audio.play().catch(err => {
          console.error("Audio playback blocked or failed:", err);
          setIsSpeakingNow(false);
        });
      };

      playNext(0);
    } catch (e) {
      console.error("Google TTS system error:", e);
    }
  }, []);

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
          mode: activeTab,
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
  }, [messages, sessionInfo, studentName, activeTab, isAutoSpeak, speakText]);

  // Initial greeting - ONLY ONCE
  useEffect(() => {
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      handleSend("Chào giáo viên, em đã sẵn sàng cho buổi học hôm nay.", true);
    }
  }, [handleSend]);

  // Setup Browser Voice Recognition (Speech-to-Text) with robust React unmount cleanup
  useEffect(() => {
    let rec: any = null;

    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        rec = new SpeechRecognition();
        rec.continuous = true; // Continuous listening so it doesn't cut off
        rec.interimResults = true; // Show results in real time
        rec.lang = "en-US"; // Expect English for IELTS

        rec.onstart = () => {
          setIsRecording(true);
          setSpeechStatus("🎙️ Đang lắng nghe... Hãy nói tiếng Anh. Bấm nút Đỏ để hoàn tất nói.");
        };

        rec.onend = () => {
          setIsRecording(false);
          setSpeechStatus(null);
        };

        rec.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript + " ";
            }
          }
          if (transcript) {
            setInput((prev) => {
              const base = prev.trim();
              return base ? `${base} ${transcript.trim()}` : transcript.trim();
            });
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

    // Cleanup: stop any running session on unmount to prevent ghost instances in StrictMode
    return () => {
      if (rec) {
        try {
          rec.onstart = null;
          rec.onend = null;
          rec.onresult = null;
          rec.onerror = null;
          rec.abort();
        } catch (err) {
          console.error("Cleanup SpeechRecognition error:", err);
        }
      }
    };
  }, []);

  // Automatically silence speaking & stop recording when switching tabs
  useEffect(() => {
    stopSpeaking();
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {
        console.error("Tab switch SpeechRecognition abort error:", err);
      }
      setIsRecording(false);
      setSpeechStatus(null);
    }
  }, [activeTab, isRecording]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt này không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome hoặc Safari nhé!");
      return;
    }

    if (isRecording) {
      try {
        recognitionRef.current.abort(); // Force-stop browser voice recognition immediately
      } catch (err) {
        console.error("Speech recognition abort error:", err);
      }
      setIsRecording(false);
      setSpeechStatus(null);
    } else {
      stopSpeaking(); // Silence AI first
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Speech recognition start error:", err);
        // Resilient recovery for browser speech session locks
        try {
          recognitionRef.current.abort();
          setTimeout(() => {
            recognitionRef.current.start();
          }, 200);
        } catch (e) {
          console.error(e);
        }
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
          <div className="flex flex-col space-y-4 py-2 animate-in fade-in">
            <div className="flex flex-col items-center justify-center space-y-3">
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
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 ${
                    isRecording
                      ? "bg-red-600 text-white hover:bg-red-700 shadow-red-500/20"
                      : "bg-sky-600 text-white hover:bg-sky-500 shadow-sky-500/20 hover:scale-105"
                  } disabled:opacity-50`}
                >
                  {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
              </div>

              {/* Subtext info */}
              <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                {isRecording ? "Đang ghi âm... bấm để dừng" : "Nhấp để nói"}
              </span>
            </div>

            {/* Voice transcript display & edit & send button */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="flex gap-2 border-t border-slate-800/80 pt-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Câu nói của em sẽ hiện ở đây, em có thể sửa trước khi gửi..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
                disabled={isLoading || isRecording}
              />
              <button
                type="submit"
                disabled={isLoading || isRecording || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-700 disabled:opacity-50 shadow-lg shadow-sky-500/20"
              >
                <Send size={18} />
              </button>
            </form>
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
