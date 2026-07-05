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

/**
 * Generates a strictly controlled IELTS Speaking prompt for Gemini/ChatGPT.
 * Enforces the "Curriculum Controls AI" principle.
 */
export function generateIeltsPrompt(
  unitTopic: string, 
  part: 1 | 2 | 3, 
  targetBand: string,
  lessonSummary?: string,
  keyVocab?: string[]
): string {
  const partGuidelines = {
    1: `PART 1: Introduction and Interview (4-5 minutes).
- Focus: General questions about familiar topics (Hometown, Work, Studies, etc.).
- Your Task: Ask me 3-4 questions about "${unitTopic}". 
- Rule: Ask ONE question at a time and wait for my response.`,
    2: `PART 2: Individual Long Turn (3-4 minutes).
- Focus: You provide a cue card topic and I must talk for 1-2 minutes.
- Your Task: Provide a clear Cue Card about "${unitTopic}" with 3-4 specific points to cover.
- Rule: Tell me I have 1 minute to prepare. Wait for me to say I'm ready or wait exactly 60 seconds if we were in a live voice session (but here, just wait for my signal).`,
    3: `PART 3: Two-way Discussion (4-5 minutes).
- Focus: Abstract questions related to the topic in Part 2.
- Your Task: Ask me complex, analytical questions about "${unitTopic}" in a broader social context.
- Rule: Push me to expand my answers and use academic vocabulary.`
  };

  const bandPersona = {
    "6.5": "Expect some complex sentences but frequent minor errors. Help me transition to Band 7 by correcting my word choice.",
    "7.0": "I can speak at length. Focus your feedback on idiomatic expressions and precision.",
    "7.5": "I am highly fluent. Challenge me with very abstract follow-up questions to reach Band 8.0."
  };

  const curriculumGrounding = lessonSummary || (keyVocab && keyVocab.length > 0)
    ? `\n[CURRICULUM CONTEXT]
${lessonSummary ? `- Lesson Summary: ${lessonSummary}` : ""}
${keyVocab && keyVocab.length > 0 ? `- Key Vocabulary to encourage: ${keyVocab.join(", ")}` : ""}
` : "";

  return `You are an expert IELTS Examiner. I am your candidate. 
We are practicing for the IELTS Speaking Test, specifically ${part === 1 ? 'Part 1' : part === 2 ? 'Part 2' : 'Part 3'}.

TOPIC: "${unitTopic}"
MY TARGET BAND: ${targetBand}
${bandPersona[targetBand as keyof typeof bandPersona] || ""}${curriculumGrounding}

STRICT OPERATIONAL RULES:
1. NO MULTI-QUESTIONS: For Parts 1 and 3, ask exactly ONE short question at a time.
2. FEEDBACK FIRST: After I speak, provide a brief (15-20 words) correction or tip for my last answer BEFORE asking the next question.
3. STAY IN CHARACTER: Do not say "As an AI..." or "I am a language model". You ARE the examiner.
4. USE TOPIC CONTEXT: Focus your questions on "${unitTopic}".

Please begin the session now by introducing the section and asking the first question (or providing the cue card if Part 2).`;
}


