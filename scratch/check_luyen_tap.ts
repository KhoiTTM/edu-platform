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

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking curiculum_units...");
  const { data: units } = await supabase.from('curriculum_units').select('*');
  console.log("Units:", units);

  console.log("\nChecking assessment_collections...");
  const { data: collections } = await supabase.from('assessment_collections').select('*');
  console.log("Collections:", collections);

  console.log("\nChecking universal_subjects...");
  const { data: subjects } = await supabase.from('universal_subjects').select('*');
  console.log("Subjects:", subjects);

  // Let's also check active profiles
  console.log("\nChecking profiles...");
  const { data: profiles } = await supabase.from('profiles').select('*');
  console.log("Profiles:", profiles);
}

check().catch(console.error);
