// English Engine for Grade 3 (Global Success 3)

const VOCAB_BANK: Record<number, { words: { en: string; vi: string }[], sentences: string[] }> = {
  1: {
    words: [{ en: "hello", vi: "xin chào" }, { en: "hi", vi: "chào" }, { en: "how", vi: "thế nào" }, { en: "fine", vi: "khỏe" }],
    sentences: ["Hello, I am Ben.", "Hi, I am Mai.", "How are you?", "I am fine, thank you."]
  },
  2: {
    words: [{ en: "what", vi: "cái gì" }, { en: "name", vi: "tên" }, { en: "my", vi: "của tôi" }, { en: "your", vi: "của bạn" }],
    sentences: ["What is your name?", "My name is Linh.", "How do you spell your name?", "Is your name Ben?"]
  },
  3: {
    words: [{ en: "this", vi: "đây" }, { en: "that", vi: "kia" }, { en: "friend", vi: "người bạn" }, { en: "teacher", vi: "giáo viên" }],
    sentences: ["This is my friend.", "That is my teacher.", "Is this your friend?", "Yes, it is."]
  },
  4: {
    words: [{ en: "how old", vi: "mấy tuổi" }, { en: "old", vi: "cũ/tuổi" }, { en: "years old", vi: "tuổi" }, { en: "seven", vi: "bảy" }, { en: "eight", vi: "tám" }],
    sentences: ["How old are you?", "I am eight years old.", "Is he seven years old?", "Yes, he is."]
  },
  5: {
    words: [{ en: "hobby", vi: "sở thích" }, { en: "singing", vi: "ca hát" }, { en: "swimming", vi: "bơi lội" }, { en: "dancing", vi: "nhảy múa" }, { en: "drawing", vi: "vẽ" }],
    sentences: ["What is your hobby?", "I like swimming.", "Do you like dancing?", "Yes, I like dancing."]
  },
  6: {
    words: [{ en: "school", vi: "trường học" }, { en: "classroom", vi: "phòng học" }, { en: "library", vi: "thư viện" }, { en: "playground", vi: "sân chơi" }, { en: "computer room", vi: "phòng máy tính" }, { en: "gym", vi: "phòng thể chất" }],
    sentences: ["This is our school.", "Is this our library?", "Yes, it is.", "Let's go to the computer room."]
  },
  7: {
    words: [{ en: "open", vi: "mở" }, { en: "close", vi: "đóng" }, { en: "book", vi: "quyển sách" }, { en: "stand up", vi: "đứng lên" }, { en: "sit down", vi: "ngồi xuống" }, { en: "come in", vi: "vào trong" }],
    sentences: ["Open your book, please.", "Stand up, please.", "May I come in?", "Yes, you can.", "No, you can't."]
  },
  8: {
    words: [{ en: "pen", vi: "cái bút" }, { en: "pencil", vi: "bút chì" }, { en: "ruler", vi: "thước kẻ" }, { en: "rubber", vi: "cục tẩy" }, { en: "pencil case", vi: "hộp bút" }, { en: "school bag", vi: "cặp sách" }],
    sentences: ["I have a pen.", "I have a ruler.", "Do you have a pencil?", "Yes, I do.", "No, I don't."]
  },
  9: {
    words: [{ en: "red", vi: "màu đỏ" }, { en: "green", vi: "màu xanh lá" }, { en: "blue", vi: "màu xanh dương" }, { en: "yellow", vi: "màu vàng" }, { en: "black", vi: "màu đen" }, { en: "white", vi: "màu trắng" }],
    sentences: ["What colour is it?", "It is red.", "What colour are they?", "They are green.", "Is it blue?"]
  },
  10: {
    words: [{ en: "break time", vi: "giờ ra chơi" }, { en: "play", vi: "chơi" }, { en: "chess", vi: "cờ vua" }, { en: "badminton", vi: "cầu lông" }, { en: "basketball", vi: "bóng rổ" }, { en: "football", vi: "bóng đá" }],
    sentences: ["What do you do at break time?", "I play chess.", "Do you play football?", "Let's play badminton."]
  }
};

function getVocab(currentLesson: number) {
  // Unit 11 is Semester 1 Review (covers Unit 1 to 10)
  if (currentLesson === 11) {
    return VOCAB_BANK[randInt(1, 10)];
  }

  // Lũy kế: Pick a random lesson from 1 to currentLesson
  // Give 50% chance to test the current lesson's vocabulary, 50% chance to test older lessons
  let targetLesson = currentLesson;
  if (currentLesson > 1 && Math.random() > 0.5) {
    targetLesson = randInt(1, currentLesson - 1);
  }
  return VOCAB_BANK[targetLesson] || VOCAB_BANK[1];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genSentenceReorder(id: string, lesson: number) {
  const vocab = getVocab(lesson);
  const sentence = vocab.sentences[randInt(0, vocab.sentences.length - 1)];
  const parts = sentence.replace(/[.,?]/g, '').split(' ');
  return {
    id, type: "sentence_reorder", instruction: "Sắp xếp lại câu",
    question_data: { parts: parts.sort(() => Math.random() - 0.5), correct_sentence: sentence },
    source_anchor: { book: "Global Success 3", lesson: `Unit ${lesson}`, page: 0 }
  };
}

function genTapWord(id: string, lesson: number) {
  const vocab = getVocab(lesson);
  const target = vocab.words[randInt(0, vocab.words.length - 1)];
  const choices = vocab.words.map(w => w.en).sort(() => Math.random() - 0.5);
  return {
    id, type: "tap_word", instruction: "Chọn từ đúng nghĩa",
    question_data: { target_word: target.vi, correct_word: target.en, choices: Array.from(new Set(choices)) },
    source_anchor: { book: "Global Success 3", lesson: `Unit ${lesson}`, page: 0 }
  };
}

function genMatchPair(id: string, lesson: number) {
  const vocab = getVocab(lesson);
  const pairs = vocab.words.slice(0, 4).map(w => ({ left: w.en, right: w.vi }));
  return {
    id, type: "match_pair", instruction: "Nối từ tiếng Anh với tiếng Việt",
    question_data: { pairs },
    source_anchor: { book: "Global Success 3", lesson: `Unit ${lesson}`, page: 0 }
  };
}

export function generateQuestions(lesson: number, volume: number, countPerTest: number = 10): any[] {
  const questions: any[] = [];
  const TOTAL_Q = countPerTest;
  
  const generators = [genSentenceReorder, genTapWord, genMatchPair];

  for (let i = 1; i <= TOTAL_Q; i++) {
    const generator = generators[randInt(0, generators.length - 1)];
    questions.push(generator(`Q${String(i).padStart(3, '0')}`, lesson));
  }
  
  return questions;
}
