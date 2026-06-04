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
  const { data: cols } = await supabase.from('assessment_collections').select('id, title, grade, subject_slug');
  const { data: exams } = await supabase.from('exams').select('id, title, collection_id');
  
  console.log(`Total exams: ${exams?.length}`);
  
  for (const col of (cols || [])) {
    const colExams = (exams || []).filter(e => e.collection_id === col.id);
    if (colExams.length > 0) {
      console.log(`Collection [${col.title}] (Grade ${col.grade}, Subject ${col.subject_slug}): ${colExams.length} exams`);
    }
  }
}
run();
