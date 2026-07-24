/**
 * Sinh thêm đề cho collection "Luyện chính tả Level 1" (pre-a1-starter, units [101]).
 * - Đọc file JSON hiện có, GIỮ NGUYÊN collection header + Đề 01, ghi thêm Đề 02..N.
 * - Mỗi đề 20 câu fill_blank: 10 câu khuyết 2-3 chữ cái liên tiếp + 10 câu chọn cách viết đúng.
 * - Seeded RNG => reproducible.
 * Chạy: npx tsx scratch/gen-spelling-l1.ts [--list]  (--list chỉ in danh sách từ hợp lệ)
 */
import fs from 'fs';
import path from 'path';
import { vocabTopics } from '../lib/data/startersVocabulary';

const FILE = path.resolve('content/exam-bank/tieng-anh/pre-a1-spelling-level1.json');

// 20 từ đã dùng ở Đề 01 — không dùng lại
const USED_DE01 = new Set([
  'apple', 'banana', 'yellow', 'monkey', 'purple', 'chicken', 'sister', 'water', 'tiger',
  'elephant', 'cat', 'dog', 'fish', 'milk', 'red', 'egg', 'bread', 'horse', 'green', 'hand',
]);

// Nghĩa tiếng Việt override (chọn nghĩa dễ hiểu nhất với trẻ / tránh trùng nghĩa giữa 2 từ)
const MEANING_OVERRIDE: Record<string, string> = {
  orange: 'màu cam',
  mouse: 'con chuột',
  tail: 'cái đuôi',
  yes: 'vâng / dạ',
  have: 'có',
  paint: 'tô màu',
  pear: 'quả lê',
  lemon: 'quả chanh vàng',
  lime: 'quả chanh xanh',
  mango: 'quả xoài',
  coconut: 'quả dừa',
  grapes: 'quả nho',
  tomato: 'quả cà chua',
  potato: 'củ khoai tây',
  carrot: 'củ cà rốt',
  onion: 'củ hành tây',
  flower: 'bông hoa',
};

// Động vật ở vườn thú -> thêm "con " cho tự nhiên (giống Đề 01: "con mèo", "con hổ")
const ZOO_CON = new Set([
  'bird', 'cow', 'duck', 'frog', 'giraffe', 'goat', 'hippo', 'lizard', 'sheep', 'snake', 'spider',
]);

const TOPIC_TAG: Record<string, string> = {
  'my-body': 'my-body',
  'at-the-zoo': 'animals',
  clothes: 'clothes',
  colours: 'colours',
  family: 'family',
  food: 'food',
  'at-home': 'home',
  'at-school': 'school',
  'sports-beach': 'sports',
  'my-street': 'street',
  'tieng-anh-3-extra': 'basics',
};

// ---- seeded RNG (mulberry32) ----
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260724);
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- build eligible word list ----
interface W { english: string; meaning: string; tag: string; }
const seen = new Set<string>();
const allEnglishLower = new Set<string>(); // mọi từ trong wordlist (kể cả không hợp lệ) — tránh distractor trùng từ thật
const eligible: W[] = [];
for (const topic of vocabTopics) {
  for (const w of topic.words) {
    const en = w.english;
    allEnglishLower.add(en.toLowerCase());
    const key = en.toLowerCase();
    if (seen.has(key)) continue; // mỗi từ tiếng Anh chỉ dùng 1 lần (lấy nghĩa lần gặp đầu + override)
    if (!/^[A-Za-z]+$/.test(en)) continue; // từ đơn, không khoảng trắng/gạch nối
    if (en.length < 3 || en.length > 8) continue;
    seen.add(key);
    if (USED_DE01.has(key)) continue;
    let meaning = MEANING_OVERRIDE[key] ?? w.vietnamese;
    if (topic.id === 'at-the-zoo' && ZOO_CON.has(key)) meaning = `con ${w.vietnamese}`;
    eligible.push({ english: en, meaning, tag: TOPIC_TAG[topic.id] ?? topic.id });
  }
}

if (process.argv.includes('--list')) {
  console.log(`Tổng từ hợp lệ (chưa dùng): ${eligible.length}`);
  console.log(eligible.map((w) => `${w.english} (${w.meaning}) [${w.tag}]`).join('\n'));
  process.exit(0);
}

// ---- distractor helpers ----
const CONF: Record<string, string[]> = {
  a: ['o', 'e', 'u'], b: ['d', 'p'], c: ['k', 's'], d: ['b', 'p'], e: ['a', 'i'],
  f: ['t', 'v'], g: ['j', 'q'], h: ['n', 'k'], i: ['l', 'e', 'y'], j: ['g', 'y'],
  k: ['c', 'x'], l: ['i', 'r'], m: ['n', 'w'], n: ['m', 'u', 'r'], o: ['a', 'u', 'e'],
  p: ['b', 'q'], q: ['g', 'p'], r: ['n', 'l'], s: ['c', 'z', 'x'], t: ['d', 'f'],
  u: ['o', 'a', 'v'], v: ['w', 'f'], w: ['v', 'm'], x: ['s', 'k'], y: ['i', 'j'], z: ['s', 'x'],
};

function subCandidates(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch !== ch.toLowerCase()) continue; // giữ nguyên chữ hoa (VD "English")
    for (const r of CONF[ch] ?? []) out.push(s.slice(0, i) + r + s.slice(i + 1));
  }
  return out;
}
function swapCandidates(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i + 1 < s.length; i++) {
    if (s[i] === s[i + 1]) continue;
    out.push(s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2));
  }
  if (s.length === 3) {
    const rev = [...s].reverse().join('');
    if (rev !== s) out.push(rev);
  }
  return out;
}
function doubleReduceCandidates(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i + 1 < s.length; i++) {
    if (s[i] === s[i + 1]) out.push(s.slice(0, i) + s.slice(i + 1));
  }
  return out;
}
function randomLetterSub(s: string): string {
  const i = Math.floor(rng() * s.length);
  const alt = 'abcdefghijklmnopqrstuvwxyz'.replace(s[i].toLowerCase(), '');
  const r = alt[Math.floor(rng() * alt.length)];
  return s.slice(0, i) + r + s.slice(i + 1);
}

/** Chọn 3 distractor từ danh sách ứng viên, đảm bảo khác đáp án, khác nhau, không phải từ thật khác. */
function pick3(answer: string, candidates: string[], invalid: (c: string) => boolean): string[] {
  const chosen: string[] = [];
  const pool = shuffle([...new Set(candidates)]);
  for (const c of pool) {
    if (chosen.length === 3) break;
    if (c.toLowerCase() === answer.toLowerCase()) continue;
    if (chosen.some((x) => x.toLowerCase() === c.toLowerCase())) continue;
    if (invalid(c)) continue;
    chosen.push(c);
  }
  let guard = 0;
  while (chosen.length < 3 && guard++ < 500) {
    const c = randomLetterSub(answer);
    if (c.toLowerCase() === answer.toLowerCase()) continue;
    if (chosen.some((x) => x.toLowerCase() === c.toLowerCase())) continue;
    if (invalid(c)) continue;
    chosen.push(c);
  }
  if (chosen.length < 3) throw new Error(`Không đủ distractor cho "${answer}"`);
  return chosen;
}

// ---- question builders ----
function buildGapQuestion(w: W) {
  const word = w.english;
  const len = word.length;
  const gapLen = len >= 6 ? (rng() < 0.5 ? 3 : 2) : 2;
  const start = 1 + Math.floor(rng() * (len - gapLen)); // giữ chữ cái đầu luôn hiện
  const answer = word.slice(start, start + gapLen);
  const pattern = [...word]
    .map((ch, i) => (i >= start && i < start + gapLen ? '_' : ch))
    .join(' ');
  const formsRealWord = (chunk: string) => {
    const formed = (word.slice(0, start) + chunk + word.slice(start + gapLen)).toLowerCase();
    return formed !== word.toLowerCase() && allEnglishLower.has(formed);
  };
  const distractors = pick3(answer, [...subCandidates(answer), ...swapCandidates(answer)], formsRealWord);
  const choices = shuffle([answer, ...distractors]);
  return {
    type: 'fill_blank',
    difficulty: 1,
    metadata_json: {
      question: `Điền các chữ cái còn thiếu để hoàn chỉnh từ tiếng Anh có nghĩa **"${w.meaning}"**: **${pattern}**`,
      choices,
      correct_answer: answer,
      explanation: `Từ đầy đủ là **"${word}"**, nghĩa là "${w.meaning}".`,
      retry_until_correct: true,
      tags: ['spelling', 'level-1', w.tag],
    },
  };
}

function buildWholeWordQuestion(w: W) {
  const word = w.english;
  const isOtherRealWord = (c: string) =>
    c.toLowerCase() !== word.toLowerCase() && allEnglishLower.has(c.toLowerCase());
  const distractors = pick3(
    word,
    [...subCandidates(word), ...swapCandidates(word), ...doubleReduceCandidates(word)],
    isOtherRealWord,
  );
  const choices = shuffle([word, ...distractors]);
  return {
    type: 'fill_blank',
    difficulty: 1,
    metadata_json: {
      question: `Từ tiếng Anh có nghĩa **"${w.meaning}"** được viết đúng là:`,
      choices,
      correct_answer: word,
      explanation: `**"${word}"** nghĩa là "${w.meaning}", ghép bởi ${word.length} chữ cái ${[...word].join('-')}.`,
      retry_until_correct: true,
      tags: ['spelling', 'level-1', w.tag],
    },
  };
}

// ---- chia đề ----
const pool = shuffle(eligible);
const groups: W[][] = [];
for (let i = 0; i < pool.length; i += 20) groups.push(pool.slice(i, i + 20));
const last = groups[groups.length - 1];
const reusedForLastExam: W[] = [];
if (last.length < 20) {
  // đề chót: trộn lại vài từ của các đề trước cho đủ 20 câu
  const earlier = shuffle(pool.slice(0, pool.length - last.length));
  while (last.length < 20) {
    const w = earlier.pop()!;
    reusedForLastExam.push(w);
    last.push(w);
  }
}

const exams = groups.map((words, gi) => {
  // 10 từ dài nhất -> khuyết chuỗi chữ cái; 10 từ còn lại -> chọn cách viết đúng
  const sorted = [...words].sort((a, b) => b.english.length - a.english.length);
  const gapWords = shuffle(sorted.slice(0, 10));
  const wholeWords = shuffle(sorted.slice(10));
  const num = gi + 2; // Đề 01 đã có sẵn
  return {
    exam_number: num,
    title: `Đề ${String(num).padStart(2, '0')}`,
    duration_minutes: 15,
    questions: [...gapWords.map(buildGapQuestion), ...wholeWords.map(buildWholeWordQuestion)],
  };
});

// ---- ghi file: giữ nguyên header + Đề 01 ----
const existing = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const de01 = existing.exams.find((e: { exam_number: number }) => e.exam_number === 1);
if (!de01) throw new Error('Không tìm thấy Đề 01 trong file hiện có');
existing.exams = [de01, ...exams];
fs.writeFileSync(FILE, JSON.stringify(existing, null, 2) + '\n', 'utf8');

console.log(`Từ hợp lệ chưa dùng: ${eligible.length}`);
console.log(`Đã sinh ${exams.length} đề mới (Đề 02 → Đề ${String(exams.length + 1).padStart(2, '0')}), mỗi đề 20 câu.`);
console.log(`Từ trộn lại ở đề chót: ${reusedForLastExam.length ? reusedForLastExam.map((w) => w.english).join(', ') : '(không có)'}`);
console.log(`Tổng phủ: ${eligible.length} từ mới + 20 từ Đề 01 = ${eligible.length + 20} từ.`);
