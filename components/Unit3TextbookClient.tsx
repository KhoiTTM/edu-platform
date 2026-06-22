"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { unit3Pages, TextbookPage, Exercise } from "@/lib/data/unit3Data";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause, 
  CheckCircle, 
  HelpCircle,
  Maximize2,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  initialPage?: number;
  backUrl?: string;
  subjectSlug: string;
}

export default function Unit3TextbookClient({ initialPage = 34, backUrl = "/hoc-tap", subjectSlug }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const idx = unit3Pages.findIndex(p => p.pageNumber === initialPage);
    return idx !== -1 ? idx : 0;
  });

  const activePage = unit3Pages[currentPageIndex];

  // Image zoom state
  const [zoomScale, setZoomScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // User input answers state
  // Key format: `${pageNumber}-${exerciseId}-${inputIndex}`
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize page-specific state
  useEffect(() => {
    // Reset audio when page changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [currentPageIndex]);

  // Audio events
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Handle inputs
  const handleInputChange = (exerciseId: string, index: number, value: string) => {
    const key = `${activePage.pageNumber}-${exerciseId}-${index}`;
    setUserAnswers(prev => ({ ...prev, [key]: value }));
    // Hide results for this page once user starts typing again
    setShowResults(prev => ({ ...prev, [activePage.pageNumber]: false }));
  };

  // Check answers for the current page
  const handleCheckAnswers = () => {
    const pageNum = activePage.pageNumber;
    setShowResults(prev => ({ ...prev, [pageNum]: true }));

    // Verify if all answers on the active page are correct
    let pageCorrect = true;
    activePage.exercises.forEach(ex => {
      ex.correctAnswers.forEach((correctVal, idx) => {
        const key = `${pageNum}-${ex.id}-${idx}`;
        const userVal = (userAnswers[key] || "").trim().toLowerCase();
        
        // Handle fuzzy checking (commas, multiple options, spelling case-insensitivity)
        const isCorrect = correctVal.split("/").some(option => {
          const opt = option.trim().toLowerCase();
          // Exact match or contains if fuzzy matching required
          return userVal === opt || (opt.length > 3 && userVal.includes(opt));
        });

        if (!isCorrect) {
          pageCorrect = false;
        }
      });
    });

    if (pageCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="flex flex-col h-screen text-slate-100 bg-[#0b0f19]">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0f172a] border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href={backUrl}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-xs font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại
          </Link>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-sky-400" /> IELTS Foundation Textbook Alignment
            </h1>
            <p className="text-[10px] text-slate-400">Unit 3: Hobbies, Leisure and Entertainment</p>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full md:max-w-[40%] bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {unit3Pages.map((p, idx) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPageIndex(idx);
                setIsFullscreen(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                currentPageIndex === idx
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/10 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              Tr. {p.pageNumber}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN SPLIT WINDOW ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Textbook Image Scanner */}
        <div className={`flex-1 flex flex-col bg-slate-950 relative overflow-hidden border-r border-slate-800 transition-all duration-500 ${
          isFullscreen ? "fixed inset-0 z-50 p-4" : ""
        }`}>
          {/* Controls toolbar */}
          <div className="flex items-center justify-between p-3 bg-slate-900/60 border-b border-slate-850 z-10 backdrop-blur">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-sky-400" /> Bản Quét Sách: Trang {activePage.pageNumber} ({activePage.title})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale(prev => Math.max(0.6, prev - 0.15))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-slate-400 min-w-[40px] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale(prev => Math.min(2.5, prev + 0.15))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scrolled container */}
          <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
            <div 
              className="origin-top transition-transform duration-200"
              style={{ transform: `scale(${zoomScale})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={activePage.imagePath} 
                alt={`Textbook Page ${activePage.pageNumber}`}
                className="max-w-[700px] w-full rounded shadow-2xl border border-slate-850"
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
              className={`p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 pointer-events-auto transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                if (currentPageIndex < unit3Pages.length - 1) setCurrentPageIndex(prev => prev + 1);
              }}
              disabled={currentPageIndex === unit3Pages.length - 1}
              className={`p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 pointer-events-auto transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Forms Workspace */}
        <div className="flex-1 flex flex-col bg-slate-900 overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">INTERACTIVE STUDY WORKSPACE</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Trang {activePage.pageNumber}: {activePage.title}</h2>
          </div>

          {/* LISTENING AUDIO PLAYER (Page 35) */}
          {activePage.audioUrl && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Audio Lesson Player</h4>
                  <p className="text-[10px] text-slate-400">Listen for Exercise 4 and Exercise 5 questions</p>
                </div>
              </div>

              {/* Native hidden audio element */}
              <audio 
                ref={audioRef}
                src={activePage.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Interface progress bar */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-mono w-[35px]">
                  {formatTime(currentTime)}
                </span>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleAudioSeek}
                  className="flex-1 h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-sky-500"
                />
                <span className="text-[10px] text-slate-400 font-mono w-[35px]">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg shadow-sky-600/15"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Tạm Dừng
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Phát Audio
                    </>
                  )}
                </button>

                {/* Speed Controls */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {[0.75, 1.0, 1.25, 1.5].map(speed => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all ${
                        playbackRate === speed 
                          ? "bg-slate-800 text-white" 
                          : "text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXERCISES CHECKLIST */}
          <div className="space-y-8 flex-1">
            {activePage.exercises.map((ex) => {
              const showResult = showResults[activePage.pageNumber];

              return (
                <div key={ex.id} className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 shadow-md space-y-4 hover:border-slate-800 transition">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                      {ex.title}
                    </h3>
                  </div>

                  {/* Render based on exercise type */}
                  {ex.type === "multiple-choice" && (
                    <div className="grid gap-2.5 pt-2">
                      {ex.options?.map((opt, oIdx) => {
                        const optionLetter = opt.charAt(0); // A, B, C, D
                        const ansKey = `${activePage.pageNumber}-${ex.id}-0`;
                        const isSelected = userAnswers[ansKey] === optionLetter;
                        
                        const isCorrect = ex.correctAnswers[0] === optionLetter;
                        const isWrongSelected = isSelected && !isCorrect;

                        let borderClass = "border-slate-800 bg-slate-900/40 hover:bg-slate-900";
                        if (showResult) {
                          if (isCorrect) borderClass = "border-emerald-600 bg-emerald-950/20 text-emerald-350";
                          else if (isWrongSelected) borderClass = "border-rose-600 bg-rose-950/20 text-rose-350";
                        } else if (isSelected) {
                          borderClass = "border-sky-500 bg-sky-950/20 text-sky-400";
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleInputChange(ex.id, 0, optionLetter)}
                            className={`w-full text-left p-4 rounded-xl border transition text-xs font-medium flex items-center justify-between ${borderClass}`}
                          >
                            <span>{opt}</span>
                            {showResult && isCorrect && <span className="text-[10px] text-emerald-400 font-bold uppercase">Correct</span>}
                            {showResult && isWrongSelected && <span className="text-[10px] text-rose-400 font-bold uppercase">Incorrect</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {ex.type === "fill-blank" && (
                    <div className="space-y-4 pt-2">
                      <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-xl border border-slate-900">
                        {ex.questionText}
                      </p>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        {ex.correctAnswers.map((correctVal, index) => {
                          const ansKey = `${activePage.pageNumber}-${ex.id}-${index}`;
                          const currentVal = userAnswers[ansKey] || "";
                          
                          const isCorrect = correctVal.split("/").some(option => {
                            const opt = option.trim().toLowerCase();
                            return currentVal.trim().toLowerCase() === opt || (opt.length > 3 && currentVal.trim().toLowerCase().includes(opt));
                          });

                          let inputClass = "bg-slate-950 border-slate-800 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
                          if (showResult) {
                            inputClass = isCorrect 
                              ? "bg-emerald-950/20 border-emerald-600 text-emerald-300 font-bold" 
                              : "bg-rose-950/20 border-rose-600 text-rose-300 font-bold";
                          }

                          return (
                            <div key={index} className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Input #{index + 1}
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={currentVal}
                                  placeholder={ex.placeholder || `Answer for #${index + 1}`}
                                  onChange={(e) => handleInputChange(ex.id, index, e.target.value)}
                                  className={`w-full px-4 py-2.5 rounded-xl border text-xs transition duration-200 outline-none ${inputClass}`}
                                />
                                {showResult && !isCorrect && (
                                  <div className="text-[10px] text-slate-400 mt-1 font-medium italic">
                                    Correct: <span className="text-emerald-400 font-bold font-mono">{correctVal}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {ex.type === "grammar-table" && (
                    <div className="space-y-4 pt-2">
                      <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-900">
                        {ex.questionText}
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Present Simple Column */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 space-y-3">
                          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                            Present Simple Verbs
                          </span>
                          
                          {/* Present Simple Inputs */}
                          <div className="space-y-3">
                            {["get up (ex)", "usually (ex)", "looks after", "makes", "don't miss", "doesn't like"].map((placeholderText, index) => {
                              const ansIndex = index;
                              const ansKey = `${activePage.pageNumber}-${ex.id}-${ansIndex}`;
                              const currentVal = userAnswers[ansKey] || "";
                              const correctVal = ex.correctAnswers[ansIndex];
                              
                              const isCorrect = currentVal.trim().toLowerCase() === correctVal.toLowerCase();

                              let inputClass = "bg-slate-900 border-slate-800 focus:border-sky-500";
                              if (showResult) {
                                inputClass = isCorrect 
                                  ? "bg-emerald-950/20 border-emerald-600 text-emerald-300" 
                                  : "bg-rose-950/20 border-rose-600 text-rose-300";
                              }

                              return (
                                <div key={index} className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500 font-bold font-mono min-w-[20px]">{index + 1}.</span>
                                  <div className="flex-1">
                                    <input
                                      type="text"
                                      placeholder={placeholderText}
                                      value={currentVal}
                                      onChange={(e) => handleInputChange(ex.id, ansIndex, e.target.value)}
                                      className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition ${inputClass}`}
                                    />
                                    {showResult && !isCorrect && (
                                      <span className="text-[9px] text-emerald-400 block mt-0.5 font-bold font-mono">{correctVal}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Present Continuous Column */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 space-y-3">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                            Present Continuous Verbs
                          </span>
                          
                          {/* Present Continuous Inputs */}
                          <div className="space-y-3">
                            {["having (ex)", "staying (ex)", "resting", "having", "cooking", "not staying"].map((placeholderText, index) => {
                              const ansIndex = index + 6;
                              const ansKey = `${activePage.pageNumber}-${ex.id}-${ansIndex}`;
                              const currentVal = userAnswers[ansKey] || "";
                              const correctVal = ex.correctAnswers[ansIndex];
                              
                              const isCorrect = currentVal.trim().toLowerCase() === correctVal.toLowerCase();

                              let inputClass = "bg-slate-900 border-slate-800 focus:border-indigo-500";
                              if (showResult) {
                                inputClass = isCorrect 
                                  ? "bg-emerald-950/20 border-emerald-600 text-emerald-300" 
                                  : "bg-rose-950/20 border-rose-600 text-rose-300";
                              }

                              return (
                                <div key={index} className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500 font-bold font-mono min-w-[20px]">{index + 7}.</span>
                                  <div className="flex-1">
                                    <input
                                      type="text"
                                      placeholder={placeholderText}
                                      value={currentVal}
                                      onChange={(e) => handleInputChange(ex.id, ansIndex, e.target.value)}
                                      className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition ${inputClass}`}
                                    />
                                    {showResult && !isCorrect && (
                                      <span className="text-[9px] text-emerald-400 block mt-0.5 font-bold font-mono">{correctVal}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {ex.type === "text-area" && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-900 whitespace-pre-line">
                        {ex.questionText}
                      </p>
                      
                      <textarea
                        rows={6}
                        placeholder={ex.placeholder || "Enter your written answer response..."}
                        value={userAnswers[`${activePage.pageNumber}-${ex.id}-0`] || ""}
                        onChange={(e) => handleInputChange(ex.id, 0, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-sky-500 transition duration-200"
                      />
                      
                      {showResult && (
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs space-y-1">
                          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4" /> Suggested Answer Guide:
                          </span>
                          <p className="text-slate-300 italic">{ex.correctAnswers[0]}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CHECK ANSWERS CTA FOOTER */}
          <div className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-slate-800 sticky bottom-0 z-10 shadow-lg">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SUBMIT WORKSPACE</span>
              <p className="text-xs font-bold text-slate-350 mt-0.5">Click to verify answers for this book page</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const currentKeys = Object.keys(userAnswers).filter(k => k.startsWith(`${activePage.pageNumber}-`));
                  const resetObj = { ...userAnswers };
                  currentKeys.forEach(k => delete resetObj[k]);
                  setUserAnswers(resetObj);
                  setShowResults(prev => ({ ...prev, [activePage.pageNumber]: false }));
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
              >
                Reset Page
              </button>

              <button
                onClick={handleCheckAnswers}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/10 transition active:scale-[0.98]"
              >
                <CheckCircle className="h-4 w-4" /> Check Answers
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
