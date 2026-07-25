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

  // Các đề "Luyện chính tả Level 1" (units [101])
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
    .filter('assessment_collections.units', 'cs', '{101}');

  if (examsErr || !exams || exams.length === 0) {
    console.error("No 'Luyện chính tả Level 1' exams found in DB.", examsErr);
    return;
  }

  console.log(`Found ${exams.length} spelling Level 1 exams.`);

  const parentId = '450c30a0-f659-41a8-af3c-378b25f5b6f1'; // Parent KhoiDu
  const todayStr = new Date().toISOString().split("T")[0];

  // Bỏ các đề đã giao hôm nay rồi mới random, tránh trùng
  const { data: existingToday } = await supabase
    .from('daily_tasks')
    .select('exam_id')
    .eq('student_id', cherry.id)
    .eq('task_date', todayStr);
  const assignedIds = new Set((existingToday || []).map(t => t.exam_id));
  const candidates = exams.filter(e => !assignedIds.has(e.id));

  if (candidates.length === 0) {
    console.log("Tất cả đề của bộ này đều đã được giao hôm nay. Không giao thêm.");
    return;
  }

  const exam = candidates[Math.floor(Math.random() * candidates.length)];
  console.log(`=== Giao đề ngẫu nhiên "${exam.title}" cho ${cherry.display_name} ngày ${todayStr} ===`);

  const { data: parentTask, error: pErr } = await supabase
    .from('parent_tasks')
    .insert({
      parent_id: parentId,
      student_id: cherry.id,
      subject_slug: 'pre-a1-starter',
      unit_numbers: [101],
      frequency: 'daily',
      active_days: [1, 2, 3, 4, 5, 6, 7],
      exam_id: exam.id,
      is_active: true
    })
    .select('id')
    .single();

  if (pErr || !parentTask) {
    console.error("Error creating parent task:", pErr);
    return;
  }

  const { error: dErr } = await supabase
    .from('daily_tasks')
    .insert({
      task_id: parentTask.id,
      student_id: cherry.id,
      exam_id: exam.id,
      task_date: todayStr
    });

  if (dErr) {
    console.error("Error creating daily task:", dErr);
  } else {
    console.log(`✓ Giao thành công: ${exam.title}`);
  }

  console.log("=== Giao nhiệm vụ hoàn tất ===");
}

run();
