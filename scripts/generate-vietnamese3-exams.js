const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON');

const metaTemplate = {
  subject: "Tiếng Việt 3 - Tập 1",
  version: "2.0.0",
  created: new Date().toISOString().split('T')[0],
  question_types: ["multiple_choice"],
  difficulty_levels: ["easy", "medium", "hard"],
  scoring: { easy: 5, medium: 10, hard: 15, streak_bonus_multiplier: 2, hint_cost_coins: 1 }
};

function capitalizeFirstLetter(string) {
  if (!string) return string;
  if (string === string.toUpperCase()) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return string;
}

function cleanLessonTitle(title) {
  if (!title) return "Không tên";
  let t = title.trim();
  t = t.replace(/\s*\(\s*tiếp theo\s*\)\s*/gi, '');
  t = capitalizeFirstLetter(t);
  return t;
}

// ==========================================
// TRẠNG NGUYÊN / VIOEDU TEMPLATE BANK
// ==========================================

const templateBank = {
  doc_hieu: [
    { q: "Nội dung chính của bài đọc hướng đến điều gì?", opts: ["Tình cảm yêu thương, gắn bó", "Miêu tả cảnh thiên nhiên", "Hướng dẫn làm đồ chơi", "Kể về một chuyến đi xa"], ans: 0, exp: "Bài đọc thường mang thông điệp về tình cảm và bài học cuộc sống." },
    { q: "Qua bài đọc, em học được đức tính gì từ nhân vật?", opts: ["Lười biếng", "Chăm chỉ, biết quan tâm", "Hay cáu gắt", "Kiêu ngạo"], ans: 1, exp: "Nhân vật trong bài luôn thể hiện những đức tính tốt để chúng ta học tập." },
    { q: "Chi tiết nào cho thấy sự thay đổi tích cực trong bài?", opts: ["Nhân vật khóc lóc", "Mọi thứ trở nên tươi đẹp và vui vẻ hơn", "Trời đổ mưa to", "Đồ vật bị hỏng"], ans: 1, exp: "Câu chuyện luôn có những diễn biến tích cực và kết thúc vui vẻ." },
    { q: "Thông điệp sâu sắc nhất mà bài đọc muốn gửi gắm là gì?", opts: ["Hãy luôn giúp đỡ và yêu thương mọi người", "Không nên đi chơi xa", "Cách chăm sóc cây cối", "Mua thật nhiều đồ chơi"], ans: 0, exp: "Tình yêu thương và sự sẻ chia là thông điệp xuyên suốt của chương trình." },
    { q: "Cảm xúc của nhân vật vào cuối bài thường là:", opts: ["Buồn bã", "Tức giận", "Hạnh phúc, vui sướng", "Lo lắng"], ans: 2, exp: "Kết thúc bài thường mang lại niềm vui và hạnh phúc cho các nhân vật." }
  ],
  tu_vung: [
    { q: "Từ nào dưới đây là từ chỉ SỰ VẬT?", opts: ["Ngôi nhà", "Chạy nhảy", "Xanh tươi", "Nhanh nhẹn"], ans: 0, exp: "Ngôi nhà là từ chỉ sự vật (đồ vật/công trình)." },
    { q: "Từ nào dưới đây là từ chỉ HOẠT ĐỘNG?", opts: ["Ông bà", "Chiếc bàn", "Múa hát", "Đẹp đẽ"], ans: 2, exp: "Múa hát là từ chỉ hoạt động của con người." },
    { q: "Từ nào dưới đây là từ chỉ ĐẶC ĐIỂM?", opts: ["Con mèo", "Đỏ chót", "Bay lượn", "Học sinh"], ans: 1, exp: "Đỏ chót là từ chỉ đặc điểm (màu sắc)." },
    { q: "Tìm từ ĐỒNG NGHĨA với từ 'chăm chỉ':", opts: ["Siêng năng", "Lười biếng", "Hư hỏng", "Chậm chạp"], ans: 0, exp: "Siêng năng có cùng nghĩa với chăm chỉ." },
    { q: "Tìm từ TRÁI NGHĨA với từ 'vui vẻ':", opts: ["Hạnh phúc", "Phấn khởi", "Buồn bã", "Tươi cười"], ans: 2, exp: "Buồn bã là từ có nghĩa trái ngược với vui vẻ." }
  ],
  ngu_phap: [
    { q: "Câu nào dưới đây thuộc kiểu câu 'Ai làm gì?'", opts: ["Mẹ em là giáo viên.", "Đàn chim đang bay lượn trên bầu trời.", "Bông hoa này rất đẹp.", "Quyển sách này màu xanh."], ans: 1, exp: "Câu 'Đàn chim đang bay lượn' chỉ hoạt động nên thuộc kiểu Ai làm gì." },
    { q: "Câu nào dưới đây thuộc kiểu câu 'Ai thế nào?'", opts: ["Bạn Lan đang viết bài.", "Trời hôm nay rất trong xanh và mát mẻ.", "Bố em là bác sĩ.", "Bé đang ngủ."], ans: 1, exp: "Câu miêu tả thời tiết 'trong xanh và mát mẻ' thuộc kiểu Ai thế nào." },
    { q: "Điền dấu câu thích hợp: 'Ôi_ bông hoa này đẹp quá_'", opts: ["Dấu phẩy (,) / Dấu chấm (.)", "Dấu chấm (.) / Dấu chấm hỏi (?)", "Dấu phẩy (,) / Dấu chấm than (!)", "Dấu chấm hỏi (?) / Dấu chấm than (!)"], ans: 2, exp: "Sau từ cảm thán 'Ôi' dùng dấu phẩy, kết thúc câu cảm thán dùng dấu chấm than." },
    { q: "Sắp xếp các từ sau thành câu đúng: [mẹ / đi chợ / mua / hoa / sáng nay]", opts: ["Hoa mua sáng nay đi chợ mẹ.", "Sáng nay, mẹ đi chợ mua hoa.", "Đi chợ mua mẹ hoa sáng nay.", "Sáng nay đi chợ hoa mẹ mua."], ans: 1, exp: "Sắp xếp đúng ngữ pháp: Sáng nay (trạng ngữ), mẹ (chủ ngữ) đi chợ mua hoa (vị ngữ)." },
    { q: "Câu nào sau đây sử dụng sai dấu phẩy?", opts: ["Sáng nay, em đi học.", "Trời mưa to, gió lớn.", "Bạn Nam, đang làm bài tập.", "Trong vườn, hoa nở rực rỡ."], ans: 2, exp: "Chủ ngữ và vị ngữ không được ngăn cách bởi dấu phẩy." }
  ],
  chinh_ta: [
    { q: "Điền l hoặc n vào chỗ trống: Trời nắng ...óng bực.", opts: ["n", "l", "ch", "tr"], ans: 0, exp: "Từ đúng là 'nóng bực'." },
    { q: "Chọn từ viết ĐÚNG chính tả:", opts: ["Trân trọng", "Chân trọng", "Trân chọng", "Chân chọng"], ans: 0, exp: "'Trân trọng' là cách viết đúng." },
    { q: "Điền s hoặc x vào chỗ trống: Cuốn ...ách này rất hay.", opts: ["s", "x", "ch", "tr"], ans: 0, exp: "Từ đúng là 'cuốn sách'." },
    { q: "Điền c, k hoặc q vào chỗ trống: Chú chim ...iến lâm.", opts: ["k", "c", "q", "gh"], ans: 0, exp: "Âm 'k' luôn đi với i, e, ê." },
    { q: "Từ nào sau đây viết sai dấu hỏi/ngã?", opts: ["Sữa chữa", "Nghĩ ngợi", "Sửa chữa", "Mạnh mẽ"], ans: 0, exp: "'Sửa chữa' mới đúng, 'Sữa' là danh từ (ví dụ: sữa bò)." }
  ]
};

function processTheme(themeName, themeFolder, examIdPrefix) {
  const folderPath = path.join(baseDir, themeFolder);
  if (!fs.existsSync(folderPath)) {
      console.warn(`Folder not found: ${folderPath}`);
      return;
  }
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json')).sort();

  let lessonsData = {};

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      if (data.lesson_title) {
        let rawTitle = data.lesson_title.trim();
        const skipKeywords = ['Viết', 'Nói và nghe', 'Luyện tập', 'Đọc mở rộng', 'Ôn tập'];
        if (skipKeywords.some(kw => rawTitle.toLowerCase() === kw.toLowerCase() || rawTitle.toLowerCase().includes('đánh giá cuối học kì'))) {
            return; 
        }

        let lessonName = cleanLessonTitle(rawTitle);
        
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
  let qCount = 1;

  for (const lesson of allLessons) {
    const passages = lessonsData[lesson].passages;
    let reading_passage = passages.join('\n\n');
    
    if (!reading_passage || reading_passage.trim().length === 0) {
        continue;
    }

    const lessonExam = {
      id: `exam_${examIdPrefix}_${qCount}`,
      title: lesson,
      lessons: [lesson],
      total_questions: 20,
      time_limit_seconds: 1200, // 20 mins for 20 questions
      passing_score: 70,
      questions: []
    };

    // Helper to add questions
    let globalIndex = 0;
    const addSection = (templateArray, skillName) => {
        templateArray.forEach((t, idx) => {
            let qType = globalIndex % 3 === 0 ? "easy" : (globalIndex % 3 === 1 ? "medium" : "hard");
            let points = qType === "easy" ? 5 : (qType === "medium" ? 10 : 15);
            
            let formattedOptions = t.opts.map((optText, oIdx) => ({
                id: String.fromCharCode(97 + oIdx), // a, b, c, d
                text: optText,
                is_correct: oIdx === t.ans
            }));

            lessonExam.questions.push({
                id: `q_${examIdPrefix}_${lesson.replace(/\s+/g, '_').toLowerCase()}_${globalIndex}`,
                type: "multiple_choice",
                skill: skillName,
                difficulty: qType,
                lesson: lesson,
                points: points,
                question: t.q,
                options: formattedOptions,
                explanation: t.exp,
                reading_passage: reading_passage
            });
            globalIndex++;
        });
    };

    // Build the 20 questions
    addSection(templateBank.doc_hieu, "đọc_hiểu");
    addSection(templateBank.tu_vung, "từ_vựng");
    addSection(templateBank.ngu_phap, "ngữ_pháp");
    addSection(templateBank.chinh_ta, "chính_tả");

    examData.exams.push(lessonExam);
    qCount++;
  }

  const outputPath = path.join(baseDir, `${examIdPrefix}_exams.json`);
  fs.writeFileSync(outputPath, JSON.stringify(examData, null, 2));
  console.log(`Generated ${outputPath} with ${examData.exams.length} exams (20 questions each).`);
}

console.log("Generating Theme 1...");
processTheme("Chủ điểm 1: Những trải nghiệm thú vị", "Chu_diem_1", "chu_diem_1");

console.log("Generating Theme 2...");
processTheme("Chủ điểm 2: Những bài học mới", "Chu_diem_2", "chu_diem_2");

console.log("Generating Theme 3...");
processTheme("Chủ điểm 3: Mái nhà yêu thương", "Chu_diem_3", "chu_diem_3");

console.log("Generating Theme 4...");
processTheme("Chủ điểm 4: Cộng đồng gắn bó", "Chu_diem_4", "chu_diem_4");
