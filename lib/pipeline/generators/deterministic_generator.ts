import { createClient } from '@/lib/supabase/server';
import { EnglishAdapter } from '../../subjects/english/adapter';
import { MathAdapter } from '../../subjects/math/adapter';
import { SubjectAdapter } from '../../subjects/adapter';

export interface GeneratedQuestion {
  concept_id: string;
  blueprint_id: string;
  type: string;
  data: any;
  difficulty: number;
}

/**
 * Deterministic Question Generator
 * Generates structured questions based on rules, WITHOUT AI.
 */
export class DeterministicGenerator {
  private adapters: Record<string, SubjectAdapter> = {
    'english': new EnglishAdapter(),
    'tieng_anh': new EnglishAdapter(),
    'math': new MathAdapter(),
    'toan': new MathAdapter(),
  };
  
  /**
   * Main entry point for generation
   */
  async generate(conceptId: string, blueprintId: string): Promise<GeneratedQuestion | null> {
    const supabase = await createClient();
    // 1. Fetch Concept Data
    const { data: concept, error: conceptError } = await supabase
      .from('curriculum_concepts')
      .select('*, curriculum_lessons(unit_id, curriculum_units(subject))')
      .eq('id', conceptId)
      .single();

    if (conceptError || !concept) {
      console.error("Error fetching concept for generation:", conceptError);
      return null;
    }

    // 2. Fetch Blueprint Data
    const { data: blueprint, error: blueprintError } = await supabase
      .from('question_blueprints')
      .select('*')
      .eq('id', blueprintId)
      .single();

    if (blueprintError || !blueprint) {
      console.error("Error fetching blueprint for generation:", blueprintError);
      return null;
    }

    // 3. Resolve Subject Adapter
    const subject = concept.curriculum_lessons?.curriculum_units?.subject || 'english';
    const adapter = this.adapters[subject] || this.adapters['english'];

    // 4. Dispatch to adapter-specific rule-based generators
    const rules = adapter.getGeneratorRules();
    const generatorFn = rules[blueprintId];

    if (!generatorFn) {
      console.warn(`No deterministic rule for blueprint: ${blueprintId} in subject: ${subject}`);
      return null;
    }

    const questionData = await generatorFn(concept, {
        getDistractors: this.getDistractors.bind(this),
        getSiblings: this.getSiblings.bind(this),
        shuffle: this.shuffle.bind(this)
    });

    if (!questionData) return null;

    return {
      concept_id: concept.id,
      blueprint_id: blueprint.id,
      type: blueprint.interaction_type,
      data: questionData,
      difficulty: concept.difficulty || 1.0
    };
  }

  /**
   * Helper: Fetch distractors from the same unit/lesson to keep it relevant
   */
  public async getDistractors(concept: any, type: string, field: string, count: number): Promise<string[]> {
    const supabase = await createClient();
    const { data: siblingConcepts } = await supabase
      .from('curriculum_concepts')
      .select('content_json')
      .eq('concept_type', type)
      .neq('id', concept.id)
      .limit(20);

    if (!siblingConcepts || siblingConcepts.length === 0) {
      return ["Option A", "Option B", "Option C"].slice(0, count);
    }

    const pool = siblingConcepts
      .map(c => c.content_json[field])
      .filter(val => val !== concept.content_json[field] && val !== undefined);
    
    return this.shuffle(pool).slice(0, count);
  }

  public async getSiblings(concept: any, type: string, count: number) {
    const supabase = await createClient();
    return await supabase
      .from('curriculum_concepts')
      .select('content_json')
      .eq('concept_type', type)
      .neq('id', concept.id)
      .limit(count);
  }

  public shuffle(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
