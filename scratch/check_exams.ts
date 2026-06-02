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
  const { data: exams, error } = await supabase
    .from('exams')
    .select('id, title')
    .limit(5);

  if (error) {
    console.error("Error fetching exams:", error);
    return;
  }

  console.log("Sample exams:");
  exams?.forEach(e => {
    console.log(`id=${e.id} (type: ${typeof e.id}) | title=${e.title}`);
  });
}

check();
