import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  // Find reflex collections for Toán 3
  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id, title, exam_type, subject_slug, grade')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('exam_type', 'reflex');

  if (colErr) {
    console.error('Error fetching collections:', colErr);
    return;
  }

  console.log('Reflex Collections:', cols);

  if (cols.length === 0) return;

  const colIds = cols.map(c => c.id);

  // Get exams for these collections
  const { data: exams, error: examErr } = await supabase
    .from('exams')
    .select('id, title, exam_number, collection_id')
    .in('collection_id', colIds)
    .order('exam_number', { ascending: true });

  if (examErr) {
    console.error('Error fetching exams:', examErr);
    return;
  }

  console.log(`Found ${exams.length} exams in reflex collections:`);
  exams.forEach(e => {
    console.log(`Exam ID: ${e.id}, Title: ${e.title}, Number: ${e.exam_number}, Collection ID: ${e.collection_id}`);
  });

  if (exams.length === 0) return;

  // Let's print the questions of the first few exams to see the type/difficulty of questions
  for (const exam of exams) {
    const { data: eqLinks } = await supabase
      .from('exam_questions')
      .select('question_bank_id')
      .eq('exam_id', exam.id);

    if (eqLinks && eqLinks.length > 0) {
      const qIds = eqLinks.map(l => l.question_bank_id);
      const { data: questions } = await supabase
        .from('question_bank')
        .select('id, metadata_json')
        .in('id', qIds);

      console.log(`\n--- Questions for ${exam.title} (${questions?.length} questions) ---`);
      questions?.forEach((q, i) => {
        console.log(` Q${i+1}: ${JSON.stringify(q.metadata_json.question)} -> ${JSON.stringify(q.metadata_json.options)} (Ans index: ${q.metadata_json.correct_index})`);
      });
    }
  }
}

run();
