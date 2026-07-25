import * as fs from 'fs';
import * as path from 'path';

// Batch 4: tận dụng nốt quota còn lại của ELEVENLABS_API_KEY_SECOND (~5.493 ký tự sau batch 3).
// Tiếp tục thêm biến thể mới trong các chủ đề đã khai thác, tránh trùng câu cũ.

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
    line1: "Is your neck OK, Ella?",
    line2: "Yes, but my shoulder hurts a little.",
    question: "🔊 What hurts on Ella?",
    options: ["Her neck", "Her shoulder", "Her back", "Her knee"],
    correctIndex: 1,
    tags: ["my-body", "shoulder"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you jump on one foot, Rory?",
    line2: "Yes, look, I'm jumping on my left foot!",
    question: "🔊 What is Rory doing?",
    options: ["Jumping on one foot", "Running fast", "Sitting down", "Clapping his hands"],
    correctIndex: 0,
    tags: ["my-body", "foot"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like playing in the sand, Coco?",
    line2: "Yes, I make shapes with my hands and feet.",
    question: "🔊 What does Coco make in the sand?",
    options: ["Shapes", "Holes", "Words", "Circles"],
    correctIndex: 0,
    tags: ["at-the-beach", "sand"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your ice cream melting, Jude?",
    line2: "Yes, it's too hot at the beach today.",
    question: "🔊 Why is the ice cream melting?",
    options: ["It's too hot", "It's too cold", "It's raining", "It's windy"],
    correctIndex: 0,
    tags: ["at-the-beach", "sun"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the post office, Faith?",
    line2: "It's between the bank and the bakery.",
    question: "🔊 Where is the post office?",
    options: ["Between the bank and bakery", "Next to the park", "Behind the shop", "Near the school"],
    correctIndex: 0,
    tags: ["my-street", "post-office"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you see the traffic light, Caleb?",
    line2: "Yes, it's red, so we must stop.",
    question: "🔊 What colour is the traffic light?",
    options: ["Green", "Red", "Yellow", "Blue"],
    correctIndex: 1,
    tags: ["my-street", "traffic-light"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "How many candles are on the cake, Iris?",
    line2: "There are seven candles, one for each year.",
    question: "🔊 How many candles are on the cake?",
    options: ["Six", "Seven", "Eight", "Nine"],
    correctIndex: 1,
    tags: ["birthday", "cake"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Did you bring a card, Hugo?",
    line2: "Yes, a card with a big yellow star.",
    question: "🔊 What is on Hugo's card?",
    options: ["A yellow star", "A red heart", "A blue moon", "A green tree"],
    correctIndex: 0,
    tags: ["birthday", "card"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your goldfish in the bowl, Lena?",
    line2: "Yes, it's swimming near the plant.",
    question: "🔊 Where is Lena's goldfish?",
    options: ["Near the plant", "Under the table", "In the garden", "In the sink"],
    correctIndex: 0,
    tags: ["at-home", "goldfish"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the curtain green, Miles?",
    line2: "No, the curtain in my room is blue.",
    question: "🔊 What colour is Miles's curtain?",
    options: ["Green", "Blue", "Yellow", "Purple"],
    correctIndex: 1,
    tags: ["at-home", "curtain", "colours"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like the yellow gloves, Nova?",
    line2: "No, I like the white scarf better.",
    question: "🔊 What does Nova like?",
    options: ["The yellow gloves", "The white scarf", "The black boots", "The red coat"],
    correctIndex: 1,
    tags: ["clothes-shop", "scarf"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Are these boots too small, Arlo?",
    line2: "Yes, can I have a bigger pair, please?",
    question: "🔊 What does Arlo want?",
    options: ["A bigger pair of boots", "A smaller hat", "New socks", "A different colour"],
    correctIndex: 0,
    tags: ["clothes-shop", "boots"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Would you like some soup, Hazel?",
    line2: "Yes please, with some bread.",
    question: "🔊 What does Hazel want with soup?",
    options: ["Bread", "Rice", "Cake", "Fries"],
    correctIndex: 0,
    tags: ["food", "soup", "bread"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you want juice or milk, Reuben?",
    line2: "Juice, please, and some grapes too.",
    question: "🔊 What does Reuben want to drink?",
    options: ["Juice", "Milk", "Water", "Lemonade"],
    correctIndex: 0,
    tags: ["food", "juice"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can you see the owl, Mabel?",
    line2: "Yes, it's sleeping in the tree.",
    question: "🔊 What is the owl doing?",
    options: ["Sleeping", "Flying", "Singing", "Eating"],
    correctIndex: 0,
    tags: ["at-the-zoo", "owl"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the panda eating, Leo?",
    line2: "Yes, it's eating green bamboo.",
    question: "🔊 What is the panda eating?",
    options: ["Bamboo", "Fruit", "Fish", "Grass"],
    correctIndex: 0,
    tags: ["at-the-zoo", "panda"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What colour is your raincoat, Skye?",
    line2: "It's yellow with a white hood.",
    question: "🔊 What colour is the hood?",
    options: ["White", "Yellow", "Black", "Grey"],
    correctIndex: 0,
    tags: ["colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you have PE today, Xander?",
    line2: "Yes, after Maths and before lunch.",
    question: "🔊 When is PE today?",
    options: ["After Maths", "After lunch", "Before Maths", "After Art"],
    correctIndex: 0,
    tags: ["at-school", "pe"]
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
    exam_number: 300 + i + 1,
    title: `Batch4 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch4-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 4).`);
console.log(`Lưu tại: ${outPath}`);
