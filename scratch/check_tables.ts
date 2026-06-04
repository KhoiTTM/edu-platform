import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
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

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: subjects } = await supabase.from('universal_subjects').select('*');
  console.log("Subjects:", JSON.stringify(subjects, null, 2));

  const { data: sources } = await supabase.from('content_sources').select('*');
  console.log("Sources:", JSON.stringify(sources, null, 2));

  const { data: nodes } = await supabase.from('curriculum_nodes').select('id, title, path, type').limit(10);
  console.log("Sample Nodes:", JSON.stringify(nodes, null, 2));
}

run();
