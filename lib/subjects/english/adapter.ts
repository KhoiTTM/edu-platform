import { SubjectAdapter } from '../adapter';

export class EnglishAdapter implements SubjectAdapter {
  subjectId = 'english';

  getGeneratorRules() {
    return {
      'vocab_to_word': async (concept: any, helper: any) => {
        const { word, meaning_vi } = concept.content_json;
        const distractors = await helper.getDistractors(concept, 'vocabulary', 'meaning_vi', 3);
        return {
          question: `What is the meaning of "${word}"?`,
          correct_answer: meaning_vi,
          options: helper.shuffle([meaning_vi, ...distractors]),
          metadata: { word, phonetic: concept.content_json.pronunciation }
        };
      },
      'sentence_reorder': async (concept: any, helper: any) => {
        const { example, meaning_vi } = concept.content_json;
        if (!example) return null;
        const words = example.split(' ').filter((w: string) => w.length > 0);
        return {
          instruction: "Arrange the words to make a correct sentence.",
          hint: meaning_vi,
          correct_sequence: words,
          shuffled_words: helper.shuffle([...words]),
        };
      },
      'tap_correct_word': async (concept: any, helper: any) => {
        const { word, meaning_vi } = concept.content_json;
        const distractors = await helper.getDistractors(concept, 'vocabulary', 'word', 3);
        return {
          instruction: `Select the word for "${meaning_vi}"`,
          correct_word: word,
          options: helper.shuffle([word, ...distractors])
        };
      },
      'fill_blank': async (concept: any, helper: any) => {
        const { pattern, example, meaning_vi } = concept.content_json;
        // If concept is vocabulary, wrap in simple sentence
        if (concept.concept_type === 'vocabulary') {
            const word = concept.content_json.word;
            const distractors = await helper.getDistractors(concept, 'vocabulary', 'word', 3);
            return {
                question: `It is a ____.`,
                correct_answer: word,
                options: helper.shuffle([word, ...distractors]),
                metadata: { hint: meaning_vi }
            };
        }
        // If sentence pattern
        const text = example || pattern;
        if (!text) return null;
        const words = text.split(' ');
        const target = words[words.length - 1].replace(/[.!?]/g, '');
        const questionText = text.replace(target, '____');
        const distractors = await helper.getDistractors(concept, 'vocabulary', 'word', 3);

        return {
            question: questionText,
            correct_answer: target,
            options: helper.shuffle([target, ...distractors]),
            metadata: { hint: meaning_vi }
        };
      },
      'vocab_to_image': async (concept: any, helper: any) => {
        const { word, meaning_vi } = concept.content_json;
        const distractors = await helper.getDistractors(concept, 'vocabulary', 'meaning_vi', 3);
        return {
          instruction: `Which one is "${word}"?`,
          correct_answer: meaning_vi,
          image_url: `https://placeholder.edu/images/${word.toLowerCase()}.png`,
          options: helper.shuffle([meaning_vi, ...distractors])
        };
      },
      'match_pair': async (concept: any, helper: any) => {
        const { word, meaning_vi } = concept.content_json;
        // Logic: Create 3 pairs from siblings
        const { data: siblings } = await helper.getSiblings(concept, 'vocabulary', 3);
        const pairs = [
            { left: word, right: meaning_vi },
            ...(siblings || []).map((s: any) => ({ left: s.content_json.word, right: s.content_json.meaning_vi }))
        ];
        return {
            instruction: "Match the words with their meanings",
            pairs: helper.shuffle(pairs)
        };
      }
    };
  }

  validateLexical(data: any) {
    // English specific lexical checks (e.g. no advanced grammar)
    return { success: true };
  }

  getAIPromptContext(concept: any) {
    return "This is a Grade 3 English concept focused on basic communication.";
  }
}
