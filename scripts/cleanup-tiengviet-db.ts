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

async function clean() {
  console.log("=== Cleaning up empty/incorrect Tiếng Việt resources ===");

  // 1. Delete content source "minhkhoi/tieng_viet_3"
  console.log("Deleting content source 'minhkhoi/tieng_viet_3'...");
  const { data: delSource, error: errSource } = await supabase
    .from('content_sources')
    .delete()
    .eq('slug', 'minhkhoi/tieng_viet_3')
    .select();
  if (errSource) {
    console.error("Error deleting source:", errSource);
  } else {
    console.log("Deleted source:", delSource);
  }

  // 2. Clear any data using "tieng-viet" (dash)
  console.log("Cleaning questions/exams/collections referencing subject_slug 'tieng-viet'...");
  
  // Find collections under tieng-viet
  const { data: cols } = await supabase.from('assessment_collections').select('id').eq('subject_slug', 'tieng-viet');
  if (cols && cols.length > 0) {
    const colIds = cols.map(c => c.id);
    // Find exams under these collections
    const { data: exams } = await supabase.from('exams').select('id').in('collection_id', colIds);
    if (exams && exams.length > 0) {
      const examIds = exams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', examIds);
      await supabase.from('exams').delete().in('id', examIds);
      console.log(`Deleted exams for collection ids: ${colIds}`);
    }
    await supabase.from('assessment_collections').delete().in('id', colIds);
    console.log(`Deleted assessment collections: ${colIds}`);
  }

  // Clean exercise_sets or other resources if mapped to lessons of tieng-viet
  // Let's delete nodes under 'tieng-viet' subject
  const { data: subDash } = await supabase.from('universal_subjects').select('id').eq('slug', 'tieng-viet').maybeSingle();
  if (subDash) {
    const { data: sourcesDash } = await supabase.from('content_sources').select('id').eq('subject_id', subDash.id);
    if (sourcesDash && sourcesDash.length > 0) {
      const srcIds = sourcesDash.map(s => s.id);
      
      const { data: nodesDash } = await supabase.from('curriculum_nodes').select('id').in('source_id', srcIds);
      if (nodesDash && nodesDash.length > 0) {
        const nodeIds = nodesDash.map(n => n.id);
        // Find exercise sets referencing these nodes
        const { data: exSets } = await supabase.from('exercise_sets').select('id').filter('metadata->node_id', 'in', `(${nodeIds.join(',')})`);
        if (exSets && exSets.length > 0) {
          const exSetIds = exSets.map(e => e.id);
          await supabase.from('exercise_questions').delete().in('set_id', exSetIds);
          await supabase.from('exercise_sets').delete().in('id', exSetIds);
        }
        await supabase.from('curriculum_nodes').delete().in('id', nodeIds);
      }
      await supabase.from('content_sources').delete().in('id', srcIds);
    }

    // Delete question_bank referencing 'tieng-viet'
    const { data: qBanks } = await supabase.from('question_bank').delete().eq('subject_slug', 'tieng-viet').select('id');
    console.log(`Deleted question_bank items count: ${qBanks ? qBanks.length : 0}`);

    // Delete the subject "tieng-viet" itself
    console.log("Deleting subject 'tieng-viet'...");
    const { data: delSub, error: errSub } = await supabase
      .from('universal_subjects')
      .delete()
      .eq('id', subDash.id)
      .select();
    if (errSub) {
      console.error("Error deleting subject 'tieng-viet':", errSub);
    } else {
      console.log("Deleted subject 'tieng-viet':", delSub);
    }
  }

  console.log("=== Cleanup Completed! ===");
}

clean().catch(console.error);
