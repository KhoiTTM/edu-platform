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
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    envConfig[match[1]] = value;
  }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkReading() {
  const { data: source } = await supabase
    .from('content_sources')
    .select('*')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  if (!source) {
    console.log('Source mindset-foundation not found');
    return;
  }
  console.log('Source ID:', source.id);

  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('*')
    .eq('source_id', source.id)
    .order('sort_key', { ascending: true });

  console.log('Total nodes:', nodes.length);
  nodes.forEach(n => {
    console.log(`- Title: "${n.title}", Slug: "${n.slug}", Type: "${n.type}", SkillFocus: "${n.metadata?.skill_focus}", PageHint: "${n.metadata?.page_hint}"`);
  });
}

checkReading();
