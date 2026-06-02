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
  console.log("🚀 Seeding Luyện Tập structure for Grade 7 Math...");

  // 1. Fetch Subject Math
  const { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'toan')
    .single();

  if (!subject) {
    console.error("❌ Subject 'toan' not found!");
    process.exit(1);
  }

  // 2. Ensure curriculum_units has Grade 7 entry
  console.log("Ensuring curriculum_units entry for Grade 7...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 7)
    .eq('unit_number', 1)
    .maybeSingle();

  let unitId = '';
  if (existingUnit) {
    unitId = existingUnit.id;
    console.log(`✅ curriculum_units already exists (ID: ${unitId})`);
  } else {
    const { data: newUnit, error: unitError } = await supabase
      .from('curriculum_units')
      .insert({
        subject: 'toan',
        grade: 7,
        title: 'Chương 1: Số hữu tỉ',
        unit_number: 1,
        subject_id: subject.id,
        book_name: 'Toán 7 - Kết nối tri thức'
      })
      .select()
      .single();

    if (unitError) {
      console.error("❌ Error inserting curriculum_units:", unitError.message);
      process.exit(1);
    }
    unitId = newUnit.id;
    console.log(`✅ curriculum_units created (ID: ${unitId})`);
  }

  // 3. Ensure assessment_collections has Grade 7 entry
  console.log("Ensuring assessment_collections entry...");
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 7)
    .eq('volume', 1)
    .eq('sequence_number', 1)
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    const { data: newCol, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: 'Toán 7 - Tập 1',
        subject_slug: 'toan',
        grade: 7,
        volume: 1,
        units: [1],
        status: 'published',
        sequence_number: 1
      })
      .select()
      .single();

    if (colError) {
      console.error("❌ Error inserting assessment_collections:", colError.message);
      process.exit(1);
    }
    collectionId = newCol.id;
    console.log(`✅ assessment_collections created (ID: ${collectionId})`);
  }

  // 4. Fetch the 4 exercise sets for Lesson 1
  const { data: exSets } = await supabase
    .from('exercise_sets')
    .select('id, title')
    .like('title', 'Đề luyện tập số%');

  if (!exSets || exSets.length === 0) {
    console.error("❌ No practice sets starting with 'Đề luyện tập số' found!");
    process.exit(1);
  }

  console.log(`Found ${exSets.length} practice sets. Creating corresponding exams...`);

  // Clear existing exams for this collection to prevent duplicate seeding
  const { data: existingExams } = await supabase
    .from('exams')
    .select('id')
    .eq('collection_id', collectionId);

  if (existingExams && existingExams.length > 0) {
    const examIds = existingExams.map(e => e.id);
    await supabase.from('exam_questions').delete().in('exam_id', examIds);
    await supabase.from('exams').delete().eq('collection_id', collectionId);
    console.log("🗑️ Cleared existing exams and exam_questions for this collection.");
  }

  // 5. Create exams and copy questions from exercise_sets
  for (let i = 0; i < exSets.length; i++) {
    const set = exSets[i];
    console.log(`Processing set: ${set.title}`);

    // Create exam
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .insert({
        collection_id: collectionId,
        title: set.title,
        exam_number: i + 1,
        total_questions: 20,
        generation_mode: 'balanced'
      })
      .select()
      .single();

    if (examError) {
      console.error(`  - ❌ Error creating exam:`, examError.message);
      continue;
    }

    // Fetch questions linked to the exercise set
    const { data: links } = await supabase
      .from('exercise_questions')
      .select('question_id, sort_key')
      .eq('set_id', set.id);

    if (links && links.length > 0) {
      const examQuestions = links.map(link => ({
        exam_id: exam.id,
        question_bank_id: link.question_id,
        order_index: link.sort_key
      }));

      const { error: linkError } = await supabase
        .from('exam_questions')
        .insert(examQuestions);

      if (linkError) {
        console.error(`  - ❌ Error linking exam questions:`, linkError.message);
      } else {
        console.log(`  - ✅ Created exam and linked ${links.length} questions.`);
      }
    }
  }

  console.log("\n🎉 Luyện Tập seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
