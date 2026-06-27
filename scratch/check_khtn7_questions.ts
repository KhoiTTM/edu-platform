import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('Querying question_bank for KHTN 7 questions...');
  
  // We can query question_bank where grade is 7 and concept_id links to KHTN concepts
  // Let's first query KHTN 7 concepts
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'khtn-7-ket-noi')
    .single();

  if (!source) {
    console.log('KHTN 7 content source not found');
    return;
  }

  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('id')
    .eq('source_id', source.id);

  if (!nodes || nodes.length === 0) {
    console.log('No curriculum nodes found for KHTN 7');
    return;
  }

  const nodeIds = nodes.map(n => n.id);

  const { data: concepts } = await supabase
    .from('concepts')
    .select('id, slug, title')
    .in('source_id', nodeIds); // assuming concepts.source_id can be node.id? Or source.id?
  
  // Wait, let's see concepts where slug contains khtn
  const { data: allConcepts } = await supabase
    .from('concepts')
    .select('id, slug, title');

  const khtnConcepts = allConcepts?.filter(c => c.slug?.includes('khtn') || c.title?.toLowerCase().includes('khoa học'));
  console.log('KHTN Concepts found:', khtnConcepts?.length);

  if (khtnConcepts && khtnConcepts.length > 0) {
    const conceptIds = khtnConcepts.map(c => c.id);
    const { data: questions } = await supabase
      .from('question_bank')
      .select('id, concept_id, type, metadata_json')
      .in('concept_id', conceptIds);

    console.log(`Found ${questions?.length || 0} questions in question_bank for KHTN 7.`);
    if (questions && questions.length > 0) {
      console.log('Sample question:', JSON.stringify(questions[0], null, 2));
    }
  }
}

run();
