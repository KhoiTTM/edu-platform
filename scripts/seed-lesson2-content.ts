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

const LESSON_2_MARKDOWN = `### Bài 2: Cộng, trừ, nhân, chia số hữu tỉ

#### 1. Cộng và trừ hai số hữu tỉ
Ta có thể cộng, trừ hai số hữu tỉ bằng cách viết chúng dưới dạng phân số có cùng mẫu dương rồi áp dụng quy tắc cộng, trừ phân số.
- **Quy tắc:** Với $x = \\frac{a}{m}, y = \\frac{b}{m}$ ($a, b, m \\in \\mathbb{Z}, m > 0$):
  - $x + y = \\frac{a}{m} + \\frac{b}{m} = \\frac{a + b}{m}$
  - $x - y = \\frac{a}{m} - \\frac{b}{m} = \\frac{a - b}{m}$
> **Ví dụ:** Tính $-0,5 + \\frac{1}{3}$.
> - Đổi $-0,5 = \\frac{-1}{2} = \\frac{-3}{6}$ và $\\frac{1}{3} = \\frac{2}{6}$.
> - $-0,5 + \\frac{1}{3} = \\frac{-3 + 2}{6} = \\frac{-1}{6}$.

#### 2. Quy tắc dấu ngoặc
Khi biến đổi biểu thức chứa các dấu ngoặc, ta áp dụng quy tắc:
- **Đằng trước có dấu cộng (+):** Giữ nguyên dấu của các số hạng trong ngoặc.
  - $+(a - b + c) = a - b + c$
- **Đằng trước có dấu trừ (-):** Phải đổi dấu tất cả các số hạng trong ngoặc.
  - $-(a - b + c) = -a + b - c$
> **Ví dụ:** Tính $B = (0,25 - \\frac{5}{6}) - (1,25 - \\frac{5}{6})$.
> - Bỏ ngoặc: $B = 0,25 - \\frac{5}{6} - 1,25 + \\frac{5}{6}$
> - Nhóm số hạng thích hợp: $B = (0,25 - 1,25) + (\\frac{-5}{6} + \\frac{5}{6}) = -1 + 0 = -1$.

#### 3. Nhân và chia hai số hữu tỉ
Ta thực hiện nhân, chia hai số hữu tỉ bằng cách viết chúng dưới dạng phân số rồi áp dụng quy tắc nhân, chia phân số.
- **Quy tắc:** Với $x = \\frac{a}{b}, y = \\frac{c}{d}$ ($b, d \\neq 0$):
  - $x \\cdot y = \\frac{a \\cdot c}{b \\cdot d}$
  - $x : y = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ (với $y \\neq 0$)
> **Ví dụ:** Tính $(-0,5) \\cdot \\frac{4}{5}$.
> - Đổi $-0,5 = \\frac{-1}{2}$.
> - $(-0,5) \\cdot \\frac{4}{5} = \\frac{-1}{2} \\cdot \\frac{4}{5} = \\frac{-4}{10} = \\frac{-2}{5}$.

#### 4. Tính chất của phép toán
Phép cộng và nhân số hữu tỉ có đầy đủ tính chất tương tự phân số:
- **Giao hoán:** $x + y = y + x$ và $x \\cdot y = y \\cdot x$
- **Kết hợp:** $(x + y) + z = x + (y + z)$ và $(x \\cdot y) \\cdot z = x \\cdot (y \\cdot z)$
- **Cộng với 0, nhân với 1:** $x + 0 = x$ và $x \\cdot 1 = x$
- **Phân phối:** $x \\cdot (y + z) = x \\cdot y + x \\cdot z$
- **Số đối và số nghịch đảo:** Mỗi số $x$ đều có số đối $-x$. Mỗi số $x \\neq 0$ đều có số nghịch đảo $\\frac{1}{x}$.
`;

const ALL_QUESTIONS = [
  {
    question: "Kết quả của phép tính $-0,5 + \\frac{1}{3}$ là:",
    options: [
      "$\\frac{-1}{6}$",
      "$\\frac{-5}{6}$",
      "$\\frac{1}{6}$",
      "$\\frac{-2}{5}$"
    ],
    correct_index: 0,
    explanation: "Đổi $-0,5 = \\frac{-1}{2} = \\frac{-3}{6}$. Khi đó: $\\frac{-3}{6} + \\frac{2}{6} = \\frac{-1}{6}$.",
    difficulty: 1.0
  },
  {
    question: "Tính giá trị phép tính: $\\frac{2}{3} - (-1,2)$.",
    options: [
      "$\\frac{28}{15}$",
      "$\\frac{-8}{15}$",
      "$\\frac{-28}{15}$",
      "$\\frac{8}{15}$"
    ],
    correct_index: 0,
    explanation: "$\\frac{2}{3} - (-1,2) = \\frac{2}{3} + \\frac{6}{5} = \\frac{10}{15} + \\frac{18}{15} = \\frac{28}{15}$.",
    difficulty: 1.0
  },
  {
    question: "Kết quả rút gọn biểu thức: $B = (0,25 - \\frac{5}{6}) - (1,25 - \\frac{5}{6})$ bằng:",
    options: ["$-1$", "$1$", "$-1,5$", "$0$"],
    correct_index: 0,
    explanation: "Bỏ ngoặc: $B = 0,25 - \\frac{5}{6} - 1,25 + \\frac{5}{6} = (0,25 - 1,25) + (-\\frac{5}{6} + \\frac{5}{6}) = -1$.",
    difficulty: 1.5
  },
  {
    question: "Tính: $(-0,5) \\cdot \\frac{4}{5}$.",
    options: [
      "$\\frac{-2}{5}$",
      "$\\frac{-1}{5}$",
      "$\\frac{2}{5}$",
      "$\\frac{-5}{8}$"
    ],
    correct_index: 0,
    explanation: "$(-0,5) \\cdot \\frac{4}{5} = \\frac{-1}{2} \\cdot \\frac{4}{5} = \\frac{-4}{10} = \\frac{-2}{5}$.",
    difficulty: 1.0
  },
  {
    question: "Kết quả của phép chia $(-1,2) : \\frac{-8}{15}$ là:",
    options: [
      "$\\frac{9}{4}$",
      "$\\frac{-9}{4}$",
      "$\\frac{16}{25}$",
      "$\\frac{25}{16}$"
    ],
    correct_index: 0,
    explanation: "$(-1,2) : \\frac{-8}{15} = \\frac{-6}{5} \\cdot \\frac{15}{-8} = \\frac{-6 \\cdot 15}{5 \\cdot (-8)} = \\frac{9}{4}$.",
    difficulty: 1.5
  },
  {
    question: "Số nghịch đảo của số hữu tỉ $-\\frac{3}{4}$ là:",
    options: [
      "$-\\frac{4}{3}$",
      "$\\frac{4}{3}$",
      "$\\frac{3}{4}$",
      "$-0,75$"
    ],
    correct_index: 0,
    explanation: "Số nghịch đảo của số hữu tỉ $x$ là $\\frac{1}{x}$. Do đó số nghịch đảo của $-\\frac{3}{4}$ là $-\\frac{4}{3}$.",
    difficulty: 1.0
  },
  {
    question: "Tính giá trị biểu thức: $\\frac{-6}{18} + \\frac{18}{27}$.",
    options: [
      "$\\frac{1}{3}$",
      "$\\frac{-1}{3}$",
      "$\\frac{5}{9}$",
      "$\\frac{-5}{9}$"
    ],
    correct_index: 0,
    explanation: "Rút gọn phân số: $\\frac{-6}{18} = \\frac{-1}{3}$ và $\\frac{18}{27} = \\frac{2}{3}$. Khi đó: $\\frac{-1}{3} + \\frac{2}{3} = \\frac{1}{3}$.",
    difficulty: 1.0
  },
  {
    question: "Tính hợp lý biểu thức sau: $C = \\frac{3}{7} \\cdot 15 - \\frac{3}{7} \\cdot 8$.",
    options: [
      "$3$",
      "$\\frac{3}{7}$",
      "$\\frac{69}{7}$",
      "$7$"
    ],
    correct_index: 0,
    explanation: "Dùng tính chất phân phối: $C = \\frac{3}{7} \\cdot (15 - 8) = \\frac{3}{7} \\cdot 7 = 3$.",
    difficulty: 1.5
  },
  {
    question: "Tính kết quả: $2,5 - \\left( -\\frac{6}{9} \\right)$.",
    options: [
      "$\\frac{19}{6}$",
      "$\\frac{11}{6}$",
      "$\\frac{-11}{6}$",
      "$\\frac{-19}{6}$"
    ],
    correct_index: 0,
    explanation: "$2,5 - \\left( -\\frac{6}{9} \\right) = \\frac{5}{2} + \\frac{2}{3} = \\frac{15 + 4}{6} = \\frac{19}{6}$.",
    difficulty: 1.5
  },
  {
    question: "Số đối của số nghịch đảo của số $-0,25$ là:",
    options: [
      "$4$",
      "$-4$",
      "$\\frac{1}{4}$",
      "$-\\frac{1}{4}$"
    ],
    correct_index: 0,
    explanation: "Số nghịch đảo của $-0,25$ (tức $-\\frac{1}{4}$) là $-4$. Số đối của $-4$ là $4$.",
    difficulty: 2.0
  }
];

async function seed() {
  console.log("🚀 Seeding content and questions to question_bank for Bài 2...");

  // 1. Fetch Lesson Node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', 'bai-2-cong-tru-nhan-chia-so-huu-ti')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-2-cong-tru-nhan-chia-so-huu-ti' not found!");
    process.exit(1);
  }

  // Update metadata to include grammar_tutorial (Step 1)
  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: LESSON_2_MARKDOWN
  };

  const { error: updateError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

  if (updateError) throw updateError;
  console.log("✅ Step 1: Lesson Theory Markdown updated in curriculum_nodes.");

  // 2. Fetch Concept linked to Lesson 2
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-2-cong-tru-nhan-chia-so-huu-ti')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-2-cong-tru-nhan-chia-so-huu-ti' not found!");
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
