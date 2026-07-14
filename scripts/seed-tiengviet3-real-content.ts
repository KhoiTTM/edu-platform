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

async function seedLessonsWithContent() {
  console.log("🚀 Starting Seeding Real Tiếng Việt 3 interactive questions & layout...");

  // 1. Find the parent source
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'tieng-viet-3-kntt')
    .single();

  if (!source) {
    console.error("❌ Content source 'tieng-viet-3-kntt' not found! Make sure you seed the curriculum map first.");
    return;
  }

  // 2. We will update metadata for 'bai-1' and 'bai-2'
  // - Add drive_file_id (Google Drive PDF ID for sgk_tiengviet3_tap1.pdf - we'll use a sample or placeholder)
  // - Add grammar_tutorial with the actual textbook reading text so it displays beside questions.
  
  // Google Drive File ID for Tiếng Việt 3 tập 1 PDF
  const driveFileId = "1kBGEw5OkC2HupTOQo04cVzfRsaeRbov_"; // Standard public viewable file ID

  // --- UPDATE LESSON 1 ---
  console.log("Updating Lesson 1: Ngày gặp lại...");
  const { data: node1 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-1')
    .single();

  if (node1) {
    await supabase.from('curriculum_nodes').update({
      metadata: {
        page: 10,
        drive_file_id: driveFileId,
        skill_focus: 'reading',
        grammar_tutorial: `### Bài học 1: Ngày gặp lại (Trang 10 - 11)

#### 1. Bài đọc (Reading)
**Ngày gặp lại**
Chi mở tung cửa sổ đón những tia nắng đầu thu. Thế là hết hè rồi. Ngày mai bắt đầu năm học mới.
Có tiếng gọi ngoài cổng. Chi nhìn ra, thấy Sơn giơ chiếc diều rất xinh, vẫy rối rít:
– Cho cậu này.
Chi mừng rỡ chạy ra. Sơn về quê từ đầu hè, giờ gặp lại, hai bạn có bao nhiêu chuyện. Sơn kể ở quê, cậu được theo ông bà đi trồng rau, câu cá. Chiều chiều, cậu thường cùng bạn thả diều. Khi diều lên cao, cậu nằm lăn ra bãi cỏ ngắm trời. Cánh diều đứng im như ngủ thiếp đi trên bầu trời xanh.
Nhìn Sơn đen nhẻm, mắt lấp lánh khi kể chuyện, Chi chợt thấy buồn:
– Tớ chẳng được đi đâu.
– Nhưng mẹ tớ bảo cậu biết đi xe đạp rồi.
– Ừ, tớ ở nhà tập xe thôi.
– Thế cậu được đạp xe đi khắp nơi mà.
Chi cười:
– Ừ nhỉ.
Thế là Chi kể bố dạy Chi đi xe đạp. Bây giờ, Chi đã đạp xe bon bon. Con đường quen thuộc bỗng trở nên mới mẻ.
Cứ như vậy, hai bạn thi nhau kể những trải nghiệm mùa hè. Ngày mai đi học rồi, nhưng mùa hè chắc sẽ theo các bạn vào lớp học.

---

#### 2. Kiến thức Ngữ âm & Chính tả (Spelling Rule)
Quy tắc phân biệt âm **c** và **k**:
*   Âm **k** chỉ đi trước các nguyên âm: **i, e, ê** (Ví dụ: *kính, kéo, kiên trì*).
*   Âm **c** đi trước các nguyên âm còn lại: **a, o, ô, u, ư...** (Ví dụ: *cá, cỏ, quả, cửa*).

---

#### 3. Ví dụ thực tế (Examples)
*   **✓ Đúng:** con kiến (tiếng "kiến" viết bằng âm k vì đứng trước nguyên âm i).
*   **✓ Đúng:** cái ca (tiếng "ca" viết bằng âm c vì đứng trước nguyên âm a).
*   **✗ Sai:** con ciến
*   **✗ Sai:** cái ka

---

#### 4. Từ ngữ & Giải thích (Vocabulary)
*   **Trải nghiệm:** những điều đã qua, đã trực tiếp làm, giúp tích lũy hiểu biết và kinh nghiệm sống.
*   **Bon bon:** xe chạy rất nhanh và êm nhẹ.`
      }
    }).eq('id', node1.id);
  }

  // --- UPDATE LESSON 2 ---
  console.log("Updating Lesson 2: Về thăm quê...");
  const { data: node2 } = await supabase
    .from('curriculum_nodes')
    .select('id, title')
    .eq('source_id', source.id)
    .eq('slug', 'bai-2')
    .single();

  if (node2) {
    await supabase.from('curriculum_nodes').update({
      metadata: {
        page: 13,
        drive_file_id: driveFileId,
        skill_focus: 'reading',
        grammar_tutorial: `### Bài học 2: Về thăm quê (Trang 13 - 14)

#### 1. Bài đọc (Reading)
**Về thăm quê**
(Trích)

Nghỉ hè em thích nhất
Được theo mẹ về quê
Bà em cũng mừng ghê
Khi thấy em vào ngõ.

Mảnh vườn quê bé nhỏ
Bao nhiêu là thứ cây
Bà mỗi năm mỗi gầy
Chắc bà luôn vất vả.

Vườn bà có nhiều quả
Chẳng mấy lúc bà ăn
Bà bảo thích để dành
Cho cháu về ra hái.

Em mồ hôi nhễ nhại
Bà theo quạt liền tay
Từ tay bà đến gió
Thơm bao hương quả vườn.

Thoáng nghe bà kể chuyện
Gió thơm say chập chờn.

*(Xuân Hoài)*

---

#### 2. Luyện từ và câu (Vocabulary & Grammar)
*   **Từ chỉ sự vật:** Là những từ gọi tên con người, con vật, cây cối, đồ vật, hiện tượng thiên nhiên... (Ví dụ: *bà, mẹ, cháu, con trâu, quả vườn, vườn quê, mồ hôi*).
*   **Từ chỉ hoạt động:** Là những từ gọi tên sự vận động, hành động của người hoặc loài vật (Ví dụ: *đi, chạy, quạt, kể chuyện, hái quả, tập xe*).

---

#### 3. Ví dụ thực tế (Examples)
*   **✓ Đúng:** *Bác nông dân đang gặt lúa.* (Bác nông dân: sự vật, gặt lúa: hoạt động).
*   **✓ Đúng:** *Con trâu đang gặm cỏ.* (Con trâu: sự vật, gặm cỏ: hoạt động).

---

#### 4. Từ ngữ & Giải thích (Vocabulary)
*   **Chập chờn:** ở trạng thái nửa ngủ nửa thức, chập chờn trôi theo giấc mơ ngon lành.`
      }
    }).eq('id', node2.id);
  }

  // 3. Create Concepts & Interactive Questions
  console.log("Seeding Interactive Questions to Question Bank...");

  // Concept Lesson 1
  const concept1Slug = `concept-tv3-bai_1`;
  const { data: concept1 } = await supabase.from('concepts').upsert({
    slug: concept1Slug,
    title: "Kiến thức Ngày gặp lại"
  }, { onConflict: 'slug' }).select().single();

  // Concept Lesson 2
  const concept2Slug = `concept-tv3-bai_2`;
  const { data: concept2 } = await supabase.from('concepts').upsert({
    slug: concept2Slug,
    title: "Kiến thức Về thăm quê"
  }, { onConflict: 'slug' }).select().single();

  // Clean existing exercises / exams for Lesson 1 & 2 to prevent duplicates
  // Set up collections and exams
  const col1Title = "Tiếng Việt 3 - Luyện tập Bài 1 & 2";
  await supabase.from('assessment_collections').delete().eq('title', col1Title);

  const { data: collection } = await supabase.from('assessment_collections').insert({
    title: col1Title,
    subject_slug: 'tieng_viet',
    grade: 3,
    volume: 1,
    status: 'published'
  }).select().single();

  // 4. Questions for Lesson 1 (Ngày gặp lại)
  const questionsLesson1 = [
    {
      type: 'multiple_choice',
      difficulty: 1,
      metadata_json: {
        question: "Tìm những chi tiết thể hiện niềm vui khi gặp lại nhau của Chi và Sơn ở đầu bài học?",
        options: [
          "A. Sơn giơ chiếc diều rất xinh vẫy rối rít, Chi mừng rỡ chạy ra cổng.",
          "B. Chi khóc mếu máo và Sơn cúi đầu im lặng.",
          "C. Sơn chào hỏi lịch sự rồi đi thẳng vào nhà.",
          "D. Chi đứng đóng chặt cửa sổ không muốn ra gặp."
        ],
        correct_index: 0,
        explanation: "Trong bài đọc có đoạn: 'Chi nhìn ra, thấy Sơn giơ chiếc diều rất xinh, vẫy rối rít: – Cho cậu này. Chi mừng rỡ chạy ra.' thể hiện sự háo hức và vui mừng gặp lại."
      }
    },
    {
      type: 'categorization',
      difficulty: 2,
      metadata_json: {
        instruction: "Dựa vào bài học, hãy xếp các từ sau vào 2 nhóm chính tả đúng tương ứng với nguyên âm phía sau (Quy tắc c/k):",
        groups: [
          { name: "Viết với K (i, e, ê)", items: ["con kiến", "cái kéo", "kiên trì", "kể chuyện"] },
          { name: "Viết với C (âm còn lại)", items: ["cái ca", "con cua", "câu cá", "cây cỏ"] }
        ],
        explanation: "Quy tắc chính tả: k chỉ đi trước i, e, ê. C đi trước các nguyên âm còn lại."
      }
    },
    {
      type: 'inline_fill_blank',
      difficulty: 2,
      metadata_json: {
        instruction: "Chọn từ điền vào chỗ trống để hoàn thành quy tắc viết chính tả âm c/k:",
        text_segments: [
          "Trong tiếng Việt, âm k chỉ đứng trước các nguyên âm ", 
          ", còn âm c đứng trước các nguyên âm còn lại như ",
          "."
        ],
        correct_answers: ["i, e, ê", "a, o, u"],
        word_pool: ["i, e, ê", "a, o, u", "g, gh", "tr, ch"]
      }
    }
  ];

  // 5. Questions for Lesson 2 (Về thăm quê)
  const questionsLesson2 = [
    {
      type: 'multiple_choice',
      difficulty: 1,
      metadata_json: {
        question: "Trong bài thơ 'Về thăm quê', bạn nhỏ thích nhất điều gì khi kì nghỉ hè đến?",
        options: [
          "A. Được đi chơi công viên nước ở thành phố.",
          "B. Được đi thả diều cùng các bạn ngoài bãi cỏ.",
          "C. Được theo mẹ về quê thăm bà.",
          "D. Được tự đạp xe đạp đi vòng quanh phố."
        ],
        correct_index: 2,
        explanation: "Khổ thơ đầu viết rõ: 'Nghỉ hè em thích nhất / Được theo mẹ về quê'."
      }
    },
    {
      type: 'categorization',
      difficulty: 2,
      metadata_json: {
        instruction: "Xếp các từ sau vào nhóm từ loại thích hợp (Từ chỉ sự vật vs Từ chỉ hoạt động):",
        groups: [
          { name: "Từ chỉ sự vật", items: ["bà ngoại", "mảnh vườn", "quả chín", "con trâu"] },
          { name: "Từ chỉ hoạt động", items: ["về quê", "quạt tay", "kể chuyện", "gặt lúa"] }
        ],
        explanation: "Từ chỉ sự vật gọi tên người, vật, cây cối, địa điểm. Từ chỉ hoạt động mô tả các hành động, cử chỉ vận động."
      }
    },
    {
      type: 'match_pair',
      difficulty: 2,
      metadata_json: {
        instruction: "Nối các từ ở cột A với từ ở cột B để tạo thành cặp từ ghép có nghĩa chỉ hoạt động trong bài đọc:",
        pairs: [
          { left: "đạp", right: "xe đạp" },
          { left: "thả", right: "diều" },
          { left: "trồng", right: "rau" },
          { left: "câu", right: "cá" }
        ],
        explanation: "Các cặp động từ kết hợp với danh từ chỉ hoạt động quen thuộc mùa hè của hai bạn nhỏ Chi và Sơn."
      }
    }
  ];

  // Insert questions & Link to Exercise Set & Exams
  const seedSet = async (questions: any[], node: any, concept: any, title: string) => {
    // Create Practice Exercise Set
    const { data: exSet } = await supabase.from('exercise_sets').upsert({
      title: `Luyện tập: ${node.title}`,
      type: 'practice',
      metadata: { node_id: node.id, concept_id: concept?.id }
    }, { onConflict: 'title' }).select().single();

    // Create Exam for Quiz tab
    const { data: exam } = await supabase.from('exams').insert({
      collection_id: collection.id,
      title: `Bài đánh giá: ${node.title}`,
      total_questions: questions.length,
      generation_mode: 'balanced'
    }).select().single();

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const { data: qb } = await supabase.from('question_bank').insert({
        concept_id: concept?.id,
        type: q.type,
        difficulty: q.difficulty,
        metadata_json: q.metadata_json,
        source: 'handcrafted',
        status: 'approved',
        grade: 3,
        subject_slug: 'tieng_viet'
      }).select().single();

      if (qb && exSet && exam) {
        await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: qb.id, sort_key: i });
        await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: qb.id, order_index: i });
      }
    }
    console.log(`✅ Seeded ${questions.length} questions for ${node.title}`);
  };

  if (node1 && concept1) await seedSet(questionsLesson1, node1, concept1, "Ngày gặp lại");
  if (node2 && concept2) await seedSet(questionsLesson2, node2, concept2, "Về thăm quê");

  console.log("\n🎉 Tiếng Việt 3 seeding completed successfully!");
}

seedLessonsWithContent().catch(console.error);
