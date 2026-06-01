"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AITeacherChat from "@/components/AITeacherChat";
import { ChunkCheckpoints } from "@/components/ChunkCheckpoints";
import { getCheckpointsForUnit } from "@/lib/checkpoints";
import type { Lesson, QuizQuestion } from "@/types/database";
import type { IELTSTranscript } from "@/lib/ieltsTranscripts";

import { TranscriptLineExpander } from "@/components/TranscriptLineExpander";
import { VocabFlipCard } from "@/components/VocabFlipCard";
import { SpeakingFollowUpBox } from "@/components/SpeakingFollowUpBox";

import { AriaDebrief } from "@/components/AriaDebrief";

interface Props {
  lesson: Lesson;
  transcript: IELTSTranscript;
  questions: QuizQuestion[];
  /** Student display name — passed from server page for Aria to greet by name */
  studentName?: string;
  backUrl?: string;
}

type SessionPhase = "warmup" | "listen" | "book" | "explore" | "speak" | "check";
const PHASE_ORDER: SessionPhase[] = ["warmup", "listen", "book", "explore", "speak", "check"];

export function ListeningClient({ lesson, transcript, questions, studentName = "bạn", backUrl = "/hoc-tap/mindset-ielts/listening" }: Props) {
  // ── Session Phase State (Replacing old tabs) ──────────────────────────────
  const [sessionPhase, setSessionPhase] = useState<SessionPhase>("warmup");
  const [highestPhase, setHighestPhase] = useState<number>(0);

  const changePhase = (newPhase: SessionPhase) => {
    const newIdx = PHASE_ORDER.indexOf(newPhase);
    if (newIdx <= highestPhase) {
      setSessionPhase(newPhase);
    }
  };

  useEffect(() => {
    const currentIdx = PHASE_ORDER.indexOf(sessionPhase);
    if (currentIdx > highestPhase) {
      setHighestPhase(currentIdx);
    }
  }, [sessionPhase, highestPhase]);

  // Step 1: Chunk checkpoint state
  const [checkpointsDone, setCheckpointsDone] = useState(false);
  const [checkpointsMissed, setCheckpointsMissed] = useState<string[]>([]);

  // Step 3: Speaking state
  const [speakingDone, setSpeakingDone] = useState(false);
  const [chatGptPromptCopied, setChatGptPromptCopied] = useState<boolean>(false);

  const unitNum = parseInt(lesson.title.match(/U(\d+)/i)?.[1] ?? "1", 10);
  const checkpoints = getCheckpointsForUnit(unitNum);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Lesson info for AI context
  const unitNumber = lesson.title.match(/U(\d+)/i)?.[1] ?? "1";
  const sessionInfo = { title: lesson.title, summary: lesson.summary ?? lesson.page_hint ?? "" };
  const handleAnswerSelect = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const submitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_index) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER BACK ROW ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800 shadow backdrop-blur">
        <Link
          href={backUrl}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Học Kỹ Năng Nghe</span>
          <span className="text-xs font-bold text-sky-400">Quay lại Buổi học chính</span>
        </div>
      </div>

      {/* ── PHASE PROGRESS INDICATOR ────────────────────────────────────────── */}
      {sessionPhase !== "warmup" && (
        <div className="flex items-center justify-center gap-3 py-2">
          {(["listen", "book", "explore", "speak", "check"] as const).map((p, idx) => {
            const phases: Record<SessionPhase, number> = { warmup: 0, listen: 1, book: 2, explore: 3, speak: 4, check: 5 };
            const isActive = p === sessionPhase;
            const isDone = phases[sessionPhase] > phases[p];
            const isAccessible = phases[p] <= highestPhase;
            
            return (
              <div key={p} className="flex items-center gap-3">
                <button 
                  onClick={() => isAccessible && changePhase(p)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center gap-1.5 transition-all ${isAccessible ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed opacity-30"}`}
                >
                  <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    isActive ? "bg-sky-500 ring-4 ring-sky-500/20 scale-125" : 
                    isDone ? "bg-emerald-500" : isAccessible ? "bg-sky-900/50" : "bg-slate-800"
                  }`} />
                  <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${
                    isActive ? "text-sky-400" : isDone ? "text-emerald-500" : isAccessible ? "text-sky-900" : "text-slate-600"
                  }`}>
                    {p === 'book' ? 'textbook' : p}
                  </span>
                </button>
                {idx < 4 && <div className={`h-[1px] w-8 sm:w-12 mb-4 transition-colors ${isDone ? "bg-emerald-500/50" : "bg-slate-800"}`} />}
              </div>
            );
          })}
        </div>
      )}

      {/* ── WARMUP PHASE ───────────────────────────────────────────────────── */}
      {sessionPhase === "warmup" && (
        <AITeacherChat
          mode="warmup"
          sessionInfo={sessionInfo}
          studentName={studentName}
          onWarmupComplete={() => setSessionPhase("listen")}
        />
      )}

      {/* ── MAIN SESSION (hidden during warmup) ────────────────────────────── */}
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8 transition-all duration-500 ${
        sessionPhase !== "warmup" ? "opacity-100" : "opacity-0 pointer-events-none select-none h-0 overflow-hidden"
      }`}>
      {/* LEFT COLUMN: Video Player & Step Navigation (Col span 7) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Youtube Embedded Player Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl backdrop-blur-md">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${lesson.youtube_video_id}?autoplay=0&rel=0&modestbranding=1`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            ></iframe>
          </div>
          <div className="p-4 bg-slate-900/40">
            <span className="inline-block rounded bg-sky-950/80 px-2 py-0.5 text-[9px] font-bold text-sky-400 uppercase tracking-wide border border-sky-900/40">
              Unit {unitNumber} · IELTS LISTENING
            </span>
            <h1 className="mt-2 text-xl font-bold text-white leading-tight">
              {lesson.title}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Kiến thức đi kèm giáo trình: <span className="text-sky-400 font-medium">{lesson.page_hint || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* STEP 1 CONTENT: Active Listening — Chunk Checkpoints */}
        {sessionPhase === "listen" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-extrabold text-sky-400 border border-sky-500/20">
                  1
                </span>
                Step 1 — Listen &amp; Check
              </h2>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Watch the video above, then answer the 3 checkpoints below.
                You can replay anytime — there&apos;s no rush. 🎧
              </p>
            </div>

            <ChunkCheckpoints
              checkpoints={checkpoints}
              onComplete={(missed) => {
                setCheckpointsMissed(missed);
                setCheckpointsDone(true);
              }}
            />

            {/* Unlock next step once all checkpoints done */}
            {checkpointsDone && (
              <button
                onClick={() => setSessionPhase("book")}
                className="w-full inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 shadow-lg shadow-emerald-500/15 active:scale-[0.98]"
              >
                Học sách giáo trình 📖 ➔
              </button>
            )}
          </div>
        )}

        {/* STEP 2: TEXTBOOK STUDY */}
        {sessionPhase === "book" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 mb-3">
                📖 TEXTBOOK STUDY STEP
              </span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Bài tập bám sát sách giáo trình
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yêu cầu bắt buộc: Học sinh kết hợp mở sách giấy Mindset for IELTS để hoàn thành bài tập nghe.
              </p>
            </div>

            {/* Instruction cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">BƯỚC A: MỞ SÁCH LÀM BÀI</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Em hãy mở sách giáo trình Mindset for IELTS tại phần Listening: <strong className="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{lesson.page_hint || `Unit ${unitNum}`}</strong>. Đọc lý thuyết và hoàn thành các bài tập nghe trong sách.
                </p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">BƯỚC B: CHẤM BÀI CÙNG AI</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Sao chép câu lệnh (Prompt) chuẩn ở bên dưới và mở ChatGPT/Claude (hoặc AI Teacher ở cột bên phải) để được chấm điểm và sửa lỗi bài tập nghe trong sách chi tiết.
                </p>
              </div>
            </div>

            {/* ChatGPT Prompt box */}
            {(() => {
              const pageNumStr = lesson.page_hint || `Unit ${unitNum}`;
              const chatGptPrompt = `Hãy đóng vai là một giáo viên dạy IELTS chuyên nghiệp. Hãy hướng dẫn tôi học sách Mindset for IELTS phần Listening ${pageNumStr} có chủ đề "${lesson.title}". Hãy đưa ra 3 bài tập nhỏ bám sát nội dung này, sau đó chấm điểm và sửa lỗi ngữ pháp một cách chi tiết cho tôi bằng tiếng Việt nhé!`;

              return (
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prompt chuẩn gửi ChatGPT / AI bên ngoài:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(chatGptPrompt);
                        setChatGptPromptCopied(true);
                        setTimeout(() => setChatGptPromptCopied(false), 2000);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 ${
                        chatGptPromptCopied ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {chatGptPromptCopied ? "✓ Đã sao chép!" : "Copy Prompt"}
                    </button>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 text-xs text-slate-300 font-mono select-all leading-relaxed whitespace-pre-wrap">
                    {chatGptPrompt}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="https://chatgpt.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
                    >
                      🌐 Mở ChatGPT ➔
                    </a>
                    <a
                      href="https://claude.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition text-[11px] flex items-center gap-1.5 shadow-md shadow-amber-600/10"
                    >
                      🌐 Mở Claude AI ➔
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Submit completion */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-white text-sm">Đã hoàn thành làm bài nghe trong sách?</p>
                <p className="text-[11px] text-slate-500">Nhấn nút bên cạnh để chuyển sang phần dịch câu và từ vựng.</p>
              </div>
              <button 
                onClick={() => setSessionPhase("explore")}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-555 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-1.5 shadow-lg shadow-emerald-600/25 shrink-0"
              >
                Tiếp tục học ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT: EXPLORE — Bilingual Transcript */}
        {sessionPhase === "explore" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-400 border border-emerald-500/20">
                  2
                </span>
                Phase 2 — Discover & Practice
              </h2>
              <button
                onClick={() => setSessionPhase("speak")}
                className="inline-flex min-h-[32px] items-center justify-center rounded-lg bg-emerald-600 px-3.5 text-[11px] font-semibold text-white transition hover:bg-emerald-500"
              >
                Your turn to speak 🗣️ ➔
              </button>
            </div>

            <div className="rounded-xl bg-emerald-950/20 border border-emerald-950/50 p-4 text-xs text-emerald-300 leading-relaxed">
              <p className="font-semibold">🎯 Mục tiêu:</p>
              <p className="mt-1 text-slate-300">
                Nhấn **Play** video và nghe lại lần thứ hai. Lần này, em hãy đối chiếu âm thanh nghe được với bản **Transcript tiếng Anh** dưới đây. Đọc bản dịch tiếng Việt để bổ sung chính xác ý nghĩa các câu phức tạp.
              </p>
            </div>

            {/* Side-by-side Bilingual Transcript Panel */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {transcript.lines.map((line, idx) => (
                <TranscriptLineExpander
                  key={idx}
                  index={idx}
                  english={line.english}
                  vietnamese={line.vietnamese}
                  keyPhrase={line.keyPhrase}
                  phraseNote={line.phraseNote}
                />
              ))}
            </div>

            {/* Key Vocabulary Analysis card */}
            <div className="border-t border-slate-800 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                📚 TỪ VỰNG TIÊU ĐIỂM (Tap to Flip)
              </h3>
              <div className="mt-3 grid gap-3 grid-cols-2 sm:grid-cols-3">
                {transcript.keyVocabulary.map((vocab) => (
                  <VocabFlipCard
                    key={vocab.word}
                    word={vocab.word}
                    meaning={vocab.meaning}
                    pronunciation={vocab.pronunciation}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3 CONTENT: SPEAK — Speaking & Shadowing */}
        {sessionPhase === "speak" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-extrabold text-indigo-400 border border-indigo-500/20">
                  3
                </span>
                Phase 3 — Speaking & Shadowing
              </h2>
              <button
                onClick={() => setSessionPhase("check")}
                className="inline-flex min-h-[32px] items-center justify-center rounded-lg bg-indigo-600 px-3.5 text-[11px] font-semibold text-white transition hover:bg-indigo-500"
              >
                Go to Final Quiz ➔
              </button>
            </div>

            <div className="rounded-xl bg-indigo-950/20 border border-indigo-950/50 p-4 text-xs text-indigo-300 leading-relaxed">
              <p className="font-semibold">🎯 Mục tiêu:</p>
              <p className="mt-1 text-slate-300">
                Hãy nghe lại lần thứ ba. Bấm **Play** video, nhấp **Tạm dừng (Pause)** sau mỗi câu ngắn và tự nói nhại theo to, rõ ràng. Sau đó, hãy thực hành trả lời câu hỏi của Coach Aria dưới đây.
              </p>
            </div>

            <SpeakingFollowUpBox
              studentName={studentName}
              lessonTitle={lesson.title}
              lessonSummary={lesson.summary || ""}
              struggledWords={checkpointsMissed}
              onComplete={() => setSpeakingDone(true)}
            />

            {speakingDone && (
              <button
                onClick={() => setSessionPhase("check")}
                className="w-full inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 text-sm font-semibold text-white transition hover:bg-amber-500 shadow-lg shadow-amber-500/15 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                Ready for a quick check? ⚡
              </button>
            )}
          </div>
        )}

        {/* PHASE 4 CONTENT: CHECK — Comprehension Quiz */}
        {sessionPhase === "check" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-extrabold text-amber-400 border border-amber-500/20">
                ✓
              </span>
              Phase 4 — Final Check
            </h2>

            {quizSubmitted ? (
              <AriaDebrief
                score={quizScore}
                total={questions.length}
                studentName={studentName}
                lessonTitle={lesson.title}
                unitId={`unit-${unitNumber}`}
                onRestart={restartQuiz}
              />
            ) : (
              <div className="space-y-5">
                {/* Progress bar */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-slate-400">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    {Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question body card */}
                {questions[currentQuestionIdx] && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5 space-y-4">
                      <h3 className="text-sm font-bold text-white leading-relaxed">
                        {questions[currentQuestionIdx].question}
                      </h3>
                      <div className="grid gap-2">
                        {questions[currentQuestionIdx].options.map((option, oIdx) => {
                          const qId = questions[currentQuestionIdx].id;
                          const isSelected = selectedAnswers[qId] === oIdx;
                          const hasAnswered = selectedAnswers[qId] !== undefined;
                          const isCorrect = oIdx === questions[currentQuestionIdx].correct_index;
                          
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(qId, oIdx)}
                              disabled={hasAnswered}
                              className={`w-full rounded-xl border p-3.5 text-left text-xs font-medium transition flex items-center justify-between ${
                                hasAnswered
                                  ? isCorrect
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                    : isSelected
                                      ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                                      : "border-slate-800/50 bg-slate-900/10 text-slate-600"
                                  : "border-slate-800/80 bg-slate-900/20 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50"
                              }`}
                            >
                              <span>{option}</span>
                              {hasAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                              {hasAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Immediate Explanation */}
                    {selectedAnswers[questions[currentQuestionIdx].id] !== undefined && (
                      <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Explanation</p>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          {questions[currentQuestionIdx].explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center justify-end gap-4 pt-2">
                  {selectedAnswers[questions[currentQuestionIdx].id] !== undefined && (
                    <button
                      onClick={currentQuestionIdx < questions.length - 1 ? handleNextQuestion : submitQuiz}
                      className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 text-xs font-bold text-white transition hover:bg-amber-500 shadow-lg shadow-amber-600/15 active:scale-95"
                    >
                      {currentQuestionIdx < questions.length - 1 ? "Next Challenge ➔" : "See my results! 🏆"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Interactive Vocabulary Review & Explanations (Col span 5) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Unit metadata script card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-5 shadow-xl backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            📰 TÓM TẮT CHỦ ĐỀ NGHE
          </h3>
          <p className="mt-3 text-xs text-slate-300 leading-relaxed">
            {transcript.description}
          </p>
          <div className="mt-4 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3.5">
            <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">🎯 Mẹo Luyện Thi Nghe:</h4>
            <ul className="mt-2 text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1">
              <li>Chú ý các số từ, tên riêng hay ngày tháng được phát âm.</li>
              <li>Chữ viết hoa cần ghi nhận rõ trong phần điền từ.</li>
              <li>Cẩn thận bẫy (distractor) người nói tự sửa lỗi chính mình.</li>
            </ul>
          </div>
        </div>

        {/* Dynamic explanations panel if quiz is submitted */}
        {quizSubmitted && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-5 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              📖 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const isCorrect = selectedAnswers[q.id] === q.correct_index;
                return (
                  <div key={q.id} className={`p-3.5 rounded-xl border ${isCorrect ? "border-emerald-950 bg-emerald-950/10" : "border-rose-950 bg-rose-950/10"}`}>
                    <p className="text-[11px] font-bold text-white">Q{idx + 1}: {q.question}</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Lựa chọn của em: <span className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{q.options[selectedAnswers[q.id]] || "N/A"}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      Đáp án đúng: <span className="text-emerald-400 font-bold">{q.options[q.correct_index]}</span>
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5 italic">
                      🔍 Giải thích: {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
