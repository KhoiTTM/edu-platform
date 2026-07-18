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
  console.log("=== Querying math reflex exams ===");
  const { data: exams, error } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      collection:assessment_collections!inner (
        id,
        subject_slug,
        exam_type
      )
    `)
    .eq('assessment_collections.subject_slug', 'toan')
    .eq('assessment_collections.exam_type', 'reflex');

  if (error || !exams || exams.length < 2) {
    console.error("Not enough math reflex exams found.", error);
    return;
  }

  // Shuffle and pick 2
  const shuffled = exams.sort(() => 0.5 - Math.random());
  const selectedExams = shuffled.slice(0, 2);

  console.log("Selected Reflex Exams:", selectedExams.map(e => e.title));

  // Profiles of Rio and Cherry
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name');

  const targets = (profiles || []).filter(p => 
    p.display_name?.toLowerCase().includes('rio') || 
    p.display_name?.toLowerCase().includes('cherry')
  );

  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; // KhoiDu
  const todayStr = '2026-07-15';

  for (const student of targets) {
    console.log(`=== Assigning 2 reflex math exams to ${student.display_name} ===`);
    for (const exam of selectedExams) {
      // 1. Parent Task
      const { data: parentTask } = await supabase
        .from('parent_tasks')
        .insert({
          parent_id: parentId,
          student_id: student.id,
          subject_slug: 'toan',
          unit_numbers: [],
          frequency: 'daily',
          active_days: [1, 2, 3, 4, 5, 6, 7],
          exam_id: exam.id,
          is_active: true
        })
        .select('id')
        .single();

      if (parentTask) {
        // 2. Daily Task
        await supabase
          .from('daily_tasks')
          .insert({
            task_id: parentTask.id,
            student_id: student.id,
            exam_id: exam.id,
            task_date: todayStr
          });
      }
    }
  }

  console.log("Successfully created 2 random reflex math daily tasks for both Rio and Cherry.");
}

run();
