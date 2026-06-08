import fs from 'fs';
import path from 'path';

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

async function test() {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + env['GEMINI_API_KEY']);
    const data = await response.json();
    console.log(data.models.map((m: any) => m.name));
  } catch (err) {
    console.error(err);
  }
}
test();
