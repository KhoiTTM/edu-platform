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

const grammarTutorialBai12 = `### Bài 12: Bài tập làm văn (Trang 54 - 55)

#### 1. Bài đọc
**BÀI TẬP LÀM VĂN**

Có lần, cô giáo ra cho chúng tôi một đề văn ở lớp: "Em đã làm gì để giúp đỡ mẹ?".

Tôi loay hoay mất một lúc, rồi cầm bút và bắt đầu viết: "Em đã nhiều lần giúp đỡ mẹ. Em quét nhà và rửa bát đĩa. Đôi khi, em giặt khăn mùi soa."

Đến đây, tôi bỗng thấy bí. Quả thật, ở nhà, mẹ thường làm mọi việc. Thỉnh thoảng, mẹ bận, định bảo tôi giúp việc này việc kia, nhưng thấy tôi đang học, mẹ lại thôi.

Tôi nhìn sang Liu-xi-a, thấy bạn ấy đang viết lia lịa. Thế là tôi bỗng nhớ có lần tôi giặt bít tất của mình, bèn viết thêm: "Em còn giặt bít tất."

Nhưng chẳng lẽ lại nộp một bài văn ngắn ngủn như thế này? Tôi nhìn xung quanh, mọi người vẫn viết. Lạ thật, các bạn viết gì mà nhiều thế? Tôi cố nghĩ, rồi viết tiếp: "Em giặt cả áo lót, áo sơ mi và quần." Cuối cùng, tôi kết thúc bài văn của mình: "Em muốn giúp mẹ nhiều việc hơn, để mẹ đỡ vất vả."

Mấy hôm sau, sáng Chủ nhật, mẹ bảo tôi:

— Cô-li-a này! Hôm nay con giặt áo sơ mi và quần áo lót đi nhé!

Tôi tròn xoe mắt. Nhưng rồi tôi vui vẻ nhận lời, vì đó là việc làm mà tôi đã nói trong bài tập làm văn.

*(Theo Pi-vô-va-rô-va)*

**Từ ngữ:** Khăn mùi soa: khăn nhỏ và mỏng, thường bỏ túi, dùng để lau mặt, lau tay. Lia lịa: nhanh và liên tiếp, không ngừng trong một thời gian ngắn.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Đề văn cô giáo giao:** "Em đã làm gì để giúp đỡ mẹ?"
2. **Vì sao Cô-li-a gặp khó khăn với đề văn này?** Vì ở nhà mẹ thường làm mọi việc, Cô-li-a không nhớ nhiều việc mình đã làm để viết.
3. **Để bài văn dài hơn, Cô-li-a đã làm gì?** Viết thêm cả những việc chưa từng làm (giặt bít tất, giặt áo lót, áo sơ mi, quần) để bài văn dài hơn.
4. **Vì sao Cô-li-a vui vẻ nhận lời mẹ?** Vì đó đúng là việc Cô-li-a đã nói trong bài tập làm văn của mình.
5. **Nhận xét về Cô-li-a:** học sinh tự do chia sẻ (ví dụ: đáng yêu, hồn nhiên, biết giữ lời hứa dù là lời hứa vô tình viết trong bài văn).`;

const questionsLesson12 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Đề văn mà cô giáo giao cho lớp là gì?",
      options: ["A. \"Kể về gia đình em\"", "B. \"Em đã làm gì để giúp đỡ mẹ?\"", "C. \"Tả người mẹ của em\"", "D. \"Kể về một ngày của em\""],
      correct_index: 1,
      explanation: "'Có lần, cô giáo ra cho chúng tôi một đề văn ở lớp: Em đã làm gì để giúp đỡ mẹ?.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao Cô-li-a gặp khó khăn với đề văn này?",
      options: ["A. Vì bạn ấy viết văn không tốt", "B. Vì bạn ấy không nhớ những việc mình đã làm", "C. Vì bạn ấy ít khi giúp mẹ"],
      correct_index: 1,
      explanation: "Ở nhà mẹ thường làm mọi việc nên Cô-li-a 'bỗng thấy bí' khi cần kể việc mình đã giúp mẹ."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Để bài văn dài hơn, Cô-li-a đã làm gì?",
      options: [
        "A. Chép bài của bạn Liu-xi-a",
        "B. Viết thêm những việc mình sẽ làm, kể cả những việc chưa từng làm",
        "C. Không nộp bài",
        "D. Xin cô giáo đổi đề khác"
      ],
      correct_index: 1,
      explanation: "'Tôi bỗng nhớ có lần tôi giặt bít tất... bèn viết thêm... Tôi cố nghĩ, rồi viết tiếp: Em giặt cả áo lót, áo sơ mi và quần.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao Cô-li-a vui vẻ nhận lời khi mẹ bảo giặt áo sơ mi và quần áo lót?",
      options: [
        "A. Vì Cô-li-a rất thích giặt đồ",
        "B. Vì đó đúng là việc Cô-li-a đã nói trong bài tập làm văn",
        "C. Vì mẹ hứa thưởng cho Cô-li-a",
        "D. Vì Cô-li-a sợ bị mẹ mắng"
      ],
      correct_index: 1,
      explanation: "'Tôi vui vẻ nhận lời, vì đó là việc làm mà tôi đã nói trong bài tập làm văn.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Lia lịa nghĩa là nhanh và ", ", không ngừng trong một thời gian ngắn."],
      correct_answers: ["liên tiếp"],
      word_pool: ["liên tiếp", "chậm rãi", "gián đoạn"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 12 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node12 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-12').single();
  if (!node12) { console.error("❌ Không tìm thấy node bai-12!"); return; }

  const { data: concept12 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_12',
    title: "Kiến thức Bài tập làm văn"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 54, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai12, concept_id: concept12?.id }
  }).eq('id', node12.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 12");

  if (concept12) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept12.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Bài tập làm văn%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 12";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node12.title}`, type: 'practice', metadata: { node_id: node12.id, concept_id: concept12?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node12.title}`, total_questions: questionsLesson12.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson12.length; i++) {
    const q = questionsLesson12[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept12?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson12.length} câu hỏi mới cho Bài 12`);
  console.log("\n🎉 Seed Bài 12 hoàn tất!");
}

main().catch(console.error);
