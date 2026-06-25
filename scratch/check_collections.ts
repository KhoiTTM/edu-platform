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
  const { data: cols, error } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade, status');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Collections summary:');
  const summaryMap: Record<string, number> = {};
  cols.forEach(c => {
    const key = `subject_slug: ${c.subject_slug}, grade: ${c.grade}, status: ${c.status}`;
    summaryMap[key] = (summaryMap[key] || 0) + 1;
  });
  console.log(summaryMap);
  
  console.log('\nEnglish 3 Collections:');
  const eng3 = cols.filter(c => c.subject_slug?.includes('eng') || c.subject_slug?.includes('anh'));
  console.log(eng3);
}

run();