import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const args = process.argv.slice(2);
  const subject = args.includes('--subject') ? args[args.indexOf('--subject') + 1] : null;

  if (!subject) {
    console.error("Usage: npx tsx scripts/delete-assessments.ts --subject <math|english>");
    process.exit(1);
  }

  const subjectCode = subject === 'math' ? 'toan' : subject;
  console.log(`🧹 BẮT ĐẦU DỌN DẸP DỮ LIỆU MÔN: ${subjectCode.toUpperCase()}...`);

  // 1. Delete from Database
  console.log("1. Đang xóa dữ liệu trên Database (Supabase)...");
  
  // Xóa các exams thuộc collection của môn này
  const { data: collections } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', subjectCode);

  if (collections && collections.length > 0) {
    const collectionIds = collections.map(c => c.id);
    
    // Xóa exams
    const { error: err1 } = await supabase.from('exams').delete().in('collection_id', collectionIds);
    if (err1) console.error("Lỗi xóa exams:", err1);
    
    // Xóa collection
    const { error: err2 } = await supabase.from('assessment_collections').delete().in('id', collectionIds);
    if (err2) console.error("Lỗi xóa collections:", err2);
    
    console.log(`- Đã xóa ${collections.length} Collection và các Đề thi (Exams) bên trong.`);
  }

  // Xóa câu hỏi trong question_bank
  const { data: qb, error: err3 } = await supabase
    .from('question_bank')
    .delete()
    .eq('subject_slug', subjectCode)
    .select('id');
    
  if (err3) console.error("Lỗi xóa question_bank:", err3);
  else console.log(`- Đã xóa ${qb?.length || 0} câu hỏi khỏi question_bank.`);


  // 2. Delete local files in pending & imported
  console.log("\n2. Đang dọn dẹp các file JSON dưới máy tính (Local)...");
  const folders = [
    path.join(process.cwd(), 'content', 'assessments', 'pending'),
    path.join(process.cwd(), 'content', 'assessments', 'imported')
  ];

  let deletedFilesCount = 0;
  for (const folder of folders) {
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder);
      for (const file of files) {
        if (file.includes(subject) || file.includes(`imported_${subject}`)) {
          fs.unlinkSync(path.join(folder, file));
          deletedFilesCount++;
        }
      }
    }
  }
  console.log(`- Đã xóa ${deletedFilesCount} file JSON rác trong thư mục pending/imported.`);

  console.log("\n✅ DỌN DẸP HOÀN TẤT! HỆ THỐNG ĐÃ SẠCH SẼ.");
}

main().catch(console.error);
