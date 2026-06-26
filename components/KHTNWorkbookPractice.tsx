"use client";

import { useState, useMemo } from "react";
import { Send, CheckCircle, AlertCircle, Book } from "lucide-react";
import clsx from "clsx";
import workbookData from "@/content/khtn-7-workbook.json";

interface KHTNWorkbookPracticeProps {
  lessonSlug: string;
  currentBookPage?: number;
  onComplete?: (score: number, total: number) => void;
}

export function KHTNWorkbookPractice({
  lessonSlug,
  currentBookPage = 0,
  onComplete,
}: KHTNWorkbookPracticeProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [answerResults, setAnswerResults] = useState<Record<string, boolean>>({});

  // Get lesson data
  const lessonData = useMemo(() => {
    const data = (workbookData as any)[lessonSlug];
    return data || null;
  }, [lessonSlug]);

  // Filter questions to show only those from current book page
  const questions = useMemo(() => {
    const allQuestions = lessonData?.questions || [];
    // If currentBookPage is provided and > 0, filter by bookPage
    if (currentBookPage > 0) {
      return allQuestions.filter((q: any) => q.bookPage === currentBookPage);
    }
    return allQuestions;
  }, [lessonData, currentBookPage]);

  // Reset question index when questions list changes
  useMemo(() => {
    setCurrentQuestionIdx(0);
  }, [questions.length]);

  const currentQuestion = questions[currentQuestionIdx];

  const handleAnswerChange = (value: string, index?: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index !== undefined ? String(index) : value,
    }));
  };

  const handleCheckAnswer = () => {
    if (answers[currentQuestion.id] !== undefined) {
      let isCorrect = false;

      if (currentQuestion.correctAnswer) {
        const userAnswer = answers[currentQuestion.id];
        const correctAnswer = currentQuestion.correctAnswer.trim();

        // For multiple choice: convert letter answer to index
        if (currentQuestion.type === 'multiple_choice' && currentQuestion.options?.length > 0) {
          const answerIndex = parseInt(userAnswer);
          const letterToIndex = (letter: string) => {
            const idx = letter.charCodeAt(0) - 'A'.charCodeAt(0);
            return Math.max(0, Math.min(idx, currentQuestion.options.length - 1));
          };

          // If correctAnswer is a letter (A, B, C, D), convert to index
          if (correctAnswer.match(/^[A-D]$/)) {
            const correctIndex = letterToIndex(correctAnswer);
            isCorrect = answerIndex === correctIndex;
          } else {
            // Otherwise compare directly
            isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
          }
        } else {
          // For essay/text answers, compare directly
          isCorrect = answers[currentQuestion.id].toLowerCase().trim() === correctAnswer.toLowerCase();
        }
      } else {
        isCorrect = true; // If no correctAnswer defined, assume correct
      }

      setCheckedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: true,
      }));

      setAnswerResults((prev) => ({
        ...prev,
        [currentQuestion.id]: isCorrect,
      }));
    }
  };

  const handleSubmitQuestion = () => {
    if (answers[currentQuestion.id]) {
      // Move to next question
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
        // Clear check state for new question
        setCheckedAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: false,
        }));
      } else {
        // All questions answered, show summary
        setSubmitted(true);
        const score = Object.keys(answers).length;
        onComplete?.(score, questions.length);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
  };

  const progressPercent =
    questions.length > 0
      ? Math.round(((currentQuestionIdx + 1) / questions.length) * 100)
      : 0;

  const answeredCount = Object.keys(answers).length;

  // Render different UI based on state
  if (!lessonData) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>Không tìm thấy bài tập cho bài học này</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="h-full bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-800">
        <CheckCircle size={64} className="text-emerald-500 mb-6" />
        <h2 className="text-3xl font-black text-white mb-2">
          Hoàn Thành!
        </h2>
        <p className="text-slate-400 mb-8 text-lg">
          Bạn đã hoàn thành {answeredCount} câu hỏi
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
        >
          Làm Lại
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Book size={20} className="text-cyan-400" />
          <h2 className="text-xl font-black text-white">
            {lessonData.title}
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Câu {currentQuestionIdx + 1} / {questions.length}
        </p>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="flex-1 overflow-y-auto mb-6">
          <div className={clsx(
            "bg-slate-800/50 rounded-xl p-5 border transition-colors",
            checkedAnswers[currentQuestion.id] ? "border-amber-600 bg-amber-900/20" : "border-slate-700"
          )}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-slate-300">
                Câu {currentQuestion.id}
              </p>
              {checkedAnswers[currentQuestion.id] && (
                <span className="text-xs font-bold text-amber-300 bg-amber-900/40 px-2 py-1 rounded">
                  Đã check đáp án
                </span>
              )}
            </div>
            <p className="text-white mb-6 leading-relaxed">
              {currentQuestion.text}
            </p>

            {/* Answer Options */}
            {currentQuestion.type === "multiple_choice" && (
              <div className="space-y-2">
                {currentQuestion.options?.map(
                  (option: string, idx: number) => (
                    <label
                      key={idx}
                      className={clsx(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                        answers[currentQuestion.id] === String(idx)
                          ? "bg-blue-600 border-2 border-blue-400"
                          : "bg-slate-700 border-2 border-transparent hover:bg-slate-600"
                      )}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={String(idx)}
                        checked={answers[currentQuestion.id] === String(idx)}
                        onChange={() => handleAnswerChange(option, idx)}
                        className="w-4 h-4"
                      />
                      <span className="text-white font-medium">{option}</span>
                    </label>
                  )
                )}
              </div>
            )}

            {(currentQuestion.type === "true_false" ||
              (currentQuestion.type === "multiple_choice" && currentQuestion.options?.length === 0)) && (
              <div className="grid grid-cols-2 gap-2">
                {["Đúng", "Sai"].map((option, idx) => (
                  <label
                    key={option}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-center",
                      answers[currentQuestion.id] === option
                        ? "bg-blue-600 border-2 border-blue-400"
                        : "bg-slate-700 border-2 border-transparent hover:bg-slate-600"
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={() => handleAnswerChange(option)}
                      className="w-4 h-4"
                    />
                    <span className="text-white font-medium flex-1">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "matching" && (
              <div className="space-y-2">
                {currentQuestion.matchingItems?.map(
                  (item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-white font-bold w-8">
                        {item}
                      </span>
                      <input
                        type="text"
                        placeholder="Nhập câu trả lời..."
                        value={
                          answers[`${currentQuestion.id}_${item}`] || ""
                        }
                        onChange={(e) => {
                          setAnswers((prev) => ({
                            ...prev,
                            [`${currentQuestion.id}_${item}`]: e.target.value,
                          }));
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {(currentQuestion.type === "essay" || (currentQuestion.type !== "multiple_choice" && currentQuestion.type !== "true_false" && currentQuestion.optionsCount === 0)) && (
              <div className="space-y-3">
                {currentQuestion.problem && (
                  <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
                    <p className="text-slate-300 text-sm whitespace-pre-wrap">
                      {currentQuestion.problem}
                    </p>
                  </div>
                )}
                {currentQuestion.subItems && currentQuestion.subItems.length > 0 && (
                  <div className="bg-slate-700 p-3 rounded-lg border border-slate-600 space-y-2">
                    {currentQuestion.subItems.map((item: string, idx: number) => (
                      <p key={idx} className="text-slate-300 text-sm">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
                <textarea
                  placeholder="Viết câu trả lời của bạn tại đây..."
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  disabled={checkedAnswers[currentQuestion.id]}
                  className="w-full px-3 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-cyan-400 focus:outline-none min-h-[100px] resize-none disabled:opacity-50"
                />
                {checkedAnswers[currentQuestion.id] && (
                  <div className={clsx(
                    "p-3 rounded-lg border-2 text-sm font-bold flex items-center gap-2",
                    answerResults[currentQuestion.id]
                      ? "bg-emerald-900/30 border-emerald-600 text-emerald-300"
                      : "bg-red-900/30 border-red-600 text-red-300"
                  )}>
                    {answerResults[currentQuestion.id] ? (
                      <>
                        <CheckCircle size={18} />
                        Đúng!
                      </>
                    ) : (
                      <>
                        <AlertCircle size={18} />
                        Sai. Đáp án: {currentQuestion.correctAnswer}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIdx === 0}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Câu Trước
        </button>

        <button
          onClick={handleCheckAnswer}
          disabled={!answers[currentQuestion?.id] || checkedAnswers[currentQuestion?.id]}
          className="flex-1 px-4 py-3 rounded-xl border border-amber-600 text-amber-300 font-bold hover:bg-amber-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ✓ Check
        </button>

        <button
          onClick={handleSubmitQuestion}
          disabled={!answers[currentQuestion?.id]}
          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {currentQuestionIdx === questions.length - 1 ? "Hoàn Thành" : "Câu Tiếp →"}
        </button>
      </div>

      {/* Answered Count */}
      <p className="text-center text-slate-400 text-xs mt-4">
        Đã trả lời: {answeredCount} / {questions.length}
      </p>
    </div>
  );
}
