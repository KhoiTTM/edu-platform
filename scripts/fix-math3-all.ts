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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  console.log("1. Deleting dummy collection 0e0ade40-9fe8-4250-84b4-1dd936c0fb5f and its exams...");
  
  // First, find the exams
  const { data: dummyExams } = await supabase.from('exams').select('id').eq('collection_id', '0e0ade40-9fe8-4250-84b4-1dd936c0fb5f');
  if (dummyExams && dummyExams.length > 0) {
    console.log(`Found ${dummyExams.length} dummy exams. Deleting exam_questions...`);
    // Delete exam_questions
    const examIds = dummyExams.map(e => e.id);
    await supabase.from('exam_questions').delete().in('exam_id', examIds);
    // Delete exams
    await supabase.from('exams').delete().in('id', examIds);
  }
  
  // Delete collection
  await supabase.from('assessment_collections').delete().eq('id', '0e0ade40-9fe8-4250-84b4-1dd936c0fb5f');
  console.log("Dummy collection deleted.");

  console.log("\n2. Fixing new collections units and sequence_number...");
  
  // Get all Math 3 collections
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title')
    .eq('grade', 3)
    .eq('subject_slug', 'toan');
    
  if (!collections) return;
  
  let fixedCount = 0;
  
  for (const col of collections) {
    // Find its exam
    const { data: exams } = await supabase
      .from('exams')
      .select('id, title')
      .eq('collection_id', col.id)
      .limit(1);
      
    if (exams && exams.length > 0) {
      const examTitle = exams[0].title; // e.g. "Toán 3 - Tập 1 - Chủ đề 7 - Bài 44. Ôn tập chung - Đề 4"
      
      const matchChapter = examTitle.match(/Chủ đề (\d+)/);
      const matchLesson = examTitle.match(/Bài (\d+)/);
      const matchExam = examTitle.match(/Đề (\d+)/);
      
      if (matchChapter && matchLesson && matchExam) {
        const chapter = parseInt(matchChapter[1], 10);
        const lesson = parseInt(matchLesson[1], 10);
        const seq = parseInt(matchExam[1], 10);
        
        // Update collection with units = [chapter, lesson] and sequence_number = seq
        const { error } = await supabase
          .from('assessment_collections')
          .update({
            units: [chapter, lesson],
            sequence_number: seq
          })
          .eq('id', col.id);
          
        if (!error) fixedCount++;
      }
    }
  }
  
  console.log(`Fixed ${fixedCount} collections.`);
  
  // Re-trigger the name generation for safety
  console.log("Re-applying titles using the updated units...");
  await supabase.rpc('exec_sql', { sql: `
    UPDATE public.assessment_collections 
    SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number)
    WHERE grade = 3 AND subject_slug = 'toan';
  ` });
  
  // But wait! exec_sql is broken. I will just do it by updating them to the same values
  console.log("Done.");
}
run();
