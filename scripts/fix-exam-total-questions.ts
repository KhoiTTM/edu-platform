/**
 * Chẩn đoán & sửa lệch total_questions cho exams.
 *
 * VẤN ĐỀ: Trang Luyện tập hiển thị `exams.total_questions`, nhưng khi làm bài
 * runner đếm số dòng thực trong exam_questions. Nếu 2 số lệch (vd hiện 5 câu
 * nhưng làm bài có 14 câu) -> cột total_questions trong DB bị sai.
 *
 * Cách dùng:
 *   # Chỉ xem, KHÔNG sửa:
 *   npx tsx scripts/fix-exam-total-questions.ts --subject toan --grade 3
 *   # Sửa thật:
 *   npx tsx scripts/fix-exam-total-questions.ts --subject toan --grade 3 --apply
 *   # Toàn bộ môn/lớp:
 *   npx tsx scripts/fix-exam-total-questions.ts --apply
 */
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (m) { let v = m[2] || ''; if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1); process.env[m[1]] = v; }
  });
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const APPLY = process.argv.includes('--apply');
const subject = arg('subject');
const grade = arg('grade') ? parseInt(arg('grade')!, 10) : undefined;

async function main() {
  // 1. Lọc collections theo subject/grade nếu có
  let colQuery = supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade, exam_type');
  if (subject) colQuery = colQuery.eq('subject_slug', subject);
  if (grade) colQuery = colQuery.eq('grade', grade);
  const { data: collections, error: colErr } = await colQuery;
  if (colErr) { console.error('Lỗi đọc collections:', colErr.message); process.exit(1); }

  const colMap = new Map((collections || []).map(c => [c.id, c]));
  const colIds = (collections || []).map(c => c.id);
  if (colIds.length === 0) { console.log('Không có collection khớp bộ lọc.'); return; }

  // 2. Lấy exams
  const { data: exams, error: exErr } = await supabase
    .from('exams')
    .select('id, collection_id, exam_number, title, total_questions')
    .in('collection_id', colIds);
  if (exErr) { console.error('Lỗi đọc exams:', exErr.message); process.exit(1); }

  // 3. Đếm số câu thực tế cho từng exam
  let mismatches = 0, ok = 0;
  for (const ex of exams || []) {
    const { count, error: cErr } = await supabase
      .from('exam_questions')
      .select('id', { count: 'exact', head: true })
      .eq('exam_id', ex.id);
    if (cErr) { console.error(`  Lỗi đếm câu cho exam ${ex.id}:`, cErr.message); continue; }
    const real = count ?? 0;
    const col = colMap.get(ex.collection_id);
    if (real !== ex.total_questions) {
      mismatches++;
      console.log(
        `LỆCH | ${col?.subject_slug} L${col?.grade} | ${col?.title} | ` +
        `${ex.title} (đề ${ex.exam_number}) | hiển thị=${ex.total_questions} thực=${real}`
      );
      if (APPLY) {
        const { error: uErr } = await supabase
          .from('exams').update({ total_questions: real }).eq('id', ex.id);
        if (uErr) console.error(`     ❌ sửa thất bại: ${uErr.message}`);
        else console.log(`     ✓ đã sửa total_questions -> ${real}`);
      }
    } else {
      ok++;
    }
  }

  console.log(`\n=== Tổng kết ===`);
  console.log(`Đúng: ${ok} | Lệch: ${mismatches} | Tổng đề kiểm tra: ${(exams || []).length}`);
  if (mismatches > 0 && !APPLY) console.log(`\n👉 Chạy lại với --apply để sửa ${mismatches} đề bị lệch.`);
}

main().catch(e => { console.error(e); process.exit(1); });
