import { allVocabWords, getDistractors } from '../lib/data/startersVocabulary';
import fs from 'fs';
import path from 'path';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

async function run() {
  console.log("⚡ Generating randomized mixed question types Pre A1 Starters Wordlist Exam (Đề 01)...");

  // Shuffle all 215 words
  const shuffledWords = shuffle(allVocabWords);

  // We want: 10 MCQ, 6 Fill-blank, 4 Sentence Reorder
  const mcqWords = shuffledWords.slice(0, 10);
  const fillWords = shuffledWords.slice(10, 16);
  const reorderWords = shuffledWords.slice(16, 20);

  const questions: any[] = [];

  // 1. Generate 10 Multiple Choice Questions
  mcqWords.forEach((word) => {
    const isEnToVi = Math.random() > 0.5;
    const distractors = getDistractors(word, 3);

    if (isEnToVi) {
      const options = shuffle([word.vietnamese, ...distractors.map(d => d.vietnamese)]);
      const correctIndex = options.indexOf(word.vietnamese);
      questions.push({
        type: "multiple_choice",
        difficulty: 1.0,
        metadata_json: {
          question: `Từ nào sau đây là nghĩa tiếng Việt của từ tiếng Anh **"${word.english}"**?`,
          options: options,
          correct_index: correctIndex,
          explanation: `Trong tiếng Anh, **"${word.english}"** có nghĩa là **"${word.vietnamese}"**.`,
          tags: ["vocab", "en-to-vi"]
        }
      });
    } else {
      const options = shuffle([word.english, ...distractors.map(d => d.english)]);
      const correctIndex = options.indexOf(word.english);
      questions.push({
        type: "multiple_choice",
        difficulty: 1.0,
        metadata_json: {
          question: `Từ tiếng Anh nào sau đây có nghĩa tiếng Việt là **"${word.vietnamese}"**?`,
          options: options,
          correct_index: correctIndex,
          explanation: `Từ tiếng Anh mang ý nghĩa **"${word.vietnamese}"** là **"${word.english}"**.`,
          tags: ["vocab", "vi-to-en"]
        }
      });
    }
  });

  // 2. Generate 6 Fill in the Blank (Spelling) Questions
  fillWords.forEach((word) => {
    const wordLen = word.english.length;
    if (wordLen > 2) {
      // Pick a random char index to hide (excluding first and last characters for friendliness)
      const hideIdx = Math.floor(Math.random() * (wordLen - 2)) + 1;
      const hiddenChar = word.english[hideIdx];
      
      const questionWord = word.english.substring(0, hideIdx) + " _ " + word.english.substring(hideIdx + 1);

      // Generate choices (correct char + 3 other unique random lowercase alphabet letters)
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const otherLetters = alphabet.filter(l => l !== hiddenChar);
      const choices = shuffle([hiddenChar, ...shuffle(otherLetters).slice(0, 3)]);

      questions.push({
        type: "fill_blank",
        difficulty: 1.0,
        metadata_json: {
          question: `Điền chữ cái còn thiếu để hoàn chỉnh từ tiếng Anh mang nghĩa **"${word.vietnamese}"**: **${questionWord}**`,
          choices: choices,
          correct_answer: hiddenChar,
          explanation: `Từ đầy đủ là **"${word.english}"** có nghĩa là **"${word.vietnamese}"**.`,
          tags: ["spelling", "fill-blank"]
        }
      });
    } else {
      // Fallback to a simple MCQ if word is too short
      const distractors = getDistractors(word, 3);
      const options = shuffle([word.english, ...distractors.map(d => d.english)]);
      const correctIndex = options.indexOf(word.english);
      questions.push({
        type: "multiple_choice",
        difficulty: 1.0,
        metadata_json: {
          question: `Từ tiếng Anh nào có nghĩa là **"${word.vietnamese}"**?`,
          options: options,
          correct_index: correctIndex,
          explanation: `**"${word.english}"** nghĩa là **"${word.vietnamese}"**.`,
          tags: ["vocab"]
        }
      });
    }
  });

  // 3. Generate 4 Sentence Reorder Questions
  const sentenceTemplates = [
    { text: "This is my {word}", pos: "n" },
    { text: "I like the {word}", pos: "n" },
    { text: "Look at the {word}", pos: "n" },
    { text: "I can see a {word}", pos: "n" }
  ];

  reorderWords.forEach((word, idx) => {
    const template = sentenceTemplates[idx % sentenceTemplates.length];
    const correctSentence = template.text.replace("{word}", word.english);
    const wordsList = correctSentence.split(" ");
    const shuffledWordsList = shuffle(wordsList);

    // Make sure we actually shuffled
    if (JSON.stringify(wordsList) === JSON.stringify(shuffledWordsList)) {
      shuffledWordsList.reverse();
    }

    questions.push({
      type: "sentence_reorder",
      difficulty: 1.1,
      metadata_json: {
        question: `Sắp xếp các từ sau thành câu tiếng Anh có nghĩa:`,
        words: shuffledWordsList,
        correct_sentence: correctSentence,
        explanation: `Câu hoàn chỉnh đúng là: **"${correctSentence}"**.`,
        tags: ["grammar", "sentence-reorder"]
      }
    });
  });

  const outputJson = {
    collection: {
      title: "Worldlist",
      subject_slug: "pre-a1-starter",
      grade: 3,
      volume: 1,
      units: [1],
      sequence_number: 1,
      exam_type: null,
      reference_book: "Pre A1 Starters Wordlist",
      status: "published"
    },
    exams: [
      {
        exam_number: 1,
        title: "Đề 01",
        duration_minutes: 20,
        questions: questions
      }
    ]
  };

  const outPath = path.join(process.cwd(), 'content/exam-bank/starters-wordlist-pilot.json');
  fs.writeFileSync(outPath, JSON.stringify(outputJson, null, 2));
  console.log("✅ Successfully updated starters-wordlist-pilot.json with mixed question types");
}

run().catch(console.error);
