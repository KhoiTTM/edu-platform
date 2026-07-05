import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
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
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- MARKDOWN CONTENTS ---
const LESSON_5_MD = `### Bài 5: Làm quen với số thập phân vô hạn tuần hoàn

#### 1. Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn
Khi ta chia một phân số:
- **Số thập phân hữu hạn:** Ví dụ $3 : 4 = 0,75$. Phép chia kết thúc và có số lượng chữ số sau dấu phẩy hữu hạn.
- **Số thập phân vô hạn tuần hoàn:** Ví dụ $5 : 3 = 1,666...$. Chữ số 6 lặp lại vô tận. Chữ số lặp lại đó được gọi là **chu kì**.
  - Ký hiệu rút gọn bằng dấu ngoặc đơn: $1,666... = 1,(6)$.

> **Ví dụ:** Viết $\\frac{1}{6}$ và $\\frac{15}{11}$ dưới dạng số thập phân.
> - $\\frac{1}{6} = 0,1666... = 0,1(6)$ (vô hạn tuần hoàn chu kì 6).
> - $\\frac{15}{11} = 1,3636... = 1,(36)$ (vô hạn tuần hoàn chu kì 36).

#### 2. Nhận xét
- Mỗi số hữu tỉ đều được biểu diễn bởi một số thập phân hữu hạn hoặc vô hạn tuần hoàn.
- Ngược lại, mỗi số thập phân hữu hạn hoặc vô hạn tuần hoàn đều biểu diễn một số hữu tỉ.
`;

const LESSON_6_MD = `### Bài 6: Số vô tỉ. Căn bậc hai số học

#### 1. Số vô tỉ
Số vô tỉ là số viết được dưới dạng số thập phân vô hạn **không tuần hoàn**.
- Kí hiệu tập hợp số vô tỉ là $\\mathbb{I}$ (tuy nhiên thường xét chung trong tập số thực $\\mathbb{R}$).
- **Ví dụ:** 
  - Số $x = 0,1010010001...$ (số chữ số 0 tăng dần sau mỗi chữ số 1).
  - Số $\\pi \\approx 3,14159265...$
  - Các số căn của số không phải số chính phương như $\\sqrt{2} \\approx 1,414213...$

#### 2. Căn bậc hai số học
Căn bậc hai số học của một số không âm $a$, kí hiệu là $\\sqrt{a}$, là số không âm $x$ sao cho $x^2 = a$.
- **Quy ước:** $\\sqrt{0} = 0$.
- **Lưu ý:** Chỉ tính được căn bậc hai số học của các số lớn hơn hoặc bằng 0.

> **Ví dụ:** 
> - $\\sqrt{16} = 4$ (vì $4 > 0$ và $4^2 = 16$).
> - $\\sqrt{0,25} = 0,5$ (vì $0,5 > 0$ và $0,5^2 = 0,25$).

#### 3. Sử dụng máy tính cầm tay
Sử dụng phím $\\sqrt{}$ trên máy tính bỏ túi để tìm giá trị đúng hoặc gần đúng của các số vô tỉ.
- **Ví dụ:** $\\sqrt{5} \\approx 2,236$ (làm tròn đến chữ số thập phân thứ ba).
`;

const LESSON_7_MD = `### Bài 7: Tập hợp các số thực

#### 1. Khái niệm số thực
Số hữu tỉ và số vô tỉ được gọi chung là **số thực**.
- Tập hợp các số thực được kí hiệu là $\\mathbb{R}$.
- Quan hệ bao hàm giữa các tập hợp số:
  - $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$
  - $\\mathbb{I} \\subset \\mathbb{R}$ (tập số vô tỉ nằm trong tập số thực).

#### 2. Thứ tự trong tập hợp các số thực
- So sánh các số thực tương tự như so sánh các số thập phân.
- Với hai số thực dương $a, b$: Nếu $a < b$ thì $\\sqrt{a} < \\sqrt{b}$.
- **Trục số thực:** Mỗi số thực được biểu diễn bởi một điểm duy nhất trên trục số. Trục số biểu diễn đầy đủ tất cả các số thực nên gọi là trục số thực.

#### 3. Giá trị tuyệt đối của một số thực
Giá trị tuyệt đối của số thực $x$, kí hiệu $|x|$, là khoảng cách từ điểm $x$ trên trục số đến điểm gốc 0.
- Nếu $x > 0$ thì $|x| = x$.
- Nếu $x < 0$ thì $|x| = -x$ (đối của số âm).
- Nếu $x = 0$ thì $|x| = 0$.
`;

// --- QUESTIONS BANK ---
const L5_QUESTIONS = [
  { question: "Đâu là số thập phân vô hạn tuần hoàn trong các số dưới đây?", options: ["$1,(6)$", "$0,75$", "$-0,35$", "$1,123$"], correct_index: 0, explanation: "$1,(6)$ có chu kỳ 6 lặp lại vô hạn, nên là số thập phân vô hạn tuần hoàn.", difficulty: 1.0 },
  { question: "Phân số $\\frac{1}{6}$ viết dưới dạng số thập phân chu kì là:", options: ["$0,1(6)$", "$0,(16)$", "$0,16$", "$0,166$"], correct_index: 0, explanation: "$\\frac{1}{6} = 0,1666... = 0,1(6)$.", difficulty: 1.0 },
  { question: "Viết phân số $\\frac{15}{11}$ dưới dạng số thập phân biểu diễn chu kì:", options: ["$1,(36)$", "$1,3(6)$", "$1,(3)$", "$1,36$"], correct_index: 0, explanation: "$\\frac{15}{11} = 1,3636... = 1,(36)$.", difficulty: 1.0 },
  { question: "Viết gọn số thập phân sau sử dụng ký hiệu chu kì: $1,123123...$", options: ["$1,(123)$", "$1,1(23)$", "$1,12(3)$", "$1,123$"], correct_index: 0, explanation: "Chu kỳ lặp là 123 nên ta viết gọn là $1,(123)$.", difficulty: 1.0 },
  { question: "Số thập phân vô hạn tuần hoàn $-0,02121...$ viết gọn dưới dạng chu kì là:", options: ["$-0,0(21)$", "$-0,(021)$", "$-0,02(1)$", "$-0,021$"], correct_index: 0, explanation: "Số hạng lặp lại tuần hoàn là 21, bắt đầu sau chữ số 0, nên viết là $-0,0(21)$.", difficulty: 1.5 },
  { question: "Phân số $\\frac{4}{11}$ khi viết dưới dạng số thập phân có chu kì là:", options: ["$36$", "$3$", "$6$", "$63$"], correct_index: 0, explanation: "$\\frac{4}{11} = 0,3636... = 0,(36)$ nên chu kì là 36.", difficulty: 1.0 },
  { question: "Mỗi số hữu tỉ bất kỳ luôn được biểu diễn dưới dạng nào?", options: ["Số thập phân hữu hạn hoặc vô hạn tuần hoàn", "Số thập phân vô hạn không tuần hoàn", "Chỉ số thập phân hữu hạn", "Chỉ số thập phân vô hạn tuần hoàn"], correct_index: 0, explanation: "Theo tính chất số hữu tỉ, mỗi số hữu tỉ luôn biểu diễn được dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn.", difficulty: 1.0 },
  { question: "Số thập phân $0,08(3)$ biểu diễn phân số tối giản nào?", options: ["$\\frac{1}{12}$", "$\\frac{1}{15}$", "$\\frac{1}{9}$", "$\\frac{5}{8}$"], correct_index: 0, explanation: "$0,08(3) = 0,08333... = \\frac{1}{12}$.", difficulty: 1.5 },
  { question: "Số thập phân $0,0(6)$ biểu diễn phân số tối giản nào?", options: ["$\\frac{1}{15}$", "$\\frac{1}{12}$", "$\\frac{1}{30}$", "$\\frac{1}{6}$"], correct_index: 0, explanation: "$0,0(6) = 0,0666... = \\frac{1}{15}$.", difficulty: 1.5 },
  { question: "Số thập phân vô hạn tuần hoàn $0,1212...$ có phải số hữu tỉ không?", options: ["Có, vì nó có chu kỳ lặp lại tuần hoàn", "Không, vì nó kéo dài vô hạn", "Không, vì nó là số vô tỉ", "Chưa xác định được"], correct_index: 0, explanation: "Mọi số thập phân vô hạn tuần hoàn đều biểu diễn một số hữu tỉ.", difficulty: 1.0 }
];

const L6_QUESTIONS = [
  { question: "Số vô tỉ là số viết được dưới dạng:", options: ["Số thập phân vô hạn không tuần hoàn", "Số thập phân hữu hạn", "Số thập phân vô hạn tuần hoàn", "Phân số"], correct_index: 0, explanation: "Định nghĩa số vô tỉ là số thập phân vô hạn không tuần hoàn.", difficulty: 1.0 },
  { question: "Số nào sau đây là số vô tỉ?", options: ["$\\sqrt{2}$", "$0,75$", "$\\frac{-1}{3}$", "$1,(6)$"], correct_index: 0, explanation: "$\\sqrt{2} \\approx 1,4142...$ là số vô tỉ vì bình phương của nó bằng 2 và phần thập phân kéo dài vô hạn không tuần hoàn.", difficulty: 1.0 },
  { question: "Đại lượng nào dưới đây là số vô tỉ nổi tiếng biểu diễn tỷ số chu vi đường tròn chia cho đường kính?", options: ["Số $\\pi$", "Số $e$", "Hằng số G", "Số $\\sqrt{4}$"], correct_index: 0, explanation: "Số $\\pi = 3,14159...$ là một số vô tỉ nổi tiếng.", difficulty: 1.0 },
  { question: "Căn bậc hai số học của số không âm $a$ là số không âm $x$ thỏa mãn đẳng thức nào?", options: ["$x^2 = a$", "$a^2 = x$", "$x = a$", "$x^2 = a^2$"], correct_index: 0, explanation: "Định nghĩa căn bậc hai số học của số $a \\ge 0$ là số $x \\ge 0$ sao cho $x^2 = a$.", difficulty: 1.0 },
  { question: "Tính giá trị căn bậc hai số học sau: $\\sqrt{16}$", options: ["$4$", "$-4$", "$8$", "$256$"], correct_index: 0, explanation: "$\\sqrt{16} = 4$ vì $4 > 0$ và $4^2 = 16$.", difficulty: 1.0 },
  { question: "Tính căn bậc hai số học: $\\sqrt{0,25}$", options: ["$0,5$", "$0,05$", "$5$", "$-0,5$"], correct_index: 0, explanation: "$\\sqrt{0,25} = 0,5$ vì $0,5 > 0$ và $0,5^2 = 0,25$.", difficulty: 1.0 },
  { question: "Tính giá trị của biểu thức: $\\sqrt{81} - \\sqrt{1,21}$", options: ["$7,9$", "$8,9$", "$9,9$", "$6,9$"], correct_index: 0, explanation: "$\\sqrt{81} = 9$, $\\sqrt{1,21} = 1,1$. Khi đó $9 - 1,1 = 7,9$.", difficulty: 1.5 },
  { question: "Tìm giá trị của $x$ biết $x^2 = 2$ và $x > 0$.", options: ["$\\sqrt{2}$", "$2$", "$4$", "$1,4$"], correct_index: 0, explanation: "Vì $x^2 = 2$ và $x$ dương nên $x$ là căn bậc hai số học của 2, tức là $\\sqrt{2}$.", difficulty: 1.2 },
  { question: "Làm tròn số $\\sqrt{5} \\approx 2,236067...$ đến chữ số thập phân thứ ba ta được kết quả là:", options: ["$2,236$", "$2,237$", "$2,23$", "$2,24$"], correct_index: 0, explanation: "Chữ số sau chữ số hàng phần nghìn (6) là 0 (< 5) nên ta giữ nguyên là 2,236.", difficulty: 1.2 },
  { question: "Sử dụng máy tính cầm tay, tính $\\sqrt{15}$ làm tròn đến hàng phần trăm:", options: ["$3,87$", "$3,88$", "$3,9$", "$3,8$"], correct_index: 0, explanation: "$\\sqrt{15} \\approx 3,8729...$ làm tròn đến chữ số thập phân thứ hai là 3,87.", difficulty: 1.2 }
];

const L7_QUESTIONS = [
  { question: "Tập hợp các số thực được kí hiệu bằng chữ cái nào?", options: ["$\\mathbb{R}$", "$\\mathbb{Q}$", "$\\mathbb{Z}$", "$\\mathbb{I}$"], correct_index: 0, explanation: "Tập hợp các số thực được kí hiệu là R.", difficulty: 1.0 },
  { question: "Mối quan hệ bao hàm nào dưới đây đúng giữa các tập số?", options: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$", "$\\mathbb{R} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{N}$", "$\\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{R}$", "$\\mathbb{Q} \\subset \\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{R}$"], correct_index: 0, explanation: "Số tự nhiên thuộc số nguyên, số nguyên thuộc số hữu tỉ, số hữu tỉ thuộc số thực.", difficulty: 1.0 },
  { question: "Cách viết nào dưới đây biểu diễn một khẳng định SAI?", options: ["$\\sqrt{2} \\in \\mathbb{Q}$", "$\\sqrt{2} \\in \\mathbb{R}$", "$\\pi \\in \\mathbb{R}$", "$-2,3 \\in \\mathbb{R}$"], correct_index: 0, explanation: "$\\sqrt{2}$ là số vô tỉ nên không thể thuộc tập số hữu tỉ Q.", difficulty: 1.0 },
  { question: "So sánh hai số thực: $0,3131...$ và $0,32$.", options: ["$0,3131... < 0,32$", "$0,3131... > 0,32$", "$0,3131... = 0,32$", "Không so sánh được"], correct_index: 0, explanation: "Ở hàng phần trăm, ta có 1 < 2 nên $0,3131... < 0,32$.", difficulty: 1.2 },
  { question: "So sánh 2 số thực sau: $2$ và $\\sqrt{3}$.", options: ["$2 > \\sqrt{3}$", "$2 < \\sqrt{3}$", "$2 = \\sqrt{3}$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $2 = \\sqrt{4}$. Vì $4 > 3$ nên $\\sqrt{4} > \\sqrt{3}$, suy ra $2 > \\sqrt{3}$.", difficulty: 1.2 },
  { question: "So sánh cặp số thực âm: $-1,5$ và $-1,55$.", options: ["$-1,5 > -1,55$", "$-1,5 < -1,55$", "$-1,5 = -1,55$", "Không so sánh được"], correct_index: 0, explanation: "Vì $1,5 < 1,55$ nên khi có dấu âm, chiều so sánh đổi lại: $-1,5 > -1,55$.", difficulty: 1.5 },
  { question: "So sánh số thực dương $\\sqrt{5}$ và $2,36$.", options: ["$\\sqrt{5} < 2,36$", "$\\sqrt{5} > 2,36$", "$\\sqrt{5} = 2,36$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $2,36^2 = 5,5696 > 5$ nên $2,36 > \\sqrt{5}$, hay $\\sqrt{5} < 2,36$.", difficulty: 1.5 },
  { question: "Giá trị tuyệt đối của số thực $-3,5$ là:", options: ["$3,5$", "$-3,5$", "$0$", "$1$"], correct_index: 0, explanation: "Vì $-3,5 < 0$ nên $|-3,5| = -(-3,5) = 3,5$.", difficulty: 1.0 },
  { question: "Giá trị tuyệt đối $|\\sqrt{5}|$ bằng:", options: ["$\\sqrt{5}$", "$-\\sqrt{5}$", "$5$", "$-5$"], correct_index: 0, explanation: "Vì $\\sqrt{5} > 0$ nên $|\\sqrt{5}| = \\sqrt{5}$.", difficulty: 1.0 },
  { question: "Mỗi điểm biểu diễn trên trục số thực biểu diễn:", options: ["Một số thực duy nhất", "Một số hữu tỉ duy nhất", "Một số nguyên duy nhất", "Nhiều số thực khác nhau"], correct_index: 0, explanation: "Mỗi điểm trên trục số biểu diễn duy nhất một số thực, và ngược lại.", difficulty: 1.0 }
];

const EXAM2_QUESTIONS = [
  { question: "Phân số $\\frac{1}{6}$ viết dưới dạng số thập phân chu kì là:", options: ["$0,1(6)$", "$0,(16)$", "$0,16$", "$0,166$"], correct_index: 0, explanation: "$\\frac{1}{6} = 0,1666... = 0,1(6)$", difficulty: 1.0 },
  { question: "Số nào dưới đây thuộc tập hợp số vô tỉ?", options: ["$\\sqrt{2}$", "$0,75$", "$\\frac{-1}{3}$", "$1,(6)$"], correct_index: 0, explanation: "$\\sqrt{2}$ là số vô tỉ vì bình phương bằng 2 (không phải số chính phương).", difficulty: 1.0 },
  { question: "Tính căn bậc hai số học: $\\sqrt{0,25}$", options: ["$0,5$", "$0,05$", "$5$", "$-0,5$"], correct_index: 0, explanation: "$0,5^2 = 0,25$ nên $\\sqrt{0,25} = 0,5$.", difficulty: 1.0 },
  { question: "Tính giá trị biểu thức: $\\sqrt{81} - \\sqrt{1,21}$", options: ["$7,9$", "$8,9$", "$9,9$", "$6,9$"], correct_index: 0, explanation: "$9 - 1,1 = 7,9$", difficulty: 1.2 },
  { question: "Cách viết nào dưới đây thể hiện mối quan hệ tập hợp đúng?", options: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$", "$\\mathbb{R} \\subset \\mathbb{Q}$", "$\\mathbb{I} \\subset \\mathbb{Q}$", "$\\mathbb{Q} \\subset \\mathbb{I}$"], correct_index: 0, explanation: "Số tự nhiên con số nguyên, con số hữu tỉ, con số thực.", difficulty: 1.0 },
  { question: "So sánh hai số thực: $2$ và $\\sqrt{3}$.", options: ["$2 > \\sqrt{3}$", "$2 < \\sqrt{3}$", "$2 = \\sqrt{3}$", "Không so sánh được"], correct_index: 0, explanation: "$2 = \\sqrt{4} > \\sqrt{3}$", difficulty: 1.0 },
  { question: "So sánh hai số thực âm: $-1,5$ và $-1,55$.", options: ["$-1,5 > -1,55$", "$-1,5 < -1,55$", "$-1,5 = -1,55$", "Không so sánh được"], correct_index: 0, explanation: "$-1,5 > -1,55$", difficulty: 1.2 },
  { question: "Giá trị tuyệt đối của số thực $-3,5$ là:", options: ["$3,5$", "$-3,5$", "$0$", "$3.05$"], correct_index: 0, explanation: "$|-3,5| = 3,5$", difficulty: 1.0 },
  { question: "Viết gọn số thập phân sau sử dụng ký hiệu chu kì: $1,123123...$", options: ["$1,(123)$", "$1,1(23)$", "$1,12(3)$", "$1,123$"], correct_index: 0, explanation: "Chu kỳ tuần hoàn là 123.", difficulty: 1.0 },
  { question: "Giá trị tuyệt đối $|\\sqrt{5}|$ bằng:", options: ["$\\sqrt{5}$", "$-\\sqrt{5}$", "$5$", "$-5$"], correct_index: 0, explanation: "$|\\sqrt{5}| = \sqrt{5}$ vì $\\sqrt{5} > 0$.", difficulty: 1.0 },
  { question: "Mỗi điểm trên trục số thực biểu diễn điểm của tập hợp số nào?", options: ["Số thực", "Số hữu tỉ", "Số nguyên", "Số tự nhiên"], correct_index: 0, explanation: "Trục số biểu diễn đầy đủ tất cả các số thực.", difficulty: 1.0 },
  { question: "Số thập phân $0,0(6)$ biểu diễn phân số tối giản nào?", options: ["$\\frac{1}{15}$", "$\\frac{1}{12}$", "$\\frac{1}{30}$", "$\\frac{1}{6}$"], correct_index: 0, explanation: "$0,0(6) = \\frac{1}{15}$", difficulty: 1.5 },
  { question: "So sánh số thực dương $\\sqrt{5}$ và $2,36$.", options: ["$\\sqrt{5} < 2,36$", "$\\sqrt{5} > 2,36$", "$\\sqrt{5} = 2,36$", "Không so sánh được"], correct_index: 0, explanation: "$2,36^2 = 5,5696 > 5$ nên $\\sqrt{5} < 2,36$.", difficulty: 1.5 },
  { question: "Tính kết quả làm tròn số $\\sqrt{5}$ đến chữ số thập phân thứ ba:", options: ["$2,236$", "$2,237$", "$2,23$", "$2,24$"], correct_index: 0, explanation: "$\\sqrt{5} \\approx 2,23606... \\approx 2,236$.", difficulty: 1.2 },
  { question: "Số nào dưới đây không phải là số hữu tỉ?", options: ["$\\sqrt{3}$", "$0,1212...$", "$0,75$", "$-1,25$"], correct_index: 0, explanation: "$\\sqrt{3}$ là số vô tỉ, còn lại là các số thập phân hữu hạn/vô hạn tuần hoàn nên là số hữu tỉ.", difficulty: 1.2 }
];

async function seedLesson(slug: string, markdown: string, questions: any[], conceptSlug: string) {
  // 1. Fetch Lesson Node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', slug)
    .single();

  if (!lessonNode) {
    console.error(`❌ Lesson node '${slug}' not found!`);
    return;
  }

  // Update metadata to include grammar_tutorial
  const updatedMetadata = {
    ...(lessonNode.metadata as any || {}),
    grammar_tutorial: markdown
  };

  const { error: updateError } = await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

  if (updateError) throw updateError;
  console.log(`✅ Theory updated for ${slug}`);

  // 2. Fetch Concept
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', conceptSlug)
    .single();

  if (!concept) {
    console.error(`❌ Concept '${conceptSlug}' not found!`);
    return;
  }

  // Clear existing questions
  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);

  // Insert questions
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await supabase
      .from('question_bank')
      .insert({
        concept_id: concept.id,
        type: 'multiple_choice',
        difficulty: q.difficulty || 1.0,
        metadata_json: {
          question: q.question,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation
        },
        source: 'handcrafted',
        status: 'approved',
        grade: 7,
        subject_slug: 'toan'
      });
  }
  console.log(`✅ Seeded ${questions.length} questions for ${slug}`);
}

async function main() {
  console.log("🚀 Starting Chapter 2 Seeding...");

  // Seed Lesson 5
  await seedLesson(
    'bai-5-so-thap-phan-vo-han-tuan-hoan',
    LESSON_5_MD,
    L5_QUESTIONS,
    'concept-bai-5-so-thap-phan-vo-han-tuan-hoan'
  );

  // Seed Lesson 6
  await seedLesson(
    'bai-6-so-vo-ti-can-bac-hai-so-hoc',
    LESSON_6_MD,
    L6_QUESTIONS,
    'concept-bai-6-so-vo-ti-can-bac-hai-so-hoc'
  );

  // Seed Lesson 7
  await seedLesson(
    'bai-7-tap-hop-cac-so-thuc',
    LESSON_7_MD,
    L7_QUESTIONS,
    'concept-bai-7-tap-hop-cac-so-thuc'
  );

  // Seed Chapter 2 Exam
  const examSlug = 'kiem-tra-chuong-2';
  const { data: examNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id, metadata')
    .eq('slug', examSlug)
    .single();

  if (examNode) {
    const examConceptSlug = 'concept-kiem-tra-chuong-2';
    const { data: concept } = await supabase
      .from('concepts')
      .upsert({
        source_id: examNode.source_id,
        slug: examConceptSlug,
        title: 'Kiểm tra tổng hợp Chương 2',
        description: 'Đánh giá kiến thức chương 2 số thực'
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (concept) {
      // Update Node metadata
      await supabase
        .from('curriculum_nodes')
        .update({
          metadata: {
            ...(examNode.metadata as any || {}),
            concept_id: concept.id
          }
        })
        .eq('id', examNode.id);

      // Link in lesson_concepts
      await supabase
        .from('lesson_concepts')
        .upsert({
          lesson_id: examNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });

      // Clear questions
      await supabase
        .from('question_bank')
        .delete()
        .eq('concept_id', concept.id);

      // Seed Questions
      for (const q of EXAM2_QUESTIONS) {
        await supabase
          .from('question_bank')
          .insert({
            concept_id: concept.id,
            type: 'multiple_choice',
            difficulty: q.difficulty || 1.0,
            metadata_json: {
              question: q.question,
              options: q.options,
              correct_index: q.correct_index,
              explanation: q.explanation
            },
            source: 'handcrafted',
            status: 'approved',
            grade: 7,
            subject_slug: 'toan'
          });
      }
      console.log(`✅ Seeded ${EXAM2_QUESTIONS.length} questions for Chapter 2 Exam.`);
    }
  }

  console.log("\n🎉 Chapter 2 Seeding Completed Successfully!");
}

main().catch(err => {
  console.error("❌ Master Chapter 2 seeding failed:", err);
  process.exit(1);
});
