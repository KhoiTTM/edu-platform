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

export const unit5Pages: TextbookPage[] = [
  {
    pageNumber: 60,
    imagePath: "", // Keep for interface compatibility, though we render flipbook iframe
    title: "Vocabulary and Reading: Food Festival",
    exercises: [
      {
        id: "p60-ex4",
        title: "Exercise 4: Which of these might you see at a food festival?",
        type: "fill-blank",
        questionText: "Look at the ideas below. Which do you think you might see at a food festival? Food stalls, Traditional activities, Famous chefs, Arts and crafts, Fairground rides.",
        correctAnswers: ["Food stalls", "Traditional activities", "Famous chefs", "Arts and crafts"],
        placeholder: "e.g. Food stalls, Famous chefs..."
      },
      {
        id: "p60-ex5",
        title: "Exercise 5: Skim the article. Which ideas from Exercise 4 does it mention?",
        type: "multiple-choice",
        questionText: "The Chinese Food Festival in London takes place at the South Bank Riverside Walkway. Which ideas does the article mention?",
        options: [
          "A. Food stalls and famous chefs",
          "B. Fairground rides only",
          "C. Arts and crafts only"
        ],
        correctAnswers: ["A"]
      },
      {
        id: "p61-ex6",
        title: "Exercise 6: Correct the false statements about the festival",
        type: "fill-blank",
        questionText: "The information in bold in the sentences is incorrect. Correct the sentences by choosing the best answer based on the article (festival location, dates, free tickets).",
        correctAnswers: ["The festival is at the South Bank Riverside Walkway", "The festival starts on 25th September", "Tickets are free from the website"],
        placeholder: "Corrected sentence..."
      }
    ]
  },
  {
    pageNumber: 64,
    imagePath: "",
    title: "Grammar and Speaking: Countable & Uncountable Nouns",
    audioUrl: "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
    exercises: [
      {
        id: "p62-ex10",
        title: "Exercise 10: Match the food words to the correct category",
        type: "table-matching",
        questionText: "Sort these words into Meat, Vegetables, Fish/Seafood, Carbohydrates, Other ingredients: lamb, onion, pasta, flour, salmon, garlic, carrot, rice, spring onion.",
        correctAnswers: ["Meat: lamb", "Vegetables: onion, garlic, carrot, spring onion", "Fish/Seafood: salmon", "Carbohydrates: pasta, flour, rice"],
        placeholder: "Meat: ..., Vegetables: ..., Fish/Seafood: ..., Carbohydrates: ..."
      },
      {
        id: "p64-ex16",
        title: "Exercise 16: Sort ingredients into Countable (singular), Countable (plural), Uncountable",
        type: "table-matching",
        questionText: "Classify: (an) apple, (a) cabbage, (some) flour, (some) meat, (some) milk, onion(s), orange(s), potato(es), (some) rice, (some) salt, shrimp(s), (some) water.",
        correctAnswers: ["Countable (singular): an apple, a cabbage", "Countable (plural): onions, oranges, potatoes, shrimps", "Uncountable: flour, meat, milk, rice, salt, water"],
        placeholder: "Countable (singular): ..., Countable (plural): ..., Uncountable: ..."
      },
      {
        id: "p64-ex17",
        title: "Exercise 17: Complete the rules using a/an or some",
        type: "fill-blank",
        questionText: "1. For singular countable nouns, we use ___ before the word (e.g. a cabbage).\n2. For plural countable nouns, we can use ___ before the word and usually add an 's' (e.g. dumplings).\n3. For uncountable nouns, we use ___ before the word (e.g. milk).",
        correctAnswers: ["a/an", "some", "some"],
        placeholder: "1. a/an, 2. some, 3. some"
      },
      {
        id: "p64-ex18",
        title: "Exercise 18: Classify sentences under Countable nouns / Uncountable nouns",
        type: "fill-blank",
        questionText: "Sort: 'We have some apples', 'We have some rice', 'We don't have any cabbages', 'We don't have any milk', 'Do you have any onions?', 'Do you have any meat?'",
        correctAnswers: ["Countable nouns: We have some apples, We don't have any cabbages, Do you have any onions?", "Uncountable nouns: We have some rice, We don't have any milk, Do you have any meat?"],
        placeholder: "Countable nouns: ..., Uncountable nouns: ..."
      }
    ]
  },
  {
    pageNumber: 67,
    imagePath: "",
    title: "Grammar and Vocabulary: Cooking Methods",
    exercises: [
      {
        id: "p67-ex11",
        title: "Exercise 11: Match foods to categories",
        type: "table-matching",
        questionText: "Sort into Meat, Vegetables, Fish/Seafood, Carbohydrates: beef, lettuce, duck, lobster, spaghetti, salmon, carrot, garlic, cauliflower.",
        correctAnswers: ["Meat: beef, duck", "Vegetables: lettuce, carrot, garlic, cauliflower", "Fish/Seafood: lobster, salmon", "Carbohydrates: spaghetti"],
        placeholder: "Meat: ..., Vegetables: ..., Fish/Seafood: ..., Carbohydrates: ..."
      },
      {
        id: "p68-ex13",
        title: "Exercise 13: Match cooking methods to their definitions",
        type: "matching",
        questionText: "Match: 1. bake, 2. boil, 3. chop, 4. mix, 5. fry to their definitions (cook in water; cut into small pieces; cook with dry heat in oven; put ingredients together; cook in hot oil).",
        correctAnswers: ["bake → cook with dry heat in the oven", "boil → cook food in water", "chop → cut into small pieces", "mix → put two or more ingredients together", "fry → cook in hot oil or fat"],
        placeholder: "bake: ..., boil: ..., chop: ..., mix: ..., fry: ..."
      },
      {
        id: "p68-ex14",
        title: "Exercise 14: Complete the chart with some / any / a / an",
        type: "fill-blank",
        questionText: "Before singular countable nouns we use 'a' before a consonant sound and 'an' before a vowel sound. In positive sentences with plural/uncountable nouns we use 'some'. In questions and negatives we use 'any'.",
        correctAnswers: ["a", "an", "a", "an", "some", "some", "some", "any", "any", "any", "some", "some", "some"],
        placeholder: "1. a, 2. an, 3. a..."
      },
      {
        id: "p68-ex15",
        title: "Exercise 15: Choose much / many / a lot of",
        type: "multiple-choice",
        questionText: "We use 'a lot of' with positive and negative sentences (countable & uncountable). We use 'many' with countable nouns. We use 'much' with uncountable nouns.",
        options: [
          "A. We have a lot of oranges to eat",
          "B. How many lemons do you need?",
          "C. There isn't much sugar in the dish"
        ],
        correctAnswers: ["A", "B", "C"]
      }
    ]
  }
];
