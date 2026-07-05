import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Reading tienganh-tap1-generated.json...");
  const filePath = path.join(process.cwd(), 'content', 'tienganh-tap1-generated.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  const questions = data.question_bank;
  console.log(`Found ${questions.length} questions in JSON.`);

  // 1. Resolve unit & lessons
  const { data: units } = await supabase
    .from('curriculum_units')
    .select('id, unit_number')
    .eq('subject', 'english')
    .eq('grade', 3)
    .eq('unit_number', 1)
    .limit(1);

  if (!units || units.length === 0) {
    console.error("Could not find Unit 1 in database. Please run seed-canonical-curriculum.ts first.");
    return;
  }
  const unitId = units[0].id;

  const { data: lessons } = await supabase
    .from('curriculum_lessons')
    .select('id, lesson_number')
    .eq('unit_id', unitId);

  if (!lessons || lessons.length === 0) {
    console.error("Could not find any lessons for Unit 1.");
    return;
  }

  // 2. Clear old handcrafted questions (optional, but good for testing)
  await supabase.from('question_bank').delete().eq('source', 'handcrafted');

  // 3. Process questions
  const rowsToInsert = [];

  for (const q of questions) {
    const lessonInfo = lessons.find((l: any) => l.lesson_number === q.lesson);
    if (!lessonInfo) continue;

    // Get a concept for this lesson
    const { data: concepts } = await supabase
      .from('curriculum_concepts')
      .select('id')
      .eq('lesson_id', lessonInfo.id)
      .limit(1);

    if (!concepts || concepts.length === 0) continue;
    const conceptId = concepts[0].id;

    let metadata_json: any = null;

    if (q.type === 'tap_correct_word') {
      metadata_json = {
        type: 'tap_word',
        instruction: q.instruction,
        words: q.choices,
        correctWord: q.correct_answer
      };
    } else if (q.type === 'multiple_choice') {
      metadata_json = {
        type: 'multiple_choice',
        question: `${q.instruction} - ${q.question}`,
        options: q.options,
        correctOption: q.correct_option
      };
    } else if (q.type === 'sentence_reorder' || q.type === 'dialogue_completion' || q.type === 'match_pair') {
      // Fallback: convert to multiple choice for now so UI doesn't crash
      let correct = q.correct_sentence || q.answer || q.correct_answer || 'Correct';
      metadata_json = {
        type: 'multiple_choice',
        question: q.instruction,
        options: [correct, 'Option B', 'Option C', 'Option D'].sort(() => 0.5 - Math.random()),
        correctOption: correct
      };
    }

    if (metadata_json) {
      rowsToInsert.push({
        concept_id: conceptId,
        type: metadata_json.type,
        difficulty: 1.0,
        metadata_json,
        source: 'handcrafted',
        usage_count: 0,
        quality_score: 5.0
      });
    }
  }

  if (rowsToInsert.length > 0) {
    const { error } = await supabase.from('question_bank').insert(rowsToInsert);
    if (error) {
      console.error("Error inserting manual questions:", error);
    } else {
      console.log(`Successfully inserted ${rowsToInsert.length} manual questions from JSON.`);
    }
  } else {
    console.log("No valid questions to insert.");
  }
}

run().catch(console.error);
