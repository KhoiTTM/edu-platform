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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const readingPassage = `A DAY IN THE LIFE
Three college students from around the world tell us about their daily routine

NINA (NORWAY): I live in a village on Norway's Atlantic coast. I get up at 7:30am and walk to college. Classes begin at 8.30am and finish at 3pm. After that, I go to one of the college clubs. These are not very expensive and there are lots to choose from. I do athletics and football but you can also do things like folk dancing and cross-country skiing. When my parents come home from work, my dad makes dinner and we all eat together. After that, my mum takes me out for a driving lesson. I've got my test soon and need to practise!

AVA (AUSTRALIA): I'm from a small town in Queensland. Most people in Australia live near the coast, but we live on a cattle farm in the centre of the country. I get up at around 7am and have breakfast. My mum teaches at my college, so I usually go with her in the car instead of taking the bus. College starts at 8.30am and finishes at 4pm. When I get home, I help my dad on the farm for a few hours. In the evenings, I try to watch TV but I'm usually too tired. I go to bed at about 10:00pm.

MICHAEL (BRAZIL): I live in Rio de Janeiro. I get up at 6am and catch a bus to college at 6.30am. Lessons start at 7.20am. We have a break at 9:50am and then study until 12:30pm. I get home at about 1:40pm. After that, I often go to the beach with my friends to swim in the ocean or play beach volleyball, but I sometimes also just stay at home to sleep or study. In the evenings, I cook dinner for my family, then we watch TV or listen to the radio before bed. I switch off my light at about 10pm.`;

const allQuestions = [
  // Vocabulary and Speaking (Page 12, Ex 3)
  {
    type: "inline_fill_blank",
    instruction: "Read the sentences about a boy who is doing a language course in the UK. Choose the best answer.",
    text_segments: ["At 8.30am, he ", " the bus to his language school."],
    correct_answers: ["catches"],
    word_pool: ["goes", "catches", "travels"]
  },
  {
    type: "inline_fill_blank",
    instruction: "Read the sentences about a boy who is doing a language course in the UK. Choose the best answer.",
    text_segments: ["During the day, Ping studies English and ", " to his classmates."],
    correct_answers: ["chats"],
    word_pool: ["laughs", "chats", "tells"]
  },
  {
    type: "inline_fill_blank",
    instruction: "Read the sentences about a boy who is doing a language course in the UK. Choose the best answer.",
    text_segments: ["Everyone speaks English in his class because the students all ", " from different countries around the world."],
    correct_answers: ["come"],
    word_pool: ["arrive", "come", "live"]
  },
  {
    type: "inline_fill_blank",
    instruction: "Read the sentences about a boy who is doing a language course in the UK. Choose the best answer.",
    text_segments: ["After Ping finishes school at 3:00pm, he often ", " some sightseeing in the city with his friends."],
    correct_answers: ["does"],
    word_pool: ["does", "makes", "has"]
  },
  {
    type: "inline_fill_blank",
    instruction: "Read the sentences about a boy who is doing a language course in the UK. Choose the best answer.",
    text_segments: ["In the evening, Ping relaxes with his host family, ", " TV or goes online."],
    correct_answers: ["watches"],
    word_pool: ["watches", "sees", "looks"]
  },

  // Reading Comprehension (Page 13, Ex 5 & Page 14, Ex 6)
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who works with a member of the family after college?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 0
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who goes out in the car in the evenings?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 2
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who gets a lift in a car to college most mornings?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 0
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who prepares the evening meal for the family?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 1
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who pays to do extra activities in the afternoons?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 2
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who finds it difficult to watch TV in the evenings?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 0
  },
  {
    type: "multiple_choice",
    instruction: "Read the article again and the sentences. Choose the best answer.",
    reading_passage: readingPassage,
    question: "Who lives a long way from the sea?",
    options: ["Ava", "Michael", "Nina"],
    correct_index: 0
  },

  // Grammar (Page 14, Ex 7)
  {
    type: "match_pair",
    instruction: "Match the grammar questions with the correct answers.",
    pairs: [
      { left: "What do we use the present simple for?", right: "to talk about every day routines and habits" },
      { left: "Why do we use adverbs of frequency?", right: "to say how often we do something" },
      { left: "What do verbs for he/she/it end in?", right: "-s" }
    ]
  }
];

async function processUnit() {
  console.log("Total extracted questions:", allQuestions.length);

  console.log("Creating/Fetching concept...");
  let { data: concept } = await supabase.from("concepts").select("id").eq("slug", "mindset-foundation-unit-1").single();
  if (!concept) {
      const { data: newConcept, error: ce } = await supabase.from("concepts").insert({
          slug: "mindset-foundation-unit-1",
          title: "IELTS Mindset Foundation - Unit 1"
      }).select().single();
      if (ce || !newConcept) {
          console.error("❌ Concept creation failed:", ce);
          return;
      }
      concept = newConcept;
  }

  // Insert into question_bank
  console.log("Clearing old mindset-ielts questions...");
  await supabase.from("question_bank").delete().eq("subject_slug", "mindset-ielts").eq("status", "draft");

  console.log("Inserting into question_bank...");
  const records = allQuestions.map((q, idx) => {
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

  const { data, error } = await supabase.from("question_bank").insert(records).select("id");
  if (error) {
      console.error("❌ Insert failed:", error);
      return;
  }

  console.log(`✅ Successfully inserted ${data.length} questions into question_bank!`);

  console.log("Creating Assessment Collections...");
  await supabase.from("assessment_collections").delete().eq("subject_slug", "mindset-ielts");

  const setSize = 6;
  const numSets = Math.ceil(data.length / setSize);

  for (let i = 0; i < numSets; i++) {
      const subset = data.slice(i * setSize, (i + 1) * setSize);
      
      const { data: newCol, error: collError } = await supabase.from("assessment_collections").insert({
          subject_slug: "mindset-ielts",
          title: `Unit 1 - Practice ${i + 1}`,
          grade: 7,
          volume: 1,
          status: 'published'
      }).select().single();

      if (collError || !newCol) {
          console.error("❌ Collection creation failed:", collError);
          continue;
      }

      const { data: exam, error: examErr } = await supabase.from('exams').insert({
          collection_id: newCol.id, 
          title: `Unit 1 - Practice ${i + 1}`, 
          exam_number: i + 1, 
          total_questions: subset.length, 
          duration_minutes: 15,
          generation_mode: 'handcrafted',
          metadata_json: { unit: 1 }
      }).select().single();

      if (examErr || !exam) {
          console.error("❌ Error creating exam:", examErr);
          continue;
      }

      for (let j = 0; j < subset.length; j++) {
          await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: subset[j].id, order_index: j });
      }
  }

  console.log(`✅ Successfully created ${numSets} practice collections!`);
}

processUnit();
