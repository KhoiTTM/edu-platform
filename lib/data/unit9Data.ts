export interface Exercise {
  id: string;
  title: string;
  type: "matching" | "multiple-choice" | "fill-blank" | "table-matching" | "text-area" | "grammar-table";
  questionText: string;
  options?: string[];
  correctAnswers: string[];
  placeholder?: string;
}

export interface TextbookPage {
  pageNumber: number;
  imagePath: string; // Keep for interface compatibility, though we render flipbook iframe
  title: string;
  exercises: Exercise[];
  audioUrl?: string;
}

export const unit9Pages: TextbookPage[] = [
  {
    pageNumber: 104,
    imagePath: "",
    title: "Vocabulary and Speaking: Ways of Learning English",
    exercises: [
      {
        id: "p104-ex1",
        title: "Exercise 1: Match the ways of learning English with the pictures",
        type: "matching",
        questionText: "Match: study with a teacher in a classroom, talk to people whose first language is English, use a dictionary, listen to songs in English, keep a vocabulary notebook, watch videos online, read newspapers and magazines, write an email to a friend — to pictures 1-8.",
        correctAnswers: ["1 → study with a teacher in a classroom", "2 → talk to people whose first language is English", "3 → use a dictionary", "4 → listen to songs in English", "5 → keep a vocabulary notebook", "6 → watch videos online", "7 → read newspapers and magazines", "8 → write an email to a friend"],
        placeholder: "1. study with a teacher, 2. talk to people..."
      },
      {
        id: "p105-ex3",
        title: "Exercise 3: Underline the correct preposition",
        type: "fill-blank",
        questionText: "1. Can you phone me when you are free? I need to talk (to / by / for) you. 2. When you apply for a job, I think it is best to communicate (to / with / by) email first. 3. The weather is a popular topic to discuss (for / about / by) in the UK. 4. Whenever I visit your home, they always chat (about / with / for) me. 5. I know enough of the language to hold a conversation (with / for / to) someone.",
        correctAnswers: ["to", "by", "about", "with", "with"],
        placeholder: "1. to, 2. by, 3. about..."
      },
      {
        id: "p105-ex4",
        title: "Exercise 4: Match the sentence halves",
        type: "matching",
        questionText: "1. What is the main language that... 2. Do you prefer to communicate... 3. How often do you talk... 4. What do you usually chat... 5. Do you think reading newspapers...",
        options: ["A. can help with language learning?", "B. about with your friends?", "C. you speak in your country?", "D. to people on the internet?", "E. by phone or by email?"],
        correctAnswers: ["1-C", "2-E", "3-D", "4-B", "5-A"]
      }
    ]
  },
  {
    pageNumber: 105,
    imagePath: "",
    title: "Grammar: Going to for Future Plans + Listening",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
    exercises: [
      {
        id: "p105-ex6",
        title: "Exercise 6: Complete the plans using a verb in the box",
        type: "fill-blank",
        questionText: "Verbs: learn, meet, send, study, video call. 1. I'm going to ___ friends at the cinema tonight. 2. I'm going to ___ my cousin on the computer this afternoon. 3. I'm going to ___ five new phrases today. 4. I'm going to ___ in the library this morning. 5. I'm going to ___ an email to my English friend at the weekend.",
        correctAnswers: ["meet", "video call", "learn", "study", "send"],
        placeholder: "1. meet, 2. video call, 3. learn..."
      },
      {
        id: "p106-ex9",
        title: "Exercise 9: Decide if the sentences are correct or incorrect and correct the mistakes",
        type: "table-matching",
        questionText: "1. When I am 18, I going to study in the UK. 2. Are you going to come shopping with me later? 3. I'm not going to order any food at the restaurant, I'm not hungry. 4. She is going buy a new smartphone at the weekend. 5. You are going to tell your parents that you got bad results on your science exam? 6. Where are you going to watch the football match, at home or at your uncle's house?",
        correctAnswers: ["1. ✗ — should be 'I am going to study'", "2. ✓ correct", "3. ✓ correct", "4. ✗ — should be 'She is going to buy'", "5. ✗ — should be 'Are you going to tell your parents...?'", "6. ✓ correct"],
        placeholder: "1. ✓/✗, 2. ✓/✗..."
      },
      {
        id: "p106-ex11",
        title: "Exercise 11: Listen to Sofia and Oliver discussing a language project — True or False",
        type: "multiple-choice",
        questionText: "1. There are over 200 students in the school who speak more than one language. 2. Oliver thinks that they shouldn't only include numbers in the report. 3. Oliver can speak more than one language.",
        options: ["True", "False"],
        correctAnswers: ["Open listening practice — answers depend on audio conversation between Sofia and Oliver."]
      },
      {
        id: "p107-ex12",
        title: "Exercise 12: Listen again and complete the table with room information",
        type: "fill-blank",
        questionText: "Complete the table: Miss Wainwright's room, Miss Smith's room, Mr Black's room. Then answer: Where is Peter going to next? A. The library / B. The maths classroom / C. The cafe.",
        correctAnswers: ["Open listening practice — room names depend on audio; final answer is A, B, or C."],
        placeholder: "Miss Wainwright: ..., Miss Smith: ..., Mr Black: ..., Peter going to: A/B/C"
      }
    ]
  },
  {
    pageNumber: 107,
    imagePath: "",
    title: "Speaking: A Longer Talk + Vocabulary: Collocations",
    exercises: [
      {
        id: "p107-ex13",
        title: "Exercise 13: Talk for 1-2 minutes about a language you are studying",
        type: "text-area",
        questionText: "Describe a language that you are studying, other than your first language. You should say: what the language is, how well you know the language, how long you are going to study the language for. Explain why you are learning this language.",
        correctAnswers: ["Open speaking practice — 1-2 minute talk covering all four points using going to for future plans."],
        placeholder: "I am studying... I have known it for... I am going to study it for... because..."
      },
      {
        id: "p107-ex15",
        title: "Exercise 15: Complete the collocations with the correct verb A, B or C",
        type: "multiple-choice",
        questionText: "1. ___ a conversation: A. speak / B. do / C. hold. 2. ___ an advantage: A. make / B. have / C. do. 3. ___ your skills: A. have / B. get / C. practise. 4. ___ an effort: A. make / B. give / C. take. 5. ___ some work: A. practise / B. do / C. hold. 6. ___ fun: A. take / B. begin / C. have. 7. ___ a language: A. get / B. hold / C. speak. 8. ___ someone's advice: A. do / B. take / C. speak. 9. ___ time (to do something): A. have / B. practise / C. do. 10. ___ progress: A. do / B. make / C. have.",
        correctAnswers: ["1. C. hold", "2. B. have", "3. C. practise", "4. A. make", "5. B. do", "6. C. have", "7. C. speak", "8. B. take", "9. A. have", "10. B. make"]
      }
    ]
  },
  {
    pageNumber: 108,
    imagePath: "",
    title: "Reading: Multilingual — Speaking Many Languages",
    exercises: [
      {
        id: "p108-ex16",
        title: "Exercise 16: Skim the article about Richard Doner and answer the questions",
        type: "fill-blank",
        questionText: "1. Who is Richard Doner? 2. What is special about him? 3. Can he see a disadvantage?",
        correctAnswers: ["1. An American teenager who lives in New York.", "2. He can hold a conversation in over twenty languages.", "3. Yes — you have to continuously practise and put in effort, or you forget what you know."],
        placeholder: "1. ..., 2. ..., 3. ..."
      },
      {
        id: "p108-ex17",
        title: "Exercise 17: Read paragraphs 1-3 again and underline the correct words to summarise",
        type: "fill-blank",
        questionText: "1. Richard Doner is very special because he can speak more languages than (more / most of / most) people. 2. Richard is very lucky as he has (many / any / lots of) opportunities to practise his language skills. 3. Richard practises speaking each language (all the time / regularly / every day) to improve.",
        correctAnswers: ["most", "lots of", "every day"],
        placeholder: "1. most, 2. lots of, 3. every day"
      },
      {
        id: "p109-ex19",
        title: "Exercise 19-20: Complete sentence-completion answers using NO MORE THAN THREE words",
        type: "fill-blank",
        questionText: "1. In New York, you can find people from a large number of ___ (Paragraph 1). 2. If Richard wants to talk with people from different countries, it isn't necessary to ___ (Paragraph 2). 3. To remember languages, Richard makes sure his brain does ___ (Paragraph 3). 4. If you know a language, you can start to understand about the people and ___ (Paragraph 4). 5. Swahili is a popular language in ___ (Paragraph 5). 6. When he learns a language, it is absolutely necessary for Richard to ___ (Paragraph 6).",
        correctAnswers: ["different countries", "travel (to another country)", "some work / a lot of work", "their cultures", "West Africa", "have fun"],
        placeholder: "1. different countries, 2. travel..."
      }
    ]
  },
  {
    pageNumber: 110,
    imagePath: "",
    title: "Writing: Short Essay on a Topic — Online Dictionary",
    exercises: [
      {
        id: "p110-ex23",
        title: "Exercise 23: Organise the four parts of an essay in the correct order",
        type: "matching",
        questionText: "A. Paragraph (disadvantages), B. Conclusion, C. Introduction, D. Paragraph (advantages). Put in the correct essay order.",
        correctAnswers: ["C → D → A → B"],
        placeholder: "Order: C, D, A, B"
      },
      {
        id: "p110-ex25",
        title: "Exercise 25: Choose the best answer A, B or C to complete the model essay",
        type: "multiple-choice",
        questionText: "1. I ___ discuss the advantages and disadvantages: A. am going / B. going to / C. am going to. 2. If a student doesn't ___ the meaning: A. see / B. know / C. think. 3. If they are afraid of ___ a mistake: A. having / B. doing / C. making. 4. If they stop to ___ every word: A. look / B. see / C. check. 5. They won't ___ enough: A. practise / B. use / C. speak. 6. It is difficult to check students are ___ their computers: A. using / B. use / C. used. 7. To look ___ a word: A. up / B. at / C. to. 8. They won't ___ any progress: A. do / B. make / C. have.",
        correctAnswers: ["1. C. am going to", "2. B. know", "3. C. making", "4. C. check", "5. A. practise", "6. A. using", "7. A. up", "8. B. make"]
      },
      {
        id: "p111-ex27",
        title: "Exercise 27: Write an essay (220-250 words) on advantages/disadvantages of studying with classmates from the same country",
        type: "text-area",
        questionText: "Essay topic: What are the advantages and disadvantages of taking English lessons with classmates from the same country? Include a clear introduction and conclusion, main paragraphs discussing advantages and disadvantages, and linking words/phrases to organise ideas. Write 220-250 words.",
        correctAnswers: ["Open writing practice — 220-250 word essay with introduction, advantages paragraph, disadvantages paragraph, and conclusion, using linking words (Firstly, Secondly, On the other hand, To sum up)."],
        placeholder: "Many students are interested in learning English. Firstly... Secondly... On the other hand... To sum up..."
      }
    ]
  },
  {
    pageNumber: 112,
    imagePath: "",
    title: "Unit 09 Grammar and Vocabulary Practice",
    exercises: [
      {
        id: "p112-ex1",
        title: "Exercise 1: Complete the sentences using a preposition or adverb (not all need one)",
        type: "fill-blank",
        questionText: "1. I usually communicate ___ email with my lecturer at university. 2. If you are having a difficult time, it is best to talk ___ someone. 3. You must be able to hold a conversation ___ someone to pass the exam. 4. You can't take the course, unless you speak English really well. 5. I want to have a chat ___ something. 6. You can go to the careers office to have a chat ___ someone about jobs. 7. Do you want to discuss ___ a topic for the project?",
        correctAnswers: ["by", "to", "with", "(no preposition needed)", "about", "with", "(no preposition needed)"],
        placeholder: "1. by, 2. to, 3. with..."
      },
      {
        id: "p112-ex2",
        title: "Exercise 2: Match the sentence halves",
        type: "matching",
        questionText: "1. I'm going to study... 2. I'm going to talk... 3. I'm going to use... 4. I'm going to listen... 5. I'm going to keep... 6. I'm going to watch... 7. I'm going to read... 8. I'm going to write...",
        options: ["A. to songs in English.", "B. with a teacher in a classroom.", "C. a dictionary.", "D. to people whose first language is English.", "E. emails to my friends.", "F. a vocabulary notebook.", "G. online videos.", "H. newspapers and magazines."],
        correctAnswers: ["1-B", "2-D", "3-C", "4-A", "5-F", "6-G", "7-H", "8-E"]
      },
      {
        id: "p112-ex3",
        title: "Exercise 3: Complete sentences/questions using positive, negative or question form of going to",
        type: "fill-blank",
        questionText: "0. I'm going to (buy) a paper dictionary. 1. I'm not going to (worry) about my English test tomorrow. 2. Are you going to (learn) some French before your holiday? 3. I'm going to (try) my hardest to improve my vocabulary. 4. Are you going to (meet) them outside the library? 5. Is she going to (live) in campus accommodation?",
        correctAnswers: ["I'm not going to worry", "Are you going to learn", "I'm going to try", "Are you going to meet", "Is she going to live"],
        placeholder: "1. I'm not going to worry, 2. Are you going to learn..."
      }
    ]
  },
  {
    pageNumber: 113,
    imagePath: "",
    title: "Unit 09 Practice: Going to Questions and Conversation Gap-fill",
    exercises: [
      {
        id: "p113-ex4",
        title: "Exercise 4: Write questions using going to for future plans",
        type: "fill-blank",
        questionText: "1. who / going to / do / language project with / ? 2. where / going to / buy / a dictionary from / ? 3. how / going to / improve / your language skills / ? 4. when / going to / tell / teacher you want to move up to a higher class / ? 5. why / not going to / go university next year / ?",
        correctAnswers: [
          "Who are you going to do the language project with?",
          "Where are you going to buy a dictionary from?",
          "How are you going to improve your language skills?",
          "When are you going to tell the teacher you want to move up to a higher class?",
          "Why are you not going to go to university next year?"
        ],
        placeholder: "1. Who are you going to..., 2. Where are you going to..."
      },
      {
        id: "p113-ex5",
        title: "Exercise 5: Complete the conversation using the words in the box",
        type: "fill-blank",
        questionText: "Words: time, advantage, skills, advice, effort, progress, fun, work. Susan: My brother says he won't be able to pass his exam, so he's not going to make an (1) ___. George: He never does any (2) ___. Susan: I tried to give him some (3) ___ but he didn't take it. He only wants to have (4) ___. George: It takes a long (5) ___ to learn a language. George: He should also practise his speaking (6) ___. Susan: It's more difficult to make any (7) ___ if you don't speak. George: He also has a big (8) ___ because your dad is an English teacher!",
        correctAnswers: ["effort", "work", "advice", "fun", "time", "skills", "progress", "advantage"],
        placeholder: "1. effort, 2. work, 3. advice..."
      }
    ]
  },
  {
    pageNumber: 114,
    imagePath: "",
    title: "Unit 09 Practice: Collocations Make/Take + Linking Words",
    exercises: [
      {
        id: "p114-ex7",
        title: "Exercise 7: Underline the correct answer (make/take collocations)",
        type: "fill-blank",
        questionText: "1. It is a beautiful day. I (am going to take / am going to make) a walk. 2. Lucinda is upset. She thinks she (took / made / makes) many mistakes in the exam. 3. Robert is so funny. He really (makes / takes / is making) me laugh. 4. I always (make / am taking / take) lots of photos when I go sightseeing. 5. What really (makes / is making / made) a difference to your language skills is if you don't worry about making mistakes.",
        correctAnswers: ["am going to take", "made", "makes", "take", "makes"],
        placeholder: "1. am going to take, 2. made, 3. makes..."
      },
      {
        id: "p114-ex9",
        title: "Exercise 9: Rearrange the linking words and phrases in the correct place in the paragraph",
        type: "fill-blank",
        questionText: "Place these linking words correctly: 1. To sum up, 2. firstly, 3. However, 4. Furthermore, 5. Additionally — into the paragraph about a college language project with Peter and Miss Smith.",
        correctAnswers: ["Open grammar practice — place linking words (Firstly, However, Furthermore, Additionally, To sum up) in logical paragraph order."],
        placeholder: "1. ..., 2. ..., 3. ..., 4. ..., 5. ..."
      },
      {
        id: "p114-ex10",
        title: "Exercise 10: Complete the sentences with the correct form of the verbs in the box",
        type: "fill-blank",
        questionText: "Verbs: have(x2), discuss, hold, communicate, try. 1. My father and I ___ a chat about it tomorrow. 2. We ___ to decide what to have for dinner. 3. We ___ this last week. 4. I don't know anyone who ___ by letter anymore. 5. Our teacher always tells us to ___ more conversations with each other.",
        correctAnswers: ["are going to have", "are trying", "discussed", "communicates", "hold"],
        placeholder: "1. are going to have, 2. are trying..."
      }
    ]
  }
];
