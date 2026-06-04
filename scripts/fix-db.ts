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

async function fixDB() {
  console.log('Cleaning up duplicate Tieng Viet courses...');
  // Find courses
  const { data: courses } = await supabase.from('curriculum_nodes').select('id, slug').eq('type', 'course').ilike('title', '%Tiếng Việt lớp 3%');
  if (courses && courses.length > 1) {
    // Delete the one with slug 'lop-3-tv' (or keep 'lop-3-tv' and delete 'lop-3')
    // We'll keep the first one and delete the rest
    const idsToDelete = courses.slice(1).map(c => c.id);
    await supabase.from('curriculum_nodes').delete().in('id', idsToDelete);
    console.log('Deleted duplicate courses:', idsToDelete);
  }

  console.log('Cleaning up ALL Tieng Viet exams...');
  const { data: cols } = await supabase.from('assessment_collections').select('id').eq('subject_slug', 'tieng_viet');
  if (cols && cols.length > 0) {
    const ids = cols.map(c => c.id);
    await supabase.from('exams').delete().in('collection_id', ids);
    await supabase.from('assessment_collections').delete().in('id', ids);
    console.log('Deleted exams & collections.');
  }
}
fixDB();
