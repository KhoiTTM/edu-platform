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

const LESSON_13_MD = `### Bài 13: Thu thập và phân loại dữ liệu

#### 1. Thu thập dữ liệu
Có nhiều phương pháp để thu thập dữ liệu tùy theo mục đích nghiên cứu:
- **Quan sát trực tiếp:** Theo dõi và ghi chép thông tin.
- **Làm thí nghiệm:** Thực hiện đo lường khoa học.
- **Lập phiếu hỏi (Khảo sát):** Phát bảng câu hỏi trực tiếp hoặc qua internet.
- **Nguồn có sẵn:** Tra cứu từ sách báo, niên giám thống kê, website đáng tin cậy.

#### 2. Phân loại dữ liệu
Dữ liệu thu thập được bao gồm hai loại chính:
- **Dữ liệu là số (Số liệu):** Ví dụ: chiều cao, điểm số, nhiệt độ.
- **Dữ liệu không phải là số (Chữ, hình ảnh...):** Ví dụ: họ tên, quốc tịch, loại sách, sở thích.

#### 3. Tính hợp lý của dữ liệu
Để đảm bảo dữ liệu đáng tin cậy, ta phải kiểm tra xem dữ liệu đó có:
- Nằm trong phạm vi dự kiến không (ví dụ điểm thi không thể bằng $-2$ hoặc $11$).
- Phù hợp với kiến thức thực tế không (ví dụ chiều cao học sinh lớp 7 không thể là $2,5 m$).
- Đúng định dạng quy định không (ví dụ số điện thoại phải đủ chữ số).
`;

const LESSON_14_MD = `### Bài 14: Biểu đồ hình quạt tròn

#### 1. Đọc và mô tả biểu đồ hình quạt tròn
Biểu đồ hình quạt tròn dùng để so sánh các phần trong toàn bộ dữ liệu.
- **Cấu tạo:**
  - Hình tròn biểu diễn toàn bộ dữ liệu (tương ứng với $100\\%$).
  - Các hình quạt tròn (hình nêm) biểu diễn từng phần của dữ liệu.
  - Tổng các tỉ lệ phần trăm ghi trên hình quạt luôn luôn bằng $100\\%$.

<div class="flex justify-center my-4">
  <svg width="240" height="200" viewBox="0 0 240 200" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Pie Chart representing: SGK 50%, STK 25%, Truyen 25% -->
    <path d="M 120 100 L 120 30 A 70 70 0 0 1 120 170 Z" fill="#38bdf8" opacity="0.8" stroke="#0f172a" stroke-width="1.5" />
    <path d="M 120 100 L 120 170 A 70 70 0 0 1 50 100 Z" fill="#10b981" opacity="0.8" stroke="#0f172a" stroke-width="1.5" />
    <path d="M 120 100 L 50 100 A 70 70 0 0 1 120 30 Z" fill="#fbbf24" opacity="0.8" stroke="#0f172a" stroke-width="1.5" />
    
    <!-- Legend -->
    <rect x="150" y="45" width="8" height="8" fill="#38bdf8" />
    <text x="163" y="52" fill="#94a3b8" font-size="9">SGK: 50%</text>
    
    <rect x="150" y="65" width="8" height="8" fill="#10b981" />
    <text x="163" y="72" fill="#94a3b8" font-size="9">STK: 25%</text>
    
    <rect x="150" y="85" width="8" height="8" fill="#fbbf24" />
    <text x="163" y="92" fill="#94a3b8" font-size="9">Truyện: 25%</text>
  </svg>
</div>

#### 2. Phân tích dữ liệu từ biểu đồ
- Dựa vào tỉ lệ phần trăm, ta có thể so sánh thành phần nào chiếm tỉ lệ cao nhất, thấp nhất hoặc gấp mấy lần thành phần khác.
`;

const LESSON_15_MD = `### Bài 15: Biểu đồ đoạn thẳng

#### 1. Đọc và mô tả biểu đồ đoạn thẳng
Biểu đồ đoạn thẳng thường được dùng để biểu diễn sự thay đổi của một đại lượng theo thời gian.
- **Cấu tạo:**
  - Trục nằm ngang: Biểu diễn thời gian (năm, tháng, giờ...).
  - Trục đứng: Biểu diễn đại lượng ta quan tâm (nhiệt độ, doanh thu, học sinh giỏi...).
  - Mỗi điểm biểu diễn giá trị của đại lượng tại một mốc thời gian.
  - Các đoạn thẳng nối tiếp nhau thể hiện xu hướng tăng hoặc giảm của đại lượng đó.

<div class="flex justify-center my-4">
  <svg width="260" height="160" viewBox="0 0 260 160" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Axes -->
    <line x1="40" y1="20" x2="40" y2="120" stroke="#475569" stroke-width="1.5" />
    <line x1="40" y1="120" x2="230" y2="120" stroke="#475569" stroke-width="1.5" />
    
    <!-- Grid lines -->
    <line x1="40" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    <line x1="40" y1="40" x2="230" y2="40" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    
    <!-- Line graph data points: (60, 100), (110, 80), (160, 90), (210, 40) -->
    <polyline points="60,100 110,75 160,90 210,45" fill="none" stroke="#fbbf24" stroke-width="2" />
    
    <!-- Dots -->
    <circle cx="60" cy="100" r="3.5" fill="#f43f5e" />
    <circle cx="110" cy="75" r="3.5" fill="#f43f5e" />
    <circle cx="160" cy="90" r="3.5" fill="#f43f5e" />
    <circle cx="210" cy="45" r="3.5" fill="#f43f5e" />
    
    <!-- X Labels -->
    <text x="50" y="135" fill="#94a3b8" font-size="9">2021</text>
    <text x="100" y="135" fill="#94a3b8" font-size="9">2022</text>
    <text x="150" y="135" fill="#94a3b8" font-size="9">2023</text>
    <text x="200" y="135" fill="#94a3b8" font-size="9">2024</text>
  </svg>
</div>

#### 2. Phân tích xu hướng
- Đoạn thẳng đi lên thể hiện giá trị **tăng**.
- Đoạn thẳng đi xuống thể hiện giá trị **giảm**.
- Đoạn thẳng nằm ngang thể hiện giá trị **không đổi**.
`;

// --- QUESTION BANK ---

const L13_QUESTIONS = [
  { question: "Phương pháp nào sau đây KHÔNG phải là cách thu thập dữ liệu?", options: ["Lập luận logic lý thuyết", "Lập phiếu hỏi khảo sát", "Làm thí nghiệm thực tiễn", "Tra cứu trên internet"], correct_index: 0, explanation: "Thu thập dữ liệu phải thông qua quan sát, thí nghiệm, khảo sát hoặc tra cứu, không thể tự lập luận logic ra số liệu thực tế.", difficulty: 1.0 },
  { question: "Cho dãy số liệu điểm kiểm tra Toán 7: $8; 10; 7; -2; 9$. Điểm nào là không hợp lí?", options: ["$-2$", "$10$", "$7$", "Không có điểm nào"], correct_index: 0, explanation: "Điểm kiểm tra trong trường học chỉ tính từ 0 đến 10, do đó điểm -2 là hoàn toàn không hợp lí.", difficulty: 1.0 },
  { question: "Dữ liệu nào sau đây là số liệu (dữ liệu số)?", options: ["Chiều cao của các thành viên trong tổ", "Họ tên của các học sinh trong lớp", "Sở thích thể thao của các bạn", "Danh sách các món ăn sáng yêu thích"], correct_index: 0, explanation: "Chiều cao là dữ liệu số (ví dụ 150 cm, 160 cm), các dữ liệu còn lại là định tính (chữ).", difficulty: 1.0 },
  { question: "Khi khảo sát mức thu nhập trung bình của người dân Việt Nam, khảo sát tại một khu chung cư cao cấp có đảm bảo tính đại diện không?", options: ["Không đảm bảo, vì chỉ phản ánh nhóm người có thu nhập cao.", "Có đảm bảo, vì chung cư cao cấp đại diện cho thành thị.", "Có đảm bảo, vì khảo sát rất đông người.", "Có đảm bảo, vì được khảo sát trực tiếp."], correct_index: 0, explanation: "Khảo sát ở khu chung cư cao cấp không đại diện cho mức thu nhập chung của đa số người dân Việt Nam.", difficulty: 1.2 },
  { question: "Danh sách số điện thoại ghi nhận được: 0912345678, 123, 0987654321. Điểm không hợp lí ở đây là gì?", options: ["Số 123 không hợp lí vì quá ngắn so với số điện thoại thực tế.", "Số 0912345678 không hợp lí.", "Không có số nào bất hợp lí.", "Tất cả đều hợp lí."], correct_index: 0, explanation: "Số điện thoại di động thông thường tại Việt Nam có 10 chữ số, số 123 không đúng định dạng.", difficulty: 1.0 },
  { question: "Danh sách chiều cao (đơn vị cm) của học sinh lớp 7 ghi nhận: 145, 152, 148, 250, 155. Dữ liệu nào bất hợp lý?", options: ["$250$", "$145$", "$155$", "Không có số nào"], correct_index: 0, explanation: "Chiều cao 250 cm (2.5 mét) là phi thực tế đối với một học sinh lớp 7.", difficulty: 1.0 },
  { question: "Dữ liệu không phải là số được gọi là gì?", options: ["Dữ liệu định tính", "Dữ liệu định lượng", "Số liệu", "Dữ liệu thực nghiệm"], correct_index: 0, explanation: "Dữ liệu không phải số biểu thị tính chất, danh mục nên được gọi là dữ liệu định tính.", difficulty: 1.0 },
  { question: "Bạn Hùng hỏi ý kiến 5 bạn học sinh trong Câu lạc bộ Sách để tìm hiểu về sở thích đọc sách của học sinh toàn trường. Dữ liệu này:", options: ["Không đảm bảo tính đại diện vì mẫu khảo sát quá nhỏ và thiên lệch.", "Đảm bảo tính đại diện hoàn toàn.", "Là dữ liệu định lượng số.", "Hoàn toàn hợp lý."], correct_index: 0, explanation: "Học sinh trong câu lạc bộ sách chắc chắn thích đọc sách hơn học sinh bình thường, đồng thời số lượng 5 bạn là quá ít.", difficulty: 1.5 },
  { question: "Dãy dữ liệu nào dưới đây là hoàn toàn hợp lí về nhiệt độ cơ thể người bình thường (đơn vị °C)?", options: ["$36,5; 37; 36,8$", "$37; 45; 36,5$", "$37; -5; 36$", "$37; 100; 36,5$"], correct_index: 0, explanation: "Nhiệt độ cơ thể người bình thường dao động quanh mức 36,5°C - 37°C. Các mức nhiệt độ như 45°C, -5°C hay 100°C là không hợp lí.", difficulty: 1.2 },
  { question: "Để đánh giá tính hợp lí của dữ liệu, ta cần căn cứ vào các tiêu chí nào?", options: ["Phạm vi dự kiến, kiến thức thực tế và định dạng dữ liệu", "Độ dài dữ liệu", "Ý kiến của người thu thập", "Số lượng phần tử dữ liệu"], correct_index: 0, explanation: "Các tiêu chí kiểm tra gồm: dữ liệu nằm trong phạm vi, phù hợp thực tế, đúng định dạng.", difficulty: 1.0 }
];

const L14_QUESTIONS = [
  { question: "Tổng các tỉ lệ phần trăm trên một biểu đồ hình quạt tròn luôn luôn bằng bao nhiêu?", options: ["$100\\%$", "$90\\%$", "$360\\%$", "$50\\%$"], correct_index: 0, explanation: "Tổng tất cả các hình quạt biểu thị các thành phần cấu thành nên toàn bộ dữ liệu phải bằng 100%.", difficulty: 1.0 },
  {
    question: "Quan sát biểu đồ hình quạt tròn về các loại sách trong thư viện dưới đây. Loại sách nào chiếm tỉ lệ cao nhất?<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='180' height='150' viewBox='0 0 180 150' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <path d='M 90 75 L 90 15 A 60 60 0 0 1 90 135 Z' fill='#38bdf8' opacity='0.8' stroke='#000' />" +
              "    <path d='M 90 75 L 90 135 A 60 60 0 0 1 30 75 Z' fill='#10b981' opacity='0.8' stroke='#000' />" +
              "    <path d='M 90 75 L 30 75 A 60 60 0 0 1 90 15 Z' fill='#fbbf24' opacity='0.8' stroke='#000' />" +
              "    <text x='105' y='75' fill='#fff' font-size='8'>SGK (50%)</text>" +
              "    <text x='45' y='110' fill='#fff' font-size='8'>STK (25%)</text>" +
              "    <text x='45' y='50' fill='#fff' font-size='8'>Khác (25%)</text>" +
              "  </svg>" +
              "</div>",
    options: ["Sách giáo khoa (SGK)", "Sách tham khảo (STK)", "Khác", "Bằng nhau"],
    correct_index: 0,
    explanation: "Dựa vào biểu đồ hình quạt tròn, Sách giáo khoa chiếm nửa hình tròn tức là tỷ lệ lớn nhất (50%).",
    difficulty: 1.0
  },
  { question: "Biểu đồ hình quạt tròn dùng để làm gì?", options: ["So sánh các phần trong toàn bộ dữ liệu", "Biểu diễn sự thay đổi của đại lượng theo thời gian", "Liệt kê số lượng chính xác", "Tính toán giá trị trung bình"], correct_index: 0, explanation: "Biểu đồ quạt tròn dùng để so sánh cơ cấu/tỷ lệ các phần cấu thành nên toàn bộ dữ liệu.", difficulty: 1.0 },
  { question: "Nếu một hình quạt trên biểu đồ tròn chiếm góc vuông ở tâm hình tròn, thì nó chiếm tỉ lệ bao nhiêu phần trăm?", options: ["$25\\%$", "$50\\%$", "$75\\%$", "$20\\%$"], correct_index: 0, explanation: "Góc vuông ở tâm là 90° bằng 1/4 hình tròn (360°), tương ứng với 25%.", difficulty: 1.5 },
  { question: "Một biểu đồ quạt tròn khảo sát sở thích môn học có: Toán (40%), Văn (35%), Anh (20%), Lý (x%). Tìm tỉ lệ phần trăm x của môn Lý.", options: ["$5\\%$", "$10\\%$", "$15\\%$", "$25\\%$"], correct_index: 0, explanation: "Tổng tỉ lệ phải bằng 100%. Do đó: x = 100% - (40% + 35% + 20%) = 5%.", difficulty: 1.2 },
  { question: "Thành phần biểu diễn trên biểu đồ hình quạt tròn được vẽ dưới dạng các hình gì?", options: ["Hình quạt tròn", "Hình vuông", "Các cột đứng", "Các chấm điểm"], correct_index: 0, explanation: "Các thành phần được biểu diễn bằng các hình quạt tròn.", difficulty: 1.0 },
  { question: "Cho biểu đồ quạt tròn khảo sát phương tiện đi học: Xe đạp (60%), Xe máy điện (30%), Đi bộ (10%). Tỉ lệ học sinh đi xe đạp gấp mấy lần học sinh đi bộ?", options: ["6 lần", "2 lần", "3 lần", "5 lần"], correct_index: 0, explanation: "Tỉ lệ xe đạp (60%) chia cho tỉ lệ đi bộ (10%) là: 60 : 10 = 6 lần.", difficulty: 1.2 },
  { question: "Hình tròn biểu diễn toàn bộ dữ liệu tương ứng với bao nhiêu độ tròn trên mặt hình vẽ?", options: ["$360^\\circ$", "$180^\\circ$", "$90^\\circ$", "$100^\\circ$"], correct_index: 0, explanation: "Cả hình tròn tương ứng với góc 360° ở tâm.", difficulty: 1.2 },
  { question: "Nếu một biểu đồ quạt tròn biểu diễn 4 thành phần A, B, C, D có tỉ lệ là: A (30%), B (30%), C (20%). Tìm tỉ lệ phần trăm của D.", options: ["$20\\%$", "$10\\%$", "$30\\%$", "$15\\%$"], correct_index: 0, explanation: "Tỉ lệ của D = 100% - (30% + 30% + 20%) = 20%.", difficulty: 1.0 },
  { question: "Khi biểu diễn dữ liệu vào biểu đồ quạt tròn, phần quạt có diện tích lớn nhất thể hiện:", options: ["Thành phần chiếm tỉ lệ lớn nhất", "Thành phần chiếm tỉ lệ nhỏ nhất", "Giá trị trung bình", "Số lượng ít nhất"], correct_index: 0, explanation: "Diện tích hình quạt tỷ lệ thuận với tỷ lệ phần trăm của thành phần đó, do đó quạt lớn nhất thể hiện tỷ lệ lớn nhất.", difficulty: 1.0 }
];

const L15_QUESTIONS = [
  { question: "Biểu đồ đoạn thẳng thường được dùng để biểu diễn đại lượng nào?", options: ["Sự thay đổi của một đại lượng theo thời gian", "Cơ cấu thành phần trong tổng thể", "So sánh số lượng tuyệt đối giữa các đối tượng", "Tỉ lệ phần trăm các thành phần"], correct_index: 0, explanation: "Biểu đồ đoạn thẳng chuyên dùng để thể hiện xu hướng biến động, thay đổi của đại lượng theo thời gian.", difficulty: 1.0 },
  { question: "Trong biểu đồ đoạn thẳng, trục nằm ngang thường biểu diễn đại lượng nào?", options: ["Thời gian", "Tần số", "Số lượng", "Tên đối tượng"], correct_index: 0, explanation: "Trục nằm ngang của biểu đồ đoạn thẳng luôn biểu diễn thời gian.", difficulty: 1.0 },
  { question: "Trong biểu đồ đoạn thẳng, trục thẳng đứng dùng để biểu diễn:", options: ["Đại lượng ta quan tâm", "Mốc thời gian", "Chú thích biểu đồ", "Tên tác giả"], correct_index: 0, explanation: "Trục thẳng đứng thể hiện giá trị/số liệu của đại lượng đang nghiên cứu.", difficulty: 1.0 },
  { question: "Một đoạn thẳng đi lên từ trái sang phải trên biểu đồ thể hiện xu hướng:", options: ["Tăng", "Giảm", "Không đổi", "Không xác định được"], correct_index: 0, explanation: "Đoạn thẳng đi lên thể hiện giá trị tại mốc thời gian sau lớn hơn mốc trước (xu hướng tăng).", difficulty: 1.0 },
  { question: "Một đoạn thẳng nằm ngang trên biểu đồ đoạn thẳng thể hiện điều gì?", options: ["Giá trị không thay đổi", "Giá trị tăng đột biến", "Giá trị giảm mạnh", "Không có số liệu"], correct_index: 0, explanation: "Đoạn thẳng nằm ngang nghĩa là giá trị tại hai thời điểm bằng nhau (không thay đổi).", difficulty: 1.0 },
  {
    question: "Quan sát biểu đồ đoạn thẳng dưới đây. Hỏi giá trị đại lượng vào năm 2022 là bao nhiêu?<br/>" +
              "<div class='flex justify-center my-4'>" +
              "  <svg width='220' height='130' viewBox='0 0 220 130' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
              "    <line x1='30' y1='10' x2='30' y2='100' stroke='#94a3b8' />" +
              "    <line x1='30' y1='100' x2='200' y2='100' stroke='#94a3b8' />" +
              "    <polyline points='50,80 100,40 150,60' fill='none' stroke='#38bdf8' stroke-width='2' />" +
              "    <circle cx='50' cy='80' r='3' fill='#f43f5e' />" +
              "    <circle cx='100' cy='40' r='3' fill='#f43f5e' />" +
              "    <circle cx='150' cy='60' r='3' fill='#f43f5e' />" +
              "    <text x='35' y='115' font-size='8' fill='#94a3b8'>2021</text>" +
              "    <text x='85' y='115' font-size='8' fill='#94a3b8'>2022</text>" +
              "    <text x='135' y='115' font-size='8' fill='#94a3b8'>2023</text>" +
              "    <text x='95' y='30' font-size='8' fill='#fff'>30°C</text>" +
              "  </svg>" +
              "</div>",
    options: ["$30^\\circ C$", "$20^\\circ C$", "$25^\\circ C$", "$15^\\circ C$"],
    correct_index: 0,
    explanation: "Tại vị trí mốc năm 2022 trên trục ngang, dóng lên điểm biểu diễn ta thấy giá trị ghi trên nhãn là 30°C.",
    difficulty: 1.2
  },
  { question: "Đoạn thẳng nối hai điểm trên biểu đồ đi xuống thể hiện xu hướng:", options: ["Giảm", "Tăng", "Bằng phẳng", "Dao động mạnh"], correct_index: 0, explanation: "Đoạn thẳng đi xuống thể hiện giá trị giảm đi theo thời gian.", difficulty: 1.0 },
  { question: "Mục đích chính của việc sử dụng biểu đồ đoạn thẳng là gì?", options: ["Dễ dàng nhận ra xu hướng thay đổi của tập dữ liệu", "Tính toán giá trị phần trăm", "Phân loại các đối tượng khác nhau", "Vẽ hình trang trí"], correct_index: 0, explanation: "Biểu đồ đoạn thẳng trực quan hóa sự biến động tăng giảm để người xem nhanh chóng nắm bắt xu hướng.", difficulty: 1.0 },
  { question: "Điểm biểu diễn đầu tiên trên biểu đồ đoạn thẳng có giá trị y = 10 (năm 2021), điểm thứ hai có y = 15 (năm 2022). Tốc độ tăng trưởng là:", options: ["Tăng 5 đơn vị", "Giảm 5 đơn vị", "Tăng 10 đơn vị", "Không đổi"], correct_index: 0, explanation: "Giá trị tăng thêm từ 10 lên 15 tức là tăng 5 đơn vị.", difficulty: 1.2 },
  { question: "Có thể biểu diễn nhiệt độ các giờ trong ngày bằng biểu đồ quạt tròn được không?", options: ["Không nên, vì biểu đồ đoạn thẳng thể hiện xu hướng thay đổi theo thời gian tốt hơn nhiều.", "Được, vì tổng nhiệt độ bằng 100%.", "Nên dùng biểu đồ quạt tròn.", "Cả hai biểu đồ đều tốt như nhau."], correct_index: 0, explanation: "Nhiệt độ thay đổi theo thời gian là dữ liệu dạng tiến trình thời gian nên biểu đồ đoạn thẳng là lựa chọn phù hợp nhất.", difficulty: 1.5 }
];

const EXAM5_QUESTIONS = [
  { question: "Để tìm hiểu về thời gian ngủ trung bình của học sinh lớp 7, phương pháp nào thu thập dữ liệu nhanh và chính xác nhất?", options: ["Lập phiếu hỏi khảo sát các bạn học sinh lớp 7", "Làm thí nghiệm y học", "Đo chiều cao các bạn", "Quan sát ảnh chụp"], correct_index: 0, explanation: "Lập phiếu hỏi khảo sát trực tiếp học sinh là cách tối ưu và nhanh chóng nhất.", difficulty: 1.0 },
  { question: "Trong các dữ liệu điểm số kiểm tra sau: $9; 8; 10; 12; 7$. Dữ liệu nào bất hợp lý?", options: ["$12$", "$10$", "$9$", "Không có số nào"], correct_index: 0, explanation: "Điểm số tối đa là 10 nên điểm 12 là bất hợp lý.", difficulty: 1.0 },
  { question: "Dữ liệu nào sau đây là dữ liệu không phải là số (định tính)?", options: ["Màu sắc yêu thích của học sinh", "Số học sinh giỏi của các lớp", "Nhiệt độ trung bình các ngày", "Chiều cao của cây trồng"], correct_index: 0, explanation: "Màu sắc (đỏ, xanh, vàng...) là chữ, không phải là số.", difficulty: 1.0 },
  { question: "Biểu đồ hình quạt tròn dùng để làm gì?", options: ["So sánh tỷ lệ phần trăm các phần trong toàn bộ dữ liệu", "Biểu diễn sự biến động theo thời gian", "Tính toán giá trị trung vị", "Vẽ đồ thị hàm số"], correct_index: 0, explanation: "Biểu đồ quạt biểu thị cơ cấu phần trăm các phần trong tổng thể.", difficulty: 1.0 },
  { question: "Tổng số phần trăm hiển thị trên biểu đồ hình quạt tròn bắt buộc bằng:", options: ["$100\\%$", "$360\\%$", "$50\\%$", "$90\\%$"], correct_index: 0, explanation: "Tổng các thành phần cấu thành nên hình tròn đầy đủ luôn bằng 100%.", difficulty: 1.0 },
  { question: "Nếu một biểu đồ quạt tròn biểu diễn 3 thành phần A, B, C có tỉ lệ: A (45%), B (35%). Tìm tỉ lệ phần trăm của C.", options: ["$20\\%$", "$30\\%$", "$15\\%$", "$10\\%$"], correct_index: 0, explanation: "Tỉ lệ của C = 100% - (45% + 35%) = 20%.", difficulty: 1.0 },
  { question: "Biểu đồ đoạn thẳng thường dùng để thể hiện:", options: ["Sự thay đổi của một đại lượng theo thời gian", "Mối quan hệ giữa các thành phần", "Tỷ số diện tích", "Tỷ lệ phần trăm các loại sách"], correct_index: 0, explanation: "Biểu đồ đoạn thẳng mô tả sự biến động tăng/giảm của đại lượng theo tiến trình thời gian.", difficulty: 1.0 },
  { question: "Trục thẳng đứng trong biểu đồ đoạn thẳng biểu diễn:", options: ["Giá trị đại lượng quan tâm", "Các mốc thời gian", "Chú thích biểu đồ", "Tên các danh mục"], correct_index: 0, explanation: "Trục đứng biểu diễn giá trị số liệu của đại lượng nghiên cứu.", difficulty: 1.0 },
  { question: "Nhìn vào đường biểu diễn đoạn thẳng đi xuống từ trái sang phải, ta rút ra nhận xét gì?", options: ["Đại lượng có xu hướng giảm", "Đại lượng có xu hướng tăng", "Đại lượng không thay đổi", "Không xác định được"], correct_index: 0, explanation: "Độ dốc đi xuống chứng tỏ giá trị thời điểm sau nhỏ hơn thời điểm trước (xu hướng giảm).", difficulty: 1.0 },
  { question: "Khảo sát thời gian sử dụng internet thu được số liệu: 1 giờ, 2 giờ, 30 phút, 24 giờ. Số liệu nào bất hợp lý với học sinh đi học cả ngày?", options: ["$24 giờ$", "$1 giờ$", "$2 giờ$", "$30 phút$"], correct_index: 0, explanation: "Sử dụng internet 24 giờ/ngày là không hợp lí vì học sinh cần thời gian đi học, ngủ và các sinh hoạt khác.", difficulty: 1.5 },
  { question: "Nếu góc ở tâm của một hình quạt tròn bằng $180^\\circ$ thì nó biểu diễn tỷ lệ bao nhiêu?", options: ["$50\\%$", "$25\\%$", "$100\\%$", "$75\\%$"], correct_index: 0, explanation: "180° bằng 1/2 hình tròn (360°), tương ứng với 50%.", difficulty: 1.2 },
  { question: "Một biểu đồ đoạn thẳng ghi nhận nhiệt độ Hà Nội lúc 6h là 20°C, lúc 12h là 32°C. Nhiệt độ đã tăng thêm bao nhiêu độ?", options: ["$12^\\circ C$", "$20^\\circ C$", "$32^\\circ C$", "$10^\\circ C$"], correct_index: 0, explanation: "Độ tăng nhiệt độ là: 32°C - 20°C = 12°C.", difficulty: 1.0 },
  { question: "Dữ liệu nào sau đây không có tính đại diện cho sở thích của toàn bộ học sinh trường?", options: ["Chỉ hỏi các học sinh trong câu lạc bộ vẽ", "Hỏi ngẫu nhiên các học sinh ở sân trường", "Phát phiếu hỏi cho tất cả các lớp", "Khảo sát ngẫu nhiên danh sách học sinh từ sổ điểm"], correct_index: 0, explanation: "Học sinh câu lạc bộ vẽ có thiên hướng mỹ thuật cao hơn mức trung bình của học sinh toàn trường.", difficulty: 1.2 },
  { question: "Để biểu diễn sự thay đổi dân số Việt Nam qua các năm, loại biểu đồ nào phù hợp nhất?", options: ["Biểu đồ đoạn thẳng", "Biểu đồ hình quạt tròn", "Sơ đồ khối", "Biểu đồ cột chồng"], correct_index: 0, explanation: "Dân số thay đổi qua các năm là đại lượng biến động theo thời gian, nên biểu đồ đoạn thẳng là tối ưu nhất.", difficulty: 1.0 },
  { question: "Phân loại dữ liệu thành số liệu và dữ liệu không phải là số giúp:", options: ["Lựa chọn phương pháp phân tích và biểu diễn phù hợp", "Làm cho dữ liệu ngắn hơn", "Tăng tính chính xác của số liệu", "Không có tác dụng gì"], correct_index: 0, explanation: "Phân loại đúng tính chất dữ liệu (định tính hay định lượng) giúp lựa chọn chính xác phương pháp thống kê và vẽ biểu đồ phù hợp.", difficulty: 1.2 }
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

  await supabase
    .from('curriculum_nodes')
    .update({ metadata: updatedMetadata })
    .eq('id', lessonNode.id);

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
  console.log("🚀 Starting Chapter 5 Seeding...");

  // Lesson 13
  await seedLesson(
    'bai-13-thu-thap-phan-loai-du-lieu',
    LESSON_13_MD,
    L13_QUESTIONS,
    'concept-bai-13-thu-thap-phan-loai-du-lieu'
  );

  // Lesson 14
  await seedLesson(
    'bai-14-bieu-do-hinh-quat-tron',
    LESSON_14_MD,
    L14_QUESTIONS,
    'concept-bai-14-bieu-do-hinh-quat-tron'
  );

  // Lesson 15
  await seedLesson(
    'bai-15-bieu-do-doan-thang',
    LESSON_15_MD,
    L15_QUESTIONS,
    'concept-bai-15-bieu-do-doan-thang'
  );

  // Chapter 5 Exam
  const examSlug = 'kiem-tra-chuong-5';
  const { data: examNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id, metadata')
    .eq('slug', examSlug)
    .single();

  if (examNode) {
    const examConceptSlug = 'concept-kiem-tra-chuong-5';
    const { data: concept } = await supabase
      .from('concepts')
      .upsert({
        source_id: examNode.source_id,
        slug: examConceptSlug,
        title: 'Kiểm tra tổng hợp Chương 5',
        description: 'Đánh giá kiến thức chương 5 thu thập biểu diễn dữ liệu'
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

      for (const q of EXAM5_QUESTIONS) {
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
      console.log(`✅ Seeded ${EXAM5_QUESTIONS.length} questions for Chapter 5 Exam.`);
    }
  }

  console.log("\n🎉 Chapter 5 Seeding Completed Successfully!");
}

main().catch(err => {
  console.error("❌ Chapter 5 seeding failed:", err);
  process.exit(1);
});
