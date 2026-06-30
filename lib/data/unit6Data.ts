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

export const unit6Pages: TextbookPage[] = [
  {
    pageNumber: 72,
    imagePath: "",
    title: "Reading and Vocabulary: Places in a City",
    exercises: [
      {
        id: "p72-ex4",
        title: "Exercise 4: Complete the table with Places in a city / Travel and transport",
        type: "table-matching",
        questionText: "Sort the words into 'Places in a city' and 'Travel and transport': square, motorway, motorbike, ticket, platform, post office, shopping centre, car park, library, sports centre, restaurant, coach, cafe, police station, department store, the underground.",
        correctAnswers: [
          "Places in a city: square, post office, shopping centre, car park, library, sports centre, restaurant, cafe, police station, department store",
          "Travel and transport: motorway, motorbike, ticket, platform, coach, the underground"
        ],
        placeholder: "Places in a city: ..., Travel and transport: ..."
      },
      {
        id: "p72-ex5",
        title: "Exercise 5: Read the signs and notices. Add the blue words to the table",
        type: "fill-blank",
        questionText: "Read the short real-world texts (parking sign, messages, emails, station notice). Identify the key words about places and transport mentioned in them.",
        correctAnswers: ["car park", "bus", "town centre", "flight", "train station", "bicycle stands"],
        placeholder: "e.g. car park, bus..."
      },
      {
        id: "p73-ex6",
        title: "Exercise 6: Choose the correct answer about the signs and messages",
        type: "multiple-choice",
        questionText: "1. What does the supermarket notice say? 2. Why did Harry write the message about football? 3. What is the train notice telling passengers?",
        options: [
          "A. Free parking for 2 hours, then £2 an hour",
          "B. To invite Tom to play football",
          "C. Trains are delayed because of snow"
        ],
        correctAnswers: ["A", "B", "C"]
      }
    ]
  },
  {
    pageNumber: 75,
    imagePath: "",
    title: "Listening, Speaking and Grammar: Comparatives & Superlatives",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S2.m4a",
    exercises: [
      {
        id: "p74-ex8",
        title: "Exercise 8: Listen and complete Northfields' shopping centre information",
        type: "fill-blank",
        questionText: "Listen to Part 1: Name of architect who designed Northfields, address/postcode, opening hours, late night shopping day, transport options (car park, buses, underground).",
        correctAnswers: ["John", "Forest Drive", "10am to 9pm", "Thursday", "free car park", "frequent buses"],
        placeholder: "Architect: ..., Late night shopping: ..."
      },
      {
        id: "p74-ex9",
        title: "Exercise 9: Match the shops to the correct letter on the map",
        type: "matching",
        questionText: "Match: 1. cinema, 2. supermarket, 3. Green's department store, 4. pharmacy, 5. book store, 6. mobile phone shop to letters A-F on the shopping centre map.",
        correctAnswers: ["cinema → A", "supermarket → B", "Green's department store → C", "pharmacy → D", "book store → E", "mobile phone shop → F"],
        placeholder: "1. A, 2. B, 3. C..."
      },
      {
        id: "p75-ex13",
        title: "Exercise 13: Write the comparative and superlative forms of the adjectives",
        type: "grammar-table",
        questionText: "Complete the comparative/superlative table for: tall, famous, hot, busy, interesting, friendly, old, thin.",
        correctAnswers: [
          "tall → taller → tallest",
          "famous → more famous → most famous",
          "hot → hotter → hottest",
          "busy → busier → busiest",
          "interesting → more interesting → most interesting",
          "friendly → friendlier → friendliest",
          "old → older → oldest",
          "thin → thinner → thinnest"
        ],
        placeholder: "tall: taller, tallest..."
      },
      {
        id: "p75-ex12",
        title: "Exercise 12: Ask and answer questions about the map using comparatives",
        type: "text-area",
        questionText: "Work in pairs. Use the shopping centre map to ask and answer questions, e.g. 'Where can I buy a tennis racket?' / 'Where's the bank?' using location prepositions (opposite, between, on the ground floor).",
        correctAnswers: ["At the sports shop. It's on the ground floor opposite the cafe.", "It's between the department store and the mobile phone shop."],
        placeholder: "A: Where's the bank? B: It's between..."
      }
    ]
  },
  {
    pageNumber: 78,
    imagePath: "",
    title: "Grammar and Vocabulary: Comparative Adjectives",
    exercises: [
      {
        id: "p76-ex14",
        title: "Exercise 14: Underline the correct comparative/superlative form about Manchester",
        type: "fill-blank",
        questionText: "1. Manchester is the UK's fifth largest city. 2. Manchester has more students than any other city. 3. Chetham's Library is the oldest public library in the English-speaking world. 7. Manchester airport is larger than Birmingham airport. 9. Manchester Piccadilly is one of the busiest train stations in England.",
        correctAnswers: ["largest", "more", "oldest", "More", "first", "best", "larger", "most successful", "busiest", "More"],
        placeholder: "1. largest, 2. more, 3. oldest..."
      },
      {
        id: "p79-ex15",
        title: "Exercise 15: Underline the correct adjective",
        type: "fill-blank",
        questionText: "Sally and her friend had nothing to do and felt a bit (bored / sorry / heavy). They went to the shopping centre to get some (latest / new / early) clothes. It had all of Sally's (popular / favourite / great) shops. The centre was (full / busy / crowded) of people.",
        correctAnswers: ["bored", "new", "favourite", "crowded", "careful", "tired", "healthy"],
        placeholder: "1. bored, 2. new, 3. favourite..."
      },
      {
        id: "p80-ex19",
        title: "Exercise 19: Complete sentences with comparative adjectives about three cars",
        type: "fill-blank",
        questionText: "Look at the three cars (2010/2009/2015 models). 1. Car A is ___ (cheap). 2. Car B has ___ (many) doors. 3. Car C has the ___ (large) engine. 5. Car C is the ___ (expensive).",
        correctAnswers: ["cheaper", "more", "largest", "more", "most expensive", "smaller", "older"],
        placeholder: "1. cheaper, 2. more, 3. largest..."
      },
      {
        id: "p77-ex18",
        title: "Exercise 18: Speaking - Talking about transport and your hometown",
        type: "text-area",
        questionText: "In pairs, ask and answer questions about transport (how you travelled today, traffic problems, best way to travel) and your hometown (most interesting places, oldest part of town) using comparative and superlative adjectives.",
        correctAnswers: ["Open speaking practice — use vocabulary from the unit and comparative/superlative adjectives."],
        placeholder: "Write your answers using comparative/superlative adjectives..."
      }
    ]
  }
];
