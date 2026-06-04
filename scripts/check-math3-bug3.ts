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
  const { data: exams } = await supabase
    .from('exams')
    .select('id, title, collection_id, created_at')
    .ilike('title', '%Toán 3 - Tập 1 - Chủ đề%')
    .order('created_at', { ascending: false })
    .limit(10);
    
  console.log('Sample newly created exams:');
  console.log(exams);
  
  if (exams && exams.length > 0) {
    const colId = exams[0].collection_id;
    const { data: col } = await supabase
      .from('assessment_collections')
      .select('id, title, units')
      .eq('id', colId)
      .single();
    console.log('\nCollection for these exams:', col);
  }
}
run();
