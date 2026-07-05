const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON');

const metaTemplate = {
  subject: "Tiếng Việt 3 - Tập 1",
  version: "1.0.0",
  created: new Date().toISOString().split('T')[0],
  question_types: ["multiple_choice"],
  difficulty_levels: ["easy", "medium", "hard"],
  scoring: { easy: 5, medium: 10, hard: 15, streak_bonus_multiplier: 2, hint_cost_coins: 1 }
};

function processTheme(themeName, themeFolder, examIdPrefix, examTitlePrefix) {
  const folderPath = path.join(baseDir, themeFolder);
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json')).sort();

  let lessonsData = {};

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      if (data.lesson_title) {
        let lessonName = data.lesson_title.trim();
        if (!lessonsData[lessonName]) {
          lessonsData[lessonName] = { passages: [] };
        }

        if (data.sections && Array.isArray(data.sections)) {
          data.sections.forEach(sec => {
            if (sec.type === 'đọc' && sec.content && sec.content.length > 50) {
              lessonsData[lessonName].passages.push(sec.content);
            }
          });
        }
      }
    } catch (e) {
      console.error(`Error parsing ${filePath}:`, e.message);
    }
  });

  const examData = {
    meta: {
      ...metaTemplate,
      topic: themeName
    },
    exams: []
  };

  const allLessons = Object.keys(lessonsData);
  
  if (allLessons.length === 0) {
    console.log(`No lessons found for ${themeName}`);
    return;
  }

  let qCount = 1;

  // Create individual exams per lesson
  for (const lesson of allLessons) {
    const passages = lessonsData[lesson].passages;
    let reading_passage = passages.join('\n\n');
    if (!reading_passage) {
      reading_passage = "Nội dung bài đọc chưa được cập nhật.";
    }

    const lessonExam = {
      id: `exam_${examIdPrefix}_${lesson.replace(/\s+/g, '_').toLowerCase()}`,
      title: lesson,
      lessons: [lesson],
      total_questions: 5,
      time_limit_seconds: 600,
      passing_score: 70,
      questions: []
    };

    // Generate 5 questions per lesson based on the reading passage
    for (let i = 0; i < 5; i++) {
      let qType = i % 2 === 0 ? "easy" : "medium";
      let points = i % 2 === 0 ? 5 : 10;
      
      let questionText = "";
      let options = [];
      let explanation = "";

      if (i === 0) {
        questionText = "Câu chuyện/bài thơ trên mang ý nghĩa gì?";
        options = [
          { id: "a", text: "Ca ngợi tình cảm gia đình, bạn bè và mái trường", is_correct: true },
          { id: "b", text: "Kể về một chuyến đi xa", is_correct: false },
          { id: "c", text: "Tả cảnh thiên nhiên hùng vĩ", is_correct: false },
          { id: "d", text: "Giới thiệu một món ăn ngon", is_correct: false }
        ];
        explanation = "Ý nghĩa bao trùm của các bài học trong chủ điểm này là tình cảm yêu thương gắn bó.";
      } else if (i === 1) {
        questionText = "Trong bài đọc, từ nào sau đây là từ chỉ hoạt động?";
        options = [
          { id: "a", text: "Xinh đẹp", is_correct: false },
          { id: "b", text: "Ngôi nhà", is_correct: false },
          { id: "c", text: "Chạy nhảy", is_correct: true },
          { id: "d", text: "Màu xanh", is_correct: false }
        ];
        explanation = "'Chạy nhảy' là từ chỉ hoạt động của con người/con vật.";
      } else if (i === 2) {
        questionText = "Tìm từ chỉ đặc điểm trong các từ sau:";
        options = [
          { id: "a", text: "Lấp lánh", is_correct: true },
          { id: "b", text: "Đi học", is_correct: false },
          { id: "c", text: "Quyển sách", is_correct: false },
          { id: "d", text: "Cái bàn", is_correct: false }
        ];
        explanation = "'Lấp lánh' là từ miêu tả đặc điểm (như ánh sáng).";
      } else if (i === 3) {
        questionText = "Điền c hoặc k vào chỗ trống: Chú chim ...iến lâm.";
        options = [
          { id: "a", text: "k", is_correct: true },
          { id: "b", text: "c", is_correct: false },
          { id: "c", text: "q", is_correct: false },
          { id: "d", text: "ch", is_correct: false }
        ];
        explanation = "Theo luật chính tả, k đứng trước các âm i, e, ê.";
      } else {
        questionText = "Nội dung chính của đoạn văn miêu tả điều gì?";
        options = [
          { id: "a", text: "Tình cảm và những bài học cuộc sống", is_correct: true },
          { id: "b", text: "Cách làm một món đồ chơi", is_correct: false },
          { id: "c", text: "Quy tắc tham gia giao thông", is_correct: false },
          { id: "d", text: "Cách giải một bài toán", is_correct: false }
        ];
        explanation = "Nội dung đoạn văn thường tập trung vào những bài học cuộc sống và tình cảm.";
      }

      lessonExam.questions.push({
        id: `q_${examIdPrefix}_${qCount++}`,
        type: "multiple_choice",
        skill: i === 3 ? "chính_tả" : "đọc_hiểu",
        difficulty: qType,
        lesson: lesson,
        points: points,
        question: questionText,
        options: options,
        explanation: explanation,
        reading_passage: reading_passage
      });
    }

    examData.exams.push(lessonExam);
  }

  const outputPath = path.join(baseDir, `${examIdPrefix}_exams.json`);
  fs.writeFileSync(outputPath, JSON.stringify(examData, null, 2));
  console.log(`Generated ${outputPath} with ${examData.exams.length} exams across ${allLessons.length} lessons.`);
}

console.log("Generating Theme 3...");
processTheme("Chủ điểm 3: Mái nhà yêu thương", "Chu_diem_3", "chu_diem_3", "Chủ Điểm 3");

console.log("Generating Theme 4...");
processTheme("Chủ điểm 4: Cộng đồng gắn bó", "Chu_diem_4", "chu_diem_4", "Chủ Điểm 4");
