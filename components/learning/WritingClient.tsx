"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit3, CheckSquare, Award, ArrowLeft, RefreshCw, MessageSquare, BookOpen, AlertCircle } from "lucide-react";
import type { WritingTask } from "@/lib/ieltsWritingTasks";
import AITeacherChat from "@/components/learning/AITeacherChat";
import { DictionaryPopup } from "@/components/DictionaryPopup";

interface Props {
  task: WritingTask;
  studentName?: string;
  backUrl?: string;
}

export function WritingClient({ task, studentName = "Học sinh", backUrl = "/hoc-tap/mindset-ielts/writing" }: Props) {
  const [studentText, setStudentText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"editor" | "checklist" | "model" | "coach">("editor");
  const [submitted, setSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const words = studentText.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [studentText]);

  const handleCheckboxToggle = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleReset = () => {
    setStudentText("");
    setSubmitted(false);
    setCheckedItems({});
    setActiveTab("editor");
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <header className="rounded-2xl border border-fuchsia-900/40 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950 p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={backUrl}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-surface-raised text-slate-400 hover:text-white transition"
            >
              <ArrowLeft size={14} />
            </Link>
            <span className="inline-block rounded bg-fuchsia-950/80 px-2 py-0.5 text-[9px] font-bold text-fuchsia-400 uppercase tracking-wide border border-fuchsia-900/40">
              Unit {task.unitNum} · IELTS WRITING
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-black text-white tracking-tight">
            {task.title}
          </h1>
          <p className="mt-1 text-xs text-slate-400">{task.topicTitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {submitted ? (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              ✓ Đã Nộp Bài Luyện Viết
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/20">
              ⚡ Đang thực hành nháp
            </span>
          )}
        </div>
      </header>

      {/* DUAL-COLUMN WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: PROMPT & OUTLINE (Col span 7) */}
        <section className="lg:col-span-7 space-y-6">
          {/* Writing Prompt card */}
          <div className="rounded-2xl border border-line bg-surface/20 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-line pb-3">
              <Edit3 size={16} className="text-fuchsia-400" />
              ĐỀ BÀI (WRITING TASK)
            </h2>
            <div className="rounded-xl bg-slate-950/80 border border-slate-850 p-4">
              <p className="text-slate-200 font-medium text-sm leading-relaxed whitespace-pre-wrap select-text">
                {task.prompt}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-850">
                <span className="text-[10px] font-bold text-fuchsia-400 uppercase block mb-1">MỤC TIÊU ĐỘ DÀI</span>
                <span className="text-xs text-slate-300 font-semibold">{task.wordLimit}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-850">
                <span className="text-[10px] font-bold text-fuchsia-400 uppercase block mb-1">TIÊU ĐIỂM NGỮ PHÁP</span>
                <span className="text-xs text-slate-300 font-medium leading-tight block">{task.focusPoint}</span>
              </div>
            </div>
          </div>

          {/* Outline Structure & Vocabulary Bank */}
          <div className="rounded-2xl border border-line bg-surface/20 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-2">
                📋 GỢI Ý CẤU TRÚC ĐOẠN VĂN
              </h3>
              <ol className="mt-3 text-xs text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
                {task.structure.map((step, sIdx) => (
                  <li key={sIdx} className="hover:text-white transition">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-slate-850 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <BookOpen size={14} className="text-fuchsia-400" />
                TỪ VỰNG GỢI Ý (SUGGESTED VOCABULARY)
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.vocabBank.map((v) => (
                  <span
                    key={v.word}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-850 text-xs text-slate-300 hover:border-fuchsia-500/30 hover:text-white cursor-pointer transition select-all"
                  >
                    <strong className="text-fuchsia-400 font-mono">{v.word}</strong>
                    <span className="text-slate-500 text-[10px]">: {v.meaning}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: EDITOR & CHECKS (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* TAB BAR */}
          <div className="flex rounded-xl bg-slate-950/60 p-1 border border-line text-xs font-bold">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === "editor" ? "bg-fuchsia-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Vở Viết
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === "checklist" ? "bg-fuchsia-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tự Đánh Giá
            </button>
            <button
              onClick={() => setActiveTab("model")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === "model" ? "bg-fuchsia-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Bài Mẫu
            </button>
            <button
              onClick={() => setActiveTab("coach")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "coach" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare size={12} /> AI Coach
            </button>
          </div>

          {/* TAB CONTENT: WRITING EDITOR */}
          {activeTab === "editor" && (
            <div className="rounded-2xl border border-line bg-surface/20 p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center border-b border-line pb-2.5">
                <span className="text-xs font-bold text-slate-400">KHÔNG GIAN SOẠN THẢO</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  wordCount > 0 ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" : "bg-slate-950 text-slate-600"
                }`}>
                  Đã viết: {wordCount} từ
                </span>
              </div>

              <textarea
                value={studentText}
                disabled={submitted}
                onChange={(e) => setStudentText(e.target.value)}
                placeholder="Nhấp chuột vào đây và bắt đầu viết câu trả lời của em bằng tiếng Anh..."
                className="w-full min-h-[220px] rounded-xl border border-line bg-slate-950 p-4 text-xs md:text-sm text-slate-200 placeholder-slate-650 outline-none ring-offset-slate-900 transition focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 font-sans leading-relaxed resize-y custom-scrollbar"
              />

              <div className="flex gap-3 pt-2">
                {!submitted ? (
                  <button
                    onClick={() => {
                      setSubmitted(true);
                      setActiveTab("checklist"); // Direct to checklist next
                    }}
                    disabled={studentText.trim().length === 0}
                    className="flex-1 inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-fuchsia-600 px-4 text-xs font-bold text-white transition hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-600/15 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Nộp Bài Viết Lên Hệ Thống ➔
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="flex-1 inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-surface-raised px-4 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                    <RefreshCw size={12} /> Viết lại từ đầu
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SELF-EVALUATION CHECKLIST */}
          {activeTab === "checklist" && (
            <div className="rounded-2xl border border-line bg-surface/20 p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckSquare size={14} className="text-fuchsia-400" />
                  BẢN TỰ ĐÁNH GIÁ (SELF-CHECKLIST)
                </h3>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Sau khi viết xong, hãy đối chiếu bài viết của mình và tích chọn vào các ô kiểm để rèn luyện thói quen tự sửa lỗi sai:
              </p>

              <div className="space-y-3 pt-1">
                {task.checklist.map((item, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition select-none ${
                        isChecked
                          ? "border-emerald-500/40 bg-emerald-500/5 text-slate-200"
                          : "border-slate-850 bg-slate-950/40 text-slate-400 hover:border-line"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(idx)}
                        className="mt-0.5 h-4 w-4 rounded border-line bg-surface-raised text-fuchsia-600 focus:ring-fuchsia-500"
                      />
                      <span className="text-xs leading-relaxed">{item}</span>
                    </label>
                  );
                })}
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-850 p-4 space-y-2 mt-2">
                <h4 className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={12} /> MẸO VIẾT ĐIỂM CAO:
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Trong bài thi IELTS Writing, việc tự phát hiện và sửa các lỗi sai nhỏ về dấu câu hoặc chia động từ sẽ giúp em giữ vững thang điểm từ 4.5 trở lên. Sau khi tự tích chọn, hãy click tab &ldquo;Bài Mẫu&rdquo; để học cách chuyên gia viết nhé!
                </p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MODEL ANSWERS */}
          {activeTab === "model" && (
            <div className="rounded-2xl border border-line bg-surface/20 p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Award size={14} className="text-fuchsia-400" />
                  BÀI VIẾT MẪU (BAND 4.5 - 5.0)
                </h3>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-850 p-4 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-wider block">TIẾNG ANH (MODEL ANSWER)</span>
                  <p className="text-xs text-slate-200 leading-loose italic select-text">
                    &ldquo;{task.modelAnswer}&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-850/80 pt-3.5 space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">BẢN DỊCH TIẾNG VIỆT</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {task.modelAnswerTranslation}
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 leading-relaxed text-center italic">
                Lời khuyên: Em nên chép lại hoặc ghi chú các cụm câu hay từ bài viết mẫu vào sổ tay học tập!
              </div>
            </div>
          )}

          {/* TAB CONTENT: COACH ARIA */}
          {activeTab === "coach" && (
            <div className="space-y-4">
              <AITeacherChat
                mode="warmup"
                sessionInfo={{
                  title: task.title,
                  summary: `Bài viết IELTS: ${task.prompt}`
                }}
                studentName={studentName}
              />
            </div>
          )}
        </div>
      </div>
      <DictionaryPopup />
    </div>
  );
}
