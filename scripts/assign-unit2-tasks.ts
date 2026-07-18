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
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%rio%,email.ilike.%rio%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Rio' found.");
    return;
  }
  const rio = profiles[0];

  // KhoiDu acts as the parent ID
  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; 

  const lessonNodeIds = [
    '80a6cb29-2089-494b-a888-30a164ec31d4', // Unit 2 - Skills 2
    '3a652f5c-32a1-4675-89fd-24ba564dc4a8'  // Unit 2 - Looking Back & Project
  ];

  console.log("=== Creating parent tasks ===");
  const parentInserts = lessonNodeIds.map(nodeId => ({
    parent_id: parentId,
    student_id: rio.id,
    subject_slug: 'tieng-anh-7',
    unit_numbers: [2],
    frequency: 'daily',
    active_days: [1, 2, 3, 4, 5, 6, 7],
    lesson_node_id: nodeId,
    is_active: true
  }));

  const { data: parentTasks, error: pErr } = await supabase
    .from('parent_tasks')
    .insert(parentInserts)
    .select('id, lesson_node_id');

  if (pErr) {
    console.error("Error creating parent tasks:", pErr);
    return;
  }

  console.log("Successfully created parent tasks:", parentTasks);

  console.log("=== Creating daily tasks for Today (2026-07-15) ===");
  const todayStr = '2026-07-15';

  const dailyInserts = parentTasks.map(pt => ({
    task_id: pt.id,
    student_id: rio.id,
    lesson_node_id: pt.lesson_node_id,
    task_date: todayStr
  }));

  const { data: dailyTasks, error: dErr } = await supabase
    .from('daily_tasks')
    .insert(dailyInserts)
    .select('id, lesson_node_id, task_date');

  if (dErr) {
    console.error("Error creating daily tasks:", dErr);
    return;
  }

  console.log("Successfully created daily tasks for Rio today:", dailyTasks);
}

run();
