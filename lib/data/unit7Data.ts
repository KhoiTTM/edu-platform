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
  youtubeId?: string; // Real YouTube video ID, takes priority over audioUrl when present
}

export const unit7Pages: TextbookPage[] = [
  {
    pageNumber: 82,
    imagePath: "",
    title: "Vocabulary and Listening: Skills and Abilities",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
    youtubeId: "jsjIWseiTfM",
    exercises: [
      {
        id: "p82-ex2",
        title: "Exercise 2: Read and match the skills and abilities A-J with the pictures 1-10",
        type: "matching",
        questionText: "Match: A. write well, B. talk to new people easily, C. read a map, D. play sport well, E. cook many types of food, F. work for long hours, G. understand maths easily, H. speak many languages, I. remember a lot of information, J. do well in exams — with pictures 1-10.",
        correctAnswers: ["A → write well", "B → talk to new people easily", "C → read a map", "D → play sport well", "E → cook many types of food", "F → work long hours", "G → understand maths easily", "H → speak many languages", "I → remember a lot of information", "J → do well in exams"],
        placeholder: "1. A, 2. B, 3. C..."
      },
      {
        id: "p82-ex5",
        title: "Exercise 5: Listen to the radio advertisement about 'Before They Were Famous' and complete the notes",
        type: "fill-blank",
        questionText: "TV Programme details — Channel: ___. Jack's life before he was famous — left school at the age of ___, failed exams in both ___ and ___, got a job in a(n) ___ restaurant near his home, trained to be a chef in ___. Jack's life now — has presented a radio show called ___ since 2006, wrote his first bestselling cookbook in ___, worked as head chef at The Lemon Grove between ___ and ___, married with ___ children.",
        correctAnswers: ["Channel: 3", "age of 15", "maths and science", "Italian restaurant", "Australian", "Day", "2009", "2012", "2015", "4 children"],
        placeholder: "Channel: ..., left school at the age of..."
      }
    ]
  },
  {
    pageNumber: 83,
    imagePath: "",
    title: "Grammar and Speaking: Can, Can't, Could, Couldn't",
    exercises: [
      {
        id: "p83-ex7",
        title: "Exercise 7: Complete the table with TV chef Jack's abilities",
        type: "grammar-table",
        questionText: "Sort into 'Present (can/can't)' and 'Past (could/couldn't)': understand maths easily, write well, write books, do well in exams, cook only one type of food, cook many types of food, work long hours.",
        correctAnswers: [
          "Present - Able to (can): write books, cook many types of food, work long hours",
          "Present - Not able to (can't): cook only one type of food",
          "Past - Able to (could): do well in exams",
          "Past - Not able to (couldn't): understand maths easily, write well"
        ],
        placeholder: "can: ..., could: ..."
      },
      {
        id: "p83-ex8",
        title: "Exercise 8: Read the Grammar box, then complete the dialogue using can / can't / could / couldn't",
        type: "fill-blank",
        questionText: "B: Well, I (1) ___ have a good memory... A: How about sport? B: No, I'm (2) ___ really play sport that well. When I was younger, I (3) ___ play badminton a little, but I found it boring. A: What skills do you want to learn? B: When I was a child, I (4) ___ talk to new people at all... In the past, I (5) ___ cook anything well without burning it, but now I (6) ___ cook many different types of food.",
        correctAnswers: ["can", "not", "could", "couldn't", "couldn't", "can"],
        placeholder: "1. can, 2. not, 3. could..."
      }
    ]
  },
  {
    pageNumber: 84,
    imagePath: "",
    title: "Speaking: Describing Skills and Abilities + Vocabulary: Work Experience",
    exercises: [
      {
        id: "p84-ex9",
        title: "Exercise 9: Skills and abilities questionnaire — write three more questions",
        type: "text-area",
        questionText: "Given questions: 1. What are your best skills and abilities? 2. What skills do you want to learn? 3. What skills and abilities did you have when you were younger? 4. What skills and abilities did you NOT have when you were younger? Write three more questions about skills and abilities, using can/can't/could/couldn't.",
        correctAnswers: ["Open speaking/writing practice — write three original questions about skills and abilities using can/can't/could/couldn't."],
        placeholder: "5. ..., 6. ..., 7. ..."
      },
      {
        id: "p84-ex12",
        title: "Exercise 12: Match the summer jobs in the box to photos 1-5",
        type: "matching",
        questionText: "Match: lifeguard, sales assistant, sports coach, video game designer, helping elderly people — to photos 1-5.",
        correctAnswers: ["1 → lifeguard", "2 → sales assistant", "3 → sports coach", "4 → video game designer", "5 → helping elderly people"],
        placeholder: "1. lifeguard, 2. sales assistant..."
      }
    ]
  },
  {
    pageNumber: 85,
    imagePath: "",
    title: "Reading 1: True, False, Not Given — Summer Jobs",
    exercises: [
      {
        id: "p87-ex16",
        title: "Exercise 16: Read the 'Getting a Summer Job' article and choose True, False or Not Given",
        type: "multiple-choice",
        questionText: "1. Young people should give employers information about what they can do. 2. Sports coaches at a summer camp don't get paid very much money. 3. You need to have a car to get a job working with older people. 4. People who work in designer clothes stores can help customers decide what to buy. 5. Sales assistants in designer fashion stores shouldn't talk to other staff members at work. 6. You only need to get a certificate to get a job as a lifeguard. 7. In the summertime, lifeguards often need to work in the evenings or at the weekend. 8. Many IT companies offer jobs to young people in the summer.",
        options: ["A. True", "B. False", "C. Not Given"],
        correctAnswers: ["1. True", "2. Not Given", "3. False", "4. True", "5. False", "6. False", "7. True", "8. False"]
      }
    ]
  },
  {
    pageNumber: 88,
    imagePath: "",
    title: "Writing: An Email for a Summer Job",
    exercises: [
      {
        id: "p88-ex18",
        title: "Exercise 18: Read Laura's email to Simon Stone. What job does she want to do?",
        type: "multiple-choice",
        questionText: "Laura's email mentions she is interested in a job, could talk to new people easily, could speak three languages (English, Spanish, Arabic), can't work long hours but wants to learn this, and worked in a restaurant when younger. What job does she want?",
        options: ["A. Sports coach", "B. Hotel receptionist", "C. Lifeguard"],
        correctAnswers: ["B. Hotel receptionist"]
      },
      {
        id: "p88-ex19",
        title: "Exercise 19: Tick the features Laura uses in her email",
        type: "table-matching",
        questionText: "Check whether Laura's email: says which job she is interested in / says what skills she has / says what skills she didn't have in the past but does now / uses a good structure (greeting + name) / uses correct grammar / only talks about the instructions / uses the correct number of words (60-80).",
        correctAnswers: ["All features are present in Laura's email — yes to every row."],
        placeholder: "Tick ✓ or ✗ for each feature..."
      },
      {
        id: "p89-ex21",
        title: "Exercise 21: Write your own email to Simon Stone applying for a summer job",
        type: "text-area",
        questionText: "Choose any of the summer jobs from the article (sports coach, helping elderly people, sales assistant, lifeguard, digital designer). Write an email (60-80 words) that: says which job you are interested in, says what skills and abilities you have, says what skills you didn't have in the past but have now. Use a greeting and polite ending.",
        correctAnswers: ["Open writing practice — 60-80 word email following the task instructions, using can/can't/could/couldn't correctly."],
        placeholder: "Dear Simon, I'm interested in the ... job..."
      }
    ]
  },
  {
    pageNumber: 90,
    imagePath: "",
    title: "Unit 07 Grammar and Vocabulary Practice",
    exercises: [
      {
        id: "p90-ex1",
        title: "Exercise 1: Match the two halves of the sentences",
        type: "matching",
        questionText: "1. John works many hours, but he doesn't mind because he... 2. Julia learnt Spanish very quickly this year. I think it is because she... 3. My results have improved a lot. I got top marks for my essay, but just a year ago, I... 4. Jim's results are really impressive and he didn't even study that much. He... 5. In the job interview, it's important that you don't forget anything... 6. Matteo will become a chef one day, I think. He... 7. Sandra is very popular and has so many friends. It's difficult to believe that she... 8. I know it is simple but I need to use my calculator because I... 9. Joseph is really good at football, tennis and basketball... 10. Lucy is late. I think she is lost. She...",
        options: ["A. can cook many types of food", "B. could already speak two other languages", "C. can't understand maths very easily", "D. couldn't even talk to new people easily a few months ago", "E. Can you remember a lot of information?", "F. can finish early on Fridays", "G. couldn't even write very well", "H. Could he play sport well when he was a child, too?", "I. can just do very well in exams", "J. can't read maps very well"],
        correctAnswers: ["1-F", "2-B", "3-G", "4-I", "5-E", "6-A", "7-D", "8-C", "9-H", "10-J"]
      },
      {
        id: "p90-ex2",
        title: "Exercise 2: Complete the sentences with the correct form of the verbs in the box",
        type: "fill-blank",
        questionText: "Verbs: get, learn (x2), teach, pass, start (x2), fail, take (x2), finish, study. 1. I ___ my driving test last month. Now I drive to school every day. 2. My older sister is ___ law. When she ___ university, she wants to be a family lawyer. 3. I think it is difficult for young people to ___ a job without experience. 4. My father ___ me how to cook when I was a child. 5. I didn't ___ to play a musical instrument when I was younger. I would like to ___ piano lessons, but they are very expensive. 6. Many students ___ the exam. They will ___ it again next month. 7. I ___ my computer course last week. I want to ___ how to design my own website. 8. My friend is ___ her new job tomorrow.",
        correctAnswers: ["passed", "studying", "starts", "get", "taught", "learn", "take", "fail", "take", "finished", "learn", "starting"],
        placeholder: "1. passed, 2. studying, starts..."
      }
    ]
  },
  {
    pageNumber: 91,
    imagePath: "",
    title: "Unit 07 Vocabulary Practice: Jobs and Advertisements",
    exercises: [
      {
        id: "p91-ex3",
        title: "Exercise 3: Match the jobs in the box with the pictures",
        type: "matching",
        questionText: "Match: waiter, chef, lifeguard, assistant, receptionist, teacher, cleaner, doctor — to pictures 1-8.",
        correctAnswers: ["1 → waiter", "2 → chef", "3 → lifeguard", "4 → assistant", "5 → receptionist", "6 → teacher", "7 → cleaner", "8 → doctor"],
        placeholder: "1. waiter, 2. chef..."
      },
      {
        id: "p91-ex4",
        title: "Exercise 4: Complete the missing information in the jobs advertisement",
        type: "fill-blank",
        questionText: "Words: experience, friendly and helpful, sports/art/music, energy, long hours, speak another language, hard-working, weekend. Receptionist for city hotel, who can (1) ___. Waiter/Waitress needed for popular Italian restaurant. You should be (5) ___ to guests... You do not need to have (2) ___ of working in a restaurant, but you should be (3) ___... Summer Camp Leaders to teach children (6) ___ at a summer camp. You should have a lot of (7) ___... You will need to work weekdays and at the (8) ___, but you will have one day off each week.",
        correctAnswers: ["speak another language", "experience", "hard-working", "friendly and helpful", "sports, art or music", "energy", "weekend", "long hours"],
        placeholder: "1. speak another language, 2. experience..."
      }
    ]
  },
  {
    pageNumber: 92,
    imagePath: "",
    title: "Unit 07 Grammar Practice: Prepositions and Can/Could Review",
    exercises: [
      {
        id: "p92-ex5",
        title: "Exercise 5: Complete the sentences with the prepositions in / on / at",
        type: "fill-blank",
        questionText: "1. My brother is working as a lifeguard ___ the swimming pool. 2. My cousin studies nursing ___ university. 3. I wouldn't like to work ___ a restaurant. 4. I'm not working ___ Monday. 5. My friend wants to be a chef ___ a top restaurant. 6. I was ___ work yesterday. 7. I usually finish work ___ five o'clock.",
        correctAnswers: ["at", "at", "in", "on", "at", "at", "at"],
        placeholder: "1. at, 2. at, 3. in..."
      },
      {
        id: "p92-ex7",
        title: "Exercise 7: Underline the correct option in the conversation",
        type: "fill-blank",
        questionText: "A: 1. (You can / You can't / Can you) play sport? B: 2. (I can / I can't / can I) play basketball. Are you good at sport? A: Not really, 3. (I can / I can't / can I) play many sports, but I like watching them on TV. B: How many languages 4. (you can / you can't / can you) speak? A: Four. 5. (I can / I can't / can I) speak English, Russian, Chinese and Thai.",
        correctAnswers: ["Can you", "I can", "I can't", "can you", "I can"],
        placeholder: "1. Can you, 2. I can..."
      },
      {
        id: "p92-ex8",
        title: "Exercise 8: Complete the sentences using can / can't / could / couldn't",
        type: "fill-blank",
        questionText: "1. I'm doing well at school. I got top marks for my English essay. I think it's because I ___ write really well. 2. I got a bad mark in my exams. My problem is that I ___ remember facts. 3. I was so nervous last year in my science exam that I ___ remember a thing. 4. I did really badly in my history exam last summer. I didn't do enough homework so I ___ understand the subject very well.",
        correctAnswers: ["can", "can't", "couldn't", "couldn't"],
        placeholder: "1. can, 2. can't, 3. couldn't..."
      },
      {
        id: "p92-ex9",
        title: "Exercise 9: Read Pablo's email and decide if can/can't/could/couldn't is correct or incorrect",
        type: "table-matching",
        questionText: "Dear Simon, I'm interested in the lifeguard job this summer. 1. I could swim very well. 2. I couldn't swim when I was a child but I learnt when I was 12. 3. I can also remember lots of information and instructions very well. I have some questions about the lifeguards you had last year. 4. They could talk to new people easily? 5. I can so I think I am a good choice for this job. Mark each numbered sentence as correct (✓) or incorrect (✗) and correct the mistakes.",
        correctAnswers: ["1. ✗ (should be 'I can swim very well' — present ability)", "2. ✓ correct", "3. ✓ correct", "4. ✗ (should be 'Could they talk to new people easily?' — question word order)", "5. ✗ (should be 'I think I am' — remove 'so')"],
        placeholder: "1. ✓/✗, 2. ✓/✗..."
      }
    ]
  }
];
