import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding Canonical Curriculum...");

  // 1. Seed Units
  const { data: unit1, error: unit1Error } = await supabase
    .from('curriculum_units')
    .upsert({
      subject: 'english',
      grade: 3,
      unit_number: 1,
      title: 'Hello',
      book_name: 'Global Success 3'
    }, { onConflict: 'subject, grade, unit_number, book_name' })
    .select()
    .single();

  if (unit1Error) {
    console.error("Error seeding unit 1:", unit1Error);
    return;
  }

  const { data: unit2, error: unit2Error } = await supabase
    .from('curriculum_units')
    .upsert({
      subject: 'english',
      grade: 3,
      unit_number: 2,
      title: 'Our names',
      book_name: 'Global Success 3'
    }, { onConflict: 'subject, grade, unit_number, book_name' })
    .select()
    .single();

  if (unit2Error) {
    console.error("Error seeding unit 2:", unit2Error);
    return;
  }

  console.log("Units seeded successfully.");

  // 2. Seed Lessons for Unit 1
  const lessons1Data = [
    { unit_id: unit1.id, lesson_number: 1, title: 'Lesson 1', summary: 'Greeting people and introducing yourself.', page_start: 8, page_end: 9 },
    { unit_id: unit1.id, lesson_number: 2, title: 'Lesson 2', summary: 'Asking about health and saying goodbye.', page_start: 10, page_end: 11 },
    { unit_id: unit1.id, lesson_number: 3, title: 'Lesson 3', summary: 'Phonics /b/ and /h/.', page_start: 12, page_end: 13 }
  ];

  const { data: lessons1, error: lessons1Error } = await supabase
    .from('curriculum_lessons')
    .upsert(lessons1Data, { onConflict: 'unit_id, lesson_number' })
    .select();

  if (lessons1Error) {
    console.error("Error seeding lessons for unit 1:", lessons1Error);
    return;
  }

  // 3. Seed Lessons for Unit 2
  const lessons2Data = [
    { unit_id: unit2.id, lesson_number: 1, title: 'Lesson 1', summary: 'Asking and answering about names.', page_start: 14, page_end: 15 },
    { unit_id: unit2.id, lesson_number: 2, title: 'Lesson 2', summary: 'Spelling names.', page_start: 16, page_end: 17 },
    { unit_id: unit2.id, lesson_number: 3, title: 'Lesson 3', summary: 'Phonics /m/ and /l/.', page_start: 18, page_end: 19 }
  ];

  const { data: lessons2, error: lessons2Error } = await supabase
    .from('curriculum_lessons')
    .upsert(lessons2Data, { onConflict: 'unit_id, lesson_number' })
    .select();

  if (lessons2Error) {
    console.error("Error seeding lessons for unit 2:", lessons2Error);
    return;
  }

  console.log("Lessons seeded successfully.");

  // 4. Seed Concepts for Unit 1 Lesson 1
  const l1_1 = lessons1.find(l => l.lesson_number === 1);
  const concepts1_1 = [
    {
      lesson_id: l1_1.id,
      concept_type: 'vocabulary',
      content_json: { word: 'hello', meaning_vi: 'xin chào', pronunciation: '/həˈləʊ/' },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 1, page: 8, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l1_1.id,
      concept_type: 'vocabulary',
      content_json: { word: 'hi', meaning_vi: 'xin chào (thân mật)', pronunciation: '/haɪ/' },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 1, page: 8, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l1_1.id,
      concept_type: 'sentence_pattern',
      content_json: { pattern: "Hello, I'm [Name].", example: "Hello, I'm Mai.", meaning_vi: "Xin chào, mình là [Tên]." },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 1, page: 8, activity: 'Look, listen and repeat' }
    }
  ];

  const { error: concepts1_1Error } = await supabase
    .from('curriculum_concepts')
    .insert(concepts1_1);

  if (concepts1_1Error) {
    console.warn("Error seeding concepts for u1 l1 (possibly already exist):", concepts1_1Error.message);
  }

  // 5. Seed Concepts for Unit 1 Lesson 2
  const l1_2 = lessons1.find(l => l.lesson_number === 2);
  const concepts1_2 = [
    {
      lesson_id: l1_2.id,
      concept_type: 'vocabulary',
      content_json: { word: 'fine', meaning_vi: 'khỏe, tốt', pronunciation: '/faɪn/' },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 2, page: 10, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l1_2.id,
      concept_type: 'vocabulary',
      content_json: { word: 'thanks', meaning_vi: 'cảm ơn', pronunciation: '/θæŋks/' },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 2, page: 10, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l1_2.id,
      concept_type: 'sentence_pattern',
      content_json: { pattern: "How are you?", example: "How are you? - I'm fine, thanks.", meaning_vi: "Bạn có khỏe không? - Mình khỏe, cảm ơn." },
      source_anchor: { book: 'Global Success 3', unit: 1, lesson: 2, page: 10, activity: 'Look, listen and repeat' }
    }
  ];

  const { error: concepts1_2Error } = await supabase
    .from('curriculum_concepts')
    .insert(concepts1_2);

  if (concepts1_2Error) {
    console.warn("Error seeding concepts for u1 l2:", concepts1_2Error.message);
  }

  // 6. Seed Concepts for Unit 2 Lesson 1
  const l2_1 = lessons2.find(l => l.lesson_number === 1);
  const concepts2_1 = [
    {
      lesson_id: l2_1.id,
      concept_type: 'vocabulary',
      content_json: { word: 'name', meaning_vi: 'tên', pronunciation: '/neɪm/' },
      source_anchor: { book: 'Global Success 3', unit: 2, lesson: 1, page: 14, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l2_1.id,
      concept_type: 'vocabulary',
      content_json: { word: 'your', meaning_vi: 'của bạn', pronunciation: '/jɔːr/' },
      source_anchor: { book: 'Global Success 3', unit: 2, lesson: 1, page: 14, activity: 'Look, listen and repeat' }
    },
    {
      lesson_id: l2_1.id,
      concept_type: 'sentence_pattern',
      content_json: { pattern: "What's your name?", example: "What's your name? - My name's Ben.", meaning_vi: "Tên của bạn là gì? - Tên của mình là Ben." },
      source_anchor: { book: 'Global Success 3', unit: 2, lesson: 1, page: 14, activity: 'Look, listen and repeat' }
    }
  ];

  const { error: concepts2_1Error } = await supabase
    .from('curriculum_concepts')
    .insert(concepts2_1);

  if (concepts2_1Error) {
    console.warn("Error seeding concepts for u2 l1:", concepts2_1Error.message);
  }

  console.log("Concepts for U1 L2 and U2 L1 seeded.");
  console.log("Seeding complete.");
}

seed().catch(console.error);
