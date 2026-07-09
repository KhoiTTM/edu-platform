import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envConfig = fs.readFileSync('.env.local', 'utf-8').split('\n').filter(l => l.includes('=')).reduce((acc: any, line) => {
  const [key, ...val] = line.split('=');
  acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
  return acc;
}, {});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function survey() {
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title, units, exams(id, title, total_questions)')
    .eq('subject_slug', 'tieng-anh-7')
    .order('units');

  console.log('Unit | Exam ID | Total Questions | Collection Title');
  console.log('-----|---------|------------------|------------------');
  let grandTotal = 0;
  for (const c of collections || []) {
    const exam = (c.exams as any[])[0];
    console.log(`${(c.units as number[])?.[0] ?? '?'} | ${exam?.id} | ${exam?.total_questions} | ${c.title}`);
    grandTotal += exam?.total_questions || 0;
  }
  console.log(`\nTotal questions across all units: ${grandTotal}`);
  console.log(`Total collections: ${collections?.length}`);
}

survey().catch(console.error);
