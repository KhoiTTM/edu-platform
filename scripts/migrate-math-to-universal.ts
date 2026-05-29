import { createClient } from '@supabase/supabase-js';
import { TOAN3_TAP1_BOOK_LESSONS } from '../lib/curriculum/toan3-tap1';

// Migration script for Math Grade 3
// Usage: npx tsx scripts/migrate-math-to-universal.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Procedural Math Question Generator
function generateMathQuestions(bookLessonNumber: number, title: string, count: number) {
  const questions = [];
  const lowercaseTitle = title.toLowerCase();

  for (let i = 0; i < count; i++) {
    const seed = bookLessonNumber * 37 + i * 29;
    
    if (lowercaseTitle.includes("cộng") || lowercaseTitle.includes("trừ") || bookLessonNumber <= 3) {
      // Addition & Subtraction (under 1000)
      const num1 = 100 + (seed % 400);
      const num2 = 50 + ((seed * 3) % 300);
      const isAdd = seed % 2 === 0;
      
      if (isAdd) {
        questions.push({
          question: `Tính nhẩm: ${num1} + ${num2} = ?`,
          options: [`${num1 + num2}`, `${num1 + num2 - 10}`, `${num1 + num2 + 10}`, `${num1 + num2 - 100}`],
          correct_index: 0,
          explanation: `Thực hiện cộng từ phải qua trái: hàng đơn vị, hàng chục rồi hàng trăm. Kết quả là ${num1 + num2}.`
        });
      } else {
        const larger = num1 + num2;
        questions.push({
          question: `Tìm hiệu của: ${larger} - ${num1} = ?`,
          options: [`${num2 - 10}`, `${num2 + 10}`, `${num2}`, `${num2 - 100}`],
          correct_index: 2,
          explanation: `Trừ hàng đơn vị, chục và trăm: ${larger} - ${num1} = ${num2}.`
        });
      }
    } else if (lowercaseTitle.includes("nhân") || lowercaseTitle.includes("chia") || lowercaseTitle.includes("bảng")) {
      // Multiplication & Division (Tables 2-9)
      const table = 2 + (seed % 8); // table 2 to 9
      const factor = 2 + ((seed * 7) % 8); // factor 2 to 9
      const product = table * factor;
      const isMul = seed % 2 === 0;

      if (isMul) {
        questions.push({
          question: `Tính nhẩm: ${table} x ${factor} = ?`,
          options: [`${product - table}`, `${product}`, `${product + table}`, `${product - 1}`],
          correct_index: 1,
          explanation: `Nhẩm theo bảng nhân ${table}: ${table} nhân ${factor} bằng ${product}.`
        });
      } else {
        questions.push({
          question: `Tìm kết quả phép chia: ${product} : ${table} = ?`,
          options: [`${factor}`, `${factor - 1}`, `${factor + 1}`, `${table}`],
          correct_index: 0,
          explanation: `Vì ${table} x ${factor} = ${product} nên ${product} : ${table} = ${factor}.`
        });
      }
    } else if (lowercaseTitle.includes("hình học") || lowercaseTitle.includes("hình") || lowercaseTitle.includes("khối")) {
      // Geometry questions
      const side = 5 + (seed % 20);
      const isPerimeter = seed % 2 === 0;
      if (isPerimeter) {
        questions.push({
          question: `Tính chu vi hình vuông có cạnh dài ${side} cm.`,
          options: [`${side * 2} cm`, `${side + 4} cm`, `${side * 4} cm`, `${side * side} cm`],
          correct_index: 2,
          explanation: `Chu vi hình vuông bằng độ dài một cạnh nhân với 4: ${side} x 4 = ${side * 4} cm.`
        });
      } else {
        const width = side;
        const length = side + 4;
        questions.push({
          question: `Tính chu vi hình chữ nhật có chiều dài ${length} cm và chiều rộng ${width} cm.`,
          options: [`${(length + width) * 2} cm`, `${length + width} cm`, `${length * width} cm`, `${length * 2 + width} cm`],
          correct_index: 0,
          explanation: `Chu vi hình chữ nhật bằng (chiều dài + chiều rộng) nhân đôi: (${length} + ${width}) x 2 = ${(length + width) * 2} cm.`
        });
      }
    } else {
      // Measurements (mm, ml, g, units of time/measure)
      const val = 10 + (seed % 90);
      const isLength = seed % 2 === 0;
      if (isLength) {
        questions.push({
          question: `Đổi đơn vị đo: ${val} cm = ... mm?`,
          options: [`${val}`, `${val * 10}`, `${val / 10}`, `${val * 100}`],
          correct_index: 1,
          explanation: `Vì 1 cm = 10 mm nên ${val} cm = ${val * 10} mm.`
        });
      } else {
        questions.push({
          question: `Một túi đường nặng ${val} g, túi muối nặng ${val + 150} g. Hỏi cả hai túi nặng bao nhiêu gam?`,
          options: [`${val * 2 + 150} g`, `${val + 150} g`, `${val * 2} g`, `${val + 200} g`],
          correct_index: 0,
          explanation: `Thực hiện cộng khối lượng của cả hai túi: ${val} + ${val + 150} = ${val * 2 + 150} gam.`
        });
      }
    }
  }
  return questions;
}

async function migrate() {
  console.log("🚀 Starting Math Migration with 3-Part Lesson Structures...");

  const { data: subject } = await supabase
    .from('universal_subjects')
    .upsert({ slug: 'toan', name_vi: 'Toán học', icon: '🔢' }, { onConflict: 'slug' })
    .select().single();

  const { data: source } = await supabase
    .from('content_sources')
    .upsert({ 
        subject_id: subject!.id, 
        slug: 'toan-3-canh-dieu', 
        name: 'Toán 3 - Cánh Diều' 
    }, { onConflict: 'slug' })
    .select().single();

  // Root Node
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .upsert({
        source_id: source!.id,
        type: 'course',
        slug: 'lop-3',
        title: 'Toán lớp 3',
        path: 'toan_3',
        depth: 0
    }, { onConflict: 'source_id,slug' })
    .select().single();

  const topicCache = new Map<string, string>();
  const topicSlugs = new Map<string, string>();
  const topicNodes = new Map<string, any>();
  const unitQuestionsMap = new Map<string, string[]>();

  for (const book of TOAN3_TAP1_BOOK_LESSONS) {
    // 1. Ensure Topic/Unit Node exists
    let unitId = topicCache.get(book.topic_label);
    let topicSlug = topicSlugs.get(book.topic_label);
    if (!unitId) {
        topicSlug = book.topic_label.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
        
        const { data: topicNode } = await supabase
          .from('curriculum_nodes')
          .upsert({
              source_id: source!.id,
              parent_id: rootNode!.id,
              type: 'unit',
              slug: topicSlug,
              title: book.topic_label,
              path: `toan_3.${topicSlug.replace(/-/g, '_')}`,
              depth: 1,
              sort_key: Array.from(topicCache.keys()).length + 1
          }, { onConflict: 'source_id,slug' })
          .select().single();
        
        if (topicNode) {
            unitId = topicNode.id;
            topicCache.set(book.topic_label, unitId as string);
            topicSlugs.set(book.topic_label, topicSlug);
            topicNodes.set(book.topic_label, topicNode);
            unitQuestionsMap.set(unitId as string, []);
        }
    }

    if (!unitId || !topicSlug) continue;

    try {
      // 2. Create Lesson Node
      const lessonSlug = `bai-${book.book_lesson_number}`;
      const { data: lessonNode, error: lessonError } = await supabase
        .from('curriculum_nodes')
        .upsert({
            source_id: source!.id,
            parent_id: unitId,
            type: 'lesson',
            slug: lessonSlug,
            title: `Bài ${book.book_lesson_number}: ${book.title}`,
            path: `toan_3.${topicSlug.replace(/-/g, '_')}.${lessonSlug.replace(/-/g, '_')}`,
            depth: 2,
            sort_key: book.book_lesson_number,
            metadata: {
                page: book.page,
                youtube_id: book.videos && book.videos.length > 0 ? book.videos[0].youtube_id : null,
                videos: book.videos
            }
        }, { onConflict: 'source_id,slug' })
        .select().single();

      if (lessonError) {
        console.error(`Error upserting lesson ${book.book_lesson_number}:`, lessonError);
        continue;
      }

      // 3. SEED PART 2: 15 Practice Questions (Non-scored)
      const practiceQuestions = generateMathQuestions(book.book_lesson_number, book.title, 15);
      const { data: practiceSet, error: prSetError } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Luyện tập tự do: ${book.title}`,
            type: 'practice',
            metadata: { node_id: lessonNode!.id }
        })
        .select().single();

      if (prSetError) {
        console.error(`Error seeding practice set for lesson ${book.book_lesson_number}:`, prSetError);
      } else {
        for (let i = 0; i < practiceQuestions.length; i++) {
          const p = practiceQuestions[i];
          const { data: question } = await supabase
            .from('quiz_questions')
            .insert({
                quiz_id: '00000000-0000-0000-0000-000000000000', // Dummy
                question: p.question,
                options: p.options,
                correct_index: p.correct_index,
                explanation: p.explanation,
                order_index: i
            })
            .select().single();
          
          if (question) {
            await supabase.from('exercise_questions').insert({
                set_id: practiceSet!.id,
                question_id: question!.id,
                sort_key: i
            });
            // Also cache question ID for building final exams
            unitQuestionsMap.get(unitId)?.push(question.id);
          }
        }
      }

      // 4. SEED PART 3: 5 Quiz Questions (Scored)
      // Merge textbook practice questions with procedurally generated ones to make 5 total
      const quizQuestions = [...book.practice];
      if (quizQuestions.length < 5) {
        const needed = 5 - quizQuestions.length;
        const generated = generateMathQuestions(book.book_lesson_number, book.title, needed + 5);
        // Avoid perfect duplicates
        quizQuestions.push(...generated.slice(5, 5 + needed));
      }

      const { data: quizSet, error: qSetError } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Đánh giá tính điểm: ${book.title}`,
            type: 'quiz',
            metadata: { node_id: lessonNode!.id }
        })
        .select().single();

      if (qSetError) {
        console.error(`Error seeding quiz set for lesson ${book.book_lesson_number}:`, qSetError);
      } else {
        for (let i = 0; i < quizQuestions.length; i++) {
          const p = quizQuestions[i];
          const { data: question } = await supabase
            .from('quiz_questions')
            .insert({
                quiz_id: '00000000-0000-0000-0000-000000000000',
                question: p.question,
                options: p.options,
                correct_index: p.correct_index,
                explanation: p.explanation,
                order_index: i
            })
            .select().single();
          
          if (question) {
            await supabase.from('exercise_questions').insert({
                set_id: quizSet!.id,
                question_id: question!.id,
                sort_key: i
            });
          }
        }
      }

      // 5. Create Learning Path Nodes (Phase 7 - Visual Map)
      const isOdd = book.book_lesson_number % 2 === 1;
      const posX = isOdd ? 220 : 380;
      const posY = 100 + (book.book_lesson_number * 160);
      
      await supabase.from('learning_path_nodes').upsert({
          curriculum_node_id: lessonNode!.id,
          node_type: 'lesson',
          position_x: posX,
          position_y: posY,
          visual_theme: 'star',
          reward_config: { xp: 100, energy: 1 }
      }, { onConflict: 'curriculum_node_id' });

      console.log(`Migrated Math Bài ${book.book_lesson_number} (15 Practice, 5 Quiz)`);
    } catch (err) {
      console.error(`Unexpected error in lesson ${book.book_lesson_number}:`, err);
    }
  }

  // Seeding Chapter Exams at the end of each Unit
  console.log("🚀 Seeding Chapter Exams...");
  for (const [unitId, questionsList] of Array.from(unitQuestionsMap.entries())) {
    if (questionsList.length === 0) continue;
    const unitNode = Array.from(topicNodes.values()).find(u => u.id === unitId);
    if (!unitNode) continue;

    const examSlug = `kiem-tra-${unitNode.slug}`;
    const { data: examNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
          source_id: source!.id,
          parent_id: unitId,
          type: 'exam',
          slug: examSlug,
          title: `Kiểm tra cuối chương: ${unitNode.title.split(':')[0]}`,
          path: `${unitNode.path}.kiem_tra`,
          depth: 2,
          sort_key: 999
      }, { onConflict: 'source_id,slug' })
      .select().single();

    if (examNode) {
      const shuffled = [...questionsList].sort(() => 0.5 - Math.random());
      const examQuestions = shuffled.slice(0, Math.min(10, shuffled.length));

      const { data: exSet } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Kiểm tra cuối chương: ${unitNode.title}`,
            type: 'exam',
            metadata: { node_id: examNode.id }
        })
        .select().single();

      if (exSet) {
        for (let i = 0; i < examQuestions.length; i++) {
          await supabase.from('exercise_questions').upsert({
            set_id: exSet.id,
            question_id: examQuestions[i],
            sort_key: i
          }, { onConflict: 'set_id,question_id' });
        }
      }

      // Position the Exam Node right after the last lesson in that unit
      const { data: siblingNodes } = await supabase
        .from('curriculum_nodes')
        .select('id')
        .eq('parent_id', unitId)
        .neq('type', 'exam');
      
      let maxY = 300;
      if (siblingNodes && siblingNodes.length > 0) {
        const siblingIds = siblingNodes.map(s => s.id);
        const { data: lpNodes } = await supabase
          .from('learning_path_nodes')
          .select('position_y')
          .in('curriculum_node_id', siblingIds);
        if (lpNodes && lpNodes.length > 0) {
          maxY = Math.max(...lpNodes.map(l => l.position_y));
        }
      }

      await supabase.from('learning_path_nodes').upsert({
        curriculum_node_id: examNode.id,
        node_type: 'boss',
        position_x: 300,
        position_y: maxY + 180,
        visual_theme: 'nebula',
        reward_config: { xp: 300, energy: 0 }
      }, { onConflict: 'curriculum_node_id' });

      console.log(`Seeded Chapter Exam for unit "${unitNode.title}" with 10 questions.`);
    }
  }

  console.log("✅ Math Seeding Complete!");
}

migrate().catch(console.error);
