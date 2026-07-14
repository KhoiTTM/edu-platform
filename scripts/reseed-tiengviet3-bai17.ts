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

const grammarTutorialBai17 = `### Bài 17: Ngưỡng cửa (Trang 82 - 83)

#### 1. Bài đọc
**NGƯỠNG CỬA** *(Trích)*

Nơi ấy ai cũng quen
Ngay từ thời tấm bé
Khi tay bà, tay mẹ
Còn dắt vòng đi men.

Nơi bố mẹ ngày đêm
Lúc nào qua cũng vội
Nơi bạn bè chạy tới
Thường lúc nào cũng vui.

Nơi ấy đã đưa tôi
Buổi đầu tiên đến lớp
Nay con đường xa tắp
Vẫn đang chờ tôi đi.

Nơi ấy ngôi sao khuya
Soi vào trong giấc ngủ
Ngọn đèn khuya bóng mẹ
Sáng một vầng trên sân.

*(Vũ Quần Phương)*

**Từ ngữ:** Ngưỡng cửa: thanh dưới của khung cửa ra vào, thường chỉ có ở nhà gỗ hoặc nhà tranh. Đi men: bám vào vật gì đó để đi cho vững.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **"Nơi ấy" trong bài thơ chỉ cái gì?** Chỉ ngưỡng cửa của ngôi nhà.
2. **"Nơi ấy" đã chứng kiến những điều gì trong cuộc sống của bạn nhỏ?** (1) Bà dắt bạn nhỏ đi men từ thời tấm bé; (2) bạn nhỏ chơi cùng bạn bè; (3) bạn nhỏ bước ra ngưỡng cửa để đến lớp.
3. **Hình ảnh "con đường xa tắp" muốn nói đến điều gì?** Nhiều điều mới mẻ chờ đón em ở phía trước (đáp án b).
4. **Ngưỡng cửa đã nhắc bạn nhỏ nhớ tới những ai, giúp bạn nhỏ cảm nhận điều gì về những người đó?** Nhắc nhớ tới bà, mẹ, bố và bạn bè — giúp bạn nhỏ cảm nhận được tình yêu thương, sự chăm sóc, dìu dắt ân cần của bà, mẹ từ thuở bé, sự tần tảo vội vã của bố mẹ, và niềm vui khi có bạn bè.`;

const questionsLesson17 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "\"Nơi ấy\" trong bài thơ chỉ cái gì?",
      options: ["A. Sân trường", "B. Ngưỡng cửa của ngôi nhà", "C. Con đường làng", "D. Khu vườn"],
      correct_index: 1,
      explanation: "Từ ngữ chú thích trong bài: 'Ngưỡng cửa: thanh dưới của khung cửa ra vào.' Toàn bài thơ nói về ngưỡng cửa gắn với các kỉ niệm."
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các sự việc mà \"nơi ấy\" (ngưỡng cửa) đã chứng kiến vào đúng nhóm:",
      groups: [
        { name: "Thời tấm bé", items: ["bà, mẹ dắt đi men"] },
        { name: "Lúc chơi cùng bạn", items: ["bạn bè chạy tới, thường lúc nào cũng vui"] },
        { name: "Buổi đầu đến lớp", items: ["đưa bạn nhỏ đến lớp lần đầu tiên"] }
      ],
      explanation: "Bài thơ tả ngưỡng cửa chứng kiến 3 giai đoạn trong cuộc sống của bạn nhỏ."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Hình ảnh \"con đường xa tắp\" trong bài thơ muốn nói đến điều gì?",
      options: ["A. Hành trình học tập còn dài lâu", "B. Nhiều điều mới mẻ chờ đón em ở phía trước", "C. Đường đến tương lai còn xa"],
      correct_index: 1,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý; lựa chọn hợp lý nhất là nhiều điều mới mẻ chờ đón em ở phía trước."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Ngưỡng cửa đã nhắc bạn nhỏ nhớ tới những ai?",
      options: [
        "A. Chỉ nhớ tới mẹ",
        "B. Bà, mẹ, bố và bạn bè",
        "C. Chỉ nhớ tới thầy cô giáo",
        "D. Không nhớ tới ai"
      ],
      correct_index: 1,
      explanation: "Bài thơ nhắc tới 'tay bà, tay mẹ' dắt đi men, 'bố mẹ ngày đêm' và 'bạn bè chạy tới'."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Đi men nghĩa là bám vào vật gì đó để đi cho ", "."],
      correct_answers: ["vững"],
      word_pool: ["vững", "nhanh", "xa"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 17 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node17 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-17').single();
  if (!node17) { console.error("❌ Không tìm thấy node bai-17!"); return; }

  const { data: concept17 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_17',
    title: "Kiến thức Ngưỡng cửa"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 82, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai17, concept_id: concept17?.id }
  }).eq('id', node17.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 17");

  if (concept17) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept17.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Ngưỡng cửa%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 17";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node17.title}`, type: 'practice', metadata: { node_id: node17.id, concept_id: concept17?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node17.title}`, total_questions: questionsLesson17.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson17.length; i++) {
    const q = questionsLesson17[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept17?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson17.length} câu hỏi mới cho Bài 17`);
  console.log("\n🎉 Seed Bài 17 hoàn tất!");
}

main().catch(console.error);
