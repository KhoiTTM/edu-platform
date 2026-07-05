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

const LESSON_1_MARKDOWN = `#### 1. Định nghĩa Số hữu tỉ
Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.
Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.
> **Ví dụ về Số hữu tỉ:**
> Các số $-3; 0,5; 0; 2 \\frac{1}{4}$ đều là số hữu tỉ vì:
> - $-3 = \\frac{-3}{1}$
> - $0,5 = \\frac{1}{2}$
> - $0 = \\frac{0}{1}$
> - $2 \\frac{1}{4} = \\frac{9}{4}$

#### 2. Thứ tự trong tập hợp các số hữu tỉ
Với hai số hữu tỉ bất kì $x, y$, ta luôn có: hoặc $x < y$, hoặc $x > y$, hoặc $x = y$.
Nếu $x < y$ và $y < z$ thì $x < z$ (tính chất bắc cầu).
Trên trục số, nếu $x < y$ thì điểm $x$ nằm bên trái điểm $y$.

#### 3. So sánh hai số hữu tỉ
Để so sánh hai số hữu tỉ, ta viết chúng dưới dạng phân số có cùng mẫu số dương rồi so sánh hai phân số đó.
- **Quy tắc so sánh nhanh**:
  - Số hữu tỉ dương luôn lớn hơn số hữu tỉ âm.
  - Số hữu tỉ 0 không là số hữu tỉ dương cũng không là số hữu tỉ âm.
  - Với hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.
> **Ví dụ:** So sánh $-0,5$ và $\\frac{1}{-4}$.
> - Đổi $-0,5 = \\frac{-2}{4}$ và $\\frac{1}{-4} = \\frac{-1}{4}$.
> - Vì $-2 < -1$ nên $\\frac{-2}{4} < \\frac{-1}{4}$.
> - Do đó: $-0,5 < \\frac{1}{-4}$.

#### 4. Biểu diễn số hữu tỉ trên trục số
Mọi số hữu tỉ đều được biểu diễn bởi một điểm trên trục số.
- **Biểu diễn số hữu tỉ dương (ví dụ $\\frac{2}{3}$)**: Chia đoạn thẳng đơn vị từ 0 đến 1 thành 3 phần bằng nhau. Điểm biểu diễn là điểm nằm bên phải điểm 0 và cách 0 một khoảng bằng 2 đơn vị mới.
- **Biểu diễn số hữu tỉ âm (ví dụ $\\frac{-3}{2}$)**: Chia đoạn đơn vị thành 2 phần bằng nhau. Điểm biểu diễn nằm bên trái điểm 0 và cách 0 một khoảng bằng 3 đơn vị mới.

#### 5. Số đối của một số hữu tỉ
Số hữu tỉ $-x$ gọi là số đối của số hữu tỉ $x$, và ngược lại $x$ là số đối của $-x$. Số đối của số 0 là chính nó.
- **Tính chất**: Trên trục số, hai điểm biểu diễn của hai số đối nhau $x$ và $-x$ nằm về hai phía của điểm gốc 0 và cách đều điểm gốc 0.
> **Ví dụ:**
> - Số đối của $1,3$ là $-1,3$.
> - Số đối của $\\frac{-5}{8}$ là $\\frac{5}{8}$.
`;

const ALL_QUESTIONS = [
  {
    question: "Số hữu tỉ là số viết được dưới dạng phân số a/b thỏa mãn điều kiện nào?",
    options: [
      "a, b thuộc Z; b khác 0",
      "a, b thuộc N; b khác 0",
      "a, b thuộc R",
      "a, b thuộc Z"
    ],
    correct_index: 0,
    explanation: "Định nghĩa số hữu tỉ là số viết được dưới dạng phân số a/b với a, b là các số nguyên (Z) và mẫu số b phải khác 0.",
    difficulty: 1.0
  },
  {
    question: "Tập hợp các số hữu tỉ được kí hiệu là gì?",
    options: ["N", "Z", "Q", "R"],
    correct_index: 2,
    explanation: "Tập hợp số hữu tỉ được kí hiệu bằng chữ cái viết hoa Q.",
    difficulty: 1.0
  },
  {
    question: "So sánh hai số hữu tỉ sau: -0,5 và 1/(-4). Khẳng định nào đúng?",
    options: [
      "-0,5 < 1/(-4)",
      "-0,5 > 1/(-4)",
      "-0,5 = 1/(-4)",
      "Không so sánh được"
    ],
    correct_index: 0,
    explanation: "Ta có -0,5 = -2/4 và 1/(-4) = -1/4. Vì -2 < -1 nên -2/4 < -1/4. Do đó -0,5 < 1/(-4).",
    difficulty: 1.0
  },
  {
    question: "So sánh hai số hữu tỉ sau: -0,75 và -5/6. Khẳng định nào đúng?",
    options: [
      "-0,75 > -5/6",
      "-0,75 < -5/6",
      "-0,75 = -5/6",
      "Không so sánh được"
    ],
    correct_index: 0,
    explanation: "Ta có -0,75 = -3/4 = -9/12. Phân số -5/6 = -10/12. Vì -9 > -10 nên -9/12 > -10/12. Do đó -0,75 > -5/6.",
    difficulty: 1.0
  },
  {
    question: "So sánh -4,5 và 0,3. Khẳng định nào đúng?",
    options: [
      "-4,5 < 0,3",
      "-4,5 > 0,3",
      "-4,5 = 0,3",
      "Không so sánh được"
    ],
    correct_index: 0,
    explanation: "Vì -4,5 là số hữu tỉ âm và 0,3 là số hữu tỉ dương. Số hữu tỉ âm luôn nhỏ hơn số hữu tỉ dương.",
    difficulty: 1.0
  },
  {
    question: "Tìm số đối của số hữu tỉ 1,3.",
    options: ["-1,3", "1,3", "3,1", "-3,1"],
    correct_index: 0,
    explanation: "Số đối của số hữu tỉ x là -x. Do đó số đối của 1,3 là -1,3.",
    difficulty: 1.0
  },
  {
    question: "Tìm số đối của số hữu tỉ -5/8.",
    options: ["5/8", "-5/8", "8/5", "-8/5"],
    correct_index: 0,
    explanation: "Số đối của -5/8 là -(-5/8) = 5/8.",
    difficulty: 1.0
  },
  {
    question: "Số hữu tỉ nào sau đây không biểu diễn được dưới dạng phân số có mẫu số bằng 100?",
    options: ["0,6", "-1,25", "1/3", "-2,4"],
    correct_index: 2,
    explanation: "Vì 1/3 không thể quy đồng về phân số có mẫu số là 100 (do 100 không chia hết cho 3).",
    difficulty: 2.0
  },
  {
    question: "Số đối của các số hữu tỉ sau: 12; -0,5; 3/7; -1 1/2 lần lượt là:",
    options: [
      "-12; 0,5; -3/7; 1 1/2",
      "-12; -0,5; 3/7; -1 1/2",
      "12; 0,5; -3/7; 1 1/2",
      "-12; 0,5; -3/7; -1 1/2"
    ],
    correct_index: 0,
    explanation: "Số đối của 12 là -12; số đối của -0,5 là 0,5; số đối của 3/7 là -3/7; số đối của -1 1/2 là 1 1/2.",
    difficulty: 2.0
  },
  {
    question: "Trong các khẳng định sau, khẳng định nào sai về số hữu tỉ?",
    options: [
      "Số 0 không là số hữu tỉ dương cũng không là số hữu tỉ âm",
      "Số hữu tỉ âm luôn nhỏ hơn số hữu tỉ dương",
      "Mọi số nguyên đều là số hữu tỉ",
      "Số hữu tỉ âm là số lớn hơn 0"
    ],
    correct_index: 3,
    explanation: "Khẳng định 'Số hữu tỉ âm là số lớn hơn 0' là sai, vì số hữu tỉ âm luôn nhỏ hơn 0.",
    difficulty: 2.0
  }
];

async function seed() {
  console.log("🚀 Seeding content and questions to question_bank for Bài 1...");

  // 1. Fetch Lesson Node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', 'bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-1-tap-hop-cac-so-huu-ti' not found!");
    process.exit(1);
  }

  // Update metadata to include grammar_tutorial (Step 1)
  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: LESSON_1_MARKDOWN
  };

  const { error: updateError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

  if (updateError) throw updateError;
  console.log("✅ Step 1: Lesson Theory Markdown updated in curriculum_nodes.");

  // 2. Fetch Concept linked to Lesson 1
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-1-tap-hop-cac-so-huu-ti' not found!");
    process.exit(1);
  }
  console.log(`✅ Found Concept ID: ${concept.id}`);

  // Delete existing questions for this concept to avoid duplicates
  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);
  console.log("🗑️ Cleared existing questions for this concept in question_bank.");

  // 3. Insert new questions into question_bank
  console.log("Seeding Questions into question_bank...");
  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const { data: newQ, error: qError } = await supabase
      .from('question_bank')
      .insert({
        concept_id: concept.id,
        type: 'multiple_choice',
        difficulty: q.difficulty,
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
      })
      .select()
      .single();

    if (qError) {
      console.error(`❌ Error inserting question ${i + 1}:`, qError.message);
    } else {
      console.log(`   - Seeded Question: ${q.question}`);
    }
  }

  console.log("\n✅ Seeding Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
