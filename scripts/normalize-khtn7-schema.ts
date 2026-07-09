import * as fs from 'fs';

const filePath = 'content/workbooks/khtn7-questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let fixedCount = 0;

const normalized = data.map((q: any) => {
  // Already correct schema — leave untouched.
  if ('cau' in q && 'stem' in q) {
    if (q.type === 'mcq') {
      q.type = 'multiple_choice';
      fixedCount++;
    }
    return q;
  }

  fixedCount++;
  const cauMatch = String(q.id).match(/-(\d+)$/);
  const cau = cauMatch ? Number(cauMatch[1]) : null;

  const stem = q.question ?? q.stem ?? '';
  let answer = q.answer;
  if (answer === null || answer === undefined || answer === '') {
    answer = q.explanation ? `[Gợi ý] ${q.explanation}` : '';
  }

  const type = q.type === 'mcq' ? 'multiple_choice' : q.type;

  const out: any = {
    id: q.id,
    bai: q.bai,
    cau,
    type,
    stem,
    answer,
  };
  if (q.options) out.options = q.options;

  return out;
});

fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2), 'utf-8');
console.log(`Normalized ${fixedCount} questions to the stem/cau/answer schema.`);
console.log(`Total questions: ${normalized.length}`);
