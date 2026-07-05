import { SBTSection } from "./sbtUnit1Data";

export const sbtUnit2Data: SBTSection[] = [
  {
    key: "pronunciation",
    title: "A. Pronunciation",
    icon: "🗣️",
    exercises: [
      {
        id: "u2-p-ex1",
        title: "Exercise 1 (Page 10)",
        instruction: "Circle the word with the underlined part pronounced differently. Then practise saying them aloud.",
        pageNumber: 10,
        questions: [
          {
            id: "u2-p-ex1-1",
            questionText: "1. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. cough", "B. enough", "C. through", "D. laugh"],
            correctAnswers: ["C"],
            hint: "'through' has a silent 'gh' and long /uː/ sound, others have /f/ sound."
          },
          {
            id: "u2-p-ex1-2",
            questionText: "2. Underlined consonant part:",
            type: "multiple-choice",
            options: ["A. dolphin", "B. uphill", "C. earphone", "D. alphabet"],
            correctAnswers: ["B"],
            hint: "'uphill' has /h/ sound, others have /f/ sound (ph)."
          },
          {
            id: "u2-p-ex1-3",
            questionText: "3. Underlined part:",
            type: "multiple-choice",
            options: ["A. night", "B. tough", "C. flight", "D. high"],
            correctAnswers: ["B"],
            hint: "'tough' ends with /f/ sound, others have silent 'gh'."
          },
          {
            id: "u2-p-ex1-4",
            questionText: "4. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. ate", "B. about", "C. amazing", "D. above"],
            correctAnswers: ["A"],
            hint: "'ate' has /eɪ/ sound, others have schwa /ə/."
          },
          {
            id: "u2-p-ex1-5",
            questionText: "5. Underlined vowel part:",
            type: "multiple-choice",
            options: ["A. learn", "B. early", "C. earth", "D. hear"],
            correctAnswers: ["D"],
            hint: "'hear' has /ɪə/ sound, others have /ɜː/."
          }
        ]
      },
      {
        id: "u2-p-ex2",
        title: "Exercise 2 (Page 10)",
        instruction: "Identify whether the underlined words contain the /f/ or /v/ sound.",
        pageNumber: 10,
        questions: [
          {
            id: "u2-p-ex2-1",
            questionText: "1. What is the benefit of playing volleyball?",
            type: "multiple-choice",
            options: ["A. benefit has /f/, volleyball has /v/", "B. benefit has /v/, volleyball has /f/"],
            correctAnswers: ["A"],
            hint: "benefit (/f/), volleyball (/v/)."
          },
          {
            id: "u2-p-ex2-2",
            questionText: "2. Eat more fruit and vegetables.",
            type: "multiple-choice",
            options: ["A. fruit has /f/, vegetables has /v/", "B. fruit has /v/, vegetables has /f/"],
            correctAnswers: ["A"],
            hint: "fruit (/f/), vegetables (/v/)."
          },
          {
            id: "u2-p-ex2-3",
            questionText: "3. Fruit contains a lot of vitamins.",
            type: "multiple-choice",
            options: ["A. Fruit has /f/, vitamins has /v/", "B. Fruit has /v/, vitamins has /f/"],
            correctAnswers: ["A"],
            hint: "Fruit (/f/), vitamins (/v/)."
          },
          {
            id: "u2-p-ex2-4",
            questionText: "4. Laughter and love are good for your health.",
            type: "multiple-choice",
            options: ["A. Laughter has /f/, love has /v/", "B. Laughter has /v/, love has /f/"],
            correctAnswers: ["A"],
            hint: "Laughter (/f/ sound for 'gh'), love (/v/)."
          },
          {
            id: "u2-p-ex2-5",
            questionText: "5. We should do more physical activities.",
            type: "multiple-choice",
            options: ["A. physical has /f/, activities has /v/", "B. physical has /v/, activities has /f/"],
            correctAnswers: ["A"],
            hint: "physical (/f/ sound for 'ph'), activities (/v/)."
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
        id: "u2-vg-ex1",
        title: "Exercise 1 (Page 10)",
        instruction: "Write a word or phrase from the box under its correct picture (house cleaning, fresh vegetables, fast food, outdoor activity, rubbish, snack).",
        pageNumber: 10,
        questions: [
          {
            id: "u2-vg-ex1-1",
            questionText: "Picture 1: (sweeping, vacuuming)",
            type: "fill-blank",
            correctAnswers: ["house cleaning"],
            hint: "house cleaning"
          },
          {
            id: "u2-vg-ex1-2",
            questionText: "Picture 2: (carrots, tomatoes, greens)",
            type: "fill-blank",
            correctAnswers: ["fresh vegetables"],
            hint: "fresh vegetables"
          },
          {
            id: "u2-vg-ex1-3",
            questionText: "Picture 3: (burger, fries, pizza)",
            type: "fill-blank",
            correctAnswers: ["fast food"],
            hint: "fast food"
          },
          {
            id: "u2-vg-ex1-4",
            questionText: "Picture 4: (playing sport outside)",
            type: "fill-blank",
            correctAnswers: ["outdoor activity"],
            hint: "outdoor activity"
          },
          {
            id: "u2-vg-ex1-5",
            questionText: "Picture 5: (litter, trash bin)",
            type: "fill-blank",
            correctAnswers: ["rubbish"],
            hint: "rubbish"
          },
          {
            id: "u2-vg-ex1-6",
            questionText: "Picture 6: (small food items)",
            type: "fill-blank",
            correctAnswers: ["snack"],
            hint: "snack"
          }
        ]
      },
      {
        id: "u2-vg-ex2",
        title: "Exercise 2 (Page 11)",
        instruction: "Add three more words or phrases to each group.",
        pageNumber: 11,
        questions: [
          {
            id: "u2-vg-ex2-1",
            questionText: "1. Fruit and vegetables: apple, orange, ____",
            type: "fill-blank",
            correctAnswers: ["banana", "carrot", "tomato", "pumpkin"],
            hint: "E.g. banana, carrot, tomato"
          },
          {
            id: "u2-vg-ex2-2",
            questionText: "2. Healthy activities: swimming, cycling, ____",
            type: "fill-blank",
            correctAnswers: ["jogging", "doing exercise", "doing sports", "sleeping well"],
            hint: "E.g. jogging, doing exercise"
          },
          {
            id: "u2-vg-ex2-3",
            questionText: "3. Unhealthy activities: staying up late, eating a lot of sweets, ____",
            type: "fill-blank",
            correctAnswers: ["playing computer games too long", "eating fast food", "skipping breakfast"],
            hint: "E.g. eating fast food, skipping breakfast"
          },
          {
            id: "u2-vg-ex2-4",
            questionText: "4. Health problems: flu, obesity, ____",
            type: "fill-blank",
            correctAnswers: ["headache", "toothache", "sore throat", "chapped lips"],
            hint: "E.g. headache, toothache"
          }
        ]
      },
      {
        id: "u2-vg-ex3",
        title: "Exercise 3 (Page 11)",
        instruction: "Complete the sentences with the words and phrases below (tofu, fit, chapped lips, weight, harms, bins).",
        pageNumber: 11,
        questions: [
          {
            id: "u2-vg-ex3-1",
            questionText: "1. Doing housework is a kind of exercise. It helps keep you ____.",
            type: "fill-blank",
            correctAnswers: ["fit"],
            hint: "fit"
          },
          {
            id: "u2-vg-ex3-2",
            questionText: "2. Some of a vegetarian's main foods are ____ and vegetables.",
            type: "fill-blank",
            correctAnswers: ["tofu"],
            hint: "tofu"
          },
          {
            id: "u2-vg-ex3-3",
            questionText: "3. Physical activities like running help you lose ____.",
            type: "fill-blank",
            correctAnswers: ["weight"],
            hint: "weight"
          },
          {
            id: "u2-vg-ex3-4",
            questionText: "4. There should be more ____ in public places.",
            type: "fill-blank",
            correctAnswers: ["bins"],
            hint: "bins"
          },
          {
            id: "u2-vg-ex3-5",
            questionText: "5. Reading in dim light ____ your eyes.",
            type: "fill-blank",
            correctAnswers: ["harms"],
            hint: "harms"
          },
          {
            id: "u2-vg-ex3-6",
            questionText: "6. Cold weather causes ____ and skin.",
            type: "fill-blank",
            correctAnswers: ["chapped lips"],
            hint: "chapped lips"
          }
        ]
      },
      {
        id: "u2-vg-ex4",
        title: "Exercise 4 (Page 11)",
        instruction: "Write a correct word or phrase from the box (taking a bath, soft drinks, house cleaning, cycling, fast food, acne) that describes each group of words.",
        pageNumber: 11,
        questions: [
          {
            id: "u2-vg-ex4-1",
            questionText: "1. fried chicken and chips, chain restaurants, popular:",
            type: "fill-blank",
            correctAnswers: ["fast food"],
            hint: "fast food"
          },
          {
            id: "u2-vg-ex4-2",
            questionText: "2. bike, helmet, shoes, path:",
            type: "fill-blank",
            correctAnswers: ["cycling"],
            hint: "cycling"
          },
          {
            id: "u2-vg-ex4-3",
            questionText: "3. sweetened drinks with a lot of gas:",
            type: "fill-blank",
            correctAnswers: ["soft drinks"],
            hint: "soft drinks"
          },
          {
            id: "u2-vg-ex4-4",
            questionText: "4. blackheads, pimples, skin problem:",
            type: "fill-blank",
            correctAnswers: ["acne"],
            hint: "acne"
          },
          {
            id: "u2-vg-ex4-5",
            questionText: "5. soap, warm water, shower gel, clean towel:",
            type: "fill-blank",
            correctAnswers: ["taking a bath"],
            hint: "taking a bath"
          },
          {
            id: "u2-vg-ex4-6",
            questionText: "6. sweeping the floor, washing dishes, vacuuming:",
            type: "fill-blank",
            correctAnswers: ["house cleaning"],
            hint: "house cleaning"
          }
        ]
      },
      {
        id: "u2-vg-ex5",
        title: "Exercise 5 (Page 11)",
        instruction: "Rearrange the words and phrases to make simple sentences.",
        pageNumber: 11,
        questions: [
          {
            id: "u2-vg-ex5-1",
            questionText: "1. soft drinks / never / my sister / drinks / .",
            type: "fill-blank",
            correctAnswers: ["My sister never drinks soft drinks.", "my sister never drinks soft drinks"],
            hint: "My sister never drinks soft drinks."
          },
          {
            id: "u2-vg-ex5-2",
            questionText: "2. affects / acne / 80% of young people / .",
            type: "fill-blank",
            correctAnswers: ["Acne affects 80% of young people.", "acne affects 80% of young people"],
            hint: "Acne affects 80% of young people."
          },
          {
            id: "u2-vg-ex5-3",
            questionText: "3. has / he / for breakfast / bread and eggs / .",
            type: "fill-blank",
            correctAnswers: ["He has bread and eggs for breakfast.", "he has bread and eggs for breakfast"],
            hint: "He has bread and eggs for breakfast."
          },
          {
            id: "u2-vg-ex5-4",
            questionText: "4. don't eat / we / much fast food / .",
            type: "fill-blank",
            correctAnswers: ["We don't eat much fast food.", "we don't eat much fast food"],
            hint: "We don't eat much fast food."
          },
          {
            id: "u2-vg-ex5-5",
            questionText: "5. a lot of vitamins / fruit and vegetables / have / .",
            type: "fill-blank",
            correctAnswers: ["Fruit and vegetables have a lot of vitamins.", "fruit and vegetables have a lot of vitamins"],
            hint: "Fruit and vegetables have a lot of vitamins."
          }
        ]
      },
      {
        id: "u2-vg-ex6",
        title: "Exercise 6 (Page 12)",
        instruction: "Read and decide if the underlined parts are the Subject (S), Verb (V), Object (O), or Adverb (ADV) of the sentences.",
        pageNumber: 12,
        questions: [
          {
            id: "u2-vg-ex6-1",
            questionText: "1. She washes her [face] (twice a day).",
            type: "multiple-choice",
            options: ["A. face = Object (O); twice a day = Adverb (ADV)", "B. face = Subject (S); twice a day = Verb (V)"],
            correctAnswers: ["A"],
            hint: "face is O, twice a day is ADV."
          },
          {
            id: "u2-vg-ex6-2",
            questionText: "2. [Asian diets] contain a lot of vegetables.",
            type: "multiple-choice",
            options: ["A. Asian diets = Subject (S)", "B. Asian diets = Object (O)"],
            correctAnswers: ["A"],
            hint: "Asian diets is S."
          },
          {
            id: "u2-vg-ex6-3",
            questionText: "3. My sister uses [a lot of suncream] (in summer).",
            type: "multiple-choice",
            options: ["A. a lot of suncream = Object (O); in summer = Adverb (ADV)", "B. a lot of suncream = Verb (V); in summer = Subject (S)"],
            correctAnswers: ["A"],
            hint: "a lot of suncream is O, in summer is ADV."
          },
          {
            id: "u2-vg-ex6-4",
            questionText: "4. He likes [cycling] (in the park).",
            type: "multiple-choice",
            options: ["A. cycling = Object (O); in the park = Adverb (ADV)", "B. cycling = Subject (S); in the park = Verb (V)"],
            correctAnswers: ["A"],
            hint: "cycling is O, in the park is ADV."
          },
          {
            id: "u2-vg-ex6-5",
            questionText: "5. My mother [cooks] food (with very little cooking oil).",
            type: "multiple-choice",
            options: ["A. cooks = Verb (V); with very little cooking oil = Adverb (ADV)", "B. cooks = Subject (S); with very little cooking oil = Object (O)"],
            correctAnswers: ["A"],
            hint: "cooks is V, with very little cooking oil is ADV."
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
        id: "u2-s-ex1",
        title: "Exercise 1 (Page 12)",
        instruction: "Tick (v) the tips you think are good for your health and cross (x) the ones that are not.",
        pageNumber: 12,
        questions: [
          {
            id: "u2-s-ex1-1",
            questionText: "1. Don't hate people.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["A"],
            hint: "Good (v)"
          },
          {
            id: "u2-s-ex1-2",
            questionText: "2. Skip breakfast to lose weight.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["B"],
            hint: "Not good (x)"
          },
          {
            id: "u2-s-ex1-3",
            questionText: "3. Exercise every day.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["A"],
            hint: "Good (v)"
          },
          {
            id: "u2-s-ex1-4",
            questionText: "4. Eat until you feel 100% full.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["B"],
            hint: "Not good (x) (Should only eat until 80% full)."
          },
          {
            id: "u2-s-ex1-5",
            questionText: "5. Take a bath once a day.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["A"],
            hint: "Good (v)"
          },
          {
            id: "u2-s-ex1-6",
            questionText: "6. Have a balanced diet for a long life.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["A"],
            hint: "Good (v)"
          },
          {
            id: "u2-s-ex1-7",
            questionText: "7. Change your pillow cover once a month.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["B"],
            hint: "Not good (x) (Should change once a week to avoid acne)."
          },
          {
            id: "u2-s-ex1-8",
            questionText: "8. Keep warm in winter.",
            type: "multiple-choice",
            options: ["A. Good (v)", "B. Not good (x)"],
            correctAnswers: ["A"],
            hint: "Good (v)"
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
        id: "u2-r-ex1",
        title: "Exercise 1 (Page 13)",
        instruction: "Read the health tips and complete each statement (1 - 6) with one word from the text.",
        pageNumber: 13,
        questions: [
          {
            id: "u2-r-ex1-1",
            questionText: "1. Eating a lot of salt or sugar can lead to ____ disease.",
            type: "fill-blank",
            correctAnswers: ["heart"],
            hint: "heart"
          },
          {
            id: "u2-r-ex1-2",
            questionText: "2. Drink only ____ water.",
            type: "fill-blank",
            correctAnswers: ["safe"],
            hint: "safe"
          },
          {
            id: "u2-r-ex1-3",
            questionText: "3. ____ housework is also a type of physical activity.",
            type: "fill-blank",
            correctAnswers: ["doing", "Doing"],
            hint: "Doing"
          },
          {
            id: "u2-r-ex1-4",
            questionText: "4. Stand up every hour and do some ____ to reduce sitting time.",
            type: "fill-blank",
            correctAnswers: ["exercise", "exercises"],
            hint: "exercise"
          },
          {
            id: "u2-r-ex1-5",
            questionText: "5. Your mind works well if you get enough ____.",
            type: "fill-blank",
            correctAnswers: ["sleep"],
            hint: "sleep"
          },
          {
            id: "u2-r-ex1-6",
            questionText: "6. ____ regularly to prevent some diseases.",
            type: "fill-blank",
            correctAnswers: ["Handwash", "handwash", "Wash hands"],
            hint: "Handwash"
          }
        ]
      },
      {
        id: "u2-r-ex2",
        title: "Exercise 2 (Page 14)",
        instruction: "Choose the correct answer A, B, or C to fill in each blank in the following passage.",
        pageNumber: 14,
        questions: [
          {
            id: "u2-r-ex2-1",
            questionText: "1. My grandparents teach me a lot of things about (1) ____.",
            type: "multiple-choice",
            options: ["A. health", "B. vegetables", "C. exercise"],
            correctAnswers: ["B"],
            hint: "vegetables"
          },
          {
            id: "u2-r-ex2-2",
            questionText: "2. Vegetables come in different shapes, sizes, and (2) ____.",
            type: "multiple-choice",
            options: ["A. colours", "B. prices", "C. weight"],
            correctAnswers: ["A"],
            hint: "colours"
          },
          {
            id: "u2-r-ex2-3",
            questionText: "3. Carrots and potatoes grow (3) ____ the ground.",
            type: "multiple-choice",
            options: ["A. above", "B. on", "C. under"],
            correctAnswers: ["C"],
            hint: "under"
          },
          {
            id: "u2-r-ex2-4",
            questionText: "4. Some kinds of beans (4) ____ a high net to grow.",
            type: "multiple-choice",
            options: ["A. need", "B. provide", "C. have"],
            correctAnswers: ["A"],
            hint: "need"
          },
          {
            id: "u2-r-ex2-5",
            questionText: "5. Coloured vegetables are very good for health (5) ____ they provide vitamins.",
            type: "multiple-choice",
            options: ["A. and", "B. because", "C. so"],
            correctAnswers: ["B"],
            hint: "because"
          },
          {
            id: "u2-r-ex2-6",
            questionText: "6. White cauliflower is (6) ____ in vitamin C.",
            type: "multiple-choice",
            options: ["A. rich", "B. poor", "C. low"],
            correctAnswers: ["A"],
            hint: "rich"
          },
          {
            id: "u2-r-ex2-7",
            questionText: "7. (7) ____ have vitamins A, B, C, and E.",
            type: "multiple-choice",
            options: ["A. Chicken", "B. Fish", "C. Pumpkins"],
            correctAnswers: ["C"],
            hint: "Pumpkins"
          },
          {
            id: "u2-r-ex2-8",
            questionText: "8. Gardening is a good way of (8) ____. It helps him keep fit and strong.",
            type: "multiple-choice",
            options: ["A. resting", "B. relaxing", "C. exercising"],
            correctAnswers: ["C"],
            hint: "exercising"
          }
        ]
      },
      {
        id: "u2-r-ex3",
        title: "Exercise 3 (Page 14)",
        instruction: "Read the passage and choose the correct answer A, B, or C.",
        pageNumber: 14,
        questions: [
          {
            id: "u2-r-ex3-1",
            questionText: "1. In 2019, Spain was number ____ in health:",
            type: "multiple-choice",
            options: ["A. one", "B. two", "C. ten"],
            correctAnswers: ["A"],
            hint: "one"
          },
          {
            id: "u2-r-ex3-2",
            questionText: "2. The Mediterranean diet includes ____.",
            type: "multiple-choice",
            options: ["A. lots of vegetables", "B. red meat", "C. potato soup"],
            correctAnswers: ["A"],
            hint: "lots of vegetables"
          },
          {
            id: "u2-r-ex3-3",
            questionText: "3. Spanish people ____.",
            type: "multiple-choice",
            options: ["A. have more diseases than the rest of the world", "B. have fewer diseases than the rest of the world", "C. do not have diseases"],
            correctAnswers: ["B"],
            hint: "have fewer diseases than the rest of the world"
          },
          {
            id: "u2-r-ex3-4",
            questionText: "4. Beautiful ____ makes the Spanish happy.",
            type: "multiple-choice",
            options: ["A. beaches", "B. houses", "C. weather"],
            correctAnswers: ["C"],
            hint: "weather"
          },
          {
            id: "u2-r-ex3-5",
            questionText: "5. The Spanish enjoy ____.",
            type: "multiple-choice",
            options: ["A. food", "B. simple pleasures", "C. education"],
            correctAnswers: ["B"],
            hint: "simple pleasures"
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
        id: "u2-w-ex1",
        title: "Exercise 1 (Page 15)",
        instruction: "Write complete sentences from the prompts.",
        pageNumber: 15,
        questions: [
          {
            id: "u2-w-ex1-1",
            questionText: "1. Please / eye exercises / keep / eyes / getting dry.",
            type: "fill-blank",
            correctAnswers: ["Please do eye exercises to keep your eyes from getting dry.", "Please do eye exercises to keep your eyes from getting dry"],
            hint: "Please do eye exercises to keep your eyes from getting dry."
          },
          {
            id: "u2-w-ex1-2",
            questionText: "2. People / Iceland / eat / lot / fresh fish.",
            type: "fill-blank",
            correctAnswers: ["People in Iceland eat a lot of fresh fish.", "people in Iceland eat a lot of fresh fish"],
            hint: "People in Iceland eat a lot of fresh fish."
          },
          {
            id: "u2-w-ex1-3",
            questionText: "3. Air pollution / be / really harmful / our health.",
            type: "fill-blank",
            correctAnswers: ["Air pollution is really harmful to our health.", "air pollution is really harmful to our health"],
            hint: "Air pollution is really harmful to our health."
          },
          {
            id: "u2-w-ex1-4",
            questionText: "4. Going to bed / getting up / early / be / good / your health.",
            type: "fill-blank",
            correctAnswers: ["Going to bed and getting up early is good for your health.", "going to bed and getting up early is good for your health"],
            hint: "Going to bed and getting up early is good for your health."
          },
          {
            id: "u2-w-ex1-5",
            questionText: "5. Healthy food / love / laughter / bring / healthy life.",
            type: "fill-blank",
            correctAnswers: ["Healthy food, love and laughter bring a healthy life.", "healthy food, love and laughter bring a healthy life"],
            hint: "Healthy food, love and laughter bring a healthy life."
          }
        ]
      },
      {
        id: "u2-w-ex2",
        title: "Exercise 2 (Page 15)",
        instruction: "Write a reason for each tip.",
        pageNumber: 15,
        questions: [
          {
            id: "u2-w-ex2-1",
            questionText: "1. Do more physical activities. Reason: It helps keep you ____.",
            type: "fill-blank",
            correctAnswers: ["fit and active", "fit", "active"],
            hint: "E.g. fit and active"
          },
          {
            id: "u2-w-ex2-2",
            questionText: "2. Eat a lot of red fruit and vegetables. Reason: They provide a lot of ____.",
            type: "fill-blank",
            correctAnswers: ["vitamins", "vitamin A", "vitamin A and vitamins"],
            hint: "E.g. vitamins / vitamin A"
          },
          {
            id: "u2-w-ex2-3",
            questionText: "3. Use eyedrops when you are reading a lot. Reason: To keep your eyes from ____.",
            type: "fill-blank",
            correctAnswers: ["getting dry", "drying", "getting tired"],
            hint: "E.g. getting dry"
          },
          {
            id: "u2-w-ex2-4",
            questionText: "4. Keep your house clean. Reason: It prevents the spread of ____.",
            type: "fill-blank",
            correctAnswers: ["diseases", "disease", "viruses"],
            hint: "E.g. diseases"
          },
          {
            id: "u2-w-ex2-5",
            questionText: "5. Laugh more and stay relaxed. Reason: It is very good for your ____.",
            type: "fill-blank",
            correctAnswers: ["health", "mental health", "mind"],
            hint: "E.g. health"
          }
        ]
      }
    ]
  }
];
