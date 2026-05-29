import { DeterministicGenerator } from '../lib/pipeline/generators/deterministic_generator';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing Deterministic Generator...");
  
  // 1. Pick a concept from Unit 1 Lesson 1
  const { data: concept, error } = await supabase
    .from('curriculum_concepts')
    .select('id, concept_type')
    .eq('concept_type', 'vocabulary')
    .limit(1)
    .single();

  if (error || !concept) {
    console.error("Could not find a vocabulary concept to test.");
    return;
  }

  console.log(`Testing with concept: ${concept.id} (${concept.concept_type})`);

  const generator = new DeterministicGenerator();
  
  // 2. Generate using 'vocab_to_word' blueprint
  const question = await generator.generate(concept.id, 'vocab_to_word');

  if (question) {
    console.log("Successfully generated question:");
    console.log(JSON.stringify(question, null, 2));
  } else {
    console.error("Failed to generate question.");
  }
}

test().catch(console.error);
