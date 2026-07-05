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

// Concept ID for Math Grade 3 (concept-math3-bai_1)
const conceptId = '92e7a582-84c7-49d0-a802-8d731da20b27';

// Inline SVG diagrams representing shapes or fraction bars
const svgCake1_3_and_1_4 = `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <!-- HÌNH A -->
  <g transform="translate(10, 0)">
    <circle cx="90" cy="100" r="70" fill="none" stroke="#6366f1" stroke-width="4"/>
    <!-- 1/3 Colored Section -->
    <path d="M 90 100 L 90 30 A 70 70 0 0 1 150.62 135 Z" fill="#6366f1" opacity="0.6" stroke="#4f46e5" stroke-width="2"/>
    <path d="M 90 100 L 150.62 135 A 70 70 0 0 1 29.38 135 Z" fill="none" stroke="#4f46e5" stroke-width="2"/>
    <path d="M 90 100 L 29.38 135 A 70 70 0 0 1 90 30 Z" fill="none" stroke="#4f46e5" stroke-width="2"/>
    <text x="90" y="190" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">Hình A</text>
  </g>

  <!-- HÌNH B -->
  <g transform="translate(220, 0)">
    <circle cx="90" cy="100" r="70" fill="none" stroke="#10b981" stroke-width="4"/>
    <!-- 1/4 Colored Section -->
    <path d="M 90 100 L 90 30 A 70 70 0 0 1 160 100 Z" fill="#10b981" opacity="0.6" stroke="#059669" stroke-width="2"/>
    <path d="M 90 100 L 160 100 A 70 70 0 0 1 90 170 Z" fill="none" stroke="#059669" stroke-width="2"/>
    <path d="M 90 100 L 90 170 A 70 70 0 0 1 20 100 Z" fill="none" stroke="#059669" stroke-width="2"/>
    <path d="M 90 100 L 20 100 A 70 70 0 0 1 90 30 Z" fill="none" stroke="#059669" stroke-width="2"/>
    <text x="90" y="190" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">Hình B</text>
  </g>
</svg>`;

const svgCake3_6 = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <!-- Outer circle -->
  <circle cx="100" cy="100" r="80" fill="none" stroke="#6366f1" stroke-width="4"/>
  <!-- 3/6 Colored Section -->
  <path d="M 100 100 L 100 20 A 80 80 0 0 1 100 180 Z" fill="#6366f1" opacity="0.6" stroke="#4f46e5" stroke-width="2"/>
  <path d="M 100 100 L 100 180 A 80 80 0 0 1 100 20 Z" fill="none" stroke="#4f46e5" stroke-width="2"/>
  <line x1="100" y1="100" x2="169.28" y2="140" stroke="#4f46e5" stroke-width="2"/>
  <line x1="100" y1="100" x2="30.72" y2="140" stroke="#4f46e5" stroke-width="2"/>
  <line x1="100" y1="100" x2="169.28" y2="60" stroke="#4f46e5" stroke-width="2"/>
  <line x1="100" y1="100" x2="30.72" y2="60" stroke="#4f46e5" stroke-width="2"/>
  <text x="100" y="105" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">Hình C</text>
</svg>`;

const svgMeasureBox = `<svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <!-- Background border -->
  <rect x="10" y="10" width="340" height="100" rx="10" fill="none" stroke="#475569" stroke-width="2"/>
  <!-- Dimension rectangle (shifted to the right) -->
  <rect x="110" y="30" width="200" height="50" fill="#f59e0b" fill-opacity="0.2" stroke="#d97706" stroke-width="3"/>
  <!-- Dimension text -->
  <text x="210" y="25" font-family="sans-serif" font-size="14" fill="#fba518" text-anchor="middle">Chiều dài: 8 cm</text>
  <text x="100" y="60" font-family="sans-serif" font-size="14" fill="#fba518" text-anchor="end">Chiều rộng: ?</text>
  <text x="210" y="60" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Diện tích = 24 cm²</text>
</svg>`;

const examData = {
  exam_number: 5,
  title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 5 (SVG tự động)',
  questions: [
    {
      type: 'multiple_choice',
      difficulty: 1.0,
      metadata_json: {
        question: "Tích của 8 và 9 là:",
        options: ["72", "17", "64", "81"],
        correct_index: 0,
        explanation: "Tính nhẩm dựa vào bảng nhân 8: 8 x 9 = 72."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.1,
      metadata_json: {
        question: "Biết hiệu là 356, số trừ là 214, số bị trừ là:",
        options: ["142", "570", "560", "242"],
        correct_index: 1,
        explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 356 + 214 = 570."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.2,
      metadata_json: {
        question: "Cho dãy số: 7, 14, 21, 28, ..., 63, 70. Các số thích hợp điền vào chỗ chấm lần lượt là:",
        options: ["35, 42, 49, 56", "30, 32, 34, 36", "32, 36, 40, 44", "35, 40, 45, 50"],
        correct_index: 0,
        explanation: "Quy luật: các số liên tiếp tăng dần 7 đơn vị. Các số cần điền là: 35, 42, 49, 56."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.1,
      metadata_json: {
        question: "Hà vẽ hai mô hình hình tròn dưới đây để biểu diễn phân số. Hình nào được tô màu đúng một phần ba (1/3) hình?",
        options: ["Hình A", "Hình B", "Cả hai hình", "Không hình nào"],
        correct_index: 0,
        image_url: svgCake1_3_and_1_4,
        explanation: "Hình A được chia đều làm 3 phần và tô màu 1 phần, biểu thị phân số 1/3."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.0,
      metadata_json: {
        question: "Gấp 8 lên 6 lần ta được:",
        options: ["14", "48", "40", "56"],
        correct_index: 1,
        explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 8 x 6 = 48."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.3,
      metadata_json: {
        question: "Cho hình chữ nhật có diện tích và chiều dài như hình vẽ dưới đây. Chiều rộng của hình chữ nhật đó là:",
        options: ["2 cm", "3 cm", "4 cm", "5 cm"],
        correct_index: 1,
        image_url: svgMeasureBox,
        explanation: "Chiều rộng = Diện tích : Chiều dài. Phép tính: 24 : 8 = 3 (cm)."
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.1,
      metadata_json: {
        question: "Tính kết quả phép tính: 8 x ___ = 72",
        choices: ["7", "8", "9", "6"],
        correct_answer: "9"
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.2,
      metadata_json: {
        question: "Tìm số thích hợp điền vào chỗ trống: ___ + 258 = 689",
        choices: ["431", "331", "421", "441"],
        correct_answer: "431"
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.1,
      metadata_json: {
        question: "Tìm số thích hợp điền vào chỗ trống: 56 : ___ = 8",
        choices: ["6", "7", "8", "9"],
        correct_answer: "7"
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.2,
      metadata_json: {
        question: "Tìm số thích hợp điền vào chỗ trống: 850 - ___ = 530",
        choices: ["320", "220", "310", "330"],
        correct_answer: "320"
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.2,
      metadata_json: {
        question: "1/3 số con bọ cánh cam trong tổng số 27 con bọ cánh cam là ___ con.",
        choices: ["9", "8", "7", "10"],
        correct_answer: "9"
      }
    },
    {
      type: 'fill_blank',
      difficulty: 1.2,
      metadata_json: {
        question: "1/9 số con bọ cánh cam trong tổng số 27 con bọ cánh cam là ___ con.",
        choices: ["3", "4", "2", "5"],
        correct_answer: "3"
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.2,
      metadata_json: {
        question: "Ngôi nhà gia đình Lan Anh ở có 4 tầng; mỗi tầng cao 4m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
        options: ["8 m", "16 m", "12 m", "20 m"],
        correct_index: 1,
        explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 4 x 4 = 16 (m)."
      }
    },
    {
      type: 'multiple_choice',
      difficulty: 1.3,
      metadata_json: {
        question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (16m) giảm đi 4 lần. Hỏi cây đó cao bao nhiêu mét?",
        options: ["4 m", "3 m", "12 m", "6 m"],
        correct_index: 0,
        explanation: "Chiều cao của cây = chiều cao ngôi nhà : 4 = 16 : 4 = 4 (m)."
      }
    }
  ]
};

async function seed() {
  console.log("Looking for math grade 3 midterm collection...");
  const { data: collection, error: colError } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('exam_type', 'midterm')
    .single();

  if (colError || !collection) {
    console.error("Error finding midterm collection. Make sure you seeded midterm exams first.", colError);
    return;
  }

  console.log(`Found Collection ID: ${collection.id}. Removing any existing Exam 5...`);
  const { data: existingExams } = await supabase
    .from('exams')
    .select('id')
    .eq('collection_id', collection.id)
    .eq('exam_number', 5);

  if (existingExams && existingExams.length > 0) {
    const examIds = existingExams.map(e => e.id);
    await supabase.from('exam_questions').delete().in('exam_id', examIds);
    await supabase.from('exams').delete().in('id', examIds);
  }

  console.log(`Seeding Exam 5 into Collection...`);
  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      collection_id: collection.id,
      title: examData.title,
      exam_number: examData.exam_number,
      total_questions: examData.questions.length,
      generation_mode: 'manual_import'
    })
    .select()
    .single();

  if (examError) {
    console.error("Error creating exam:", examError);
    return;
  }

  console.log(`Created Exam ID: ${exam.id}`);

  for (let i = 0; i < examData.questions.length; i++) {
    const q = examData.questions[i];
    
    // Insert question into question_bank
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
          lesson: `Đề số ${examData.exam_number}`
        },
        status: 'approved'
      })
      .select()
      .single();

    if (qError) {
      console.error(`Error inserting question ${i + 1}:`, qError.message);
      continue;
    }

    // Link question to exam
    const { error: linkError } = await supabase
      .from('exam_questions')
      .insert({
        exam_id: exam.id,
        question_bank_id: newQ.id,
        order_index: i
      });
    
    if (linkError) {
      console.error(`Error linking question ${i + 1}:`, linkError.message);
    }
  }

  console.log("Seeding Exam 5 (14 questions complete, SVG) completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
