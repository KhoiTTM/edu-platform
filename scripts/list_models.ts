import { GoogleGenerativeAI } from '@google/generative-ai';

async function list() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  // Wait, the SDK might not expose listModels? Let's just fetch it using fetch.
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await res.json();
  console.log(data.models.map((m: any) => m.name));
}

list();
