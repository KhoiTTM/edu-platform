import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { buildExamTitle } from '../lib/assessment/buildExamTitle';

const envConfig = fs.readFileSync('.env.local', 'utf-8').split('\n').filter(l => l.includes('=')).reduce((acc: any, line) => {
  const [key, ...val] = line.split('=');
  acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
  return acc;
}, {});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY);

const SUBJECT_SLUG = 'toan';
const SOURCE_SLUG = 'toan-7-ket-noi'; 
const GRADE = 7;
const VOLUME = 2;

const LESSON_TITLES: Record<number, string> = {
  20: "Bài 20: Tỉ lệ thức",
  21: "Bài 21: Tính chất của dãy tỉ số bằng nhau",
  22: "Bài 22: Đại lượng tỉ lệ thuận",
  23: "Bài 23: Đại lượng tỉ lệ nghịch",
  24: "Bài 24: Biểu thức đại số",
  25: "Bài 25: Đa thức một biến",
  26: "Bài 26: Phép cộng và phép trừ đa thức một biến",
  27: "Bài 27: Phép nhân đa thức một biến",
  28: "Bài 28: Phép chia đa thức một biến",
  29: "Bài 29: Làm quen với biến cố",
  30: "Bài 30: Làm quen với xác suất của biến cố",
  31: "Bài 31: Quan hệ giữa góc và cạnh đối diện trong một tam giác",
  32: "Bài 32: Quan hệ giữa đường vuông góc và đường xiên",
  33: "Bài 33: Quan hệ giữa ba cạnh của một tam giác",
  34: "Bài 34: Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác",
  35: "Bài 35: Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác",
  36: "Bài 36: Hình hộp chữ nhật và hình lập phương",
  37: "Bài 37: Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác",
};

const baiArg = process.argv[2];
if (!baiArg || Number.isNaN(Number(baiArg))) {
  console.error('Usage: npx tsx scripts/migrate-toan7-sbt-tap2-to-db.ts <baiNumber>');
  process.exit(1);
}
const BAI_NUM = Number(baiArg);

async function migrate() {
  console.log(`=== Migrate Toán 7 SBT Tập 2 Bài ${BAI_NUM} to Supabase ===\n`);

  let allLessons;
  try {
    allLessons = JSON.parse(
      fs.readFileSync(path.join('content', 'workbooks', 'toan7-sbt-tap2', `bai-${BAI_NUM}.json`), 'utf-8')
    );
  } catch (e) {
    console.error(`ABORT: Cannot read file for bai ${BAI_NUM}`);
    return;
  }
  
  const lessonData = allLessons.find((l: any) => l.bai === BAI_NUM) || allLessons[0];
  if (!lessonData || !lessonData.questions || lessonData.questions.length === 0) {
    console.error('ABORT: no questions found for bai', BAI_NUM);
    return;
  }

  const { data: subject, error: subjErr } = await supabase
    .from('universal_subjects').select('id').eq('slug', SUBJECT_SLUG).single();
  if (subjErr || !subject) { console.error('ABORT: subject not found', subjErr); return; }

  let { data: source } = await supabase.from('content_sources').select('id').eq('slug', SOURCE_SLUG).single();
  if (!source) { console.error('ABORT: content_source not found', SOURCE_SLUG); return; }
  console.log('Using content_source:', source.id);

  const conceptSlug = `toan7-sbt-tap2-bai-${BAI_NUM}`;
  let { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).single();
  if (!concept) {
    const { data: newConcept, error: conceptErr } = await supabase
      .from('concepts')
      .insert({ source_id: source.id, slug: conceptSlug, title: LESSON_TITLES[BAI_NUM] || `Bài ${BAI_NUM}` })
      .select('id').single();
    if (conceptErr || !newConcept) { console.error('ABORT: failed to create concept', conceptErr); return; }
    concept = newConcept;
    console.log('Created concept:', concept.id);
  } else {
    console.log('Found existing concept:', concept.id);
  }

  const { count: existingCount } = await supabase
    .from('question_bank').select('id', { count: 'exact', head: true }).eq('concept_id', concept.id);
  if (existingCount && existingCount > 0) {
    console.error(`ABORT: concept ${conceptSlug} already has ${existingCount} question_bank rows. Delete first to re-run.`);
    return;
  }

  const rows = lessonData.questions.map((q: any) => {
    return {
      concept_id: concept!.id,
      type: q.type,
      difficulty: 1.0,
      source: 'handcrafted',
      grade: GRADE,
      subject_slug: SUBJECT_SLUG,
      metadata_json: {
        question: q.question,
        explanation: q.explanation,
        options: q.options,
        correct_index: q.correct_index,
        exercise_id: q.id,
        tags: q.tags,
      },
    };
  });

  const { data: inserted, error: qbErr } = await supabase.from('question_bank').insert(rows).select('id');
  if (qbErr || !inserted) { console.error('ABORT: failed to insert question_bank rows', qbErr); return; }
  console.log(`Inserted ${inserted.length} question_bank rows.`);

  const examTitle = buildExamTitle({
    subjectLabel: 'Toán 7',
    group: 'sbt',
    position: LESSON_TITLES[BAI_NUM] || `Bài ${BAI_NUM}`,
  });

  const { data: collection, error: colErr } = await supabase
    .from('assessment_collections')
    .insert({
      title: examTitle,
      subject_slug: SUBJECT_SLUG,
      grade: GRADE,
      volume: VOLUME,
      curriculum: 'ket_noi_tri_thuc',
      exam_type: null,
      status: 'published',
      units: [BAI_NUM],
    })
    .select('id').single();
  if (colErr || !collection) { console.error('ABORT: failed to create collection', colErr); return; }
  console.log('Created assessment_collection:', collection.id);

  const { data: exam, error: examErr } = await supabase
    .from('exams')
    .insert({
      collection_id: collection.id,
      exam_number: 1,
      title: examTitle,
      total_questions: inserted.length,
    })
    .select('id').single();
  if (examErr || !exam) { console.error('ABORT: failed to create exam', examErr); return; }
  console.log('Created exam:', exam.id);

  const examQuestions = inserted.map((q, i) => ({ exam_id: exam.id, question_bank_id: q.id, order_index: i }));
  const { error: eqErr } = await supabase.from('exam_questions').insert(examQuestions);
  if (eqErr) { console.error('ABORT: failed to link exam_questions', eqErr); return; }
  console.log(`Linked ${examQuestions.length} exam_questions.`);

  console.log('\n=== Migration complete ===');
  console.log(`Exam ID: ${exam.id}`);
  console.log(`Test URL: /test-assessment?examId=${exam.id}`);
}

migrate().catch(console.error);
