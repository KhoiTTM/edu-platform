import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log("Checking universal_subjects...");
  const { data: subs } = await supabase.from('universal_subjects').select('slug, name_vi');
  console.log("Subjects:", subs);

  console.log("\nChecking curriculum_units...");
  const { data: units, error: unitsError } = await supabase.from('curriculum_units').select('*').limit(5);
  if (unitsError) {
    console.error("Error fetching curriculum_units:", unitsError);
  } else {
    console.log("Units (first 5):", units);
  }

  console.log("\nChecking curriculum_nodes...");
  const { data: nodes } = await supabase.from('curriculum_nodes').select('slug, type, metadata').limit(5);
  console.log("Nodes (first 5):", nodes);
}

checkData();
