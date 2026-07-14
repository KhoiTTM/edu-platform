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

const grammarTutorialBai27 = `### Bài 27: Những chiếc áo ấm (Trang 120 - 121)

#### 1. Bài đọc
**NHỮNG CHIẾC ÁO ẤM**

Mùa đông, thỏ quấn tấm vải lên người cho đỡ rét thì gió thổi tấm vải bay xuống ao. Nhím giúp thỏ khều tấm vải vào bờ và nói:

— Phải may thành áo mới được.

Nhím xù lông, rút một chiếc kim định khâu áo cho thỏ, nhưng không có chỉ. Hai bạn đi tìm chị tằm, xin một ít tơ làm chỉ. Chị tằm đồng ý ngay. Có chỉ, có kim, nhưng phải tìm người cắt vải. Thấy bọ ngựa vung kiếm cắt cỏ, nhím nói:

— Anh giúp chúng tôi cắt vải may áo. Mọi người cần áo ấm.

Bọ ngựa đồng ý, vung kiếm cắt vải, nhím ngăn:

— Phải cắt đúng theo kích thước.

Tất cả lại đi tìm người biết kẻ đường vạch trên vải. Lúc qua vườn chuối, Nhím trông thấy ốc sên bò trên lá, cứ mỗi quãng, ốc sên lại để lại phía sau một đường vạch. Nhím nói:

— Chúng tôi cần anh kẻ đường vạch để may áo ấm cho mọi người.

Ốc sên nhận lời, bò lên tấm vải, vạch những đường rất rõ. Bây giờ chỉ còn thiếu người luồn kim giỏi. Tất cả lại đi tìm chim ổ dộc có biệt tài khâu vá.

Xưởng may áo ấm được dựng lên. Thỏ trải vải. Ốc sên kẻ đường vạch. Bọ ngựa cắt vải theo vạch. Tằm xe chỉ. Nhím chắp vải, dùi lỗ. Đôi chim ổ dộc luồn kim, may áo...

Mùa đông năm ấy, trong rừng ai cũng có áo ấm để mặc.

*(Theo Võ Quảng)*

**Từ ngữ:** Chim ổ dộc (còn gọi là chim dồng dộc, dòng dọc,...): loài chim trông giống chim sẻ, làm tổ rất chắc và đẹp. Xe (chỉ): làm cho các sợi nhỏ xoắn chặt với nhau thành sợi lớn.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Mùa đông đến, thỏ chống rét bằng cách nào?** Quấn tấm vải lên người.
2. **Vì sao nhím nảy ra sáng kiến may áo ấm?** Vì tấm vải thỏ quấn bị gió thổi bay xuống ao, nhím giúp khều lên và nghĩ ra cách may thành áo để chống rét bền vững hơn.
3. **Mỗi nhân vật đã đóng góp gì vào việc làm ra những chiếc áo ấm?** Thỏ trải vải. Chị tằm xe chỉ (cho tơ làm chỉ). Bọ ngựa cắt vải theo vạch. Ốc sên kẻ đường vạch trên vải. Nhím chắp vải, dùi lỗ (và rút lông làm kim). Đôi chim ổ dộc luồn kim, may áo.
4. **Nhân vật em thích nhất:** học sinh tự do chia sẻ và giải thích lí do.
5. **Bài học rút ra từ câu chuyện:** biết đoàn kết, mỗi người góp một phần khả năng của mình thì có thể cùng nhau hoàn thành công việc lớn, giúp đỡ lẫn nhau trong cộng đồng.`;

const questionsLesson27 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Mùa đông đến, thỏ chống rét bằng cách nào?",
      options: ["A. Đốt lửa sưởi ấm", "B. Quấn tấm vải lên người", "C. Đào hang trốn rét", "D. Ngủ đông"],
      correct_index: 1,
      explanation: "'Mùa đông, thỏ quấn tấm vải lên người cho đỡ rét.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao nhím nảy ra sáng kiến may áo ấm?",
      options: [
        "A. Vì nhím thích may vá",
        "B. Vì tấm vải thỏ quấn bị gió thổi bay xuống ao nên cần cách chống rét bền vững hơn",
        "C. Vì có người yêu cầu nhím làm",
        "D. Vì nhím muốn bán áo"
      ],
      correct_index: 1,
      explanation: "'Thỏ quấn tấm vải lên người cho đỡ rét thì gió thổi tấm vải bay xuống ao. Nhím giúp thỏ khều tấm vải vào bờ và nói: Phải may thành áo mới được.'"
    }
  },
  {
    type: 'match_pair',
    difficulty: 2,
    metadata_json: {
      instruction: "Nối mỗi con vật với việc làm của nó trong xưởng may áo ấm:",
      pairs: [
        { left: "Thỏ", right: "trải vải" },
        { left: "Ốc sên", right: "kẻ đường vạch" },
        { left: "Bọ ngựa", right: "cắt vải theo vạch" },
        { left: "Chim ổ dộc", right: "luồn kim, may áo" }
      ],
      explanation: "'Xưởng may áo ấm được dựng lên. Thỏ trải vải. Ốc sên kẻ đường vạch. Bọ ngựa cắt vải theo vạch. Tằm xe chỉ. Nhím chắp vải, dùi lỗ. Đôi chim ổ dộc luồn kim, may áo...'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Chị tằm đã giúp gì cho việc may áo ấm?",
      options: ["A. Cho tơ làm chỉ", "B. Kẻ đường vạch", "C. Cắt vải", "D. Luồn kim"],
      correct_index: 0,
      explanation: "'Hai bạn đi tìm chị tằm, xin một ít tơ làm chỉ. Chị tằm đồng ý ngay.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Xe (chỉ) nghĩa là làm cho các sợi nhỏ ", " chặt với nhau thành sợi lớn."],
      correct_answers: ["xoắn"],
      word_pool: ["xoắn", "cắt", "buộc"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 27 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node27 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-27').single();
  if (!node27) { console.error("❌ Không tìm thấy node bai-27!"); return; }

  const { data: concept27 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_27',
    title: "Kiến thức Những chiếc áo ấm"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 120, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai27, concept_id: concept27?.id }
  }).eq('id', node27.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 27");

  if (concept27) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept27.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Những chiếc áo ấm%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 27";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node27.title}`, type: 'practice', metadata: { node_id: node27.id, concept_id: concept27?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node27.title}`, total_questions: questionsLesson27.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson27.length; i++) {
    const q = questionsLesson27[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept27?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson27.length} câu hỏi mới cho Bài 27`);
  console.log("\n🎉 Seed Bài 27 hoàn tất!");
}

main().catch(console.error);
