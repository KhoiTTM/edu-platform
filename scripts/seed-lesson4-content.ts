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

const LESSON_4_MARKDOWN = `### Bài 4: Quy tắc chuyển vế

#### 1. Đẳng thức và tính chất của đẳng thức
Khi nối hai biểu thức số bằng dấu "$=$" ta được một đẳng thức. Mỗi đẳng thức có hai vế: vế trái và vế phải.
- **Tính chất của đẳng thức:** Với ba số hữu tỉ $a, b, c$:
  - Nếu $a = b$ thì $b = a$.
  - Nếu $a = b$ thì $a + c = b + c$.
  - Nếu $a = b$ thì $a - c = b - c$.
  - Nếu $a = b$ thì $a \\cdot c = b \\cdot c$.

#### 2. Quy tắc chuyển vế
Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải **đổi dấu** số hạng đó: dấu cộng ($+$) đổi thành dấu trừ ($-$) và dấu trừ ($-$) đổi thành dấu cộng ($+$).
- **Công thức:**
  - Nếu $x + a = b$ thì $x = b - a$
  - Nếu $x - a = b$ thì $x = b + a$

> **Ví dụ:** Tìm $x$, biết $x - \\frac{1}{4} = -\\frac{5}{6}$.
> - Chuyển vế: $x = -\\frac{5}{6} + \\frac{1}{4}$
> - Quy đồng mẫu số chung là 12: $x = -\\frac{10}{12} + \\frac{3}{12} = -\\frac{7}{12}$.

#### 3. Thứ tự thực hiện các phép tính
Khi làm toán tìm $x$ hoặc tính giá trị biểu thức:
- **Biểu thức không có dấu ngoặc:** Lũy thừa $\\rightarrow$ Nhân và chia $\\rightarrow$ Cộng và trừ.
- **Biểu thức có dấu ngoặc:** Ngoặc tròn $() \\rightarrow$ Ngoặc vuông $[ ] \\rightarrow$ Ngoặc nhọn $\\{ \\}$.
`;

const ALL_QUESTIONS = [
  {
    question: "Phát biểu nào sau đây đúng về quy tắc chuyển vế trong một đẳng thức?",
    options: [
      "Khi chuyển một số hạng từ vế này sang vế kia, ta phải đổi dấu số hạng đó.",
      "Khi chuyển một số hạng từ vế này sang vế kia, ta giữ nguyên dấu số hạng đó.",
      "Khi chuyển một số hạng từ vế này sang vế kia, ta nhân vế kia với số hạng đó.",
      "Khi chuyển một số hạng từ vế này sang vế kia, ta phải đổi dấu tất cả các số hạng."
    ],
    correct_index: 0,
    explanation: "Quy tắc chuyển vế phát biểu rằng khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó.",
    difficulty: 1.0
  },
  {
    question: "Tìm $x$, biết: $x - 5 = 10$.",
    options: ["$15$", "$5$", "$-5$", "$-15$"],
    correct_index: 0,
    explanation: "$x - 5 = 10 \\implies x = 10 + 5 \\implies x = 15$.",
    difficulty: 1.0
  },
  {
    question: "Tìm $x$, biết: $x + 2,5 = 3,5$.",
    options: ["$1$", "$6$", "$-1$", "$1,5$"],
    correct_index: 0,
    explanation: "$x + 2,5 = 3,5 \\implies x = 3,5 - 2,5 \\implies x = 1$.",
    difficulty: 1.0
  },
  {
    question: "Tìm $x$, biết: $x - \\frac{1}{4} = -\\frac{5}{6}$.",
    options: [
      "$-\\frac{7}{12}$",
      "$\\frac{7}{12}$",
      "$-\\frac{13}{12}$",
      "$\\frac{13}{12}$"
    ],
    correct_index: 0,
    explanation: "$x - \\frac{1}{4} = -\\frac{5}{6} \\implies x = -\\frac{5}{6} + \\frac{1}{4} = -\\frac{10}{12} + \\frac{3}{12} = -\\frac{7}{12}$.",
    difficulty: 1.5
  },
  {
    question: "Tìm $x$, biết: $x + \\frac{4}{5} = \\frac{1}{2}$.",
    options: [
      "$-\\frac{3}{10}$",
      "$\\frac{3}{10}$",
      "$-\\frac{13}{10}$",
      "$\\frac{13}{10}$"
    ],
    correct_index: 0,
    explanation: "$x + \\frac{4}{5} = \\frac{1}{2} \\implies x = \\frac{1}{2} - \\frac{4}{5} = \\frac{5}{10} - \\frac{8}{10} = -\\frac{3}{10}$.",
    difficulty: 1.5
  },
  {
    question: "Tìm $x$, biết: $x - \\frac{2}{3} = -0,8$.",
    options: [
      "$-\\frac{2}{15}$",
      "$\\frac{2}{15}$",
      "$-\\frac{22}{15}$",
      "$\\frac{22}{15}$"
    ],
    correct_index: 0,
    explanation: "$x - \\frac{2}{3} = -0,8 \\implies x = -0,8 + \\frac{2}{3} = -\\frac{4}{5} + \\frac{2}{3} = -\\frac{12}{15} + \\frac{10}{15} = -\\frac{2}{15}$.",
    difficulty: 1.5
  },
  {
    question: "Tìm $x$, biết: $x - \\left( -\\frac{5}{7} \\right) = \\frac{9}{14}$.",
    options: [
      "$-\\frac{1}{14}$",
      "$\\frac{1}{14}$",
      "$\\frac{19}{14}$",
      "$-\\frac{19}{14}$"
    ],
    correct_index: 0,
    explanation: "$x + \\frac{5}{7} = \\frac{9}{14} \\implies x = \\frac{9}{14} - \\frac{5}{7} = \\frac{9}{14} - \\frac{10}{14} = -\\frac{1}{14}$.",
    difficulty: 1.5
  },
  {
    question: "Tính hợp lý biểu thức sau: $A = \\left( \\frac{3}{8} - \\frac{5}{6} \\right) + \\frac{1}{3} + \\frac{5}{8}$",
    options: ["$0,5$", "$1,5$", "$0$", "$1$"],
    correct_index: 0,
    explanation: "$A = \\left(\\frac{3}{8} + \\frac{5}{8}\\right) + \\left(-\\frac{5}{6} + \\frac{1}{3}\\right) = 1 + \\left(-\\frac{5}{6} + \\frac{2}{6}\\right) = 1 - \\frac{3}{6} = 1 - 0,5 = 0,5$.",
    difficulty: 1.5
  },
  {
    question: "Tính hợp lý biểu thức sau: $B = \\frac{1}{2} \\cdot \\frac{4}{7} + \\frac{1}{2} \\cdot \\frac{3}{7}$",
    options: ["$0,5$", "$0,25$", "$1$", "$2$"],
    correct_index: 0,
    explanation: "$B = \\frac{1}{2} \\cdot \\left(\\frac{4}{7} + \\frac{3}{7}\\right) = \\frac{1}{2} \\cdot 1 = 0,5$.",
    difficulty: 1.5
  },
  {
    question: "Đẳng thức $x + 2 = 5$ tương đương với đẳng thức nào dưới đây khi cộng thêm $-2$ vào cả hai vế?",
    options: [
      "$x = 3$",
      "$x + 4 = 7$",
      "$x = 7$",
      "$x - 2 = 3$"
    ],
    correct_index: 0,
    explanation: "Cộng $-2$ vào hai vế: $x + 2 + (-2) = 5 + (-2) \\implies x = 3$.",
    difficulty: 1.0
  }
];

async function seed() {
  console.log("🚀 Seeding content and questions for Bài 4...");

  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', 'bai-4-quy-tac-chuyen-ve')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-4-quy-tac-chuyen-ve' not found!");
    process.exit(1);
  }

  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: LESSON_4_MARKDOWN
  };

  const { error: updateError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

  if (updateError) throw updateError;
  console.log("✅ Step 1: Lesson Theory Markdown updated in curriculum_nodes.");

  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-4-quy-tac-chuyen-ve')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-4-quy-tac-chuyen-ve' not found!");
    process.exit(1);
  }
  console.log(`✅ Found Concept ID: ${concept.id}`);

  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);
  console.log("🗑️ Cleared existing questions.");

  console.log("Seeding Questions into question_bank...");
  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const { error: qError } = await supabase
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
      });

    if (qError) {
      console.error(`❌ Error inserting question ${i + 1}:`, qError.message);
    }
  }

  console.log("\n✅ Seeding for Lesson 4 Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
