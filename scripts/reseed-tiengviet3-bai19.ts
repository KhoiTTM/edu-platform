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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

const driveFileId = "1kBGEw5OkC2HupTOQo04cVzfRsaeRbov_";

const grammarTutorialBai19 = `### Bài 19: Khi cả nhà bé tí (Trang 90 - 91)

#### 1. Bài đọc
**KHI CẢ NHÀ BÉ TÍ**

Khi bà còn bé tí
Bà có nghịch lắm không
Dáng đi có hơi còng
Chăm quét nhà dọn dẹp?

Khi ông còn bé tí
Có nghiêm như bây giờ,
Có chau mặt chơi cờ
Có uống trà buổi sáng?

Khi bố còn bé tí
Có thích lái ô tô
Có say mê sửa đồ
Có hay xem bóng đá?

Khi mẹ còn bé tí
Có mải ngồi cắm hoa
Thích ra chợ gần nhà
Tối khuya ôm cuốn sách?

Khi con còn bé tí
Chẳng đọc sách, chơi cờ
Chẳng dọn dẹp, chữa đồ
Cả ngày con đùa nghịch.

*(Huỳnh Mai Liên)*

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Bạn nhỏ đã hỏi về những ai?** Bà, ông, bố, mẹ.
2. **Bạn nhỏ thắc mắc điều gì?** Mọi người như thế nào khi còn bé (đáp án b).
3. **Hình ảnh của mỗi người trong gia đình hiện ra như thế nào trong suy nghĩ của bạn nhỏ?** Bà: dáng đi hơi còng, chăm quét nhà dọn dẹp. Ông: nghiêm nghị, chau mặt chơi cờ, uống trà buổi sáng. Bố: thích lái ô tô, say mê sửa đồ, hay xem bóng đá. Mẹ: mải cắm hoa, thích ra chợ, tối khuya ôm cuốn sách.
4. **Hình ảnh em thích nhất:** học sinh tự do chia sẻ.`;

const questionsLesson19 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Bạn nhỏ đã hỏi về những ai trong bài thơ?",
      options: ["A. Bà, ông, bố, mẹ", "B. Chỉ hỏi về bà", "C. Anh chị em trong nhà", "D. Thầy cô giáo"],
      correct_index: 0,
      explanation: "Bài thơ có 4 khổ hỏi lần lượt về bà, ông, bố, mẹ khi còn bé."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Bạn nhỏ thắc mắc điều gì trong bài thơ?",
      options: ["A. Bạn ấy thế nào khi còn bé?", "B. Mọi người như thế nào khi còn bé?", "C. Mọi người khi còn bé có giống bạn ấy không?"],
      correct_index: 1,
      explanation: "Cả 4 khổ thơ đầu đều hỏi 'Khi... còn bé tí' về bà, ông, bố, mẹ."
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các hình ảnh sau vào đúng người trong gia đình:",
      groups: [
        { name: "Bà", items: ["dáng đi hơi còng", "chăm quét nhà dọn dẹp"] },
        { name: "Ông", items: ["chau mặt chơi cờ", "uống trà buổi sáng"] },
        { name: "Bố", items: ["thích lái ô tô", "say mê sửa đồ", "hay xem bóng đá"] },
        { name: "Mẹ", items: ["mải cắm hoa", "thích ra chợ", "ôm cuốn sách tối khuya"] }
      ],
      explanation: "Mỗi khổ thơ tưởng tượng hình ảnh riêng của bà, ông, bố, mẹ khi còn bé."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Theo bài thơ, con (bạn nhỏ) khi còn bé tí thì thế nào?",
      options: [
        "A. Chăm đọc sách, chơi cờ",
        "B. Chẳng đọc sách, chơi cờ, chẳng dọn dẹp, chữa đồ — cả ngày đùa nghịch",
        "C. Chăm dọn dẹp nhà cửa",
        "D. Thích sửa đồ như bố"
      ],
      correct_index: 1,
      explanation: "'Khi con còn bé tí / Chẳng đọc sách, chơi cờ / Chẳng dọn dẹp, chữa đồ / Cả ngày con đùa nghịch.'"
    }
  },
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối người thân với sở thích được nhắc đến trong bài thơ:",
      pairs: [
        { left: "Ông", right: "chơi cờ" },
        { left: "Bố", right: "xem bóng đá" },
        { left: "Mẹ", right: "cắm hoa" }
      ],
      explanation: "Mỗi khổ thơ gắn với một sở thích đặc trưng của từng người trong gia đình."
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 19 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node19 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-19').single();
  if (!node19) { console.error("❌ Không tìm thấy node bai-19!"); return; }

  const { data: concept19 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_19',
    title: "Kiến thức Khi cả nhà bé tí"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 90, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai19, concept_id: concept19?.id }
  }).eq('id', node19.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 19");

  if (concept19) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept19.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Khi cả nhà bé tí%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 19";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node19.title}`, type: 'practice', metadata: { node_id: node19.id, concept_id: concept19?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node19.title}`, total_questions: questionsLesson19.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson19.length; i++) {
    const q = questionsLesson19[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept19?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson19.length} câu hỏi mới cho Bài 19`);
  console.log("\n🎉 Seed Bài 19 hoàn tất!");
}

main().catch(console.error);
