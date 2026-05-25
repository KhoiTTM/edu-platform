"use client";

import { Sparkles } from "lucide-react";

interface AriaConversationBubbleProps {
  message: string;
  isTyping?: boolean;
  thinkingMessage?: string;
}

export function AriaConversationBubble({ 
  message, 
  isTyping,
  thinkingMessage = "Aria is thinking..." 
}: AriaConversationBubbleProps) {
  return (
    <div className="flex gap-4 items-start animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
        <Sparkles size={20} className="text-white" />
      </div>
      
      <div className="space-y-2 max-w-[85%]">
        <div className="bg-slate-800/80 border border-slate-700 text-white p-4 rounded-2xl rounded-tl-none shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {isTyping ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
              </div>
              <p className="text-xs text-slate-400 italic animate-pulse">{thinkingMessage}</p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        {!isTyping && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Coach Aria
          </p>
        )}
      </div>
    </div>
  );
}
