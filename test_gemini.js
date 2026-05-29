
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  console.log("Using Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Try calling listModels if we have an older SDK, or just try to generate content with gemini-1.5-flash
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent("Hello");
    console.log("Response:", result.response.text());
  } catch (e) {
    console.error("Flash Error:", e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent("Hello");
    console.log("Pro Response:", result.response.text());
  } catch (e) {
    console.error("Pro Error:", e.message);
  }
}

run();
