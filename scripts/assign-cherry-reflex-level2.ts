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
  console.log("=== Finding Cherry Profile ===");
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%cherry%,email.ilike.%cherry%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Cherry' found.");
    return;
  }
  const cherry = profiles[0];

  // Tìm các đề Wordlist Level 2 vừa tạo (unit 100)
  const { data: exams, error: examsErr } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      collection:assessment_collections!inner (
        units
      )
    `)
    .eq('assessment_collections.subject_slug', 'pre-a1-starter')
    .filter('assessment_collections.units', 'cs', '{100}');

  if (examsErr || !exams || exams.length === 0) {
    console.error("No Wordlist Level 2 exams found in DB. Make sure you seeded them.", examsErr);
    return;
  }

  console.log(`Found ${exams.length} Wordlist Level 2 exams.`);

  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; // Parent KhoiDu
  const todayStr = new Date().toISOString().split("T")[0]; // "2026-07-23"

  // Gán 3 đề đầu tiên của Level 2 cho ngày hôm nay để test
  const selectedExams = exams.slice(0, 3);

  console.log(`=== Giao ${selectedExams.length} đề Wordlist Level 2 cho ${cherry.display_name} vào ngày ${todayStr} ===`);

  for (const exam of selectedExams) {
    // 1. Check if already exists for today to avoid duplicates
    const { data: existingDaily } = await supabase
      .from('daily_tasks')
      .select('id')
      .eq('student_id', cherry.id)
      .eq('exam_id', exam.id)
      .eq('task_date', todayStr)
      .maybeSingle();

    if (existingDaily) {
      console.log(`Task for "${exam.title}" already assigned for today. Skipping.`);
      continue;
    }

    // 2. Parent Task configuration
    const { data: parentTask, error: pErr } = await supabase
      .from('parent_tasks')
      .insert({
        parent_id: parentId,
        student_id: cherry.id,
        subject_slug: 'pre-a1-starter',
        unit_numbers: [100],
        frequency: 'daily',
        active_days: [1, 2, 3, 4, 5, 6, 7],
        exam_id: exam.id,
        is_active: true
      })
      .select('id')
      .single();

    if (pErr) {
      console.error(`Error creating parent task for ${exam.title}:`, pErr);
      continue;
    }

    if (parentTask) {
      // 3. Daily Task
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
        console.log(`✓ Giao thành công: ${exam.title}`);
      }
    }
  }

  console.log("=== Giao nhiệm vụ hoàn tất ===");
}

run();
