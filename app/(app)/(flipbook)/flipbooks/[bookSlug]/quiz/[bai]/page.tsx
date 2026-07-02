import fs from "fs/promises";
import path from "path";
import { FlipbookQuizClient } from "@/components/flipbook/FlipbookQuizClient";

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

const BOOK_SOURCE_URLS: Record<string, string> = {
  khtn7: "https://drive.google.com/file/d/13zq-lbCJaAHEqSRx1JWhfX1idtn6jgEP/view?usp=sharing",
};

const LESSON_TITLES: Record<string, Record<number, string>> = {
  khtn7: {
    1: "Bài 1. Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
    2: "Bài 2. Nguyên tử",
    3: "Bài 3. Nguyên tố hoá học",
    4: "Bài 4. Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
    5: "Bài 5. Phân tử - Đơn chất - Hợp chất",
    6: "Bài 6. Giới thiệu về liên kết hoá học",
    7: "Bài 7. Hoá trị và công thức hoá học",
    8: "Bài 8. Tốc độ chuyển động",
    9: "Bài 9. Đo tốc độ",
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

export default async function FlipbookQuizLessonPage({
  params,
}: {
  params: Promise<{ bookSlug: string; bai: string }>;
}) {
  const { bookSlug, bai } = await params;
  const baiNum = Number(bai);
  const allQuestions = await loadQuestions(bookSlug);
  const questions = allQuestions
    .filter((q) => q.bai === baiNum)
    .sort((a, b) => a.cau - b.cau);

  const bookTitle = BOOK_TITLES[bookSlug] ?? bookSlug;
  const lessonTitle = LESSON_TITLES[bookSlug]?.[baiNum] ?? `Bài ${baiNum}`;

  const breadcrumbs = [
    { label: "Trang chủ", href: "/dashboard" },
    { label: "Luyện tập", href: `/luyen-tap/khtn?grade=7` },
    { label: bookTitle, href: `/flipbooks/${bookSlug}/quiz` },
  ];

  return (
    <div className="h-[calc(100vh-80px)] p-6 bg-slate-950 overflow-y-auto">
      <FlipbookQuizClient
        bookSlug={bookSlug}
        title={`${bookTitle} — ${lessonTitle}`}
        questions={questions}
        breadcrumbs={breadcrumbs}
        sourceBookUrl={BOOK_SOURCE_URLS[bookSlug]}
      />
    </div>
  );
}
