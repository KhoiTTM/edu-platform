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

const grammarTutorialBai24 = `### Bài 24: Bạn nhỏ trong nhà (Trang 107 - 108)

#### 1. Bài đọc
**BẠN NHỎ TRONG NHÀ**

Tôi vẫn nhớ ngày đầu tiên nhà tôi có một chú chó nhỏ. Buổi sáng hôm đó, tôi nghe tiếng cào khẽ vào cửa phòng. Mở cửa ra, tôi nhìn thấy một chú chó con. Nó tuyệt xinh: lông trắng, khoang đen, đôi mắt tròn xoe và loáng ướt. Nó rúc vào chân tôi, nức lên những tiếng khe khẽ trong cổ, cái đuôi bé xíu ngoáy tít, hệt như một đứa trẻ làm nũng mẹ.

Tôi đặt tên nó là Cúp. Tôi chưa dạy Cúp những chuyện tài giỏi như làm xiếc. Nhưng so với những con chó bình thường khác, Cúp không thua kém gì. Cúp biết chui vào gầm giường lấy trái banh, đem cho tôi chiếc khăn lau nhà, đưa hai chân trước lên mỗi khi tôi chìa tay cho nó bắt. Cúp còn rất thích nghe tôi đọc truyện. Mỗi khi tôi đọc cho Cúp nghe, nó nằm khoanh tròn trên lòng tôi. Lúc tôi đọc xong, gấp sách lại, đã thấy cu cậu ngủ khò từ lúc nào.

Tôi và Cúp ngày ngày quấn quýt bên nhau. Mỗi khi tôi đi học về, Cúp chạy vọt ra, chồm hai chân trước lên mừng rỡ. Tôi cúi xuống vỗ về Cúp. Nó âu yếm dụi cái mõm ươn ướt, mềm mềm vào chân tôi.

*(Theo Trần Đức Tiến)*

**Từ ngữ:** Loáng ướt: ướt và có ánh sáng chiếu vào. Nức lên: bật mạnh hơi từ trong cổ ra thành tiếng cách quãng.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Chú chó trông như thế nào trong ngày đầu tiên về nhà bạn nhỏ?** Lông trắng, khoang đen, đôi mắt tròn xoe và loáng ướt, rúc vào chân, nức lên tiếng khe khẽ, đuôi ngoáy tít như đứa trẻ làm nũng mẹ.
2. **Chú chó được đặt tên là gì và biết làm những gì?** Tên là Cúp. Biết chui vào gầm giường lấy trái banh, đem khăn lau nhà, đưa hai chân trước lên khi được chìa tay bắt.
3. **Sở thích của chú chó:** rất thích nghe đọc truyện — mỗi khi được đọc cho nghe, nó nằm khoanh tròn trên lòng chủ và thường ngủ quên.
4. **Chi tiết thể hiện tình cảm giữa bạn nhỏ và chú chó:** Cúp chạy vọt ra mừng rỡ khi bạn nhỏ đi học về, bạn nhỏ cúi xuống vỗ về, Cúp âu yếm dụi mõm vào chân bạn nhỏ — thể hiện tình cảm gắn bó, yêu thương giữa hai người bạn.`;

const questionsLesson24 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chú chó trông như thế nào trong ngày đầu tiên về nhà bạn nhỏ?",
      options: [
        "A. To lớn, dữ tợn",
        "B. Lông trắng, khoang đen, đôi mắt tròn xoe và loáng ướt",
        "C. Lông vàng, tai cụp",
        "D. Rất gầy và ốm yếu"
      ],
      correct_index: 1,
      explanation: "'Nó tuyệt xinh: lông trắng, khoang đen, đôi mắt tròn xoe và loáng ướt.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chú chó được đặt tên là gì?",
      options: ["A. Mực", "B. Cúp", "C. Vàng", "D. Lu Lu"],
      correct_index: 1,
      explanation: "'Tôi đặt tên nó là Cúp.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các khả năng sau vào đúng nhóm (Cúp biết làm / Cúp không biết làm):",
      groups: [
        { name: "Cúp biết làm", items: ["chui vào gầm giường lấy trái banh", "đem khăn lau nhà", "đưa hai chân trước lên khi được chìa tay bắt"] },
        { name: "Cúp không biết làm", items: ["làm xiếc"] }
      ],
      explanation: "'Tôi chưa dạy Cúp những chuyện tài giỏi như làm xiếc. Nhưng... Cúp biết chui vào gầm giường lấy trái banh, đem cho tôi chiếc khăn lau nhà, đưa hai chân trước lên mỗi khi tôi chìa tay cho nó bắt.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Cúp thích làm gì mỗi khi được nghe bạn nhỏ đọc truyện?",
      options: [
        "A. Chạy quanh phòng",
        "B. Nằm khoanh tròn trên lòng chủ",
        "C. Sủa to",
        "D. Cắn sách"
      ],
      correct_index: 1,
      explanation: "'Cúp còn rất thích nghe tôi đọc truyện. Mỗi khi tôi đọc cho Cúp nghe, nó nằm khoanh tròn trên lòng tôi.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Chi tiết nào thể hiện tình cảm gắn bó giữa bạn nhỏ và Cúp?",
      options: [
        "A. Cúp chạy vọt ra mừng rỡ khi bạn nhỏ đi học về",
        "B. Cúp trốn khi bạn nhỏ về nhà",
        "C. Cúp không quan tâm đến bạn nhỏ",
        "D. Bạn nhỏ không chơi với Cúp"
      ],
      correct_index: 0,
      explanation: "'Mỗi khi tôi đi học về, Cúp chạy vọt ra, chồm hai chân trước lên mừng rỡ. Tôi cúi xuống vỗ về Cúp.'"
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 24 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node24 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-24').single();
  if (!node24) { console.error("❌ Không tìm thấy node bai-24!"); return; }

  const { data: concept24 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_24',
    title: "Kiến thức Bạn nhỏ trong nhà"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 107, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai24, concept_id: concept24?.id }
  }).eq('id', node24.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 24");

  if (concept24) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept24.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Bạn nhỏ trong nhà%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 24";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node24.title}`, type: 'practice', metadata: { node_id: node24.id, concept_id: concept24?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node24.title}`, total_questions: questionsLesson24.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson24.length; i++) {
    const q = questionsLesson24[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept24?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson24.length} câu hỏi mới cho Bài 24`);
  console.log("\n🎉 Seed Bài 24 hoàn tất! (Hoàn thành Chủ điểm 3: Mái nhà yêu thương)");
}

main().catch(console.error);
