import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const ids = [
    "d8dd24e6-adc1-4fe0-9021-3e61bfa995df",
    "1823bca6-6f57-43b4-af62-5c875b74c84c",
    "cde839b8-d96c-4f75-b4a5-542c1d5844de",
    "2742665c-51fa-4fa7-bce6-37ea043da718",
    "cda3773f-47af-4803-be3a-e2fab0ea2b0d",
    "af6fc024-ff2c-4010-b44a-cff41e7d26d1"
  ];

  const { data: exams, error } = await supabase
    .from('exams')
    .select('id, title, collection_id')
    .in('id', ids);

  if (error) {
    console.error('Error fetching exams:', error);
    return;
  }

  console.log('Exams:', exams);

  if (exams && exams.length > 0) {
    const colIds = exams.map((e: any) => e.collection_id);
    const { data: cols } = await supabase
      .from('assessment_collections')
      .select('id, title, subject_slug, grade')
      .in('id', colIds);
    console.log('Collections:', cols);
  }
}

run();