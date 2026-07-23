/**
 * generate-wordlist-level2.ts
 * Sinh 20 đề × 20 câu cho collection "Wordlist Level 2" (exam_type: reflex)
 * Mỗi đề: 4 en-to-vi + 3 vi-to-en + 3 context-fill + 2 categorize + 2 spelling + 6 listening (mp3)
 *
 * Chạy: npx tsx scripts/generate-wordlist-level2.ts
 */

import { vocabTopics, allVocabWords, VocabWord, VocabTopic } from '../lib/data/startersVocabulary';
import * as fs from 'fs';
import * as path from 'path';

// ────────────────────────────────────────────────────────────
// SEEDED RNG — reproducible output
// ────────────────────────────────────────────────────────────
function makeLCG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rand = makeLCG(1337);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ────────────────────────────────────────────────────────────
// LOAD AUDIO POOL từ file listening-level2 sẵn có
// ────────────────────────────────────────────────────────────
interface AudioEntry {
  audio_text: string;
  audio_url: string;
  voice: string;
  question: string;
  options: string[];
  correct_index: number;
  tags: string[];
}

const rawJson = JSON.parse(
  fs.readFileSync(
    path.join('content', 'exam-bank', 'pre-a1-listening-level2-exams.json'),
    'utf-8'
  )
);
const audioPool: AudioEntry[] = [];
for (const exam of rawJson.exams) {
  for (const q of exam.questions) {
    const m = q.metadata_json;
    if (q.type === 'listening_multiple_choice' && m.audio_url) {
      audioPool.push({
        audio_text: m.audio_text,
        audio_url: m.audio_url,
        voice: m.voice ?? 'teacher_women',
        question: m.question ?? '🔊 Nghe và chọn câu đúng:',
        options: m.options,
        correct_index: m.correct_index,
        tags: m.tags ?? ['listening', 'sentence', 'level-2'],
      });
    }
  }
}
console.log(`Audio pool: ${audioPool.length} entries`);

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
function makeOptions(correct: string, distractors: string[]) {
  const all = shuffle([correct, ...distractors.slice(0, 3)]);
  return { options: all, correct_index: all.indexOf(correct) };
}

function getTopicForWord(word: VocabWord): VocabTopic {
  return vocabTopics.find(t => t.words.some(w => w.id === word.id))!;
}

function getSameTopicDistractors(
  word: VocabWord,
  topic: VocabTopic,
  field: 'english' | 'vietnamese',
  count: number
): string[] {
  const same = shuffle(
    topic.words.filter(w => w.id !== word.id).map(w => w[field] as string)
  );
  if (same.length >= count) return same.slice(0, count);
  const others = shuffle(
    allVocabWords
      .filter(w => !topic.words.find(t => t.id === w.id))
      .map(w => w[field] as string)
  );
  return [...same, ...others].slice(0, count);
}

// ────────────────────────────────────────────────────────────
// QUESTION BUILDERS
// ────────────────────────────────────────────────────────────
function buildEnToVi(word: VocabWord, topic: VocabTopic) {
  const distractors = getSameTopicDistractors(word, topic, 'vietnamese', 3);
  const { options, correct_index } = makeOptions(word.vietnamese, distractors);
  return {
    type: 'multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      question: `**"${word.english}"** ${word.emoji ?? ''} nghĩa là gì?`,
      options,
      correct_index,
      explanation: `**${word.english}** = **${word.vietnamese}** ${word.emoji ?? ''}`,
      tags: ['vocab', 'en-to-vi', topic.id],
    },
  };
}

function buildViToEn(word: VocabWord, topic: VocabTopic) {
  const distractors = getSameTopicDistractors(word, topic, 'english', 3);
  const { options, correct_index } = makeOptions(word.english, distractors);
  return {
    type: 'multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      question: `**"${word.vietnamese}"** ${word.emoji ?? ''} trong tiếng Anh là gì?`,
      options,
      correct_index,
      explanation: `**${word.vietnamese}** = **${word.english}** ${word.emoji ?? ''}`,
      tags: ['vocab', 'vi-to-en', topic.id],
    },
  };
}

interface ContextTemplate {
  sentence: string;
  correct: string;
  distractors: [string, string, string];
  emoji: string;
  topic: string;
  explanation: string;
}

function buildContextFill(t: ContextTemplate) {
  const { options, correct_index } = makeOptions(t.correct, t.distractors);
  return {
    type: 'multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      question: `Chọn từ thích hợp điền vào chỗ trống ${t.emoji}: **"${t.sentence}"**`,
      options,
      correct_index,
      explanation: t.explanation,
      tags: ['vocab', 'context-fill', t.topic],
    },
  };
}

interface CategorizeSet {
  category: string;
  categoryVi: string;
  correct: string[];
  intruder: string;
  intruderCategory: string;
  emoji: string;
}

function buildCategorize(s: CategorizeSet) {
  const { options, correct_index } = makeOptions(s.intruder, shuffle(s.correct).slice(0, 3));
  return {
    type: 'multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      question: `Từ nào **KHÔNG phải** là ${s.categoryVi}? ${s.emoji}`,
      options,
      correct_index,
      explanation: `**${s.intruder}** là ${s.intruderCategory}, không phải ${s.categoryVi}.`,
      tags: ['vocab', 'categorize', s.category],
    },
  };
}

interface SpellingWord {
  word: string;
  display: string;
  missingLetter: string;
  meaning: string;
  emoji: string;
  topic: string;
  distractors: [string, string, string];
}

function buildSpelling(s: SpellingWord) {
  const { options, correct_index } = makeOptions(s.missingLetter, s.distractors);
  return {
    type: 'multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      question: `Điền chữ cái còn thiếu ${s.emoji}: **${s.display}** (nghĩa: ${s.meaning})`,
      options,
      correct_index,
      explanation: `Từ đầy đủ là **${s.word}** ${s.emoji} (${s.meaning}).`,
      tags: ['spelling', s.topic],
    },
  };
}

function buildListening(entry: AudioEntry) {
  return {
    type: 'listening_multiple_choice',
    difficulty: 1.5,
    metadata_json: {
      voice: entry.voice,
      audio_text: entry.audio_text,
      audio_url: entry.audio_url,
      question: entry.question,
      options: entry.options,
      correct_index: entry.correct_index,
      tags: entry.tags,
    },
  };
}

// ────────────────────────────────────────────────────────────
// TEMPLATE DATA
// ────────────────────────────────────────────────────────────

const contextTemplates: ContextTemplate[] = [
  // Animals (8)
  { sentence: 'I can see a ___ at the zoo.', correct: 'elephant', distractors: ['chair', 'milk', 'hat'], emoji: '🐘', topic: 'at-the-zoo', explanation: '**elephant** 🐘 là động vật ở vườn thú.' },
  { sentence: 'The ___ has a very long neck.', correct: 'giraffe', distractors: ['ruler', 'sofa', 'bread'], emoji: '🦒', topic: 'at-the-zoo', explanation: '**giraffe** 🦒 (hươu cao cổ) có cổ rất dài.' },
  { sentence: 'A ___ can jump very high.', correct: 'frog', distractors: ['table', 'clock', 'shoe'], emoji: '🐸', topic: 'at-the-zoo', explanation: '**frog** 🐸 (ếch) nhảy rất cao.' },
  { sentence: 'The ___ is black and orange.', correct: 'tiger', distractors: ['juice', 'desk', 'mirror'], emoji: '🐯', topic: 'at-the-zoo', explanation: '**tiger** 🐯 (hổ) có màu đen và cam.' },
  { sentence: 'Look at the ___ climbing the tree!', correct: 'monkey', distractors: ['bread', 'lamp', 'sock'], emoji: '🐒', topic: 'at-the-zoo', explanation: '**monkey** 🐒 (khỉ) leo cây rất giỏi.' },
  { sentence: 'There is a ___ in the garden!', correct: 'snake', distractors: ['chair', 'mango', 'bus'], emoji: '🐍', topic: 'at-the-zoo', explanation: '**snake** 🐍 (rắn) có thể xuất hiện trong vườn.' },
  { sentence: 'The ___ is swimming in the river.', correct: 'crocodile', distractors: ['ruler', 'hat', 'sofa'], emoji: '🐊', topic: 'at-the-zoo', explanation: '**crocodile** 🐊 (cá sấu) bơi trong sông.' },
  { sentence: 'A ___ sat on my computer!', correct: 'spider', distractors: ['milk', 'train', 'pencil'], emoji: '🕷', topic: 'at-the-zoo', explanation: '**spider** 🕷 (nhện) có thể ở trong nhà.' },
  // Clothes (8)
  { sentence: 'She wears a pink ___ to the party.', correct: 'dress', distractors: ['tiger', 'banana', 'clock'], emoji: '👗', topic: 'clothes', explanation: '**dress** 👗 (váy/đầm) thường mặc đi tiệc.' },
  { sentence: 'He puts on his ___ before going out.', correct: 'jacket', distractors: ['fish', 'ruler', 'park'], emoji: '🧥', topic: 'clothes', explanation: '**jacket** 🧥 (áo khoác) mặc khi ra ngoài.' },
  { sentence: 'I need my ___ — it is cold today!', correct: 'hat', distractors: ['lemon', 'spider', 'bedroom'], emoji: '🎩', topic: 'clothes', explanation: '**hat** 🎩 (mũ) giữ ấm khi trời lạnh.' },
  { sentence: 'He wears ___ to see clearly.', correct: 'glasses', distractors: ['bread', 'monkey', 'train'], emoji: '👓', topic: 'clothes', explanation: '**glasses** 👓 (kính mắt) giúp nhìn rõ hơn.' },
  { sentence: 'I put my books in my ___.', correct: 'bag', distractors: ['snake', 'mirror', 'morning'], emoji: '🎒', topic: 'clothes', explanation: '**bag** 🎒 (túi) dùng đựng sách vở.' },
  { sentence: 'My ___ are too small for my feet!', correct: 'shoes', distractors: ['grapes', 'pencil', 'kitchen'], emoji: '👟', topic: 'clothes', explanation: '**shoes** 👟 (giày) đi vào chân.' },
  { sentence: 'Her ___ is brown and very big.', correct: 'handbag', distractors: ['cow', 'ruler', 'garden'], emoji: '👜', topic: 'clothes', explanation: '**handbag** 👜 (túi xách tay) màu nâu và to.' },
  { sentence: 'She has new ___ for school tomorrow.', correct: 'jeans', distractors: ['elephant', 'milk', 'sofa'], emoji: '👖', topic: 'clothes', explanation: '**jeans** 👖 (quần jeans) mặc đi học.' },
  // Food (12)
  { sentence: 'My favourite fruit is ___.', correct: 'mango', distractors: ['chair', 'T-shirt', 'ruler'], emoji: '🥭', topic: 'food', explanation: '**mango** 🥭 (xoài) là loại trái cây ngon.' },
  { sentence: 'I drink ___ every morning for breakfast.', correct: 'milk', distractors: ['monkey', 'window', 'sock'], emoji: '🥛', topic: 'food', explanation: '**milk** 🥛 (sữa) uống mỗi sáng rất tốt.' },
  { sentence: 'We have ___ and eggs for breakfast.', correct: 'bread', distractors: ['watch', 'bike', 'door'], emoji: '🍞', topic: 'food', explanation: '**bread** 🍞 (bánh mì) thường ăn sáng kèm trứng.' },
  { sentence: 'I like ___ on my pizza.', correct: 'tomato', distractors: ['balloon', 'clock', 'jacket'], emoji: '🍅', topic: 'food', explanation: '**tomato** 🍅 (cà chua) là nguyên liệu pizza phổ biến.' },
  { sentence: 'She eats a ___ at the beach.', correct: 'burger', distractors: ['mirror', 'teacher', 'shoe'], emoji: '🍔', topic: 'food', explanation: '**burger** 🍔 (bánh mì kẹp) thường ăn ở bãi biển.' },
  { sentence: 'I like ___ with ice cream.', correct: 'cake', distractors: ['bird', 'desk', 'bus'], emoji: '🎂', topic: 'food', explanation: '**cake** 🎂 (bánh ngọt) ngon khi ăn kèm kem.' },
  { sentence: 'She loves eating ___ every day.', correct: 'chocolate', distractors: ['door', 'teacher', 'bus'], emoji: '🍫', topic: 'food', explanation: '**chocolate** 🍫 (sô cô la) rất được yêu thích.' },
  { sentence: 'We pick ___ from the vine.', correct: 'grapes', distractors: ['sock', 'clock', 'window'], emoji: '🍇', topic: 'food', explanation: '**grapes** 🍇 (nho) mọc thành chùm.' },
  { sentence: 'My favourite snack is ___.', correct: 'candy', distractors: ['table', 'giraffe', 'book'], emoji: '🍬', topic: 'food', explanation: '**candy** 🍬 (kẹo) là đồ ăn vặt yêu thích.' },
  { sentence: 'He drinks ___ when he is thirsty.', correct: 'water', distractors: ['hat', 'monkey', 'pencil'], emoji: '💧', topic: 'food', explanation: '**water** 💧 (nước) uống khi khát.' },
  { sentence: 'My lunch is ___ and vegetables.', correct: 'rice', distractors: ['train', 'glasses', 'spider'], emoji: '🍚', topic: 'food', explanation: '**rice** 🍚 (cơm) thường ăn trưa kèm rau.' },
  { sentence: 'There is a big ___ on the table.', correct: 'pineapple', distractors: ['bus', 'ruler', 'sock'], emoji: '🍍', topic: 'food', explanation: '**pineapple** 🍍 (dứa/khóm) để trên bàn.' },
  // Home (10)
  { sentence: 'Mum is cooking in the ___.', correct: 'kitchen', distractors: ['elephant', 'shoe', 'balloon'], emoji: '🍳', topic: 'at-home', explanation: '**kitchen** 🍳 (nhà bếp) là nơi nấu ăn.' },
  { sentence: 'I sleep in my ___.', correct: 'bedroom', distractors: ['fish', 'train', 'ruler'], emoji: '🛏', topic: 'at-home', explanation: '**bedroom** 🛏 (phòng ngủ) là nơi ngủ.' },
  { sentence: 'We watch TV in the ___.', correct: 'living room', distractors: ['tiger', 'pencil', 'sock'], emoji: '📺', topic: 'at-home', explanation: '**living room** 📺 (phòng khách) là nơi xem TV.' },
  { sentence: 'The ___ on the wall shows 3 o\'clock.', correct: 'clock', distractors: ['snake', 'milk', 'jeans'], emoji: '🕐', topic: 'at-home', explanation: '**clock** 🕐 (đồng hồ treo tường) treo trên tường.' },
  { sentence: 'I look in the ___ every morning.', correct: 'mirror', distractors: ['fish', 'book', 'bus'], emoji: '🪞', topic: 'at-home', explanation: '**mirror** 🪞 (gương) nhìn vào mỗi buổi sáng.' },
  { sentence: 'We eat dinner in the ___.', correct: 'dining room', distractors: ['elephant', 'watch', 'sand'], emoji: '🍽', topic: 'at-home', explanation: '**dining room** 🍽 (phòng ăn) là nơi ăn tối.' },
  { sentence: 'I brush my teeth in the ___.', correct: 'bathroom', distractors: ['tiger', 'pencil', 'train'], emoji: '🚿', topic: 'at-home', explanation: '**bathroom** 🚿 (phòng tắm) là nơi đánh răng.' },
  { sentence: 'She sits on the ___ to read a book.', correct: 'sofa', distractors: ['lemon', 'bird', 'ruler'], emoji: '🛋', topic: 'at-home', explanation: '**sofa** 🛋 (ghế sofa) là nơi ngồi đọc sách.' },
  { sentence: 'The ___ is next to my bed.', correct: 'lamp', distractors: ['tiger', 'shoe', 'bus'], emoji: '💡', topic: 'at-home', explanation: '**lamp** 💡 (đèn bàn) thường đặt cạnh giường.' },
  { sentence: 'She opens the ___ to let in fresh air.', correct: 'window', distractors: ['monkey', 'milk', 'ruler'], emoji: '🪟', topic: 'at-home', explanation: '**window** 🪟 (cửa sổ) mở để lấy không khí.' },
  // School (6)
  { sentence: 'I use a ___ to draw a straight line.', correct: 'ruler', distractors: ['crocodile', 'milk', 'sofa'], emoji: '📏', topic: 'at-school', explanation: '**ruler** 📏 (thước kẻ) dùng vẽ đường thẳng.' },
  { sentence: 'She writes a story with a ___.', correct: 'pencil', distractors: ['banana', 'train', 'bedroom'], emoji: '✏', topic: 'at-school', explanation: '**pencil** ✏ (bút chì) dùng để viết.' },
  { sentence: 'He rubs out a mistake with his ___.', correct: 'eraser', distractors: ['snake', 'milk', 'hat'], emoji: '🗑', topic: 'at-school', explanation: '**eraser** 🗑 (tẩy) dùng để xóa lỗi sai.' },
  { sentence: 'I read a ___ every night before bed.', correct: 'book', distractors: ['elephant', 'sock', 'train'], emoji: '📗', topic: 'at-school', explanation: '**book** 📗 (sách) đọc trước khi ngủ.' },
  { sentence: 'She uses her ___ to write faster.', correct: 'pen', distractors: ['monkey', 'bus', 'clock'], emoji: '🖊', topic: 'at-school', explanation: '**pen** 🖊 (bút mực) viết nhanh hơn bút chì.' },
  { sentence: 'There is a ___ on every student\'s desk.', correct: 'computer', distractors: ['tiger', 'sock', 'garden'], emoji: '💻', topic: 'at-school', explanation: '**computer** 💻 (máy tính) có trên mỗi bàn học.' },
  // Sports (9)
  { sentence: 'I like to ___ in the pool after school.', correct: 'swim', distractors: ['clock', 'jacket', 'dining room'], emoji: '🏊', topic: 'sports-beach', explanation: '**swim** 🏊 (bơi) — bơi trong bể bơi.' },
  { sentence: 'She can ___ a kite in the park.', correct: 'fly', distractors: ['milk', 'clock', 'jeans'], emoji: '🪁', topic: 'sports-beach', explanation: '**fly** 🪁 (thả/bay) — thả diều trong công viên.' },
  { sentence: 'We ___ in the park every morning.', correct: 'run', distractors: ['clock', 'pencil', 'sofa'], emoji: '🏃', topic: 'sports-beach', explanation: '**run** 🏃 (chạy) — chạy bộ mỗi sáng.' },
  { sentence: 'She can ___ a song beautifully.', correct: 'sing', distractors: ['ruler', 'milk', 'bus'], emoji: '🎤', topic: 'sports-beach', explanation: '**sing** 🎤 (hát) — hát một bài hát hay.' },
  { sentence: 'He likes to ___ pictures in his free time.', correct: 'paint', distractors: ['milk', 'table', 'elephant'], emoji: '🎨', topic: 'sports-beach', explanation: '**paint** 🎨 (vẽ/tô màu) — vẽ tranh lúc rảnh.' },
  { sentence: 'My favourite ___ is football.', correct: 'sport', distractors: ['milk', 'window', 'hat'], emoji: '⚽', topic: 'sports-beach', explanation: '**sport** ⚽ (thể thao) — môn thể thao yêu thích.' },
  { sentence: 'She plays ___ with her friends after school.', correct: 'tennis', distractors: ['elephant', 'clock', 'bedroom'], emoji: '🎾', topic: 'sports-beach', explanation: '**tennis** 🎾 (quần vợt) — chơi cùng bạn sau giờ học.' },
  { sentence: 'They ___ along the beach every evening.', correct: 'walk', distractors: ['milk', 'ruler', 'bedroom'], emoji: '🚶', topic: 'sports-beach', explanation: '**walk** 🚶 (đi bộ) — đi dọc bãi biển.' },
  { sentence: 'I can ___ the ball to you.', correct: 'throw', distractors: ['window', 'milk', 'sock'], emoji: '🤾', topic: 'sports-beach', explanation: '**throw** 🤾 (ném) — ném bóng cho bạn.' },
  // Street (8)
  { sentence: 'We go to school by ___.', correct: 'bus', distractors: ['sock', 'apple', 'mirror'], emoji: '🚌', topic: 'my-street', explanation: '**bus** 🚌 (xe buýt) là phương tiện đi học.' },
  { sentence: 'He rides his ___ to the park.', correct: 'bike', distractors: ['bread', 'sock', 'ruler'], emoji: '🚲', topic: 'my-street', explanation: '**bike** 🚲 (xe đạp) — đạp xe đến công viên.' },
  { sentence: 'I can see a ___ flying in the sky.', correct: 'plane', distractors: ['sock', 'banana', 'ruler'], emoji: '✈', topic: 'my-street', explanation: '**plane** ✈ (máy bay) bay trên bầu trời.' },
  { sentence: 'The ___ flies above all the houses.', correct: 'helicopter', distractors: ['sock', 'bread', 'ruler'], emoji: '🚁', topic: 'my-street', explanation: '**helicopter** 🚁 (trực thăng) bay trên các ngôi nhà.' },
  { sentence: 'The ___ is very long and very fast.', correct: 'train', distractors: ['bread', 'sock', 'chair'], emoji: '🚆', topic: 'my-street', explanation: '**train** 🚆 (tàu hoả) rất dài và nhanh.' },
  { sentence: 'She goes shopping at the ___.', correct: 'shop', distractors: ['elephant', 'milk', 'sock'], emoji: '🏪', topic: 'my-street', explanation: '**shop** 🏪 (cửa hàng) là nơi mua sắm.' },
  { sentence: 'We walk to the ___ every Sunday.', correct: 'park', distractors: ['milk', 'elephant', 'window'], emoji: '🌳', topic: 'my-street', explanation: '**park** 🌳 (công viên) đi bộ vào chủ nhật.' },
  { sentence: 'I love buying new books at the ___.', correct: 'bookshop', distractors: ['milk', 'sock', 'elephant'], emoji: '📚', topic: 'my-street', explanation: '**bookshop** 📚 (hiệu sách) là nơi mua sách.' },
  // Family (9)
  { sentence: 'My ___ makes breakfast every morning.', correct: 'mum', distractors: ['shoe', 'ruler', 'bus'], emoji: '👩', topic: 'family', explanation: '**mum** 👩 (mẹ) nấu bữa sáng mỗi ngày.' },
  { sentence: 'My ___ reads the newspaper after work.', correct: 'dad', distractors: ['shoe', 'sock', 'bus'], emoji: '👨', topic: 'family', explanation: '**dad** 👨 (bố) đọc báo sau giờ làm.' },
  { sentence: 'She is my ___. We have the same grandparents.', correct: 'cousin', distractors: ['train', 'mirror', 'milk'], emoji: '👥', topic: 'family', explanation: '**cousin** 👥 (anh chị em họ) có chung ông bà.' },
  { sentence: 'He is my ___. He is younger than me.', correct: 'brother', distractors: ['bus', 'clock', 'mango'], emoji: '👦', topic: 'family', explanation: '**brother** 👦 (anh/em trai) nhỏ hơn mình.' },
  { sentence: 'My ___ has long white hair.', correct: 'grandma', distractors: ['shoe', 'ruler', 'train'], emoji: '👵', topic: 'family', explanation: '**grandma** 👵 (bà) có tóc trắng dài.' },
  { sentence: 'I play with my ___ every day after school.', correct: 'toy', distractors: ['bread', 'clock', 'bus'], emoji: '🪆', topic: 'family', explanation: '**toy** 🪆 (đồ chơi) — chơi mỗi ngày sau giờ học.' },
  { sentence: 'My ___ tells me funny stories at night.', correct: 'grandpa', distractors: ['shoe', 'ruler', 'train'], emoji: '👴', topic: 'family', explanation: '**grandpa** 👴 (ông) kể chuyện vui mỗi đêm.' },
  { sentence: 'My ___ is younger than me and loves drawing.', correct: 'sister', distractors: ['bus', 'clock', 'apple'], emoji: '👧', topic: 'family', explanation: '**sister** 👧 (chị/em gái) thích vẽ.' },
  { sentence: 'The ___ at my school is very kind.', correct: 'teacher', distractors: ['bus', 'milk', 'ruler'], emoji: '👩‍🏫', topic: 'at-school', explanation: '**teacher** 👩‍🏫 (giáo viên) ở trường rất tốt bụng.' },
];

const categorizeSets: CategorizeSet[] = [
  // Animals
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['tiger', 'monkey', 'elephant'], intruder: 'jacket', intruderCategory: 'trang phục', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['crocodile', 'snake', 'spider'], intruder: 'pencil', intruderCategory: 'đồ dùng học tập', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['duck', 'chicken', 'cow'], intruder: 'sofa', intruderCategory: 'đồ vật trong nhà', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['giraffe', 'hippo', 'horse'], intruder: 'bread', intruderCategory: 'thức ăn', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['frog', 'lizard', 'goat'], intruder: 'clock', intruderCategory: 'đồ vật trong nhà', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['dog', 'cat', 'bird'], intruder: 'ruler', intruderCategory: 'đồ dùng học tập', emoji: '🐾' },
  { category: 'at-the-zoo', categoryVi: 'động vật', correct: ['sheep', 'mouse', 'tiger'], intruder: 'window', intruderCategory: 'đồ vật trong nhà', emoji: '🐾' },
  // Food
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['mango', 'banana', 'apple'], intruder: 'hat', intruderCategory: 'trang phục', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['bread', 'rice', 'cake'], intruder: 'train', intruderCategory: 'phương tiện giao thông', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['milk', 'juice', 'water'], intruder: 'eraser', intruderCategory: 'đồ dùng học tập', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['lemon', 'orange', 'pear'], intruder: 'shoe', intruderCategory: 'trang phục', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['chocolate', 'candy', 'cake'], intruder: 'bus', intruderCategory: 'phương tiện giao thông', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['tomato', 'carrot', 'onion'], intruder: 'sock', intruderCategory: 'trang phục', emoji: '🍎' },
  { category: 'food', categoryVi: 'trái cây', correct: ['watermelon', 'pineapple', 'coconut'], intruder: 'helicopter', intruderCategory: 'phương tiện giao thông', emoji: '🍎' },
  { category: 'food', categoryVi: 'thức ăn / đồ uống', correct: ['egg', 'fish', 'meat'], intruder: 'mirror', intruderCategory: 'đồ vật trong nhà', emoji: '🍎' },
  // Clothes
  { category: 'clothes', categoryVi: 'trang phục', correct: ['dress', 'hat', 'jacket'], intruder: 'monkey', intruderCategory: 'động vật', emoji: '👕' },
  { category: 'clothes', categoryVi: 'trang phục', correct: ['jeans', 'trousers', 'skirt'], intruder: 'lemon', intruderCategory: 'thức ăn', emoji: '👕' },
  { category: 'clothes', categoryVi: 'trang phục', correct: ['sock', 'shoe', 'glasses'], intruder: 'egg', intruderCategory: 'thức ăn', emoji: '👕' },
  { category: 'clothes', categoryVi: 'trang phục', correct: ['T-shirt', 'shirt', 'dress'], intruder: 'fish', intruderCategory: 'thức ăn', emoji: '👕' },
  { category: 'clothes', categoryVi: 'trang phục', correct: ['bag', 'handbag', 'watch'], intruder: 'apple', intruderCategory: 'thức ăn', emoji: '👕' },
  // Home
  { category: 'at-home', categoryVi: 'phòng trong nhà', correct: ['kitchen', 'bedroom', 'bathroom'], intruder: 'tiger', intruderCategory: 'động vật', emoji: '🏠' },
  { category: 'at-home', categoryVi: 'đồ vật trong nhà', correct: ['sofa', 'armchair', 'chair'], intruder: 'mango', intruderCategory: 'thức ăn', emoji: '🏠' },
  { category: 'at-home', categoryVi: 'đồ vật trong nhà', correct: ['clock', 'lamp', 'mirror'], intruder: 'bus', intruderCategory: 'phương tiện giao thông', emoji: '🏠' },
  { category: 'at-home', categoryVi: 'phòng trong nhà', correct: ['bedroom', 'living room', 'kitchen'], intruder: 'snake', intruderCategory: 'động vật', emoji: '🏠' },
  { category: 'at-home', categoryVi: 'đồ vật trong nhà', correct: ['table', 'bed', 'cupboard'], intruder: 'lemon', intruderCategory: 'thức ăn', emoji: '🏠' },
  { category: 'at-home', categoryVi: 'đồ vật trong nhà', correct: ['television', 'radio', 'phone'], intruder: 'elephant', intruderCategory: 'động vật', emoji: '🏠' },
  // School
  { category: 'at-school', categoryVi: 'đồ dùng học tập', correct: ['book', 'pen', 'pencil'], intruder: 'elephant', intruderCategory: 'động vật', emoji: '📚' },
  { category: 'at-school', categoryVi: 'đồ dùng học tập', correct: ['ruler', 'eraser', 'board'], intruder: 'milk', intruderCategory: 'thức ăn', emoji: '📚' },
  { category: 'at-school', categoryVi: 'đồ dùng học tập', correct: ['computer', 'keyboard', 'desk'], intruder: 'orange', intruderCategory: 'thức ăn', emoji: '📚' },
  { category: 'at-school', categoryVi: 'đồ dùng học tập', correct: ['pen', 'ruler', 'eraser'], intruder: 'train', intruderCategory: 'phương tiện giao thông', emoji: '📚' },
  // Transport
  { category: 'my-street', categoryVi: 'phương tiện giao thông', correct: ['bus', 'car', 'train'], intruder: 'pencil', intruderCategory: 'đồ dùng học tập', emoji: '🚗' },
  { category: 'my-street', categoryVi: 'phương tiện giao thông', correct: ['bike', 'motorbike', 'lorry'], intruder: 'apple', intruderCategory: 'thức ăn', emoji: '🚗' },
  { category: 'my-street', categoryVi: 'phương tiện giao thông', correct: ['plane', 'helicopter', 'boat'], intruder: 'chair', intruderCategory: 'đồ vật trong nhà', emoji: '🚗' },
  { category: 'my-street', categoryVi: 'phương tiện giao thông', correct: ['train', 'plane', 'motorbike'], intruder: 'chocolate', intruderCategory: 'thức ăn', emoji: '🚗' },
  // Sports
  { category: 'sports-beach', categoryVi: 'môn thể thao', correct: ['football', 'basketball', 'tennis'], intruder: 'bread', intruderCategory: 'thức ăn', emoji: '⚽' },
  { category: 'sports-beach', categoryVi: 'môn thể thao', correct: ['badminton', 'football', 'baseball'], intruder: 'jacket', intruderCategory: 'trang phục', emoji: '⚽' },
  { category: 'sports-beach', categoryVi: 'hoạt động thể thao', correct: ['swim', 'run', 'jump'], intruder: 'milk', intruderCategory: 'thức ăn', emoji: '⚽' },
  // Colours
  { category: 'colours', categoryVi: 'màu sắc', correct: ['red', 'blue', 'green'], intruder: 'egg', intruderCategory: 'thức ăn', emoji: '🌈' },
  { category: 'colours', categoryVi: 'màu sắc', correct: ['black', 'white', 'purple'], intruder: 'bus', intruderCategory: 'phương tiện giao thông', emoji: '🌈' },
  { category: 'colours', categoryVi: 'màu sắc', correct: ['pink', 'yellow', 'orange'], intruder: 'monkey', intruderCategory: 'động vật', emoji: '🌈' },
  { category: 'colours', categoryVi: 'màu sắc', correct: ['grey', 'brown', 'red'], intruder: 'cake', intruderCategory: 'thức ăn', emoji: '🌈' },
  // Family
  { category: 'family', categoryVi: 'thành viên gia đình', correct: ['mum', 'dad', 'grandma'], intruder: 'apple', intruderCategory: 'thức ăn', emoji: '👨‍👩‍👧‍👦' },
  { category: 'family', categoryVi: 'thành viên gia đình', correct: ['sister', 'brother', 'cousin'], intruder: 'ruler', intruderCategory: 'đồ dùng học tập', emoji: '👨‍👩‍👧‍👦' },
  { category: 'family', categoryVi: 'người', correct: ['boy', 'girl', 'baby'], intruder: 'bus', intruderCategory: 'phương tiện giao thông', emoji: '👨‍👩‍👧‍👦' },
  { category: 'family', categoryVi: 'người', correct: ['man', 'woman', 'person'], intruder: 'sock', intruderCategory: 'trang phục', emoji: '👨‍👩‍👧‍👦' },
];

const spellingWords: SpellingWord[] = [
  { word: 'elephant', display: 'e _ e p h a n t', missingLetter: 'l', meaning: 'con voi', emoji: '🐘', topic: 'at-the-zoo', distractors: ['r', 'n', 'm'] },
  { word: 'giraffe', display: 'g _ r a f f e', missingLetter: 'i', meaning: 'hươu cao cổ', emoji: '🦒', topic: 'at-the-zoo', distractors: ['a', 'e', 'o'] },
  { word: 'crocodile', display: 'c r o c o _ i l e', missingLetter: 'd', meaning: 'cá sấu', emoji: '🐊', topic: 'at-the-zoo', distractors: ['t', 'f', 's'] },
  { word: 'helicopter', display: 'h e l i c o p _ e r', missingLetter: 't', meaning: 'trực thăng', emoji: '🚁', topic: 'my-street', distractors: ['s', 'n', 'k'] },
  { word: 'basketball', display: 'b a s k e t b _ l l', missingLetter: 'a', meaning: 'bóng rổ', emoji: '🏀', topic: 'sports-beach', distractors: ['e', 'i', 'o'] },
  { word: 'chocolate', display: 'c h o c o l _ t e', missingLetter: 'a', meaning: 'sô cô la', emoji: '🍫', topic: 'food', distractors: ['e', 'i', 'o'] },
  { word: 'alphabet', display: 'a l p h a _ e t', missingLetter: 'b', meaning: 'bảng chữ cái', emoji: '🔤', topic: 'at-school', distractors: ['d', 'g', 'p'] },
  { word: 'pineapple', display: 'p i n e a p _ l e', missingLetter: 'p', meaning: 'dứa/khóm', emoji: '🍍', topic: 'food', distractors: ['b', 'f', 't'] },
  { word: 'sausage', display: 's a u s _ g e', missingLetter: 'a', meaning: 'xúc xích', emoji: '🌭', topic: 'food', distractors: ['e', 'o', 'i'] },
  { word: 'badminton', display: 'b a d m i n _ o n', missingLetter: 't', meaning: 'cầu lông', emoji: '🏸', topic: 'sports-beach', distractors: ['s', 'k', 'r'] },
  { word: 'television', display: 't e l e v i s _ o n', missingLetter: 'i', meaning: 'ti vi', emoji: '📺', topic: 'at-home', distractors: ['a', 'e', 'o'] },
  { word: 'lemonade', display: 'l e m o n a _ e', missingLetter: 'd', meaning: 'nước chanh', emoji: '🥤', topic: 'food', distractors: ['t', 'b', 'k'] },
  { word: 'watermelon', display: 'w a t e r m e l _ n', missingLetter: 'o', meaning: 'dưa hấu', emoji: '🍉', topic: 'food', distractors: ['a', 'e', 'i'] },
  { word: 'cupboard', display: 'c u p b o _ r d', missingLetter: 'a', meaning: 'tủ đựng đồ', emoji: '🗄', topic: 'at-home', distractors: ['e', 'i', 'o'] },
  { word: 'keyboard', display: 'k e y b _ a r d', missingLetter: 'o', meaning: 'bàn phím', emoji: '⌨', topic: 'at-school', distractors: ['a', 'e', 'u'] },
  { word: 'armchair', display: 'a r m c h a _ r', missingLetter: 'i', meaning: 'ghế bành', emoji: '🪑', topic: 'at-home', distractors: ['a', 'e', 'o'] },
  { word: 'bookcase', display: 'b o o k c a _ e', missingLetter: 's', meaning: 'kệ sách', emoji: '📚', topic: 'at-home', distractors: ['t', 'r', 'n'] },
  { word: 'bathroom', display: 'b a t h r _ o m', missingLetter: 'o', meaning: 'phòng tắm', emoji: '🚿', topic: 'at-home', distractors: ['a', 'e', 'i'] },
  { word: 'bedroom', display: 'b e d _ o o m', missingLetter: 'r', meaning: 'phòng ngủ', emoji: '🛏', topic: 'at-home', distractors: ['t', 'n', 'k'] },
  { word: 'classroom', display: 'c l a s s r _ o m', missingLetter: 'o', meaning: 'phòng học', emoji: '🏫', topic: 'at-school', distractors: ['a', 'e', 'u'] },
  { word: 'computer', display: 'c o m p u _ e r', missingLetter: 't', meaning: 'máy tính', emoji: '💻', topic: 'at-school', distractors: ['s', 'n', 'k'] },
  { word: 'motorbike', display: 'm o t o r b _ k e', missingLetter: 'i', meaning: 'xe máy', emoji: '🏍', topic: 'my-street', distractors: ['a', 'e', 'o'] },
  { word: 'coconut', display: 'c o c o n _ t', missingLetter: 'u', meaning: 'dừa', emoji: '🥥', topic: 'food', distractors: ['a', 'e', 'i'] },
  { word: 'football', display: 'f o o t b _ l l', missingLetter: 'a', meaning: 'bóng đá', emoji: '⚽', topic: 'sports-beach', distractors: ['e', 'i', 'o'] },
  { word: 'baseball', display: 'b a s e b _ l l', missingLetter: 'a', meaning: 'bóng chày', emoji: '⚾', topic: 'sports-beach', distractors: ['e', 'i', 'o'] },
  { word: 'apartment', display: 'a p a r t m _ n t', missingLetter: 'e', meaning: 'căn hộ', emoji: '🏢', topic: 'at-home', distractors: ['a', 'i', 'o'] },
  { word: 'bookshop', display: 'b o o k s h _ p', missingLetter: 'o', meaning: 'hiệu sách', emoji: '📚', topic: 'my-street', distractors: ['a', 'e', 'i'] },
  { word: 'spider', display: 's p i d _ r', missingLetter: 'e', meaning: 'nhện', emoji: '🕷', topic: 'at-the-zoo', distractors: ['a', 'i', 'o'] },
  { word: 'lizard', display: 'l i z _ r d', missingLetter: 'a', meaning: 'thằn lằn', emoji: '🦎', topic: 'at-the-zoo', distractors: ['e', 'i', 'o'] },
  { word: 'monkey', display: 'm o n k _ y', missingLetter: 'e', meaning: 'khỉ', emoji: '🐒', topic: 'at-the-zoo', distractors: ['a', 'i', 'o'] },
  { word: 'guitar', display: 'g u i t _ r', missingLetter: 'a', meaning: 'đàn ghi-ta', emoji: '🎸', topic: 'sports-beach', distractors: ['e', 'i', 'o'] },
  { word: 'mirror', display: 'm i r r _ r', missingLetter: 'o', meaning: 'gương', emoji: '🪞', topic: 'at-home', distractors: ['a', 'e', 'i'] },
  { word: 'trousers', display: 't r o u s _ r s', missingLetter: 'e', meaning: 'quần dài', emoji: '👖', topic: 'clothes', distractors: ['a', 'i', 'o'] },
  { word: 'jacket', display: 'j a c k _ t', missingLetter: 'e', meaning: 'áo khoác', emoji: '🧥', topic: 'clothes', distractors: ['a', 'i', 'o'] },
  { word: 'glasses', display: 'g l a s s _ s', missingLetter: 'e', meaning: 'kính mắt', emoji: '👓', topic: 'clothes', distractors: ['a', 'i', 'o'] },
  { word: 'banana', display: 'b a n _ n a', missingLetter: 'a', meaning: 'chuối', emoji: '🍌', topic: 'food', distractors: ['e', 'i', 'o'] },
  { word: 'orange', display: 'o r a n _ e', missingLetter: 'g', meaning: 'cam', emoji: '🍊', topic: 'food', distractors: ['b', 'd', 'f'] },
  { word: 'potato', display: 'p o t a _ o', missingLetter: 't', meaning: 'khoai tây', emoji: '🥔', topic: 'food', distractors: ['s', 'n', 'k'] },
  { word: 'teacher', display: 't e a c h _ r', missingLetter: 'e', meaning: 'giáo viên', emoji: '👩‍🏫', topic: 'at-school', distractors: ['a', 'i', 'o'] },
  { word: 'brother', display: 'b r o t h _ r', missingLetter: 'e', meaning: 'anh/em trai', emoji: '👦', topic: 'family', distractors: ['a', 'i', 'o'] },
  { word: 'grandpa', display: 'g r a n d p _', missingLetter: 'a', meaning: 'ông nội/ngoại', emoji: '👴', topic: 'family', distractors: ['e', 'i', 'o'] },
  { word: 'grandma', display: 'g r a n d m _', missingLetter: 'a', meaning: 'bà nội/ngoại', emoji: '👵', topic: 'family', distractors: ['e', 'i', 'o'] },
  { word: 'morning', display: 'm o r n _ n g', missingLetter: 'i', meaning: 'buổi sáng', emoji: '🌅', topic: 'my-street', distractors: ['a', 'e', 'o'] },
  { word: 'evening', display: 'e v e n _ n g', missingLetter: 'i', meaning: 'buổi tối', emoji: '🌆', topic: 'my-street', distractors: ['a', 'e', 'o'] },
];

// ────────────────────────────────────────────────────────────
// GENERATE 20 EXAMS
// ────────────────────────────────────────────────────────────
const NUM_EXAMS = 20;
const QUESTIONS_PER_EXAM = 20; // 4+3+3+2+2+6

// Distribute vocab words — round-robin by topic for coverage
const wordsByTopic = vocabTopics.map(t => shuffle(t.words));
const enToViPool: VocabWord[] = [];
const viToEnPool: VocabWord[] = [];

// Take up to 8 per topic for en-to-vi (target: 80)
for (const topic of wordsByTopic) {
  enToViPool.push(...topic.slice(0, Math.min(8, topic.length)));
}
// Take remaining words (not in en-to-vi) for vi-to-en (target: 60)
const usedIds = new Set(enToViPool.map(w => w.id));
for (const topic of wordsByTopic) {
  viToEnPool.push(...topic.filter(w => !usedIds.has(w.id)).slice(0, Math.min(6, topic.length)));
}
// If still short, supplement vi-to-en with any unused words
if (viToEnPool.length < NUM_EXAMS * 3) {
  const allUnused = shuffle(allVocabWords.filter(w => !usedIds.has(w.id) && !viToEnPool.find(v => v.id === w.id)));
  viToEnPool.push(...allUnused.slice(0, NUM_EXAMS * 3 - viToEnPool.length));
}

const shuffledContext = shuffle(contextTemplates);
const shuffledCat     = shuffle(categorizeSets);
const shuffledSpell   = shuffle(spellingWords);
const shuffledAudio   = shuffle(audioPool);

// Shuffle all pools with RNG
const shuffledEnToVi  = shuffle(enToViPool).slice(0, NUM_EXAMS * 4);
const shuffledViToEn  = shuffle(viToEnPool).slice(0, NUM_EXAMS * 3);

// Safety: verify pool sizes
if (shuffledEnToVi.length  < NUM_EXAMS * 4) throw new Error(`en-to-vi pool too small: ${shuffledEnToVi.length}`);
if (shuffledViToEn.length  < NUM_EXAMS * 3) throw new Error(`vi-to-en pool too small: ${shuffledViToEn.length}`);
if (shuffledContext.length < NUM_EXAMS * 3) throw new Error(`context pool too small: ${shuffledContext.length}`);
if (shuffledCat.length     < NUM_EXAMS * 2) throw new Error(`categorize pool too small: ${shuffledCat.length}`);
if (shuffledSpell.length   < NUM_EXAMS * 2) throw new Error(`spelling pool too small: ${shuffledSpell.length}`);
if (shuffledAudio.length   < NUM_EXAMS * 6) throw new Error(`audio pool too small: ${shuffledAudio.length}`);

console.log(`en-to-vi pool: ${shuffledEnToVi.length} | vi-to-en pool: ${shuffledViToEn.length}`);
console.log(`context: ${shuffledContext.length} | categorize: ${shuffledCat.length} | spelling: ${shuffledSpell.length}`);

const exams: object[] = [];

for (let i = 0; i < NUM_EXAMS; i++) {
  const questions: object[] = [];

  // 4 en-to-vi
  for (let j = 0; j < 4; j++) {
    const word = shuffledEnToVi[i * 4 + j];
    const topic = getTopicForWord(word);
    questions.push(buildEnToVi(word, topic));
  }

  // 3 vi-to-en
  for (let j = 0; j < 3; j++) {
    const word = shuffledViToEn[i * 3 + j];
    const topic = getTopicForWord(word);
    questions.push(buildViToEn(word, topic));
  }

  // 3 context-fill (no repetition: 60 needed, 70+ available)
  for (let j = 0; j < 3; j++) {
    questions.push(buildContextFill(shuffledContext[i * 3 + j]));
  }

  // 2 categorize (no repetition: 40 needed, 44 available)
  for (let j = 0; j < 2; j++) {
    questions.push(buildCategorize(shuffledCat[i * 2 + j]));
  }

  // 2 spelling (no repetition: 40 needed, 44 available)
  for (let j = 0; j < 2; j++) {
    questions.push(buildSpelling(shuffledSpell[i * 2 + j]));
  }

  // 6 listening mp3 (no repetition: 120 needed, 300 available)
  for (let j = 0; j < 6; j++) {
    questions.push(buildListening(shuffledAudio[i * 6 + j]));
  }

  exams.push({
    exam_number: i + 1,
    title: `PreA1Starter - Wordlist Level 2 - Phản xạ - Đề ${String(i + 1).padStart(2, '0')}`,
    duration_minutes: 10,
    questions: shuffle(questions), // shuffle order within exam
  });
}

// ────────────────────────────────────────────────────────────
// OUTPUT
// ────────────────────────────────────────────────────────────
const output = {
  collection: {
    title: 'Wordlist Level 2',
    subject_slug: 'pre-a1-starter',
    grade: 3,
    volume: 1,
    units: [100],
    sequence_number: 100,
    exam_type: 'reflex',
    reference_book: 'Pre A1 Starters Wordlist Level 2',
    status: 'published',
  },
  exams,
};

const outPath = path.join(
  'content', 'exam-bank', 'tieng-anh', 'starters-wordlist-reflex-level2.json'
);
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

const totalQ = NUM_EXAMS * QUESTIONS_PER_EXAM;
console.log(`\n✅ Generated ${NUM_EXAMS} exams × ${QUESTIONS_PER_EXAM} questions = ${totalQ} câu hỏi`);
console.log(`📁 Output → ${outPath}`);
