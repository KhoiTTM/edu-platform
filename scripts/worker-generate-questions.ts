import { createClient } from '@supabase/supabase-js';
import { QuestionPipeline } from '../lib/pipeline/orchestrator';
import { DuplicateDetector } from '../lib/pipeline/validators/lexical_validator';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const pipeline = new QuestionPipeline();
const duplicateDetector = new DuplicateDetector();

async function runWorker(targetPerConcept: number = 5) {
  console.log(`Starting Question Bank Worker (Target: ${targetPerConcept} variations per concept)...`);

  // 1. Fetch all curriculum concepts
  const { data: concepts, error: conceptsError } = await supabase
    .from('curriculum_concepts')
    .select('*, curriculum_lessons(unit_id)');

  if (conceptsError || !concepts) {
    console.error("Error fetching concepts:", conceptsError);
    return;
  }

  console.log(`Found ${concepts.length} concepts to process.`);

  for (const concept of concepts) {
    console.log(`\n--- Processing Concept: ${concept.id} (${concept.concept_type}) ---`);

    // 2. Identify compatible blueprints
    const { data: blueprints } = await supabase
      .from('question_blueprints')
      .select('id')
      .contains('supported_concepts', [concept.concept_type]);

    if (!blueprints || blueprints.length === 0) {
      console.warn(`No blueprints found for concept type: ${concept.concept_type}`);
      continue;
    }

    // 3. Fetch existing hashes for this concept to avoid duplicates
    const { data: existing } = await supabase
      .from('question_bank')
      .select('hash')
      .eq('concept_id', concept.id);
    
    const existingHashes = existing?.map(e => e.hash).filter(Boolean) as string[] || [];

    // 4. Fetch allowed vocab pool for distractors (sibling concepts in the same unit)
    const unitId = concept.curriculum_lessons?.unit_id;
    const { data: siblings } = await supabase
      .from('curriculum_concepts')
      .select('content_json')
      .eq('concept_type', 'vocabulary'); // Mostly needed for vocab distractors
    
    const allowedVocab = siblings?.map(s => s.content_json.word).filter(Boolean) || [];
    // Add current concept's word if it's vocabulary
    if (concept.concept_type === 'vocabulary' && concept.content_json.word) {
        allowedVocab.push(concept.content_json.word);
    }

    // 5. Generate until target is met
    let currentCount = existingHashes.length;
    let attempts = 0;
    const maxAttempts = targetPerConcept * 3;

    while (currentCount < targetPerConcept && attempts < maxAttempts) {
      attempts++;
      const blueprintId = blueprints[attempts % blueprints.length].id;
      
      console.log(`Attempt ${attempts}: Generating with blueprint ${blueprintId}...`);
      
      const { question, logs } = await pipeline.generateQuestion(concept.id, blueprintId, allowedVocab, existingHashes);

      if (question) {
        const hash = duplicateDetector.generateHash(blueprintId, question.data);
        
        // Save to DB
        const { error: insertError } = await supabase
          .from('question_bank')
          .insert({
            concept_id: concept.id,
            blueprint_id: blueprintId,
            type: question.type,
            difficulty: question.difficulty,
            metadata_json: question.data,
            source: 'ai_generated', // Orchestrator handles AI enhancement
            hash: hash,
            source_anchor: concept.source_anchor,
            generated_by: (question as any).generated_by || 'deterministic'
          });

        if (insertError) {
          console.error("Failed to insert question:", insertError.message);
          await logValidation(concept.id, blueprintId, 'failed', insertError.message, logs);
        } else {
          console.log("Successfully generated and saved question.");
          await logValidation(concept.id, blueprintId, 'success', null, logs);
          existingHashes.push(hash);
          currentCount++;
        }
      } else {
        console.warn("Generation/Validation failed.");
        const lastLog = logs[logs.length - 1];
        await logValidation(concept.id, blueprintId, 'failed', lastLog, logs);
      }
    }

    console.log(`Finished concept ${concept.id}. Generated ${currentCount} total questions.`);
  }

  console.log("\nWorker finished.");
}

async function logValidation(conceptId: string, blueprintId: string, status: string, error: string | null, logs: string[]) {
  await supabase
    .from('validation_logs')
    .insert({
      concept_id: conceptId,
      blueprint_id: blueprintId,
      status: status,
      error_message: error,
      logs: logs
    });
}

runWorker(5).catch(console.error);
