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
  const { data } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, path')
    .eq('parent_id', '24b9472e-179a-4e5e-b785-4b3668e41a2c');
  
  console.log("Children of 24b9...", JSON.stringify(data, null, 2));

  const { data: data2 } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, path')
    .eq('parent_id', 'eea6865c-5d7a-4b5c-a9cf-0cf7611d2704');
    
  console.log("Children of eea6...", JSON.stringify(data2, null, 2));
}

run();
