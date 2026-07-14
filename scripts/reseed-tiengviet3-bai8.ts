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

const grammarTutorialBai8 = `### Bài 8: Tạm biệt mùa hè (Trang 38 - 39)

#### 1. Bài đọc
**TẠM BIỆT MÙA HÈ**

Đêm nay, Diệu nằm mãi mà không ngủ được vì háo hức chờ sớm mai đến lớp. Sau kì nghỉ hè, bạn bè gặp nhau sẽ có bao nhiêu chuyện vui để kể. Các bạn chắc chắn sẽ kể về những chuyến du lịch kì thú của mình: ra biển, lên núi, đến thăm những thành phố lớn,... Còn Diệu, Diệu sẽ kể với các bạn những gì nhỉ?

Mùa hè của Diệu đơn giản lắm. Chiều nào Diệu cũng theo mẹ đi các vườn thu hái quả. Hết chôm chôm lại đến bơ, sầu riêng,... Được đến nhiều mảnh vườn với vô vàn cây trái khác nhau thật là thích!

Mùa hè của Diệu là những lần đến chơi nhà bà cụ Khởi ở cuối làng. Bà bị mù nhưng vẫn có thể làm hết mọi việc trong nhà. Bà đi không cần gậy dò đường. Diệu thường tỉ tê trò chuyện với bà. Bà là cả một kho chuyện thú vị.

Mùa hè của Diệu là những buổi ra chợ cùng mẹ. Khu chợ quê nghèo ấy thật giản dị mà gần gũi, thân quen. Diệu yêu những người cô, người bác tảo tần bán từng giỏ cua, mớ tép; yêu cả những người bà sáng nào cũng dắt cháu đi mua một ít kẹo bột, vài chiếc bánh mì,...

Tạm biệt mùa hè, mai Diệu sẽ bước vào năm học mới...

*(Theo Vũ Thị Huyền Trang)*

**Từ ngữ:** Kì thú: đặc biệt thú vị. Tỉ tê: nói nhỏ với giọng thân mật như tâm tình. Tảo tần: (chỉ người phụ nữ) đảm đang, chịu khó.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Vì sao đêm trước ngày khai giảng, Diệu nằm mãi mà không ngủ được?** Vì háo hức chờ sớm mai đến lớp, gặp lại bạn bè sau kì nghỉ hè.
2. **Mùa hè, Diệu đã làm những gì?** Đi thu hái quả cùng mẹ, đến chơi nhà bà cụ Khởi, cùng mẹ ra chợ (không đi du lịch hay ngắm núi non như các bạn khác).
3. **Trải nghiệm của Diệu:** (a) Khi ở nhà bà cụ Khởi — Diệu tỉ tê trò chuyện với bà, bà kể cho Diệu nhiều chuyện thú vị. (b) Khi ở góc chợ quê nghèo — Diệu yêu quý những người cô, người bác tảo tần bán hàng, giản dị mà gần gũi.
4. **Trải nghiệm em thích nhất:** học sinh tự do chia sẻ và giải thích lí do.`;

const questionsLesson8 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao đêm trước ngày khai giảng, Diệu nằm mãi mà không ngủ được?",
      options: [
        "A. Vì sợ đi học muộn",
        "B. Vì háo hức chờ sớm mai đến lớp gặp lại bạn bè",
        "C. Vì lo lắng bài tập hè chưa xong",
        "D. Vì trời quá nóng"
      ],
      correct_index: 1,
      explanation: "'Đêm nay, Diệu nằm mãi mà không ngủ được vì háo hức chờ sớm mai đến lớp.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các hoạt động sau vào đúng nhóm:",
      groups: [
        { name: "Diệu đã làm trong mùa hè", items: ["đi thu hái quả", "đến chơi nhà bà cụ Khởi", "cùng mẹ ra chợ"] },
        { name: "Diệu KHÔNG làm trong mùa hè", items: ["đi du lịch", "ngắm núi non"] }
      ],
      explanation: "Mùa hè của Diệu đơn giản: thu hái quả, chơi nhà bà cụ Khởi, ra chợ cùng mẹ — khác với các bạn đi du lịch, lên núi."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Bà cụ Khởi trong bài có đặc điểm gì đặc biệt?",
      options: [
        "A. Bà rất giàu có",
        "B. Bà bị mù nhưng vẫn tự làm hết mọi việc trong nhà",
        "C. Bà sống một mình không ai thăm",
        "D. Bà không thích trò chuyện"
      ],
      correct_index: 1,
      explanation: "'Bà bị mù nhưng vẫn có thể làm hết mọi việc trong nhà. Bà đi không cần gậy dò đường.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao Diệu yêu những người ở khu chợ quê?",
      options: [
        "A. Vì họ bán đồ rất rẻ",
        "B. Vì họ tảo tần bán hàng, giản dị mà gần gũi, thân quen",
        "C. Vì họ hay cho Diệu quà",
        "D. Vì chợ quê rất đông vui"
      ],
      correct_index: 1,
      explanation: "'Diệu yêu những người cô, người bác tảo tần bán từng giỏ cua, mớ tép; yêu cả những người bà sáng nào cũng dắt cháu đi mua một ít kẹo bột, vài chiếc bánh mì.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Tảo tần nghĩa là (chỉ người phụ nữ) ", ", chịu ", "."],
      correct_answers: ["đảm đang", "khó"],
      word_pool: ["đảm đang", "khó", "lười biếng", "sang trọng"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 8 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node8 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-8').single();
  if (!node8) { console.error("❌ Không tìm thấy node bai-8!"); return; }

  const { data: concept8 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_8',
    title: "Kiến thức Tạm biệt mùa hè"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 38, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai8, concept_id: concept8?.id }
  }).eq('id', node8.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 8");

  if (concept8) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept8.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Tạm biệt mùa hè%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 8";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node8.title}`, type: 'practice', metadata: { node_id: node8.id, concept_id: concept8?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node8.title}`, total_questions: questionsLesson8.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson8.length; i++) {
    const q = questionsLesson8[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept8?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson8.length} câu hỏi mới cho Bài 8`);
  console.log("\n🎉 Seed Bài 8 hoàn tất! (Hoàn thành Chủ điểm 1: Những trải nghiệm thú vị)");
}

main().catch(console.error);
