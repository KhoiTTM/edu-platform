import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  const IELTS_SOURCE_ID = 'f4c8940e-a3f6-43cd-afc6-04a714f5aca4';
  
  // Find nodes in IELTS source that are actually Math nodes
  const { data: wrongIELTSNodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', IELTS_SOURCE_ID)
    .like('slug', 'chu_de_%');
    
  if (wrongIELTSNodes && wrongIELTSNodes.length > 0) {
    const idsToDelete = wrongIELTSNodes.map(n => n.id);
    console.log(`Found ${idsToDelete.length} wrong math nodes in IELTS source.`);
    const { error } = await supabase.from('curriculum_nodes').delete().in('parent_id', idsToDelete);
    await supabase.from('curriculum_nodes').delete().in('id', idsToDelete);
    console.log('Cleaned up IELTS source.');
  }
}
fix();
