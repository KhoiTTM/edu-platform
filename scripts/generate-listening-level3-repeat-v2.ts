import * as fs from 'fs';
import * as path from 'path';

// v2: gộp câu hội thoại từ file gốc (63 câu batch 1, key ELEVENLABS_API_KEY) + 9 file batch
// mới (195 câu, sinh bằng ELEVENLABS_API_KEY_SECOND — xem docs/luyen-tap/pre-a1-starter.md
// mục 5, 2026-07-25) thành 1 pool 258 câu unique, rồi phân bổ xoay vòng thành 20 đề × 20 câu
// (mục tiêu người dùng: "20 đề mỗi đề 20 câu"). Vì pool < 400 lượt cần, mỗi câu xuất hiện
// trung bình ~1.55 lần nhưng KHÔNG trùng trong cùng 1 đề — giống đúng cách batch 1 cũ đã làm
// cho 10 đề (generate-listening-level3-repeat.ts), chỉ tăng NUM_EXAMS/pool.

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
  const baseDir = path.join('content', 'exam-bank');
  const sourceFiles = [
    'pre-a1-listening-level3-exams-10de-BACKUP.json', // 63 câu gốc (backup trước khi bị ghi đè bởi các lần chạy trước)
    'pre-a1-listening-level3-batch2-source.json',
    'pre-a1-listening-level3-batch3-source.json',
    'pre-a1-listening-level3-batch4-source.json',
    'pre-a1-listening-level3-batch5-source.json',
    'pre-a1-listening-level3-batch6-source.json',
    'pre-a1-listening-level3-batch7-source.json',
    'pre-a1-listening-level3-batch8-source.json',
    'pre-a1-listening-level3-batch9-source.json',
  ];

  const seenText = new Set<string>();
  const validQuestions: any[] = [];

  for (const file of sourceFiles) {
    const p = path.join(baseDir, file);
    if (!fs.existsSync(p)) {
      console.warn(`⚠️  Bo qua (khong ton tai): ${file}`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    // File gốc có shape { collection, exams }; file batch có shape { dialogues, exams }
    const exams = data.exams || [];
    let countFromFile = 0;
    for (const exam of exams) {
      for (const q of exam.questions || []) {
        const m = q.metadata_json || {};
        if (!m.audio_url) continue;
        const key = m.audio_text || '';
        if (seenText.has(key)) continue;
        seenText.add(key);
        validQuestions.push(q);
        countFromFile++;
      }
    }
    console.log(`  ${file}: +${countFromFile} cau unique`);
  }

  console.log(`\nTong so cau unique co audio: ${validQuestions.length}`);

  const NUM_EXAMS = 20;
  const QUESTIONS_PER_EXAM = 20;

  if (validQuestions.length < QUESTIONS_PER_EXAM) {
    console.error(`❌ Can it nhat ${QUESTIONS_PER_EXAM} cau de tao 1 de, hien chi co ${validQuestions.length}.`);
    process.exit(1);
  }

  // Phân bổ đảm bảo PHỦ ĐỀU: xáo trộn toàn cục nhiều vòng (mỗi vòng là 1 hoán vị đầy đủ
  // của toàn bộ pool), nối liên tiếp thành 1 dải dài rồi cắt từng đoạn 20 câu — cách này
  // đảm bảo mỗi câu xuất hiện đủ floor(400/195) hoặc ceil(400/195) lần, không có câu nào
  // bị bỏ sót hoàn toàn (khác với random-cắt-đầu độc lập từng đề, có thể bỏ sót vài câu
  // "xui" không rơi vào top-20 của bất kỳ lần shuffle nào trong 20 lượt).
  const totalNeeded = NUM_EXAMS * QUESTIONS_PER_EXAM;
  const pool: any[] = [];
  while (pool.length < totalNeeded) {
    pool.push(...shuffle(validQuestions));
  }
  const flatQuestions = pool.slice(0, totalNeeded);

  const exams = [];
  for (let i = 0; i < NUM_EXAMS; i++) {
    const slice = flatQuestions.slice(i * QUESTIONS_PER_EXAM, (i + 1) * QUESTIONS_PER_EXAM);
    // Đảm bảo không trùng audio_text TRONG CÙNG 1 đề: nếu dính trùng (hiếm, do ghép nối
    // giữa 2 vòng shuffle liên tiếp), hoán đổi với câu ở đề tiếp theo có text khác.
    const seenInExam = new Set<string>();
    const examQuestions = slice.map((q) => {
      const text = q.metadata_json.audio_text;
      if (seenInExam.has(text)) {
        // Tìm câu thay thế chưa dùng trong đề này, từ cuối pool
        const replacement = flatQuestions.find(cand =>
          !seenInExam.has(cand.metadata_json.audio_text)
        );
        if (replacement) {
          seenInExam.add(replacement.metadata_json.audio_text);
          return {
            type: replacement.type,
            difficulty: replacement.difficulty || 1.5,
            metadata_json: { ...replacement.metadata_json },
          };
        }
      }
      seenInExam.add(text);
      return {
        type: q.type,
        difficulty: q.difficulty || 1.5,
        metadata_json: { ...q.metadata_json },
      };
    });

    exams.push({
      exam_number: i + 1,
      title: `PreA1 Starter Listen Level 3 - Đề ${String(i + 1).padStart(2, '0')}`,
      duration_minutes: 12,
      questions: examQuestions,
    });
  }

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

  const outPath = path.join(baseDir, 'pre-a1-listening-level3-exams.json');
  fs.writeFileSync(outPath, JSON.stringify(newCollection, null, 2), 'utf-8');

  // Thống kê số lần lặp lại của mỗi câu
  const useCount = new Map<string, number>();
  for (const exam of exams) {
    for (const q of exam.questions) {
      const key = q.metadata_json.audio_text;
      useCount.set(key, (useCount.get(key) || 0) + 1);
    }
  }
  const counts = [...useCount.values()];
  const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
  const max = Math.max(...counts);

  console.log(`\n✅ Da tao ${NUM_EXAMS} de x ${QUESTIONS_PER_EXAM} cau = ${NUM_EXAMS * QUESTIONS_PER_EXAM} luot cau hoi.`);
  console.log(`   Tu ${validQuestions.length} cau unique, moi cau lap trung binh ${avg.toFixed(2)} lan (max ${max} lan).`);
  console.log(`📝 File cap nhat: ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
