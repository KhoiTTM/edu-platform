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

async function verify() {
  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id, title, units')
    .eq('subject_slug', 'toan')
    .eq('grade', 3);

  if (colErr) {
    console.error("Error finding collections:", colErr);
    process.exit(1);
  }

  console.log(`Found ${cols?.length || 0} Math 3 collections.`);

  if (cols && cols.length > 0) {
    const sample = cols.slice(0, 5);
    for (const c of sample) {
        console.log(`- Collection: ${c.title}`);
        console.log(`  units: ${JSON.stringify(c.units)}`);
    }
  }
}

verify().catch(console.error);
