import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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

async function cleanAndReseed() {
  console.log('Cleaning all mindset-ielts assessment collections...');
  await supabase.from('assessment_collections').delete().eq('subject_slug', 'mindset-ielts');
  
  console.log('Running seed for Unit 1...');
  execSync('npx ts-node scripts/seed-ielts-mindset.ts', { stdio: 'inherit' });

  // Update task3-db-seed to seed 02 and 03
  let task3 = fs.readFileSync('scripts/phase4/task3-db-seed.ts', 'utf-8');
  task3 = task3.replace(/seedUnit\(['"]\d+['"]\)\.catch\(console\.error\);/, '');
  fs.writeFileSync('scripts/phase4/task3-db-seed.ts', task3 + "\nasync function seedAll() { await seedUnit('02'); await seedUnit('03'); }\nseedAll().catch(console.error);\n", 'utf-8');
  
  console.log('Running seed for Unit 2 and 3...');
  execSync('npx ts-node scripts/phase4/task3-db-seed.ts', { stdio: 'inherit' });
  
  console.log('Done!');
}
cleanAndReseed();
