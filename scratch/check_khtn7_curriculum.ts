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
  console.log('Querying universal_subjects for khtn...');
  const { data: subj } = await supabase.from('universal_subjects').select('*').eq('slug', 'khtn');
  console.log('KHTN Subject:', subj);

  if (subj && subj.length > 0) {
    console.log('Querying content_sources for khtn subject...');
    const { data: sources } = await supabase.from('content_sources').select('*').eq('subject_id', subj[0].id);
    console.log('Content Sources:', sources);

    if (sources && sources.length > 0) {
      console.log('Querying curriculum_nodes for course nodes of KHTN...');
      const { data: courses } = await supabase.from('curriculum_nodes').select('id, title, slug, type').eq('source_id', sources[0].id).eq('type', 'course');
      console.log('Course Nodes:', courses);

      if (courses && courses.length > 0) {
        console.log('Querying child nodes (units) under the course node...');
        const { data: units } = await supabase.from('curriculum_nodes').select('id, title, slug, type').eq('parent_id', courses[0].id).eq('type', 'unit');
        console.log('Unit Nodes:', units);
      }
    }
  }
}

run();
