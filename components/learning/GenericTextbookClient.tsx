"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TextbookPage, Exercise } from "@/lib/data/unit3Data"; // Import types
import { 
  BookOpen, 
  ChevronLeft,
  Play,
  Pause, 
  CheckCircle, 
  HelpCircle,
  Volume2,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  pages: TextbookPage[];
  initialPage?: number;
  backUrl?: string;
  subjectSlug: string;
  unitTitle: string;
}

export default function GenericTextbookClient({ pages, initialPage = 34, backUrl = "/hoc-tap", subjectSlug, unitTitle }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const idx = pages.findIndex(p => p.pageNumber === initialPage);
    return idx !== -1 ? idx : 0;
  });

  const activePage = pages[currentPageIndex];

  // Collapsible book panel state
  const [isBookOpen, setIsBookOpen] = useState(true);

  // User input answers state
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
    setShowResults(prev => ({ ...prev, [activePage.pageNumber]: false }));
  };

  // Check answers for the current page
  const handleCheckAnswers = () => {
    const pageNum = activePage.pageNumber;
    setShowResults(prev => ({ ...prev, [pageNum]: true }));

    let pageCorrect = true;
    activePage.exercises.forEach(ex => {
      ex.correctAnswers.forEach((correctVal, idx) => {
        const key = `${pageNum}-${ex.id}-${idx}`;
        const userVal = (userAnswers[key] || "").trim().toLowerCase();
        
        const isCorrect = correctVal.split("/").some(option => {
          const opt = option.trim().toLowerCase();
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
    <div className="flex flex-col h-screen text-slate-100 bg-surface-deep overflow-hidden">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 bg-surface border-b border-line shadow-md z-20">
        <div className="flex items-center gap-3">
          <Link
            href={backUrl}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-slate-800 border border-line text-slate-350 hover:text-white transition text-xs font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại
          </Link>

          {/* Toggle Button for Textbook Panel */}
          <button
            onClick={() => setIsBookOpen(prev => !prev)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition text-xs font-bold ${
              isBookOpen 
                ? "bg-amber-600/20 border-amber-500/40 text-amber-300 hover:bg-amber-600/30" 
                : "bg-sky-600/20 border-sky-500/40 text-sky-300 hover:bg-sky-600/30"
            }`}
          >
            <BookOpen className="h-4 w-4" /> {isBookOpen ? "Ẩn Sách Minh Họa" : "Xem Sách Minh Họa"}
          </button>

          <div className="h-4 w-[1px] bg-surface-raised"></div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              📚 Học bài tích hợp sách giáo khoa
            </h1>
            <p className="text-[10px] text-slate-400">{unitTitle}</p>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full md:max-w-[40%] bg-slate-950 p-1.5 rounded-xl border border-line">
          {pages.map((p, idx) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPageIndex(idx);
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

      {/* ── MAIN WINDOW: SPLIT SCREEN LAYOUT ─────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Textbook Viewer (Collapsible) */}
        <div 
          className={`h-full border-r border-line bg-slate-950 transition-all duration-300 flex flex-col overflow-hidden relative ${
            isBookOpen ? "w-full md:w-[45%] lg:w-[50%] opacity-100" : "w-0 opacity-0 pointer-events-none border-r-0"
          }`}
        >
          <div className="flex-1 w-full bg-slate-900 flex items-center justify-center relative">
            {activePage.driveFileId ? (
              <iframe 
                src={`https://drive.google.com/file/d/${activePage.driveFileId}/preview`} 
                width="100%" 
                height="100%" 
                allow="autoplay"
                className="border-0 w-full h-full"
              ></iframe>
            ) : (
              <iframe
                src={`https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p=${activePage.pageNumber}`}
                className="border-0 w-full h-full"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Forms Workspace */}
        <div className="flex-1 h-full flex flex-col bg-surface overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Không gian bài tập tương tác</span>
              <h2 className="text-xl font-extrabold text-white mt-1">Trang {activePage.pageNumber}: {activePage.title}</h2>
            </div>
            
            {!isBookOpen && (
              <button
                onClick={() => setIsBookOpen(true)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/10 transition active:scale-95"
              >
                <BookOpen className="h-4 w-4" /> Mở Sách Xem Tranh Minh Họa
              </button>
            )}
          </div>

          {/* LISTENING VIDEO PLAYER (real YouTube audio) */}
          {activePage.youtubeId && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-line shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bài Nghe Video</h4>
                  <p className="text-[10px] text-slate-400">Nghe video dưới đây để hoàn thành các bài tập</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-line">
                <div className="relative aspect-video w-full">
                  <iframe
                    title={activePage.title}
                    src={`https://www.youtube-nocookie.com/embed/${activePage.youtubeId}?rel=0&modestbranding=1`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LISTENING AUDIO PLAYER */}
          {activePage.audioUrl && !activePage.youtubeId && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-line shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">File Nghe Bài Học</h4>
                  <p className="text-[10px] text-slate-400">Nhấn nút phát bên dưới để nghe bài đọc</p>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={activePage.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-slate-950 hover:bg-sky-400 transition animate-in fade-in zoom-in"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleAudioSeek}
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-surface-raised accent-sky-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 border border-slate-850 p-1.5 rounded-lg">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                        playbackRate === speed
                          ? "bg-sky-500 text-slate-950"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exercises list */}
          <div className="space-y-6 flex-1 max-w-4xl w-full mx-auto">
            {activePage.exercises.map((ex) => {
              const showResult = showResults[activePage.pageNumber] || false;

              return (
                <div key={ex.id} className="p-5 rounded-2xl border border-line bg-slate-950/20 space-y-4 shadow-sm hover:border-line-active transition-all">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-start gap-2">
                      <HelpCircle className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                      {ex.title}
                    </h3>
                  </div>

                  {ex.type === "fill-blank" && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-900/60 whitespace-pre-line">
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

                          let inputClass = "bg-slate-950 border-slate-850 focus:border-sky-500";
                          if (showResult) {
                            inputClass = isCorrect 
                              ? "bg-emerald-950/20 border-emerald-600 text-emerald-300" 
                              : "bg-rose-950/20 border-rose-600 text-rose-350";
                          }

                          return (
                            <div key={index} className="space-y-1">
                              <span className="text-[10px] text-slate-500 font-bold font-mono">Ô Trống {index + 1}:</span>
                              <input
                                type="text"
                                placeholder={ex.placeholder || "Điền câu trả lời..."}
                                value={currentVal}
                                onChange={(e) => handleInputChange(ex.id, index, e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition duration-200 ${inputClass}`}
                              />
                              {showResult && !isCorrect && (
                                <span className="text-[9px] text-emerald-400 block font-bold font-mono pl-1">Đáp án: {correctVal}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {ex.type === "multiple-choice" && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                        {ex.questionText}
                      </p>
                      
                      <div className="space-y-2">
                        {ex.options?.map((option) => {
                          const optKey = option.charAt(0);
                          const ansKey = `${activePage.pageNumber}-${ex.id}-0`;
                          const currentVal = userAnswers[ansKey] || "";
                          const isSelected = currentVal === optKey;
                          const isCorrect = ex.correctAnswers[0] === optKey;

                          let btnClass = "border-slate-850 hover:bg-surface text-slate-300";
                          if (isSelected) {
                            btnClass = "border-sky-500 bg-sky-500/10 text-sky-400";
                          }
                          if (showResult) {
                            if (isCorrect) {
                              btnClass = "border-emerald-600 bg-emerald-950/20 text-emerald-400";
                            } else if (isSelected) {
                              btnClass = "border-rose-600 bg-rose-950/20 text-rose-400";
                            }
                          }

                          return (
                            <button
                              key={option}
                              onClick={() => handleInputChange(ex.id, 0, optKey)}
                              className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-medium transition duration-200 ${btnClass}`}
                            >
                              {option}
                            </button>
                          );
                        })}
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
                        placeholder={ex.placeholder || "Nhập câu tự luận..."}
                        value={userAnswers[`${activePage.pageNumber}-${ex.id}-0`] || ""}
                        onChange={(e) => handleInputChange(ex.id, 0, e.target.value)}
                        className="w-full bg-slate-950 border border-line rounded-xl px-4 py-3 text-xs outline-none focus:border-sky-500 transition duration-200"
                      />
                      
                      {showResult && (
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs space-y-1">
                          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4" /> Hướng dẫn đáp án mẫu:
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
          <div className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-line sticky bottom-0 z-10 shadow-lg max-w-4xl w-full mx-auto">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nộp bài tập</span>
              <p className="text-xs font-bold text-slate-350 mt-0.5">Kiểm tra kết quả làm bài của trang này</p>
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
                className="px-4 py-2 rounded-xl bg-surface border border-line text-slate-400 hover:text-white text-xs font-semibold transition"
              >
                Làm lại trang
              </button>

              <button
                onClick={handleCheckAnswers}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/10 transition active:scale-[0.98]"
              >
                <CheckCircle className="h-4 w-4" /> Kiểm tra đáp án
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
