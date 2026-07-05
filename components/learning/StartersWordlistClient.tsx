"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { startersWordlistPages, StartersPage } from "@/lib/data/startersWordlistData";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2,
  Sparkles,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  initialPage?: number;
  backUrl?: string;
}

export default function StartersWordlistClient({ initialPage = 1, backUrl = "/hoc-tap/pre-a1-starter" }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const idx = startersWordlistPages.findIndex(p => p.pageNumber === initialPage);
    return idx !== -1 ? idx : 0;
  });

  const activePage = startersWordlistPages[currentPageIndex];

  // Image zoom state
  const [zoomScale, setZoomScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReadingText, setIsReadingText] = useState(false);

  // Audio/TTS support (Web Speech API)
  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      if (isReadingText) {
        window.speechSynthesis.cancel();
        setIsReadingText(false);
      } else {
        const textToRead = activePage.content;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        
        utterance.onend = () => {
          setIsReadingText(false);
        };
        utterance.onerror = () => {
          setIsReadingText(false);
        };

        setIsReadingText(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Trình duyệt của bạn không hỗ trợ tính năng phát âm giọng nói.");
    }
  };

  // Stop speech synthesis on page change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingText(false);
  }, [currentPageIndex]);

  const celebratePage = () => {
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="flex flex-col h-screen text-slate-100 bg-surface-deep">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 bg-surface border-b border-line shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href={backUrl}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-surface-raised border border-line text-slate-300 hover:text-white transition text-xs font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại
          </Link>
          <div className="h-4 w-[1px] bg-surface-raised"></div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-sky-400" /> Starters Wordlist Picture Book
            </h1>
            <p className="text-[10px] text-slate-400">Pre A1 Starters English for children</p>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full md:max-w-[40%] bg-slate-950 p-1.5 rounded-xl border border-line">
          {startersWordlistPages.map((p, idx) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPageIndex(idx);
                setIsFullscreen(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                currentPageIndex === idx
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/10 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-surface"
              }`}
            >
              Tr. {p.pageNumber}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN SPLIT WINDOW ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Textbook Image Scanner (Google Drive Hosted) */}
        <div className={`flex-1 flex flex-col bg-slate-950 relative overflow-hidden border-r border-line transition-all duration-500 ${
          isFullscreen ? "fixed inset-0 z-50 p-4" : ""
        }`}>
          {/* Controls toolbar */}
          <div className="flex items-center justify-between p-3 bg-surface/60 border-b border-slate-850 z-10 backdrop-blur">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-sky-400" /> Trang {activePage.pageNumber} / {startersWordlistPages.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.15))}
                className="p-1.5 rounded bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-slate-400 min-w-[40px] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale(prev => Math.min(3, prev + 0.15))}
                className="p-1.5 rounded bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="p-1.5 rounded bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image Container with Zoom & Scroll */}
          <div className="flex-1 overflow-auto relative w-full h-full bg-surface flex items-center justify-center p-4">
            <div 
              className="relative transition-transform duration-200 ease-out select-none"
              style={{ transform: `scale(${zoomScale})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://lh3.googleusercontent.com/d/${activePage.imageId}`}
                alt={`Starters Wordlist page ${activePage.pageNumber}`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-line"
              />
            </div>
          </div>

          {/* Quick Page Prev/Next overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <button
              onClick={() => {
                if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1);
              }}
              disabled={currentPageIndex === 0}
              className={`p-2.5 rounded-full bg-surface/80 hover:bg-surface-raised border border-line text-slate-200 pointer-events-auto transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                if (currentPageIndex < startersWordlistPages.length - 1) setCurrentPageIndex(prev => prev + 1);
              }}
              disabled={currentPageIndex === startersWordlistPages.length - 1}
              className={`p-2.5 rounded-full bg-surface/80 hover:bg-surface-raised border border-line text-slate-200 pointer-events-auto transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Text Content & Interaction */}
        <div className="flex-1 flex flex-col bg-surface overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="border-b border-line pb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Nội dung học tập</span>
              <h2 className="text-xl font-extrabold text-white mt-1">Trang {activePage.pageNumber}</h2>
            </div>
            
            <button
              onClick={handleTTS}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150 border ${
                isReadingText
                  ? "bg-rose-500/20 border-rose-500 text-rose-400 hover:bg-rose-500/30"
                  : "bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20"
              }`}
            >
              <Volume2 size={14} className={isReadingText ? "animate-bounce" : ""} />
              {isReadingText ? "Dừng Đọc" : "Đọc tiếng Anh"}
            </button>
          </div>

          {/* Book text details */}
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-inner flex-1 flex flex-col">
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto font-medium">
              {activePage.content.trim() ? (
                activePage.content
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 font-bold italic">
                  Trang bìa hoặc hình ảnh không có văn bản.
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex justify-end pt-4 border-t border-line gap-3">
            <button 
              onClick={celebratePage}
              className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wide shadow-md shadow-emerald-500/10 transition-all active:scale-95 duration-150"
            >
              <Sparkles size={14} className="animate-pulse" /> Đã hoàn thành trang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
