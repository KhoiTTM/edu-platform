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
  console.log('Querying KHTN 7 source ID...');
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'khtn-7-ket-noi')
    .single();

  if (!source) {
    console.log('KHTN 7 content source not found');
    return;
  }

  console.log('Querying curriculum nodes for KHTN 7...');
  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, type')
    .eq('source_id', source.id);

  if (!nodes || nodes.length === 0) {
    console.log('No curriculum nodes found for KHTN 7');
    return;
  }

  const nodeIds = nodes.map(n => n.id);

  console.log('Querying exercise_sets linked to KHTN 7 nodes...');
  const { data: sets } = await supabase
    .from('exercise_sets')
    .select('*');

  const khtnSets = sets?.filter(s => s.metadata && nodeIds.includes(s.metadata.node_id));

  console.log(`Found ${khtnSets?.length || 0} exercise sets for KHTN 7:`);
  khtnSets?.forEach(s => {
    console.log(`- Set ID: ${s.id}, Title: ${s.title}, Type: ${s.type}`);
  });
}

run();
