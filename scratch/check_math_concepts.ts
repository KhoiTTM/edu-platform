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
  const conceptId = '994e0f21-d40c-46d4-89fc-fb4386d3e659';
  
  const { data: c1 } = await supabase
    .from('concepts')
    .select('*')
    .eq('id', conceptId);
  console.log('Concepts:', c1);

  const { data: c2 } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .eq('id', conceptId);
  console.log('Curriculum Concepts:', c2);
}

run();
