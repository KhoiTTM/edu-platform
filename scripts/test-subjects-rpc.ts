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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: g3, error: err3 } = await supabase.rpc("get_subjects_by_grade", { p_grade: 3 });
  console.log("Grade 3 subjects from RPC:", g3, "Error:", err3);

  const { data: g7, error: err7 } = await supabase.rpc("get_subjects_by_grade", { p_grade: 7 });
  console.log("Grade 7 subjects from RPC:", g7, "Error:", err7);
}

check();
