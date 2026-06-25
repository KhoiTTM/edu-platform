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
  console.log('--- Querying assessment_collections ---');
  const { data, error } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade, exam_type, volume, status');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} collections:`);
  data.forEach(c => {
    console.log(`- ID: ${c.id}, Title: ${c.title}, Subject: ${c.subject_slug}, Grade: ${c.grade}, Type: ${c.exam_type}, Vol: ${c.volume}, Status: ${c.status}`);
  });
}

run();
