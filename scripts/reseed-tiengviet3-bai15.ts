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

const grammarTutorialBai15 = `### Bài 15: Thư viện (Trang 66 - 67)

#### 1. Bài đọc
**THƯ VIỆN**

Khi quay trở lại trường sau kì nghỉ, các bạn hò reo vui sướng vì phát hiện ra một điều tuyệt vời. Đối diện với dãy lớp học, một căn phòng mới đã biến thành thư viện. Bên trong căn phòng có rất nhiều giá chất đầy những quyển sách đủ màu sắc. Trong phòng còn có cả bàn và ghế để các bạn có thể ngồi đọc ngay tại đó nữa.

Thầy hiệu trưởng nói:

— Đây là thư viện của các em. Các em có thể đọc bất kì quyển sách nào có ở đây. Cứ thoải mái vào thư viện khi nào thấy thích. Nếu muốn, các em có thể mượn sách về nhà đọc. Nhưng đọc xong thì phải trả lại nhé. Nếu ở nhà có sách gì các em muốn bạn khác cùng đọc, hãy mang đến đây. Bây giờ thì đọc thật nhiều sách vào.

Thế là tất cả học sinh có mặt ở đó đều cùng vào thư viện. Các bạn sôi nổi chọn sách cho mình rồi mang ra bàn đọc. Nhưng bàn ghế chỉ đủ cho một nửa số học sinh. Những bạn còn lại đành phải đứng đọc. Quang cảnh thư viện lúc này hệt như một toa tàu điện đông đúc với những hành khách đứng ngồi để đọc sách, trông đến là ngộ.

Từ hôm đó, bạn nào đến trường cũng háo hức ghé vào thư viện. Ai cũng vui lắm.

*(Theo Tốt-tô-chan, cô bé bên cửa sổ)*

**Từ ngữ:** Tàu điện: một phương tiện giao thông công cộng, chạy bằng điện, chia thành nhiều toa.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Đến trường sau kì nghỉ, các bạn học sinh phát hiện ra điều gì tuyệt vời?** Một căn phòng mới đối diện dãy lớp học đã biến thành thư viện, có nhiều giá sách và bàn ghế để đọc.
2. **Thầy hiệu trưởng đã dặn các bạn học sinh làm những việc gì?** Thoải mái vào thư viện; có thể đọc bất kì quyển sách nào; mượn sách về đọc và trả lại; mang sách của mình đến thư viện để chia sẻ. (Không dặn: đọc sách theo lớp, phải ngồi ghế khi đọc sách — hai ý này sai.)
3. **Vì sao quang cảnh thư viện giống như một toa tàu điện đông đúc?** Vì bàn ghế chỉ đủ cho một nửa số học sinh, nên nhiều bạn phải đứng đọc, giống hành khách đứng ngồi lẫn lộn trên tàu điện.
4. **Các bạn học sinh cảm thấy thế nào khi có thư viện mới?** Vui sướng, háo hức — "bạn nào đến trường cũng háo hức ghé vào thư viện. Ai cũng vui lắm."
5. **Thư viện mơ ước:** học sinh tự do chia sẻ.`;

const questionsLesson15 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Đến trường sau kì nghỉ, các bạn học sinh phát hiện ra điều gì tuyệt vời?",
      options: [
        "A. Một sân chơi mới",
        "B. Một căn phòng mới đã biến thành thư viện",
        "C. Một bể bơi mới",
        "D. Một phòng máy tính mới"
      ],
      correct_index: 1,
      explanation: "'Đối diện với dãy lớp học, một căn phòng mới đã biến thành thư viện.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các ý sau vào đúng nhóm (Thầy hiệu trưởng có dặn / Thầy hiệu trưởng không dặn):",
      groups: [
        { name: "Thầy hiệu trưởng có dặn", items: ["thoải mái vào thư viện", "mượn sách về đọc và trả lại", "có thể đọc bất kì quyển sách nào", "mang sách của mình đến thư viện"] },
        { name: "Thầy hiệu trưởng không dặn", items: ["đọc sách theo lớp", "phải ngồi ghế khi đọc sách"] }
      ],
      explanation: "Thầy hiệu trưởng khuyến khích tự do đọc và mượn sách, không hề bắt buộc đọc theo lớp hay phải ngồi ghế."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao bạn nhỏ thấy quang cảnh thư viện trông giống như một toa tàu điện đông đúc?",
      options: [
        "A. Vì thư viện có hình dáng giống toa tàu",
        "B. Vì bàn ghế chỉ đủ cho một nửa số học sinh, nhiều bạn phải đứng đọc",
        "C. Vì có tiếng ồn ào như trên tàu điện",
        "D. Vì thư viện rất chật hẹp"
      ],
      correct_index: 1,
      explanation: "'Nhưng bàn ghế chỉ đủ cho một nửa số học sinh. Những bạn còn lại đành phải đứng đọc. Quang cảnh thư viện lúc này hệt như một toa tàu điện đông đúc.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Các bạn học sinh cảm thấy thế nào khi có thư viện mới?",
      options: ["A. Chán nản", "B. Háo hức, vui sướng", "C. Lo lắng", "D. Thờ ơ, không quan tâm"],
      correct_index: 1,
      explanation: "'Từ hôm đó, bạn nào đến trường cũng háo hức ghé vào thư viện. Ai cũng vui lắm.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Tàu điện là một phương tiện giao thông công cộng, chạy bằng điện, chia thành nhiều ", "."],
      correct_answers: ["toa"],
      word_pool: ["toa", "tầng", "khoang"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 15 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node15 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-15').single();
  if (!node15) { console.error("❌ Không tìm thấy node bai-15!"); return; }

  const { data: concept15 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_15',
    title: "Kiến thức Thư viện"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 66, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai15, concept_id: concept15?.id }
  }).eq('id', node15.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 15");

  if (concept15) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept15.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Thư viện%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 15";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node15.title}`, type: 'practice', metadata: { node_id: node15.id, concept_id: concept15?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node15.title}`, total_questions: questionsLesson15.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson15.length; i++) {
    const q = questionsLesson15[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept15?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson15.length} câu hỏi mới cho Bài 15`);
  console.log("\n🎉 Seed Bài 15 hoàn tất!");
}

main().catch(console.error);
