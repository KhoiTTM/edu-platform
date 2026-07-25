import * as fs from 'fs';
import * as path from 'path';

// Batch 5: tiếp tục tận dụng quota còn lại (~5.246 ký tự sau batch 4), mục tiêu tiến gần 200
// câu tổng. Thêm biến thể mới, chưa lặp câu cũ.

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
    line1: "Is your back OK, Tara?",
    line2: "Yes, but my knee hurts from running.",
    question: "🔊 What hurts on Tara?",
    options: ["Her back", "Her knee", "Her neck", "Her hand"],
    correctIndex: 1,
    tags: ["my-body", "knee"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you wave your hand, Dexter?",
    line2: "Yes, look, I'm waving with both hands!",
    question: "🔊 What is Dexter doing?",
    options: ["Waving", "Clapping", "Pointing", "Jumping"],
    correctIndex: 0,
    tags: ["my-body", "hand"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like the waves, Piper?",
    line2: "Yes, I like jumping over the small waves.",
    question: "🔊 What does Piper like doing?",
    options: ["Jumping over waves", "Building sandcastles", "Collecting shells", "Swimming far"],
    correctIndex: 0,
    tags: ["at-the-beach", "sea"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your bucket full of water, Milo?",
    line2: "Yes, and I have some shells too.",
    question: "🔊 What does Milo have in his bucket?",
    options: ["Water and shells", "Sand and rocks", "Fish and water", "Toys"],
    correctIndex: 0,
    tags: ["at-the-beach", "shell"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the hospital, June?",
    line2: "It's near the school, past the park.",
    question: "🔊 Where is the hospital?",
    options: ["Near the school", "Near the beach", "Near the bank", "Near the shop"],
    correctIndex: 0,
    tags: ["my-street", "hospital"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your house near the park, Otis?",
    line2: "Yes, it's opposite the park gate.",
    question: "🔊 Where is Otis's house?",
    options: ["Opposite the park", "Behind the school", "Next to the shop", "Near the beach"],
    correctIndex: 0,
    tags: ["my-street", "park"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Did you make a wish, Fern?",
    line2: "Yes, I blew out all the candles!",
    question: "🔊 What did Fern do?",
    options: ["Blew out the candles", "Ate the cake", "Sang a song", "Opened presents"],
    correctIndex: 0,
    tags: ["birthday", "candles"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "How many guests are coming, Elliot?",
    line2: "Ten friends are coming to my party.",
    question: "🔊 How many guests are coming?",
    options: ["Eight", "Nine", "Ten", "Eleven"],
    correctIndex: 2,
    tags: ["birthday", "party"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your hamster in its cage, Wren?",
    line2: "No, it's running on the carpet.",
    question: "🔊 Where is Wren's hamster?",
    options: ["In its cage", "On the carpet", "In the garden", "On the sofa"],
    correctIndex: 1,
    tags: ["at-home", "hamster"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the shelf high, Jasper?",
    line2: "Yes, my books are on the top shelf.",
    question: "🔊 Where are Jasper's books?",
    options: ["On the top shelf", "On the floor", "In a box", "On the bed"],
    correctIndex: 0,
    tags: ["at-home", "shelf"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you want the green gloves, Sadie?",
    line2: "No, I want the red ones, please.",
    question: "🔊 What colour gloves does Sadie want?",
    options: ["Green", "Red", "Blue", "Black"],
    correctIndex: 1,
    tags: ["clothes-shop", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Are the trousers too long, Gus?",
    line2: "Yes, I need a shorter pair.",
    question: "🔊 What does Gus need?",
    options: ["A shorter pair of trousers", "A longer jacket", "Bigger shoes", "A new hat"],
    correctIndex: 0,
    tags: ["clothes-shop", "trousers"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like cheese, Robin?",
    line2: "Yes, I put cheese on my bread.",
    question: "🔊 What does Robin put cheese on?",
    options: ["Bread", "Rice", "Cake", "Soup"],
    correctIndex: 0,
    tags: ["food", "cheese", "bread"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Would you like an orange, Percy?",
    line2: "Yes, and can I have a banana too?",
    question: "🔊 What fruits does Percy want?",
    options: ["Orange and banana", "Apple and pear", "Mango and grapes", "Lemon and lime"],
    correctIndex: 0,
    tags: ["food", "orange", "banana"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can you see the parrot, Dahlia?",
    line2: "Yes, it's green and it can talk!",
    question: "🔊 What colour is the parrot?",
    options: ["Green", "Blue", "Red", "Yellow"],
    correctIndex: 0,
    tags: ["at-the-zoo", "parrot"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the zebra running, Cassius?",
    line2: "No, it's standing near the fence.",
    question: "🔊 What is the zebra doing?",
    options: ["Standing", "Running", "Eating", "Sleeping"],
    correctIndex: 0,
    tags: ["at-the-zoo", "zebra"]
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
    exam_number: 400 + i + 1,
    title: `Batch5 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch5-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 5).`);
console.log(`Lưu tại: ${outPath}`);
