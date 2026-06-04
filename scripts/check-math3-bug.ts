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
    .select('id, title, units, unit_id')
    .eq('grade', 3)
    .eq('subject_slug', 'toan');
    
  console.log('Sample Math 3 collections unit_id values:');
  console.log(cols?.slice(0, 10).map(c => ({ title: c.title, unit_id: c.unit_id })));
}
run();
