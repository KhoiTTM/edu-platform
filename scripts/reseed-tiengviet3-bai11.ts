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

const grammarTutorialBai11 = `### Bài 11: Lời giải toán đặc biệt (Trang 50 - 51)

#### 1. Bài đọc
**LỜI GIẢI TOÁN ĐẶC BIỆT**

Đề toán: "Vừa gà vừa chó / Tất cả 4 con / Bó lại cho tròn / 10 chân vừa đủ. / Xin được hỏi nhỏ / Mỗi loại mấy con?"

Vích-to Huy-gô bộc lộ tài năng thơ ca của mình từ rất sớm. Hồi còn là học sinh tiểu học, cậu học chăm, thông minh, giỏi đều các môn.

Một lần, vào giờ kiểm tra Toán cuối năm, trong khi các bạn khác mải miết làm bài thì không hiểu sao Huy-gô lại ngồi cắn bút từ đầu giờ. Thầy giáo cũng sốt ruột thay cho học trò của mình. Chỉ còn hai mươi phút nữa là phải nộp bài. Các bạn xung quanh đã có người làm xong, thế mà Huy-gô vẫn ngồi cắn bút, hai tai đỏ nhừ. Thầy giáo lại giơ đồng hồ ra xem và nhìn Huy-gô. Còn mười lăm phút nữa. Lúc này, Huy-gô bắt đầu đặt bút viết. Thầy giáo thở phào. Nhưng liệu có kịp không nhỉ? Ông lo lắng thay cho Huy-gô.

Huy-gô mải miết viết và may thay, khi tiếng trống báo hết giờ vang lên thì cậu cũng viết xong đáp số và mang bài lên nộp. Thầy giáo liếc nhìn bài của Huy-gô. Đáp số đúng rồi! Chợt thầy reo lên:

— Lời giải bài toán được viết bằng thơ! À, ra thế!

Sau này, Vích-to Huy-gô đã trở thành nhà văn, nhà thơ, nhà viết kịch nổi tiếng thế giới.

*(Theo Kể chuyện danh nhân thế giới)*

**Từ ngữ:** Thở phào: thở ra một hơi dài vẻ khoan khoái, nhẹ nhõm vì đã trút được điều lo lắng trong lòng.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Huy-gô đã bộc lộ năng khiếu gì từ rất sớm?** Tài năng thơ ca.
2. **Vì sao thầy giáo rất lo lắng cho Huy-gô?** Vì Huy-gô ngồi cắn bút không viết trong khi thời gian làm bài sắp hết.
3. **Vì sao thầy giáo reo lên khi xem bài của Huy-gô?** Vì lời giải bài toán được Huy-gô viết bằng thơ (đáp án c).
4. **Qua giờ kiểm tra Toán, Huy-gô là người thế nào?** Thông minh, sáng tạo, có tài năng thơ ca đặc biệt — biết vận dụng năng khiếu của mình để giải quyết vấn đề theo cách riêng.`;

const questionsLesson11 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vích-to Huy-gô đã bộc lộ năng khiếu gì từ rất sớm?",
      options: ["A. Năng khiếu vẽ tranh", "B. Tài năng thơ ca", "C. Năng khiếu âm nhạc", "D. Tài năng thể thao"],
      correct_index: 1,
      explanation: "'Vích-to Huy-gô bộc lộ tài năng thơ ca của mình từ rất sớm.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Trong giờ kiểm tra Toán, vì sao thầy giáo lại rất lo lắng cho Huy-gô?",
      options: [
        "A. Vì Huy-gô làm bài nhanh nhất lớp",
        "B. Vì Huy-gô ngồi cắn bút không viết trong khi thời gian sắp hết",
        "C. Vì Huy-gô làm ồn trong lớp",
        "D. Vì Huy-gô không mang bút"
      ],
      correct_index: 1,
      explanation: "'Chỉ còn hai mươi phút nữa là phải nộp bài... Huy-gô vẫn ngồi cắn bút, hai tai đỏ nhừ.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao thầy giáo lại reo lên khi xem bài của Huy-gô?",
      options: ["A. Vì Huy-gô nộp bài đúng giờ", "B. Vì Huy-gô làm đúng đáp số", "C. Vì lời giải toán được Huy-gô viết bằng thơ"],
      correct_index: 2,
      explanation: "'— Lời giải bài toán được viết bằng thơ! À, ra thế!'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các chi tiết sau vào đúng giai đoạn của câu chuyện:",
      groups: [
        { name: "Trong lúc làm bài", items: ["ngồi cắn bút từ đầu giờ", "hai tai đỏ nhừ", "bắt đầu viết khi còn 15 phút"] },
        { name: "Khi nộp bài", items: ["viết xong đáp số đúng lúc tiếng trống vang lên", "đáp số đúng", "lời giải viết bằng thơ"] }
      ],
      explanation: "Câu chuyện diễn ra theo 2 giai đoạn: quá trình Huy-gô làm bài và kết quả khi nộp bài."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Thở phào nghĩa là thở ra một hơi dài vẻ khoan khoái, ", " vì đã trút được điều lo lắng trong lòng."],
      correct_answers: ["nhẹ nhõm"],
      word_pool: ["nhẹ nhõm", "buồn bã", "tức giận"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 11 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node11 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-11').single();
  if (!node11) { console.error("❌ Không tìm thấy node bai-11!"); return; }

  const { data: concept11 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_11',
    title: "Kiến thức Lời giải toán đặc biệt"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 50, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai11, concept_id: concept11?.id }
  }).eq('id', node11.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 11");

  if (concept11) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept11.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Lời giải toán đặc biệt%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 11";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node11.title}`, type: 'practice', metadata: { node_id: node11.id, concept_id: concept11?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node11.title}`, total_questions: questionsLesson11.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson11.length; i++) {
    const q = questionsLesson11[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept11?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson11.length} câu hỏi mới cho Bài 11`);
  console.log("\n🎉 Seed Bài 11 hoàn tất!");
}

main().catch(console.error);
