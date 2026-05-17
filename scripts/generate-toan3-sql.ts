import { writeFileSync } from "fs";
import { expandToAppLessons } from "../lib/curriculum/toan3-tap1";

const SUBJECT_ID = "cccccccc-cccc-cccc-cccc-cccccccc3001";
const rows = expandToAppLessons();

function esc(s: string) {
  return s.replace(/'/g, "''");
}

function lessonUuid(index: number) {
  const n = String(index).padStart(4, "0");
  return `a3b1${n}-0000-4000-8000-000000000001`;
}

function quizUuid(index: number) {
  const n = String(index).padStart(4, "0");
  return `a3c1${n}-0000-4000-8000-000000000001`;
}

type Question = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
};

// Generates 15 deterministic questions per lesson based on book_lesson_number
function generateQuestionsForMathLesson(bookLessonNumber: number, title: string): Question[] {
  const list: Question[] = [];

  // Helper to shuffle choices while keeping track of correct choice
  function makeQuestion(qText: string, opts: string[], correctVal: string, expl: string): Question {
    const unique = Array.from(new Set(opts));
    if (!unique.includes(correctVal)) {
      unique[0] = correctVal;
    }
    const shuffled = unique.sort(() => 0.5 - Math.random());
    return {
      question: qText,
      options: shuffled,
      correct_index: shuffled.indexOf(correctVal),
      explanation: expl
    };
  }

  // 1. Numbers up to 1000
  if (bookLessonNumber === 1) {
    for (let i = 0; i < 15; i++) {
      const num = 100 + i * 53; // Deterministic number
      const digitStr = String(num);
      if (i % 3 === 0) {
        list.push(makeQuestion(
          `Trong số ${num}, chữ số ${digitStr[1]} có giá trị là bao nhiêu?`,
          [`${Number(digitStr[1]) * 10}`, `${digitStr[1]}`, `${Number(digitStr[1]) * 100}`, "0"],
          `${Number(digitStr[1]) * 10}`,
          `Chữ số ${digitStr[1]} nằm ở hàng chục, nên có giá trị là ${Number(digitStr[1]) * 10}.`
        ));
      } else if (i % 3 === 1) {
        list.push(makeQuestion(
          `Số liền sau của số ${num} là số nào?`,
          [`${num + 1}`, `${num - 1}`, `${num + 10}`, `${num - 10}`],
          `${num + 1}`,
          `Số liền sau của một số bằng số đó cộng thêm 1: ${num} + 1 = ${num + 1}.`
        ));
      } else {
        list.push(makeQuestion(
          `Số ${num} được viết thành tổng các trăm, chục, đơn vị là:`,
          [`${digitStr[0]}00 + ${digitStr[1]}0 + ${digitStr[2]}`, `${digitStr[0]}00 + ${digitStr[1]} + ${digitStr[2]}`, `${digitStr[0]}0 + ${digitStr[1]}0 + ${digitStr[2]}`, `${digitStr[0]} + ${digitStr[1]} + ${digitStr[2]}`],
          `${digitStr[0]}00 + ${digitStr[1]}0 + ${digitStr[2]}`,
          `Số ${num} gồm ${digitStr[0]} trăm, ${digitStr[1]} chục và ${digitStr[2]} đơn vị.`
        ));
      }
    }
  }

  // 2. Addition and subtraction up to 1000
  else if (bookLessonNumber === 2) {
    for (let i = 0; i < 15; i++) {
      const a = 200 + i * 35;
      const b = 100 + i * 18;
      if (i % 2 === 0) {
        const sum = a + b;
        list.push(makeQuestion(
          `Tính nhẩm: ${a} + ${b} = ?`,
          [`${sum}`, `${sum - 10}`, `${sum + 10}`, `${sum - 2}`],
          `${sum}`,
          `Đặt tính và tính: ${a} + ${b} = ${sum}.`
        ));
      } else {
        const diff = a - b;
        list.push(makeQuestion(
          `Tính nhẩm: ${a} − ${b} = ?`,
          [`${diff}`, `${diff - 10}`, `${diff + 10}`, `${diff + 5}`],
          `${diff}`,
          `Đặt tính và tính: ${a} − ${b} = ${diff}.`
        ));
      }
    }
  }

  // 3. Find unknown in addition/subtraction
  else if (bookLessonNumber === 3) {
    for (let i = 0; i < 15; i++) {
      const val = 20 + i * 5;
      const res = 80 + i * 8;
      if (i % 3 === 0) {
        list.push(makeQuestion(
          `Tìm x biết: x + ${val} = ${res}`,
          [`${res - val}`, `${res + val}`, `${res - val + 10}`, `${res - val - 5}`],
          `${res - val}`,
          `Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = ${res} − ${val} = ${res - val}.`
        ));
      } else if (i % 3 === 1) {
        list.push(makeQuestion(
          `Tìm x biết: x − ${val} = ${res}`,
          [`${res + val}`, `${res - val}`, `${res + val - 10}`, `${res + val + 5}`],
          `${res + val}`,
          `Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = ${res} + ${val} = ${res + val}.`
        ));
      } else {
        list.push(makeQuestion(
          `Tìm x biết: ${res} − x = ${val}`,
          [`${res - val}`, `${res + val}`, `${res - val - 10}`, `${res - val + 5}`],
          `${res - val}`,
          `Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = ${res} − ${val} = ${res - val}.`
        ));
      }
    }
  }

  // 4. Multiplication and division tables 2, 5
  else if (bookLessonNumber === 4) {
    for (let i = 1; i <= 15; i++) {
      if (i % 2 === 0) {
        const factor = (i % 9) + 1;
        const multiplier = i % 3 === 0 ? 2 : 5;
        list.push(makeQuestion(
          `Tính: ${multiplier} × ${factor} = ?`,
          [`${multiplier * factor}`, `${multiplier * factor + 5}`, `${multiplier * factor - 2}`, `${multiplier + factor}`],
          `${multiplier * factor}`,
          `Theo bảng nhân ${multiplier}: ${multiplier} × ${factor} = ${multiplier * factor}.`
        ));
      } else {
        const divisor = i % 3 === 0 ? 2 : 5;
        const quotient = (i % 9) + 1;
        const dividend = divisor * quotient;
        list.push(makeQuestion(
          `Tính: ${dividend} : ${divisor} = ?`,
          [`${quotient}`, `${quotient + 1}`, `${quotient - 1}`, `${quotient * 2}`],
          `${quotient}`,
          `Theo bảng chia ${divisor}: ${dividend} : ${divisor} = ${quotient}.`
        ));
      }
    }
  }

  // 5. Multiplication and division table 3
  else if (bookLessonNumber === 5) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 3 × ${factor} = ?`,
          [`${3 * factor}`, `${3 * factor + 3}`, `${3 * factor - 3}`, `${3 + factor}`],
          `${3 * factor}`,
          `Theo bảng nhân 3: 3 × ${factor} = ${3 * factor}.`
        ));
      } else {
        const dividend = 3 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 3 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 2}`],
          `${factor}`,
          `Theo bảng chia 3: ${dividend} : 3 = ${factor}.`
        ));
      }
    }
  }

  // 6. Multiplication and division table 4
  else if (bookLessonNumber === 6) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 4 × ${factor} = ?`,
          [`${4 * factor}`, `${4 * factor + 4}`, `${4 * factor - 4}`, `${4 + factor}`],
          `${4 * factor}`,
          `Theo bảng nhân 4: 4 × ${factor} = ${4 * factor}.`
        ));
      } else {
        const dividend = 4 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 4 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 3}`],
          `${factor}`,
          `Theo bảng chia 4: ${dividend} : 4 = ${factor}.`
        ));
      }
    }
  }

  // 7 & 34. Geometry and measurement (basic)
  else if (bookLessonNumber === 7 || bookLessonNumber === 34) {
    const units = ["m", "dm", "cm", "mm"];
    for (let i = 0; i < 15; i++) {
      if (i % 3 === 0) {
        const val = 2 + i;
        list.push(makeQuestion(
          `Đổi đơn vị: ${val} m = ...... dm?`,
          [`${val * 10}`, `${val * 100}`, `${val}`, `${val * 1000}`],
          `${val * 10}`,
          `Vì 1 m = 10 dm nên ${val} m = ${val * 10} dm.`
        ));
      } else if (i % 3 === 1) {
        const val = 3 + i;
        list.push(makeQuestion(
          `Đổi đơn vị: ${val} dm = ...... cm?`,
          [`${val * 10}`, `${val * 100}`, `${val}`, `${val * 1000}`],
          `${val * 10}`,
          `Vì 1 dm = 10 cm nên ${val} dm = ${val * 10} cm.`
        ));
      } else {
        const val = 5 + i;
        list.push(makeQuestion(
          `Đổi đơn vị: ${val} cm = ...... mm?`,
          [`${val * 10}`, `${val * 100}`, `${val}`, `${val * 1000}`],
          `${val * 10}`,
          `Vì 1 cm = 10 mm nên ${val} cm = ${val * 10} mm.`
        ));
      }
    }
  }

  // 9. Multiplication and division table 6
  else if (bookLessonNumber === 9) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 6 × ${factor} = ?`,
          [`${6 * factor}`, `${6 * factor + 6}`, `${6 * factor - 6}`, `${6 + factor}`],
          `${6 * factor}`,
          `Theo bảng nhân 6: 6 × ${factor} = ${6 * factor}.`
        ));
      } else {
        const dividend = 6 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 6 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 2}`],
          `${factor}`,
          `Theo bảng chia 6: ${dividend} : 6 = ${factor}.`
        ));
      }
    }
  }

  // 10. Multiplication and division table 7
  else if (bookLessonNumber === 10) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 7 × ${factor} = ?`,
          [`${7 * factor}`, `${7 * factor + 7}`, `${7 * factor - 7}`, `${7 + factor}`],
          `${7 * factor}`,
          `Theo bảng nhân 7: 7 × ${factor} = ${7 * factor}.`
        ));
      } else {
        const dividend = 7 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 7 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 2}`],
          `${factor}`,
          `Theo bảng chia 7: ${dividend} : 7 = ${factor}.`
        ));
      }
    }
  }

  // 11. Multiplication and division table 8
  else if (bookLessonNumber === 11) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 8 × ${factor} = ?`,
          [`${8 * factor}`, `${8 * factor + 8}`, `${8 * factor - 8}`, `${8 + factor}`],
          `${8 * factor}`,
          `Theo bảng nhân 8: 8 × ${factor} = ${8 * factor}.`
        ));
      } else {
        const dividend = 8 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 8 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 2}`],
          `${factor}`,
          `Theo bảng chia 8: ${dividend} : 8 = ${factor}.`
        ));
      }
    }
  }

  // 12. Multiplication and division table 9
  else if (bookLessonNumber === 12) {
    for (let i = 1; i <= 15; i++) {
      const factor = (i % 10) + 1;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Tính: 9 × ${factor} = ?`,
          [`${9 * factor}`, `${9 * factor + 9}`, `${9 * factor - 9}`, `${9 + factor}`],
          `${9 * factor}`,
          `Theo bảng nhân 9: 9 × ${factor} = ${9 * factor}.`
        ));
      } else {
        const dividend = 9 * factor;
        list.push(makeQuestion(
          `Tính: ${dividend} : 9 = ?`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${factor + 2}`],
          `${factor}`,
          `Theo bảng chia 9: ${dividend} : 9 = ${factor}.`
        ));
      }
    }
  }

  // 13. Unknown in multiplication/division
  else if (bookLessonNumber === 13) {
    for (let i = 0; i < 15; i++) {
      const factor = 3 + (i % 7);
      const quotient = 4 + (i % 6);
      const dividend = factor * quotient;
      if (i % 3 === 0) {
        list.push(makeQuestion(
          `Tìm x biết: x × ${factor} = ${dividend}`,
          [`${quotient}`, `${quotient + 1}`, `${quotient - 1}`, `${dividend - factor}`],
          `${quotient}`,
          `Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = ${dividend} : ${factor} = ${quotient}.`
        ));
      } else if (i % 3 === 1) {
        list.push(makeQuestion(
          `Tìm x biết: x : ${factor} = ${quotient}`,
          [`${dividend}`, `${dividend + factor}`, `${dividend - factor}`, `${quotient + factor}`],
          `${dividend}`,
          `Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = ${quotient} × ${factor} = ${dividend}.`
        ));
      } else {
        list.push(makeQuestion(
          `Tìm x biết: ${dividend} : x = ${quotient}`,
          [`${factor}`, `${factor + 1}`, `${factor - 1}`, `${dividend - quotient}`],
          `${factor}`,
          `Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = ${dividend} : ${quotient} = ${factor}.`
        ));
      }
    }
  }

  // 14. Fraction representation (1/x)
  else if (bookLessonNumber === 14) {
    for (let i = 0; i < 15; i++) {
      const base = (i % 4) + 2; // 2, 3, 4, 5
      const multiple = ((i % 5) + 3) * base;
      const result = multiple / base;
      const fractionNames = ["", "", "Một phần hai", "Một phần ba", "Một phần tư", "Một phần năm"];
      
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `${fractionNames[base]} của ${multiple} là bao nhiêu?`,
          [`${result}`, `${result + 1}`, `${result - 1}`, `${multiple - base}`],
          `${result}`,
          `Để tìm ${fractionNames[base]} của ${multiple}, ta lấy ${multiple} chia cho ${base}: ${multiple} : ${base} = ${result}.`
        ));
      } else {
        list.push(makeQuestion(
          `Một hình chữ nhật chia thành ${base} phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?`,
          [`${fractionNames[base]}`, `${fractionNames[base + 1]}`, `${fractionNames[base - 1]}`, "Toàn bộ hình"],
          `${fractionNames[base]}`,
          `Tô màu 1 phần trong số ${base} phần bằng nhau tức là đã tô màu ${fractionNames[base]} hình.`
        ));
      }
    }
  }

  // 16. Midpoints of line segment
  else if (bookLessonNumber === 16) {
    for (let i = 0; i < 15; i++) {
      const length = 10 + i * 2;
      const half = length / 2;
      list.push(makeQuestion(
        `Cho đoạn thẳng AB dài ${length} cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:`,
        [`${half} cm`, `${half - 1} cm`, `${half + 1} cm`, `${length} cm`],
        `${half} cm`,
        `M là trung điểm của AB nên AM = MB = AB : 2 = ${length} : 2 = ${half} cm.`
      ));
    }
  }

  // 17. Circle properties
  else if (bookLessonNumber === 17) {
    for (let i = 0; i < 15; i++) {
      const r = 3 + i;
      const d = r * 2;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Một hình tròn có bán kính là ${r} cm. Đường kính của hình tròn đó là:`,
          [`${d} cm`, `${r} cm`, `${d + 1} cm`, `${d - 1} cm`],
          `${d} cm`,
          `Đường kính gấp 2 lần bán kính: d = ${r} × 2 = ${d} cm.`
        ));
      } else {
        list.push(makeQuestion(
          `Một hình tròn có đường kính là ${d} cm. Bán kính của hình tròn đó là:`,
          [`${r} cm`, `${d} cm`, `${r - 1} cm`, `${r + 1} cm`],
          `${r} cm`,
          `Bán kính bằng một nửa đường kính: r = ${d} : 2 = ${r} cm.`
        ));
      }
    }
  }

  // 18. Angles
  else if (bookLessonNumber === 18) {
    const letters = ["A", "B", "C", "D", "E", "G", "H", "K", "M", "N"];
    for (let i = 0; i < 15; i++) {
      const p = letters[i % letters.length];
      const q = letters[(i + 1) % letters.length];
      const r = letters[(i + 2) % letters.length];
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Góc vuông đỉnh ${q} có hai cạnh là:`,
          [`${q}${p} và ${q}${r}`, `${p}${q} và ${p}${r}`, `${r}${p} và ${r}${q}`, "Cả ba đáp án đều sai"],
          `${q}${p} và ${q}${r}`,
          `Góc đỉnh ${q} được tạo bởi hai cạnh xuất phát từ đỉnh ${q}, đó là ${q}${p} và ${q}${r}.`
        ));
      } else {
        list.push(makeQuestion(
          `Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?`,
          ["Thước ê-ke", "Thước dây", "Com-pa", "Bút chì"],
          "Thước ê-ke",
          "Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông."
        ));
      }
    }
  }

  // 19. Triangles, rectangles, squares
  else if (bookLessonNumber === 19) {
    for (let i = 0; i < 15; i++) {
      const side = 4 + i;
      if (i % 2 === 0) {
        list.push(makeQuestion(
          `Một hình vuông có cạnh dài ${side} cm. Chu vi hình vuông đó là:`,
          [`${side * 4} cm`, `${side * 2} cm`, `${side * side} cm`, `${side + 4} cm`],
          `${side * 4} cm`,
          `Chu vi hình vuông bằng cạnh nhân với 4: P = ${side} × 4 = ${side * 4} cm.`
        ));
      } else {
        const b = side + 2;
        list.push(makeQuestion(
          `Một hình chữ nhật có chiều dài ${b} cm, chiều rộng ${side} cm. Chu vi hình chữ nhật đó là:`,
          [`${(b + side) * 2} cm`, `${b + side} cm`, `${b * side} cm`, `${b * 2 + side} cm`],
          `${(b + side) * 2} cm`,
          `Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (${b} + ${side}) × 2 = ${(b + side) * 2} cm.`
        ));
      }
    }
  }

  // 23 & 36. Multiplications of 2-digit / 3-digit with 1-digit
  else if (bookLessonNumber === 23 || bookLessonNumber === 36) {
    for (let i = 0; i < 15; i++) {
      const factor2 = 12 + i * 4;
      const factor1 = 2 + (i % 4);
      const prod = factor2 * factor1;
      list.push(makeQuestion(
        `Tính: ${factor2} × ${factor1} = ?`,
        [`${prod}`, `${prod - 10}`, `${prod + 10}`, `${prod - 2}`],
        `${prod}`,
        `Đặt tính rồi tính: ${factor2} × ${factor1} = ${prod}.`
      ));
    }
  }

  // 24. Multiplication: Gấp một số lên nhiều lần
  else if (bookLessonNumber === 24) {
    for (let i = 0; i < 15; i++) {
      const start = 5 + i * 2;
      const times = 3 + (i % 4);
      const res = start * times;
      list.push(makeQuestion(
        `Gấp số ${start} lên ${times} lần ta được số nào?`,
        [`${res}`, `${start + times}`, `${res - times}`, `${res + 10}`],
        `${res}`,
        `Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: ${start} × ${times} = ${res}.`
      ));
    }
  }

  // 25. Division with remainder
  else if (bookLessonNumber === 25) {
    for (let i = 0; i < 15; i++) {
      const divisor = 3 + (i % 6);
      const quotient = 4 + (i % 5);
      const remainder = 1 + (i % (divisor - 1 || 1));
      const dividend = divisor * quotient + remainder;
      list.push(makeQuestion(
        `Phép chia ${dividend} : ${divisor} có số dư là bao nhiêu?`,
        [`${remainder}`, "0", `${divisor}`, `${remainder + 1}`],
        `${remainder}`,
        `Vì ${dividend} = ${divisor} × ${quotient} + ${remainder} nên ${dividend} : ${divisor} = ${quotient} (dư ${remainder}).`
      ));
    }
  }

  // 26 & 37. Divisions of 2-digit / 3-digit with 1-digit
  else if (bookLessonNumber === 26 || bookLessonNumber === 37) {
    for (let i = 0; i < 15; i++) {
      const divisor = 2 + (i % 4);
      const quotient = 12 + i * 3;
      const dividend = divisor * quotient;
      list.push(makeQuestion(
        `Tính: ${dividend} : ${divisor} = ?`,
        [`${quotient}`, `${quotient + 1}`, `${quotient - 1}`, `${dividend - divisor}`],
        `${quotient}`,
        `Đặt tính rồi tính: ${dividend} : ${divisor} = ${quotient}.`
      ));
    }
  }

  // 27. Division: Giảm một số đi nhiều lần
  else if (bookLessonNumber === 27) {
    for (let i = 0; i < 15; i++) {
      const times = 2 + (i % 4);
      const quotient = 5 + i * 2;
      const start = quotient * times;
      list.push(makeQuestion(
        `Giảm số ${start} đi ${times} lần ta được số nào?`,
        [`${quotient}`, `${start - times}`, `${quotient + 2}`, `${quotient - 2}`],
        `${quotient}`,
        `Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: ${start} : ${times} = ${quotient}.`
      ));
    }
  }

  // 28. Word problems with 2 steps
  else if (bookLessonNumber === 28) {
    for (let i = 0; i < 15; i++) {
      const a = 10 + i;
      const b = 2 + (i % 3);
      const sum = a + a * b;
      list.push(makeQuestion(
        `Ngăn thứ nhất có ${a} quyển sách. Ngăn thứ hai có số sách gấp ${b} lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?`,
        [`${sum} quyển`, `${a * b} quyển`, `${sum + a} quyển`, `${a + b} quyển`],
        `${sum} quyển`,
        `Bước 1: Ngăn thứ hai có: ${a} × ${b} = ${a * b} quyển. Bước 2: Cả hai ngăn có: ${a} + ${a * b} = ${sum} quyển.`
      ));
    }
  }

  // 30. Millimeters
  else if (bookLessonNumber === 30) {
    for (let i = 0; i < 15; i++) {
      const cm = 5 + i;
      list.push(makeQuestion(
        `Đổi đơn vị: ${cm} cm = ...... mm?`,
        [`${cm * 10}`, `${cm}`, `${cm * 100}`, `${cm + 10}`],
        `${cm * 10}`,
        `Vì 1 cm = 10 mm nên ${cm} cm = ${cm * 10} mm.`
      ));
    }
  }

  // 31. Grams
  else if (bookLessonNumber === 31) {
    for (let i = 0; i < 15; i++) {
      const kg = 2 + (i % 5);
      list.push(makeQuestion(
        `Đổi đơn vị: ${kg} kg = ...... g?`,
        [`${kg * 1000}`, `${kg * 100}`, `${kg * 10}`, `${kg}`],
        `${kg * 1000}`,
        `Vì 1 kg = 1000 g nên ${kg} kg = ${kg * 1000} g.`
      ));
    }
  }

  // 32. Milliliters
  else if (bookLessonNumber === 32) {
    for (let i = 0; i < 15; i++) {
      const l = 2 + (i % 5);
      list.push(makeQuestion(
        `Đổi đơn vị: ${l} l = ...... ml?`,
        [`${l * 1000}`, `${l * 100}`, `${l * 10}`, `${l}`],
        `${l * 1000}`,
        `Vì 1 lít (l) = 1000 mi-li-lít (ml) nên ${l} l = ${l * 1000} ml.`
      ));
    }
  }

  // 33. Temperature
  else if (bookLessonNumber === 33) {
    for (let i = 0; i < 15; i++) {
      const temp = 20 + i;
      list.push(makeQuestion(
        `Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?`,
        ["37 độ C", "39 độ C", "35 độ C", "42 độ C"],
        "37 độ C",
        "Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C."
      ));
    }
  }

  // 38. Expressions order of operations
  else if (bookLessonNumber === 38 || bookLessonNumber === 42) {
    for (let i = 0; i < 15; i++) {
      const a = 10 + i * 2;
      const b = 5 + (i % 4);
      const c = 2 + (i % 3);
      if (i % 2 === 0) {
        const val = a + b * c;
        list.push(makeQuestion(
          `Tính giá trị biểu thức: ${a} + ${b} × ${c} = ?`,
          [`${val}`, `${(a + b) * c}`, `${val + 5}`, `${val - 5}`],
          `${val}`,
          `Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện ${b} × ${c} = ${b * c} trước, rồi ${a} + ${b * c} = ${val}.`
        ));
      } else {
        const val = (a + b) * c;
        list.push(makeQuestion(
          `Tính giá trị biểu thức: (${a} + ${b}) × ${c} = ?`,
          [`${val}`, `${a + b * c}`, `${val + 10}`, `${val - 10}`],
          `${val}`,
          `Thực hiện phép tính trong dấu ngoặc đơn trước: (${a} + ${b}) = ${a + b}, sau đó nhân với ${c}: ${a + b} × ${c} = ${val}.`
        ));
      }
    }
  }

  // 39. Compare ratios
  else if (bookLessonNumber === 39) {
    for (let i = 0; i < 15; i++) {
      const divisor = 2 + (i % 5);
      const quotient = 3 + (i % 6);
      const dividend = divisor * quotient;
      list.push(makeQuestion(
        `Số lớn là ${dividend}, số bé là ${divisor}. Số lớn gấp mấy lần số bé?`,
        [`${quotient} lần`, `${quotient + 1} lần`, `${quotient - 1} lần`, `${dividend - divisor} lần`],
        `${quotient} lần`,
        `Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: ${dividend} : ${divisor} = ${quotient} lần.`
      ));
    }
  }

  // Default: General math operations review (Lessons 8, 15, 20, 21, 22, 29, 35, 40, 41, 43, 44, etc.)
  else {
    for (let i = 0; i < 15; i++) {
      const a = 12 + i * 5;
      const b = 6 + (i % 5);
      const sum = a * b;
      list.push(makeQuestion(
        `Tính nhẩm phép nhân: ${a} × ${b} = ?`,
        [`${sum}`, `${sum + b}`, `${sum - b}`, `${sum + 10}`],
        `${sum}`,
        `Thực hiện phép nhân: ${a} × ${b} = ${sum}.`
      ));
    }
  }

  // Return exactly 15 questions
  return list.slice(0, 15);
}

const lines: string[] = [];
lines.push(`-- Toán lớp 3 Tập 1 — ${rows.length} bài học trên app (mỗi video = 1 bài)`);
lines.push(`-- Chạy sau 003_subjects_textbook.sql`);
lines.push("");

lines.push(`alter table public.lessons
  add column if not exists book_lesson_number int,
  add column if not exists topic_label text,
  add column if not exists video_part smallint not null default 0;
`);
lines.push("");

lines.push(`delete from public.quiz_questions where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);`);
lines.push(`delete from public.quiz_attempts where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);`);
lines.push(`delete from public.quizzes where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);`);
lines.push(`delete from public.schedule_entries where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);`);
lines.push(`delete from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1;`);
lines.push("");

for (const r of rows) {
  const lessonId = lessonUuid(r.lesson_index);
  const quizId = quizUuid(r.lesson_index);
  const yt = r.youtube_video_id ? `'${r.youtube_video_id}'` : "null";

  lines.push(`insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
  book_lesson_number, topic_label, video_part
) values (
  '${lessonId}', 3,
  '${esc(r.title)}',
  '${esc(r.summary)}',
  ${yt},
  'toan', 'Toán',
  ${r.lesson_index}, 1,
  '${esc(r.page_hint)}',
  '${SUBJECT_ID}',
  ${r.book_lesson_number},
  '${esc(r.topic_label)}',
  ${r.video_part}
);`);

  lines.push(`insert into public.quizzes (id, lesson_id, title) values (
  '${quizId}', '${lessonId}', 'Ôn tập: Bài ${r.book_lesson_number}'
);`);

  // Dynamically generate exactly 15 questions per lesson instead of taking the short static practice array
  const dynamicPractice = generateQuestionsForMathLesson(r.book_lesson_number, r.title);

  dynamicPractice.forEach((q, qi) => {
    const opts = JSON.stringify(q.options).replace(/'/g, "''");
    lines.push(`insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  '${quizId}',
  '${esc(q.question)}',
  '${opts}'::jsonb,
  ${q.correct_index},
  ${qi},
  '${esc(q.explanation)}'
);`);
  });
  lines.push("");
}

const out = "supabase/migrations/004_toan3_tap1_curriculum.sql";
writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Successfully generated ${rows.length} lessons with 15 questions each to ${out}`);
