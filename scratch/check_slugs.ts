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
    .select('subject_slug')
    .limit(100);

  const slugs = Array.from(new Set((cols || []).map(c => c.subject_slug)));
  console.log('Distinct subject_slugs in assessment_collections:');
  console.log(slugs);
}

run();
