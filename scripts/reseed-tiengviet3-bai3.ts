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

const grammarTutorialBai3 = `### Bài 3: Cánh rừng trong nắng (Trang 17 - 20)

#### 1. Bài đọc
**CÁNH RỪNG TRONG NẮNG**

Làng tôi ở lưng Trường Sơn, giữa vùng núi non trùng điệp. Một lần, tôi và mấy đứa bạn được ông tôi cho đi thăm rừng. Đứa nào cũng vui.

Hôm đó là một ngày nắng ráo. Ông đưa cho mỗi đứa một tàu lá cọ che nắng. Chưa hết mùa mưa, đâu đâu cũng thấy cây ra thêm chồi và cỏ mọc xanh um. Đi trong rừng, nghe rất rõ tiếng suối róc rách và tiếng chim hót líu lo.

Mặt trời chiếu những luồng sáng qua kẽ lá. Cây cối vươn ngọn lên cao tít đón nắng. Nhiều cây thân thẳng tắp, tán lá tròn xoe. Những con sóc nâu cong đuôi nhảy thoăn thoắt qua các cành cây. Thấy có người đi tới, chúng dừng cả lại, nhìn ngơ ngác.

Khi nắng đã nhạt màu trên những vòm cây, chúng tôi ra về trong tiếc nuối. Trên đường, ông kể về những cánh rừng thuở xưa. Biết bao cảnh sắc như hiện ra trước mắt chúng tôi: bầy vượn tinh nghịch đánh đu trên cành cao, đàn hươu nai xinh đẹp và hiền lành rủ nhau ra suối, những vạt cỏ đẫm sương long lanh trong nắng.

*(Vũ Hùng)*

**Từ ngữ:** *Trùng điệp:* nối nhau liên tiếp như không bao giờ hết.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Khi đi trong rừng, các bạn nhỏ nghe thấy những âm thanh gì?** Tiếng suối róc rách và tiếng chim hót líu lo.
2. **Cây cối và con vật trong rừng được tả như thế nào?** Cây cối vươn ngọn lên cao tít đón nắng, nhiều cây thân thẳng tắp, tán lá tròn xoe; những con sóc nâu cong đuôi nhảy thoăn thoắt qua các cành cây, khi thấy người thì dừng lại nhìn ngơ ngác.
3. **Trên đường về, ông đã kể những gì cho các bạn nhỏ?** Ông kể về những cánh rừng thuở xưa: bầy vượn tinh nghịch đánh đu trên cành cao, đàn hươu nai xinh đẹp hiền lành rủ nhau ra suối, những vạt cỏ đẫm sương long lanh trong nắng.
4. **Các bạn nhỏ có thấy thú vị với chuyến đi thăm rừng cùng ông không? Vì sao?** Có, vì các bạn được ngắm cảnh rừng đẹp, nghe âm thanh của thiên nhiên, thấy các con vật đáng yêu, và được nghe ông kể chuyện về rừng xưa nên "ra về trong tiếc nuối".

---

#### 3. Chính tả: Phân biệt âm g/gh
Quy tắc: âm **gh** chỉ đứng trước các nguyên âm **i, e, ê** (ví dụ: *ghi, ghế, ghê*); âm **g** đứng trước các nguyên âm còn lại (ví dụ: *gà, gấu, gỗ*).

Ví dụ từ vườn thú: báo gấm, gấu, gà lôi, gà rừng.`;

const questionsLesson3 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Khi đi trong rừng, các bạn nhỏ nghe thấy những âm thanh gì?",
      options: [
        "A. Tiếng xe cộ và tiếng còi tàu",
        "B. Tiếng suối róc rách và tiếng chim hót líu lo",
        "C. Tiếng nhạc và tiếng trống",
        "D. Tiếng gió và tiếng sấm"
      ],
      correct_index: 1,
      explanation: "'Đi trong rừng, nghe rất rõ tiếng suối róc rách và tiếng chim hót líu lo.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Những con sóc nâu trong bài được tả như thế nào?",
      options: [
        "A. Nằm im ngủ trên cành cây",
        "B. Cong đuôi nhảy thoăn thoắt qua các cành cây",
        "C. Chạy trốn xuống đất",
        "D. Kêu inh ỏi trên ngọn cây"
      ],
      correct_index: 1,
      explanation: "'Những con sóc nâu cong đuôi nhảy thoăn thoắt qua các cành cây.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các hình ảnh sau vào đúng thời điểm trong bài:",
      groups: [
        { name: "Hiện tại (chuyến đi thăm rừng)", items: ["sóc nâu nhảy trên cành", "tiếng suối róc rách", "tiếng chim hót"] },
        { name: "Quá khứ (ông kể về rừng xưa)", items: ["bầy vượn đánh đu trên cành cao", "đàn hươu nai ra suối"] }
      ],
      explanation: "Đoạn cuối bài là lời ông kể lại cảnh rừng thuở xưa, khác với cảnh các bạn nhỏ trực tiếp chứng kiến."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Trên đường về, ông đã kể cho các bạn nhỏ nghe điều gì?",
      options: [
        "A. Kể về những cánh rừng thuở xưa",
        "B. Kể về thành phố nơi ông từng sống",
        "C. Kể về công việc của ông",
        "D. Kể về một câu chuyện cổ tích khác"
      ],
      correct_index: 0,
      explanation: "'Trên đường, ông kể về những cánh rừng thuở xưa.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền vào chỗ trống để hoàn thành quy tắc chính tả âm g/gh:",
      text_segments: [
        "Âm ",
        " đứng trước các nguyên âm i, e, ê (ví dụ: ghế, ghi); âm ",
        " đứng trước các nguyên âm còn lại (ví dụ: gà, gấu)."
      ],
      correct_answers: ["gh", "g"],
      word_pool: ["gh", "g", "ng", "ngh"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 3 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found!");
    return;
  }

  const { data: node3 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-3')
    .single();

  if (!node3) {
    console.error("❌ Không tìm thấy node bai-3!");
    return;
  }

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 17, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai3 }
  }).eq('id', node3.id);

  console.log("✅ Đã cập nhật grammar_tutorial cho Bài 3");

  const concept3Slug = `concept-tv3-bai_3`;
  const { data: concept3 } = await supabase.from('concepts').upsert({
    slug: concept3Slug,
    title: "Kiến thức Cánh rừng trong nắng"
  }, { onConflict: 'slug' }).select().single();

  // Xóa câu hỏi cũ (nếu chạy lại)
  if (concept3) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept3.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Cánh rừng trong nắng%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 3";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node3.title}`,
    type: 'practice',
    metadata: { node_id: node3.id, concept_id: concept3?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id,
    title: `Bài đánh giá: ${node3.title}`,
    total_questions: questionsLesson3.length,
    generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson3.length; i++) {
    const q = questionsLesson3[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept3?.id,
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

  console.log(`✅ Seeded ${questionsLesson3.length} câu hỏi mới cho Bài 3`);
  console.log("\n🎉 Seed Bài 3 hoàn tất!");
}

main().catch(console.error);
