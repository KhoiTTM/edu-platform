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
  console.log("Starting cleanup of Vietnamese 3 data...");

  // 1. Delete exams (this will cascade delete exam_questions if set up, or we can just delete from assessment_collections which cascades)
  console.log("Deleting exams and collections...");
  const { data: collections, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'tieng_viet');
    
  if (collections && collections.length > 0) {
    const colIds = collections.map(c => c.id);
    const { error: delExamsErr } = await supabase.from('exams').delete().in('collection_id', colIds);
    if (delExamsErr) console.error("Error deleting exams:", delExamsErr);
    
    const { error: delColsErr } = await supabase.from('assessment_collections').delete().in('id', colIds);
    if (delColsErr) console.error("Error deleting collections:", delColsErr);
  }

  // 2. Delete curriculum nodes
  console.log("Deleting curriculum nodes...");
  
  // First find the Tiếng Việt 3 root node
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .select('source_id')
    .eq('slug', 'tieng_viet_3_tap1_fake')
    .single();
    
  if (rootNode) {
     const { error: nodeErr } = await supabase
       .from('curriculum_nodes')
       .delete()
       .eq('source_id', rootNode.source_id);
     if (nodeErr) console.error("Error deleting nodes:", nodeErr);
  } else {
     // fallback if it used something else
     const { data: anyTV3 } = await supabase.from('curriculum_nodes').select('source_id').ilike('title', '%Tiếng Việt 3%').limit(1).single();
     if (anyTV3) {
         await supabase.from('curriculum_nodes').delete().eq('source_id', anyTV3.source_id);
     }
  }

  // 3. Delete question bank
  console.log("Deleting questions...");
  const { error: qErr } = await supabase
    .from('question_bank')
    .delete()
    .eq('source', 'tieng_viet_3'); // or whatever it was
  if (qErr) console.error("Error deleting questions:", qErr);

  console.log("Cleanup complete!");
}

cleanup();
