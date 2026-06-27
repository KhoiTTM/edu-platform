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
  console.log('Querying for question_bank where type is mcq...');
  const { data: questions, error: fetchErr } = await supabase
    .from('question_bank')
    .select('id, type')
    .eq('type', 'mcq');

  if (fetchErr) {
    console.error('Error fetching questions:', fetchErr);
    return;
  }

  console.log(`Found ${questions?.length || 0} questions with type 'mcq'.`);

  if (!questions || questions.length === 0) return;

  const ids = questions.map(q => q.id);
  console.log('Updating them to type "multiple_choice"...');
  
  const { error: updateErr } = await supabase
    .from('question_bank')
    .update({ type: 'multiple_choice' })
    .in('id', ids);

  if (updateErr) {
    console.error('Error updating question types:', updateErr);
  } else {
    console.log('Successfully updated all question types to "multiple_choice"!');
  }
}

run();
