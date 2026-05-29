import { GeneratedQuestion } from '../pipeline/generators/deterministic_generator';

/**
 * Subject Adapter Interface
 * Allows subject-specific logic to be plugged into the core pipeline.
 */
export interface SubjectAdapter {
  subjectId: string;
  
  /**
   * Returns subject-specific rules for deterministic generation.
   */
  getGeneratorRules(): Record<string, (concept: any, helper: any) => Promise<any>>;

  /**
   * Subject-specific validation logic.
   */
  validateLexical(data: any): { success: boolean; error?: string };

  /**
   * Prompt context builder for AI Enhancement.
   */
  getAIPromptContext(concept: any): string;
}
