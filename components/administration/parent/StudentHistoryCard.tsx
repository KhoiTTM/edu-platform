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
  Flame,
  LogIn,
} from "lucide-react";
import type { LearningHistoryEntry, StudentDashboardStats, TimelineEntry } from "@/app/(app)/(administration)/phu-huynh/actions";

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

function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
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
  dashboardStats?: StudentDashboardStats | null;
  todayTimeline?: TimelineEntry[];
};

export function StudentHistoryCard({ studentName, studentGrade, history, dashboardStats, todayTimeline = [] }: Props) {
  const [viewMode, setViewMode] = useState<'today' | 'history'>('today');
  const [expanded, setExpanded] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | '1d' | '7d'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'learning' | 'exam'>('all');

  // Filter history entries based on user selection
  const filteredHistory = history.filter((entry) => {
    // 1. Time Filter
    if (timeFilter !== 'all') {
      const entryTime = new Date(entry.started_at).getTime();
      const cutoff = timeFilter === '1d' 
        ? Date.now() - 24 * 60 * 60 * 1000 
        : Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (entryTime < cutoff) return false;
    }

    // 2. Subject Filter
    if (subjectFilter !== 'all' && entry.subject_slug !== subjectFilter) {
      return false;
    }

    // 3. Type Filter
    if (typeFilter !== 'all') {
      const isExam = entry.summary_metrics?.type === 'exam';
      if (typeFilter === 'learning' && isExam) return false;
      if (typeFilter === 'exam' && !isExam) return false;
    }

    return true;
  });

  const stats = calcStats(filteredHistory);
  const displayHistory = expanded ? filteredHistory : filteredHistory.slice(0, 5);

  // Extract unique subjects available in current history for dynamic subject filter
  const uniqueSubjects = Array.from(new Set(history.map(h => h.subject_slug)));

  return (
    <div className="rounded-2xl border-2 border-line bg-surface/60 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
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
              <span className="text-[10px] font-black">
                {dashboardStats?.total_learning_minutes ?? stats.totalMinutes}p
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-1">
              <TrendingUp size={12} />
              <span className="text-[10px] font-black">{stats.sessions} buổi</span>
            </div>
            {dashboardStats && dashboardStats.current_streak > 0 ? (
              <div className="flex items-center gap-1.5 text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1">
                <Flame size={12} />
                <span className="text-[10px] font-black">{dashboardStats.current_streak} ngày liên tục</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1">
                <Calendar size={12} />
                <span className="text-[10px] font-black">{stats.activeDays} ngày</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subject progress */}
      {dashboardStats?.subject_progress && Object.keys(dashboardStats.subject_progress).length > 0 && (
        <div className="px-4 py-3 border-b border-line flex flex-wrap gap-2">
          {Object.entries(dashboardStats.subject_progress).map(([slug, progress]) => {
            const meta = SUBJECT_META[slug] || { label: slug, icon: "📚", color: "text-slate-400" };
            const pct =
              typeof progress === "number"
                ? progress
                : (progress as any)?.percent ?? (progress as any)?.progress ?? null;
            return (
              <div
                key={slug}
                className="flex items-center gap-1.5 bg-surface-raised/50 border border-line rounded-lg px-2.5 py-1"
              >
                <span className="text-sm">{meta.icon}</span>
                <span className={`text-[10px] font-bold ${meta.color}`}>{meta.label}</span>
                {pct !== null && (
                  <span className="text-[10px] font-black text-slate-300">{Math.round(pct)}%</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* View mode toggle */}
      <div className="flex border-b border-line">
        {(['today', 'history'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setViewMode(m)}
            className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === m
                ? "text-indigo-300 bg-indigo-500/10 border-b-2 border-indigo-500"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {m === 'today' ? 'Hôm nay' : 'Lịch sử'}
          </button>
        ))}
      </div>

      {viewMode === 'today' ? (
        <div className="divide-y divide-slate-800/60">
          {todayTimeline.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-slate-500 text-sm">Chưa có hoạt động nào hôm nay</p>
            </div>
          ) : (
            todayTimeline.map((entry, idx) => {
              if (entry.kind === "login") {
                return (
                  <div key={`login-${idx}`} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <LogIn size={14} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-sky-300">Đăng nhập</p>
                      <p className="text-[10px] text-slate-500">{fmtTime(entry.at)}</p>
                    </div>
                  </div>
                );
              }

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
                <div key={entry.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-raised/30 transition-colors">
                  <span className="text-lg shrink-0">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-200 truncate">{topicTitle}</p>
                    <p className="text-[10px] text-slate-500">
                      {fmtTime(entry.started_at)}
                      {entry.ended_at && entry.duration_seconds > 0 && (
                        <span className="ml-1 text-slate-600">→ {fmtTime(entry.ended_at)}</span>
                      )}
                      {entry.duration_seconds > 0 && (
                        <span className="ml-2 text-slate-600">· {fmtDuration(entry.duration_seconds)}</span>
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
                            : "text-slate-400 border-line bg-surface-raised"
                        }`}
                      >
                        {hasScore ? `${score}/${total}` : "Đã làm"}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
      <>
      {/* Filters Bar */}
      <div className="bg-slate-950/40 px-4 py-3 border-b border-line/80 flex flex-col gap-3.5">
        {/* Time filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider w-16">Thời gian:</span>
          {(['all', '1d', '7d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-3 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-wider transition-all ${
                timeFilter === t
                  ? "border-sky-500 bg-sky-500/10 text-sky-400"
                  : "border-line bg-surface/40 text-slate-400 hover:border-line hover:text-white"
              }`}
            >
              {t === 'all' ? 'Tất cả' : t === '1d' ? '24 Giờ' : '7 Ngày'}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider w-16">Hình thức:</span>
          {(['all', 'learning', 'exam'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-wider transition-all ${
                typeFilter === t
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                  : "border-line bg-surface/40 text-slate-400 hover:border-line hover:text-white"
              }`}
            >
              {t === 'all' ? 'Tất cả' : t === 'learning' ? 'Học Bài' : 'Luyện Tập'}
            </button>
          ))}
        </div>

        {/* Subject filters */}
        {uniqueSubjects.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider w-16">Môn học:</span>
            <button
              onClick={() => setSubjectFilter('all')}
              className={`px-3 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-wider transition-all ${
                subjectFilter === 'all'
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-line bg-surface/40 text-slate-400 hover:border-line hover:text-white"
              }`}
            >
              Tất cả
            </button>
            {uniqueSubjects.map((subSlug) => {
              const meta = SUBJECT_META[subSlug] || { label: subSlug };
              return (
                <button
                  key={subSlug}
                  onClick={() => setSubjectFilter(subSlug)}
                  className={`px-3 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-wider transition-all ${
                    subjectFilter === subSlug
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-line bg-surface/40 text-slate-400 hover:border-line hover:text-white"
                  }`}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* History list */}
      {filteredHistory.length === 0 ? (
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
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-raised/30 transition-colors"
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
                          : "text-slate-400 border-line bg-surface-raised"
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
      {filteredHistory.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 hover:bg-surface-raised/30 transition-all border-t border-line/60"
        >
          {expanded ? (
            <>
              <ChevronUp size={12} /> Thu gọn
            </>
          ) : (
            <>
              <ChevronDown size={12} /> Xem thêm {filteredHistory.length - 5} buổi
            </>
          )}
        </button>
      )}
      </>
      )}
    </div>
  );
}
