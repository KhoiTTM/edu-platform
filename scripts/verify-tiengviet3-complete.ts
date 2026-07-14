import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  const { data: nodes } = await supabase
    .from('curriculum_nodes')
    .select('slug, title, metadata')
    .eq('source_id', source!.id)
    .eq('type', 'lesson')
    .order('slug');

  let withContent = 0;
  let withoutContent = 0;

  for (const n of nodes || []) {
    const hasTutorial = !!n.metadata?.grammar_tutorial;
    const hasConcept = !!n.metadata?.concept_id;
    let qCount = 0;
    if (n.metadata?.concept_id) {
      const { count } = await supabase.from('question_bank').select('id', { count: 'exact', head: true }).eq('concept_id', n.metadata.concept_id);
      qCount = count || 0;
    }
    const status = hasTutorial && hasConcept && qCount > 0 ? '✅' : '❌';
    if (status === '✅') withContent++; else withoutContent++;
    console.log(`${status} ${n.slug}: ${n.title} — tutorial=${hasTutorial}, concept_id=${hasConcept}, questions=${qCount}`);
  }

  console.log(`\nTổng: ${withContent}/${(nodes || []).length} bài có đầy đủ nội dung. ${withoutContent} bài còn thiếu.`);
}

main().catch(console.error);
