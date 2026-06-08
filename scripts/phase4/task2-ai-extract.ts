import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load .env.local manually since we run with ts-node
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

const genAI = new GoogleGenerativeAI(env['GEMINI_API_KEY']);
// gemini-2.5-pro is the powerful model suitable for large text extraction
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

const DATA_DIR = path.join(process.cwd(), 'scripts', 'phase4', 'data');

const prompt = `You are an expert educational data extraction engineer.
Your task is to read the raw OCR text from an IELTS Mindset Foundation textbook unit and extract ALL the exercises into a precise JSON array of question objects.

CRITICAL INSTRUCTIONS:
1. ONLY extract exercises. Ignore table of contents, introduction, or generic textbook chat.
2. DO NOT hallucinate or invent questions. Copy the text exactly as it appears.
3. IGNORE any exercise that strictly requires listening to an audio track (e.g. "Listen and match"). If it can be done without audio (e.g. grammar rules), extract it.
4. For questions like "Fill in the blank" or "Reading comprehension", you MUST provide the FULL contextual paragraph in the "reading_passage" field so the student can read the text before answering.

You must return a JSON object with a single property "questions" which is an array.
Each item in the array must be one of the following types:

Type 1: "inline_fill_blank"
- Used for: filling blanks in sentences or a paragraph.
- Fields:
  - type: "inline_fill_blank"
  - instruction: string (the exercise instruction)
  - reading_passage: string (the full paragraph context, if applicable)
  - text_segments: string[] (the text split by the blanks, e.g. ["I ", " a boy."])
  - correct_answers: string[] (the answers that go into the blanks)
  - word_pool: string[] (optional list of words the student can choose from, if provided by the book)

Type 2: "multiple_choice"
- Used for: standard ABCD questions or True/False.
- Fields:
  - type: "multiple_choice"
  - instruction: string
  - reading_passage: string (optional)
  - question: string
  - options: string[]
  - correct_index: number

Type 3: "match_pair"
- Used for: matching words to definitions, or left parts to right parts.
- Fields:
  - type: "match_pair"
  - instruction: string
  - pairs: { left: string, right: string }[]

Type 4: "sentence_reorder"
- Used for: reordering words to make a sentence.
- Fields:
  - type: "sentence_reorder"
  - instruction: string
  - words: string[] (the scrambled words)
  - correct_order: string[] (the correct order)

Extract EVERYTHING you can. The output will be parsed by code, so do NOT output anything other than JSON.`;

async function extractUnit(unitNum: string) {
  const filePath = path.join(DATA_DIR, `UNIT_${unitNum}_raw.txt`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const text = fs.readFileSync(filePath, 'utf-8');
  console.log(`Starting extraction for UNIT ${unitNum} (${text.length} chars)...`);

  try {
    const result = await model.generateContent({
        contents: [
            { role: "user", parts: [{ text: prompt + "\n\nTEXT:\n" + text }] }
        ],
        generationConfig: {
            temperature: 0,
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.OBJECT,
                properties: {
                    questions: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                type: { type: SchemaType.STRING },
                                instruction: { type: SchemaType.STRING },
                                reading_passage: { type: SchemaType.STRING, nullable: true },
                                text_segments: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
                                correct_answers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
                                word_pool: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
                                question: { type: SchemaType.STRING, nullable: true },
                                options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
                                correct_index: { type: SchemaType.INTEGER, nullable: true },
                                pairs: { 
                                    type: SchemaType.ARRAY, 
                                    items: { 
                                        type: SchemaType.OBJECT, 
                                        properties: { left: { type: SchemaType.STRING }, right: { type: SchemaType.STRING } } 
                                    },
                                    nullable: true 
                                },
                                words: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
                                correct_order: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true }
                            },
                            required: ["type", "instruction"]
                        }
                    }
                }
            }
        }
    });

    const response = result.response.text();
    const json = JSON.parse(response);
    
    const outPath = path.join(DATA_DIR, `extracted_unit_${unitNum}.json`);
    fs.writeFileSync(outPath, JSON.stringify(json.questions, null, 2), 'utf-8');
    console.log(`✅ Extracted ${json.questions.length} questions for UNIT ${unitNum}. Saved to ${outPath}`);
  } catch (err) {
    console.error(`❌ Error extracting UNIT ${unitNum}:`, err);
  }
}

async function run() {
  const args = process.argv.slice(2);
  const targetUnit = args[0];
  if (targetUnit) {
      await extractUnit(targetUnit.padStart(2, '0'));
  } else {
      // Run for all
      for (let i = 2; i <= 10; i++) {
          await extractUnit(i.toString().padStart(2, '0'));
      }
  }
}

run();
