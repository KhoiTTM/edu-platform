"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  ClipboardList,
  History,
  Plus,
  RefreshCw,
  Loader2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Database,
} from "lucide-react";
import { TaskWizard } from "@/components/administration/parent/TaskWizard";
import { StudentHistoryCard } from "@/components/administration/parent/StudentHistoryCard";
import { ActiveTasksList } from "@/components/administration/parent/ActiveTasksList";
import { ExamBankExplorer } from "@/components/administration/parent/ExamBankExplorer";
import {
  getStudentList,
  getStudentHistory,
  getMyParentTasks,
  getExamsForSubject,
  getLessonsForSubject,
  checkParentAccess,
} from "./actions";
import type { StudentProfile, ParentTask, LearningHistoryEntry } from "./actions";

// ─── Subject list (fixed) ────────────────────────────────────────────────────

const SUBJECTS = [
  { slug: "toan", name: "Toán", icon: "🔢", color: "sky" },
  { slug: "tieng_viet", name: "Tiếng Việt", icon: "📖", color: "amber" },
  { slug: "tieng_anh", name: "Tiếng Anh", icon: "🌍", color: "emerald" },
  { slug: "mindset-ielts", name: "IELTS", icon: "🎓", color: "violet" },
  { slug: "pre-a1-starter", name: "Pre A1", icon: "⭐", color: "pink" },
];

// ─── Tab definition ──────────────────────────────────────────────────────────

type Tab = "history" | "tasks" | "exambank";

// ─── Student History Section ─────────────────────────────────────────────────

function HistorySection({ students }: { students: StudentProfile[] }) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || ""
  );
  const [history, setHistory] = useState<LearningHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(async (studentId: string) => {
    if (!studentId) return;
    setLoading(true);
    const data = await getStudentHistory(studentId);
    setHistory(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedStudentId) loadHistory(selectedStudentId);
  }, [selectedStudentId, loadHistory]);

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  if (students.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <Users size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-bold">Chưa có học sinh nào trong hệ thống</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Student picker */}
      <div className="flex items-center gap-2 flex-wrap">
        {students.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStudentId(s.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
              selectedStudentId === s.id
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                : "border-line bg-surface-raised/50 text-slate-400 hover:border-slate-600 hover:text-white"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-black">
              {s.display_name.charAt(0).toUpperCase()}
            </div>
            {s.display_name}
            <span className="text-[9px] opacity-60">L{s.grade}</span>
          </button>
        ))}
      </div>

      {/* History display */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-indigo-400" />
        </div>
      ) : selectedStudent ? (
        <StudentHistoryCard
          studentName={selectedStudent.display_name}
          studentGrade={selectedStudent.grade}
          history={history}
        />
      ) : null}
    </div>
  );
}

// ─── Tasks Section ────────────────────────────────────────────────────────────

function TasksSection({ students }: { students: StudentProfile[] }) {
  const [tasks, setTasks] = useState<ParentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    const data = await getMyParentTasks();
    setTasks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSuccess = () => {
    setShowWizard(false);
    setSuccessMsg("✅ Nhiệm vụ đã được tạo! Học sinh sẽ thấy bài ngay hôm nay.");
    loadTasks();
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Success banner */}
      {successMsg && (
        <div className="rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 px-4 py-3 text-xs font-bold text-emerald-400 animate-in slide-in-from-top-2">
          {successMsg}
        </div>
      )}

      {/* Wizard or button */}
      {showWizard ? (
        <div className="rounded-2xl bg-surface/80 border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] p-5">
          <TaskWizard
            students={students}
            subjects={SUBJECTS}
            onSuccess={handleSuccess}
            onCancel={() => setShowWizard(false)}
            getExamsForSubject={getExamsForSubject}
            getLessonsForSubject={getLessonsForSubject}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowWizard(true)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 text-indigo-400 font-black text-sm uppercase tracking-wide hover:bg-indigo-500/10 hover:border-indigo-400 transition-all group"
        >
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Giao Nhiệm Vụ Mới
        </button>
      )}

      {/* Task list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Nhiệm vụ đang chạy ({tasks.filter((t) => t.is_active).length})
          </h3>
          <button
            onClick={loadTasks}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-indigo-400" />
          </div>
        ) : (
          <ActiveTasksList tasks={tasks} onChanged={loadTasks} />
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ParentPage() {
  const [tab, setTab] = useState<Tab>("tasks");
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const access = await checkParentAccess();
      if (!access.hasAccess) {
        setHasAccess(false);
        setLoadingStudents(false);
        return;
      }
      setHasAccess(true);
      const data = await getStudentList();
      setStudents(data);
      setLoadingStudents(false);
    })();
  }, []);

  if (hasAccess === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 flex items-center justify-center text-rose-500 mb-4 animate-bounce">
          🔒
        </div>
        <h2 className="text-xl font-black text-rose-500 mb-2">Không Có Quyền Truy Cập</h2>
        <p className="text-slate-400 text-sm max-w-md">
          Tài khoản của bạn không được phân quyền để sử dụng tính năng Phụ Huynh. Vui lòng liên hệ Admin để được hỗ trợ.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_4px_0_rgba(109,40,217,0.8)]">
          <Users size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-black text-2xl text-white tracking-tight">
            Phụ Huynh
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Theo dõi & Giao nhiệm vụ học tập
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1.5 bg-surface/60 border-2 border-line rounded-2xl p-1.5">
        <button
          onClick={() => setTab("tasks")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
            tab === "tasks"
              ? "bg-indigo-600 text-white border-2 border-indigo-400 shadow-[0_3px_0_rgba(55,48,163,1)]"
              : "text-slate-400 hover:text-white hover:bg-surface-raised border-2 border-transparent"
          }`}
        >
          <Target size={14} />
          Giao Nhiệm Vụ
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
            tab === "history"
              ? "bg-indigo-600 text-white border-2 border-indigo-400 shadow-[0_3px_0_rgba(55,48,163,1)]"
              : "text-slate-400 hover:text-white hover:bg-surface-raised border-2 border-transparent"
          }`}
        >
          <History size={14} />
          Lịch Sử Học Tập
        </button>
        <button
          onClick={() => setTab("exambank")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
            tab === "exambank"
              ? "bg-indigo-600 text-white border-2 border-indigo-400 shadow-[0_3px_0_rgba(55,48,163,1)]"
              : "text-slate-400 hover:text-white hover:bg-surface-raised border-2 border-transparent"
          }`}
        >
          <Database size={14} />
          Exam Bank
        </button>
      </div>

      {/* Content */}
      {loadingStudents ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-indigo-400" />
        </div>
      ) : (
        <div className="pb-8">
          {tab === "history" && <HistorySection students={students} />}
          {tab === "tasks" && <TasksSection students={students} />}
          {tab === "exambank" && <ExamBankExplorer subjects={SUBJECTS} />}
        </div>
      )}
    </div>
  );
}
