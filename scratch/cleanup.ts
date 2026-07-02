import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const ids = [
    '9f697ae6-3009-48d4-af2a-5206656eee57'
  ];

  console.log("Cleaning up temporary imported collections...");
  for (const id of ids) {
    // Get exam IDs to delete question bank records
    const { data: exams } = await supabase.from('exams').select('id').eq('collection_id', id);
    if (exams && exams.length > 0) {
      const examIds = exams.map(e => e.id);
      const { data: links } = await supabase.from('exam_questions').select('question_bank_id').in('exam_id', examIds);
      if (links && links.length > 0) {
        const qids = links.map(l => l.question_bank_id);
        await supabase.from('exam_questions').delete().in('exam_id', examIds);
        await supabase.from('question_bank').delete().in('id', qids);
      }
      await supabase.from('exams').delete().eq('collection_id', id);
    }
    const { error } = await supabase.from('assessment_collections').delete().eq('id', id);
    if (error) console.error(`Error deleting collection ${id}:`, error.message);
    else console.log(`Deleted collection ${id}`);
  }
}

run();
