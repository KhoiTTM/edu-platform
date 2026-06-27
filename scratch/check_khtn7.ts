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
  console.log('Querying KHTN 7 collections in assessment_collections...');
  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id, title, exam_type, status')
    .eq('subject_slug', 'khtn')
    .eq('grade', 7);

  if (colErr) {
    console.error('Error fetching collections:', colErr);
    return;
  }

  console.log('KHTN 7 Collections:', cols);

  if (cols.length > 0) {
    const colIds = cols.map(c => c.id);
    const { data: exams, error: examErr } = await supabase
      .from('exams')
      .select('id, title, collection_id, total_questions')
      .in('collection_id', colIds);

    if (examErr) {
      console.error('Error fetching exams:', examErr);
      return;
    }

    console.log('KHTN 7 Exams:', exams);
  }
}

run();
