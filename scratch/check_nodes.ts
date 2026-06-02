import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function check() {
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  if (!source) {
    console.log("Source mindset-foundation not found");
    return;
  }

  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type, sort_key, parent_id, metadata')
    .eq('source_id', source.id)
    .order('sort_key', { ascending: true });

  console.log(`Found ${nodes?.length} nodes:`);
  nodes?.forEach(n => {
    console.log(`- type=${n.type} | sort_key=${n.sort_key} | slug=${n.slug} | title=${n.title} | metadata.skill_focus=${n.metadata?.skill_focus}`);
  });
}

check();
