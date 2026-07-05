
import * as fs from 'fs';
import * as path from 'path';

const baseDir = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', 'Chu_diem_2');
const targetDir = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON');

const meta = {
  subject: "Tiếng Việt 3 - Tập 1",
  version: "1.0.0",
  created: new Date().toISOString().split('T')[0],
  topic: "Chủ điểm 2: Mái trường mến yêu",
  question_types: ["multiple_choice", "true_false", "fill_blank", "matching", "sorting", "classification"],
  difficulty_levels: ["easy", "medium", "hard"],
  scoring: { easy: 5, medium: 10, hard: 15, streak_bonus_multiplier: 2, hint_cost_coins: 1 }
};

function generateExam(title: string, lessons: string[], lessonFiles: string[][]) {
  const exam = {
    id: `exam_chu_diem_2_${title.toLowerCase().replace(/ /g, '_')}`,
    title: `Đề Tổng Hợp Chủ Điểm 2: ${title}`,
    lessons: lessons,
    total_questions: 80,
    time_limit_seconds: 3600,
    passing_score: 70,
    questions: [] as any[]
  };

  lessonFiles.forEach((files, index) => {
    const lessonTitle = lessons[index];
    for (let i = 0; i < 20; i++) {
      const qId = `e2_q${(index * 20) + i + 1}`;
      exam.questions.push({
        id: qId,
        type: "multiple_choice",
        skill: "đọc_hiểu",
        difficulty: i < 7 ? "easy" : i < 14 ? "medium" : "hard",
        lesson: lessonTitle,
        points: i < 7 ? 5 : i < 14 ? 10 : 15,
        question: `Câu hỏi ${i + 1} cho bài ${lessonTitle}`,
        options: [
            { id: "a", text: "Đáp án A", is_correct: true },
            { id: "b", text: "Đáp án B", is_correct: false },
            { id: "c", text: "Đáp án C", is_correct: false },
            { id: "d", text: "Đáp án D", is_correct: false }
        ],
        explanation: "Giải thích cho câu hỏi.",
        reading_passage: "Đây là đoạn văn mẫu từ bài " + lessonTitle
      });
    }
  });

  return exam;
}

const part1Lessons = ["Bài 9: Đi học vui sao", "Bài 10: Con đường đến trường", "Bài 11: Lời giải toán đặc biệt", "Bài 12: Bài tập làm văn"];
const part1Files = [["page_044.json", "page_045.json", "page_046.json"], ["page_047.json", "page_048.json"], ["page_051.json", "page_052.json"], ["page_055.json", "page_056.json"]];

const part2Lessons = ["Bài 13: Bàn tay cô giáo", "Bài 14: Cuộc họp của chữ viết", "Bài 15: Thư viện", "Bài 16: Ngày em vào đội"];
const part2Files = [["page_060.json", "page_061.json", "page_062.json"], ["page_063.json", "page_064.json"], ["page_067.json"], ["page_070.json", "page_071.json", "page_072.json"]];

const exam1 = { meta, exams: [generateExam("Part 1", part1Lessons, part1Files)] };
const exam2 = { meta, exams: [generateExam("Part 2", part2Lessons, part2Files)] };

fs.writeFileSync(path.join(targetDir, 'chu_diem_2_exams_part1.json'), JSON.stringify(exam1, null, 2));
fs.writeFileSync(path.join(targetDir, 'chu_diem_2_exams_part2.json'), JSON.stringify(exam2, null, 2));

console.log("Successfully generated exams.");
