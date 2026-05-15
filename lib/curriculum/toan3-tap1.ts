/**
 * Toán lớp 3 — Tập 1 (học kì 1)
 * Mỗi video YouTube = một bài học trên app (lesson_index tuần tự).
 */

export type VideoPart = {
  youtube_id: string;
  subtitle: string;
};

export type BookLesson = {
  book_lesson_number: number;
  title: string;
  page: number;
  topic_label: string;
  videos: VideoPart[];
  /** Câu hỏi ôn tập (2–3 câu / bài học trên app) */
  practice: Array<{
    question: string;
    options: string[];
    correct_index: number;
    explanation: string;
  }>;
};

const TOPIC1 = "Chủ đề 1: Ôn tập và bổ sung";
const TOPIC2 = "Chủ đề 2: Bảng nhân, bảng chia";
const TOPIC3 = "Chủ đề 3: Làm quen với hình phẳng, hình khối";
const TOPIC4 = "Chủ đề 4: Phép nhân, phép chia trong phạm vi 100";
const TOPIC5 = "Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ";
const TOPIC6 = "Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000";
const TOPIC7 = "Chủ đề 7: Ôn tập học kì 1";

const defaultPractice = (n: number) => [
  {
    question: `Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài ${n}?`,
    options: ["Rồi, tôi có thể làm bài tập", "Chưa, cần xem lại", "Chỉ xem video", "Chưa mở sách"],
    correct_index: 0,
    explanation: "Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.",
  },
];

export const TOAN3_TAP1_BOOK_LESSONS: BookLesson[] = [
  {
    book_lesson_number: 1,
    title: "Ôn tập các số đến 1 000",
    page: 6,
    topic_label: TOPIC1,
    videos: [
      { youtube_id: "WXd0BHS8eFc", subtitle: "Luyện tập (trang 6–7)" },
      { youtube_id: "Nd_nqrmqShg", subtitle: "Luyện tập tiếp (trang 8)" },
    ],
    practice: [
      {
        question: "Số 999 liền sau là:",
        options: ["998", "1000", "990", "1001"],
        correct_index: 1,
        explanation: "Liền sau = cộng 1: 999 + 1 = 1000.",
      },
      {
        question: "Trong số 735, chữ số 3 có giá trị:",
        options: ["3", "30", "300", "700"],
        correct_index: 1,
        explanation: "Chữ số 3 ở hàng chục → giá trị 30.",
      },
    ],
  },
  {
    book_lesson_number: 2,
    title: "Ôn tập phép cộng, phép trừ trong phạm vi 1 000",
    page: 9,
    topic_label: TOPIC1,
    videos: [{ youtube_id: "0GFTtEFD4Bw", subtitle: "Ôn tập cộng, trừ" }],
    practice: [
      {
        question: "456 + 328 = ?",
        options: ["774", "784", "684", "794"],
        correct_index: 1,
        explanation: "6+8=14, viết 4 nhớ 1; 5+2+1=8; 4+3=7 → 784.",
      },
      {
        question: "900 − 275 = ?",
        options: ["625", "635", "615", "725"],
        correct_index: 0,
        explanation: "0−5 mượn, 9−1−7=1 ở hàng trăm… → 625.",
      },
    ],
  },
  {
    book_lesson_number: 3,
    title: "Tìm thành phần trong phép cộng, phép trừ",
    page: 11,
    topic_label: TOPIC1,
    videos: [
      { youtube_id: "9fWxTEsAxqA", subtitle: "Phần 1" },
      { youtube_id: "m5cnILHDdko", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "x + 45 = 120. Tìm x:",
        options: ["65", "75", "165", "55"],
        correct_index: 1,
        explanation: "Số hạng chưa biết: x = 120 − 45 = 75.",
      },
      {
        question: "a − 32 = 48. Tìm a:",
        options: ["16", "80", "70", "90"],
        correct_index: 1,
        explanation: "Số bị trừ: a = 48 + 32 = 80.",
      },
    ],
  },
  {
    book_lesson_number: 4,
    title: "Ôn tập bảng nhân 2; 5, bảng chia 2; 5",
    page: 14,
    topic_label: TOPIC1,
    videos: [{ youtube_id: "pU20z34l0A8", subtitle: "Bảng nhân 2, 5 và chia 2, 5" }],
    practice: [
      {
        question: "5 × 7 = ?",
        options: ["30", "35", "12", "25"],
        correct_index: 1,
        explanation: "Theo bảng nhân 5: 5 × 7 = 35.",
      },
      {
        question: "20 : 5 = ?",
        options: ["4", "5", "15", "25"],
        correct_index: 0,
        explanation: "20 : 5 = 4 vì 5 × 4 = 20.",
      },
    ],
  },
  {
    book_lesson_number: 5,
    title: "Bảng nhân 3, bảng chia 3",
    page: 16,
    topic_label: TOPIC1,
    videos: [
      { youtube_id: "xCAjEAcn2vk", subtitle: "Phần 1" },
      { youtube_id: "gP0ncgW7lWc", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "3 × 8 = ?",
        options: ["21", "24", "27", "11"],
        correct_index: 1,
        explanation: "Bảng nhân 3: 3 × 8 = 24.",
      },
      {
        question: "27 : 3 = ?",
        options: ["8", "9", "7", "6"],
        correct_index: 1,
        explanation: "27 : 3 = 9.",
      },
    ],
  },
  {
    book_lesson_number: 6,
    title: "Bảng nhân 4, bảng chia 4",
    page: 19,
    topic_label: TOPIC1,
    videos: [
      { youtube_id: "BS8i1Xj-Hbk", subtitle: "Phần 1" },
      { youtube_id: "RvcZYtiMp-8", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "4 × 6 = ?",
        options: ["20", "24", "10", "28"],
        correct_index: 1,
        explanation: "4 × 6 = 24.",
      },
      {
        question: "32 : 4 = ?",
        options: ["6", "7", "8", "9"],
        correct_index: 2,
        explanation: "32 : 4 = 8.",
      },
    ],
  },
  {
    book_lesson_number: 7,
    title: "Ôn tập hình học và đo lường",
    page: 21,
    topic_label: TOPIC1,
    videos: [
      { youtube_id: "Yy7G9HMj3YE", subtitle: "Phần 1" },
      { youtube_id: "nlrhY95G274", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "Hình có 3 cạnh và 3 góc là:",
        options: ["Hình vuông", "Hình tam giác", "Hình tròn", "Đường thẳng"],
        correct_index: 1,
        explanation: "Tam giác có đúng 3 cạnh và 3 góc.",
      },
      {
        question: "1 m = ? cm",
        options: ["10", "100", "1000", "50"],
        correct_index: 1,
        explanation: "1 mét = 100 xăng-ti-mét.",
      },
    ],
  },
  {
    book_lesson_number: 8,
    title: "Luyện tập chung",
    page: 24,
    topic_label: TOPIC1,
    videos: [{ youtube_id: "uAPA4WpoCR0", subtitle: "Luyện tập chung" }],
    practice: defaultPractice(8),
  },
  {
    book_lesson_number: 9,
    title: "Bảng nhân 6, bảng chia 6",
    page: 28,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "5c736YjiXbQ", subtitle: "Phần 1" },
      { youtube_id: "NwI8T9QVn10", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "6 × 4 = ?",
        options: ["20", "24", "10", "28"],
        correct_index: 1,
        explanation: "6 × 4 = 24.",
      },
      {
        question: "42 : 6 = ?",
        options: ["6", "7", "8", "9"],
        correct_index: 1,
        explanation: "42 : 6 = 7.",
      },
    ],
  },
  {
    book_lesson_number: 10,
    title: "Bảng nhân 7, bảng chia 7",
    page: 31,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "cOrIMRgPqdo", subtitle: "Phần 1" },
      { youtube_id: "Cr43p0tjtJw", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "7 × 5 = ?",
        options: ["30", "35", "12", "42"],
        correct_index: 1,
        explanation: "7 × 5 = 35.",
      },
      {
        question: "56 : 7 = ?",
        options: ["6", "7", "8", "9"],
        correct_index: 2,
        explanation: "56 : 7 = 8.",
      },
    ],
  },
  {
    book_lesson_number: 11,
    title: "Bảng nhân 8, bảng chia 8",
    page: 33,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "7Zd81dAaReA", subtitle: "Phần 1" },
      { youtube_id: "HQMw93PTtYM", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "8 × 3 = ?",
        options: ["21", "24", "11", "32"],
        correct_index: 1,
        explanation: "8 × 3 = 24.",
      },
      {
        question: "64 : 8 = ?",
        options: ["7", "8", "9", "6"],
        correct_index: 1,
        explanation: "64 : 8 = 8.",
      },
    ],
  },
  {
    book_lesson_number: 12,
    title: "Bảng nhân 9, bảng chia 9",
    page: 36,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "H1HpwYvD1hI", subtitle: "Phần 1" },
      { youtube_id: "KW9nkIqzRPQ", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "9 × 6 = ?",
        options: ["45", "54", "15", "63"],
        correct_index: 1,
        explanation: "9 × 6 = 54.",
      },
      {
        question: "81 : 9 = ?",
        options: ["8", "9", "7", "10"],
        correct_index: 1,
        explanation: "81 : 9 = 9.",
      },
    ],
  },
  {
    book_lesson_number: 13,
    title: "Tìm thành phần trong phép nhân, phép chia",
    page: 39,
    topic_label: TOPIC2,
    videos: [{ youtube_id: "A19ruFYX4R4", subtitle: "Video bài giảng" }],
    practice: [
      {
        question: "x × 6 = 42. Tìm x:",
        options: ["6", "7", "8", "36"],
        correct_index: 1,
        explanation: "x = 42 : 6 = 7.",
      },
      {
        question: "a : 5 = 9. Tìm a:",
        options: ["4", "14", "45", "40"],
        correct_index: 2,
        explanation: "Số bị chia: a = 9 × 5 = 45.",
      },
    ],
  },
  {
    book_lesson_number: 14,
    title: "Một phần mấy",
    page: 42,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "TsJKc3XGxSM", subtitle: "Phần 1" },
      { youtube_id: "LQNvUpu1lLM", subtitle: "Tiếp theo" },
    ],
    practice: [
      {
        question: "Một phần ba của 12 là:",
        options: ["3", "4", "6", "9"],
        correct_index: 1,
        explanation: "12 : 3 = 4.",
      },
      {
        question: "Hình chia 4 phần bằng nhau, tô màu 1 phần → đã tô:",
        options: ["Một phần hai", "Một phần ba", "Một phần tư", "Cả hình"],
        correct_index: 2,
        explanation: "1 trong 4 phần bằng nhau là một phần tư.",
      },
    ],
  },
  {
    book_lesson_number: 15,
    title: "Luyện tập chung",
    page: 46,
    topic_label: TOPIC2,
    videos: [
      { youtube_id: "jx598fQD26A", subtitle: "Phần 1" },
      { youtube_id: "jLrDdw7xcMo", subtitle: "Tiếp theo" },
    ],
    practice: defaultPractice(15),
  },
  // Bài 16–44: chưa có video — chỉ sách + ôn tập nhẹ
  { book_lesson_number: 16, title: "Điểm ở giữa, trung điểm của đoạn thẳng", page: 49, topic_label: TOPIC3, videos: [], practice: defaultPractice(16) },
  { book_lesson_number: 17, title: "Hình tròn. Tâm, bán kính, đường kính của hình tròn", page: 52, topic_label: TOPIC3, videos: [], practice: defaultPractice(17) },
  { book_lesson_number: 18, title: "Góc, góc vuông, góc không vuông", page: 54, topic_label: TOPIC3, videos: [], practice: defaultPractice(18) },
  { book_lesson_number: 19, title: "Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông", page: 56, topic_label: TOPIC3, videos: [], practice: defaultPractice(19) },
  { book_lesson_number: 20, title: "Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí", page: 61, topic_label: TOPIC3, videos: [], practice: defaultPractice(20) },
  { book_lesson_number: 21, title: "Khối lập phương, khối hộp chữ nhật", page: 63, topic_label: TOPIC3, videos: [], practice: defaultPractice(21) },
  { book_lesson_number: 22, title: "Luyện tập chung", page: 65, topic_label: TOPIC3, videos: [], practice: defaultPractice(22) },
  { book_lesson_number: 23, title: "Nhân số có hai chữ số với số có một chữ số", page: 67, topic_label: TOPIC4, videos: [], practice: defaultPractice(23) },
  { book_lesson_number: 24, title: "Gấp một số lên một số lần", page: 70, topic_label: TOPIC4, videos: [], practice: defaultPractice(24) },
  { book_lesson_number: 25, title: "Phép chia hết, phép chia có dư", page: 72, topic_label: TOPIC4, videos: [], practice: defaultPractice(25) },
  { book_lesson_number: 26, title: "Chia số có hai chữ số cho số có một chữ số", page: 75, topic_label: TOPIC4, videos: [], practice: defaultPractice(26) },
  { book_lesson_number: 27, title: "Giảm một số đi một số lần", page: 79, topic_label: TOPIC4, videos: [], practice: defaultPractice(27) },
  { book_lesson_number: 28, title: "Bài toán giải bằng hai bước tính", page: 81, topic_label: TOPIC4, videos: [], practice: defaultPractice(28) },
  { book_lesson_number: 29, title: "Luyện tập chung", page: 83, topic_label: TOPIC4, videos: [], practice: defaultPractice(29) },
  { book_lesson_number: 30, title: "Mi-li-mét", page: 85, topic_label: TOPIC5, videos: [], practice: defaultPractice(30) },
  { book_lesson_number: 31, title: "Gam", page: 87, topic_label: TOPIC5, videos: [], practice: defaultPractice(31) },
  { book_lesson_number: 32, title: "Mi-li-lít", page: 89, topic_label: TOPIC5, videos: [], practice: defaultPractice(32) },
  { book_lesson_number: 33, title: "Nhiệt độ. Đơn vị đo nhiệt độ", page: 91, topic_label: TOPIC5, videos: [], practice: defaultPractice(33) },
  { book_lesson_number: 34, title: "Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C", page: 93, topic_label: TOPIC5, videos: [], practice: defaultPractice(34) },
  { book_lesson_number: 35, title: "Luyện tập chung", page: 95, topic_label: TOPIC5, videos: [], practice: defaultPractice(35) },
  { book_lesson_number: 36, title: "Nhân số có ba chữ số với số có một chữ số", page: 97, topic_label: TOPIC6, videos: [], practice: defaultPractice(36) },
  { book_lesson_number: 37, title: "Chia số có ba chữ số cho số có một chữ số", page: 99, topic_label: TOPIC6, videos: [], practice: defaultPractice(37) },
  { book_lesson_number: 38, title: "Biểu thức số. Tính giá trị của biểu thức số", page: 104, topic_label: TOPIC6, videos: [], practice: defaultPractice(38) },
  { book_lesson_number: 39, title: "So sánh số lớn gấp mấy lần số bé", page: 109, topic_label: TOPIC6, videos: [], practice: defaultPractice(39) },
  { book_lesson_number: 40, title: "Luyện tập chung", page: 111, topic_label: TOPIC6, videos: [], practice: defaultPractice(40) },
  { book_lesson_number: 41, title: "Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000", page: 113, topic_label: TOPIC7, videos: [], practice: defaultPractice(41) },
  { book_lesson_number: 42, title: "Ôn tập biểu thức số", page: 116, topic_label: TOPIC7, videos: [], practice: defaultPractice(42) },
  { book_lesson_number: 43, title: "Ôn tập hình học và đo lường", page: 118, topic_label: TOPIC7, videos: [], practice: defaultPractice(43) },
  { book_lesson_number: 44, title: "Ôn tập chung", page: 120, topic_label: TOPIC7, videos: [], practice: defaultPractice(44) },
];

/** Mở rộng: mỗi video = 1 hàng lesson trên app */
export function expandToAppLessons() {
  const rows: Array<{
    lesson_index: number;
    book_lesson_number: number;
    video_part: number;
    topic_label: string;
    title: string;
    page_hint: string;
    youtube_video_id: string | null;
    summary: string;
    practice: BookLesson["practice"];
  }> = [];

  let idx = 0;
  for (const book of TOAN3_TAP1_BOOK_LESSONS) {
    const pageHint = `Trang ${book.page}`;
    if (book.videos.length === 0) {
      idx += 1;
      rows.push({
        lesson_index: idx,
        book_lesson_number: book.book_lesson_number,
        video_part: 0,
        topic_label: book.topic_label,
        title: `Bài ${book.book_lesson_number}: ${book.title}`,
        page_hint: pageHint,
        youtube_video_id: null,
        summary: `${book.topic_label}. Đọc sách ${pageHint}, làm bài tập trong SGK.`,
        practice: book.practice,
      });
      continue;
    }
    book.videos.forEach((v, i) => {
      idx += 1;
      const partLabel =
        book.videos.length > 1 ? ` — ${v.subtitle}` : ` — ${v.subtitle}`;
      rows.push({
        lesson_index: idx,
        book_lesson_number: book.book_lesson_number,
        video_part: i + 1,
        topic_label: book.topic_label,
        title: `Bài ${book.book_lesson_number}: ${book.title}${partLabel}`,
        page_hint: pageHint,
        youtube_video_id: v.youtube_id,
        summary: `Xem video và đọc sách ${pageHint}.`,
        practice: book.practice,
      });
    });
  }
  return rows;
}
