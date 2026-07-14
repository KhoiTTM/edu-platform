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

const grammarTutorialBai26 = `### Bài 26: Đi tìm mặt trời (Trang 116 - 117)

#### 1. Bài đọc
**ĐI TÌM MẶT TRỜI**

Ngày xưa, muôn loài sống trong rừng già tối tăm, ẩm ướt. Gõ kiến được giao nhiệm vụ đến các nhà hỏi xem ai có thể đi tìm mặt trời.

Gõ kiến gõ cửa nhà công, công mải múa. Gõ cửa nhà liếu điếu, liếu điếu bận cãi nhau. Gõ cửa nhà chích choè, chích choè mải hót,... Chỉ có gà trống nhận lời đi tìm mặt trời.

Gà trống bay từ bụi mây lên rừng núa. Từ rừng núa lên rừng lim. Từ rừng lim lên rừng chò. Gà trống bay đến cây chò cao nhất, nhìn lên thấy mây bồng bềnh và sao nhấp nháy. Nó đậu ở đấy chờ mặt trời.

Gió lạnh rít ù ù. Mấy lần gà trống suýt ngã. Nó quắp những ngón chân thật chặt vào thân cây. Chờ mãi, đợi mãi... Nghĩ thương các bạn sống trong tối tăm, ẩm ướt, gà trống đấm ngực kêu to:

— Trời đất ơi... ơi...!

Kì lạ thay, gà trống vừa dứt tiếng kêu đầu thì sương tan. Dứt tiếng kêu thứ hai, sao lặn. Dứt tiếng kêu thứ ba, đằng đông ửng sáng, mặt trời hiện ra. Mặt trời vươn những cánh tay ánh sáng đính lên đầu gà trống một cụm lửa hồng.

Gà trống vui sướng bay về. Bay tới đâu, ánh sáng theo đến đấy. Đất rừng sáng tươi như tranh vẽ.

Từ đó, khi gà trống cất tiếng gáy là mặt trời hiện ra, chiếu ánh sáng cho mọi người, mọi vật.

*(Theo Vũ Tú Nam)*

**Từ ngữ:** Liếu điếu: loài chim nhỏ, lông màu xám, tiếng hót nghe như tên gọi của nó. Chò: cây rừng to, thân tròn và thẳng, tán lá gọn.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Vì sao gõ kiến phải đi các nhà hỏi xem ai có thể đi tìm mặt trời?** Vì muôn loài sống trong rừng già tối tăm, ẩm ướt, cần có ai đó đi tìm mặt trời để mang ánh sáng về.
2. **Gõ kiến đã gặp những ai để nhờ đi tìm mặt trời? Kết quả ra sao?** Gõ cửa nhà công (đang mải múa), liếu điếu (đang cãi nhau), chích choè (đang mải hót) — tất cả đều từ chối vì bận việc riêng; chỉ có gà trống nhận lời.
3. **Hành trình đi tìm mặt trời của gà trống:** Gà trống bay từ bụi mây lên rừng núa, rồi rừng lim, rồi rừng chò, đậu trên cây chò cao nhất chờ mặt trời giữa gió lạnh rít ù ù, suýt ngã mấy lần nhưng vẫn kiên trì bám chặt vào thân cây.
4. **Vì sao gà trống được mặt trời tặng một cụm lửa hồng?** Vì gà trống đã kiên trì chờ đợi và cất tiếng gọi tha thiết, dũng cảm vượt gian nan để tìm mặt trời cho muôn loài.
5. **Câu chuyện muốn nói điều gì?** Ca ngợi những việc làm cao đẹp vì cộng đồng (đáp án c).`;

const questionsLesson26 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao gõ kiến phải đi các nhà hỏi xem ai có thể đi tìm mặt trời?",
      options: [
        "A. Vì gõ kiến thích đi chơi",
        "B. Vì muôn loài sống trong rừng già tối tăm, ẩm ướt, cần ánh sáng",
        "C. Vì mặt trời bị mất tích",
        "D. Vì có lệnh của nhà vua"
      ],
      correct_index: 1,
      explanation: "'Ngày xưa, muôn loài sống trong rừng già tối tăm, ẩm ướt. Gõ kiến được giao nhiệm vụ đến các nhà hỏi xem ai có thể đi tìm mặt trời.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các con vật vào đúng nhóm (Từ chối đi tìm mặt trời / Nhận lời đi tìm mặt trời):",
      groups: [
        { name: "Từ chối", items: ["công (mải múa)", "liếu điếu (bận cãi nhau)", "chích choè (mải hót)"] },
        { name: "Nhận lời", items: ["gà trống"] }
      ],
      explanation: "Chỉ có gà trống nhận lời đi tìm mặt trời trong khi các con vật khác đều bận việc riêng."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Trong hành trình đi tìm mặt trời, gà trống đã gặp khó khăn gì?",
      options: [
        "A. Bị lạc đường",
        "B. Gió lạnh rít ù ù, mấy lần suýt ngã khỏi cây",
        "C. Bị các con vật khác trêu chọc",
        "D. Không tìm được cây để đậu"
      ],
      correct_index: 1,
      explanation: "'Gió lạnh rít ù ù. Mấy lần gà trống suýt ngã. Nó quắp những ngón chân thật chặt vào thân cây.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao gà trống được mặt trời tặng một cụm lửa hồng?",
      options: [
        "A. Vì gà trống xin mặt trời",
        "B. Vì gà trống kiên trì chờ đợi, dũng cảm vượt gian nan để tìm mặt trời cho muôn loài",
        "C. Vì mặt trời thích màu đỏ",
        "D. Vì gà trống có bộ lông đẹp"
      ],
      correct_index: 1,
      explanation: "'Kì lạ thay, gà trống vừa dứt tiếng kêu đầu thì sương tan... mặt trời hiện ra. Mặt trời vươn những cánh tay ánh sáng đính lên đầu gà trống một cụm lửa hồng.' — phần thưởng cho lòng kiên trì và dũng cảm."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Câu chuyện muốn nói điều gì?",
      options: ["A. Giải thích lí do gà trống có chiếc mào đỏ trên đầu", "B. Mặt trời thức dậy chiếu sáng là nhờ tiếng gáy của gà trống", "C. Ca ngợi những việc làm cao đẹp vì cộng đồng"],
      correct_index: 2,
      explanation: "Đây là câu hỏi mở trong sách với 3 gợi ý; lựa chọn hợp lý nhất là ca ngợi những việc làm cao đẹp vì cộng đồng."
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 26 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node26 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-26').single();
  if (!node26) { console.error("❌ Không tìm thấy node bai-26!"); return; }

  const { data: concept26 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_26',
    title: "Kiến thức Đi tìm mặt trời"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 116, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai26, concept_id: concept26?.id }
  }).eq('id', node26.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 26");

  if (concept26) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept26.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Đi tìm mặt trời%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 26";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node26.title}`, type: 'practice', metadata: { node_id: node26.id, concept_id: concept26?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node26.title}`, total_questions: questionsLesson26.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson26.length; i++) {
    const q = questionsLesson26[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept26?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson26.length} câu hỏi mới cho Bài 26`);
  console.log("\n🎉 Seed Bài 26 hoàn tất!");
}

main().catch(console.error);
