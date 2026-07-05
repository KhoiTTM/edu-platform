import { z } from 'zod';

/**
 * Structural Validator
 * Uses Zod to ensure the generated question data matches the expected schema.
 */

export const TapWordSchema = z.object({
  instruction: z.string().min(3),
  correct_word: z.string().min(1),
  options: z.array(z.string()).min(2),
});

export const MultipleChoiceSchema = z.object({
  question: z.string().min(3),
  correct_answer: z.string().min(1),
  options: z.array(z.string()).min(2),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const SentenceReorderSchema = z.object({
  instruction: z.string().min(3),
  hint: z.string().optional(),
  correct_sequence: z.array(z.string()).min(2),
  shuffled_words: z.array(z.string()).min(2),
});

export const BlueprintSchemas: Record<string, z.ZodObject<any>> = {
  'tap_correct_word': TapWordSchema,
  'vocab_to_word': MultipleChoiceSchema,
  'sentence_reorder': SentenceReorderSchema,
};

export class StructuralValidator {
  /**
   * Validates the structure of a generated question against its blueprint schema.
   */
  validate(blueprintId: string, data: any): { success: boolean; error?: string } {
    const schema = BlueprintSchemas[blueprintId];
    if (!schema) {
      return { success: false, error: `No validation schema found for blueprint: ${blueprintId}` };
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') };
    }

    return { success: true };
  }
}
