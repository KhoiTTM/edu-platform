export interface Exercise {
  id: string;
  title: string;
  type: "matching" | "multiple-choice" | "fill-blank" | "table-matching" | "text-area" | "grammar-table";
  questionText: string;
  options?: string[];
  correctAnswers: string[]; // For checking answers
  placeholder?: string;
}

export interface TextbookPage {
  pageNumber: number; // Book page number
  imagePath: string; // Path to scan in public/
  title: string;
  exercises: Exercise[];
  audioUrl?: string; // Optional audio file path
}

export const unit3Pages: TextbookPage[] = [
  {
    pageNumber: 34,
    imagePath: "/book/mindset-foundation/unit_3/page_035.png",
    title: "Hobbies (Lead-in)",
    exercises: [
      {
        id: "p34-ex1",
        title: "Exercise 1: Match the different activities to the pictures",
        type: "fill-blank",
        questionText: "Write the activity for each number (1-6) shown in the pictures on Page 34:\nActivities: canoeing, cycling, sailing, climbing, white-water rafting, horse-riding",
        correctAnswers: ["climbing", "canoeing", "cycling", "sailing", "climbing", "white water rafting"],
        placeholder: "1. climbing, 2. canoeing..."
      }
    ]
  },
  {
    pageNumber: 35,
    imagePath: "/book/mindset-foundation/unit_3/page_036.png",
    title: "Listening: Multiple Choice",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a", // Listening audio
    exercises: [
      {
        id: "p35-ex4",
        title: "Exercise 4: Listen to two friends, Deon and Mark, talking about an adventure holiday. Which activities do you hear?",
        type: "fill-blank",
        questionText: "Enter the activities you hear, separated by commas (climbing, sailing, etc.):",
        correctAnswers: ["cycling, hiking, cooking, climbing, white water rafting, sailing"],
        placeholder: "e.g. cycling, hiking..."
      },
      {
        id: "p35-ex5-q1",
        title: "Exercise 5 - Q1: How did Deon first find out about World Trek holidays?",
        type: "multiple-choice",
        questionText: "Choose the correct answer:",
        options: [
          "A. He has been on one of their holidays.",
          "B. He found their website online.",
          "C. He heard about it from someone he knows."
        ],
        correctAnswers: ["C"]
      },
      {
        id: "p35-ex5-q2",
        title: "Exercise 5 - Q2: Deon would like to go on an adventure holiday...",
        type: "multiple-choice",
        questionText: "Choose the correct answer:",
        options: [
          "A. in a forest.",
          "B. in the mountains.",
          "C. near the sea."
        ],
        correctAnswers: ["B"]
      },
      {
        id: "p35-ex5-q3",
        title: "Exercise 5 - Q3: How much does the holiday they want to go on cost if they book it now?",
        type: "multiple-choice",
        questionText: "Choose the correct answer:",
        options: [
          "A. £500",
          "B. £650",
          "C. £800"
        ],
        correctAnswers: ["A"]
      },
      {
        id: "p35-ex5-q4",
        title: "Exercise 5 - Q4: The price of the holiday does NOT include...",
        type: "multiple-choice",
        questionText: "Choose the correct answer:",
        options: [
          "A. food.",
          "B. transport.",
          "C. guide."
        ],
        correctAnswers: ["A"]
      },
      {
        id: "p35-ex5-q5",
        title: "Exercise 5 - Q5: What time will the boys meet this evening?",
        type: "multiple-choice",
        questionText: "Choose the correct answer:",
        options: [
          "A. 7.00 pm",
          "B. 7.30 pm",
          "C. 8.00 pm"
        ],
        correctAnswers: ["C"]
      }
    ]
  },
  {
    pageNumber: 36,
    imagePath: "/book/mindset-foundation/unit_3/page_037.png",
    title: "Grammar: Present Simple vs Present Continuous",
    exercises: [
      {
        id: "p36-ex6",
        title: "Exercise 6: Complete the table using the verbs from the blog entry",
        type: "grammar-table",
        questionText: "Find the present tense verbs in purple in the Sunday Blog entry and write them down. Example verbs given: 'get up', 'not staying'. Check the answer key in the back of the book for confirmation.",
        correctAnswers: ["get up", "usually", "looks after", "makes", "don't miss", "doesn't like", "having", "staying", "resting", "having", "cooking", "not staying"]
      },
      {
        id: "p36-ex7",
        title: "Exercise 7: Complete the grammar rules with 'simple' or 'continuous'",
        type: "fill-blank",
        questionText: "1. We use the present [blank] with time words such as 'at the moment' and 'now'.\n2. We use the present [blank] with adverbs such as 'always', 'usually'.\n3. We use the present [blank] to talk about habits.\n4. We use the present [blank] to describe the action in photographs.",
        correctAnswers: ["continuous", "simple", "simple", "continuous"],
        placeholder: "1. continuous, 2. simple, 3. simple, 4. continuous"
      }
    ]
  },
  {
    pageNumber: 37,
    imagePath: "/book/mindset-foundation/unit_3/page_038.png",
    title: "Grammar Practice",
    exercises: [
      {
        id: "p37-ex8",
        title: "Exercise 8: Rewrite the verbs in third person (-s/-es/-ies) and the -ing form",
        type: "fill-blank",
        questionText: "Format: verb -> third_person, ing_form (e.g. live -> lives, living). Write for: 1. live, 2. get, 3. carry, 4. hope, 5. wash, 6. run, 7. play, 8. ride, 9. lie, 10. pass, 11. cry, 12. make, 13. see, 14. begin",
        correctAnswers: [
          "lives, living",
          "gets, getting",
          "carries, carrying",
          "hopes, hoping",
          "washes, washing",
          "runs, running",
          "plays, playing",
          "rides, riding",
          "lies, lying",
          "passes, passing",
          "cries, crying",
          "makes, making",
          "sees, seeing",
          "begins, beginning"
        ],
        placeholder: "lives, living"
      },
      {
        id: "p37-ex9",
        title: "Exercise 9: Match questions 1-4 with answers A-D. Then complete rules 5-6",
        type: "fill-blank",
        questionText: "Match questions: 1. Are you enjoying your holiday? (A/B/C/D) \n2. What are you doing at the moment? (A/B/C/D) \n3. Do you usually get up early? (A/B/C/D) \n4. When does your brother get up? (A/B/C/D) \nRules: 5. Present [blank] questions use 'do/does'. 6. Present [blank] questions use verb 'to be'.",
        correctAnswers: ["C", "D", "A", "B", "simple", "continuous"],
        placeholder: "1. C, 2. D, 3. A, 4. B, 5. simple, 6. continuous"
      },
      {
        id: "p37-ex10",
        title: "Exercise 10: Complete the sentences using the verbs in brackets in the correct form",
        type: "fill-blank",
        questionText: "1. What [1. do] at the moment? Do you [2. want] to go out? I [3. watch] a football match. My team usually [4. play] well but they [5. lose] badly today!\n2. I [6. wait] for you. The bus never [7. arrive] on time.\n3. Sam [8. not answer] calls. He [9. study] for French exam.\n4. How do you usually [10. get] to college? I [11. walk]. It [12. not take] long. Dad usually [13. drive] but he [14. work] today.",
        correctAnswers: [
          "are you doing",
          "want",
          "am watching",
          "plays",
          "are losing",
          "am waiting",
          "arrives",
          "isn't answering",
          "is studying",
          "get",
          "walk",
          "doesn't take",
          "drives",
          "is working"
        ],
        placeholder: "1. are you doing, 2. want..."
      },
      {
        id: "p37-ex11",
        title: "Exercise 11: Write questions using the words in correct form",
        type: "fill-blank",
        questionText: "1. why / learn / English?\n2. what / time / usually / get up?\n3. what / learn about / geography / at the moment?\n4. you / play / tennis?\n5. what / teacher / do / now?",
        correctAnswers: [
          "Why are you learning English?",
          "What time do you usually get up?",
          "What are you learning about in geography at the moment?",
          "Do you play tennis?",
          "What is the teacher doing now?"
        ],
        placeholder: "1. Why are you learning English?..."
      }
    ]
  },
  {
    pageNumber: 38,
    imagePath: "/book/mindset-foundation/unit_3/page_039.png",
    title: "Reading: Snowboarding Star",
    exercises: [
      {
        id: "p38-ex12",
        title: "Exercise 12: Skim read the article quickly. Discuss questions in pairs",
        type: "text-area",
        questionText: "1. Who do you think Aimee Fuller is?\n2. What sport has Aimee become successful in?\n3. What is the reason for this article?",
        correctAnswers: ["Snowboarder", "Snowboarding", "To introduce a snowboarding star"]
      }
    ]
  },
  {
    pageNumber: 39,
    imagePath: "/book/mindset-foundation/unit_3/page_040.png",
    title: "Reading Practice",
    exercises: [
      {
        id: "p39-ex13",
        title: "Exercise 13: Read the article again and choose True, False or Not Given",
        type: "fill-blank",
        questionText: "Write: True, False or Not Given:\n1. Aimee learnt to ski before she started snowboarding.\n2. It often snowed during winter in Aimee's hometown.\n3. It took Aimee a long time to find a coach after she moved to the USA.\n4. Aimee has won an Olympic medal.\n5. Aimee practises snowboarding in the mountains at least three times a week.\n6. Aimee thinks that snowboarding is more dangerous for her when she is not fit.\n7. In her free time, Aimee prefers being with people to spending time on her laptop.",
        correctAnswers: ["Not Given", "False", "False", "False", "Not Given", "True", "True"],
        placeholder: "1. Not Given, 2. False..."
      },
      {
        id: "p39-ex14",
        title: "Exercise 14: Complete the words from the article to match descriptions",
        type: "fill-blank",
        questionText: "1. paid to do sport: p_ _ _ _ _ _ _ _ _ _ _\n2. practise sport: t_ _ _ _\n3. doing well in life: s_ _ _ _ _ _ _ _ _\n4. don't get tired easily: f_ _\n5. tell someone what to do: a_ _ _ _ _",
        correctAnswers: ["professional", "train", "successful", "fit", "advice"],
        placeholder: "1. professional, 2. train..."
      }
    ]
  },
  {
    pageNumber: 40,
    imagePath: "/book/mindset-foundation/unit_3/page_041.png",
    title: "Speaking & Hobbies",
    exercises: [
      {
        id: "p40-ex15",
        title: "Exercise 15: Activities & Sports questions",
        type: "fill-blank",
        questionText: "List activities from page 40 pictures for:\n1. Catch a ball: [blank]\n2. Throw a ball: [blank]\n3. Kick a ball: [blank]\n4. Use a racket: [blank]",
        correctAnswers: ["basketball", "basketball", "football", "badminton"],
        placeholder: "1. basketball..."
      }
    ]
  },
  {
    pageNumber: 41,
    imagePath: "/book/mindset-foundation/unit_3/page_042.png",
    title: "Writing: Email notes",
    exercises: [
      {
        id: "p41-ex21",
        title: "Exercise 21: Read the information and email. Complete the notes.",
        type: "fill-blank",
        questionText: "Sunnyhill Park Film Festival Notes:\n1. Date we will go: [blank]\n2. Cost for me: £[blank]\n3. Time to meet Andrew: [blank]\n4. Film we will see: [blank]\n5. What to take: an [blank]",
        correctAnswers: ["23rd June", "15", "1:00pm", "Child in Time", "umbrella"],
        placeholder: "1. 23rd June, 2. 15..."
      }
    ]
  },
  {
    pageNumber: 42,
    imagePath: "/book/mindset-foundation/unit_3/page_043.png",
    title: "Writing a Message",
    exercises: [
      {
        id: "p42-ex23",
        title: "Exercise 23: Write a reply message to Richard (about 30-50 words)",
        type: "text-area",
        questionText: "Include: where you are, who you are with, what you are doing, what is happening, where you can meet, what Richard should bring.",
        correctAnswers: ["Hi Richard, I am in Sunnyhill Park at the moment at a film festival with Andrew. We are watching Child in Time now, it's fantastic! You can walk around. I'll meet you at the entrance. Bring some money and an umbrella. See you soon!"],
        placeholder: "Write your email reply here..."
      }
    ]
  },
  {
    pageNumber: 43,
    imagePath: "/book/mindset-foundation/unit_3/page_044.png",
    title: "Grammar & Vocabulary Check (Part 1)",
    exercises: [
      {
        id: "p43-chk-ex1",
        title: "Exercise 1: Match the activities in the box to the pictures",
        type: "fill-blank",
        questionText: "Match activities 1-10: badminton, skiing, football, sailing, swimming, volleyball, hiking, tennis, basketball, cycling",
        correctAnswers: ["tennis", "volleyball", "basketball", "football", "badminton", "swimming", "skiing", "cycling", "hiking", "sailing"],
        placeholder: "1. tennis, 2. volleyball..."
      }
    ]
  },
  {
    pageNumber: 44,
    imagePath: "/book/mindset-foundation/unit_3/page_045.png",
    title: "Grammar & Vocabulary Check (Part 2)",
    exercises: [
      {
        id: "p44-chk-ex2",
        title: "Exercise 2: Complete the table (Play / Do / Go)",
        type: "fill-blank",
        questionText: "For the verbs 'play', 'do', 'go', write the sports from the box under each verb category:\n- play: [blank]\n- do: [blank]\n- go: [blank]",
        correctAnswers: [
          "tennis, chess, volleyball, football, badminton, hockey, table tennis, basketball",
          "karate, judo, boxing, gymnastics, taekwondo, athletics",
          "horse riding, swimming, skiing, cycling, sailing, hiking, canoeing, fishing, bowling"
        ],
        placeholder: "play: tennis, chess..."
      },
      {
        id: "p44-chk-ex3",
        title: "Exercise 3: Complete sentences with verbs in correct form",
        type: "fill-blank",
        questionText: "Choose: score, win, kick, play, hit, throw, catch, lose, beat\n1. I hope to [1. win] matches.\n2. Every team they play [2. beats] us.\n3. I want to learn to [3. play] baseball.\n4. Difficult to [4. hit] the ball with the racket.\n5. When you [5. lose] a match, learn from mistakes.\n6. Pass the ball by [6. throwing] it.\n7. Move the ball by [7. kicking] it.\n8. Glove to help them [8. catch] the ball.\n9. Team that [9. scores] the most goals is winner.",
        correctAnswers: ["win", "beats", "play", "hit", "lose", "throwing", "kicking", "catch", "scores"],
        placeholder: "1. win, 2. beats..."
      },
      {
        id: "p44-chk-ex4",
        title: "Exercise 4: Underline the correct answer about cricket",
        type: "fill-blank",
        questionText: "1. Cricket is a [popular] / good / favourite sport.\n2. There are 11 people in a cricket [team] / group / set.\n3. You play by [hitting] a ball with a bat.\n4. It can take five days to complete a [match].\n5. People often [wear] white clothes.",
        correctAnswers: ["popular", "team", "hitting", "match", "wear"],
        placeholder: "1. popular, 2. team..."
      }
    ]
  },
  {
    pageNumber: 45,
    imagePath: "/book/mindset-foundation/unit_3/page_046.png",
    title: "Grammar & Vocabulary Check (Part 3)",
    exercises: [
      {
        id: "p45-chk-ex5",
        title: "Exercise 5: Find the odd word out and write the reason",
        type: "fill-blank",
        questionText: "1. sailing, swimming, tennis, canoeing, windsurfing -> Odd: tennis. Reason: The others are [blank]\n2. football, rugby, cricket, athletics, baseball -> Odd: athletics. Reason: The others are [blank]\n3. catch, hit, kick, lose, run -> Odd: lose. Reason: The others are [blank]\n4. match, game, tournament, race, judo -> Odd: judo. Reason: The others are [blank]\n5. snowboarding, boxing, skiing, climbing, hiking -> Odd: boxing. Reason: The others are [blank]\n6. ball, winner, bat, racket, stick -> Odd: winner. Reason: The others are [blank]",
        correctAnswers: ["water sports", "team sports", "actions used in sports", "types of competition", "mountain sports", "sports equipment"],
        placeholder: "1. water sports, 2. team sports..."
      },
      {
        id: "p45-chk-ex6",
        title: "Exercise 6: Verb forms (Third person & -ing)",
        type: "fill-blank",
        questionText: "Format: present_simple / -ing (e.g. snow -> snows / snowing). Write for:\n1. snow, 2. fix, 3. get, 4. stop, 5. invite, 6. marry, 7. wash, 8. make, 9. offer, 10. buy, 11. cross, 12. copy, 13. dance, 14. swim, 15. happen, 16. travel",
        correctAnswers: [
          "snows / snowing",
          "fixes / fixing",
          "gets / getting",
          "stops / stopping",
          "invites / inviting",
          "marries / marrying",
          "washes / washing",
          "makes / making",
          "offers / offering",
          "buys / buying",
          "crosses / crossing",
          "copies / copying",
          "dances / dancing",
          "swims / swimming",
          "happens / happening",
          "travels / travelling"
        ],
        placeholder: "1. snows / snowing"
      },
      {
        id: "p45-chk-ex7",
        title: "Exercise 7: Match the sentence halves",
        type: "fill-blank",
        questionText: "Match: 1. My mum is working... (A-G) \n2. I often go to the cinema... \n3. I can't speak to you right now... \n4. What does your brother... \n5. In this photo, I'm climbing... \n6. What do you usually do... \n7. Why isn't Sam...",
        correctAnswers: ["B", "F", "D", "A", "G", "C", "E"],
        placeholder: "1. B, 2. F..."
      }
    ]
  },
  {
    pageNumber: 46,
    imagePath: "/book/mindset-foundation/unit_3/page_047.png",
    title: "Grammar & Vocabulary Check (Part 4)",
    exercises: [
      {
        id: "p46-chk-ex8",
        title: "Exercise 8: Choose the correct present tense forms",
        type: "fill-blank",
        questionText: "Write the correct option:\n1. I [don't know] how to play tennis.\n2. I [can't remember] your name.\n3. I [don't understand] this question.\n4. John [is having] a great time.\n5. It [belongs] to my sister and she [is reading] it.\n6. I [don't want to] go out tonight.\n7. My brother [has] so many hobbies! At the moment he [is taking] photos.\n8. Sue [can't hear] you. She [is having] a shower.",
        correctAnswers: ["don't know", "can't remember", "don't understand", "is having", "belongs", "is reading", "don't want to", "has", "is taking", "can't hear", "is having"],
        placeholder: "1. don't know, 2. can't remember..."
      },
      {
        id: "p46-chk-ex9",
        title: "Exercise 9: Complete Katy's email using correct form of verbs",
        type: "fill-blank",
        questionText: "Hi William, I [1. have] a great time here. The city is really big and I [2. have] so many places to visit. I [3. enjoy] my course so far and I really [4. like] my classmates. I [5. stay] in halls of residence. I [6. have/got] a job in restaurant. I [7. work] three evenings a week. At the moment I [8. look] for another job. I [9. want] one that [10. finish] earlier.",
        correctAnswers: ["am having", "have", "am enjoying", "like", "am staying", "have got", "work", "am looking", "want", "finishes"],
        placeholder: "1. am having, 2. have..."
      },
      {
        id: "p46-chk-ex10",
        title: "Exercise 10: Match the questions and short answers",
        type: "fill-blank",
        questionText: "Match questions 1-8 to answers A-H:\n1. Is that your brother playing tennis? (A-H)\n2. Do you always get up so early?\n3. Are your parents staying in a hotel?\n4. Are you making chocolate cake?\n5. Is your brother having a good time in Iceland?\n6. Do you and your parents always eat together?\n7. Am I wearing your necklace?\n8. Do any of your school friends do taekwondo?",
        correctAnswers: ["D", "B", "F", "A", "H", "E", "C", "G"],
        placeholder: "1. D, 2. B..."
      }
    ]
  }
];
