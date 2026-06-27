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
  console.log('Querying quiz_questions linked to KHTN 7 concepts...');

  // 1. Get KHTN 7 concept IDs
  const { data: allConcepts } = await supabase
    .from('concepts')
    .select('id, slug, title');

  const khtnConcepts = allConcepts?.filter(c => c.slug?.includes('khtn') || c.title?.toLowerCase().includes('khoa học'));
  console.log('KHTN Concepts found:', khtnConcepts?.length);

  if (khtnConcepts && khtnConcepts.length > 0) {
    const conceptIds = khtnConcepts.map(c => c.id);
    const { data: quizQuestions } = await supabase
      .from('quiz_questions')
      .select('id, concept_id, question_text')
      .in('concept_id', conceptIds);

    console.log(`Found ${quizQuestions?.length || 0} questions in quiz_questions for KHTN 7.`);
    if (quizQuestions && quizQuestions.length > 0) {
      console.log('Sample quiz questions:', quizQuestions.slice(0, 5));
    }
  }
}

run();
