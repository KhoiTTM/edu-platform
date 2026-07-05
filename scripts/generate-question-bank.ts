import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const StepSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('tap_word'),
    instruction: z.string(),
    words: z.array(z.string()),
    correctWord: z.string(),
  }),
  z.object({
    type: z.literal('multiple_choice'),
    question: z.string(),
    options: z.array(z.string()),
    correctOption: z.string(),
  }),
]);

const QuestionsArraySchema = z.array(StepSchema);

const SUBJECT_PROMPTS: Record<string, string> = {
  tieng_anh: `
    You are an expert curriculum designer for children.
    Generate interactive questions for a Grade 3 English learning app in Vietnam.
    
    CRITICAL CONSTRAINTS:
    - Target Audience: 3rd Grade students (8-9 years old).
    - Curriculum: Vietnamese Ministry of Education "Global Success" Grade 3.
    - Vocabulary Level: Extremely basic, beginner level ONLY (e.g., Hello, apple, red, dog, cat, book).
    - Instruction Language: Keep instructions very short and simple. Use basic English or simple Vietnamese if necessary.
    - DO NOT use complex grammar, past tense, or words outside the standard Grade 3 syllabus.
  `,
  'mindset-ielts': `
    You are an expert IELTS examiner and academic curriculum designer.
    Generate challenging, high-quality IELTS-style questions for a mobile learning app.
    
    CRITICAL CONSTRAINTS:
    - Target Audience: IELTS candidates aiming for Band 6.5 - 8.5.
    - Vocabulary Level: Advanced, academic, and formal.
    - Rigor: Must follow actual IELTS task formats (though simplified for mobile interaction).
    - Tone: Professional, academic, and precise.
  `,
  default: `
    You are an expert curriculum designer.
    Generate interactive questions for a learning app.
  `
};

async function getConceptContext(conceptId: string) {
  // Fetch lessons linked to this concept
  const { data: lessonConcepts } = await supabase
    .from('lesson_concepts')
    .select('lesson_id')
    .eq('concept_id', conceptId);

  const lessonIds = lessonConcepts?.map(lc => lc.lesson_id) || [];
  
  let contextText = "";

  if (lessonIds.length > 0) {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('title, summary')
      .in('id', lessonIds);

    if (lessons && lessons.length > 0) {
      contextText += "Textbook Lessons Context:\n";
      lessons.forEach(l => {
        contextText += `- ${l.title}: ${l.summary}\n`;
      });
    }

    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id')
      .in('lesson_id', lessonIds);

    const quizIds = quizzes?.map(q => q.id) || [];

    if (quizIds.length > 0) {
      const { data: questions } = await supabase
        .from('quiz_questions')
        .select('question, explanation')
        .in('quiz_id', quizIds)
        .limit(5);

      if (questions && questions.length > 0) {
        contextText += "\nExisting Examples for Context:\n";
        questions.forEach(q => {
          contextText += `- Example Question: ${q.question} (Explanation: ${q.explanation || ''})\n`;
        });
      }
    }
  }

  return contextText;
}

async function main() {
  console.log("Starting Question Bank Generation Pipeline with RAG...");
  
  console.log("Wiping old AI generated questions...");
  const { error: deleteError } = await supabase
    .from('question_bank')
    .delete()
    .eq('source', 'ai_generated');
  
  if (deleteError) {
    console.error("Error wiping old AI questions:", deleteError);
  } else {
    console.log("Successfully wiped old AI questions.");
  }
  
  const { data: concepts, error: conceptsError } = await supabase
    .from('concepts')
    .select(`
      id,
      title,
      description,
      source_id,
      content_sources (
        universal_subjects (
          slug
        )
      )
    `)
    .limit(10);

  if (conceptsError || !concepts) {
    console.error("Error fetching concepts:", conceptsError);
    return;
  }

  console.log(`Found ${concepts.length} concepts to process.`);

  for (const concept of concepts) {
    const subjectSlug = (concept.content_sources as any)?.universal_subjects?.slug || 'default';
    const systemPrompt = SUBJECT_PROMPTS[subjectSlug] || SUBJECT_PROMPTS.default;
    
    console.log(`Generating questions for concept: ${concept.title} (Subject: ${subjectSlug})`);
    
    const context = await getConceptContext(concept.id);

    const prompt = `
    ${systemPrompt}
    
    The concept to generate questions for is: "${concept.title}".
    The concept description is: "${concept.description || ''}".
    
    CONTEXT FROM TEXTBOOK:
    ${context || "No specific textbook context found."}
    
    Generate 5 questions. The questions must be either 'tap_word' or 'multiple_choice' format.

    CRITICAL RULES:
    1. All options/words must be unique. NEVER generate duplicate items in the 'words' array for tap_word or 'options' array for multiple_choice.
    2. Provide a Vietnamese translation for instructions and questions where appropriate. For example, "Select the word for 'dog' (Chọn từ cho 'dog')" or "What is this? (Đây là gì?)".
    
    Format your response STRICTLY as a JSON array matching this schema:
    [
      {
        "type": "tap_word",
        "instruction": "Select the word for '...' (...)",
        "words": ["...", "...", "...", "..."],
        "correctWord": "..."
      },
      {
        "type": "multiple_choice",
        "question": "Which of these is '...'? (...)",
        "options": ["...", "...", "...", "..."],
        "correctOption": "..."
      }
    ]
    
    Return ONLY valid JSON. No markdown fences.
    `;

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash', 
        generationConfig: { responseMimeType: "application/json" } 
      });
      
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      const parsed = JSON.parse(text);
      const validatedQuestions = QuestionsArraySchema.parse(parsed);
      
      console.log(`Successfully generated ${validatedQuestions.length} questions for ${concept.title}. Inserting into DB...`);
      
      const rowsToInsert = validatedQuestions.map((q) => ({
        concept_id: concept.id,
        type: q.type,
        difficulty: 1.0,
        metadata_json: q,
        source: 'ai_generated',
      }));
      
      const { error: insertError } = await supabase
        .from('question_bank')
        .insert(rowsToInsert);
        
      if (insertError) {
        console.error(`Error inserting questions for ${concept.title}:`, insertError);
      } else {
        console.log(`Inserted ${rowsToInsert.length} questions for ${concept.title}.`);
      }
      
    } catch (err) {
      console.error(`Error generating/parsing questions for ${concept.title}:`, err);
    }
  }
  
  console.log("Pipeline finished.");
}

main().catch(console.error);
