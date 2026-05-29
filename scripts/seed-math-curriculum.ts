import { createClient } from '@supabase/supabase-js';

// Usage: npx tsx scripts/seed-math-curriculum.ts
// Requires SUPABASE_SERVICE_ROLE_KEY to bypass RLS

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🚀 Seeding Math Curriculum (Pilot)...");

  // 1. Subject: Toan
  const { data: subject, error: subjectError } = await supabase
    .from('universal_subjects')
    .upsert({ 
      slug: 'toan', 
      name_vi: 'Toán học', 
      name_en: 'Mathematics',
      icon: '🔢'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (subjectError) throw subjectError;
  console.log("✅ Subject Math ensured.");

  // 2. Content Source: Canh Dieu 3
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .upsert({ 
      subject_id: subject.id,
      slug: 'toan-3-canh-dieu',
      name: 'Toán 3 - Cánh Diều',
      provider: 'Cánh Diều',
      version: '2024'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (sourceError) throw sourceError;
  console.log("✅ Content Source ensured.");

  // 3. Concepts
  const { data: concept, error: conceptError } = await supabase
    .from('concepts')
    .upsert({
      source_id: source.id,
      slug: 'phep-cong-co-nho',
      title: 'Phép cộng có nhớ trong phạm vi 1000',
      description: 'Học cách thực hiện phép cộng các số có 3 chữ số khi tổng hàng đơn vị hoặc hàng chục lớn hơn 10.'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (conceptError) throw conceptError;
  console.log("✅ Concept ensured.");

  // 4. Curriculum Tree (Nodes)
  // We use LTree paths. Note: path segments must be alphanumeric + underscore
  
  // Root Node for the book
  const { data: rootNode } = await supabase.from('curriculum_nodes').upsert({
    source_id: source.id,
    type: 'course',
    slug: 'lop-3',
    title: 'Toán lớp 3',
    path: 'toan_3',
    depth: 0
  }, { onConflict: 'source_id,slug' }).select().single();

  // Unit Node
  const { data: unitNode } = await supabase.from('curriculum_nodes').upsert({
    source_id: source.id,
    parent_id: rootNode.id,
    type: 'unit',
    slug: 'phep-cong-pham-vi-1000',
    title: 'Chương 1: Phép cộng và Phép trừ',
    path: 'toan_3.chuong_1',
    depth: 1,
    sort_key: 1
  }, { onConflict: 'source_id,slug' }).select().single();

  // Lesson Node
  const { data: lessonNode } = await supabase.from('curriculum_nodes').upsert({
    source_id: source.id,
    parent_id: unitNode.id,
    type: 'lesson',
    slug: 'phep-cong-co-nho-bai-1',
    title: 'Bài 1: Phép cộng có nhớ (Tiết 1)',
    path: 'toan_3.chuong_1.bai_1',
    depth: 2,
    sort_key: 1,
    metadata: {
        youtube_id: 'rkOatFNUGt4' // Reuse some math video
    }
  }, { onConflict: 'source_id,slug' }).select().single();

  console.log("✅ Curriculum Nodes ensured.");

  // 5. Link Lesson to Concept
  await supabase.from('lesson_concepts').upsert({
    lesson_id: lessonNode.id, // In this new engine, we link nodes to concepts
    concept_id: concept.id
  }, { onConflict: 'lesson_id,concept_id' });

  // 5.1. Visual Learning Path Nodes (Phase 7)
  console.log("Seeding Learning Path Nodes...");
  await supabase.from('learning_path_nodes').upsert([
    {
      curriculum_node_id: rootNode.id,
      node_type: 'course',
      position_x: 0,
      position_y: 0,
      visual_theme: 'cosmos'
    },
    {
      curriculum_node_id: unitNode.id,
      node_type: 'chapter',
      position_x: 50,
      position_y: 100,
      visual_theme: 'nebula'
    },
    {
      curriculum_node_id: lessonNode.id,
      node_type: 'lesson',
      position_x: 100,
      position_y: 200,
      visual_theme: 'star',
      reward_config: { xp: 100, energy: 1 }
    }
  ], { onConflict: 'curriculum_node_id' });

  // 5.2. Learning Experiences (Phase 7)
  await supabase.from('learning_experiences').insert([
    {
      node_id: lessonNode.id,
      experience_type: 'lesson_mode',
      reward_config: { xp_base: 50 }
    }
  ]);

  // 6. Exercise Set & Questions
  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: 'Luyện tập Phép cộng có nhớ',
    type: 'practice',
    metadata: { node_id: lessonNode.id }
  }).select().single();

  // For Pilot, we'll store questions in a new table or reuse quiz_questions. 
  // Let's create a few in 'quiz_questions' but with a special marker if needed.
  // Actually, Phase 1 had exercise_questions table.
  
  const sampleQuestions = [
    {
      question: "Tính: 245 + 138 = ?",
      options: ["383", "373", "393", "483"],
      correct_index: 0,
      explanation: "5 + 8 = 13, viết 3 nhớ 1. 4 + 3 + 1 (nhớ) = 8. 2 + 1 = 3. Kết quả là 383.",
      order_index: 1
    },
    {
      question: "Một cửa hàng buổi sáng bán được 156 kg gạo, buổi chiều bán được 127 kg gạo. Hỏi cả hai buổi bán được bao nhiêu kg gạo?",
      options: ["273 kg", "283 kg", "285 kg", "293 kg"],
      correct_index: 1,
      explanation: "Thực hiện phép tính: 156 + 127 = 283 (kg).",
      order_index: 2
    }
  ];

  // For simplicity in this script, we'll insert into quiz_questions and link them.
  // We need a dummy quiz_id to satisfy existing constraints if any
  const { data: dummyLesson } = await supabase.from('lessons').upsert({
    id: '00000000-0000-0000-0000-000000000000',
    grade: 3,
    title: 'Dummy Math Lesson',
    subject_slug: 'toan',
    lesson_index: 0
  }).select().single();

  const { data: dummyQuiz, error: quizErr } = await supabase.from('quizzes').upsert({
    id: '00000000-0000-0000-0000-000000000000',
    title: 'Math Pilot Quiz',
    lesson_id: dummyLesson?.id || '00000000-0000-0000-0000-000000000000'
  }).select().single();

  if (quizErr) console.error("Quiz Error:", quizErr);

  for (const q of sampleQuestions) {
    const { data: newQ } = await supabase.from('quiz_questions').insert({
      ...q,
      quiz_id: dummyQuiz.id
    }).select().single();

    await supabase.from('exercise_questions').insert({
      set_id: exSet.id,
      question_id: newQ.id,
      sort_key: q.order_index
    });
  }

  console.log("✅ Math Pilot Seeding Complete!");
  console.log(`🔗 Preview URL: /learn/toan/phep-cong-co-nho-bai-1`);
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
