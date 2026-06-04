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
  const { data: cols } = await supabase
    .from('assessment_collections')
    .select('id, title, units')
    .eq('grade', 3)
    .eq('subject_slug', 'toan')
    .contains('units', [1]);
    
  const { data: exams } = await supabase
    .from('exams')
    .select('id, title, collection_id')
    .in('collection_id', cols?.map(c => c.id) || []);
    
  const collMap: Record<string, number> = {};
  exams?.forEach(e => {
    collMap[e.collection_id] = (collMap[e.collection_id] || 0) + 1;
  });
  
  console.log('Exams per collection in Unit 1:');
  for (const [colId, count] of Object.entries(collMap)) {
    const c = cols?.find(c => c.id === colId);
    console.log(`Collection: ${c?.title} (ID: ${colId}) -> ${count} exams`);
  }
}
run();
