import * as fs from 'fs';
import * as path from 'path';

function mergeExams() {
  const jsonPath = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', 'chu_diem_1_exams.json');
  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(rawData);

  if (data.exams && data.exams.length > 1) {
    const exam1 = data.exams[0];
    const exam2 = data.exams[1];

    // Combine lessons
    const combinedLessons = Array.from(new Set([...exam1.lessons, ...exam2.lessons]));
    
    // Combine questions
    const combinedQuestions = [...exam1.questions, ...exam2.questions];

    // Create the merged exam
    const mergedExam = {
      ...exam1,
      id: "exam_chu_diem_1_tong_hop",
      title: "Đề Tổng Hợp Chủ Điểm 1: Những trải nghiệm thú vị & Những bài học mới",
      lessons: combinedLessons,
      total_questions: combinedQuestions.length,
      questions: combinedQuestions
    };

    // Replace the exams array
    data.exams = [mergedExam];

    // Write back
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Merged exams into 1 exam with ${mergedExam.questions.length} questions.`);
  } else {
    console.log('Only 1 exam found, nothing to merge.');
  }
}
mergeExams();
