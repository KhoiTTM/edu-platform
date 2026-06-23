const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const envPath = path.join(__dirname, '..', '.env.local');
const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
const envConfig = {};
envLines.forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    envConfig[match[1]] = value;
  }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  if (!source) return;

  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('title, slug, type, parent_id, sort_key')
    .eq('source_id', source.id)
    .order('sort_key', { ascending: true });

  const ieltsUnits = nodes.filter(n => n.type === 'unit' && n.parent_id && n.parent_id !== 'a30d9fb8-5ea9-42b7-bd69-f19b1612ad4f');
  console.log(JSON.stringify(ieltsUnits, null, 2));
}

run();
