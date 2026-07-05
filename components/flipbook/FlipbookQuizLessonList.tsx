import Link from "next/link";
import { Book, ChevronRight, BookOpen } from "lucide-react";

interface LessonSummary {
  bai: number;
  title: string;
  questionCount: number;
}

interface BreadcrumbLink {
  label: string;
  href: string;
}

interface FlipbookQuizLessonListProps {
  bookSlug: string;
  bookTitle: string;
  lessons: LessonSummary[];
  breadcrumbs?: BreadcrumbLink[];
  sourceBookUrl?: string;
}

export function FlipbookQuizLessonList({
  bookSlug,
  bookTitle,
  lessons,
  breadcrumbs = [],
  sourceBookUrl,
}: FlipbookQuizLessonListProps) {
  const breadcrumbNav = breadcrumbs.length > 0 && (
    <nav className="flex items-center flex-wrap gap-1 mb-4 text-sm">
      {breadcrumbs.map((bc) => (
        <span key={bc.href} className="flex items-center gap-1">
          <Link href={bc.href} className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
            {bc.label}
          </Link>
          <ChevronRight size={14} className="text-slate-600" />
        </span>
      ))}
    </nav>
  );

  if (lessons.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        {breadcrumbNav}
        <div className="flex items-center justify-center h-64 text-slate-400">
          <p>Chưa có bài quiz nào cho sách này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {breadcrumbNav}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Book size={22} className="text-cyan-400 shrink-0" />
          <h1 className="text-2xl font-black text-white truncate">{bookTitle}</h1>
        </div>
        {sourceBookUrl && (
          <a
            href={sourceBookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-colors border border-line"
          >
            <BookOpen size={14} />
            Xem sách gốc
          </a>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-6">Chọn một bài để bắt đầu luyện tập.</p>

      <div className="grid gap-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.bai}
            href={`/flipbooks/${bookSlug}/quiz/${lesson.bai}`}
            className="flex items-center justify-between p-4 rounded-xl bg-surface border border-line hover:border-cyan-500/50 hover:bg-surface-raised/80 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-cyan-500/10 text-cyan-400 font-black flex items-center justify-center">
                {lesson.bai}
              </div>
              <div>
                <p className="text-white font-bold">{lesson.title}</p>
                <p className="text-slate-500 text-xs">{lesson.questionCount} câu hỏi</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
