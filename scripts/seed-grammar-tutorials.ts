import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tutorials: Record<string, string> = {
  'unit-6': `### Bài giảng Ngữ pháp: Giới từ chỉ vị trí (Prepositions of Place) & There is / There are

#### 1. Giới thiệu (Introduction)
Trong tiếng Anh giao tiếp và đặc biệt là bài thi IELTS, việc mô tả không gian sống, ngôi nhà, và cách sắp đặt đồ đạc là vô cùng quan trọng. Để làm được điều này một cách chính xác, bạn cần nắm vững **Giới từ chỉ vị trí** và cấu trúc chỉ sự tồn tại **There is / There are**.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### Cấu trúc "There is / There are"
> **Khẳng định:**
> \`There is + Danh từ số ít / Danh từ không đếm được\`
> \`There are + Danh từ số nhiều\`
>
> **Phủ định:**
> \`There is not (There isn't) + Danh từ số ít\`
> \`There are not (There aren't) + Danh từ số nhiều\`

##### Các giới từ chỉ vị trí phổ biến:
- **In** (Trong): *in the living room, in the drawer*
- **On** (Trên bề mặt): *on the table, on the wall*
- **At** (Tại một điểm): *at the door, at home*
- **Under** (Dưới): *under the bed, under the chair*
- **Next to / Beside** (Ngay cạnh): *next to the fridge*
- **Between... and...** (Ở giữa... và...): *between the desk and the wardrobe*
- **Behind** (Phía sau): *behind the door*
- **In front of** (Phía trước): *in front of the television*

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- Sử dụng **There is / There are** để giới thiệu sự xuất hiện của các đồ vật trong phòng.
- Sử dụng **Giới từ chỉ vị trí** ngay sau đó để định vị đồ vật đó trong không gian ngôi nhà (House and Home).

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *There is a modern sofa in the living room.* (Có một chiếc ghế sofa hiện đại trong phòng khách - đúng ngữ pháp).
- **✓ Đúng:** *There are two chairs next to the dining table.* (Có hai chiếc ghế ngay cạnh bàn ăn).
- **✗ Sai:** *There are a microwave in the kitchen.*
  *(Giải thích: "A microwave" là danh từ số ít, phải dùng "There is" thay vì "There are").*
- **✗ Sai:** *The keys are on inside the drawer.*
  *(Giải thích: Chỉ dùng "in/inside the drawer", không kết hợp cả "on" và "inside").*

---

#### 5. Tổng kết (Summary)
- Dùng **There is** cho 1 vật, **There are** cho từ 2 vật trở lên.
- Đặt giới từ chỉ vị trí ngay trước danh từ chỉ nơi chốn để mô tả chính xác bức tranh toàn cảnh của ngôi nhà.`,

  'unit-9': `### Bài giảng Ngữ pháp: Present Simple vs Present Continuous & Gerunds (V-ing)

#### 1. Giới thiệu (Introduction)
Khi thảo luận về sở thích (Hobbies) và hoạt động trong thời gian rảnh rỗi trong IELTS Speaking Part 1, chúng ta thường cần phân biệt giữa những thói quen lâu dài (dùng Hiện tại đơn) và những hành động đang diễn ra tạm thời tại thời điểm nói (dùng Hiện tại tiếp diễn). Bên cạnh đó, danh động từ (Gerunds - V-ing) là cấu trúc bắt buộc đi sau các động từ chỉ cảm xúc.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### Thì Hiện tại đơn (Present Simple)
> **Cấu trúc:** \`S + V(s/es)\`
> Dùng để diễn tả sở thích chung, thói quen lâu dài.

##### Thì Hiện tại tiếp diễn (Present Continuous)
> **Cấu trúc:** \`S + am/is/are + V-ing\`
> Dùng để diễn tả một hành động/dự án ngắn hạn đang thực hiện dạo gần đây.

##### Động từ chỉ sở thích + Gerund (V-ing):
> \`Subject + like / love / enjoy / hate / prefer + V-ing\`

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- **Hobby chung:** *I love playing football.* (Sở thích lâu dài).
- **Hành động tạm thời:** *This week, I am learning how to play the guitar.* (Hành động đang diễn ra tạm thời dạo gần đây).

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *I enjoy reading books when I have free time.* (Tôi thích đọc sách khi rảnh rỗi - đúng cấu trúc Enjoy + V-ing).
- **✓ Đúng:** *At the moment, my brother is taking a photography course.* (Hiện tại anh trai tôi đang tham gia khóa học nhiếp ảnh).
- **✗ Sai:** *I like play video games in the evening.*
  *(Giải thích: Sau like phải là động từ thêm -ing. Sửa đúng: "I like playing...").*
- **✗ Sai:** *I am usually going swimming on Saturdays.*
  *(Giải thích: Hành động lặp đi lặp lại vào thứ Bảy là thói quen, phải dùng hiện tại đơn. Sửa đúng: "I usually go swimming...").*

---

#### 5. Tổng kết (Summary)
- Sau **like, love, enjoy, hate**, động từ luôn phải thêm đuôi **-ing** (V-ing).
- Dùng **Present Simple** cho thói quen thường xuyên và **Present Continuous** cho những hoạt động/sở thích mang tính chất tạm thời, đang diễn ra ở hiện tại.`,

  'unit-14': `### Bài giảng Ngữ pháp: Thì Quá khứ đơn (Past Simple) & Quá khứ tiếp diễn (Past Continuous)

#### 1. Giới thiệu (Introduction)
Kể về một chuyến đi (Travel/Holiday) là một chủ đề cực kỳ phổ biến trong IELTS Speaking Part 2. Để câu chuyện sinh động và đúng ngữ pháp, bạn cần kết hợp nhuần nhuyễn giữa **Thì Quá khứ đơn** (diễn tả các sự kiện đã hoàn thành) và **Thì Quá khứ tiếp diễn** (diễn tả bối cảnh hoặc hành động đang xảy ra tại một thời điểm trong quá khứ).

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### Thì Quá khứ đơn (Past Simple)
> Động từ thường: \`S + V2/ed\` (e.g., *visited, went*)
> Động từ To Be: \`S + was/were\`

##### Thì Quá khứ tiếp diễn (Past Continuous)
> Cấu trúc: \`S + was/were + V-ing\`

##### Sự kết hợp phổ biến (Sử dụng When / While):
> \`S + was/were + V-ing (hành động đang kéo dài) + WHEN + S + V2/ed (hành động ngắn cắt ngang)\`
> \`WHILE + S + was/were + V-ing, S + V2/ed\`

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- **Quá khứ đơn:** Dùng để liệt kê các chuỗi hành động nối tiếp nhau trong chuyến đi (ví dụ: đặt vé, bay đến nơi, nhận phòng khách sạn).
- **Quá khứ tiếp diễn:** Dùng để mô tả bối cảnh xung quanh lúc đó (ví dụ: khi tôi đang đi dạo trên bãi biển thì trời đổ mưa).

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *Last summer, we went to Paris and visited the Eiffel Tower.* (Mùa hè năm ngoái chúng tôi đi Paris và thăm tháp Eiffel - hành động đã hoàn thành trong quá khứ).
- **✓ Đúng:** *While I was waiting for the train, I saw an old friend.* (Trong lúc tôi đang đợi tàu thì gặp một người bạn cũ).
- **✗ Sai:** *I was go to Da Nang last month.*
  *(Giải thích: Đã có trạng từ quá khứ "last month", phải dùng động từ cột 2 "went" thay vì "was go").*
- **✗ Sai:** *We walked on the street when it started to rain.*
  *(Giải thích: Hành động đi bộ đang xảy ra thì trời mưa cắt ngang, hành động đi bộ phải chia quá khứ tiếp diễn. Sửa đúng: "We were walking on the street when it started to rain").*

---

#### 5. Tổng kết (Summary)
- Hành động **đang xảy ra** chia ở **Quá khứ tiếp diễn** (\`was/were + V-ing\`).
- Hành động **xen ngang, cắt ngang** chia ở **Quá khứ đơn** (\`V2/ed\`).
- Luôn học thuộc lòng bảng Động từ bất quy tắc để sử dụng Quá khứ đơn chính xác.`,

  'unit-20': `### Bài giảng Ngữ pháp: So sánh hơn & So sánh nhất (Comparatives & Superlatives)

#### 1. Giới thiệu (Introduction)
Khi thảo luận về chủ đề Phương tiện giao thông (Transport), chúng ta liên tục phải so sánh các phương án di chuyển khác nhau về chi phí, tốc độ, và sự tiện lợi. Nắm vững cấu trúc **So sánh hơn (Comparatives)** và **So sánh nhất (Superlatives)** giúp bạn đưa ra lập luận thuyết phục trong cả IELTS Speaking và Writing Task 1.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### So sánh hơn (Comparatives)
- **Tính từ ngắn (1 âm tiết):**
  > \`S1 + be + Adj-er + than + S2\` (e.g., *cheaper, faster*)
- **Tính từ dài (2 âm tiết trở lên):**
  > \`S1 + be + more + Adj + than + S2\` (e.g., *more expensive, more convenient*)

##### So sánh nhất (Superlatives)
- **Tính từ ngắn:**
  > \`S + be + the + Adj-est\` (e.g., *the cheapest, the fastest*)
- **Tính từ dài:**
  > \`S + be + the + most + Adj\` (e.g., *the most expensive, the most convenient*)

##### Tính từ bất quy tắc phổ biến:
- *good → better → the best*
- *bad → worse → the worst*
- *far → further/farther → the furthest/farthest*

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- **So sánh hơn:** Dùng để đối chiếu giữa 2 phương tiện (ví dụ: Đi tàu hỏa thì thoải mái hơn đi xe buýt).
- **So sánh nhất:** Dùng để so sánh một phương tiện nổi bật nhất trong cả nhóm từ 3 đối tượng trở lên (ví dụ: Máy bay là phương tiện nhanh nhất).

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *Traveling by train is more comfortable than traveling by bus.* (Đi tàu hỏa thì thoải mái hơn đi xe buýt - đúng cấu trúc tính từ dài).
- **✓ Đúng:** *The metro is the fastest way to travel around the city.* (Tàu điện ngầm là cách di chuyển nhanh nhất quanh thành phố).
- **✗ Sai:** *Bicycles are more cheap than motorbikes.*
  *(Giải thích: "Cheap" là tính từ ngắn, dạng so sánh hơn là "cheaper", không dùng "more cheap". Sửa đúng: "Bicycles are cheaper than...").*
- **✗ Sai:** *This car is the most best option for a family.*
  *(Giải thích: "Best" đã là so sánh nhất của "good", không dùng thêm "most". Sửa đúng: "This car is the best option...").*

---

#### 5. Tổng kết (Summary)
- Tính từ **ngắn** thêm đuôi **-er / -est**.
- Tính từ **dài** đi kèm với từ **more / most**.
- Luôn đi kèm từ **than** trong so sánh hơn và từ **the** trong so sánh nhất.`,

  'unit-23': `### Bài giảng Ngữ pháp: Động từ khuyết thiếu (Modal Verbs: Must, Have to, Should)

#### 1. Giới thiệu (Introduction)
Trong môi trường công việc và nghề nghiệp (Jobs & Careers), chúng ta thường phải thảo luận về nội quy, nghĩa vụ và lời khuyên tại nơi làm việc. Việc sử dụng chính xác các động từ khuyết thiếu như **Must, Have to** (bắt buộc) và **Should** (khuyên bảo) sẽ giúp bạn thể hiện sự chuyên nghiệp trong giao tiếp tiếng Anh công sở.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### Công thức chung:
> \`Subject + Modal Verb + Verb (nguyên thể không chia)\`

##### Chi tiết cách dùng từng từ:
- **Must:** Bắt buộc mang tính chủ quan (quy định nội bộ, tự bản thân thấy cần thiết).
  > Phủ định: **Must not / Mustn't** (Cấm đoán hoàn toàn).
- **Have to:** Bắt buộc mang tính khách quan (do luật pháp, quy định của công ty bắt buộc).
  > Phủ định: **Don't have to / Doesn't have to** (Không cần thiết phải làm, nhưng nếu muốn vẫn có thể làm).
- **Should:** Khuyên bảo, đề xuất nên làm gì.
  > Phủ định: **Should not / Shouldn't** (Không nên làm).

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- Dùng **Have to** khi nói về thời gian làm việc bắt buộc (ví dụ: Tôi phải đi làm lúc 8h sáng).
- Dùng **Mustn't** cho các hành động cấm kị tại nơi làm việc (ví dụ: Không được đi muộn).
- Dùng **Should** để tư vấn hoặc đưa ra giải pháp cải thiện công việc.

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *Doctors have to wear a white coat in the hospital.* (Bác sĩ phải mặc áo blouse trắng trong bệnh viện - luật bắt buộc).
- **✓ Đúng:** *You don't have to work on Sundays.* (Bạn không cần đi làm vào ngày Chủ Nhật - không bắt buộc).
- **✗ Sai:** *We must to follow the safety rules.*
  *(Giải thích: Sau must là động từ nguyên mẫu trực tiếp, không dùng "to". Sửa đúng: "We must follow...").*
- **✗ Sai:** *You don't have to smoke in the office.*
  *(Giải thích: Hút thuốc trong văn phòng bị cấm hoàn toàn, phải dùng "mustn't". Sửa đúng: "You mustn't smoke in...").*

---

#### 5. Tổng kết (Summary)
- **Must** và **Have to** đều có nghĩa là phải làm, nhưng phủ định của chúng hoàn toàn khác nhau:
  - **Mustn't:** Cấm làm.
  - **Don't have to:** Không bắt buộc làm.
- Sau động từ khuyết thiếu, động từ đi kèm luôn giữ nguyên thể (V-infinitive).`,

  'unit-30': `### Bài giảng Ngữ pháp: Mệnh đề quan hệ (Relative Clauses)

#### 1. Giới thiệu (Introduction)
Để nâng cao điểm số IELTS (đặc biệt là tiêu chí Grammatical Range and Accuracy), việc viết các câu phức là vô cùng quan trọng. **Mệnh đề quan hệ (Relative Clauses)** giúp bạn nối hai câu đơn lại với nhau, cung cấp thêm thông tin về người, vật, hoặc nơi chốn một cách tự nhiên mà không cần lặp từ.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

##### Các đại từ quan hệ phổ biến:
- **Who:** Thay thế cho danh từ chỉ **Người** đóng vai trò chủ ngữ.
  > \`Danh từ (người) + WHO + Verb\`
- **Which:** Thay thế cho danh từ chỉ **Vật / Sự việc**.
  > \`Danh từ (vật) + WHICH + Verb / Clause\`
- **That:** Có thể thay thế cho cả *Who* và *Which* trong mệnh đề xác định.
- **Where:** Thay thế cho danh từ chỉ **Nơi chốn**.
  > \`Danh từ (nơi chốn) + WHERE + Subject + Verb\`

---

#### 3. Cách dùng chi tiết (Detailed Usage)
- **Mệnh đề quan hệ xác định (Defining):** Cung cấp thông tin bắt buộc phải có để hiểu rõ danh từ đứng trước là ai/cái gì. Không dùng dấu phẩy.
- **Mệnh đề quan hệ không xác định (Non-defining):** Cung cấp thông tin phụ thêm, danh từ trước đã rõ nghĩa. Bắt buộc phải ngăn cách bằng dấu phẩy và không được dùng đại từ "That".

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *The teacher who taught me English was very friendly.* (Giáo viên người mà dạy tôi tiếng Anh rất thân thiện).
- **✓ Đúng:** *This is the school where I studied when I was young.* (Đây là ngôi trường nơi mà tôi học khi còn nhỏ).
- **✗ Sai:** *The book who I read yesterday was very interesting.*
  *(Giải thích: Danh từ "The book" chỉ vật, phải dùng "which" hoặc "that" chứ không dùng "who". Sửa đúng: "The book which I read...").*
- **✗ Sai:** *London, that is the capital of the UK, is a historic city.*
  *(Giải thích: Đây là mệnh đề không xác định có dấu phẩy, không được dùng "that". Sửa đúng: "London, which is the capital...").*

---

#### 5. Tổng kết (Summary)
- Nhớ quy tắc: **Who** cho người, **Which** cho vật, **Where** cho địa điểm.
- Sử dụng mệnh đề quan hệ giúp bài viết trôi chảy hơn và tránh bị lặp các câu đơn ngắn.`,

  'unit-33': `### Bài giảng Ngữ pháp: Câu điều kiện loại 1 (First Conditional)

#### 1. Giới thiệu (Introduction)
Khi thảo luận về công nghệ, internet và sự phát triển trong tương lai (Technology & Tech), chúng ta thường phải đưa ra các dự đoán về kết quả dựa trên các điều kiện thực tế ở hiện tại. **Câu điều kiện loại 1 (First Conditional)** là cấu trúc ngữ pháp chuẩn xác nhất để diễn tả các giả định có thật và khả năng xảy ra của chúng trong tương lai.

---

#### 2. Công thức & Cấu trúc (Formulas & Structure)

> **Cấu trúc:**
> \`IF + Chủ ngữ 1 + Động từ (Hiện tại đơn), Chủ ngữ 2 + WILL/CAN/MAY + Động từ (Nguyên thể)\`
>
> Hoặc đảo ngược:
> \`Chủ ngữ 2 + WILL/CAN/MAY + Động từ (Nguyên thể) + IF + Chủ ngữ 1 + Động từ (Hiện tại đơn)\`

##### Lưu ý:
- Nếu mệnh đề **If** đứng đầu câu, bắt buộc phải có **dấu phẩy** ngăn cách giữa hai mệnh đề.
- Nếu mệnh đề **If** đứng sau, không cần dấu phẩy.

---

#### 3. Cách dùng chi tiết (Detailed Usage)
Dùng để dự đoán sự thay đổi khi áp dụng công nghệ mới:
- Ví dụ: Nếu chúng ta sử dụng AI, chúng ta sẽ tiết kiệm thời gian hơn.
- Giả định ở hiện tại có khả năng cao sẽ xảy ra ở tương lai.

---

#### 4. Ví dụ thực tế (Practical Examples)
- **✓ Đúng:** *If you use a fast internet connection, you will load videos instantly.* (Nếu bạn dùng kết nối mạng nhanh, bạn sẽ tải video ngay lập tức).
- **✓ Đúng:** *People will work from home if technology continues to improve.* (Mọi người sẽ làm việc tại nhà nếu công nghệ tiếp tục cải tiến).
- **✗ Sai:** *If the technology will improve, we will have smarter homes.*
  *(Giải thích: Mệnh đề If phải chia ở hiện tại đơn, không chia ở tương lai "will improve". Sửa đúng: "If the technology improves...").*
- **✗ Sai:** *If he uses his phone too much he will get tired.*
  *(Giải thích: Mệnh đề If đứng đầu câu thiếu dấu phẩy ngăn cách. Sửa đúng: "...too much, he will...").*

---

#### 5. Tổng kết (Summary)
- Mệnh đề **IF** chia thì **Hiện tại đơn** (Present Simple).
- Mệnh đề **chính (Kết quả)** chia thì **Tương lai đơn** (Will + V).
`
};

async function seed() {
  try {
    console.log("Starting seeding of grammar tutorials...");
    
    // Check if we can find the content source for mindset-foundation
    const { data: source } = await supabase
      .from('content_sources')
      .select('id')
      .eq('slug', 'mindset-foundation')
      .maybeSingle();

    if (!source) {
      console.error("mindset-foundation source not found! Cannot seed.");
      return;
    }

    const { data: nodes, error: fetchErr } = await supabase
      .from('curriculum_nodes')
      .select('id, slug, metadata, title')
      .eq('source_id', source.id);

    if (fetchErr) throw fetchErr;
    
    console.log(`Found ${nodes?.length} nodes in source. Updating grammar nodes...`);

    let updatedCount = 0;
    for (const node of (nodes || [])) {
      if (tutorials[node.slug]) {
        console.log(`Updating ${node.title} (${node.slug})...`);
        const updatedMetadata = {
          ...(node.metadata || {}),
          grammar_tutorial: tutorials[node.slug]
        };

        const { error: updateErr } = await supabase
          .from('curriculum_nodes')
          .update({ metadata: updatedMetadata })
          .eq('id', node.id);

        if (updateErr) {
          console.error(`Error updating ${node.slug}:`, updateErr.message);
        } else {
          console.log(`Successfully seeded tutorial for ${node.slug}`);
          updatedCount++;
        }
      }
    }

    console.log(`Seeding finished. Updated ${updatedCount} nodes.`);
  } catch (e) {
    console.error("Seeding failed:", e);
  }
}

seed();
