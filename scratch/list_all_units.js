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

async function listUnits() {
  const { data: nodes, error } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type, parent_id, sort_key, path, metadata')
    .order('sort_key', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Found ${nodes.length} nodes:`);
  nodes.forEach(n => {
    console.log(`- ${n.title} (Slug: ${n.slug}, Type: ${n.type}, ParentID: ${n.parent_id}, SortKey: ${n.sort_key}, Path: ${n.path})`);
  });
}

listUnits();
