"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { sbtUnit1Data, SBTSection, SBTExercise, SBTQuestion } from "@/lib/data/sbtUnit1Data";
import { sbtUnit2Data } from "@/lib/data/sbtUnit2Data";
import { sbtPageMap } from "@/lib/data/sbtPageMap";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  CheckCircle,
  HelpCircle,
  Eye,
  EyeOff,
  BookOpen,
  Trophy,
  Activity,
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { saveExamResult } from "@/app/(app)/test-assessment/actions";

interface SBTWorkbookClientProps {
  examId: string;
  examTitle: string;
  subjectSlug?: string;
}

const getInitialSectionKey = (title: string, id: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("practice 1") || lowerTitle.includes("đề 1") || id === "d8dd24e6-adc1-4fe0-9021-3e61bfa995df") return "pronunciation";
  if (lowerTitle.includes("practice 2") || lowerTitle.includes("đề 2") || id === "1823bca6-6f57-43b4-af62-5c875b74c84c") return "vocabulary-grammar";
  if (lowerTitle.includes("practice 3") || lowerTitle.includes("đề 3") || id === "cde839b8-d96c-4f75-b4a5-542c1d5844de") return "vocabulary-grammar";
  if (lowerTitle.includes("practice 4") || lowerTitle.includes("đề 4") || id === "2742665c-51fa-4fa7-bce6-37ea043da718") return "speaking";
  if (lowerTitle.includes("practice 5") || lowerTitle.includes("đề 5") || id === "cda3773f-47af-4803-be3a-e2fab0ea2b0d") return "reading";
  if (lowerTitle.includes("practice 6") || lowerTitle.includes("đề 6") || id === "af6fc024-ff2c-4010-b44a-cff41e7d26d1") return "writing";
  return "pronunciation"; // default fallback
};

export default function SBTWorkbookClient({
  examId,
  examTitle,
  subjectSlug = "tieng_anh"
}: SBTWorkbookClientProps) {
  // Determine which Unit we are viewing
  const unitNumber = examTitle.toLowerCase().includes("unit 2") || examTitle.toLowerCase().includes("chương 2") || examId.includes("unit-2") || examTitle.toLowerCase().includes("lành mạnh") || examTitle.toLowerCase().includes("living") ? 2 : 1;
  const workbookData = unitNumber === 2 ? sbtUnit2Data : sbtUnit1Data;
  const pagesList = unitNumber === 2 ? [10, 11, 12, 13, 14, 15] : [3, 4, 5, 6, 7, 8];
  const minPage = pagesList[0];
  const maxPage = pagesList[pagesList.length - 1];

  // Active Section initialized based on Practice number
  const [activeSectionKey, setActiveSectionKey] = useState<string>(() => 
    getInitialSectionKey(examTitle, examId)
  );
  
  // Scanned page number initialized based on active section
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const initialKey = getInitialSectionKey(examTitle, examId);
    const section = workbookData.find(s => s.key === initialKey);
    return section && section.exercises.length > 0 ? section.exercises[0].pageNumber : minPage;
  });
  
  // Zoom level for iframe container
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Form answer state
  // Key format: `questionId` -> user string response
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Exercise check state: exerciseId -> boolean (whether checked)
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  
  // Question show key state: questionId -> boolean
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  // Workbook completion state
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [scoreMetrics, setScoreMetrics] = useState<{
    correctCount: number;
    totalCount: number;
    score: number;
  } | null>(null);

  // Find active section structure
  const activeSection = workbookData.find(s => s.key === activeSectionKey) || workbookData[0];

  // Sync tab switching to update Left Page Number
  const handleSectionTabChange = (key: string) => {
    setActiveSectionKey(key);
    const section = workbookData.find(s => s.key === key);
    if (section && section.exercises.length > 0) {
      // Set to first exercise's page number
      setCurrentPage(section.exercises[0].pageNumber);
    }
  };

  // Helper to handle simple text check
  const isQuestionCorrect = (q: SBTQuestion, userAns: string) => {
    if (!userAns) return false;
    const normalizedUser = userAns.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return q.correctAnswers.some(ans => {
      const normalizedAns = ans.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      return normalizedUser === normalizedAns;
    });
  };

  // Check answers for a single exercise
  const handleCheckExercise = (exercise: SBTExercise) => {
    setCheckedExercises(prev => ({ ...prev, [exercise.id]: true }));
    
    // Check if all in this exercise are correct to show micro-confetti
    let allCorrect = true;
    exercise.questions.forEach(q => {
      if (!isQuestionCorrect(q, answers[q.id] || "")) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.7 }
      });
    }
  };

  // Reset exercise state
  const handleResetExercise = (exercise: SBTExercise) => {
    setCheckedExercises(prev => ({ ...prev, [exercise.id]: false }));
    const newAnswers = { ...answers };
    const newShowKeys = { ...showKeys };
    exercise.questions.forEach(q => {
      delete newAnswers[q.id];
      delete newShowKeys[q.id];
    });
    setAnswers(newAnswers);
    setShowKeys(newShowKeys);
  };

  // Handle entire workbook submit
  const handleSubmitWorkbook = () => {
    let totalQuestions = 0;
    let correctCount = 0;

    workbookData.forEach(section => {
      section.exercises.forEach(ex => {
        ex.questions.forEach(q => {
          totalQuestions++;
          if (isQuestionCorrect(q, answers[q.id] || "")) {
            correctCount++;
          }
        });
      });
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    setScoreMetrics({
      correctCount,
      totalCount: totalQuestions,
      score
    });

    // Save state using Supabase action / localStorage
    if (examId) {
      try {
        const completedExams = JSON.parse(localStorage.getItem('completed_exams') || '[]');
        if (!completedExams.includes(examId)) {
          completedExams.push(examId);
          localStorage.setItem('completed_exams', JSON.stringify(completedExams));
        }
        
        saveExamResult(examId, correctCount, totalQuestions);
        
        // Track completed events
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'quiz_completed',
            subject_slug: subjectSlug,
            metadata: {
              quiz_id: examId,
              score,
              total: totalQuestions
            }
          })
        }).catch(console.error);

      } catch (e) {
        console.error("Failed to save progress", e);
      }
    }

    setIsCompleted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 bg-[#0f172a] border-b border-slate-800 shadow-lg gap-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-350 hover:text-white transition-all text-xs font-semibold"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại
          </button>
          <div className="h-5 w-[1px] bg-slate-800 hidden sm:block"></div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-sky-400" /> {examTitle}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Tiếng Anh 7 • Sách Bài Tập (SBT) • Split-screen Workbook</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 max-w-full overflow-x-auto">
          {workbookData.map(sec => (
            <button
              key={sec.key}
              onClick={() => handleSectionTabChange(sec.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                activeSectionKey === sec.key
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/10 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>{sec.icon}</span>
              <span className="hidden md:inline">{sec.title.split('. ')[1]}</span>
              <span className="md:hidden">{sec.title.split('. ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleSubmitWorkbook}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center gap-2 transform active:scale-95"
          >
            <CheckCircle className="h-4 w-4" /> Nộp Bài Workbook
          </button>
        </div>
      </header>

      {/* ── MAIN LAYOUT ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* LEFT PANEL: Textbook Scanned Page Viewer */}
        <div className={`flex-1 flex flex-col bg-slate-950 border-r border-slate-800 transition-all duration-500 ${
          isFullscreen ? "fixed inset-0 z-50 p-4" : "h-full"
        }`}>
          {/* Controls Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-900/80 border-b border-slate-850 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5" /> Quét Sách SBT: Trang {currentPage}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* Manual Page Buttons */}
              <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 mr-2">
                {pagesList.map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentPage === p 
                        ? "bg-slate-800 text-white border border-slate-700" 
                        : "text-slate-500 hover:text-slate-350"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setZoomScale(prev => Math.max(0.6, prev - 0.15))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-400 min-w-[40px] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale(prev => Math.min(2.5, prev + 0.15))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viewport Container */}
          <div className="flex-1 overflow-auto relative w-full h-full bg-[#121824] flex items-center justify-center p-4">
            <div 
              className="transition-transform duration-300 flex items-center justify-center"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: "center center"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={sbtPageMap[currentPage] ? `https://lh3.googleusercontent.com/d/${sbtPageMap[currentPage]}` : `/book/sbt_tienganh_07/page_${String(currentPage).padStart(3, '0')}.png`}
                alt={`Workbook Page ${currentPage}`}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-xl border border-slate-800"
              />
            </div>
            
            {/* Prev/Next Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between pointer-events-none z-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(minPage, prev - 1))}
                disabled={currentPage === minPage}
                className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-850 text-white shadow-xl pointer-events-auto transition border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(maxPage, prev + 1))}
                disabled={currentPage === maxPage}
                className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-850 text-white shadow-xl pointer-events-auto transition border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Workbook Interactive Form Workspace */}
        <div className="flex-1 flex flex-col bg-[#0e1322] overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">INTERACTIVE WORKBOOK WORKSPACE</span>
            <h2 className="text-xl font-extrabold text-white mt-1">{activeSection.title}</h2>
          </div>

          <div className="space-y-8">
            {activeSection.exercises.map((exercise) => {
              const isChecked = checkedExercises[exercise.id] || false;
              
              return (
                <div key={exercise.id} className="p-6 rounded-2xl bg-[#141b2e] border border-slate-800 shadow-xl space-y-6 relative overflow-hidden transition-all duration-300 hover:border-slate-700/80">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{exercise.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 font-medium italic">{exercise.instruction}</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-350 px-2.5 py-1 rounded-lg font-bold border border-slate-750">
                      Trang {exercise.pageNumber}
                    </span>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-6">
                    {exercise.questions.map((q) => {
                      const userAns = answers[q.id] || "";
                      const showKey = showKeys[q.id] || false;
                      const isCorrect = isQuestionCorrect(q, userAns);

                      return (
                        <div key={q.id} className="space-y-3">
                          <p className="text-xs font-semibold text-slate-200">{q.questionText}</p>
                          
                          {/* Question Inputs according to Type */}
                          {q.type === "multiple-choice" && q.options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map(option => {
                                // Extract choice ID (usually A, B, C or first character)
                                const choiceLetter = option.trim().charAt(0);
                                const isSelected = userAns === choiceLetter;
                                
                                return (
                                  <button
                                    key={option}
                                    disabled={isChecked}
                                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: choiceLetter }))}
                                    className={`px-4 py-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                                      isSelected
                                        ? "bg-sky-500/10 border-sky-500 text-sky-400"
                                        : "bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-850 hover:border-slate-700"
                                    } disabled:cursor-not-allowed`}
                                  >
                                    <span>{option}</span>
                                    {isSelected && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="text"
                                disabled={isChecked}
                                placeholder="Nhập câu trả lời của bạn..."
                                value={userAns}
                                onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                className="w-full bg-[#0a0d16] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-all font-medium disabled:opacity-75 disabled:cursor-not-allowed"
                              />
                            </div>
                          )}

                          {/* Instant Feedback & Helper Display */}
                          {isChecked && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
                              <div className="flex items-center gap-2">
                                {isCorrect ? (
                                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" /> Chính xác
                                  </span>
                                ) : (
                                  <span className="text-rose-400 font-extrabold flex items-center gap-1">
                                    ✕ Chưa đúng
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2.5">
                                {q.hint && (
                                  <button
                                    onClick={() => alert(`Gợi ý: ${q.hint}`)}
                                    className="text-slate-400 hover:text-slate-200 transition text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <HelpCircle className="h-3.5 w-3.5" /> Xem gợi ý
                                  </button>
                                )}

                                <button
                                  onClick={() => setShowKeys(prev => ({ ...prev, [q.id]: !showKey }))}
                                  className="text-sky-400 hover:text-sky-300 transition text-[10px] font-bold flex items-center gap-1"
                                >
                                  {showKey ? (
                                    <>
                                      <EyeOff className="h-3.5 w-3.5" /> Ẩn đáp án
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3.5 w-3.5" /> Xem đáp án
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {isChecked && showKey && (
                            <div className="p-3 bg-indigo-950/40 border border-indigo-900/50 rounded-xl text-xs text-indigo-300 font-bold">
                              Đáp án đúng: {q.correctAnswers.join(" hoặc ")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions for the single exercise */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    {isChecked ? (
                      <button
                        onClick={() => handleResetExercise(exercise)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition text-xs font-bold"
                      >
                        Làm Lại
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCheckExercise(exercise)}
                        className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition text-xs font-bold shadow-md shadow-sky-600/10"
                      >
                        Kiểm Tra Đáp Án
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Finish Trigger */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-slate-900 border border-indigo-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" /> Hoàn thành tất cả các phần?
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-medium">Bấm nộp bài để lưu tiến trình và kiểm tra tổng điểm workbook của bạn.</p>
            </div>
            <button
              onClick={handleSubmitWorkbook}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 transform active:scale-95 whitespace-nowrap"
            >
              Nộp Bài Workbook <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── CONGRATULATIONS OVERLAY ────────────────────────────────────── */}
      {isCompleted && scoreMetrics && (
        <div className="fixed inset-0 z-55 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#121824] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500"></div>
            
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-6">
              <Award className="h-10 w-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-white">Workbook Completed!</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">Bạn đã hoàn thành bài tập Unit 1 với kết quả:</p>

            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Số Câu Đúng</span>
                <span className="text-lg font-black text-emerald-400 mt-1 block">{scoreMetrics.correctCount} / {scoreMetrics.totalCount}</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Điểm Số</span>
                <span className="text-lg font-black text-sky-400 mt-1 block">{scoreMetrics.score}%</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Trạng Thái</span>
                <span className="text-lg font-black text-amber-400 mt-1 block">Đạt</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsCompleted(false);
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs transition border border-slate-700"
              >
                Xem Lại Bài Làm
              </button>
              <button
                onClick={() => {
                  window.history.back(); // Go back to the dashboard/lessons map
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-sky-500/20"
              >
                Trở Về Trang Luyện Tập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
