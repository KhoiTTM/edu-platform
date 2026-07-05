import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
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

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🚀 Starting KHTN 7 Exercise Sets Seeding (Ch1 & Ch2)...");

  // 1. Fetch KHTN 7 Content Source ID
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'khtn-7-ket-noi')
    .single();

  if (sourceError || !source) {
    console.error("❌ Could not find content source 'khtn-7-ket-noi'. Make sure curriculum is seeded.");
    process.exit(1);
  }

  // 2. Fetch Nodes for KHTN 7
  const { data: nodes, error: nodeError } = await supabase
    .from('curriculum_nodes')
    .select('id, title, type, path')
    .eq('source_id', source.id);

  if (nodeError) {
    console.error("❌ Error fetching curriculum nodes:", nodeError);
    process.exit(1);
  }

  // Filter in memory for Chapter 1 and Chapter 2
  const filteredNodes = nodes.filter(node => 
    node.path && (node.path.includes('.chuong_1') || node.path.includes('.chuong_2'))
  );

  console.log(`Found ${filteredNodes.length} nodes in Chapter 1 & 2.`);

  // 3. Upsert Exercise Sets
  for (const node of filteredNodes) {
    if (node.type !== 'lesson' && node.type !== 'exam') continue;

    const title = node.type === 'lesson' ? `Luyện tập: ${node.title}` : `Kiểm tra: ${node.title}`;
    const type = node.type === 'lesson' ? 'practice' : 'exam';

    // Instead of upserting which requires a unique constraint,
    // let's check if it exists first
    const { data: existing } = await supabase
      .from('exercise_sets')
      .select('id')
      .eq('title', title)
      .eq('type', type)
      .single();

    if (existing) {
      console.log(`✅ Already exists: ${title}`);
      continue;
    }

    const { error: insertError } = await supabase
      .from('exercise_sets')
      .insert({
        title,
        type,
        metadata: { node_id: node.id }
      });

    if (insertError) {
      console.error(`❌ Error inserting exercise set for node: ${node.title}`, insertError);
    } else {
      console.log(`✅ Seeded ${type}: ${title}`);
    }
  }

  console.log("\n🎉 KHTN 7 Exercise Sets Seeding Complete!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
