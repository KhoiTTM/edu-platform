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
  console.log("=== Finding Cherry student profile ===");
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%cherry%,email.ilike.%cherry%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Cherry' found.");
    return;
  }
  const cherry = profiles[0];

  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; // Parent KhoiDu

  // Lesson Node ID for Tiếng Việt Bài 2: e32c6a0c-b7b1-46f3-a5f1-acd5abc77894 ("Bài 2. Về thăm quê")
  const lessonNodeId = 'e32c6a0c-b7b1-46f3-a5f1-acd5abc77894';

  console.log("=== Creating parent task for Cherry ===");
  const { data: parentTask, error: pErr } = await supabase
    .from('parent_tasks')
    .insert({
      parent_id: parentId,
      student_id: cherry.id,
      subject_slug: 'tieng_viet',
      unit_numbers: [1],
      frequency: 'daily',
      active_days: [1, 2, 3, 4, 5, 6, 7],
      lesson_node_id: lessonNodeId,
      is_active: true
    })
    .select('id')
    .single();

  if (pErr) {
    console.error("Error creating parent task:", pErr);
    return;
  }

  console.log("Successfully created parent task:", parentTask);

  console.log("=== Creating daily task for Cherry Today (2026-07-15) ===");
  const todayStr = '2026-07-15';

  const { data: dailyTask, error: dErr } = await supabase
    .from('daily_tasks')
    .insert({
      task_id: parentTask.id,
      student_id: cherry.id,
      lesson_node_id: lessonNodeId,
      task_date: todayStr
    })
    .select('id, task_date');

  if (dErr) {
    console.error("Error creating daily task:", dErr);
    return;
  }

  console.log("Successfully created daily task for Cherry today:", dailyTask);
}

run();
