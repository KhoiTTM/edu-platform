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

const grammarTutorialBai22 = `### Bài 22: Để cháu nắm tay ông (Trang 100 - 101)

#### 1. Bài đọc
**ĐỂ CHÁU NẮM TAY ÔNG**

Hè năm nay, Dương được đi du lịch ở Nha Trang cùng bố mẹ và ông ngoại.

Tháp Bà Pô-na-ga là địa điểm tham quan cuối cùng của đoàn. Ngôi đền vàng rực trong khuôn viên xanh rợp bóng cây. Ông ngoại cứ đứng trầm ngâm trước những bức vẽ chạm trổ tinh xảo. Bàn tay ông run run khi chạm vào các cột đá nhuốm màu thời gian. Dương nhìn ông, lòng trào lên cảm xúc yêu thương khó tả.

Tiếng hướng dẫn viên du lịch giục đoàn rời điểm tham quan. Ông ngoại chần chừ chưa muốn đi nên rớt lại phía sau. Dương rời đoàn, chạy đến nắm tay ông dắt đi. Nó chợt thấy ông chậm chạp, ngơ ngác quá. Thường ngày, Dương luôn nghĩ ông rất nhanh nhẹn. Ông đưa đón nó đi học mỗi khi bố mẹ bận rộn. Ông hào hứng chơi trò cá ngựa cùng nó.

Từ trước đến nay, ông luôn là người dắt tay dẫn nó đi, là người bảo vệ nó. Đây là lần đầu tiên Dương nhận ra ông không còn khoẻ như trước. Mỗi một ngày trôi qua, ông đang già đi, còn nó sẽ mạnh mẽ hơn. Dương choàng tay ôm ông, thủ thỉ:

— Ông ngoại ơi, cháu yêu ông nhiều lắm!

Dương nghĩ, từ bây giờ nó mới là người đưa tay cho ông nắm.

*(Dương Thụy)*

**Từ ngữ:** Tháp Bà Pô-na-ga: công trình kiến trúc tiêu biểu của văn hoá Chăm Pa ở Nha Trang. Chạm trổ: khắc, đục lên bề mặt gỗ, đá để trang trí. Tinh xảo: tinh vi, tỉ mỉ, khéo léo. Chần chừ: đắn đo, do dự, chưa quyết tâm ngay để làm một việc gì đó.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Điểm tham quan cuối cùng của gia đình Dương là ở đâu?** Tháp Bà Pô-na-ga (Nha Trang).
2. **Chi tiết cho thấy ông ngoại ngắm ngôi đền rất kĩ và đầy xúc động:** "Ông ngoại cứ đứng trầm ngâm trước những bức vẽ chạm trổ tinh xảo. Bàn tay ông run run khi chạm vào các cột đá nhuốm màu thời gian."
3. **Dương đã thay đổi suy nghĩ về ông như thế nào?** Trước khi đi du lịch, Dương nghĩ ông rất nhanh nhẹn, luôn là người dắt tay dẫn mình đi, bảo vệ mình. Trong khi đi du lịch, Dương nhận ra ông đã chậm chạp, ngơ ngác, không còn khoẻ như trước.
4. **Vì sao Dương nghĩ từ bây giờ mình mới là người đưa tay cho ông nắm?** Vì Dương nhận ra ông đang già đi còn mình sẽ mạnh mẽ hơn, nên muốn đổi vai trò để chăm sóc, bảo vệ ông như ông từng làm cho mình.`;

const questionsLesson22 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Điểm tham quan cuối cùng của gia đình Dương là ở đâu?",
      options: ["A. Bãi biển Nha Trang", "B. Tháp Bà Pô-na-ga", "C. Chợ Đầm", "D. Viện Hải dương học"],
      correct_index: 1,
      explanation: "'Tháp Bà Pô-na-ga là địa điểm tham quan cuối cùng của đoàn.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chi tiết nào cho thấy ông ngoại ngắm ngôi đền rất kĩ và đầy xúc động?",
      options: [
        "A. Ông giục đoàn đi nhanh",
        "B. Bàn tay ông run run khi chạm vào các cột đá nhuốm màu thời gian",
        "C. Ông chụp rất nhiều ảnh",
        "D. Ông không quan tâm đến ngôi đền"
      ],
      correct_index: 1,
      explanation: "'Ông ngoại cứ đứng trầm ngâm trước những bức vẽ chạm trổ tinh xảo. Bàn tay ông run run khi chạm vào các cột đá nhuốm màu thời gian.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các suy nghĩ của Dương về ông vào đúng thời điểm:",
      groups: [
        { name: "Trước khi đi du lịch", items: ["ông rất nhanh nhẹn", "ông luôn dắt tay dẫn cháu đi", "ông là người bảo vệ cháu"] },
        { name: "Trong khi đi du lịch", items: ["ông chậm chạp, ngơ ngác", "ông không còn khoẻ như trước", "ông đang già đi"] }
      ],
      explanation: "Chuyến đi giúp Dương lần đầu tiên nhận ra sự thay đổi của ông so với suy nghĩ thường ngày."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao Dương nghĩ từ bây giờ mình mới là người đưa tay cho ông nắm?",
      options: [
        "A. Vì ông yêu cầu Dương làm vậy",
        "B. Vì Dương nhận ra ông đang già đi, còn mình sẽ mạnh mẽ hơn nên muốn chăm sóc ông",
        "C. Vì bố mẹ bảo Dương làm vậy",
        "D. Vì Dương sợ bị lạc"
      ],
      correct_index: 1,
      explanation: "'Mỗi một ngày trôi qua, ông đang già đi, còn nó sẽ mạnh mẽ hơn... Dương nghĩ, từ bây giờ nó mới là người đưa tay cho ông nắm.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Chần chừ nghĩa là đắn đo, ", ", chưa quyết tâm ngay để làm một việc gì đó."],
      correct_answers: ["do dự"],
      word_pool: ["do dự", "quyết đoán", "vội vàng"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 22 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node22 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-22').single();
  if (!node22) { console.error("❌ Không tìm thấy node bai-22!"); return; }

  const { data: concept22 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_22',
    title: "Kiến thức Để cháu nắm tay ông"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 100, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai22, concept_id: concept22?.id }
  }).eq('id', node22.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 22");

  if (concept22) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept22.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Để cháu nắm tay ông%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 22";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node22.title}`, type: 'practice', metadata: { node_id: node22.id, concept_id: concept22?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node22.title}`, total_questions: questionsLesson22.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson22.length; i++) {
    const q = questionsLesson22[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept22?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson22.length} câu hỏi mới cho Bài 22`);
  console.log("\n🎉 Seed Bài 22 hoàn tất!");
}

main().catch(console.error);
