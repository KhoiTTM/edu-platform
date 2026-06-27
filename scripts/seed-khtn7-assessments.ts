import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

async function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env: any = {};
  envContent.split('\n').forEach((line: string) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  });
  return env;
}

const khtnExams = [
  { num: 1, title: 'Bài 1: Nguyên tử', unit: 1 },
  { num: 2, title: 'Bài 2: Nguyên tố hoá học', unit: 1 },
  { num: 3, title: 'Bài 3: Sơ lược về bảng tuần hoàn các nguyên tố hoá học', unit: 1 },
  { num: 4, title: 'Bài 4: Sơ lược về phân tử', unit: 2 },
  { num: 5, title: 'Bài 5: Đơn chất - Hợp chất', unit: 2 },
  { num: 6, title: 'Bài 6: Giới thiệu về liên kết hoá học', unit: 2 },
  { num: 7, title: 'Bài 7: Hoá trị và công thức hoá học', unit: 2 }
];

async function seed() {
  const env = await loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    realtime: { enabled: false }
  });

  console.log('🚀 Seeding KHTN 7 Luyện tập collections & exams...\n');

  for (const item of khtnExams) {
    const colTitle = `KHTN 7 - ${item.title}`;

    try {
      // Check if collection already exists
      const { data: existingCol } = await supabase
        .from('assessment_collections')
        .select('id')
        .eq('title', colTitle)
        .eq('subject_slug', 'khtn')
        .eq('grade', 7)
        .maybeSingle();

      let colId = existingCol?.id;

      if (!colId) {
        // Insert new collection
        const { data: col, error: colErr } = await supabase
          .from('assessment_collections')
          .insert({
            title: colTitle,
            subject_slug: 'khtn',
            grade: 7,
            curriculum: 'global_success',
            exam_type: 'lesson',
            status: 'published',
            units: [item.unit],
            sequence_number: item.num,
            volume: 1
          })
          .select('id')
          .single();

        if (colErr || !col) {
          console.error(`❌ Error inserting collection ${colTitle}:`, colErr?.message);
          continue;
        }
        colId = col.id;
        console.log(`✅ Inserted Collection: ${colTitle}`);
      } else {
        console.log(`✔️  Collection already exists: ${colTitle}`);
      }

      // Check if exam already exists
      const { data: existingExam } = await supabase
        .from('exams')
        .select('id')
        .eq('collection_id', colId)
        .eq('exam_number', 1)
        .maybeSingle();

      if (!existingExam) {
        // Insert new exam
        const { data: exam, error: examErr } = await supabase
          .from('exams')
          .insert({
            collection_id: colId,
            exam_number: 1,
            title: item.title,
            duration_minutes: 45,
            total_questions: 10,
            generation_mode: 'balanced'
          })
          .select('id')
          .single();

        if (examErr || !exam) {
          console.error(`❌ Error inserting exam ${item.title}:`, examErr?.message);
          continue;
        }
        console.log(`✅ Inserted Exam: ${item.title}`);
      } else {
        console.log(`✔️  Exam already exists: ${item.title}`);
      }
    } catch (err: any) {
      console.error(`❌ Error processing ${item.title}:`, err.message);
    }
  }

  console.log('\n✨ KHTN 7 seed completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
