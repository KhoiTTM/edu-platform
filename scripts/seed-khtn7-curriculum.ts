import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase keys");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CHAPTERS_DATA = [
  {
    title: "Chương I: Nguyên tử. Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
    slug: "chuong-1-nguyen-tu-bang-tuan-hoan",
    path_segment: "chuong_1",
    lessons: [
      { title: "Bài 1: Nguyên tử", slug: "bai-1-nguyen-tu", sort_key: 1 },
      { title: "Bài 2: Nguyên tố hoá học", slug: "bai-2-nguyen-to-hoa-hoc", sort_key: 2 },
      { title: "Bài 3: Sơ lược về bảng tuần hoàn các nguyên tố hoá học", slug: "bai-3-bang-tuan-hoan", sort_key: 3 }
    ],
    exam: { title: "Kiểm tra cuối chương I", slug: "kiem-tra-chuong-1" }
  },
  {
    title: "Chương II: Phân tử. Liên kết hoá học",
    slug: "chuong-2-phan-tu-lien-ket-hoa-hoc",
    path_segment: "chuong_2",
    lessons: [
      { title: "Bài 4: Sơ lược về phân tử", slug: "bai-4-so-luoc-phan-tu", sort_key: 1 },
      { title: "Bài 5: Đơn chất - Hợp chất", slug: "bai-5-don-chat-hop-chat", sort_key: 2 },
      { title: "Bài 6: Giới thiệu về liên kết hoá học", slug: "bai-6-lien-ket-hoa-hoc", sort_key: 3 },
      { title: "Bài 7: Hoá trị và công thức hoá học", slug: "bai-7-hoa-tri-cong-thuc-hoa-hoc", sort_key: 4 }
    ],
    exam: { title: "Kiểm tra cuối chương II", slug: "kiem-tra-chuong-2" }
  }
  // Only seeding Ch 1 and 2 for now to establish architecture
];

async function seed() {
  console.log("🚀 Seeding Grade 7 KHTN Curriculum Skeleton...");

  const { data: subject, error: subjectError } = await supabase
    .from('universal_subjects')
    .upsert({ slug: 'khtn', name_vi: 'Khoa học tự nhiên', name_en: 'Natural Science', icon: '🧬' }, { onConflict: 'slug' })
    .select().single();
  if (subjectError) throw subjectError;

  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .upsert({ subject_id: subject.id, slug: 'khtn-7-ket-noi', name: 'KHTN 7 - Kết nối tri thức', provider: 'Kết nối tri thức', version: '2024' }, { onConflict: 'slug' })
    .select().single();
  if (sourceError) throw sourceError;

  const { data: rootNode, error: rootError } = await supabase
    .from('curriculum_nodes')
    .upsert({ source_id: source.id, type: 'course', slug: 'lop-7', title: 'KHTN lớp 7', path: 'khtn_7', depth: 0 }, { onConflict: 'source_id,slug' })
    .select().single();
  if (rootError) throw rootError;

  for (let cIdx = 0; cIdx < CHAPTERS_DATA.length; cIdx++) {
    const ch = CHAPTERS_DATA[cIdx];
    const { data: unitNode } = await supabase
      .from('curriculum_nodes')
      .upsert({ source_id: source.id, parent_id: rootNode.id, type: 'unit', slug: ch.slug, title: ch.title, path: `khtn_7.${ch.path_segment}`, depth: 1, sort_key: cIdx + 1 }, { onConflict: 'source_id,slug' })
      .select().single();

    if (!unitNode) continue;
    let lastLessonY = 0;
    
    for (const les of ch.lessons) {
      const { data: lessonNode } = await supabase
        .from('curriculum_nodes')
        .upsert({ source_id: source.id, parent_id: unitNode.id, type: 'lesson', slug: les.slug, title: les.title, path: `khtn_7.${ch.path_segment}.${les.slug.replace(/-/g, '_')}`, depth: 2, sort_key: les.sort_key }, { onConflict: 'source_id,slug' })
        .select().single();

      if (lessonNode) {
        lastLessonY = 100 + (cIdx * 800) + (les.sort_key * 150);
        await supabase.from('learning_path_nodes').upsert({ curriculum_node_id: lessonNode.id, node_type: 'lesson', position_x: (les.sort_key % 2 === 1) ? 220 : 380, position_y: lastLessonY, visual_theme: 'star', reward_config: { xp: 100, energy: 1 } }, { onConflict: 'curriculum_node_id' });
      }
    }
  }
  console.log("✅ Grade 7 KHTN Seeding Complete!");
}

seed().catch(console.error);
