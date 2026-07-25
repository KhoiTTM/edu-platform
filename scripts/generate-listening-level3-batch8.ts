import * as fs from 'fs';
import * as path from 'path';

// Batch 8: vét nốt quota còn lại (~2.326 ký tự), câu cực ngắn để tiến sát mốc 200 câu tổng.

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
    line1: "Is your tummy OK, Nia?",
    line2: "Yes, but my thumb hurts.",
    question: "🔊 What hurts?",
    options: ["Her thumb", "Her tummy", "Her chin", "Her toe"],
    correctIndex: 0,
    tags: ["my-body", "hand"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the wind strong, Eli?",
    line2: "Yes, very strong today.",
    question: "🔊 What is strong today?",
    options: ["The wind", "The sun", "The rain", "The sea"],
    correctIndex: 0,
    tags: ["at-the-beach"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the road wet, Suki?",
    line2: "Yes, it's raining now.",
    question: "🔊 Why is the road wet?",
    options: ["It's raining", "It's sunny", "It's windy", "It's snowing"],
    correctIndex: 0,
    tags: ["my-street"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you want a badge, Fox?",
    line2: "Yes, a star badge please!",
    question: "🔊 What badge does Fox want?",
    options: ["A star badge", "A heart badge", "A moon badge", "A sun badge"],
    correctIndex: 0,
    tags: ["birthday"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your plant tall, Dot?",
    line2: "Yes, it's very tall now.",
    question: "🔊 What is tall?",
    options: ["Her plant", "Her lamp", "Her chair", "Her bed"],
    correctIndex: 0,
    tags: ["at-home"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you like plums or peaches, Moss?",
    line2: "Peaches, please!",
    question: "🔊 What does Moss like?",
    options: ["Peaches", "Plums", "Grapes", "Pears"],
    correctIndex: 0,
    tags: ["food"]
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
    exam_number: 700 + i + 1,
    title: `Batch8 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch8-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 8).`);
console.log(`Lưu tại: ${outPath}`);
