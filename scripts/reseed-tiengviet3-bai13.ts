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

const grammarTutorialBai13 = `### Bài 13: Bàn tay cô giáo (Trang 59 - 60)

#### 1. Bài đọc
**BÀN TAY CÔ GIÁO**

Một tờ giấy trắng
Cô gấp cong cong
Thoắt cái đã xong
Chiếc thuyền xinh quá!

Một tờ giấy đỏ
Mềm mại tay cô
Mặt trời đã phô
Nhiều tia nắng toả.

Thêm tờ xanh nữa
Cô cắt rất nhanh
Mặt nước dập dềnh
Quanh thuyền sóng lượn.

Như phép mầu nhiệm
Hiện trước mắt em:
Biển biếc bình minh
Rì rào sóng vỗ...

Biết bao điều lạ
Từ bàn tay cô.

*(Nguyễn Trọng Hoàn)*

**Từ ngữ:** Phô: để lộ ra, bày ra. Dập dềnh: mặt nước chuyển động lên xuống nhịp nhàng. Rì rào: tiếng sóng vỗ nhỏ, êm nhẹ, phát ra đều đều liên tiếp.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Giải thích từ:** phô = để lộ ra, bày ra; dập dềnh = mặt nước chuyển động lên xuống nhịp nhàng; rì rào = tiếng sóng vỗ nhỏ, êm nhẹ, đều đều liên tiếp.
2. **Từ các tờ giấy, cô giáo đã làm ra:** tờ giấy trắng → chiếc thuyền; tờ giấy đỏ → mặt trời toả nắng; tờ giấy xanh → mặt nước dập dềnh.
3. **Hai dòng thơ "Biết bao điều lạ / Từ bàn tay cô" muốn nói:** Cô rất khéo tay (đáp án b).
4. **Câu thơ nói về sự khéo léo của cô khi làm thủ công:** "Cô gấp cong cong / Thoắt cái đã xong", "Mềm mại tay cô", "Cô cắt rất nhanh".
5. **Giới thiệu bức tranh cô tạo ra:** một bức tranh biển biếc lúc bình minh, có chiếc thuyền giấy trắng, mặt trời tỏa nắng từ giấy đỏ, và mặt nước sóng lượn từ giấy xanh.`;

const questionsLesson13 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Từ \"dập dềnh\" trong bài có nghĩa là gì?",
      options: ["A. Mặt nước chuyển động lên xuống nhịp nhàng", "B. Tiếng sóng vỗ nhỏ, êm nhẹ", "C. Để lộ ra, bày ra", "D. Ánh nắng chói chang"],
      correct_index: 0,
      explanation: "Chú thích trong sách: 'Dập dềnh: mặt nước chuyển động lên xuống nhịp nhàng.'"
    }
  },
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối tờ giấy với sản phẩm cô giáo đã làm ra:",
      pairs: [
        { left: "tờ giấy trắng", right: "chiếc thuyền" },
        { left: "tờ giấy đỏ", right: "mặt trời toả nắng" },
        { left: "tờ giấy xanh", right: "mặt nước dập dềnh" }
      ],
      explanation: "Bài thơ tả cô giáo làm đồ thủ công từ 3 tờ giấy màu khác nhau."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Hai dòng thơ \"Biết bao điều lạ / Từ bàn tay cô\" muốn nói điều gì?",
      options: ["A. Cô có phép màu", "B. Cô rất khéo tay", "C. Cô được học sinh rất yêu quý"],
      correct_index: 1,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý (a, b, c); lựa chọn hợp lý nhất là cô rất khéo tay."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Câu thơ nào thể hiện sự khéo léo, nhanh nhẹn của cô giáo khi làm thủ công?",
      options: [
        "A. \"Cô gấp cong cong / Thoắt cái đã xong\"",
        "B. \"Biết bao điều lạ\"",
        "C. \"Biển biếc bình minh\"",
        "D. \"Rì rào sóng vỗ\""
      ],
      correct_index: 0,
      explanation: "'Cô gấp cong cong / Thoắt cái đã xong / Chiếc thuyền xinh quá!' và 'Cô cắt rất nhanh' thể hiện sự khéo léo, nhanh nhẹn."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Rì rào nghĩa là tiếng sóng vỗ nhỏ, êm nhẹ, phát ra đều đều ", "."],
      correct_answers: ["liên tiếp"],
      word_pool: ["liên tiếp", "một lần", "ngắt quãng"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 13 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node13 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-13').single();
  if (!node13) { console.error("❌ Không tìm thấy node bai-13!"); return; }

  const { data: concept13 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_13',
    title: "Kiến thức Bàn tay cô giáo"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 59, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai13, concept_id: concept13?.id }
  }).eq('id', node13.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 13");

  if (concept13) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept13.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Bàn tay cô giáo%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 13";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node13.title}`, type: 'practice', metadata: { node_id: node13.id, concept_id: concept13?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node13.title}`, total_questions: questionsLesson13.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson13.length; i++) {
    const q = questionsLesson13[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept13?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson13.length} câu hỏi mới cho Bài 13`);
  console.log("\n🎉 Seed Bài 13 hoàn tất!");
}

main().catch(console.error);
