import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const AIQuestionSchema = z.object({
  question: z.string().min(10),
  options: z.array(z.string()).length(4),
  correct_index: z.number().min(0).max(3),
  explanation: z.string().min(10),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  concept_id: z.string().uuid(),
});

export type AIQuestion = z.infer<typeof AIQuestionSchema>;

export async function generateAIQuestions(
  conceptId: string,
  oldConcepts: { id: string; title: string }[],
  conceptName: string,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number,
  language: 'vi' | 'en' = 'vi'
): Promise<AIQuestion[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const oldConceptsStr = oldConcepts && oldConcepts.length > 0 
    ? oldConcepts.map(c => c.title).join(', ') 
    : '';

  const validConceptIds = [conceptId, ...(oldConcepts || []).map(c => c.id)].join(', ');

  const distributionText = oldConcepts && oldConcepts.length > 0
    ? `DISTRIBUTION:\n- 60% of the questions must focus on the current knowledge (Concept: ${conceptName}).\n- 40% of the questions must integrate or focus on older/previous knowledge (Concepts: ${oldConceptsStr}).`
    : `DISTRIBUTION:\n- 100% of the questions must focus on the current knowledge (Concept: ${conceptName}).`;

  const prompt = `
System: You are an adaptive learning assessment generator.
Generate ${count} multiple-choice questions.
Concept: ${conceptName}
Difficulty: ${difficulty}
Language: ${language === 'vi' ? 'Vietnamese' : 'English'}

${distributionText}

REQUIREMENTS:
- Format: A JSON array of objects matching this schema:
  {
    "question": "question text",
    "options": ["A", "B", "C", "D"],
    "correct_index": 0-3,
    "explanation": "why it is correct",
    "difficulty": "${difficulty}",
    "concept_id": "Must be exactly one of these IDs: ${validConceptIds}"
  }
- Make sure the JSON is valid and contains exactly ${count} items.
- Output ONLY valid JSON, without any markdown formatting like \`\`\`json.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Attempt to parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
    } catch (e) {
      console.error('Failed to parse Gemini output as JSON', responseText);
      return [];
    }

    if (!Array.isArray(parsedData)) {
      return [];
    }

    const validatedQuestions: AIQuestion[] = [];
    for (const item of parsedData) {
      const parsed = AIQuestionSchema.safeParse(item);
      if (parsed.success) {
        validatedQuestions.push(parsed.data);
      }
    }

    return validatedQuestions;
  } catch (error) {
    console.error('Error generating AI questions:', error);
    return [];
  }
}
