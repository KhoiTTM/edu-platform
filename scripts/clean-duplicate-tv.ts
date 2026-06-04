import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = envFile.split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    acc[match[1]] = match[2];
  }
  return acc;
}, {} as Record<string, string>);

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'] || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'] || envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, source_id')
    .eq('type', 'subject');
    
  if (error) {
    console.error(error);
    return;
  }
  
  const tvSubjects = data.filter(s => s.title === 'Tiếng Việt' || s.slug.includes('tieng_viet'));
  console.log('TV Subjects:', tvSubjects);
  
  const tv3Subjects = tvSubjects.filter(s => s.source_id === 'minhkhoi/tieng_viet_3' || s.slug === 'tieng_viet' || s.title === 'Tiếng Việt');
  
  console.log('TV3 Subjects:', tv3Subjects);

  if (tv3Subjects.length > 1) {
    // Keep the one that has source_id minhkhoi/tieng_viet_3 or the first one
    const keep = tv3Subjects.find(s => s.source_id === 'minhkhoi/tieng_viet_3') || tv3Subjects[0];
    const toDelete = tv3Subjects.filter(s => s.id !== keep.id);
    
    for (const s of toDelete) {
      console.log('Deleting duplicate:', s.id, s.title, s.slug);
      await supabase.from('curriculum_nodes').delete().eq('id', s.id);
    }
  } else {
    console.log('No duplicates found.');
  }
}

run();
