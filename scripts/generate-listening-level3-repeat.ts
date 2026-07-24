import * as fs from 'fs';
import * as path from 'path';

// Seeded RNG for reproducibility
function makeLCG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rand = makeLCG(42);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  const jsonPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-exams.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File ${jsonPath} not found.`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Extract all questions that have a valid audio_url
  const validQuestions: any[] = [];
  for (const exam of rawData.exams || []) {
    for (const q of exam.questions || []) {
      if (q.metadata_json && q.metadata_json.audio_url) {
        validQuestions.push(q);
      }
    }
  }

  console.log(`Found ${validQuestions.length} questions with valid audio files.`);

  if (validQuestions.length < 15) {
    console.error("❌ Need at least 15 valid questions to construct an exam.");
    process.exit(1);
  }

  const NUM_EXAMS = 10;
  const QUESTIONS_PER_EXAM = 15;
  const exams = [];

  for (let i = 0; i < NUM_EXAMS; i++) {
    // Shuffle the 66 questions and take the first 15 to ensure no duplicates *within the same exam*
    const shuffled = shuffle(validQuestions);
    const examQuestions = shuffled.slice(0, QUESTIONS_PER_EXAM).map((q, idx) => {
      // Return a clean clone of the question
      return {
        type: q.type,
        difficulty: q.difficulty || 1.5,
        metadata_json: { ...q.metadata_json }
      };
    });

    exams.push({
      exam_number: i + 1,
      title: `PreA1 Starter Listen Level 3 - Đề ${String(i + 1).padStart(2, '0')}`,
      duration_minutes: 10,
      questions: examQuestions
    });
  }

  // Define new collection metadata
  const newCollection = {
    collection: {
      title: "Luyện nghe Level 3",
      subject_slug: "pre-a1-starter",
      grade: 3,
      volume: 1,
      units: [4],
      sequence_number: 11,
      exam_type: "listening",
      reference_book: "PreA1 Starter - Listening Level 3 (hội thoại)",
      status: "published"
    },
    exams
  };

  fs.writeFileSync(jsonPath, JSON.stringify(newCollection, null, 2), 'utf-8');
  console.log(`✅ Successfully generated 10 exams × 15 questions = 150 questions (redistributed from 66 generated audios).`);
  console.log(`📝 File updated: ${jsonPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
