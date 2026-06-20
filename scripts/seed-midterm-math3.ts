import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Correct concept ID from 'concepts' table for Math Grade 3 (concept-math3-bai_1)
const conceptId = '92e7a582-84c7-49d0-a802-8d731da20b27';

const questions = [
  // 6 Multiple Choice questions from Part I
  {
    type: 'multiple_choice',
    difficulty: 1.0,
    metadata_json: {
      question: "Tích của 6 và 4 là:",
      options: ["24", "10", "20", "28"],
      correct_index: 0,
      explanation: "Tính nhẩm dựa vào bảng nhân 6: 6 x 4 = 24."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.1,
    metadata_json: {
      question: "Biết hiệu là 245, số trừ là 162, số bị trừ là:",
      options: ["83", "307", "407", "183"],
      correct_index: 2,
      explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 245 + 162 = 407."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.2,
    metadata_json: {
      question: "Cho dãy số: 3, 6, 9, 12, ..., 27, 30. Các số thích hợp điền vào chỗ chấm lần lượt là:",
      options: ["13, 14, 15, 16", "23, 24, 25, 26", "14, 16, 18, 20", "15, 18, 21, 24"],
      correct_index: 3,
      explanation: "Quy luật: các số liên tiếp tăng dần 3 đơn vị. Các số cần điền là: 15, 18, 21, 24."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.1,
    metadata_json: {
      question: "Hà đã ăn 1/2 chiếc bánh. Chiếc bánh Hà ăn là:",
      options: ["Hình A", "Hình B", "Hình C", "Hình D"],
      correct_index: 0,
      image_url: "/images/toan3-gk1-de1-q4.png",
      explanation: "Chiếc bánh ở hình A được chia thành 2 phần bằng nhau và tô màu 1 phần, tức là đã tô màu 1/2 chiếc bánh."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.0,
    metadata_json: {
      question: "Gấp 7 lên 8 lần ta được:",
      options: ["15", "14", "42", "56"],
      correct_index: 3,
      explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân with số lần: 7 x 8 = 56."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.3,
    metadata_json: {
      question: "Bố An xây một cái bể cá hình chữ nhật và trồng hoa súng trong đó. Mỗi lá súng có dạng hình tròn đường kính 3 dm. Vậy chiều dài của bể cá là:",
      options: ["8 x 3 = 24 dm", "3 x 8 = 24 dm", "4 x 3 = 12 dm", "3 x 4 = 12 dm"],
      correct_index: 1,
      image_url: "/images/toan3-gk1-de1-q6.png",
      explanation: "Chiều dài bể cá gồm 8 lá súng xếp liền nhau, mỗi lá có đường kính 3 dm. Chiều dài của bể cá là: 3 x 8 = 24 (dm)."
    }
  },
  // 6 Fill-in questions from Tự luận Câu 1 & Câu 2 & Câu 3 & Câu 4
  {
    type: 'fill_blank',
    difficulty: 1.1,
    metadata_json: {
      question: "Tính kết quả phép tính: 6 x ___ = 54",
      choices: ["7", "8", "9", "6"],
      correct_answer: "9"
    }
  },
  {
    type: 'fill_blank',
    difficulty: 1.2,
    metadata_json: {
      question: "Tìm số thích hợp điền vào chỗ trống: ___ + 169 = 582",
      choices: ["413", "313", "423", "403"],
      correct_answer: "413"
    }
  },
  {
    type: 'fill_blank',
    difficulty: 1.1,
    metadata_json: {
      question: "Tìm số thích hợp điền vào chỗ trống: 27 : ___ = 9",
      choices: ["2", "3", "4", "5"],
      correct_answer: "3"
    }
  },
  {
    type: 'fill_blank',
    difficulty: 1.2,
    metadata_json: {
      question: "Tìm số thích hợp điền vào chỗ trống: 605 - ___ = 461",
      choices: ["144", "244", "134", "154"],
      correct_answer: "144"
    }
  },
  {
    type: 'fill_blank',
    difficulty: 1.2,
    metadata_json: {
      question: "1/2 số con bọ cánh cam trong tổng số 20 con bọ cánh cam là ___ con.",
      choices: ["10", "5", "8", "12"],
      correct_answer: "10"
    }
  },
  {
    type: 'fill_blank',
    difficulty: 1.2,
    metadata_json: {
      question: "1/5 số con bọ cánh cam trong tổng số 20 con bọ cánh cam là ___ con.",
      choices: ["4", "5", "2", "6"],
      correct_answer: "4"
    }
  },
  // Word problems from Câu 4
  {
    type: 'multiple_choice',
    difficulty: 1.2,
    metadata_json: {
      question: "Ngôi nhà gia đình Lan Anh ở có 3 tầng; mỗi tầng cao 4m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
      options: ["7 m", "12 m", "10 m", "15 m"],
      correct_index: 1,
      explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 4 x 3 = 12 (m)."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1.3,
    metadata_json: {
      question: "Cạnh ngôi nhà có một cây xanh, Lan Anh quan sát thấy chiều cao của cây đó bằng chiều cao của ngôi nhà (12m) giảm đi 2 lần. Hỏi cây đó cao bao nhiêu mét?",
      options: ["6 m", "5 m", "8 m", "4 m"],
      correct_index: 0,
      explanation: "Chiều cao của cây = chiều cao ngôi nhà : 2 = 12 : 2 = 6 (m)."
    }
  }
];

async function seed() {
  console.log("Cleaning up existing midterm collections...");
  // Clean up existing to prevent duplicates/foreign key issues
  const { data: existingCols } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('exam_type', 'midterm');
  
  if (existingCols && existingCols.length > 0) {
    const ids = existingCols.map(c => c.id);
    // Delete exams under this collection
    const { data: existingExams } = await supabase
      .from('exams')
      .select('id')
      .in('collection_id', ids);
    
    if (existingExams && existingExams.length > 0) {
      const examIds = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', examIds);
      await supabase.from('exams').delete().in('id', examIds);
    }
    await supabase.from('assessment_collections').delete().in('id', ids);
  }

  console.log("Seeding math grade 3 midterm exam...");

  // 1. Create or get assessment collection
  const { data: collection, error: colError } = await supabase
    .from('assessment_collections')
    .insert({
      title: 'Kiểm tra giữa học kỳ 1',
      subject_slug: 'toan',
      grade: 3,
      units: [101], // Special unit ID for midterm 1
      volume: 1,
      sequence_number: 1,
      status: 'published',
      exam_type: 'midterm',
      reference_book: 'Kết nối tri thức với cuộc sống'
    })
    .select()
    .single();

  if (colError) {
    console.error("Error creating collection:", colError);
    return;
  }

  console.log(`Created Collection ID: ${collection.id}`);

  // 2. Create Exam
  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      collection_id: collection.id,
      title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 1',
      exam_number: 1,
      total_questions: questions.length,
      generation_mode: 'manual_import'
    })
    .select()
    .single();

  if (examError) {
    console.error("Error creating exam:", examError);
    return;
  }

  console.log(`Created Exam ID: ${exam.id}`);

  // 3. Insert Questions and link them to the Exam
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    
    // Insert into question_bank
    const { data: newQ, error: qError } = await supabase
      .from('question_bank')
      .insert({
        concept_id: conceptId,
        subject_slug: 'toan',
        grade: 3,
        type: q.type,
        difficulty: q.difficulty,
        metadata_json: q.metadata_json,
        source: 'manual_import',
        source_anchor: {
          book: "Đề thi giữa kỳ 1",
          page: 1,
          lesson: "Đề số 1"
        },
        status: 'approved'
      })
      .select()
      .single();

    if (qError) {
      console.error(`Error inserting question ${i + 1}:`, qError.message);
      continue;
    }

    // Link to exam
    const { error: linkError } = await supabase
      .from('exam_questions')
      .insert({
        exam_id: exam.id,
        question_bank_id: newQ.id,
        order_index: i
      });
    
    if (linkError) {
      console.error(`Error linking question ${i + 1} to exam:`, linkError.message);
    }
  }

  console.log("Seeding completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
