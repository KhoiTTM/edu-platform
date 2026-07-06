/**
 * Tạo audio giọng người (ElevenLabs) cho câu luyện nghe — chạy MỘT LẦN, lưu mp3 tĩnh.
 *
 * Voice theo từng đề: collection.voice = teacher_women | teacher_men | child_girl | child_boy
 *   -> map sang env var: ELEVENLABS_VOICE_ID_Teadcher_Women / _Teacher_Men / _Child_Girl / _Child_Boy
 *   (giữ đúng chính tả env user đã đặt). Không có collection.voice -> dùng ELEVENLABS_VOICE_ID.
 *
 * Tốc độ đọc (x1/x0.75/x0.5) KHÔNG xử lý ở đây — làm bằng audio.playbackRate ở client
 * (không tạo lại file, không tốn credit).
 *
 * Cách dùng:
 *   npx tsx scripts/gen-audio-elevenlabs.ts content/exam-bank/pre-a1-listening-TEST.json
 */
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (m) { let v = m[2] || ''; if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1); process.env[m[1]] = v; }
  });
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
const MODEL = 'eleven_multilingual_v2';

// Map "voice logic" (trong file đề) -> env var chứa voice_id
const VOICE_ENV: Record<string, string> = {
  teacher_women: 'ELEVENLABS_VOICE_ID_Teadcher_Women',
  teacher_men:   'ELEVENLABS_VOICE_ID_Teacher_Men',
  child_girl:    'ELEVENLABS_VOICE_ID_Child_Girl',
  child_boy:     'ELEVENLABS_VOICE_ID_Child_Boy',
};

function resolveVoiceId(voiceKey?: string): string {
  if (voiceKey && VOICE_ENV[voiceKey]) {
    const id = process.env[VOICE_ENV[voiceKey]];
    if (id) return id;
    throw new Error(`Thiếu ${VOICE_ENV[voiceKey]} trong .env.local (voice="${voiceKey}")`);
  }
  const fallback = process.env.ELEVENLABS_VOICE_ID;
  if (fallback) return fallback;
  throw new Error('Không xác định được voice: đặt collection.voice hoặc ELEVENLABS_VOICE_ID.');
}

async function tts(text: string, voiceId: string): Promise<Buffer> {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${err.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) { console.error('Cách dùng: npx tsx scripts/gen-audio-elevenlabs.ts <file.json>'); process.exit(1); }
  if (!API_KEY) { console.error('❌ Thiếu ELEVENLABS_API_KEY trong .env.local'); process.exit(1); }

  const abs = path.resolve(fileArg);
  const data = JSON.parse(fs.readFileSync(abs, 'utf8'));
  const slug = data.collection?.subject_slug ? `${data.collection.subject_slug}-listening` : 'listening';
  const outDir = path.join(process.cwd(), 'public', 'audio', slug);
  fs.mkdirSync(outDir, { recursive: true });

  const collectionVoice: string | undefined = data.collection?.voice;

  let created = 0, skipped = 0, failed = 0;
  for (const exam of data.exams || []) {
    for (const q of exam.questions || []) {
      const m = q.metadata_json || {};
      const text: string | undefined = m.audio_text;
      if (!text) continue;

      // Giọng theo TỪNG CÂU: metadata_json.voice > collection.voice > ELEVENLABS_VOICE_ID
      const voiceKey: string | undefined = m.voice || collectionVoice;
      const voiceId = resolveVoiceId(voiceKey);
      console.log(`🎙️  "${text.slice(0,30)}…" voice=${voiceKey || 'default'}`);

      // hash gồm cả voiceId để đổi giọng -> file khác
      const hash = crypto.createHash('md5').update(voiceId + '|' + text).digest('hex').slice(0, 12);
      const rel = `/audio/${slug}/${hash}.mp3`;
      const filePath = path.join(outDir, `${hash}.mp3`);

      if (fs.existsSync(filePath)) { m.audio_url = rel; skipped++; continue; }
      try {
        fs.writeFileSync(filePath, await tts(text, voiceId));
        m.audio_url = rel;
        created++;
        console.log(`  ✓ ${text.slice(0, 40)}… -> ${rel}`);
        await new Promise(r => setTimeout(r, 300));
      } catch (e: any) {
        failed++;
        console.error(`  ❌ "${text.slice(0, 40)}…": ${e.message}`);
      }
    }
  }

  fs.writeFileSync(abs, JSON.stringify(data, null, 2));
  console.log(`\n✅ Xong. Tạo mới: ${created} | bỏ qua: ${skipped} | lỗi: ${failed}`);
  console.log(`Giờ seed lại: npx tsx scripts/seed-exam-bank.ts ${fileArg}`);
}

main().catch(e => { console.error(e); process.exit(1); });
