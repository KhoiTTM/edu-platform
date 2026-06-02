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

const LESSON_3_MARKDOWN = `### Bài 3: Phép tính lũy thừa với số mũ tự nhiên của một số hữu tỉ

#### 1. Định nghĩa Lũy thừa
Lũy thừa bậc $n$ của một số hữu tỉ $x$, kí hiệu $x^n$, là tích của $n$ thừa số $x$ ($n$ là số tự nhiên lớn hơn 1).
- **Công thức:** $x^n = x \\cdot x \\cdot \\dots \\cdot x$ ($n$ thừa số $x$, $n \\in \\mathbb{N}, n > 1$).
  - $x$ gọi là cơ số.
  - $n$ gọi là số mũ.
- **Quy ước:** 
  - $x^1 = x$
  - $x^0 = 1$ (với $x \\neq 0$)
- **Công thức phân số:** Với $x = \\frac{a}{b}$ ta có:
  - $\\left( \\frac{a}{b} \\right)^n = \\frac{a^n}{b^n}$ ($a, b \\in \\mathbb{Z}, b \\neq 0$)

> **Ví dụ:** Tính $(-0,5)^2$ và $\\left( -\\frac{2}{3} \\right)^3$.
> - $(-0,5)^2 = (-0,5) \\cdot (-0,5) = 0,25$.
> - $\\left( -\\frac{2}{3} \\right)^3 = \\frac{(-2)^3}{3^3} = \\frac{-8}{27}$.

#### 2. Nhân và chia hai lũy thừa cùng cơ số
Khi thực hiện phép toán trên lũy thừa cùng cơ số:
- **Nhân hai lũy thừa cùng cơ số:** Giữ nguyên cơ số và cộng các số mũ.
  - $x^m \\cdot x^n = x^{m+n}$
- **Chia hai lũy thừa cùng cơ số (khác 0):** Giữ nguyên cơ số và lấy số mũ của lũy thừa bị chia trừ đi số mũ của lũy thừa chia.
  - $x^m : x^n = x^{m-n}$ (với $x \\neq 0, m \\ge n$)

> **Ví dụ:** Viết gọn biểu thức $(0,5)^2 \\cdot (0,5)^3$.
> - $(0,5)^2 \\cdot (0,5)^3 = (0,5)^{2+3} = (0,5)^5$.

#### 3. Lũy thừa của lũy thừa
Khi tính lũy thừa của một lũy thừa, ta giữ nguyên cơ số và nhân hai số mũ.
- **Công thức:** $(x^m)^n = x^{m \\cdot n}$

> **Ví dụ:** Viết $[(-3)^2]^5$ dưới dạng lũy thừa cơ số 3.
> - $[(-3)^2]^5 = (-3)^{2 \\cdot 5} = (-3)^{10} = 3^{10}$ (vì mũ chẵn nên $(-3)^{10} = 3^{10}$).
`;

const ALL_QUESTIONS = [
  {
    question: "Tính giá trị của lũy thừa $(-0,5)^2$:",
    options: ["$0,25$", "$-0,25$", "$0,5$", "$-1$"],
    correct_index: 0,
    explanation: "$(-0,5)^2 = (-0,5) \\cdot (-0,5) = 0,25$. Lũy thừa bậc chẵn của số âm luôn ra kết quả dương.",
    difficulty: 1.0
  },
  {
    question: "Kết quả của phép tính $\\left( -\\frac{2}{3} \\right)^3$ là:",
    options: [
      "$\\frac{-8}{27}$",
      "$\\frac{8}{27}$",
      "$\\frac{-6}{9}$",
      "$\\frac{-8}{9}$"
    ],
    correct_index: 0,
    explanation: "$\\left( -\\frac{2}{3} \\right)^3 = \\frac{(-2)^3}{3^3} = \\frac{-8}{27}$.",
    difficulty: 1.0
  },
  {
    question: "Tính giá trị của biểu thức $\\left( -\\frac{1}{2} \\right)^5$:",
    options: [
      "$\\frac{-1}{32}$",
      "$\\frac{1}{32}$",
      "$\\frac{-1}{10}$",
      "$\\frac{1}{10}$"
    ],
    correct_index: 0,
    explanation: "$\\left( -\\frac{1}{2} \\right)^5 = \\frac{(-1)^5}{2^5} = \\frac{-1}{32}$.",
    difficulty: 1.0
  },
  {
    question: "Rút gọn biểu thức $(0,5)^2 \\cdot (0,5)^3$ dưới dạng một lũy thừa:",
    options: ["$(0,5)^5$", "$(0,5)^6$", "$(0,5)^1$", "$(1,0)^5$"],
    correct_index: 0,
    explanation: "Áp dụng quy tắc nhân cùng cơ số: $(0,5)^2 \\cdot (0,5)^3 = (0,5)^{2+3} = (0,5)^5$.",
    difficulty: 1.0
  },
  {
    question: "Kết quả của phép chia $(0,1)^5 : (0,1)^3$ dưới dạng số thập phân là:",
    options: ["$0,01$", "$0,1$", "$0,001$", "$1$"],
    correct_index: 0,
    explanation: "$(0,1)^5 : (0,1)^3 = (0,1)^{5-3} = (0,1)^2 = 0,01$.",
    difficulty: 1.0
  },
  {
    question: "Viết số $[(-3)^2]^5$ dưới dạng lũy thừa của $3$:",
    options: ["$3^{10}$", "$3^7$", "$-3^{10}$", "$9^5$"],
    correct_index: 0,
    explanation: "Ta có: $[(-3)^2]^5 = (-3)^{2 \\cdot 5} = (-3)^{10}$. Vì số mũ 10 là chẵn nên $(-3)^{10} = 3^{10}$.",
    difficulty: 1.5
  },
  {
    question: "Rút gọn biểu thức sau: $(0,125)^3 \\cdot 8^3$.",
    options: ["$1$", "$8$", "$0,125$", "$64$"],
    correct_index: 0,
    explanation: "$(0,125)^3 \\cdot 8^3 = (0,125 \\cdot 8)^3 = 1^3 = 1$.",
    difficulty: 1.5
  },
  {
    question: "Tính nhanh giá trị của biểu thức: $\\frac{4^5 \\cdot 9^4}{2^9 \\cdot 3^8}$",
    options: ["$2$", "$1$", "$4$", "$3$"],
    correct_index: 0,
    explanation: "Đổi về cùng cơ số: $\\frac{(2^2)^5 \\cdot (3^2)^4}{2^9 \\cdot 3^8} = \\frac{2^{10} \\cdot 3^8}{2^9 \\cdot 3^8} = 2^{10-9} = 2^1 = 2$.",
    difficulty: 2.0
  },
  {
    question: "Quy ước nào sau đây là SAI đối với số hữu tỉ $x \\neq 0$?",
    options: [
      "$x^0 = 0$",
      "$x^0 = 1$",
      "$x^1 = x$",
      "$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$"
    ],
    correct_index: 0,
    explanation: "Theo quy ước, bất kì số hữu tỉ x khác 0 nào lũy thừa 0 đều bằng 1 ($x^0 = 1$), do đó khẳng định $x^0 = 0$ là sai.",
    difficulty: 1.0
  },
  {
    question: "Tìm số tự nhiên $n$ biết: $3^n = 81$.",
    options: ["$4$", "$3$", "$5$", "$2$"],
    correct_index: 0,
    explanation: "Ta có $81 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 3^4$. Vậy $n = 4$.",
    difficulty: 1.5
  }
];

async function seed() {
  console.log("🚀 Seeding content and questions for Bài 3...");

  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', 'bai-3-phep-tinh-luy-thua-so-mu-tu-nhien')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-3-phep-tinh-luy-thua-so-mu-tu-nhien' not found!");
    process.exit(1);
  }

  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: LESSON_3_MARKDOWN
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
    .eq('slug', 'concept-bai-3-phep-tinh-luy-thua-so-mu-tu-nhien')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-3-phep-tinh-luy-thua-so-mu-tu-nhien' not found!");
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

  console.log("\n✅ Seeding for Lesson 3 Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
