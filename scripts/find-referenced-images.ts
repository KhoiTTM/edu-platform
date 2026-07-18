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
  console.log("=== Finding page-related contents ===");
  const { data: questions, error } = await supabase
    .from('question_bank')
    .select('id, metadata_json')
    .limit(200);

  if (error) {
    console.error("Error fetching questions:", error);
    return;
  }

  const imagePaths = Array.from(new Set(questions?.map(q => q.metadata_json?.original_image_path).filter(Boolean)));
  console.log("Sample image paths in DB:");
  console.log(imagePaths.slice(0, 20));
}

run();
