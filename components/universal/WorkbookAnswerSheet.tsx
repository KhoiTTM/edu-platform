"use client";

import { useState } from "react";
import { Book, CheckCircle, ChevronRight, FileText, Send, AlertCircle } from "lucide-react";
import workbookData from "@/content/workbooks/khtn-7-workbook.json";

interface WorkbookAnswerSheetProps {
  lessonSlug: string;
  driveLink: string;
}

export function WorkbookAnswerSheet({ lessonSlug, driveLink }: WorkbookAnswerSheetProps) {
  // Normalize slug to match keys in JSON (e.g. "bai-1-phuong-phap..." -> "bai-1")
  const shortSlugMatch = lessonSlug.match(/^(bai-\d+)/i);
  const shortSlug = shortSlugMatch ? shortSlugMatch[1].toLowerCase() : lessonSlug;

  const data = (workbookData as any)[shortSlug];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!data) {
    return (
      <div className="p-8 text-center text-slate-400 bg-surface/50 rounded-3xl border border-line">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Hiện tại chưa có bài tập Sách Bài Tập (SBT) cho bài học này.</p>
      </div>
    );
  }

  // Group questions by page
  const questionsByPage: Record<number, any[]> = {};
  data.questions.forEach((q: any) => {
    if (!questionsByPage[q.page]) questionsByPage[q.page] = [];
    questionsByPage[q.page].push(q);
  });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    // Here we just mock submission
    setSubmitted(true);
    // You could also POST to /api/assessment/submit here
  };

  const renderInputForType = (q: any) => {
    if (q.type === 'multiple_choice') {
      const options = ['A', 'B', 'C', 'D'].slice(0, q.optionsCount || 4);
      return (
        <div className="flex gap-2 flex-wrap">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswerChange(q.id, opt)}
              className={`w-10 h-10 rounded-xl font-bold transition-all ${
                answers[q.id] === opt 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                  : 'bg-surface-raised text-slate-300 hover:bg-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === 'true_false') {
      return (
        <div className="flex gap-2">
          {['Đúng', 'Sai'].map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswerChange(q.id, opt)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                answers[q.id] === opt 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                  : 'bg-surface-raised text-slate-300 hover:bg-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === 'matching') {
      if (q.matchingItems && q.matchingItems.length > 0) {
        return (
          <div className="flex flex-col gap-2">
            {q.matchingItems.map((item: string) => (
               <div key={item} className="flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-surface-raised text-slate-300 font-bold rounded-lg shrink-0">{item}</span>
                  <span className="text-slate-500 font-bold">→</span>
                  <input
                    type="text"
                    value={answers[`${q.id}_${item}`] || ''}
                    onChange={(e) => handleAnswerChange(`${q.id}_${item}`, e.target.value)}
                    placeholder="..."
                    className="w-16 text-center bg-surface border border-line rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-bold uppercase"
                    maxLength={2}
                  />
               </div>
            ))}
          </div>
        );
      }
      // Fallback
    }

    if (q.type === 'short_answer' || q.type === 'matching') {
      return (
        <input
          type="text"
          value={answers[q.id] || ''}
          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
          placeholder="Nhập đáp án của bạn..."
          className="w-full max-w-md bg-surface border border-line rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
        />
      );
    }

    return null;
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20 p-8 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Đã nộp bài thành công!</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          Hệ thống đã ghi nhận các đáp án của bạn cho phiếu bài tập Sách Bài Tập (SBT) này.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-line rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Book className="text-rose-500" />
              Phiếu Trả Lời: {data.title}
            </h2>
            <p className="text-slate-400">
              Vui lòng xem đề bài trong Sách bài tập và điền đáp án tương ứng vào ô bên dưới.
            </p>
          </div>
          <a
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-rose-600/20 transition-all active:scale-95"
          >
            <FileText className="w-5 h-5" />
            Mở sách bài tập (PDF)
          </a>
        </div>
      </div>

      <div className="space-y-8">
        {Object.keys(questionsByPage).map((pageStr) => {
          const page = parseInt(pageStr);
          const qs = questionsByPage[page];
          return (
            <div key={page} className="bg-surface/50 border border-line rounded-3xl overflow-hidden">
              <div className="bg-surface-raised/50 px-6 py-3 border-b border-line flex items-center gap-2">
                <span className="text-xs font-black text-rose-400 uppercase tracking-widest">Trang {page}</span>
              </div>
              <div className="p-6 grid gap-6 md:grid-cols-2">
                {qs.map((q: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-3 bg-surface/40 p-4 rounded-2xl border border-line">
                    <span className="text-sm font-bold text-rose-400">
                      Câu {q.id}
                    </span>
                    {q.text && (
                      <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{q.text}</p>
                    )}
                    {q.options && q.options.length > 0 && (
                      <div className="space-y-2 mt-1">
                        {q.options.map((opt: string, oIdx: number) => (
                          <div key={oIdx} className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-line">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 pt-3 border-t border-line">
                      {renderInputForType(q)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-line">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 text-lg"
        >
          Nộp Bài
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
