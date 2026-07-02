"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, BookOpen, ChevronRight } from "lucide-react";
import { AnswerSheetRenderer } from "@/components/assessment/AnswerSheetRenderer";
import { getBookAnswerSheet, saveBookPracticeAttempt } from "../actions";

export default function BookPracticePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeUnit, setActiveUnit] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const d = await getBookAnswerSheet(slug);
    setData(d);
    setLoading(false);
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  const handleComplete = async (score: number, total: number, detail: any[]) => {
    if (!data || !activeUnit) return;
    await saveBookPracticeAttempt(
      data.book.slug,
      data.book.subject_slug,
      activeUnit.unit,
      activeUnit.title,
      score,
      total,
      detail
    );
    setSaved(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={28} className="animate-spin text-indigo-400" />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="text-center py-32 text-slate-400 font-bold">
        Chưa có dữ liệu luyện tập cho sách này.
      </div>
    );
  }

  // Màn làm bài của 1 Unit
  if (activeUnit) {
    return (
      <div className="max-w-3xl mx-auto py-6 px-4">
        <button
          onClick={() => { setActiveUnit(null); setSaved(false); }}
          className="mb-4 text-sm font-bold text-slate-400 hover:text-white"
        >
          ← Quay lại danh sách Unit
        </button>
        {saved && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold text-center">
            ✅ Đã lưu kết quả vào lịch sử học tập.
          </div>
        )}
        <AnswerSheetRenderer
          unitTitle={activeUnit.title}
          pages={activeUnit.pages}
          flipbookUrl={data.book.flipbook_url}
          sections={activeUnit.sections}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  // Màn danh sách Unit
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-white">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black">{data.book.title}</h1>
            <p className="text-xs text-slate-400 font-bold">Luyện tập theo sách — chọn Unit để làm bài</p>
          </div>
        </div>
        <a
          href={data.book.flipbook_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 font-bold text-sm transition-all"
        >
          📖 Mở toàn bộ Sách bài tập (bản gốc)
        </a>
      </header>

      <div className="flex flex-col gap-3">
        {data.units.map((u: any) => {
          const graded = u.sections.reduce(
            (a: number, s: any) => a + s.tasks.reduce((b: number, t: any) => b + (t.graded && t.answers ? t.answers.length : 0), 0),
            0
          );
          return (
            <button
              key={u.unit}
              onClick={() => setActiveUnit(u)}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-indigo-500/40 transition-all text-left"
            >
              <div>
                <p className="font-black">{u.title}</p>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  Trang {u.pages} · {u.sections.length} phần · {graded} câu chấm điểm
                </p>
              </div>
              <ChevronRight size={20} className="text-slate-500 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
