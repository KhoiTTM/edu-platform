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
  console.log("=== Finding Cherry profile ===");
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%cherry%,email.ilike.%cherry%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Cherry' found.");
    return;
  }
  const cherry = profiles[0];

  // Randomly select 2 Listening Level 2 exams
  // Examples:
  // - PreA1 Starter Listen Level 2 - Đề 01 (2e5d3da0-9929-4f03-a03e-4ab94206f77c)
  // - PreA1 Starter Listen Level 2 - Đề 02 (9189fb92-20a7-4c0a-b26a-6ed1859d6508)
  const selectedExams = [
    { id: '2e5d3da0-9929-4f03-a03e-4ab94206f77c', title: 'PreA1 Starter Listen Level 2 - Đề 01' },
    { id: '9189fb92-20a7-4c0a-b26a-6ed1859d6508', title: 'PreA1 Starter Listen Level 2 - Đề 02' }
  ];

  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; // Parent KhoiDu
  const todayStr = '2026-07-15';

  console.log(`=== Assigning 2 Pre A1 Starter Listening Level 2 exams to ${cherry.display_name} ===`);
  
  for (const exam of selectedExams) {
    // 1. Parent Task
    const { data: parentTask, error: pErr } = await supabase
      .from('parent_tasks')
      .insert({
        parent_id: parentId,
        student_id: cherry.id,
        subject_slug: 'pre-a1-starter',
        unit_numbers: [],
        frequency: 'daily',
        active_days: [1, 2, 3, 4, 5, 6, 7],
        exam_id: exam.id,
        is_active: true
      })
      .select('id')
      .single();

    if (pErr) {
      console.error("Error creating parent task:", pErr);
      continue;
    }

    if (parentTask) {
      // 2. Daily Task
      const { data: dailyTask, error: dErr } = await supabase
        .from('daily_tasks')
        .insert({
          task_id: parentTask.id,
          student_id: cherry.id,
          exam_id: exam.id,
          task_date: todayStr
        })
        .select('id');

      if (dErr) {
        console.error("Error creating daily task:", dErr);
      } else {
        console.log(`Assigned daily task for ${exam.title}:`, dailyTask);
      }
    }
  }

  console.log("Successfully created 2 Pre A1 Starter Listening Level 2 tasks for Cherry today.");
}

run();
