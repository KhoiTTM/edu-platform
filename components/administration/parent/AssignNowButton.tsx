"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { ClipboardCheck, Loader2, Check, X } from "lucide-react";
import { assignExamNow, getStudentList } from "@/app/(app)/(administration)/phu-huynh/actions";
import type { StudentProfile } from "@/app/(app)/(administration)/phu-huynh/actions";

// Nút nhỏ cạnh mỗi dòng đề trên /luyen-tap/[subject] — cho phụ huynh giao đúng đề đang xem
// cho 1 học sinh ngay tại chỗ, không cần qua TaskWizard 4 bước (dành cho lịch lặp nhiều
// ngày). Chỉ tạo 1 daily_tasks cho hôm nay — xem assignExamNow() trong actions.ts.
export function AssignNowButton({ examId, examTitle }: { examId: string; examTitle: string }) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<StudentProfile[] | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY + 6, left: rect.right + window.scrollX - 224 });
    }
    setFeedback(null);
    setOpen((prev) => !prev);
    if (!students) {
      getStudentList().then(setStudents);
    }
  };

  const handleAssign = (studentId: string) => {
    startTransition(async () => {
      const result = await assignExamNow(studentId, examId);
      if (result.error) {
        setFeedback({ type: "error", text: result.error });
      } else {
        setFeedback({ type: "success", text: "Đã giao thành công!" });
        setTimeout(() => setOpen(false), 1200);
      }
    });
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        title="Giao ngay đề này cho học sinh"
        className="inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150 shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-teal-500/10"
      >
        <ClipboardCheck size={13} />
        Giao ngay
      </button>

      {open && coords && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          style={{ position: "absolute", top: coords.top, left: Math.max(8, coords.left) }}
          className="z-50 w-56 rounded-xl border border-line bg-surface-raised shadow-2xl p-2.5"
        >
          <p className="text-[9px] font-black uppercase tracking-wide text-ink-muted mb-2 px-1 line-clamp-1">
            Giao &quot;{examTitle}&quot; cho:
          </p>

          {!students && (
            <div className="flex items-center justify-center py-4">
              <Loader2 size={14} className="animate-spin text-ink-muted" />
            </div>
          )}

          {students && students.length === 0 && (
            <p className="text-[11px] text-ink-muted text-center py-3">Chưa có học sinh nào.</p>
          )}

          {students && students.length > 0 && (
            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
              {students.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={isPending}
                  onClick={() => handleAssign(s.id)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-line hover:border-sky-500/50 hover:bg-sky-500/10 text-left transition-all disabled:opacity-50"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-500/15 flex items-center justify-center text-[9px] font-black text-sky-300 shrink-0">
                    {(s.display_name || "?").charAt(0).toUpperCase()}
                  </span>
                  <span className="text-[11px] font-bold text-ink truncate">{s.display_name || s.email}</span>
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <div
              className={clsx(
                "mt-2 flex items-center gap-1.5 text-[10px] font-bold px-2 py-1.5 rounded-lg",
                feedback.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              )}
            >
              {feedback.type === "success" ? <Check size={11} /> : <X size={11} />}
              {feedback.text}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
