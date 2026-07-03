/**
 * Generator chung cho EXAM BANK — dùng cho MỌI môn/lớp.
 *
 * Cách dùng:
 *   npx tsx scripts/seed-exam-bank.ts content/exam-bank/toan3-giua-ky-1.json
 *
 * Đọc 1 file JSON theo template (xem docs/EXAM_BANK.md) và ghi vào DB:
 *   assessment_collections -> exams -> question_bank (concept_id NULL) -> exam_questions
 *
 * IDEMPOTENT:
 *   - Collection được tìm theo (subject_slug, grade, title): có thì cập nhật, chưa có thì tạo.
 *   - Mỗi exam tìm theo (collection_id, exam_number): seed lại sẽ XÓA sạch câu hỏi cũ
 *     của đúng exam đó rồi tạo lại, nên chạy nhiều lần không nhân đôi dữ liệu.
 *
 * Yêu cầu: migration 048 (concept_id nullable) đã được áp dụng.
 */
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

// ---- Load .env.local (giống các seed script khác trong repo) ----
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE key trong .env.local');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey, { realtime: { transport: ws } });

// ---- Loại câu hỏi runtime AssessmentRenderer render được ----
// (đồng bộ với components/universal/AssessmentRenderer.tsx — cập nhật khi renderer đổi)
const RENDERABLE_TYPES = new Set([
  'multiple_choice',
  'listening_multiple_choice',
  'tap_correct_answer', 'tap_correct_word', 'vocab_to_word',
  'fill_blank', 'fill_in_blank', 'inline_fill_blank',
  'tap_word',
  'sorting', 'sentence_reorder',
  'matching', 'match_pair',
  'classification', 'categorization',
  'word_problem',
  'true_false',
  'shape_identify',
  'clock_read',
  'number_order',
  'crossword',
]);
// Loại có nhánh render riêng nhưng renderer KHÔNG có (rơi vào default) — chỉ cảnh báo, không chặn.
// essay: pipeline OCR sinh mặc định; hiện renderer chưa có case riêng.
const KNOWN_BUT_UNRENDERED = new Set(['essay', 'short_answer']);

// ---- Kiểu dữ liệu template ----
interface ExamQuestion {
  type: string;
  difficulty?: number;
  metadata_json: Record<string, any>;
}
interface ExamSpec {
  exam_number: number;
  title: string;
  duration_minutes?: number;
  generation_mode?: string;
  questions: ExamQuestion[];
}
interface CollectionSpec {
  title: string;
  subject_slug: string;
  grade: number;
  volume?: number;
  units?: number[];
  sequence_number?: number;
  exam_type?: string;
  reference_book?: string;
  status?: 'draft' | 'published' | 'archived';
}
interface ExamBankFile {
  collection: CollectionSpec;
  exams: ExamSpec[];
}

function parseOne(abs: string): ExamBankFile {
  const raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  if (!raw.collection || !Array.isArray(raw.exams)) {
    throw new Error(`File sai cấu trúc (cần { collection, exams }): ${abs}`);
  }
  return raw as ExamBankFile;
}

/**
 * Nhận nhiều NGUỒN: mỗi tham số có thể là 1 file .json HOẶC 1 thư mục
 * (lấy mọi *.json, bỏ file bắt đầu bằng _ như _TEMPLATE). Trả mảng file đã parse.
 */
function loadInputs(args: string[]): { path: string; data: ExamBankFile }[] {
  const out: { path: string; data: ExamBankFile }[] = [];
  for (const a of args) {
    const abs = path.resolve(a);
    if (!fs.existsSync(abs)) {
      console.error(`❌ Không tìm thấy: ${abs}`);
      process.exit(1);
    }
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(abs)
        .filter(f => f.endsWith('.json') && !f.startsWith('_'))
        .sort();
      if (files.length === 0) console.warn(`⚠️  Thư mục không có file .json: ${abs}`);
      for (const f of files) {
        try { out.push({ path: path.join(abs, f), data: parseOne(path.join(abs, f)) }); }
        catch (e: any) { console.error(`❌ ${e.message}`); process.exit(1); }
      }
    } else {
      try { out.push({ path: abs, data: parseOne(abs) }); }
      catch (e: any) { console.error(`❌ ${e.message}`); process.exit(1); }
    }
  }
  return out;
}

// ---- Validate trước khi ghi DB ----
// Trả về { errors (CHẶN seed), warnings (chỉ cảnh báo) }.
function validate(data: ExamBankFile): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const c = data.collection;
  if (!c.title) errors.push('collection.title trống');
  if (!c.subject_slug) errors.push('collection.subject_slug trống');
  if (typeof c.grade !== 'number') errors.push('collection.grade phải là số');

  const seen = new Set<number>();
  data.exams.forEach((e, ei) => {
    if (typeof e.exam_number !== 'number') errors.push(`exam[${ei}].exam_number phải là số`);
    if (seen.has(e.exam_number)) errors.push(`exam_number ${e.exam_number} bị trùng trong file`);
    seen.add(e.exam_number);
    if (!e.questions || e.questions.length === 0) errors.push(`exam ${e.exam_number} không có câu hỏi`);
    (e.questions || []).forEach((q, qi) => {
      const tag = `exam ${e.exam_number} câu ${qi + 1}`;
      const m = q.metadata_json || {};
      if (!m.question) errors.push(`${tag}: thiếu metadata_json.question`);

      // Cảnh báo loại câu runtime chưa render được
      if (!RENDERABLE_TYPES.has(q.type)) {
        if (KNOWN_BUT_UNRENDERED.has(q.type))
          warnings.push(`${tag}: loại "${q.type}" runtime CHƯA có giao diện riêng (sẽ rơi vào default). Cân nhắc đổi sang trắc nghiệm/điền.`);
        else
          warnings.push(`${tag}: loại "${q.type}" không nằm trong danh sách renderer biết — kiểm tra lại.`);
      }

      // Kiểm tra ràng buộc theo từng loại
      switch (q.type) {
        case 'multiple_choice':
        case 'listening_multiple_choice':
        case 'tap_correct_answer':
        case 'tap_correct_word':
        case 'vocab_to_word':
        case 'shape_identify':
          if (!Array.isArray(m.options) || m.options.length < 2)
            errors.push(`${tag}: ${q.type} cần options[>=2]`);
          if (typeof m.correct_index !== 'number' || m.correct_index < 0 || m.correct_index >= (m.options?.length ?? 0))
            errors.push(`${tag}: correct_index ngoài phạm vi options`);
          break;
        case 'fill_blank':
        case 'fill_in_blank':
        case 'inline_fill_blank':
        case 'word_problem':
          if (typeof m.correct_answer === 'undefined')
            errors.push(`${tag}: ${q.type} cần correct_answer`);
          if (Array.isArray(m.choices) && m.choices.length > 0 && !m.choices.map(String).includes(String(m.correct_answer)))
            errors.push(`${tag}: correct_answer không nằm trong choices`);
          break;
        case 'true_false':
          if (typeof m.correct_answer === 'undefined' && typeof m.is_correct === 'undefined')
            errors.push(`${tag}: true_false cần correct_answer (true/false) hoặc is_correct`);
          break;
        case 'matching':
        case 'match_pair':
          if (!Array.isArray(m.pairs) || m.pairs.length < 2)
            errors.push(`${tag}: ${q.type} cần pairs[>=2] (mỗi cặp { left, right })`);
          break;
        case 'crossword':
          if (typeof m.rows !== 'number' || typeof m.cols !== 'number')
            errors.push(`${tag}: crossword cần rows, cols (số)`);
          if (!Array.isArray(m.entries) || m.entries.length < 1)
            errors.push(`${tag}: crossword cần entries[] (mỗi entry { number, direction, row, col, answer, clue })`);
          else m.entries.forEach((en: any, ei: number) => {
            if (!['across', 'down'].includes(en.direction))
              errors.push(`${tag}: entry ${ei + 1} direction phải 'across'|'down'`);
            if (!en.answer || typeof en.answer !== 'string')
              errors.push(`${tag}: entry ${ei + 1} thiếu answer`);
            if (typeof en.row !== 'number' || typeof en.col !== 'number')
              errors.push(`${tag}: entry ${ei + 1} cần row, col (số)`);
          });
          break;
        case 'sorting':
        case 'sentence_reorder':
        case 'number_order':
          // Renderer chấp nhận: words + correct_sentence (gọn nhất), HOẶC items/correct_order, HOẶC options.
          if (
            !(Array.isArray(m.words) && m.correct_sentence) &&
            !Array.isArray(m.items) &&
            !Array.isArray(m.correct_order) &&
            !Array.isArray(m.options)
          )
            errors.push(`${tag}: ${q.type} cần words[]+correct_sentence (hoặc items[]/correct_order[])`);
          break;
        case 'classification':
        case 'categorization':
          if (!Array.isArray(m.categories) || !Array.isArray(m.items))
            errors.push(`${tag}: ${q.type} cần categories[] và items[]`);
          break;
        case 'essay':
        case 'short_answer':
          if (!m.answer && !m.correct_answer && !m.sample_answer)
            warnings.push(`${tag}: ${q.type} không có đáp án mẫu (answer/sample_answer) — sẽ không tự chấm được.`);
          break;
        default:
          warnings.push(`${tag}: loại "${q.type}" chưa có quy tắc kiểm tra riêng — bỏ qua kiểm sâu.`);
      }
    });
  });
  return { errors, warnings };
}

async function upsertCollection(c: CollectionSpec): Promise<string> {
  const { data: existing } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', c.subject_slug)
    .eq('grade', c.grade)
    .eq('title', c.title)
    .maybeSingle();

  const payload = {
    title: c.title,
    subject_slug: c.subject_slug,
    grade: c.grade,
    volume: c.volume ?? null,
    units: c.units ?? null,
    sequence_number: c.sequence_number ?? 1,
    exam_type: c.exam_type ?? null,
    reference_book: c.reference_book ?? null,
    status: c.status ?? 'published',
  };

  if (existing) {
    await supabase.from('assessment_collections').update(payload).eq('id', existing.id);
    console.log(`↻ Collection da co, cap nhat: "${c.title}" (${existing.id})`);
    return existing.id;
  }
  const { data, error } = await supabase
    .from('assessment_collections')
    .insert(payload)
    .select('id')
    .single();
  if (error || !data) {
    console.error('❌ Loi tao collection:', error?.message);
    process.exit(1);
  }
  console.log(`✓ Tao collection moi: "${c.title}" (${data.id})`);
  return data.id;
}

async function seedExam(collectionId: string, c: CollectionSpec, e: ExamSpec) {
  const { data: existing } = await supabase
    .from('exams')
    .select('id')
    .eq('collection_id', collectionId)
    .eq('exam_number', e.exam_number)
    .maybeSingle();

  let examId: string;
  const examPayload = {
    collection_id: collectionId,
    exam_number: e.exam_number,
    title: e.title,
    total_questions: e.questions.length,
    duration_minutes: e.duration_minutes ?? 45,
    generation_mode: e.generation_mode ?? 'manual_import',
  };

  if (existing) {
    examId = existing.id;
    await supabase.from('exams').update(examPayload).eq('id', examId);
    const { data: oldLinks } = await supabase
      .from('exam_questions')
      .select('question_bank_id')
      .eq('exam_id', examId);
    await supabase.from('exam_questions').delete().eq('exam_id', examId);
    const oldQids = (oldLinks || []).map((l: any) => l.question_bank_id).filter(Boolean);
    if (oldQids.length) await supabase.from('question_bank').delete().in('id', oldQids);
    console.log(`  ↻ Cap nhat de #${e.exam_number} (xoa ${oldQids.length} cau cu)`);
  } else {
    const { data, error } = await supabase.from('exams').insert(examPayload).select('id').single();
    if (error || !data) {
      console.error(`  ❌ Loi tao de #${e.exam_number}:`, error?.message);
      return;
    }
    examId = data.id;
    console.log(`  ✓ Tao de #${e.exam_number}: ${e.title}`);
  }

  // Retry helper to handle cloud db network/fetch timeouts
  const runWithRetry = async <T>(fn: () => Promise<T>, retries = 5, delayMs = 1000): Promise<T> => {
    let lastErr: any;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res = await fn();
        return res;
      } catch (err) {
        lastErr = err;
        if (attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }
    throw lastErr;
  };

  // Prepare questions bulk payload
  const qPayloads = e.questions.map((q) => ({
    concept_id: null,
    subject_slug: c.subject_slug,
    grade: c.grade,
    type: q.type,
    difficulty: q.difficulty ?? 1.0,
    metadata_json: q.metadata_json,
    source: 'manual_import',
    source_anchor: { book: c.reference_book ?? null, exam: e.title },
    status: 'approved',
  }));

  let newQs: any[] = [];
  let qErr: any = null;

  try {
    const res = await runWithRetry(async () => {
      return await supabase
        .from('question_bank')
        .insert(qPayloads)
        .select('id');
    });
    newQs = res.data || [];
    qErr = res.error;
  } catch (err: any) {
    qErr = { message: err?.message || 'Network fetch failed after retries' };
  }

  if (qErr || newQs.length === 0) {
    console.error(`    ❌ Loi insert cau hoi cho de #${e.exam_number}:`, qErr?.message);
    return;
  }

  // Link questions to the exam
  const linkPayloads = newQs.map((q, idx) => ({
    exam_id: examId,
    question_bank_id: q.id,
    order_index: idx
  }));

  let linkErr: any = null;
  try {
    const res = await runWithRetry(async () => {
      return await supabase
        .from('exam_questions')
        .insert(linkPayloads);
    });
    linkErr = res.error;
  } catch (err: any) {
    linkErr = { message: err?.message || 'Network fetch failed after retries' };
  }

  if (linkErr) {
    console.error(`    ❌ Loi noi cau hoi cho de #${e.exam_number}:`, linkErr.message);
  }
}

async function main() {
  const rawArgs = process.argv.slice(2);
  const DRY_RUN = rawArgs.includes('--dry-run');
  const fileArgs = rawArgs.filter(a => !a.startsWith('--'));

  if (fileArgs.length === 0) {
    console.error('Cach dung:');
    console.error('  npx tsx scripts/seed-exam-bank.ts <file.json | thu-muc> [them...] [--dry-run]');
    console.error('  --dry-run : chi kiem tra, KHONG ghi DB.');
    process.exit(1);
  }

  const inputs = loadInputs(fileArgs);
  console.log(`\n=== EXAM BANK SEED ${DRY_RUN ? '(DRY RUN — khong ghi DB)' : ''} ===`);
  console.log(`So file: ${inputs.length}\n`);

  let totalErr = 0, totalWarn = 0;
  for (const { path: p, data } of inputs) {
    const { errors, warnings } = validate(data);
    if (warnings.length) {
      console.warn(`⚠️  ${path.basename(p)} — ${warnings.length} canh bao:`);
      warnings.forEach(w => console.warn('   • ' + w));
      totalWarn += warnings.length;
    }
    if (errors.length) {
      console.error(`❌ ${path.basename(p)} — ${errors.length} loi:`);
      errors.forEach(er => console.error('   - ' + er));
      totalErr += errors.length;
    }
  }
  if (totalErr > 0) {
    console.error(`\n❌ Tong ${totalErr} loi. Dung, KHONG ghi DB.`);
    process.exit(1);
  }
  if (totalWarn > 0) console.log(`\n(${totalWarn} canh bao — khong chan seed.)`);

  if (DRY_RUN) {
    console.log('\n✅ Dry run xong: tat ca file hop le. Bo --dry-run de ghi that.');
    return;
  }

  for (const { path: p, data } of inputs) {
    console.log(`\n── ${path.basename(p)} | ${data.collection.subject_slug} L${data.collection.grade} | ${data.exams.length} de ──`);
    const collectionId = await upsertCollection(data.collection);
    for (const e of data.exams) {
      await seedExam(collectionId, data.collection, e);
    }
  }
  console.log(`\n✅ Hoan tat ${inputs.length} file.`);
}

main().catch(err => {
  console.error('Seeding that bai:', err);
  process.exit(1);
});
