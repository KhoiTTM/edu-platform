import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
const envConfig = fs.readFileSync(envFile, 'utf-8')
  .split('\n')
  .filter(line => line.includes('='))
  .reduce((acc: any, line) => {
    const [key, ...val] = line.split('=');
    acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
    return acc;
  }, {});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('--- Universal Subjects ---');
  const { data: subjects } = await supabase.from('universal_subjects').select('id, name, slug, icon_url');
  console.log(subjects);

  console.log('\n--- Curriculum Nodes (Tieng Viet) ---');
  const { data: nodes } = await supabase.from('curriculum_nodes').select('id, title, slug, type, parent_id').ilike('title', '%Tiếng Việt%');
  console.log(nodes);

  console.log('\n--- Exams for Tieng Viet ---');
  const { data: exams } = await supabase.from('assessment_collections')
    .select('id, title, exams(id, title, exam_questions(count))')
    .eq('subject_slug', 'tieng_viet');
  console.log(JSON.stringify(exams, null, 2));
}
check();
