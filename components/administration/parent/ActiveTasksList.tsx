"use client";

import { useState, useTransition } from "react";
import {
  Trash2,
  Power,
  PowerOff,
  BookOpen,
  Calendar,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
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
};

const DAY_LABELS: Record<number, string> = {
  1: "T2", 2: "T3", 3: "T4", 4: "T5", 5: "T6", 6: "T7", 7: "CN"
};

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

  return (
    <div
      className={`rounded-xl border-2 p-3 transition-all ${
        task.is_active
          ? "border-slate-700 bg-slate-900/60"
          : "border-slate-800/50 bg-slate-900/30 opacity-60"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Subject badge */}
        <span
          className={`text-lg shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border ${meta.colorClass}`}
        >
          {meta.icon}
        </span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-black uppercase tracking-wide ${meta.colorClass.split(" ")[0]}`}>
              {meta.label}
            </span>
            {task.student && (
              <span className="text-[10px] text-slate-400 font-bold">
                → {task.student.display_name}
              </span>
            )}
          </div>

          {/* Units */}
          <p className="text-[10px] text-slate-500 font-bold mt-0.5">
            {task.lesson_title ? (
              <span className="text-emerald-400">📖 Bài học: {task.lesson_title}</span>
            ) : task.exam_title ? (
              <span className="text-violet-400">📝 Đề: {task.exam_title}</span>
            ) : task.unit_numbers.length === 0 ? (
              "📋 Tất cả Unit"
            ) : (
              `📋 Unit ${task.unit_numbers.sort((a, b) => a - b).join(", ")}`
            )}
          </p>

          {/* Active days pills */}
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {task.active_days.sort((a, b) => a - b).map((d) => (
              <span
                key={d}
                className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border ${
                  task.is_active
                    ? "text-indigo-300 border-indigo-500/40 bg-indigo-500/10"
                    : "text-slate-500 border-slate-700 bg-slate-800"
                }`}
              >
                {DAY_LABELS[d]}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
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
                    : "text-slate-500 border-slate-700 bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/40"
                }`}
              >
                {task.is_active ? <Power size={12} /> : <PowerOff size={12} />}
              </button>
              <button
                onClick={handleDelete}
                title={confirmDelete ? "Nhấn lần nữa để xóa" : "Xóa nhiệm vụ"}
                className={`p-1.5 rounded-lg border-2 transition-all ${
                  confirmDelete
                    ? "text-white border-rose-500 bg-rose-500 animate-pulse"
                    : "text-slate-500 border-slate-700 bg-slate-800 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10"
                }`}
              >
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      </div>

      {confirmDelete && (
        <p className="text-[10px] text-rose-400 font-bold mt-2 text-center animate-pulse">
          Nhấn 🗑 một lần nữa để xóa vĩnh viễn
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
      <div className="rounded-2xl border-2 border-dashed border-slate-700/60 p-8 text-center">
        <p className="text-slate-500 text-sm font-bold">Chưa có nhiệm vụ nào</p>
        <p className="text-slate-600 text-xs mt-1">
          Nhấn &quot;Giao Nhiệm Vụ&quot; để tạo nhiệm vụ đầu tiên
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} onChanged={onChanged} />
      ))}
    </div>
  );
}
