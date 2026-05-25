const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kfqeumtbatgjdlghiuox.supabase.co';
const supabaseKey = 'sb_publishable_phast1VydZANyDScmYNj3Q_Qv_ArIWf';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: subjects, error } = await supabase
    .from('subjects')
    .select('slug, label_vi');

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Found ${subjects.length} subjects`);
  subjects.forEach(s => {
    console.log(`- ${s.slug}: ${s.label_vi}`);
  });
}

run();
