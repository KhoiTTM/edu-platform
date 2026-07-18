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
  console.log("=== Finding Rio and Cherry profiles ===");
  const { data: profiles, error: pErr } = await supabase
    .from('profiles')
    .select('id, display_name');

  if (pErr) {
    console.error("Error fetching profiles:", pErr);
    return;
  }

  const targets = (profiles || []).filter(p => 
    p.display_name?.toLowerCase().includes('rio') || 
    p.display_name?.toLowerCase().includes('cherry')
  );

  if (targets.length === 0) {
    console.log("No student matches found.");
    return;
  }

  console.log("Target students:", targets);
  const studentIds = targets.map(t => t.id);

  console.log("=== Marking all daily tasks as completed ===");
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('daily_tasks')
    .update({ completed_at: now })
    .in('student_id', studentIds)
    .is('completed_at', null)
    .select('id, student_id, task_date');

  if (error) {
    console.error("Error updating tasks:", error);
    return;
  }

  console.log(`Successfully marked ${data?.length || 0} tasks as completed:`, data);
}

run();
