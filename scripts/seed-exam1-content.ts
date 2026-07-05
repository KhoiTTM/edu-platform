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

const ALL_EXAM_QUESTIONS = [
  {
    question: "Số đối của số hữu tỉ $\\frac{-5}{8}$ là:",
    options: ["$\\frac{5}{8}$", "$-\\frac{5}{8}$", "$\\frac{8}{5}$", "$-\\frac{8}{5}$"],
    correct_index: 0,
    explanation: "Số đối của $x$ là $-x$. Do đó số đối của $\\frac{-5}{8}$ là $\\frac{5}{8}$.",
    difficulty: 1.0
  },
  {
    question: "Khẳng định nào sau đây là SAI?",
    options: [
      "Số $0$ là số hữu tỉ dương.",
      "Số nguyên cũng là số hữu tỉ.",
      "Số hữu tỉ âm luôn nhỏ hơn số hữu tỉ dương.",
      "Tập hợp số hữu tỉ kí hiệu là $\\mathbb{Q}$."
    ],
    correct_index: 0,
    explanation: "Số $0$ không là số hữu tỉ dương và cũng không là số hữu tỉ âm.",
    difficulty: 1.0
  },
  {
    question: "Tính kết quả của phép toán: $-0,5 + \\frac{1}{3}$",
    options: ["$-\\frac{1}{6}$", "$\\frac{1}{6}$", "$-\\frac{5}{6}$", "$-\\frac{2}{5}$"],
    correct_index: 0,
    explanation: "$-0,5 + \\frac{1}{3} = \\frac{-1}{2} + \\frac{1}{3} = \\frac{-3}{6} + \\frac{2}{6} = -\\frac{1}{6}$.",
    difficulty: 1.2
  },
  {
    question: "Số nghịch đảo của số hữu tỉ $-\\frac{3}{4}$ là:",
    options: ["$-\\frac{4}{3}$", "$\\frac{4}{3}$", "$\\frac{3}{4}$", "$-0,75$"],
    correct_index: 0,
    explanation: "Số nghịch đảo của $x$ là $\\frac{1}{x}$. Do đó số nghịch đảo của $-\\frac{3}{4}$ là $-\\frac{4}{3}$.",
    difficulty: 1.0
  },
  {
    question: "Tính giá trị của biểu thức: $\\frac{-6}{18} + \\frac{18}{27}$",
    options: ["$\\frac{1}{3}$", "$-\\frac{1}{3}$", "$\\frac{5}{9}$", "$-\\frac{5}{9}$"],
    correct_index: 0,
    explanation: "$\\frac{-6}{18} + \\frac{18}{27} = \\frac{-1}{3} + \\frac{2}{3} = \\frac{1}{3}$.",
    difficulty: 1.0
  },
  {
    question: "Rút gọn phép tính sau: $(-0,24) \\cdot \\frac{4}{3}$",
    options: ["$-\\frac{8}{25}$", "$-\\frac{6}{25}$", "$-\\frac{12}{25}$", "$\\frac{8}{25}$"],
    correct_index: 0,
    explanation: "$(-0,24) \\cdot \\frac{4}{3} = \\frac{-6}{25} \\cdot \\frac{4}{3} = -\\frac{8}{25}$.",
    difficulty: 1.5
  },
  {
    question: "Rút gọn biểu thức: $B = (0,25 - \\frac{5}{6}) - (1,25 - \\frac{5}{6})$",
    options: ["$-1$", "$1$", "$0$", "$-1,5$"],
    correct_index: 0,
    explanation: "$B = 0,25 - \\frac{5}{6} - 1,25 + \\frac{5}{6} = (0,25 - 1,25) + 0 = -1$.",
    difficulty: 1.5
  },
  {
    question: "Tính kết quả lũy thừa: $\\left( -\\frac{2}{3} \\right)^3$",
    options: ["$-\\frac{8}{27}$", "$\\frac{8}{27}$", "$-\\frac{6}{9}$", "$-\\frac{8}{9}$"],
    correct_index: 0,
    explanation: "$\\left( -\\frac{2}{3} \\right)^3 = \\frac{(-2)^3}{3^3} = -\\frac{8}{27}$.",
    difficulty: 1.0
  },
  {
    question: "Rút gọn biểu thức sau: $(0,125)^3 \\cdot 8^3$",
    options: ["$1$", "$8$", "$64$", "$0,125$"],
    correct_index: 0,
    explanation: "$(0,125)^3 \\cdot 8^3 = (0,125 \\cdot 8)^3 = 1^3 = 1$.",
    difficulty: 1.5
  },
  {
    question: "Tìm giá trị của biểu thức: $\\frac{4^5 \\cdot 9^4}{2^9 \\cdot 3^8}$",
    options: ["$2$", "$1$", "$4$", "$3$"],
    correct_index: 0,
    explanation: "$\\frac{(2^2)^5 \\cdot (3^2)^4}{2^9 \\cdot 3^8} = \\frac{2^{10} \\cdot 3^8}{2^9 \\cdot 3^8} = 2^{10-9} = 2$.",
    difficulty: 2.0
  },
  {
    question: "Tìm $x$, biết: $x - \\frac{1}{4} = -\\frac{5}{6}$",
    options: ["$-\\frac{7}{12}$", "$\\frac{7}{12}$", "$-\\frac{13}{12}$", "$\\frac{13}{12}$"],
    correct_index: 0,
    explanation: "$x = -\\frac{5}{6} + \\frac{1}{4} = -\\frac{10}{12} + \\frac{3}{12} = -\\frac{7}{12}$.",
    difficulty: 1.5
  },
  {
    question: "Tìm $x$, biết: $x + \\frac{4}{5} = \\frac{1}{2}$",
    options: ["$-\\frac{3}{10}$", "$\\frac{3}{10}$", "$-\\frac{13}{10}$", "$\\frac{13}{10}$"],
    correct_index: 0,
    explanation: "$x = \\frac{1}{2} - \\frac{4}{5} = \\frac{5}{10} - \\frac{8}{10} = -\\frac{3}{10}$.",
    difficulty: 1.5
  },
  {
    question: "Tìm $x$, biết: $x - \\left( -\\frac{5}{7} \\right) = \\frac{9}{14}$",
    options: ["$-\\frac{1}{14}$", "$\\frac{1}{14}$", "$-\\frac{19}{14}$", "$\\frac{19}{14}$"],
    correct_index: 0,
    explanation: "$x + \\frac{5}{7} = \\frac{9}{14} \\implies x = \\frac{9}{14} - \\frac{10}{14} = -\\frac{1}{14}$.",
    difficulty: 1.5
  },
  {
    question: "Tính hợp lý biểu thức sau: $A = \\left( \\frac{3}{8} - \\frac{5}{6} \\right) + \\frac{1}{3} + \\frac{5}{8}$",
    options: ["$0,5$", "$1$", "$1,5$", "$0$"],
    correct_index: 0,
    explanation: "$A = (\\frac{3}{8} + \\frac{5}{8}) + (-\\frac{5}{6} + \\frac{2}{6}) = 1 - \\frac{3}{6} = 0,5$.",
    difficulty: 1.5
  },
  {
    question: "Kết quả của phép tính: $2,5 - \\left( -\\frac{6}{9} \\right)$ là:",
    options: ["$\\frac{19}{6}$", "$\\frac{11}{6}$", "$-\\frac{19}{6}$", "$-\\frac{11}{6}$"],
    correct_index: 0,
    explanation: "$2,5 + \\frac{2}{3} = \\frac{5}{2} + \\frac{2}{3} = \\frac{15 + 4}{6} = \\frac{19}{6}$.",
    difficulty: 1.5
  }
];

async function seed() {
  console.log("🚀 Seeding content and questions for Kiểm tra cuối chương 1...");

  // 1. Fetch Exam Node
  const { data: examNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id, metadata')
    .eq('slug', 'kiem-tra-chuong-1')
    .single();

  if (!examNode) {
    console.error("❌ Exam node 'kiem-tra-chuong-1' not found!");
    process.exit(1);
  }

  // 2. Ensure Concept for the Exam exists
  const examConceptSlug = 'concept-kiem-tra-chuong-1';
  const { data: concept } = await supabase
    .from('concepts')
    .upsert({
      source_id: examNode.source_id,
      slug: examConceptSlug,
      title: 'Kiểm tra tổng hợp Chương 1',
      description: 'Đánh giá kiến thức chương 1 số hữu tỉ'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (!concept) {
    console.error("❌ Failed to create/fetch exam concept!");
    process.exit(1);
  }
  console.log(`✅ Exam Concept ID: ${concept.id}`);

  // Link concept to Exam Node in metadata
  const updatedMetadata = {
    ...(examNode.metadata as any || {}),
    concept_id: concept.id
  };

  const { error: updateNodeError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', examNode.id);

  if (updateNodeError) throw updateNodeError;
  console.log("✅ Updated curriculum_nodes metadata with concept_id.");

  // Also insert/upsert into lesson_concepts just in case
  await supabase
    .from('lesson_concepts')
    .upsert({
      lesson_id: examNode.id,
      concept_id: concept.id
    }, { onConflict: 'lesson_id,concept_id' });
  console.log("✅ Linked Exam node and Concept in lesson_concepts.");

  // Clear existing questions for this concept to avoid duplicates
  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);
  console.log("🗑️ Cleared existing questions.");

  // 3. Insert new questions
  console.log("Seeding Questions into question_bank...");
  for (let i = 0; i < ALL_EXAM_QUESTIONS.length; i++) {
    const q = ALL_EXAM_QUESTIONS[i];
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

  console.log("\n✅ Seeding for Chapter 1 Exam Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
