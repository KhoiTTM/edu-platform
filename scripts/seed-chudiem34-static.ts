import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

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

async function seed() {
  console.log("Starting static seeding for Vietnamese 3 Theme 3 & 4...");

  const filesToProcess = [
    { file: 'chu_diem_3_exams.json', slug: 'chu_diem_3' },
    { file: 'chu_diem_4_exams.json', slug: 'chu_diem_4' }
  ];

  const sourceId = '0c15a948-5b65-491e-9936-4c894268c778';

  // 1. Ensure Subject exists
  let { data: subjectNode } = await supabase
    .from('curriculum_nodes')
    .select('id')
    .eq('slug', 'tieng_viet')
    .eq('type', 'subject')
    .maybeSingle();

  if (!subjectNode) {
    console.error("Subject Tieng Viet not found. Please run curriculum seed first.");
    return;
  }

  for (const item of filesToProcess) {
    const jsonPath = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', item.file);
    if (!fs.existsSync(jsonPath)) {
        console.warn(`File not found: ${jsonPath}`);
        continue;
    }
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(rawData);

    // 2. Ensure Unit exists
    const unitTitle = data.meta.topic;
    const unitSlug = item.slug;
    
    let { data: unitNode } = await supabase
      .from('curriculum_nodes')
      .select('id')
      .eq('source_id', sourceId)
      .eq('slug', unitSlug)
      .maybeSingle();

    if (!unitNode) {
      console.log(`Creating unit node: ${unitTitle}`);
      const { data: newUnit, error: unitErr } = await supabase.from('curriculum_nodes').insert({
        title: unitTitle,
        slug: unitSlug,
        type: 'unit',
        parent_id: subjectNode.id,
        source_id: sourceId,
        path: `tieng_viet.${unitSlug}`,
        depth: 1,
        metadata: { color: 'text-amber-400', icon: 'Library' }
      }).select().single();
      if (unitErr) throw unitErr;
      unitNode = newUnit;
    }

    let { data: concept } = await supabase.from('concepts').select('id').eq('slug', unitSlug).maybeSingle();
    if (!concept) {
      const { data: newConcept, error: conceptErr } = await supabase.from('concepts').insert({
        title: unitTitle,
        slug: unitSlug
      }).select().single();
      if (conceptErr) throw conceptErr;
      concept = newConcept;
    }

    // 3. Process Exams
    for (const examData of data.exams) {
      console.log(`Processing exam: ${examData.title}`);

      // Create Collection
      let colData: any = {
        title: examData.title,
        subject_slug: 'tieng_viet',
        grade: 3,
        semester: 1,
        status: 'published',
        unit_id: unitNode!.id
      };

      let { data: collection, error: colErr } = await supabase.from('assessment_collections').insert(colData).select().single();

      if (colErr && colErr.message.includes('unit_id')) {
        delete colData.unit_id;
        const res = await supabase.from('assessment_collections').insert(colData).select().single();
        collection = res.data;
        colErr = res.error;
      }

      if (colErr) {
        console.error("Collection err:", colErr);
        continue;
      }

      // Create Exam
      const { data: exam, error: exErr } = await supabase.from('exams').insert({
        collection_id: collection.id,
        exam_number: 1,
        title: `${examData.title} - Bản chính thức`,
        duration_minutes: Math.round((examData.time_limit_seconds || 900) / 60),
        total_questions: examData.total_questions || examData.questions.length,
        generation_mode: 'static',
        metadata_json: { lessons: examData.lessons, unit_id: unitNode!.id }
      }).select().single();

      if (exErr) {
        console.error("Exam err:", exErr);
        continue;
      }

      // Process Questions
      let order_index = 0;
      for (const q of examData.questions) {
        const qContent = { ...q };
        delete qContent.id;
        delete qContent.type;
        delete qContent.skill;
        delete qContent.difficulty;
        delete qContent.points;

        const { data: qb, error: qbErr } = await supabase.from('question_bank').insert({
          subject_slug: 'tieng_viet',
          concept_id: concept!.id,
          source: 'manual_import',
          type: q.type,
          difficulty: q.difficulty === 'hard' ? 3 : q.difficulty === 'medium' ? 2 : 1,
          grade: 3,
          status: 'approved',
          metadata_json: qContent
        }).select().single();

        if (qbErr) {
          console.error("QuestionBank err:", qbErr);
          continue;
        }

        const { error: eqErr } = await supabase.from('exam_questions').insert({
          exam_id: exam.id,
          question_bank_id: qb.id,
          order_index: order_index++,
          points: q.points || 10
        });
        if (eqErr) {
          console.error("ExamQuestions err:", eqErr);
        }
      }

      console.log(`Successfully created ${examData.title} with ${examData.questions.length} questions.`);
    }
  }

  console.log("Seeding complete for Theme 3 & 4!");
}

seed().catch(console.error);
