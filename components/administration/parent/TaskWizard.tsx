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
  onSuccess: () => void;
  onCancel: () => void;
  getExamsForSubject: (slug: string, grade: number) => Promise<ExamOption[]>;
  getLessonsForSubject: (slug: string, grade: number) => Promise<LessonOption[]>;
};

const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

// ─── Step Indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ["Học sinh", "Môn học", "Tham số đề", "Cài đặt & Giao"];
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
                    : "bg-surface-raised border-line text-slate-500"
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
  
  // Date-range scheduling state
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default to 3 days (today, tomorrow, next day)
    return d.toISOString().split("T")[0];
  });
  const [numExamsPerDay, setNumExamsPerDay] = useState(1);
  const [activeDays, setActiveDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>(["lesson"]); // e.g. ["lesson", "workbook", "review", "reflex"]

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterUnit, setSelectedFilterUnit] = useState<number | null>(null);

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

  // Toggle active scheduling day
  const toggleDay = (day: number) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((d) => d !== day));
    } else {
      setActiveDays([...activeDays, day].sort());
    }
  };

  // Toggle selected exam type filter for batch creation
  const toggleExamType = (type: string) => {
    if (selectedExamTypes.includes(type)) {
      setSelectedExamTypes(selectedExamTypes.filter((t) => t !== type));
    } else {
      setSelectedExamTypes([...selectedExamTypes, type]);
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
                : "border-line bg-surface-raised/60 hover:border-slate-600 hover:bg-surface-raised"
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
                : "border-line bg-surface-raised/60 hover:border-slate-600"
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

  // ── Step 3: Configure Parameters and Select Specific content if needed ───
  const StepParameters = () => {
    const uniqueUnits = Array.from(
      new Set(
        taskType === "exam"
          ? exams.flatMap((e) => e.units || [])
          : lessons.map((l) => l.unit_number).filter((u): u is number => u !== undefined)
      )
    ).sort((a, b) => a - b);

    const filteredExams = exams.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUnit = selectedFilterUnit === null || e.units.includes(selectedFilterUnit);
      
      const type = e.exam_type;
      const REVIEW_TYPES = ["review", "midterm", "final", "exam"];
      const matchesType = selectedExamTypes.some((selectedType) => {
        if (selectedType === "workbook") return !type;
        if (selectedType === "reflex") return type === "reflex";
        if (selectedType === "review") return type && REVIEW_TYPES.includes(type);
        if (selectedType === "lesson") return type && type !== "reflex" && !REVIEW_TYPES.includes(type);
        return false;
      });

      return matchesSearch && matchesUnit && matchesType;
    });

    const filteredLessons = lessons.filter((l) => {
      const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUnit = selectedFilterUnit === null || l.unit_number === selectedFilterUnit;
      return matchesSearch && matchesUnit;
    });

    const isLoading = taskType === "exam" ? loadingExams : loadingLessons;
    const filteredCount = taskType === "exam" ? filteredExams.length : filteredLessons.length;

    return (
      <div className="flex flex-col gap-4 text-slate-200">
        {/* Task Type Switch */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-line">
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
            📝 Đề luyện tập tự động ({exams.length})
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
            📖 Bài học cố định ({lessons.length})
          </button>
        </div>

        {taskType === "exam" ? (
          <div className="space-y-3">
            {/* Multi-select Exam Types */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                Chọn loại đề luyện tập
              </label>
              <div className="grid grid-cols-2 gap-1.5 bg-surface/40 p-2 rounded-xl border border-line">
                {[
                  { id: "lesson", label: "Luyện bài học" },
                  { id: "workbook", label: "Sách bài tập" },
                  { id: "review", label: "Đề ôn tập (Thi kì)" },
                  { id: "reflex", label: "Luyện phản xạ" }
                ].map((type) => {
                  const isChecked = selectedExamTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      onClick={() => toggleExamType(type.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all text-center border ${
                        isChecked
                          ? "bg-indigo-500/20 border-indigo-500/60 text-indigo-200"
                          : "bg-surface-raised/40 border-line text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by unit */}
            {uniqueUnits.length > 0 && (
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                  Chọn giới hạn Unit / Chương
                </label>
                <select
                  value={selectedFilterUnit === null ? "" : selectedFilterUnit}
                  onChange={(e) =>
                    setSelectedFilterUnit(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  className="w-full bg-surface-raised border-2 border-line rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                >
                  <option value="">Tất cả các Unit</option>
                  {uniqueUnits.map((u) => (
                    <option key={u} value={u}>
                      Unit {u}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Option to pin a specific exam instead of random */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Hoặc chọn ghim cố định 1 đề
                </label>
                {selectedExam && (
                  <button
                    onClick={() => setSelectedExam(null)}
                    className="text-[9px] font-black text-rose-400 uppercase tracking-widest hover:underline"
                  >
                    Bỏ ghim
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Tìm tên đề thi để ghim cố định..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-1.5 bg-surface-raised/80 border-2 border-line rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-bold"
              />

              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 size={16} className="animate-spin text-indigo-400" />
                </div>
              ) : filteredCount === 0 ? (
                <p className="text-[10px] text-slate-500 text-center py-2">Không tìm thấy đề khớp bộ lọc</p>
              ) : (
                <div className="flex flex-col gap-1 max-h-28 overflow-y-auto pr-1 custom-scrollbar">
                  {filteredExams.map((e) => {
                    const isSelected = selectedExam?.id === e.id;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setSelectedExam(e)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-left text-[10px] transition-all ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-line bg-surface-raised/40 hover:border-slate-600"
                        }`}
                      >
                        <span className="font-bold text-white truncate flex-1 pr-2">{e.title}</span>
                        <span className="text-[9px] text-slate-400 shrink-0 uppercase">U{e.units.join(",")}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Fixed Lesson Selection */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Chọn bài học cố định
              </label>
              <input
                type="text"
                placeholder="Tìm bài học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-1.5 bg-surface-raised border-2 border-line rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />

              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 size={16} className="animate-spin text-indigo-400" />
                </div>
              ) : filteredCount === 0 ? (
                <p className="text-[10px] text-slate-500 text-center py-2">Không tìm thấy bài học</p>
              ) : (
                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {filteredLessons.map((l) => {
                    const isSelected = selectedLesson?.id === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => setSelectedLesson(l)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-[11px] transition-all ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-line bg-surface-raised/40 hover:border-slate-600"
                        }`}
                      >
                        <span className="font-bold text-white truncate flex-1 pr-2">{l.title}</span>
                        {isSelected && <CheckCircle2 size={12} className="text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Step 4: Schedule Settings and Confirmation ─────────────────────────────
  const StepScheduleAndConfirm = () => {
    return (
      <div className="flex flex-col gap-3 text-slate-200">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">
          Cấu hình thời gian giao bài tự động
        </p>

        {/* Date inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wide block mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-surface-raised border-2 border-line rounded-xl px-2 py-1.5 text-xs text-white font-bold focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wide block mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-surface-raised border-2 border-line rounded-xl px-2 py-1.5 text-xs text-white font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* Active Weekdays selection */}
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wide block mb-1">
            Giao vào các ngày trong tuần
          </label>
          <div className="flex gap-1 justify-between bg-surface/30 p-1.5 rounded-xl border border-line">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const isActive = activeDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`flex-1 py-1 rounded-lg text-[9px] font-black text-center transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-surface-raised/40 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {DAY_LABELS[day - 1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Number of tasks per day */}
        {taskType === "exam" && (
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wide block mb-1">
              Số lượng đề luyện tập mỗi ngày
            </label>
            <select
              value={numExamsPerDay}
              onChange={(e) => setNumExamsPerDay(Number(e.target.value))}
              className="w-full bg-surface-raised border border-line rounded-xl px-2 py-1.5 text-xs text-white font-bold"
            >
              <option value={1}>Giao 1 đề / ngày</option>
              <option value={2}>Giao 2 đề / ngày</option>
              <option value={3}>Giao 3 đề / ngày</option>
            </select>
          </div>
        )}

        {/* Confirmation Summary */}
        <div className="rounded-xl bg-surface-raised/80 border border-line p-3 space-y-2 mt-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Học sinh:</span>
            <span className="font-bold text-slate-200">{selectedStudent?.display_name}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Môn học:</span>
            <span className="font-bold text-slate-200">{selectedSubject?.name}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Nội dung:</span>
            <span className="font-bold text-indigo-300">
              {taskType === "exam" ? (
                selectedExam ? `Ghim đề: ${selectedExam.title}` : `Tự động tạo từ ${selectedExamTypes.length} nhóm đề`
              ) : (
                `Bài học: ${selectedLesson?.title || "Chưa chọn"}`
              )}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ── Navigation logic ─────────────────────────────────────────────────────

  const canNext = () => {
    if (step === 1) return !!selectedStudent;
    if (step === 2) return !!selectedSubject;
    if (step === 3) {
      if (taskType === "lesson") return !!selectedLesson;
      // For auto exam generator, either have specific exam pinned or types selected
      return !!selectedExam || selectedExamTypes.length > 0;
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 2 && selectedSubject && selectedStudent) {
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
    if (taskType === "exam" && !selectedExam && selectedExamTypes.length === 0) return;
    if (taskType === "lesson" && !selectedLesson) return;
    
    setError(null);

    startTransition(async () => {
      const result = await createParentTask({
        student_id: selectedStudent.id,
        subject_slug: selectedSubject.slug,
        unit_numbers: selectedFilterUnit ? [selectedFilterUnit] : [],
        frequency: "daily",
        active_days: activeDays,
        exam_id: taskType === "exam" ? selectedExam?.id : null,
        lesson_node_id: taskType === "lesson" ? selectedLesson?.id : null,
        start_date: startDate,
        end_date: endDate,
        num_exams: numExamsPerDay,
        exam_types: taskType === "exam" ? selectedExamTypes : [],
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
        {step === 3 && <StepParameters />}
        {step === 4 && <StepScheduleAndConfirm />}
      </div>

      {error && (
        <p className="text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
          ⚠️ {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-line">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-line text-slate-300 font-black text-xs uppercase tracking-wide hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={14} /> Quay lại
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border-2 border-line text-slate-500 font-black text-xs uppercase tracking-wide hover:bg-slate-700 hover:text-white transition-all"
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
