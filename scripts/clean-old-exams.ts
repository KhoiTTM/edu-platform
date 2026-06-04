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

async function clean() {
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, created_at')
    .eq('subject_slug', 'tieng_viet')
    .order('created_at', { ascending: false });

  if (!collections || collections.length <= 2) {
    console.log('No old collections to delete');
    return;
  }

  // Keep the latest 2 collections
  const toDelete = collections.slice(2).map(c => c.id);
  console.log(`Deleting ${toDelete.length} old collections...`);

  // Delete exams
  await supabase.from('exams').delete().in('collection_id', toDelete);
  
  // Delete collections
  await supabase.from('assessment_collections').delete().in('id', toDelete);

  console.log('Cleanup done!');
}
clean();
