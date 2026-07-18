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
  console.log("=== Finding curriculum_nodes for tieng-anh-7 ===");
  
  // Find subject 'tieng-anh-7'
  const { data: sourceData } = await supabase
    .from('content_sources')
    .select('id, name, slug')
    .eq('slug', 'tieng-anh-7-kntt'); // English 7 Global Success
  
  console.log("Source sources matching 'tieng-anh-7':", sourceData);

  const { data: nodes, error } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type')
    .ilike('slug', 'unit-2%')
    .order('title', { ascending: true });

  if (error) {
    console.error("Error fetching nodes:", error);
    return;
  }

  console.log("Found curriculum nodes for Unit 2:");
  console.log(nodes);
}

run();
