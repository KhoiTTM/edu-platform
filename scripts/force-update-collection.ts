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
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function run() {
  const { data, error } = await supabase
    .from('assessment_collections')
    .update({ title: 'Toán 7 - Tập 1', subject_slug: 'toan' })
    .eq('id', '1a3522d0-7aab-4d0b-bdbf-4b6db5904940')
    .select();

  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Update Success:', data);
  }
}

run().catch(console.error);
