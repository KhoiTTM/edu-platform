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

// --- MOCK DATA FOR TIẾNG VIỆT 3 ---
// This mock data demonstrates the new Trạng Nguyên style questions.
const MOCK_LESSONS = [
  {
    title: "Bài 1: Ôn tập từ chỉ sự vật, hoạt động",
    questions: [
      {
        type: 'categorization',
        instruction: "Xếp các từ sau vào 2 nhóm: Từ chỉ sự vật và Từ chỉ hoạt động",
        groups: [
          { name: "Từ chỉ sự vật", items: ["bàn ghế", "sách vở", "con mèo"] },
          { name: "Từ chỉ hoạt động", items: ["chạy nhảy", "học bài", "ngủ"] }
        ],
        difficulty: 1.0
      },
      {
        type: 'inline_fill_blank',
        instruction: "Điền từ thích hợp vào chỗ trống:",
        text_segments: ["Trường học là ngôi nhà thứ ", " của em. Ở đó có thầy cô giáo như ba ", ""],
        correct_answers: ["hai", "mẹ"],
        word_pool: ["hai", "ba", "mẹ", "bà"],
        difficulty: 1.0
      },
      {
        type: 'match_pair',
        instruction: "Nối các từ ở cột A với từ ở cột B để tạo thành cặp từ trái nghĩa:",
        pairs: [
          { left: "cao", right: "thấp" },
          { left: "nhanh", right: "chậm" },
          { left: "vui", right: "buồn" }
        ],
        difficulty: 1.0
      }
    ]
  }
];

async function seed() {
  console.log("🚀 Starting Tiếng Việt 3 mock assessments seeding...");

  // 1. Fetch Subject Tiếng Việt
  // Wait, let's check if subject 'tieng_viet' exists, if not create it
  let { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'tieng-viet')
    .maybeSingle();

  if (!subject) {
    console.log("Creating Subject 'Tiếng Việt'...");
    const { data: newSub } = await supabase.from('universal_subjects').insert({
      slug: 'tieng-viet',
      name_vi: 'Tiếng Việt',
      icon: '📖'
    }).select().single();
    subject = newSub;
  }

  if (!subject) {
    console.error("❌ Could not ensure subject 'tieng-viet'");
    process.exit(1);
  }

  // 2. Ensure Course Node for Tiếng Việt 3
  let { data: rootNode } = await supabase.from('curriculum_nodes').select('id, path').eq('slug', 'lop-3').single();
  
  if (!rootNode) {
     const { data: source } = await supabase.from('content_sources').insert({
        subject_id: subject.id, slug: 'tieng-viet-3-kntt', name: 'Tiếng Việt 3 - Kết nối tri thức'
     }).select().single();

     const { data: newRoot } = await supabase.from('curriculum_nodes').insert({
        source_id: source?.id, type: 'course', slug: 'lop-3', title: 'Tiếng Việt lớp 3',
        path: 'tieng_viet_3', depth: 0, sort_key: 1, metadata: {}
     }).select().single();
     rootNode = newRoot;
  }

  if (!rootNode) {
    console.error("❌ Could not ensure root node.");
    process.exit(1);
  }

  // 3. Collection
  const collectionTitle = 'Tiếng Việt 3 - Tập 1';
  let { data: collection } = await supabase.from('assessment_collections').select('id').eq('title', collectionTitle).maybeSingle();
  if (!collection) {
      const { data: newCol } = await supabase.from('assessment_collections').insert({
        title: collectionTitle, subject_slug: 'tieng-viet', grade: 3, volume: 1, units: [1], status: 'published'
      }).select().single();
      collection = newCol;
  }

  // 4. Seed Lessons
  for (let i = 0; i < MOCK_LESSONS.length; i++) {
    const lesson = MOCK_LESSONS[i];
    console.log(`Processing: ${lesson.title}`);

    // Create Lesson Node
    const lessonSlug = `bai-${i+1}`;
    let { data: lessonNode } = await supabase.from('curriculum_nodes').upsert({
      source_id: rootNode.source_id, parent_id: rootNode.id, type: 'lesson',
      slug: lessonSlug, title: lesson.title, path: `${rootNode.path}.${lessonSlug}`, depth: 1, sort_key: i, metadata: {}
    }, { onConflict: 'path' }).select().single();

    // Ensure concept
    const conceptSlug = `concept-tv3-${lessonSlug}`;
    const { data: concept } = await supabase.from('concepts').upsert({
        slug: conceptSlug, title: `Kiến thức ${lesson.title}`
    }, { onConflict: 'slug' }).select().single();

    // Create Exercise Set and Exam
    const exTitle = `Đề luyện tập mẫu: ${lesson.title}`;
    const { data: exSet } = await supabase.from('exercise_sets').upsert({
        title: exTitle, type: 'practice', metadata: { node_id: lessonNode?.id, concept_id: concept?.id }
    }, { onConflict: 'title' }).select().single();

    const { data: exam } = await supabase.from('exams').insert({
        collection_id: collection?.id, title: exTitle, total_questions: lesson.questions.length, generation_mode: 'balanced'
    }).select().single();

    // Insert Questions
    for (let qIdx = 0; qIdx < lesson.questions.length; qIdx++) {
        const qData = lesson.questions[qIdx];
        const { data: qBank } = await supabase.from('question_bank').insert({
            concept_id: concept?.id, type: qData.type, difficulty: qData.difficulty,
            metadata_json: qData, source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng-viet'
        }).select().single();

        if (qBank && exSet && exam) {
            await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qBank.id, sort_key: qIdx });
            await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qBank.id, order_index: qIdx });
        }
    }
    console.log(`✅ Seeded mock questions for ${lesson.title}`);
  }

  console.log("\n🎉 Tiếng Việt 3 mock seeding completed!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
