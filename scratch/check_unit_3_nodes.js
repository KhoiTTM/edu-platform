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

async function checkUnit3() {
  const { data: unitNode } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug')
    .eq('slug', 'mindset-unit-3')
    .maybeSingle();

  if (!unitNode) {
    console.log("mindset-unit-3 not found!");
    return;
  }
  console.log("Unit 3 Node:", unitNode);

  const { data: childNodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type, sort_key, metadata')
    .eq('parent_id', unitNode.id)
    .order('sort_key', { ascending: true });

  console.log("Child Nodes of Unit 3:");
  console.log(JSON.stringify(childNodes, null, 2));
}

checkUnit3();
