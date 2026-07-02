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

async function run() {
  console.log("🚀 Generating comprehensive Toán 7 Review Exam with Gemini...");

  const pdfTextPath = path.join(process.cwd(), 'scratch/pdf_text.txt');
  let pdfExcerpt = "";
  if (fs.existsSync(pdfTextPath)) {
    // Read the first 1500 lines to give it a solid context of the math problems in the PDF
    const lines = fs.readFileSync(pdfTextPath, 'utf-8').split('\n');
    pdfExcerpt = lines.slice(0, 1200).join('\n');
  }

  const prompt = `
You are an expert Vietnamese middle school mathematics teacher (Toán lớp 7).
Based on the structure, style, and scope of the 40 final semester 1 exam papers (Học kỳ 1) from the provided PDF excerpt, compile a high-quality, comprehensive multiple-choice review exam (Đề ôn tập mẫu) containing exactly 25 questions.

Here is a reference excerpt of the math test papers:
\"\"\"
${pdfExcerpt}
\"\"\"

CRITICAL REQUIREMENTS:
1. Generate exactly 25 multiple-choice questions (MCQs).
2. The questions must cover:
   - Topic 1: Số hữu tỉ & Số thực (exponents, fractions, absolute value, square roots, order of operations).
   - Topic 2: Tỉ lệ thức & Đại lượng tỉ lệ (proportions, direct/inverse variation word problems converted to MCQs).
   - Topic 3: Hàm số & Đồ thị (evaluating f(x), points belonging to y = ax).
   - Topic 4: Hình học (alternate interior/corresponding angles, parallel lines, triangle angle sum theorem, triangle congruence cases: c.c.c, c.g.c, g.c.g).
   - Topic 5: Nâng cao (advanced algebraic expressions, ratios, properties of equal ratios converted to MCQs).
3. Use single dollar sign delimiters ($...$) for math formatting (LaTeX). Never use \\( or \\) or \\[ or \\].
   For example:
   - A fraction must be written as: "Tính giá trị: $\\frac{1}{2}$"
   - Exponents must be formatted as: "$(5^{10})^2$"
   - Double-escape any backslashes in your JSON strings (e.g. use "\\\\frac" instead of "\\frac" so that the raw JSON contains "\\frac").
4. Formulate the questions so they are clear, challenging, and appropriate for Grade 7.
5. Provide 4 options (A, B, C, D) for each question.
6. Calculate the mathematically correct answers carefully. Solve each equation/problem to get the correct answer. Make sure correct_index (0-indexed: 0 for A, 1 for B, 2 for C, 3 for D) points exactly to the correct answer option.
7. Provide a clear step-by-step Vietnamese explanation (explanation) for each question.

The output must be a single JSON object matching this structure:
{
  "collection": {
    "title": "Kiểm Tra Giữa Kỳ 1",
    "subject_slug": "toan",
    "grade": 7,
    "volume": 1,
    "units": [101],
    "sequence_number": 1,
    "exam_type": "final",
    "reference_book": "Bộ đề ôn tập Toán 7",
    "status": "published"
  },
  "exams": [
    {
      "exam_number": 1,
      "title": "Đề ôn tập tổng hợp",
      "questions": [
        {
          "type": "multiple_choice",
          "metadata_json": {
            "question": "Tính giá trị của biểu thức: $A = \\frac{2}{5} - \\frac{1}{7} \\cdot \\frac{7}{2}$",
            "options": ["$\\frac{1}{10}$", "$-\\frac{1}{10}$", "$\\frac{3}{10}$", "$-\\frac{3}{10}$"],
            "correct_index": 1,
            "explanation": "Ta có: $A = \\frac{2}{5} - \\frac{1}{7} \\cdot \\frac{7}{2} = \\frac{2}{5} - \\frac{1}{2} = \\frac{4}{10} - \\frac{5}{10} = -\\frac{1}{10}$."
          }
        }
      ]
    }
  ]
}

Please output the result as a raw JSON object. Do not include markdown code block syntax (like \`\`\`json) in your response. Ensure the JSON is completely valid and parsable.
`;

  console.log("Calling Gemini model...");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest", 
    generationConfig: { responseMimeType: "application/json" }
  });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleanText = text.replace(/^```json/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanText);

    // Save to content/exam-bank/toan7-review-hk1.json
    const outPath = path.join(process.cwd(), 'content/exam-bank/toan7-review-hk1.json');
    fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
    console.log("✅ Successfully generated toan7-review-hk1.json");
  } catch (err) {
    console.error("❌ Failed to generate exam:", err);
  }
}

run();
