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

export const unit8Pages: TextbookPage[] = [
  {
    pageNumber: 93,
    imagePath: "",
    title: "Listening and Vocabulary: Health Activities",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
    youtubeId: "SPurU5V7pxw",
    exercises: [
      {
        id: "p93-ex1",
        title: "Exercise 1: Listen to Part 1 of the conversation between Samantha, Tom and Sarah",
        type: "fill-blank",
        questionText: "1. Where does Tom plan to go? 2. What is Sarah thinking of doing?",
        correctAnswers: ["Open listening practice — answers depend on audio Part 1."],
        placeholder: "1. ..., 2. ..."
      },
      {
        id: "p94-ex3",
        title: "Exercise 3: Listen to Part 2. Underline the key words and tick who gave each opinion",
        type: "table-matching",
        questionText: "Opinions: 1. Joining the gym is too expensive. 2. Running is a boring way to exercise. 3. It is more fun to exercise with other people. 4. It is better to exercise outdoors. 5. It is a good idea to pay for a personal trainer. 6. It is important to follow a healthy diet. Tick which person (Samantha, Tom or Sarah) gave each opinion.",
        correctAnswers: ["Open listening practice — match each opinion (1-6) to Samantha, Tom, or Sarah based on audio Part 2."],
        placeholder: "1. Samantha/Tom/Sarah, 2. ..."
      },
      {
        id: "p94-ex4",
        title: "Exercise 4: Match the activity words with the pictures",
        type: "matching",
        questionText: "Match: play tennis, go cycling, watch TV, play basketball, drink water, enjoy art and music, eat fruit and vegetables, get enough sleep — to pictures 1-8.",
        correctAnswers: ["1 → play tennis", "2 → go cycling", "3 → watch TV", "4 → play basketball", "5 → drink water", "6 → enjoy art and music", "7 → eat fruit and vegetables", "8 → get enough sleep"],
        placeholder: "1. play tennis, 2. go cycling..."
      }
    ]
  },
  {
    pageNumber: 95,
    imagePath: "",
    title: "Reading: An Opinion-Based Essay on Exercise",
    exercises: [
      {
        id: "p95-ex7",
        title: "Exercise 7: Read the essay and answer the questions",
        type: "fill-blank",
        questionText: "1. Does the writer of the essay agree or disagree with the essay question (students preparing for exams should stop sports lessons)? 2. What opinion does the writer give in response to the essay question?",
        correctAnswers: ["1. The writer disagrees with the essay question.", "2. The writer believes students should continue having sports lessons because regular exercise keeps them healthy and happy, reduces stress, and may help them get better exam results."],
        placeholder: "1. agree/disagree, 2. ..."
      },
      {
        id: "p96-ex8",
        title: "Exercise 8: Choose the best multiple-choice answer (worked example)",
        type: "multiple-choice",
        questionText: "The writer thinks that children who have important exams...",
        options: ["A. need sports lessons to keep healthy", "B. don't need to focus on exam subjects more", "C. need to spend more time studying"],
        correctAnswers: ["A. need sports lessons to keep healthy"]
      },
      {
        id: "p96-ex9",
        title: "Exercise 9: Read the essay again and choose the best option A, B or C",
        type: "multiple-choice",
        questionText: "1. The writer says many young people prefer to spend their free time: A. riding their bikes / B. in the park / C. in front of their computers. 2. The writer thinks exercise for young people is: A. less important than diet / B. just as important as diet / C. more important than diet. 3. The writer believes regular exercise can make people feel: A. more active / B. less stressed / C. more tired at night. 4. The writer thinks exercising: A. benefits the body and the mind / B. can affect studying negatively / C. will help you get better exam results.",
        correctAnswers: ["1. C. in front of their computers", "2. B. just as important as diet", "3. B. less stressed", "4. A. benefits the body and the mind"]
      }
    ]
  },
  {
    pageNumber: 97,
    imagePath: "",
    title: "Grammar 1: Should/Shouldn't + Speaking: Describing a Picture",
    exercises: [
      {
        id: "p97-ex1",
        title: "Exercise 1: Underline the correct option about the writer's view (should/shouldn't)",
        type: "fill-blank",
        questionText: "1. The writer thinks it is a (good / bad) idea for children to have sports lessons. 2. The writer (wants / doesn't want) children to have more lessons in their exam subjects. 3. The writer's advice for children is to (go / not to go) to painting and music lessons.",
        correctAnswers: ["good", "doesn't want", "go"],
        placeholder: "1. good, 2. doesn't want, 3. go"
      },
      {
        id: "p97-ex2",
        title: "Exercise 2: Underline the correct answer (should/shouldn't)",
        type: "fill-blank",
        questionText: "1. You (should / shouldn't) eat lots of fruits and vegetables. It is really good for your health. 2. Don't watch TV all day. You (should / shouldn't) only watch around three hours a day. 3. We (should / shouldn't) sit all day without doing some type of exercise. 4. I think we (should / shouldn't) all sleep between seven to 10 hours every night. 5. My friend (should / shouldn't) spend all day on a computer and play more sport instead.",
        correctAnswers: ["should", "should", "shouldn't", "should", "shouldn't"],
        placeholder: "1. should, 2. should, 3. shouldn't..."
      },
      {
        id: "p97-ex3",
        title: "Exercise 3: Describing a picture — put the sentences A-C in the correct order",
        type: "matching",
        questionText: "A. I think the boy should go to sleep because he is tired and it is bed time. He shouldn't play on his computer for so long. I think he should play more sport. B. I think the boy is playing on his computer at night. It looks like the boy is tired. C. The picture shows a boy in his bedroom. There is a computer, a lamp and a bed. Put in the correct order.",
        correctAnswers: ["C → B → A"],
        placeholder: "Order: C, B, A"
      }
    ]
  },
  {
    pageNumber: 98,
    imagePath: "",
    title: "Speaking Practice + Vocabulary: How to Relax",
    exercises: [
      {
        id: "p98-ex5",
        title: "Exercise 5: Match the ways to relax with the pictures",
        type: "matching",
        questionText: "Match: drink tea, do yoga, go for a walk, do exercise, read a book — to pictures 1-5.",
        correctAnswers: ["1 → drink tea", "2 → do yoga", "3 → go for a walk", "4 → do exercise", "5 → read a book"],
        placeholder: "1. drink tea, 2. do yoga..."
      },
      {
        id: "p98-speaking",
        title: "Speaking: Describe a health-related picture using should/shouldn't",
        type: "text-area",
        questionText: "Describe a picture using: talk generally about what you see, give specific details, give your opinion and reason (I think... because...), use should/shouldn't, talk for 1-2 minutes.",
        correctAnswers: ["Open speaking practice — describe a picture using should/shouldn't and health-related vocabulary."],
        placeholder: "This picture shows... I think... because... He/She should/shouldn't..."
      }
    ]
  },
  {
    pageNumber: 99,
    imagePath: "",
    title: "Listening 2: Multiple-Choice Questions — Ways to Relax",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S2.m4a",
    youtubeId: "mWPZhFuPkF0",
    exercises: [
      {
        id: "p99-ex6",
        title: "Exercise 6: Listen to five people and match speakers with activities",
        type: "matching",
        questionText: "Match speakers Jim, Elena, Kate, Mike, Mark with their favourite way to relax from Exercise 5 (drink tea, do yoga, go for a walk, do exercise, read a book).",
        correctAnswers: ["Open listening practice — match each speaker to their relaxing activity based on audio."],
        placeholder: "Jim: ..., Elena: ..., Kate: ..., Mike: ..., Mark: ..."
      },
      {
        id: "p99-ex7",
        title: "Exercise 7: Listen again and choose the correct answer A, B or C",
        type: "multiple-choice",
        questionText: "1. Jim thinks that people who feel sad shouldn't: A. forget about their problems / B. read a funny book / C. read a sad book. 2. Elena thinks that if you want to do yoga, you should: A. do it at your own home / B. find the right teacher / C. not pay lots of money. 3. According to Kate, a common reason for not doing regular exercise is: A. it takes too much time / B. it is too expensive / C. it will make a person tired. 4. How much time does Mike usually spend outside on his lunch break? A. 20 minutes / B. 30 minutes / C. 60 minutes. 5. Which does Mark do to help him relax? A. He drinks some green tea / B. He has a cup of tea before bed / C. He tries to get enough sleep.",
        correctAnswers: ["Open listening practice — answers A/B/C depend on audio for each speaker."],
        placeholder: "1. A/B/C, 2. A/B/C..."
      }
    ]
  },
  {
    pageNumber: 100,
    imagePath: "",
    title: "Grammar 2: Have to / Don't Have To + Writing: Email Giving Advice",
    exercises: [
      {
        id: "p100-ex8",
        title: "Exercise 8: Read the sentences and underline the correct answer (have to/don't have to)",
        type: "fill-blank",
        questionText: "1. We (have to / don't have to) arrive to school on time. It's one of the school's rules. 2. The deadline for our homework isn't until next week, so we (have to / don't have to) do it tonight. 3. (Do you have to / Don't you have to) play sport at school? 4. He didn't go to school yesterday, so he (have to / has to) give the teacher a doctor's note. 5. We (don't have to / doesn't have to) study languages but my teacher recommends it.",
        correctAnswers: ["don't have to", "don't have to", "Do you have to", "has to", "don't have to"],
        placeholder: "1. don't have to, 2. don't have to..."
      },
      {
        id: "p100-ex9-q1",
        title: "Exercise 9.1: Read Helen's email. What activities does she say are a good idea?",
        type: "fill-blank",
        questionText: "Helen's email to Alice recommends activities to be healthy. What activities does Helen say are a good idea?",
        correctAnswers: ["Playing tennis or basketball; getting enough sleep (7-10 hours); taking regular breaks; eating lots of fruit and vegetables; getting lots of regular exercise."],
        placeholder: "List the activities Helen recommends..."
      },
      {
        id: "p100-ex9-q2",
        title: "Exercise 9.2: Write an email in reply to your friend Alice giving health advice",
        type: "text-area",
        questionText: "Write an email (80-100 words) that: says what activities Alice can do to stay healthy, includes types of healthy activities and ways to relax, says why it is important to stay healthy. Use should/shouldn't/should not and have to/don't have to.",
        correctAnswers: ["Open writing practice — 80-100 word email using should/shouldn't and have to/don't have to correctly."],
        placeholder: "Hi Alice, I think it's a good idea to..."
      }
    ]
  },
  {
    pageNumber: 101,
    imagePath: "",
    title: "Unit 08 Grammar and Vocabulary Practice",
    exercises: [
      {
        id: "p101-ex1",
        title: "Exercise 1: Match the sporting activities with the pictures",
        type: "matching",
        questionText: "Match: play basketball, do yoga, do exercise, play tennis, go for a walk, go cycling — to pictures 1-6.",
        correctAnswers: ["1 → play basketball", "2 → do yoga", "3 → do exercise", "4 → play tennis", "5 → go for a walk", "6 → go cycling"],
        placeholder: "1. play basketball, 2. do yoga..."
      },
      {
        id: "p101-ex2",
        title: "Exercise 2: Complete the sentences with the correct form of the verbs in the box",
        type: "fill-blank",
        questionText: "Verbs: get(x3), drink(x2), do(x2), eat, have, join, go(x2), play(x2). 1. It can be expensive to ___ a gym, but they often have a lot of modern equipment. 2. It is very important to ___ plenty of water whenever you ___ exercise. 3. ___ lots of fruit and vegetables and ___ yoga twice a week. 4. I like to ___ running in the park so I can ___ some fresh air. 5. It is a good idea to ___ a personal trainer to ___ advice. 6. ___ tennis three times a week and ___ for walks in the park. 7. It is important to ___ lots of sleep every night. 8. When you ___ green tea, it can help you relax. 9. Many young people ___ a sport or do exercise at school.",
        correctAnswers: ["join", "drink", "do", "eat", "do", "go", "get", "join", "get", "play", "go", "get", "drink", "play"],
        placeholder: "1. join, 2. drink, do..."
      }
    ]
  },
  {
    pageNumber: 102,
    imagePath: "",
    title: "Unit 08 Practice: Should/Shouldn't Dialogues",
    exercises: [
      {
        id: "p102-ex13",
        title: "Exercise 13: Decide if the sentences are correct or incorrect and correct the mistakes",
        type: "table-matching",
        questionText: "1. A: What you should eat to be healthy? 2. A: Is it important to exercise? B: Yes, you should exercise for at least 150 minutes a week. 3. A: Is it a good idea to play computer games for many hours? B: No, you shouldn't play on your computer for so long. 4. A: Do you have any other advice? B: I think you should find ways to relax. 5. A: What is the best way to relax? B: I like doing yoga. I think you shouldn't try it.",
        correctAnswers: ["1. ✗ — should be 'What should you eat to be healthy?'", "2. ✓ correct", "3. ✓ correct", "4. ✓ correct", "5. ✗ — should be 'I think you should try it' (positive recommendation, not 'shouldn't')"],
        placeholder: "1. ✓/✗, 2. ✓/✗..."
      },
      {
        id: "p102-ex14",
        title: "Exercise 14: Complete the conversation using should/shouldn't/should not and a verb in the box",
        type: "fill-blank",
        questionText: "Verbs: eat, drink, play, ride, watch, get. A: Do you know we (1) ___ five glasses of water a day? B: That's a good idea. I always think I (2) ___ more sleep. A: We (3) ___ more than two to three hours of TV a day. B: What activities are good? A: You (4) ___ sport at school if you like it. If not, you (5) ___ a bicycle or walk to school. A: We (6) ___ eat fast food more than once a week.",
        correctAnswers: ["should drink", "should get", "shouldn't watch", "should play", "should ride", "shouldn't eat"],
        placeholder: "1. should drink, 2. should get..."
      }
    ]
  },
  {
    pageNumber: 103,
    imagePath: "",
    title: "Unit 08 Practice: Have to / Don't Have To Review",
    exercises: [
      {
        id: "p103-ex15",
        title: "Exercise 15: Underline the correct answer (have to/don't have to)",
        type: "fill-blank",
        questionText: "1. We (have to / don't have to) wear sports clothes during sport lessons otherwise we can't take part. 2. You (have to / don't have to) pass a swimming test to be a lifeguard. 3. You (have to / don't have to) be fit to do yoga because anyone can try it. 4. You (have to / don't have to) spend a lot of money to stay healthy — running in the park is free. 5. We (have to / don't have to) wear special shoes when we play football. 6. You (have to / don't have to) join the gym to take exercise classes, but they cost less for members. 7. Professional sports players (have to / don't have to) practise at least three hours a day. 8. You (have to / don't have to) be good at sports to stay fit, but regular activity is good for you.",
        correctAnswers: ["have to", "have to", "don't have to", "don't have to", "have to", "don't have to", "have to", "don't have to"],
        placeholder: "1. have to, 2. have to, 3. don't have to..."
      },
      {
        id: "p103-ex16",
        title: "Exercise 16: Complete the texts using has to / have to / doesn't have to / don't have to",
        type: "fill-blank",
        questionText: "1. We ___ turn off our mobile phones before the lesson. However, we ___ wear school uniform every day. 2. Students ___ come into class every morning. It is their choice. However, if they are going to be late, they ___ send an email to their teacher.",
        correctAnswers: ["have to", "don't have to", "don't have to", "have to"],
        placeholder: "1. have to, don't have to..."
      },
      {
        id: "p103-ex17",
        title: "Exercise 17: Complete the dialogue using should/shouldn't/should not",
        type: "fill-blank",
        questionText: "A: I enjoy playing tennis but I want to improve. What (1) ___ I do? B: My advice is you (2) ___ practise as much as possible. A: Twice a week. Is that enough? B: No, I suggest you (3) ___ train more often. A: I know I (4) ___ have rest days. Do I need to play every day? B: Maybe not every day, but you (5) ___ just play twice a week — that's not enough. I think you (6) ___ have tennis lessons.",
        correctAnswers: ["should", "should", "should", "shouldn't", "shouldn't", "should"],
        placeholder: "1. should, 2. should, 3. should..."
      },
      {
        id: "p103-ex18",
        title: "Exercise 18: Match the two halves of the sentences",
        type: "matching",
        questionText: "1. It is a good idea to pay... 2. Joining the gym... 3. It is more fun when you go... 4. It is important to follow... 5. I think it's better to do... 6. Running is a...",
        options: ["A. great way to keep fit.", "B. a healthy diet.", "C. for a personal trainer.", "D. running with other people.", "E. can be expensive.", "F. yoga than go to the gym."],
        correctAnswers: ["1-C", "2-E", "3-D", "4-B", "5-F", "6-A"]
      }
    ]
  }
];
