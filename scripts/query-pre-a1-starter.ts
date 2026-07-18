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
  console.log("=== Querying Pre A1 Starter exams ===");
  const { data: exams, error } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      collection:assessment_collections!inner (
        id,
        subject_slug,
        exam_type,
        grade
      )
    `)
    .eq('assessment_collections.subject_slug', 'pre-a1-starter');

  if (error) {
    console.error("Error querying exams:", error);
    return;
  }

  console.log(`Found ${exams?.length || 0} Pre A1 Starter exams.`);
  exams?.forEach((e: any) => {
    console.log(`- ID: ${e.id} | Title: ${e.title} | Grade/Level: ${e.collection?.grade}`);
  });
}

run();
