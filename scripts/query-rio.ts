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

async function run() {
  console.log("=== Finding Rio student profile ===");
  const { data: profiles, error: pErr } = await supabase
    .from('profiles')
    .select('id, display_name, email, grade')
    .or("display_name.ilike.%rio%,email.ilike.%rio%");

  if (pErr || !profiles || profiles.length === 0) {
    console.log("No student 'Rio' found. All students:");
    const { data: allStuds } = await supabase.from('profiles').select('id, display_name, email, role');
    console.log(allStuds);
    return;
  }

  const rio = profiles[0];
  console.log(`Found Rio: id=${rio.id}, name=${rio.display_name}, grade=${rio.grade}`);

  const todayStr = new Date().toISOString().split('T')[0];
  console.log(`=== Querying learning sessions for today (${todayStr}) for KHTN ===`);

  const { data: sessions, error: sErr } = await supabase
    .from('learning_sessions')
    .select('*')
    .eq('user_id', rio.id)
    .eq('subject_slug', 'khtn')
    .gte('started_at', `${todayStr}T00:00:00.000Z`)
    .lte('started_at', `${todayStr}T23:59:59.999Z`);

  if (sErr) {
    console.error("Error fetching sessions:", sErr);
    return;
  }

  console.log(`Sessions count: ${sessions?.length || 0}`);
  console.log(JSON.stringify(sessions, null, 2));
}

run();
