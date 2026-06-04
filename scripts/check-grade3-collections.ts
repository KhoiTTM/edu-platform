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
    .select('id, title, grade, subject_slug, units')
    .eq('grade', 3);
    
  if (error) console.error(error);
  
  console.log('Grade 3 Collections:');
  const grouped = cols?.reduce((acc: any, col: any) => {
    if (!acc[col.subject_slug]) acc[col.subject_slug] = [];
    acc[col.subject_slug].push({ title: col.title, units: col.units });
    return acc;
  }, {});
  
  console.log(JSON.stringify(grouped, null, 2));
}
run();
