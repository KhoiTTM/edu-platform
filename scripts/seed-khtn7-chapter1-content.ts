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
const supabase = createClient(supabaseUrl, supabaseKey);

const CHAPTER1_CONCEPTS = [
  {
    lessonSlug: 'bai-1-nguyen-tu',
    concepts: [
      {
        slug: 'khtn7-nguyen-tu-mo-hinh',
        title: 'Mô hình nguyên tử Rutherford-Bohr',
        description: 'Nguyên tử có kích thước vô cùng nhỏ. Theo Rutherford-Bohr, nguyên tử gồm hạt nhân mang điện tích dương ở tâm và các electron mang điện tích âm chuyển động xung quanh tạo thành lớp vỏ.'
      },
      {
        slug: 'khtn7-nguyen-tu-khoi-luong',
        title: 'Khối lượng nguyên tử',
        description: 'Khối lượng nguyên tử được đo bằng đơn vị amu (atomic mass unit). Khối lượng 1 proton ≈ 1 amu, 1 neutron ≈ 1 amu. Electron có khối lượng rất nhỏ không đáng kể.'
      }
    ]
  },
  {
    lessonSlug: 'bai-2-nguyen-to-hoa-hoc',
    concepts: [
      {
        slug: 'khtn7-nguyen-to-khai-niem',
        title: 'Khái niệm nguyên tố hoá học',
        description: 'Tập hợp các nguyên tử có cùng số proton trong hạt nhân gọi là cùng một nguyên tố hoá học. Các nguyên tử này có tính chất hoá học giống nhau.'
      },
      {
        slug: 'khtn7-nguyen-to-ki-hieu',
        title: 'Kí hiệu hoá học',
        description: 'Được biểu diễn bằng 1 hoặc 2 chữ cái (chữ đầu viết hoa, chữ sau viết thường). VD: Hydrogen (H), Helium (He), Carbon (C), Calcium (Ca).'
      }
    ]
  },
  {
    lessonSlug: 'bai-3-bang-tuan-hoan',
    concepts: [
      {
        slug: 'khtn7-bth-cau-truc',
        title: 'Cấu trúc bảng tuần hoàn',
        description: 'Bảng gồm các ô nguyên tố, chu kì (hàng ngang, sắp xếp theo Z tăng dần, cùng số lớp electron) và nhóm (cột dọc, cùng số e lớp ngoài cùng).'
      }
    ]
  }
];

async function seed() {
  console.log("🚀 Seeding Grade 7 KHTN Chapter 1 Concepts...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'khtn-7-ket-noi').single();
  if (!source) throw new Error("Source not found. Run curriculum seed first.");

  for (const lessonData of CHAPTER1_CONCEPTS) {
    const { data: lessonNode } = await supabase.from('curriculum_nodes')
      .select('id').eq('slug', lessonData.lessonSlug).single();
      
    if (!lessonNode) {
      console.warn(`⚠️ Lesson node not found for slug: ${lessonData.lessonSlug}`);
      continue;
    }

    for (const c of lessonData.concepts) {
      const { data: concept } = await supabase.from('concepts').upsert({
        source_id: source.id,
        slug: c.slug,
        title: c.title,
        description: c.description
      }, { onConflict: 'slug' }).select().single();

      if (concept) {
        await supabase.from('lesson_concepts').upsert({
          lesson_id: lessonNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });
        console.log(`✅ Seeded concept: ${c.title}`);
      }
    }
  }
  console.log("✅ Concept Seeding Complete!");
}

seed().catch(console.error);
