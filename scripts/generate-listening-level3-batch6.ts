import * as fs from 'fs';
import * as path from 'path';

// Batch 6: batch cuối, tận dụng nốt ~3.066 ký tự quota còn lại. Câu ngắn gọn để tối đa số lượng.

interface DialogueItem {
  speaker1: 'Man' | 'Woman';
  speaker2: 'Girl' | 'Boy';
  line1: string;
  line2: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  tags: string[];
}

const dialogues: DialogueItem[] = [
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your chin OK, Belle?",
    line2: "Yes, but my elbow hurts.",
    question: "🔊 What hurts on Belle?",
    options: ["Her chin", "Her elbow", "Her knee", "Her wrist"],
    correctIndex: 1,
    tags: ["my-body", "elbow"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you swim, Cole?",
    line2: "Yes, I swim every day at the beach.",
    question: "🔊 When does Cole swim?",
    options: ["Every day", "Once a week", "On Sundays", "Never"],
    correctIndex: 0,
    tags: ["at-the-beach", "swim"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the crab red, Nell?",
    line2: "Yes, it's small and red.",
    question: "🔊 What colour is the crab?",
    options: ["Red", "Blue", "Green", "Brown"],
    correctIndex: 0,
    tags: ["at-the-beach", "crab"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the market far, Silas?",
    line2: "No, it's close to my street.",
    question: "🔊 Where is the market?",
    options: ["Close to his street", "Far away", "Next to school", "In the park"],
    correctIndex: 0,
    tags: ["my-street", "market"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Are there many cars, Opal?",
    line2: "Yes, my street is very busy today.",
    question: "🔊 What is Opal's street like today?",
    options: ["Busy", "Quiet", "Empty", "Wet"],
    correctIndex: 0,
    tags: ["my-street", "car"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Did you get a present, Reid?",
    line2: "Yes, a new football!",
    question: "🔊 What present did Reid get?",
    options: ["A football", "A book", "A robot", "A bike"],
    correctIndex: 0,
    tags: ["birthday", "present"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your parrot loud, Vera?",
    line2: "Yes, it talks all day!",
    question: "🔊 What does Vera's parrot do?",
    options: ["Talks all day", "Sleeps all day", "Flies away", "Eats seeds"],
    correctIndex: 0,
    tags: ["at-home", "parrot"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the rug soft, Kai?",
    line2: "Yes, it's soft and blue.",
    question: "🔊 What colour is the rug?",
    options: ["Blue", "Red", "Green", "Grey"],
    correctIndex: 0,
    tags: ["at-home", "rug", "colours"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you want the pink gloves, Wynn?",
    line2: "No, the grey ones, please.",
    question: "🔊 What colour gloves does Wynn want?",
    options: ["Grey", "Pink", "Purple", "White"],
    correctIndex: 0,
    tags: ["clothes-shop", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you like yoghurt, Beau?",
    line2: "Yes, with some honey please.",
    question: "🔊 What does Beau want with yoghurt?",
    options: ["Honey", "Sugar", "Jam", "Milk"],
    correctIndex: 0,
    tags: ["food", "yoghurt"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can you see the owl's eyes, Wilder?",
    line2: "Yes, they are big and yellow.",
    question: "🔊 What colour are the owl's eyes?",
    options: ["Yellow", "Black", "Brown", "Green"],
    correctIndex: 0,
    tags: ["at-the-zoo", "owl", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the kangaroo jumping, Rhys?",
    line2: "Yes, it jumps very high.",
    question: "🔊 What is the kangaroo doing?",
    options: ["Jumping", "Sleeping", "Eating", "Running"],
    correctIndex: 0,
    tags: ["at-the-zoo", "kangaroo"]
  },
];

const exams: any[] = [];
const PER_EXAM = 15;
for (let i = 0; i < Math.ceil(dialogues.length / PER_EXAM); i++) {
  const slice = dialogues.slice(i * PER_EXAM, (i + 1) * PER_EXAM);
  if (slice.length === 0) continue;
  const examQuestions = slice.map(item => ({
    type: "listening_multiple_choice",
    difficulty: 1.5,
    metadata_json: {
      audio_text: `${item.speaker1}: ${item.line1}\n${item.speaker2}: ${item.line2}`,
      question: item.question,
      options: item.options,
      correct_index: item.correctIndex,
      tags: ["listening", "dialogue", "level-3", ...item.tags]
    }
  }));
  exams.push({
    exam_number: 500 + i + 1,
    title: `Batch6 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch6-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 6).`);
console.log(`Lưu tại: ${outPath}`);
