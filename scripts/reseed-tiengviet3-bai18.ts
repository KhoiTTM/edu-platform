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

const grammarTutorialBai18 = `### Bài 18: Món quà đặc biệt (Trang 86 - 87)

#### 1. Bài đọc
**MÓN QUÀ ĐẶC BIỆT**

Cả chiều, hai chị em hì hụi chuẩn bị quà sinh nhật cho bố. Tấm thiệp đặc biệt được chị nắn nót viết:

*Bố: Tính rất hiền / Nói rất to / Ngủ rất nhanh / Ghét nói dối / Nấu ăn không ngon / Yêu mẹ*

Ngắm nghía tấm thiệp, em băn khoăn:

— Có khi chỉ viết điều tốt thôi. Chị xoá dòng "Nấu ăn không ngon" đi chị!
— Ừ. Em thấy viết thế có ít quá không?
— A, bố rất đẹp trai nữa ạ!

Chị cắm cúi viết thêm vào tấm thiệp. Quà "bí mật" tặng bố đã xong.

Bố đang ngồi trước máy tính, mặt đăm chiêu.

— Bố ơi...

Bố nhìn hai chị em.

— Hai chị em sao thế?
— Chúng con...
— Chúc mừng sinh nhật bố!

Hai chị em hồi hộp nhìn bố. Bố ngạc nhiên mở quà, đọc chăm chú. Rồi bố cười giòn giã:

— Ngạc nhiên chưa? Hai chị em tặng bố. Còn tiết lộ bí mật bố nấu ăn không ngon nữa.

Chị nhìn em. Em nhìn chị. Cả hai nhìn tấm thiệp. Thôi, quên xoá dòng "Nấu ăn không ngon" rồi. Mắt chị rơm rớm. Nhưng bố đã choàng tay ôm hai chị em vào lòng:

— Cảm ơn hai con. Đây là món quà đặc biệt nhất bố được nhận đấy. Bố muốn thêm một ý nữa là: Bố rất yêu các con.

Ừ nhỉ, sao cả hai chị em đều quên. Ba bố con cười vang cả nhà.

*(Phong Điệp)*

**Từ ngữ:** Hì hụi: gợi tả dáng vẻ làm một việc gì đó một cách khó nhọc, kiên nhẫn. Đăm chiêu: có vẻ mặt suy nghĩ, băn khoăn về một điều gì đó. Rơm rớm: ứa nước mắt như sắp khóc.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Hai chị em đã viết gì trong tấm thiệp tặng bố?** Bố tính rất hiền, nói rất to, ngủ rất nhanh, ghét nói dối, nấu ăn không ngon, yêu mẹ (và thêm "bố rất đẹp trai").
2. **Từ thể hiện cảm xúc của bố khi nhận quà:** ngạc nhiên (đáp án d).
3. **Vì sao bố rất vui khi nhận quà mà người chị lại rơm rớm nước mắt?** Vì chị quên xóa dòng "Nấu ăn không ngon", sợ bố buồn vì lỡ viết điều chưa hay về bố, dù thực chất bố vẫn rất vui và cảm động.
4. **Bố đã làm gì để hai chị em cảm thấy rất vui?** Bố ôm hai chị em vào lòng, cảm ơn và nói thêm rằng bố rất yêu các con — khiến món quà trở nên trọn vẹn, ấm áp.
5. **Chi tiết em thích nhất:** học sinh tự do chia sẻ và giải thích lí do.`;

const questionsLesson18 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Hai chị em đã chuẩn bị món quà gì tặng bố nhân dịp sinh nhật?",
      options: ["A. Một chiếc bánh kem", "B. Một tấm thiệp viết về những điều đáng yêu của bố", "C. Một món đồ chơi", "D. Một bó hoa"],
      correct_index: 1,
      explanation: "'Cả chiều, hai chị em hì hụi chuẩn bị quà sinh nhật cho bố. Tấm thiệp đặc biệt được chị nắn nót viết.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Từ nào dưới đây thể hiện cảm xúc của bố khi nhận quà của hai chị em?",
      options: ["A. băn khoăn", "B. đăm chiêu", "C. hồi hộp", "D. ngạc nhiên"],
      correct_index: 3,
      explanation: "'Bố ngạc nhiên mở quà, đọc chăm chú.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao bố rất vui khi nhận quà mà người chị lại rơm rớm nước mắt?",
      options: [
        "A. Vì chị quên xóa dòng \"Nấu ăn không ngon\", sợ bố buồn",
        "B. Vì bố không thích món quà",
        "C. Vì chị bị mẹ mắng",
        "D. Vì thiệp bị rách"
      ],
      correct_index: 0,
      explanation: "'Thôi, quên xoá dòng Nấu ăn không ngon rồi. Mắt chị rơm rớm.' — chị lo lắng vì lỡ để dòng chữ đó trong thiệp."
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các từ/cụm từ sau vào đúng nhóm nội dung tấm thiệp viết về bố:",
      groups: [
        { name: "Điều được giữ lại", items: ["tính rất hiền", "nói rất to", "ngủ rất nhanh", "ghét nói dối", "yêu mẹ", "đẹp trai"] },
        { name: "Điều định xóa nhưng quên xóa", items: ["nấu ăn không ngon"] }
      ],
      explanation: "Hai chị em định xóa dòng 'Nấu ăn không ngon' nhưng mải viết thêm nên quên mất."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Rơm rớm nghĩa là ứa nước mắt như sắp ", "."],
      correct_answers: ["khóc"],
      word_pool: ["khóc", "cười", "ngủ"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 18 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node18 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-18').single();
  if (!node18) { console.error("❌ Không tìm thấy node bai-18!"); return; }

  const { data: concept18 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_18',
    title: "Kiến thức Món quà đặc biệt"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 86, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai18, concept_id: concept18?.id }
  }).eq('id', node18.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 18");

  if (concept18) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept18.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Món quà đặc biệt%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 18";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node18.title}`, type: 'practice', metadata: { node_id: node18.id, concept_id: concept18?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node18.title}`, total_questions: questionsLesson18.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson18.length; i++) {
    const q = questionsLesson18[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept18?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson18.length} câu hỏi mới cho Bài 18`);
  console.log("\n🎉 Seed Bài 18 hoàn tất!");
}

main().catch(console.error);
