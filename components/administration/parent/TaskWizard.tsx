"use client";

import { useState, useTransition, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  User,
  BookOpen,
  Grid,
  Calendar,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";
import { createParentTask, getSubjectsForGrade } from "@/app/(app)/(administration)/phu-huynh/actions";
import type { ExamOption, LessonOption } from "@/app/(app)/(administration)/phu-huynh/actions";

// ─── Types ─────────────────────────────────────────────────────────────────

type Student = { id: string; display_name: string; grade: number; email: string };
type Subject = { slug: string; name: string; icon: string; color: string };

type WizardProps = {
  students: Student[];
  subjects: Subject[];
  onSuccess: () => void;
  onCancel: () => void;
  getExamsForSubject: (slug: string, grade: number) => Promise<ExamOption[]>;
  getLessonsForSubject: (slug: string, grade: number) => Promise<LessonOption[]>;
};

const FREQUENCY_OPTIONS = [
  {
    id: "daily" as const,
    label: "Mỗi ngày",
    desc: "7 ngày / tuần",
    days: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "weekdays" as const,
    label: "Ngày học",
    desc: "Thứ 2 – Thứ 6",
    days: [1, 2, 3, 4, 5],
  },
  {
    id: "weekly" as const,
    label: "Tuần 1 lần",
    desc: "Chủ nhật hàng tuần",
    days: [7],
  },
];

const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

// ─── Step Indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ["Học sinh", "Môn học", "Đề luyện tập", "Tần suất"];
  return (
    <div className="flex items-center gap-1 mb-6">
      {steps.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === current;
        const isDone = idx < current;
        return (
          <div key={label} className="flex items-center gap-1 flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                  isDone
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : isActive
                    ? "bg-indigo-500 border-indigo-400 text-white shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                    : "bg-slate-800 border-slate-700 text-slate-500"
                }`}
              >
                {isDone ? <CheckCircle2 size={14} /> : idx}
              </div>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider ${
                  isActive ? "text-indigo-400" : isDone ? "text-emerald-400" : "text-slate-600"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mb-4 mx-1 rounded ${
                  isDone ? "bg-emerald-500" : "bg-slate-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Wizard Component ──────────────────────────────────────────────────

export function TaskWizard({
  students,
  subjects,
  onSuccess,
  onCancel,
  getExamsForSubject,
  getLessonsForSubject,
}: WizardProps) {
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [taskType, setTaskType] = useState<"lesson" | "exam">("exam");
  const [exams, setExams] = useState<ExamOption[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamOption | null>(null);
  const [loadingExams, setLoadingExams] = useState(false);
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonOption | null>(null);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [frequency, setFrequency] = useState<"daily" | "weekdays" | "weekly">("daily");
  const [activeDays, setActiveDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterUnit, setSelectedFilterUnit] = useState<number | null>(null);
  const [selectedExamTypeFilter, setSelectedExamTypeFilter] = useState<"lesson" | "workbook" | "review" | "reflex">("lesson");

  // Load dynamically active subjects for selected student's grade
  useEffect(() => {
    if (selectedStudent) {
      getSubjectsForGrade(selectedStudent.grade).then((subs) => {
        setAvailableSubjects(subs);
      });
    } else {
      setAvailableSubjects([]);
    }
  }, [selectedStudent]);

  // Helper auto-transitions
  const selectStudentAndNext = (student: Student) => {
    setSelectedStudent(student);
    setSelectedSubject(null);
    setSelectedExam(null);
    setSelectedLesson(null);
    setStep(2);
  };

  const selectSubjectAndNext = async (subj: Subject) => {
    setSelectedSubject(subj);
    setSelectedExam(null);
    setSelectedLesson(null);
    if (selectedStudent) {
      setStep(3);
      setLoadingExams(true);
      setLoadingLessons(true);
      setSearchTerm("");
      setSelectedFilterUnit(null);
      
      const [e, l] = await Promise.all([
        getExamsForSubject(subj.slug, selectedStudent.grade),
        getLessonsForSubject(subj.slug, selectedStudent.grade)
      ]);

      setExams(e);
      setLessons(l);
      setLoadingExams(false);
      setLoadingLessons(false);
    }
  };

  // ── Step 1: Select Student ───────────────────────────────────────────────
  const StepStudent = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
        Chọn học sinh nhận nhiệm vụ
      </p>
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {students.map((s) => (
          <button
            key={s.id}
            onClick={() => selectStudentAndNext(s)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
              selectedStudent?.id === s.id
                ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                : "border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800"
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shrink-0">
              {s.display_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="font-black text-white text-sm truncate">{s.display_name}</p>
              <p className="text-[10px] text-slate-400 truncate">
                Lớp {s.grade} · {s.email}
              </p>
            </div>
            {selectedStudent?.id === s.id && (
              <CheckCircle2 size={16} className="text-indigo-400 ml-auto shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 2: Select Subject ───────────────────────────────────────────────
  const StepSubject = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
        Chọn môn học
      </p>
      <div className="grid grid-cols-2 gap-2">
        {availableSubjects.map((s) => (
          <button
            key={s.slug}
            onClick={() => selectSubjectAndNext(s)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              selectedSubject?.slug === s.slug
                ? `border-${s.color}-500 bg-${s.color}-500/10`
                : "border-slate-700 bg-slate-800/60 hover:border-slate-600"
            }`}
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-xs font-black text-white uppercase tracking-wide text-center">
              {s.name}
            </span>
            {selectedSubject?.slug === s.slug && (
              <CheckCircle2 size={14} className="text-emerald-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 3: Select Lesson or Exam ──────────────────────────────────────────
  const StepExamsAndLessons = () => {
    // Unique units for filtering
    const uniqueUnits = Array.from(
      new Set(
        taskType === "exam"
          ? exams.flatMap((e) => e.units || [])
          : lessons.map((l) => l.unit_number).filter((u): u is number => u !== undefined)
      )
    ).sort((a, b) => a - b);

    const filteredExams = exams.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUnit =
        selectedFilterUnit === null || e.units.includes(selectedFilterUnit);
      
      const type = e.exam_type;
      const matchesType =
        (selectedExamTypeFilter === "lesson" && type === "lesson") ||
        (selectedExamTypeFilter === "workbook" && !type) ||
        (selectedExamTypeFilter === "reflex" && type === "reflex") ||
        (selectedExamTypeFilter === "review" && (type === "midterm" || type === "final"));

      return matchesSearch && matchesUnit && matchesType;
    });

    const filteredLessons = lessons.filter((l) => {
      const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUnit =
        selectedFilterUnit === null || l.unit_number === selectedFilterUnit;
      return matchesSearch && matchesUnit;
    });

    const isLoading = taskType === "exam" ? loadingExams : loadingLessons;
    const itemsCount = taskType === "exam" ? exams.length : lessons.length;
    const filteredCount = taskType === "exam" ? filteredExams.length : filteredLessons.length;

    return (
      <div className="flex flex-col gap-3">
        {/* Toggle between Lesson and Exam */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setTaskType("exam");
              setSelectedLesson(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              taskType === "exam"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Bài luyện tập ({exams.length})
          </button>
          <button
            onClick={() => {
              setTaskType("lesson");
              setSelectedExam(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              taskType === "lesson"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📖 Bài học ({lessons.length})
          </button>
        </div>

        {/* Sub-exam type selectors for "Bài luyện tập" */}
        {taskType === "exam" && (
          <div className="flex bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80 gap-1 flex-wrap justify-center">
            <button
              onClick={() => setSelectedExamTypeFilter("lesson")}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all select-none ${
                selectedExamTypeFilter === "lesson"
                  ? "bg-cyan-600 text-white shadow-sm shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Luyện theo bài học
            </button>
            <button
              onClick={() => setSelectedExamTypeFilter("workbook")}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all select-none ${
                selectedExamTypeFilter === "workbook"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Luyện theo Sách bài tập
            </button>
            <button
              onClick={() => setSelectedExamTypeFilter("review")}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all select-none ${
                selectedExamTypeFilter === "review"
                  ? "bg-fuchsia-600 text-white shadow-sm shadow-fuchsia-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ôn Tập
            </button>
            <button
              onClick={() => setSelectedExamTypeFilter("reflex")}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all select-none ${
                selectedExamTypeFilter === "reflex"
                  ? "bg-orange-600 text-white shadow-sm shadow-orange-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Luyện phản xạ
            </button>
          </div>
        )}

        {/* Filter inputs */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={taskType === "exam" ? "Tìm đề luyện tập..." : "Tìm bài học..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-800/80 border-2 border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-bold"
          />
          {uniqueUnits.length > 0 && (
            <select
              value={selectedFilterUnit === null ? "" : selectedFilterUnit}
              onChange={(e) =>
                setSelectedFilterUnit(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className="bg-slate-800/80 border-2 border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="">Tất cả Unit</option>
              {uniqueUnits.map((u) => (
                <option key={u} value={u}>
                  Unit {u}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Random Exam Selector */}
        {taskType === "exam" && filteredExams.length > 0 && (
          <button
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * filteredExams.length);
              const randomExam = filteredExams[randomIndex];
              setSelectedExam(randomExam);
              setStep(4);
            }}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wide transition-all shadow-md active:scale-[0.98] select-none"
          >
            🎲 Chọn ngẫu nhiên 1 đề trong bộ lọc ({filteredExams.length})
          </button>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-indigo-400" />
          </div>
        ) : filteredCount === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            {itemsCount === 0
              ? `Không tìm thấy ${taskType === "exam" ? "đề luyện tập" : "bài học"} nào`
              : "Không tìm thấy kết quả khớp bộ lọc"}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
            {taskType === "exam"
              ? filteredExams.map((e) => {
                  const isSelected = selectedExam?.id === e.id;
                  return (
                    <button
                      key={e.id}
                      onClick={() => {
                        setSelectedExam(e);
                        setStep(4);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                          : "border-slate-700 bg-slate-800/60 hover:border-slate-600"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-white truncate uppercase tracking-wide">
                          {e.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          📝 {e.total_questions} câu hỏi · Unit {e.units.join(", ")}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={14} className="text-indigo-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })
              : filteredLessons.map((l) => {
                  const isSelected = selectedLesson?.id === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        setSelectedLesson(l);
                        setStep(4);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                          : "border-slate-700 bg-slate-800/60 hover:border-slate-600"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-white truncate uppercase tracking-wide">
                          {l.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          📖 {l.unit_title || "Bài học"}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={14} className="text-indigo-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
          </div>
        )}
      </div>
    );
  };

  // ── Step 4: Confirm ─────────────────────────────────────────────────────
  const StepConfirm = () => (
    <div className="flex flex-col gap-4">
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 mb-3 animate-pulse">
          ✓
        </div>
        <h3 className="font-black text-white text-sm uppercase tracking-wide">Xác nhận giao nhiệm vụ</h3>
        <p className="text-[10px] text-slate-500 mt-1 max-w-xs mx-auto">Vui lòng kiểm tra lại thông tin dưới đây trước khi giao bài cho học sinh.</p>
      </div>

      <div className="rounded-xl bg-slate-800/80 border border-slate-700 p-4 space-y-3">
        <div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Học sinh nhận</span>
          <p className="text-xs text-slate-200 font-bold mt-0.5">👤 {selectedStudent?.display_name}</p>
        </div>

        <div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Môn học</span>
          <p className="text-xs text-slate-200 font-bold mt-0.5">📚 {selectedSubject?.name}</p>
        </div>

        <div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Nội dung bài làm</span>
          <p className="text-xs text-indigo-300 font-bold mt-0.5">
            {taskType === "exam" ? (
              <>📝 Đề thi: <span className="text-white">{selectedExam?.title || "Chưa chọn đề"}</span></>
            ) : (
              <>📖 Bài học: <span className="text-white">{selectedLesson?.title || "Chưa chọn bài học"}</span></>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-[10px] font-semibold text-slate-400 leading-relaxed text-center">
        💡 Nhiệm vụ sẽ xuất hiện trên bảng điều khiển của học sinh ngay hôm nay.
      </div>
    </div>
  );

  // ── Navigation logic ─────────────────────────────────────────────────────

  const canNext = () => {
    if (step === 1) return !!selectedStudent;
    if (step === 2) return !!selectedSubject;
    if (step === 3) {
      return taskType === "exam" ? !!selectedExam : !!selectedLesson;
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 2 && selectedSubject && selectedStudent) {
      // Load both exams and lessons for step 3
      setLoadingExams(true);
      setLoadingLessons(true);
      setSearchTerm("");
      setSelectedFilterUnit(null);
      
      const [e, l] = await Promise.all([
        getExamsForSubject(selectedSubject.slug, selectedStudent.grade),
        getLessonsForSubject(selectedSubject.slug, selectedStudent.grade)
      ]);

      setExams(e);
      setLessons(l);
      setLoadingExams(false);
      setLoadingLessons(false);
    }
    if (step < 4) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedStudent || !selectedSubject) return;
    if (taskType === "exam" && !selectedExam) return;
    if (taskType === "lesson" && !selectedLesson) return;
    
    setError(null);

    startTransition(async () => {
      const result = await createParentTask({
        student_id: selectedStudent.id,
        subject_slug: selectedSubject.slug,
        unit_numbers: taskType === "exam" ? selectedExam!.units : (selectedLesson!.unit_number ? [selectedLesson!.unit_number] : []),
        frequency,
        active_days: activeDays,
        exam_id: taskType === "exam" ? selectedExam!.id : null,
        lesson_node_id: taskType === "lesson" ? selectedLesson!.id : null,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-black text-white text-base uppercase tracking-wide">
          Giao Nhiệm Vụ
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X size={16} />
        </button>
      </div>

      <StepIndicator current={step} total={4} />

      <div className="min-h-[240px]">
        {step === 1 && <StepStudent />}
        {step === 2 && <StepSubject />}
        {step === 3 && <StepExamsAndLessons />}
        {step === 4 && <StepConfirm />}
      </div>

      {error && (
        <p className="text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
          ⚠️ {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-slate-700 text-slate-300 font-black text-xs uppercase tracking-wide hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={14} /> Quay lại
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border-2 border-slate-700 text-slate-500 font-black text-xs uppercase tracking-wide hover:bg-slate-700 hover:text-white transition-all"
          >
            Hủy
          </button>
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            disabled={!canNext()}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-400 text-white font-black text-xs uppercase tracking-wide shadow-[0_4px_0_rgba(55,48,163,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-[0_4px_0_rgba(55,48,163,1)]"
          >
            Tiếp <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isPending || activeDays.length === 0}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-400 text-white font-black text-xs uppercase tracking-wide shadow-[0_4px_0_rgba(5,150,105,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCircle2 size={14} />
            )}
            {isPending ? "Đang lưu..." : "Xác nhận"}
          </button>
        )}
      </div>
    </div>
  );
}
