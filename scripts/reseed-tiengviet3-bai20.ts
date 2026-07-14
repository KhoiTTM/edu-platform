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

const grammarTutorialBai20 = `### Bài 20: Trò chuyện cùng mẹ (Trang 93 - 94)

#### 1. Bài đọc
**TRÒ CHUYỆN CÙNG MẸ**

Thời gian vui nhất trong buổi tối của Thư và Hân là trước khi đi ngủ. Đã thành thói quen, ba mẹ con sẽ đọc sách, rồi thủ thỉ chuyện trò. Những câu chuyện của ba mẹ con thường nối vào nhau không dứt. Vì thế, sắp đến giờ ngủ, mẹ phải nói rành rọt từng chữ: Năm phút nữa thôi nhé. Nhưng đôi khi chính mẹ nấn ná nghe chuyện của con, làm năm phút cứ được cộng thêm mãi.

Ba mẹ con có nhiều điều để nói với nhau lắm. Hôm thì ba mẹ con bàn luận về các nhân vật trong quyển sách vừa đọc. Hôm thì mẹ kể cho hai chị em về công việc của mẹ. Có hôm, mẹ lại kể về ngày mẹ còn bé. Thỉnh thoảng mẹ pha trò khiến hai chị em cười như nắc nẻ.

Hai chị em cũng líu lo kể chuyện cho mẹ nghe. Em Hân bao giờ cũng tranh kể trước. Em hay kể về các bạn ở lớp mẫu giáo, về những trò chơi em được cô dạy, hay những món quà chiều mà em ăn rồi lại muốn ăn thêm nữa. Thư thì kể cho mẹ nghe chuyện được cô giáo mời đọc bài văn trước cả lớp, về những bài toán thử trí thông minh mà các bạn thường đố nhau trong giờ ra chơi,...

Ba mẹ con rúc rích mãi không chán. Chỉ là đến giờ ngủ thì phải ngủ thôi.

*(Diệu Thuý)*

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Chi tiết cho thấy ba mẹ con Thư rất thích trò chuyện trước khi đi ngủ:** "Những câu chuyện của ba mẹ con thường nối vào nhau không dứt", "Ba mẹ con rúc rích mãi không chán."
2. **Vì sao thời gian trò chuyện của ba mẹ con cứ được cộng thêm mãi?** Vì chính mẹ cũng nấn ná muốn nghe thêm chuyện của con.
3. **Mẹ đã kể cho chị em Thư những chuyện gì?** Bàn luận về các nhân vật trong sách vừa đọc, kể về công việc của mẹ, kể về ngày mẹ còn bé, và thỉnh thoảng pha trò vui.
4. **Đóng vai Thư hoặc Hân kể lại chuyện đã kể cho mẹ nghe:** Hân kể về các bạn ở lớp mẫu giáo, những trò chơi được cô dạy, những món quà chiều em thích. Thư kể về việc được cô giáo mời đọc bài văn trước lớp, những bài toán thử trí thông minh.
5. **Cảm nghĩ sau khi đọc câu chuyện:** học sinh tự do chia sẻ cảm nhận về tình cảm gia đình ấm áp.`;

const questionsLesson20 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Thời gian vui nhất trong buổi tối của Thư và Hân là lúc nào?",
      options: ["A. Trước khi ăn cơm", "B. Trước khi đi ngủ", "C. Sau khi thức dậy", "D. Giờ ra chơi"],
      correct_index: 1,
      explanation: "'Thời gian vui nhất trong buổi tối của Thư và Hân là trước khi đi ngủ.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao thời gian trò chuyện của ba mẹ con cứ được cộng thêm mãi?",
      options: [
        "A. Vì đồng hồ bị hỏng",
        "B. Vì chính mẹ cũng nấn ná muốn nghe thêm chuyện của con",
        "C. Vì hai chị em không chịu đi ngủ",
        "D. Vì ba về nhà muộn"
      ],
      correct_index: 1,
      explanation: "'Nhưng đôi khi chính mẹ nấn ná nghe chuyện của con, làm năm phút cứ được cộng thêm mãi.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các câu chuyện sau vào đúng người kể:",
      groups: [
        { name: "Mẹ kể", items: ["các nhân vật trong sách vừa đọc", "công việc của mẹ", "ngày mẹ còn bé"] },
        { name: "Hân kể", items: ["các bạn ở lớp mẫu giáo", "trò chơi được cô dạy"] },
        { name: "Thư kể", items: ["được cô giáo mời đọc bài văn trước lớp", "bài toán thử trí thông minh"] }
      ],
      explanation: "Mỗi thành viên trong gia đình đều có những câu chuyện riêng để chia sẻ mỗi tối."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Ai bao giờ cũng tranh kể chuyện trước trong gia đình?",
      options: ["A. Mẹ", "B. Thư", "C. Em Hân", "D. Ba"],
      correct_index: 2,
      explanation: "'Em Hân bao giờ cũng tranh kể trước.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào câu văn sau:",
      text_segments: ["Ba mẹ con ", " mãi không chán. Chỉ là đến giờ ngủ thì phải ngủ thôi."],
      correct_answers: ["rúc rích"],
      word_pool: ["rúc rích", "im lặng", "cãi nhau"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 20 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node20 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-20').single();
  if (!node20) { console.error("❌ Không tìm thấy node bai-20!"); return; }

  const { data: concept20 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_20',
    title: "Kiến thức Trò chuyện cùng mẹ"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 93, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai20, concept_id: concept20?.id }
  }).eq('id', node20.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 20");

  if (concept20) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept20.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Trò chuyện cùng mẹ%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 20";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node20.title}`, type: 'practice', metadata: { node_id: node20.id, concept_id: concept20?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node20.title}`, total_questions: questionsLesson20.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson20.length; i++) {
    const q = questionsLesson20[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept20?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson20.length} câu hỏi mới cho Bài 20`);
  console.log("\n🎉 Seed Bài 20 hoàn tất!");
}

main().catch(console.error);
