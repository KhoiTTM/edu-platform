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

const grammarTutorialBai1 = `### Bài 1: Ngày gặp lại (Trang 10 - 12)

#### 1. Bài đọc
**NGÀY GẶP LẠI**

Chi mở tung cửa sổ đón những tia nắng đầu thu. Thế là hết hè rồi. Ngày mai bắt đầu năm học mới.

Có tiếng gọi ngoài cổng. Chi nhìn ra, thấy Sơn giơ chiếc diều rất xinh, vẫy rối rít:
– Cho cậu này.

Chi mừng rỡ chạy ra. Sơn về quê từ đầu hè, giờ gặp lại, hai bạn có bao nhiêu chuyện. Sơn kể ở quê, cậu được theo ông bà đi trồng rau, câu cá. Chiều chiều, cậu thường cùng bạn thả diều. Khi diều lên cao, cậu nằm lăn ra bãi cỏ ngắm trời. Cánh diều đứng im như ngủ thiếp đi trên bầu trời xanh.

Nhìn Sơn đen nhẻm, mắt lấp lánh khi kể chuyện, Chi chợt thấy buồn:
– Tớ chẳng được đi đâu.
– Nhưng mẹ tớ bảo cậu biết đi xe đạp rồi.
– Ừ, tớ ở nhà tập xe thôi.
– Thế cậu được đạp xe đi khắp nơi mà.

Chi cười:
– Ừ nhỉ.

Thế là Chi kể bố dạy Chi đi xe đạp. Bây giờ, Chi đã đạp xe bon bon. Con đường quen thuộc bỗng trở nên mới mẻ.

Cứ như vậy, hai bạn thi nhau kể những trải nghiệm mùa hè. Ngày mai đi học rồi, nhưng mùa hè chắc sẽ theo các bạn vào lớp học.

*(Minh Dương)*

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Tìm những chi tiết thể hiện niềm vui khi gặp lại nhau của Chi và Sơn:** Sơn giơ chiếc diều rất xinh, vẫy rối rít gọi "Cho cậu này"; Chi mừng rỡ chạy ra; hai bạn có bao nhiêu chuyện để kể cho nhau nghe.
2. **Trải nghiệm của Sơn trong mùa hè:** được theo ông bà đi trồng rau, câu cá; chiều chiều cùng bạn thả diều, nằm lăn ra bãi cỏ ngắm trời khi diều lên cao.
3. **Khác biệt trải nghiệm của Chi và Sơn:** Sơn về quê chơi, trải nghiệm thiên nhiên (trồng rau, câu cá, thả diều); còn Chi ở nhà tập đi xe đạp, được bố dạy và giờ đã đạp xe thành thạo.
4. **Vì sao mùa hè sẽ theo các bạn vào lớp học:** vì các bạn sẽ kể cho nhau nghe những chuyện về mùa hè.

---

#### 3. Chính tả: Phân biệt âm c/k
Quy tắc: âm **k** chỉ đứng trước các nguyên âm **i, e, ê** (ví dụ: *kính, kéo, kiên trì*); âm **c** đứng trước các nguyên âm còn lại (ví dụ: *cá, cỏ, cây, cửa*).

*   **✓ Đúng:** con kiến, cái kéo — **✗ Sai:** con ciến, cái kéo viết là "céo"
*   **✓ Đúng:** cái ca, cây cối — **✗ Sai:** cái ka

#### 4. Từ ngữ
*   **Trải nghiệm:** những điều đã qua, đã trực tiếp làm, giúp tích lũy hiểu biết và kinh nghiệm sống.
*   **Bon bon:** xe chạy rất nhanh và êm nhẹ.`;

const grammarTutorialBai2 = `### Bài 2: Về thăm quê (Trang 13 - 15)

#### 1. Bài đọc
**VỀ THĂM QUÊ** *(Trích)*

Nghỉ hè em thích nhất
Được theo mẹ về quê
Bà em cũng mừng ghê
Khi thấy em vào ngõ.

Mảnh vườn quê bé nhỏ
Bao nhiêu là thứ cây
Bà mỗi năm mỗi gầy
Chắc bà luôn vất vả.

Vườn bà có nhiều quả
Chẳng mấy lúc bà ăn
Bà bảo thích để dành
Cho cháu về ra hái.

Em mồ hôi nhễ nhại
Bà theo quạt liền tay.
Từ tay bà gió đến
Thơm bao hương quả vườn
Thoáng nghe bà kể chuyện
Gió thơm say chập chờn.

*(Xuân Hoài)*

**Từ ngữ:** *Chập chờn:* ở trạng thái nửa ngủ nửa thức.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Bạn nhỏ thích nhất điều gì khi nghỉ hè?** Được theo mẹ về quê.
2. **Hai câu thơ "Bà em cũng mừng ghê / Khi thấy em vào ngõ" và "Bà mỗi năm mỗi gầy / Chắc bà luôn vất vả" giúp em hiểu gì về bạn nhỏ?** Bạn nhỏ rất tinh tế, quan tâm và thương bà — nhận ra bà vui khi cháu về, và lo lắng vì bà ngày càng gầy do vất vả.
3. **Những việc làm nói lên tình yêu thương của bà dành cho cháu:** để dành quả chín trong vườn cho cháu về hái; quạt cho cháu liên tay khi cháu đổ mồ hôi; kể chuyện cho cháu nghe.
4. **Vì sao bạn nhỏ thấy vui thích trong kì nghỉ hè ở quê?** Vì được ở bên bà, cảm nhận tình yêu thương ấm áp của bà, được sống giữa khu vườn nhiều cây trái và nghe bà kể chuyện.

---

#### 3. Luyện tập: Từ chỉ sự vật, từ chỉ hoạt động
Dựa vào tranh cảnh đồng quê: bác nông dân — gặt lúa; con trâu — gặm cỏ.

**Câu giới thiệu (mẫu):** Các cô bác nông dân là những người làm ra lúa gạo.
**Câu nêu hoạt động (mẫu):** Các cô bác nông dân đang gặt lúa.

#### 4. Ghép câu
Chim chóc — đua nhau hót trong vòm cây.
Bầy ong — bay đi tìm hoa.
Đàn cá — bơi dưới hồ nước.`;

const questionsLesson1 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chi tiết nào cho thấy Sơn rất vui khi gặp lại Chi?",
      options: [
        "A. Sơn giơ chiếc diều rất xinh, vẫy rối rít gọi Chi",
        "B. Sơn im lặng không nói gì",
        "C. Sơn buồn vì phải xa quê",
        "D. Sơn vội vàng về nhà ngay"
      ],
      correct_index: 0,
      explanation: "Trong bài đọc: 'Chi nhìn ra, thấy Sơn giơ chiếc diều rất xinh, vẫy rối rít: – Cho cậu này.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Trong mùa hè, Sơn đã có những trải nghiệm gì ở quê?",
      options: [
        "A. Đi bơi ở biển",
        "B. Theo ông bà trồng rau, câu cá, thả diều",
        "C. Đi học thêm cả mùa hè",
        "D. Ở nhà xem ti vi"
      ],
      correct_index: 1,
      explanation: "'Sơn kể ở quê, cậu được theo ông bà đi trồng rau, câu cá. Chiều chiều, cậu thường cùng bạn thả diều.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các trải nghiệm mùa hè vào đúng bạn nhỏ:",
      groups: [
        { name: "Sơn", items: ["trồng rau", "câu cá", "thả diều"] },
        { name: "Chi", items: ["tập đi xe đạp", "đạp xe bon bon trên đường quen thuộc"] }
      ],
      explanation: "Sơn về quê trải nghiệm thiên nhiên; Chi ở nhà tập xe đạp và giờ đã đạp xe thành thạo."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Theo em, vì sao khi đi học, mùa hè sẽ theo các bạn vào lớp?",
      options: [
        "A. Vì các bạn vẫn nhớ những chuyện về mùa hè",
        "B. Vì các bạn sẽ kể cho nhau nghe những chuyện về mùa hè",
        "C. Vì các bạn sẽ mang đồ vật kỉ niệm mùa hè đến lớp",
        "D. Vì mùa hè chưa kết thúc hẳn"
      ],
      correct_index: 1,
      explanation: "Đây là câu hỏi mở trong sách với 3 lựa chọn gợi ý (a, b, c); lựa chọn hợp lý nhất là các bạn sẽ kể cho nhau nghe những chuyện về mùa hè."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền vào chỗ trống để hoàn thành quy tắc chính tả âm c/k:",
      text_segments: [
        "Âm ",
        " chỉ đứng trước các nguyên âm i, e, ê (ví dụ: kính, kéo); âm ",
        " đứng trước các nguyên âm còn lại (ví dụ: cây, cửa)."
      ],
      correct_answers: ["k", "c"],
      word_pool: ["k", "c", "g", "ngh"]
    }
  }
];

const questionsLesson2 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Bạn nhỏ trong bài thơ thích nhất điều gì khi nghỉ hè?",
      options: [
        "A. Được đi du lịch biển",
        "B. Được theo mẹ về quê",
        "C. Được nghỉ học ở nhà",
        "D. Được đi chơi công viên"
      ],
      correct_index: 1,
      explanation: "'Nghỉ hè em thích nhất / Được theo mẹ về quê.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chi tiết nào cho thấy bà rất yêu thương cháu?",
      options: [
        "A. Bà để dành quả chín trong vườn cho cháu về hái",
        "B. Bà không ra đón cháu",
        "C. Bà nhờ người khác trông cháu",
        "D. Bà giấu quả không cho cháu ăn"
      ],
      correct_index: 0,
      explanation: "'Bà bảo thích để dành / Cho cháu về ra hái.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các từ sau vào đúng nhóm từ loại:",
      groups: [
        { name: "Từ chỉ sự vật", items: ["bà", "mảnh vườn", "quả", "con trâu"] },
        { name: "Từ chỉ hoạt động", items: ["về quê", "quạt tay", "kể chuyện", "gặt lúa"] }
      ],
      explanation: "Từ chỉ sự vật gọi tên người, vật, cây cối, địa điểm. Từ chỉ hoạt động mô tả hành động, cử chỉ vận động."
    }
  },
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối cột A với cột B để tạo câu đúng theo bài đọc:",
      pairs: [
        { left: "Chim chóc", right: "đua nhau hót trong vòm cây" },
        { left: "Bầy ong", right: "bay đi tìm hoa" },
        { left: "Đàn cá", right: "bơi dưới hồ nước" }
      ],
      explanation: "Đây là các câu ghép từ bài tập Luyện tập trang 15."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Từ 'chập chờn' trong bài thơ có nghĩa là gì?",
      options: [
        "A. Rất vui vẻ, náo nhiệt",
        "B. Ở trạng thái nửa ngủ nửa thức",
        "C. Chạy nhảy liên tục",
        "D. Buồn bã, lặng lẽ"
      ],
      correct_index: 1,
      explanation: "Chú thích từ ngữ trong sách: 'Chập chờn: ở trạng thái nửa ngủ nửa thức.'"
    }
  }
];

async function main() {
  console.log("🚀 Reseeding Bài 1 & Bài 2 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found!");
    return;
  }

  const { data: node1 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-1')
    .single();

  const { data: node2 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-2')
    .single();

  if (!node1 || !node2) {
    console.error("❌ Không tìm thấy node bai-1 hoặc bai-2!");
    return;
  }

  // Update grammar_tutorial
  await supabase.from('curriculum_nodes').update({
    metadata: { page: 10, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai1 }
  }).eq('id', node1.id);

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 13, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai2 }
  }).eq('id', node2.id);

  console.log("✅ Đã cập nhật grammar_tutorial cho Bài 1 & 2");

  // Get concepts
  const { data: concept1 } = await supabase.from('concepts').select('id').eq('slug', 'concept-tv3-bai_1').single();
  const { data: concept2 } = await supabase.from('concepts').select('id').eq('slug', 'concept-tv3-bai_2').single();

  // Delete old question_bank rows tied to these concepts (cascade via junction tables first)
  for (const concept of [concept1, concept2]) {
    if (!concept) continue;
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ (concept ${concept.id})`);
    }
  }

  // Delete old exercise_sets / exams for these lessons
  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Ngày gặp lại%');
  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Về thăm quê%');

  const col1Title = "Tiếng Việt 3 - Luyện tập Bài 1 & 2";
  await supabase.from('assessment_collections').delete().eq('title', col1Title);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: col1Title,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  const seedSet = async (questions: any[], node: any, concept: any) => {
    const { data: exSet } = await supabase.from('exercise_sets').upsert({
      title: `Luyện tập: ${node.title}`,
      type: 'practice',
      metadata: { node_id: node.id, concept_id: concept?.id }
    }, { onConflict: 'title' }).select().single();

    const { data: exam } = await supabase.from('exams').insert({
      collection_id: collection.id,
      title: `Bài đánh giá: ${node.title}`,
      total_questions: questions.length,
      generation_mode: 'balanced'
    }).select().single();

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const { data: qb } = await supabase.from('question_bank').insert({
        concept_id: concept?.id,
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
    console.log(`✅ Seeded ${questions.length} câu hỏi mới cho ${node.title}`);
  };

  if (node1 && concept1) await seedSet(questionsLesson1, node1, concept1);
  if (node2 && concept2) await seedSet(questionsLesson2, node2, concept2);

  console.log("\n🎉 Reseed Bài 1 & 2 hoàn tất!");
}

main().catch(console.error);
