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
    .select('id, title, grade, subject_slug, order_index')
    .eq('grade', 3)
    .eq('subject_slug', 'toan');

  console.log('Math Grade 3 collections:', cols);
  
  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, node_type, subject_id, parent_id')
    .ilike('title', '%Toán 3%');
    
  console.log('Curriculum Nodes (Toán 3):', nodes);
}
run();
