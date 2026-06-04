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
  const { data: unit } = await supabase
    .from('curriculum_nodes')
    .select('*')
    .ilike('title', 'Chủ đề 1%')
    .eq('type', 'unit');
  
  console.log("Unit Node:", JSON.stringify(unit, null, 2));

  const { data: root } = await supabase
    .from('curriculum_nodes')
    .select('*')
    .eq('slug', 'lop-3')
    .eq('type', 'course');
  
  console.log("Root Node:", JSON.stringify(root, null, 2));
}

run();
