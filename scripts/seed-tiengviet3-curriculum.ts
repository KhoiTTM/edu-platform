import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

const TOC = [
  {
    title: 'Chủ điểm 1: Những trải nghiệm thú vị',
    lessons: [
      'Bài 1. Ngày gặp lại', 'Bài 2. Về thăm quê', 'Bài 3. Cánh rừng trong nắng', 'Bài 4. Lần đầu ra biển',
      'Bài 5. Nhật kí tập bơi', 'Bài 6. Tập nấu ăn', 'Bài 7. Mùa hè lấp lánh', 'Bài 8. Tạm biệt mùa hè'
    ]
  },
  {
    title: 'Chủ điểm 2: Cổng trường rộng mở',
    lessons: [
      'Bài 9. Đi học vui sao', 'Bài 10. Con đường đến trường', 'Bài 11. Lời giải toán đặc biệt', 'Bài 12. Bài tập làm văn',
      'Bài 13. Bàn tay cô giáo', 'Bài 14. Cuộc họp của chữ viết', 'Bài 15. Thư viện', 'Bài 16. Ngày em vào Đội'
    ]
  },
  {
    title: 'Chủ điểm 3: Mái nhà yêu thương',
    lessons: [
      'Bài 17. Ngưỡng cửa', 'Bài 18. Món quà đặc biệt', 'Bài 19. Khi cả nhà bé tí', 'Bài 20. Trò chuyện cùng mẹ',
      'Bài 21. Tia nắng bé nhỏ', 'Bài 22. Để cháu nắm tay ông', 'Bài 23. Tôi yêu em tôi', 'Bài 24. Bạn nhỏ trong nhà'
    ]
  },
  {
    title: 'Chủ điểm 4: Cộng đồng gắn bó',
    lessons: [
      'Bài 25. Những bậc đá chạm mây', 'Bài 26. Đi tìm mặt trời', 'Bài 27. Những chiếc áo ấm', 'Bài 28. Con đường của bé'
    ]
  }
];

function generateSlug(text: string) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

async function run() {
  console.log('Seeding Tiếng Việt 3 Curriculum Nodes...');

  // 1. Ensure Subject exists
  let { data: subject } = await supabase
    .from('universal_subjects')
    .upsert({ slug: 'tieng_viet', name_vi: 'Tiếng Việt', icon: '📖' }, { onConflict: 'slug' })
    .select().single();

  // 2. Ensure Content Source exists
  const { data: source } = await supabase
    .from('content_sources')
    .upsert({ 
        subject_id: subject!.id, 
        slug: 'tieng-viet-3-kntt', 
        name: 'Tiếng Việt 3 - KNTT' 
    }, { onConflict: 'slug' })
    .select().single();

  // 3. Ensure Root Course Node exists
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .upsert({
        source_id: source!.id,
        type: 'course',
        slug: 'lop-3',
        title: 'Tiếng Việt lớp 3',
        path: 'tieng_viet_3',
        depth: 0
    }, { onConflict: 'source_id,slug' })
    .select().single();

  // 4. Iterate through TOC and seed Units/Lessons
  let globalLessonIndex = 1;

  for (let chapterIndex = 0; chapterIndex < TOC.length; chapterIndex++) {
    const chapter = TOC[chapterIndex];
    const unitSlug = generateSlug(chapter.title);
    
    const { data: unitNode, error: errUnit } = await supabase
      .from('curriculum_nodes')
      .upsert({
          source_id: source!.id,
          parent_id: rootNode!.id,
          type: 'unit',
          slug: unitSlug,
          title: chapter.title,
          path: `tieng_viet_3.${unitSlug.replace(/-/g, '_')}`,
          depth: 1,
          sort_key: chapterIndex + 1
      }, { onConflict: 'source_id,slug' })
      .select().single();

    if (errUnit) throw errUnit;
    console.log(`Created Unit: ${chapter.title}`);

    for (let lessonIndex = 0; lessonIndex < chapter.lessons.length; lessonIndex++) {
      const lessonTitle = chapter.lessons[lessonIndex];
      const lessonSlug = `bai-${globalLessonIndex}`;
      
      const { error: errLesson } = await supabase
        .from('curriculum_nodes')
        .upsert({
            source_id: source!.id,
            parent_id: unitNode!.id,
            type: 'lesson',
            slug: lessonSlug,
            title: lessonTitle,
            path: `tieng_viet_3.${unitSlug.replace(/-/g, '_')}.${lessonSlug.replace(/-/g, '_')}`,
            depth: 2,
            sort_key: globalLessonIndex
        }, { onConflict: 'source_id,slug' });

      if (errLesson) throw errLesson;
      console.log(`  Created Lesson: ${lessonTitle}`);
      globalLessonIndex++;
    }
  }

  console.log('Successfully seeded Tiếng Việt 3 Curriculum Map!');
}

run().catch(console.error);
