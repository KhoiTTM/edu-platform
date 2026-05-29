// Math Engine for Grade 3 (Lesson-based)

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDistractors(correct: number): string[] {
  const choices = new Set<number>();
  choices.add(correct || 0);
  
  let loopCount = 0;
  while (choices.size < 4 && loopCount < 100) {
    loopCount++;
    const strategies = [
      () => correct + randInt(1, 10),
      () => correct - randInt(1, 10),
      () => correct + 10,
      () => {
        const str = String(correct);
        if (str.length > 1) return parseInt(str.split('').reverse().join(''));
        return correct + 5;
      },
      () => randInt(correct - 5, correct + 15)
    ];
    
    const strategy = strategies[randInt(0, strategies.length - 1)];
    const distractor = strategy();
    if (distractor > 0 && distractor !== correct) {
      choices.add(distractor);
    }
  }
  
  return Array.from(choices).sort(() => Math.random() - 0.5).map(String);
}

// ----------------------
// GENERATORS
// ----------------------

function genAddSub1000(id: string, lesson: number) {
  const a = randInt(100, 500);
  const b = randInt(100, 499);
  const correct = a + b;
  return {
    id, type: "fill_blank", instruction: "Tính tổng",
    question_data: { question: `${a} + ${b} = ___`, correct_answer: String(correct), choices: generateDistractors(correct) },
    source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
  };
}

function genMulDivTable(id: string, lesson: number) {
  // map lesson to table
  const tableMap: Record<number, number> = { 4: 2, 5: 3, 6: 4, 9: 6, 10: 7, 11: 8, 12: 9 };
  const table = tableMap[lesson] || randInt(2, 9);
  const factor = randInt(1, 10);
  
  const isMul = Math.random() > 0.5;
  if (isMul) {
    return {
      id, type: "fill_blank", instruction: `Bảng nhân ${table}`,
      question_data: { question: `${table} x ${factor} = ___`, correct_answer: String(table * factor), choices: generateDistractors(table * factor) },
      source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
    };
  } else {
    return {
      id, type: "tap_correct_answer", instruction: `Bảng chia ${table}`,
      question_data: { question: `${table * factor} : ${table} = ?`, correct_answer: String(factor), choices: generateDistractors(factor) },
      source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
    };
  }
}

function genGeometry(id: string, lesson: number) {
  const shapes = ["Hình tam giác", "Hình vuông", "Hình chữ nhật", "Hình tròn"];
  const target = shapes[randInt(0, shapes.length - 1)];
  return {
    id, type: "shape_identify", instruction: "Nhận dạng hình",
    question_data: { shape_description: `Đây là hình gì?`, correct_answer: target, choices: shapes },
    source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
  };
}

function genMeasurement(id: string, lesson: number) {
  // lesson 30: mm, 31: g, 32: ml
  let unit1 = "cm", unit2 = "mm", multiplier = 10;
  if (lesson === 31) { unit1 = "kg"; unit2 = "g"; multiplier = 1000; }
  else if (lesson === 32) { unit1 = "l"; unit2 = "ml"; multiplier = 1000; }
  
  const val = randInt(2, 9);
  return {
    id, type: "fill_blank", instruction: "Đổi đơn vị",
    question_data: { question: `${val} ${unit1} = ___ ${unit2}`, correct_answer: String(val * multiplier), choices: generateDistractors(val * multiplier) },
    source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
  };
}

function genWordProblem(id: string, lesson: number) {
  const a = randInt(20, 100);
  const b = randInt(10, 50);
  return {
    id, type: "word_problem", instruction: "Giải bài toán",
    question_data: {
      story: `Minh có ${a} viên bi. Minh được cho thêm ${b} viên.`,
      question: `Hỏi Minh có tất cả bao nhiêu viên bi?`,
      correct_answer: String(a + b), choices: generateDistractors(a + b)
    },
    source_anchor: { book: "Toán 3", lesson: `Bài ${lesson}`, page: 0 }
  };
}

export function generateQuestions(lesson: number, volume: number, countPerTest: number = 15): any[] {
  const questions: any[] = [];
  const TOTAL_Q = countPerTest;
  
  // Determine the primary core generator for the current lesson
  let coreGenerator = genAddSub1000;
  if ([4,5,6,9,10,11,12].includes(lesson)) coreGenerator = genMulDivTable;
  else if ([7,16,17,18,19,20,21].includes(lesson)) coreGenerator = genGeometry;
  else if ([30,31,32,33,34].includes(lesson)) coreGenerator = genMeasurement;
  else if ([23,24,25,26,27,28].includes(lesson)) coreGenerator = genWordProblem;

  // Lũy kế (Cumulative): Build a pool of all previously learned concepts
  const pool = [genAddSub1000];
  if (lesson >= 4) pool.push(genMulDivTable);
  if (lesson >= 7) pool.push(genGeometry);
  if (lesson >= 23) pool.push(genWordProblem);
  if (lesson >= 30) pool.push(genMeasurement);

  // Add the core generator multiple times to give it higher weight (60-70%)
  pool.push(coreGenerator, coreGenerator, coreGenerator, coreGenerator, coreGenerator);

  for (let i = 1; i <= TOTAL_Q; i++) {
    const generator = pool[randInt(0, pool.length - 1)];
    questions.push(generator(`Q${String(i).padStart(3, '0')}`, lesson));
  }
  
  return questions;
}
