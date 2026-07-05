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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("=== Fixing Tiếng Việt course node slug ===");
  
  // 1. Update the slug in curriculum_nodes from lop-3-tv to lop-3
  const { data: updateRes, error: updateErr } = await supabase
    .from('curriculum_nodes')
    .update({ slug: 'lop-3' })
    .eq('slug', 'lop-3-tv');
    
  if (updateErr) {
    console.error("Failed to update slug:", updateErr);
  } else {
    console.log("Successfully updated slug to 'lop-3'");
  }

  // 2. Verify with RPC
  const { data: g3, error: err3 } = await supabase.rpc("get_subjects_by_grade", { p_grade: 3 });
  console.log("Updated Grade 3 subjects from RPC:", g3, "Error:", err3);
}

run();
