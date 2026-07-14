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

const grammarTutorialBai25 = `### Bài 25: Những bậc đá chạm mây (Trang 112 - 113)

#### 1. Bài đọc
**NHỮNG BẬC ĐÁ CHẠM MÂY**

Ngày xưa, dưới chân núi Hồng Lĩnh có một xóm nhỏ, người dân sống bằng nghề đánh cá. Cuộc sống đang yên lành, bỗng một trận bão khủng khiếp cuốn đi tất cả thuyền bè. Dân xóm chài hết đường sinh sống, đành lên núi kiếm củi đem ra chợ bán. Nhưng sườn núi phía họ ở dựng đứng, bà con phải đi đường vòng rất xa.

Bấy giờ trong xóm có một ông lão nghèo. Người ta gọi ông là cố Đương vì hễ gặp việc gì khó, ông đều đảm đương gánh vác. Thấy lên núi phải đi đường vòng, ông bàn với mọi người ghép đá thành bậc thang vượt dốc để có được con đường ngắn như mong muốn. Ai nấy đều lắc đầu bảo việc ấy khó lắm, không làm được.

Nhưng cố Đương vẫn tìm cách làm đường. Công việc nặng nhọc không khiến ông sờn lòng. Thấy ông đói, những con vượn ở gần đó mang hoa quả đến cho ông. Chim chóc thay nhau ca hát để ông quên mệt. Về sau, nhiều người trong xóm tình nguyện đến làm cùng.

Sau năm lần sim ra quả, con đường lên núi đã hoàn thành. Nhờ đó, mọi người có thể lên xuống núi dễ dàng. Cả xóm biết ơn cố Đương, tặng thêm cho ông một tên mới là cố Ghép. Ngày nay, con đường vượt núi gọi là Truông Ghép vẫn còn ở phía nam dãy núi Hồng Lĩnh.

*(Theo Nguyễn Đổng Chi)*

**Từ ngữ:** Cố: tiếng địa phương, dùng để gọi người già với ý kính trọng. Truông: đường đi qua rừng núi, vùng đất hoang, nhiều cây cỏ.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Vì sao ngày xưa người dân dưới chân núi Hồng Lĩnh phải bỏ nghề đánh cá, lên núi kiếm củi?** Vì tất cả thuyền bè của họ bị bão cuốn mất (đáp án c).
2. **Vì sao cố Đương có ý định ghép đá thành bậc thang lên núi?** Vì sườn núi phía xóm ở dựng đứng, bà con phải đi đường vòng rất xa để lên núi kiếm củi; cố Đương muốn có con đường ngắn hơn.
3. **Công việc làm đường của cố Đương diễn ra như thế nào?** Rất nặng nhọc và kéo dài (sau năm lần sim ra quả mới hoàn thành), nhưng ông không sờn lòng; được vượn mang hoa quả, chim chóc ca hát động viên, và về sau nhiều người trong xóm tình nguyện đến làm cùng.
4. **Hình ảnh "những bậc đá chạm mây" nói lên điều gì về việc làm của cố Đương?** Cho thấy con đường bậc đá rất cao, vượt lên tận mây — thể hiện sự kiên trì, công sức to lớn và ý chí phi thường của cố Đương khi làm nên con đường ấy.
5. **Đóng vai một người dân trong xóm, giới thiệu về cố Đương:** học sinh tự do trình bày dựa trên nội dung bài đọc (ông lão nghèo, tốt bụng, kiên trì, luôn gánh vác việc khó, được cả xóm biết ơn và đặt tên mới là cố Ghép).`;

const questionsLesson25 = [
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vì sao người dân dưới chân núi Hồng Lĩnh phải bỏ nghề đánh cá, lên núi kiếm củi?",
      options: [
        "A. Vì lên núi kiếm củi đỡ vất vả hơn đánh cá",
        "B. Vì vùng biển gần đó thường xuyên có bão lớn",
        "C. Vì tất cả thuyền bè của họ bị bão cuốn mất"
      ],
      correct_index: 2,
      explanation: "'Bỗng một trận bão khủng khiếp cuốn đi tất cả thuyền bè. Dân xóm chài hết đường sinh sống, đành lên núi kiếm củi đem ra chợ bán.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao cố Đương có ý định ghép đá thành bậc thang lên núi?",
      options: [
        "A. Vì ông muốn nổi tiếng",
        "B. Vì sườn núi dựng đứng khiến bà con phải đi đường vòng rất xa",
        "C. Vì ông thích xây dựng",
        "D. Vì có người thuê ông làm"
      ],
      correct_index: 1,
      explanation: "'Nhưng sườn núi phía họ ở dựng đứng, bà con phải đi đường vòng rất xa... ông bàn với mọi người ghép đá thành bậc thang vượt dốc.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Công việc làm đường của cố Đương diễn ra như thế nào?",
      options: [
        "A. Rất nhanh chóng, chỉ trong một ngày",
        "B. Nặng nhọc, kéo dài nhưng ông không sờn lòng, được thiên nhiên và dân làng giúp đỡ",
        "C. Ông làm một mình và bỏ cuộc giữa chừng",
        "D. Không ai giúp đỡ ông"
      ],
      correct_index: 1,
      explanation: "'Công việc nặng nhọc không khiến ông sờn lòng... những con vượn... mang hoa quả đến cho ông. Chim chóc thay nhau ca hát... nhiều người trong xóm tình nguyện đến làm cùng.'"
    }
  },
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các chi tiết sau vào đúng giai đoạn của câu chuyện:",
      groups: [
        { name: "Khó khăn ban đầu", items: ["thuyền bè bị bão cuốn mất", "sườn núi dựng đứng phải đi đường vòng xa", "mọi người bảo việc ghép đá khó, không làm được"] },
        { name: "Kết quả", items: ["con đường lên núi hoàn thành", "mọi người lên xuống núi dễ dàng", "cố Đương được đặt tên mới là cố Ghép"] }
      ],
      explanation: "Câu chuyện kể về hành trình từ khó khăn đến thành công nhờ sự kiên trì của cố Đương."
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Cố là tiếng địa phương, dùng để gọi người già với ý ", "."],
      correct_answers: ["kính trọng"],
      word_pool: ["kính trọng", "chê bai", "sợ hãi"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 25 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node25 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-25').single();
  if (!node25) { console.error("❌ Không tìm thấy node bai-25!"); return; }

  const { data: concept25 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_25',
    title: "Kiến thức Những bậc đá chạm mây"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 112, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai25, concept_id: concept25?.id }
  }).eq('id', node25.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 25");

  if (concept25) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept25.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Những bậc đá chạm mây%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 25";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node25.title}`, type: 'practice', metadata: { node_id: node25.id, concept_id: concept25?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node25.title}`, total_questions: questionsLesson25.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson25.length; i++) {
    const q = questionsLesson25[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept25?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson25.length} câu hỏi mới cho Bài 25`);
  console.log("\n🎉 Seed Bài 25 hoàn tất!");
}

main().catch(console.error);
