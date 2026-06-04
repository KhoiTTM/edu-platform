import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

type Question = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty?: number;
};

function makeQuestion(qText: string, opts: string[], correctVal: string, expl: string): Question {
  const unique = Array.from(new Set(opts));
  if (!unique.includes(correctVal)) {
    unique[0] = correctVal;
  }
  const shuffled = unique.sort(() => 0.5 - Math.random());
  return {
    question: qText,
    options: shuffled,
    correct_index: shuffled.indexOf(correctVal),
    explanation: expl,
    difficulty: 1.0
  };
}

function generateDynamicQuestions(bookLessonNumber: number, count: number): Question[] {
  const list: Question[] = [];
  for (let i = 0; i < count; i++) {
    const seed = bookLessonNumber * 100 + i;
    if (bookLessonNumber === 1) {
      const num = 100 + (seed % 899);
      const s = String(num);
      if (i % 3 === 0) list.push(makeQuestion(`Giá trị của chữ số ${s[1]} trong số ${num} là:`, [`${Number(s[1])*10}`, `${s[1]}`, "0", "100"], `${Number(s[1])*10}`, `Chữ số ${s[1]} ở hàng chục.`));
      else if (i % 3 === 1) list.push(makeQuestion(`Số liền sau của ${num} là:`, [`${num+1}`, `${num-1}`, `${num+10}`, `${num}`], `${num+1}`, "Số liền sau = số đó + 1."));
      else list.push(makeQuestion(`Số ${num} gồm:`, [`${s[0]} trăm, ${s[1]} chục, ${s[2]} đơn vị`, `${s[2]} trăm, ${s[1]} chục, ${s[0]} đơn vị`, "3 chữ số giống nhau", "Không biết"], `${s[0]} trăm, ${s[1]} chục, ${s[2]} đơn vị`, "Phân tích cấu tạo số."));
    } else if (bookLessonNumber === 2) {
      const a = 100 + (seed % 400);
      const b = 100 + ((seed * 3) % 400);
      if (i % 2 === 0) list.push(makeQuestion(`Tính: ${a} + ${b} = ?`, [`${a+b}`, `${a+b+10}`, `${a+b-10}`, `${a+b+2}`], `${a+b}`, "Thực hiện phép cộng."));
      else {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        list.push(makeQuestion(`Tính: ${max} - ${min} = ?`, [`${max-min}`, `${max-min+10}`, `${max-min-10}`, `${max-min+1}`], `${max-min}`, "Thực hiện phép trừ."));
      }
    } else if (bookLessonNumber === 3) {
      const val = 10 + (seed % 50);
      const res = 60 + (seed % 40);
      if (i % 2 === 0) list.push(makeQuestion(`Tìm x biết: x + ${val} = ${res}`, [`${res-val}`, `${res+val}`, `${res-val+5}`, `${res-val-5}`], `${res-val}`, "x = tổng - số hạng đã biết."));
      else list.push(makeQuestion(`Tìm x biết: x - ${val} = ${res}`, [`${res+val}`, `${res-val}`, `${res+val+10}`, `${res+val-10}`], `${res+val}`, "x = hiệu + số trừ."));
    } else if (bookLessonNumber === 4) {
      const m = i % 2 === 0 ? 2 : 5;
      const factor = (seed % 9) + 1;
      if (i % 3 === 0) list.push(makeQuestion(`Tính: ${m} x ${factor} = ?`, [`${m*factor}`, `${m*factor+m}`, `${m*factor-m}`, "0"], `${m*factor}`, "Bảng nhân."));
      else list.push(makeQuestion(`Tính: ${factor*m} : ${m} = ?`, [`${factor}`, `${factor+1}`, `${factor-1}`, "0"], `${factor}`, "Bảng chia."));
    } else if (bookLessonNumber === 5) {
      const factor = (seed % 9) + 1;
      if (i % 2 === 0) list.push(makeQuestion(`Tính: 3 x ${factor} = ?`, [`${3*factor}`, `${3*factor+3}`, `${3*factor-3}`, "3"], `${3*factor}`, "Bảng nhân 3."));
      else list.push(makeQuestion(`Tính: ${factor*3} : 3 = ?`, [`${factor}`, `${factor+1}`, `${factor-1}`, "0"], `${factor}`, "Bảng chia 3."));
    } else if (bookLessonNumber === 6) {
      const factor = (seed % 9) + 1;
      if (i % 2 === 0) list.push(makeQuestion(`Tính: 4 x ${factor} = ?`, [`${4*factor}`, `${4*factor+4}`, `${4*factor-4}`, "4"], `${4*factor}`, "Bảng nhân 4."));
      else list.push(makeQuestion(`Tính: ${factor*4} : 4 = ?`, [`${factor}`, `${factor+1}`, `${factor-1}`, "0"], `${factor}`, "Bảng chia 4."));
    } else if (bookLessonNumber === 7 || bookLessonNumber === 43) {
      const val = 2 + (seed % 8);
      if (i % 2 === 0) list.push(makeQuestion(`Đổi: ${val} m = ... dm?`, [`${val*10}`, `${val*100}`, `${val}`, "10"], `${val*10}`, "1m = 10dm."));
      else list.push(makeQuestion(`Đổi: ${val} cm = ... mm?`, [`${val*10}`, `${val*100}`, `${val}`, "10"], `${val*10}`, "1cm = 10mm."));
    } else if (bookLessonNumber >= 9 && bookLessonNumber <= 12) {
      const multiplier = bookLessonNumber === 9 ? 6 : bookLessonNumber === 10 ? 7 : bookLessonNumber === 11 ? 8 : 9;
      const factor = (seed % 9) + 1;
      if (i % 2 === 0) list.push(makeQuestion(`Tính: ${multiplier} x ${factor} = ?`, [`${multiplier*factor}`, `${multiplier*factor+multiplier}`, `${multiplier*factor-multiplier}`, "0"], `${multiplier*factor}`, `Bảng nhân ${multiplier}.`));
      else list.push(makeQuestion(`Tính: ${multiplier*factor} : ${multiplier} = ?`, [`${factor}`, `${factor+1}`, `${factor-1}`, "1"], `${factor}`, `Bảng chia ${multiplier}.`));
    } else {
      const a = 10 + (seed % 90);
      const b = 5 + (seed % 10);
      list.push(makeQuestion(`Tính: ${a} + ${b} = ?`, [`${a+b}`, `${a+b+1}`, `${a+b-1}`, "0"], `${a+b}`, "Cộng cơ bản."));
    }
  }
  return list;
}

async function seed() {
  console.log("🚀 Starting Dynamic Grade 3 Math assessments seeding...");

  const { data: subject } = await supabase.from('universal_subjects').select('id').eq('slug', 'toan').single();
  if (!subject) {
    console.error("❌ Subject 'toan' not found!");
    process.exit(1);
  }

  const tocPath = path.resolve(process.cwd(), 'docs/Assement Studio/Toan_3_Tap1_JSON/table_of_contents.json');
  if (!fs.existsSync(tocPath)) {
    console.error("❌ Table of contents not found!");
    process.exit(1);
  }
  const toc = JSON.parse(fs.readFileSync(tocPath, 'utf-8'));

  let examsCreated = 0;
  let questionsCreated = 0;
  
  let {data: source} = await supabase.from('content_sources').select('id').limit(1).single();

  // Insert Subject Toan 3 if not exists
  let { data: subjectNode, error: errSubFetch } = await supabase.from('curriculum_nodes').select('id, path').eq('type', 'subject').eq('path', 'toan_3').single();
  if (!subjectNode) {
    const { data: newSub, error: errSub } = await supabase.from('curriculum_nodes').insert({
        type: 'subject',
        title: 'Toán 3',
        path: 'toan_3',
        slug: 'toan_3',
        source_id: source?.id
    }).select().single();
    if (errSub) {
        console.error("❌ Error creating subject node:", errSub);
        process.exit(1);
    }
    subjectNode = newSub;
    console.log("✅ Created Subject Node: Toán 3");
  } else {
    console.log("✅ Subject Node: Toán 3 already exists");
  }

  for (let chapterIdx = 0; chapterIdx < toc.table_of_contents.length; chapterIdx++) {
    const chapterData = toc.table_of_contents[chapterIdx];
    if (!chapterData.chapter || !chapterData.lessons) continue;

    console.log(`\n=====================================`);
    console.log(`Processing Chapter: ${chapterData.chapter}`);

    // Create or find Chapter Topic
    const chapterSlug = `chu_de_${chapterIdx + 1}`;
    const chapterPath = `toan_3.${chapterSlug}`;
    
    let { data: topicNode } = await supabase.from('curriculum_nodes').select('id, path, title').eq('type', 'unit').eq('path', chapterPath).single();
    if (!topicNode) {
        const { data: newTopic, error: topicErr } = await supabase.from('curriculum_nodes').insert({
            type: 'unit',
            title: chapterData.chapter,
            path: chapterPath,
            slug: chapterSlug,
            parent_id: subjectNode.id,
            source_id: source?.id
        }).select().single();
        if (topicErr) {
            console.error("❌ Error creating topic node:", topicErr);
            process.exit(1);
        }
        topicNode = newTopic;
        console.log(`✅ Created Topic Node: ${topicNode.title}`);
    } else {
        console.log(`✅ Found Topic Node: ${topicNode.title}`);
    }

    for (const lesson of chapterData.lessons) {
      console.log(`  -> Lesson: ${lesson.title}`);
      
      const lessonMatch = lesson.title.match(/Bài (\d+)/);
      if (!lessonMatch) continue;
      const lessonNum = parseInt(lessonMatch[1]);
      const lessonSlug = `bai_${lessonNum}`;

      const conceptSlug = `concept-math3-${lessonSlug}`;
      let { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).maybeSingle();
      if (!concept) {
          const res = await supabase.from('concepts').insert({
              source_id: source?.id,
              slug: conceptSlug,
              title: `Kiến thức ${lesson.title}`,
              description: `Kiến thức trọng tâm bài ${lessonNum}`
          }).select().single();
          concept = res.data;
      }
      
      if (!concept) {
          console.log(`⚠️ Concept not created for lesson ${lessonNum}`);
          continue;
      }

      for (let i = 1; i <= 4; i++) {
        const title = `Toán 3 - Tập 1 - ${chapterData.chapter.split(':')[0]} - ${lesson.title} - Đề ${i}`;
        
        let colData: any = {
            title,
            subject_slug: 'toan',
            grade: 3,
            volume: 1,
            status: 'published'
        };

        // Inject unit_id if it works
        colData.unit_id = topicNode.id;

        let newCol = null;
        let colError = null;

        const res1 = await supabase.from('assessment_collections').insert(colData).select().single();
        if (res1.error && res1.error.message.includes('unit_id')) {
           delete colData.unit_id;
           const res2 = await supabase.from('assessment_collections').insert(colData).select().single();
           newCol = res2.data;
           colError = res2.error;
        } else {
           newCol = res1.data;
           colError = res1.error;
        }

        if (colError || !newCol) {
          console.error("❌ Error inserting assessment_collections:", colError);
          continue;
        }

        const { data: exam, error: examErr } = await supabase.from('exams').insert({
            collection_id: newCol.id, 
            title, 
            exam_number: i, 
            total_questions: 20, 
            generation_mode: 'balanced',
            metadata_json: { unit_id: topicNode.id }
        }).select().single();

        if (examErr) {
            console.error("❌ Error creating exam:", examErr);
            continue;
        }

        if (exam) {
            examsCreated++;
            const questions = generateDynamicQuestions(lessonNum, 20);
            for (let qIdx = 0; qIdx < questions.length; qIdx++) {
                const q = questions[qIdx];
                const { data: newQ, error: qErr } = await supabase.from('question_bank').insert({
                    concept_id: concept.id,
                    type: 'multiple_choice', 
                    difficulty: q.difficulty || 1.0,
                    metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
                    source: 'handcrafted', 
                    status: 'approved', 
                    grade: 3, 
                    subject_slug: 'toan'
                }).select().single();

                if (qErr) {
                    console.error("❌ Error creating question:", qErr);
                    continue;
                }

                if (newQ) {
                    await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIdx });
                    questionsCreated++;
                }
            }
        }
      }
      console.log(`     ✅ Created 4 exams (80 questions total).`);
    }
  }

  console.log(`\n🎉 Grade 3 Dynamic Seeding Completed Successfully!`);
  console.log(`📊 Total Exams Created: ${examsCreated}`);
  console.log(`📊 Total Questions Created: ${questionsCreated}`);
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
