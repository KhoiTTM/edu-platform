import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kfqeumtbatgjdlghiuox.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmcWV1bXRiYXRnamRsZ2hpdW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5NDQ0NiwiZXhwIjoyMDk0MzcwNDQ2fQ.edht5oDEj0IEWbxJUWXdzi0LlcSeHT3sZfiJK6WctQg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('question_bank').select('*').limit(1);
  if (error) {
    console.error('Error fetching question_bank:', error.message);
  } else {
    console.log('Success! question_bank exists. Data:', data);
  }
}

test();
