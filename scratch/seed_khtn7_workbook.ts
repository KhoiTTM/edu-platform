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

const khtn7Lessons: Record<number, string> = {
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
  13: "Đo độ to và độ cao của âm",
  14: "Phản xạ âm, chống ô nhiễm tiếng ồn",
  15: "Năng lượng ánh sáng. Tia sáng, vùng tối"
};

async function run() {
  console.log("Cleaning up incorrect English collections under subject_slug = 'khtn'...");
  const { data: incorrectCols } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'khtn')
    .eq('grade', 7)
    .ilike('title', 'English%');
    
  if (incorrectCols && incorrectCols.length > 0) {
    const ids = incorrectCols.map(c => c.id);
    console.log(`Deleting ${ids.length} incorrect collections...`);
    // Delete dependent exams first
    await supabase.from('exams').delete().in('collection_id', ids);
    await supabase.from('assessment_collections').delete().in('id', ids);
    console.log("Cleanup finished.");
  } else {
    console.log("No incorrect collections found.");
  }

  // Load question counts from content/khtn7-questions.json
  const questionsPath = path.join(process.cwd(), 'content', 'khtn7-questions.json');
  let questionCounts: Record<number, number> = {};
  try {
    const raw = fs.readFileSync(questionsPath, 'utf-8');
    const questions = JSON.parse(raw);
    questions.forEach((q: any) => {
      if (q.bai) {
        questionCounts[q.bai] = (questionCounts[q.bai] || 0) + 1;
      }
    });
  } catch (e) {
    console.warn("Could not read khtn7-questions.json, using fallback count 10", e);
  }

  console.log("Seeding KHTN 7 SBT collections and exams...");
  for (const [baiStr, title] of Object.entries(khtn7Lessons)) {
    const bai = parseInt(baiStr, 10);
    const colTitle = `SBT KHTN 7 - Bài ${bai}: ${title}`;
    const examTitle = `Bài ${bai}: ${title}`;
    const qCount = questionCounts[bai] || 10;
    
    // Check if collection exists
    const { data: existingCol } = await supabase
      .from('assessment_collections')
      .select('id')
      .eq('subject_slug', 'khtn')
      .eq('grade', 7)
      .eq('title', colTitle)
      .maybeSingle();
      
    let colId = existingCol?.id;
    if (!colId) {
      const { data: insertedCol, error: colErr } = await supabase
        .from('assessment_collections')
        .insert({
          subject_slug: 'khtn',
          title: colTitle,
          grade: 7,
          volume: 1,
          units: [bai],
          exam_type: null, // Workbook / Sách bài tập
          status: 'published',
          sequence_number: bai,
        })
        .select('id')
        .single();
        
      if (colErr || !insertedCol) {
        console.error(`Error inserting collection ${colTitle}:`, colErr);
        continue;
      }
      colId = insertedCol.id;
      console.log(`Created collection: ${colTitle}`);
    } else {
      console.log(`Collection already exists: ${colTitle}`);
    }
    
    // Check if exam exists
    const { data: existingExam } = await supabase
      .from('exams')
      .select('id')
      .eq('collection_id', colId)
      .eq('exam_number', 1)
      .maybeSingle();
      
    if (!existingExam) {
      const { data: insertedExam, error: examErr } = await supabase
        .from('exams')
        .insert({
          collection_id: colId,
          exam_number: 1,
          title: examTitle,
          total_questions: qCount,
          duration_minutes: 45,
          generation_mode: 'handcrafted'
        })
        .select('id')
        .single();
        
      if (examErr || !insertedExam) {
        console.error(`Error inserting exam ${examTitle}:`, examErr);
        continue;
      }
      console.log(`Created exam: ${examTitle} with ${qCount} questions`);
    } else {
      console.log(`Exam already exists: ${examTitle}`);
    }
  }
  
  console.log("Seeding KHTN 7 SBT collections finished successfully.");
}

run();
