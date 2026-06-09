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

async function checkSubjects() {
  const { data } = await supabase.from('assessment_collections').select('subject_slug, volume, units');
  if (!data) return;
  const subjects = new Set<string>();
  const mapping: Record<string, any> = {};
  data.forEach(d => {
    subjects.add(d.subject_slug);
    if (!mapping[d.subject_slug]) mapping[d.subject_slug] = new Set();
    mapping[d.subject_slug].add(`Vol ${d.volume} - Units: ${JSON.stringify(d.units)}`);
  });
  console.log("Distinct subjects with assessment collections:", Array.from(subjects));
  for (const s of subjects) {
    console.log(`\n${s}:`);
    console.log(Array.from(mapping[s]));
  }
}
checkSubjects();
