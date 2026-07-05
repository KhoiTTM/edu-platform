import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- MARKDOWN THEORY CONTENT ---
const LESSON_8_MD = `### Bài 8: Hình lăng trụ đứng tam giác. Hình lăng trụ đứng tứ giác

#### 1. Hình lăng trụ đứng tam giác
Hình lăng trụ đứng tam giác có:
- **Mặt đáy:** Hai mặt đáy là hai tam giác bằng nhau và nằm trên hai mặt phẳng song song.
- **Mặt bên:** Các mặt bên là những hình chữ nhật.
- **Cạnh bên:** Các cạnh bên song song và bằng nhau. Độ dài cạnh bên được gọi là **chiều cao** của hình lăng trụ đứng.
- **Đỉnh:** Các đỉnh của mặt đáy gọi là các đỉnh của hình lăng trụ đứng (có tổng cộng 6 đỉnh, 9 cạnh).

<div class="flex justify-center my-4">
  <svg width="240" height="180" viewBox="0 0 240 180" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Base 3D shape projection of a triangular prism -->
    <!-- Back elements dashed -->
    <line x1="60" y1="50" x2="160" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <line x1="60" y1="50" x2="60" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
    <!-- Front lines solid -->
    <polygon points="60,140 120,160 160,140" fill="none" stroke="#38bdf8" stroke-width="2" />
    <line x1="120" y1="70" x2="160" y2="50" stroke="#38bdf8" stroke-width="2" />
    <line x1="60" y1="140" x2="120" y2="160" stroke="#38bdf8" stroke-width="2" />
    <!-- Vertical edges -->
    <line x1="120" y1="70" x2="120" y2="160" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="160" y1="50" x2="160" y2="140" stroke="#38bdf8" stroke-width="2.5" />
    <!-- Top base -->
    <polygon points="60,50 120,70 160,50" fill="rgba(56, 189, 248, 0.05)" stroke="#38bdf8" stroke-width="2" />
    
    <!-- Labels -->
    <text x="50" y="45" fill="#fff" font-size="11">A</text>
    <text x="120" y="62" fill="#fff" font-size="11">B</text>
    <text x="165" y="45" fill="#fff" font-size="11">C</text>
    <text x="50" y="145" fill="#fff" font-size="11">A'</text>
    <text x="120" y="174" fill="#fff" font-size="11">B'</text>
    <text x="165" y="145" fill="#fff" font-size="11">C'</text>
  </svg>
</div>

#### 2. Hình lăng trụ đứng tứ giác
Hình lăng trụ đứng tứ giác có:
- **Mặt đáy:** Hai mặt đáy là hai tứ giác bằng nhau và nằm trên hai mặt phẳng song song.
- **Mặt bên:** Các mặt bên là những hình chữ nhật (có tổng cộng 4 mặt bên, 8 đỉnh, 12 cạnh).
- **Cạnh bên:** Các cạnh bên song song và bằng nhau. Chiều dài cạnh bên là chiều cao.
- **Trường hợp đặc biệt:** Hình hộp chữ nhật và hình lập phương đều là các hình lăng trụ đứng tứ giác đặc biệt.

#### 3. Công thức diện tích và thể tích (Bổ sung thực tiễn)
- **Diện tích xung quanh ($S_{xq}$):** Tổng diện tích các mặt bên.
  - $S_{xq} = C_{đáy} \\cdot h$ (với $C_{đáy}$ là chu vi đáy, $h$ là chiều cao).
- **Thể tích ($V$):**
  - $V = S_{đáy} \\cdot h$ (với $S_{đáy}$ là diện tích đáy, $h$ là chiều cao).
`;

const L8_QUESTIONS = [
  {
    question: "Hình lăng trụ đứng tam giác có hai mặt đáy là hình gì?",
    options: [
      "Hai tam giác bằng nhau",
      "Hai hình chữ nhật bằng nhau",
      "Hai tứ giác bằng nhau",
      "Hai tam giác vuông cân"
    ],
    correct_index: 0,
    explanation: "Theo định nghĩa, hình lăng trụ đứng tam giác có hai mặt đáy là những tam giác bằng nhau và nằm trên hai mặt phẳng song song.",
    difficulty: 1.0
  },
  {
    question: "Các mặt bên của một hình lăng trụ đứng (tam giác hoặc tứ giác) luôn là hình gì?",
    options: ["Hình chữ nhật", "Hình tam giác", "Hình bình hành", "Hình vuông"],
    correct_index: 0,
    explanation: "Tất cả các mặt bên của hình lăng trụ đứng đều là hình chữ nhật.",
    difficulty: 1.0
  },
  {
    question: "Độ dài cạnh bên của hình lăng trụ đứng được gọi là gì?",
    options: ["Chiều cao", "Đường chéo", "Cạnh đáy", "Chu vi đáy"],
    correct_index: 0,
    explanation: "Độ dài các cạnh bên song song và bằng nhau của hình lăng trụ đứng chính là chiều cao của lăng trụ đứng đó.",
    difficulty: 1.0
  },
  {
    question: "Một hình lăng trụ đứng tam giác có bao nhiêu đỉnh và bao nhiêu cạnh bên?",
    options: [
      "6 đỉnh và 3 cạnh bên",
      "5 đỉnh và 3 cạnh bên",
      "6 đỉnh và 9 cạnh bên",
      "8 đỉnh và 4 cạnh bên"
    ],
    correct_index: 0,
    explanation: "Hình lăng trụ đứng tam giác có 6 đỉnh (3 ở đáy trên, 3 ở đáy dưới) và có 3 cạnh bên tương ứng nối hai đáy.",
    difficulty: 1.2
  },
  {
    question: "Một hình lăng trụ đứng tứ giác có tổng cộng bao nhiêu mặt bên?",
    options: ["4", "6", "8", "2"],
    correct_index: 0,
    explanation: "Hình lăng trụ đứng tứ giác có đáy là tứ giác (4 cạnh) nên có đúng 4 mặt bên hình chữ nhật.",
    difficulty: 1.0
  },
  {
    question: "Hình nào dưới đây là trường hợp đặc biệt của hình lăng trụ đứng tứ giác?",
    options: [
      "Hình hộp chữ nhật",
      "Hình lăng trụ đứng tam giác",
      "Hình chóp tam giác",
      "Hình bình hành"
    ],
    correct_index: 0,
    explanation: "Hình hộp chữ nhật và hình lập phương là các hình lăng trụ đứng tứ giác đặc biệt có các đáy là hình chữ nhật hoặc hình vuông.",
    difficulty: 1.2
  },
  {
    question: "Tính tổng số cạnh của một hình lăng trụ đứng tam giác.",
    options: ["9 cạnh", "6 cạnh", "12 cạnh", "10 cạnh"],
    correct_index: 0,
    explanation: "Lăng trụ đứng tam giác gồm 3 cạnh đáy trên, 3 cạnh đáy dưới và 3 cạnh bên. Tổng cộng có $3 + 3 + 3 = 9$ cạnh.",
    difficulty: 1.2
  },
  {
    question: "Một hình lăng trụ đứng tứ giác có tổng số cạnh là bao nhiêu?",
    options: ["12 cạnh", "8 cạnh", "16 cạnh", "10 cạnh"],
    correct_index: 0,
    explanation: "Lăng trụ đứng tứ giác gồm 4 cạnh đáy trên, 4 cạnh đáy dưới và 4 cạnh bên. Tổng cộng có $4 + 4 + 4 = 12$ cạnh.",
    difficulty: 1.2
  },
  {
    question: "Công thức tính thể tích $V$ của hình lăng trụ đứng có diện tích đáy $S$ và chiều cao $h$ là:",
    options: [
      "$V = S \\cdot h$",
      "$V = \\frac{1}{3} S \\cdot h$",
      "$V = 2S \\cdot h$",
      "$V = (S + h) \\cdot 2$"
    ],
    correct_index: 0,
    explanation: "Thể tích của hình lăng trụ đứng được tính bằng tích diện tích đáy nhân với chiều cao: $V = S \\cdot h$.",
    difficulty: 1.5
  },
  {
    question: "Tính thể tích của hình lăng trụ đứng tam giác có diện tích đáy là $15 cm^2$ và chiều cao là $6 cm$.",
    options: ["$90 cm^3$", "$45 cm^3$", "$30 cm^3$", "$21 cm^3$"],
    correct_index: 0,
    explanation: "Thể tích $V = S \\cdot h = 15 \\cdot 6 = 90 cm^3$.",
    difficulty: 1.5
  }
];

const EXAM3_QUESTIONS = [
  {
    question: "Hình lăng trụ đứng tam giác có số mặt bên là:",
    options: ["3", "4", "5", "6"],
    correct_index: 0,
    explanation: "Lăng trụ đứng tam giác có 3 mặt bên hình chữ nhật.",
    difficulty: 1.0
  },
  {
    question: "Khẳng định nào sau đây về các cạnh bên của hình lăng trụ đứng là ĐÚNG?",
    options: [
      "Các cạnh bên song song và bằng nhau.",
      "Các cạnh bên vuông góc với nhau.",
      "Các cạnh bên cắt nhau tại một điểm.",
      "Các cạnh bên có độ dài khác nhau."
    ],
    correct_index: 0,
    explanation: "Các cạnh bên của hình lăng trụ đứng luôn luôn song song và bằng nhau.",
    difficulty: 1.0
  },
  {
    question: "Một hình lăng trụ đứng tam giác có bao nhiêu đỉnh?",
    options: ["6", "5", "8", "9"],
    correct_index: 0,
    explanation: "Lăng trụ đứng tam giác có 6 đỉnh.",
    difficulty: 1.0
  },
  {
    question: "Một hình lăng trụ đứng tứ giác có bao nhiêu đỉnh?",
    options: ["8", "6", "10", "12"],
    correct_index: 0,
    explanation: "Lăng trụ đứng tứ giác có 8 đỉnh (4 ở đáy trên, 4 ở đáy dưới).",
    difficulty: 1.0
  },
  {
    question: "Các mặt bên của hình lăng trụ đứng tam giác là:",
    options: [
      "Các hình chữ nhật",
      "Các hình tam giác",
      "Các hình thang cân",
      "Các hình tròn"
    ],
    correct_index: 0,
    explanation: "Tất cả các mặt bên của lăng trụ đứng đều là hình chữ nhật.",
    difficulty: 1.0
  },
  {
    question: "Công thức tính diện tích xung quanh $S_{xq}$ của hình lăng trụ đứng với chu vi đáy $C$ và chiều cao $h$ là:",
    options: [
      "$S_{xq} = C \\cdot h$",
      "$S_{xq} = 2C \\cdot h$",
      "$S_{xq} = \\frac{1}{2} C \\cdot h$",
      "$S_{xq} = C + h$"
    ],
    correct_index: 0,
    explanation: "Diện tích xung quanh bằng chu vi đáy nhân với chiều cao: $S_{xq} = C \\cdot h$.",
    difficulty: 1.5
  },
  {
    question: "Thể tích của hình lăng trụ đứng tứ giác có diện tích đáy là $24 cm^2$ và chiều cao là $5 cm$ là:",
    options: ["$120 cm^3$", "$60 cm^3$", "$29 cm^3$", "$48 cm^3$"],
    correct_index: 0,
    explanation: "Thể tích $V = S_{đáy} \\cdot h = 24 \\cdot 5 = 120 cm^3$.",
    difficulty: 1.2
  },
  {
    question: "Diện tích xung quanh của hình lăng trụ đứng tam giác có chiều cao $10 cm$, đáy là tam giác đều cạnh $4 cm$ là:",
    options: ["$120 cm^2$", "$40 cm^2$", "$160 cm^2$", "$80 cm^2$"],
    correct_index: 0,
    explanation: "Chu vi đáy tam giác đều là $C = 4 \\cdot 3 = 12 cm$. Diện tích xung quanh $S_{xq} = C \\cdot h = 12 \\cdot 10 = 120 cm^2$.",
    difficulty: 1.5
  },
  {
    question: "Đâu là hình lăng trụ đứng tứ giác đặc biệt?",
    options: [
      "Hình lập phương",
      "Hình lăng trụ đứng tam giác",
      "Hình chóp tứ giác",
      "Hình nón"
    ],
    correct_index: 0,
    explanation: "Hình lập phương và hình hộp chữ nhật là các hình lăng trụ đứng tứ giác đặc biệt.",
    difficulty: 1.0
  },
  {
    question: "Hình lăng trụ đứng tam giác có tổng số cạnh là:",
    options: ["9", "6", "12", "8"],
    correct_index: 0,
    explanation: "Hình lăng trụ đứng tam giác có 9 cạnh.",
    difficulty: 1.0
  },
  {
    question: "Cho một hình lăng trụ đứng tứ giác có chu vi đáy $C = 16 cm$, diện tích xung quanh $S_{xq} = 80 cm^2$. Chiều cao của hình lăng trụ đó là:",
    options: ["$5 cm$", "$10 cm$", "$4 cm$", "$16 cm$"],
    correct_index: 0,
    explanation: "$h = S_{xq} : C = 80 : 16 = 5 cm$.",
    difficulty: 1.5
  },
  {
    question: "Một hộp quà dạng hình lăng trụ đứng tam giác có diện tích đáy là $30 cm^2$, chiều cao là $8 cm$. Thể tích hộp quà đó là:",
    options: ["$240 cm^3$", "$120 cm^3$", "$90 cm^3$", "$80 cm^3$"],
    correct_index: 0,
    explanation: "$V = 30 \\cdot 8 = 240 cm^3$.",
    difficulty: 1.2
  },
  {
    question: "Hình hộp chữ nhật có bao nhiêu mặt bên?",
    options: ["4 mặt bên", "6 mặt bên", "8 mặt bên", "2 mặt bên"],
    correct_index: 0,
    explanation: "Hình hộp chữ nhật là hình lăng trụ đứng tứ giác nên có 4 mặt bên.",
    difficulty: 1.0
  },
  {
    question: "Đáy của hình lăng trụ đứng tam giác ABC.A'B'C' là:",
    options: [
      "Tam giác ABC và tam giác A'B'C'",
      "Hình chữ nhật ABB'A'",
      "Hình chữ nhật BCC'B'",
      "Tam giác ABC và hình chữ nhật ACC'A'"
    ],
    correct_index: 0,
    explanation: "Hai mặt đáy là hai tam giác ABC và A'B'C'.",
    difficulty: 1.0
  },
  {
    question: "Một lăng trụ đứng tứ giác có chiều cao $12 cm$. Biết đáy là hình vuông cạnh $5 cm$. Tính thể tích hình lăng trụ đó.",
    options: ["$300 cm^3$", "$60 cm^3$", "$150 cm^3$", "$120 cm^3$"],
    correct_index: 0,
    explanation: "Diện tích đáy $S = 5^2 = 25 cm^2$. Thể tích $V = S \\cdot h = 25 \\cdot 12 = 300 cm^3$.",
    difficulty: 1.5
  }
];

async function seed() {
  console.log("🚀 Seeding Chapter 3 content and questions...");

  // 1. Fetch Lesson Node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', 'bai-8-hinh-lang-tru-dung')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-8-hinh-lang-tru-dung' not found!");
    process.exit(1);
  }

  // Update metadata to include grammar_tutorial (Theory)
  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: LESSON_8_MD
  };

  const { error: updateError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

  if (updateError) throw updateError;
  console.log("✅ Theory updated for bai-8-hinh-lang-tru-dung");

  // Fetch Concept linked to Lesson 8
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-8-hinh-lang-tru-dung')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-8-hinh-lang-tru-dung' not found!");
    process.exit(1);
  }
  console.log(`✅ Found Concept ID: ${concept.id}`);

  // Clear existing questions for this concept
  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);
  console.log("🗑️ Cleared existing questions.");

  // Seed Lesson 8 Questions
  console.log("Seeding Lesson 8 Questions...");
  for (const q of L8_QUESTIONS) {
    await supabase
      .from('question_bank')
      .insert({
        concept_id: concept.id,
        type: 'multiple_choice',
        difficulty: q.difficulty || 1.0,
        metadata_json: {
          question: q.question,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation
        },
        source: 'handcrafted',
        status: 'approved',
        grade: 7,
        subject_slug: 'toan'
      });
  }
  console.log(`✅ Seeded ${L8_QUESTIONS.length} questions.`);

  // 2. Fetch Chapter 3 Exam Node
  const { data: examNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id, metadata')
    .eq('slug', 'kiem-tra-chuong-3')
    .single();

  if (examNode) {
    const examConceptSlug = 'concept-kiem-tra-chuong-3';
    const { data: examConcept } = await supabase
      .from('concepts')
      .upsert({
        source_id: examNode.source_id,
        slug: examConceptSlug,
        title: 'Kiểm tra tổng hợp Chương 3',
        description: 'Đánh giá kiến thức chương 3 hình học trực quan'
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (examConcept) {
      await supabase
        .from('curriculum_nodes')
        .update({
          metadata: {
            ...(examNode.metadata as any || {}),
            concept_id: examConcept.id
          }
        })
        .eq('id', examNode.id);

      await supabase
        .from('lesson_concepts')
        .upsert({
          lesson_id: examNode.id,
          concept_id: examConcept.id
        }, { onConflict: 'lesson_id,concept_id' });

      await supabase
        .from('question_bank')
        .delete()
        .eq('concept_id', examConcept.id);

      for (const q of EXAM3_QUESTIONS) {
        await supabase
          .from('question_bank')
          .insert({
            concept_id: examConcept.id,
            type: 'multiple_choice',
            difficulty: q.difficulty || 1.0,
            metadata_json: {
              question: q.question,
              options: q.options,
              correct_index: q.correct_index,
              explanation: q.explanation
            },
            source: 'handcrafted',
            status: 'approved',
            grade: 7,
            subject_slug: 'toan'
          });
      }
      console.log(`✅ Seeded ${EXAM3_QUESTIONS.length} questions for Chapter 3 Exam.`);
    }
  }

  console.log("\n🎉 Chapter 3 Seeding Completed Successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
