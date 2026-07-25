import * as fs from 'fs';
import * as path from 'path';

// Batch 9: batch cuối cùng thật sự, vét nốt quota (~1.957 ký tự còn lại). Câu tối thiểu.

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
    line1: "Is your wrist OK, Tess?",
    line2: "Yes, it's fine now.",
    question: "🔊 How is Tess's wrist?",
    options: ["Fine", "Hurting", "Swollen", "Cold"],
    correctIndex: 0,
    tags: ["my-body"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your kite up high, Zack?",
    line2: "Yes, very high!",
    question: "🔊 Where is the kite?",
    options: ["Very high", "On the sand", "In the sea", "In his bag"],
    correctIndex: 0,
    tags: ["at-the-beach"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the corner shop open, Elle?",
    line2: "Yes, it's open now.",
    question: "🔊 Is the shop open?",
    options: ["Yes", "No", "Not today", "Not sure"],
    correctIndex: 0,
    tags: ["my-street"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Did you have fun, Cade?",
    line2: "Yes, so much fun!",
    question: "🔊 Did Cade have fun?",
    options: ["Yes", "No", "A little", "Not really"],
    correctIndex: 0,
    tags: ["birthday"]
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
    exam_number: 800 + i + 1,
    title: `Batch9 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch9-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 9 — cuối cùng).`);
console.log(`Lưu tại: ${outPath}`);
