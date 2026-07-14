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

const grammarTutorialBai23 = `### Bài 23: Tôi yêu em tôi (Trang 104 - 105)

#### 1. Bài đọc
**TÔI YÊU EM TÔI** *(Trích)*

Tôi yêu em tôi
Nó cười rúc rích
Mỗi khi tôi đùa
Nó vui, nó thích.

Mắt nó đen ngời
Trong veo như nước
Miệng nó tươi hồng
Nói như khướu hót.

Hoa lan, hoa lí
Nó nhặt cài đầu
Hương thơm theo nó
Sân trước vườn sau.

Tôi đi đâu lâu
Nó mong, nó nhắc
Nó nấp sau cây
Oà ra ôm chặt.

Nó thích vẽ lắm
Vẽ thỏ có đôi
Nó sợ thỏ một
Không có bạn chơi.

Kìa, tiếng nó đấy!
Đang ở trường về
Cùng bạn bắt bướm
Cười dưới hàng tre...

*(Phạm Hổ)*

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Khổ thơ đầu cho biết bạn nhỏ yêu em gái về điều gì?** Em gái rất vui vẻ, hồn nhiên — cười rúc rích, vui thích mỗi khi anh/chị đùa.
2. **Bạn nhỏ tả em gái mình đáng yêu như thế nào (khổ 2, 3)?** Mắt em: đen ngời, trong veo như nước. Miệng em: tươi hồng, nói như khướu hót. Cách làm điệu của em: nhặt hoa lan, hoa lí cài đầu, hương thơm theo khắp sân trước vườn sau.
3. **Khổ thơ nào cho thấy bạn nhỏ được em gái rất yêu quý?** Khổ 4: "Tôi đi đâu lâu / Nó mong, nó nhắc / Nó nấp sau cây / Oà ra ôm chặt."
4. **Chi tiết cho thấy bạn nhỏ rất hiểu sở thích, tính tình của em mình:** "Nó thích vẽ lắm / Vẽ thỏ có đôi / Nó sợ thỏ một / Không có bạn chơi" — biết rõ em thích vẽ gì và vì sao.
5. **Bài thơ giúp em hiểu điều gì về tình cảm anh chị em trong gia đình?** Tình cảm anh chị em gắn bó, yêu thương, quan tâm và thấu hiểu lẫn nhau.`;

const questionsLesson23 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Khổ thơ đầu cho biết bạn nhỏ yêu em gái về điều gì?",
      options: [
        "A. Em gái rất vui vẻ, hồn nhiên",
        "B. Em gái rất thông minh",
        "C. Em gái rất chăm học",
        "D. Em gái rất khỏe mạnh"
      ],
      correct_index: 0,
      explanation: "'Tôi yêu em tôi / Nó cười rúc rích / Mỗi khi tôi đùa / Nó vui, nó thích.'"
    }
  },
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối bộ phận cơ thể của em gái với cách miêu tả trong bài thơ:",
      pairs: [
        { left: "Mắt em", right: "đen ngời, trong veo như nước" },
        { left: "Miệng em", right: "tươi hồng, nói như khướu hót" },
        { left: "Cách làm điệu của em", right: "nhặt hoa lan, hoa lí cài đầu" }
      ],
      explanation: "Khổ 2 và 3 của bài thơ miêu tả vẻ đáng yêu của em gái qua đôi mắt, miệng, và cách làm điệu."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Khổ thơ nào cho thấy bạn nhỏ được em gái rất yêu quý?",
      options: [
        "A. Khổ 1: \"Tôi yêu em tôi / Nó cười rúc rích\"",
        "B. Khổ 4: \"Tôi đi đâu lâu / Nó mong, nó nhắc / Nó nấp sau cây / Oà ra ôm chặt\"",
        "C. Khổ 3: \"Hoa lan, hoa lí / Nó nhặt cài đầu\"",
        "D. Khổ 2: \"Mắt nó đen ngời\""
      ],
      correct_index: 1,
      explanation: "'Tôi đi đâu lâu / Nó mong, nó nhắc / Nó nấp sau cây / Oà ra ôm chặt' cho thấy em gái luôn mong nhớ và yêu quý anh/chị."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Chi tiết nào cho thấy bạn nhỏ rất hiểu sở thích, tính tình của em mình?",
      options: [
        "A. \"Nó thích vẽ lắm / Vẽ thỏ có đôi / Nó sợ thỏ một / Không có bạn chơi\"",
        "B. \"Mắt nó đen ngời\"",
        "C. \"Hương thơm theo nó\"",
        "D. \"Cùng bạn bắt bướm\""
      ],
      correct_index: 0,
      explanation: "Bạn nhỏ biết rõ em thích vẽ thỏ có đôi vì sợ thỏ một không có bạn chơi — hiểu cả sở thích lẫn tâm lý của em."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 1,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào câu thơ sau:",
      text_segments: ["Miệng nó tươi hồng / Nói như ", " hót."],
      correct_answers: ["khướu"],
      word_pool: ["khướu", "chim sẻ", "họa mi"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 23 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node23 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-23').single();
  if (!node23) { console.error("❌ Không tìm thấy node bai-23!"); return; }

  const { data: concept23 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_23',
    title: "Kiến thức Tôi yêu em tôi"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 104, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai23, concept_id: concept23?.id }
  }).eq('id', node23.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 23");

  if (concept23) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept23.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Tôi yêu em tôi%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 23";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node23.title}`, type: 'practice', metadata: { node_id: node23.id, concept_id: concept23?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node23.title}`, total_questions: questionsLesson23.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson23.length; i++) {
    const q = questionsLesson23[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept23?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson23.length} câu hỏi mới cho Bài 23`);
  console.log("\n🎉 Seed Bài 23 hoàn tất!");
}

main().catch(console.error);
