import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: nodeData } = await supabase
    .from("curriculum_nodes")
    .select("id, title, slug, type")
    .eq("slug", "bai-1")
    .single();

  console.log("Node Data:", nodeData);

  if (nodeData) {
    const { data: exSetList } = await supabase
      .from("exercise_sets")
      .select("id, title")
      .contains("metadata", { node_id: nodeData.id })
      .order("created_at", { ascending: false });

    console.log("Found exercise sets:", exSetList);

    if (exSetList && exSetList.length > 0) {
      const exSet = exSetList[0];
      const { data: qLinks } = await supabase
        .from("exercise_questions")
        .select("question_id, sort_key")
        .eq("set_id", exSet.id);

      console.log(`Questions linked to set ${exSet.title} (${exSet.id}):`, qLinks);

      if (qLinks && qLinks.length > 0) {
        const qIds = qLinks.map(l => l.question_id);
        const { data: qData } = await supabase
          .from("quiz_questions")
          .select("id, question")
          .in("id", qIds);
        console.log("Questions data:", qData);
      }
    }
  }
}

check().catch(console.error);
