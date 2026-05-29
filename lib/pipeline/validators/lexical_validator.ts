import { createHash } from 'crypto';

/**
 * Lexical Validator & Duplicate Detection
 */

export class LexicalValidator {
  /**
   * Prevents out-of-scope vocabulary by checking against a blacklist or a specific difficulty level.
   */
  validatePurity(text: string, allowedLevel: number): { success: boolean; error?: string } {
    // Simple demo: prohibit certain "advanced" characters or words for Grade 3 (Level 1)
    if (allowedLevel === 1) {
      const advancedIndicators = [';', '{', '}', 'furthermore', 'nevertheless', 'consequently'];
      for (const indicator of advancedIndicators) {
        if (text.toLowerCase().includes(indicator)) {
          return { success: false, error: `Content contains advanced lexical tokens ("${indicator}") not suitable for Grade 3.` };
        }
      }
    }
    return { success: true };
  }
}

export class DuplicateDetector {
  /**
   * Generates a stable hash for a question to detect duplicates.
   */
  generateHash(blueprintId: string, questionData: any): string {
    const dataString = JSON.stringify({
      b: blueprintId,
      d: questionData
    });
    return createHash('md5').update(dataString).digest('hex');
  }

  /**
   * Checks if a hash already exists in the question bank.
   * Note: In a real app, this would query the DB.
   */
  async isDuplicate(hash: string, existingHashes: string[]): Promise<boolean> {
    return existingHashes.includes(hash);
  }
}
