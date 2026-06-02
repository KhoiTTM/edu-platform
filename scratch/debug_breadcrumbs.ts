import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: nodeData } = await supabase
    .from("curriculum_nodes")
    .select("id, title, slug, path, source_id")
    .eq("slug", "bai-1-tap-hop-cac-so-huu-ti")
    .single();

  if (nodeData) {
    console.log("Node:", nodeData);
    const pathSegments = nodeData.path ? nodeData.path.split('.') : [];
    const ancestorPaths = pathSegments.map((_seg: string, idx: number) => pathSegments.slice(0, idx + 1).join('.'));

    const { data: bcNodes } = await supabase
      .from("curriculum_nodes")
      .select("title, slug, path, depth")
      .eq("source_id", nodeData.source_id)
      .in("path", ancestorPaths)
      .order("depth", { ascending: true });

    console.log("Breadcrumbs:", bcNodes);
  }
}

check().catch(console.error);
