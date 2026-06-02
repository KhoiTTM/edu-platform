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

    return (questions || []).map((q: any) => ({
      id: q.id,
      concept_id: q.concept_id,
      blueprint_id: q.blueprint_id,
      type: q.type,
      difficulty: q.difficulty,
      subject_slug: q.subject_slug,
      grade: q.grade,
      source_anchor: q.source_anchor,
      ...(q.metadata_json || {}),
      options: q.metadata_json?.options || q.metadata_json?.choices || [],
      choices: q.metadata_json?.choices || q.metadata_json?.options || [],
      question: q.metadata_json?.question || q.metadata_json?.prompt || '',
      correct_index: q.metadata_json?.correct_index !== undefined ? q.metadata_json.correct_index : q.metadata_json?.correct_answer_index,
      correct_answer: q.metadata_json?.correct_answer || q.metadata_json?.correct_word || ''
    })) as any[];
  }
}
