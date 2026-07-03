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
    1: "SBT - KHTN 7 - Bài 1. Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
    2: "SBT - KHTN 7 - Bài 2. Nguyên tử",
    3: "SBT - KHTN 7 - Bài 3. Nguyên tố hoá học",
    4: "SBT - KHTN 7 - Bài 4. Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
    5: "SBT - KHTN 7 - Bài 5. Phân tử - Đơn chất - Hợp chất",
    6: "SBT - KHTN 7 - Bài 6. Giới thiệu về liên kết hoá học",
    7: "SBT - KHTN 7 - Bài 7. Hoá trị và công thức hoá học",
    8: "SBT - KHTN 7 - Bài 8. Tốc độ chuyển động",
    9: "SBT - KHTN 7 - Bài 9. Đo tốc độ",
    10: "SBT - KHTN 7 - Bài 10. Đồ thị quãng đường – thời gian",
    11: "SBT - KHTN 7 - Bài 11. Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông",
    12: "SBT - KHTN 7 - Bài 12. Sóng âm",
    13: "SBT - KHTN 7 - Bài 13. Độ to và độ cao của âm",
    14: "SBT - KHTN 7 - Bài 14. Phản xạ âm, chống ô nhiễm tiếng ồn",
    15: "SBT - KHTN 7 - Bài 15. Năng lượng ánh sáng. Tia sáng, vùng tối",
    16: "SBT - KHTN 7 - Bài 16. Sự phản xạ ánh sáng",
    17: "SBT - KHTN 7 - Bài 17. Ảnh của vật qua gương phẳng",
    18: "SBT - KHTN 7 - Bài 18. Nam châm",
    19: "SBT - KHTN 7 - Bài 19. Từ trường",
    20: "SBT - KHTN 7 - Bài 20. Chế tạo nam châm điện đơn giản",
    21: "SBT - KHTN 7 - Bài 21. Khái quát về trao đổi chất và chuyển hoá năng lượng",
    22: "SBT - KHTN 7 - Bài 22. Quang hợp ở thực vật",
    23: "SBT - KHTN 7 - Bài 23. Một số yếu tố ảnh hưởng đến quang hợp",
    24: "SBT - KHTN 7 - Bài 24. Thực hành: Chứng minh quang hợp ở cây xanh",
    25: "SBT - KHTN 7 - Bài 25. Hô hấp tế bào",
    26: "SBT - KHTN 7 - Bài 26. Một số yếu tố ảnh hưởng đến hô hấp tế bào",
    27: "SBT - KHTN 7 - Bài 27. Thực hành: Hô hấp ở thực vật",
    28: "SBT - KHTN 7 - Bài 28. Trao đổi khí ở sinh vật",
    29: "SBT - KHTN 7 - Bài 29. Vai trò của nước và chất dinh dưỡng đối với sinh vật",
    30: "SBT - KHTN 7 - Bài 30. Trao đổi nước và chất dinh dưỡng ở thực vật",
    31: "SBT - KHTN 7 - Bài 31. Trao đổi nước và chất dinh dưỡng ở động vật",
    32: "SBT - KHTN 7 - Bài 32. Thực hành: Chứng minh thân vận chuyển nước và lá thoát hơi nước",
    33: "SBT - KHTN 7 - Bài 33. Cảm ứng ở sinh vật và tập tính ở động vật",
    34: "SBT - KHTN 7 - Bài 34. Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn",
    35: "SBT - KHTN 7 - Bài 35. Thực hành: Cảm ứng ở sinh vật",
    36: "SBT - KHTN 7 - Bài 36. Khái quát về sinh trưởng và phát triển ở sinh vật",
    37: "SBT - KHTN 7 - Bài 37. Ứng dụng sinh trưởng và phát triển ở sinh vật vào thực tiễn",
    38: "SBT - KHTN 7 - Bài 38. Thực hành: Quan sát, mô tả sự sinh trưởng và phát triển ở một số sinh vật",
    39: "SBT - KHTN 7 - Bài 39. Sinh sản vô tính ở sinh vật",
    40: "SBT - KHTN 7 - Bài 40. Sinh sản hữu tính ở sinh vật",
    41: "SBT - KHTN 7 - Bài 41. Một số yếu tố ảnh hưởng và điều hoà, điều khiển sinh sản ở sinh vật",
    42: "SBT - KHTN 7 - Bài 42. Cơ thể sinh vật là một thể thống nhất",
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
