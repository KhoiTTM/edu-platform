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

const grammarTutorialBai16 = `### Bài 16: Ngày em vào Đội (Trang 70 - 71)

#### 1. Bài đọc
**NGÀY EM VÀO ĐỘI**

Chị đã qua tuổi Đoàn
Em hôm nay vào Đội
Màu khăn đỏ dắt em
Bước qua thời thơ dại.

Màu khăn tuổi thiếu niên
Suốt đời tươi thắm mãi
Như lời ru vời vợi
Chẳng bao giờ cách xa.

Này em, mở cửa ra
Một trời xanh vẫn đợi
Cánh buồm là tiếng gọi
Mặt biển và dòng sông.

Nắng vườn trưa mênh mông
Bướm bay như lời hát
Con tàu là đất nước
Đưa ta tới bến xa.

Những ngày chị đi qua
Những ngày em đang tới
Khao khát lại bắt đầu
Từ màu khăn đỏ chói.

*(Xuân Quỳnh)*

**Từ ngữ:** Đoàn: chỉ Đoàn Thanh niên Cộng sản Hồ Chí Minh. Đội: chỉ Đội Thiếu niên Tiền phong Hồ Chí Minh. Khao khát: mong muốn tha thiết.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Người chị muốn nói gì với em qua 2 dòng thơ "Màu khăn đỏ dắt em / Bước qua thời thơ dại"?** Em sẽ trưởng thành hơn khi được kết nạp vào Đội (đáp án b).
2. **Chi tiết cho thấy chiếc khăn quàng đỏ gắn bó thân thương với người đội viên:** "Màu khăn tuổi thiếu niên / Suốt đời tươi thắm mãi / Như lời ru vời vợi / Chẳng bao giờ cách xa."
3. **Người chị chia sẻ niềm vui, mơ ước qua những hình ảnh:** một trời xanh vẫn đợi, cánh buồm là tiếng gọi, mặt biển và dòng sông, nắng vườn trưa mênh mông, bướm bay như lời hát, con tàu là đất nước đưa ta tới bến xa.
4. **Bạn nhỏ cảm nhận được điều gì qua lời nhắn nhủ của chị ở khổ thơ cuối?** Cảm nhận được sự tiếp nối giữa các thế hệ — những ngày chị đã đi qua sẽ là những ngày em đang tới, niềm khao khát và lí tưởng luôn bắt đầu từ màu khăn đỏ chói.`;

const questionsLesson16 = [
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Người chị muốn nói gì với em qua 2 dòng thơ \"Màu khăn đỏ dắt em / Bước qua thời thơ dại\"?",
      options: ["A. Đeo khăn quàng đỏ sẽ giúp em khôn lớn", "B. Em sẽ trưởng thành hơn khi được kết nạp vào Đội", "C. Chiếc khăn quàng đỏ đưa em tới những thành công"],
      correct_index: 1,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý; lựa chọn hợp lý nhất là em sẽ trưởng thành hơn khi được kết nạp vào Đội."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chi tiết nào cho thấy chiếc khăn quàng đỏ gắn bó thân thương với người đội viên?",
      options: [
        "A. \"Chị đã qua tuổi Đoàn\"",
        "B. \"Màu khăn tuổi thiếu niên / Suốt đời tươi thắm mãi\"",
        "C. \"Con tàu là đất nước\"",
        "D. \"Nắng vườn trưa mênh mông\""
      ],
      correct_index: 1,
      explanation: "'Màu khăn tuổi thiếu niên / Suốt đời tươi thắm mãi / Như lời ru vời vợi / Chẳng bao giờ cách xa.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các hình ảnh sau vào đúng khổ thơ nói về niềm vui, mơ ước của người đội viên:",
      groups: [
        { name: "Khổ 3", items: ["một trời xanh vẫn đợi", "cánh buồm là tiếng gọi", "mặt biển và dòng sông"] },
        { name: "Khổ 4", items: ["nắng vườn trưa mênh mông", "bướm bay như lời hát", "con tàu là đất nước"] }
      ],
      explanation: "Khổ 3 và khổ 4 của bài thơ tả những hình ảnh tươi đẹp, gợi mơ ước và khát vọng của người đội viên."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Bạn nhỏ cảm nhận được điều gì qua lời nhắn nhủ của chị ở khổ thơ cuối?",
      options: [
        "A. Chị không còn quan tâm đến em nữa",
        "B. Sự tiếp nối giữa các thế hệ, niềm khao khát bắt đầu từ màu khăn đỏ chói",
        "C. Em phải tự lập hoàn toàn, không cần ai giúp đỡ",
        "D. Chị buồn vì đã lớn"
      ],
      correct_index: 1,
      explanation: "'Những ngày chị đi qua / Những ngày em đang tới / Khao khát lại bắt đầu / Từ màu khăn đỏ chói.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Khao khát nghĩa là mong muốn ", "."],
      correct_answers: ["tha thiết"],
      word_pool: ["tha thiết", "hờ hững", "bình thường"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 16 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node16 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-16').single();
  if (!node16) { console.error("❌ Không tìm thấy node bai-16!"); return; }

  const { data: concept16 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_16',
    title: "Kiến thức Ngày em vào Đội"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 70, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai16, concept_id: concept16?.id }
  }).eq('id', node16.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 16");

  if (concept16) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept16.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Ngày em vào Đội%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 16";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node16.title}`, type: 'practice', metadata: { node_id: node16.id, concept_id: concept16?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node16.title}`, total_questions: questionsLesson16.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson16.length; i++) {
    const q = questionsLesson16[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept16?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson16.length} câu hỏi mới cho Bài 16`);
  console.log("\n🎉 Seed Bài 16 hoàn tất! (Hoàn thành Chủ điểm 2: Cổng trường rộng mở)");
}

main().catch(console.error);
