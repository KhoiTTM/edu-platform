import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Starting Question Bank Seed...");

  // First, get a concept_id to attach these questions to.
  // We'll pick an English concept, e.g. the first one we find.
  const { data: concepts, error: conceptsError } = await supabase
    .from('concepts')
    .select('*')
    .limit(1);

  if (conceptsError || !concepts || concepts.length === 0) {
    console.error("Error fetching concepts (need at least one concept to attach questions):", conceptsError);
    return;
  }
  const conceptId = concepts[0].id;

  const seedSteps = [
    {
      id: "1",
      type: "tap_word",
      instruction: "Select the word for 'Apple'",
      words: ["Banana", "Apple", "Orange", "Grape"],
      correctWord: "Apple"
    },
    {
      id: "2",
      type: "multiple_choice",
      question: "Which of these is 'Cat'?",
      options: ["Dog", "Bird", "Cat", "Fish"],
      correctOption: "Cat"
    },
    {
      id: "3",
      type: "tap_word",
      instruction: "Tap the correct translation: 'Hello'",
      words: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
      correctWord: "Xin chào"
    },
    {
      id: "4",
      type: "multiple_choice",
      question: "What is 'Water' in Vietnamese?",
      options: ["Lửa", "Nước", "Đất", "Gió"],
      correctOption: "Nước"
    }
  ];

  const reviewSteps = [
    {
      id: "rev1",
      type: "tap_word",
      instruction: "Review: Select 'Apple'",
      words: ["Apple", "Banana", "Orange"],
      correctWord: "Apple"
    },
    {
      id: "rev2",
      type: "multiple_choice",
      question: "Review: What is 'Nước'?",
      options: ["Water", "Fire", "Earth"],
      correctOption: "Water"
    }
  ];

  const allQuestions = [...seedSteps, ...reviewSteps];

  const rowsToInsert = allQuestions.map(q => ({
    concept_id: conceptId,
    type: q.type,
    difficulty: 1.0,
    metadata_json: q,
    source: 'handcrafted',
  }));

  const { error: insertError } = await supabase
    .from('question_bank')
    .insert(rowsToInsert);

  if (insertError) {
    console.error("Error inserting handcrafted questions:", insertError);
  } else {
    console.log(`Successfully seeded ${rowsToInsert.length} handcrafted questions.`);
  }
}

main().catch(console.error);
