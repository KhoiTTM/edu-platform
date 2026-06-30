import fs from "fs/promises";
import path from "path";
import { FlipbookQuizLessonList } from "@/components/flipbook/FlipbookQuizLessonList";

interface QuizQuestion {
  id: string;
  bai: number;
  cau: number;
  type: "multiple_choice" | "essay";
  stem: string;
  options?: string[];
  answer?: string | null;
}

const BOOK_TITLES: Record<string, string> = {
  khtn7: "Sách Bài Tập KHTN 7",
};

// Google Drive (or other) link to the original scanned book, so students can
// look at the actual page images/figures while answering text-only questions.
const BOOK_SOURCE_URLS: Record<string, string> = {
  khtn7: "https://drive.google.com/file/d/13zq-lbCJaAHEqSRx1JWhfX1idtn6jgEP/view?usp=sharing",
};

// Lesson titles from the book's table of contents (OCR'd from the source PDF).
// Add entries here as more lessons get OCR'd into content/[bookSlug]-questions.json.
const LESSON_TITLES: Record<string, Record<number, string>> = {
  khtn7: {
    1: "Bài 1. Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
    2: "Bài 2. Nguyên tử",
    3: "Bài 3. Nguyên tố hoá học",
    4: "Bài 4. Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
    5: "Bài 5. Phân tử - Đơn chất - Hợp chất",
  },
};

async function loadQuestions(bookSlug: string): Promise<QuizQuestion[]> {
  try {
    const filePath = path.join(process.cwd(), "content", `${bookSlug}-questions.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default async function FlipbookQuizLessonsPage({ params }: { params: Promise<{ bookSlug: string }> }) {
  const { bookSlug } = await params;
  const questions = await loadQuestions(bookSlug);
  const bookTitle = BOOK_TITLES[bookSlug] ?? bookSlug;
  const lessonTitles = LESSON_TITLES[bookSlug] ?? {};

  const countByLesson = new Map<number, number>();
  for (const q of questions) {
    countByLesson.set(q.bai, (countByLesson.get(q.bai) ?? 0) + 1);
  }

  const lessons = Array.from(countByLesson.entries())
    .sort(([a], [b]) => a - b)
    .map(([bai, questionCount]) => ({
      bai,
      title: lessonTitles[bai] ?? `Bài ${bai}`,
      questionCount,
    }));

  const breadcrumbs = [
    { label: "Trang chủ", href: "/dashboard" },
    { label: "Luyện tập", href: `/luyen-tap/khtn?grade=7` },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 bg-slate-950">
      <FlipbookQuizLessonList
        bookSlug={bookSlug}
        bookTitle={bookTitle}
        lessons={lessons}
        breadcrumbs={breadcrumbs}
        sourceBookUrl={BOOK_SOURCE_URLS[bookSlug]}
      />
    </div>
  );
}
