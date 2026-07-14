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

const grammarTutorialBai14 = `### Bài 14: Cuộc họp của chữ viết (Trang 62 - 63)

#### 1. Bài đọc
**CUỘC HỌP CỦA CHỮ VIẾT**

Vừa tan học, các chữ cái và dấu câu đã ngồi lại họp. Bác chữ A dõng dạc mở đầu:

— Thưa các bạn! Hôm nay, chúng ta họp để tìm cách giúp đỡ em Hoàng. Hoàng hoàn toàn không biết chấm câu. Có đoạn văn em viết thế này: "Chú lính bước vào đầu chú. Đội chiếc mũ sắt dưới chân. Đi đôi giày da trên trán lấm tấm mồ hôi.".

Có tiếng xì xào:

— Thế nghĩa là gì nhỉ?

— Nghĩa là thế này: "Chú lính bước vào. Đầu chú đội chiếc mũ sắt. Dưới chân đi đôi giày da. Trên trán lấm tấm mồ hôi.".

Tiếng cười rộ lên. Dấu chấm nói:

— Theo tôi, tất cả là do cậu này chẳng bao giờ để ý đến dấu câu. Mỏi tay chỗ nào, cậu ta chấm chỗ ấy.

Cả mấy dấu câu đều lắc đầu:

— Ẩu thế nhỉ!

Bác chữ A đề nghị:

— Từ nay, mỗi khi em Hoàng định chấm câu, anh dấu chấm cần yêu cầu Hoàng đọc lại nội dung câu văn một lần nữa đã. Được không nào?

*(Phỏng theo Trần Ninh Hồ)*

**Từ ngữ:** Dõng dạc: mạnh mẽ, rõ ràng và chững chạc. Lấm tấm: có nhiều hạt nhỏ trên bề mặt.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Câu chuyện kể về cuộc họp của những ai?** Các chữ cái và dấu câu.
2. **Cuộc họp đó bàn về chuyện gì?** Tìm cách giúp đỡ em Hoàng vì Hoàng hoàn toàn không biết chấm câu.
3. **Vì sao không ai hiểu những điều Hoàng đã viết?** Vì Hoàng chấm câu tùy tiện — "mỏi tay chỗ nào, cậu ta chấm chỗ ấy" — khiến câu văn sai nghĩa, gây khó hiểu.
4. **Các bước Hoàng cần thực hiện (theo lời đề nghị của bác chữ A):** c. Viết câu → a. Đọc lại câu → b. Chấm câu.
5. **Góp ý giúp bạn Hoàng viết đúng:** học sinh tự do đề xuất (ví dụ: đọc kỹ câu văn trước khi chấm câu, chấm câu ở chỗ ý đã trọn vẹn, không chấm tùy tiện theo cảm giác).`;

const questionsLesson14 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Câu chuyện kể về cuộc họp của những ai?",
      options: ["A. Các bạn học sinh", "B. Các chữ cái và dấu câu", "C. Các thầy cô giáo", "D. Các con vật"],
      correct_index: 1,
      explanation: "'Vừa tan học, các chữ cái và dấu câu đã ngồi lại họp.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Cuộc họp đó bàn về chuyện gì?",
      options: [
        "A. Bàn về việc học môn Toán",
        "B. Tìm cách giúp đỡ em Hoàng vì Hoàng không biết chấm câu",
        "C. Bàn về kì nghỉ hè",
        "D. Bàn về việc trang trí lớp học"
      ],
      correct_index: 1,
      explanation: "'Hôm nay, chúng ta họp để tìm cách giúp đỡ em Hoàng. Hoàng hoàn toàn không biết chấm câu.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao không ai hiểu những điều Hoàng đã viết?",
      options: [
        "A. Vì chữ viết của Hoàng quá xấu",
        "B. Vì Hoàng chấm câu tùy tiện, mỏi tay chỗ nào chấm chỗ ấy",
        "C. Vì Hoàng viết bằng tiếng nước ngoài",
        "D. Vì bài văn quá ngắn"
      ],
      correct_index: 1,
      explanation: "'Theo tôi, tất cả là do cậu này chẳng bao giờ để ý đến dấu câu. Mỏi tay chỗ nào, cậu ta chấm chỗ ấy.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Sắp xếp các bước theo đúng thứ tự bác chữ A đề nghị (đánh số 1, 2, 3):",
      groups: [
        { name: "Bước 1", items: ["Viết câu"] },
        { name: "Bước 2", items: ["Đọc lại câu"] },
        { name: "Bước 3", items: ["Chấm câu"] }
      ],
      explanation: "'Mỗi khi em Hoàng định chấm câu, anh dấu chấm cần yêu cầu Hoàng đọc lại nội dung câu văn một lần nữa đã.' — tức là viết câu, đọc lại, rồi mới chấm câu."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Dõng dạc nghĩa là mạnh mẽ, rõ ràng và ", "."],
      correct_answers: ["chững chạc"],
      word_pool: ["chững chạc", "nhỏ nhẹ", "lo lắng"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 14 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node14 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-14').single();
  if (!node14) { console.error("❌ Không tìm thấy node bai-14!"); return; }

  const { data: concept14 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_14',
    title: "Kiến thức Cuộc họp của chữ viết"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 62, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai14, concept_id: concept14?.id }
  }).eq('id', node14.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 14");

  if (concept14) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept14.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Cuộc họp của chữ viết%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 14";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node14.title}`, type: 'practice', metadata: { node_id: node14.id, concept_id: concept14?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node14.title}`, total_questions: questionsLesson14.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson14.length; i++) {
    const q = questionsLesson14[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept14?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson14.length} câu hỏi mới cho Bài 14`);
  console.log("\n🎉 Seed Bài 14 hoàn tất!");
}

main().catch(console.error);
