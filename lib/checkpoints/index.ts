/**
 * Checkpoint library for IELTS Listening
 * Each unit has 3 interactive tasks (text, true/false, or fill-in-the-blank).
 */

export interface Checkpoint {
  id: string;
  question: string;
  type: "text" | "truefalse" | "fill";
  acceptedAnswers: string[];   // normalised lowercase
  hint: string;                // shown after first wrong attempt
  lineRef: number;             // index into transcript.lines[]
  revealText: string;          // full sentence shown when answer is revealed
  /** Only for "fill" type – the word that fills the blank */
  blankWord?: string;
  /** Full cloze sentence displayed to user ("I always _____ my bedroom") */
  clozeSentence?: string;
}

export const unit1Checkpoints: Checkpoint[] = [
  {
    id: "u1-c1",
    question: "What is Jack's brother good at doing?",
    type: "text",
    acceptedAnswers: ["building", "fixing", "building things", "fixing stuff", "making furniture"],
    hint: "He is very practical and works with his hands! 🔨",
    lineRef: 1,
    revealText: "Jack's brother is great at building things and fixing stuff.",
  },
  {
    id: "u1-c2",
    question: "True or False: Jack's grandma only cooks breakfast for the family.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for how many meals she makes 🍳",
    lineRef: 3,
    revealText:
      "False — Jack says she makes ALL their meals, and the food is always delicious.",
  },
  {
    id: "u1-c3",
    question: "Fill in: Jack's mother loves ______ in her free time.",
    type: "fill",
    acceptedAnswers: ["gardening", "planting flowers", "garden"],
    hint: "She spends a lot of time outside with plants 🌿",
    lineRef: 5,
    revealText:
      "Jack's mother loves GARDENING; she's always planting flowers.",
    blankWord: "gardening",
    clozeSentence: "Jack's mother loves ______ in her free time.",
  },
];

export const unit2Checkpoints: Checkpoint[] = [
  {
    id: "u2-c1",
    question: "Where is Giorgio from?",
    type: "text",
    acceptedAnswers: ["milan", "italy"],
    hint: "He mentions a famous city in Italy 🇮🇹",
    lineRef: 0,
    revealText: "Hi guys, I'm Giorgio from Milan.",
  },
  {
    id: "u2-c2",
    question: "True or False: Giorgio's apartment has a balcony.",
    type: "truefalse",
    acceptedAnswers: ["true"],
    hint: "Listen for where he drinks his coffee ☕",
    lineRef: 1,
    revealText:
      "True — Giorgio says his apartment has a small but beautiful balcony.",
  },
  {
    id: "u2-c3",
    question: "Fill in: The ______ is quite high, making the rooms feel bigger.",
    type: "fill",
    acceptedAnswers: ["ceiling"],
    hint: "It's the part of the room above your head 🏠",
    lineRef: 3,
    revealText:
      "The CEILING is quite high, which makes the rooms feel much bigger.",
    blankWord: "ceiling",
    clozeSentence: "The ______ is quite high, making the rooms feel bigger.",
  },
];

export const unit3Checkpoints: Checkpoint[] = [
  {
    id: "u3-c1",
    question: "What is an example of an adventure hobby mentioned?",
    type: "text",
    acceptedAnswers: ["rock climbing", "skydiving", "extreme sports"],
    hint: "Think about sports that give you a rush of adrenaline 🧗‍♂️",
    lineRef: 1,
    revealText: "Activities such as rock climbing and skydiving are popular adventure hobbies.",
  },
  {
    id: "u3-c2",
    question: "True or False: People usually practice extreme sports at home.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the place where they practice 🏟️",
    lineRef: 2,
    revealText: "False — People often practice them at the local leisure center.",
  },
  {
    id: "u3-c3",
    question: "Fill in: Remember to always wear ______ equipment to avoid injuries.",
    type: "fill",
    acceptedAnswers: ["safety", "protective"],
    hint: "It helps keep you safe while practicing ⛑️",
    lineRef: 4,
    revealText: "Remember to always wear SAFETY equipment to avoid injuries.",
    blankWord: "safety",
    clozeSentence: "Remember to always wear ______ equipment to avoid injuries.",
  },
];

export const unit4Checkpoints: Checkpoint[] = [
  {
    id: "u4-c1",
    question: "Where did Anna go for her ecotourism holiday?",
    type: "text",
    acceptedAnswers: ["costa rica"],
    hint: "It's a country famous for its rainforests 🇨🇷",
    lineRef: 0,
    revealText: "Anna decided to go on an ecotourism holiday in Costa Rica.",
  },
  {
    id: "u4-c2",
    question: "True or False: Their itinerary was planned to protect the environment.",
    type: "truefalse",
    acceptedAnswers: ["true"],
    hint: "Listen for the purpose of their planning 🌿",
    lineRef: 1,
    revealText: "True — The itinerary was fully planned to protect the local environment.",
  },
  {
    id: "u4-c3",
    question: "Fill in: They stayed in a traditional green accommodation built from ______.",
    type: "fill",
    acceptedAnswers: ["bamboo", "recycled materials", "bamboo and recycled materials"],
    hint: "Natural and reused materials 🎋",
    lineRef: 2,
    revealText: "They stayed in an accommodation built entirely from BAMBOO and recycled materials.",
    blankWord: "bamboo",
    clozeSentence: "They stayed in a traditional green accommodation built from ______.",
  },
];

export const unit5Checkpoints: Checkpoint[] = [
  {
    id: "u5-c1",
    question: "Where is the Street Food Festival being held?",
    type: "text",
    acceptedAnswers: ["london"],
    hint: "It's the capital city of the UK 🇬🇧",
    lineRef: 0,
    revealText: "Welcome to the Annual International Street Food Festival here in London!",
  },
  {
    id: "u5-c2",
    question: "True or False: Fresh ingredients are not important for delicious food.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for what is 'the most important thing' 🥕",
    lineRef: 2,
    revealText: "False — Using organic and fresh ingredients is the most important thing.",
  },
  {
    id: "u5-c3",
    question: "Fill in: Mix everything together, wrap it in round ______ sheets.",
    type: "fill",
    acceptedAnswers: ["dough"],
    hint: "It's the flour and water mixture used for the outer layer 🥟",
    lineRef: 8,
    revealText: "Mix everything together, wrap it in round DOUGH sheets.",
    blankWord: "dough",
    clozeSentence: "Mix everything together, wrap it in round ______ sheets.",
  },
];

export const unit6Checkpoints: Checkpoint[] = [
  {
    id: "u6-c1",
    question: "What is located next to the main bus stop?",
    type: "text",
    acceptedAnswers: ["train station", "northfields train station"],
    hint: "It's another place where you catch long-distance transport 🚉",
    lineRef: 1,
    revealText: "The main bus stop is located directly next to the Northfields train station.",
  },
  {
    id: "u6-c2",
    question: "True or False: The metro is slower than taking a taxi.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the comparison in the evening rush hour 🚕",
    lineRef: 3,
    revealText: "False — Going by the underground metro is much FASTER and cheaper than a taxi.",
  },
  {
    id: "u6-c3",
    question: "Fill in: Roads suffer from heavy ______ during the rush hour.",
    type: "fill",
    acceptedAnswers: ["congestion", "traffic"],
    hint: "It's a fancy word for traffic jams 🚦",
    lineRef: 2,
    revealText: "Traditional roads suffer from heavy CONGESTION.",
    blankWord: "congestion",
    clozeSentence: "Roads suffer from heavy ______ during the rush hour.",
  },
];

export const unit7Checkpoints: Checkpoint[] = [
  {
    id: "u7-c1",
    question: "Who is being interviewed in the podcast?",
    type: "text",
    acceptedAnswers: ["jack riley", "jack"],
    hint: "Listen for the guest's name at the start 🎙️",
    lineRef: 0,
    revealText: "Today, we are interviewing Jack Riley about his professional career.",
  },
  {
    id: "u7-c2",
    question: "True or False: Creative jobs will be replaced by robots soon.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the mention of 'social skills' 🎨",
    lineRef: 3,
    revealText: "False — Creative jobs that require social skills will ALWAYS need human beings.",
  },
  {
    id: "u7-c3",
    question: "Fill in: Young candidates should focus on learning ______ skills.",
    type: "fill",
    acceptedAnswers: ["digital"],
    hint: "Related to computers and technology 💻",
    lineRef: 4,
    revealText: "Young candidates should focus on learning DIGITAL skills.",
    blankWord: "digital",
    clozeSentence: "Young candidates should focus on learning ______ skills.",
  },
];

export const unit8Checkpoints: Checkpoint[] = [
  {
    id: "u8-c1",
    question: "What causes severe tiredness the next day?",
    type: "text",
    acceptedAnswers: ["insomnia", "lack of sleep", "not sleeping"],
    hint: "It's the medical term for being unable to sleep 😴",
    lineRef: 1,
    revealText: "Many young adults are suffering from insomnia, which causes severe tiredness.",
  },
  {
    id: "u8-c2",
    question: "True or False: You should drink coffee after 8 PM.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the advice about 'caffeine' ☕",
    lineRef: 3,
    revealText: "False — You had better avoid using gadgets or drinking caffeine after 8 PM.",
  },
  {
    id: "u8-c3",
    question: "Fill in: Proper ______ is vital when exercising in the heat.",
    type: "fill",
    acceptedAnswers: ["hydration", "drinking water"],
    hint: "It means drinking enough water to stay healthy 💧",
    lineRef: 7,
    revealText: "To protect your body, proper HYDRATION is absolutely vital.",
    blankWord: "hydration",
    clozeSentence: "Proper ______ is vital when exercising in the heat.",
  },
];

export const unit10Checkpoints: Checkpoint[] = [
  {
    id: "u10-c1",
    question: "What year are they discussing technology in?",
    type: "text",
    acceptedAnswers: ["2050"],
    hint: "It's a future year, about 25 years from now 📅",
    lineRef: 0,
    revealText: "Let's explore technology in 2050.",
  },
  {
    id: "u10-c2",
    question: "True or False: Lorenzo spent 2 hours a day on social media.",
    type: "truefalse",
    acceptedAnswers: ["false"],
    hint: "Listen for the specific number of hours he mentioned ⏳",
    lineRef: 6,
    revealText: "False — Lorenzo realized he was spending over SEVEN hours a day.",
  },
  {
    id: "u10-c3",
    question: "Fill in: Lorenzo set his screen to ______ mode to help.",
    type: "fill",
    acceptedAnswers: ["greyscale", "grey scale", "black and white"],
    hint: "It removes all the colors from the screen 🌫️",
    lineRef: 8,
    revealText: "I also set my screen to GREYSCALE mode.",
    blankWord: "greyscale",
    clozeSentence: "Lorenzo set his screen to ______ mode to help.",
  },
];

/**
 * Returns the checkpoint set for the given unit number.
 */
export function getCheckpointsForUnit(unitNum: number): Checkpoint[] {
  const map: Record<number, Checkpoint[]> = {
    1: unit1Checkpoints,
    2: unit2Checkpoints,
    3: unit3Checkpoints,
    4: unit4Checkpoints,
    5: unit5Checkpoints,
    6: unit6Checkpoints,
    7: unit7Checkpoints,
    8: unit8Checkpoints,
    10: unit10Checkpoints,
  };
  return map[unitNum] ?? unit1Checkpoints;
}
