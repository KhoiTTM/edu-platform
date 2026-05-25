const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kfqeumtbatgjdlghiuox.supabase.co';
const supabaseKey = 'sb_publishable_phast1VydZANyDScmYNj3Q_Qv_ArIWf';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("--- Fetching Profiles ---");
  const { data: profiles, error: err1 } = await supabase.from('profiles').select('*').limit(5);
  console.log("Profiles:", profiles);
  if (err1) console.error("Profiles Error:", err1);

  console.log("\n--- Fetching Lessons ---");
  const { data: lessons, error: err2 } = await supabase.from('lessons').select('*').limit(5);
  console.log("Lessons count:", lessons ? lessons.length : 0);
  console.log("Lessons:", lessons);
  if (err2) console.error("Lessons Error:", err2);

  console.log("\n--- Fetching Subjects ---");
  const { data: subjects, error: err3 } = await supabase.from('subjects').select('*').limit(5);
  console.log("Subjects count:", subjects ? subjects.length : 0);
  console.log("Subjects:", subjects);
  if (err3) console.error("Subjects Error:", err3);
}

run();
