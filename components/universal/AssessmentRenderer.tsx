"use client";

import React, { useState } from 'react';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import { TapWordRenderer } from './TapWordRenderer';
import { SentenceReorderRenderer } from './SentenceReorderRenderer';
import { MatchPairRenderer } from './MatchPairRenderer';

interface AssessmentRendererProps {
  questions: any[];
  mode: 'practice' | 'quiz' | 'exam' | 'review' | 'challenge';
  onComplete: (answers: any[]) => void;
}

export function AssessmentRenderer({ questions, mode, onComplete }: AssessmentRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (isCorrect: boolean, answerValue: string) => {
    const newAnswers = [...answers, { ...currentQuestion, isCorrect, answerValue }];
    setAnswers(newAnswers);
    setHasAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasAnswered(false);
    } else {
      onComplete(answers);
    }
  };

  if (!currentQuestion) return null;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceRenderer
            key={`mc-${currentIndex}`}
            question={currentQuestion.question}
            options={currentQuestion.options}
            correctIndex={
                currentQuestion.correct_index !== undefined 
                ? currentQuestion.correct_index 
                : currentQuestion.options?.indexOf(currentQuestion.correctOption)
            }
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'tap_correct_word':
      case 'vocab_to_word':
      case 'fill_blank':
        const mcQuestion = [currentQuestion.instruction, currentQuestion.question].filter(Boolean).join('\n');
        const mcChoices = currentQuestion.choices || [];
        const mcCorrectIndex = mcChoices.indexOf(currentQuestion.correct_word || currentQuestion.correct_answer);
        return (
          <MultipleChoiceRenderer
            key={`mc-norm-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'tap_word':
        return (
          <TapWordRenderer
            key={`tw-${currentIndex}`}
            instruction={currentQuestion.instruction}
            words={currentQuestion.words}
            correctWord={currentQuestion.correctWord}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'sentence_reorder':
        return (
          <SentenceReorderRenderer
            key={`sr-${currentIndex}`}
            instruction={currentQuestion.instruction || 'Sắp xếp lại câu:'}
            words={currentQuestion.words}
            correctSentence={currentQuestion.correct_sentence}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'match_pair':
        return (
          <MatchPairRenderer
            key={`mp-${currentIndex}`}
            instruction={currentQuestion.instruction || 'Nối cặp từ phù hợp:'}
            pairs={currentQuestion.pairs}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'sentence_reorder':
        return (
          <SentenceReorderRenderer
            instruction={currentQuestion.instruction || 'Sắp xếp lại câu:'}
            words={currentQuestion.words}
            correctSentence={currentQuestion.correct_sentence}
            onAnswer={handleAnswer}
          />
        );
      case 'match_pair':
        return (
          <MatchPairRenderer
            instruction={currentQuestion.instruction || 'Nối cặp từ phù hợp:'}
            pairs={currentQuestion.pairs}
            onAnswer={handleAnswer}
          />
        );
      default:
        return (
          <div className="text-center p-8 bg-slate-800 rounded-xl text-slate-400">
            Unsupported question type: {currentQuestion.type}
            <button 
              onClick={() => handleAnswer(true, "skipped")}
              className="mt-4 block w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white"
            >
              Skip
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-semibold text-slate-400">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-emerald-400 font-bold bg-slate-800 px-3 py-1 rounded-lg">
            ⭐ Score: {answers.filter(a => a.isCorrect).length * 10}
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full mb-4 overflow-hidden">
        <div 
          className="bg-sky-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1">
        {renderQuestion()}
      </div>

      {hasAnswered && (
        <div className="mt-4 border-t border-slate-700 pt-4">
          <button 
            onClick={handleNext}
            className="w-full py-3 bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-[0_4px_0_rgb(16,185,129)] active:translate-y-[4px] active:shadow-none hover:bg-emerald-400 transition-all"
          >
            {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
          </button>
        </div>
      )}
    </div>
  );
}
