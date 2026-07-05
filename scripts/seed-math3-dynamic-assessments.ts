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

// Generates a single question for a given lesson
function getQuestionForLesson(lesson: number, index: number, globalSeed: number): Question {
  const seed = lesson * 1000 + globalSeed * 10 + index;
  
  if (lesson === 1) { // Đọc viết cấu tạo số
    const num = 100 + (seed % 899);
    const s = String(num);
    if (index % 3 === 0) return makeQuestion(`Giá trị của chữ số ${s[1]} trong số ${num} là:`, [`${Number(s[1])*10}`, `${s[1]}`, "0", "100"], `${Number(s[1])*10}`, `Chữ số ${s[1]} ở hàng chục.`);
    else if (index % 3 === 1) return makeQuestion(`Số liền sau của ${num} là:`, [`${num+1}`, `${num-1}`, `${num+10}`, `${num}`], `${num+1}`, "Số liền sau = số đó + 1.");
    else return makeQuestion(`Số ${num} gồm:`, [`${s[0]} trăm, ${s[1]} chục, ${s[2]} đơn vị`, `${s[2]} trăm, ${s[1]} chục, ${s[0]} đơn vị`, "3 chữ số giống nhau", "Không biết"], `${s[0]} trăm, ${s[1]} chục, ${s[2]} đơn vị`, "Phân tích cấu tạo số.");
  } else if (lesson === 2 || lesson === 3) { // Cộng trừ cơ bản
    const a = 10 + (seed % 90);
    const b = 5 + (seed % 80);
    if (index % 2 === 0) return makeQuestion(`Tính: ${a} + ${b} = ?`, [`${a+b}`, `${a+b+10}`, `${a+b-10}`, `${a+b+1}`], `${a+b}`, "Thực hiện phép cộng.");
    else {
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      return makeQuestion(`Tính: ${max} - ${min} = ?`, [`${max-min}`, `${max-min+10}`, `${max-min-10}`, `${max-min+1}`], `${max-min}`, "Thực hiện phép trừ.");
    }
  } else if (lesson >= 4 && lesson <= 12) { // Bảng nhân chia 3,4,6,7,8,9
    const tables = [3, 4, 6, 7, 8, 9];
    const m = tables[seed % tables.length];
    const factor = (seed % 9) + 1;
    if (index % 2 === 0) return makeQuestion(`Tính: ${m} x ${factor} = ?`, [`${m*factor}`, `${m*factor+m}`, `${m*factor-m}`, "0"], `${m*factor}`, `Bảng nhân ${m}.`);
    else return makeQuestion(`Tính: ${factor*m} : ${m} = ?`, [`${factor}`, `${factor+1}`, `${factor-1}`, "0"], `${factor}`, `Bảng chia ${m}.`);
  } else if (lesson >= 13 && lesson <= 16) { // Đơn vị đo độ dài, khối lượng
    const val = 2 + (seed % 8);
    if (index % 3 === 0) return makeQuestion(`Đổi: ${val} m = ... dm?`, [`${val*10}`, `${val*100}`, `${val}`, "10"], `${val*10}`, "1m = 10dm.");
    else if (index % 3 === 1) return makeQuestion(`Đổi: ${val} kg = ... g?`, [`${val*1000}`, `${val*100}`, `${val*10}`, `${val}`], `${val*1000}`, "1kg = 1000g.");
    else return makeQuestion(`Đổi: ${val} cm = ... mm?`, [`${val*10}`, `${val*100}`, `${val}`, "10"], `${val*10}`, "1cm = 10mm.");
  } else if (lesson >= 17 && lesson <= 24) { // Biểu thức, góc, xem đồng hồ
    if (index % 3 === 0) {
       const a = 2 + (seed % 8);
       const b = 2 + ((seed * 3) % 5);
       const c = 5 + (seed % 10);
       const ans = a * b + c;
       return makeQuestion(`Tính giá trị biểu thức: ${a} x ${b} + ${c} = ?`, [`${ans}`, `${a*(b+c)}`, `${ans-2}`, `${ans+5}`], `${ans}`, "Nhân chia trước, cộng trừ sau.");
    } else if (index % 3 === 1) {
       return makeQuestion(`Góc bé hơn góc vuông là góc gì?`, ["Góc nhọn", "Góc tù", "Góc bẹt", "Góc nhọn và góc tù"], "Góc nhọn", "Góc nhọn bé hơn góc vuông.");
    } else {
       const hour = 1 + (seed % 12);
       return makeQuestion(`Kim dài chỉ số 12, kim ngắn chỉ số ${hour} thì là mấy giờ?`, [`${hour} giờ`, `${hour} giờ 12 phút`, `12 giờ ${hour} phút`, "12 giờ"], `${hour} giờ`, "Kim ngắn chỉ giờ, kim dài chỉ phút.");
    }
  } else if (lesson >= 25 && lesson <= 40) { // Nhân chia số có 2, 3 chữ số với 1 chữ số
    if (index % 2 === 0) {
      const a = 11 + (seed % 40); // 2 digits
      const b = 2 + (seed % 5); // 1 digit
      return makeQuestion(`Tính: ${a} x ${b} = ?`, [`${a*b}`, `${a*b+10}`, `${a*b-b}`, `${a*b+b}`], `${a*b}`, "Nhân số có 2 chữ số với số có 1 chữ số.");
    } else {
      const b = 2 + (seed % 5); // 1 digit divisor
      const q = 11 + (seed % 30); // 2 digits quotient
      const a = b * q; 
      return makeQuestion(`Tính: ${a} : ${b} = ?`, [`${q}`, `${q+1}`, `${q-1}`, `${q+10}`], `${q}`, "Chia số có 3 chữ số cho 1 chữ số.");
    }
  } else { // Hình học, chu vi, diện tích
    const a = 3 + (seed % 10);
    const b = 2 + (seed % 5);
    if (index % 2 === 0) return makeQuestion(`Chu vi hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm là:`, [`${(a+b)*2} cm`, `${a+b} cm`, `${a*b} cm`, `${(a+b)*2}`], `${(a+b)*2} cm`, "Chu vi = (dài + rộng) x 2.");
    else return makeQuestion(`Chu vi hình vuông có cạnh ${a} cm là:`, [`${a*4} cm`, `${a*2} cm`, `${a*a} cm`, `${a+4} cm`], `${a*4} cm`, "Chu vi hình vuông = cạnh x 4.");
  }
}

// 70% current lesson, 30% cumulative
function generateDynamicQuestions(bookLessonNumber: number, count: number): Question[] {
  const list: Question[] = [];
  const currentLessonCount = Math.floor(count * 0.7); // 14 for count=20
  const cumulativeCount = count - currentLessonCount; // 6 for count=20

  for (let i = 0; i < currentLessonCount; i++) {
    list.push(getQuestionForLesson(bookLessonNumber, i, bookLessonNumber + i));
  }

  for (let i = 0; i < cumulativeCount; i++) {
    if (bookLessonNumber > 1) {
        // Randomly pick a previous lesson
        const prevLesson = 1 + Math.floor(Math.random() * (bookLessonNumber - 1));
        list.push(getQuestionForLesson(prevLesson, i + currentLessonCount, bookLessonNumber + i * 99));
    } else {
        // If it's the very first lesson, just give more lesson 1 questions
        list.push(getQuestionForLesson(bookLessonNumber, i + currentLessonCount, bookLessonNumber + i * 99));
    }
  }

  // Shuffle the final list so cumulative questions are mixed
  return list.sort(() => 0.5 - Math.random());
}

async function seed() {
  console.log("🚀 Starting Dynamic Grade 3 Math assessments seeding (Cumulative & Textbook Aligned)...");

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
  let { data: subjectNode, error: errSubFetch } = await supabase.from('curriculum_nodes').select('id, path').eq('type', 'subject').eq('path', 'toan_3').maybeSingle();
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
    
    let { data: topicNode } = await supabase.from('curriculum_nodes').select('id, path, title').eq('type', 'unit').eq('path', chapterPath).maybeSingle();
    if (!topicNode) {
        const { data: newTopic, error: topicErr } = await supabase.from('curriculum_nodes').insert({
            type: 'unit',
            title: chapterData.chapter,
            path: chapterPath,
            slug: chapterSlug,
            parent_id: subjectNode!.id,
            source_id: source?.id,
            metadata: { color: 'text-blue-500', icon: 'Calculator' }
        }).select().single();
        if (topicErr) {
            console.error("❌ Error creating topic node:", topicErr);
            process.exit(1);
        }
        topicNode = newTopic;
        console.log(`✅ Created Topic Node: ${topicNode!.title}`);
    } else {
        console.log(`✅ Found Topic Node: ${topicNode!.title}`);
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
            units: [chapterIdx + 1], // VERY IMPORTANT for UI grouping
            status: 'published'
        };

        // Inject unit_id if it works
        colData.unit_id = topicNode!.id;

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
            duration_minutes: 20,
            generation_mode: 'balanced',
            metadata_json: { unit_id: topicNode!.id }
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
