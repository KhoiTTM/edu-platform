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
  // 1. Get Rio profile
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%rio%,email.ilike.%rio%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Rio' found.");
    return;
  }

  const rio = profiles[0];
  const todayStr = new Date().toISOString().split('T')[0];

  // Get parent ID
  const { data: parents } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'parent')
    .limit(1);

  const parentId = parents?.[0]?.id || rio.id;

  const examsToAssign = [
    { id: 'c60b57f8-b710-4ca4-8ca5-372fecd8a6ff', title: 'Bài 2: Nguyên tử', unit: 2 },
    { id: '88529870-b4f4-46de-99de-74db177ea203', title: 'Bài 3: Nguyên tố hoá học', unit: 3 }
  ];

  console.log(`Assigning ${examsToAssign.length} exams for Rio today...`);

  for (const exam of examsToAssign) {
    // Insert a separate parent task configuration for each exam to respect the unique constraint
    const { data: parentTask, error: parentError } = await supabase
      .from('parent_tasks')
      .insert({
        parent_id: parentId,
        student_id: rio.id,
        subject_slug: 'khtn',
        unit_numbers: [exam.unit],
        frequency: 'daily',
        active_days: [1, 2, 3, 4, 5, 6, 7],
        exam_id: exam.id,
        is_active: true
      })
      .select('id')
      .single();

    if (parentError || !parentTask) {
      console.error(`Error creating parent task config for ${exam.title}:`, parentError);
      continue;
    }

    const { data: dailyTask, error: dailyError } = await supabase
      .from('daily_tasks')
      .insert({
        task_id: parentTask.id,
        student_id: rio.id,
        exam_id: exam.id,
        task_date: todayStr,
        completed_at: null
      })
      .select('*');

    if (dailyError) {
      console.error(`Error creating daily task for ${exam.title}:`, dailyError);
    } else {
      console.log(`Successfully created daily task for ${exam.title}:`, dailyTask[0].id);
    }
  }
}

run();
