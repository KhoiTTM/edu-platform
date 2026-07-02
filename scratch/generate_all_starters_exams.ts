import { allVocabWords, getDistractors } from '../lib/data/startersVocabulary';
import fs from 'fs';
import path from 'path';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

async function run() {
  console.log("⚡ Generating 20 randomized exams covering all 215 words with Emojis in prompts only...");

  const totalExams = 20;
  const questionsPerExam = 20;
  
  let depletionPool: typeof allVocabWords = [];

  function drawWords(count: number): typeof allVocabWords {
    const drawn: typeof allVocabWords = [];
    while (drawn.length < count) {
      if (depletionPool.length === 0) {
        depletionPool = shuffle(allVocabWords);
      }
      drawn.push(depletionPool.pop()!);
    }
    return drawn;
  }

  const exams: any[] = [];

  const sentenceTemplates = [
    { text: "This is my {word}", pos: "n" },
    { text: "I like the {word}", pos: "n" },
    { text: "Look at the {word}", pos: "n" },
    { text: "I can see a {word}", pos: "n" }
  ];

  for (let examNum = 1; examNum <= totalExams; examNum++) {
    const examWords = drawWords(questionsPerExam);
    
    // Distribute: 8 MCQ, 4 Listening MCQ, 4 Fill-blank, 4 Sentence Reorder
    const mcqWords = examWords.slice(0, 8);
    const listeningWords = examWords.slice(8, 12);
    const fillWords = examWords.slice(12, 16);
    const reorderWords = examWords.slice(16, 20);

    const questions: any[] = [];

    // Helper to get emoji suffix safely
    const getEmoji = (word: any) => word.emoji ? ` ${word.emoji}` : '';

    // 1. MCQ Questions (8)
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
            question: `Từ nào sau đây là nghĩa tiếng Việt của từ tiếng Anh **"${word.english}"**${getEmoji(word)}?`,
            options: options,
            correct_index: correctIndex,
            explanation: `Trong tiếng Anh, **"${word.english}"**${getEmoji(word)} có nghĩa là **"${word.vietnamese}"**.`,
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
            question: `Từ tiếng Anh nào sau đây có nghĩa tiếng Việt là **"${word.vietnamese}"**${getEmoji(word)}?`,
            options: options,
            correct_index: correctIndex,
            explanation: `Từ tiếng Anh mang ý nghĩa **"${word.vietnamese}"** là **"${word.english}"**${getEmoji(word)}.`,
            tags: ["vocab", "vi-to-en"]
          }
        });
      }
    });

    // 2. Listening MCQ Questions (4)
    listeningWords.forEach((word) => {
      const isPickText = Math.random() > 0.5;
      const distractors = getDistractors(word, 3);

      if (isPickText) {
        const options = shuffle([word.english, ...distractors.map(d => d.english)]);
        const correctIndex = options.indexOf(word.english);
        questions.push({
          type: "listening_multiple_choice",
          difficulty: 1.0,
          metadata_json: {
            question: `Nghe âm thanh phát âm và chọn từ tiếng Anh đúng${getEmoji(word)}:`,
            audio_text: word.english,
            options: options,
            correct_index: correctIndex,
            explanation: `Phát âm trên là của từ **"${word.english}"**${getEmoji(word)} (nghĩa là: ${word.vietnamese}).`,
            tags: ["listening", "spelling"]
          }
        });
      } else {
        const options = shuffle([word.vietnamese, ...distractors.map(d => d.vietnamese)]);
        const correctIndex = options.indexOf(word.vietnamese);
        questions.push({
          type: "listening_multiple_choice",
          difficulty: 1.0,
          metadata_json: {
            question: `Nghe âm thanh phát âm và chọn nghĩa tiếng Việt đúng${getEmoji(word)}:`,
            audio_text: word.english,
            options: options,
            correct_index: correctIndex,
            explanation: `Từ phát âm là **"${word.english}"**, nghĩa tiếng Việt là **"${word.vietnamese}"**${getEmoji(word)}.`,
            tags: ["listening", "meaning"]
          }
        });
      }
    });

    // 3. Fill in the Blank Questions (4)
    fillWords.forEach((word) => {
      const wordLen = word.english.length;
      if (wordLen > 2) {
        const hideIdx = Math.floor(Math.random() * (wordLen - 2)) + 1;
        const hiddenChar = word.english[hideIdx];
        const questionWord = word.english.substring(0, hideIdx) + " _ " + word.english.substring(hideIdx + 1);

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const otherLetters = alphabet.filter(l => l !== hiddenChar);
        const choices = shuffle([hiddenChar, ...shuffle(otherLetters).slice(0, 3)]);

        questions.push({
          type: "fill_blank",
          difficulty: 1.0,
          metadata_json: {
            question: `Điền chữ cái còn thiếu để hoàn chỉnh từ tiếng Anh mang nghĩa **"${word.vietnamese}"**${getEmoji(word)}: **${questionWord}**`,
            choices: choices,
            correct_answer: hiddenChar,
            explanation: `Từ đầy đủ là **"${word.english}"**${getEmoji(word)} có nghĩa là **"${word.vietnamese}"**.`,
            tags: ["spelling", "fill-blank"]
          }
        });
      } else {
        const distractors = getDistractors(word, 3);
        const options = shuffle([word.english, ...distractors.map(d => d.english)]);
        const correctIndex = options.indexOf(word.english);
        questions.push({
          type: "multiple_choice",
          difficulty: 1.0,
          metadata_json: {
            question: `Từ tiếng Anh nào có nghĩa là **"${word.vietnamese}"**${getEmoji(word)}?`,
            options: options,
            correct_index: correctIndex,
            explanation: `**"${word.english}"**${getEmoji(word)} nghĩa là **"${word.vietnamese}"**.`,
            tags: ["vocab"]
          }
        });
      }
    });

    // 4. Sentence Reorder Questions (4)
    reorderWords.forEach((word, idx) => {
      const template = sentenceTemplates[idx % sentenceTemplates.length];
      const correctSentence = template.text.replace("{word}", word.english);
      const wordsList = correctSentence.split(" ");
      const shuffledWordsList = shuffle(wordsList);

      if (JSON.stringify(wordsList) === JSON.stringify(shuffledWordsList)) {
        shuffledWordsList.reverse();
      }

      questions.push({
        type: "sentence_reorder",
        difficulty: 1.1,
        metadata_json: {
          question: `Sắp xếp các từ sau thành câu tiếng Anh có nghĩa${getEmoji(word)}:`,
          words: shuffledWordsList,
          correct_sentence: correctSentence,
          explanation: `Câu hoàn chỉnh đúng là: **"${correctSentence}"**${getEmoji(word)}.`,
          tags: ["grammar", "sentence-reorder"]
        }
      });
    });

    const padNum = examNum.toString().padStart(2, '0');
    exams.push({
      exam_number: examNum,
      title: `Đề ${padNum}`,
      duration_minutes: 20,
      questions: questions
    });
  }

  const outputJson = {
    collection: {
      title: "English Grade 3 - Vol 1 - Unit 1 - Ex 1",
      subject_slug: "pre-a1-starter",
      grade: 3,
      volume: 1,
      units: [1],
      sequence_number: 1,
      exam_type: null,
      reference_book: "Pre A1 Starters Wordlist",
      status: "published"
    },
    exams: exams
  };

  const outPath = path.join(process.cwd(), 'content/exam-bank/starters-wordlist-pilot.json');
  fs.writeFileSync(outPath, JSON.stringify(outputJson, null, 2));
  console.log(`✅ Successfully generated 20 mixed exams with Emojis in prompts only`);
}

run().catch(console.error);
