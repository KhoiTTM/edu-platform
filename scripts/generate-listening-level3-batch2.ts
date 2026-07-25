import * as fs from 'fs';
import * as path from 'path';

// Batch 2: bổ sung các chủ đề CHƯA có trong batch 1 (My Body, At the Beach, My Street,
// My Friend's Birthday, thú nuôi tại nhà, các phòng/đồ vật At Home còn thiếu) — đối chiếu
// với 11 chủ đề của lib/data/startersVocabulary.ts (xem docs/luyen-tap/pre-a1-starter-listening-level3-roadmap.md).
// Toàn bộ câu soạn thủ công (không dùng vòng lặp biến thể tự động như batch 1) để tránh
// trùng khuôn câu.

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
  // Theme: My Body
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What's wrong, Lily?",
    line2: "My head hurts and my nose is red.",
    question: "🔊 What hurts on the girl?",
    options: ["Her head", "Her arm", "Her leg", "Her hand"],
    correctIndex: 0,
    tags: ["my-body", "head", "nose"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you touch your toes, Max?",
    line2: "Yes, I can touch my toes with my hands.",
    question: "🔊 What can Max touch with his hands?",
    options: ["His ears", "His toes", "His eyes", "His hair"],
    correctIndex: 1,
    tags: ["my-body", "hand", "foot"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "How many fingers do you have, Rose?",
    line2: "I have ten fingers on my two hands.",
    question: "🔊 How many fingers does Rose have?",
    options: ["Eight", "Nine", "Ten", "Twelve"],
    correctIndex: 2,
    tags: ["my-body", "hand"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Are your eyes blue, Leo?",
    line2: "No, my eyes are brown like my hair.",
    question: "🔊 What colour are Leo's eyes?",
    options: ["Blue", "Green", "Brown", "Black"],
    correctIndex: 2,
    tags: ["my-body", "eye", "hair"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Does your arm hurt, Ivy?",
    line2: "No, but my leg hurts a lot.",
    question: "🔊 What hurts on Ivy?",
    options: ["Her arm", "Her leg", "Her head", "Her ear"],
    correctIndex: 1,
    tags: ["my-body", "arm", "leg"]
  },

  // Theme: At the Beach
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What are you doing at the beach, Jack?",
    line2: "I'm building a sandcastle near the sea.",
    question: "🔊 What is Jack doing?",
    options: ["Swimming", "Building a sandcastle", "Playing volleyball", "Eating ice cream"],
    correctIndex: 1,
    tags: ["at-the-beach", "sandcastle", "sea"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like swimming in the sea, Chloe?",
    line2: "Yes, and I like collecting shells too.",
    question: "🔊 What does Chloe like collecting?",
    options: ["Rocks", "Shells", "Sticks", "Flowers"],
    correctIndex: 1,
    tags: ["at-the-beach", "shell", "sea"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the sun hot today, Oscar?",
    line2: "Yes, so I'm wearing my sunglasses and a hat.",
    question: "🔊 What is Oscar wearing?",
    options: ["A jacket and shoes", "Sunglasses and a hat", "A T-shirt and jeans", "Gloves and a scarf"],
    correctIndex: 1,
    tags: ["at-the-beach", "sun"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is your beach ball, Ruby?",
    line2: "It's in the sea. My dad is swimming to get it.",
    question: "🔊 Where is the beach ball?",
    options: ["On the sand", "In the sea", "In the bag", "Under the towel"],
    correctIndex: 1,
    tags: ["at-the-beach", "ball", "sea"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you see the boat, Felix?",
    line2: "Yes, it's a small yellow boat on the sea.",
    question: "🔊 What colour is the boat?",
    options: ["Blue", "Yellow", "Red", "White"],
    correctIndex: 1,
    tags: ["at-the-beach", "boat"]
  },

  // Theme: My Street
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the bakery, Zoe?",
    line2: "It's next to the bank, on my street.",
    question: "🔊 Where is the bakery?",
    options: ["Next to the bank", "Behind the school", "Near the park", "Opposite the shop"],
    correctIndex: 0,
    tags: ["my-street", "bakery", "bank"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "How do you go to school, Leo?",
    line2: "I cross the street and walk past the shop.",
    question: "🔊 How does Leo go to school?",
    options: ["He crosses the street", "He takes the bus", "He rides a bike", "He takes a taxi"],
    correctIndex: 0,
    tags: ["my-street", "shop"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is there a park near your street, Mia?",
    line2: "Yes, and there's a big supermarket too.",
    question: "🔊 What is near Mia's street?",
    options: ["A park and a supermarket", "A bakery and a bank", "A school and a gym", "A beach and a shop"],
    correctIndex: 0,
    tags: ["my-street", "park", "supermarket"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What can you see on your street, Ethan?",
    line2: "I can see a red car and a blue bus.",
    question: "🔊 What does Ethan see?",
    options: ["A red car and a blue bus", "A yellow bike", "A green train", "A white taxi"],
    correctIndex: 0,
    tags: ["my-street", "car", "bus"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where do you buy bread, Amy?",
    line2: "At the bakery next to the supermarket.",
    question: "🔊 Where does Amy buy bread?",
    options: ["At the bank", "At the bakery", "At the park", "At the school"],
    correctIndex: 1,
    tags: ["my-street", "bakery", "bread"]
  },

  // Theme: My Friend's Birthday
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What do you want for your birthday, Noah?",
    line2: "I want a new toy robot and some balloons.",
    question: "🔊 What does Noah want?",
    options: ["A toy robot and balloons", "A new bike", "A birthday cake", "A pencil case"],
    correctIndex: 0,
    tags: ["birthday", "balloon", "toy"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is there a birthday cake, Ella?",
    line2: "Yes, it's a big chocolate cake with candles.",
    question: "🔊 What kind of cake is it?",
    options: ["A big chocolate cake", "A small vanilla cake", "A fruit cake", "A cheese cake"],
    correctIndex: 0,
    tags: ["birthday", "cake"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What present did you bring, Leo?",
    line2: "I brought a present with a big pink balloon on it.",
    question: "🔊 What is on Leo's present?",
    options: ["A big pink balloon", "A yellow star", "A green ribbon", "A blue card"],
    correctIndex: 0,
    tags: ["birthday", "balloon", "present"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "How old are you today, Sophie?",
    line2: "I am eight years old today!",
    question: "🔊 How old is Sophie today?",
    options: ["Seven", "Eight", "Nine", "Ten"],
    correctIndex: 1,
    tags: ["birthday", "age"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Are your friends singing, Jack?",
    line2: "Yes, they are singing 'Happy Birthday' to me.",
    question: "🔊 What are Jack's friends doing?",
    options: ["Dancing", "Singing", "Playing games", "Eating cake"],
    correctIndex: 1,
    tags: ["birthday", "singing"]
  },

  // Theme: At Home — pets & rooms not yet covered
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is your cat, Ava?",
    line2: "It's sleeping on the armchair in the living room.",
    question: "🔊 Where is Ava's cat sleeping?",
    options: ["On the bed", "On the armchair", "Under the table", "In the kitchen"],
    correctIndex: 1,
    tags: ["at-home", "cat", "armchair"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your dog in the garden, Leo?",
    line2: "No, my dog is having a bath in the bathroom.",
    question: "🔊 Where is Leo's dog?",
    options: ["In the garden", "Having a bath", "In the kitchen", "In the bedroom"],
    correctIndex: 1,
    tags: ["at-home", "dog", "bath"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the lamp, Nina?",
    line2: "It's on the table next to my bed.",
    question: "🔊 Where is the lamp?",
    options: ["On the table by the bed", "On the floor", "In the bathroom", "On the armchair"],
    correctIndex: 0,
    tags: ["at-home", "lamp", "bed"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What's in the fridge, Sam?",
    line2: "There is milk, eggs and some fruit.",
    question: "🔊 What is in the fridge?",
    options: ["Milk, eggs and fruit", "Bread and cheese", "Rice and fish", "Cake and juice"],
    correctIndex: 0,
    tags: ["at-home", "fridge", "kitchen"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your duck in the garden, Mia?",
    line2: "Yes, it's swimming near the flowers.",
    question: "🔊 What is Mia's duck doing?",
    options: ["Sleeping", "Swimming", "Eating", "Running"],
    correctIndex: 1,
    tags: ["at-home", "duck", "garden"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Where is your bookcase, Ethan?",
    line2: "It's in my bedroom, next to the window.",
    question: "🔊 Where is Ethan's bookcase?",
    options: ["In the bedroom", "In the living room", "In the kitchen", "In the bathroom"],
    correctIndex: 0,
    tags: ["at-home", "bookcase", "bedroom"]
  },

  // Theme: At the Clothes Shop — items not yet covered
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you want this dress, Ella?",
    line2: "No, I want the skirt and the T-shirt.",
    question: "🔊 What does Ella want?",
    options: ["A dress", "A skirt and a T-shirt", "A jacket", "A hat"],
    correctIndex: 1,
    tags: ["clothes-shop", "dress", "skirt", "t-shirt"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is this watch too big, Leo?",
    line2: "Yes, can I try the small hat instead?",
    question: "🔊 What does Leo want to try?",
    options: ["The small hat", "A bigger watch", "New shoes", "A red shirt"],
    correctIndex: 0,
    tags: ["clothes-shop", "watch", "hat"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "How much are these socks, Amy?",
    line2: "They are two dollars, and the trousers are ten dollars.",
    question: "🔊 How much are the socks?",
    options: ["Two dollars", "Ten dollars", "Twelve dollars", "Five dollars"],
    correctIndex: 0,
    tags: ["clothes-shop", "sock", "trousers"]
  },

  // Theme: My Favourite Food — items not yet covered
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What vegetables do you like, Jack?",
    line2: "I like carrots and peas, but not onions.",
    question: "🔊 What vegetables does Jack like?",
    options: ["Carrots and peas", "Onions and potatoes", "Tomatoes and beans", "Rice and peas"],
    correctIndex: 0,
    tags: ["food", "carrot", "peas"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you want rice or potato, Chloe?",
    line2: "I want potato with some grapes, please.",
    question: "🔊 What does Chloe want?",
    options: ["Rice and grapes", "Potato and grapes", "Rice and bread", "Potato and cake"],
    correctIndex: 1,
    tags: ["food", "potato", "grapes"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Would you like a tomato salad, Oscar?",
    line2: "No thanks, I'd like fries and an egg.",
    question: "🔊 What does Oscar want?",
    options: ["A tomato salad", "Fries and an egg", "Rice and fish", "Bread and cheese"],
    correctIndex: 1,
    tags: ["food", "fries", "egg"]
  },

  // Theme: At the Zoo — animals not yet covered
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Look, a monkey is eating a banana!",
    line2: "Yes, and there's a goat next to the fence.",
    question: "🔊 What is next to the fence?",
    options: ["A monkey", "A goat", "A frog", "A sheep"],
    correctIndex: 1,
    tags: ["at-the-zoo", "monkey", "goat"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you see the frog, Leo?",
    line2: "Yes, it's small and green, near the pond.",
    question: "🔊 Where is the frog?",
    options: ["Near the pond", "On the fence", "In the tree", "Behind the rock"],
    correctIndex: 0,
    tags: ["at-the-zoo", "frog"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the elephant big, Ivy?",
    line2: "Yes, it's very big and grey.",
    question: "🔊 What colour is the elephant?",
    options: ["Brown", "Grey", "Black", "White"],
    correctIndex: 1,
    tags: ["at-the-zoo", "elephant"]
  },

  // Theme: Colours — extra pairing
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What colour is your school bag, Sam?",
    line2: "It's grey with an orange zip.",
    question: "🔊 What colour is Sam's school bag?",
    options: ["Grey with orange", "Blue with black", "Green with red", "White with pink"],
    correctIndex: 0,
    tags: ["colours", "school-bag"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your umbrella white, Zoe?",
    line2: "No, it's brown with white spots.",
    question: "🔊 What does Zoe's umbrella look like?",
    options: ["White with black spots", "Brown with white spots", "All black", "All yellow"],
    correctIndex: 1,
    tags: ["colours"]
  },

  // Theme: At School — additional
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What day is it today, Leo?",
    line2: "It's Monday, so we have Art class first.",
    question: "🔊 What class do they have first?",
    options: ["Music", "Art", "PE", "English"],
    correctIndex: 1,
    tags: ["at-school", "art-room"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "How many books are on your desk, Amy?",
    line2: "There are three books and one notebook.",
    question: "🔊 How many books does Amy have?",
    options: ["Two", "Three", "Four", "Five"],
    correctIndex: 1,
    tags: ["at-school", "notebook"]
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
    exam_number: 100 + i + 1, // đánh số tạm, sẽ merge lại khi phân bổ vào 20 đề cuối cùng
    title: `Batch2 - Đề ${i + 1}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const outPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch2-source.json');
fs.writeFileSync(outPath, JSON.stringify({ dialogues, exams }, null, 2), 'utf-8');

console.log(`✅ Soạn xong ${dialogues.length} hội thoại mới (batch 2).`);
console.log(`Chủ đề: my-body, at-the-beach, my-street, birthday, at-home (pets), clothes-shop, food, at-the-zoo, colours, at-school.`);
console.log(`Lưu tại: ${outPath}`);
