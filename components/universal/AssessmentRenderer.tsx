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

  const playSound = (isCorrect: boolean) => {
    try {
      // Free open-source sounds (placeholder URLs, in production these should be in public/audio/)
      const audioUrl = isCorrect 
        ? 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg' // Correct (Boing/Ding)
        : 'https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell_decline.ogg'; // Incorrect (Bonk)
      const audio = new Audio(audioUrl);
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch(e) {}
  };

  const handleAnswer = (isCorrect: boolean, answerValue: string) => {
    playSound(isCorrect);
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
      case 'tap_correct_answer':
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
      case 'tap_word': {
        const words = currentQuestion.words || currentQuestion.choices || [];
        const correctWord = currentQuestion.correctWord || currentQuestion.correct_word || '';
        const instructionText = currentQuestion.instruction || "Chọn từ đúng nghĩa";
        const instruction = currentQuestion.target_word ? `${instructionText}: "${currentQuestion.target_word}"` : instructionText;
        return (
          <TapWordRenderer
            key={`tw-${currentIndex}`}
            instruction={instruction}
            words={words}
            correctWord={correctWord}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'sentence_reorder': {
        const words = currentQuestion.words || currentQuestion.parts || [];
        return (
          <SentenceReorderRenderer
            key={`sr-${currentIndex}`}
            instruction={currentQuestion.instruction || 'Sắp xếp lại câu:'}
            words={words}
            correctSentence={currentQuestion.correct_sentence}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
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
      case 'word_problem': {
        const mcQuestion = [currentQuestion.story, currentQuestion.question].filter(Boolean).join('\n');
        const mcChoices = currentQuestion.choices || [];
        const mcCorrectIndex = mcChoices.indexOf(currentQuestion.correct_answer);
        return (
          <MultipleChoiceRenderer
            key={`wp-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'true_false': {
        const mcQuestion = currentQuestion.statement;
        const mcChoices = ["Đúng", "Sai"];
        const mcCorrectIndex = currentQuestion.correct_answer === true || currentQuestion.correct_answer === "true" ? 0 : 1;
        return (
          <MultipleChoiceRenderer
            key={`tf-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'shape_identify': {
        const shapeName = currentQuestion.correct_answer;
        let svg = null;
        if (shapeName === "Hình tròn") svg = <div className="w-32 h-32 rounded-full border-4 border-sky-500 bg-sky-500/20 mx-auto my-4" />;
        else if (shapeName === "Hình vuông") svg = <div className="w-32 h-32 border-4 border-emerald-500 bg-emerald-500/20 mx-auto my-4" />;
        else if (shapeName === "Hình chữ nhật") svg = <div className="w-48 h-24 border-4 border-amber-500 bg-amber-500/20 mx-auto my-4" />;
        else if (shapeName === "Hình tam giác") svg = <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-rose-500 mx-auto my-4" />;

        const mcQuestion = (
          <div className="text-center">
             <div className="text-lg font-medium mb-4">{currentQuestion.shape_description}</div>
             {svg}
          </div>
        );
        const mcChoices = currentQuestion.choices || [];
        const mcCorrectIndex = mcChoices.indexOf(currentQuestion.correct_answer);
        return (
          <MultipleChoiceRenderer
            key={`si-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'clock_read': {
        let clockText = "";
        if (currentQuestion.clock_display) {
           clockText = `[Hình ảnh: Đồng hồ chỉ ${currentQuestion.clock_display.hour} giờ ${currentQuestion.clock_display.minute} phút]`;
        }
        const mcQuestion = [currentQuestion.question, clockText].filter(Boolean).join('\n');
        const mcChoices = currentQuestion.choices || [];
        const mcCorrectIndex = mcChoices.indexOf(currentQuestion.correct_answer);
        return (
          <MultipleChoiceRenderer
            key={`cr-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'number_order': {
        return (
          <SentenceReorderRenderer
            key={`no-${currentIndex}`}
            instruction={currentQuestion.instruction_detail || currentQuestion.instruction || 'Sắp xếp dãy số sau:'}
            words={currentQuestion.numbers?.map(String) || []}
            correctSentence={(currentQuestion.correct_order || []).join(' ')}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
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
