import { createClient } from '@/lib/supabase/server';

export interface QuestionBankItem {
  id: string;
  concept_id: string;
  blueprint_id: string;
  type: string;
  difficulty: number;
  question_data: any;
  source_anchor: any;
}

/**
 * Question Bank Search Service
 * Finds existing validated questions for assessment generation.
 */
export class QuestionBankSearchService {
  /**
   * Finds validated questions for a list of concept IDs.
   */
  async findQuestionsByConcepts(conceptIds: string[], limit: number = 20): Promise<QuestionBankItem[]> {
    const supabase = await createClient();

    const { data: questions, error } = await supabase
      .from('question_bank')
      .select('*')
      .in('concept_id', conceptIds)
      .in('status', ['approved', 'draft'])
      .limit(limit);

    if (error) {
      console.error("Error searching question bank:", error);
      return [];
    }

    return questions as QuestionBankItem[];
  }
}
