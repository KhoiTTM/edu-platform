import * as fs from 'fs';
import * as path from 'path';

function run() {
  const file = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', 'chu_diem_2_exams.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  const newExams = [];

  const part1Titles = [
    "Đề thi Bài 9: Đi học vui sao",
    "Đề thi Bài 10: Con đường đến trường",
    "Đề thi Bài 11: Lời giải toán đặc biệt",
    "Đề thi Bài 12: Bài tập làm văn"
  ];
  
  const part2Titles = [
    "Đề thi Bài 13: Bàn tay cô giáo",
    "Đề thi Bài 14: Cuộc họp của chữ viết",
    "Đề thi Bài 15: Thư viện",
    "Đề thi Bài 16: Ngày em vào đội"
  ];

  // Fix options arrays and reading_passage newlines
  const fixQuestions = (questions: any[]) => {
    return questions.map(q => {
      // Fix multiple_choice options
      if (q.type === 'multiple_choice' && Array.isArray(q.options) && q.options.length > 0 && typeof q.options[0] === 'object') {
        const strOptions = q.options.map((o: any) => o.text || o.content || o.answer || JSON.stringify(o));
        const correctOpt = q.options.find((o: any) => o.is_correct);
        q.options = strOptions;
        if (correctOpt) {
          q.correct_answer = correctOpt.text || correctOpt.content || correctOpt.answer;
        }
      }
      
      // Fix reading_passage newlines (sometimes \n is escaped as \\n)
      if (q.reading_passage) {
        q.reading_passage = q.reading_passage.replace(/\\n/g, '\n');
      }
      
      return q;
    });
  };

  if (data.exams[0] && data.exams[0].questions.length >= 80) {
    const part1Qs = fixQuestions(data.exams[0].questions);
    for (let i = 0; i < 4; i++) {
      newExams.push({
        id: `exam_cd2_bai${9+i}`,
        title: part1Titles[i],
        description: `Đề thi trắc nghiệm và tự luận cho ${part1Titles[i]}`,
        questions: part1Qs.slice(i * 20, (i + 1) * 20)
      });
    }
  }

  if (data.exams[1] && data.exams[1].questions.length >= 80) {
    const part2Qs = fixQuestions(data.exams[1].questions);
    for (let i = 0; i < 4; i++) {
      newExams.push({
        id: `exam_cd2_bai${13+i}`,
        title: part2Titles[i],
        description: `Đề thi trắc nghiệm và tự luận cho ${part2Titles[i]}`,
        questions: part2Qs.slice(i * 20, (i + 1) * 20)
      });
    }
  }

  data.exams = newExams;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Fixed chu_diem_2_exams.json! Total exams:', newExams.length);
}

run();
