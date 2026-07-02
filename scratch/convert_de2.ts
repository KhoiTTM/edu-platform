import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load env variables
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const apiKey = env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const de2Source = {
  "ten_de": "ĐỀ SỐ 02",
  "phan_i_trac_nghiem": {
    "cau_1": {
      "cau_hoi": "Tính giá trị của biểu thức (5^{10})^2",
      "cac_lua_chon": {
        "A": "5^{20}",
        "B": "5^{12}",
        "C": "5^{5}",
        "D": "Đáp án khác"
      }
    },
    "cau_2": {
      "cau_hoi": "Cho biết y tỉ lệ thuận với x theo hệ số tỉ lệ -3, biết y = -21. Giá trị của x là:",
      "cac_lua_chon": {
        "A": "-7",
        "B": "63",
        "C": "7",
        "D": "Đáp án khác"
      }
    },
    "cau_3": {
      "cau_hoi": "Số x trong tỉ lệ thức x/2 = 5/-10 là:",
      "cac_lua_chon": {
        "A": "2",
        "B": "1",
        "C": "-1",
        "D": "Cả B và C đều đúng"
      }
    },
    "cau_4": {
      "cau_hoi": "Giá trị của căn bậc hai (25/36) là:",
      "cac_lua_chon": {
        "A": "±5/6",
        "B": "5/6",
        "C": "-5/6",
        "D": "Đáp án khác"
      }
    },
    "cau_5_dien_khuyet": [
      "Cho đường thẳng c cắt hai đường thẳng song song a và b tạo ra hai góc so le trong A1 và B3, nếu A1 = 80 độ thì số đo B3 = ...",
      "Nếu xx' vuông góc yy' và xx' song song zz' thì ...",
      "Cho tam giác ABC = tam giác MNP, biết BC = 5cm => NP = ...",
      "Cho tam giác ABC và tam giác MIK có AB = MI, góc A = góc M. Điều kiện để hai tam giác bằng nhau theo trường hợp g.c.g là: ..."
    ]
  },
  "phan_ii_tu_luan": {
    "bai_1": {
      "tieu_de": "Thực hiện phép tính (hợp lý nếu có thể)",
      "cau_hoi": [
        "-3/5 + 4/3 - 3/5 + 5/3",
        "(1/6 - 4/5) - (1/6 + 4/5)",
        "(2^{10} * 4^8) / (8^2 * 2^{20})"
      ]
    },
    "bai_2": {
      "tieu_de": "Cho hàm số y = f(x)",
      "yeu_cau": [
        "Tính f(-2) và f(1/3)",
        "Tìm x biết f(x) = 10",
        "Tìm x biết: 3(x-2)^3 / 8 = -27/64"
      ]
    },
    "bai_3": {
      "noi_dung": "Tại 'Ngày hội đọc sách', ba lớp 7A1, 7A2, 7A3 chuẩn bị sách tỉ lệ nghịch với 5, 6, 8. Tổng cộng có 59 quyển sách. Tính số sách mỗi lớp [3]."
    },
    "bai_4_hinh_hoc": {
      "gia_thiet": "Cho góc nhọn xOy, OA = OB trên Ox và Oy. M là trung điểm AB [3].",
      "cau_hoi": [
        "Chứng minh tam giác OMA = tam giác OMB",
        "K trên tia OM, M nằm giữa O và K. Chứng minh AK = BK",
        "Giả sử góc xOy = 60 độ. Tính số đo góc OAB",
        "Qua K kẻ đường thẳng song song AB cắt Ox tại E, Oy tại F. AF cắt BE tại N. Chứng minh O, M, N thẳng hàng [4]."
      ]
    },
    "bai_5_nang_cao": {
      "cau_hoi": "Tìm các số nguyên dương x, y, z thỏa mãn: x + y + z = xyz [4]."
    }
  }
};

async function run() {
  console.log("🔄 Converting User's Đề 2 to MCQ format with Gemini...");

  const prompt = `
You are an expert Vietnamese mathematics teacher.
You will parse the exact structure of "Đề 2" provided below in JSON and generate a clean list of multiple-choice questions (MCQs) for students to practice.

Here is the exact source JSON of "Đề 2":
${JSON.stringify(de2Source, null, 2)}

CRITICAL DIRECTIONS:
1. Convert all math problems (including essay/tự luận questions like "Thực hiện phép tính", "Cho hàm số", "Bài toán thực tế", "Hình học", and "Nâng cao") into multiple choice questions (MCQ) with 4 options (A, B, C, D) and a single correct option.
2. For math formatting, represent mathematical expressions cleanly using LaTeX (surrounded by standard delimiters, e.g. \\( (5^{10})^2 \\) or inline $...$). Do not output raw text fractions like "25/36" in question or option fields; prefer clean LaTeX.
3. Calculate the mathematically correct answers carefully. Solve each equation/problem to get the correct answer. Make sure correct_index (0-indexed: 0 for A, 1 for B, 2 for C, 3 for D) points exactly to the correct answer option.
4. Provide a clear step-by-step Vietnamese explanation (explanation) for each question.
5. The JSON structure for this exam must be:
{
  "exam_number": 2,
  "title": "Đề số 2",
  "questions": [
    {
      "type": "multiple_choice",
      "metadata_json": {
        "question": "Tính giá trị của biểu thức: \\( (5^{10})^2 \\)",
        "options": ["\\( 5^{20} \\)", "\\( 5^{12} \\)", "\\( 5^{5} \\)", "Đáp án khác"],
        "correct_index": 0,
        "explanation": "Ta áp dụng công thức luỹ thừa của luỹ thừa: \\( (a^m)^n = a^{m \\cdot n} \\). Do đó, \\( (5^{10})^2 = 5^{10 \\cdot 2} = 5^{20} \\)."
      }
    }
  ]
}

Please output the result as a raw JSON object matching the exam format above. Do not include markdown code block syntax (like \`\`\`json) in your response. Ensure the JSON is completely valid and parsable.
IMPORTANT: All backslashes in LaTeX equations MUST be double-escaped in the JSON string (e.g. use "\\\\frac" instead of "\\frac", and "\\\\(" instead of "\\("). This is to ensure the output is a valid JSON string.
`;

  console.log("Calling Gemini model...");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    generationConfig: { responseMimeType: "application/json" }
  });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const newExam2 = JSON.parse(text);

    // Now load existing toan7-pilot-hk1.json
    const pilotFilePath = path.join(process.cwd(), 'content/exam-bank/toan7-pilot-hk1.json');
    if (!fs.existsSync(pilotFilePath)) {
      console.error("❌ toan7-pilot-hk1.json not found.");
      return;
    }

    const currentData = JSON.parse(fs.readFileSync(pilotFilePath, 'utf-8'));
    
    // Find index of Đề số 2 (exam_number === 2)
    const idx = currentData.exams.findIndex((e: any) => e.exam_number === 2);
    if (idx !== -1) {
      currentData.exams[idx] = newExam2;
      console.log("✓ Replaced Đề 2 inside toan7-pilot-hk1.json");
    } else {
      currentData.exams.push(newExam2);
      console.log("✓ Appended Đề 2 inside toan7-pilot-hk1.json");
    }

    fs.writeFileSync(pilotFilePath, JSON.stringify(currentData, null, 2));
    console.log("✅ Successfully updated toan7-pilot-hk1.json with user's Đề 2.");
  } catch (err) {
    console.error("❌ Failed to process conversion:", err);
  }
}

run();
