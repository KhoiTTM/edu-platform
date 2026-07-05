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

async function seed() {
  console.log("🚀 Starting Tiếng Việt 3 Chủ điểm 1 seeding...");

  // 1. Fetch Subject Tiếng Việt
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

  // 2. Collection
  const collectionTitle = 'Tiếng Việt 3 - Tập 1';
  let { data: collection } = await supabase.from('assessment_collections').select('id').eq('title', collectionTitle).maybeSingle();
  if (!collection) {
      const { data: newCol } = await supabase.from('assessment_collections').insert({
        title: collectionTitle, subject_slug: 'tieng-viet', grade: 3, volume: 1, units: [1], status: 'published'
      }).select().single();
      collection = newCol;
  }

  // 3. Process Lessons
  const baseDir = 'docs/Assement Studio/Tieng_Viet_3_Tap1_JSON/Chu_diem_1';
  const files = fs.readdirSync(baseDir);

  for (const file of files) {
      const filePath = path.join(baseDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Fix: Inspect content to find the correct structure
      if (content.exercises) {
          // Case where exercises are directly under content
          processExercises(content.exercises, content, collection, subject);
      } else if (content.sections) {
          for (const section of content.sections) {
             if(section.exercises) processExercises(section.exercises, content, collection, subject);
          }
      } else {
        console.warn(`⚠️ No exercises found in ${file}`);
      }
      console.log(`✅ Processed ${file}`);
  }

  console.log("\n🎉 Tiếng Việt 3 Chủ điểm 1 seeding completed!");
}

async function processExercises(exercises: any[], content: any, collection: any, subject: any) {
    for (const exercise of exercises) {
        const lessonNum = Math.min(Math.max(Math.floor((content.page - 6) / 3) + 1, 1), 8);
        const lessonSlug = `bai_${lessonNum}`;

        const { data: lessonNode } = await supabase
        .from('curriculum_nodes')
        .select('id, path, title')
        .eq('path', `tieng_viet_3.chu_iem_1_nhung_trai_nghiem_thu_vi.${lessonSlug}`)
        .single();

        if (!lessonNode) continue;

        const conceptSlug = `concept-tv3-${lessonSlug}`;
        const { data: concept } = await supabase.from('concepts').upsert({
            slug: conceptSlug, title: `Kiến thức ${lessonNode.title}`
        }, { onConflict: 'slug' }).select().single();

        // Create Exams
        for (let i = 1; i <= 4; i++) {
        const title = `Đề luyện tập số ${i}: ${lessonNode.title}`;
        const { data: exSet } = await supabase.from('exercise_sets').upsert({
            title, type: 'practice', metadata: { node_id: lessonNode.id, concept_id: concept?.id }
        }, { onConflict: 'title' }).select().single();

        const { data: exam } = await supabase.from('exams').insert({
            collection_id: collection?.id, title, total_questions: 1, generation_mode: 'balanced'
        }).select().single();

        // Generate Question from exercise
        const qType = exercise.instruction.includes("Ghép") ? 'match_pair' : 'fill_in_blank';
        const { data: qBank } = await supabase.from('question_bank').insert({
            concept_id: concept?.id, type: qType, difficulty: 1.0,
            metadata_json: { ...exercise, type: qType }, 
            source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng-viet'
        }).select().single();

        if (qBank && exSet && exam) {
            await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qBank.id, sort_key: 0 });
            await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qBank.id, order_index: 0 });
        }
        }
    }
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
