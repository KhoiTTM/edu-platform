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

const grammarTutorialBai7 = `### Bài 7: Mùa hè lấp lánh (Trang 34 - 35)

#### 1. Bài đọc
**MÙA HÈ LẤP LÁNH**

Sớm nay em thức dậy
Trời sáng tự bao giờ
Mùa hè kì lạ chưa
Mặt trời ưa dậy sớm.

Nắng cho cây chóng lớn
Cho hoa lá thêm màu
Cho mình chơi thật lâu
Ngày hè dài bất tận.

Buổi chiều trôi thật chậm
Mặt trời mải rong chơi
Đủng đỉnh mãi chân trời
Mà vẫn chưa lặn xuống.

Mùa hè thật sung sướng
Có nắng lại có kem
Có những cơn gió êm
Và ngày dài lấp lánh.

*(Nguyễn Quỳnh Mai)*

**Từ ngữ:** Bất tận: như thể không có kết thúc. Đủng đỉnh: thong thả, chậm rãi, không vội vã.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Mặt trời mùa hè có gì lạ?** Mặt trời dậy sớm hơn bình thường.
2. **Nắng mùa hè mang đến ích lợi gì?** Đối với cây: chóng lớn. Đối với hoa lá: thêm màu. Đối với các bạn nhỏ: được chơi thật lâu.
3. **Ngày của mùa hè có gì đặc biệt?** Buổi chiều trôi thật chậm, mặt trời mải rong chơi, đủng đỉnh mãi chân trời mà vẫn chưa lặn xuống.
4. **Vì sao bạn nhỏ thấy "mùa hè thật sung sướng"?** Vì mùa hè có nắng, có kem, có những cơn gió êm và ngày dài lấp lánh.
5. **Hình ảnh "ngày dài lấp lánh" chỉ điều gì?** Chỉ ngày có nhiều niềm vui (đáp án b).`;

const questionsLesson7 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Mặt trời mùa hè có gì lạ so với bình thường?",
      options: ["A. Mặt trời dậy muộn hơn", "B. Mặt trời dậy sớm hơn", "C. Mặt trời không xuất hiện", "D. Mặt trời đổi màu"],
      correct_index: 1,
      explanation: "'Trời sáng tự bao giờ / Mùa hè kì lạ chưa / Mặt trời ưa dậy sớm.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp lợi ích của nắng mùa hè vào đúng đối tượng:",
      groups: [
        { name: "Đối với cây", items: ["chóng lớn"] },
        { name: "Đối với hoa lá", items: ["thêm màu"] },
        { name: "Đối với bạn nhỏ", items: ["chơi thật lâu"] }
      ],
      explanation: "'Nắng cho cây chóng lớn / Cho hoa lá thêm màu / Cho mình chơi thật lâu.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Ngày của mùa hè có gì đặc biệt?",
      options: [
        "A. Ngày rất ngắn",
        "B. Buổi chiều trôi thật chậm, mặt trời mãi chưa lặn",
        "C. Trời luôn mưa vào buổi chiều",
        "D. Không có gì đặc biệt"
      ],
      correct_index: 1,
      explanation: "'Buổi chiều trôi thật chậm / Mặt trời mải rong chơi / Đủng đỉnh mãi chân trời / Mà vẫn chưa lặn xuống.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao bạn nhỏ thấy \"mùa hè thật sung sướng\"?",
      options: [
        "A. Vì được nghỉ học cả mùa hè",
        "B. Vì có nắng, có kem, có những cơn gió êm và ngày dài lấp lánh",
        "C. Vì được đi du lịch nhiều nơi",
        "D. Vì không phải làm bài tập"
      ],
      correct_index: 1,
      explanation: "'Mùa hè thật sung sướng / Có nắng lại có kem / Có những cơn gió êm / Và ngày dài lấp lánh.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Hình ảnh \"ngày dài lấp lánh\" chỉ điều gì?",
      options: ["A. Ngày có nhiều nắng", "B. Ngày có nhiều niềm vui", "C. Ngày mặt trời dậy sớm và đi ngủ muộn", "D. Ngày rất nóng bức"],
      correct_index: 1,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý (a, b, c); lựa chọn hợp lý nhất là ngày có nhiều niềm vui."
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 7 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node7 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-7').single();
  if (!node7) { console.error("❌ Không tìm thấy node bai-7!"); return; }

  const { data: concept7 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_7',
    title: "Kiến thức Mùa hè lấp lánh"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 34, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai7, concept_id: concept7?.id }
  }).eq('id', node7.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 7");

  if (concept7) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept7.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Mùa hè lấp lánh%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 7";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node7.title}`, type: 'practice', metadata: { node_id: node7.id, concept_id: concept7?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node7.title}`, total_questions: questionsLesson7.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson7.length; i++) {
    const q = questionsLesson7[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept7?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson7.length} câu hỏi mới cho Bài 7`);
  console.log("\n🎉 Seed Bài 7 hoàn tất!");
}

main().catch(console.error);
