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

async function cleanup() {
  console.log("Starting cleanup of Vietnamese 3 static data...");

  // 1. Delete all manual_import questions
  const { data: qbs, error: qbError } = await supabase
    .from('question_bank')
    .select('id')
    .eq('subject_slug', 'tieng_viet')
    .eq('grade', 3)
    .eq('source', 'manual_import');

  if (qbError) {
    console.error("Error finding questions:", qbError);
  } else if (qbs && qbs.length > 0) {
    const ids = qbs.map(q => q.id);
    console.log(`Found ${ids.length} questions to delete.`);
    
    // Chunk delete to avoid payload too large
    for (let i = 0; i < ids.length; i += 100) {
        const chunk = ids.slice(i, i + 100);
        const { error: delErr } = await supabase.from('question_bank').delete().in('id', chunk);
        if (delErr) {
            console.error("Error deleting questions chunk:", delErr);
        }
    }
    console.log(`Deleted ${ids.length} questions.`);
  }

  // 2. Delete all static collections
  // To be safe, we fetch exams with generation_mode = 'static' for tieng_viet grade 3,
  // then delete their collections. Or just delete all tieng_viet grade 3 collections
  // since currently there are no dynamic ones for Tieng Viet 3.
  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id, title')
    .eq('subject_slug', 'tieng_viet')
    .eq('grade', 3);
    
  if (colErr) {
     console.error("Error finding collections:", colErr);
  } else if (cols && cols.length > 0) {
      const colIds = cols.map(c => c.id);
      console.log(`Found ${colIds.length} collections to delete.`);
      
      const { error: delColErr } = await supabase.from('assessment_collections').delete().in('id', colIds);
      if (delColErr) {
          console.error("Error deleting collections:", delColErr);
      } else {
          console.log(`Deleted ${colIds.length} collections and their cascade dependents.`);
      }
  }

  console.log("Cleanup complete!");
}

cleanup().catch(console.error);
