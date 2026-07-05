"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, X, Square } from "lucide-react";
import { useVoiceInput } from "@/hooks/useVoiceInput";

interface SpeakingInputAreaProps {
  onSubmit: (text: string) => void;
  isDisabled: boolean;
  placeholder?: string;
}

export function SpeakingInputArea({ 
  onSubmit, 
  isDisabled, 
  placeholder = "Type your response..." 
}: SpeakingInputAreaProps) {
  const [text, setText] = useState("");
  const { isListening, transcript, error: voiceError, startListening, stopListening, resetTranscript } = useVoiceInput();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (text.trim() && !isDisabled) {
      if (isListening) stopListening();
      onSubmit(text);
      setText("");
      resetTranscript();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="space-y-4">
      {voiceError && (
        <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest text-center">
            Microphone Error: {voiceError}
          </p>
        </div>
      )}
      
      <div className="relative group">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isDisabled}
          placeholder={isDisabled ? "Aria is responding..." : isListening ? "Listening... speak now 🎤" : placeholder}
          className={`w-full min-h-[100px] bg-surface/50 border ${
            isListening ? "border-sky-500 ring-2 ring-sky-500/20" : isDisabled ? "border-line opacity-50" : "border-line hover:border-slate-600"
          } rounded-2xl p-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        
        <div className="absolute right-3 bottom-3 flex gap-2">
          {text && !isListening && !isDisabled && (
            <button
              onClick={() => { setText(""); resetTranscript(); }}
              className="p-2 text-slate-500 hover:text-white transition"
            >
              <X size={20} />
            </button>
          )}
          
          <button
            onClick={handleMicClick}
            disabled={isDisabled}
            className={`p-3 rounded-full transition-all ${
              isListening 
                ? "bg-rose-500 text-white animate-pulse" 
                : "bg-surface-raised text-sky-400 hover:bg-slate-700 disabled:opacity-20"
            }`}
          >
            {isListening ? <Square size={20} fill="currentColor" /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={handleSend}
            disabled={isDisabled || !text.trim()}
            className="p-3 bg-sky-600 text-white rounded-full hover:bg-sky-500 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-sky-600/20"
          >
            <Send size={20} />
          </button>
        </div>

        {isListening && (
          <div className="absolute left-4 bottom-4 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-rose-400 rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-rose-500 rounded-full animate-pulse [animation-delay:0.2s]" />
              <span className="w-1 h-3 bg-rose-400 rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Recording</span>
          </div>
        )}
      </div>
      
      <p className="text-[11px] text-slate-500 text-center italic">
        Tip: Try to speak out loud before typing! 🗣️
      </p>
    </div>
  );
}
