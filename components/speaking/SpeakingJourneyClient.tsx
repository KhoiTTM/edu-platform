"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSpeakingSession } from "@/hooks/useSpeakingSession";
import { AriaConversationBubble } from "./AriaConversationBubble";
import { SpeakingInputArea } from "./SpeakingInputArea";
import { SessionProgressBar } from "./SessionProgressBar";
import { ScaffoldingPanel } from "./ScaffoldingPanel";
import { SpeakingSessionComplete } from "./SpeakingSessionComplete";

interface SpeakingJourneyClientProps {
  unitId: string;
  sessionNumber: number;
  unitTopic: string;
  studentName: string;
  previousSummary?: string | null;
}

export function SpeakingJourneyClient({
  unitId,
  sessionNumber,
  unitTopic,
  studentName,
  previousSummary
}: SpeakingJourneyClientProps) {
  const {
    messages,
    phase,
    turnCount,
    isAriaThinking,
    bestMoment,
    avgWordsPerTurn,
    error,
    startSession,
    sendMessage,
    completeSession
  } = useSpeakingSession({
    unitId,
    sessionNumber,
    studentName,
    unitTopic,
    previousSummary
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const totalTurnsGoal = sessionNumber === 1 ? 5 : 7;
  const unitNumber = unitId.replace("unit-", "");

  useEffect(() => {
    startSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAriaThinking]);

  if (phase === "complete") {
    return (
      <SpeakingSessionComplete 
        unitTopic={unitTopic}
        sessionNumber={sessionNumber}
        turnCount={turnCount}
        avgWords={avgWordsPerTurn}
        bestMoment={bestMoment}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black text-white leading-tight uppercase tracking-tight">
              Speaking Journey
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Unit {unitNumber}: {unitTopic}
            </p>
          </div>
        </div>
        
        <div className="w-48">
          <SessionProgressBar 
            currentTurn={turnCount}
            totalTurns={totalTurnsGoal}
            sessionNumber={sessionNumber}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Left Column: Conversation */}
        <div className="lg:col-span-7 flex flex-col min-h-0">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-4 space-y-6 scroll-smooth scrollbar-hide pb-8"
          >
            {error && (
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <p className="text-sm text-rose-400 font-medium">{error}</p>
                <button
                  onClick={startSession}
                  className="px-6 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-500 transition"
                >
                  Try Again
                </button>
              </div>
            )}

            {messages.length === 0 && !error && !isAriaThinking && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
                <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-sky-500 animate-spin" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Waking up Aria...</p>
              </div>
            )}

            {messages.map((m, idx) => (
              m.role === "aria" ? (
                <AriaConversationBubble key={m.id} message={m.content} />
              ) : (
                <div key={m.id} className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-sky-600/90 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] border border-sky-500/30">
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  </div>
                </div>
              )
            ))}
            
            {isAriaThinking && (
              <AriaConversationBubble message="" isTyping={true} />
            )}
            
            {turnCount >= totalTurnsGoal && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={completeSession}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 hover:scale-105 transition active:scale-95"
                >
                  ✨ Finish Session & Get Summary
                </button>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="pt-4 mt-auto">
            <SpeakingInputArea 
              onSubmit={sendMessage}
              isDisabled={isAriaThinking}
              placeholder={turnCount === 0 ? "Type your first response..." : "Your turn to speak..."}
            />
          </div>
        </div>

        {/* Right Column: Scaffolding */}
        <div className="hidden lg:block lg:col-span-5 space-y-6">
          <div className="sticky top-0">
            <ScaffoldingPanel 
              unitTopic={unitTopic}
              sessionNumber={sessionNumber}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
