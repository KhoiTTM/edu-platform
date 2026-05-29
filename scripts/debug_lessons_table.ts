// scripts/debug_lessons_table.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Service Role Key is not defined. Make sure .env.local is configured.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLessonsData() {
  console.log("--- Starting Diagnostic: Checking 'lessons' table ---");
  
  const targetSubject = 'tieng_anh';
  const targetGrade = 3;

  console.log(`Querying for subject: '${targetSubject}' and grade: ${targetGrade}`);

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject_slug', targetSubject)
    .eq('grade', targetGrade);

  if (error) {
    console.error("Error querying 'lessons' table:", error);
    return;
  }

  console.log("
--- RESULT ---");
  if (!data || data.length === 0) {
    console.log("🔴 No lessons found matching the criteria.");
    console.log("This is the cause of the issue. The 'lessons' table is empty for Grade 3 English.");
    console.log("Please check if the data was populated into the correct table. The 'Luyện Tập' map reads from the 'lessons' table.");
  } else {
    console.log(`🟢 Found ${data.length} lessons matching the criteria.`);
    console.log("Data seems to exist. The issue might be in the getSubjectCurriculum server action logic or data access policies.");
    console.log("
Sample of found data:");
    console.table(data.slice(0, 5).map(d => ({
        id: d.id.substring(0, 8) + '...',
        title: d.title,
        grade: d.grade,
        subject_slug: d.subject_slug,
        topic_label: d.topic_label,
        lesson_index: d.lesson_index
    })));
  }

  console.log("
--- Diagnostic Finished ---");
}

checkLessonsData().catch(console.error);
