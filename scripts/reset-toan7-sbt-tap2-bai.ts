import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envConfig = fs.readFileSync('.env.local', 'utf-8').split('\n').filter(l => l.includes('=')).reduce((acc: any, line) => {
  const [key, ...val] = line.split('=');
  acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
  return acc;
}, {});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY);

const units = process.argv.slice(2).map(Number);
if (units.length === 0) {
  console.error('Usage: npx tsx scripts/reset-toan7-sbt-tap2-bai.ts <bai1> <bai2> ...');
  process.exit(1);
}

async function reset() {
  for (const unit of units) {
    console.log(`\n=== Resetting Toán 7 Bài ${unit} ===`);
    const conceptSlug = `toan7-sbt-tap2-bai-${unit}`;

    const { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).single();
    if (concept) {
      const { error: qbErr, count } = await supabase.from('question_bank').delete({ count: 'exact' }).eq('concept_id', concept.id);
      console.log(`Deleted ${count ?? 0} question_bank rows (exam_questions cascade).`, qbErr || '');
      const { error: cErr } = await supabase.from('concepts').delete().eq('id', concept.id);
      console.log('Deleted concept.', cErr || '');
    } else {
      console.log('No concept found, nothing to delete for question_bank/concept.');
    }

    const { data: collections } = await supabase
      .from('assessment_collections')
      .select('id, title, units')
      .eq('subject_slug', 'toan')
      .eq('volume', 2)
      .contains('units', [unit]);
    if (collections && collections.length > 0) {
      const ids = collections.map((c) => c.id);
      const { error: colErr, count } = await supabase.from('assessment_collections').delete({ count: 'exact' }).in('id', ids);
      console.log(`Deleted ${count ?? 0} assessment_collections (exams + exam_questions cascade).`, colErr || '');
    } else {
      console.log('No assessment_collections found for this unit.');
    }
  }
  console.log('\nDone.');
}

reset().catch(console.error);
