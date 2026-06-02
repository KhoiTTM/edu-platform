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

// Define 4 test sets (20 questions each)
const DE_1 = {
  title: "Đề luyện tập số 1: Tập hợp các số hữu tỉ",
  questions: [
    // 10 Old Knowledge Questions (Grade 6)
    { question: "Rút gọn phân số $\\frac{24}{36}$ về phân số tối giản:", options: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{12}{18}$", "$\\frac{4}{6}$"], correct_index: 0, explanation: "Chia cả tử và mẫu cho ước chung lớn nhất là 12: $\\frac{24 : 12}{36 : 12} = \\frac{2}{3}$.", difficulty: 1.0 },
    { question: "Tính tổng: $\\frac{1}{4} + \\frac{2}{3}$", options: ["$\\frac{11}{12}$", "$\\frac{3}{7}$", "$\\frac{3}{12}$", "$\\frac{8}{12}$"], correct_index: 0, explanation: "Quy đồng mẫu số chung là 12: $\\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}$.", difficulty: 1.0 },
    { question: "Tính hiệu của hai phân số: $\\frac{5}{6} - \\frac{1}{3}$", options: ["$\\frac{1}{2}$", "$\\frac{4}{3}$", "$\\frac{3}{6}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "Quy đồng mẫu: $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính cộng số nguyên: $(-15) + (-8)$", options: ["$-23$", "$-7$", "$23$", "$7$"], correct_index: 0, explanation: "Cộng hai số nguyên âm ta cộng hai phần số tự nhiên rồi đặt dấu trừ đằng trước: $-(15 + 8) = -23$.", difficulty: 1.0 },
    { question: "Tính tích hai phân số sau: $\\frac{-3}{5} \\cdot \\frac{10}{9}$", options: ["$\\frac{-2}{3}$", "$\\frac{-6}{9}$", "$\\frac{-30}{45}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "Rút gọn chéo tử mẫu: $\\frac{-3}{9} = \\frac{-1}{3}$ và $\\frac{10}{5} = 2$. Do đó tích bằng $\\frac{-2}{3}$.", difficulty: 1.0 },
    { question: "Tìm số nguyên x biết: $x - 3 = -8$", options: ["$-5$", "$-11$", "$5$", "$11$"], correct_index: 0, explanation: "Chuyển vế tìm được $x = -8 + 3 = -5$.", difficulty: 1.0 },
    { question: "So sánh hai phân số sau: $\\frac{3}{5}$ và $\\frac{4}{7}$", options: ["$\\frac{3}{5} > \\frac{4}{7}$", "$\\frac{3}{5} < \\frac{4}{7}$", "$\\frac{3}{5} = \\frac{4}{7}$", "Không so sánh được"], correct_index: 0, explanation: "Quy đồng mẫu số chung là 35: $\\frac{3}{5} = \\frac{21}{35}$ và $\\frac{4}{7} = \\frac{20}{35}$. Vì $21 > 20$ nên $\\frac{3}{5} > \\frac{4}{7}$.", difficulty: 1.2 },
    { question: "Tìm ước chung lớn nhất (UCLN) của hai số 12 và 18:", options: ["$6$", "$3$", "$12$", "$36$"], correct_index: 0, explanation: "Ước của 12 là {1, 2, 3, 4, 6, 12}. Ước của 18 là {1, 2, 3, 6, 9, 18}. Ước chung lớn nhất là 6.", difficulty: 1.0 },
    { question: "Viết phân số $\\frac{3}{4}$ dưới dạng số thập phân:", options: ["$0,75$", "$0,34$", "$0,7$", "$7,5$"], correct_index: 0, explanation: "$\\frac{3}{4} = 3 : 4 = 0,75$.", difficulty: 1.0 },
    { question: "Tính kết quả phép chia phân số sau: $\\frac{-7}{10} : \\frac{14}{5}$", options: ["$-\\frac{1}{4}$", "$-\\frac{49}{25}$", "$-\\frac{2}{4}$", "$\\frac{1}{4}$"], correct_index: 0, explanation: "$\\frac{-7}{10} \\cdot \\frac{5}{14} = \\frac{-7 \\cdot 5}{10 \\cdot 14} = \\frac{-1 \\cdot 1}{2 \\cdot 2} = -\\frac{1}{4}$.", difficulty: 1.2 },
    // 10 New Knowledge Questions (Grade 7 - Lesson 1)
    { question: "Tập hợp các số hữu tỉ được kí hiệu bằng chữ cái nào?", options: ["$\\mathbb{Q}$", "$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{R}$"], correct_index: 0, explanation: "Theo định nghĩa, tập hợp các số hữu tỉ được kí hiệu là Q.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $2,5$:", options: ["$-2,5$", "$2,5$", "$0,25$", "$-0,25$"], correct_index: 0, explanation: "Số đối của số hữu tỉ x là -x. Do đó số đối của 2,5 là -2,5.", difficulty: 1.0 },
    { question: "Trong các khẳng định sau, khẳng định nào đúng về số hữu tỉ?", options: ["$-5 \\in \\mathbb{Q}$", "$-5 \\notin \\mathbb{Q}$", "$-5 \\in \\mathbb{N}$", "$\\frac{3}{4} \\in \\mathbb{Z}$"], correct_index: 0, explanation: "Vì $-5 = \\frac{-5}{1}$ nên $-5$ là số hữu tỉ ($-5 \\in \\mathbb{Q}$).", difficulty: 1.0 },
    { question: "Số nào dưới đây là số vô tỉ, KHÔNG PHẢI số hữu tỉ?", options: ["$\\sqrt{2}$", "$-0,5$", "$\\frac{3}{4}$", "$2$"], correct_index: 0, explanation: "$\\sqrt{2} \\approx 1,4142...$ là số thập phân vô hạn không tuần hoàn nên là số vô tỉ, không viết được dưới dạng phân số a/b.", difficulty: 1.2 },
    { question: "Một điểm A biểu diễn trên trục số nằm giữa 0 và 1. Đoạn từ 0 đến 1 chia làm 3 phần bằng nhau và điểm A nằm ở vạch chia thứ 2 tính từ 0. Điểm A biểu diễn số hữu tỉ nào?", options: ["$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{3}{2}$", "$2$"], correct_index: 0, explanation: "Đoạn đơn vị chia làm 3 phần, lấy 2 phần về phía dương nên điểm đó biểu diễn phân số $\\frac{2}{3}$.", difficulty: 1.5 },
    { question: "So sánh hai số hữu tỉ sau: $-0,75$ và $-\\frac{4}{5}$:", options: ["$-0,75 > -\\frac{4}{5}$", "$-0,75 < -\\frac{4}{5}$", "$-0,75 = -\\frac{4}{5}$", "Không so sánh được"], correct_index: 0, explanation: "Đổi $-0,75 = -\\frac{3}{4} = -\\frac{15}{20}$. Phân số $-\\frac{4}{5} = -\\frac{16}{20}$. Vì $-15 > -16$ nên $-0,75 > -\\frac{4}{5}$.", difficulty: 1.5 },
    { question: "Chọn khẳng định đúng nhất về số 0:", options: ["Số 0 không là số hữu tỉ dương cũng không là số hữu tỉ âm", "Số 0 là số hữu tỉ dương", "Số 0 là số hữu tỉ âm", "Số 0 không phải là số hữu tỉ"], correct_index: 0, explanation: "Số 0 là số hữu tỉ nhưng không thuộc nhóm số hữu tỉ âm hay dương.", difficulty: 1.0 },
    { question: "Mọi số nguyên a đều có thể viết dưới dạng phân số nào?", options: ["$\\frac{a}{1}$", "$\\frac{1}{a}$", "$\\frac{a}{a}$", "$\\frac{0}{a}$"], correct_index: 0, explanation: "Mọi số nguyên a đều biểu diễn được dưới dạng phân số có mẫu số bằng 1: $\\frac{a}{1}$.", difficulty: 1.0 },
    { question: "Chọn ký hiệu thích hợp điền vào ô trống: $\\frac{-2}{3} \\square \\mathbb{Z}$", options: ["$\\notin$", "$\\in$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "$\\frac{-2}{3}$ là một phân số không rút gọn được về số nguyên nên không thuộc tập số nguyên Z.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $-\\frac{7}{9}$:", options: ["$\\frac{7}{9}$", "$-\\frac{7}{9}$", "$\\frac{9}{7}$", "$-\\frac{9}{7}$"], correct_index: 0, explanation: "Số đối của $-\\frac{7}{9}$ là $-(-\\frac{7}{9}) = \\frac{7}{9}$.", difficulty: 1.0 }
  ]
};

const DE_2 = {
  title: "Đề luyện tập số 2: Tập hợp các số hữu tỉ",
  questions: [
    // 10 Old Knowledge Questions (Grade 6)
    { question: "Rút gọn phân số $\\frac{45}{60}$ về dạng tối giản:", options: ["$\\frac{3}{4}$", "$\\frac{9}{12}$", "$\\frac{15}{20}$", "$\\frac{5}{6}$"], correct_index: 0, explanation: "Chia cả tử và mẫu cho 15 ta được: $\\frac{45 : 15}{60 : 15} = \\frac{3}{4}$.", difficulty: 1.0 },
    { question: "Tính tổng: $\\frac{2}{5} + \\frac{1}{3}$", options: ["$\\frac{11}{15}$", "$\\frac{3}{8}$", "$\\frac{3}{15}$", "$\\frac{7}{15}$"], correct_index: 0, explanation: "Quy đồng mẫu số chung là 15: $\\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}$.", difficulty: 1.0 },
    { question: "Tính hiệu: $\\frac{7}{8} - \\frac{1}{4}$", options: ["$\\frac{5}{8}$", "$\\frac{6}{8}$", "$\\frac{3}{4}$", "$\\frac{3}{8}$"], correct_index: 0, explanation: "Quy đồng mẫu: $\\frac{7}{8} - \\frac{2}{8} = \\frac{5}{8}$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính: $(-12) + 20$", options: ["$8$", "$-8$", "$32$", "$-32$"], correct_index: 0, explanation: "Cộng hai số nguyên khác dấu: lấy số có giá trị tuyệt đối lớn hơn trừ số nhỏ hơn và mang dấu của số lớn hơn: $20 - 12 = 8$.", difficulty: 1.0 },
    { question: "Tính tích: $\\frac{-4}{7} \\cdot \\frac{21}{16}$", options: ["$\\frac{-3}{4}$", "$\\frac{-12}{28}$", "$\\frac{-3}{2}$", "$\\frac{3}{4}$"], correct_index: 0, explanation: "Rút gọn chéo: $\\frac{-4}{16} = \\frac{-1}{4}$ và $\\frac{21}{7} = 3$. Tích là $\\frac{-3}{4}$.", difficulty: 1.0 },
    { question: "Tìm số nguyên x biết: $x + 5 = -2$", options: ["$-7$", "$3$", "$-3$", "$7$"], correct_index: 0, explanation: "$x = -2 - 5 = -7$.", difficulty: 1.0 },
    { question: "So sánh hai phân số: $\\frac{2}{3}$ và $\\frac{5}{7}$", options: ["$\\frac{2}{3} < \\frac{5}{7}$", "$\\frac{2}{3} > \\frac{5}{7}$", "$\\frac{2}{3} = \\frac{5}{7}$", "Không so sánh được"], correct_index: 0, explanation: "Quy đồng mẫu số chung là 21: $\\frac{2}{3} = \\frac{14}{21}$ và $\\frac{5}{7} = \\frac{15}{21}$. Vì $14 < 15$ nên $\\frac{2}{3} < \\frac{5}{7}$.", difficulty: 1.2 },
    { question: "Tìm bội chung nhỏ nhất (BCNN) của hai số 6 và 8:", options: ["$24$", "$48$", "$12$", "$14$"], correct_index: 0, explanation: "Bội của 6: {6, 12, 18, 24, 30...}. Bội của 8: {8, 16, 24, 32...}. Số nhỏ nhất chung là 24.", difficulty: 1.0 },
    { question: "Viết phân số $\\frac{1}{5}$ dưới dạng số thập phân:", options: ["$0,2$", "$0,02$", "$0,5$", "$1,5$"], correct_index: 0, explanation: "$\\frac{1}{5} = 1 : 5 = 0,2$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính: $\\frac{-5}{6} : \\frac{15}{12}$", options: ["$-\\frac{2}{3}$", "$-\\frac{25}{24}$", "$-\\frac{1}{3}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "$\\frac{-5}{6} \\cdot \\frac{12}{15} = \\frac{-5}{15} \\cdot \\frac{12}{6} = \\frac{-1}{3} \\cdot 2 = -\\frac{2}{3}$.", difficulty: 1.2 },
    // 10 New Knowledge Questions (Grade 7 - Lesson 1)
    { question: "Mối quan hệ bao hàm nào sau đây giữa tập hợp số nguyên Z và số hữu tỉ Q là đúng?", options: ["$\\mathbb{Z} \\subset \\mathbb{Q}$", "$\\mathbb{Q} \\subset \\mathbb{Z}$", "$\\mathbb{Z} \\in \\mathbb{Q}$", "$\\mathbb{Q} \\in \\mathbb{Z}$"], correct_index: 0, explanation: "Mọi số nguyên đều là số hữu tỉ, nên Z là tập con của Q ($\\mathbb{Z} \\subset \\mathbb{Q}$).", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $-3 \\frac{1}{2}$:", options: ["$3 \\frac{1}{2}$", "$-3,5$", "$3.12$", "$\\frac{7}{2}$"], correct_index: 0, explanation: "Số đối của $-3 \\frac{1}{2}$ là $3 \\frac{1}{2}$ (tức đổi dấu trừ thành cộng).", difficulty: 1.0 },
    { question: "Trong các khẳng định sau, khẳng định nào SAI?", options: ["$\\frac{1}{2} \\in \\mathbb{Z}$", "$-3 \\in \\mathbb{Q}$", "$0 \\in \\mathbb{Q}$", "$1,5 \\in \\mathbb{Q}$"], correct_index: 0, explanation: "$\\frac{1}{2}$ không phải số nguyên nên khẳng định $\\frac{1}{2} \\in \\mathbb{Z}$ là sai.", difficulty: 1.0 },
    { question: "Để một phân số $\\frac{a}{b}$ biểu diễn một số hữu tỉ, điều kiện bắt buộc đối với a và b là gì?", options: ["a, b thuộc Z; b khác 0", "a, b thuộc N", "a, b thuộc Z", "a thuộc Z; b thuộc N"], correct_index: 0, explanation: "Tử số và mẫu số phải là số nguyên (Z) và mẫu số b phải khác 0.", difficulty: 1.0 },
    { question: "Trên trục số, các số hữu tỉ âm được biểu diễn ở phía nào so với điểm gốc 0?", options: ["Bên trái điểm gốc 0", "Bên phải điểm gốc 0", "Ở giữa điểm gốc 0", "Không biểu diễn được"], correct_index: 0, explanation: "Theo quy ước biểu diễn trên trục số nằm ngang, số hữu tỉ âm nằm ở bên trái điểm gốc 0.", difficulty: 1.0 },
    { question: "So sánh hai số hữu tỉ: $-0,6$ và $-\\frac{2}{3}$:", options: ["$-0,6 > -\\frac{2}{3}$", "$-0,6 < -\\frac{2}{3}$", "$-0,6 = -\\frac{2}{3}$", "Không so sánh được"], correct_index: 0, explanation: "Đổi $-0,6 = -\\frac{3}{5} = -\\frac{9}{15}$. Còn $-\\frac{2}{3} = -\\frac{10}{15}$. Vì $-9 > -10$ nên $-0,6 > -\\frac{2}{3}$.", difficulty: 1.5 },
    { question: "Phân số nào sau đây biểu diễn số hữu tỉ $-0,25$?", options: ["$\\frac{-1}{4}$", "$\\frac{1}{4}$", "$\\frac{-1}{25}$", "$\\frac{-25}{10}$"], correct_index: 0, explanation: "$-0,25 = \\frac{-25}{100} = \\frac{-1}{4}$.", difficulty: 1.0 },
    { question: "Trong các phân số sau, phân số nào biểu diễn số hữu tỉ dương?", options: ["$\\frac{-2}{-7}$", "$\\frac{-3}{5}$", "$\\frac{0}{-5}$", "$\\frac{4}{-9}$"], correct_index: 0, explanation: "$\\frac{-2}{-7} = \\frac{2}{7} > 0$ nên là số hữu tỉ dương.", difficulty: 1.2 },
    { question: "Chọn ký hiệu thích hợp điền vào ô trống: $1,25 \\square \\mathbb{Q}$", options: ["$\\in$", "$\\notin$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "Vì $1,25 = \\frac{125}{100} = \\frac{5}{4}$ nên $1,25$ thuộc tập số hữu tỉ Q.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $\\frac{5}{12}$:", options: ["$-\\frac{5}{12}$", "$\\frac{12}{5}$", "$-\\frac{12}{5}$", "$\\frac{5}{12}$"], correct_index: 0, explanation: "Số đối của $\\frac{5}{12}$ là $-\\frac{5}{12}$.", difficulty: 1.0 }
  ]
};

const DE_3 = {
  title: "Đề luyện tập số 3: Tập hợp các số hữu tỉ",
  questions: [
    // 10 Old Knowledge Questions (Grade 6)
    { question: "Rút gọn phân số $\\frac{32}{48}$ về tối giản:", options: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{16}{24}$", "$\\frac{4}{6}$"], correct_index: 0, explanation: "UCLN của 32 và 48 là 16: $\\frac{32 : 16}{48 : 16} = \\frac{2}{3}$.", difficulty: 1.0 },
    { question: "Tính tổng: $\\frac{3}{8} + \\frac{1}{4}$", options: ["$\\frac{5}{8}$", "$\\frac{4}{12}$", "$\\frac{4}{8}$", "$\\frac{1}{2}$"], correct_index: 0, explanation: "Quy đồng mẫu: $\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}$.", difficulty: 1.0 },
    { question: "Tính hiệu: $\\frac{4}{5} - \\frac{2}{3}$", options: ["$\\frac{2}{15}$", "$\\frac{2}{5}$", "$\\frac{2}{3}$", "$\\frac{6}{15}$"], correct_index: 0, explanation: "Quy đồng mẫu: $\\frac{12}{15} - \\frac{10}{15} = \\frac{2}{15}$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính: $(-25) + 15$", options: ["$-10$", "$10$", "$-40$", "$40$"], correct_index: 0, explanation: "$(-25) + 15 = -(25 - 15) = -10$.", difficulty: 1.0 },
    { question: "Tính tích: $\\frac{-5}{8} \\cdot \\frac{16}{25}$", options: ["$-\\frac{2}{5}$", "$-\\frac{1}{2}$", "$-\\frac{80}{200}$", "$-\\frac{3}{5}$"], correct_index: 0, explanation: "Rút gọn: $\\frac{-5}{25} = \\frac{-1}{5}$ và $\\frac{16}{8} = 2$. Kết quả là $-\\frac{2}{5}$.", difficulty: 1.0 },
    { question: "Tìm số nguyên x biết: $x - 7 = -12$", options: ["$-5$", "$-19$", "$5$", "$19$"], correct_index: 0, explanation: "$x = -12 + 7 = -5$.", difficulty: 1.0 },
    { question: "So sánh hai phân số: $\\frac{-3}{4}$ và $\\frac{-5}{6}$", options: ["$\\frac{-3}{4} > \\frac{-5}{6}$", "$\\frac{-3}{4} < \\frac{-5}{6}$", "$\\frac{-3}{4} = \\frac{-5}{6}$", "Không so sánh được"], correct_index: 0, explanation: "Quy đồng mẫu chung 12: $-\\frac{9}{12}$ và $-\\frac{10}{12}$. Vì $-9 > -10$ nên $-\\frac{3}{4} > -\\frac{5}{6}$.", difficulty: 1.2 },
    { question: "Tìm số nguyên lớn nhất nhỏ hơn $\\frac{7}{3}$:", options: ["$2$", "$3$", "$1$", "$0$"], correct_index: 0, explanation: "$\\frac{7}{3} = 2,333...$ Số nguyên lớn nhất nhỏ hơn 2,333... là 2.", difficulty: 1.2 },
    { question: "Viết phân số $\\frac{-1}{4}$ dưới dạng số thập phân:", options: ["$-0,25$", "$0,25$", "$-0,4$", "$0,4$"], correct_index: 0, explanation: "$\\frac{-1}{4} = -0,25$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính: $\\frac{-8}{9} : \\frac{4}{3}$", options: ["$-\\frac{2}{3}$", "$-\\frac{32}{27}$", "$-\\frac{1}{3}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "$\\frac{-8}{9} \\cdot \\frac{3}{4} = \\frac{-8}{4} \\cdot \\frac{3}{9} = -2 \\cdot \\frac{1}{3} = -\\frac{2}{3}$.", difficulty: 1.2 },
    // 10 New Knowledge Questions (Grade 7 - Lesson 1)
    { question: "Khẳng định nào đúng nhất về tập số tự nhiên N, số nguyên Z và số hữu tỉ Q?", options: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$", "$\\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{N}$", "$\\mathbb{N} \\in \\mathbb{Z} \\in \\mathbb{Q}$", "$\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{Q}$"], correct_index: 0, explanation: "Số tự nhiên là con số nguyên, số nguyên là con số hữu tỉ.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $0,75$:", options: ["$-0,75$", "$0,75$", "$-\\frac{4}{3}$", "$\\frac{3}{4}$"], correct_index: 0, explanation: "Số đối của $0,75$ là $-0,75$.", difficulty: 1.0 },
    { question: "Số nào dưới đây là số hữu tỉ âm?", options: ["$\\frac{-3}{5}$", "$\\frac{-4}{-9}$", "$0$", "$1,2$"], correct_index: 0, explanation: "$\\frac{-3}{5} < 0$ nên là số hữu tỉ âm. Còn $\\frac{-4}{-9} = \\frac{4}{9} > 0$ là số hữu tỉ dương.", difficulty: 1.0 },
    { question: "Trên trục số, điểm biểu diễn số hữu tỉ $\\frac{1}{2}$ nằm ở đâu?", options: ["Nằm giữa điểm 0 và điểm 1", "Nằm giữa điểm -1 và điểm 0", "Trùng với điểm 0", "Nằm bên trái điểm 0"], correct_index: 0, explanation: "Vì $0 < \\frac{1}{2} < 1$ nên điểm biểu diễn nằm ở chính giữa đoạn thẳng nối từ 0 đến 1.", difficulty: 1.0 },
    { question: "So sánh hai số hữu tỉ: $-\\frac{1}{2}$ và $-0,5$:", options: ["$-\\frac{1}{2} = -0,5$", "$-\\frac{1}{2} > -0,5$", "$-\\frac{1}{2} < -0,5$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $-\\frac{1}{2} = -0,5$, do đó hai số bằng nhau.", difficulty: 1.0 },
    { question: "Số nào sau đây biểu diễn số hữu tỉ $0,4$ dưới dạng phân số tối giản?", options: ["$\\frac{2}{5}$", "$\\frac{4}{10}$", "$\\frac{1}{4}$", "$\\frac{4}{5}$"], correct_index: 0, explanation: "$0,4 = \\frac{4}{10} = \\frac{2}{5}$.", difficulty: 1.0 },
    { question: "Chọn khẳng định ĐÚNG trong các khẳng định sau:", options: ["Mọi số nguyên đều là số hữu tỉ", "Số hữu tỉ không thể là số âm", "Phân số có mẫu bằng 0 cũng là số hữu tỉ", "Số thập phân không phải là số hữu tỉ"], correct_index: 0, explanation: "Mọi số nguyên x đều viết được thành phân số x/1 nên mọi số nguyên đều là số hữu tỉ.", difficulty: 1.2 },
    { question: "Số đối của số đối của số hữu tỉ $-\\frac{3}{5}$ là:", options: ["$-\\frac{3}{5}$", "$\\frac{3}{5}$", "$\\frac{-5}{3}$", "$\\frac{5}{3}$"], correct_index: 0, explanation: "Số đối của $-\\frac{3}{5}$ là $\\frac{3}{5}$. Số đối của $\\frac{3}{5}$ lại là $-\\frac{3}{5}$. Vậy số đối của số đối của x là chính nó.", difficulty: 1.5 },
    { question: "Chọn kí hiệu thích hợp: $-1,2 \\square \\mathbb{Q}$", options: ["$\\in$", "$\\notin$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "$-1,2 = \\frac{-6}{5}$ là số hữu tỉ nên thuộc tập Q.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $-1 \\frac{1}{4}$:", options: ["$1 \\frac{1}{4}$", "$-1,25$", "$\\frac{-5}{4}$", "$1.25$"], correct_index: 0, explanation: "Số đối của $-1 \\frac{1}{4}$ là $1 \\frac{1}{4}$.", difficulty: 1.0 }
  ]
};

const DE_4 = {
  title: "Đề luyện tập số 4: Tập hợp các số hữu tỉ",
  questions: [
    // 10 Old Knowledge Questions (Grade 6)
    { question: "Rút gọn phân số $\\frac{18}{27}$ về dạng tối giản:", options: ["$\\frac{2}{3}$", "$\\frac{6}{9}$", "$\\frac{3}{4}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "UCLN của 18 và 27 là 9. Do đó $\\frac{18 : 9}{27 : 9} = \\frac{2}{3}$.", difficulty: 1.0 },
    { question: "Tính tổng: $\\frac{2}{7} + \\frac{3}{7}$", options: ["$\\frac{5}{7}$", "$\\frac{5}{14}$", "$\\frac{6}{7}$", "$1$"], correct_index: 0, explanation: "Hai phân số cùng mẫu ta cộng tử số: $\\frac{2+3}{7} = \\frac{5}{7}$.", difficulty: 1.0 },
    { question: "Tính hiệu: $\\frac{5}{9} - \\frac{1}{6}$", options: ["$\\frac{7}{18}$", "$\\frac{4}{3}$", "$\\frac{4}{9}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "Quy đồng mẫu chung 18: $\\frac{10}{18} - \\frac{3}{18} = \\frac{7}{18}$.", difficulty: 1.2 },
    { question: "Thực hiện phép tính: $(-15) - (-8)$", options: ["$-7$", "$-23$", "$7$", "$23$"], correct_index: 0, explanation: "$(-15) - (-8) = -15 + 8 = -7$.", difficulty: 1.0 },
    { question: "Tính tích: $\\frac{-7}{9} \\cdot \\frac{-18}{14}$", options: ["$1$", "$-1$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"], correct_index: 0, explanation: "Tích hai số âm ra số dương: $\\frac{7 \\cdot 18}{9 \\cdot 14} = \\frac{7}{14} \\cdot \\frac{18}{9} = \\frac{1}{2} \\cdot 2 = 1$.", difficulty: 1.2 },
    { question: "Tìm số nguyên x biết: $x + 10 = 4$", options: ["$-6$", "$6$", "$14$", "$-14$"], correct_index: 0, explanation: "$x = 4 - 10 = -6$.", difficulty: 1.0 },
    { question: "So sánh hai phân số: $\\frac{9}{10}$ và $\\frac{10}{11}$", options: ["$\\frac{9}{10} < \\frac{10}{11}$", "$\\frac{9}{10} > \\frac{10}{11}$", "$\\frac{9}{10} = \\frac{10}{11}$", "Không so sánh được"], correct_index: 0, explanation: "Quy đồng mẫu chung 110: $\\frac{99}{110} < \\frac{100}{110}$ nên $\\frac{9}{10} < \\frac{10}{11}$.", difficulty: 1.2 },
    { question: "Tìm số tự nhiên nhỏ nhất chia hết cho cả 3 và 5 (khác 0):", options: ["$15$", "$30$", "$5$", "$1$"], correct_index: 0, explanation: "Bội chung nhỏ nhất của 3 và 5 là 15.", difficulty: 1.0 },
    { question: "Viết phân số $\\frac{2}{5}$ dưới dạng số thập phân:", options: ["$0,4$", "$0,04$", "$0,25$", "$2,5$"], correct_index: 0, explanation: "$\\frac{2}{5} = 2 : 5 = 0,4$.", difficulty: 1.0 },
    { question: "Thực hiện phép tính: $\\frac{-9}{10} : \\frac{-3}{5}$", options: ["$\\frac{3}{2}$", "$-\\frac{3}{2}$", "$\\frac{27}{50}$", "$-\\frac{27}{50}$"], correct_index: 0, explanation: "$\\frac{-9}{10} \\cdot \\frac{5}{-3} = \\frac{-9}{-3} \\cdot \\frac{5}{10} = 3 \\cdot \\frac{1}{2} = \\frac{3}{2}$.", difficulty: 1.2 },
    // 10 New Knowledge Questions (Grade 7 - Lesson 1)
    { question: "Tập hợp các số hữu tỉ bao gồm:", options: ["Số hữu tỉ dương, số hữu tỉ âm và số 0", "Chỉ số hữu tỉ dương và âm", "Số nguyên dương và nguyên âm", "Số tự nhiên và số nguyên"], correct_index: 0, explanation: "Tập hợp số hữu tỉ Q gồm các số hữu tỉ dương, các số hữu tỉ âm và số 0.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $-2,25$:", options: ["$2,25$", "$-2,25$", "$\\frac{9}{4}$", "$2.5$"], correct_index: 0, explanation: "Số đối của $-2,25$ là $2,25$.", difficulty: 1.0 },
    { question: "Khẳng định nào sau đây là SAI?", options: ["$\\frac{3}{0} \\in \\mathbb{Q}$", "$-1 \\in \\mathbb{Q}$", "$0 \\in \\mathbb{Q}$", "$\\frac{-4}{5} \\in \\mathbb{Q}$"], correct_index: 0, explanation: "Mẫu số phải khác 0, do đó $\\frac{3}{0}$ không phải là phân số hay số hữu tỉ.", difficulty: 1.0 },
    { question: "Số đối của số hữu tỉ $\\frac{4}{7}$ là:", options: ["$-\\frac{4}{7}$", "$\\frac{7}{4}$", "$-\\frac{7}{4}$", "$\\frac{4}{7}$"], correct_index: 0, explanation: "Số đối của $\\frac{4}{7}$ là $-\\frac{4}{7}$.", difficulty: 1.0 },
    { question: "Trên trục số, điểm biểu diễn số hữu tỉ $-\\frac{3}{2}$ nằm ở đâu?", options: ["Bên trái điểm 0", "Bên phải điểm 0", "Trùng với điểm 0", "Nằm giữa điểm 0 và 1"], correct_index: 0, explanation: "Vì $-\\frac{3}{2} < 0$ nên điểm biểu diễn của nó nằm ở phía bên trái điểm gốc 0.", difficulty: 1.0 },
    { question: "So sánh hai số hữu tỉ: $-0,25$ và $-\\frac{1}{5}$:", options: ["$-0,25 < -\\frac{1}{5}$", "$-0,25 > -\\frac{1}{5}$", "$-0,25 = -\\frac{1}{5}$", "Không so sánh được"], correct_index: 0, explanation: "Đổi $-0,25 = -\\frac{1}{4} = -\\frac{5}{20}$. Phân số $-\\frac{1}{5} = -\\frac{4}{20}$. Vì $-5 < -4$ nên $-0,25 < -\\frac{1}{5}$.", difficulty: 1.5 },
    { question: "Phân số nào sau đây biểu diễn số hữu tỉ $0,75$?", options: ["$\\frac{3}{4}$", "$\\frac{75}{10}$", "$\\frac{1}{3}$", "$\\frac{7}{5}$"], correct_index: 0, explanation: "$0,75 = \\frac{75}{100} = \\frac{3}{4}$.", difficulty: 1.0 },
    { question: "Có bao nhiêu số hữu tỉ nằm giữa hai số hữu tỉ $1$ và $2$?", options: ["Vô số số hữu tỉ", "Không có số nào", "1 số hữu tỉ", "10 số hữu tỉ"], correct_index: 0, explanation: "Giữa hai số hữu tỉ bất kỳ luôn có vô số số hữu tỉ khác.", difficulty: 1.5 },
    { question: "Chọn kí hiệu thích hợp điền vào ô trống: $0 \\square \\mathbb{Q}$", options: ["$\\in$", "$\\notin$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "Số 0 viết được dưới dạng $\\frac{0}{1}$ nên 0 là số hữu tỉ, tức thuộc Q.", difficulty: 1.0 },
    { question: "Tìm số đối của số hữu tỉ $\\frac{-11}{13}$:", options: ["$\\frac{11}{13}$", "$-\\frac{11}{13}$", "$\\frac{13}{11}$", "$-\\frac{13}{11}$"], correct_index: 0, explanation: "Số đối của $\\frac{-11}{13}$ là $\\frac{11}{13}$.", difficulty: 1.0 }
  ]
};

const ALL_SETS = [DE_1, DE_2, DE_3, DE_4];

async function seed() {
  console.log("🚀 Seeding 4 detailed practice sets for Lesson 1...");

  // 1. Fetch Lesson Node
  const { data: lessonNode } = await supabase
    .from('curriculum_nodes')
    .select('id, source_id')
    .eq('slug', 'bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!lessonNode) {
    console.error("❌ Lesson node 'bai-1-tap-hop-cac-so-huu-ti' not found!");
    process.exit(1);
  }

  // 2. Fetch Concept linked to Lesson 1
  const { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', 'concept-bai-1-tap-hop-cac-so-huu-ti')
    .single();

  if (!concept) {
    console.error("❌ Concept 'concept-bai-1-tap-hop-cac-so-huu-ti' not found!");
    process.exit(1);
  }
  console.log(`✅ Found Concept ID: ${concept.id}`);

  // 3. Clear mock/dummy exercise sets previously created for Lesson 1 to avoid clutter
  // Let's first query the exercise sets with title starting with "Đề luyện tập số" to clean up
  await supabase
    .from('exercise_sets')
    .delete()
    .eq('metadata->node_id', lessonNode.id);
  console.log("🗑️ Cleared previous exercise sets linked to this lesson node.");

  // 4. Create and seed the 4 sets
  for (let sIdx = 0; sIdx < ALL_SETS.length; sIdx++) {
    const setInfo = ALL_SETS[sIdx];
    console.log(`\nCreating exercise set: ${setInfo.title}`);

    // Create Exercise Set
    const { data: exSet, error: setError } = await supabase
      .from('exercise_sets')
      .insert({
        title: setInfo.title,
        type: 'practice',
        metadata: {
          node_id: lessonNode.id,
          concept_id: concept.id,
          sequence: sIdx + 1
        }
      })
      .select()
      .single();

    if (setError) {
      console.error(`❌ Error creating exercise set ${sIdx + 1}:`, setError.message);
      continue;
    }

    console.log(`✅ Set created. ID: ${exSet.id}. Seeding 20 questions...`);

    // Insert questions into question_bank and link them
    for (let qIdx = 0; qIdx < setInfo.questions.length; qIdx++) {
      const q = setInfo.questions[qIdx];
      
      // Insert into question_bank
      const { data: newQ, error: qError } = await supabase
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
        })
        .select()
        .single();

      if (qError) {
        console.error(`  - ❌ Error inserting question ${qIdx + 1}:`, qError.message);
        continue;
      }

      // Link to exercise set
      const { error: linkError } = await supabase
        .from('exercise_questions')
        .insert({
          set_id: exSet.id,
          question_id: newQ.id,
          sort_key: qIdx
        });

      if (linkError) {
        console.error(`  - ❌ Error linking question ${qIdx + 1}:`, linkError.message);
      }
    }
  }

  console.log("\n🎉 Seeding of 4 Practice Sets for Lesson 1 Completed!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
