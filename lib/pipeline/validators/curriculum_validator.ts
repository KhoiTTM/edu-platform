/**
 * Curriculum Validator
 * Ensures the question correctly links to the textbook and matches the curriculum scope.
 */

export interface SourceAnchor {
  book: string;
  unit: number;
  lesson: number;
  page?: number;
  activity?: string;
}

export class CurriculumValidator {
  /**
   * Validates if the source anchor is complete and correct.
   */
  validateSourceAnchor(anchor: any): { success: boolean; error?: string } {
    if (!anchor || typeof anchor !== 'object') {
      return { success: false, error: "Missing or invalid source anchor object" };
    }

    const requiredFields = ['book', 'unit', 'lesson'];
    for (const field of requiredFields) {
      if (!anchor[field]) {
        return { success: false, error: `Missing required source anchor field: ${field}` };
      }
    }

    return { success: true };
  }

  /**
   * Validates if the question content matches the lesson's target vocabulary/grammar pool.
   * Note: This usually requires fetching the 'allowed' set from the DB.
   */
  validateScope(questionData: any, allowedVocab: string[]): { success: boolean; error?: string } {
    // Basic implementation: check if the 'correct' parts of the question are in the allowed pool.
    // In a real scenario, this would scan the entire question text.
    
    const targetWords = [];
    if (questionData.correct_word) targetWords.push(questionData.correct_word);
    if (questionData.correct_answer) targetWords.push(questionData.correct_answer);
    if (questionData.correct_sequence) targetWords.push(...questionData.correct_sequence);

    for (const word of targetWords) {
      // Very loose check for demo (lowercase, trimmed)
      const cleanWord = word.toString().toLowerCase().trim();
      const isAllowed = allowedVocab.some(v => v.toLowerCase().trim() === cleanWord);
      
      if (!isAllowed) {
        return { success: false, error: `Word "${word}" is outside the lesson's defined curriculum scope.` };
      }
    }

    return { success: true };
  }
}
