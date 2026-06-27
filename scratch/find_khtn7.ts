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
  const { data: cols } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade, status, exam_type');

  console.log('All collections with KHTN or Grade 7:');
  const filtered = cols?.filter(c => 
    c.grade === 7 || 
    c.subject_slug?.includes('khtn') || 
    c.title?.toLowerCase().includes('khtn') || 
    c.title?.toLowerCase().includes('khoa học')
  );
  console.log(filtered);
}

run();
