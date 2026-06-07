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

// --- THEMES & DICTIONARY ---
const themes: Record<number, { vocab: string[], grammar: string, qWords: string[], phonics: string[] }> = {
  1: { vocab: ["hello", "hi", "goodbye", "bye", "fine", "thanks", "thank you"], grammar: "I am... / How are you?", qWords: ["hello", "goodbye", "fine", "thanks"], phonics: ["/h/", "/b/", "hello", "bye"] },
  2: { vocab: ["what", "is", "your", "name", "spell", "how"], grammar: "What's your name? / How do you spell?", qWords: ["name", "spell", "what", "how"], phonics: ["/p/", "/t/", "peter", "tony"] },
  3: { vocab: ["friend", "nice", "new", "they"], grammar: "This is my friend... / Are they your friends?", qWords: ["friend", "meet", "they", "nice"], phonics: ["/f/", "/n/", "friend", "nice"] },
  4: { vocab: ["eye", "ear", "nose", "mouth", "face", "hand", "head", "hair"], grammar: "Touch your... / Open your... / Close your...", qWords: ["touch", "open", "close", "mouth", "nose", "face"], phonics: ["/e/", "/o/", "elbow", "open"] },
  5: { vocab: ["running", "swimming", "singing", "dancing", "painting", "drawing", "reading"], grammar: "I like... / My hobby is...", qWords: ["hobby", "like", "singing", "dancing", "drawing"], phonics: ["/i/", "/u/", "singing", "running"] },
  6: { vocab: ["school", "classroom", "library", "gym", "computer room", "playground"], grammar: "This/That is our... / Is that our...?", qWords: ["school", "gym", "library", "playground", "classroom"], phonics: ["/c/", "/g/", "computer", "gym"] },
  7: { vocab: ["stand", "sit", "open", "close", "speak", "listen", "look", "come", "go"], grammar: "May I...? / Yes, you can / No, you can't", qWords: ["come", "go", "sit", "stand", "permission", "can"], phonics: ["/s/", "/d/", "sit", "down"] },
  8: { vocab: ["pen", "pencil", "ruler", "rubber", "notebook", "book", "school bag"], grammar: "I have a... / These/Those are my...", qWords: ["pen", "ruler", "rubber", "pencil", "school bag"], phonics: ["/r/", "/p/", "ruler", "pencil"] },
  9: { vocab: ["red", "blue", "green", "yellow", "black", "white", "orange", "brown"], grammar: "What colour is it? / What colour are they?", qWords: ["colour", "red", "blue", "yellow", "green"], phonics: ["/b/", "/bl/", "brown", "black"] },
  10: { vocab: ["football", "chess", "table tennis", "badminton", "basketball", "hide-and-seek"], grammar: "I play... / Do you like...? / Yes, I do / No, I don't", qWords: ["break time", "play", "football", "chess", "badminton"], phonics: ["/ch/", "/f/", "chess", "football"] }
};

function getVietnameseTranslation(word: string): string {
  const dict: Record<string, string> = {
    hello: "xin chào", hi: "chào", goodbye: "tạm biệt", bye: "chào tạm biệt", fine: "khỏe / tốt", thanks: "cảm ơn", "thank you": "cảm ơn bạn",
    what: "cái gì", is: "là", your: "của bạn", name: "tên", spell: "đánh vần", how: "như thế nào",
    friend: "bạn bè / người bạn", nice: "vui / đẹp", new: "mới", they: "họ / chúng nó",
    eye: "con mắt", ear: "cái tai", nose: "cái mũi", mouth: "cái miệng", face: "khuôn mặt", hand: "bàn tay", head: "cái đầu", hair: "mái tóc",
    running: "chạy bộ", swimming: "bơi lội", singing: "ca hát", dancing: "nhảy múa", painting: "tô màu/vẽ tranh", drawing: "vẽ", reading: "đọc sách",
    school: "trường học", classroom: "lớp học", library: "thư viện", gym: "phòng thể dục", "computer room": "phòng máy tính", playground: "sân chơi",
    stand: "đứng", sit: "ngồi", open: "mở", close: "đóng", speak: "nói", listen: "nghe", look: "nhìn", come: "vào/đến", go: "đi",
    pen: "bút mực", pencil: "bút chì", ruler: "cây thước", rubber: "cục tẩy", notebook: "vở ghi bài", book: "sách", "school bag": "cặp sách",
    red: "màu đỏ", blue: "màu xanh dương", green: "màu xanh lá", yellow: "màu vàng", black: "màu đen", white: "màu trắng", orange: "màu cam", brown: "màu nâu",
    football: "đá bóng", chess: "cờ vua", "table tennis": "bóng bàn", badminton: "cầu lông", basketball: "bóng rổ", "hide-and-seek": "trốn tìm"
  };
  return dict[word] ?? word;
}

function getDistractorWord(unit: number, index: number): string {
  const distractors: Record<number, string[]> = {
    1: ["name", "teacher", "red", "pen"],
    2: ["fine", "book", "blue", "football"],
    3: ["teacher", "classroom", "school", "pencil"],
    4: ["red", "blue", "chess", "running"],
    5: ["book", "library", "mouth", "hello"],
    6: ["singing", "ruler", "nose", "thanks"],
    7: ["green", "bag", "friend", "hobby"],
    8: ["gym", "dancing", "ear", "bye"],
    9: ["stand", "badminton", "face", "school"],
    10: ["rubber", "classroom", "head", "name"]
  };
  return distractors[unit]?.[index % 4] ?? "hello";
}

function shuffleOptions(options: string[], correct: string): string[] {
  const unique = Array.from(new Set(options));
  if (!unique.includes(correct)) unique[0] = correct;
  return unique.sort(() => 0.5 - Math.random());
}

function getGrammarQuestion(unit: number, index: number): { questionText: string, options: string[], correctText: string, explanation: string } {
  if (unit === 1) {
      if (index % 3 === 0) return { questionText: "Hi, I ______ Mai.", options: ["am", "is", "are", "be"], correctText: "am", explanation: "I am." };
      else if (index % 3 === 1) return { questionText: "How ______ you?", options: ["are", "am", "is", "do"], correctText: "are", explanation: "How are you?" };
      else return { questionText: "I am fine, ______.", options: ["thanks", "hello", "hi", "name"], correctText: "thanks", explanation: "I am fine, thanks." };
  } else if (unit === 2) {
      if (index % 3 === 0) return { questionText: "What ______ your name?", options: ["is", "am", "are", "be"], correctText: "is", explanation: "What is your name?" };
      else if (index % 3 === 1) return { questionText: "How do you ______ your name?", options: ["spell", "read", "speak", "say"], correctText: "spell", explanation: "How do you spell your name?" };
      else return { questionText: "My name ______ Nam.", options: ["is", "am", "are", "be"], correctText: "is", explanation: "My name is Nam." };
  } else if (unit === 3) {
    if (index % 3 === 0) return { questionText: "This is my friend, Mary. - Hello, Mary. Nice to ______ you.", options: ["see", "meet", "say", "how"], correctText: "meet", explanation: "Nice to meet you." };
    else if (index % 3 === 1) return { questionText: "______ they your friends? - Yes, they are.", options: ["Is", "Am", "Are", "Be"], correctText: "Are", explanation: "Are they..." };
    else return { questionText: "Is he your friend? - No, he ______.", options: ["is", "isn't", "aren't", "not"], correctText: "isn't", explanation: "No, he isn't." };
  } else if (unit === 4) {
    if (index % 3 === 0) return { questionText: "Touch ______ face, please.", options: ["you", "your", "me", "my"], correctText: "your", explanation: "Touch your..." };
    else if (index % 3 === 1) return { questionText: "______ your eyes.", options: ["Open", "Close", "Touch", "Both Open and Close"], correctText: "Both Open and Close", explanation: "Open or Close your eyes." };
    else return { questionText: "What do you do when the teacher says: 'Close your mouth'?", options: ["Mở miệng ra", "Nhắm mắt lại", "Ngậm miệng lại", "Vẫy tay chào"], correctText: "Ngậm miệng lại", explanation: "Close your mouth = ngậm miệng." };
  } else if (unit === 5) {
    if (index % 3 === 0) return { questionText: "What is ______ hobby? - I like swimming.", options: ["you", "your", "my", "I"], correctText: "your", explanation: "What is your hobby?" };
    else if (index % 3 === 1) return { questionText: "My hobby is ______.", options: ["run", "running", "runs", "ran"], correctText: "running", explanation: "My hobby is + V-ing." };
    else return { questionText: "I ______ dancing.", options: ["like", "likes", "am like", "hobby"], correctText: "like", explanation: "I like + V-ing." };
  } else if (unit === 6) {
    if (index % 3 === 0) return { questionText: "______ is our classroom. (Vật ở gần)", options: ["This", "That", "These", "Those"], correctText: "This", explanation: "This = ở gần." };
    else if (index % 3 === 1) return { questionText: "______ is our gym. (Vật ở xa)", options: ["This", "That", "These", "Those"], correctText: "That", explanation: "That = ở xa." };
    else return { questionText: "Is that our school? - Yes, it ______.", options: ["is", "am", "are", "isn't"], correctText: "is", explanation: "Yes, it is." };
  } else if (unit === 7) {
    if (index % 3 === 0) return { questionText: "______ I come in, teacher?", options: ["May", "Can", "Do", "Are"], correctText: "May", explanation: "May I..." };
    else if (index % 3 === 1) return { questionText: "May I go out? - Yes, you ______.", options: ["can", "may", "do", "are"], correctText: "can", explanation: "Yes, you can." };
    else return { questionText: "May I speak? - No, you ______.", options: ["can", "can't", "don't", "aren't"], correctText: "can't", explanation: "No, you can't." };
  } else if (unit === 8) {
    if (index % 3 === 0) return { questionText: "I ______ a ruler and a pen.", options: ["has", "have", "am", "is"], correctText: "have", explanation: "I have..." };
    else if (index % 3 === 1) return { questionText: "______ are my books. (Vật số nhiều ở gần)", options: ["This", "That", "These", "Those"], correctText: "These", explanation: "These = nhiều vật ở gần." };
    else return { questionText: "______ are my pencils. (Vật số nhiều ở xa)", options: ["This", "That", "These", "Those"], correctText: "Those", explanation: "Those = nhiều vật ở xa." };
  } else if (unit === 9) {
    if (index % 3 === 0) return { questionText: "What colour ______ it? - It is red.", options: ["is", "are", "am", "be"], correctText: "is", explanation: "What colour is it?" };
    else if (index % 3 === 1) return { questionText: "What colour ______ they? - They are blue.", options: ["is", "are", "am", "be"], correctText: "are", explanation: "What colour are they?" };
    else return { questionText: "The pencil case is ______.", options: ["green", "pen", "ruler", "book"], correctText: "green", explanation: "green là màu sắc." };
  } else {
    if (index % 3 === 0) return { questionText: "What do you do at break time? - I ______ football.", options: ["play", "plays", "playing", "played"], correctText: "play", explanation: "I play..." };
    else if (index % 3 === 1) return { questionText: "Do you like playing chess? - Yes, I ______.", options: ["do", "like", "am", "don't"], correctText: "do", explanation: "Yes, I do." };
    else return { questionText: "Do you like playing badminton? - No, I ______.", options: ["do", "don't", "not", "am not"], correctText: "don't", explanation: "No, I don't." };
  }
}

function getPhonicsQuestion(unit: number, index: number): { questionText: string, options: string[], correctText: string, explanation: string } {
  const p = themes[unit]?.phonics || ["/x/", "/y/", "hello", "hi"];
  if (index % 3 === 0) {
    return {
      questionText: `Which letter makes the sound ${p[0]} in '${p[2]}'?`,
      options: [`Letter ${p[2].charAt(0).toUpperCase()}`, `Letter ${p[3].charAt(0).toUpperCase()}`, "Letter X", "Letter Z"],
      correctText: `Letter ${p[2].charAt(0).toUpperCase()}`,
      explanation: `Từ ${p[2]} bắt đầu bằng ${p[2].charAt(0).toUpperCase()} phát âm là ${p[0]}.`
    };
  } else if (index % 3 === 1) {
    return {
      questionText: `Which word starts with the sound ${p[1]}?`,
      options: [p[3], p[2], "hello", "bye"],
      correctText: p[3],
      explanation: `Từ ${p[3]} bắt đầu bằng âm ${p[1]}.`
    };
  } else {
    return {
      questionText: `Identify the missing letters: '_${p[2].slice(1)}' starts with sound ${p[0]}.`,
      options: [p[2].charAt(0), p[3].charAt(0), "x", "y"],
      correctText: p[2].charAt(0),
      explanation: `Ghép ${p[2].charAt(0)} vào được từ ${p[2]}.`
    };
  }
}

type Question = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty?: number;
};

function generateQuestion(unit: number, lesson: number, index: number): Question {
  const theme = themes[unit] || themes[1];
  
  if (lesson === 1) {
      const word = theme.vocab[index % theme.vocab.length];
      const capWord = word.charAt(0).toUpperCase() + word.slice(1);
      const opts = shuffleOptions([word, getDistractorWord(unit, index), getDistractorWord(unit, index + 1), getDistractorWord(unit, index + 2)], word);
      return {
        question: `What is the correct English word for '${getVietnameseTranslation(word)}'?`,
        options: opts,
        correct_index: opts.indexOf(word),
        explanation: `${capWord} nghĩa là '${getVietnameseTranslation(word)}' trong tiếng Anh.`,
        difficulty: 1.0
      };
  } else if (lesson === 2) {
      const { questionText, options, correctText, explanation } = getGrammarQuestion(unit, index);
      const shuffled = shuffleOptions(options, correctText);
      return {
        question: questionText,
        options: shuffled,
        correct_index: shuffled.indexOf(correctText),
        explanation,
        difficulty: 1.0
      };
  } else {
      const { questionText, options, correctText, explanation } = getPhonicsQuestion(unit, index);
      const shuffled = shuffleOptions(options, correctText);
      return {
        question: questionText,
        options: shuffled,
        correct_index: shuffled.indexOf(correctText),
        explanation,
        difficulty: 1.0
      };
  }
}

// --- OCR READER ---
const OCR_DIR = path.join(process.cwd(), '..', 'convert_pdf_json', 'TiengAnh3_Tap1_JSON');
function getOcrContentForUnit(unit: number): string {
    const unitDir = path.join(OCR_DIR, `Unit_${unit}`);
    if (!fs.existsSync(unitDir)) return "";
    
    let content = "";
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.json')).sort();
    for (const f of files) {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(unitDir, f), 'utf-8'));
            if (data.content) {
                content += data.content + "\n\n";
            }
        } catch (e) {}
    }
    return content.trim();
}

// --- MAIN SEEDING ---
async function seedEnglish3() {
    console.log("🚀 Starting dynamic seeding for English Grade 3...");
    
    let examsCreated = 0;
    let questionsCreated = 0;

    let {data: source} = await supabase.from('content_sources').select('id').eq('slug', 'tieng-anh-3-global-success').single();

    if (!source) {
      console.error("❌ Content source 'tieng-anh-3-global-success' not found.");
      return;
    }

    const { data: allNodes } = await supabase
      .from('curriculum_nodes')
      .select('id, type, sort_key, parent_id, path, title')
      .eq('source_id', source.id)
      .order('path');
      
    if (!allNodes) {
        console.error("❌ No curriculum nodes found");
        return;
    }

    const units = allNodes.filter(n => n.type === 'unit').sort((a,b) => a.sort_key - b.sort_key);
    
    let absoluteLessonCount = 0;
    
    for (const unitNode of units) {
        const unitNum = unitNode.sort_key;
        if (unitNum > 10) continue; 
        
        console.log(`Processing Unit ${unitNum}...`);
        
        const readingPassage = getOcrContentForUnit(unitNum);
        
        const lessons = allNodes.filter(n => n.parent_id === unitNode.id && n.type === 'lesson').sort((a,b) => a.sort_key - b.sort_key);
        
        for (const lessonNode of lessons) {
            absoluteLessonCount++;
            const lessonNum = lessonNode.sort_key;
            
            // Get or create concept
            const conceptSlug = `concept-tienganh3-unit${unitNum}-lesson${lessonNum}`;
            let { data: concept } = await supabase.from('concepts').select('id').eq('slug', conceptSlug).maybeSingle();
            if (!concept) {
                const res = await supabase.from('concepts').insert({
                    source_id: source.id,
                    slug: conceptSlug,
                    title: `Kiến thức Unit ${unitNum} Lesson ${lessonNum}`,
                    description: `Kiến thức trọng tâm Unit ${unitNum} Lesson ${lessonNum}`
                }).select().single();
                concept = res.data;
            }
            if (!concept) continue;

            for (let examIdx = 0; examIdx < 4; examIdx++) {
                const title = `Tiếng Anh 3 - Unit ${unitNum} - Lesson ${lessonNum} - Đề ${examIdx + 1}`;
                
                let colData: any = {
                    title,
                    subject_slug: 'tieng_anh',
                    grade: 3,
                    volume: 1,
                    units: [unitNum],
                    status: 'published'
                };
                
                // assessment_collections has unit_id but sometimes schema cache issues. So fallback like math3
                colData.unit_id = unitNode.id;
                let newCol = null;
                const res1 = await supabase.from('assessment_collections').insert(colData).select().single();
                if (res1.error && res1.error.message.includes('unit_id')) {
                   delete colData.unit_id;
                   const res2 = await supabase.from('assessment_collections').insert(colData).select().single();
                   newCol = res2.data;
                } else {
                   newCol = res1.data;
                }

                if (!newCol) {
                    console.error("❌ Error creating collection for", title);
                    continue;
                }

                const { data: exam, error: examErr } = await supabase.from('exams').insert({
                    collection_id: newCol.id, 
                    title, 
                    exam_number: examIdx + 1, 
                    total_questions: 20, 
                    duration_minutes: 20,
                    generation_mode: 'balanced',
                    metadata_json: { unit_id: unitNode.id }
                }).select().single();

                if (examErr || !exam) {
                    console.error("❌ Error creating exam:", examErr);
                    continue;
                }

                examsCreated++;

                let currentCount = 14;
                let cumulativeCount = 6;
                if (absoluteLessonCount <= 2) {
                    currentCount = 20;
                    cumulativeCount = 0;
                }
                
                let qIndex = 0;
                
                const processQuestion = async (qData: Question, p_readingPassage: string) => {
                    const { data: newQ, error: qErr } = await supabase.from('question_bank').insert({
                        concept_id: concept.id,
                        type: 'multiple_choice', 
                        difficulty: qData.difficulty || 1.0,
                        metadata_json: { 
                            question: qData.question, 
                            options: qData.options, 
                            correct_index: qData.correct_index, 
                            explanation: qData.explanation,
                            reading_passage: p_readingPassage 
                        },
                        source: 'handcrafted', 
                        status: 'approved', 
                        grade: 3, 
                        subject_slug: 'tieng_anh'
                    }).select().single();

                    if (newQ) {
                        await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIndex });
                        questionsCreated++;
                        qIndex++;
                    }
                };

                // 1. Current
                for (let i = 0; i < currentCount; i++) {
                    const qData = generateQuestion(unitNum, lessonNum, examIdx * 20 + i);
                    await processQuestion(qData, readingPassage);
                }
                
                // 2. Cumulative
                for (let i = 0; i < cumulativeCount; i++) {
                    const randomLessonAbsolute = Math.floor(Math.random() * (absoluteLessonCount - 1)) + 1;
                    const prevUnit = Math.floor((randomLessonAbsolute - 1) / 3) + 1;
                    const prevLesson = ((randomLessonAbsolute - 1) % 3) + 1;
                    const qData = generateQuestion(prevUnit, prevLesson, examIdx * 100 + i);
                    await processQuestion(qData, getOcrContentForUnit(prevUnit));
                }
            }
        }
        console.log(`     ✅ Unit ${unitNum} generated exams`);
    }
    
    console.log(`\n🎉 English Grade 3 Dynamic Seeding Completed Successfully!`);
    console.log(`📊 Total Exams Created: ${examsCreated}`);
    console.log(`📊 Total Questions Created: ${questionsCreated}`);
}

seedEnglish3().catch(console.error);
