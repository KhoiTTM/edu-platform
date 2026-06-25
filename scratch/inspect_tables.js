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
  
  // Let's inspect content_sources and curriculum_nodes to understand how subjects are structured
  const { data: sources, error: srcErr } = await supabase.from('content_sources').select('*').limit(5);
  console.log('content_sources:', sources, srcErr);

  const { data: curriculum, error: currErr } = await supabase.from('curriculum_nodes').select('*').limit(5);
  console.log('curriculum_nodes:', curriculum, currErr);
}

run();
