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

const grammarTutorialBai5 = `### Bài 5: Nhật kí tập bơi (Trang 26 - 28)

#### 1. Bài đọc
**NHẬT KÍ TẬP BƠI**

*Ngày… tháng…*

Hôm nay, mẹ đưa mình đi tập bơi. Mình rất phấn khích vì được mẹ chuẩn bị cho một chiếc mũ bơi cùng cặp kính bơi màu hồng rất đẹp. Cô giáo cũng khen đồ bơi của mình đáng yêu.

Đầu tiên, cô dạy mình tập thở. Nhưng khi thở dưới nước, mình toàn bị sặc. Mình sợ đến mức không dám xuống nước nữa. Mẹ bảo do mình chưa quen. Mẹ vỗ về, động viên mình mãi. Thế là mình tiếp tục tập luyện.

Cuối buổi, mình vẫn chưa thở dưới nước được. Mình thấy hơi buồn. Mình nghĩ lần sau, mình sẽ tập tốt hơn.

*Ngày… tháng…*

Hôm nay, mình đã có cảm giác thích đi bơi. Mình không còn bị sặc nữa. Mình đã quen thở dưới nước rồi.

Cô dạy mình động tác bơi ếch. Động tác đó thật lạ! Khi đạp chân, mình giống hệt như một con ếch ộp.

*Ngày… tháng…*

Học bơi chẳng dễ một chút nào. Thế mà mình đã biết bơi rồi. Mình như chú cá nhỏ tung tăng trong nước. Kể cũng lạ, hôm trước mình giống ếch, hôm nay mình lại giống cá. Chẳng sao, con nào cũng biết bơi mà. Giống như mình ấy.

*(Nguyễn Ngọc Mai Chi)*

**Từ ngữ:** *Phấn khích:* phấn khởi, hào hứng.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Bạn nhỏ đến bể bơi với ai? Bạn ấy được chuẩn bị những gì?** Bạn nhỏ đến bể bơi với mẹ, được mẹ chuẩn bị mũ bơi và cặp kính bơi màu hồng.
2. **Bạn nhỏ cảm thấy thế nào trong ngày đầu đến bể bơi?** Rất phấn khích lúc đầu, nhưng khi tập thở dưới nước thì bị sặc, sợ hãi, và cuối buổi thấy hơi buồn vì chưa thở được dưới nước.
3. **Kể lại việc học bơi:** Ngày đầu tập thở, bị sặc nước; những ngày sau quen dần, học động tác bơi ếch; cuối cùng biết bơi, bơi tung tăng như cá nhỏ.
4. **Bạn nhỏ nhận ra điều gì thú vị khi biết bơi?** Nhận ra học bơi tuy khó nhưng mình đã làm được — từ giống con ếch khi tập đạp chân, đến giống con cá khi đã biết bơi thành thạo.
5. **Việc học bơi dễ hay khó?** Theo bài đọc, học bơi không dễ (bạn nhỏ từng bị sặc nước, sợ hãi) nhưng nếu kiên trì tập luyện thì sẽ làm được.

---

#### 3. Chính tả: Phân biệt âm ng/ngh
Quy tắc: âm **ngh** chỉ đứng trước các nguyên âm **i, e, ê** (ví dụ: *nghe, nghĩ, nghỉ*); âm **ng** đứng trước các nguyên âm còn lại (ví dụ: *ngủ, ngon, ngoan*).`;

const questionsLesson5 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Bạn nhỏ đến bể bơi cùng ai?",
      options: ["A. Bố", "B. Mẹ", "C. Ông", "D. Bạn cùng lớp"],
      correct_index: 1,
      explanation: "'Hôm nay, mẹ đưa mình đi tập bơi.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Trong ngày đầu tập bơi, bạn nhỏ gặp khó khăn gì?",
      options: [
        "A. Bị sặc nước khi tập thở dưới nước",
        "B. Không có mũ bơi",
        "C. Bị lạnh",
        "D. Không thích cô giáo"
      ],
      correct_index: 0,
      explanation: "'Nhưng khi thở dưới nước, mình toàn bị sặc. Mình sợ đến mức không dám xuống nước nữa.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Ai đã động viên bạn nhỏ tiếp tục tập luyện khi bị sặc nước?",
      options: ["A. Cô giáo", "B. Mẹ", "C. Bạn cùng lớp", "D. Không ai cả"],
      correct_index: 1,
      explanation: "'Mẹ vỗ về, động viên mình mãi. Thế là mình tiếp tục tập luyện.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các sự việc sau vào đúng giai đoạn tập bơi:",
      groups: [
        { name: "Ngày đầu tiên", items: ["bị sặc nước", "chưa thở được dưới nước", "cảm thấy hơi buồn"] },
        { name: "Những ngày sau", items: ["học động tác bơi ếch", "biết bơi như cá nhỏ tung tăng trong nước"] }
      ],
      explanation: "Bài nhật kí ghi lại 3 buổi tập bơi với tiến bộ dần qua từng ngày."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Phấn khích nghĩa là phấn khởi, ", "."],
      correct_answers: ["hào hứng"],
      word_pool: ["hào hứng", "lo lắng", "buồn bã"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 5 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found!");
    return;
  }

  const { data: node5 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-5')
    .single();

  if (!node5) {
    console.error("❌ Không tìm thấy node bai-5!");
    return;
  }

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 26, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai5 }
  }).eq('id', node5.id);

  console.log("✅ Đã cập nhật grammar_tutorial cho Bài 5");

  const concept5Slug = `concept-tv3-bai_5`;
  const { data: concept5 } = await supabase.from('concepts').upsert({
    slug: concept5Slug,
    title: "Kiến thức Nhật kí tập bơi"
  }, { onConflict: 'slug' }).select().single();

  if (concept5) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept5.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Nhật kí tập bơi%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 5";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node5.title}`,
    type: 'practice',
    metadata: { node_id: node5.id, concept_id: concept5?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id,
    title: `Bài đánh giá: ${node5.title}`,
    total_questions: questionsLesson5.length,
    generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson5.length; i++) {
    const q = questionsLesson5[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept5?.id,
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

  console.log(`✅ Seeded ${questionsLesson5.length} câu hỏi mới cho Bài 5`);
  console.log("\n🎉 Seed Bài 5 hoàn tất!");
}

main().catch(console.error);
