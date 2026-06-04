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
  console.log('Fixing LaTeX bugs (replacing \\left and \\right)...');
  
  // Update question_bank metadata_json
  const { data: qs, error } = await supabase
    .from('question_bank')
    .select('id, metadata_json')
    .or('metadata_json->>question.ilike.%\\left%,metadata_json->>explanation.ilike.%\\left%,metadata_json->>options.ilike.%\\left%');
    
  if (error) {
    console.error(error);
    return;
  }
  
  let updatedCount = 0;
  for (const q of (qs || [])) {
    let str = JSON.stringify(q.metadata_json);
    if (str.includes('\\\\left')) {
      // In JS strings, \\\\left becomes \\left in JSON, but we are working with the stringified JSON here.
      // Actually, JSON.stringify gives "\\\\left".
      str = str.replace(/\\\\left/g, '\\\\Big');
      str = str.replace(/\\\\right/g, '\\\\Big');
      
      const newMeta = JSON.parse(str);
      const { error: upErr } = await supabase
        .from('question_bank')
        .update({ metadata_json: newMeta })
        .eq('id', q.id);
        
      if (!upErr) updatedCount++;
    }
  }
  
  console.log(`Successfully fixed ${updatedCount} questions in question_bank.`);
  
  // Also check if any exercise_sets need fix in title
  const { data: es, error: errES } = await supabase
    .from('exercise_sets')
    .select('id, title')
    .ilike('title', '%\\left%');
    
  if (es && es.length > 0) {
    for (const e of es) {
      const newTitle = e.title.replace(/\\left/g, '\\Big').replace(/\\right/g, '\\Big');
      await supabase.from('exercise_sets').update({ title: newTitle }).eq('id', e.id);
    }
    console.log(`Fixed ${es.length} exercise_sets.`);
  }
}
run();
