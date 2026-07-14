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

const grammarTutorialBai4 = `### Bài 4: Lần đầu ra biển (Trang 21 - 23)

#### 1. Bài đọc
**LẦN ĐẦU RA BIỂN**

— A! Biển! Biển đây rồi. Thích quá!

Thắng reo toáng lên, vượt qua bố và anh Thái chạy ào ra bãi cát. Từ thuở bé đến giờ, Thắng đã được thấy biển bao giờ đâu. Cậu đứng ngây ra nhìn biển. Ôi! Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia đâu.

Thắng đi xuống gần mép nước. Ồ! Có con gì bé tẹo đang chạy trên cát. Thắng rón rén đến gần, nhưng vụt một cái, nó biến ngay vào hang.

— Cậu có biết con gì đấy không?

Thắng giật mình ngẩng lên nhìn, thấy một bạn trai đang đứng cười. Thắng cũng cười làm quen:

— Con gì mà chạy nhanh thế nhỉ?
— Con còng gió, cậu không biết sao?
— Không, bây giờ tớ mới được ra biển. Thế tên cậu là gì?
— Tớ là Hải. Còn tên cậu?
— Tớ là Thắng. Nhà tớ ở Hà Nội. Nghỉ hè, tớ được bố cho vào Quy Nhơn thăm bác tớ.
— Ở Hà Nội không có biển à?

Thắng cười:
— Hà Nội chỉ có Hồ Gươm, Hồ Tây, sông Hồng thôi. Hồ Tây rộng lắm nhưng không rộng bằng biển thế này.

Hải dẫn Thắng đi dọc bờ biển, chỉ cho bạn Mũi Én, Ghềnh Ráng,... Lúc tạm biệt, hai đứa hẹn chiều mai lại gặp nhau.

*(Theo Nguyễn Văn Chương)*

**Từ ngữ:**
- Quy Nhơn: thành phố ven biển thuộc tỉnh Bình Định.
- Mũi Én, Ghềnh Ráng: những cảnh đẹp ở vùng biển Quy Nhơn.
- Còng gió: loài vật sống ở biển, giống cua nhưng nhỏ hơn, chạy rất nhanh.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Những câu thể hiện cảm xúc của Thắng khi lần đầu tiên thấy biển:** "A! Biển! Biển đây rồi. Thích quá!"; "Ôi! Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia đâu."
2. **Biển hiện ra như thế nào trước mắt Thắng?** Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia.
3. **Thắng đã chú ý đến con vật gì trên bãi biển?** Con còng gió — con vật bé tẹo chạy rất nhanh trên cát.
4. **Đóng vai Thắng, giới thiệu về Hải:** Đây là bạn Hải, bạn ấy sống ở Quy Nhơn, biết rất nhiều về biển, đã dẫn tớ đi dọc bờ biển và chỉ cho tớ xem Mũi Én, Ghềnh Ráng.
5. **Cuộc gặp gỡ giữa Thắng và Hải hứa hẹn điều thú vị tiếp theo:** Hai bạn đã hẹn gặp lại nhau vào chiều hôm sau, có thể sẽ cùng khám phá thêm nhiều điều thú vị ở biển.

---

#### 3. Luyện tập: Từ chỉ đặc điểm
Ví dụ trong đoạn văn về bụi kim ngân: hoa "màu **vàng**", một bông "màu **trắng**, **nhỏ xíu**, **thơm ngát**" — đây đều là các từ chỉ đặc điểm (màu sắc, kích thước, mùi vị).`;

const questionsLesson4 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Câu nào thể hiện cảm xúc của Thắng khi lần đầu tiên thấy biển?",
      options: [
        "A. \"Ôi! Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia đâu.\"",
        "B. \"Con còng gió, cậu không biết sao?\"",
        "C. \"Hà Nội chỉ có Hồ Gươm, Hồ Tây, sông Hồng thôi.\"",
        "D. \"Lúc tạm biệt, hai đứa hẹn chiều mai lại gặp nhau.\""
      ],
      correct_index: 0,
      explanation: "'Thắng reo toáng lên... Cậu đứng ngây ra nhìn biển. Ôi! Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia đâu.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Con vật mà Thắng chú ý trên bãi biển là con gì?",
      options: [
        "A. Con cua",
        "B. Con còng gió",
        "C. Con cá",
        "D. Con ốc"
      ],
      correct_index: 1,
      explanation: "'— Con còng gió, cậu không biết sao?'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao Thắng nói Hồ Tây \"không rộng bằng biển thế này\"?",
      options: [
        "A. Vì Thắng chưa từng ra biển bao giờ, nay mới thấy biển rộng hơn nhiều",
        "B. Vì Hồ Tây rất nhỏ",
        "C. Vì biển ở gần nhà Thắng hơn",
        "D. Vì Hải nói vậy"
      ],
      correct_index: 0,
      explanation: "Thắng lần đầu ra biển nên so sánh Hồ Tây quen thuộc ở Hà Nội với biển Quy Nhơn rộng lớn mà cậu vừa được chứng kiến."
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các chi tiết sau vào đúng nhân vật:",
      groups: [
        { name: "Thắng", items: ["ở Hà Nội", "lần đầu ra biển", "được bố cho vào Quy Nhơn thăm bác"] },
        { name: "Hải", items: ["biết con còng gió", "dẫn Thắng đi dọc bờ biển", "chỉ Mũi Én và Ghềnh Ráng"] }
      ],
      explanation: "Thắng là bạn từ Hà Nội vào; Hải là bạn địa phương ở Quy Nhơn, quen thuộc với biển."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: [
        "Còng gió là loài vật sống ở ",
        ", giống cua nhưng nhỏ hơn, chạy rất ",
        "."
      ],
      correct_answers: ["biển", "nhanh"],
      word_pool: ["biển", "nhanh", "sông", "chậm"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 4 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found!");
    return;
  }

  const { data: node4 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-4')
    .single();

  if (!node4) {
    console.error("❌ Không tìm thấy node bai-4!");
    return;
  }

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 21, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai4 }
  }).eq('id', node4.id);

  console.log("✅ Đã cập nhật grammar_tutorial cho Bài 4");

  const concept4Slug = `concept-tv3-bai_4`;
  const { data: concept4 } = await supabase.from('concepts').upsert({
    slug: concept4Slug,
    title: "Kiến thức Lần đầu ra biển"
  }, { onConflict: 'slug' }).select().single();

  if (concept4) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept4.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Lần đầu ra biển%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 4";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node4.title}`,
    type: 'practice',
    metadata: { node_id: node4.id, concept_id: concept4?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id,
    title: `Bài đánh giá: ${node4.title}`,
    total_questions: questionsLesson4.length,
    generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson4.length; i++) {
    const q = questionsLesson4[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept4?.id,
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

  console.log(`✅ Seeded ${questionsLesson4.length} câu hỏi mới cho Bài 4`);
  console.log("\n🎉 Seed Bài 4 hoàn tất!");
}

main().catch(console.error);
