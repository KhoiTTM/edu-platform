import fs from 'fs';
import path from 'path';
import { allVocabWords } from '../lib/data/startersVocabulary';

// Lọc các từ quá cơ bản
const basicWords = ['hello', 'hi', 'bye', 'goodbye', 'i', 'you', 'he', 'she', 'they', 'it', 'yes', 'no', 'this', 'that'];
const filteredWords = allVocabWords.filter(w => !basicWords.includes(w.english.toLowerCase()));

const OUT_DIR = path.join(__dirname, '..', 'content', 'exam-bank', 'tieng-anh');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function getRandomWords(count: number) {
  const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const exams = [];

for (let i = 1; i <= 40; i++) {
  const paddedIndex = i.toString().padStart(2, '0');
  const words = getRandomWords(20);
  
  const questions = words.map((w, qIdx) => {
    // 50% chance for each type
    const isEnToVn = Math.random() > 0.5;
    
    let questionText, correctWord;
    if (isEnToVn) {
      questionText = `Từ **"${w.english}"** có nghĩa tiếng Việt là gì?`;
      correctWord = w.vietnamese;
    } else {
      questionText = `Từ nào có nghĩa tiếng Việt là **"${w.vietnamese}"**?`;
      correctWord = w.english;
    }
    
    const wrongWords = filteredWords.filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [
      correctWord,
      ...(isEnToVn ? wrongWords.map(x => x.vietnamese) : wrongWords.map(x => x.english))
    ].sort(() => Math.random() - 0.5);
    
    const correctIndex = options.indexOf(correctWord);
    
    return {
      type: "multiple_choice",
      metadata_json: {
        question: questionText,
        options: options.map(o => ({
          text: o,
          is_correct: o === correctWord
        })),
        correct_index: correctIndex,
        audio_text: w.english
      }
    };
  });
  
  exams.push({
    exam_number: i,
    title: `PreA1 - Phản Xạ Từ Vựng - Đề ${paddedIndex}`,
    total_questions: 20,
    questions
  });
}

const fileData = {
  collection: {
    title: "Phản xạ Từ vựng Cơ bản",
    subject_slug: "pre-a1-starter",
    grade: 3,
    exam_type: "reflex",
    units: [105],
    volume: 0,
    status: "published"
  },
  exams
};

const filename = `pre-a1-starter-vocab-reflex-batch3.json`;
fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(fileData, null, 2));

console.log(`Generated ${exams.length} reflex exams in ${path.join(OUT_DIR, filename)}`);
