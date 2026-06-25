"use client";

import Link from "next/link";
import { BookOpen, Brain, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { vocabTopics, allVocabWords } from "@/lib/data/startersVocabulary";

export default function StartersWordlistHomePage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a] px-6 py-4 flex items-center gap-4">
        <Link
          href="/hoc-tap/pre-a1-starter"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
        >
          <ChevronLeft size={15} /> Quay lại
        </Link>
        <div>
          <h1 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-sky-400" /> Starters Wordlist Picture Book
          </h1>
          <p className="text-[10px] text-slate-400">Pre A1 Starters · Cambridge English</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 py-10 max-w-3xl mx-auto w-full">
        {/* Hero card */}
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-8 md:p-10 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <span className="text-5xl">📖</span>
          <h2 className="text-3xl font-black text-white mt-3">Starters Wordlist</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
            Bộ từ vựng chuẩn Cambridge Pre A1 Starters với hình ảnh minh họa.{" "}
            <span className="text-sky-400 font-semibold">{allVocabWords.length} từ vựng</span> được tổ chức theo{" "}
            <span className="text-sky-400 font-semibold">{vocabTopics.length} chủ đề</span>.
          </p>
        </div>

        {/* Two main actions */}
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Chọn hình thức học</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {/* Flipbook */}
          <Link
            href="/hoc-tap/pre-a1-starter/starters-wordlist/flipbook"
            className="group relative flex flex-col justify-between min-h-[200px] rounded-3xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-950/60 to-slate-900 p-7 hover:border-sky-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-sky-900/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg mb-4">
              📚
            </div>
            <div>
              <h4 className="text-lg font-black text-white group-hover:text-sky-300 transition">Đọc sách Flipbook</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Xem toàn bộ sách với hình ảnh chất lượng cao, có TTS phát âm tiếng Anh.</p>
              <div className="flex items-center gap-1 mt-4 text-sky-400 text-xs font-semibold">
                Mở sách <ChevronRight size={13} />
              </div>
            </div>
          </Link>

          {/* Vocabulary Learning */}
          <Link
            href="/hoc-tap/pre-a1-starter/starters-wordlist/learn"
            className="group relative flex flex-col justify-between min-h-[200px] rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-slate-900 p-7 hover:border-amber-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-amber-900/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg mb-4">
              🧠
            </div>
            <div>
              <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition">Luyện từ vựng</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Thẻ ghi nhớ, trắc nghiệm, luyện nghe. Học theo chủ đề hoặc toàn bộ.</p>
              <div className="flex items-center gap-1 mt-4 text-amber-400 text-xs font-semibold">
                Bắt đầu học <ChevronRight size={13} />
              </div>
            </div>
          </Link>
        </div>

        {/* Topics overview */}
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Các chủ đề trong sách</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {vocabTopics.map(topic => (
            <Link
              key={topic.id}
              href={`/hoc-tap/pre-a1-starter/starters-wordlist/learn?topic=${topic.id}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60 transition-all text-center"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{topic.emoji}</span>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white transition leading-tight">{topic.title}</span>
              <span className="text-[10px] text-slate-500">{topic.words.length} từ</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
