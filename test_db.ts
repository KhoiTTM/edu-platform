import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const nodeId = 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030101'; // old UUID from lessons table

  try {
    console.log("Fetching curriculum_concepts for lesson_id:", nodeId);
    const { data: lessonConcepts, error: err1 } = await supabase
        .from('curriculum_concepts')
        .select('id')
        .eq('lesson_id', nodeId);

    if (err1) throw err1;
    console.log("lessonConcepts:", lessonConcepts);

    let conceptIds = lessonConcepts?.map(c => c.id) || [];

    if (conceptIds.length === 0) {
        console.log("Fallback triggering...");
        const { data: fallback, error: err2 } = await supabase
            .from('curriculum_concepts')
            .select('id')
            .limit(5);
        if (err2) throw err2;
        conceptIds = fallback?.map(c => c.id) || [];
    }

    console.log("Final conceptIds:", conceptIds);

    console.log("Fetching from question_bank...");
    const { data: questions, error: err3 } = await supabase
        .from('question_bank')
        .select('*')
        .in('concept_id', conceptIds)
        .limit(20);

    if (err3) throw err3;
    console.log("Found questions:", questions.length);

  } catch (e) {
    console.error("DB Error:", e);
  }
}

test();
