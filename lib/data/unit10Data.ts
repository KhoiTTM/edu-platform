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

export const unit10Pages: TextbookPage[] = [
  {
    pageNumber: 115,
    imagePath: "",
    title: "Vocabulary: Types of Technology",
    exercises: [
      {
        id: "p115-ex1",
        title: "Exercise 1: Match the technology words with the pictures",
        type: "matching",
        questionText: "Match: desktop computer, laptop, smartphone, letter, tablet, landline telephone, smart TV, smart watch — to pictures 1-8.",
        correctAnswers: ["1 → desktop computer", "2 → laptop", "3 → smartphone", "4 → letter", "5 → tablet", "6 → landline telephone", "7 → smart TV", "8 → smart watch"],
        placeholder: "1. desktop computer, 2. laptop..."
      },
      {
        id: "p115-speaking",
        title: "Speaking: Discuss which technology you use for studying, contacting friends, and searching the internet",
        type: "text-area",
        questionText: "Which device(s) do you use for: studying? contacting friends? searching the internet? Example: 'I use my smartphone to contact my friends. I can call or message them.'",
        correctAnswers: ["Open speaking practice — discuss device use for studying, contacting friends, and searching the internet."],
        placeholder: "I use my... to..."
      }
    ]
  },
  {
    pageNumber: 116,
    imagePath: "",
    title: "Vocabulary and Reading: How the Internet Works",
    exercises: [
      {
        id: "p116-ex3",
        title: "Exercise 3: Underline the correct spellings",
        type: "fill-blank",
        questionText: "1. My computer (crushed / crashed / crached) and I lost my homework. 2. You need to (shout down / shot down / shut down) your laptop when you finish. 3. There are some excellent (wepsites / websites / websides) that can help you study. 4. I own three (devices / advices / divises). 5. The computers at school are all connected to the same (netwalk / netwok / network).",
        correctAnswers: ["crashed", "shut down", "websites", "devices", "network"],
        placeholder: "1. crashed, 2. shut down, 3. websites..."
      },
      {
        id: "p116-ex4",
        title: "Exercise 4: Complete the sentences using the correct words in the box",
        type: "fill-blank",
        questionText: "Words: attachments, backup, download, store, stream. 1. If you don't know who sent you the email, it isn't a good idea to open the ___. 2. I often ___ music from the internet. 3. You can ___ films online a few months after they are released. 4. You should create a ___ of your files. 5. The cloud is where you can ___ your files.",
        correctAnswers: ["attachments", "download", "stream", "backup", "store"],
        placeholder: "1. attachments, 2. download, 3. stream..."
      },
      {
        id: "p116-ex5",
        title: "Exercise 5: Skim the article about the internet. What is the best title, A, B or C?",
        type: "multiple-choice",
        questionText: "A. New developments on the internet / B. How people communicate on the internet / C. Why people use the internet",
        options: ["A. New developments on the internet", "B. How people communicate on the internet", "C. Why people use the internet"],
        correctAnswers: ["B. How people communicate on the internet"]
      }
    ]
  },
  {
    pageNumber: 117,
    imagePath: "",
    title: "Reading: Paraphrasing Practice — Servers and Clients",
    exercises: [
      {
        id: "p117-ex6",
        title: "Exercise 6: Complete the paraphrased sentences using ONE to THREE words",
        type: "fill-blank",
        questionText: "1. All the computers connected to the internet are doing ___ at the same time (paraphrase of 'they don't all do the same thing'). 2. You can send and receive emails using a ___ server. 3. The client ___ from one computer to another using a server. 4. Your smartphone becomes the client when you use it ___. 5. The client finds the photo by ___ from the server.",
        correctAnswers: ["different things", "mail", "sends/delivers information", "online / to go online", "searching / requesting information"],
        placeholder: "1. different things, 2. mail, 3. sends information..."
      }
    ]
  },
  {
    pageNumber: 118,
    imagePath: "",
    title: "Listening: A Lecture About Smartphones",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S2.m4a",
    youtubeId: "wr8M6uUzHnY",
    exercises: [
      {
        id: "p117-ex61",
        title: "Exercise: Reorder the letters to complete parts of a smartphone",
        type: "fill-blank",
        questionText: "Reorder the letters: 1. display (SLPIYA), 2. power button (REwo/TOTnU), 3. USB (TuPn), 4. microphone (RENOPICHO), 5. power bar (WORE/RA), 6. case (SAE).",
        correctAnswers: ["display", "power button", "(USB) port", "microphone", "power bar", "case"],
        placeholder: "1. display, 2. power button..."
      },
      {
        id: "p118-ex8",
        title: "Exercise 8-9: Listen to Part 1 & 2 of the lecture and complete the tables",
        type: "fill-blank",
        questionText: "Part 1: complete reasons why a smartphone has each part (touch screen/display, power button, USB port, microphone, power bar, case) using TWO to THREE words. Part 2: complete the % of population with smartphones for 2010, 2015, 2020, 2025.",
        correctAnswers: ["Open listening practice — reasons and percentages depend on lecture audio."],
        placeholder: "2010: ...%, 2015: ...%, 2020: ...%, 2025: ...%"
      }
    ]
  },
  {
    pageNumber: 119,
    imagePath: "",
    title: "Grammar: Will for Future Predictions",
    exercises: [
      {
        id: "p118-ex10",
        title: "Exercise 10: Listen again to Part 2 and complete the will/won't grammar tables",
        type: "grammar-table",
        questionText: "Complete tables for: positive statements (Person + will + verb), negative statements (Person + will not/won't + verb), questions (Will + person + verb...?), and wh-questions (Question word + will + person + verb...?) based on the lecturer's predictions.",
        correctAnswers: ["Open grammar listening practice — fill will/won't forms based on lecture audio."],
        placeholder: "Positive: ... will ..., Negative: ... won't ..."
      },
      {
        id: "p119-ex12",
        title: "Exercise 12: Complete the chart describing changes (verb infinitive / past / noun)",
        type: "grammar-table",
        questionText: "Based on Michael's school report (maths rose from 74% to 82%, English went up from C to A, science fell from 92% to 86%, business decreased from 78% to 72%), complete the chart: rise/rose/a rise, increase/increased/an increase, go up/went up/a rise, fall/fell/a fall, decrease/decreased/a decrease, go down/went down/a decrease.",
        correctAnswers: [
          "rise → rose → a rise",
          "increase → increased → an increase",
          "go up → went up → a rise",
          "fall → fell → a fall/decrease",
          "decrease → decreased → a decrease",
          "go down → went down → a decrease"
        ],
        placeholder: "rise: rose, a rise..."
      },
      {
        id: "p119-ex14",
        title: "Exercise 14: Read the description of smartphone ownership growth and choose A, B or C",
        type: "multiple-choice",
        questionText: "The percentage of people with smartphones (0) ___ from 38% in 2010 (1) ___ 62% in 2015. In the future, this (2) ___ (3) ___ rise. At the end of the period in 2025, this percentage will (4) ___ on 86%.",
        options: ["0: A. increased / B. increase / C. increasing", "1: A. at / B. from / C. to", "2: A. to / B. by / C. at", "3: A. rised / B. rose / C. rise", "4: A. to continue / B. continue / C. continuing", "5: A. finish / B. finishing / C. be finish"],
        correctAnswers: ["0. A. increased", "1. B. from", "2. (to) — connects to 62%", "3. C. rise", "4. B. continue", "5. A. finish"]
      }
    ]
  },
  {
    pageNumber: 120,
    imagePath: "",
    title: "Writing: Describing a Graph",
    exercises: [
      {
        id: "p120-ex15",
        title: "Exercise 15: Describe how each line in the device-ownership graph changes (2010-2025)",
        type: "text-area",
        questionText: "Using the line graph of device ownership percentages (Smartphone, Laptop, Smart watch, Tablet from 2010-2025), describe the trend for: 1. Smartphone, 2. Laptop, 3. Smart watch, 4. Tablet — using rise/increase/fall/decrease vocabulary.",
        correctAnswers: ["Open writing practice — describe each line's trend using rise/fall vocabulary and will for future prediction."],
        placeholder: "1. Smartphone ownership will... 2. Laptop ownership..."
      }
    ]
  },
  {
    pageNumber: 121,
    imagePath: "",
    title: "Listening 2 and Speaking: Describing a Gadget",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
    youtubeId: "ZN_why11kpc",
    exercises: [
      {
        id: "p120-ex18",
        title: "Exercise 18: Match the underlined words in Lorenzo's answers with the definitions",
        type: "matching",
        questionText: "1. Important and interesting parts of a device. 2. The newest device you can buy. 3. To move your finger from one side to the other on a device. 4. A device that is old. 5. The part of a device that stores data.",
        correctAnswers: ["1 → features", "2 → latest model", "3 → swipe", "4 → outdated/old model", "5 → memory"],
        placeholder: "1. features, 2. latest model..."
      },
      {
        id: "p120-ex19",
        title: "Exercise 19: Listen and match the questions with Lorenzo's answers (write 1-4)",
        type: "matching",
        questionText: "A. How will it make your life better? B. How much does it cost? C. Where do you want to buy it from? D. What does it look like? E. Why do you want to buy it? F. Why is it so popular? (There are two extra questions.)",
        correctAnswers: ["Open listening practice — match 4 of the 6 questions (A-F) to Lorenzo's numbered answers based on audio."],
        placeholder: "A: 1/2/3/4/none, B: ..., C: ..., D: ..., E: ..., F: ..."
      },
      {
        id: "p121-ex20",
        title: "Exercise 20-22: Speak about a piece of technology you would like to buy in the future",
        type: "text-area",
        questionText: "Describe a piece of technology that you would like to buy in the future. You should say: what it is, what it looks like, why you want to buy it, how it will make your life better. Give a one-minute talk using will for future predictions.",
        correctAnswers: ["Open speaking practice — one-minute talk describing a future gadget purchase using will/won't."],
        placeholder: "I would like to buy... It will... because..."
      }
    ]
  },
  {
    pageNumber: 122,
    imagePath: "",
    title: "Unit 10 Grammar and Vocabulary Practice",
    exercises: [
      {
        id: "p122-ex1",
        title: "Exercise 1: Underline the correct answer",
        type: "fill-blank",
        questionText: "1. My brother (streams / stores) his files on his computer but doesn't back them up. 2. You can connect a series of computers together on a (website / network). 3. I prefer to use a (laptop / desktop computer) as I can work from anywhere. 4. Stop playing games! (Shut down / Crash) your computer right now! 5. I don't like paying for (attachments / apps), but it can cause problems if you only download backup them for free.",
        correctAnswers: ["stores", "network", "laptop", "Shut down", "apps"],
        placeholder: "1. stores, 2. network, 3. laptop..."
      },
      {
        id: "p122-ex2",
        title: "Exercise 2: Complete the sentences with the words in the box (definitions)",
        type: "fill-blank",
        questionText: "Words: stream, website, device, crash, attachment, backup. 1. A set of pages of information on the internet about a subject = ___. 2. A copy of files you keep in a different place = ___. 3. A machine, like a smartphone, that connects to the internet = ___. 4. A file you add to an email before sending = ___. 5. This happens when your computer suddenly stops working = ___. 6. Music or video you watch without downloading first = ___.",
        correctAnswers: ["website", "backup", "device", "attachment", "crash", "stream"],
        placeholder: "1. website, 2. backup, 3. device..."
      },
      {
        id: "p122-ex3",
        title: "Exercise 3: Complete the future interview using the words given",
        type: "fill-blank",
        questionText: "How (0) ___ (people / travel) around in the future? B: In cars that don't have anybody driving. A: Isn't that dangerous? B: No, the cars (1) ___ (communicate) with each other. There (2) ___ (are not) any crashes ever again. (3) ___ (the cars / able to) fly? And what (4) ___ (people / eat)? We (5) ___ (definitely need) more space for animals. I'm not sure that (6) ___ (be) possible. How (7) ___ (the animals / breathe) on the moon?",
        correctAnswers: ["will people travel", "will communicate", "won't be / will not be", "Will the cars be able to", "will people eat", "will definitely need", "will be / that will", "will the animals breathe"],
        placeholder: "0. will people travel, 1. will communicate..."
      }
    ]
  },
  {
    pageNumber: 123,
    imagePath: "",
    title: "Unit 10 Practice: Describing Graph Changes",
    exercises: [
      {
        id: "p123-ex4",
        title: "Exercise 4: Match each sentence about changes to the correct part of Line A's graph",
        type: "matching",
        questionText: "Sentences: 1. It increased from 10% to 40%. 2. This rise will continue after 2025. 3. It decreased by 15%. 4. It fell by 30%. 5. It will finish on 65%. 6. It went up from 40% to 50%. 7. It will fall again after 2020. 8. There will be a rise of 55%. 9. It went down by 5%. 10. There was an increase of 35%. (There are extra sentences — match only those that fit Line A's actual shape.)",
        correctAnswers: ["Open reading/graph practice — match sentences 1-10 to Line A's segments; some are distractors that don't match the graph."],
        placeholder: "Matches: 1, 4, 6, ... (identify which apply to Line A)"
      },
      {
        id: "p123-ex5",
        title: "Exercise 5: Complete the description of changes to Line B using the words in the box",
        type: "fill-blank",
        questionText: "Words: fall, down, rise, decrease, went, increased. After it (1) ___ from 30% in 2005 to (2)/(3) ___ in 2010, line B (4) ___ up by another 20% between 2010 and 2015 — its highest point. It started to (5) ___ in 2015, going (6) ___ to 40% in 2020. It will (8) ___ rise to 50% in 2025, and then will (9) ___ to 45% in 2030.",
        correctAnswers: ["increased", "rise", "50%", "went", "fall", "down", "rise", "decrease"],
        placeholder: "1. increased, 2-3. rise to 50%, 4. went..."
      }
    ]
  },
  {
    pageNumber: 124,
    imagePath: "",
    title: "Unit 10 Practice: Graph Summary + Email Vocabulary Review",
    exercises: [
      {
        id: "p124-ex6",
        title: "Exercise 6: Which is the best summary, A, B or C, for the two-line graph?",
        type: "multiple-choice",
        questionText: "A. Both lines went up and down a lot. Line A changed much more than Line B. B. The biggest changes for Line A will happen in the last ten years shown. However, Line B had its most important changes earlier, especially between 2005 and 2015. C. Line A went up to 40% in 2010, then down to 20% by 2020, then up to 75% in 2025 and back to 65%. Line B increased to 75% in 2015, then down to 40% in 2020. It didn't change much after that.",
        options: ["A", "B", "C"],
        correctAnswers: ["B"]
      },
      {
        id: "p124-ex7",
        title: "Exercise 7: Underline the correct word in Grandad's email about buying a smartphone",
        type: "fill-blank",
        questionText: "1. I have some news - (I will / I'm going to / I going to) buy a smartphone. 2. Your mum told me you have the (latest model / later modern / late model). 3. I don't mind if it's a bit (out of order / out of time / out of date). 4. I see a lot of advertisements for phones with great (features / devices / websites). 5. It will be strange to play cards by (swiping / sweeping / swapping) a (6. charger / screen / case). 7. Your smartphone has a lot of (memory / memories / memry). 8. You have a lot of space to (stand / store / shop) apps. 9. I know your phone has a silver (case / screen / battery) but I would prefer mine in black.",
        correctAnswers: ["I'm going to", "latest model", "out of date", "features", "swiping", "screen", "memory", "store", "case"],
        placeholder: "1. I'm going to, 2. latest model, 3. out of date..."
      }
    ]
  }
];
