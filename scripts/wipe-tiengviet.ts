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

async function wipeVietnameseData() {
  console.log("=== WIPING ALL VIETNAMESE 3 DATA ===");

  // 1. Find the subject 'tieng_viet' (and 'tieng-viet' just in case)
  const { data: subjects } = await supabase
    .from('universal_subjects')
    .select('id, slug')
    .in('slug', ['tieng_viet', 'tieng-viet']);

  if (!subjects || subjects.length === 0) {
    console.log("No Tiếng Việt subjects found. Nothing to clean.");
    return;
  }

  const subjectIds = subjects.map(s => s.id);
  const subjectSlugs = subjects.map(s => s.slug);

  console.log(`Found subjects:`, subjects);

  // 2. Delete question_bank questions belonging to these subjects
  console.log(`Deleting questions from question_bank for subject slugs: ${subjectSlugs}...`);
  const { data: deletedQuestions, error: errQ } = await supabase
    .from('question_bank')
    .delete()
    .in('subject_slug', subjectSlugs)
    .select('id');
  if (errQ) console.error("Error deleting question_bank:", errQ);
  else console.log(`Deleted ${deletedQuestions?.length || 0} questions.`);

  // 3. Delete assessment_collections and nested exams/exam_questions
  console.log(`Deleting assessment_collections for subject slugs: ${subjectSlugs}...`);
  const { data: cols } = await supabase
    .from('assessment_collections')
    .select('id')
    .in('subject_slug', subjectSlugs);

  if (cols && cols.length > 0) {
    const colIds = cols.map(c => c.id);
    const { data: exams } = await supabase.from('exams').select('id').in('collection_id', colIds);
    if (exams && exams.length > 0) {
      const examIds = exams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', examIds);
      await supabase.from('exams').delete().in('id', examIds);
    }
    const { error: errCol } = await supabase.from('assessment_collections').delete().in('id', colIds);
    if (errCol) console.error("Error deleting assessment collections:", errCol);
    else console.log(`Deleted ${colIds.length} collections and their exams.`);
  }

  // 4. Find all content_sources referencing the subject IDs
  const { data: sources } = await supabase
    .from('content_sources')
    .select('id, slug')
    .in('subject_id', subjectIds);

  if (sources && sources.length > 0) {
    const sourceIds = sources.map(s => s.id);
    console.log(`Found content sources to wipe curriculum nodes for:`, sources);

    // Delete curriculum_nodes
    // Because parent_id points to other nodes, we might need to delete in order of depth (leaves first)
    // Let's delete nodes in order of descending depth
    for (let depth = 4; depth >= 0; depth--) {
      const { data: deletedNodes, error: errNodes } = await supabase
        .from('curriculum_nodes')
        .delete()
        .in('source_id', sourceIds)
        .eq('depth', depth)
        .select('id, title');
      if (errNodes) {
        console.error(`Error deleting nodes at depth ${depth}:`, errNodes);
      } else if (deletedNodes && deletedNodes.length > 0) {
        console.log(`Deleted ${deletedNodes.length} nodes at depth ${depth}`);
      }
    }

    // Now delete content_sources themselves
    const { error: errSourceDel } = await supabase
      .from('content_sources')
      .delete()
      .in('id', sourceIds);
    if (errSourceDel) console.error("Error deleting content sources:", errSourceDel);
    else console.log("Deleted content sources.");
  }

  // 5. Delete from curriculum_units if there are any referencing the subject slugs
  console.log("Deleting curriculum_units...");
  const { data: delUnits } = await supabase
    .from('curriculum_units')
    .delete()
    .in('subject', subjectSlugs)
    .select('id');
  console.log(`Deleted ${delUnits?.length || 0} curriculum_units.`);

  // 6. Delete concepts referencing the content sources or having tv3 slug patterns
  console.log("Deleting concepts related to tv3...");
  const { data: delConcepts, error: errConcepts } = await supabase
    .from('concepts')
    .delete()
    .or('slug.like.%tv3%,slug.eq.chu_diem_1,slug.eq.chu_diem_2,slug.eq.chu_diem_3,slug.eq.chu_diem_4')
    .select('id, slug');
  if (errConcepts) console.error("Error deleting concepts:", errConcepts);
  else console.log(`Deleted ${delConcepts?.length || 0} concepts:`, delConcepts?.map(c => c.slug));

  // 7. Delete the subjects themselves
  console.log("Deleting subjects...");
  const { error: errSubjDel } = await supabase
    .from('universal_subjects')
    .delete()
    .in('id', subjectIds);
  if (errSubjDel) console.error("Error deleting subjects:", errSubjDel);
  else console.log("Deleted subjects.");

  console.log("=== WIPE COMPLETED! ===");
}

wipeVietnameseData().catch(console.error);
