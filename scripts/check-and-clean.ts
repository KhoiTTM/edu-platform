import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envConfig = fs.readFileSync('.env.local', 'utf-8').split('\n').filter(l => l.includes('=')).reduce((acc: any, line) => {
  const [key, ...val] = line.split('=');
  acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
  return acc;
}, {});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title, exam_type')
    .eq('subject_slug', 'toan')
    .eq('volume', 2);
  
  console.log("Current collections for Toan 7 Volume 2:");
  console.log(collections);
}

run().catch(console.error);
