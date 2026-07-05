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

async function run() {
  const { data: cols } = await supabase.from('assessment_collections').select('id').eq('subject_slug', 'toan').eq('grade', 7);
  const colIds = cols.map(c => c.id);
  const { data: exams, count: examCount } = await supabase.from('exams').select('id', { count: 'exact' }).in('collection_id', colIds);
  
  const examIds = exams.map(e => e.id);
  
  // Need to fetch questions in batches because of limits, or just do a raw count
  let totalQuestions = 0;
  for (let i = 0; i < examIds.length; i += 100) {
    const batch = examIds.slice(i, i + 100);
    const { count } = await supabase.from('exam_questions').select('id', { count: 'exact', head: true }).in('exam_id', batch);
    totalQuestions += count;
  }
  
  console.log(`Total Math 7 collections: ${cols.length}`);
  console.log(`Total Math 7 exams: ${examCount}`);
  console.log(`Total Math 7 questions in exams: ${totalQuestions}`);
}
run();
