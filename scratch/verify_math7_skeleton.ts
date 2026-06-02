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

async function verify() {
  console.log("--- VERIFYING GRADE 7 MATH SKELETON ---");

  // Check content source
  const { data: source } = await supabase
    .from('content_sources')
    .select('id, slug, name')
    .eq('slug', 'toan-7-ket-noi')
    .maybeSingle();

  if (!source) {
    console.error("❌ Content source 'toan-7-ket-noi' NOT found!");
    return;
  }
  console.log(`✅ Found Content Source: ${source.name} (ID: ${source.id})`);

  // Check root node
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type, path')
    .eq('source_id', source.id)
    .eq('slug', 'lop-7')
    .maybeSingle();

  if (!rootNode) {
    console.error("❌ Root course node 'lop-7' NOT found!");
    return;
  }
  console.log(`✅ Found Root Course Node: ${rootNode.title} (Path: ${rootNode.path})`);

  // Check child nodes
  const { data: childNodes } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, type, parent_id, path')
    .eq('source_id', source.id)
    .neq('type', 'course')
    .order('path', { ascending: true });

  if (!childNodes || childNodes.length === 0) {
    console.error("❌ No child nodes found!");
    return;
  }

  console.log(`✅ Found ${childNodes.length} curriculum nodes for Grade 7 Math:`);
  childNodes.forEach(node => {
    console.log(` - [${node.type.toUpperCase()}] ${node.title} (Slug: ${node.slug})`);
  });

  // Check exercise sets
  const { data: exSets } = await supabase
    .from('exercise_sets')
    .select('id, title, type, metadata');

  const math7ExSets = exSets?.filter(es => {
    const node = childNodes.find(n => n.id === (es.metadata as any)?.node_id);
    return !!node;
  });

  console.log(`✅ Found ${math7ExSets?.length} associated exercise sets for Grade 7 Math.`);
}

verify();
