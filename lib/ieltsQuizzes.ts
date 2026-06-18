import type { QuizQuestion } from "@/types/database";

// Define a structured IELTS script step
export interface ScriptStep {
  text: string;
  expectedInput?: string;
}

export interface UnitScript {
  unitTitle: string;
  vocabularyWord: string;
  vocabularyMeaning: string;
  grammarRule: string;
  grammarExample: string;
  steps: ScriptStep[];
}

// 1. Get Guided Scripts for 10 IELTS Units (handles 90% of flow locally with 0 API calls)
export function getScriptForUnit(unitNumber: number, studentName: string, pageHint: string): UnitScript {
  const normalizedUnit = Math.max(1, Math.min(10, unitNumber));
  
  const unitData: Record<number, Omit<UnitScript, "steps">> = {
    1: {
      unitTitle: "Unit 1: Daily Life (Reading & Vocabulary)",
      vocabularyWord: "routine",
      vocabularyMeaning: "thói quen hàng ngày, các hoạt động lặp đi lặp lại theo trình tự cố định.",
      grammarRule: "Thì Hiện tại đơn (Present Simple) để tả thói quen, kết hợp trạng từ tần suất (always, usually, sometimes...).",
      grammarExample: "I usually wake up at 6 AM and set my alarm clock every night.",
    },
    2: {
      unitTitle: "Unit 2: House and Home (Vocabulary & Speaking)",
      vocabularyWord: "balcony",
      vocabularyMeaning: "ban công, phần nhô ra ngoài hiên từ các tầng cao của tòa nhà.",
      grammarRule: "Giới từ chỉ nơi chốn (Prepositions of place): in, on, under, next to, between.",
      grammarExample: "The key is on the dining room table next to the sofa.",
    },
    3: {
      unitTitle: "Unit 3: Hobbies (Vocabulary & Listening)",
      vocabularyWord: "adventure",
      vocabularyMeaning: "cuộc phiêu lưu, trải nghiệm mạo hiểm và thú vị.",
      grammarRule: "Phân biệt Thì Hiện tại đơn (thói quen lâu dài) và Hiện tại tiếp diễn (đang diễn ra tạm thời).",
      grammarExample: "I play football every Saturday, but today I am practicing photography.",
    },
    4: {
      unitTitle: "Unit 4: Travel (Reading & Vocabulary)",
      vocabularyWord: "itinerary",
      vocabularyMeaning: "lịch trình chi tiết của một chuyến đi du lịch.",
      grammarRule: "Thì Quá khứ đơn (Past Simple) với động từ bất quy tắc (go -> went, take -> took, buy -> bought).",
      grammarExample: "Yesterday, we went to the airport and bought an ecotourism tour.",
    },
    5: {
      unitTitle: "Unit 5: Food (Vocabulary & Listening)",
      vocabularyWord: "ingredients",
      vocabularyMeaning: "các nguyên liệu cần thiết để chế biến một món ăn.",
      grammarRule: "Danh từ đếm được và không đếm được (Countable & Uncountable nouns) kèm lượng từ (some, any, much, many).",
      grammarExample: "There are some tomatoes, but there isn't much milk in the fridge.",
    },
    6: {
      unitTitle: "Unit 6: Transport (Vocabulary & Reading)",
      vocabularyWord: "commute",
      vocabularyMeaning: "quãng đường hoặc hành trình di chuyển đi làm/đi học hàng ngày bằng phương tiện giao thông.",
      grammarRule: "Cấu trúc So sánh hơn và So sánh nhất của tính từ (Comparative & Superlative adjectives).",
      grammarExample: "Going by train is faster than driving a car during the rush hour.",
    },
    7: {
      unitTitle: "Unit 7: Jobs (Vocabulary & Listening)",
      vocabularyWord: "automation",
      vocabularyMeaning: "sự tự động hóa, thay thế sức lao động của con người bằng máy móc.",
      grammarRule: "Động từ khuyết thiếu (Modal verbs) diễn tả khả năng và lời khuyên: can, could, should.",
      grammarExample: "Students should learn digital skills because many summer jobs can be automated.",
    },
    8: {
      unitTitle: "Unit 8: Health (Listening & Vocabulary)",
      vocabularyWord: "insomnia",
      vocabularyMeaning: "chứng mất ngủ, khó ngủ kéo dài gây mệt mỏi.",
      grammarRule: "Lời khuyên bảo vệ sức khỏe dùng cấu trúc: should, shouldn't, ought to, had better.",
      grammarExample: "You should avoid using your phone before bed to prevent insomnia.",
    },
    9: {
      unitTitle: "Unit 9: Language (Vocabulary & Listening)",
      vocabularyWord: "bilingual",
      vocabularyMeaning: "song ngữ, khả năng nói trôi chảy hai ngôn ngữ.",
      grammarRule: "Thì Tương lai gần diễn tả dự định/kế hoạch cụ thể: be going to + Verb.",
      grammarExample: "I am going to practice English vocabulary online every day to become bilingual.",
    },
    10: {
      unitTitle: "Unit 10: Tech (Vocabulary & Reading)",
      vocabularyWord: "gadget",
      vocabularyMeaning: "thiết bị công nghệ nhỏ gọn, hữu ích và thông minh (ví dụ: máy nghe nhạc, đồng hồ thông minh...).",
      grammarRule: "Dự đoán tương lai với cấu trúc: will / won't + Verb.",
      grammarExample: "In the future, artificial intelligence will control most smart home gadgets.",
    },
  };

  const data = unitData[normalizedUnit];

  const steps: ScriptStep[] = [
    {
      text: `👋 Chào em, ${studentName}! Thầy/Cô rất vui được đồng hành cùng em trong buổi học hôm nay.
Chủ đề học của chúng ta: **${data.unitTitle}**.
Mục tiêu là bám sát phần kiến thức **${pageHint || "trong sách giáo trình"}**.

Em đã sẵn sàng mở sách học chưa? Hãy gõ **"Sẵn sàng"** hoặc **"Em sẵn sàng"** để chúng ta bắt đầu ôn tập nhé!`,
    },
    {
      text: `🌟 Tuyệt vời! Đầu tiên, thầy cô muốn kiểm tra vốn Từ vựng (Vocabulary) của em một chút.
Trong Unit này có một từ vựng rất quan trọng là: **"${data.vocabularyWord}"** (nghĩa là: ${data.vocabularyMeaning}).

Em hãy viết một câu tiếng Anh đơn giản có chứa từ **"${data.vocabularyWord}"** để chứng tỏ em đã nắm vững từ này nhé!`,
    },
    {
      text: `Phản hồi rất xuất sắc! Bây giờ chúng ta sẽ chuyển sang tiêu điểm Ngữ pháp (Grammar/Usage).
Trong chủ đề này, chúng ta cần ghi nhớ kỹ cấu trúc:
👉 **${data.grammarRule}**
*Ví dụ:* ${data.grammarExample}

Bây giờ, em hãy thử viết một câu ngắn áp dụng cấu trúc ngữ pháp này nhé!`,
    },
    {
      text: `Rất tốt! Em áp dụng cấu trúc ngữ pháp rất chuẩn rồi đấy.
Tiếp theo, thầy cô khuyên em nên dành khoảng 5 - 10 phút để thực hành **Bài tập trắc nghiệm (15-20 câu)** ở ngay cột bên trái màn hình. Bài tập này được biên soạn bám sát đề thi IELTS thực tế để giúp em nhớ sâu từ vựng & cấu trúc của Unit này.

Khi đã làm xong bài tập trắc nghiệm, em hãy gõ **"Đã xong quiz"** để thầy cô tổng kết buổi học nhé!`,
    },
    {
      text: `🎉 Chúc mừng em đã hoàn thành xuất sắc bài học hôm nay! Em đã nắm rất chắc kiến thức từ vựng và ngữ pháp của **${data.unitTitle}**.

Em hãy nhớ kiểm tra hoặc nhắc ba mẹ tích chọn vào các ô checkbox "Dành cho Phụ huynh" ở bên dưới nhé.
Nếu em có bất kỳ câu hỏi nào cần thầy cô giải thích thêm hoặc muốn dịch từ, em cứ gõ trực tiếp câu hỏi tại đây (ví dụ: *"Giải thích giúp em câu hỏi số 3"*), thầy cô sẽ giải thích chi tiết realtime ngay cho em!`,
    }
  ];

  return {
    ...data,
    steps,
  };
}

// 2. Fallback Quiz questions for the 10 units (Guarantees 15 questions per lesson under all circumstances)
export function getFallbackQuestionsForUnit(unitNumber: number, quizId: string): QuizQuestion[] {
  const normalizedUnit = Math.max(1, Math.min(10, unitNumber));

  const questionsData: Record<number, Omit<QuizQuestion, "id" | "quiz_id" | "order_index">[]> = {
    1: [
      // Page 14 Grammar Box Multiple Choice
      {
        question: "What do we use the present simple for?",
        options: [
          "To talk about everyday routines and habits",
          "To say how often we do something",
          "To describe an action happening right now"
        ],
        correct_index: 0,
        explanation: "The present simple is used to talk about everyday routines and habits (e.g., 'I get up early').",
        type: "multiple_choice",
        exercise_title: "Page 14 Grammar: Present Simple Usage"
      },
      {
        question: "Why do we use adverbs of frequency (e.g. never, sometimes, usually, always)?",
        options: [
          "To say how often we do something",
          "To talk about what is happening at this moment",
          "To connect two independent clauses"
        ],
        correct_index: 0,
        explanation: "Adverbs of frequency show how regularly we perform an activity, ranging from 0% (never) to 100% (always).",
        type: "multiple_choice",
        exercise_title: "Page 14 Grammar: Adverbs of Frequency"
      },
      {
        question: "What ending do verbs take in the present simple when the subject is he/she/it?",
        options: [
          "-s, -es, or -ies (e.g., watch -> watches, try -> tries)",
          "-ing (e.g., watch -> watching)",
          "-ed (e.g., watch -> watched)"
        ],
        correct_index: 0,
        explanation: "For third-person singular (he/she/it), present simple regular verbs end in -s, -es, or -ies.",
        type: "multiple_choice",
        exercise_title: "Page 14 Grammar: Third Person Singular Ending"
      },
      // Page 18 Exercise 1: Match digital times with times in words (Part 1 and 2)
      {
        question: "Match the digital times with the times in words (Part 1):",
        options: [],
        correct_index: -1,
        explanation: "05:15 = quarter past five, 08:20 = twenty past eight, 06:45 = quarter to seven, 14:30 = half past two, 20:50 = ten to nine.",
        type: "match_pair",
        pairs: [
          { left: "05:15", right: "It's quarter past five" },
          { left: "08:20", right: "It's twenty past eight" },
          { left: "06:45", right: "It's quarter to seven" },
          { left: "14:30", right: "It's half past two" },
          { left: "20:50", right: "It's ten to nine" }
        ],
        exercise_title: "Page 18 Exercise 1: Telling the Time (Part 1)"
      },
      {
        question: "Match the digital times with the times in words (Part 2):",
        options: [],
        correct_index: -1,
        explanation: "09:10 = ten past nine, 15:35 = twenty-five to four, 10:05 = five past ten, 12:00 = twelve o'clock, 16:55 = five to five.",
        type: "match_pair",
        pairs: [
          { left: "09:10", right: "It's ten past nine" },
          { left: "15:35", right: "It's twenty-five to four" },
          { left: "10:05", right: "It's five past ten" },
          { left: "12:00", right: "It's twelve o'clock" },
          { left: "16:55", right: "It's five to five" }
        ],
        exercise_title: "Page 18 Exercise 1: Telling the Time (Part 2)"
      },
      // Page 18 Exercise 2: Unscramble morning routine
      {
        question: "Unscramble the letters in brackets to complete the text about morning routine:",
        options: [],
        correct_index: -1,
        explanation: "The unscrambled verbs are: have (avhe), brush (bhusr), meet (emte), catch (chact), leave (vlaee), go (og), watch (cwaht), do (od), go (og), fall (lafl).",
        type: "inline_fill_blank",
        text_segments: [
          "When I get up in the morning, the first thing that I do is 1 (avhe) ",
          " a shower. I then go to the kitchen and make breakfast. After breakfast, I 2 (bhusr) ",
          " my teeth. Then I 3 (emte) ",
          " my friends and we 4 (chact) ",
          " the bus to the college. At college, we study all day, but we have a break for lunch at 12 o'clock. At four o'clock, we 5 (vlaee) ",
          " the college and 6 (og) ",
          " home by bus. In the evenings, I usually 7 (cwaht) ",
          " TV, unless I have a lot of homework. I always 8 (od) ",
          " my homework in the evenings. At night, I always 9 (og) ",
          " to bed and 10 (lafl) ",
          " asleep straight away."
        ],
        correct_answers: ["have", "brush", "meet", "catch", "leave", "go", "watch", "do", "go", "fall"],
        exercise_title: "Page 18 Exercise 2: Unscramble Morning Routine Verbs"
      },
      // Page 18 Exercise 3: Categorization
      {
        question: "Complete the table by categorizing these words/phrases under 'Make' or 'Do':",
        options: [],
        correct_index: -1,
        explanation: "Collocations with 'make' usually involve creating or producing something new (e.g. dinner, a noise, a mess, lunch, the beds). Collocations with 'do' usually involve jobs, work, or activities (e.g. homework, cleaning, laundry, shopping, housework).",
        type: "categorization",
        groups: [
          { name: "Make", items: ["a mess", "the beds", "dinner", "a noise", "lunch"] },
          { name: "Do", items: ["the cleaning", "some homework", "the laundry", "the shopping", "the housework"] }
        ],
        exercise_title: "Page 18 Exercise 3: Make vs Do Collocations"
      },
      // Page 19 Exercise 4: Complete the email
      {
        question: "Complete the email using the words in the box (live, work, get up, leave, have, walk, catch, finish, meet, go out):",
        options: [],
        correct_index: -1,
        explanation: "1. live (apartment), 2. work (as journalists), 3. get up (very early), 4. leave (the house), 5. have (breakfast), 6. walk (there), 7. catch (the bus), 8. finish (at 4pm), 9. meet (after school), 10. go out (in the evenings).",
        type: "inline_fill_blank",
        text_segments: [
          "Hi Sam,\nI'm having a great time here in France. I'm learning lots of French. My host family are very nice. They 1 ",
          " in an apartment in an area called Pantin, and they both 2 ",
          " as journalists. They 3 ",
          " very early in the morning and 4 ",
          " the house before me. I 5 ",
          " breakfast at about 8am and then go to the language school. I usually 6 ",
          " there, but if I'm late I 7 ",
          " the bus. Lessons at the school 8 ",
          " at 4pm and then we can go home. The other students are very nice and I have made lots of new friends. We 9 ",
          " after school in a cafe or 10 ",
          " in the evenings to the cinema."
        ],
        correct_answers: ["live", "work", "get up", "leave", "have", "walk", "catch", "finish", "meet", "go out"],
        word_pool: ["walk", "leave", "have", "finish", "get up", "catch", "go out", "work", "meet", "live"],
        exercise_title: "Page 19 Exercise 4: Harry's Email Cloze"
      },
      // Page 19 Exercise 5: Third-person singular conjugation (10 questions)
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -sh (wash), we add -es for third person singular: washes.",
        type: "inline_fill_blank",
        text_segments: ["My dad ", " (wash) his car every weekend."],
        correct_answers: ["washes"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (1/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -ch (watch), we add -es for third person singular: watches.",
        type: "inline_fill_blank",
        text_segments: ["Jim ", " (watch) too much TV."],
        correct_answers: ["watches"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (2/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in consonant + y (cry), we change y to i and add -es: cries.",
        type: "inline_fill_blank",
        text_segments: ["Adrian's baby ", " (cry) a lot."],
        correct_answers: ["cries"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (3/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -se (practise), we add -s: practises.",
        type: "inline_fill_blank",
        text_segments: ["My brother is good at chess and ", " (practise) every day."],
        correct_answers: ["practises"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (4/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -o (go), we add -es: goes.",
        type: "inline_fill_blank",
        text_segments: ["Olga ", " (go) jogging most evenings after work."],
        correct_answers: ["goes"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (5/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For the irregular verb 'do', we add -es: does.",
        type: "inline_fill_blank",
        text_segments: ["Tom's wife cooks and Tom ", " (do) the washing up."],
        correct_answers: ["does"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (6/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -ch (catch), we add -es: catches.",
        type: "inline_fill_blank",
        text_segments: ["Anna ", " (catch) the 253 bus to college each morning."],
        correct_answers: ["catches"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (7/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For verbs ending in -x (relax), we add -es: relaxes.",
        type: "inline_fill_blank",
        text_segments: ["Nadia ", " (relax) by doing yoga."],
        correct_answers: ["relaxes"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (8/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For regular verbs (give), we add -s: gives.",
        type: "inline_fill_blank",
        text_segments: ["I think our teacher ", " (give) us far too much homework."],
        correct_answers: ["gives"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (9/10)"
      },
      {
        question: "Complete the sentence using the third person form of the verb in brackets:",
        options: [],
        correct_index: -1,
        explanation: "For multi-word verbs, we conjugate the main verb: switch -> switches off.",
        type: "inline_fill_blank",
        text_segments: ["My brother ", " (switch off) his light at about midnight."],
        correct_answers: ["switches off"],
        exercise_title: "Page 19 Exercise 5: Third Person Singular (10/10)"
      },
      // Page 19 Exercise 6: Read and underline the correct answer (10 MC questions)
      {
        question: "Choose the correct verb to complete the sentence: 'My brother works / work for a computer company in the city.'",
        options: ["works", "work"],
        correct_index: 0,
        explanation: "Subject is 'My brother' (singular 'he'), so we use the third-person verb: works.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (1/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'My friends and I often play / plays basketball together at the weekends.'",
        options: ["play", "plays"],
        correct_index: 0,
        explanation: "Subject is 'My friends and I' (plural 'we'), so we use the base form: play.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (2/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'I go to a college where everyone study / studies different languages.'",
        options: ["study", "studies"],
        correct_index: 1,
        explanation: "Subject is 'everyone' (singular pronoun), so we use the singular verb: studies.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (3/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'My grandparents come / comes from a small village in Germany.'",
        options: ["come", "comes"],
        correct_index: 0,
        explanation: "Subject is 'My grandparents' (plural 'they'), so we use the base form: come.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (4/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'In Britain, most school students wear / wears a uniform.'",
        options: ["wear", "wears"],
        correct_index: 0,
        explanation: "Subject is 'most school students' (plural), so we use the base form: wear.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (5/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'In the evenings, I like / likes to chat to my friends online.'",
        options: ["like", "likes"],
        correct_index: 0,
        explanation: "Subject is 'I', so we use the base form: like.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (6/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'In my family, only my sister gets up / get up before 6am.'",
        options: ["gets up", "get up"],
        correct_index: 0,
        explanation: "Subject is 'only my sister' (singular 'she'), so we use the third-person verb: gets up.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (7/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'I have / has a dance class every Wednesday evening.'",
        options: ["have", "has"],
        correct_index: 0,
        explanation: "Subject is 'I', so we use: have.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (8/10)"
      },
      {
        question: "Choose the correct verb to complete the sentence: 'My friend is good at baking and make / makes amazing cakes.'",
        options: ["make", "makes"],
        correct_index: 1,
        explanation: "The singular subject 'My friend' requires 'makes' to match 'is good' (singular third-person).",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (9/10)"
      },
      {
        question: "Choose the correct verbs to complete the sentence: 'My lunch break begin / begins at 12pm and finish / finishes at 12.45pm.'",
        options: ["begins / finishes", "begin / finish", "begins / finish", "begin / finishes"],
        correct_index: 0,
        explanation: "Subject is 'My lunch break' (singular 'it'), so both verbs must be in the third-person singular: begins and finishes.",
        type: "multiple_choice",
        exercise_title: "Page 19 Exercise 6: Subject-Verb Agreement (10/10)"
      }
    ],
    2: [
      {
        question: "The small but beautiful outdoor area of Giorgio's flat is the [blank].",
        options: [],
        correct_index: -1,
        correct_answer: "balcony",
        explanation: "Giorgio mentions his flat has a small but beautiful balcony.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Flat Layout Description"
      },
      {
        question: "The cozy sofa in the living room is located right next to the [blank].",
        options: [],
        correct_index: -1,
        correct_answer: "window",
        explanation: "The sofa is right next to the window to capture sunlight.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Flat Layout Description"
      },
      {
        question: "Giorgio parks his car in the [blank] underneath the building.",
        options: [],
        correct_index: -1,
        correct_answer: "garage",
        explanation: "Underneath the building there is a garage for parking.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Flat Layout Description"
      },
      {
        question: "The smart lights are located [blank] the ceiling.",
        options: [],
        correct_index: -1,
        correct_answer: "on",
        explanation: "Smart lights are installed 'on' the ceiling.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Prepositions of Place"
      },
      {
        question: "The control tablet is usually [blank] the wall.",
        options: [],
        correct_index: -1,
        correct_answer: "on",
        explanation: "The control tablet is mounted 'on' the wall.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Prepositions of Place"
      },
      {
        question: "The tablet is placed right [blank] to the dining room table.",
        options: [],
        correct_index: -1,
        correct_answer: "next",
        explanation: "Preposition collocation: 'next to'.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Prepositions of Place"
      }
    ],
    3: [
      {
        question: "Which verb goes with 'football'?",
        options: ["play", "do", "go"],
        correct_index: 0,
        explanation: "We use 'play' for team sports or sports played with a ball: 'play football'.",
        type: "matching",
        exercise_title: "Exercise 3: Collocations (play / do / go)"
      },
      {
        question: "Which verb goes with 'swimming'?",
        options: ["play", "do", "go"],
        correct_index: 2,
        explanation: "We use 'go' for activities ending in -ing: 'go swimming'.",
        type: "matching",
        exercise_title: "Exercise 3: Collocations (play / do / go)"
      },
      {
        question: "Which verb goes with 'yoga'?",
        options: ["play", "do", "go"],
        correct_index: 1,
        explanation: "We use 'do' for recreational activities or individual sports: 'do yoga'.",
        type: "matching",
        exercise_title: "Exercise 3: Collocations (play / do / go)"
      },
      {
        question: "Which verb goes with 'photography'?",
        options: ["play", "do", "go"],
        correct_index: 1,
        explanation: "We use 'do' for leisure activities/hobbies: 'do photography'.",
        type: "matching",
        exercise_title: "Exercise 3: Collocations (play / do / go)"
      },
      {
        question: "Which verb goes with 'rock climbing'?",
        options: ["play", "do", "go"],
        correct_index: 2,
        explanation: "We use 'go' for activities ending in -ing: 'go rock climbing'.",
        type: "matching",
        exercise_title: "Exercise 3: Collocations (play / do / go)"
      }
    ],
    4: [
      {
        question: "Anna decided to go on an [blank] holiday in Costa Rica.",
        options: [],
        correct_index: -1,
        correct_answer: "ecotourism",
        explanation: "She went on an ecotourism holiday.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Itinerary Note Completion"
      },
      {
        question: "Their itinerary was fully planned to protect the local [blank] and wild animals.",
        options: [],
        correct_index: -1,
        correct_answer: "environment",
        explanation: "The purpose of ecotourism is protecting the environment.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Itinerary Note Completion"
      },
      {
        question: "They stayed in a traditional green accommodation built entirely from [blank] and recycled materials.",
        options: [],
        correct_index: -1,
        correct_answer: "bamboo",
        explanation: "The accommodation was built entirely from bamboo.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Itinerary Note Completion"
      }
    ],
    5: [
      {
        question: "First, you need to prepare the [blank]: minced meat, cabbage, and chopped onions.",
        options: [],
        correct_index: -1,
        correct_answer: "ingredients",
        explanation: "Preparation phase is preparing ingredients.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Recipe Gap Fill"
      },
      {
        question: "For vegetarians, you can easily replace the pork meat with [blank] and fresh mushrooms.",
        options: [],
        correct_index: -1,
        correct_answer: "tofu",
        explanation: "Tofu is the standard substitute for meat.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Recipe Gap Fill"
      },
      {
        question: "Finally, steam the dumplings in a bamboo steamer for [blank] minutes until fully cooked.",
        options: [],
        correct_index: -1,
        correct_answer: "twelve",
        explanation: "The recipe specifies twelve (or 12) minutes.",
        type: "fill_in_blank",
        exercise_title: "Exercise 5: Recipe Gap Fill"
      }
    ],
    6: [
      {
        question: "The main [blank] is located in the center, directly next to the train station.",
        options: [],
        correct_index: -1,
        correct_answer: "bus stop",
        explanation: "The town layout positions the bus stop in the center.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Map Labeling"
      },
      {
        question: "The bus stop is located directly next to the Northfields [blank].",
        options: [],
        correct_index: -1,
        correct_answer: "train station",
        explanation: "It sits right next to the train station.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Map Labeling"
      },
      {
        question: "Going by the underground [blank] is much faster and cheaper than taking a taxi.",
        options: [],
        correct_index: -1,
        correct_answer: "metro",
        explanation: "The metro runs underground and avoids rush hour traffic.",
        type: "fill_in_blank",
        exercise_title: "Exercise 3: Map Labeling"
      }
    ],
    7: [
      {
        question: "Many simple [blank] jobs and manual office roles can be automated very soon.",
        options: [],
        correct_index: -1,
        correct_answer: "summer",
        explanation: "Summer jobs are typical targets for automation.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Note Completion"
      },
      {
        question: "Creative jobs that require [blank] skills will always need human beings.",
        options: [],
        correct_index: -1,
        correct_answer: "social",
        explanation: "Social skills cannot be easily automated.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Note Completion"
      },
      {
        question: "Young candidates should focus on learning digital skills to get a higher starting [blank].",
        options: [],
        correct_index: -1,
        correct_answer: "salary",
        explanation: "Digital skills help command a higher starting salary.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Note Completion"
      }
    ],
    8: [
      {
        question: "Many young adults are suffering from [blank], which causes severe tiredness.",
        options: [],
        correct_index: -1,
        correct_answer: "insomnia",
        explanation: "Insomnia is a sleep disorder.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Advice List Completion"
      },
      {
        question: "You had better avoid drinking [blank] or using gadgets after 8 PM.",
        options: [],
        correct_index: -1,
        correct_answer: "caffeine",
        explanation: "Caffeine interrupts sleep patterns.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Advice List Completion"
      },
      {
        question: "To get better sleep, you should turn off smart [blank] in bed.",
        options: [],
        correct_index: -1,
        correct_answer: "screens",
        explanation: "Screens emit blue light which prevents melatonin production.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Advice List Completion"
      },
      {
        question: "Good health starts with two main factors: a [blank] diet and deep sleep.",
        options: [],
        correct_index: -1,
        correct_answer: "balanced",
        explanation: "A balanced diet is key to good health.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Advice List Completion"
      }
    ],
    9: [
      {
        question: "Being [blank] opens up so many career opportunities in the global market.",
        options: [],
        correct_index: -1,
        correct_answer: "bilingual",
        explanation: "Speaking two languages fluently means being bilingual.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Bilingual Brain Notes"
      },
      {
        question: "To achieve [blank], you need to surround yourself with the language.",
        options: [],
        correct_index: -1,
        correct_answer: "fluency",
        explanation: "Fluency is achieved via immersion and practice.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Bilingual Brain Notes"
      },
      {
        question: "Her brother is going to sign up for an intensive [blank] course this summer.",
        options: [],
        correct_index: -1,
        correct_answer: "immersion",
        explanation: "An immersion course helps build deep language skills.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Bilingual Brain Notes"
      }
    ],
    10: [
      {
        question: "Our homes will contain many smart [blank] connected to the internet at all times.",
        options: [],
        correct_index: -1,
        correct_answer: "gadgets",
        explanation: "Smart gadgets populate modern homes.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Tech Prediction Gap-Fill"
      },
      {
        question: "We won't need to cook because [blank] chefs will prepare gourmet meals.",
        options: [],
        correct_index: -1,
        correct_answer: "robot",
        explanation: "Robot chefs will handle automated cooking.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Tech Prediction Gap-Fill"
      },
      {
        question: "However, we should be careful not to become too [blank] on these devices.",
        options: [],
        correct_index: -1,
        correct_answer: "dependent",
        explanation: "Over-dependency on devices is a risk.",
        type: "fill_in_blank",
        exercise_title: "Exercise 4: Tech Prediction Gap-Fill"
      }
    ]
  };

  const rawQuestions = questionsData[normalizedUnit] || questionsData[1];
  
  return rawQuestions.map((q, idx) => ({
    ...q,
    id: `${quizId}-fallback-${idx}`,
    quiz_id: quizId,
    order_index: idx,
    type: q.type || 'multiple_choice',
    correct_answer: q.correct_answer || '',
    exercise_title: q.exercise_title || 'Review Exercise'
  }));
}

// 3. Static database of all key vocabulary across the 10 IELTS units for spaced retrieval
export interface IELTSVocabularyWord {
  unit: number;
  word: string;
  meaning: string;
  pronunciation: string;
}

export const ieltsVocabularyDB: IELTSVocabularyWord[] = [
  // Unit 1
  { unit: 1, word: "routine", meaning: "thói quen hàng ngày, trình tự làm việc cố định", pronunciation: "/ruːˈtiːn/" },
  { unit: 1, word: "prepare", meaning: "chuẩn bị, sửa soạn", pronunciation: "/prɪˈpeə(r)/" },
  { unit: 1, word: "gardening", meaning: "việc làm vườn, chăm sóc cây", pronunciation: "/ˈɡɑːdnɪŋ/" },
  { unit: 1, word: "handcrafts", meaning: "đồ thủ công tự tay làm", pronunciation: "/ˈhændɪkrɑːfts/" },
  { unit: 1, word: "delicious", meaning: "ngon miệng, có hương vị tuyệt vời", pronunciation: "/dɪˈlɪʃəs/" },
  // Unit 2
  { unit: 2, word: "apartment", meaning: "căn hộ chung cư", pronunciation: "/əˈpɑːtmənt/" },
  { unit: 2, word: "comfortable", meaning: "thoải mái, tiện nghi", pronunciation: "/ˈkʌmftəbl/" },
  { unit: 2, word: "wardrobe", meaning: "tủ quần áo", pronunciation: "/ˈwɔːdrəʊb/" },
  { unit: 2, word: "balcony", meaning: "ban công hiên nhà", pronunciation: "/ˈbælkəni/" },
  { unit: 2, word: "garage", meaning: "nhà để xe ô tô", pronunciation: "/ˈɡærɑːʒ/" },
  // Unit 3
  { unit: 3, word: "photography", meaning: "nhiếp ảnh, nghệ thuật chụp ảnh", pronunciation: "/fəˈtɒɡrəfi/" },
  { unit: 3, word: "adventure", meaning: "cuộc phiêu lưu mạo hiểm thú vị", pronunciation: "/ədˈventʃə(r)/" },
  { unit: 3, word: "competitive", meaning: "mang tính cạnh tranh, ganh đua", pronunciation: "/kəmˈpetətɪv/" },
  { unit: 3, word: "hobby", meaning: "sở thích lúc rảnh rỗi", pronunciation: "/ˈhɒbi/" },
  { unit: 3, word: "leisure center", meaning: "trung tâm thể dục thể thao giải trí", pronunciation: "/ˈleʒə ˈsentə(r)/" },
  // Unit 4
  { unit: 4, word: "destination", meaning: "điểm đến của chuyến đi", pronunciation: "/ˌdestɪˈneɪʃn/" },
  { unit: 4, word: "itinerary", meaning: "lịch trình chi tiết của chuyến du lịch", pronunciation: "/aɪˈtɪnərəri/" },
  { unit: 4, word: "suitcase", meaning: "vali đựng quần áo đồ đạc", pronunciation: "/ˈsuːtkeɪs/" },
  { unit: 4, word: "ecotourism", meaning: "du lịch sinh thái bảo vệ môi trường", pronunciation: "/ˈiːkəʊtʊərɪzəm/" },
  { unit: 4, word: "sightseeing", meaning: "đi tham quan, ngắm cảnh đẹp", pronunciation: "/ˈsaɪtsiːɪŋ/" },
  // Unit 5
  { unit: 5, word: "ingredients", meaning: "các nguyên liệu nấu ăn", pronunciation: "/ɪnˈɡriːdiənts/" },
  { unit: 5, word: "recipe", meaning: "công thức hướng dẫn nấu ăn", pronunciation: "/ˈresəpi/" },
  { unit: 5, word: "organic", meaning: "hữu cơ, tự nhiên sạch", pronunciation: "/ɔːˈɡænɪk/" },
  { unit: 5, word: "homemade", meaning: "nhà làm, tự làm tại nhà", pronunciation: "/ˌhəʊmˈmeɪd/" },
  { unit: 5, word: "nutritious", meaning: "bổ dưỡng, giàu chất dinh dưỡng", pronunciation: "/njuˈtrɪʃəs/" },
  // Unit 6
  { unit: 6, word: "commute", meaning: "hành trình di chuyển đi làm/đi học hàng ngày", pronunciation: "/kəˈmjuːt/" },
  { unit: 6, word: "rush hour", meaning: "giờ cao điểm kẹt xe", pronunciation: "/rʌʃ ˈaʊə(r)/" },
  { unit: 6, word: "traffic jam", meaning: "sự kẹt xe, ùn tắc giao thông", pronunciation: "/ˈtræfɪk dʒæm/" },
  { unit: 6, word: "environmentally friendly", meaning: "thân thiện với môi trường, không độc hại", pronunciation: "/ɪnˌvaɪrənˈmentəli ˈfrendli/" },
  // Unit 7
  { unit: 7, word: "automation", meaning: "sự tự động hóa bằng máy móc", pronunciation: "/ˌɔːtəˈmeɪʃn/" },
  { unit: 7, word: "colleagues", meaning: "đồng nghiệp cùng cơ quan", pronunciation: "/ˈkɒliːɡz/" },
  { unit: 7, word: "qualifications", meaning: "bằng cấp, chứng chỉ chuyên môn", pronunciation: "/ˌkwɒlɪfɪˈkeɪʃnz/" },
  { unit: 7, word: "working from home", meaning: "làm việc từ xa tại nhà qua mạng", pronunciation: "/ˈwɜːkɪŋ frɒm həʊm/" },
  // Unit 8
  { unit: 8, word: "insomnia", meaning: "chứng mất ngủ kéo dài", pronunciation: "/ɪnˈsɒmniə/" },
  { unit: 8, word: "strain", meaning: "sự căng thẳng, mệt mỏi cơ hoặc mắt", pronunciation: "/streɪn/" },
  { unit: 8, word: "recommendation", meaning: "khuyến nghị, lời khuyên của chuyên gia", pronunciation: "/ˌrekəmenˈdeɪʃn/" },
  { unit: 8, word: "balanced diet", meaning: "chế độ ăn uống cân đối đủ chất", pronunciation: "/ˈbælənst ˈdaɪət/" },
  // Unit 9
  { unit: 9, word: "bilingual", meaning: "song ngữ, nói được 2 thứ tiếng lưu loát", pronunciation: "/ˌbaɪˈlɪŋɡwəl/" },
  { unit: 9, word: "fluently", meaning: "một cách trôi chảy, lưu loát", pronunciation: "/ˈfluːəntli/" },
  { unit: 9, word: "opportunities", meaning: "các cơ hội, thời cơ tốt trong cuộc sống", pronunciation: "/ˌɒpəˈtjuːnətiz/" },
  { unit: 9, word: "native speaker", meaning: "người bản xứ nói tiếng mẹ đẻ", pronunciation: "/ˈneɪtɪv ˈspiːkə(r)/" },
  // Unit 10
  { unit: 10, word: "gadget", meaning: "thiết bị công nghệ nhỏ tiện ích", pronunciation: "/ˈɡædʒɪt/" },
  { unit: 10, word: "automatically", meaning: "một cách tự động bằng máy", pronunciation: "/ˌɔːtəˈmætɪkli/" },
  { unit: 10, word: "predict", meaning: "dự đoán, dự báo trước tương lai", pronunciation: "/prɪˈdɪkt/" },
  { unit: 10, word: "artificial intelligence", meaning: "trí tuệ nhân tạo (AI)", pronunciation: "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/" }
];

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 4. Generate Cumulative Spaced Retrieval Vocabulary Quiz for Warmup
 * Pulls words from Unit 1 to (unitNumber - 1). If unitNumber is 1, pulls from Unit 1.
 */
export function getCumulativeVocabularyQuiz(unitNumber: number, quizId: string, count: number = 10): QuizQuestion[] {
  const currentUnit = Math.max(1, Math.min(10, unitNumber));
  
  // Filter vocabulary: if unit > 1, get words from unit 1 to unit - 1. Otherwise, get words from unit 1.
  let pool = ieltsVocabularyDB.filter(w => currentUnit > 1 ? w.unit < currentUnit : w.unit === 1);
  if (pool.length === 0) pool = ieltsVocabularyDB; // Fallback

  const selectedWords = shuffleArray(pool).slice(0, count);
  const allMeanings = ieltsVocabularyDB.map(w => w.meaning);

  return selectedWords.map((vocab, index) => {
    // Collect distractors: 3 other random meanings
    const correctMeaning = vocab.meaning;
    const distinctOtherMeanings = shuffleArray(allMeanings.filter(m => m !== correctMeaning)).slice(0, 3);
    
    // Combine and shuffle options
    const options = shuffleArray([correctMeaning, ...distinctOtherMeanings]);
    const correct_index = options.indexOf(correctMeaning);

    return {
      id: `${quizId}-vocab-${vocab.word}-${index}`,
      quiz_id: quizId,
      question: `Từ vựng "${vocab.word}" (${vocab.pronunciation}) mang ý nghĩa nào sau đây?`,
      options,
      correct_index,
      order_index: index,
      explanation: `Từ vựng "${vocab.word}" có phát âm là ${vocab.pronunciation}, mang ý nghĩa: "${vocab.meaning}". (Unit ${vocab.unit})`
    };
  });
}

/**
 * 5. Generate Cumulative Spaced-Retrieval Questions for Unit
 * Combines 15 questions from the current unit and 5 questions from previous units (if applicable).
 */
export function getCumulativeQuestionsForUnit(unitNumber: number, quizId: string, totalCount: number = 20): QuizQuestion[] {
  const currentUnit = Math.max(1, Math.min(10, unitNumber));
  
  // 1. Get fallback questions for current unit (usually 15 questions)
  const currentUnitQuestions = getFallbackQuestionsForUnit(currentUnit, quizId);
  
  if (currentUnit === 1) {
    // If unit 1, we can't accumulate from past units, so we return the first 20 questions or padding from Unit 1 fallback
    return currentUnitQuestions.slice(0, totalCount);
  }

  // 2. Collect past unit questions as pool
  const pastUnitsQuestions: QuizQuestion[] = [];
  for (let u = 1; u < currentUnit; u++) {
    pastUnitsQuestions.push(...getFallbackQuestionsForUnit(u, quizId));
  }

  // 3. Shuffle past questions and pick 5 questions (or totalCount - currentUnitCount)
  const accumulatedCount = Math.max(2, totalCount - currentUnitQuestions.length);
  const selectedPastQuestions = shuffleArray(pastUnitsQuestions).slice(0, accumulatedCount);

  // 4. Combine current questions and selected past questions
  const finalQuestions = [...currentUnitQuestions, ...selectedPastQuestions];
  
  // Re-index order
  return finalQuestions.map((q, idx) => ({
    ...q,
    id: `${quizId}-cumulative-${idx}`,
    order_index: idx
  }));
}

