const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('--- Querying universal_subjects ---');
  const { data: subjects, error } = await supabase
    .from('universal_subjects')
    .select('*');

  if (error) {
    console.error('Error fetching subjects:', error);
    return;
  }

  console.log('Subjects:', subjects);

  console.log('\n--- Querying subject_grade_relations or similar if exists ---');
  // Let's see what tables are related or how grade is linked to subjects
  // Wait, let's see where get_subjects_by_grade RPC is defined.
  // We can query the definition of get_subjects_by_grade
  const { data: rpcDef, error: rpcErr } = await supabase
    .rpc('get_subjects_by_grade', { p_grade: 0 }); // just to see what it does
  console.log('rpcDef (grade 0):', rpcDef);
}

run();
