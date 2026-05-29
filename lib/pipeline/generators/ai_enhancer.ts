import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedQuestion } from './deterministic_generator';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * AI Enhancement Layer
 * Safely uses AI to enhance deterministic questions (distractors, explanations, variations).
 * Principle: CURRICULUM CONTROLS AI.
 */
export class AIEnhancer {
  /**
   * Enhances a question with AI-generated distractors and explanations.
   * Includes exponential backoff for 429s.
   */
  async enhance(question: GeneratedQuestion, allowedVocab: string[], modelName: string = 'gemini-flash-latest'): Promise<GeneratedQuestion> {
    return this.enhanceWithRetry(question, allowedVocab, modelName, 3);
  }

  private async enhanceWithRetry(question: GeneratedQuestion, allowedVocab: string[], modelName: string, retries: number): Promise<GeneratedQuestion> {
    const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are an expert educational AI. Your task is to ENHANCE a base question for Grade 3 English students.
      
      BASE QUESTION:
      ${JSON.stringify(question.data, null, 2)}
      
      ALLOWED VOCABULARY POOL:
      ${allowedVocab.join(', ')}
      
      TASK:
      1. Generate 3 realistic but clearly incorrect distractors from the ALLOWED VOCABULARY POOL only.
      2. Write a very simple, encouraging explanation for the correct answer (max 15 words).
      3. Paraphrase the instruction to be more playful for a child.
      
      CONSTRAINTS:
      - ONLY use words from the ALLOWED VOCABULARY POOL for distractors.
      - Keep language extremely simple (Grade 3 level).
      - Return the enhanced question data in the same JSON structure.
      
      Return ONLY valid JSON.
    `;

    try {
      const result = await model.generateContent(prompt);
      const enhancedData = JSON.parse(result.response.text());
      
      return {
        ...question,
        data: enhancedData,
        generated_by: 'ai_enhanced'
      } as any;
    } catch (error: any) {
      if (error.status === 429 && retries > 0) {
          const waitTime = (4 - retries) * 10000; // 10s, 20s, 30s...
          console.warn(`AI Rate Limited (429). Retrying in ${waitTime/1000}s... (${retries} left)`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return this.enhanceWithRetry(question, allowedVocab, modelName, retries - 1);
      }
      console.error("AI Enhancement failed, falling back to deterministic base:", error.message || error);
      return question;
    }
  }

  /**
   * Generates distractor options for a given word using allowed pool.
   */
  async generateDistractors(target: string, pool: string[], count: number = 3): Promise<string[]> {
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-flash-latest',
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Pick ${count} distractors for the word "${target}" from this list: [${pool.join(', ')}].
      The distractors should be semantically related if possible but clearly different.
      Return a JSON array of strings.
    `;
    
    try {
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      return pool.filter(w => w !== target).slice(0, count);
    }
  }
}
