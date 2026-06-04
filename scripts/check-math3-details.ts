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
  const { data: cols, error } = await supabase
    .from('assessment_collections')
    .select('id, title, units, subject_slug, grade');
    
  if (error) console.error(error);
  
  const toan3 = cols?.filter(c => c.grade === 3 && c.subject_slug === 'toan');
  console.log('Toán 3 collections:', toan3);
  
  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, subject_id');
    
  const toan3Nodes = nodes?.filter(n => n.title.includes('Toán 3') || n.title.includes('toán 3'));
  console.log('Math 3 Curriculum Nodes:', toan3Nodes);
}
run();
