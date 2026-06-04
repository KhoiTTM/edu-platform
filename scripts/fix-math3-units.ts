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

const chapterBoundaries = [
  { chapter: 1, maxExam: 32 },
  { chapter: 2, maxExam: 60 },
  { chapter: 3, maxExam: 88 },
  { chapter: 4, maxExam: 116 },
  { chapter: 5, maxExam: 140 },
  { chapter: 6, maxExam: 160 },
  { chapter: 7, maxExam: 176 }
];

function getChapterForExam(examIndex: number) {
  for (const b of chapterBoundaries) {
    if (examIndex <= b.maxExam) return b.chapter;
  }
  return 7;
}

async function run() {
  const { data: cols } = await supabase
    .from('assessment_collections')
    .select('id, title, sequence_number')
    .eq('grade', 3)
    .eq('subject_slug', 'toan')
    .is('units', null);
    
  console.log(`Found ${cols?.length} collections to fix.`);
  
  let updatedCount = 0;
  for (const col of (cols || [])) {
    // Extract exam number from title "Toán 3 - Tập 1 - Đề X"
    const match = col.title.match(/Đề (\d+)/);
    const examNum = match ? parseInt(match[1]) : col.sequence_number;
    
    if (examNum) {
      const chapter = getChapterForExam(examNum);
      const lessonWithinChapter = Math.floor((examNum - 1) / 4) + 1; // Not fully accurate globally, but we just need chapter
      
      const { error } = await supabase
        .from('assessment_collections')
        .update({ 
          units: [chapter],
          // Regenerate title to include chapter and lesson if we wanted to, but keeping it simple for now
          // actually the title is updated via trigger when we run the SQL, but the trigger uses `units` array!
          // Since the trigger depends on `units` array, updating `units` might re-trigger the title generation!
        })
        .eq('id', col.id);
        
      if (!error) updatedCount++;
    }
  }
  
  console.log(`Successfully updated ${updatedCount} collections.`);
  
  // Re-run the trigger manually just in case
  console.log('Re-applying titles using the updated units...');
  await supabase.rpc('exec_sql', { sql: `
    UPDATE public.assessment_collections 
    SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number)
    WHERE grade = 3 AND subject_slug = 'toan';
  ` });
  console.log('Done.');
}
run();
