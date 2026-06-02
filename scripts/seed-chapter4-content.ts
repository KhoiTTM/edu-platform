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

// --- MARKDOWN THEORY CONTENTS ---

const LESSON_9_MD = `### Bài 9: Tổng các góc trong một tam giác

#### 1. Định lí tổng ba góc trong một tam giác
Trong một tam giác bất kỳ, tổng số đo của ba góc luôn bằng $180^\\circ$.
- **Hệ thức:** Cho tam giác $ABC$, ta luôn có:
  - $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.
- **Hệ quả đối với tam giác vuông:** Trong một tam giác vuông, hai góc nhọn kề bù phụ nhau (tổng số đo của chúng bằng $90^\\circ$).

> **Ví dụ:** Cho tam giác $ABC$ có $\\widehat{A} = 80^\\circ, \\widehat{B} = 45^\\circ$. Tính góc $\\widehat{C}$.
> - $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (80^\\circ + 45^\\circ) = 55^\\circ$.

#### 2. Góc ngoài của tam giác
Góc kề bù với một góc trong của tam giác được gọi là **góc ngoài** của tam giác đó.
- **Tính chất:** Mỗi góc ngoài của một tam giác bằng tổng số đo của hai góc trong không kề với nó.
- **Hệ quả:** Góc ngoài của tam giác luôn lớn hơn mỗi góc trong không kề với nó.

<div class="flex justify-center my-4">
  <svg width="280" height="150" viewBox="0 0 280 150" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <polygon points="60,110 140,30 200,110" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="60" y1="110" x2="260" y2="110" stroke="#475569" stroke-width="2" />
    <text x="135" y="22" fill="#ffffff" font-size="12" font-weight="bold">A</text>
    <text x="50" y="125" fill="#ffffff" font-size="12" font-weight="bold">B</text>
    <text x="195" y="125" fill="#ffffff" font-size="12" font-weight="bold">C</text>
    <text x="250" y="125" fill="#94a3b8" font-size="12">x</text>
    <!-- Angle mark -->
    <path d="M 200 110 A 20 20 0 0 0 216 93" fill="none" stroke="#fbbf24" stroke-width="2" />
    <text x="215" y="105" fill="#fbbf24" font-size="11" font-weight="bold">y</text>
    <text x="180" y="100" fill="#94a3b8" font-size="9">1</text>
  </svg>
</div>

*Hình trên: Góc $ACx$ (kí hiệu là $y$) là góc ngoài tại đỉnh C của tam giác ABC. Ta có: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$.*
`;

const LESSON_10_MD = `### Bài 10: Tam giác bằng nhau. Trường hợp bằng nhau thứ nhất: Cạnh - Cạnh - Cạnh (c.c.c)

#### 1. Định nghĩa hai tam giác bằng nhau
Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.
- **Ký hiệu:** $\\Delta ABC = \\Delta A'B'C'$ nếu:
  - $AB = A'B', BC = B'C', AC = A'C'$
  - $\\widehat{A} = \\widehat{A'}, \\widehat{B} = \\widehat{B'}, \\widehat{C} = \\widehat{C'}$

#### 2. Trường hợp bằng nhau thứ nhất: Cạnh - Cạnh - Cạnh (c.c.c)
Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.
- **Quy tắc chứng minh:** Xét $\\Delta ABC$ và $\\Delta A'B'C'$ có:
  1. $AB = A'B'$
  2. $BC = B'C'$
  3. $AC = A'C'$
  $\\implies \\Delta ABC = \\Delta A'B'C'$ (c.c.c).

> **Ví dụ:** Cho tam giác $ABD$ và tam giác $CBD$ có chung cạnh $BD$, $AB = CB$, $AD = CD$. Chứng minh $\\Delta ABD = \\Delta CBD$.
> - Xét $\\Delta ABD$ và $\\Delta CBD$ có:
>   - $AB = CB$ (giả thiết)
>   - $AD = CD$ (giả thiết)
>   - $BD$ là cạnh chung.
>   - Vậy $\\Delta ABD = \\Delta CBD$ (c.c.c).
`;

const LESSON_11_MD = `### Bài 11: Trường hợp bằng nhau thứ hai: Cạnh - Góc - Cạnh (c.g.c)

#### 1. Định lí trường hợp bằng nhau Cạnh - Góc - Cạnh
Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau.
- **Chú ý:** Góc bằng nhau bắt buộc phải là **góc xen giữa** hai cạnh đã cho.

<div class="flex justify-center my-4">
  <svg width="280" height="150" viewBox="0 0 280 150" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- ABC and ADC sharing AC -->
    <polygon points="40,30 150,75 40,120" fill="none" stroke="#38bdf8" stroke-width="2" />
    <line x1="40" y1="30" x2="40" y2="120" stroke="#f43f5e" stroke-width="2" />
    <!-- Labels -->
    <text x="25" y="35" fill="#ffffff" font-size="12" font-weight="bold">B</text>
    <text x="160" y="80" fill="#ffffff" font-size="12" font-weight="bold">A</text>
    <text x="25" y="125" fill="#ffffff" font-size="12" font-weight="bold">D</text>
    <text x="25" y="80" fill="#ffffff" font-size="12" font-weight="bold">C</text>
    <line x1="40" y1="30" x2="40" y2="120" stroke-width="2.5" stroke="#10b981" />
  </svg>
</div>

#### 2. Quy tắc chứng minh
Xét $\\Delta ABC$ và $\\Delta A'B'C'$ có:
1. $AB = A'B'$
2. $\\widehat{B} = \\widehat{B'}$ (góc xen giữa)
3. $BC = B'C'$
$\\implies \\Delta ABC = \\Delta A'B'C'$ (c.g.c).
`;

const LESSON_12_MD = `### Bài 12: Trường hợp bằng nhau thứ ba: Góc - Cạnh - Góc (g.c.g)

#### 1. Định lí trường hợp bằng nhau Góc - Cạnh - Góc
Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau.
- **Quy tắc chứng minh:** Xét $\\Delta ABC$ và $\\Delta A'B'C'$ có:
  1. $\\widehat{B} = \\widehat{B'}$
  2. $BC = B'C'$ (cạnh kề của hai góc)
  3. $\\widehat{C} = \\widehat{C'}$
  $\\implies \\Delta ABC = \\Delta A'B'C'$ (g.c.g).

#### 2. Áp dụng vào tam giác vuông (Hệ quả)
- Nếu một cạnh góc vuông và góc nhọn kề cạnh ấy của tam giác vuông này bằng một cạnh góc vuông và góc nhọn kề cạnh ấy của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.
- Nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng cạnh huyền và một góc nhọn của tam giác vuông kia thì hai tam giác vuông đó bằng nhau (Cạnh huyền - góc nhọn).
`;

// --- QUESTION BANK DATA ---

const L9_QUESTIONS = [
  {
    question: "Cho tam giác ABC có số đo các góc như hình vẽ bên dưới. Tính giá trị của góc x tại đỉnh C.<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='220' height='130' viewBox='0 0 220 130' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <polygon points='110,20 30,110 190,110' fill='rgba(56, 189, 248, 0.08)' stroke='#38bdf8' stroke-width='2' />" +
              "    <text x='105' y='15' fill='#fff'>A</text>" +
              "    <text x='15' y='120' fill='#fff'>B</text>" +
              "    <text x='195' y='120' fill='#fff'>C</text>" +
              "    <text x='100' y='45' fill='#f87171' font-size='9'>80°</text>" +
              "    <text x='45' y='105' fill='#f87171' font-size='9'>45°</text>" +
              "    <text x='160' y='105' fill='#fbbf24' font-size='9'>x</text>" +
              "  </svg>" +
              "</div>",
    options: ["$55^\\circ$", "$65^\\circ$", "$45^\\circ$", "$95^\\circ$"],
    correct_index: 0,
    explanation: "Tổng ba góc trong tam giác bằng $180^\\circ$. Do đó: $x = 180^\\circ - (80^\\circ + 45^\\circ) = 55^\\circ$.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC vuông tại A. Khi đó, khẳng định nào sau đây về tổng số đo góc B và góc C là đúng?",
    options: [
      "$\\widehat{B} + \\widehat{C} = 90^\\circ$",
      "$\\widehat{B} + \\widehat{C} = 180^\\circ$",
      "$\\widehat{B} + \\widehat{C} = 45^\\circ$",
      "Không tính được khi chưa biết số đo cụ thể"
    ],
    correct_index: 0,
    explanation: "Trong tam giác vuông, tổng hai góc nhọn phụ nhau bằng $90^\\circ$ (vì góc vuông bằng $90^\\circ$ và tổng ba góc bằng $180^\\circ$).",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC có góc ngoài tại đỉnh C là góc ACx. Biết $\\widehat{A} = 70^\\circ$ và $\\widehat{B} = 40^\\circ$. Tính số đo góc ACx.",
    options: ["$110^\\circ$", "$70^\\circ$", "$30^\\circ$", "$150^\\circ$"],
    correct_index: 0,
    explanation: "Số đo góc ngoài của tam giác bằng tổng số đo hai góc trong không kề với nó: $\\widehat{ACx} = \\widehat{A} + \\widehat{B} = 70^\\circ + 40^\\circ = 110^\\circ$.",
    difficulty: 1.5
  },
  {
    question: "Cho tam giác ABC vuông tại A, có góc $B = 30^\\circ$. Tính góc C.",
    options: ["$60^\\circ$", "$90^\\circ$", "$45^\\circ$", "$30^\\circ$"],
    correct_index: 0,
    explanation: "Vì tam giác vuông tại A nên $\\widehat{B} + \\widehat{C} = 90^\\circ \\implies \\widehat{C} = 90^\\circ - 30^\\circ = 60^\\circ$.",
    difficulty: 1.0
  },
  {
    question: "Góc ngoài của tam giác kề bù với góc nào của tam giác đó?",
    options: [
      "Góc trong tương ứng tại đỉnh đó",
      "Góc trong không kề với nó",
      "Góc đối đỉnh với nó",
      "Góc kề bên của nó"
    ],
    correct_index: 0,
    explanation: "Góc ngoài của tam giác được định nghĩa là góc kề bù với một góc trong của tam giác đó.",
    difficulty: 1.0
  },
  {
    question: "Tính số đo góc $z$ trong hình vẽ tam giác vuông dưới đây:<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='200' height='120' viewBox='0 0 200 120' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <polygon points='30,100 170,100 30,20' fill='rgba(244, 63, 94, 0.05)' stroke='#f43f5e' stroke-width='2' />" +
              "    <path d='M 30 100 L 40 100 L 40 90 L 30 90 Z' fill='none' stroke='#f43f5e' />" +
              "    <text x='150' y='95' fill='#94a3b8' font-size='9'>40°</text>" +
              "    <text x='45' y='45' fill='#fbbf24' font-size='9'>z</text>" +
              "  </svg>" +
              "</div>",
    options: ["$50^\\circ$", "$40^\\circ$", "$90^\\circ$", "$60^\\circ$"],
    correct_index: 0,
    explanation: "Góc vuông là $90^\\circ$, góc nhọn kề là $40^\\circ$. Do đó góc nhọn còn lại $z = 90^\\circ - 40^\\circ = 50^\\circ$.",
    difficulty: 1.2
  },
  {
    question: "Góc ngoài của tam giác luôn có tính chất nào so với các góc trong không kề với nó?",
    options: [
      "Bằng tổng hai góc trong không kề",
      "Bằng hiệu hai góc trong không kề",
      "Nhỏ hơn mỗi góc trong không kề",
      "Bằng góc trong kề bù với nó"
    ],
    correct_index: 0,
    explanation: "Mỗi góc ngoài của một tam giác bằng tổng số đo hai góc trong không kề với nó.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC có $\\widehat{A} = 100^\\circ$ và $\\widehat{B} = \\widehat{C}$. Tính số đo góc B.",
    options: ["$40^\\circ$", "$80^\\circ$", "$50^\\circ$", "$60^\\circ$"],
    correct_index: 0,
    explanation: "Tổng ba góc bằng $180^\\circ \\implies \\widehat{B} + \\widehat{C} = 180^\\circ - 100^\\circ = 80^\\circ$. Vì $\\widehat{B} = \\widehat{C}$ nên $\\widehat{B} = 80^\\circ : 2 = 40^\\circ$.",
    difficulty: 1.5
  },
  {
    question: "Có thể vẽ được một tam giác có số đo ba góc lần lượt là $90^\\circ, 50^\\circ, 50^\\circ$ không?",
    options: [
      "Không, vì tổng số đo bằng 190°",
      "Có, vì có một góc vuông",
      "Có, vì là tam giác vuông cân",
      "Không, vì tổng số đo nhỏ hơn 180°"
    ],
    correct_index: 0,
    explanation: "Tổng ba góc của tam giác này bằng $90^\\circ + 50^\\circ + 50^\\circ = 190^\\circ$. Điều này vi phạm định lí tổng ba góc trong tam giác bằng $180^\\circ$.",
    difficulty: 1.2
  },
  {
    question: "Nếu một tam giác có cả ba góc bằng nhau thì số đo mỗi góc là bao nhiêu?",
    options: ["$60^\\circ$", "$90^\\circ$", "$45^\\circ$", "$50^\\circ$"],
    correct_index: 0,
    explanation: "Tổng ba góc bằng $180^\\circ$, ba góc bằng nhau nên mỗi góc bằng $180^\\circ : 3 = 60^\\circ$.",
    difficulty: 1.0
  }
];

const L10_QUESTIONS = [
  {
    question: "Cho hình vẽ dưới đây, biết AB = BC và AD = CD. Để chứng minh $\\Delta ABD = \\Delta CBD$, ta sử dụng trường hợp bằng nhau nào?<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='240' height='130' viewBox='0 0 240 130' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <polygon points='30,65 120,15 210,65' fill='none' stroke='#38bdf8' stroke-width='2' />" +
              "    <polygon points='30,65 120,115 210,65' fill='none' stroke='#38bdf8' stroke-width='2' />" +
              "    <line x1='30' y1='65' x2='210' y2='65' stroke='#475569' stroke-width='1.5' stroke-dasharray='3,3' />" +
              "    <text x='20' y='70' fill='#fff'>A</text>" +
              "    <text x='115' y='12' fill='#fff'>B</text>" +
              "    <text x='215' y='70' fill='#fff'>C</text>" +
              "    <text x='115' y='125' fill='#fff'>D</text>" +
              "  </svg>" +
              "</div>",
    options: [
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh huyền - Góc nhọn"
    ],
    correct_index: 0,
    explanation: "Xét hai tam giác có $AB = BC$ (giả thiết), $AD = CD$ (giả thiết) và chung cạnh $BD$. Do đó bằng nhau theo trường hợp c.c.c.",
    difficulty: 1.0
  },
  {
    question: "Nếu hai tam giác ABC và DEF bằng nhau theo kí hiệu: $\\Delta ABC = \\Delta DEF$. Khẳng định nào sau đây là SAI?",
    options: [
      "$AB = DF$",
      "$AB = DE$",
      "$BC = EF$",
      "$\\widehat{A} = \\widehat{D}$"
    ],
    correct_index: 0,
    explanation: "Kí hiệu $\\Delta ABC = \\Delta DEF$ tương ứng cạnh $AB = DE$. Do đó, khẳng định $AB = DF$ là sai.",
    difficulty: 1.0
  },
  {
    question: "Cho hai tam giác ABC và MNP bằng nhau có $AB = 5cm, BC = 6cm, AC = 7cm$. Chu vi của tam giác MNP là:",
    options: ["$18 cm$", "$11 cm$", "$12 cm$", "$13 cm$"],
    correct_index: 0,
    explanation: "Vì hai tam giác bằng nhau nên chu vi của chúng bằng nhau. Chu vi $\\Delta ABC = 5 + 6 + 7 = 18cm$. Do đó chu vi $\\Delta MNP = 18cm$.",
    difficulty: 1.2
  },
  {
    question: "Trường hợp bằng nhau thứ nhất Cạnh - Cạnh - Cạnh (c.c.c) phát biểu rằng hai tam giác bằng nhau nếu:",
    options: [
      "Ba cạnh của tam giác này bằng ba cạnh của tam giác kia.",
      "Hai cạnh của tam giác này bằng hai cạnh của tam giác kia.",
      "Ba góc của tam giác này bằng ba góc của tam giác kia.",
      "Hai cạnh và một góc của tam giác này bằng hai cạnh và một góc của tam giác kia."
    ],
    correct_index: 0,
    explanation: "Định lý c.c.c yêu cầu ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia.",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC = \\Delta DEF$. Biết $BC = 4 cm, \\widehat{D} = 50^\\circ, \\widehat{E} = 70^\\circ$. Tính góc F.",
    options: ["$60^\\circ$", "$50^\\circ$", "$70^\\circ$", "$120^\\circ$"],
    correct_index: 0,
    explanation: "Vì $\\Delta ABC = \\Delta DEF$ nên các góc tương ứng bằng nhau. Góc $F = 180^\\circ - (50^\\circ + 70^\\circ) = 60^\\circ$.",
    difficulty: 1.5
  },
  {
    question: "Khi viết kí hiệu hai tam giác bằng nhau, thứ tự viết các đỉnh của hai tam giác phải như thế nào?",
    options: [
      "Viết theo đúng thứ tự tương ứng các đỉnh bằng nhau",
      "Viết tùy ý đỉnh nào trước cũng được",
      "Viết theo bảng chữ cái alphabet",
      "Viết các đỉnh góc vuông sau cùng"
    ],
    correct_index: 0,
    explanation: "Khi kí hiệu hai tam giác bằng nhau, bắt buộc phải viết các chữ cái đỉnh theo đúng thứ tự tương ứng góc/cạnh bằng nhau.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC có $AB = AC$. Gọi M là trung điểm của BC. Chứng minh rằng $\\Delta ABM = \\Delta ACM$. Ta dùng trường hợp bằng nhau nào?",
    options: [
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh huyền - Cạnh góc vuông"
    ],
    correct_index: 0,
    explanation: "Xét $\\Delta ABM$ và $\\Delta ACM$ có: $AB = AC$, $BM = CM$ (do M là trung điểm), $AM$ chung. Vậy bằng nhau theo c.c.c.",
    difficulty: 1.5
  },
  {
    question: "Cho hình bình hành ABCD có đường chéo BD làm chia thành hai tam giác $\\Delta ABD$ và $\\Delta CDB$. Biết $AB = CD$ và $AD = CB$. Khẳng định nào đúng?",
    options: [
      "$\\Delta ABD = \\Delta CDB$ (c.c.c)",
      "$\\Delta ABD = \\Delta CBD$ (c.c.c)",
      "$\\Delta ABD = \\Delta BCD$ (c.c.c)",
      "Không bằng nhau"
    ],
    correct_index: 0,
    explanation: "Xét $\\Delta ABD$ và $\\Delta CDB$ có: $AB=CD$, $AD=CB$, và $BD$ là cạnh chung. Suy ra $\\Delta ABD = \\Delta CDB$ (c.c.c).",
    difficulty: 1.5
  },
  {
    question: "Hai tam giác bằng nhau thì diện tích của chúng có bằng nhau không?",
    options: [
      "Luôn bằng nhau",
      "Không bao giờ bằng nhau",
      "Chỉ bằng nhau khi là tam giác đều",
      "Chỉ bằng nhau khi là tam giác vuông"
    ],
    correct_index: 0,
    explanation: "Hai tam giác bằng nhau có các kích thước tương ứng bằng nhau nên diện tích của chúng luôn luôn bằng nhau.",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC = \\Delta MNP$ với $BC = 10 cm, MP = 8 cm, MN = 6 cm$. Tính độ dài cạnh AC.",
    options: ["$8 cm$", "$10 cm$", "$6 cm$", "$14 cm$"],
    correct_index: 0,
    explanation: "Vì $\\Delta ABC = \\Delta MNP$ nên các cạnh tương ứng bằng nhau. Suy ra $AC = MP = 8cm$.",
    difficulty: 1.2
  }
];

const L11_QUESTIONS = [
  {
    question: "Trong trường hợp bằng nhau Cạnh - Góc - Cạnh (c.g.c), góc được xét phải thỏa mãn điều kiện gì?",
    options: [
      "Là góc xen giữa hai cạnh được xét",
      "Là góc kề bên của hai cạnh",
      "Là góc đối diện với một trong hai cạnh",
      "Góc nào cũng được"
    ],
    correct_index: 0,
    explanation: "Định lý c.g.c bắt buộc góc được xét phải là góc xen giữa hai cạnh bằng nhau tương ứng.",
    difficulty: 1.0
  },
  {
    question: "Cho hai tam giác ABC và ADC có chung cạnh AC, biết $AB = AD$ và góc BAC = DAC. Khẳng định nào đúng?<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='220' height='130' viewBox='0 0 220 130' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <polygon points='30,30 150,65 30,100' fill='none' stroke='#10b981' stroke-width='2' />" +
              "    <line x1='30' y1='30' x2='30' y2='100' stroke='#38bdf8' stroke-width='2' />" +
              "    <text x='20' y='35' fill='#fff'>B</text>" +
              "    <text x='160' y='70' fill='#fff'>A</text>" +
              "    <text x='20' y='105' fill='#fff'>D</text>" +
              "    <text x='20' y='70' fill='#fff'>C</text>" +
              "  </svg>" +
              "</div>",
    options: [
      "$\\Delta ABC = \\Delta ADC$ (c.g.c)",
      "$\\Delta ABC = \\Delta ADC$ (c.c.c)",
      "$\\Delta ABC = \\Delta ACD$ (g.c.g)",
      "Không đủ dữ kiện"
    ],
    correct_index: 0,
    explanation: "Xét $\\Delta ABC$ và $\\Delta ADC$ có: $AB = AD$, góc $BAC = DAC$ (góc xen giữa) và cạnh $AC$ chung. Vậy bằng nhau theo c.g.c.",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC$ và $\\Delta DkH$ có $AB = Dk$, $AC = DH$. Để hai tam giác này bằng nhau theo trường hợp c.g.c, cần thêm điều kiện gì?",
    options: [
      "$\\widehat{A} = \\widehat{D}$",
      "$\\widehat{B} = \\widehat{k}$",
      "$\\widehat{C} = \\widehat{H}$",
      "$BC = kH$"
    ],
    correct_index: 0,
    explanation: "Góc xen giữa hai cạnh AB và AC là góc A. Góc xen giữa hai cạnh Dk và DH là góc D. Do đó cần $\\widehat{A} = \\widehat{D}$.",
    difficulty: 1.2
  },
  {
    question: "Cho Hình 4.23, biết OA = OC, OB = OD và góc AOB = COD. Chứng minh AB = CD. Ta thực hiện qua các tam giác nào?",
    options: [
      "$\\Delta OAB = \\Delta OCD$ (c.g.c)",
      "$\\Delta OAB = \\Delta ODC$ (c.c.c)",
      "$\\Delta OAC = \\Delta OBD$ (c.g.c)",
      "$\\Delta OAD = \\Delta OCB$ (g.c.g)"
    ],
    correct_index: 0,
    explanation: "Xét $\\Delta OAB$ và $\\Delta OCD$ có: $OA = OC$, $OB = OD$, và góc $AOB = COD$ (góc đối đỉnh hoặc giả thiết). Vậy bằng nhau theo c.g.c.",
    difficulty: 1.5
  },
  {
    question: "Cho tam giác ABC có AD là tia phân giác của góc A, biết AB = AC. Để chứng minh $\\Delta ABD = \\Delta ACD$ theo c.g.c, ta cần dùng yếu tố nào?",
    options: [
      "AB = AC, góc BAD = CAD, AD chung",
      "AB = AC, BD = CD, AD chung",
      "Góc B = C, góc BAD = CAD, AD chung",
      "Không cần chứng minh"
    ],
    correct_index: 0,
    explanation: "Vì AD là phân giác nên góc $BAD = CAD$. Cạnh $AD$ là cạnh chung, và $AB = AC$. Đây là hai cạnh và góc xen giữa.",
    difficulty: 1.2
  },
  {
    question: "Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì:",
    options: [
      "Hai tam giác đó bằng nhau",
      "Hai tam giác đó có chu vi khác nhau",
      "Hai tam giác vuông",
      "Không đủ để kết luận"
    ],
    correct_index: 0,
    explanation: "Đây chính là nội dung định lý về trường hợp bằng nhau thứ hai của tam giác (c.g.c).",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC = \\Delta DEF$ theo trường hợp c.g.c. Biết $AB=4cm, BC=5cm$ và góc $B=60^\\circ$. Cạnh nào của tam giác DEF bằng $4cm$?",
    options: ["$DE$", "$EF$", "$DF$", "Không cạnh nào"],
    correct_index: 0,
    explanation: "Vì hai tam giác bằng nhau nên cạnh tương ứng $DE = AB = 4cm$.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC vuông tại A. Gọi M là trung điểm của AC, trên tia đối của MB lấy N sao cho MN = MB. Chứng minh $\\Delta AMN = \\Delta CMB$ theo trường hợp nào?",
    options: [
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh huyền - Cạnh góc vuông"
    ],
    correct_index: 0,
    explanation: "Xét $\\Delta AMN$ và $\\Delta CMB$ có: $AM=CM$ (trung điểm), góc $AMN=CMB$ (đối đỉnh), $MN=MB$. Vậy bằng nhau theo c.g.c.",
    difficulty: 2.0
  },
  {
    question: "Tính chất nào sau đây là góc xen giữa của hai cạnh AC và BC trong tam giác ABC?",
    options: ["Góc C", "Góc A", "Góc B", "Không có góc xen giữa"],
    correct_index: 0,
    explanation: "Góc xen giữa hai cạnh AC và BC có chung đỉnh C, do đó là góc C.",
    difficulty: 1.0
  },
  {
    question: "Cho hai tam giác ABC và DEF có $AB=DE, BC=EF$. Biết $\\widehat{A} = \\widehat{D}$. Hai tam giác này có chắc chắn bằng nhau không?",
    options: [
      "Chưa chắc chắn, vì góc A không xen giữa hai cạnh AB và BC.",
      "Chắc chắn bằng nhau theo trường hợp c.g.c.",
      "Chắc chắn bằng nhau theo trường hợp c.c.c.",
      "Bằng nhau khi góc A vuông."
    ],
    correct_index: 0,
    explanation: "Để bằng nhau theo c.g.c, góc bằng nhau phải là góc xen giữa hai cạnh (tức góc B và góc E). Góc A không xen giữa nên chưa thể kết luận.",
    difficulty: 1.5
  }
];

const L12_QUESTIONS = [
  {
    question: "Định lý Góc - Cạnh - Góc (g.c.g) yêu cầu cạnh bằng nhau phải nằm ở vị trí nào đối với hai góc?",
    options: [
      "Là cạnh kề chung của hai góc được xét",
      "Là cạnh đối diện với một trong hai góc",
      "Là cạnh huyền của tam giác",
      "Vị trí bất kỳ"
    ],
    correct_index: 0,
    explanation: "Trong trường hợp g.c.g, cạnh bằng nhau tương ứng bắt buộc phải là cạnh kề của cả hai góc đó.",
    difficulty: 1.0
  },
  {
    question: "Cho Hình 4.32, biết góc $O_1 = O_2$ và góc $A = B$. Để chứng minh $OA = OB$, ta sử dụng trường hợp bằng nhau nào của tam giác?",
    options: [
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Cạnh huyền - Cạnh góc vuông"
    ],
    correct_index: 0,
    explanation: "Xét hai tam giác OAC và OBC có: góc O1 = O2, cạnh OC chung, góc A = B suy ra góc C1 = C2. Do đó bằng nhau theo g.c.g.",
    difficulty: 1.5
  },
  {
    question: "Hệ quả 'Cạnh huyền - Góc nhọn' áp dụng cho loại tam giác nào?",
    options: ["Tam giác vuông", "Tam giác cân", "Tam giác đều", "Tam giác nhọn"],
    correct_index: 0,
    explanation: "Hệ quả cạnh huyền - góc nhọn là trường hợp đặc biệt được suy ra từ g.c.g dành riêng cho hai tam giác vuông.",
    difficulty: 1.0
  },
  {
    question: "Cho hai tam giác vuông ABC (vuông tại A) và DEF (vuông tại D) có $BC = EF$ và góc $B = E$. Khẳng định nào đúng?",
    options: [
      "$\\Delta ABC = \\Delta DEF$ (Cạnh huyền - Góc nhọn)",
      "$\\Delta ABC = \\Delta DEF$ (Cạnh góc vuông - Góc nhọn kề)",
      "$\\Delta ABC = \\Delta DEF$ (c.g.c)",
      "Không bằng nhau"
    ],
    correct_index: 0,
    explanation: "BC và EF là cạnh huyền, góc B và E là góc nhọn tương ứng. Do đó hai tam giác bằng nhau theo hệ quả cạnh huyền - góc nhọn.",
    difficulty: 1.2
  },
  {
    question: "Cho tam giác ABC và DEF có góc B = E, BC = EF, góc C = F. Kí hiệu bằng nhau nào sau đây đúng?",
    options: [
      "$\\Delta ABC = \\Delta DEF$ (g.c.g)",
      "$\\Delta ABC = \\Delta DFE$ (g.c.g)",
      "$\\Delta ABC = \\Delta EDF$ (g.c.g)",
      "$\\Delta BAC = \\Delta EDF$ (g.c.g)"
    ],
    correct_index: 0,
    explanation: "Vì các đỉnh tương ứng góc bằng nhau là B-E, C-F nên đỉnh còn lại A tương ứng D. Kí hiệu đúng là $\\Delta ABC = \\Delta DEF$.",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC = \\Delta MNP$ theo g.c.g. Biết góc $A=50^\\circ, B=70^\\circ, AB=6cm$. Góc nào của tam giác MNP bằng $70^\\circ$?",
    options: ["Góc N", "Góc M", "Góc P", "Không xác định được"],
    correct_index: 0,
    explanation: "Vì hai tam giác bằng nhau nên góc tương ứng của B là N bằng $70^\\circ$.",
    difficulty: 1.0
  },
  {
    question: "Để chứng minh hai tam giác vuông bằng nhau theo hệ quả 'Cạnh góc vuông - Góc nhọn kề', góc nhọn được xét phải kề với:",
    options: [
      "Cạnh góc vuông đang xét",
      "Cạnh huyền",
      "Góc vuông",
      "Không cần kề"
    ],
    correct_index: 0,
    explanation: "Hệ quả phát biểu rằng nếu một cạnh góc vuông và góc nhọn kề cạnh ấy bằng nhau tương ứng thì hai tam giác vuông bằng nhau.",
    difficulty: 1.2
  },
  {
    question: "Cho tam giác ABC có góc B = C. Kẻ tia phân giác AD của góc A. Để chứng minh $\\Delta ABD = \\Delta ACD$ theo g.c.g, ta cần chỉ ra góc ADB bằng góc nào?",
    options: ["Góc ADC", "Góc CAD", "Góc BAD", "Góc B"],
    correct_index: 0,
    explanation: "Để xét trường hợp g.c.g cho cạnh AD chung, ta cần hai góc kề là BAD = CAD và ADB = ADC.",
    difficulty: 1.5
  },
  {
    question: "Cho hai tam giác ABC và MNP có góc A = M, góc B = N. Để hai tam giác này bằng nhau theo g.c.g, ta cần thêm cạnh nào bằng nhau?",
    options: ["$AB = MN$", "$BC = NP$", "$AC = MP$", "Cạnh nào cũng được"],
    correct_index: 0,
    explanation: "Cạnh bằng nhau phải là cạnh kề của cả hai góc đang xét (A và B, M và N). Cạnh kề của góc A và B là AB. Cạnh kề của góc M và N là MN. Do đó cần AB = MN.",
    difficulty: 1.2
  },
  {
    question: "Hai tam giác bằng nhau theo trường hợp g.c.g có bắt buộc ba góc của chúng phải bằng nhau không?",
    options: [
      "Có, vì hai góc bằng nhau kéo theo góc còn lại cũng bằng nhau.",
      "Không, chỉ cần hai góc bằng nhau.",
      "Có, vì là định lý bắt buộc.",
      "Không, chỉ cần các cạnh bằng nhau."
    ],
    correct_index: 0,
    explanation: "Trong một tam giác, tổng ba góc luôn bằng 180°. Nếu hai góc của tam giác này bằng hai góc của tam giác kia thì góc thứ ba cũng bằng nhau.",
    difficulty: 1.5
  }
];

const EXAM4_QUESTIONS = [
  {
    question: "Tổng số đo ba góc trong một tam giác bất kỳ bằng bao nhiêu?",
    options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$270^\\circ$"],
    correct_index: 0,
    explanation: "Tổng số đo ba góc trong một tam giác luôn bằng $180^\\circ$.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC vuông tại A, biết góc $B = 35^\\circ$. Tính góc C.",
    options: ["$55^\\circ$", "$45^\\circ$", "$65^\\circ$", "$35^\\circ$"],
    correct_index: 0,
    explanation: "Trong tam giác vuông, tổng hai góc nhọn bằng $90^\\circ \\implies \\widehat{C} = 90^\\circ - 35^\\circ = 55^\\circ$.",
    difficulty: 1.0
  },
  {
    question: "Mỗi góc ngoài của một tam giác luôn có tính chất nào?",
    options: [
      "Bằng tổng số đo hai góc trong không kề với nó",
      "Bằng tổng hai góc nhọn trong tam giác",
      "Kề bù với góc đối diện",
      "Bằng góc trong kề nó"
    ],
    correct_index: 0,
    explanation: "Mỗi góc ngoài của tam giác bằng tổng số đo hai góc trong không kề với nó.",
    difficulty: 1.0
  },
  {
    question: "Cho $\\Delta ABC = \\Delta DEF$. Khẳng định nào sau đây là đúng về cạnh tương ứng?",
    options: ["$BC = EF$", "$AB = DF$", "$AC = DE$", "$BC = DF$"],
    correct_index: 0,
    explanation: "Theo thứ tự tương ứng, cạnh $BC$ tương ứng với cạnh $EF$.",
    difficulty: 1.0
  },
  {
    question: "Trường hợp bằng nhau thứ nhất Cạnh - Cạnh - Cạnh (c.c.c) của tam giác yêu cầu điều kiện gì?",
    options: [
      "Ba cạnh của tam giác này bằng ba cạnh của tam giác kia",
      "Ba góc bằng nhau",
      "Hai cạnh và một góc bằng nhau",
      "Chu vi của chúng bằng nhau"
    ],
    correct_index: 0,
    explanation: "Định lý c.c.c yêu cầu ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia.",
    difficulty: 1.0
  },
  {
    question: "Cho hình vẽ dưới đây, biết AB = BC và AD = CD. Chứng minh $\\Delta ABD = \\Delta CBD$ theo trường hợp nào?<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='200' height='120' viewBox='0 0 200 120' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <polygon points='30,60 100,15 170,60' fill='none' stroke='#fbbf24' stroke-width='2' />" +
              "    <polygon points='30,60 100,105 170,60' fill='none' stroke='#fbbf24' stroke-width='2' />" +
              "    <line x1='30' y1='60' x2='170' y2='60' stroke='#94a3b8' stroke-width='1' stroke-dasharray='4,4' />" +
              "  </svg>" +
              "</div>",
    options: [
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh huyền - Cạnh góc vuông"
    ],
    correct_index: 0,
    explanation: "Xét hai tam giác có các cặp cạnh bên bằng nhau ($AB=BC$, $AD=CD$) và chung cạnh đáy $BD$ (đường nét đứt). Do đó chúng bằng nhau theo c.c.c.",
    difficulty: 1.2
  },
  {
    question: "Góc xen giữa hai cạnh AC và AB của tam giác ABC là góc nào?",
    options: ["Góc A", "Góc B", "Góc C", "Góc D"],
    correct_index: 0,
    explanation: "Góc chung đỉnh A nằm giữa hai tia AC và AB nên góc xen giữa là góc A.",
    difficulty: 1.0
  },
  {
    question: "Cho hai tam giác ABC và DEF có $AB = DE, AC = DF$. Để $\\Delta ABC = \\Delta DEF$ theo c.g.c, cần thêm điều kiện nào?",
    options: [
      "$\\widehat{A} = \\widehat{D}$",
      "$\\widehat{B} = \\widehat{E}$",
      "$\\widehat{C} = \\widehat{F}$",
      "$BC = EF$"
    ],
    correct_index: 0,
    explanation: "Góc xen giữa AB và AC là góc A; góc xen giữa DE và DF là góc D. Do đó cần thêm điều kiện góc A = D.",
    difficulty: 1.2
  },
  {
    question: "Cho hai tam giác ABC và MNP có góc A = M, góc B = N. Để hai tam giác này bằng nhau theo g.c.g, cần có điều kiện nào?",
    options: ["$AB = MN$", "$BC = NP$", "$AC = MP$", "Góc C = P"],
    correct_index: 0,
    explanation: "Cạnh bằng nhau phải là cạnh kề của cả hai góc nhọn đang xét, tức là cạnh AB và MN.",
    difficulty: 1.2
  },
  {
    question: "Hệ quả 'Cạnh huyền - Góc nhọn' là một trường hợp đặc biệt được suy ra từ trường hợp bằng nhau nào?",
    options: [
      "Góc - Cạnh - Góc (g.c.g)",
      "Cạnh - Góc - Cạnh (c.g.c)",
      "Cạnh - Cạnh - Cạnh (c.c.c)",
      "Cạnh huyền - Cạnh góc vuông"
    ],
    correct_index: 0,
    explanation: "Hệ quả cạnh huyền - góc nhọn của tam giác vuông được suy ra trực tiếp từ trường hợp g.c.g.",
    difficulty: 1.5
  },
  {
    question: "Cho tam giác ABC có $\\widehat{A} = 80^\\circ$ và góc ngoài tại đỉnh B là $130^\\circ$. Tính góc C.",
    options: ["$50^\\circ$", "$70^\\circ$", "$100^\\circ$", "$30^\\circ$"],
    correct_index: 0,
    explanation: "Góc ngoài tại đỉnh B bằng $\\widehat{A} + \\widehat{C} \\implies 130^\\circ = 80^\\circ + \\widehat{C} \\implies \\widehat{C} = 50^\\circ$.",
    difficulty: 1.5
  },
  {
    question: "Cho $\\Delta ABC = \\Delta MNP$ với $BC = 12 cm, MP = 10 cm, MN = 8 cm$. Chu vi tam giác ABC là:",
    options: ["$30 cm$", "$20 cm$", "$22 cm$", "$32 cm$"],
    correct_index: 0,
    explanation: "Các cạnh tương ứng bằng nhau nên $AB = MN = 8cm$, $AC = MP = 10cm$, $BC = 12cm$. Chu vi = 8 + 10 + 12 = 30 cm.",
    difficulty: 1.5
  },
  {
    question: "Nếu hai tam giác bằng nhau thì khẳng định nào dưới đây đúng?",
    options: [
      "Tất cả các cạnh tương ứng bằng nhau và tất cả các góc tương ứng bằng nhau",
      "Chu vi của chúng luôn khác nhau",
      "Chỉ các góc bằng nhau",
      "Chỉ diện tích bằng nhau, các cạnh khác nhau"
    ],
    correct_index: 0,
    explanation: "Định nghĩa hai tam giác bằng nhau là hai tam giác có tất cả các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.",
    difficulty: 1.0
  },
  {
    question: "Cho tam giác ABC. Các tia phân giác của góc B và C cắt nhau tại I. Nếu góc B = C thì:",
    options: ["$IB = IC$", "$IB > IC$", "$IB < IC$", "Tam giác ABC đều"],
    correct_index: 0,
    explanation: "Dùng các cặp tam giác bằng nhau để chứng minh hoặc suy ra tính chất tam giác cân tại I, ta có IB = IC.",
    difficulty: 1.5
  },
  {
    question: "Cho hai tam giác ABC và DEF có $AB=DE$, góc $B=E$, $BC=EF$. Khẳng định nào sau đây đúng?",
    options: [
      "$\\Delta ABC = \\Delta DEF$ (c.g.c)",
      "$\\Delta ABC = \\Delta DEF$ (g.c.g)",
      "$\\Delta ABC = \\Delta DFE$ (c.g.c)",
      "Không bằng nhau"
    ],
    correct_index: 0,
    explanation: "Theo định lý c.g.c, hai tam giác bằng nhau vì có hai cặp cạnh bằng nhau tương ứng và góc xen giữa bằng nhau.",
    difficulty: 1.2
  }
];

async function seedLesson(slug: string, markdown: string, questions: any[], conceptSlug: string) {
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, metadata')
    .eq('slug', slug)
    .single();

  if (!lessonNode) {
    console.error(`❌ Lesson node '${slug}' not found!`);
    return;
  }

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

  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', conceptSlug)
    .single();

  if (!concept) {
    console.error(`❌ Concept '${conceptSlug}' not found!`);
    return;
  }

  await supabase
    .from('question_bank')
    .delete()
    .eq('concept_id', concept.id);

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
  console.log("🚀 Starting Chapter 4 Geometry Seeding...");

  // Lesson 9
  await seedLesson(
    'bai-9-tong-cac-goc-trong-tam-giac',
    LESSON_9_MD,
    L9_QUESTIONS,
    'concept-bai-9-tong-cac-goc-trong-tam-giac'
  );

  // Lesson 10
  await seedLesson(
    'bai-10-tam-giac-bang-nhau-truong-hop-1',
    LESSON_10_MD,
    L10_QUESTIONS,
    'concept-bai-10-tam-giac-bang-nhau-truong-hop-1'
  );

  // Lesson 11
  await seedLesson(
    'bai-11-truong-hop-bang-nhau-thu-hai',
    LESSON_11_MD,
    L11_QUESTIONS,
    'concept-bai-11-truong-hop-bang-nhau-thu-hai'
  );

  // Lesson 12
  await seedLesson(
    'bai-12-truong-hop-bang-nhau-thu-ba',
    LESSON_12_MD,
    L12_QUESTIONS,
    'concept-bai-12-truong-hop-bang-nhau-thu-ba'
  );

  // Seed Chapter 4 Exam
  const examSlug = 'kiem-tra-chuong-4';
  const { data: examNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id, metadata')
    .eq('slug', examSlug)
    .single();

  if (examNode) {
    const examConceptSlug = 'concept-kiem-tra-chuong-4';
    const { data: concept } = await supabase
      .from('concepts')
      .upsert({
        source_id: examNode.source_id,
        slug: examConceptSlug,
        title: 'Kiểm tra tổng hợp Chương 4',
        description: 'Đánh giá kiến thức chương 4 tam giác bằng nhau'
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (concept) {
      await supabase
        .from('curriculum_nodes')
        .update({
          metadata: {
            ...(examNode.metadata as any || {}),
            concept_id: concept.id
          }
        })
        .eq('id', examNode.id);

      await supabase
        .from('lesson_concepts')
        .upsert({
          lesson_id: examNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });

      await supabase
        .from('question_bank')
        .delete()
        .eq('concept_id', concept.id);

      for (const q of EXAM4_QUESTIONS) {
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
      console.log(`✅ Seeded ${EXAM4_QUESTIONS.length} questions for Chapter 4 Exam.`);
    }
  }

  console.log("\n🎉 Chapter 4 Geometry Seeding Completed Successfully!");
}

main().catch(err => {
  console.error("❌ Chapter 4 seeding failed:", err);
  process.exit(1);
});
