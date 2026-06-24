export interface SBTQuestion {
  id: string;
  questionText: string;
  type: "fill-blank" | "multiple-choice" | "matching";
  options?: string[];
  correctAnswers: string[];
  hint?: string;
}

export interface SBTExercise {
  id: string;
  title: string;
  instruction: string;
  questions: SBTQuestion[];
  pageNumber: number;
}

export interface SBTSection {
  key: "pronunciation" | "vocabulary-grammar" | "speaking" | "reading" | "writing";
  title: string;
  icon: string;
  exercises: SBTExercise[];
}

export const sbtUnit1Data: SBTSection[] = [
  {
    key: "pronunciation",
    title: "A. Pronunciation",
    icon: "🗣️",
    exercises: [
      {
        id: "u1-p-ex1",
        title: "Exercise 1",
        instruction: "Write a word under each picture (shirt, island, palace, Earth, compass, circle, desert, worker) and select its sound column /ə/ or /ɜ:/",
        pageNumber: 3,
        questions: [
          {
            id: "u1-p-ex1-1",
            questionText: "Picture 1: shirt. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/ (unaccented)", "B. /ɜ:/ (accented/long er)"],
            correctAnswers: ["B"],
            hint: "shirt /ʃɜːt/ has the /ɜː/ sound."
          },
          {
            id: "u1-p-ex1-2",
            questionText: "Picture 2: island. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["A"],
            hint: "island /ˈaɪlənd/ has the /ə/ sound."
          },
          {
            id: "u1-p-ex1-3",
            questionText: "Picture 3: palace. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["A"],
            hint: "palace /ˈpæləs/ has the /ə/ sound."
          },
          {
            id: "u1-p-ex1-4",
            questionText: "Picture 4: Earth. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["B"],
            hint: "Earth /ɜːθ/ has the /ɜː/ sound."
          },
          {
            id: "u1-p-ex1-5",
            questionText: "Picture 5: compass. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["A"],
            hint: "compass /ˈkʌmpəs/ ends with the /ə/ sound."
          },
          {
            id: "u1-p-ex1-6",
            questionText: "Picture 6: circle. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["B"],
            hint: "circle /ˈsɜːkl/ starts with the /ɜː/ sound."
          },
          {
            id: "u1-p-ex1-7",
            questionText: "Picture 7: desert. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["A"],
            hint: "desert /ˈdezət/ ends with the /ə/ sound."
          },
          {
            id: "u1-p-ex1-8",
            questionText: "Picture 8: worker. Sound type?",
            type: "multiple-choice",
            options: ["A. /ə/", "B. /ɜ:/"],
            correctAnswers: ["B"],
            hint: "worker /ˈwɜːkə(r)/ contains both, but /ɜː/ is the primary stressed vowel sound."
          }
        ]
      },
      {
        id: "u1-p-ex2",
        title: "Exercise 2",
        instruction: "Choose the word in which the underlined part is pronounced differently.",
        pageNumber: 3,
        questions: [
          {
            id: "u1-p-ex2-1",
            questionText: "1. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. away", "B. around", "C. classmate"],
            correctAnswers: ["C"],
            hint: "Classmate has long /eɪ/, others have schwa /ə/."
          },
          {
            id: "u1-p-ex2-2",
            questionText: "2. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. umbrella", "B. focus", "C. under"],
            correctAnswers: ["B"],
            hint: "Focus has /əʊ/ sound, others have /ʌ/."
          },
          {
            id: "u1-p-ex2-3",
            questionText: "3. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. clever", "B. term", "C. germ"],
            correctAnswers: ["A"],
            hint: "Clever has short schwa /ə/, others have long /ɜː/."
          },
          {
            id: "u1-p-ex2-4",
            questionText: "4. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. pronounce", "B. doctor", "C. collection"],
            correctAnswers: ["B"],
            hint: "Doctor has /ɒ/, others are schwa /ə/."
          },
          {
            id: "u1-p-ex2-5",
            questionText: "5. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. surprise", "B. Thursday", "C. hurt"],
            correctAnswers: ["A"],
            hint: "Surprise starts with schwa /ə/, others have /ɜː/."
          }
        ]
      }
    ]
  },
  {
    key: "vocabulary-grammar",
    title: "B. Vocabulary & Grammar",
    icon: "📝",
    exercises: [
      {
        id: "u1-vg-ex-puzzle",
        title: "Exercise 1 (Page 4)",
        instruction: "Look at the pictures and find the words in the puzzle (horizontal, vertical or diagonal).",
        pageNumber: 4,
        questions: [
          {
            id: "u1-vg-puz-1",
            questionText: "1. Picture 1: doing ____",
            type: "fill-blank",
            correctAnswers: ["yoga"],
            hint: "yoga"
          },
          {
            id: "u1-vg-puz-2",
            questionText: "2. Picture 2: watering ____",
            type: "fill-blank",
            correctAnswers: ["flowers"],
            hint: "flowers"
          },
          {
            id: "u1-vg-puz-3",
            questionText: "3. Picture 3: go ____",
            type: "fill-blank",
            correctAnswers: ["swimming"],
            hint: "swimming"
          },
          {
            id: "u1-vg-puz-4",
            questionText: "4. Picture 4: playing with a ____",
            type: "fill-blank",
            correctAnswers: ["doll"],
            hint: "doll"
          },
          {
            id: "u1-vg-puz-5",
            questionText: "5. Picture 5: go ____",
            type: "fill-blank",
            correctAnswers: ["camping"],
            hint: "camping"
          },
          {
            id: "u1-vg-puz-6",
            questionText: "6. Picture 6: making ____",
            type: "fill-blank",
            correctAnswers: ["models"],
            hint: "models"
          },
          {
            id: "u1-vg-puz-7",
            questionText: "7. Picture 7: playing ____",
            type: "fill-blank",
            correctAnswers: ["football"],
            hint: "football"
          },
          {
            id: "u1-vg-puz-8",
            questionText: "8. Picture 8: playing computer ____",
            type: "fill-blank",
            correctAnswers: ["games"],
            hint: "games"
          }
        ]
      },
      {
        id: "u1-vg-ex-table",
        title: "Exercise 2 (Page 4)",
        instruction: "Complete the table of verbs. Group the words below (yoga, flowers, swimming, doll, camping, models, football, games) with the correct verb.",
        pageNumber: 4,
        questions: [
          {
            id: "u1-vg-tab-1",
            questionText: "GO + verb-ing: cycling, ____, ____",
            type: "fill-blank",
            correctAnswers: ["swimming, camping", "camping, swimming", "swimming & camping", "swimming,camping"],
            hint: "swimming, camping"
          },
          {
            id: "u1-vg-tab-2",
            questionText: "PLAY + sports/games: ____, ____",
            type: "fill-blank",
            correctAnswers: ["football, games", "games, football", "football & games", "football,games"],
            hint: "football, games"
          },
          {
            id: "u1-vg-tab-3",
            questionText: "DO + individual activities: ____",
            type: "fill-blank",
            correctAnswers: ["yoga"],
            hint: "yoga"
          },
          {
            id: "u1-vg-tab-4",
            questionText: "COLLECT + nouns: ____",
            type: "fill-blank",
            correctAnswers: ["dolls", "doll"],
            hint: "dolls"
          },
          {
            id: "u1-vg-tab-5",
            questionText: "MAKE + objects: ____, ____",
            type: "fill-blank",
            correctAnswers: ["models, flowers", "flowers, models", "models & flowers", "models,flowers"],
            hint: "models, flowers"
          }
        ]
      },
      {
        id: "u1-vg-ex-sentences",
        title: "Exercise 3 (Page 4)",
        instruction: "Look at the pictures and complete the sentences.",
        pageNumber: 4,
        questions: [
          {
            id: "u1-vg-ex3-1",
            questionText: "1. She enjoys ____.",
            type: "fill-blank",
            correctAnswers: ["cooking"],
            hint: "cooking"
          },
          {
            id: "u1-vg-ex3-2",
            questionText: "2. They like ____.",
            type: "fill-blank",
            correctAnswers: ["doing exercise", "doing exercises", "exercising"],
            hint: "doing exercise"
          },
          {
            id: "u1-vg-ex3-3",
            questionText: "3. My sister loves ____.",
            type: "fill-blank",
            correctAnswers: ["building dollhouses", "building doll houses", "making dollhouses"],
            hint: "building dollhouses"
          },
          {
            id: "u1-vg-ex3-4",
            questionText: "4. My brother hates ____.",
            type: "fill-blank",
            correctAnswers: ["collecting stamps", "collecting stamp"],
            hint: "collecting stamps"
          },
          {
            id: "u1-vg-ex3-5",
            questionText: "5. My uncle doesn't like ____.",
            type: "fill-blank",
            correctAnswers: ["singing"],
            hint: "singing"
          }
        ]
      },
      {
        id: "u1-vg-ex1",
        title: "Exercise 4 (Page 5)",
        instruction: "Choose the correct answer A, B, or C to complete each sentence.",
        pageNumber: 5,
        questions: [
          {
            id: "u1-vg-ex1-1",
            questionText: "1. When water ____, it ____ from a liquid to a gas.",
            type: "multiple-choice",
            options: ["A. boil; changes", "B. boils; change", "C. boils; changes"],
            correctAnswers: ["C"],
            hint: "Boils and changes (Present simple for general truth)."
          },
          {
            id: "u1-vg-ex1-2",
            questionText: "2. My father ____ his hobby with me. He teaches me how to grow flowers on Sundays.",
            type: "multiple-choice",
            options: ["A. share", "B. shares", "C. sharing"],
            correctAnswers: ["B"],
            hint: "Shares (Present simple for singular subject)."
          },
          {
            id: "u1-vg-ex1-3",
            questionText: "3. ____ your mother ____ doing yoga?",
            type: "multiple-choice",
            options: ["A. Do; enjoy", "B. Does; enjoys", "C. Does; enjoy"],
            correctAnswers: ["C"],
            hint: "Does ... enjoy (Present simple question form)."
          },
          {
            id: "u1-vg-ex1-4",
            questionText: "4. My cooking lesson ____ at 9 a.m. every Saturday.",
            type: "multiple-choice",
            options: ["A. starts", "B. start", "C. is starting"],
            correctAnswers: ["A"],
            hint: "Starts (Present simple for scheduled times)."
          },
          {
            id: "u1-vg-ex1-5",
            questionText: "5. My parents ____ jogging every day. They only do it three times a week.",
            type: "multiple-choice",
            options: ["A. go", "B. don't go", "C. doesn't go"],
            correctAnswers: ["B"],
            hint: "Don't go (Negative form with plural subject)."
          }
        ]
      },
      {
        id: "u1-vg-ex2",
        title: "Exercise 5 (Page 5)",
        instruction: "Fill in each blank with the correct form of the verb in brackets. Use the present simple or present continuous.",
        pageNumber: 5,
        questions: [
          {
            id: "u1-vg-ex2-1",
            questionText: "My cousin, Mi, (1. love) ____ cooking.",
            type: "fill-blank",
            correctAnswers: ["loves"],
            hint: "loves (Present simple for states/likes)."
          },
          {
            id: "u1-vg-ex2-2",
            questionText: "She (2. not go) ____ to any cooking class.",
            type: "fill-blank",
            correctAnswers: ["doesn't go", "does not go"],
            hint: "doesn't go"
          },
          {
            id: "u1-vg-ex2-3",
            questionText: "She (3. learn) ____ to cook from her mum.",
            type: "fill-blank",
            correctAnswers: ["learns"],
            hint: "learns"
          },
          {
            id: "u1-vg-ex2-4",
            questionText: "and sometimes she (4. get) ____ recipes from the Internet.",
            type: "fill-blank",
            correctAnswers: ["gets"],
            hint: "gets"
          },
          {
            id: "u1-vg-ex2-5",
            questionText: "She (5. share) ____ this hobby with her sister.",
            type: "fill-blank",
            correctAnswers: ["shares"],
            hint: "shares"
          },
          {
            id: "u1-vg-ex2-6",
            questionText: "I (6. enjoy) ____ cooking too, so Mi and I usually (7. make) ____ pizza together.",
            type: "fill-blank",
            correctAnswers: ["enjoy, make", "enjoy; make"],
            hint: "First: enjoy, Second: make"
          },
          {
            id: "u1-vg-ex2-7",
            questionText: "when we (8. meet) ____ at the weekend.",
            type: "fill-blank",
            correctAnswers: ["meet"],
            hint: "meet"
          }
        ]
      }
    ]
  },
  {
    key: "speaking",
    title: "C. Speaking",
    icon: "💬",
    exercises: [
      {
        id: "u1-s-ex1",
        title: "Exercise 1",
        instruction: "Choose the best answer to each question below.",
        pageNumber: 5,
        questions: [
          {
            id: "u1-s-ex1-1",
            questionText: "1. Do you enjoy collecting teddy bears?",
            type: "multiple-choice",
            options: ["A. I do it every day.", "B. Yes, very much.", "C. No, I don't think it's easy."],
            correctAnswers: ["B"],
            hint: "B. Yes, very much."
          },
          {
            id: "u1-s-ex1-2",
            questionText: "2. What do you like doing in your free time?",
            type: "multiple-choice",
            options: ["A. I usually have lunch at 12.", "B. I like building dollhouses.", "C. Yes, I do."],
            correctAnswers: ["B"],
            hint: "B. I like building dollhouses."
          },
          {
            id: "u1-s-ex1-3",
            questionText: "3. Do you like making models?",
            type: "multiple-choice",
            options: ["A. No, I don't. But my brother loves it.", "B. I make paper flowers every day.", "C. Yes, I made one yesterday."],
            correctAnswers: ["A"],
            hint: "A. No, I don't. But my brother loves it."
          },
          {
            id: "u1-s-ex1-4",
            questionText: "4. What does your brother like doing?",
            type: "multiple-choice",
            options: ["A. He enjoys doing yoga a lot.", "B. He goes to school at 7 a.m.", "C. Yes, he likes doing it."],
            correctAnswers: ["A"],
            hint: "A. He enjoys doing yoga a lot."
          },
          {
            id: "u1-s-ex1-5",
            questionText: "5. Does your sister cook with you?",
            type: "multiple-choice",
            options: ["A. Yes, she loves singing.", "B. Yes, she and I cook together in the evening.", "C. No, she can cook well."],
            correctAnswers: ["B"],
            hint: "B. Yes, she and I cook together in the evening."
          }
        ]
      },
      {
        id: "u1-s-ex2",
        title: "Exercise 2",
        instruction: "Mi and Elena meet for the first time. Choose answers (a-e) to complete their conversation.",
        pageNumber: 6,
        questions: [
          {
            id: "u1-s-ex2-1",
            questionText: "Mi: Elena, what's your hobby? - Elena: (1) ____",
            type: "multiple-choice",
            options: [
              "a. I don't think it's difficult. Just listen to music and move your body.",
              "b. I love dancing.",
              "c. Yes, my sister loves it, too. Do you like dancing, Mi?",
              "d. Yes, I have dancing lessons twice a week.",
              "e. I dance every day."
            ],
            correctAnswers: ["b"],
            hint: "b. I love dancing."
          },
          {
            id: "u1-s-ex2-2",
            questionText: "Mi: How often do you dance? - Elena: (2) ____",
            type: "multiple-choice",
            options: [
              "a. I don't think it's difficult. Just listen to music and move your body.",
              "b. I love dancing.",
              "c. Yes, my sister loves it, too. Do you like dancing, Mi?",
              "d. Yes, I have dancing lessons twice a week.",
              "e. I dance every day."
            ],
            correctAnswers: ["e"],
            hint: "e. I dance every day."
          },
          {
            id: "u1-s-ex2-3",
            questionText: "Mi: Do you go to dancing classes? - Elena: (3) ____",
            type: "multiple-choice",
            options: [
              "a. I don't think it's difficult. Just listen to music and move your body.",
              "b. I love dancing.",
              "c. Yes, my sister loves it, too. Do you like dancing, Mi?",
              "d. Yes, I have dancing lessons twice a week.",
              "e. I dance every day."
            ],
            correctAnswers: ["d"],
            hint: "d. Yes, I have dancing lessons twice a week."
          },
          {
            id: "u1-s-ex2-4",
            questionText: "Mi: Is it difficult to dance? - Elena: (4) ____",
            type: "multiple-choice",
            options: [
              "a. I don't think it's difficult. Just listen to music and move your body.",
              "b. I love dancing.",
              "c. Yes, my sister loves it, too. Do you like dancing, Mi?",
              "d. Yes, I have dancing lessons twice a week.",
              "e. I dance every day."
            ],
            correctAnswers: ["a"],
            hint: "a. I don't think it's difficult. Just listen to music and move your body."
          },
          {
            id: "u1-s-ex2-5",
            questionText: "Mi: Do you do this hobby with anyone? - Elena: (5) ____",
            type: "multiple-choice",
            options: [
              "a. I don't think it's difficult. Just listen to music and move your body.",
              "b. I love dancing.",
              "c. Yes, my sister loves it, too. Do you like dancing, Mi?",
              "d. Yes, I have dancing lessons twice a week.",
              "e. I dance every day."
            ],
            correctAnswers: ["c"],
            hint: "c. Yes, my sister loves it, too. Do you like dancing, Mi?"
          }
        ]
      },
      {
        id: "u1-s-ex3",
        title: "Exercise 3 (Page 6)",
        instruction: "Make a similar conversation about drawing. Complete the blanks using the information (Hobby: drawing, Frequency: every day, Drawing class: once a week on Sunday mornings, Do it with: father, Difficulty: easy).",
        pageNumber: 6,
        questions: [
          {
            id: "u1-s-ex3-1",
            questionText: "Mi: Elena, what's your hobby? - Elena: I love ____.",
            type: "fill-blank",
            correctAnswers: ["drawing"],
            hint: "drawing"
          },
          {
            id: "u1-s-ex3-2",
            questionText: "Mi: How often do you draw? - Elena: I draw ____.",
            type: "fill-blank",
            correctAnswers: ["every day", "everyday"],
            hint: "every day"
          },
          {
            id: "u1-s-ex3-3",
            questionText: "Mi: Do you go to drawing classes? - Elena: Yes, I have drawing lessons ____ on Sunday mornings.",
            type: "fill-blank",
            correctAnswers: ["once a week"],
            hint: "once a week"
          },
          {
            id: "u1-s-ex3-4",
            questionText: "Mi: Is it difficult to draw? - Elena: No, it's ____.",
            type: "fill-blank",
            correctAnswers: ["easy"],
            hint: "easy"
          },
          {
            id: "u1-s-ex3-5",
            questionText: "Mi: Do you do this hobby with anyone? - Elena: Yes, I do it with my ____.",
            type: "fill-blank",
            correctAnswers: ["father", "dad"],
            hint: "father"
          }
        ]
      }
    ]
  },
  {
    key: "reading",
    title: "D. Reading",
    icon: "📖",
    exercises: [
      {
        id: "u1-r-ex1",
        title: "Exercise 1",
        instruction: "Fill in each blank with a suitable word from the box (like, your, sending, usually, photo, pal, I'm).",
        pageNumber: 6,
        questions: [
          {
            id: "u1-r-ex1-1",
            questionText: "Dear Jane, I'm so happy to read your email. I'd like to have a pen (1) ____ in Australia...",
            type: "fill-blank",
            correctAnswers: ["pal"],
            hint: "pen pal: bạn qua thư"
          },
          {
            id: "u1-r-ex1-2",
            questionText: "Thank you for sending me a (2) ____ of your family.",
            type: "fill-blank",
            correctAnswers: ["photo"],
            hint: "photo: bức ảnh"
          },
          {
            id: "u1-r-ex1-3",
            questionText: "What do you (3) ____ doing together?",
            type: "fill-blank",
            correctAnswers: ["like"],
            hint: "like"
          },
          {
            id: "u1-r-ex1-4",
            questionText: "I like watching films with my family. We (4) ____ watch many different kinds...",
            type: "fill-blank",
            correctAnswers: ["usually"],
            hint: "usually"
          },
          {
            id: "u1-r-ex1-5",
            questionText: "I'm (5) ____ you a photo of my family.",
            type: "fill-blank",
            correctAnswers: ["sending"],
            hint: "sending"
          },
          {
            id: "u1-r-ex1-6",
            questionText: "I can't wait to read (6) ____ next email!",
            type: "fill-blank",
            correctAnswers: ["your"],
            hint: "your"
          }
        ]
      },
      {
        id: "u1-r-ex2",
        title: "Exercise 2",
        instruction: "Choose the correct answer A, B, or C to fill in each blank in the passage.",
        pageNumber: 7,
        questions: [
          {
            id: "u1-r-ex2-1",
            questionText: "Mark has a lot of hobbies. He usually (1) ____ up early, so he can jog.",
            type: "multiple-choice",
            options: ["A. gets", "B. stays", "C. does"],
            correctAnswers: ["A"],
            hint: "gets"
          },
          {
            id: "u1-r-ex2-2",
            questionText: "After school, Mark often (2) ____ a horse at the riding club.",
            type: "multiple-choice",
            options: ["A. cycles", "B. drives", "C. rides"],
            correctAnswers: ["C"],
            hint: "rides"
          },
          {
            id: "u1-r-ex2-3",
            questionText: "He also (3) ____ music.",
            type: "multiple-choice",
            options: ["A. makes", "B. loves", "C. does"],
            correctAnswers: ["B"],
            hint: "loves"
          },
          {
            id: "u1-r-ex2-4",
            questionText: "(4) ____ Saturday mornings, he waters the plants.",
            type: "multiple-choice",
            options: ["A. On", "B. In", "C. At"],
            correctAnswers: ["A"],
            hint: "On"
          },
          {
            id: "u1-r-ex2-5",
            questionText: "He seldom watches TV because he likes doing things (5) ____.",
            type: "multiple-choice",
            options: ["A. inside", "B. behind", "C. outside"],
            correctAnswers: ["C"],
            hint: "outside"
          },
          {
            id: "u1-r-ex2-6",
            questionText: "He has a lot of friends and he (6) ____ football with them.",
            type: "multiple-choice",
            options: ["A. is playing", "B. plays", "C. play"],
            correctAnswers: ["B"],
            hint: "plays"
          }
        ]
      },
      {
        id: "u1-r-ex3a",
        title: "Exercise 3a (Page 8)",
        instruction: "Read the passage. Match each word in A with its meaning in B.",
        pageNumber: 8,
        questions: [
          {
            id: "u1-r-ex3a-1",
            questionText: "1. beneficial",
            type: "multiple-choice",
            options: [
              "a. an emergency situation when people have to stay at home",
              "b. helpful or useful",
              "c. become better",
              "d. diseases throughout the whole country or the whole world",
              "e. things that happen to you and affect your life"
            ],
            correctAnswers: ["b"],
            hint: "beneficial means helpful or useful."
          },
          {
            id: "u1-r-ex3a-2",
            questionText: "2. pandemics",
            type: "multiple-choice",
            options: [
              "a. an emergency situation when people have to stay at home",
              "b. helpful or useful",
              "c. become better",
              "d. diseases throughout the whole country or the whole world",
              "e. things that happen to you and affect your life"
            ],
            correctAnswers: ["d"],
            hint: "pandemics mean diseases throughout the world."
          },
          {
            id: "u1-r-ex3a-3",
            questionText: "3. lockdown",
            type: "multiple-choice",
            options: [
              "a. an emergency situation when people have to stay at home",
              "b. helpful or useful",
              "c. become better",
              "d. diseases throughout the whole country or the whole world",
              "e. things that happen to you and affect your life"
            ],
            correctAnswers: ["a"],
            hint: "lockdown is an emergency situation to stay at home."
          },
          {
            id: "u1-r-ex3a-4",
            questionText: "4. experiences",
            type: "multiple-choice",
            options: [
              "a. an emergency situation when people have to stay at home",
              "b. helpful or useful",
              "c. become better",
              "d. diseases throughout the whole country or the whole world",
              "e. things that happen to you and affect your life"
            ],
            correctAnswers: ["e"],
            hint: "experiences are things that affect your life."
          },
          {
            id: "u1-r-ex3a-5",
            questionText: "5. improve",
            type: "multiple-choice",
            options: [
              "a. an emergency situation when people have to stay at home",
              "b. helpful or useful",
              "c. become better",
              "d. diseases throughout the whole country or the whole world",
              "e. things that happen to you and affect your life"
            ],
            correctAnswers: ["c"],
            hint: "improve means to become better."
          }
        ]
      },
      {
        id: "u1-r-ex3b",
        title: "Exercise 3b (Page 8)",
        instruction: "Write T (True), F (False), or NI (No Information) at the end of each sentence.",
        pageNumber: 8,
        questions: [
          {
            id: "u1-r-ex3b-1",
            questionText: "1. During the lockdown, the author's family reads books and watches the news together.",
            type: "multiple-choice",
            options: ["True", "False", "No Information"],
            correctAnswers: ["False"],
            hint: "They read books and watched films together (not news)."
          },
          {
            id: "u1-r-ex3b-2",
            questionText: "2. Travelling helps the author have more friends.",
            type: "multiple-choice",
            options: ["True", "False", "No Information"],
            correctAnswers: ["True"],
            hint: "True (The author shares experiences and says 'This way, I have more friends.')"
          },
          {
            id: "u1-r-ex3b-3",
            questionText: "3. There is a dancing club in the author's school.",
            type: "multiple-choice",
            options: ["True", "False", "No Information"],
            correctAnswers: ["No Information"],
            hint: "No Information (There is a travel group in their class, but no mention of a dancing club)."
          },
          {
            id: "u1-r-ex3b-4",
            questionText: "4. Hobbies can help a person develop new skills.",
            type: "multiple-choice",
            options: ["True", "False", "No Information"],
            correctAnswers: ["True"],
            hint: "True ('Last but not least, a hobby can help you develop new skills.')"
          },
          {
            id: "u1-r-ex3b-5",
            questionText: "5. The author's sister sews clothes for her family members.",
            type: "multiple-choice",
            options: ["True", "False", "No Information"],
            correctAnswers: ["False"],
            hint: "False (She sews beautiful doll clothes, not clothes for family members)."
          }
        ]
      }
    ]
  },
  {
    key: "writing",
    title: "E. Writing",
    icon: "✍️",
    exercises: [
      {
        id: "u1-w-ex1",
        title: "Exercise 1 (Page 8)",
        instruction: "Make sentences, using the words and phrases below to help you. You can change the words/phrases or add necessary words.",
        pageNumber: 8,
        questions: [
          {
            id: "u1-w-ex1-1",
            questionText: "1. I / like / garden / because / I / love / plants / flowers.",
            type: "fill-blank",
            correctAnswers: ["I like gardening because I love plants and flowers."],
            hint: "I like gardening because I love plants and flowers."
          },
          {
            id: "u1-w-ex1-2",
            questionText: "2. My sister / not like / horse / riding / because / she / afraid of / horses.",
            type: "fill-blank",
            correctAnswers: ["My sister doesn't like horse riding because she is afraid of horses.", "My sister does not like horse riding because she is afraid of horses."],
            hint: "My sister doesn't like horse riding because she is afraid of horses."
          },
          {
            id: "u1-w-ex1-3",
            questionText: "3. Make / models / develop / your / creativity.",
            type: "fill-blank",
            correctAnswers: ["Making models develops your creativity."],
            hint: "Making models develops your creativity."
          },
          {
            id: "u1-w-ex1-4",
            questionText: "4. Collect / stamps / help / you / be / more / patient.",
            type: "fill-blank",
            correctAnswers: ["Collecting stamps helps you be more patient.", "Collecting stamps helps you to be more patient."],
            hint: "Collecting stamps helps you be more patient."
          },
          {
            id: "u1-w-ex1-5",
            questionText: "5. Jog / make / you / strong / and / reduce / stress.",
            type: "fill-blank",
            correctAnswers: ["Jogging makes you strong and reduces stress."],
            hint: "Jogging makes you strong and reduces stress."
          }
        ]
      },
      {
        id: "u1-w-ex2",
        title: "Exercise 2 (Page 9)",
        instruction: "Do you like the activities in the pictures? Write true sentences about yourself. Remember to use verbs of liking/disliking + V-ing. Add one reason for each activity.",
        pageNumber: 9,
        questions: [
          {
            id: "u1-w-ex2-1",
            questionText: "1. Picture 1 (horse riding):",
            type: "fill-blank",
            correctAnswers: ["I love horse riding because I love horses.", "I like horse riding because it is fun.", "I dislike horse riding because it is dangerous."],
            hint: "E.g.: I love horse riding because I love horses."
          },
          {
            id: "u1-w-ex2-2",
            questionText: "2. Picture 2 (gardening):",
            type: "fill-blank",
            correctAnswers: ["I like gardening because I love flowers.", "I like gardening because I love plants and flowers."],
            hint: "E.g.: I like gardening because I love flowers."
          },
          {
            id: "u1-w-ex2-3",
            questionText: "3. Picture 3 (making models):",
            type: "fill-blank",
            correctAnswers: ["I enjoy making models because it develops my creativity.", "I like making models because it is interesting."],
            hint: "E.g.: I enjoy making models because it develops my creativity."
          },
          {
            id: "u1-w-ex2-4",
            questionText: "4. Picture 4 (playing football):",
            type: "fill-blank",
            correctAnswers: ["I like playing football because it makes me strong.", "I enjoy playing football with my friends."],
            hint: "E.g.: I like playing football because it makes me strong."
          },
          {
            id: "u1-w-ex2-5",
            questionText: "5. Picture 5 (playing computer games):",
            type: "fill-blank",
            correctAnswers: ["I love playing computer games because it is exciting.", "I like playing computer games in my free time."],
            hint: "E.g.: I love playing computer games because it is exciting."
          }
        ]
      },
      {
        id: "u1-w-ex3",
        title: "Exercise 3 (Page 9)",
        instruction: "Think about your dad/mum and his/her hobby. Fill in the word web. Then write a short paragraph of about 70 words about your dad's/mum's hobby.",
        pageNumber: 9,
        questions: [
          {
            id: "u1-w-ex3-1",
            questionText: "Write your paragraph here (minimum 50 words):",
            type: "fill-blank",
            correctAnswers: ["My dad's hobby is gardening. He started this hobby five years ago. He shares this hobby with my mom. To do this hobby, he needs seeds, soil, and gardening tools. He usually spends one hour in the garden every afternoon. Gardening helps him relax after a busy day and makes our home beautiful. He loves seeing his flowers grow every day."],
            hint: "Model paragraph: My dad's hobby is gardening. He started this hobby five years ago. He shares this hobby with my mom. To do this hobby, he needs seeds, soil, and gardening tools. He usually spends one hour in the garden every afternoon. Gardening helps him relax after a busy day and makes our home beautiful. He loves seeing his flowers grow every day."
          }
        ]
      }
    ]
  }
];
