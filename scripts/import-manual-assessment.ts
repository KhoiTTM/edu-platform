import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const assessmentData = {
  "title": "Tiếng Anh 3 - Global Success - Unit 1 & 2 Assessment",
  "metadata": {
    "subject": "tieng_anh",
    "grade": 3,
    "book": "Tiếng Anh 3 - Global Success",
    "units": [1, 2],
    "total_questions": 15,
    "generated_date": "2026-05-28"
  },
  "questions": [
    {
      "id": "Q001",
      "type": "tap_correct_word",
      "instruction": "Tap the correct word to complete the sentence.",
      "question_data": {
        "question": "Hello! My ___ is Nam.",
        "correct_word": "name",
        "choices": ["name", "age", "book", "class"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 6 }
    },
    {
      "id": "Q002",
      "type": "tap_correct_word",
      "instruction": "Tap the correct word to complete the greeting.",
      "question_data": {
        "question": "Good ___! How are you?",
        "correct_word": "morning",
        "choices": ["morning", "lunch", "evening", "night"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 7 }
    },
    {
      "id": "Q003",
      "type": "vocab_to_word",
      "instruction": "Choose the English word for the Vietnamese meaning.",
      "question_data": {
        "question": "Xin chào",
        "correct_word": "Hello",
        "choices": ["Hello", "Goodbye", "Sorry", "Thanks"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 6 }
    },
    {
      "id": "Q004",
      "type": "vocab_to_word",
      "instruction": "Choose the English word for the Vietnamese meaning.",
      "question_data": {
        "question": "Tạm biệt",
        "correct_word": "Goodbye",
        "choices": ["Hello", "Goodbye", "Thank you", "Sorry"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 6 }
    },
    {
      "id": "Q005",
      "type": "fill_blank",
      "instruction": "Fill in the blank with the correct word.",
      "question_data": {
        "question": "___ are you? – I'm fine, thank you.",
        "correct_answer": "How",
        "choices": ["How", "What", "Who", "Where"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 8 }
    },
    {
      "id": "Q006",
      "type": "sentence_reorder",
      "instruction": "Arrange the words to make a correct sentence.",
      "question_data": {
        "words": ["My", "is", "Lan", "name"],
        "correct_sentence": "My name is Lan."
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 7 }
    },
    {
      "id": "Q007",
      "type": "sentence_reorder",
      "instruction": "Arrange the words to make a correct sentence.",
      "question_data": {
        "words": ["are", "you", "How", "?"],
        "correct_sentence": "How are you?"
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 8 }
    },
    {
      "id": "Q008",
      "type": "match_pair",
      "instruction": "Match the questions with the correct answers.",
      "question_data": {
        "pairs": [
          { "left": "What's your name?", "right": "My name is Nam." },
          { "left": "How are you?", "right": "I'm fine, thank you." },
          { "left": "Good morning!", "right": "Good morning!" }
        ]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 1, "page": 8 }
    },
    {
      "id": "Q009",
      "type": "tap_correct_word",
      "instruction": "Tap the correct word to complete the sentence.",
      "question_data": {
        "question": "This is my ___. His name is Tom.",
        "correct_word": "friend",
        "choices": ["friend", "teacher", "school", "desk"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 14 }
    },
    {
      "id": "Q010",
      "type": "tap_correct_word",
      "instruction": "Tap the correct word to complete the sentence.",
      "question_data": {
        "question": "___ is she? She is my sister.",
        "correct_word": "Who",
        "choices": ["Who", "What", "How", "Where"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 15 }
    },
    {
      "id": "Q011",
      "type": "vocab_to_word",
      "instruction": "Choose the English word for the Vietnamese meaning.",
      "question_data": {
        "question": "Bạn bè",
        "correct_word": "friend",
        "choices": ["friend", "family", "teacher", "student"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 14 }
    },
    {
      "id": "Q012",
      "type": "fill_blank",
      "instruction": "Fill in the blank with the correct word.",
      "question_data": {
        "question": "This is my sister. ___ name is Hoa.",
        "correct_answer": "Her",
        "choices": ["Her", "His", "My", "Your"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 16 }
    },
    {
      "id": "Q013",
      "type": "fill_blank",
      "instruction": "Fill in the blank with the correct word.",
      "question_data": {
        "question": "This is my brother. ___ name is Minh.",
        "correct_answer": "His",
        "choices": ["Her", "His", "My", "Their"]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 16 }
    },
    {
      "id": "Q014",
      "type": "sentence_reorder",
      "instruction": "Arrange the words to make a correct sentence.",
      "question_data": {
        "words": ["is", "This", "friend", "my"],
        "correct_sentence": "This is my friend."
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 14 }
    },
    {
      "id": "Q015",
      "type": "match_pair",
      "instruction": "Match the Vietnamese with the correct English word.",
      "question_data": {
        "pairs": [
          { "left": "Anh trai", "right": "brother" },
          { "left": "Chị gái", "right": "sister" },
          { "left": "Bạn bè", "right": "friend" },
          { "left": "Giáo viên", "right": "teacher" }
        ]
      },
      "source_anchor": { "book": "Tiếng Anh 3 - Global Success", "unit": 2, "page": 15 }
    }
  ]
};

async function importAssessment() {
  console.log("Starting manual import...");

  // 1. Create Collection
  const { data: collection, error: colError } = await supabase
    .from('assessment_collections')
    .insert({
      title: assessmentData.title,
      subject_slug: assessmentData.metadata.subject === "Tiếng Anh" ? "tieng_anh" : "math",
      grade: assessmentData.metadata.grade,
      units: assessmentData.metadata.units,
      sequence_number: (assessmentData.metadata as any).sequence_number || 1,
      reference_book: assessmentData.metadata.book,
      status: 'published'
    })
    .select()
    .single();

  if (colError) {
    console.error("Error creating collection:", colError);
    return;
  }

  // 2. Create Exam
  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      collection_id: collection.id,
      title: assessmentData.title,
      total_questions: assessmentData.questions.length,
      generation_mode: 'manual_import'
    })
    .select()
    .single();

  if (examError) {
    console.error("Error creating exam:", examError);
    return;
  }

  console.log(`Created Exam ID: ${exam.id}`);

  // 2.5 Use a known valid concept_id from the DB
  const validConceptId = "474cf0cc-9ee4-4d90-846b-ec87f3ca37fc";

  // 3. Process Questions
  for (let i = 0; i < assessmentData.questions.length; i++) {
    const q = assessmentData.questions[i];
    
    // Insert into question_bank
    const { data: newQ, error: qError } = await supabase
      .from('question_bank')
      .insert({
        concept_id: validConceptId, // Guaranteed valid link
        subject_slug: collection.subject_slug,
        grade: collection.grade,
        type: q.type,
        difficulty: 1.0,
        metadata_json: q.question_data,
        source: 'manual_import',
        source_anchor: q.source_anchor,
        status: 'approved'
      })
      .select()
      .single();

    if (qError) {
      console.error(`Error inserting question ${q.id}:`, qError.message);
      continue;
    }

    // Link to exam
    await supabase
      .from('exam_questions')
      .insert({
        exam_id: exam.id,
        question_bank_id: newQ.id,
        order_index: i
      });
  }

  console.log("Import complete! Refresh your dashboard to see the new assessment.");
}

importAssessment().catch(console.error);
