import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (m) {
      let v = m[2] || '';
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      process.env[m[1]] = v;
    }
  });
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
const MODEL = 'eleven_multilingual_v2';

const VOICE_ENV: Record<string, string> = {
  teacher_women: process.env.ELEVENLABS_VOICE_ID_Teadcher_Women || process.env.ELEVENLABS_VOICE_ID || '',
  teacher_men:   process.env.ELEVENLABS_VOICE_ID_Teacher_Men || process.env.ELEVENLABS_VOICE_ID || '',
  child_girl:    process.env.ELEVENLABS_VOICE_ID_Child_Girl || process.env.ELEVENLABS_VOICE_ID || '',
  child_boy:     process.env.ELEVENLABS_VOICE_ID_Child_Boy || process.env.ELEVENLABS_VOICE_ID || '',
};

async function tts(text: string, voiceId: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('Missing ElevenLabs API Key');
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.55, similarity_boost: 0.75 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${err.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const jsonPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-exams.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File ${jsonPath} does not exist. Run scripts/generate-listening-level3.ts first.`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const outDir = path.join(process.cwd(), 'public', 'audio', 'pre-a1-starter-listening-l3');
  fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;
  let failed = 0;
  const LIMIT = 100; // Hard limit requested by user

  console.log(`Starting audio generation. Target limit: ${LIMIT} new files.`);

  // Iterate over exams and questions
  for (const exam of data.exams || []) {
    if (created >= LIMIT) break;

    for (const q of exam.questions || []) {
      if (created >= LIMIT) break;

      const m = q.metadata_json || {};
      const text: string = m.audio_text || '';
      if (!text) continue;

      // Hash to uniquely identify file based on content
      const hash = crypto.createHash('md5').update(text).digest('hex').slice(0, 12);
      const rel = `/audio/pre-a1-starter-listening-l3/${hash}.mp3`;
      const filePath = path.join(outDir, `${hash}.mp3`);

      // If file exists, reuse it
      if (fs.existsSync(filePath)) {
        m.audio_url = rel;
        skipped++;
        continue;
      }

      console.log(`🎙️ Generating [${created + 1}/${LIMIT}]: "${text.replace(/\n/g, ' | ')}"`);

      try {
        // Parse lines:
        // "Man: Where are you going, May?\nGirl: I'm going to the library to read books."
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        const buffers: Buffer[] = [];

        for (const line of lines) {
          let voiceRole = 'teacher_women';
          let cleanText = line;

          if (line.startsWith('Man:')) {
            voiceRole = 'teacher_men';
            cleanText = line.replace('Man:', '').trim();
          } else if (line.startsWith('Woman:')) {
            voiceRole = 'teacher_women';
            cleanText = line.replace('Woman:', '').trim();
          } else if (line.startsWith('Girl:')) {
            voiceRole = 'child_girl';
            cleanText = line.replace('Girl:', '').trim();
          } else if (line.startsWith('Boy:')) {
            voiceRole = 'child_boy';
            cleanText = line.replace('Boy:', '').trim();
          }

          const voiceId = VOICE_ENV[voiceRole];
          if (!voiceId) {
            throw new Error(`Voice ID not found for role: ${voiceRole}`);
          }

          // Call TTS for this specific line
          const buf = await tts(cleanText, voiceId);
          buffers.push(buf);
        }

        // Concatenate buffers to create conversational audio
        const finalBuffer = Buffer.concat(buffers);
        fs.writeFileSync(filePath, finalBuffer);

        m.audio_url = rel;
        created++;

        // Small delay to prevent rate limits
        await new Promise(r => setTimeout(r, 800));

      } catch (err: any) {
        console.error(`❌ Failed to generate audio for: "${text.slice(0, 30)}...". Error: ${err.message}`);
        failed++;
      }
    }
  }

  // Save the updated JSON file with the new audio URLs mapped
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`\n=== AUDIO GENERATION SUMMARY ===`);
  console.log(`✅ Newly Created: ${created}`);
  console.log(`⏭️ Skipped (already existed): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Files saved in: public/audio/pre-a1-starter-listening-l3/`);
  console.log(`📝 Updated JSON file: ${jsonPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
