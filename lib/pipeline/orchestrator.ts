import { DeterministicGenerator, GeneratedQuestion } from './generators/deterministic_generator';
import { AIEnhancer } from './generators/ai_enhancer';
import { StructuralValidator } from './validators/structural_validator';
import { CurriculumValidator } from './validators/curriculum_validator';
import { LexicalValidator, DuplicateDetector } from './validators/lexical_validator';

/**
 * Question Pipeline Orchestrator
 * Coordinates generation, AI enhancement, and validation.
 */
export class QuestionPipeline {
  private deterministicGenerator = new DeterministicGenerator();
  private aiEnhancer = new AIEnhancer();
  private structuralValidator = new StructuralValidator();
  private curriculumValidator = new CurriculumValidator();
  private lexicalValidator = new LexicalValidator();
  private duplicateDetector = new DuplicateDetector();

  /**
   * Generates and validates a high-quality question.
   */
  async generateQuestion(conceptId: string, blueprintId: string, allowedVocab: string[], existingHashes: string[] = [], modelName?: string): Promise<{
    question: GeneratedQuestion | null;
    logs: string[];
  }> {
    const logs: string[] = [];

    // 1. Deterministic Generation (Base Structure)
    logs.push("Starting deterministic generation...");
    let question = await this.deterministicGenerator.generate(conceptId, blueprintId);
    if (!question) {
      logs.push("Deterministic generation failed.");
      return { question: null, logs };
    }
    logs.push("Base structure generated.");

    // 2. AI Enhancement (Optional Layer)
    logs.push(`Starting AI enhancement (Model: ${modelName || 'default'})...`);
    question = await this.aiEnhancer.enhance(question, allowedVocab, modelName);
    logs.push("AI enhancement complete.");

    // 3. Multi-Stage Validation (Routing AI output back)
    logs.push("Starting multi-stage validation...");
    
    // 3.1 Structural
    const structural = this.structuralValidator.validate(blueprintId, question.data);
    if (!structural.success) {
      logs.push(`Validation Error (Structural): ${structural.error}`);
      return { question: null, logs };
    }

    // 3.2 Curriculum Scope
    const curriculum = this.curriculumValidator.validateScope(question.data, allowedVocab);
    if (!curriculum.success) {
      logs.push(`Validation Error (Curriculum): ${curriculum.error}`);
      return { question: null, logs };
    }

    // 3.3 Lexical Purity
    const lexical = this.lexicalValidator.validatePurity(JSON.stringify(question.data), 1);
    if (!lexical.success) {
      logs.push(`Validation Error (Lexical): ${lexical.error}`);
      return { question: null, logs };
    }

    // 3.4 Duplicate Detection
    const hash = this.duplicateDetector.generateHash(blueprintId, question.data);
    const isDuplicate = await this.duplicateDetector.isDuplicate(hash, existingHashes);
    if (isDuplicate) {
      logs.push("Validation Error (Duplicate): Question already exists.");
      return { question: null, logs };
    }

    logs.push("All validation checks passed.");
    return { question, logs };
  }
}
