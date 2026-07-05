import { CurriculumRetrievalService } from '../curriculum/retrieval-service';
import { QuestionBankSearchService, QuestionBankItem } from './search-service';
import { QuestionPipeline } from '../pipeline/orchestrator';
import { getBlueprintsForConcept } from './blueprint-mapper';
import { createClient } from '@/lib/supabase/server';

export interface GenerationRequest {
  title: string;
  subject: string;
  grade: number;
  unitNumbers: number[];
  count: number;
  prompt?: string;
  sourceId?: string; // PDF Source ID/Name
  modelId?: string; // SELECTED AI MODEL
  sequenceNumber?: number; // ORDER WITHIN UNIT
  volume?: number; // VOL 1, 2
  examType?: string; // unit_test, midterm, final, year_end
  difficulty?: number;
}

export interface ExamDraft {
  id: string;
  title: string;
  questions: any[];
}

/**
 * Assessment Studio Generation Engine
 * Orchestrates the creation and persistence of an exam draft.
 */
export class GenerationEngine {
  private retrievalService = new CurriculumRetrievalService();
  private searchService = new QuestionBankSearchService();
  private pipeline = new QuestionPipeline();

  /**
   * Generates and PERSISTS an exam draft based on teacher requirements.
   */
  async generateDraft(req: GenerationRequest): Promise<ExamDraft> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const searchSubject = req.subject === 'tieng_anh' ? 'english' : req.subject;

    console.log(`Generating draft for ${searchSubject} Grade ${req.grade}, Units: ${req.unitNumbers.join(', ')} using model: ${req.modelId || 'default'}`);

    // 1. Retrieve Canonical Concepts
    const concepts = await this.retrievalService.getConceptsByUnits(searchSubject, req.grade, req.unitNumbers);
    if (concepts.length === 0) {
      throw new Error(`No concepts found for ${searchSubject} Grade ${req.grade} Units ${req.unitNumbers.join(', ')}.`);
    }

    const conceptIds = concepts.map(c => c.id);

    // 2. Search for Existing Questions in Bank
    let finalQuestions: any[] = await this.searchService.findQuestionsByConcepts(conceptIds, req.count);
    
    // 3. If not enough questions, generate new ones
    if (finalQuestions.length < req.count) {
      const deficit = req.count - finalQuestions.length;
      const allowedVocab = concepts
        .filter(c => c.concept_type === 'vocabulary')
        .map(c => c.content_json.word)
        .filter(Boolean);

      for (let i = 0; i < deficit; i++) {
        const concept = concepts[Math.floor(Math.random() * concepts.length)];
        const blueprints = await getBlueprintsForConcept(concept.concept_type);
        if (blueprints.length === 0) continue;

        const blueprint = blueprints[Math.floor(Math.random() * blueprints.length)];

        // Run through pipeline
        const { question } = await this.pipeline.generateQuestion(concept.id, blueprint.id, allowedVocab, [], req.modelId);

        if (question) {
          // SAVE NEW QUESTION TO BANK AS DRAFT
          const { data: newQ, error: qError } = await supabase
            .from('question_bank')
            .insert({
                concept_id: concept.id,
                blueprint_id: blueprint.id,
                subject_slug: req.subject,
                grade: req.grade,
                type: question.type,
                difficulty: question.difficulty,
                metadata_json: question.data,
                source: 'ai_generated',
                source_anchor: concept.source_anchor,
                status: 'draft'
            })
            .select()
            .single();

          if (!qError && newQ) {
            finalQuestions.push(newQ);
          }
        }
      }
    }

    // 4. PERSISTENCE: Save to Assessment Studio tables
    const { data: collection, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: req.title || `${req.subject.toUpperCase()} Assessment`,
        subject_slug: req.subject,
        grade: req.grade,
        units: req.unitNumbers,
        volume: req.volume, // NEW COLUMN
        exam_type: req.examType || 'unit_test', // NEW COLUMN
        sequence_number: req.sequenceNumber || 1,
        prompt_context: req.prompt,
        reference_book: req.sourceId,
        created_by: user?.id,
        status: 'draft'
      })
      .select()
      .single();

    if (colError) throw colError;

    const { data: exam, error: examError } = await supabase
      .from('exams')
      .insert({
        collection_id: collection.id,
        title: req.title,
        total_questions: finalQuestions.length,
        generation_mode: 'balanced'
      })
      .select()
      .single();

    if (examError) throw examError;

    // 5. Link Questions to Exam
    const examQuestions = finalQuestions.map((q, idx) => ({
        exam_id: exam.id,
        question_bank_id: q.id,
        order_index: idx
    }));

    if (examQuestions.length > 0) {
        await supabase.from('exam_questions').insert(examQuestions);
    }

    return {
      id: exam.id,
      title: exam.title,
      questions: finalQuestions.slice(0, req.count)
    };
  }
}
