import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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
const supabase = createClient(supabaseUrl, supabaseKey);

type Question = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty?: number;
};

// Vocabulary for Tiếng Việt
const nouns = ['ngôi nhà', 'cái bàn', 'bông hoa', 'quyển sách', 'con mèo', 'cây bút', 'bầu trời', 'đám mây', 'con chim', 'dòng sông'];
const verbs = ['chạy', 'nhảy', 'ca hát', 'đọc', 'viết', 'bơi', 'ngủ', 'ăn', 'uống', 'bay'];
const adjectives = ['đẹp', 'xấu', 'cao', 'thấp', 'xanh', 'đỏ', 'tươi tắn', 'nhanh', 'chậm', 'lấp lánh'];

function getRandomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

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

function generateDynamicQuestions(lessonNum: number, count: number): Question[] {
    const list: Question[] = [];
    for (let i = 0; i < count; i++) {
        const seed = lessonNum * 100 + i;
        const type = seed % 4;

        if (type === 0) {
            // Điền âm c/k
            const word = i % 2 === 0 ? '...á' : '...iến';
            const answer = i % 2 === 0 ? 'c' : 'k';
            const wrong = i % 2 === 0 ? 'k' : 'c';
            list.push(makeQuestion(
                `Điền âm thích hợp vào chỗ trống: ${word}`,
                [answer, wrong, 'q', 'ch'],
                answer,
                `Quy tắc chính tả c/k: k đi với i, e, ê, còn c đi với các âm còn lại.`
            ));
        } else if (type === 1) {
            // Tìm từ chỉ đặc điểm
            const adj = getRandomItem(adjectives);
            const noun = getRandomItem(nouns);
            const verb = getRandomItem(verbs);
            list.push(makeQuestion(
                `Trong các từ sau, từ nào là từ chỉ đặc điểm?`,
                [adj, noun, verb, 'cái'],
                adj,
                `Từ chỉ đặc điểm miêu tả màu sắc, hình dáng, tính chất của sự vật.`
            ));
        } else if (type === 2) {
            // Câu hỏi về dấu câu
            list.push(makeQuestion(
                `Câu "Em đang làm gì thế" thiếu dấu câu nào ở cuối?`,
                ['?', '.', '!', ','],
                '?',
                `Đây là câu hỏi nên cuối câu phải có dấu chấm hỏi.`
            ));
        } else {
            // Tìm từ chỉ hoạt động
            const noun = getRandomItem(nouns);
            const verb = getRandomItem(verbs);
            const adj = getRandomItem(adjectives);
            list.push(makeQuestion(
                `Từ nào dưới đây là từ chỉ hoạt động?`,
                [verb, noun, adj, 'bởi vì'],
                verb,
                `Từ chỉ hoạt động là từ chỉ sự vận động của người hoặc vật.`
            ));
        }
    }
    return list;
}

const structure = [
    {
        title: "Chủ điểm 1: Những trải nghiệm thú vị",
        lessons: 8
    },
    {
        title: "Chủ điểm 2: Cổng trường rộng mở",
        lessons: 8
    },
    {
        title: "Chủ điểm 3: Mái nhà yêu thương",
        lessons: 8
    },
    {
        title: "Chủ điểm 4: Cộng đồng gắn bó",
        lessons: 8
    }
];

async function seed() {
    console.log("🚀 Starting Dynamic Grade 3 Tiếng Việt assessments seeding...");

    // 1. Universal Subject
    let { data: subject, error: subErr } = await supabase.from('universal_subjects').select('id').eq('slug', 'tieng_viet').single();
    if (subErr && subErr.code === 'PGRST116') {
        const { data: newSub } = await supabase.from('universal_subjects').insert({
            slug: 'tieng_viet',
            name: 'Tiếng Việt',
            grade_level: 3,
            description: 'Môn Tiếng Việt'
        }).select().single();
        subject = newSub;
        console.log("✅ Created universal_subject: tieng_viet");
    }

    // 2. Content Source
    let { data: source, error: sourceErr } = await supabase.from('content_sources').select('id').eq('slug', 'minhkhoi/tieng_viet_3').single();
    if (sourceErr && sourceErr.code === 'PGRST116') {
        const { data: newSource } = await supabase.from('content_sources').insert({
            slug: 'minhkhoi/tieng_viet_3',
            name: 'Nguồn Tiếng Việt 3',
            provider: 'minhkhoi',
            subject_id: subject?.id
        }).select().single();
        source = newSource;
        console.log("✅ Created content_source: minhkhoi/tieng_viet_3");
    }

    // 3. Subject Node
    let { data: subjectNode, error: errSubFetch } = await supabase.from('curriculum_nodes').select('id, path').eq('type', 'subject').eq('path', 'tieng_viet_3').single();
    if (!subjectNode) {
        const { data: newSubNode, error: errSub } = await supabase.from('curriculum_nodes').insert({
            type: 'subject',
            title: 'Tiếng Việt 3',
            path: 'tieng_viet_3',
            slug: 'tieng_viet',
            source_id: source?.id
        }).select().single();
        if (errSub) throw errSub;
        subjectNode = newSubNode;
        console.log("✅ Created Subject Node: Tiếng Việt 3");
    } else {
        console.log("✅ Subject Node: Tiếng Việt 3 already exists");
    }

    let examsCreated = 0;
    let questionsCreated = 0;
    let currentLesson = 1;

    for (let chapterIdx = 0; chapterIdx < structure.length; chapterIdx++) {
        const chapterData = structure[chapterIdx];
        
        console.log(`\n=====================================`);
        console.log(`Processing Topic: ${chapterData.title}`);

        const chapterSlug = `chu_diem_${chapterIdx + 1}`;
        const chapterPath = `tieng_viet_3.${chapterSlug}`;
        
        let { data: topicNode } = await supabase.from('curriculum_nodes').select('id, path, title').eq('type', 'unit').eq('path', chapterPath).single();
        if (!topicNode) {
            const { data: newTopic, error: topicErr } = await supabase.from('curriculum_nodes').insert({
                type: 'unit',
                title: chapterData.title,
                path: chapterPath,
                slug: chapterSlug,
                parent_id: subjectNode.id,
                source_id: source?.id
            }).select().single();
            if (topicErr) throw topicErr;
            topicNode = newTopic;
            console.log(`✅ Created Topic Node: ${topicNode.title}`);
        } else {
            console.log(`✅ Found Topic Node: ${topicNode.title}`);
        }

        for (let l = 1; l <= chapterData.lessons; l++) {
            const lessonNum = currentLesson++;
            console.log(`  -> Lesson: Bài ${lessonNum}`);

            const conceptSlug = `concept-tv3-bai_${lessonNum}`;
            let { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).maybeSingle();
            if (!concept) {
                const res = await supabase.from('concepts').insert({
                    source_id: source?.id,
                    slug: conceptSlug,
                    title: `Kiến thức Bài ${lessonNum}`,
                    description: `Kiến thức trọng tâm bài ${lessonNum}`
                }).select().single();
                concept = res.data;
            }

            for (let i = 1; i <= 3; i++) { // Generate 3 exams per lesson
                const title = `Tiếng Việt 3 - Tập 1 - Bài ${lessonNum} - Đề ${i}`;
                
                let colData: any = {
                    title,
                    subject_slug: 'tieng_viet',
                    grade: 3,
                    volume: 1,
                    status: 'published',
                    unit_id: topicNode.id
                };

                let { data: newCol, error: colError } = await supabase.from('assessment_collections').insert(colData).select().single();
                
                if (colError && colError.message.includes('unit_id')) {
                    delete colData.unit_id;
                    const res2 = await supabase.from('assessment_collections').insert(colData).select().single();
                    newCol = res2.data;
                    colError = res2.error;
                }

                if (colError || !newCol) {
                    console.error("❌ Error inserting assessment_collections:", colError);
                    continue;
                }

                const { data: exam, error: examErr } = await supabase.from('exams').insert({
                    collection_id: newCol.id, 
                    title, 
                    exam_number: i, 
                    total_questions: 15, 
                    generation_mode: 'balanced',
                    metadata_json: { unit_id: topicNode.id }
                }).select().single();

                if (examErr || !exam) continue;

                examsCreated++;
                const questions = generateDynamicQuestions(lessonNum, 15);
                
                for (let qIdx = 0; qIdx < questions.length; qIdx++) {
                    const q = questions[qIdx];
                    const { data: newQ, error: qErr } = await supabase.from('question_bank').insert({
                        concept_id: concept?.id,
                        type: 'multiple_choice', 
                        difficulty: q.difficulty || 1.0,
                        metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
                        source: 'handcrafted', 
                        status: 'approved', 
                        grade: 3, 
                        subject_slug: 'tieng_viet'
                    }).select().single();

                    if (newQ) {
                        await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIdx });
                        questionsCreated++;
                    }
                }
            }
            console.log(`     ✅ Created 3 exams (45 questions total).`);
        }
    }

    console.log(`\n🎉 Tiếng Việt 3 Dynamic Seeding Completed!`);
    console.log(`📊 Total Exams Created: ${examsCreated}`);
    console.log(`📊 Total Questions Created: ${questionsCreated}`);
}

seed().catch(err => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
