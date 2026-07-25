import * as fs from 'fs';
import * as path from 'path';

// Batch 3: tiếp tục mở rộng — đa dạng thêm biến thể trong các chủ đề đã có (đổi tên nhân
// vật, tình huống khác) để tăng tổng số câu tiến gần 200, không lặp y hệt câu cũ.

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
    line1: "Is your ear big, Daisy?",
    line2: "No, but my brother's ears are very big!",
    question: "🔊 Whose ears are big?",
    options: ["Daisy's", "Her brother's", "Her sister's", "Her dad's"],
    correctIndex: 1,
    tags: ["my-body", "ear", "brother"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you smile for the photo, Finn?",
    line2: "Yes, look at my mouth, I'm smiling!",
    question: "🔊 What is Finn doing?",
    options: ["Smiling", "Crying", "Sleeping", "Eating"],
    correctIndex: 0,
    tags: ["my-body", "mouth", "smile"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Are your feet cold, Wendy?",
    line2: "Yes, my feet and hands are very cold.",
    question: "🔊 What is cold on Wendy?",
    options: ["Her feet and hands", "Her head and ears", "Her arms and legs", "Her nose"],
    correctIndex: 0,
    tags: ["my-body", "foot", "hand"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you have a big body like your dad, Kevin?",
    line2: "No, my dad is tall but I am small.",
    question: "🔊 Who is tall?",
    options: ["Kevin", "His dad", "His brother", "His friend"],
    correctIndex: 1,
    tags: ["my-body", "body"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What are you building at the beach, Nora?",
    line2: "I'm building a tall sandcastle with my spade.",
    question: "🔊 What is Nora building?",
    options: ["A sandcastle", "A boat", "A tower of rocks", "A tent"],
    correctIndex: 0,
    tags: ["at-the-beach", "sandcastle"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the sea cold today, Freddie?",
    line2: "No, the sea is warm and I want to swim.",
    question: "🔊 What does Freddie want to do?",
    options: ["Swim", "Build a sandcastle", "Eat lunch", "Sleep"],
    correctIndex: 0,
    tags: ["at-the-beach", "sea"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is your towel, Poppy?",
    line2: "It's on the sand next to my bag.",
    question: "🔊 Where is Poppy's towel?",
    options: ["On the sand", "In the sea", "In the car", "At home"],
    correctIndex: 0,
    tags: ["at-the-beach", "towel"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is there a supermarket on your street, Toby?",
    line2: "Yes, and there's a bank next to it.",
    question: "🔊 What is next to the supermarket?",
    options: ["A bank", "A park", "A school", "A bakery"],
    correctIndex: 0,
    tags: ["my-street", "supermarket", "bank"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you walk to school, Holly?",
    line2: "No, I take the bus on my street.",
    question: "🔊 How does Holly go to school?",
    options: ["By bus", "By car", "On foot", "By bike"],
    correctIndex: 0,
    tags: ["my-street", "bus"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the shop open now, Charlie?",
    line2: "Yes, but the bank is closed today.",
    question: "🔊 What is closed today?",
    options: ["The shop", "The bank", "The park", "The bakery"],
    correctIndex: 1,
    tags: ["my-street", "shop", "bank"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Whose birthday is it today, Isla?",
    line2: "It's my friend's birthday. She is nine today.",
    question: "🔊 How old is Isla's friend today?",
    options: ["Seven", "Eight", "Nine", "Ten"],
    correctIndex: 2,
    tags: ["birthday", "age"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What game do you play at the party, George?",
    line2: "We play hide and seek in the garden.",
    question: "🔊 What game do they play?",
    options: ["Hide and seek", "Chess", "Football", "Word puzzle"],
    correctIndex: 0,
    tags: ["birthday", "game"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Are there balloons at the party, Ruby?",
    line2: "Yes, lots of red and yellow balloons.",
    question: "🔊 What colour are the balloons?",
    options: ["Red and yellow", "Blue and green", "Purple and pink", "Black and white"],
    correctIndex: 0,
    tags: ["birthday", "balloon", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your rabbit in its cage, Ollie?",
    line2: "No, it's hopping in the living room.",
    question: "🔊 Where is Ollie's rabbit?",
    options: ["In its cage", "In the living room", "In the kitchen", "In the garden"],
    correctIndex: 1,
    tags: ["at-home", "rabbit", "living-room"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the sofa, Maya?",
    line2: "It's in the living room, next to the TV.",
    question: "🔊 Where is the sofa?",
    options: ["In the bedroom", "Next to the TV", "In the kitchen", "In the bathroom"],
    correctIndex: 1,
    tags: ["at-home", "sofa", "living-room"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your bird singing, Leo?",
    line2: "Yes, it sings every morning in the kitchen.",
    question: "🔊 When does Leo's bird sing?",
    options: ["Every morning", "At night", "At lunch", "On weekends"],
    correctIndex: 0,
    tags: ["at-home", "bird", "singing"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can I try the blue skirt, please?",
    line2: "Yes, and here is a white blouse too.",
    question: "🔊 What does the shop have?",
    options: ["A blue skirt and white blouse", "A red dress", "Black shoes", "A green hat"],
    correctIndex: 0,
    tags: ["clothes-shop", "skirt"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "How much is this jacket, Dylan?",
    line2: "It's fifteen dollars, but the shoes are twenty.",
    question: "🔊 How much is the jacket?",
    options: ["Ten dollars", "Fifteen dollars", "Twenty dollars", "Twenty-five dollars"],
    correctIndex: 1,
    tags: ["clothes-shop", "jacket"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like this red hat, Ivy?",
    line2: "No, I prefer the purple one.",
    question: "🔊 What colour hat does Ivy prefer?",
    options: ["Red", "Purple", "Yellow", "Green"],
    correctIndex: 1,
    tags: ["clothes-shop", "hat", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What's your favourite fruit, Aiden?",
    line2: "I love grapes, but my sister loves lemons.",
    question: "🔊 What is Aiden's favourite fruit?",
    options: ["Grapes", "Lemons", "Pears", "Mangoes"],
    correctIndex: 0,
    tags: ["food", "grapes"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you eat beans, Tilly?",
    line2: "Yes, I like beans with rice and chicken.",
    question: "🔊 What does Tilly eat with beans?",
    options: ["Rice and chicken", "Bread and cheese", "Fish and potato", "Egg and toast"],
    correctIndex: 0,
    tags: ["food", "beans", "rice"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the soup hot, Ryan?",
    line2: "Yes, and it has carrots and onions in it.",
    question: "🔊 What is in the soup?",
    options: ["Carrots and onions", "Rice and beans", "Potato and egg", "Fish and peas"],
    correctIndex: 0,
    tags: ["food", "carrot", "onion"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can you see the sheep, Willow?",
    line2: "Yes, and there's a goat next to it.",
    question: "🔊 What animal is next to the sheep?",
    options: ["A goat", "A cow", "A duck", "A frog"],
    correctIndex: 0,
    tags: ["at-the-zoo", "sheep", "goat"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the cow eating grass, Theo?",
    line2: "Yes, and the horse is drinking water.",
    question: "🔊 What is the horse doing?",
    options: ["Eating grass", "Drinking water", "Sleeping", "Running"],
    correctIndex: 1,
    tags: ["at-the-zoo", "cow", "horse"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Look at the little duck, Freya!",
    line2: "Yes, it's yellow and it's swimming fast.",
    question: "🔊 What colour is the duck?",
    options: ["Yellow", "White", "Brown", "Grey"],
    correctIndex: 0,
    tags: ["at-the-zoo", "duck"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What colour is your bike, Adam?",
    line2: "It's black with green wheels.",
    question: "🔊 What colour are Adam's bike wheels?",
    options: ["Green", "Red", "Blue", "Yellow"],
    correctIndex: 0,
    tags: ["colours"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your kite orange, Bella?",
    line2: "No, it's pink and purple.",
    question: "🔊 What colour is Bella's kite?",
    options: ["Orange", "Pink and purple", "Green", "Blue and white"],
    correctIndex: 1,
    tags: ["colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What subject do you have now, Blake?",
    line2: "We have Maths, then PE after break.",
    question: "🔊 What do they have after break?",
    options: ["Maths", "PE", "Art", "Music"],
    correctIndex: 1,
    tags: ["at-school", "break-time"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is your homework, Stella?",
    line2: "It's in my school bag with my pencil case.",
    question: "🔊 Where is Stella's homework?",
    options: ["On the desk", "In her school bag", "In the library", "At home"],
    correctIndex: 1,
    tags: ["at-school", "school-bag", "pencil-case"]
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
    exam_number: 200 + i + 1,
    title: `Batch3 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch3-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 3).`);
console.log(`Lưu tại: ${outPath}`);
