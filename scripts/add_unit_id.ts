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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Alter table to add unit_id if it doesn't exist
  console.log("Checking unit_id column...");
  const { data: cols, error: e1 } = await supabase.rpc('execute_sql', {
    sql: `ALTER TABLE assessment_collections ADD COLUMN IF NOT EXISTS unit_id uuid REFERENCES curriculum_nodes(id);`
  });
  
  if (e1) {
    console.error("RPC execute_sql failed:", e1);
    // Maybe we don't have execute_sql, let's just do it directly via postgres or ignore if it's not possible this way
  } else {
    console.log("Successfully added unit_id");
  }
}

run();
