import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade, status, volume, sequence_number');

  console.log("All collections in DB:");
  collections?.forEach(c => {
    if (c.grade === 7 || c.subject_slug === 'toan') {
      console.log(`- ID: ${c.id} | Title: ${c.title} | Subject: ${c.subject_slug} | Grade: ${c.grade}`);
    }
  });
}

check().catch(console.error);
