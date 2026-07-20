"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import { TapWordRenderer } from './TapWordRenderer';
import { SentenceReorderRenderer } from './SentenceReorderRenderer';
import { MatchPairRenderer } from './MatchPairRenderer';
import { CategorizationRenderer } from './CategorizationRenderer';
import { InlineFillBlankRenderer } from './InlineFillBlankRenderer';
import { CrosswordRenderer } from './CrosswordRenderer';
import { MathText } from './MathText';
import { BookOpen } from 'lucide-react';

interface AssessmentRendererProps {
  questions: any[];
  mode: 'practice' | 'quiz' | 'exam' | 'review' | 'challenge';
  onComplete: (answers: any[]) => void;
  timerSeconds?: number;
  sourceBookUrl?: string;
}


export function AssessmentRenderer({ questions, mode, onComplete, timerSeconds, sourceBookUrl }: AssessmentRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [essayDone, setEssayDone] = useState(false);
  const [essayAnswerText, setEssayAnswerText] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(timerSeconds || 0);

  const currentQuestion = questions[currentIndex];

  const playSound = (isCorrect: boolean) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playNote = (freq: number, type: OscillatorType, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      if (isCorrect) {
        // Melodic correct sound (C5 - E5 - G5)
        playNote(523.25, 'sine', now, 0.15);
        playNote(659.25, 'sine', now + 0.1, 0.15);
        playNote(783.99, 'sine', now + 0.2, 0.4);
      } else {
        // Melodic incorrect sound (Eb4 - C4 - G3)
        playNote(311.13, 'triangle', now, 0.2);
        playNote(261.63, 'triangle', now + 0.15, 0.2);
        playNote(196.00, 'triangle', now + 0.3, 0.5);
      }
    } catch(e) {
      console.error('Audio play failed:', e);
    }
  };

  const handleAnswer = (isCorrect: boolean, answerValue: string) => {
    playSound(isCorrect);
    const newAnswers = [...answers, { ...currentQuestion, isCorrect, answerValue }];
    setAnswers(newAnswers);
    setHasAnswered(true);
  };

  useEffect(() => {
    if (!timerSeconds || hasAnswered) return;
    
    setTimeLeft(timerSeconds);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAnswer(false, "timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, timerSeconds, hasAnswered]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasAnswered(false);
      setEssayDone(false);
      setEssayAnswerText('');
    } else {
      onComplete(answers);
    }
  };

  if (!currentQuestion) return null;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
      case 'listening_multiple_choice':
        return (
          <MultipleChoiceRenderer
            key={`mc-${currentIndex}`}
            question={currentQuestion.question}
            options={
              currentQuestion.options && typeof currentQuestion.options[0] === 'object'
                ? currentQuestion.options.map((o: any) => o.text || o.content || JSON.stringify(o))
                : currentQuestion.options
            }
            correctIndex={
              currentQuestion.correct_index !== undefined 
                ? currentQuestion.correct_index 
                : currentQuestion.options && typeof currentQuestion.options[0] === 'object'
                  ? currentQuestion.options.findIndex((o: any) => o.is_correct || o.isCorrect)
                  : currentQuestion.options?.indexOf(currentQuestion.correctOption)
            }
            onAnswer={handleAnswer}
            disabled={hasAnswered}
            hint={currentQuestion.hint || currentQuestion.metadata_json?.hint}
            imageUrl={currentQuestion.imageUrl || currentQuestion.image_url || currentQuestion.metadata_json?.image_url}
            audioText={currentQuestion.audio_text || currentQuestion.audioText || currentQuestion.metadata_json?.audio_text || currentQuestion.metadata_json?.audioText}
            audioUrl={currentQuestion.audio_url || currentQuestion.audioUrl || currentQuestion.metadata_json?.audio_url || currentQuestion.metadata_json?.audioUrl}
          />
        );
      case 'tap_correct_answer':
      case 'tap_correct_word':
      case 'vocab_to_word':
      case 'fill_blank':
      case 'fill_in_blank':
        if (currentQuestion.sentences) {
          const textSegments: string[] = [];
          const correctAnswers: string[] = [];
          currentQuestion.sentences.forEach((s: any, idx: number) => {
             const parts = s.template.split('__');
             if (idx === 0) {
                 textSegments.push(parts[0] || '');
             } else {
                 textSegments[textSegments.length - 1] += '\n' + (parts[0] || '');
             }
             if (parts.length > 1) {
                 correctAnswers.push(s.correct_answer || '');
                 textSegments.push(parts[1] || '');
             }
          });
          return (
            <InlineFillBlankRenderer
              key={`ifb-${currentIndex}`}
              instruction={currentQuestion.instruction || "Điền vào chỗ trống:"}
              textSegments={textSegments}
              correctAnswers={correctAnswers}
              onAnswer={handleAnswer}
              disabled={hasAnswered}
            />
          );
        }
        // Fallback for simple fill_blank
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
            imageUrl={currentQuestion.imageUrl || currentQuestion.image_url || currentQuestion.metadata_json?.image_url}
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
      case 'sorting':
      case 'sentence_reorder': {
        const words = currentQuestion.words || currentQuestion.parts || (currentQuestion.items ? currentQuestion.items.map((i: any) => i.text) : []);
        let correctSentence = currentQuestion.correct_sentence || currentQuestion.correctSentence || '';
        if (!correctSentence && currentQuestion.correct_order && currentQuestion.items) {
           correctSentence = currentQuestion.correct_order
             .map((id: string) => currentQuestion.items.find((i: any) => i.id === id)?.text)
             .filter(Boolean)
             .join(' ');
        }
        return (
          <SentenceReorderRenderer
            key={`sr-${currentIndex}`}
            instruction={currentQuestion.instruction || "Sắp xếp lại thành câu đúng"}
            words={words}
            correctSentence={correctSentence}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'matching':
      case 'match_pair': {
        const pairs = currentQuestion.pairs || [];
        if (pairs.length === 0 && currentQuestion.correct_pairs && currentQuestion.column_a && currentQuestion.column_b) {
           currentQuestion.correct_pairs.forEach((cp: any) => {
               const leftText = currentQuestion.column_a.find((a: any) => a.id === cp.a)?.text;
               const rightText = currentQuestion.column_b.find((b: any) => b.id === cp.b)?.text;
               if (leftText && rightText) pairs.push({ left: leftText, right: rightText });
           });
        }
        return (
          <MatchPairRenderer
            key={`mp-${currentIndex}`}
            instruction={currentQuestion.instruction || 'Nối cặp từ phù hợp:'}
            pairs={pairs}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'crossword': {
        return (
          <CrosswordRenderer
            key={`cw-${currentIndex}`}
            instruction={currentQuestion.instruction || currentQuestion.question || 'Hoàn thành ô chữ:'}
            rows={currentQuestion.rows || 0}
            cols={currentQuestion.cols || 0}
            entries={currentQuestion.entries || []}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'classification':
      case 'categorization': {
        const transformedGroups = currentQuestion.groups || [];
        if (transformedGroups.length === 0 && currentQuestion.categories && currentQuestion.items) {
           currentQuestion.categories.forEach((cat: any) => {
               const catItems = currentQuestion.items.filter((i: any) => i.correct_category === cat.id).map((i: any) => i.text);
               transformedGroups.push({ name: cat.label, items: catItems });
           });
        }
        return (
          <CategorizationRenderer
            key={`cat-${currentIndex}`}
            instruction={currentQuestion.instruction}
            groups={transformedGroups}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      }
      case 'inline_fill_blank':
        return (
          <InlineFillBlankRenderer
            key={`ifb-${currentIndex}`}
            instruction={currentQuestion.instruction}
            textSegments={currentQuestion.text_segments || []}
            correctAnswers={currentQuestion.correct_answers || []}
            wordPool={currentQuestion.word_pool}
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
        const mcQuestion = currentQuestion.statement || currentQuestion.question;
        const mcChoices = ["Đúng", "Sai"];
        const isTrue = currentQuestion.correct_answer === true || currentQuestion.correct_answer === "true" || currentQuestion.is_correct === true || currentQuestion.is_correct === "true";
        const mcCorrectIndex = isTrue ? 0 : 1;
        return (
          <MultipleChoiceRenderer
            key={`tf-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
            shuffle={false}
          />
        );
      }
      case 'true_false_no_info': {
        // Same shape as true_false but with a third "No Information" option (T/F/NI reading tasks).
        const mcQuestion = currentQuestion.statement || currentQuestion.question;
        const mcChoices = ["True", "False", "No Information"];
        const answerMap: Record<string, number> = { T: 0, TRUE: 0, F: 1, FALSE: 1, NI: 2 };
        const mcCorrectIndex = answerMap[String(currentQuestion.correct_answer).toUpperCase()] ?? -1;
        return (
          <MultipleChoiceRenderer
            key={`tfni-${currentIndex}`}
            question={mcQuestion}
            options={mcChoices}
            correctIndex={mcCorrectIndex}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
            shuffle={false}
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
      case 'essay': {
        const essayExplanation = currentQuestion.explanation || currentQuestion.metadata_json?.explanation;
        const essayImageUrl = currentQuestion.image_url || currentQuestion.metadata_json?.image_url;
        return (
          <div className="flex flex-col gap-6 p-6 bg-surface-raised/60 rounded-xl border border-line">
            <div className="text-white font-semibold text-base leading-relaxed">
              <MathText text={currentQuestion.question || currentQuestion.stem || ""} />
            </div>
            {essayImageUrl && (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 flex justify-center p-4">
                {essayImageUrl.startsWith('<svg') ? (
                  <div
                    className="max-h-[300px] w-full max-w-[420px] flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: essayImageUrl }}
                  />
                ) : (
                  <img src={essayImageUrl} alt="Hình vẽ minh họa" className="max-h-[300px] object-contain rounded-xl" />
                )}
              </div>
            )}
            <p className="text-xs text-slate-400 italic">Câu tự luận — nhập câu trả lời của em vào ô bên dưới.</p>
            {!essayDone ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={essayAnswerText}
                  onChange={(e) => setEssayAnswerText(e.target.value)}
                  placeholder="Nhập câu trả lời của em..."
                  rows={5}
                  className="w-full px-4 py-3 bg-surface border border-line rounded-xl text-white text-sm leading-relaxed placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
                <button
                  onClick={() => setEssayDone(true)}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold transition-colors"
                >
                  Đã làm xong — xem hướng dẫn giải →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {essayAnswerText.trim() && (
                  <div className="p-4 bg-surface-base border border-line rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Câu trả lời của em</p>
                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{essayAnswerText}</p>
                  </div>
                )}
                {essayExplanation && (
                  <div className="p-4 bg-emerald-900/30 border border-emerald-500/40 rounded-xl">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Hướng dẫn giải</p>
                    <div className="text-slate-200 text-sm leading-relaxed">
                      <MathText text={essayExplanation} />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => { setEssayDone(false); handleAnswer(true, essayAnswerText.trim() || "essay_done"); }}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold transition-colors"
                >
                  Tiếp theo →
                </button>
              </div>
            )}
          </div>
        );
      }
      default:
        return (
          <div className="text-center p-8 bg-surface-raised rounded-xl text-slate-400">
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
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-surface border border-line rounded-2xl shadow-xl flex flex-col max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-semibold text-slate-400">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center gap-2">
          {sourceBookUrl && (
            <a
              href={sourceBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-raised hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-colors border border-line"
            >
              <BookOpen size={14} />
              Xem sách
            </a>
          )}
          <div className="flex text-emerald-400 font-bold bg-surface-raised px-3 py-1 rounded-lg">
            ⭐ Score: {answers.filter(a => a.isCorrect).length * 10}
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-raised h-2 rounded-full mb-4 overflow-hidden">
        <div 
          className="bg-sky-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      {timerSeconds && !hasAnswered && (
        <div className="w-full bg-surface-raised h-6 rounded-xl mb-4 overflow-hidden relative border border-line/50">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(244,63,94,0.6)]"
            style={{ 
              width: `${(timeLeft / timerSeconds) * 100}%`,
              backgroundColor: timeLeft > 5 ? '#10b981' : timeLeft > 2 ? '#f59e0b' : '#ef4444' 
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] tracking-wider">
            ⏱️ CÒN LẠI {timeLeft} GIÂY
          </div>
        </div>
      )}

      <div className="flex-1">
        {currentQuestion.youtube_url && (
          <div className="mb-6 rounded-xl overflow-hidden shadow-md">
            <iframe 
              width="100%" 
              height="315" 
              src={currentQuestion.youtube_url.includes('watch?v=') ? currentQuestion.youtube_url.replace('watch?v=', 'embed/') : currentQuestion.youtube_url} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        )}
        {currentQuestion.reading_passage && (
          <div className="mb-6 p-4 bg-surface-raised/80 rounded-xl border-l-4 border-amber-400 text-slate-200">
            <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="text-lg">📖</span> Đoạn văn tham khảo:
            </h3>
            <p className="whitespace-pre-line text-[15px] leading-relaxed">
              {currentQuestion.reading_passage}
            </p>
          </div>
        )}
        {renderQuestion()}
      </div>

      {hasAnswered && (
        <div className="mt-4 border-t border-line pt-4">
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
