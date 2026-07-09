import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
const envConfig = fs.readFileSync(envFile, 'utf-8')
  .split('\n')
  .filter(line => line.includes('='))
  .reduce((acc: any, line) => {
    const [key, ...val] = line.split('=');
    acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
    return acc;
  }, {});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
  console.log("Starting cleanup of Tieng Anh 7 (subject_slug='tieng-anh-7') data...");

  const { data: cols, error: colErr } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'tieng-anh-7');
  if (colErr) throw colErr;
  const colIds = (cols || []).map(c => c.id);
  console.log(`Found ${colIds.length} collections.`);
  if (colIds.length === 0) {
    console.log("Nothing to clean up.");
    return;
  }

  const { data: exams, error: examErr } = await supabase
    .from('exams')
    .select('id')
    .in('collection_id', colIds);
  if (examErr) throw examErr;
  const examIds = (exams || []).map(e => e.id);
  console.log(`Found ${examIds.length} exams.`);

  const { data: eqs, error: eqErr } = await supabase
    .from('exam_questions')
    .select('id, question_bank_id')
    .in('exam_id', examIds);
  if (eqErr) throw eqErr;
  const qbIds = Array.from(new Set((eqs || []).map(e => e.question_bank_id).filter(Boolean)));
  console.log(`Found ${qbIds.length} unique question_bank rows.`);

  // Safety check: ensure none of these question_bank rows are referenced by exams outside this set
  if (qbIds.length > 0) {
    const { data: otherRefs, error: refErr } = await supabase
      .from('exam_questions')
      .select('id')
      .in('question_bank_id', qbIds)
      .not('exam_id', 'in', `(${examIds.join(',')})`);
    if (refErr) throw refErr;
    if (otherRefs && otherRefs.length > 0) {
      console.error(`ABORT: ${otherRefs.length} exam_questions from OTHER exams reference these question_bank rows. Not safe to delete question_bank.`);
      return;
    }
  }

  // 1. Delete question_bank rows (cascades to exam_questions via ON DELETE CASCADE)
  if (qbIds.length > 0) {
    for (let i = 0; i < qbIds.length; i += 100) {
      const chunk = qbIds.slice(i, i + 100);
      const { error } = await supabase.from('question_bank').delete().in('id', chunk);
      if (error) console.error("Error deleting question_bank chunk:", error);
    }
    console.log(`Deleted ${qbIds.length} question_bank rows (exam_questions cascaded).`);
  }

  // 2. Delete assessment_collections (cascades to exams, and any remaining exam_questions)
  const { error: delColErr } = await supabase.from('assessment_collections').delete().in('id', colIds);
  if (delColErr) {
    console.error("Error deleting collections:", delColErr);
  } else {
    console.log(`Deleted ${colIds.length} collections (exams cascaded).`);
  }

  // 3. Verify
  const { count: remainingCols } = await supabase
    .from('assessment_collections')
    .select('id', { count: 'exact', head: true })
    .eq('subject_slug', 'tieng-anh-7');
  const { count: remainingQb } = qbIds.length > 0
    ? await supabase.from('question_bank').select('id', { count: 'exact', head: true }).in('id', qbIds)
    : { count: 0 } as any;
  console.log(`Verification: remaining collections=${remainingCols}, remaining question_bank=${remainingQb}`);

  console.log("Cleanup complete!");
}

cleanup().catch(console.error);
