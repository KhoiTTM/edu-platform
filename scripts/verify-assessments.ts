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

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('Verifying all Grade 7 Math collections:');

  // Fetch all math 7 collections
  const { data: collections, error: colError } = await supabase
    .from('assessment_collections')
    .select('*')
    .eq('grade', 7)
    .eq('subject_slug', 'toan');

  if (colError) {
    console.error('Error fetching collections:', colError);
    return;
  }

  for (const collection of collections || []) {
    console.log(`\n==========================================`);
    console.log(`Collection details:`);
    console.log(`- ID: ${collection.id}`);
    console.log(`- Title: ${collection.title}`);
    console.log(`- Subject: ${collection.subject_slug}`);
    console.log(`- Grade: ${collection.grade}`);
    console.log(`- Units: ${JSON.stringify(collection.units)}`);
    console.log(`- Volume: ${collection.volume}`);

    // Fetch the exams linked to this collection
    const { data: exams, error: examsError } = await supabase
      .from('exams')
      .select('id, title, exam_number, total_questions')
      .eq('collection_id', collection.id);

    if (examsError) {
      console.error('  Error fetching exams:', examsError);
      continue;
    }

    console.log(`Found ${exams?.length || 0} exams linked to this collection:`);
    exams?.forEach(exam => {
      console.log(`  - [${exam.id}] ${exam.title} (No. ${exam.exam_number}, Total Qs: ${exam.total_questions})`);
    });
  }
}

verify().catch(console.error);
