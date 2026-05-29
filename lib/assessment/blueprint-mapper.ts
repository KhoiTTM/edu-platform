import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Blueprint {
  id: string;
  title: string;
  supported_concepts: string[];
  interaction_type: string;
  pedagogy_type: string;
}

/**
 * Mapping Engine: Links concepts to appropriate blueprints
 */
export async function getBlueprintsForConcept(conceptType: string): Promise<Blueprint[]> {
  const { data, error } = await supabase
    .from('question_blueprints')
    .select('*')
    .contains('supported_concepts', [conceptType]);

  if (error) {
    console.error("Error fetching blueprints for concept:", error);
    return [];
  }

  return data as Blueprint[];
}

/**
 * Advanced Mapping: Returns valid concept-blueprint pairs for a given lesson
 */
export async function getValidPairsForLesson(lessonId: string) {
  // 1. Fetch all concepts for the lesson
  const { data: concepts, error: conceptsError } = await supabase
    .from('curriculum_concepts')
    .select('id, concept_type, content_json')
    .eq('lesson_id', lessonId);

  if (conceptsError || !concepts) {
    console.error("Error fetching concepts for lesson:", conceptsError);
    return [];
  }

  // 2. For each concept, find matching blueprints
  const pairs = [];
  for (const concept of concepts) {
    const matchedBlueprints = await getBlueprintsForConcept(concept.concept_type);
    for (const blueprint of matchedBlueprints) {
      pairs.push({
        concept_id: concept.id,
        blueprint_id: blueprint.id,
        concept_type: concept.concept_type,
        interaction_type: blueprint.interaction_type
      });
    }
  }

  return pairs;
}
