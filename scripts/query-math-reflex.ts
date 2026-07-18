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
  console.log("=== Finding random math reflex exams ===");
  
  // Select 2 random reflex exams for math (subject_slug = toan)
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

  if (error) {
    console.error("Error querying exams:", error);
    return;
  }

  console.log(`Found ${exams?.length || 0} math reflex exams.`);
  if (!exams || exams.length === 0) {
    // If no reflex type exists, let's query standard review/lesson math exams to assign
    const { data: allMathExams } = await supabase
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
      .limit(10);
    console.log("Fallback - All math exams:", allMathExams);
  } else {
    console.log("Reflex exams sample:", exams.slice(0, 5));
  }
}

run();
