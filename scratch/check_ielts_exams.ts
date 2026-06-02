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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function check() {
  const { data: sources } = await supabase
    .from('content_sources')
    .select('id, name, slug');
  console.log("Sources:", sources);

  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug')
    .eq('subject_slug', 'mindset-ielts');
  console.log("Collections for mindset-ielts:", collections);

  const { data: exams } = await supabase
    .from('exams')
    .select('id, title')
    .ilike('title', '%ielts%')
    .limit(10);
  console.log("IELTS Exams:", exams);
}

check();
