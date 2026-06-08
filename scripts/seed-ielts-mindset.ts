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
  // --- PAGE 12 ---
  { type: "inline_fill_blank", instruction: "Choose the best answer.", text_segments: ["At 8.30am, he ", " the bus to his language school."], correct_answers: ["catches"], word_pool: ["goes", "catches", "travels"] },
  { type: "inline_fill_blank", instruction: "Choose the best answer.", text_segments: ["During the day, Ping studies English and ", " to his classmates."], correct_answers: ["chats"], word_pool: ["laughs", "chats", "tells"] },
  { type: "inline_fill_blank", instruction: "Choose the best answer.", text_segments: ["Everyone speaks English in his class because the students all ", " from different countries around the world."], correct_answers: ["come"], word_pool: ["arrive", "come", "live"] },
  { type: "inline_fill_blank", instruction: "Choose the best answer.", text_segments: ["After Ping finishes school at 3:00pm, he often ", " some sightseeing in the city with his friends."], correct_answers: ["does"], word_pool: ["does", "makes", "has"] },
  { type: "inline_fill_blank", instruction: "Choose the best answer.", text_segments: ["In the evening, Ping relaxes with his host family, ", " TV or goes online."], correct_answers: ["watches"], word_pool: ["watches", "sees", "looks"] },

  // --- PAGE 13-14 ---
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who works with a member of the family after college?", options: ["Ava", "Michael", "Nina"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who goes out in the car in the evenings?", options: ["Ava", "Michael", "Nina"], correct_index: 2 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who gets a lift in a car to college most mornings?", options: ["Ava", "Michael", "Nina"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who prepares the evening meal for the family?", options: ["Ava", "Michael", "Nina"], correct_index: 1 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who pays to do extra activities in the afternoons?", options: ["Ava", "Michael", "Nina"], correct_index: 2 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who finds it difficult to watch TV in the evenings?", options: ["Ava", "Michael", "Nina"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the article again and the sentences. Choose the best answer.", reading_passage: readingPassage, question: "Who lives a long way from the sea?", options: ["Ava", "Michael", "Nina"], correct_index: 0 },
  { type: "match_pair", instruction: "Match the grammar questions with the correct answers.", pairs: [
      { left: "What do we use the present simple for?", right: "to talk about every day routines and habits" },
      { left: "Why do we use adverbs of frequency?", right: "to say how often we do something" },
      { left: "What do verbs for he/she/it end in?", right: "-s" }
  ]},

  // --- PAGE 15 ---
  { type: "inline_fill_blank", instruction: "Complete the text using the verbs in brackets in the correct form.", text_segments: ["Dan usually ", "(get up) at 8am, ", "(have) a shower and ", "(eat) breakfast. After that, he always ", "(get) his books ready and then ", "(go) to his lectures until midday. He usually ", "(return) home and ", "(make) lunch for himself at about 12:30pm."], correct_answers: ["gets up", "has", "eats", "gets", "goes", "returns", "makes"], word_pool: ["gets up", "get ups", "has", "haves", "eats", "eat", "gets", "goes", "go", "returns", "makes"] },
  { type: "inline_fill_blank", instruction: "Complete the text using the verbs in brackets in the correct form. (Part 2)", text_segments: ["Then, he sometimes ", "(watch) a bit of TV. At about 3pm, he often ", "(meet) a friend for coffee. At 3.30pm, they sometimes ", "(go) to the library together. Dan always ", "(study) for a few hours and then at around 6.30pm he ", "(go) home."], correct_answers: ["watches", "meets", "go", "studies", "goes"], word_pool: ["watches", "watch", "meets", "meet", "go", "goes", "studies", "studys"] },
  { type: "inline_fill_blank", instruction: "Complete the text using the verbs in brackets in the correct form. (Part 3)", text_segments: ["He usually ", "(cook) dinner for himself and his flat mates. In the evening, he sometimes ", "(exercise) at the gym or goes for a run. After that, he relaxes in front of the TV or ", "(see) his friends. He never goes to bed early, but usually ", "(fall) asleep at around midnight."], correct_answers: ["cooks", "exercises", "sees", "falls"], word_pool: ["cooks", "exercises", "sees", "falls", "cook", "exercise", "see", "fall"] },

  { type: "match_pair", instruction: "Match the phrases that have similar meanings.", pairs: [
      { left: "do the laundry", right: "wash the clothes" },
      { left: "tidy up", right: "put things away" },
      { left: "wash up", right: "clean the dishes" },
      { left: "make lunch/dinner", right: "prepare a meal" },
      { left: "put the rubbish out", right: "take out the bins" },
      { left: "do the cleaning", right: "do the housework" }
  ]},

  // --- PAGE 16 ---
  { type: "multiple_choice", instruction: "Read some information about a website offering student exchange programmes. Decide if the sentence is true or false.", reading_passage: "Spend a term or a whole year in another country. Stay with a host family and go to a local college... You need to pay for flights and take some pocket money, but that's all. Host families are not paid. All they ask is that you help with jobs around the house and join in with family activities.", question: "All students spend at least a year abroad.", options: ["True", "False"], correct_index: 1 },
  { type: "multiple_choice", instruction: "Read some information about a website offering student exchange programmes. Decide if the sentence is true or false.", reading_passage: "Spend a term or a whole year in another country. Stay with a host family and go to a local college... You need to pay for flights and take some pocket money, but that's all. Host families are not paid. All they ask is that you help with jobs around the house and join in with family activities.", question: "Host families give students pocket money during their stay.", options: ["True", "False"], correct_index: 1 },
  { type: "multiple_choice", instruction: "Read some information about a website offering student exchange programmes. Decide if the sentence is true or false.", reading_passage: "Spend a term or a whole year in another country. Stay with a host family and go to a local college... You need to pay for flights and take some pocket money, but that's all. Host families are not paid. All they ask is that you help with jobs around the house and join in with family activities.", question: "Students should do housework and be involved with family activities.", options: ["True", "False"], correct_index: 0 },

  // --- PAGE 18 ---
  { type: "match_pair", instruction: "Match the digital times with the times in words.", pairs: [
      { left: "05.15", right: "It's quarter past five." },
      { left: "08.20", right: "It's twenty past eight." },
      { left: "06.45", right: "It's quarter to seven." },
      { left: "14.30", right: "It's half past two." },
      { left: "20.50", right: "It's ten to nine." }
  ]},
  { type: "match_pair", instruction: "Match the digital times with the times in words. (Part 2)", pairs: [
      { left: "09.10", right: "It's ten past nine." },
      { left: "15.35", right: "It's twenty-five to four." },
      { left: "10.05", right: "It's five past ten." },
      { left: "12.00", right: "It's twelve o'clock." },
      { left: "16.55", right: "It's five to five." }
  ]},

  { type: "inline_fill_blank", instruction: "Unscramble the letters in brackets to complete the text.", text_segments: ["When I get up in the morning, the first thing that I do is ", "(avhe) a shower. I then go to the kitchen and make breakfast. After breakfast, I ", "(bhusr) my teeth. Then I ", "(emte) my friends and we ", "(chact) the bus to the college."], correct_answers: ["have", "brush", "meet", "catch"], word_pool: ["have", "brush", "meet", "catch"] },
  { type: "inline_fill_blank", instruction: "Unscramble the letters in brackets to complete the text. (Part 2)", text_segments: ["At college, we study all day, but we have a break for lunch at 12 o'clock. At four o'clock, we ", "(vlaee) the college and ", "(og) home by bus. In the evenings, I usually ", "(cwaht) TV, unless I have a lot of homework. I always ", "(od) my homework in the evenings. At night, I always ", "(og) to bed and ", "(lafl) asleep straight away."], correct_answers: ["leave", "go", "watch", "do", "go", "fall"], word_pool: ["leave", "go", "watch", "do", "fall"] },

  { type: "multiple_choice", instruction: "Which verb goes with these words? 'a mess, the beds, dinner, a noise, lunch'", question: "Choose 'Make' or 'Do'", options: ["Make", "Do"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Which verb goes with these words? 'the cleaning, some homework, the laundry, the shopping, the housework'", question: "Choose 'Make' or 'Do'", options: ["Make", "Do"], correct_index: 1 },

  // --- PAGE 19 ---
  { type: "inline_fill_blank", instruction: "Complete the email using the words in the box.", text_segments: ["Hi Sam, I'm having a great time here in France. My host family are very nice. They ", " in an apartment in an area called Pantin, and both ", " as journalists. They wake ", " very early in the morning and ", " the house before me."], correct_answers: ["live", "work", "up", "leave"], word_pool: ["live", "work", "up", "leave", "catch", "walk"] },
  { type: "inline_fill_blank", instruction: "Complete the email using the words in the box. (Part 2)", text_segments: ["I ", " breakfast at about 8am and then go to the language school. I usually ", " there, but if I'm late I ", " the bus. Lessons at the school ", " at 4pm and we can go home. We ", " after school in a cafe or ", " in the evenings to the cinema."], correct_answers: ["have", "walk", "catch", "finish", "meet", "go out"], word_pool: ["have", "walk", "catch", "finish", "meet", "go out"] },

  { type: "inline_fill_blank", instruction: "Complete the sentences using the third person form of the verbs in brackets.", text_segments: ["1. My dad ", "(wash) his car every weekend.\n2. Jim ", "(watch) too much TV.\n3. Adrian's baby ", "(cry) a lot.\n4. My brother is good at chess and ", "(practise) every day.\n5. Olga ", "(go) jogging most evenings after work."], correct_answers: ["washes", "watches", "cries", "practises", "goes"], word_pool: ["washes", "watches", "cries", "practises", "goes"] },
  { type: "inline_fill_blank", instruction: "Complete the sentences using the third person form of the verbs in brackets. (Part 2)", text_segments: ["6. Tom's wife cooks and Tom ", "(do) the washing up.\n7. Anna ", "(catch) the 253 bus to college each morning.\n8. Nadia ", "(relax) by doing yoga.\n9. I think our teacher ", "(give) us far too much homework.\n10. My brother ", "(switch off) his light at about midnight."], correct_answers: ["does", "catches", "relaxes", "gives", "switches off"], word_pool: ["does", "catches", "relaxes", "gives", "switches off"] },

  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "My brother (work / works) for a computer company in the city.", options: ["work", "works"], correct_index: 1 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "My friends and I often (play / plays) basketball together at the weekends.", options: ["play", "plays"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "I go to a college where everyone (study / studies) different languages.", options: ["study", "studies"], correct_index: 1 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "My grandparents (come / comes) from a small village in Germany.", options: ["come", "comes"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "In Britain, most school students (wear / wears) a uniform.", options: ["wear", "wears"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "In the evenings, I (like / likes) to chat to my friends online.", options: ["like", "likes"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "In my family, only my sister (gets up / get up) before 6am.", options: ["gets up", "get up"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "I (have / has) a dance class every Wednesday evening.", options: ["have", "has"], correct_index: 0 },
  { type: "multiple_choice", instruction: "Read the sentences and choose the correct answer.", question: "My lunch break (begin / begins) at 12pm and (finish / finishes) at 12.45pm.", options: ["begin / finish", "begins / finishes", "begins / finish"], correct_index: 1 },

  // --- PAGE 20 ---
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["the", "my", "room", "friend", "tidies"], correct_order: ["my", "friend", "tidies", "the", "room"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["play", "I", "the", "football", "weekend", "at"], correct_order: ["I", "play", "football", "at", "the", "weekend"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["a", "lunch", "I", "sandwich", "for", "take", "to", "college"], correct_order: ["I", "take", "a", "sandwich", "for", "lunch", "to", "college"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["six", "past", "up", "wake", "I", "at", "half"], correct_order: ["I", "wake", "up", "at", "half", "past", "six"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["every", "his", "my", "checks", "minutes", "brother", "phone", "five"], correct_order: ["my", "brother", "checks", "his", "phone", "every", "five", "minutes"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["in", "I", "a", "have", "evening", "shower", "the"], correct_order: ["I", "have", "a", "shower", "in", "the", "evening"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["try", "9pm", "to", "I", "studying", "before", "stop"], correct_order: ["I", "try", "to", "stop", "studying", "before", "9pm"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["every", "go", "to", "months", "I", "the", "dentist", "six"], correct_order: ["I", "go", "to", "the", "dentist", "every", "six", "months"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["my", "the", "housework", "of", "does", "father", "most"], correct_order: ["my", "father", "does", "most", "of", "the", "housework"] },
  { type: "sentence_reorder", instruction: "Reorder the words to make correct sentences.", words: ["visit", "at", "I", "my", "the", "family", "weekends"], correct_order: ["I", "visit", "my", "family", "at", "the", "weekends"] },

  { type: "inline_fill_blank", instruction: "Complete the email using the words in the box.", text_segments: ["I have a new job! It's in a supermarket and I ", " there every Saturday. I ", " at 8am and the shop ", " at 9am. I ", " the shelves with food products and ", " the shopping baskets by the entrance."], correct_answers: ["work", "start", "opens", "fill", "tidy"], word_pool: ["work", "start", "opens", "fill", "tidy"] },
  { type: "inline_fill_blank", instruction: "Complete the email using the words in the box. (Part 2)", text_segments: ["I ", " the floors and ", " at the checkout. My manager is very nice. She ", " me what to do and never ", ". The other workers are really friendly, too."], correct_answers: ["clean", "work", "tells", "shouts"], word_pool: ["clean", "work", "tells", "shouts"] },
  { type: "inline_fill_blank", instruction: "Complete the email using the words in the box. (Part 3)", text_segments: ["We ", " three breaks a day and ", " at 4pm. It's hard work because the shop ", " very busy, but I really ", " it."], correct_answers: ["take", "finish", "gets", "enjoy"], word_pool: ["take", "finish", "gets", "enjoy"] }
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

  // Mix the questions slightly to create balanced sets
  const shuffledData = [...data];

  const setSize = 10;
  const numSets = Math.ceil(shuffledData.length / setSize);

  for (let i = 0; i < numSets; i++) {
      const subset = shuffledData.slice(i * setSize, (i + 1) * setSize);
      
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
          duration_minutes: 20,
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
