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

export const unit4Pages: TextbookPage[] = [
  {
    pageNumber: 48,
    imagePath: "/book/mindset-foundation/unit_4/page_049.png",
    title: "Travel (Lead-in & Vocabulary)",
    exercises: [
      {
        id: "p48-ex1",
        title: "Exercise 1: Match the holiday words (1-8) to the pictures (A-H)",
        type: "fill-blank",
        questionText: "Match the words: activity holiday, beach holiday, camping holiday, city break, cruise, sightseeing holiday, safari, backpacking holiday. Enter your matching sequence corresponding to pictures A to H:",
        correctAnswers: ["safari, cruise, backpacking holiday, camping holiday, sightseeing holiday, activity holiday, beach holiday, city break"],
        placeholder: "e.g. safari, cruise..."
      },
      {
        id: "p48-ex2",
        title: "Exercise 2: Complete the sentences with words from Exercise 1",
        type: "fill-blank",
        questionText: "1. I love animals, so I want to go on a [safari] in Kenya next year.\n2. We want to see some historical buildings, so we are going on a [sightseeing holiday] in Rome.\n3. My parents are going on a [cruise] on a large ship to see the Caribbean islands.\n4. I want to go on an [activity holiday] to learn how to sail, climb and windsurf.\n5. We don't have much money, so we are going on a [camping holiday] with our tent.\n6. I am planning a [backpacking holiday] through Southeast Asia with a large bag on my back.",
        correctAnswers: ["safari", "sightseeing holiday", "cruise", "activity holiday", "camping holiday", "backpacking holiday"],
        placeholder: "1. safari, 2. sightseeing holiday..."
      }
    ]
  },
  {
    pageNumber: 49,
    imagePath: "/book/mindset-foundation/unit_4/page_050.png",
    title: "Reading: Identifying the main idea",
    exercises: [
      {
        id: "p49-ex3",
        title: "Exercise 3: Read paragraph A of the text. Choose the correct statement",
        type: "multiple-choice",
        questionText: "Which statement best describes paragraph A?",
        options: [
          "A. The paragraph is about different ways of travelling.",
          "B. The paragraph is about the history of holidaymaking.",
          "C. The paragraph is about why people go on holiday."
        ],
        correctAnswers: ["B"]
      },
      {
        id: "p49-ex4",
        title: "Exercise 4: Match paragraphs B-F to headings 1-6. There is one extra heading",
        type: "fill-blank",
        questionText: "Match headings 1-6 to Paragraphs B, C, D, E, F:\nHeadings:\n1. The package holiday arrives\n2. The cost of travel today\n3. An increase in car ownership\n4. Holidays in Roman times\n5. Rail travel makes holidaymaking popular\n6. Modern holidaymakers can choose where they want to go",
        correctAnswers: ["5", "3", "1", "6"], // B -> 5, C -> 3, D -> 1, E -> 6 (based on textbook mapping)
        placeholder: "B: 5, C: 3..."
      }
    ]
  },
  {
    pageNumber: 50,
    imagePath: "/book/mindset-foundation/unit_4/page_051.png",
    title: "Listening: Map Labelling",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S2.m4a", // Optional placeholder for unit 4 audio
    exercises: [
      {
        id: "p50-ex6",
        title: "Exercise 6: Listen and identify the places on the map (1-5)",
        type: "fill-blank",
        questionText: "Listen and write the names of the places labelled 1 to 5 on the map (Information Desk, Ticket Office, Waiting Room, Toilets, Café):",
        correctAnswers: ["Café, Waiting Room, Ticket Office, Information Desk, Toilets"],
        placeholder: "1. Café, 2. Waiting Room..."
      }
    ]
  },
  {
    pageNumber: 53,
    imagePath: "/book/mindset-foundation/unit_4/page_054.png",
    title: "Grammar: Past Simple",
    exercises: [
      {
        id: "p53-ex8",
        title: "Exercise 8: Write the past simple form of these verbs and mark them as Regular (R) or Irregular (I)",
        type: "fill-blank",
        questionText: "Write past form (R/I) for: 1. arrive, 2. decide, 3. fall, 4. feel, 5. find, 6. get, 7. go, 8. lose, 9. make, 10. meet, 11. miss, 12. pack, 13. see, 14. start, 15. take, 16. travel",
        correctAnswers: [
          "arrived (R)", "decided (R)", "fell (I)", "felt (I)", "found (I)", "got (I)", "went (I)", "lost (I)", "made (I)", "met (I)", "missed (R)", "packed (R)", "saw (I)", "started (R)", "took (I)", "travelled (R)"
        ],
        placeholder: "1. arrived (R), 2. decided (R)..."
      },
      {
        id: "p53-ex9",
        title: "Exercise 9: Complete the text with the past simple form of the verbs in brackets",
        type: "fill-blank",
        questionText: "Last year, my family and I [1. go] to Paris. We [2. travel] by train. We [3. stay] in a small hotel. We [4. see] the Eiffel Tower and [5. visit] many museums. I [6. buy] some nice souvenirs.",
        correctAnswers: ["went", "travelled", "stayed", "saw", "visited", "bought"],
        placeholder: "1. went, 2. travelled..."
      }
    ]
  },
  {
    pageNumber: 55,
    imagePath: "/book/mindset-foundation/unit_4/page_056.png",
    title: "Writing & Check",
    exercises: [
      {
        id: "p55-ex10",
        title: "Exercise 10: Correct the spelling and grammar mistakes in the email",
        type: "fill-blank",
        questionText: "Correct: 'Yesterday I go to the market and buyed a beautiful dress. It was very cheap but is very nice.'",
        correctAnswers: ["Yesterday I went to the market and bought a beautiful dress. It was very cheap but was very nice."],
        placeholder: "Corrected sentence..."
      }
    ]
  }
];
