import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function check() {
  console.log("Checking universal_subjects...");
  const { data: subjects } = await supabase.from('universal_subjects').select('*');
  console.log("Subjects:", subjects);

  console.log("\nChecking content_sources...");
  const { data: sources } = await supabase.from('content_sources').select('*');
  console.log("Sources:", sources);

  console.log("\nChecking curriculum_units for grade 7...");
  const { data: units } = await supabase.from('curriculum_units').select('*').eq('grade', 7);
  console.log("Curriculum Units (Grade 7):", units);

  console.log("\nChecking curriculum_nodes for toan / grade 7...");
  const { data: nodes } = await supabase.from('curriculum_nodes').select('id, title, slug, type, path, depth').ilike('slug', '%7%');
  console.log("Curriculum Nodes containing '7':", nodes);
}

check();
