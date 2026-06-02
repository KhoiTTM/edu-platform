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

const CHAPTERS_DATA = [
  {
    title: "Chương 1: Số hữu tỉ",
    slug: "chuong-1-so-huu-ti",
    path_segment: "chuong_1",
    lessons: [
      { title: "Bài 1: Tập hợp các số hữu tỉ", slug: "bai-1-tap-hop-cac-so-huu-ti", sort_key: 1, page: 7 },
      { title: "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ", slug: "bai-2-cong-tru-nhan-chia-so-huu-ti", sort_key: 2, page: 12 },
      { title: "Bài 3: Phép tính lũy thừa với số mũ tự nhiên của một số hữu tỉ", slug: "bai-3-phep-tinh-luy-thua-so-mu-tu-nhien", sort_key: 3, page: 16 },
      { title: "Bài 4: Quy tắc chuyển vế", slug: "bai-4-quy-tac-chuyen-ve", sort_key: 4, page: 20 },
    ],
    exam: { title: "Kiểm tra cuối chương 1", slug: "kiem-tra-chuong-1" }
  },
  {
    title: "Chương 2: Số thực",
    slug: "chuong-2-so-thuc",
    path_segment: "chuong_2",
    lessons: [
      { title: "Bài 5: Làm quen với số thập phân vô hạn tuần hoàn", slug: "bai-5-so-thap-phan-vo-han-tuan-hoan", sort_key: 1, page: 27 },
      { title: "Bài 6: Số vô tỉ. Căn bậc hai số học", slug: "bai-6-so-vo-ti-can-bac-hai-so-hoc", sort_key: 2, page: 30 },
      { title: "Bài 7: Tập hợp các số thực", slug: "bai-7-tap-hop-cac-so-thuc", sort_key: 3, page: 33 }
    ],
    exam: { title: "Kiểm tra cuối chương 2", slug: "kiem-tra-chuong-2" }
  },
  {
    title: "Chương 3: Hình học trực quan. Các hình khối trong thực tiễn",
    slug: "chuong-3-hinh-hoc-truc-quan",
    path_segment: "chuong_3",
    lessons: [
      { title: "Bài 8: Hình lăng trụ đứng tam giác. Hình lăng trụ đứng tứ giác", slug: "bai-8-hinh-lang-tru-dung", sort_key: 1, page: 44 }
    ],
    exam: { title: "Kiểm tra cuối chương 3", slug: "kiem-tra-chuong-3" }
  },
  {
    title: "Chương 4: Tam giác bằng nhau",
    slug: "chuong-4-tam-giac-bang-nhau",
    path_segment: "chuong_4",
    lessons: [
      { title: "Bài 9: Tổng các góc trong một tam giác", slug: "bai-9-tong-cac-goc-trong-tam-giac", sort_key: 1, page: 56 },
      { title: "Bài 10: Tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác", slug: "bai-10-tam-giac-bang-nhau-truong-hop-1", sort_key: 2, page: 60 },
      { title: "Bài 11: Trường hợp bằng nhau thứ hai của tam giác", slug: "bai-11-truong-hop-bang-nhau-thu-hai", sort_key: 3, page: 68 },
      { title: "Bài 12: Trường hợp bằng nhau thứ ba của tam giác", slug: "bai-12-truong-hop-bang-nhau-thu-ba", sort_key: 4, page: 74 }
    ],
    exam: { title: "Kiểm tra cuối chương 4", slug: "kiem-tra-chuong-4" }
  },
  {
    title: "Chương 5: Thu thập và biểu diễn dữ liệu",
    slug: "chuong-5-thu-thap-bieu-dien-du-lieu",
    path_segment: "chuong_5",
    lessons: [
      { title: "Bài 13: Thu thập và phân loại dữ liệu", slug: "bai-13-thu-thap-phan-loai-du-lieu", sort_key: 1, page: 88 },
      { title: "Bài 14: Biểu đồ hình quạt tròn", slug: "bai-14-bieu-do-hinh-quat-tron", sort_key: 2, page: 93 },
      { title: "Bài 15: Biểu đồ đoạn thẳng", slug: "bai-15-bieu-do-doan-thang", sort_key: 3, page: 99 }
    ],
    exam: { title: "Kiểm tra cuối chương 5", slug: "kiem-tra-chuong-5" }
  }
];

async function seed() {
  console.log("🚀 Seeding Grade 7 Math Curriculum Skeleton...");

  // 1. Ensure Subject exists
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
  console.log("✅ Subject 'toan' ensured.");

  // 2. Ensure Content Source exists
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .upsert({ 
      subject_id: subject.id,
      slug: 'toan-7-ket-noi',
      name: 'Toán 7 - Kết nối tri thức',
      provider: 'Kết nối tri thức với cuộc sống',
      version: '2024'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (sourceError) throw sourceError;
  console.log("✅ Content Source 'toan-7-ket-noi' ensured.");

  // 3. Ensure Root Node
  const { data: rootNode, error: rootError } = await supabase
    .from('curriculum_nodes')
    .upsert({
      source_id: source.id,
      type: 'course',
      slug: 'lop-7',
      title: 'Toán lớp 7',
      path: 'toan_7',
      depth: 0
    }, { onConflict: 'source_id,slug' })
    .select()
    .single();

  if (rootError) throw rootError;
  console.log("✅ Root Course Node 'lop-7' ensured.");

  // Seed chapters, lessons, and exams
  for (let cIdx = 0; cIdx < CHAPTERS_DATA.length; cIdx++) {
    const ch = CHAPTERS_DATA[cIdx];
    console.log(`\nProcessing chapter: ${ch.title}`);

    // Create Unit Node
    const { data: unitNode, error: unitError } = await supabase
      .from('curriculum_nodes')
      .upsert({
        source_id: source.id,
        parent_id: rootNode.id,
        type: 'unit',
        slug: ch.slug,
        title: ch.title,
        path: `toan_7.${ch.path_segment}`,
        depth: 1,
        sort_key: cIdx + 1
      }, { onConflict: 'source_id,slug' })
      .select()
      .single();

    if (unitError) {
      console.error(`Error creating unit node: ${ch.title}`, unitError);
      continue;
    }
    console.log(` - Created Unit: ${unitNode.title}`);

    let lastLessonY = 0;
    for (const les of ch.lessons) {
      const lessonSlug = les.slug;
      const { data: lessonNode, error: lessonError } = await supabase
        .from('curriculum_nodes')
        .upsert({
          source_id: source.id,
          parent_id: unitNode.id,
          type: 'lesson',
          slug: lessonSlug,
          title: les.title,
          path: `toan_7.${ch.path_segment}.${lessonSlug.replace(/-/g, '_')}`,
          depth: 2,
          sort_key: les.sort_key,
          metadata: { page: les.page, skill_focus: 'grammar' }
        }, { onConflict: 'source_id,slug' })
        .select()
        .single();



      if (lessonError) {
        console.error(`Error creating lesson node: ${les.title}`, lessonError);
        continue;
      }
      console.log(`   - Created Lesson: ${lessonNode.title}`);

      const isOdd = les.sort_key % 2 === 1;
      const posX = isOdd ? 220 : 380;
      lastLessonY = 100 + (cIdx * 800) + (les.sort_key * 150);

      await supabase.from('learning_path_nodes').upsert({
        curriculum_node_id: lessonNode.id,
        node_type: 'lesson',
        position_x: posX,
        position_y: lastLessonY,
        visual_theme: 'star',
        reward_config: { xp: 100, energy: 1 }
      }, { onConflict: 'curriculum_node_id' });

      // Link to a mock concept for mapping consistency
      const conceptSlug = `concept-${lessonSlug}`;
      const { data: concept } = await supabase.from('concepts').upsert({
        source_id: source.id,
        slug: conceptSlug,
        title: `Kiến thức ${les.title}`,
        description: `Khái niệm và định lý liên quan đến ${les.title}`
      }, { onConflict: 'slug' }).select().single();

      if (concept) {
        await supabase.from('lesson_concepts').upsert({
          lesson_id: lessonNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });

        // Add dummy exercise set
        await supabase.from('exercise_sets').upsert({
          title: `Luyện tập: ${les.title}`,
          type: 'practice',
          metadata: { node_id: lessonNode.id }
        }, { onConflict: 'title,type' });
      }
    }

    // Create Chapter Exam
    const examSlug = ch.exam.slug;
    const { data: examNode, error: examError } = await supabase
      .from('curriculum_nodes')
      .upsert({
        source_id: source.id,
        parent_id: unitNode.id,
        type: 'exam',
        slug: examSlug,
        title: ch.exam.title,
        path: `toan_7.${ch.path_segment}.kiem_tra`,
        depth: 2,
        sort_key: 999
      }, { onConflict: 'source_id,slug' })
      .select()
      .single();

    if (examError) {
      console.error(`Error creating exam node for unit: ${ch.title}`, examError);
    } else {
      console.log(`   - Created Exam: ${examNode.title}`);
      
      // Position the Exam Node right after the last lesson
      await supabase.from('learning_path_nodes').upsert({
        curriculum_node_id: examNode.id,
        node_type: 'boss',
        position_x: 300,
        position_y: lastLessonY + 150,
        visual_theme: 'nebula',
        reward_config: { xp: 300, energy: 0 }
      }, { onConflict: 'curriculum_node_id' });

      // Link dummy exercise set for the exam
      await supabase.from('exercise_sets').upsert({
        title: ch.exam.title,
        type: 'exam',
        metadata: { node_id: examNode.id }
      }, { onConflict: 'title,type' });
    }
  }

  console.log("\n✅ Grade 7 Math Seeding Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
