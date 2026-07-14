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

const grammarTutorialBai10 = `### Bài 10: Con đường đến trường (Trang 46 - 47)

#### 1. Bài đọc
**CON ĐƯỜNG ĐẾN TRƯỜNG**

Con đường đưa tôi đến trường nằm vắt vẻo lưng chừng đồi. Mặt đường mấp mô. Hai bên đường lúp xúp những bụi cây cỏ dại, cây lạc tiên. Cây lạc tiên ra quả quanh năm. Vì thế, con đường luôn phảng phất mùi lạc tiên chín. Bọn con gái lớp tôi hay tranh thủ hái vài quả để vừa đi vừa nhấm nháp.

Có đoạn, con đường như buông mình xuống chân đồi. Ngày nắng, tôi và lũ bạn thường thi xem ai chạy nhanh hơn. Gió vù vù bên tai. Đất dưới chân xốp nhẹ như bông, thỉnh thoảng một viên đá dăm hoặc một viên sỏi nhói nhẹ vào gan bàn chân.

Vào mùa mưa, con đường lầy lội và trơn trượt. Để khỏi ngã, tôi thường tháo phăng đôi dép nhựa và bước đi bằng cách bấm mười đầu ngón chân xuống mặt đường. Đôi khi chúng tôi phải đi cắt qua cánh rừng vầu, rừng nứa vì nhiều khúc đường ngập trong nước lũ.

Cô giáo tôi là người vùng xuôi. Bàn chân cô lẫn vào bàn chân học trò trên con đường đến trường. Ấy là do nhiều hôm mưa rét, cô thường đứng đợi chúng tôi ở những đoạn đường khó đi để đưa chúng tôi đến lớp. Vì thế, tôi chẳng nghỉ buổi học nào.

*(Đỗ Đăng Dương)*

**Từ ngữ:** Vắt vẻo: ở vị trí trên cao nhưng không có chỗ tựa vững chắc. Lúp xúp: ở liền nhau, thấp và sàn sàn như nhau. Lạc tiên: cây dây leo, mọc hoang, lá hình tim, hoa mọc ở kẽ lá, quả mọng. Vầu: cây cùng họ với tre, thân to, mình mỏng nhưng rắn, thường dùng làm nhà.

---

#### 2. Hướng dẫn trả lời câu hỏi đọc hiểu
1. **Ở đoạn 1, con đường đến trường hiện lên như thế nào?** Hình dáng: nằm vắt vẻo lưng chừng đồi. Bề mặt đường: mấp mô. Hai bên đường: lúp xúp bụi cây cỏ dại, cây lạc tiên.
2. **Con đường được miêu tả như thế nào?** Ngày nắng: đất xốp nhẹ như bông, có đá dăm/sỏi nhói nhẹ vào chân. Mùa mưa: lầy lội, trơn trượt, có khúc ngập trong nước lũ.
3. **Vì sao các bạn nhỏ không nghỉ buổi học nào?** Vì cô giáo thường đứng đợi các bạn ở những đoạn đường khó đi để đưa các bạn đến lớp.
4. **Tình cảm của bạn nhỏ với cô giáo:** yêu quý, biết ơn cô vì cô luôn tận tụy đưa các bạn đến lớp dù đường xa khó đi.
5. **Suy nghĩ về con đường đi học:** học sinh tự do chia sẻ cảm nhận (về sự vất vả, tình yêu thương của cô giáo, nghị lực vượt khó của các bạn nhỏ).`;

const questionsLesson10 = [
  {
    type: 'categorization',
    difficulty: 2,
    metadata_json: {
      instruction: "Xếp các chi tiết miêu tả con đường đến trường (đoạn 1) vào đúng nhóm:",
      groups: [
        { name: "Hình dáng con đường", items: ["nằm vắt vẻo lưng chừng đồi"] },
        { name: "Bề mặt đường", items: ["mấp mô"] },
        { name: "Hai bên đường", items: ["lúp xúp bụi cây cỏ dại, cây lạc tiên"] }
      ],
      explanation: "Đoạn 1 miêu tả con đường qua 3 khía cạnh: hình dáng, bề mặt, và hai bên đường."
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vào ngày nắng, con đường được miêu tả như thế nào?",
      options: [
        "A. Lầy lội và trơn trượt",
        "B. Đất xốp nhẹ như bông, có đá dăm hoặc sỏi nhói nhẹ vào chân",
        "C. Ngập trong nước lũ",
        "D. Đầy bùn đất"
      ],
      correct_index: 1,
      explanation: "'Đất dưới chân xốp nhẹ như bông, thỉnh thoảng một viên đá dăm hoặc một viên sỏi nhói nhẹ vào gan bàn chân.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 1,
    metadata_json: {
      question: "Vào mùa mưa, con đường được miêu tả như thế nào?",
      options: ["A. Khô ráo, dễ đi", "B. Lầy lội và trơn trượt", "C. Có nhiều hoa nở", "D. Rất mát mẻ"],
      correct_index: 1,
      explanation: "'Vào mùa mưa, con đường lầy lội và trơn trượt.'"
    }
  },
  {
    type: 'multiple_choice',
    difficulty: 2,
    metadata_json: {
      question: "Vì sao các bạn nhỏ không nghỉ một buổi học nào kể cả khi trời mưa rét?",
      options: [
        "A. Vì sợ bị phạt",
        "B. Vì cô giáo thường đứng đợi, đưa các bạn đến lớp ở những đoạn đường khó đi",
        "C. Vì đường đi học rất gần",
        "D. Vì bố mẹ bắt buộc phải đi học"
      ],
      correct_index: 1,
      explanation: "'Cô thường đứng đợi chúng tôi ở những đoạn đường khó đi để đưa chúng tôi đến lớp. Vì thế, tôi chẳng nghỉ buổi học nào.'"
    }
  },
  {
    type: 'inline_fill_blank',
    difficulty: 2,
    metadata_json: {
      instruction: "Điền từ còn thiếu vào chú thích sau:",
      text_segments: ["Vắt vẻo nghĩa là ở vị trí trên cao nhưng không có chỗ ", " vững chắc."],
      correct_answers: ["tựa"],
      word_pool: ["tựa", "ngồi", "đứng"]
    }
  }
];

async function main() {
  console.log("🚀 Seeding Bài 10 với nội dung bám sát 100% SGK...");

  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'tieng-viet-3-kntt').single();
  if (!source) { console.error("❌ Content source not found!"); return; }

  const { data: node10 } = await supabase.from('curriculum_nodes').select('id, title').eq('source_id', source.id).eq('slug', 'bai-10').single();
  if (!node10) { console.error("❌ Không tìm thấy node bai-10!"); return; }

  const { data: concept10 } = await supabase.from('concepts').upsert({
    slug: 'concept-tv3-bai_10',
    title: "Kiến thức Con đường đến trường"
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('curriculum_nodes').update({
    metadata: { page: 46, drive_file_id: driveFileId, skill_focus: 'reading', grammar_tutorial: grammarTutorialBai10, concept_id: concept10?.id }
  }).eq('id', node10.id);

  console.log("✅ Đã cập nhật grammar_tutorial + concept_id cho Bài 10");

  if (concept10) {
    const { data: oldQuestions } = await supabase.from('question_bank').select('id').eq('concept_id', concept10.id);
    const ids = (oldQuestions || []).map(q => q.id);
    if (ids.length > 0) {
      await supabase.from('exercise_questions').delete().in('question_id', ids);
      await supabase.from('exam_questions').delete().in('question_bank_id', ids);
      await supabase.from('question_bank').delete().in('id', ids);
      console.log(`🗑️  Đã xóa ${ids.length} câu hỏi cũ`);
    }
  }

  await supabase.from('exercise_sets').delete().like('title', 'Luyện tập: Con đường đến trường%');

  const colTitle = "Tiếng Việt 3 - Luyện tập Bài 10";
  await supabase.from('assessment_collections').delete().eq('title', colTitle);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: colTitle, subject_slug: 'tieng_viet', grade: 3, volume: 1, status: 'published'
  }).select().single();

  const { data: exSet } = await supabase.from('exercise_sets').upsert({
    title: `Luyện tập: ${node10.title}`, type: 'practice', metadata: { node_id: node10.id, concept_id: concept10?.id }
  }, { onConflict: 'title' }).select().single();

  const { data: exam } = await supabase.from('exams').insert({
    collection_id: collection.id, title: `Bài đánh giá: ${node10.title}`, total_questions: questionsLesson10.length, generation_mode: 'balanced'
  }).select().single();

  for (let i = 0; i < questionsLesson10.length; i++) {
    const q = questionsLesson10[i];
    const { data: qb } = await supabase.from('question_bank').insert({
      concept_id: concept10?.id, type: q.type, difficulty: q.difficulty, metadata_json: q.metadata_json,
      source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'tieng_viet'
    }).select().single();

    if (qb && exSet && exam) {
      await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
      await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
    }
  }

  console.log(`✅ Seeded ${questionsLesson10.length} câu hỏi mới cho Bài 10`);
  console.log("\n🎉 Seed Bài 10 hoàn tất!");
}

main().catch(console.error);
