import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

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
  console.log("Starting cleanup of English Grade 3 data...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-anh-3-global-success')
    .single();

  if (!source) {
      console.log("Could not find source tieng-anh-3-global-success");
  } else {
      console.log("Found source ID:", source.id);
      
      const { data: cols, error: colErr } = await supabase
        .from('assessment_collections')
        .select('id, title')
        .eq('source_id', source.id);
        
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

      // We should also delete from exercise_sets because migrate-english-to-universal.ts created exercise_sets
      const { data: es, error: esErr } = await supabase
        .from('exercise_sets')
        .select('id')
        .eq('source_id', source.id);
        
      if (esErr) {
          console.error("Error finding exercise sets:", esErr);
      } else if (es && es.length > 0) {
          const esIds = es.map(e => e.id);
          console.log(`Found ${esIds.length} exercise_sets to delete.`);
          const { error: delEsErr } = await supabase.from('exercise_sets').delete().in('id', esIds);
          if (delEsErr) {
              console.error("Error deleting exercise_sets:", delEsErr);
          } else {
              console.log(`Deleted ${esIds.length} exercise_sets.`);
          }
      }
  }

  // Fallback to delete any leftover where subject = tieng_anh and grade = 3
  const { data: qbs, error: qbError } = await supabase
    .from('question_bank')
    .select('id')
    .eq('subject_slug', 'tieng_anh')
    .eq('grade', 3);

  if (qbError) {
    console.error("Error finding questions:", qbError);
  } else if (qbs && qbs.length > 0) {
    const ids = qbs.map(q => q.id);
    console.log(`Found ${ids.length} questions to delete.`);
    
    for (let i = 0; i < ids.length; i += 100) {
        const chunk = ids.slice(i, i + 100);
        const { error: delErr } = await supabase.from('question_bank').delete().in('id', chunk);
        if (delErr) {
            console.error("Error deleting questions chunk:", delErr);
        }
    }
    console.log(`Deleted ${ids.length} questions.`);
  }

  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id, title')
    .eq('subject_slug', 'tieng_anh')
    .eq('grade', 3);
    
  if (colErr) {
     console.error("Error finding collections:", colErr);
  } else if (cols && cols.length > 0) {
      const colIds = cols.map(c => c.id);
      console.log(`Found ${colIds.length} fallback collections to delete.`);
      
      const { error: delColErr } = await supabase.from('assessment_collections').delete().in('id', colIds);
      if (delColErr) {
          console.error("Error deleting collections:", delColErr);
      } else {
          console.log(`Deleted ${colIds.length} fallback collections.`);
      }
  }

  console.log("Cleanup complete!");
}

cleanup().catch(console.error);
