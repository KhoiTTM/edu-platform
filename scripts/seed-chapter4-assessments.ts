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

// --- PREREQUISITE QUESTIONS (Grade 6 Geometry & Angles) ---
const PREREQ_POOL = [
  { question: "Số đo của một góc vuông là:", options: ["$90^\\circ$", "$180^\\circ$", "$60^\\circ$", "$45^\\circ$"], correct_index: 0, explanation: "Góc vuông có số đo bằng $90^\\circ$.", difficulty: 1.0 },
  { question: "Hai góc kề bù có tổng số đo bằng:", options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$0^\\circ$"], correct_index: 0, explanation: "Hai góc kề bù là hai góc có một cạnh chung và hai cạnh còn lại là hai tia đối nhau, tổng bằng $180^\\circ$.", difficulty: 1.0 },
  { question: "Góc nhọn là góc có số đo:", options: ["Nhỏ hơn $90^\\circ$", "Bằng $90^\\circ$", "Lớn hơn $90^\\circ$", "Bằng $180^\\circ$"], correct_index: 0, explanation: "Góc nhọn có số đo lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$.", difficulty: 1.0 },
  { question: "Góc tù là góc có số đo:", options: ["Lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$", "Nhỏ hơn $90^\\circ$", "Bằng $180^\\circ$", "Bằng $90^\\circ$"], correct_index: 0, explanation: "Góc tù có số đo lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$.", difficulty: 1.0 },
  { question: "Nếu tia Ot là tia phân giác của góc xOy thì:", options: ["$\\widehat{xOt} = \\widehat{tOy} = \\frac{1}{2} \\widehat{xOy}$", "$\\widehat{xOt} = 2 \\widehat{tOy}$", "$\\widehat{xOy} = \\widehat{xOt}$", "$\\widehat{xOt} + \\widehat{tOy} = 90^\\circ$"], correct_index: 0, explanation: "Tia phân giác chia góc thành hai phần bằng nhau.", difficulty: 1.2 },
  { question: "Hai đường thẳng song song là hai đường thẳng:", options: ["Không có điểm chung", "Có một điểm chung", "Có vô số điểm chung", "Cắt nhau tại góc vuông"], correct_index: 0, explanation: "Định nghĩa hai đường thẳng song song là không có điểm chung.", difficulty: 1.0 },
  { question: "Hai góc đối đỉnh thì:", options: ["Bằng nhau", "Kề bù", "Phụ nhau", "Có tổng bằng $180^\\circ$"], correct_index: 0, explanation: "Hai góc đối đỉnh thì bằng nhau.", difficulty: 1.0 },
  { question: "Cho $\\widehat{xOy} = 60^\\circ$. Góc đối đỉnh với $\\widehat{xOy}$ có số đo là:", options: ["$60^\\circ$", "$120^\\circ$", "$30^\\circ$", "$180^\\circ$"], correct_index: 0, explanation: "Góc đối đỉnh bằng nhau.", difficulty: 1.0 },
  { question: "Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong:", options: ["Bằng nhau", "Kề bù", "Phụ nhau", "Có tổng bằng $180^\\circ$"], correct_index: 0, explanation: "Tính chất hai đường thẳng song song.", difficulty: 1.2 },
  { question: "Đường trung trực của một đoạn thẳng là đường thẳng:", options: ["Vuông góc với đoạn thẳng tại trung điểm", "Đi qua trung điểm của đoạn thẳng", "Vuông góc với đoạn thẳng", "Song song với đoạn thẳng"], correct_index: 0, explanation: "Định nghĩa đường trung trực.", difficulty: 1.2 },
  { question: "Tam giác đều là tam giác có:", options: ["Ba cạnh bằng nhau", "Hai cạnh bằng nhau", "Ba góc khác nhau", "Một góc vuông"], correct_index: 0, explanation: "Tam giác đều có 3 cạnh bằng nhau và 3 góc bằng $60^\\circ$.", difficulty: 1.0 },
  { question: "Tính chu vi tam giác có các cạnh 3cm, 4cm, 5cm.", options: ["12cm", "7cm", "15cm", "9cm"], correct_index: 0, explanation: "$3 + 4 + 5 = 12$ cm.", difficulty: 1.0 },
  { question: "Diện tích tam giác có đáy 6cm và chiều cao 4cm là:", options: ["$12 cm^2$", "$24 cm^2$", "$10 cm^2$", "$48 cm^2$"], correct_index: 0, explanation: "$S = \\frac{1}{2} \\cdot 6 \\cdot 4 = 12 cm^2$.", difficulty: 1.2 },
  { question: "Hình có 3 đỉnh, 3 cạnh và 3 góc là:", options: ["Hình tam giác", "Hình tứ giác", "Hình vuông", "Hình tròn"], correct_index: 0, explanation: "Đặc điểm của tam giác.", difficulty: 1.0 },
  { question: "Góc bẹt có số đo bằng:", options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$0^\\circ$"], correct_index: 0, explanation: "Góc bẹt bằng $180^\\circ$.", difficulty: 1.0 }
];

// --- BAI 9: TONG CAC GOC TRONG TAM GIAC ---
const BAI_9_SPECIFIC = [
  { question: "Cho tam giác ABC có $\\widehat{A} = 70^\\circ, \\widehat{B} = 50^\\circ$. Tính $\\widehat{C}$.", options: ["$60^\\circ$", "$70^\\circ$", "$50^\\circ$", "$180^\\circ$"], correct_index: 0, explanation: "$180 - (70+50) = 60$.", difficulty: 1.0 },
  { question: "Tam giác vuông có một góc nhọn bằng $40^\\circ$. Góc nhọn còn lại bằng:", options: ["$50^\\circ$", "$40^\\circ$", "$90^\\circ$", "$140^\\circ$"], correct_index: 0, explanation: "Trong tam giác vuông, hai góc nhọn phụ nhau: $90 - 40 = 50$.", difficulty: 1.0 },
  { question: "Góc ngoài của tam giác bằng:", options: ["Tổng hai góc trong không kề với nó", "Góc trong kề bù với nó", "Tổng ba góc trong tam giác", "Số đo góc đối diện"], correct_index: 0, explanation: "Tính chất góc ngoài tam giác.", difficulty: 1.2 },
  { question: "Cho tam giác ABC có $\\widehat{A} = 100^\\circ, \\widehat{B} = 40^\\circ$. Tính góc ngoài tại đỉnh C.", options: ["$140^\\circ$", "$40^\\circ$", "$80^\\circ$", "$180^\\circ$"], correct_index: 0, explanation: "Góc ngoài = $100 + 40 = 140$.", difficulty: 1.2 },
  { question: "Tổng ba góc của một tam giác bằng:", options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$270^\\circ$"], correct_index: 0, explanation: "Định lí tổng ba góc.", difficulty: 1.0 },
  { question: "Trong tam giác ABC vuông tại A, $\\widehat{B} + \\widehat{C} = ?$", options: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$100^\\circ$"], correct_index: 0, explanation: "Tổng hai góc nhọn trong tam giác vuông bằng $90^\\circ$.", difficulty: 1.0 },
  { question: "Một tam giác có thể có nhiều nhất bao nhiêu góc tù?", options: ["1 góc tù", "2 góc tù", "3 góc tù", "Không có góc tù nào"], correct_index: 0, explanation: "Nếu có 2 góc tù thì tổng đã lớn hơn $180^\\circ$.", difficulty: 1.2 },
  { question: "Cho tam giác ABC có $\\widehat{A} = 60^\\circ, \\widehat{B} = 2 \\widehat{C}$. Tính $\\widehat{C}$.", options: ["$40^\\circ$", "$60^\\circ$", "$80^\\circ$", "$30^\\circ$"], correct_index: 0, explanation: "$60 + 2C + C = 180 \\implies 3C = 120 \\implies C = 40$.", difficulty: 1.5 },
  { question: "Góc ngoài của tam giác lớn hơn mỗi góc trong không kề với nó. Đúng hay sai?", options: ["Đúng", "Sai", "Chỉ đúng với tam giác vuông", "Chỉ đúng với tam giác nhọn"], correct_index: 0, explanation: "Hệ quả của tính chất góc ngoài.", difficulty: 1.2 },
  { question: "Cho tam giác ABC có $\\widehat{B} = 45^\\circ, \\widehat{C} = 35^\\circ$. Tính góc ngoài tại đỉnh A.", options: ["$80^\\circ$", "$100^\\circ$", "$45^\\circ$", "$35^\\circ$"], correct_index: 0, explanation: "Góc ngoài = $45 + 35 = 80$.", difficulty: 1.2 }
];

// --- BAI 10: TRUONG HOP C-C-C ---
const BAI_10_SPECIFIC = [
  { question: "Hai tam giác bằng nhau theo trường hợp c.c.c khi:", options: ["Ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia", "Ba góc bằng nhau", "Chu vi bằng nhau", "Diện tích bằng nhau"], correct_index: 0, explanation: "Trường hợp cạnh-cạnh-cạnh.", difficulty: 1.0 },
  { question: "Cho $\\Delta ABC = \\Delta MNP$. Khẳng định nào sau đây SAI?", options: ["$AB = MP$", "$AB = MN$", "$BC = NP$", "$AC = MP$"], correct_index: 0, explanation: "AB tương ứng MN.", difficulty: 1.0 },
  { question: "Để $\\Delta ABC = \\Delta DEF$ (c.c.c) khi đã có $AB = DE, AC = DF$, cần thêm điều kiện:", options: ["$BC = EF$", "$\\widehat{A} = \\widehat{D}$", "$\\widehat{B} = \\widehat{E}$", "$\\widehat{C} = \\widehat{F}$"], correct_index: 0, explanation: "Cần đủ 3 cặp cạnh bằng nhau.", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC = \\Delta MNP$ (c.c.c). Nếu $AB = 5cm, BC = 6cm, AC = 7cm$ thì chu vi $\\Delta MNP$ là:", options: ["$18cm$", "$11cm$", "$13cm$", "$12cm$"], correct_index: 0, explanation: "Chu vi bằng nhau = $5+6+7 = 18$.", difficulty: 1.2 },
  { question: "Kí hiệu $\\Delta ABC = \\Delta DEF$ có nghĩa là:", options: ["Các đỉnh tương ứng bằng nhau A-D, B-E, C-F", "A-E, B-D, C-F", "Đỉnh nào cũng được", "Diện tích bằng nhau"], correct_index: 0, explanation: "Quy ước viết các đỉnh tương ứng.", difficulty: 1.0 },
  { question: "Hai tam giác bằng nhau thì:", options: ["Các góc tương ứng bằng nhau", "Các góc không bằng nhau", "Chỉ các cạnh bằng nhau", "Chu vi khác nhau"], correct_index: 0, explanation: "Định nghĩa hai tam giác bằng nhau.", difficulty: 1.0 },
  { question: "Cho tam giác ABC cân tại A ($AB=AC$). Gọi M là trung điểm BC. Ta có $\\Delta ABM = \\Delta ACM$ theo trường hợp:", options: ["c.c.c", "c.g.c", "g.c.g", "Cạnh huyền-Góc nhọn"], correct_index: 0, explanation: "AB=AC, BM=CM, AM chung.", difficulty: 1.2 },
  { question: "Nếu $\\Delta ABC = \\Delta MNP$ thì $\\widehat{B}$ bằng góc nào?", options: ["$\\widehat{N}$", "$\\widehat{M}$", "$\\widehat{P}$", "Không xác định"], correct_index: 0, explanation: "B tương ứng N.", difficulty: 1.0 },
  { question: "Cho $\\Delta ABC = \\Delta DEF$. Biết $AB=4, AC=5, EF=6$. Tính chu vi $\\Delta ABC$.", options: ["$15$", "$14$", "$10$", "$9$"], correct_index: 0, explanation: "$BC = EF = 6$. Chu vi = $4+5+6 = 15$.", difficulty: 1.5 },
  { question: "Có mấy trường hợp bằng nhau của tam giác (không tính tam giác vuông)?", options: ["3 trường hợp", "1 trường hợp", "2 trường hợp", "4 trường hợp"], correct_index: 0, explanation: "c.c.c, c.g.c, g.c.g.", difficulty: 1.0 }
];

// --- BAI 11: TRUONG HOP C-G-C ---
const BAI_11_SPECIFIC = [
  { question: "Trường hợp c.g.c yêu cầu góc bằng nhau phải là:", options: ["Góc xen giữa hai cạnh", "Góc kề một cạnh", "Góc đối diện một cạnh", "Góc vuông"], correct_index: 0, explanation: "Tính chất trường hợp cạnh-góc-cạnh.", difficulty: 1.0 },
  { question: "Để $\\Delta ABC = \\Delta DEF$ (c.g.c) khi đã có $AB = DE, BC = EF$, cần thêm:", options: ["$\\widehat{B} = \\widehat{E}$", "$\\widehat{A} = \\widehat{D}$", "$\\widehat{C} = \\widehat{F}$", "$AC = DF$"], correct_index: 0, explanation: "Góc xen giữa hai cạnh AB, BC là góc B.", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC$ và $\\Delta MNP$ có $AB = MN, \\widehat{B} = \\widehat{N}, BC = NP$. Khẳng định nào ĐÚNG?", options: ["$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta MPN$", "$\\Delta ABC = \\Delta NMP$", "Không bằng nhau"], correct_index: 0, explanation: "Theo trường hợp c.g.c.", difficulty: 1.0 },
  { question: "Góc xen giữa hai cạnh AC và BC của tam giác ABC là:", options: ["$\\widehat{C}$", "$\\widehat{A}$", "$\\widehat{B}$", "$\\widehat{H}$"], correct_index: 0, explanation: "Góc tạo bởi hai tia CA và CB.", difficulty: 1.0 },
  { question: "Trong tam giác vuông, hai cạnh góc vuông của tam giác này bằng hai cạnh góc vuông của tam giác kia thì:", options: ["Hai tam giác vuông đó bằng nhau", "Hai tam giác vuông đó không bằng nhau", "Cần thêm góc nhọn bằng nhau", "Chu vi bằng nhau"], correct_index: 0, explanation: "Vì góc giữa hai cạnh góc vuông luôn bằng $90^\\circ$ (c.g.c).", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC$ có $AB=AC$, AD là tia phân giác $\\widehat{A}$. Chứng minh $\\Delta ABD = \\Delta ACD$ theo:", options: ["c.g.c", "c.c.c", "g.c.g", "Cạnh huyền-Cạnh góc vuông"], correct_index: 0, explanation: "AB=AC, $\\widehat{A1}=\\widehat{A2}$, AD chung.", difficulty: 1.2 },
  { question: "Nếu $\\Delta ABC = \\Delta DEF$ (c.g.c) thì:", options: ["$AC = DF$", "$\\widehat{B} = \\widehat{D}$", "$AB = EF$", "$BC = DF$"], correct_index: 0, explanation: "Cạnh còn lại tương ứng cũng phải bằng nhau.", difficulty: 1.2 },
  { question: "Cho $\\Delta OAB$ và $\\Delta OCD$ có OA=OC, OB=OD, $\\widehat{AOB}=\\widehat{COD}$ (đối đỉnh). Suy ra:", options: ["$\\Delta OAB = \\Delta OCD$ (c.g.c)", "$\\Delta OAB = \\Delta ODC$ (c.c.c)", "AB=CD", "Cả A và C đều đúng"], correct_index: 3, explanation: "Hai tam giác bằng nhau nên các cạnh tương ứng bằng nhau.", difficulty: 1.5 },
  { question: "Tính chất c.g.c có áp dụng cho tam giác vuông không?", options: ["Có, là trường hợp hai cạnh góc vuông", "Không", "Chỉ áp dụng cho tam giác cân", "Chỉ áp dụng khi biết cạnh huyền"], correct_index: 0, explanation: "Tam giác vuông có góc xen giữa là $90^\\circ$.", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC$ có $AB=3, AC=4, \\widehat{A}=60^\\circ$. $\\Delta DEF$ có $DE=3, DF=4, \\widehat{D}=60^\\circ$. Suy ra:", options: ["$\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta FED$", "BC = 5", "Không đủ dữ kiện"], correct_index: 0, explanation: "Bằng nhau theo c.g.c.", difficulty: 1.2 }
];

// --- BAI 12: TRUONG HOP G-C-G ---
const BAI_12_SPECIFIC = [
  { question: "Trường hợp g.c.g yêu cầu cạnh bằng nhau phải là:", options: ["Cạnh kề hai góc đó", "Cạnh đối diện một góc", "Cạnh huyền", "Cạnh bất kỳ"], correct_index: 0, explanation: "Tính chất góc-cạnh-góc.", difficulty: 1.0 },
  { question: "Để $\\Delta ABC = \\Delta DEF$ (g.c.g) khi đã có $\\widehat{B} = \\widehat{E}, \\widehat{C} = \\widehat{F}$, cần thêm:", options: ["$BC = EF$", "$AB = DE$", "$AC = DF$", "$\\widehat{A} = \\widehat{D}$"], correct_index: 0, explanation: "Cạnh kề của góc B và C là BC.", difficulty: 1.2 },
  { question: "Hệ quả 'Cạnh huyền - Góc nhọn' áp dụng cho:", options: ["Tam giác vuông", "Tam giác cân", "Tam giác đều", "Mọi tam giác"], correct_index: 0, explanation: "Trường hợp đặc biệt của g.c.g trong tam giác vuông.", difficulty: 1.0 },
  { question: "Nếu một cạnh góc vuông và một góc nhọn kề cạnh ấy của tam giác vuông này bằng... thì hai tam giác vuông đó bằng nhau.", options: ["Cạnh góc vuông và góc nhọn kề của tam giác vuông kia", "Cạnh huyền và góc nhọn của tam giác vuông kia", "Hai cạnh góc vuông của tam giác vuông kia", "Góc vuông"], correct_index: 0, explanation: "Tính chất bằng nhau của tam giác vuông (g.c.g).", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC = \\Delta MNP$ (g.c.g). Nếu $AB = 5cm$ thì cạnh nào của $\\Delta MNP$ bằng $5cm$?", options: ["$MN$", "$NP$", "$MP$", "Không cạnh nào"], correct_index: 0, explanation: "Cạnh tương ứng bằng nhau.", difficulty: 1.0 },
  { question: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $\\widehat{A}=\\widehat{D}, \\widehat{B}=\\widehat{E}$. Để bằng nhau (g.c.g) cần thêm:", options: ["$AB = DE$", "$BC = EF$", "$AC = DF$", "$\\widehat{C} = \\widehat{F}$"], correct_index: 0, explanation: "Cạnh kề của góc A và B là AB.", difficulty: 1.2 },
  { question: "Trong hai tam giác bằng nhau (g.c.g), nếu hai góc bằng nhau thì góc thứ ba có bằng nhau không?", options: ["Có, vì tổng ba góc luôn bằng $180^\\circ$", "Không", "Chỉ đúng với tam giác đều", "Chỉ đúng với tam giác vuông"], correct_index: 0, explanation: "Hệ quả từ định lí tổng ba góc.", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC$ có $\\widehat{B}=\\widehat{C}$. Tia phân giác AD của $\\widehat{A}$ chia tam giác thành hai tam giác bằng nhau theo:", options: ["g.c.g", "c.c.c", "c.g.c", "Cạnh huyền-Cạnh góc vuông"], correct_index: 0, explanation: "$\\widehat{A1}=\\widehat{A2}$, AD chung, $\\widehat{D1}=\\widehat{D2}$ (vì B=C).", difficulty: 1.5 },
  { question: "Hệ quả cạnh huyền - góc nhọn thực chất là trường hợp nào?", options: ["g.c.g", "c.g.c", "c.c.c", "Cạnh-Góc-Góc"], correct_index: 0, explanation: "Vì hai góc nhọn bằng nhau và một góc vuông bằng nhau nên góc nhọn còn lại cũng bằng nhau.", difficulty: 1.5 },
  { question: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $BC=EF, \\widehat{B}=\\widehat{E}, \\widehat{A}=\\widehat{D}$. Suy ra:", options: ["$\\Delta ABC = \\Delta DEF$ (g.c.g)", "$\\Delta ABC = \\Delta DEF$ (c.g.c)", "Không bằng nhau", "Diện tích bằng nhau nhưng không bằng nhau"], correct_index: 0, explanation: "Vì A=D và B=E nên C=F. Do đó bằng nhau theo g.c.g (góc B, cạnh BC, góc C).", difficulty: 1.8 }
];

// --- LUYEN TAP CHUNG ---
const LUYEN_TAP_SPECIFIC = [
  { question: "Tổng ba góc trong một tam giác bằng:", options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$120^\\circ$"], correct_index: 0, explanation: "Định lí cơ bản.", difficulty: 1.0 },
  { question: "Có mấy trường hợp bằng nhau cơ bản của hai tam giác?", options: ["3 trường hợp", "4 trường hợp", "2 trường hợp", "5 trường hợp"], correct_index: 0, explanation: "c.c.c, c.g.c, g.c.g.", difficulty: 1.0 },
  { question: "Tam giác ABC vuông tại A có $\\widehat{B} = 55^\\circ$. Tính $\\widehat{C}$.", options: ["$35^\\circ$", "$45^\\circ$", "$55^\\circ$", "$90^\\circ$"], correct_index: 0, explanation: "$90 - 55 = 35$.", difficulty: 1.0 },
  { question: "Góc ngoài tại một đỉnh của tam giác bằng:", options: ["Tổng hai góc trong không kề với nó", "Góc trong kề bù với nó", "180 độ", "90 độ"], correct_index: 0, explanation: "Tính chất góc ngoài.", difficulty: 1.0 },
  { question: "Hai tam giác bằng nhau thì chu vi của chúng:", options: ["Bằng nhau", "Khác nhau", "Gấp đôi nhau", "Không so sánh được"], correct_index: 0, explanation: "Do các cạnh tương ứng bằng nhau.", difficulty: 1.0 },
  { question: "Để chứng minh hai tam giác bằng nhau theo c.g.c, ta cần:", options: ["Hai cạnh và góc xen giữa", "Hai cạnh và góc bất kỳ", "Ba cạnh", "Hai góc và cạnh xen giữa"], correct_index: 0, explanation: "Định nghĩa c.g.c.", difficulty: 1.0 },
  { question: "Để chứng minh hai tam giác bằng nhau theo g.c.g, ta cần:", options: ["Hai góc và cạnh xen giữa", "Hai góc và cạnh bất kỳ", "Ba góc", "Hai cạnh và góc xen giữa"], correct_index: 0, explanation: "Định nghĩa g.c.g.", difficulty: 1.0 },
  { question: "Trong tam giác vuông, cạnh huyền và một góc nhọn bằng nhau thì hai tam giác đó bằng nhau. Đúng hay sai?", options: ["Đúng", "Sai", "Chỉ đúng với tam giác cân", "Chỉ đúng với tam giác đều"], correct_index: 0, explanation: "Hệ quả từ g.c.g.", difficulty: 1.2 },
  { question: "Cho $\\Delta ABC = \\Delta DEF$. Biết $\\widehat{A}=50^\\circ, \\widehat{E}=60^\\circ$. Tính $\\widehat{C}$.", options: ["$70^\\circ$", "$60^\\circ$", "$50^\\circ$", "$110^\\circ$"], correct_index: 0, explanation: "$\widehat{B}=\widehat{E}=60$. $\widehat{C} = 180-(50+60)=70$.", difficulty: 1.5 },
  { question: "Hai tam giác có ba góc bằng nhau tương ứng thì có bằng nhau không?", options: ["Chưa chắc chắn bằng nhau", "Chắc chắn bằng nhau", "Chỉ bằng nhau khi là tam giác vuông", "Bằng nhau theo trường hợp g.g.g"], correct_index: 0, explanation: "Chỉ chắc chắn chúng đồng dạng, không nhất thiết bằng nhau (cần ít nhất 1 cạnh bằng nhau).", difficulty: 1.5 }
];

// --- ON TAP CHUONG 4 ---
const ON_TAP_SPECIFIC = [
  { question: "Nếu $\\Delta ABC = \\Delta MNP$ thì khẳng định nào sau đây ĐÚNG?", options: ["$AC = MP$", "$AB = NP$", "$BC = MN$", "$\\widehat{A} = \\widehat{N}$"], correct_index: 0, explanation: "Cặp cạnh tương ứng A-M, B-N, C-P.", difficulty: 1.0 },
  { question: "Cho tam giác ABC có $\\widehat{A} = 90^\\circ, AB = AC$. Đây là tam giác gì?", options: ["Tam giác vuông cân", "Tam giác đều", "Tam giác nhọn", "Tam giác tù"], correct_index: 0, explanation: "Có góc vuông và hai cạnh bằng nhau.", difficulty: 1.0 },
  { question: "Tổng ba góc của một tam giác luôn bằng:", options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$100^\\circ$"], correct_index: 0, explanation: "Định lí tổng ba góc.", difficulty: 1.0 },
  { question: "Hai tam giác bằng nhau theo trường hợp c.g.c nếu:", options: ["Hai cạnh và góc xen giữa bằng nhau", "Hai góc và cạnh xen giữa bằng nhau", "Ba cạnh bằng nhau", "Ba góc bằng nhau"], correct_index: 0, explanation: "Trường hợp 2.", difficulty: 1.0 },
  { question: "Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó. Đây là:", options: ["Định lí", "Định nghĩa", "Hệ quả", "Tiên đề"], correct_index: 0, explanation: "Định lí về góc ngoài của tam giác.", difficulty: 1.0 },
  { question: "Trong tam giác vuông, cạnh đối diện với góc vuông gọi là:", options: ["Cạnh huyền", "Cạnh góc vuông", "Đường cao", "Đường trung tuyến"], correct_index: 0, explanation: "Thuật ngữ hình học.", difficulty: 1.0 },
  { question: "Tính số đo góc C của tam giác ABC biết $\\widehat{A}=40^\\circ, \\widehat{B}=80^\\circ$.", options: ["$60^\\circ$", "$70^\\circ$", "$40^\\circ$", "$80^\\circ$"], correct_index: 0, explanation: "$180 - (40+80) = 60$.", difficulty: 1.0 },
  { question: "Cho $\\Delta ABC = \\Delta DEF$. Biết chu vi $\\Delta ABC$ là 20cm. Chu vi $\\Delta DEF$ là:", options: ["20cm", "10cm", "40cm", "Không tính được"], correct_index: 0, explanation: "Hai tam giác bằng nhau có chu vi bằng nhau.", difficulty: 1.0 },
  { question: "Trường hợp bằng nhau g.c.g cần điều kiện cạnh phải là:", options: ["Cạnh kề hai góc đó", "Cạnh huyền", "Cạnh đối diện góc lớn hơn", "Bất kỳ cạnh nào"], correct_index: 0, explanation: "Quy tắc g.c.g.", difficulty: 1.2 },
  { question: "Đường trung trực của đoạn thẳng AB là đường thẳng:", options: ["Vuông góc với AB tại trung điểm của AB", "Đi qua trung điểm của AB", "Song song với AB", "Vuông góc với AB"], correct_index: 0, explanation: "Định nghĩa đường trung trực.", difficulty: 1.0 }
];

// Helper to shuffle array and take N
function getQuestions(prereqPool: any[], specificPool: any[], count: number = 20) {
  const shuffledPrereq = [...prereqPool].sort(() => 0.5 - Math.random());
  const shuffledSpecific = [...specificPool].sort(() => 0.5 - Math.random());
  
  // Take 10 from each to make 20
  return [...shuffledPrereq.slice(0, 10), ...shuffledSpecific.slice(0, 10)];
}

async function seed() {
  console.log("🚀 Starting Chapter 4 assessments seeding...");

  // 1. Fetch Subject Math
  const { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'toan')
    .single();

  if (!subject) {
    console.error("❌ Subject 'toan' not found!");
    process.exit(1);
  }

  // 2. Ensure curriculum_units has Grade 7 Unit 4 entry
  console.log("Ensuring curriculum_units entry for Chapter 4...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 7)
    .eq('unit_number', 4)
    .maybeSingle();

  let unitId = '';
  if (existingUnit) {
    unitId = existingUnit.id;
    console.log(`✅ curriculum_units already exists (ID: ${unitId})`);
  } else {
    const { data: newUnit, error: unitError } = await supabase
      .from('curriculum_units')
      .insert({
        subject: 'toan',
        grade: 7,
        title: 'Chương 4: Tam giác bằng nhau',
        unit_number: 4,
        subject_id: subject.id,
        book_name: 'Toán 7 - Kết nối tri thức'
      })
      .select()
      .single();

    if (unitError) {
      console.error("❌ Error inserting curriculum_units:", unitError.message);
      process.exit(1);
    }
    unitId = newUnit.id;
    console.log(`✅ curriculum_units created (ID: ${unitId})`);
  }

  // 3. Ensure assessment_collections for Chapter 4
  const collectionTitle = 'Toán 7 - Tập 1 (Chương 4)';
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id, units')
    .eq('subject_slug', 'toan')
    .eq('grade', 7)
    .eq('title', collectionTitle)
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    const { data: newCol, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: collectionTitle,
        subject_slug: 'toan',
        grade: 7,
        volume: 1,
        units: [4],
        status: 'published'
      })
      .select()
      .single();

    if (colError) {
      console.error("❌ Error inserting assessment_collections:", colError.message);
      process.exit(1);
    }
    collectionId = newCol.id;
    console.log(`✅ assessment_collections created (ID: ${collectionId})`);
  }

  // Define mapping for lesson mappings
  const LESSON_MAPPINGS = [
    {
      slug: 'bai-9-tong-cac-goc-trong-tam-giac',
      conceptSlug: 'concept-bai-9-tong-cac-goc-trong-tam-giac',
      titlePrefix: "Bài 9: Tổng các góc trong một tam giác",
      specificPool: BAI_9_SPECIFIC
    },
    {
      slug: 'bai-10-tam-giac-bang-nhau-truong-hop-1',
      conceptSlug: 'concept-bai-10-tam-giac-bang-nhau-truong-hop-1',
      titlePrefix: "Bài 10: Trường hợp c-c-c",
      specificPool: BAI_10_SPECIFIC
    },
    {
      slug: 'bai-11-truong-hop-bang-nhau-thu-hai',
      conceptSlug: 'concept-bai-11-truong-hop-bang-nhau-thu-hai',
      titlePrefix: "Bài 11: Trường hợp c-g-c",
      specificPool: BAI_11_SPECIFIC
    },
    {
      slug: 'bai-12-truong-hop-bang-nhau-thu-ba',
      conceptSlug: 'concept-bai-12-truong-hop-bang-nhau-thu-ba',
      titlePrefix: "Bài 12: Trường hợp g-c-g",
      specificPool: BAI_12_SPECIFIC
    },
    {
        slug: 'kiem-tra-chuong-4',
        conceptSlug: 'concept-kiem-tra-chuong-4',
        titlePrefix: "Ôn tập chương 4",
        specificPool: ON_TAP_SPECIFIC
    }
  ];

  for (const lessonMapping of LESSON_MAPPINGS) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing: ${lessonMapping.slug}`);

    const { data: lessonNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', lessonMapping.slug).single();
    const { data: concept } = await supabase.from('concepts').select('id').eq('slug', lessonMapping.conceptSlug).single();

    if (!lessonNode || !concept) {
      console.error(`❌ Node or Concept not found for ${lessonMapping.slug}`);
      continue;
    }

    // Clear previous
    await supabase.from('exercise_sets').delete().eq('metadata->>node_id', lessonNode.id).like('title', 'Đề luyện tập số%');
    const { data: existingExams } = await supabase.from('exams').select('id').eq('collection_id', collectionId).like('title', `${lessonMapping.titlePrefix}%`);
    if (existingExams && existingExams.length > 0) {
      const ids = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', ids);
      await supabase.from('exams').delete().in('id', ids);
    }

    for (let i = 1; i <= 4; i++) {
      const title = `Đề luyện tập số ${i}: ${lessonMapping.titlePrefix}`;
      console.log(`  -> Creating exam: ${title}`);

      const { data: exSet } = await supabase.from('exercise_sets').insert({
        title, type: 'practice', metadata: { node_id: lessonNode.id, concept_id: concept.id, sequence: i }
      }).select().single();

      const { data: exam } = await supabase.from('exams').insert({
        collection_id: collectionId, title, exam_number: i, total_questions: 20, generation_mode: 'balanced'
      }).select().single();

      if (exSet && exam) {
        const questions = getQuestions(PREREQ_POOL, lessonMapping.specificPool, 20);
        for (let qIdx = 0; qIdx < questions.length; qIdx++) {
          const q = questions[qIdx];
          const { data: newQ } = await supabase.from('question_bank').insert({
            concept_id: concept.id, type: 'multiple_choice', difficulty: q.difficulty || 1.2,
            metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
            source: 'handcrafted', status: 'approved', grade: 7, subject_slug: 'toan'
          }).select().single();

          if (newQ) {
            await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: newQ.id, sort_key: qIdx });
            await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIdx });
          }
        }
        console.log(`    ✅ Inserted 20 questions.`);
      }
    }
  }

  console.log("\n🎉 Chapter 4 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
