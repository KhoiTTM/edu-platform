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

// Batch 2 dùng key thứ 2 (key 1 đã cạn quota từ đợt sinh 66 câu trước — xem
// docs/luyen-tap/pre-a1-starter-listening-level3-roadmap.md mục 4 bước 3).
const API_KEY = process.env.ELEVENLABS_API_KEY_SECOND;
const MODEL = 'eleven_multilingual_v2';

const VOICE_ENV: Record<string, string> = {
  teacher_women: process.env.ELEVENLABS_VOICE_ID_Teadcher_Women || process.env.ELEVENLABS_VOICE_ID || '',
  teacher_men:   process.env.ELEVENLABS_VOICE_ID_Teacher_Men || process.env.ELEVENLABS_VOICE_ID || '',
  child_girl:    process.env.ELEVENLABS_VOICE_ID_Child_Girl || process.env.ELEVENLABS_VOICE_ID || '',
  child_boy:     process.env.ELEVENLABS_VOICE_ID_Child_Boy || process.env.ELEVENLABS_VOICE_ID || '',
};

class QuotaExceededError extends Error {}

async function tts(text: string, voiceId: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('Missing ELEVENLABS_API_KEY_SECOND');
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
  if (res.status === 401 || res.status === 429) {
    const err = await res.text();
    if (err.includes('quota') || err.includes('credit') || res.status === 429) {
      throw new QuotaExceededError(`Quota het (status ${res.status}): ${err.slice(0, 150)}`);
    }
    throw new Error(`ElevenLabs ${res.status}: ${err.slice(0, 200)}`);
  }
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${err.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const jsonPath = path.join('content', 'exam-bank', 'pre-a1-listening-level3-batch8-source.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File ${jsonPath} khong ton tai. Chay scripts/generate-listening-level3-batch2.ts truoc.`);
    process.exit(1);
  }
  if (!API_KEY) {
    console.error('❌ Thieu ELEVENLABS_API_KEY_SECOND trong .env.local');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const outDir = path.join(process.cwd(), 'public', 'audio', 'pre-a1-starter-listening-l3');
  fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;
  let failed = 0;
  let stoppedOnQuota = false;

  console.log(`Bat dau sinh audio batch 8 bang ELEVENLABS_API_KEY_SECOND. Tong cau nguon: ${data.dialogues.length}`);

  for (const exam of data.exams || []) {
    if (stoppedOnQuota) break;
    for (const q of exam.questions || []) {
      if (stoppedOnQuota) break;

      const m = q.metadata_json || {};
      const text: string = m.audio_text || '';
      if (!text) continue;

      const hash = crypto.createHash('md5').update(text).digest('hex').slice(0, 12);
      const rel = `/audio/pre-a1-starter-listening-l3/${hash}.mp3`;
      const filePath = path.join(outDir, `${hash}.mp3`);

      if (fs.existsSync(filePath)) {
        m.audio_url = rel;
        skipped++;
        continue;
      }

      console.log(`🎙️ [${created + 1}] "${text.replace(/\n/g, ' | ')}"`);

      try {
        const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean);
        const buffers: Buffer[] = [];

        for (const line of lines) {
          let voiceRole = 'teacher_women';
          let cleanText = line;

          if (line.startsWith('Man:')) { voiceRole = 'teacher_men'; cleanText = line.replace('Man:', '').trim(); }
          else if (line.startsWith('Woman:')) { voiceRole = 'teacher_women'; cleanText = line.replace('Woman:', '').trim(); }
          else if (line.startsWith('Girl:')) { voiceRole = 'child_girl'; cleanText = line.replace('Girl:', '').trim(); }
          else if (line.startsWith('Boy:')) { voiceRole = 'child_boy'; cleanText = line.replace('Boy:', '').trim(); }

          const voiceId = VOICE_ENV[voiceRole];
          if (!voiceId) throw new Error(`Voice ID not found for role: ${voiceRole}`);

          const buf = await tts(cleanText, voiceId);
          buffers.push(buf);
        }

        const finalBuffer = Buffer.concat(buffers);
        fs.writeFileSync(filePath, finalBuffer);
        m.audio_url = rel;
        created++;

        await new Promise(r => setTimeout(r, 800));
      } catch (err: any) {
        if (err instanceof QuotaExceededError) {
          console.error(`⛔ Het han muc API: ${err.message}`);
          console.error(`Dung lai. Da sinh duoc ${created} cau moi truoc khi het quota.`);
          stoppedOnQuota = true;
          break;
        }
        console.error(`❌ Loi sinh audio cho: "${text.slice(0, 40)}...". ${err.message}`);
        failed++;
      }
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`\n=== TOM TAT SINH AUDIO BATCH 8 ===`);
  console.log(`✅ Moi tao: ${created}`);
  console.log(`⏭️ Da co san (skip): ${skipped}`);
  console.log(`❌ Loi khac: ${failed}`);
  console.log(`⛔ Dung vi het quota: ${stoppedOnQuota ? 'CO' : 'KHONG'}`);
  console.log(`📁 File audio: public/audio/pre-a1-starter-listening-l3/`);
  console.log(`📝 JSON cap nhat: ${jsonPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
