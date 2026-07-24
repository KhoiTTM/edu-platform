/**
 * Verify toàn bộ file pre-a1-spelling-level1.json trước khi seed:
 * - Mỗi đề đúng 20 câu, toàn bộ type fill_blank, 10 câu khuyết chuỗi + 10 câu chọn cách viết đúng.
 * - Số "_" trong câu khuyết == số chữ cái của correct_answer; ghép lại phải ra đúng từ trong explanation.
 * - choices đúng 4, không trùng nhau, correct_answer nằm trong choices.
 * - retry_until_correct === true, không emoji, không image_url.
 * - Mỗi từ tiếng Anh chỉ dùng 1 lần toàn collection (đề chót được phép trộn lại từ cũ).
 * Chạy: npx tsx scratch/check-spelling-l1.ts
 */
import fs from 'fs';
import path from 'path';

const FILE = path.resolve('content/exam-bank/tieng-anh/pre-a1-spelling-level1.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const errors: string[] = [];
const emojiRe = /[\u{1F000}-\u{1FAFF}\u{2190}-\u{2BFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
const wordFirstExam = new Map<string, string>(); // word -> exam title đầu tiên dùng
const lastExamNumber = Math.max(...data.exams.map((e: { exam_number: number }) => e.exam_number));
let totalQ = 0;
const reused: string[] = [];

for (const exam of data.exams) {
  const label = `${exam.title} (#${exam.exam_number})`;
  if (exam.questions.length !== 20) errors.push(`${label}: có ${exam.questions.length} câu, phải là 20`);
  let gapCount = 0;
  let wholeCount = 0;
  exam.questions.forEach((q: { type: string; metadata_json: Record<string, unknown> }, idx: number) => {
    totalQ++;
    const tag = `${label} câu ${idx + 1}`;
    const m = q.metadata_json as {
      question: string; choices: string[]; correct_answer: string;
      explanation: string; retry_until_correct?: boolean; image_url?: string; tags?: string[];
    };
    if (q.type !== 'fill_blank') errors.push(`${tag}: type "${q.type}" khác fill_blank`);
    if (m.retry_until_correct !== true) errors.push(`${tag}: thiếu retry_until_correct: true`);
    if (m.image_url) errors.push(`${tag}: có image_url`);
    if (emojiRe.test(m.question) || emojiRe.test(m.explanation)) errors.push(`${tag}: chứa emoji`);
    if (!Array.isArray(m.choices) || m.choices.length !== 4) errors.push(`${tag}: choices phải đúng 4 lựa chọn`);
    if (new Set(m.choices.map((c) => c.toLowerCase())).size !== m.choices.length)
      errors.push(`${tag}: choices trùng nhau [${m.choices.join(', ')}]`);
    if (!m.choices.includes(m.correct_answer)) errors.push(`${tag}: correct_answer "${m.correct_answer}" không nằm trong choices`);
    if (!Array.isArray(m.tags) || m.tags[0] !== 'spelling' || m.tags[1] !== 'level-1' || m.tags.length !== 3)
      errors.push(`${tag}: tags sai format [${(m.tags ?? []).join(', ')}]`);

    // Từ đầy đủ lấy từ explanation: **"word"**
    const wordMatch = m.explanation.match(/\*\*"([A-Za-z]+)"\*\*/);
    if (!wordMatch) { errors.push(`${tag}: không tìm thấy từ đầy đủ trong explanation`); return; }
    const word = wordMatch[1];

    const underscores = (m.question.match(/_/g) ?? []).length;
    if (m.question.includes('còn thiếu')) {
      gapCount++;
      if (underscores !== m.correct_answer.length)
        errors.push(`${tag}: ${underscores} dấu "_" nhưng đáp án "${m.correct_answer}" có ${m.correct_answer.length} chữ`);
      // ghép pattern + đáp án phải ra đúng từ
      const patMatch = m.question.match(/: \*\*([A-Za-z_ ]+)\*\*$/);
      if (!patMatch) errors.push(`${tag}: không parse được pattern khuyết`);
      else {
        const slots = patMatch[1].trim().split(' ');
        let ai = 0;
        const rebuilt = slots.map((s) => (s === '_' ? m.correct_answer[ai++] ?? '?' : s)).join('');
        if (rebuilt !== word) errors.push(`${tag}: ghép pattern ra "${rebuilt}" khác từ "${word}"`);
        // mọi choice phải cùng độ dài với số ô trống
        for (const c of m.choices) if (c.length !== underscores) errors.push(`${tag}: choice "${c}" không khớp ${underscores} ô trống`);
      }
    } else if (m.question.includes('được viết đúng là')) {
      wholeCount++;
      if (underscores !== 0) errors.push(`${tag}: câu chọn cách viết đúng không được có "_"`);
      if (m.correct_answer !== word) errors.push(`${tag}: correct_answer "${m.correct_answer}" khác từ "${word}"`);
    } else errors.push(`${tag}: câu hỏi không thuộc 2 dạng chuẩn`);

    // mỗi từ chỉ dùng 1 lần toàn collection (đề chót được phép trộn lại)
    const key = word.toLowerCase();
    if (wordFirstExam.has(key)) {
      if (exam.exam_number === lastExamNumber) reused.push(word);
      else errors.push(`${tag}: từ "${word}" đã dùng ở ${wordFirstExam.get(key)}`);
    } else wordFirstExam.set(key, label);
  });
  if (gapCount !== 10 || wholeCount !== 10)
    errors.push(`${label}: ${gapCount} câu khuyết + ${wholeCount} câu chọn viết đúng (phải 10+10)`);
}

console.log(`Số đề: ${data.exams.length} | Tổng câu: ${totalQ} | Từ phân biệt: ${wordFirstExam.size} | Từ trộn lại ở đề chót: ${reused.join(', ') || '(không)'}`);
if (errors.length) {
  console.error(`LỖI (${errors.length}):`);
  errors.forEach((e) => console.error(' -', e));
  process.exit(1);
}
console.log('OK — toàn bộ kiểm tra đạt.');
