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

const grammarTutorialBai28 = `### Bài 28: Con đường của bé (Trang 124 - 125)

#### 1. Bài đọc
**CON ĐƯỜNG CỦA BÉ**

Đường của chú phi công
Lẫn trong mây cao tít
Khắp những vùng trời xanh
Những vì sao chi chít.

Đường của chú hải quân
Mênh mông trên biển cả
Tới những vùng đảo xa
Và những bờ bến lạ.

Con đường làm bằng sắt
Là của bác lái tàu
Chạy dài theo đất nước
Đi song hành bên nhau.

Còn con đường của bố
Đi trên giàn giáo cao
Những khung sắt nối nhau
Dựng nên bao nhà mới.

Và con đường của mẹ
Là ở trên cánh đồng
Cỏ ruộng dâu xanh tốt
Thảm lúa vàng ngát hương.

Bà bảo đường của bé
Chỉ đi đến trường thôi
Bé tìm mỗi sớm mai
Con đường trên trang sách.

*(Thanh Thảo)*

**Từ ngữ:** Giàn giáo: giàn (bằng sắt hoặc bằng gỗ) cho thợ xây dựng thi công các công trình. Song hành: đi song song với nhau.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Ba khổ thơ đầu nhắc đến những ai? Công việc của họ là gì?** Chú phi công (bay trên vùng trời xanh, giữa mây cao và các vì sao); chú hải quân (đi trên biển cả, tới những vùng đảo xa); bác lái tàu (lái tàu chạy dài theo đất nước trên con đường sắt).
2. **Bạn nhỏ kể những gì về công việc của bố mẹ mình?** Bố đi trên giàn giáo cao, nối những khung sắt để dựng nên bao nhà mới (nghề xây dựng). Mẹ làm việc trên cánh đồng, giữa ruộng dâu xanh tốt và thảm lúa vàng ngát hương (nghề nông).
3. **Qua hình ảnh những con đường, tác giả muốn nói về điều gì?** Nói về nghề nghiệp (đáp án a).
4. **"Con đường trên trang sách" có nghĩa là gì?** Con đường khám phá kiến thức (đáp án b).
5. **Nói 2-3 câu về một con đường được tả trong bài thơ:** học sinh tự do chọn một con đường (của phi công, hải quân, lái tàu, bố, mẹ, hoặc của bé) và mô tả lại bằng lời của mình.`;

const questionsLesson28 = [
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối mỗi người với \"con đường\" công việc của họ trong bài thơ:",
      pairs: [
        { left: "Chú phi công", right: "vùng trời xanh, giữa mây cao" },
        { left: "Chú hải quân", right: "biển cả, những vùng đảo xa" },
        { left: "Bác lái tàu", right: "con đường sắt chạy dài theo đất nước" },
        { left: "Mẹ", right: "cánh đồng lúa, ruộng dâu" }
      ],
      explanation: "Mỗi khổ thơ mô tả \"con đường\" gắn với công việc riêng của từng người."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Con đường của bố trong bài thơ là gì?",
      options: [
        "A. Đi trên giàn giáo cao để dựng nhà mới",
        "B. Lái tàu trên đường sắt",
        "C. Bay trên vùng trời xanh",
        "D. Đi trên cánh đồng"
      ],
      correct_index: 0,
      explanation: "'Còn con đường của bố / Đi trên giàn giáo cao / Những khung sắt nối nhau / Dựng nên bao nhà mới.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Qua hình ảnh những con đường, tác giả muốn nói về điều gì?",
      options: ["A. Nói về nghề nghiệp", "B. Nói về cảnh đẹp thiên nhiên", "C. Nói về các loại phương tiện giao thông"],
      correct_index: 0,
      explanation: "Mỗi \"con đường\" trong bài thơ gắn với một nghề nghiệp khác nhau: phi công, hải quân, lái tàu, thợ xây, nông dân."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Em hiểu \"con đường trên trang sách\" của bé có nghĩa là gì?",
      options: ["A. Con đường được vẽ trong sách", "B. Con đường khám phá kiến thức", "C. Con đường ta đi lại hằng ngày"],
      correct_index: 1,
      explanation: "\"Con đường trên trang sách\" là hình ảnh ẩn dụ cho việc học tập, khám phá tri thức mỗi ngày của bé."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Song hành nghĩa là đi ", " với nhau."],
      correct_answers: ["song song"],
      word_pool: ["song song", "ngược chiều", "một mình"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 28 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node28 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-28').single();
  if (!node28) { console.error("❌ Không tìm thấy node bai-28!"); return; }

  const { data: concept28 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_28',
    title: "Kiến thức Con đường của bé"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 124, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai28, concept_id: concept28?.id }
  }).eq('id', node28.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 28");

  if (concept28) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept28.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Con đường của bé%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 28";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node28.title}`, type: 'practice', metadata: { node_id: node28.id, concept_id: concept28?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node28.title}`, total_questions: questionsLesson28.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson28.length; i++) {
    const q = questionsLesson28[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept28?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson28.length} câu hỏi mới cho Bài 28`);
  console.log("\n🎉 Seed Bài 28 hoàn tất! (HOÀN THÀNH TOÀN BỘ TẬP 1 - 28/28 BÀI)");
}

main().catch(console.error);
