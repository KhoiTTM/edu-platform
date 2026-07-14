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

const grammarTutorialBai9 = `### Bài 9: Đi học vui sao (Trang 43 - 44)

#### 1. Bài đọc
**ĐI HỌC VUI SAO**

Sáng nay em đi học
Bình minh nắng xôn xao
Trong lành làn gió mát
Mơn man đôi má đào.

Lật từng trang sách mới
Chao ôi là thơm tho
Này đây là nương lúa
Dập dờn những cánh cò.

Bao nhiêu chuyện cổ tích
Cũng có trong sách hay
Cô dạy múa, dạy hát
Làm đồ chơi khéo tay.

Giờ ra chơi cùng bạn
Em náo nức nô đùa
Khi mệt lại túm tụm
Cùng vẽ tranh say sưa.

Tan học em ùa chạy
Đồng quê lúa chín vàng
Nhịp chân theo nhịp hát
Lòng em vui xốn xang.

*(Phạm Anh Xuân)*

**Từ ngữ:** Má đào: má hồng. Mơn man: lướt nhẹ trên bề mặt, tạo cảm giác dễ chịu. (Vui) xốn xang: một cảm xúc vui rạo rực trong lòng.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Bạn nhỏ đi học trong khung cảnh như thế nào?** Bình minh nắng xôn xao, làn gió mát trong lành mơn man đôi má.
2. **Những trang sách bạn nhỏ được học có gì thú vị?** Có hình ảnh nương lúa, những cánh cò dập dờn, và bao nhiêu chuyện cổ tích hay; cô còn dạy múa, dạy hát, làm đồ chơi khéo tay.
3. **Chi tiết thể hiện niềm vui trong giờ ra chơi:** náo nức nô đùa cùng bạn, khi mệt lại túm tụm cùng vẽ tranh say sưa.
4. **Cảm xúc của bạn nhỏ khi tan học:** vui xốn xang, chạy ùa ra giữa đồng quê lúa chín vàng, nhịp chân theo nhịp hát.
5. **Cảm xúc khi nghe tiếng trống tan trường:** học sinh tự do chia sẻ cảm nhận của bản thân.`;

const questionsLesson9 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Bạn nhỏ đi học trong khung cảnh như thế nào?",
      options: [
        "A. Trời mưa to, gió lạnh",
        "B. Bình minh nắng xôn xao, làn gió mát trong lành",
        "C. Trời tối, đường vắng",
        "D. Trời nắng gắt, oi bức"
      ],
      correct_index: 1,
      explanation: "'Sáng nay em đi học / Bình minh nắng xôn xao / Trong lành làn gió mát / Mơn man đôi má đào.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Những trang sách bạn nhỏ được học có gì thú vị?",
      options: [
        "A. Chỉ toàn chữ số",
        "B. Có hình ảnh nương lúa, cánh cò và bao chuyện cổ tích hay",
        "C. Không có gì đặc biệt",
        "D. Chỉ có bài tập khó"
      ],
      correct_index: 1,
      explanation: "'Này đây là nương lúa / Dập dờn những cánh cò' và 'Bao nhiêu chuyện cổ tích / Cũng có trong sách hay.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các hoạt động sau vào đúng thời điểm trong ngày học:",
      groups: [
        { name: "Giờ ra chơi", items: ["nô đùa cùng bạn", "túm tụm vẽ tranh khi mệt"] },
        { name: "Lúc tan học", items: ["chạy ùa ra đồng quê lúa chín vàng", "nhịp chân theo nhịp hát"] }
      ],
      explanation: "Bài thơ tả 5 thời điểm trong ngày học: đi học, học bài, ra chơi, và tan học."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Cảm xúc của bạn nhỏ khi tan học là gì?",
      options: [
        "A. Buồn vì phải xa trường",
        "B. Vui xốn xang, nhịp chân theo nhịp hát",
        "C. Mệt mỏi vì học nhiều",
        "D. Lo lắng về bài tập"
      ],
      correct_index: 1,
      explanation: "'Nhịp chân theo nhịp hát / Lòng em vui xốn xang.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Mơn man nghĩa là lướt nhẹ trên bề mặt, tạo cảm giác ", "."],
      correct_answers: ["dễ chịu"],
      word_pool: ["dễ chịu", "khó chịu", "đau đớn"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 9 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node9 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-9').single();
  if (!node9) { console.error("❌ Không tìm thấy node bai-9!"); return; }

  const { data: concept9 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_9',
    title: "Kiến thức Đi học vui sao"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 43, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai9, concept_id: concept9?.id }
  }).eq('id', node9.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 9");

  if (concept9) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept9.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Đi học vui sao%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 9";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node9.title}`, type: 'practice', metadata: { node_id: node9.id, concept_id: concept9?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node9.title}`, total_questions: questionsLesson9.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson9.length; i++) {
    const q = questionsLesson9[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept9?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson9.length} câu hỏi mới cho Bài 9`);
  console.log("\n🎉 Seed Bài 9 hoàn tất!");
}

main().catch(console.error);
