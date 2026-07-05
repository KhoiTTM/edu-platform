import { SubjectAdapter } from '../adapter';

export class MathAdapter implements SubjectAdapter {
  subjectId = 'math';

  getGeneratorRules() {
    return {
      'equation_solve': async (concept: any, helper: any) => {
        const { equation, answer } = concept.content_json;
        return {
          question: `Giải phương trình: ${equation}`,
          correct_answer: answer,
          options: helper.shuffle([answer, "10", "15", "20"]), // Placeholder distractors
          interaction_type: 'type' // Math often uses input typing
        };
      }
    };
  }

  validateLexical(data: any) {
    // Math specific checks (e.g. valid formula)
    return { success: true };
  }

  getAIPromptContext(concept: any) {
    return "This is a Grade 3 Math concept. Use LaTeX-like formatting for equations.";
  }
}
