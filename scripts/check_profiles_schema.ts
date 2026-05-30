import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking columns for table 'profiles'...");
  const { data, error } = await supabase.rpc('inspect_table_columns', { table_name: 'profiles' });
  
  // If the RPC doesn't exist, we'll try a simple select
  if (error) {
    console.log("RPC 'inspect_table_columns' failed, trying direct query...");
    const { data: profile, error: selectError } = await supabase.from('profiles').select('*').limit(1);
    if (selectError) {
      console.error("Select error:", selectError);
    } else {
      console.log("Columns found in 'profiles' record:", Object.keys(profile[0] || {}));
    }
  } else {
    console.log("Columns:", data);
  }
}

checkSchema();
