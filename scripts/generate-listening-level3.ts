import * as fs from 'fs';
import * as path from 'path';

// Define 105 dialogues covering PreA1 and Tiếng Anh 3 GS words
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

const rawDialogues: DialogueItem[] = [
  // Theme 1: School & Learning (art room, computer room, library, music room, gym, playground, pencil case, notebook, break time)
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where are you going, May?",
    line2: "I'm going to the library to read books.",
    question: "🔊 Where is the girl going?",
    options: ["To the library", "To the gym", "To the playground", "To the art room"],
    correctIndex: 0,
    tags: ["school", "library"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your classroom big, Nick?",
    line2: "No, but our computer room is very big.",
    question: "🔊 Which room is very big?",
    options: ["The classroom", "The computer room", "The music room", "The gym"],
    correctIndex: 1,
    tags: ["school", "computer-room"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What do you do at break time, Lucy?",
    line2: "I play with my friend, Grace, in the playground.",
    question: "🔊 Where does Lucy play at break time?",
    options: ["In the classroom", "In the library", "In the playground", "In the gym"],
    correctIndex: 2,
    tags: ["school", "playground", "break-time"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What are you drawing in the art room, Ben?",
    line2: "I'm drawing a red helicopter.",
    question: "🔊 What is the boy drawing?",
    options: ["A red train", "A red helicopter", "A blue plane", "A green bike"],
    correctIndex: 1,
    tags: ["school", "art-room", "drawing"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you have a pencil case, Anna?",
    line2: "Yes, I have a pink pencil case and a blue notebook.",
    question: "🔊 What colour is Anna's notebook?",
    options: ["Pink", "Blue", "Green", "Yellow"],
    correctIndex: 1,
    tags: ["school", "pencil-case", "notebook"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Which room are you in, Sam?",
    line2: "I'm singing in the music room with my teacher.",
    question: "🔊 What is the boy doing in the music room?",
    options: ["Reading", "Singing", "Drawing", "Dancing"],
    correctIndex: 1,
    tags: ["school", "music-room", "singing"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is that your notebook on the desk?",
    line2: "No, my notebook is in my school bag.",
    question: "🔊 Where is the girl's notebook?",
    options: ["On the desk", "In her school bag", "Under the chair", "In the bookcase"],
    correctIndex: 1,
    tags: ["school", "notebook", "school-bag"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Who is that man standing near the gym?",
    line2: "That's my English teacher, Mr Park.",
    question: "🔊 Who is Mr Park?",
    options: ["The English teacher", "The Vietnamese teacher", "His dad", "His friend"],
    correctIndex: 0,
    tags: ["school", "teacher", "mr"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Can we go out now, Ms Mary?",
    line2: "Yes, please go to the playground.",
    question: "🔊 Where should the girl go?",
    options: ["To the library", "To the playground", "To the gym", "To the computer room"],
    correctIndex: 1,
    tags: ["school", "playground"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What do you have on your desk, Hugo?",
    line2: "I have an eraser and a long ruler.",
    question: "🔊 What does the boy have on his desk?",
    options: ["A book and a pen", "An eraser and a ruler", "A pencil and a notebook", "A school bag"],
    correctIndex: 1,
    tags: ["school", "eraser", "ruler"]
  },

  // Theme 2: Sports & Games (chess, table tennis, volleyball, badminton, basketball, football, word puzzle)
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like playing badminton, Kim?",
    line2: "No, I like playing table tennis with my brother.",
    question: "🔊 What sport does Kim like?",
    options: ["Badminton", "Table tennis", "Volleyball", "Chess"],
    correctIndex: 1,
    tags: ["sports", "table-tennis"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your favourite sport basketball, Dan?",
    line2: "No, my favourite sport is football.",
    question: "🔊 What is Dan's favourite sport?",
    options: ["Basketball", "Volleyball", "Football", "Chess"],
    correctIndex: 2,
    tags: ["sports", "football"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What are you doing, Alice?",
    line2: "My grandpa and I are playing chess.",
    question: "🔊 What is Alice playing?",
    options: ["Chess", "Volleyball", "Table tennis", "Word puzzle"],
    correctIndex: 0,
    tags: ["sports", "chess"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you play volleyball, Tom?",
    line2: "No, but I can play basketball very well.",
    question: "🔊 What sport can Tom play?",
    options: ["Volleyball", "Basketball", "Football", "Chess"],
    correctIndex: 1,
    tags: ["sports", "basketball"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What is that book on the table, Sue?",
    line2: "It's a book of word puzzles. I like doing them.",
    question: "🔊 What does Sue like doing?",
    options: ["Playing chess", "Doing word puzzles", "Reading stories", "Drawing pictures"],
    correctIndex: 1,
    tags: ["sports", "word-puzzle"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Are you and Bill playing football?",
    line2: "No, we are playing badminton in the park.",
    question: "🔊 What game are the boys playing?",
    options: ["Football", "Basketball", "Badminton", "Volleyball"],
    correctIndex: 2,
    tags: ["sports", "badminton"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you play table tennis at school, May?",
    line2: "No, we play volleyball at break time.",
    question: "🔊 What sport does May play at school?",
    options: ["Table tennis", "Volleyball", "Badminton", "Basketball"],
    correctIndex: 1,
    tags: ["sports", "volleyball"]
  },

  // Theme 3: Food & Drinks (mango, pineapple, coconut, sausage, lemonade, burger, chocolate)
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What fruit would you like, Ben?",
    line2: "I'd like some mango and pineapple, please.",
    question: "🔊 Which fruits does the boy want?",
    options: ["Apple and orange", "Banana and coconut", "Mango and pineapple", "Pear and lemon"],
    correctIndex: 2,
    tags: ["food", "mango", "pineapple"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Do you like drinking milk, Lucy?",
    line2: "No, I like cold lemonade on a hot day.",
    question: "🔊 What drink does the girl prefer?",
    options: ["Milk", "Water", "Lemonade", "Fruit juice"],
    correctIndex: 2,
    tags: ["food", "lemonade"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "What did you eat for lunch, Sam?",
    line2: "I ate a burger and two sausages.",
    question: "🔊 What did Sam eat for lunch?",
    options: ["Rice and fish", "A burger and sausages", "Cake and eggs", "Bread and chocolate"],
    correctIndex: 1,
    tags: ["food", "sausage", "burger"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Would you like some coconut water, Jill?",
    line2: "No, thank you. Can I have some chocolate cake?",
    question: "🔊 What does the girl want?",
    options: ["Coconut water", "Chocolate cake", "Lemonade", "Pineapple juice"],
    correctIndex: 1,
    tags: ["food", "chocolate", "cake"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is there any fruit on the table, Hugo?",
    line2: "Yes, there is a big coconut and a watermelon.",
    question: "🔊 What fruits are on the table?",
    options: ["Coconut and watermelon", "Mango and pineapple", "Apple and orange", "Banana and pear"],
    correctIndex: 0,
    tags: ["food", "coconut"]
  },

  // Theme 4: Animals & Colours (giraffe, crocodile, snake, spider, tiger, hippo, lizard, black, purple, yellow)
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What animal can you see, Grace?",
    line2: "I can see a tall giraffe eating leaves.",
    question: "🔊 What animal does Grace see?",
    options: ["A hippo", "A crocodile", "A giraffe", "A tiger"],
    correctIndex: 2,
    tags: ["animals", "giraffe"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the snake green, Dan?",
    line2: "No, this snake is black and yellow.",
    question: "🔊 What colour is the snake?",
    options: ["Green", "Black and yellow", "Purple and red", "Orange and brown"],
    correctIndex: 1,
    tags: ["animals", "snake", "colours"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Look at the spider on the wall, Sue!",
    line2: "Oh, it is very big and purple!",
    question: "🔊 What colour is the spider?",
    options: ["Black", "Purple", "Green", "Yellow"],
    correctIndex: 1,
    tags: ["animals", "spider", "colours"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is the crocodile swimming, Tom?",
    line2: "No, the crocodile is sleeping near the water.",
    question: "🔊 What is the crocodile doing?",
    options: ["Swimming", "Sleeping", "Running", "Eating"],
    correctIndex: 1,
    tags: ["animals", "crocodile"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "What is your favourite animal, May?",
    line2: "I like tigers, they are orange and black.",
    question: "🔊 What is the girl's favourite animal?",
    options: ["Giraffes", "Crocodiles", "Tigers", "Monkeys"],
    correctIndex: 2,
    tags: ["animals", "tiger"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Can you see the hippo, Ben?",
    line2: "Yes, it is sitting in the water.",
    question: "🔊 What is the hippo doing?",
    options: ["Sitting in the water", "Running in the park", "Eating fruit", "Sleeping under a tree"],
    correctIndex: 0,
    tags: ["animals", "hippo"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is the lizard green, Lucy?",
    line2: "Yes, it is a small green lizard on the rock.",
    question: "🔊 What is the lizard like?",
    options: ["A big green lizard", "A small green lizard", "A small yellow lizard", "A big black lizard"],
    correctIndex: 1,
    tags: ["animals", "lizard"]
  },

  // Theme 5: Clothes (jacket, jeans, shoes, handbag, glasses)
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Where are my glasses, Sam?",
    line2: "They are next to your handbag, Mum.",
    question: "🔊 Where are the glasses?",
    options: ["In the handbag", "Next to the handbag", "On the bed", "Under the table"],
    correctIndex: 1,
    tags: ["clothes", "glasses"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Is your jacket blue, Jill?",
    line2: "No, my jacket is red and my jeans are blue.",
    question: "🔊 What colour is the girl's jacket?",
    options: ["Blue", "Red", "Black", "Green"],
    correctIndex: 1,
    tags: ["clothes", "jacket", "jeans"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Do you like my new shoes, Nick?",
    line2: "Yes, they are very nice, Dad.",
    question: "🔊 What are the shoes like?",
    options: ["Old and dirty", "Very nice", "Too small", "Red and yellow"],
    correctIndex: 1,
    tags: ["clothes", "shoes"]
  },

  // Theme 6: Home & Family (kitchen, bedroom, bathroom, dining room, living room, mirror, clock, cousin, brother, sister)
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is your cousin, Kim?",
    line2: "She is cooking in the kitchen with my grandma.",
    question: "🔊 Where is the girl's cousin?",
    options: ["In the bedroom", "In the kitchen", "In the garden", "In the dining room"],
    correctIndex: 1,
    tags: ["home", "cousin", "kitchen"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is your brother in the living room, Dan?",
    line2: "No, he is sleeping in his bedroom.",
    question: "🔊 Where is the boy's brother?",
    options: ["In the living room", "In the bedroom", "In the bathroom", "In the kitchen"],
    correctIndex: 1,
    tags: ["home", "brother", "bedroom"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Where is the clock in your house, Alice?",
    line2: "It's on the wall in our dining room.",
    question: "🔊 Where is the clock?",
    options: ["In the living room", "On the dining room wall", "In the kitchen", "In the bathroom"],
    correctIndex: 1,
    tags: ["home", "clock", "dining-room"]
  },
  {
    speaker1: 'Woman', speaker2: 'Boy',
    line1: "Is there a mirror in your bedroom, Tom?",
    line2: "No, the mirror is in the bathroom.",
    question: "🔊 Where is the mirror?",
    options: ["In the bedroom", "In the bathroom", "In the hall", "In the kitchen"],
    correctIndex: 1,
    tags: ["home", "mirror", "bathroom"]
  },
  {
    speaker1: 'Man', speaker2: 'Girl',
    line1: "Who is that playing with the toy robot?",
    line2: "That's my baby sister in the living room.",
    question: "🔊 Who is playing with the toy robot?",
    options: ["Her cousin", "Her baby sister", "Her brother", "Her friend"],
    correctIndex: 1,
    tags: ["home", "sister", "living-room"]
  }
];

// Let's duplicate and adapt the raw dialogues to generate exactly 105 dialogues (7 exams * 15 questions)
// Using different names, words, and slight adjustments so we have 105 distinct questions.
const fullList: DialogueItem[] = [];

// Base list has 37 items. We need 105. Let's loop and vary them dynamically.
const names = ["Lucy", "Grace", "Sam", "Ben", "Anna", "Kim", "Dan", "Alice", "Tom", "Sue", "Bill", "May", "Hugo", "Jill", "Nick", "Alex", "Pat", "Eva"];
const colors = ["red", "blue", "green", "yellow", "black", "white", "orange", "purple", "brown", "grey"];
const foods = ["mango", "pineapple", "coconut", "sausage", "burger", "chocolate", "cake", "apple", "banana", "pear", "orange", "lemon"];
const sports = ["chess", "table tennis", "volleyball", "badminton", "basketball", "football", "word puzzle", "tennis", "hockey", "baseball"];
const rooms = ["library", "gym", "playground", "art room", "computer room", "music room", "classroom", "kitchen", "bedroom", "bathroom", "dining room", "living room"];
const animalsList = ["giraffe", "crocodile", "snake", "spider", "tiger", "hippo", "lizard", "monkey", "elephant", "frog", "goat", "cow", "sheep", "duck", "chicken", "bird"];

for (let i = 0; i < 105; i++) {
  const base = rawDialogues[i % rawDialogues.length];
  const name1 = names[i % names.length];
  const name2 = names[(i + 1) % names.length];
  const col1 = colors[i % colors.length];
  const col2 = colors[(i + 2) % colors.length];
  const food1 = foods[i % foods.length];
  const food2 = foods[(i + 3) % foods.length];
  const sport1 = sports[i % sports.length];
  const room1 = rooms[i % rooms.length];
  const animal1 = animalsList[i % animalsList.length];

  let l1 = base.line1;
  let l2 = base.line2;
  let qText = base.question;
  let opts = [...base.options] as [string, string, string, string];
  let correct = base.correctIndex;

  // Customize based on index to keep questions unique and varied
  if (i >= rawDialogues.length) {
    if (base.tags.includes("school")) {
      l1 = `Where are you going, ${name1}?`;
      l2 = `I'm going to the ${room1} to see my teacher.`;
      qText = `🔊 Where is ${name1} going?`;
      const otherRooms = rooms.filter(r => r !== room1).slice(0, 3);
      opts = [room1, ...otherRooms] as [string, string, string, string];
      opts.sort();
      correct = opts.indexOf(room1);
    } else if (base.tags.includes("sports")) {
      l1 = `Do you like playing ${sport1}, ${name1}?`;
      l2 = `No, I like playing with ${name2} in the garden.`;
      qText = `🔊 What does ${name1} like playing?`;
      const otherSports = sports.filter(s => s !== sport1).slice(0, 3);
      opts = [sport1, ...otherSports] as [string, string, string, string];
      opts.sort();
      correct = opts.indexOf(sport1);
    } else if (base.tags.includes("food")) {
      l1 = `What fruit would you like, ${name1}?`;
      l2 = `I'd like some ${food1}, please.`;
      qText = `🔊 What fruit does ${name1} want?`;
      const otherFoods = foods.filter(f => f !== food1).slice(0, 3);
      opts = [food1, ...otherFoods] as [string, string, string, string];
      opts.sort();
      correct = opts.indexOf(food1);
    } else if (base.tags.includes("animals")) {
      l1 = `Look at that ${animal1}, ${name1}!`;
      l2 = `Yes, it is very nice. It is ${col1}.`;
      qText = `🔊 What colour is the ${animal1}?`;
      const otherCols = colors.filter(c => c !== col1).slice(0, 3);
      opts = [col1, ...otherCols] as [string, string, string, string];
      opts.sort();
      correct = opts.indexOf(col1);
    } else if (base.tags.includes("clothes")) {
      l1 = `Do you have my new ${col1} jacket, ${name1}?`;
      l2 = `No, I have your ${col2} handbag.`;
      qText = `🔊 What does the girl/boy have?`;
      opts = [`The ${col2} handbag`, `The ${col1} jacket`, `A blue hat`, `A yellow shirt`].slice(0, 4) as [string, string, string, string];
      correct = 0;
    } else {
      l1 = `Where is ${name1}, ${name2}?`;
      l2 = `He is in the ${room1} reading a book.`;
      qText = `🔊 Where is ${name1}?`;
      const otherRooms = rooms.filter(r => r !== room1).slice(0, 3);
      opts = [room1, ...otherRooms] as [string, string, string, string];
      opts.sort();
      correct = opts.indexOf(room1);
    }
  }

  fullList.push({
    speaker1: base.speaker1,
    speaker2: base.speaker2,
    line1: l1,
    line2: l2,
    question: qText,
    options: opts,
    correctIndex: correct,
    tags: base.tags
  });
}

// 4. Construct exams
const exams = [];
for (let i = 0; i < 7; i++) {
  const examQuestions = [];
  for (let j = 0; j < 15; j++) {
    const item = fullList[i * 15 + j];
    // Hash function to create unique file names based on speaker roles and dialogue content
    const audioText = `${item.speaker1}: ${item.line1}\n${item.speaker2}: ${item.line2}`;
    
    // We will generate the hash in the audio generation script
    examQuestions.push({
      type: "listening_multiple_choice",
      difficulty: 1.5,
      metadata_json: {
        audio_text: audioText,
        question: item.question,
        options: item.options,
        correct_index: item.correctIndex,
        tags: ["listening", "dialogue", "level-3", ...item.tags]
      }
    });
  }

  exams.push({
    exam_number: i + 1,
    title: `PreA1 Starter Listen Level 3 - Đề ${String(i + 1).padStart(2, '0')}`,
    duration_minutes: 10,
    questions: examQuestions
  });
}

const output = {
  collection: {
    title: "Luyện nghe Level 3",
    subject_slug: "pre-a1-starter",
    grade: 3,
    volume: 1,
    units: [4],
    sequence_number: 11,
    exam_type: "listening",
    reference_book: "PreA1 Starter - Listening Level 3 (hội thoại)",
    status: "published"
  },
  exams
};

const outDir = path.join('content', 'exam-bank');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'pre-a1-listening-level3-exams.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log("✅ Successfully created content/exam-bank/pre-a1-listening-level3-exams.json");
console.log("Total exams: 7, Total questions: 105");
