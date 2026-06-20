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

async function check() {
  console.log("=== Checking Tiếng Việt Subjects ===");
  const { data: subjects } = await supabase.from('universal_subjects').select('*').like('slug', '%tieng%');
  console.log("Subjects:", subjects);

  if (subjects) {
    for (const sub of subjects) {
      console.log(`\n--- Sources for subject: ${sub.name_vi} (${sub.slug}) ---`);
      const { data: sources } = await supabase.from('content_sources').select('*').eq('subject_id', sub.id);
      console.log("Sources:", sources);

      if (sources) {
        for (const src of sources) {
          const { data: nodes } = await supabase.from('curriculum_nodes').select('*').eq('source_id', src.id);
          console.log(`Nodes for source ${src.name}:`, nodes?.map(n => ({ id: n.id, title: n.title, slug: n.slug, type: n.type })));
        }
      }
    }
  }

  console.log("\n=== Checking curriculum_units for tieng_viet / tieng-viet ===");
  const { data: units } = await supabase.from('curriculum_units').select('*').in('subject', ['tieng_viet', 'tieng-viet']);
  console.log("Curriculum Units count:", units ? units.length : 0);
  if (units) {
    console.log("Sample units:", units.slice(0, 5).map(u => ({ id: u.id, subject: u.subject, grade: u.grade, title: u.title })));
  }
}

check();
