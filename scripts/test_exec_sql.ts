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

const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    console.log("Trying exec_sql...");
    let res = await s.rpc('exec_sql', { sql: 'ALTER TABLE assessment_collections ADD COLUMN IF NOT EXISTS unit_id UUID;' });
    console.log("exec_sql res:", res);
    
    // Also try execute_sql just in case
    if (res.error) {
        console.log("Trying execute_sql...");
        let res2 = await s.rpc('execute_sql', { sql: 'ALTER TABLE assessment_collections ADD COLUMN IF NOT EXISTS unit_id UUID;' });
        console.log("execute_sql res:", res2);
    }
}
run();
