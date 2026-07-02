import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// Correct titles for KHTN 7 SBT lessons
const LESSON_TITLES: Record<number, string> = {
  1: "Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
  2: "Nguyên tử",
  3: "Nguyên tố hoá học",
  4: "Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
  5: "Phân tử - Đơn chất - Hợp chất",
  6: "Giới thiệu về liên kết hoá học",
  7: "Hoá trị và công thức hoá học",
  8: "Tốc độ chuyển động",
  9: "Đo tốc độ",
  10: "Đồ thị quãng đường – thời gian",
  11: "Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông",
  12: "Sóng âm",
  13: "Độ to và độ cao của âm",
  14: "Phản xạ âm, chống ô nhiễm tiếng ồn",
  15: "Năng lượng ánh sáng. Tia sáng, vùng tối",
};

async function run() {
  // Get all KHTN 7 SBT collections
  const { data: cols } = await supabase
    .from('assessment_collections')
    .select('id, title, units, sequence_number')
    .eq('subject_slug', 'khtn')
    .eq('grade', 7)
    .is('exam_type', null)
    .order('sequence_number', { ascending: true });

  if (!cols) { console.error("No collections found"); return; }

  // Group by bai number
  const byBai: Record<number, any[]> = {};
  for (const c of cols) {
    const bai = c.units?.[0];
    if (bai) {
      if (!byBai[bai]) byBai[bai] = [];
      byBai[bai].push(c);
    }
  }

  let totalDeleted = 0;
  let totalFixed = 0;

  for (const [baiStr, baiCols] of Object.entries(byBai)) {
    const bai = parseInt(baiStr, 10);
    // Sort by sequence_number ASC → keep the one with lowest seq (= seq 1)
    baiCols.sort((a, b) => a.sequence_number - b.sequence_number);
    
    const [keep, ...duplicates] = baiCols;
    const correctColTitle = `SBT KHTN 7 - Bài ${bai}: ${LESSON_TITLES[bai] || `Bài ${bai}`}`;
    const correctExamTitle = `Bài ${bai}: ${LESSON_TITLES[bai] || `Bài ${bai}`}`;

    // Fix title of kept collection
    if (keep.title !== correctColTitle) {
      await supabase
        .from('assessment_collections')
        .update({ title: correctColTitle })
        .eq('id', keep.id);
      console.log(`  ✅ Fixed col title Bai ${bai}: "${keep.title}" → "${correctColTitle}"`);
      totalFixed++;
    }

    // Fix exam title in kept collection
    await supabase
      .from('exams')
      .update({ title: correctExamTitle })
      .eq('collection_id', keep.id);

    // Delete duplicates (and their exams via cascade or manual)
    for (const dup of duplicates) {
      // Delete exams first
      const { error: examErr } = await supabase
        .from('exams')
        .delete()
        .eq('collection_id', dup.id);
      if (examErr) { console.error(`  ❌ Error deleting exams for col ${dup.id}:`, examErr); continue; }

      // Delete collection
      const { error: colErr } = await supabase
        .from('assessment_collections')
        .delete()
        .eq('id', dup.id);
      if (colErr) { console.error(`  ❌ Error deleting col ${dup.id}:`, colErr); continue; }

      console.log(`  🗑️  Deleted duplicate Bai ${bai}: "${dup.title}" (${dup.id.substring(0,8)})`);
      totalDeleted++;
    }
  }

  console.log(`\n✅ Done! Deleted ${totalDeleted} duplicate collections, fixed ${totalFixed} titles.`);

  // Verify
  const { data: remaining } = await supabase
    .from('assessment_collections')
    .select('id, title, units')
    .eq('subject_slug', 'khtn')
    .eq('grade', 7)
    .is('exam_type', null)
    .order('units', { ascending: true });
  console.log(`Remaining: ${remaining?.length} collections`);
}

run();
