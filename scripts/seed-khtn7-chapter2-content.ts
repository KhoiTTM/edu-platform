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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Define meaningful semantic concepts for Chapter 2
const CONCEPTS = [
  { slug: 'khtn7-phan-tu', title: 'Phân tử', description: 'Khái niệm về phân tử' },
  { slug: 'khtn7-don-chat', title: 'Đơn chất', description: 'Đơn chất là chất tạo nên từ một nguyên tố' },
  { slug: 'khtn7-hop-chat', title: 'Hợp chất', description: 'Hợp chất là chất tạo nên từ hai nguyên tố trở lên' },
  { slug: 'khtn7-hoa-tri', title: 'Hoá trị', description: 'Khái niệm hoá trị và quy tắc hoá trị' }
];

async function seed() {
  console.log("🚀 Seeding Chapter 2 Semantic Concepts...");

  for (const concept of CONCEPTS) {
    const { data: conceptData, error } = await supabase
      .from('concepts')
      .upsert({
        slug: concept.slug,
        title: concept.title,
        description: concept.description
      }, { onConflict: 'slug' })
      .select().single();

    if (error) {
      console.error(`❌ Error seeding concept ${concept.slug}:`, error);
    } else {
      console.log(`✅ Seeded concept: ${concept.slug}`);
      
      // Link to lesson based on slug matching (e.g. khtn7-phan-tu maps to bai-4-so-luoc-phan-tu)
      let targetLessonSlug = '';
      if (concept.slug === 'khtn7-phan-tu') targetLessonSlug = 'bai-4-so-luoc-phan-tu';
      if (concept.slug === 'khtn7-don-chat' || concept.slug === 'khtn7-hop-chat') targetLessonSlug = 'bai-5-don-chat-hop-chat';
      if (concept.slug === 'khtn7-hoa-tri') targetLessonSlug = 'bai-7-hoa-tri-cong-thuc-hoa-hoc';

      if (targetLessonSlug) {
        const { data: lessonNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', targetLessonSlug).single();
        if (lessonNode) {
           await supabase.from('lesson_concepts').upsert({
             lesson_id: lessonNode.id,
             concept_id: conceptData.id
           }, { onConflict: 'lesson_id,concept_id' });
           console.log(`✅ Linked ${concept.slug} to ${targetLessonSlug}`);
        }
      }
    }
  }
  
  console.log("🎉 Seeding Chapter 2 Semantic Concepts Complete!");
}

seed().catch(console.error);
