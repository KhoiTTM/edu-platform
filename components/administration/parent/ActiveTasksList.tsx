"use client";

import { useState, useTransition } from "react";
import {
  Trash2,
  Power,
  PowerOff,
  BookOpen,
  Calendar,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  Clock,
} from "lucide-react";
import { toggleParentTask, deleteParentTask } from "@/app/(app)/(administration)/phu-huynh/actions";
import type { ParentTask } from "@/app/(app)/(administration)/phu-huynh/actions";

// ─── Helpers ────────────────────────────────────────────────────────────────

const SUBJECT_META: Record<string, { label: string; icon: string; colorClass: string }> = {
  toan: { label: "Toán", icon: "🔢", colorClass: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
  tieng_viet: { label: "Tiếng Việt", icon: "📖", colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  tieng_anh: { label: "Tiếng Anh", icon: "🌍", colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  "mindset-ielts": { label: "IELTS", icon: "🎓", colorClass: "text-violet-400 bg-violet-500/10 border-violet-500/30" },
  "pre-a1-starter": { label: "Pre A1", icon: "⭐", colorClass: "text-pink-400 bg-pink-500/10 border-pink-500/30" },
  khtn: { label: "KHTN", icon: "🧪", colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ─── Single Task Row ─────────────────────────────────────────────────────────

function TaskRow({
  task,
  onChanged,
}: {
  task: ParentTask;
  onChanged: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const meta = SUBJECT_META[task.subject_slug] || {
    label: task.subject_slug,
    icon: "📚",
    colorClass: "text-slate-400 bg-slate-700/30 border-slate-600",
  };

  const handleToggle = () => {
    startTransition(async () => {
      await toggleParentTask(task.id, !task.is_active);
      onChanged();
    });
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      await deleteParentTask(task.id);
      onChanged();
    });
  };

  // "daily_tasks" (and its completed_at column) only ever gets created for exam-type
  // tasks (see supabase/migrations/043_parent_tasks.sql — exam_id is NOT NULL there).
  // Lesson-type tasks (lesson_node_id) never get a daily_tasks row, so completed_at
  // is always null for them — their completion instead shows up as score_text
  // ("Đã xong") computed from learning_sessions in getMyParentTasks(). Treat either
  // signal as "done" so lesson tasks don't permanently show "Chưa làm".
  const isDone = !!task.completed_at || !!task.score_text;

  return (
    <div
      className={`rounded-xl border-2 p-3 transition-all ${
        task.is_active
          ? "border-line bg-surface/40"
          : "border-line/50 bg-surface/10 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Subject badge */}
          <span
            className={`text-base shrink-0 w-8 h-8 flex items-center justify-center rounded-xl border ${meta.colorClass}`}
          >
            {meta.icon}
          </span>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-wide ${meta.colorClass.split(" ")[0]}`}>
                {meta.label}
              </span>
            </div>

            {/* Content title */}
            <p className="text-xs font-bold text-slate-200 mt-0.5 truncate">
              {task.lesson_title ? (
                <span>📖 {task.lesson_title}</span>
              ) : task.exam_title ? (
                <span>📝 {task.exam_title}</span>
              ) : (
                "📋 Nhiệm vụ chung"
              )}
            </p>
          </div>
        </div>

        {/* Status Badge & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Done Status Badge */}
          <div className="flex items-center gap-2">
            {isDone ? (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={10} />
                Đã làm {task.score_text ? `(${task.score_text})` : ""}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-line bg-surface-raised/80 text-slate-400">
                <Clock size={10} />
                Chưa làm
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isPending ? (
              <Loader2 size={14} className="animate-spin text-slate-400" />
            ) : (
              <>
                <button
                  onClick={handleToggle}
                  title={task.is_active ? "Tắt nhiệm vụ" : "Bật nhiệm vụ"}
                  className={`p-1.5 rounded-lg border-2 transition-all ${
                    task.is_active
                      ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "text-slate-500 border-line bg-surface-raised hover:text-emerald-400 hover:border-emerald-500/40"
                  }`}
                >
                  {task.is_active ? <Power size={11} /> : <PowerOff size={11} />}
                </button>
                <button
                  onClick={handleDelete}
                  title={confirmDelete ? "Nhấn lần nữa để xóa" : "Xóa nhiệm vụ"}
                  className={`p-1.5 rounded-lg border-2 transition-all ${
                    confirmDelete
                      ? "text-white border-rose-500 bg-rose-500 animate-pulse"
                      : "text-slate-500 border-line bg-surface-raised hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10"
                  }`}
                >
                  <Trash2 size={11} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {confirmDelete && (
        <p className="text-[9px] text-rose-400 font-bold mt-2 text-center animate-pulse">
          Nhấn 🗑 lần nữa để xóa nhiệm vụ này
        </p>
      )}
    </div>
  );
}

// ─── Active Tasks List ───────────────────────────────────────────────────────

type Props = {
  tasks: ParentTask[];
  onChanged: () => void;
};

export function ActiveTasksList({ tasks, onChanged }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-line/60 p-8 text-center bg-slate-950/20">
        <p className="text-slate-500 text-sm font-bold">Chưa có nhiệm vụ nào</p>
        <p className="text-slate-600 text-xs mt-1">
          Nhấn &quot;Giao Nhiệm Vụ&quot; để tạo nhiệm vụ đầu tiên
        </p>
      </div>
    );
  }

  // Group tasks by: Student Profile -> Creation Date (day)
  // Let's create helper type and structure
  const grouped: Record<string, Record<string, ParentTask[]>> = {};

  tasks.forEach((task) => {
    const studentName = task.student?.display_name || "Học sinh";
    const dateKey = fmtDate(task.created_at);

    if (!grouped[studentName]) grouped[studentName] = {};
    if (!grouped[studentName][dateKey]) grouped[studentName][dateKey] = [];
    
    grouped[studentName][dateKey].push(task);
  });

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([studentName, dates]) => (
        <div key={studentName} className="space-y-4">
          {/* Student Heading */}
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User size={12} />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Học sinh: {studentName}
            </h3>
          </div>

          <div className="space-y-4 pl-2 border-l border-line/80">
            {Object.entries(dates).map(([date, dateTasks]) => (
              <div key={date} className="space-y-2">
                {/* Date Header */}
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar size={11} />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Giao ngày {date}
                  </span>
                </div>

                {/* Tasks under this date */}
                <div className="flex flex-col gap-2">
                  {dateTasks.map((task) => (
                    <TaskRow key={task.id} task={task} onChanged={onChanged} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
