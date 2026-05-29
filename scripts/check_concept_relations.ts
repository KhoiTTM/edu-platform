import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConcepts() {
  const { data: concepts, error } = await supabase
    .from('concepts')
    .select(`
      id,
      title,
      source_id,
      content_sources (
        id,
        slug,
        subject_id,
        universal_subjects (
          slug
        )
      )
    `)
    .limit(5);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Concepts:', JSON.stringify(concepts, null, 2));
  }
}

checkConcepts();
