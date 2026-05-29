import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedMocks() {
  console.log("Seeding mock questions for tieng_anh grade 3...");

  const { data: concepts, error: err } = await supabase
    .from('concepts')
    .select('id, subject_slug');

  console.log("unique subject_slugs:", [...new Set(concepts?.map(c => c.subject_slug) || [])]);

  if (!concepts || concepts.length === 0) {
    console.error("No tieng_anh concepts found.");
    return;
  }

  const rowsToInsert = [];

  for (const concept of concepts) {
    const questions = [
      {
        type: 'tap_word',
        instruction: 'Select the word for "hello" (Chọn từ cho "hello")',
        words: ['hi', 'hello', 'bye', 'good'],
        correctWord: 'hello'
      },
      {
        type: 'multiple_choice',
        question: 'Which of these is "apple"? (Quả táo là gì?)',
        options: ['apple', 'banana', 'orange', 'grape'],
        correctOption: 'apple'
      },
      {
        type: 'tap_word',
        instruction: 'Select the word for "cat" (Chọn từ cho "cat")',
        words: ['dog', 'cat', 'bird', 'fish'],
        correctWord: 'cat'
      }
    ];

    for (const q of questions) {
      rowsToInsert.push({
        concept_id: concept.id,
        type: q.type,
        difficulty: 1.0,
        metadata_json: q,
        source: 'ai_generated',
        usage_count: 0,
        quality_score: 5.0
      });
    }
  }

  const { error } = await supabase.from('question_bank').insert(rowsToInsert);
  if (error) {
    console.error("Failed to insert mock questions:", error);
  } else {
    console.log(`Successfully inserted ${rowsToInsert.length} mock questions.`);
  }
}

seedMocks().catch(console.error);
