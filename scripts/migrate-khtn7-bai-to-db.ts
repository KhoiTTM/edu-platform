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

const SUBJECT_SLUG = 'khtn';
const SOURCE_SLUG = 'khtn-7-ket-noi'; // reuse existing content_source
const GRADE = 7;

const LESSON_TITLES: Record<number, string> = {
  1: "Bài 1: Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
  2: "Bài 2: Nguyên tử", 3: "Bài 3: Nguyên tố hoá học",
  4: "Bài 4: Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
  5: "Bài 5: Phân tử - Đơn chất - Hợp chất", 6: "Bài 6: Giới thiệu về liên kết hoá học",
  7: "Bài 7: Hoá trị và công thức hoá học", 8: "Bài 8: Tốc độ chuyển động",
  9: "Bài 9: Đo tốc độ", 10: "Bài 10: Đồ thị quãng đường – thời gian",
  11: "Bài 11: Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông",
  12: "Bài 12: Sóng âm", 13: "Bài 13: Độ to và độ cao của âm",
  14: "Bài 14: Phản xạ âm, chống ô nhiễm tiếng ồn",
  15: "Bài 15: Năng lượng ánh sáng. Tia sáng, vùng tối",
  16: "Bài 16: Sự phản xạ ánh sáng", 17: "Bài 17: Ảnh của vật qua gương phẳng",
  18: "Bài 18: Nam châm", 19: "Bài 19: Từ trường",
  20: "Bài 20: Chế tạo nam châm điện đơn giản",
  21: "Bài 21: Khái quát về trao đổi chất và chuyển hoá năng lượng",
  22: "Bài 22: Quang hợp ở thực vật", 23: "Bài 23: Một số yếu tố ảnh hưởng đến quang hợp",
  24: "Bài 24: Thực hành: Chứng minh quang hợp ở cây xanh",
  25: "Bài 25: Hô hấp tế bào", 26: "Bài 26: Một số yếu tố ảnh hưởng đến hô hấp tế bào",
  27: "Bài 27: Thực hành: Hô hấp ở thực vật", 28: "Bài 28: Trao đổi khí ở sinh vật",
  29: "Bài 29: Vai trò của nước và chất dinh dưỡng đối với sinh vật",
  30: "Bài 30: Trao đổi nước và chất dinh dưỡng ở thực vật",
  31: "Bài 31: Trao đổi nước và chất dinh dưỡng ở động vật",
  32: "Bài 32: Thực hành: Chứng minh thân vận chuyển nước và lá thoát hơi nước",
  33: "Bài 33: Cảm ứng ở sinh vật và tập tính ở động vật",
  34: "Bài 34: Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn",
  35: "Bài 35: Thực hành: Cảm ứng ở sinh vật",
  36: "Bài 36: Khái quát về sinh trưởng và phát triển ở sinh vật",
  37: "Bài 37: Ứng dụng sinh trưởng và phát triển ở sinh vật vào thực tiễn",
  38: "Bài 38: Thực hành: Quan sát, mô tả sự sinh trưởng và phát triển ở một số sinh vật",
  39: "Bài 39: Sinh sản vô tính ở sinh vật", 40: "Bài 40: Sinh sản hữu tính ở sinh vật",
  41: "Bài 41: Một số yếu tố ảnh hưởng và điều hoà, điều khiển sinh sản ở sinh vật",
  42: "Bài 42: Cơ thể sinh vật là một thể thống nhất",
};

const baiArg = process.argv[2];
if (!baiArg || Number.isNaN(Number(baiArg))) {
  console.error('Usage: npx tsx scripts/migrate-khtn7-bai-to-db.ts <baiNumber>');
  process.exit(1);
}
const BAI_NUM = Number(baiArg);

async function migrate() {
  console.log(`=== Migrate KHTN 7 Bai ${BAI_NUM} to Supabase ===\n`);

  const allQuestions = JSON.parse(
    fs.readFileSync(path.join('content', 'workbooks', 'khtn7-questions.json'), 'utf-8')
  );
  const questions = allQuestions.filter((q: any) => q.bai === BAI_NUM).sort((a: any, b: any) => a.cau - b.cau);
  if (questions.length === 0) {
    console.error('ABORT: no questions found for bai', BAI_NUM);
    return;
  }

  const { data: subject, error: subjErr } = await supabase
    .from('universal_subjects').select('id').eq('slug', SUBJECT_SLUG).single();
  if (subjErr || !subject) { console.error('ABORT: subject not found', subjErr); return; }

  let { data: source } = await supabase.from('content_sources').select('id').eq('slug', SOURCE_SLUG).single();
  if (!source) { console.error('ABORT: content_source not found', SOURCE_SLUG); return; }
  console.log('Using content_source:', source.id);

  const conceptSlug = `khtn7-sbt-bai-${BAI_NUM}`;
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

  const rows = questions.map((q: any) => {
    if (q.type === 'multiple_choice') {
      const letterIdx = q.answer ? q.answer.trim().toUpperCase().charCodeAt(0) - 65 : -1;
      return {
        concept_id: concept!.id,
        type: 'multiple_choice',
        difficulty: 1.0,
        source: 'handcrafted',
        grade: GRADE,
        metadata_json: {
          question: q.stem,
          options: q.options,
          correctOption: letterIdx >= 0 && q.options?.[letterIdx] ? q.options[letterIdx] : undefined,
          exercise_id: q.id,
          question_num: q.cau,
        },
      };
    }
    // essay
    return {
      concept_id: concept!.id,
      type: 'essay',
      difficulty: 1.0,
      source: 'handcrafted',
      grade: GRADE,
      metadata_json: {
        question: q.stem,
        explanation: q.answer || undefined,
        exercise_id: q.id,
        question_num: q.cau,
        free_response: true,
      },
    };
  });

  const { data: inserted, error: qbErr } = await supabase.from('question_bank').insert(rows).select('id');
  if (qbErr || !inserted) { console.error('ABORT: failed to insert question_bank rows', qbErr); return; }
  console.log(`Inserted ${inserted.length} question_bank rows.`);

  const examTitle = buildExamTitle({
    subjectLabel: 'KHTN 7',
    group: 'sbt',
    position: LESSON_TITLES[BAI_NUM] || `Bài ${BAI_NUM}`,
  });

  const { data: collection, error: colErr } = await supabase
    .from('assessment_collections')
    .insert({
      title: examTitle,
      subject_slug: SUBJECT_SLUG,
      grade: GRADE,
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
