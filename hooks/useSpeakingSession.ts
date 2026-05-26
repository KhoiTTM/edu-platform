"use client";

import { useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/client";

export type MessageRole = "aria" | "learner";

export interface SpeakingMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    turnNumber: number;
    wordCount?: number;
    isBestMoment?: boolean;
    isNudge?: boolean;
    isHint?: boolean;
    isRetry?: boolean;
  };
}

export type SpeakingPhase = "loading" | "conversation" | "retry" | "complete";

interface UseSpeakingSessionProps {
  unitId: string;
  sessionNumber: number;
  studentName: string;
  unitTopic: string;
  previousSummary?: string | null;
}

export function useSpeakingSession({
  unitId,
  sessionNumber,
  studentName,
  unitTopic,
  previousSummary
}: UseSpeakingSessionProps) {
  const [messages, setMessages] = useState<SpeakingMessage[]>([]);
  const [phase, setPhase] = useState<SpeakingPhase>("loading");
  const [turnCount, setTurnCount] = useState(0);
  const [isAriaThinking, setIsAriaThinking] = useState(false);
  const [bestMoment, setBestMoment] = useState<string | null>(null);
  const [avgWordsPerTurn, setAvgWordsPerTurn] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const totalWordsRef = useRef(0);
  const learnerTurnsRef = useRef(0);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const addMessage = useCallback((role: MessageRole, content: string, metadata?: any) => {
    const newMessage: SpeakingMessage = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date(),
      metadata
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []); // stable — no dependencies

  const triggerSilenceNudge = useCallback(async () => {
    if (phase !== "conversation" || isAriaThinking) return;
    
    setIsAriaThinking(true);
    try {
      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session_silence",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          turnCount,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });
      const data = await res.json();
      if (data.text) {
        addMessage("aria", data.text, { isNudge: true });
      }
    } catch (err) {
      console.error("Silence nudge failed:", err);
    } finally {
      setIsAriaThinking(false);
    }
  }, [phase, isAriaThinking, studentName, unitTopic, unitId, sessionNumber, turnCount, messages, addMessage]);

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    // Set 60s silence nudge
    silenceTimerRef.current = setTimeout(triggerSilenceNudge, 60000);
  }, [clearSilenceTimer, triggerSilenceNudge]);

  const mapFriendlyError = (err: any): string => {
    const msg = err.message || "";
    if (msg.includes("429") || msg.toLowerCase().includes("quota")) {
      return "Oops! Hệ thống AI đang hơi quá tải vì có quá nhiều bạn đang học. Bạn chờ Aria 1 phút rồi nhấn Gửi lại nhé! 😅";
    }
    if (msg.includes("503") || msg.toLowerCase().includes("failed")) {
      return "Aria đang bận một chút, bạn nhấn thử lại để đánh thức cô ấy nhé! ☕";
    }
    if (msg.toLowerCase().includes("fetch")) {
      return "Kết nối mạng có chút vấn đề, bạn kiểm tra lại wifi rồi thử lại nhé! 🌐";
    }
    return "Có một lỗi nhỏ xảy ra, Aria chưa nghe rõ bạn nói gì. Bạn thử lại nhé! ✨";
  };

  const startSession = useCallback(async () => {
    if (messages.length > 0) return; // Don't restart if already started
    
    setPhase("loading");
    setError(null);
    setIsAriaThinking(true);
    console.log("Starting Speaking Session:", { unitId, sessionNumber, studentName });

    try {
      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session_open",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          previousSummary,
          messages: []
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.text) {
        addMessage("aria", data.text, { turnNumber: 0 });
        setPhase("conversation");
        resetSilenceTimer();
      } else {
        throw new Error("Aria returned an empty response.");
      }
    } catch (err: any) {
      console.error("Failed to start session:", err);
      setError(mapFriendlyError(err));
    } finally {
      setIsAriaThinking(false);
    }
  }, [studentName, unitTopic, sessionNumber, previousSummary, addMessage, messages.length, unitId, resetSilenceTimer]);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim()) return;

    clearSilenceTimer();

    // Add learner message
    const wordCount = userText.trim().split(/\s+/).length;
    addMessage("learner", userText, { wordCount, turnNumber: turnCount });

    // Update metrics
    totalWordsRef.current += wordCount;
    learnerTurnsRef.current += 1;
    setAvgWordsPerTurn(Math.round(totalWordsRef.current / learnerTurnsRef.current));
    setTurnCount((prev) => prev + 1);

    // AI Response
    setIsAriaThinking(true);
    setError(null);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      history.push({ role: "learner", content: userText });

      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          messages: history,
          turnCount: turnCount + 1,
          lastUserWordCount: wordCount
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.text) {
        addMessage("aria", data.text, { turnNumber: turnCount + 1 });
        resetSilenceTimer();
      } else {
        throw new Error("Aria returned an empty response.");
      }
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setError(mapFriendlyError(err));
    } finally {
      setIsAriaThinking(false);
    }
  }, [messages, studentName, unitTopic, sessionNumber, turnCount, addMessage, clearSilenceTimer, resetSilenceTimer, unitId]);

  const requestRetry = useCallback(async () => {
    clearSilenceTimer();
    setIsAriaThinking(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session_retry",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          turnCount,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!res.ok) throw new Error("Retry request failed");

      const data = await res.json();
      if (data.text) {
        addMessage("aria", data.text, { isRetry: true });
        resetSilenceTimer();
      }
    } catch (err) {
      console.error("Retry request failed:", err);
      setError(mapFriendlyError(err));
    } finally {
      setIsAriaThinking(false);
    }
  }, [studentName, unitTopic, unitId, sessionNumber, turnCount, messages, addMessage, clearSilenceTimer, resetSilenceTimer]);

  const requestHint = useCallback(async () => {
    clearSilenceTimer();
    setIsAriaThinking(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session_hint",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          turnCount,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!res.ok) throw new Error("Hint request failed");

      const data = await res.json();
      if (data.text) {
        addMessage("aria", data.text, { isHint: true });
        resetSilenceTimer();
      }
    } catch (err) {
      console.error("Hint request failed:", err);
      setError(mapFriendlyError(err));
    } finally {
      setIsAriaThinking(false);
    }
  }, [studentName, unitTopic, unitId, sessionNumber, turnCount, messages, addMessage, clearSilenceTimer, resetSilenceTimer]);

  const completeSession = useCallback(async () => {
    clearSilenceTimer();
    setPhase("loading");
    setIsAriaThinking(true);
    setError(null);
    try {
      // Find best moment (longest/best sentence)
      const learnerMessages = messages.filter(m => m.role === "learner");
      const longestMessage = learnerMessages.reduce((prev, current) => 
        (prev.content.length > current.content.length) ? prev : current
      , learnerMessages[0]);
      
      const bestMomentText = longestMessage?.content || "";
      setBestMoment(bestMomentText);

      // 1. Get Debrief
      const debriefRes = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_session_debrief",
          studentName,
          sessionInfo: { title: unitTopic },
          unitId,
          sessionNumber,
          turnCount,
          bestMomentCandidate: bestMomentText,
          scaffoldingUsed: sessionNumber <= 2
        }),
      });

      if (!debriefRes.ok) throw new Error("Failed to get debrief");
      const debriefData = await debriefRes.json();
      const ariaDebrief = debriefData.text;

      // 2. Get Summary for memory
      const summaryRes = await fetch("/api/ai/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "speaking_summary",
          sessionInfo: { title: unitTopic },
          unitId,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!summaryRes.ok) throw new Error("Failed to get session summary");
      const summaryData = await summaryRes.json();
      const sessionSummary = summaryData.text;

      // 3. Save to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Update session
        const { error: upsertError } = await supabase.from("speaking_sessions").upsert({
          user_id: user.id,
          unit_id: unitId,
          session_number: sessionNumber,
          status: "complete",
          completed_at: new Date().toISOString(),
          session_summary: sessionSummary,
          best_moment_text: bestMomentText,
          turn_count: turnCount,
          avg_words_per_turn: Math.round(totalWordsRef.current / learnerTurnsRef.current),
          scaffolding_used: sessionNumber <= 2
        });

        if (upsertError) console.error("Supabase upsert error:", upsertError);

        // Update progress
        await supabase.from("unit_speaking_progress").upsert({
          user_id: user.id,
          unit_id: unitId,
          sessions_complete: sessionNumber,
          unit_complete: sessionNumber === 4,
          last_session_at: new Date().toISOString()
        });
      }

      addMessage("aria", ariaDebrief);
      setPhase("complete");
    } catch (err: any) {
      console.error("Failed to complete session:", err);
      setError(mapFriendlyError(err));
      setPhase("conversation"); // Revert to conversation so they can try again
    } finally {
      setIsAriaThinking(false);
    }
  }, [messages, studentName, unitTopic, sessionNumber, turnCount, unitId, addMessage, clearSilenceTimer]);

  return {
    messages,
    phase,
    turnCount,
    isAriaThinking,
    bestMoment,
    avgWordsPerTurn,
    error,
    startSession,
    sendMessage,
    requestRetry,
    requestHint,
    completeSession
  };
}
