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

const grammarTutorialBai6 = `### Bài 6: Tập nấu ăn (Trang 30 - 31)

#### 1. Bài đọc
**TẬP NẤU ĂN**

Hôm nay, mình vào bếp cùng mẹ và học được công thức làm món trứng đúc thịt. Món này dễ làm mà lại ngon. Mình chia sẻ với các bạn. Các bạn thử tham khảo nhé!

**CÁCH LÀM: Trứng đúc thịt**

**Nguyên liệu:** Trứng gà: 3 quả; Thịt nạc vai: 1 lạng; Dầu ăn, nước mắm, muối, hành khô.

**Các bước thực hiện:**
1. Rửa sạch thịt, băm nhỏ hoặc xay nhuyễn.
2. Đập trứng vào bát, cho thêm thịt xay, hành khô băm nhỏ, một chút muối, một chút nước mắm, đánh đều.
3. Cho dầu ăn vào chảo, đun nóng.
4. Cho hỗn hợp trứng và thịt vào dàn đều khắp chảo, rán vàng mặt dưới (từ 5–7 phút) với lửa nhỏ. Lật mặt còn lại, rán vàng.
5. Bày ra đĩa.

*(Trung Sơn)*

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Nguyên liệu làm món trứng đúc thịt:** trứng gà (3 quả), thịt nạc vai (1 lạng), dầu ăn, nước mắm, muối, hành khô.
2. **Bước 1 cần làm gì?** Rửa sạch thịt, băm nhỏ hoặc xay nhuyễn.
3. **Tranh mô tả công việc ở bước mấy?** Bước 2 — đập trứng vào bát, cho thêm thịt xay, hành khô băm nhỏ, một chút muối, một chút nước mắm, đánh đều.
4. **Thứ tự đúng các bước:** Rửa sạch thịt, băm nhỏ → Đập trứng, trộn với thịt và gia vị → Cho dầu ăn vào chảo, đun nóng → Cho hỗn hợp vào chảo, rán vàng mặt dưới → Lật mặt còn lại, rán vàng → Bày ra đĩa.

---

#### 3. Luyện tập: Từ chỉ hoạt động
Các từ chỉ hoạt động trong bài: rửa, băm, xay, đập, cho, đánh, đun, dàn, rán, lật, bày.`;

const questionsLesson6 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Nguyên liệu nào KHÔNG có trong món trứng đúc thịt?",
      options: ["A. Trứng gà", "B. Thịt nạc vai", "C. Cà rốt", "D. Hành khô"],
      correct_index: 2,
      explanation: "Nguyên liệu gồm trứng gà, thịt nạc vai, dầu ăn, nước mắm, muối, hành khô — không có cà rốt."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Ở bước 1, cần làm gì với thịt?",
      options: [
        "A. Rửa sạch, băm nhỏ hoặc xay nhuyễn",
        "B. Luộc chín rồi thái lát",
        "C. Ướp gia vị qua đêm",
        "D. Chiên giòn trước"
      ],
      correct_index: 0,
      explanation: "'Rửa sạch thịt, băm nhỏ hoặc xay nhuyễn.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Món trứng đúc thịt cần rán mặt dưới trong bao lâu?",
      options: ["A. 1-2 phút", "B. 5-7 phút", "C. 15-20 phút", "D. 30 phút"],
      correct_index: 1,
      explanation: "'rán vàng mặt dưới (từ 5–7 phút) với lửa nhỏ.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Bước nào diễn ra ngay sau khi \"cho dầu ăn vào chảo, đun nóng\"?",
      options: [
        "A. Bày ra đĩa",
        "B. Rửa sạch thịt, băm nhỏ",
        "C. Cho hỗn hợp trứng và thịt vào dàn đều khắp chảo, rán vàng mặt dưới",
        "D. Đập trứng vào bát, đánh đều"
      ],
      correct_index: 2,
      explanation: "Theo thứ tự bài đọc: bước 3 (cho dầu ăn, đun nóng) tiếp theo là bước 4 (cho hỗn hợp vào chảo, rán vàng mặt dưới)."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền vào chỗ trống:",
      text_segments: [
        "Đập trứng vào bát, cho thêm thịt xay, hành khô băm nhỏ, một chút ",
        ", một chút ",
        ", đánh đều."
      ],
      correct_answers: ["muối", "nước mắm"],
      word_pool: ["muối", "nước mắm", "đường", "dầu ăn"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 6 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found!");
    return;
  }

  const { data: node6 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-6')
    .single();

  if (!node6) {
    console.error("❌ Không tìm thấy node bai-6!");
    return;
  }

  const concept6Slug = `concept-tv3-bai_6`;
  const { data: concept6 } = await supabase.from('concepts').upsert({
    slug: concept6Slug,
    title: "Kiến thức Tập nấu ăn"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 30, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai6, concept_id: concept6?.id }
  }).eq('id', node6.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 6");

  if (concept6) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept6.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Tập nấu ăn%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 6";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node6.title}`,
    type: 'practice',
    metadata: { node_id: node6.id, concept_id: concept6?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id,
    title: `Bài đánh giá: ${node6.title}`,
    total_questions: questionsLesson6.length,
    generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson6.length; i++) {
    const q = questionsLesson6[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept6?.id,
      type: q.type,
      difficulty: q.difficulty,
      metadata_json: q.metadata_json,
      source: 'handcrafted',
      status: 'approved',
      grade: 3,
      subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson6.length} câu hỏi mới cho Bài 6`);
  console.log("\n🎉 Seed Bài 6 hoàn tất!");
}

main().catch(console.error);
