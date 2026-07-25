import * as fs from 'fs';
import * as path from 'path';

// Batch 7: batch cuối cùng, câu rất ngắn để vét nốt quota còn lại (~2.981 ký tự).

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
    line1: "Are you cold, Faye?",
    line2: "Yes, my toes are cold.",
    question: "🔊 What is cold?",
    options: ["Her toes", "Her ears", "Her nose", "Her hands"],
    correctIndex: 0,
    tags: ["my-body", "foot"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the sand hot, Rex?",
    line2: "Yes, very hot today.",
    question: "🔊 What is hot?",
    options: ["The sand", "The sea", "The wind", "The rock"],
    correctIndex: 0,
    tags: ["at-the-beach", "sand"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the light red, Joy?",
    line2: "No, it's green now.",
    question: "🔊 What colour is the light?",
    options: ["Green", "Red", "Yellow", "Blue"],
    correctIndex: 0,
    tags: ["my-street", "traffic-light"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you like party hats, Cy?",
    line2: "Yes, mine is gold!",
    question: "🔊 What colour is Cy's hat?",
    options: ["Gold", "Silver", "Pink", "Blue"],
    correctIndex: 0,
    tags: ["birthday", "hat"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your clock loud, Bea?",
    line2: "Yes, it's very loud!",
    question: "🔊 What is loud?",
    options: ["The clock", "The TV", "The phone", "The fan"],
    correctIndex: 0,
    tags: ["at-home", "clock"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you like the cap, Roy?",
    line2: "Yes, it's my favourite!",
    question: "🔊 What is Roy's favourite?",
    options: ["The cap", "The scarf", "The coat", "The boots"],
    correctIndex: 0,
    tags: ["clothes-shop", "cap"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like plums, Gia?",
    line2: "Yes, I love plums!",
    question: "🔊 What does Gia love?",
    options: ["Plums", "Peaches", "Cherries", "Grapes"],
    correctIndex: 0,
    tags: ["food", "plum"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the seal wet, Cruz?",
    line2: "Yes, it's swimming fast.",
    question: "🔊 What is the seal doing?",
    options: ["Swimming", "Sleeping", "Eating", "Jumping"],
    correctIndex: 0,
    tags: ["at-the-zoo", "seal"]
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
    exam_number: 600 + i + 1,
    title: `Batch7 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch7-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 7).`);
console.log(`Lưu tại: ${outPath}`);
