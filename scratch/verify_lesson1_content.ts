import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function verify() {
  console.log("--- VERIFYING LESSON 1 DATA DIRECTLY ---");

  // Check curriculum node
  const { data: node } = await supabase
    .from('curriculum_nodes')
    .select('id, title, slug, metadata')
    .eq('slug', 'bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!node) {
    console.error("❌ Lesson 1 node NOT found!");
    return;
  }
  console.log(`✅ Found Node: ${node.title} | Metadata contains grammar_tutorial: ${!!node.metadata?.grammar_tutorial}`);

  // Check concept
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!concept) {
    console.error("❌ Concept NOT found!");
    return;
  }

  // Fetch questions directly from question_bank
  const { data: rawQuestions, error } = await supabase
    .from('question_bank')
    .select('*')
    .eq('concept_id', concept.id);

  if (error) {
    console.error("❌ Error fetching questions:", error.message);
    return;
  }

  const questions = (rawQuestions || []).map((q: any) => ({
    id: q.id,
    concept_id: q.concept_id,
    type: q.type,
    difficulty: q.difficulty,
    ...(q.metadata_json || {}),
    options: q.metadata_json?.options || q.metadata_json?.choices || [],
    choices: q.metadata_json?.choices || q.metadata_json?.options || [],
    question: q.metadata_json?.question || q.metadata_json?.prompt || '',
    correct_index: q.metadata_json?.correct_index !== undefined ? q.metadata_json.correct_index : q.metadata_json?.correct_answer_index,
    correct_answer: q.metadata_json?.correct_answer || q.metadata_json?.correct_word || ''
  }));

  console.log(`✅ Found ${questions.length} questions for Lesson 1 in question_bank:`);
  questions.forEach((q, idx) => {
    console.log(`\nQuestion ${idx + 1} (Diff: ${q.difficulty}):`);
    console.log(` - Text: ${q.question}`);
    console.log(` - Choices: ${q.choices.join(', ')}`);
    console.log(` - Correct answer index: ${q.correct_index}`);
    console.log(` - Correct answer value: ${q.correct_answer}`);
    console.log(` - Explanation: ${q.explanation}`);
  });
}

verify();
