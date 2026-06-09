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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const DATA_DIR = path.join(process.cwd(), 'scripts', 'phase4', 'data');

async function seedUnit(unitNum: string) {
  const filePath = path.join(DATA_DIR, `extracted_unit_${unitNum}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`Seeding UNIT ${unitNum} with ${questions.length} questions...`);

  // 1. Find or create concept
  const conceptSlug = `mindset-foundation-unit-${unitNum}`;
  let { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).single();
  
  if (!concept) {
    const { data: newConcept, error } = await supabase.from('concepts').insert({
      slug: conceptSlug,
      title: `Unit ${unitNum} - IELTS Mindset`,
      description: `Bài tập trích xuất từ Unit ${unitNum} sách IELTS Mindset Foundation`
    }).select().single();
    if (error) throw error;
    concept = newConcept;
  }

  // 2. Delete old questions for this concept to avoid duplicates
  await supabase.from('question_bank').delete().eq('concept_id', concept!.id);

  // 3. Insert new questions
  const records = questions.map((q: any) => {
    const { type, ...metadata } = q;
    return {
      subject_slug: "mindset-ielts",
      concept_id: concept!.id,
      type: type,
      difficulty: 2.0,
      metadata_json: metadata,
      source: 'handcrafted',
      status: 'draft',
      grade: 0
    };
  });

  const { data: insertedQuestions, error: insertError } = await supabase.from('question_bank').insert(records).select('id');
  if (insertError) throw insertError;
  console.log(`✅ Inserted ${insertedQuestions.length} questions.`);

  // 4. Create assessment collections (10 questions per exam)
  await supabase.from('assessment_collections').delete().eq('subject_slug', 'mindset-ielts').like('title', `Unit ${unitNum} - Practice%`);

  const questionIds = insertedQuestions.map(q => q.id);
  const CHUNK_SIZE = 10;
  
  for (let i = 0; i < questionIds.length; i += CHUNK_SIZE) {
    const chunk = questionIds.slice(i, i + CHUNK_SIZE);
    const chunkIndex = Math.floor(i / CHUNK_SIZE) + 1;
    
    // Create collection
    const { data: coll, error: collErr } = await supabase.from('assessment_collections').insert({
      subject_slug: 'mindset-ielts',
      title: `Unit ${unitNum} - Practice ${chunkIndex}`,
      grade: 7,
      volume: 1,
      units: [parseInt(unitNum, 10)],
      status: 'published'
    }).select().single();
    if (collErr) throw collErr;

    // Create exam
    const { data: exam, error: examErr } = await supabase.from('exams').insert({
      collection_id: coll.id,
      title: `Đề thi Unit ${unitNum} - Đề ${chunkIndex}`,
      exam_number: chunkIndex,
      total_questions: chunk.length,
      duration_minutes: 20,
      generation_mode: 'handcrafted',
      metadata_json: { unit: parseInt(unitNum, 10) }
    }).select().single();
    if (examErr) throw examErr;

    // Map questions
    const examQuestions = chunk.map((qid, idx) => ({
      exam_id: exam.id,
      question_bank_id: qid,
      order_index: idx
    }));

    const { error: mapErr } = await supabase.from('exam_questions').insert(examQuestions);
    if (mapErr) throw mapErr;
  }

  console.log(`✅ Finished seeding UNIT ${unitNum}. Created ${Math.ceil(questionIds.length / CHUNK_SIZE)} exams.`);
}



seedUnit('06').catch(console.error);
