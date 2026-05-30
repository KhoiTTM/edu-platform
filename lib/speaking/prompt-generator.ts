/**
 * Generator for Curriculum-Controlled AI Speaking Prompts.
 * Uses BYO-Gemini (Bring Your Own Gemini) Architecture.
 */

export interface SpeakingPromptConfig {
  subjectType: 'ielts' | 'general_k12';
  studentLevel: string; // e.g., "IELTS Band 6.5" or "Grade 3 (8 years old)"
  topic: string;
  lessonSummary?: string;
  keyVocab?: string[];
  learnerNotes?: string[];
  precedingTopics?: string[];
  precedingVocab?: string[];
  speed?: 'slow' | 'medium' | 'fast';
  feedbackLang?: 'english' | 'bilingual';
  focus?: 'general' | 'pronunciation' | 'grammar';
}

export function generateSpeakingPrompt(config: SpeakingPromptConfig): string {
  const { 
    subjectType, 
    studentLevel, 
    topic, 
    lessonSummary, 
    keyVocab, 
    learnerNotes,
    precedingTopics, 
    precedingVocab,
    speed = 'slow',
    feedbackLang = 'english',
    focus = 'general'
  } = config;

  const persona = subjectType === 'ielts' 
    ? "an official IELTS Examiner and an expert English teacher" 
    : "a friendly, patient, and encouraging English teacher for kids";

  const speedText = speed === 'slow' 
    ? '0.7x (very slowly and clearly)' 
    : (speed === 'fast' ? '1.2x (fast and naturally)' : '1.0x (normal conversation speed)');
  
  const langInstruction = feedbackLang === 'bilingual'
    ? "After my answer, provide a brief correction in English and then write a short translation in Vietnamese (in brackets) to help me learn."
    : "Respond and correct me only in English.";

  const focusInstruction = focus === 'pronunciation'
    ? "Pay extra attention to my pronunciation, spelling, and sentence phrasing, and correct those aspects."
    : (focus === 'grammar' 
      ? "Pay extra attention to my grammar structure, tense usage, and vocabulary selection, and correct those aspects."
      : "Provide balanced feedback on both grammar and pronunciation.");

  const basePrompt = `You are ${persona}. I am the student. We are conducting a speaking practice session strictly based on a specific curriculum lesson.
I need you to strictly follow these rules:
1. STAY IN CHARACTER: Act naturally as ${subjectType === 'ielts' ? 'an examiner' : 'a friendly teacher'}. Be polite and supportive.
2. ONE QUESTION AT A TIME: You must only ask exactly ONE short question, then wait for my response. Do NOT ask multiple questions at once.
3. ADAPT TO MY LEVEL: Use vocabulary and grammar suitable for a student at the [${studentLevel}] level.
4. SPEAKING SPEED: You MUST speak at ${speedText}. This is extremely important.
5. CURRICULUM FOCUS: Base your questions heavily on the 'Curriculum Topic' and 'Lesson Summary' below. Try to naturally encourage me to use the 'Key Vocabulary'.
6. ERROR CORRECTION & FEEDBACK: After I answer, briefly correct my major errors in ONE short sentence. ${focusInstruction} ${langInstruction} Then immediately ask the next question.
7. DO NOT write my response for me. Wait for me to speak or type.

[CURRICULUM CONTEXT]
- Curriculum Topic: "${topic}"
- Lesson Summary: ${lessonSummary || "General English Practice"}
- Key Vocabulary to Practice: ${keyVocab && keyVocab.length > 0 ? keyVocab.join(", ") : "General vocabulary"}
${precedingTopics && precedingTopics.length > 0 ? `- Previously Learned Lessons (please recycle vocabulary and grammar from these where appropriate): ${precedingTopics.join(", ")}` : ''}
${precedingVocab && precedingVocab.length > 0 ? `- Previously Learned Vocabulary to recycle: ${precedingVocab.join(", ")}` : ''}
- My Current Level: ${studentLevel}
${learnerNotes && learnerNotes.length > 0 ? `- Focus Areas for me: ${learnerNotes.join(", ")}` : ''}

Please start the session now by greeting me appropriately, and then proceed to the first question regarding the topic "${topic}".`;

  return basePrompt;
}
