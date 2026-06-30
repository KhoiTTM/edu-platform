"use client";

import { useState, useTransition } from "react";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";
import type { LearningHistoryEntry } from "@/app/(app)/(administration)/phu-huynh/actions";

// ─── Helpers ────────────────────────────────────────────────────────────────

const SUBJECT_META: Record<string, { label: string; icon: string; color: string }> = {
  toan: { label: "Toán", icon: "🔢", color: "text-sky-400" },
  tieng_viet: { label: "Tiếng Việt", icon: "📖", color: "text-amber-400" },
  tieng_anh: { label: "Tiếng Anh", icon: "🌍", color: "text-emerald-400" },
  "mindset-ielts": { label: "IELTS", icon: "🎓", color: "text-violet-400" },
  "pre-a1-starter": { label: "Pre A1", icon: "⭐", color: "text-pink-400" },
  khtn: { label: "KHTN", icon: "🧪", color: "text-cyan-400" },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtDuration(seconds: number): string {
  if (!seconds || seconds === 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s > 0 ? s + "s" : ""}`;
}

function calcStats(history: LearningHistoryEntry[]) {
  const totalMinutes = history.reduce(
    (acc, h) => acc + Math.round((h.duration_seconds || 0) / 60),
    0
  );
  const sessions = history.length;

  // Count subjects
  const subjectMap: Record<string, number> = {};
  history.forEach((h) => {
    subjectMap[h.subject_slug] = (subjectMap[h.subject_slug] || 0) + 1;
  });
  const topSubject = Object.entries(subjectMap).sort(([, a], [, b]) => b - a)[0]?.[0];

  // Streak: count consecutive days with at least one session
  const days = new Set(
    history.map((h) => new Date(h.started_at).toDateString())
  );

  return { totalMinutes, sessions, topSubject, activeDays: days.size };
}

// ─── Component ──────────────────────────────────────────────────────────────

type Props = {
  studentName: string;
  studentGrade: number;
  history: LearningHistoryEntry[];
};

export function StudentHistoryCard({ studentName, studentGrade, history }: Props) {
  const [expanded, setExpanded] = useState(false);
  const stats = calcStats(history);

  const displayHistory = expanded ? history : history.slice(0, 5);

  return (
    <div className="rounded-2xl border-2 border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shrink-0">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-white text-sm">{studentName}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Lớp {studentGrade}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick stats */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-lg px-2 py-1">
              <Clock size={12} />
              <span className="text-[10px] font-black">{stats.totalMinutes}p</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-1">
              <TrendingUp size={12} />
              <span className="text-[10px] font-black">{stats.sessions} buổi</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1">
              <Calendar size={12} />
              <span className="text-[10px] font-black">{stats.activeDays} ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* History list */}
      {history.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <p className="text-slate-500 text-sm">Chưa có lịch sử học tập</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800/60">
          {displayHistory.map((entry) => {
            const meta = SUBJECT_META[entry.subject_slug] || {
              label: entry.subject_slug,
              icon: "📚",
              color: "text-slate-400",
            };
            const metrics = entry.summary_metrics as any;
            const isExam = metrics?.type === "exam";
            const score = metrics?.score;
            const total = metrics?.total;
            const hasScore = score !== null && score !== undefined && total;
            const topicTitle = metrics?.unit_topic || (isExam ? "Bài kiểm tra" : "Học bài");

            return (
              <div
                key={entry.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/30 transition-colors"
              >
                <span className="text-lg shrink-0">{meta.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {topicTitle}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {fmtDate(entry.started_at)}
                    {entry.duration_seconds > 0 && (
                      <span className="ml-2 text-slate-600">
                        · {fmtDuration(entry.duration_seconds)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {isExam && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        hasScore
                          ? score / total >= 0.8
                            ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                            : score / total >= 0.5
                            ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                            : "text-rose-400 border-rose-500/30 bg-rose-500/10"
                          : "text-slate-400 border-slate-700 bg-slate-800"
                      }`}
                    >
                      {hasScore ? `${score}/${total}` : "Đã làm"}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${meta.color}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show more */}
      {history.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 hover:bg-slate-800/30 transition-all border-t border-slate-800/60"
        >
          {expanded ? (
            <>
              <ChevronUp size={12} /> Thu gọn
            </>
          ) : (
            <>
              <ChevronDown size={12} /> Xem thêm {history.length - 5} buổi
            </>
          )}
        </button>
      )}
    </div>
  );
}
