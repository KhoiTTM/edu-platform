import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
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
  console.error("❌ Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const EXAM_BANK_DIR = path.join(process.cwd(), 'content/exam-bank');
if (!fs.existsSync(EXAM_BANK_DIR)) {
  fs.mkdirSync(EXAM_BANK_DIR, { recursive: true });
}

async function run() {
  console.log("🚀 Starting Pilot Generation in seed-exam-bank structure...");

  const pdfTextPath = path.join(process.cwd(), 'scratch/pdf_text.txt');
  if (!fs.existsSync(pdfTextPath)) {
    console.error("❌ pdf_text.txt not found. Run extract_pdf_text.py first.");
    return;
  }

  const rawText = fs.readFileSync(pdfTextPath, 'utf-8');
  const pages = rawText.split(/================ PAGE \d+ ================\n/);
  const pilotText = [pages[2], pages[3], pages[4]].filter(Boolean).join("\n");

  const prompt = `
You are an expert Vietnamese mathematics teacher.
You will parse the mathematical test papers below and generate clean, multiple-choice questions (MCQs) for students to practice.

Here is the raw text containing ĐỀ 1, ĐỀ 2, and ĐỀ 3 for Grade 7 Math (Toán 7 - Học kì 1):
\"\"\"
${pilotText}
\"\"\"

CRITICAL DIRECTIONS:
1. Generate a single JSON object matching the schema for scripts/seed-exam-bank.ts.
2. Convert all math problems (including essay/tự luận questions like "Bài 1: Thực hiện phép tính", "Bài 2: Tìm x", "Bài 3: Giải toán...") into multiple choice questions (MCQ) with 4 options (A, B, C, D) and a single correct option.
3. For math formatting, represent mathematical expressions cleanly using LaTeX (surrounded by standard delimiters, e.g. \\( \\frac{2}{5} - \\frac{1}{7} \\cdot \\frac{7}{2} \\) or inline $...$). Do not output raw text fractions like "2/5" in question or option fields; prefer clean LaTeX.
4. Calculate the mathematically correct answers carefully. Solve each equation/problem to get the correct answer. Make sure correct_index (0-indexed: 0 for A, 1 for B, 2 for C, 3 for D) points exactly to the correct answer option.
5. Provide a clear step-by-step Vietnamese explanation (explanation) for each question.
6. The JSON structure must be:
{
  "collection": {
    "title": "Kiểm Tra Học Kỳ 1 - Toán 7",
    "subject_slug": "toan",
    "grade": 7,
    "volume": 1,
    "units": [101],
    "sequence_number": 1,
    "exam_type": "final",
    "reference_book": "Bộ đề học kì 1 môn Toán lớp 7 Hà Nội",
    "status": "published"
  },
  "exams": [
    {
      "exam_number": 1,
      "title": "Đề số 1",
      "questions": [
        {
          "type": "multiple_choice",
          "metadata_json": {
            "question": "...",
            "options": [...],
            "correct_index": 0,
            "explanation": "..."
          }
        }
      ]
    },
    {
      "exam_number": 2,
      "title": "Đề số 2",
      "questions": [...]
    },
    {
      "exam_number": 3,
      "title": "Đề số 3",
      "questions": [...]
    }
  ]
}

Please output the result as a raw JSON object. Do not include markdown code block syntax (like \`\`\`json) in your response. Ensure the JSON is completely valid and parsable.
IMPORTANT: Since you are outputting raw JSON, any backslash (\\) character in your string fields MUST be escaped as a double backslash (\\\\) in the JSON text.
For example:
- A fraction like \\frac{2}{5} must be represented as \\\\frac{2}{5} in the JSON text.
- Parenthesis LaTeX delimiters like \\( and \\) must be represented as \\\\( and \\\\) in the JSON text.
Failure to escape backslashes will break the JSON parser.
`;

  console.log("Calling Gemini model...");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    generationConfig: { responseMimeType: "application/json" }
  });
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Clean up markdown markers if any
    const cleanText = text.replace(/^```json/, '').replace(/```$/, '').trim();
    
    const parsed = JSON.parse(cleanText);
    
    fs.writeFileSync(path.join(EXAM_BANK_DIR, 'toan7-pilot-hk1.json'), JSON.stringify(parsed, null, 2));
    console.log("✅ Successfully generated toan7-pilot-hk1.json in content/exam-bank/");
  } catch (err) {
    console.error("❌ Failed to generate exams:", err);
  }
}

run();
