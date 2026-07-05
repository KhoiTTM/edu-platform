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

async function check() {
  const { data: sources } = await supabase.from('content_sources').select('*');
  const { data: nodes } = await supabase.from('curriculum_nodes').select('id, title, slug, type, source_id, sort_key').eq('type', 'unit');
  
  console.log("Sources:");
  console.log(JSON.stringify(sources, null, 2));

  console.log("Nodes mapped by source:");
  if (sources && nodes) {
    sources.forEach(s => {
      console.log(`Source: ${s.title} (${s.id})`);
      const sNodes = nodes.filter(n => n.source_id === s.id);
      sNodes.forEach(n => console.log(`  - [${n.slug}] ${n.title}`));
    });
  }
}
check();
