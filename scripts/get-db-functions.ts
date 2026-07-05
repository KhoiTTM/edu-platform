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
  // Query pg_proc to find all RPC functions in the 'public' schema
  const { data, error } = await supabase.from('universal_subjects').select('*').limit(1); // just a connection check
  console.log("Supabase connection check:", data ? "OK" : "FAILED", error);
  
  // Since we cannot run raw query directly unless we use an RPC, let's check if there are any RPCs
  // Supabase postgrest exposes RPCs in swagger / openapi.
  // We can query the OpenAPI schema of postgrest!
  const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  const schema = await response.json();
  const paths = Object.keys(schema.paths || {});
  const rpcs = paths.filter(p => p.startsWith('/rpc/'));
  console.log("Available RPC paths:");
  rpcs.forEach(r => console.log(`- ${r}`));
}

run();
