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

async function check() {
    let {data, error} = await supabase.from('exams').select('*').limit(1);
    if (data && data.length > 0) {
        console.log("Exams Columns:", Object.keys(data[0]));
    } else {
        console.log("No data or error:", error);
    }

    let {data: d2, error: e2} = await supabase.from('assessment_collections').select('*').limit(1);
    if (d2 && d2.length > 0) {
        console.log("Collections Columns:", Object.keys(d2[0]));
    }
}
check();
