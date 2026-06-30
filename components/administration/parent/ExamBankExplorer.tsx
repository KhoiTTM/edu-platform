"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  ImageIcon,
  Database,
} from "lucide-react";
import {
  getExamBankData,
  type ExamBankCollection,
  type ExamBankExam,
  type ExamBankQuestion,
} from "@/app/(app)/(administration)/phu-huynh/actions";

type SubjectOpt = { slug: string; name: string; icon: string };

const GRADES = [3, 7];

// Nhóm exam_type về 3 loại — KHỚP cách trang Luyện tập (/luyen-tap) phân tab
type ExamCategory = "lesson" | "review" | "reflex";

function examCategory(t: string | null): ExamCategory {
  if (!t || t === "lesson") return "lesson";
  if (t === "reflex") return "reflex";
  return "review";
}

function examTypeLabel(t: string | null): string {
  const cat = examCategory(t);
  if (cat === "lesson") return "Theo bài học";
  if (cat === "reflex") return "Phản xạ";
  return "Ôn tập / Kiểm tra";
}

const TYPE_FILTERS: { key: ExamCategory | "all"; label: string }[] = [
  { key: "all", label: "Tất cả loại" },
  { key: "lesson", label: "Theo bài học" },
  { key: "review", label: "Theo ôn tập" },
  { key: "reflex", label: "Theo phản xạ" },
];

function QuestionCard({ q }: { q: ExamBankQuestion }) {
  const m = q.metadata_json || {};
  const isMC = q.type === "multiple_choice";
  const options: string[] = isMC ? m.options || [] : m.choices || [];
  const correctIdx = isMC ? m.correct_index : undefined;
  const correctAns = !isMC ? String(m.correct_answer ?? "") : undefined;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-sm font-bold text-slate-100 leading-relaxed whitespace-pre-wrap">
          <span className="text-cyan-400 mr-1.5">{q.order_index + 1}.</span>
          {m.question || <span className="italic text-slate-500">(thiếu nội dung)</span>}
        </p>
        <span className="shrink-0 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
          {isMC ? "Trắc nghiệm" : "Điền"}
        </span>
      </div>

      {m.image_url && (
        <div className="flex items-center gap-1.5 text-[10px] text-violet-300 font-bold mb-2">
          <ImageIcon size={11} />
          {m.image_url}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
        {options.map((opt, i) => {
          const correct = isMC ? i === correctIdx : String(opt) === correctAns;
          return (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                correct
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-900/40 border-slate-800 text-slate-300"
              }`}
            >
              {correct && <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />}
              <span>{opt}</span>
            </div>
          );
        })}
      </div>

      {m.explanation && (
        <p className="mt-2 text-[11px] text-slate-400 italic leading-snug">
          💡 {m.explanation}
        </p>
      )}
    </div>
  );
}

function ExamRow({ exam }: { exam: ExamBankExam }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2.5 text-left">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 text-xs font-black shrink-0">
            {exam.exam_number}
          </span>
          <span className="text-sm font-bold text-slate-100">{exam.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-black text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
            {exam.questions.length || exam.total_questions} câu
          </span>
          {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
          {exam.questions.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-3 text-center">
              Đề này chưa có câu hỏi nào trong ngân hàng.
            </p>
          ) : (
            exam.questions.map((q) => <QuestionCard key={q.id} q={q} />)
          )}
        </div>
      )}
    </div>
  );
}

export function ExamBankExplorer({ subjects }: { subjects: SubjectOpt[] }) {
  const subjectList = subjects.length > 0 ? subjects : [{ slug: "toan", name: "Toán", icon: "🔢" }];

  const [subject, setSubject] = useState<string>(subjectList[0].slug);
  const [grade, setGrade] = useState<number>(3);
  const [collections, setCollections] = useState<ExamBankCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState<ExamCategory | "all">("all");
  const [collectionFilter, setCollectionFilter] = useState<string>("all");

  const load = useCallback(async (s: string, g: number) => {
    setLoading(true);
    setTypeFilter("all");
    setCollectionFilter("all");
    const data = await getExamBankData(s, g);
    setCollections(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(subject, grade);
  }, [subject, grade, load]);

  // Lọc theo loại đề trước, rồi mới đến danh sách bộ đề
  const typeFilteredCollections = useMemo(
    () =>
      typeFilter === "all"
        ? collections
        : collections.filter((c) => examCategory(c.exam_type) === typeFilter),
    [collections, typeFilter]
  );

  const visibleCollections = useMemo(
    () =>
      collectionFilter === "all"
        ? typeFilteredCollections
        : typeFilteredCollections.filter((c) => c.id === collectionFilter),
    [typeFilteredCollections, collectionFilter]
  );

  // Loại đề nào thực sự có trong dữ liệu (để ẩn nút loại trống)
  const availableCategories = useMemo(() => {
    const set = new Set<ExamCategory>();
    collections.forEach((c) => set.add(examCategory(c.exam_type)));
    return set;
  }, [collections]);

  // Tổng kết theo đúng những gì đang hiển thị (sau khi lọc)
  const totalExams = visibleCollections.reduce((a, c) => a + c.exams.length, 0);
  const totalQuestions = visibleCollections.reduce(
    (a, c) => a + c.exams.reduce((b, e) => b + e.questions.length, 0),
    0
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="rounded-2xl bg-slate-900/60 border-2 border-slate-800 p-4 flex flex-col gap-3">
        {/* Subject */}
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Môn học</p>
          <div className="flex items-center gap-2 flex-wrap">
            {subjectList.map((s) => (
              <button
                key={s.slug}
                onClick={() => setSubject(s.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                  subject === s.slug
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                <span>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grade */}
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lớp</p>
          <div className="flex items-center gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                  grade === g
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        {/* Loại đề (exam_type) */}
        {collections.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              Loại đề
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {TYPE_FILTERS.filter(
                (f) => f.key === "all" || availableCategories.has(f.key as ExamCategory)
              ).map((f) => (
                <button
                  key={f.key}
                  onClick={() => {
                    setTypeFilter(f.key);
                    setCollectionFilter("all");
                  }}
                  className={`px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                    typeFilter === f.key
                      ? "border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-300"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collection / unit */}
        {typeFilteredCollections.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              Bài học / Bộ đề
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setCollectionFilter("all")}
                className={`px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                  collectionFilter === "all"
                    ? "border-violet-500 bg-violet-500/10 text-violet-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                Tất cả
              </button>
              {typeFilteredCollections.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCollectionFilter(c.id)}
                  className={`px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                    collectionFilter === c.id
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-white"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {!loading && visibleCollections.length > 0 && (
        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
          <span className="flex items-center gap-1"><Database size={12} /> {visibleCollections.length} bộ đề</span>
          <span className="flex items-center gap-1"><FileText size={12} /> {totalExams} đề</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} /> {totalQuestions} câu hỏi</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={26} className="animate-spin text-indigo-400" />
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Database size={30} className="mx-auto mb-3 opacity-30" />
          <p className="font-bold">Chưa có đề nào cho môn này ở lớp {grade}</p>
        </div>
      ) : visibleCollections.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Database size={30} className="mx-auto mb-3 opacity-30" />
          <p className="font-bold">Không có bộ đề nào khớp bộ lọc đang chọn</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleCollections.map((c) => (
            <div key={c.id} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-black text-white">{c.title}</h3>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                  {examTypeLabel(c.exam_type)}
                </span>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    c.status === "published"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-slate-700/40 text-slate-400 border-slate-600"
                  }`}
                >
                  {c.status === "published" ? "Đã bật" : "Nháp"}
                </span>
              </div>
              {c.exams.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Bộ đề này chưa có đề.</p>
              ) : (
                c.exams.map((e) => <ExamRow key={e.id} exam={e} />)
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
