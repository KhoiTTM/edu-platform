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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  console.log('Querying database functions...');
  
  // Try querying pg_proc or routines if they are exposed (unlikely but worth a shot)
  try {
    const { data, error } = await supabase
      .from('pg_proc')
      .select('proname')
      .limit(10);
    console.log('pg_proc:', { data, error });
  } catch (e) {
    console.error('pg_proc failed:', e);
  }

  // Let's also check if we can query pg_available_extensions
  try {
    const { data, error } = await supabase
      .from('pg_available_extensions')
      .select('*')
      .limit(5);
    console.log('extensions:', { data, error });
  } catch (e) {
    console.error('extensions failed:', e);
  }
}
run();
