import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  // 1. Fetch Subject Math
  const { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'toan')
    .single();

  console.log("Subject:", subject);

  // 2. Fetch assessment collections
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title, status, grade, units, subject_slug');

  console.log("All Collections:", collections);

  if (collections && collections.length > 0) {
    const colIds = collections.map(c => c.id);
    const { data: exams } = await supabase
      .from('exams')
      .select('id, title, collection_id, exam_number')
      .in('collection_id', colIds);

    console.log("Exams in assessment_collections:", exams);
  }

  // 3. Fetch exercise sets linked to the lesson node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, slug, title')
    .eq('slug', 'bai-1-tap-hop-cac-so-huu-ti')
    .single();

  console.log("Lesson Node:", lessonNode);

  if (lessonNode) {
    const { data: exSets } = await supabase
      .from('exercise_sets')
      .select('id, title, metadata')
      .eq('metadata->>node_id', lessonNode.id);
    
    console.log("Exercise Sets linked to node_id:", exSets);
  }
}

check().catch(console.error);
