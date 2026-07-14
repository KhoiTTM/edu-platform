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

const grammarTutorialBai21 = `### Bài 21: Tia nắng bé nhỏ (Trang 97 - 98)

#### 1. Bài đọc
**TIA NẮNG BÉ NHỎ**

Bà nội của Na đã già yếu. Bà đi lại rất khó khăn.

Nhà của Na nằm trên một ngọn đồi. Hằng ngày, nắng xuyên qua những tán lá trong khu vườn trước nhà tạo thành những vệt sáng lóng lánh rất đẹp. Nhưng phòng ngủ của tất cả mọi người trong gia đình lại ở phía không có nắng. Bà nội rất thích nắng nhưng nắng không lọt vào phòng bà. Na chưa biết làm cách nào để đem nắng cho bà.

Một buổi sáng, khi đang dạo chơi trên đồng cỏ, Na cảm thấy nắng sưởi ấm mái tóc mình và nhảy nhót trên vạt áo. Cô bé vui mừng reo lên:

— Mình sẽ bắt nắng trên vạt áo mang về cho bà.

Nghĩ vậy, cô bé chạy ùa vào phòng bà:

— Bà ơi! Bà nhìn này! Cháu mang ít nắng về cho bà đây! — Cô bé reo lên và xổ vạt áo ra nhưng chẳng có tia nắng nào ở đó cả.

— Kìa, nắng long lanh trong ánh mắt cháu và rực lên trên mái tóc của cháu đây này. — Bà nội trìu mến nhìn cô bé.

Na không hiểu được tại sao nắng lại chiếu từ mắt mình nhưng cô bé rất mừng vì làm cho bà vui. Mỗi sáng, Na dạo chơi trong vườn rồi chạy vào phòng để đem nắng cho bà.

*(Theo Hà Yên)*

**Từ ngữ:** Xổ: mở tung ra, tháo tung ra. Mắt long lanh: mắt có ánh sáng chiếu vào, trông sinh động.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Vì sao bà nội của Na khó thấy được nắng?** Vì phòng ngủ của bà ở phía không có nắng, nắng không lọt vào được.
2. **Na nghĩ ra cách nào để mang nắng cho bà?** Bắt nắng trên vạt áo (khi cảm thấy nắng sưởi ấm tóc và nhảy nhót trên vạt áo) rồi mang về cho bà.
3. **Na có mang được nắng cho bà không? Vì sao?** Không mang được nắng thật, vì khi xổ vạt áo ra thì chẳng có tia nắng nào ở đó — nhưng bà vẫn thấy "nắng" trong ánh mắt và mái tóc rực rỡ của Na.
4. **Câu nói của bà cho em biết điều gì?** Bà hiểu tình cảm của Na (đáp án a).
5. **Nếu là Na, em sẽ làm gì để giúp bà nhìn thấy nắng?** Học sinh tự do chia sẻ (ví dụ: mở cửa sổ phòng bà, dẫn bà ra vườn dạo nắng, kể chuyện về nắng cho bà nghe).`;

const questionsLesson21 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao bà nội của Na khó thấy được nắng?",
      options: [
        "A. Vì bà không thích nắng",
        "B. Vì phòng ngủ của bà ở phía không có nắng",
        "C. Vì bà bị mù",
        "D. Vì trời luôn nhiều mây"
      ],
      correct_index: 1,
      explanation: "'Nhưng phòng ngủ của tất cả mọi người trong gia đình lại ở phía không có nắng... nắng không lọt vào phòng bà.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Na nghĩ ra cách nào để mang nắng cho bà?",
      options: [
        "A. Mở cửa sổ phòng bà",
        "B. Bắt nắng trên vạt áo rồi mang về cho bà",
        "C. Vẽ tranh mặt trời tặng bà",
        "D. Mua đèn cho bà"
      ],
      correct_index: 1,
      explanation: "'Mình sẽ bắt nắng trên vạt áo mang về cho bà.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Na có mang được nắng thật sự cho bà không?",
      options: [
        "A. Có, nắng vẫn còn trên vạt áo",
        "B. Không, khi xổ vạt áo ra thì chẳng có tia nắng nào ở đó",
        "C. Có, nhưng nắng đã tắt",
        "D. Không, vì Na quên mang áo"
      ],
      correct_index: 1,
      explanation: "'Cô bé reo lên và xổ vạt áo ra nhưng chẳng có tia nắng nào ở đó cả.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Câu nói của bà \"Nắng long lanh trong ánh mắt cháu...\" cho em biết điều gì?",
      options: ["A. Bà hiểu tình cảm của Na", "B. Bà không muốn Na buồn", "C. Bà rất yêu Na"],
      correct_index: 0,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý; lựa chọn hợp lý nhất là bà hiểu tình cảm của Na."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Xổ nghĩa là mở tung ra, ", " ra."],
      correct_answers: ["tháo tung"],
      word_pool: ["tháo tung", "buộc chặt", "gấp lại"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 21 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node21 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-21').single();
  if (!node21) { console.error("❌ Không tìm thấy node bai-21!"); return; }

  const { data: concept21 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_21',
    title: "Kiến thức Tia nắng bé nhỏ"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 97, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai21, concept_id: concept21?.id }
  }).eq('id', node21.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 21");

  if (concept21) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept21.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Tia nắng bé nhỏ%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 21";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node21.title}`, type: 'practice', metadata: { node_id: node21.id, concept_id: concept21?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node21.title}`, total_questions: questionsLesson21.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson21.length; i++) {
    const q = questionsLesson21[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept21?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson21.length} câu hỏi mới cho Bài 21`);
  console.log("\n🎉 Seed Bài 21 hoàn tất!");
}

main().catch(console.error);
