/**
 * gen-spelling-l2.ts
 * Sinh 20 đề × 20 câu Chính Tả Level 2 cho pre-a1-starter
 *
 * Điểm khác Level 1:
 * - Từ đơn dài 9-11 ký tự (mới hoàn toàn)
 * - Cụm từ 2-3 từ ghép liền không space (birthdaycake, icecream...)
 * - Tái dùng từ 7-8 ký tự với pool nhiễu lớn hơn (12-16 chữ, 4-6 nhiễu)
 * - 20 đề: Đề 1-5 từ đơn dài, Đề 6-10 cụm ngắn, Đề 11-15 cụm dài/mix, Đề 16-20 tổng hợp
 * - Seed RNG: 20260816
 *
 * Chạy: npx tsx scratch/gen-spelling-l2.ts
 */

import fs from 'fs';
import path from 'path';

// ===== SEEDED RNG (Mulberry32) =====
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const SEED = 20260816;
let rng = mulberry32(SEED);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== WORD POOL =====
interface Word {
  /** Chuỗi cần ghép (đã bỏ space nếu là cụm) */
  answer: string;
  /** Tiếng Việt để hiển thị trong câu hỏi */
  vietnamese: string;
  /** Chuỗi phát âm TTS (giữ space nếu cụm) */
  audioText: string;
  /** Tag chủ đề */
  topic: string;
  /** Cụm gốc (có space), undefined nếu là từ đơn */
  originalPhrase?: string;
}

const WORD_POOL: Word[] = [
  // === Từ đơn mới 9-11 ký tự ===
  { answer: 'butterfly',   vietnamese: 'con bướm',         audioText: 'butterfly',   topic: 'animals' },
  { answer: 'caterpillar', vietnamese: 'con sâu bướm',     audioText: 'caterpillar', topic: 'animals' },
  { answer: 'crocodile',   vietnamese: 'cá sấu',           audioText: 'crocodile',   topic: 'animals' },
  { answer: 'jellyfish',   vietnamese: 'con sứa',          audioText: 'jellyfish',   topic: 'animals' },
  { answer: 'kangaroo',    vietnamese: 'con chuột túi',    audioText: 'kangaroo',    topic: 'animals' },
  { answer: 'orangutan',   vietnamese: 'con đười ươi',     audioText: 'orangutan',   topic: 'animals' },
  { answer: 'starfish',    vietnamese: 'con sao biển',     audioText: 'starfish',    topic: 'animals' },
  { answer: 'tortoise',    vietnamese: 'con rùa cạn',      audioText: 'tortoise',    topic: 'animals' },
  { answer: 'different',   vietnamese: 'khác biệt',        audioText: 'different',   topic: 'adjectives' },
  { answer: 'favourite',   vietnamese: 'yêu thích nhất',   audioText: 'favourite',   topic: 'adjectives' },
  { answer: 'umbrella',    vietnamese: 'cái ô (dù)',        audioText: 'umbrella',    topic: 'clothes' },
  { answer: 'bookshelf',   vietnamese: 'kệ sách',          audioText: 'bookshelf',   topic: 'home' },
  { answer: 'chocolate',   vietnamese: 'sô cô la',         audioText: 'chocolate',   topic: 'food' },
  { answer: 'pineapple',   vietnamese: 'quả dứa',          audioText: 'pineapple',   topic: 'food' },
  { answer: 'strawberry',  vietnamese: 'quả dâu tây',      audioText: 'strawberry',  topic: 'food' },
  { answer: 'watermelon',  vietnamese: 'quả dưa hấu',      audioText: 'watermelon',  topic: 'food' },

  // === Từ 7-8 ký tự tái dùng (từ L1 nhưng pool nhiễu lớn hơn) ===
  { answer: 'giraffe',     vietnamese: 'con hươu cao cổ',  audioText: 'giraffe',     topic: 'animals' },
  { answer: 'elephant',    vietnamese: 'con voi',          audioText: 'elephant',    topic: 'animals' },
  { answer: 'dolphin',     vietnamese: 'con cá heo',       audioText: 'dolphin',     topic: 'animals' },
  { answer: 'penguin',     vietnamese: 'con chim cánh cụt',audioText: 'penguin',     topic: 'animals' },
  { answer: 'chicken',     vietnamese: 'con gà',           audioText: 'chicken',     topic: 'animals' },
  { answer: 'hamster',     vietnamese: 'chuột hamster',    audioText: 'hamster',     topic: 'animals' },
  { answer: 'teacher',     vietnamese: 'giáo viên',        audioText: 'teacher',     topic: 'school' },
  { answer: 'bedroom',     vietnamese: 'phòng ngủ',        audioText: 'bedroom',     topic: 'home', originalPhrase: 'bed room' },
  { answer: 'bathroom',    vietnamese: 'phòng tắm',        audioText: 'bathroom',    topic: 'home', originalPhrase: 'bath room' },
  { answer: 'playroom',    vietnamese: 'phòng chơi',       audioText: 'playroom',    topic: 'home', originalPhrase: 'play room' },
  { answer: 'morning',     vietnamese: 'buổi sáng',        audioText: 'morning',     topic: 'time' },
  { answer: 'evening',     vietnamese: 'buổi tối',         audioText: 'evening',     topic: 'time' },
  { answer: 'holiday',     vietnamese: 'ngày nghỉ lễ',     audioText: 'holiday',     topic: 'time' },
  { answer: 'kitchen',     vietnamese: 'nhà bếp',          audioText: 'kitchen',     topic: 'home' },
  { answer: 'present',     vietnamese: 'món quà',          audioText: 'present',     topic: 'birthday' },
  { answer: 'balloon',     vietnamese: 'quả bóng bay',     audioText: 'balloon',     topic: 'birthday' },
  { answer: 'sandals',     vietnamese: 'dép xăng đan',     audioText: 'sandals',     topic: 'clothes' },
  { answer: 'trousers',    vietnamese: 'quần dài',         audioText: 'trousers',    topic: 'clothes' },
  { answer: 'sweater',     vietnamese: 'áo len',           audioText: 'sweater',     topic: 'clothes' },
  { answer: 'glasses',     vietnamese: 'kính mắt',         audioText: 'glasses',     topic: 'clothes' },
  { answer: 'fingers',     vietnamese: 'các ngón tay',     audioText: 'fingers',     topic: 'body' },
  { answer: 'stomach',     vietnamese: 'cái bụng',         audioText: 'stomach',     topic: 'body' },
  { answer: 'picture',     vietnamese: 'bức tranh',        audioText: 'picture',     topic: 'school' },
  { answer: 'outside',     vietnamese: 'bên ngoài',        audioText: 'outside',     topic: 'adjectives' },
  { answer: 'sunglasses',  vietnamese: 'kính mát',         audioText: 'sunglasses',  topic: 'clothes' },

  // === Cụm từ ghép liền (không space) ===
  { answer: 'icecream',    vietnamese: 'kem',               audioText: 'ice cream',   topic: 'food',     originalPhrase: 'ice cream' },
  { answer: 'hotdog',      vietnamese: 'xúc xích nướng',    audioText: 'hot dog',     topic: 'food',     originalPhrase: 'hot dog' },
  { answer: 'atschool',    vietnamese: 'ở trường',          audioText: 'at school',   topic: 'school',   originalPhrase: 'at school' },
  { answer: 'athome',      vietnamese: 'ở nhà',             audioText: 'at home',     topic: 'home',     originalPhrase: 'at home' },
  { answer: 'atthezoo',    vietnamese: 'ở sở thú',          audioText: 'at the zoo',  topic: 'animals',  originalPhrase: 'at the zoo' },
  { answer: 'atthebeach',  vietnamese: 'ở bãi biển',        audioText: 'at the beach',topic: 'beach',    originalPhrase: 'at the beach' },
  { answer: 'livingroom',  vietnamese: 'phòng khách',       audioText: 'living room', topic: 'home',     originalPhrase: 'living room' },
  { answer: 'diningroom',  vietnamese: 'phòng ăn',          audioText: 'dining room', topic: 'home',     originalPhrase: 'dining room' },
  { answer: 'myfamily',    vietnamese: 'gia đình tôi',      audioText: 'my family',   topic: 'family',   originalPhrase: 'my family' },
  { answer: 'fruitsalad',  vietnamese: 'salad trái cây',    audioText: 'fruit salad', topic: 'food',     originalPhrase: 'fruit salad' },
  { answer: 'birthdaycake',vietnamese: 'bánh sinh nhật',    audioText: 'birthday cake',topic: 'birthday',originalPhrase: 'birthday cake' },
  { answer: 'birthdaycard',vietnamese: 'thiệp sinh nhật',   audioText: 'birthday card',topic: 'birthday',originalPhrase: 'birthday card' },
  { answer: 'birthdayparty',vietnamese:'bữa tiệc sinh nhật',audioText:'birthday party',topic:'birthday', originalPhrase:'birthday party'},
  { answer: 'fishandchips',vietnamese: 'cá và khoai chiên', audioText: 'fish and chips',topic: 'food',  originalPhrase: 'fish and chips' },
  { answer: 'mystreet',    vietnamese: 'con phố của tôi',   audioText: 'my street',   topic: 'school',   originalPhrase: 'my street' },
  { answer: 'myfriend',    vietnamese: 'bạn của tôi',       audioText: 'my friend',   topic: 'family',   originalPhrase: 'my friend' },
];

console.log(`Total word pool: ${WORD_POOL.length} words`);

// ===== DISTRACTOR GENERATION =====
// Pool chữ cái hay gây nhầm lẫn theo nhóm âm
const CONFUSABLE: Record<string, string[]> = {
  'a': ['e', 'o', 'u', 'i', 'ä'],
  'e': ['a', 'i', 'o', 'ee', 'y'],
  'i': ['e', 'y', 'l', 'j'],
  'o': ['a', 'u', 'e', 'oo'],
  'u': ['o', 'oo', 'a', 'e'],
  'b': ['d', 'p', 'q'],
  'd': ['b', 't', 'p'],
  'g': ['j', 'q', 'y'],
  'j': ['g', 'i', 'y'],
  'l': ['i', 'r', 'e'],
  'm': ['n', 'w'],
  'n': ['m', 'h'],
  'p': ['b', 'd', 'q'],
  'q': ['g', 'p'],
  'r': ['l', 'n'],
  's': ['z', 'c', 'sh'],
  't': ['d', 'th'],
  'v': ['w', 'b', 'f'],
  'w': ['v', 'm', 'u'],
  'y': ['i', 'j', 'e'],
  'z': ['s', 'x'],
  'c': ['k', 's', 'ch'],
  'f': ['v', 'ph'],
  'h': ['n', 'k'],
  'k': ['c', 'g'],
  'x': ['z', 'ks'],
};

const ALL_LETTERS = 'abcdefghijklmnoprstuvwyz'.split('');

function generateDistractors(answer: string, count: number): string[] {
  const answerLetters = new Set(answer.split(''));
  const distractors = new Set<string>();

  // Ưu tiên chữ cái dễ nhầm với các chữ trong từ
  for (const ch of answer) {
    const confuse = CONFUSABLE[ch] || [];
    for (const d of confuse) {
      if (d.length === 1 && !answerLetters.has(d)) {
        distractors.add(d);
      }
    }
    if (distractors.size >= count) break;
  }

  // Bổ sung ngẫu nhiên nếu chưa đủ
  const shuffled = shuffle(ALL_LETTERS);
  for (const ch of shuffled) {
    if (distractors.size >= count) break;
    if (!answerLetters.has(ch)) distractors.add(ch);
  }

  return [...distractors].slice(0, count);
}

function buildLetterPool(answer: string): string[] {
  const answerChars = answer.split('');
  const numDistractors = answer.length >= 12 ? 6 : answer.length >= 9 ? 5 : 4;
  const distractors = generateDistractors(answer, numDistractors);
  const pool = [...answerChars, ...distractors];
  return shuffle(pool);
}

function buildQuestion(word: Word): object {
  const pool = buildLetterPool(word.answer);
  const displayVietnamese = `"${word.vietnamese}"`;

  return {
    type: 'spell_builder',
    difficulty: 2,
    metadata_json: {
      question: `Nghĩa: **${displayVietnamese}** — ghép các chữ cái theo đúng thứ tự để được từ/cụm tiếng Anh đúng.`,
      letters: word.answer.split(''),
      letter_pool: pool,
      audio_text: word.audioText,
      tags: ['spelling', 'level-2', word.topic],
    },
  };
}

// ===== PHÂN BỔ 20 ĐỀ =====
// Đề 1-5:   từ đơn mới dài (9-11 ký tự) — 16 từ, mỗi đề 20 câu → lặp lại 1-2 lần
// Đề 6-10:  cụm ghép liền ngắn (6-10 ký tự) + từ đơn 7-8 mix
// Đề 11-15: cụm ghép liền dài (10-14 ký tự) + từ đơn 9+
// Đề 16-20: ôn tập tổng hợp toàn bộ pool

const longSingleWords = WORD_POOL.filter(w => !w.originalPhrase && w.answer.length >= 9);
const reuse78Words    = WORD_POOL.filter(w => !w.originalPhrase && w.answer.length <= 8);
const shortCompounds  = WORD_POOL.filter(w => w.originalPhrase && w.answer.length <= 10);
const longCompounds   = WORD_POOL.filter(w => w.originalPhrase && w.answer.length > 10);
const allWords        = WORD_POOL;

console.log(`Long single 9+: ${longSingleWords.length}`);
console.log(`Reuse 7-8 char: ${reuse78Words.length}`);
console.log(`Short compounds <=10: ${shortCompounds.length}`);
console.log(`Long compounds >10: ${longCompounds.length}`);

function makePool20(primaryPool: Word[], fillPool: Word[]): Word[] {
  // Phân bổ 20 từ từ primaryPool (lặp lại nếu cần) + điền thêm từ fillPool
  let pool: Word[] = [];
  const shuffledPrimary = shuffle(primaryPool);
  const shuffledFill    = shuffle(fillPool);

  // Điền từ primary (lặp vòng)
  for (let i = 0; pool.length < 20; i++) {
    pool.push(shuffledPrimary[i % shuffledPrimary.length]);
  }

  // Đảm bảo không trùng quá 2 lần cùng từ
  const count: Record<string, number> = {};
  const result: Word[] = [];
  const fillIt = shuffle([...primaryPool, ...fillPool]);
  let fi = 0;

  for (const w of pool) {
    count[w.answer] = (count[w.answer] || 0) + 1;
    if (count[w.answer] <= 2) {
      result.push(w);
    } else {
      // Tìm từ thay thế chưa dùng đủ
      while (fi < fillIt.length && (count[fillIt[fi].answer] || 0) >= 2) fi++;
      if (fi < fillIt.length) {
        count[fillIt[fi].answer] = (count[fillIt[fi].answer] || 0) + 1;
        result.push(fillIt[fi]);
        fi++;
      } else {
        result.push(w); // fallback
      }
    }
  }

  return result.slice(0, 20);
}

// Sinh đề theo 4 nhóm
function makeExamGroup(groupIdx: number, groupSize: number, primary: Word[], fill: Word[]): object[] {
  const exams: object[] = [];
  for (let i = 0; i < groupSize; i++) {
    rng = mulberry32(SEED + groupIdx * 100 + i); // reset seed theo đề
    const words = makePool20(primary, fill);
    exams.push(words.map(buildQuestion));
  }
  return exams;
}

// Sinh 20 đề
const allExams: object[][] = [];

// Đề 1-5: từ đơn dài mới (9+) — fill = reuse78
for (let i = 0; i < 5; i++) {
  rng = mulberry32(SEED + i);
  const words = makePool20(longSingleWords, reuse78Words);
  allExams.push(words.map(buildQuestion));
}

// Đề 6-10: cụm ngắn (<=10) + reuse78 + từ đơn dài
for (let i = 0; i < 5; i++) {
  rng = mulberry32(SEED + 100 + i);
  const words = makePool20([...shortCompounds, ...reuse78Words.slice(0, 8)], longSingleWords);
  allExams.push(words.map(buildQuestion));
}

// Đề 11-15: cụm dài (>10) + từ đơn 9+
for (let i = 0; i < 5; i++) {
  rng = mulberry32(SEED + 200 + i);
  const words = makePool20([...longCompounds, ...longSingleWords], reuse78Words);
  allExams.push(words.map(buildQuestion));
}

// Đề 16-20: tổng hợp toàn bộ pool
for (let i = 0; i < 5; i++) {
  rng = mulberry32(SEED + 300 + i);
  const words = makePool20(allWords, allWords);
  allExams.push(words.map(buildQuestion));
}

// ===== BUILD OUTPUT JSON =====
const output = {
  collection: {
    title: 'Luyện chính tả Level 2',
    subject_slug: 'pre-a1-starter',
    grade: 3,
    volume: 1,
    units: [102],
    sequence_number: 2,
    exam_type: 'lesson',
    reference_book: 'Pre A1 Starters + Tiếng Anh 3 Wordlist',
    status: 'published',
  },
  exams: allExams.map((questions, idx) => ({
    exam_number: idx + 1,
    title: `PreA1 - Chính tả - Lv2 - Đề ${idx + 1}`,
    duration_minutes: 20,
    questions,
  })),
};

// ===== VERIFY =====
console.log('\n=== VERIFY ===');
console.log(`Total exams: ${output.exams.length}`);
let totalQ = 0;
let errors: string[] = [];
for (const exam of output.exams) {
  const qs = exam.questions as any[];
  totalQ += qs.length;
  if (qs.length !== 20) errors.push(`${exam.title}: ${qs.length} câu (cần 20)`);
  for (const q of qs) {
    const m = q.metadata_json;
    const answer = m.letters.join('');
    const poolMultiset = [...m.letter_pool].sort().join('');
    const answerMultiset = [...answer].sort().join('');
    // Kiểm tra pool chứa đủ multiset của đáp án
    const answerCopy = [...answer];
    const poolCopy = [...m.letter_pool];
    for (const ch of answerCopy) {
      const idx = poolCopy.indexOf(ch);
      if (idx === -1) {
        errors.push(`${exam.title}: "${answer}" thiếu chữ "${ch}" trong pool [${m.letter_pool.join(',')}]`);
        break;
      }
      poolCopy.splice(idx, 1);
    }
    // Kiểm tra có nhiễu
    const distractors = m.letter_pool.length - answer.length;
    if (distractors < 3) {
      errors.push(`${exam.title}: "${answer}" chỉ có ${distractors} nhiễu (cần >=3)`);
    }
  }
}
console.log(`Total questions: ${totalQ} (expected 400)`);
if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} lỗi:`);
  errors.forEach(e => console.error('  -', e));
  process.exit(1);
} else {
  console.log('✅ Tất cả verify OK!');
}

// ===== WRITE FILE =====
const outPath = path.resolve(process.cwd(), 'content/exam-bank/tieng-anh/pre-a1-spelling-level2.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`\n✅ Đã ghi: ${outPath}`);
console.log(`File size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
