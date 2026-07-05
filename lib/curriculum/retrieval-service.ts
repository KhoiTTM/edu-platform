import { createClient } from '@/lib/supabase/server';

export interface Concept {
  id: string;
  lesson_id: string;
  concept_type: string;
  content_json: any;
  difficulty: number;
  source_anchor: any;
}

/**
 * Curriculum Retrieval Service
 * Fetches canonical curriculum data for assessment generation.
 */
export class CurriculumRetrievalService {
  /**
   * Fetches concepts for a specific grade and list of unit numbers.
   */
  async getConceptsByUnits(subject: string, grade: number, unitNumbers: number[]): Promise<Concept[]> {
    const supabase = await createClient();

    // 1. Get Unit IDs
    const { data: units, error: unitsError } = await supabase
      .from('curriculum_units')
      .select('id')
      .eq('subject', subject)
      .eq('grade', grade)
      .in('unit_number', unitNumbers);

    if (unitsError || !units) {
      console.error("Error fetching units:", unitsError);
      return [];
    }

    const unitIds = units.map(u => u.id);

    // 2. Get Lesson IDs
    const { data: lessons, error: lessonsError } = await supabase
      .from('curriculum_lessons')
      .select('id')
      .in('unit_id', unitIds);

    if (lessonsError || !lessons) {
      console.error("Error fetching lessons:", lessonsError);
      return [];
    }

    const lessonIds = lessons.map(l => l.id);

    // 3. Get Concepts
    const { data: concepts, error: conceptsError } = await supabase
      .from('curriculum_concepts')
      .select('*')
      .in('lesson_id', lessonIds);

    if (conceptsError || !concepts) {
      console.error("Error fetching concepts:", conceptsError);
      return [];
    }

    return concepts as Concept[];
  }
}
