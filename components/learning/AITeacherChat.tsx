"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, Loader2 } from "lucide-react";
import { getScriptForUnit } from "@/lib/ieltsQuizzes";

// ─── Shared types ──────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── WARMUP opening questions per topic ───────────────────────────────────────

function getWarmupQuestion(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("daily") || t.includes("routine") || t.includes("life"))
    return "What's the first thing you do every morning? (Even if it's just... checking your phone 😄)";
  if (t.includes("house") || t.includes("home"))
    return "Describe one room in your home — what's your favourite thing about it?";
  if (t.includes("hobb") || t.includes("sport") || t.includes("free time"))
    return "What do you like to do when you have free time?";
  if (t.includes("travel") || t.includes("holiday"))
    return "If you could travel anywhere tomorrow, where would you go?";
  if (t.includes("food") || t.includes("eat"))
    return "What's one meal you could eat every single day without getting bored?";
  if (t.includes("job") || t.includes("work") || t.includes("career"))
    return "What job do you think would be the most fun? (Dream job — no limits!)";
  if (t.includes("health") || t.includes("body"))
    return "What's one healthy habit you actually enjoy? Or wish you had? 😅";
  if (t.includes("tech") || t.includes("phone") || t.includes("internet"))
    return "What app do you use the most every day? Why?";
  return "What's one thing you did today that you enjoyed?";
}

const LOADING_MESSAGES = [
  "Aria is reading your answer... 👀",
  "Thinking... 🤔",
  "Getting a response ready... ✍️",
  "Almost there...",
];

// ─── Sub-component: WARMUP card ───────────────────────────────────────────────

interface WarmupCardProps {
  sessionInfo: { title: string; summary: string };
  studentName: string;
  onWarmupComplete: () => void;
}

function WarmupCard({ sessionInfo, studentName, onWarmupComplete }: WarmupCardProps) {
  const [stage, setStage] = useState<"question" | "loading" | "response" | "done">("question");
  const [userInput, setUserInput] = useState("");
  const [ariaResponse, setAriaResponse] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const loadingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Rotate loading message every 1.8s
  useEffect(() => {
    if (stage === "loading") {
      let idx = 0;
      loadingRef.current = setInterval(() => {
        idx = (idx + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[idx]);
      }, 1800);
    }
    return () => {
      if (loadingRef.current) clearInterval(loadingRef.current);
    };
  }, [stage]);

  const handleSubmit = useCallback(async () => {
    const text = userInput.trim();
    if (!text) return;
    setStage("loading");

    try {
      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "warmup",
          studentName,
          sessionInfo,
          messages: [{ role: "user", content: text }],
        }),
      });
      const data = await res.json();
      setAriaResponse(
        data.text ??
          "Sounds interesting! Let's dive into the audio and see what Jack has to say. Ready? Let's listen! 🎧"
      );
      setStage("response");
    } catch {
      // Graceful fallback — never block the session
      setAriaResponse(
        "Nice! Every morning is different for everyone. Let's see what Jack's routine looks like. Ready? Let's listen! 🎧"
      );
      setStage("response");
    }
  }, [userInput, studentName, sessionInfo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const warmupQuestion = getWarmupQuestion(sessionInfo.title);

  return (
    <div className="rounded-2xl border border-line/60 bg-surface/60 shadow-xl backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-slate-950/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/20 shrink-0">
          <Bot size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Coach Aria</p>
          <p className="text-[10px] text-slate-500">Warm-up · 2 min</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-medium">Live</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">

        {/* Aria's opening question — always visible */}
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-900/50 text-sky-400">
            <Bot size={13} />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-surface-raised/70 border border-line/50 px-4 py-3 text-sm text-slate-200 leading-relaxed max-w-[85%]">
            Hey {studentName}! Before we listen...
            <br />
            <span className="font-medium text-white">{warmupQuestion}</span>
          </div>
        </div>

        {/* User input — only when in "question" stage */}
        {stage === "question" && (
          <div className="flex gap-2 items-end">
            <textarea
              rows={2}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (or press Enter to send)"
              className="flex-1 resize-none rounded-xl border border-line bg-surface-raised/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition leading-relaxed"
            />
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-500 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-sky-500/20"
              aria-label="Send answer"
            >
              <Send size={16} />
            </button>
          </div>
        )}

        {/* User message bubble (after send) */}
        {(stage === "loading" || stage === "response") && (
          <div className="flex gap-3 flex-row-reverse">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-400 text-xs font-bold">
              {studentName[0]?.toUpperCase() ?? "S"}
            </div>
            <div className="rounded-2xl rounded-tr-none bg-sky-600 px-4 py-2.5 text-sm text-white shadow-lg shadow-sky-500/10 max-w-[85%]">
              {userInput}
            </div>
          </div>
        )}

        {/* Loading state */}
        {stage === "loading" && (
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-900/50 text-sky-400">
              <Bot size={13} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-surface-raised/70 border border-line/50 px-4 py-2.5">
              <Loader2 size={14} className="animate-spin text-sky-400 shrink-0" />
              <span className="text-xs text-slate-400 transition-all duration-500">{loadingMsg}</span>
            </div>
          </div>
        )}

        {/* Aria response */}
        {stage === "response" && (
          <>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-900/50 text-sky-400">
                <Bot size={13} />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-surface-raised/70 border border-line/50 px-4 py-3 text-sm text-slate-200 leading-relaxed max-w-[85%] whitespace-pre-wrap">
                {ariaResponse}
              </div>
            </div>

            {/* CTA — unlock listening */}
            <button
              onClick={() => { setStage("done"); onWarmupComplete(); }}
              className="w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              <span>🎧</span>
              <span>Start Listening</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main component: existing lesson chat (unchanged behaviour) ───────────────

const isQuestionRequestingExplanation = (text: string): boolean => {
  const lowercase = text.toLowerCase().trim();
  const questionWords = [
    "tại sao", "tai sao", "vì sao", "vi sao", "là gì", "la gi", "nghĩa là", "nghia la",
    "giải thích", "giai thich", "hướng dẫn", "huong dan", "dịch", "dich", "như thế nào",
    "nhu the nao", "sao lại", "sao lai", "what", "why", "how", "explain", "translate",
    "meaning", "differ", "khác gì", "khac gi", "?",
  ];
  return questionWords.some((word) => lowercase.includes(word));
};

interface AITeacherChatProps {
  sessionInfo: { title: string; summary: string };
  studentName: string;
  /** "warmup" renders the compact warm-up card. "lesson" (default) renders the full chat panel. */
  mode?: "warmup" | "lesson";
  /** Called when warmup exchange finishes so parent can unlock the video phase. */
  onWarmupComplete?: () => void;
}

export default function AITeacherChat({
  sessionInfo,
  studentName,
  mode = "lesson",
  onWarmupComplete,
}: AITeacherChatProps) {

  // ── Warmup mode: delegate to compact card ──────────────────────────────────
  if (mode === "warmup") {
    return (
      <WarmupCard
        sessionInfo={sessionInfo}
        studentName={studentName}
        onWarmupComplete={onWarmupComplete ?? (() => {})}
      />
    );
  }

  // ── Lesson mode: original full chat panel (no changes to existing logic) ───
  return <LessonChatPanel sessionInfo={sessionInfo} studentName={studentName} />;
}

// ─── Lesson Chat Panel (extracted so warmup path is clean) ───────────────────

function LessonChatPanel({
  sessionInfo,
  studentName,
}: {
  sessionInfo: { title: string; summary: string };
  studentName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const getUnitNumber = (title: string): number => {
    const match = title.match(/U(\d+)/i);
    return match ? parseInt(match[1]) : 1;
  };
  const unitNum = getUnitNumber(sessionInfo.title);
  const script = getScriptForUnit(unitNum, studentName, sessionInfo.summary);

  const handleSend = useCallback(
    async (text: string, isInitial = false) => {
      const userMessage = text.trim();
      if (!userMessage) return;

      if (!isInitial) {
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
      }

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
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.text
                ? `🤖 **[Giải thích bằng AI Realtime]**\n\n${data.text}`
                : `⚠️ Lỗi kết nối AI: ${data.error}`,
            },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "⚠️ Không thể kết nối với AI lúc này. Hãy kiểm tra mạng và thử lại nhé!" },
          ]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
        setTimeout(() => {
          if (isInitial) {
            setMessages([{ role: "assistant", content: script.steps[0].text }]);
            setStepIndex(0);
          } else {
            const nextIndex = stepIndex + 1;
            if (nextIndex < script.steps.length) {
              setMessages((prev) => [...prev, { role: "assistant", content: script.steps[nextIndex].text }]);
              setStepIndex(nextIndex);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: `Thầy/Cô rất khen ngợi tinh thần tự học của ${studentName}! 🌟\n\nNếu em gặp câu hỏi khó nào, hãy gõ câu hỏi kèm dấu "?" hoặc từ "giải thích" để thầy cô AI giải thích ngay!`,
                },
              ]);
            }
          }
          setIsLoading(false);
        }, isInitial ? 0 : 600);
      }
    },
    [messages, stepIndex, script, sessionInfo, studentName]
  );

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
    <div className="flex h-[620px] flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Header */}
      <div className="border-b border-line bg-slate-950/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/20">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Giáo viên IELTS AI</h3>
            <p className="text-[10px] text-slate-500">Giáo án Tương tác + AI Giải đáp 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                m.role === "user" ? "bg-surface-raised text-slate-400 text-xs font-bold" : "bg-sky-900/50 text-sky-400"
              }`}
            >
              {m.role === "user" ? (studentName[0]?.toUpperCase() ?? "S") : <Bot size={14} />}
            </div>
            <div
              className={`group relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-sky-600 text-white rounded-tr-none shadow-lg shadow-sky-500/10"
                  : "bg-surface/80 text-slate-200 border border-line rounded-tl-none shadow-sm"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-sky-900/50 text-sky-400">
              <Bot size={14} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-surface/80 border border-line px-4 py-2">
              <Loader2 size={16} className="animate-spin text-sky-500" />
              <span className="text-xs text-slate-400">Giáo viên đang phản hồi...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-line bg-slate-950/80 p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Trả lời hoặc đặt câu hỏi có dấu '?'..."
            className="flex-1 rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
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
          💡 Gõ câu hỏi có &ldquo;giải thích&rdquo; hoặc &ldquo;?&rdquo; để AI giải đáp realtime.
        </p>
      </div>
    </div>
  );
}
