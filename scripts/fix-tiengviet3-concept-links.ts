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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  console.log("🔧 Vá liên kết concept_id vào metadata của các bài đã seed...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source not found!");
    return;
  }

  for (let i = 1; i <= 5; i++) {
    const slug = `bai-${i}`;
    const conceptSlug = `concept-tv3-bai_${i}`;

    const { data: node } = await supabase
      .from('curriculum_nodes')
      .select('id, metadata')
      .eq('source_id', source.id)
      .eq('slug', slug)
      .single();

    const { data: concept } = await supabase
      .from('concepts')
      .select('id')
      .eq('slug', conceptSlug)
      .single();

    if (!node || !concept) {
      console.log(`⚠️  Bỏ qua ${slug}: node hoặc concept không tồn tại`);
      continue;
    }

    const newMetadata = { ...(node.metadata || {}), concept_id: concept.id };
    await supabase.from('curriculum_nodes').update({ metadata: newMetadata }).eq('id', node.id);
    console.log(`✅ ${slug}: metadata.concept_id = ${concept.id}`);
  }

  console.log("\n🎉 Hoàn tất vá liên kết concept_id!");
}

main().catch(console.error);
