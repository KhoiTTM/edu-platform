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

// Define questions for Bai 2
const BAI_2_EXAMS = [
  {
    title: "Đề luyện tập số 1: Cộng, trừ, nhân, chia số hữu tỉ",
    questions: [
      { question: "Tính: $\\frac{1}{2} + \\frac{1}{3}$", options: ["$\\frac{5}{6}$", "$\\frac{2}{5}$", "$\\frac{1}{5}$", "$\\frac{1}{6}$"], correct_index: 0, explanation: "Quy đồng mẫu số chung là 6: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.", difficulty: 1.0 },
      { question: "Tính tích: $-2 \\cdot \\frac{3}{4}$", options: ["$-\\frac{3}{2}$", "$-\\frac{6}{8}$", "$-\\frac{2}{3}$", "$-\\frac{5}{4}$"], correct_index: 0, explanation: "$-2 \\cdot \\frac{3}{4} = \\frac{-6}{4} = -\\frac{3}{2}$.", difficulty: 1.0 },
      { question: "Tính kết quả: $\\frac{-5}{8} - \\frac{1}{8}$", options: ["$-\\frac{3}{4}$", "$-\\frac{6}{8}$", "$-\\frac{1}{2}$", "$\\frac{-6}{16}$"], correct_index: 0, explanation: "$\\frac{-5-1}{8} = \\frac{-6}{8} = -\\frac{3}{4}$.", difficulty: 1.0 },
      { question: "Tính: $-0,25 + \\frac{1}{2}$", options: ["$0,25$", "$-0,75$", "$0,75$", "$-0,25$"], correct_index: 0, explanation: "$-0,25 + 0,5 = 0,25$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{-3}{5} \\cdot \\frac{15}{9}$", options: ["$-1$", "$-\\frac{45}{45}$", "$-\\frac{1}{3}$", "$\\frac{-3}{9}$"], correct_index: 0, explanation: "Rút gọn: $\\frac{-3}{9} \\cdot \\frac{15}{5} = -\\frac{1}{3} \\cdot 3 = -1$.", difficulty: 1.2 },
      { question: "Thực hiện phép tính: $1,5 : \\frac{-3}{2}$", options: ["$-1$", "$1$", "$-2,25$", "$-0,75$"], correct_index: 0, explanation: "$1,5 : (-1,5) = -1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 0,5 = \\frac{3}{4}$", options: ["$0,25$", "$0,75$", "$1,25$", "$-0,25$"], correct_index: 0, explanation: "$x = 0,75 - 0,5 = 0,25$.", difficulty: 1.2 },
      { question: "Tính nhanh: $\\frac{3}{7} \\cdot \\frac{5}{9} + \\frac{3}{7} \\cdot \\frac{4}{9}$", options: ["$\\frac{3}{7}$", "$\\frac{9}{7}$", "$1$", "$\\frac{12}{63}$"], correct_index: 0, explanation: "Áp dụng tính chất phân phối: $\\frac{3}{7} \\cdot (\\frac{5}{9} + \\frac{4}{9}) = \\frac{3}{7} \\cdot 1 = \\frac{3}{7}$.", difficulty: 1.5 },
      { question: "Tính giá trị biểu thức: $A = (\\frac{-1}{3}) \\cdot (\\frac{-3}{5}) \\cdot (\\frac{-5}{7})$", options: ["$-\\frac{1}{7}$", "$\\frac{1}{7}$", "$-\\frac{15}{105}$", "$-\\frac{3}{7}$"], correct_index: 0, explanation: "Tích của 3 số âm ra kết quả âm: $-\\frac{1 \\cdot 3 \\cdot 5}{3 \\cdot 5 \\cdot 7} = -\\frac{1}{7}$.", difficulty: 1.5 },
      { question: "Tính: $-2,4 - (-1,2)$", options: ["$-1,2$", "$-3,6$", "$1,2$", "$3,6$"], correct_index: 0, explanation: "$-2,4 + 1,2 = -1,2$.", difficulty: 1.0 },
      // New lesson 2 questions
      { question: "Chọn kí hiệu thích hợp điền vào chỗ trống: $\\frac{-5}{6} + \\frac{1}{6} \\square 0$", options: ["$<$", "$>$", "$=$", "$\\ge$"], correct_index: 0, explanation: "$\\frac{-5+1}{6} = \\frac{-4}{6} = -\\frac{2}{3} < 0$.", difficulty: 1.2 },
      { question: "Kết quả của phép tính: $0,2 + \\frac{-3}{5}$ dưới dạng phân số tối giản là:", options: ["$-\\frac{2}{5}$", "$\\frac{-1}{5}$", "$-\\frac{4}{10}$", "$\\frac{2}{5}$"], correct_index: 0, explanation: "$0,2 - 0,6 = -0,4 = -\\frac{2}{5}$.", difficulty: 1.2 },
      { question: "Tính: $(\\frac{-2}{3}) \\cdot \\frac{3}{4} + \\frac{1}{2}$", options: ["$0$", "$1$", "$-\\frac{1}{6}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "$-\\frac{2}{4} + \\frac{1}{2} = -\\frac{1}{2} + \\frac{1}{2} = 0$.", difficulty: 1.2 },
      { question: "Giá trị của biểu thức: $\\frac{-5}{9} \\cdot \\frac{3}{11} + \\frac{-5}{9} \\cdot \\frac{8}{11}$ là:", options: ["$-\\frac{5}{9}$", "$-\\frac{55}{99}$", "$\\frac{5}{9}$", "$0$"], correct_index: 0, explanation: "$-\\frac{5}{9} \\cdot (\\frac{3}{11} + \\frac{8}{11}) = -\\frac{5}{9} \\cdot 1 = -\\frac{5}{9}$.", difficulty: 1.5 },
      { question: "Thực hiện phép tính chia: $\\frac{-4}{5} : \\frac{-8}{15}$", options: ["$\\frac{3}{2}$", "$-\\frac{3}{2}$", "$\\frac{32}{75}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "$\\frac{-4}{5} \\cdot \\frac{15}{-8} = \\frac{-4 \\cdot 15}{5 \\cdot -8} = \\frac{-60}{-40} = \\frac{3}{2}$.", difficulty: 1.2 },
      { question: "Tính: $-0,75 - \\frac{-1}{4}$", options: ["$-0,5$", "$-1$", "$0,5$", "$0$"], correct_index: 0, explanation: "$-0,75 + 0,25 = -0,5$.", difficulty: 1.2 },
      { question: "Tính tổng: $-3 \\frac{1}{2} + 2 \\frac{1}{2}$", options: ["$-1$", "$-6$", "$1$", "$0$"], correct_index: 0, explanation: "$-\\frac{7}{2} + \\frac{5}{2} = -\\frac{2}{2} = -1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{-2}{3} = \\frac{1}{3}$", options: ["$-0,333...$", "$-\\frac{1}{3}$", "$1$", "$\\frac{1}{3}$"], correct_index: 1, explanation: "$x = \\frac{1}{3} + \\frac{-2}{3} = -\\frac{1}{3}$.", difficulty: 1.5 },
      { question: "Tính: $(\\frac{1}{2} - 1) \\cdot (\\frac{1}{3} - 1) \\cdot (\\frac{1}{4} - 1)$", options: ["$-\\frac{1}{4}$", "$\\frac{1}{4}$", "$-\\frac{3}{8}$", "$-\\frac{1}{24}$"], correct_index: 0, explanation: "$(-\\frac{1}{2}) \\cdot (-\\frac{2}{3}) \\cdot (-\\frac{3}{4}) = -\\frac{1}{4}$.", difficulty: 1.8 },
      { question: "Thực hiện phép tính cộng: $2,3 + (-1,5)$", options: ["$0,8$", "$-0,8$", "$3,8$", "$-3,8$"], correct_index: 0, explanation: "$2,3 - 1,5 = 0,8$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Cộng, trừ, nhân, chia số hữu tỉ",
    questions: [
      { question: "Tính tổng: $\\frac{-2}{5} + \\frac{-3}{5}$", options: ["$-1$", "$-\\frac{5}{10}$", "$1$", "$0$"], correct_index: 0, explanation: "$\\frac{-2-3}{5} = \\frac{-5}{5} = -1$.", difficulty: 1.0 },
      { question: "Tính: $-0,6 \\cdot 5$", options: ["$-3$", "$-0,3$", "$3$", "$-30$"], correct_index: 0, explanation: "$-0,6 \\cdot 5 = -3$.", difficulty: 1.0 },
      { question: "Tính: $\\frac{4}{9} - \\frac{7}{9}$", options: ["$-\\frac{1}{3}$", "$-\\frac{3}{9}$", "$\\frac{1}{3}$", "$\\frac{11}{9}$"], correct_index: 0, explanation: "$\\frac{4-7}{9} = \\frac{-3}{9} = -\\frac{1}{3}$.", difficulty: 1.0 },
      { question: "Tính tổng: $-1,2 + \\frac{-4}{5}$", options: ["$-2$", "$-0,4$", "$2$", "$-1,6$"], correct_index: 0, explanation: "$-1,2 - 0,8 = -2$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{3}{8} \\cdot \\frac{-16}{9}$", options: ["$-\\frac{2}{3}$", "$\\frac{-48}{72}$", "$-\\frac{3}{2}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "Rút gọn chéo: $\\frac{3}{9} = \\frac{1}{3}$ và $\\frac{-16}{8} = -2$. Tích là $-\\frac{2}{3}$.", difficulty: 1.2 },
      { question: "Thực hiện phép tính: $\\frac{-2}{5} : 4$", options: ["$-\\frac{1}{10}$", "$-\\frac{8}{5}$", "$-\\frac{1}{5}$", "$\\frac{1}{10}$"], correct_index: 0, explanation: "$\\frac{-2}{5} \\cdot \\frac{1}{4} = -\\frac{2}{20} = -\\frac{1}{10}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,2 = \\frac{-4}{5}$", options: ["$-0,6$", "$-1$", "$0,6$", "$1$"], correct_index: 0, explanation: "$x = -0,8 + 0,2 = -0,6$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{-4}{7} \\cdot \\frac{3}{5} + \\frac{-4}{7} \\cdot \\frac{2}{5}$", options: ["$-\\frac{4}{7}$", "$-\\frac{20}{35}$", "$\\frac{4}{7}$", "$0$"], correct_index: 0, explanation: "$-\\frac{4}{7} \\cdot (\\frac{3}{5} + \\frac{2}{5}) = -\\frac{4}{7}$.", difficulty: 1.5 },
      { question: "Tính nhanh biểu thức: $B = (1 - \\frac{1}{2}) \\cdot (1 - \\frac{1}{3}) \\cdot (1 - \\frac{1}{4})$", options: ["$\\frac{1}{4}$", "$\\frac{3}{8}$", "$-\\frac{1}{4}$", "$\\frac{1}{24}$"], correct_index: 0, explanation: "$\\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{1}{4}$.", difficulty: 1.5 },
      { question: "Tính kết quả: $1,25 - 2,5$", options: ["$-1,25$", "$1,25$", "$-3,75$", "$3,75$"], correct_index: 0, explanation: "$1,25 - 2,50 = -1,25$.", difficulty: 1.0 },
      // New lesson 2 questions
      { question: "Chọn khẳng định đúng về kết quả phép tính: $\\frac{-2}{3} \\cdot \\frac{-3}{4}$", options: ["Là số hữu tỉ dương", "Là số hữu tỉ âm", "Bằng 0", "Không phải số hữu tỉ"], correct_index: 0, explanation: "Tích của hai số âm là số dương $\\frac{6}{12} = \\frac{1}{2} > 0$.", difficulty: 1.2 },
      { question: "Tính giá trị biểu thức: $-0,8 : \\frac{-4}{5}$", options: ["$1$", "$-1$", "$0,64$", "$-0,64$"], correct_index: 0, explanation: "$-0,8 : (-0,8) = 1$.", difficulty: 1.2 },
      { question: "Tính nhanh tổng: $1,5 + \\frac{3}{4} - 1,5 + \\frac{1}{4}$", options: ["$1$", "$2$", "$0$", "$1,5$"], correct_index: 0, explanation: "$(1,5 - 1,5) + (\\frac{3}{4} + \\frac{1}{4}) = 0 + 1 = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x \\cdot \\frac{2}{3} = \\frac{-4}{9}$", options: ["$-\\frac{2}{3}$", "$-\\frac{8}{27}$", "$-\\frac{3}{2}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "$x = \\frac{-4}{9} : \\frac{2}{3} = \\frac{-4}{9} \\cdot \\frac{3}{2} = -\\frac{2}{3}$.", difficulty: 1.5 },
      { question: "Tính kết quả phép nhân: $-1 \\frac{1}{4} \\cdot (-0,8)", options: ["$1$", "$-1$", "$0,8$", "$-0,8$"], correct_index: 0, explanation: "$-\\frac{5}{4} \\cdot -\\frac{4}{5} = 1$.", difficulty: 1.5 },
      { question: "Thực hiện phép tính: $\\frac{-5}{12} + \\frac{7}{12}$", options: ["$\\frac{1}{6}$", "$\\frac{2}{12}$", "$-\\frac{1}{6}$", "$\\frac{1}{12}$"], correct_index: 0, explanation: "$\\frac{-5+7}{12} = \\frac{2}{12} = \\frac{1}{6}$. (Note: options has 1/6 and 2/12. 1/6 is correct index 0)", correct_index: 0, difficulty: 1.2 },
      { question: "Tính: $-0,125 \\cdot (-8)$", options: ["$1$", "$-1$", "$0,01$", "$0,1$"], correct_index: 0, explanation: "$-0,125 = -\\frac{1}{8}$. Nên $-\\frac{1}{8} \\cdot (-8) = 1$.", difficulty: 1.2 },
      { question: "Tính giá trị: $\\frac{1}{2} - (\\frac{1}{3} + \\frac{1}{2})$", options: ["$-\\frac{1}{3}$", "$\\frac{1}{3}$", "$-\\frac{5}{6}$", "$0$"], correct_index: 0, explanation: "$\\frac{1}{2} - \\frac{1}{3} - \\frac{1}{2} = -\\frac{1}{3}$.", difficulty: 1.5 },
      { question: "Tính: $(\\frac{-3}{4}) : (\\frac{-9}{16}) \\cdot \\frac{3}{4}$", options: ["$1$", "$-1$", "$\\frac{9}{16}$", "$\\frac{-9}{16}$"], correct_index: 0, explanation: "$\\frac{-3}{4} \\cdot \\frac{16}{-9} \\cdot \\frac{3}{4} = \\frac{4}{3} \\cdot \\frac{3}{4} = 1$.", difficulty: 1.8 },
      { question: "Tính: $-3,5 + (-1,5)$", options: ["$-5$", "$-2$", "$5$", "$2$"], correct_index: 0, explanation: "$-(3,5 + 1,5) = -5$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Cộng, trừ, nhân, chia số hữu tỉ",
    questions: [
      { question: "Tính: $\\frac{3}{10} + \\frac{-7}{10}$", options: ["$-\\frac{2}{5}$", "$-\\frac{4}{10}$", "$-\\frac{1}{2}$", "$\\frac{2}{5}$"], correct_index: 0, explanation: "$\\frac{3-7}{10} = \\frac{-4}{10} = -\\frac{2}{5}$.", difficulty: 1.0 },
      { question: "Tính tích: $-4 \\cdot \\frac{-1}{2}$", options: ["$2$", "$-2$", "$4$", "$-4$"], correct_index: 0, explanation: "$-4 \\cdot -0,5 = 2$.", difficulty: 1.0 },
      { question: "Tính hiệu: $\\frac{-1}{6} - \\frac{1}{3}$", options: ["$-\\frac{1}{2}$", "$-\\frac{2}{6}$", "$-\\frac{1}{3}$", "$\\frac{1}{2}$"], correct_index: 0, explanation: "$\\frac{-1}{6} - \\frac{2}{6} = \\frac{-3}{6} = -\\frac{1}{2}$.", difficulty: 1.0 },
      { question: "Tính tổng: $-0,75 + \\frac{-1}{4}$", options: ["$-1$", "$-0,5$", "$1$", "$0,5$"], correct_index: 0, explanation: "$-0,75 - 0,25 = -1$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{-5}{6} \\cdot \\frac{-12}{25}$", options: ["$\\frac{2}{5}$", "$-\\frac{2}{5}$", "$\\frac{60}{150}$", "$\\frac{1}{5}$"], correct_index: 0, explanation: "$\\frac{-5 \\cdot -12}{6 \\cdot 25} = \\frac{60}{150} = \\frac{2}{5}$.", difficulty: 1.2 },
      { question: "Thực hiện phép tính: $2,5 : \\frac{-5}{4}$", options: ["$-2$", "$2$", "$-3,125$", "$-0,5$"], correct_index: 0, explanation: "$\\frac{5}{2} \\cdot \\frac{4}{-5} = -2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 1,2 = \\frac{1}{5}$", options: ["$-1$", "$-1,4$", "$1$", "$1,4$"], correct_index: 0, explanation: "$x = 0,2 - 1,2 = -1$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{4}{9} \\cdot \\frac{7}{12} - \\frac{4}{9} \\cdot \\frac{1}{12}$", options: ["$\\frac{2}{9}$", "$\\frac{4}{18}$", "$\\frac{1}{9}$", "$0$"], correct_index: 0, explanation: "$\\frac{4}{9} \\cdot (\\frac{7}{12} - \\frac{1}{12}) = \\frac{4}{9} \\cdot \\frac{6}{12} = \\frac{4}{9} \\cdot \\frac{1}{2} = \\frac{2}{9}$.", difficulty: 1.5 },
      { question: "Tính nhanh: $C = 12,5 \\cdot \\frac{3}{7} - 5,5 \\cdot \\frac{3}{7}$", options: ["$\\frac{21}{7}$", "$3$", "$\\frac{3}{7}$", "$7$"], correct_index: 1, explanation: "$\\frac{3}{7} \\cdot (12,5 - 5,5) = \\frac{3}{7} \\cdot 7 = 3$. (Note: correct_index 1 is '3')", difficulty: 1.5 },
      { question: "Tính hiệu: $-1,8 - (-2,2)$", options: ["$0,4$", "$-4$", "$-0,4$", "$4$"], correct_index: 0, explanation: "$-1,8 + 2,2 = 0,4$.", difficulty: 1.0 },
      // New lesson 2 questions
      { question: "Kết quả của phép tính: $1,25 + \\frac{-3}{4}$ là:", options: ["$0,5$", "$-0,5$", "$0,25$", "$0,75$"], correct_index: 0, explanation: "$1,25 - 0,75 = 0,5$.", difficulty: 1.2 },
      { question: "Tính: $-1 \\frac{1}{2} : \\frac{3}{4}$", options: ["$-2$", "$-1,125$", "$2$", "$-\\frac{9}{8}$"], correct_index: 0, explanation: "$-\\frac{3}{2} \\cdot \\frac{4}{3} = -2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{1}{2} = \\frac{-3}{4}$", options: ["$-\\frac{1}{4}$", "$-\\frac{5}{4}$", "$\\frac{1}{4}$", "$\\frac{-1}{2}$"], correct_index: 0, explanation: "$x = -\\frac{3}{4} + \\frac{2}{4} = -\\frac{1}{4}$.", difficulty: 1.5 },
      { question: "Tính tổng: $\\frac{-5}{8} + 1,25$", options: ["$\\frac{5}{8}$", "$-\\frac{5}{8}$", "$0,625$", "$0,5$"], correct_index: 0, explanation: "$-0,625 + 1,25 = 0,625 = \frac{5}{8}$. (Note: correct_index 0 is \\frac{5}{8})", difficulty: 1.2 },
      { question: "Tính nhanh: $-0,4 \\cdot \\frac{5}{7} \\cdot (-2,5)$", options: ["$\\frac{5}{7}$", "$-\\frac{5}{7}$", "$1$", "$-1$"], correct_index: 0, explanation: "$[-0,4 \\cdot (-2,5)] \\cdot \\frac{5}{7} = 1 \\cdot \\frac{5}{7} = \\frac{5}{7}$.", difficulty: 1.5 },
      { question: "Thực hiện phép tính: $\\frac{-7}{15} - \\frac{-2}{15}$", options: ["$-\\frac{1}{3}$", "$-\\frac{5}{15}$", "$\\frac{1}{3}$", "$\\frac{-9}{15}$"], correct_index: 0, explanation: "$\\frac{-7 - (-2)}{15} = \\frac{-5}{15} = -\\frac{1}{3}$.", difficulty: 1.2 },
      { question: "Tính tích: $-1,25 \\cdot \\frac{-8}{5}$", options: ["$2$", "$-2$", "$1$", "$1,6$"], correct_index: 0, explanation: "$-\\frac{5}{4} \\cdot -\\frac{8}{5} = 2$.", difficulty: 1.2 },
      { question: "Tìm giá trị của: $(\\frac{-2}{3}) \\cdot (\\frac{-3}{2}) + \\frac{-1}{4}$", options: ["$\\frac{7}{4}$", "$\\frac{3}{4}$", "$-\\frac{1}{4}$", "$1$"], correct_index: 1, explanation: "$1 + \\frac{-1}{4} = \\frac{3}{4}$.", difficulty: 1.5 },
      { question: "Tính: $(\\frac{1}{3} - \\frac{1}{2}) : \\frac{5}{6}$", options: ["$-\\frac{1}{5}$", "$-\\frac{1}{6}$", "$\\frac{1}{5}$", "$-\\frac{5}{36}$"], correct_index: 0, explanation: "$(\\frac{2-3}{6}) : \\frac{5}{6} = -\\frac{1}{6} \\cdot \\frac{6}{5} = -\\frac{1}{5}$.", difficulty: 1.5 },
      { question: "Tính: $-4,25 - 1,75$", options: ["$-6$", "$6$", "$-2,5$", "$-2,5$"], correct_index: 0, explanation: "$-(4,25 + 1,75) = -6$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Cộng, trừ, nhân, chia số hữu tỉ",
    questions: [
      { question: "Tính tổng: $\\frac{4}{7} + \\frac{-3}{7}$", options: ["$\\frac{1}{7}$", "$\\frac{7}{7}$", "$1$", "$-\\frac{1}{7}$"], correct_index: 0, explanation: "$\\frac{4-3}{7} = \\frac{1}{7}$.", difficulty: 1.0 },
      { question: "Tính tích: $-6 \\cdot \\frac{2}{3}$", options: ["$-4$", "$4$", "$-9$", "$-2$"], correct_index: 0, explanation: "$-6 \\cdot \\frac{2}{3} = -4$.", difficulty: 1.0 },
      { question: "Tính hiệu: $\\frac{-3}{4} - \\frac{-1}{4}$", options: ["$-\\frac{1}{2}$", "$-\\frac{2}{4}$", "$1$", "$-\\frac{1}{4}$"], correct_index: 0, explanation: "$\\frac{-3 - (-1)}{4} = \\frac{-2}{4} = -\\frac{1}{2}$.", difficulty: 1.0 },
      { question: "Tính: $-0,8 + \\frac{1}{5}$", options: ["$-0,6$", "$0,6$", "$-1$", "$-0,4$"], correct_index: 0, explanation: "$-0,8 + 0,2 = -0,6$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{-5}{8} \\cdot \\frac{-16}{15}$", options: ["$\\frac{2}{3}$", "$-\\frac{2}{3}$", "$\\frac{80}{120}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "$\\frac{-5 \\cdot -16}{8 \\cdot 15} = \\frac{2}{3}$.", difficulty: 1.2 },
      { question: "Thực hiện phép tính: $-1,5 : \\frac{-3}{4}$", options: ["$2$", "$-2$", "$1,125$", "$-1,125$"], correct_index: 0, explanation: "$-\\frac{3}{2} \\cdot \\frac{4}{-3} = 2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,4 = \\frac{-3}{5}$", options: ["$-0,2$", "$-1$", "$0,2$", "$1$"], correct_index: 0, explanation: "$x = -0,6 + 0,4 = -0,2$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{-5}{11} \\cdot \\frac{4}{9} + \\frac{-5}{11} \\cdot \\frac{5}{9}$", options: ["$-\\frac{5}{11}$", "$-\\frac{45}{99}$", "$\\frac{5}{11}$", "$0$"], correct_index: 0, explanation: "$-\\frac{5}{11} \\cdot (\\frac{4}{9} + \\frac{5}{9}) = -\\frac{5}{11}$.", difficulty: 1.5 },
      { question: "Tính giá trị: $D = (\\frac{-1}{2}) \\cdot (\\frac{-2}{3}) \\cdot (\\frac{-3}{4}) \\cdot (\\frac{-4}{5})$", options: ["$\\frac{1}{5}$", "$-\\frac{1}{5}$", "$\\frac{24}{120}$", "$\\frac{1}{20}$"], correct_index: 0, explanation: "Tích 4 số âm ra số dương: $\\frac{1 \\cdot 2 \\cdot 3 \\cdot 4}{2 \\cdot 3 \\cdot 4 \\cdot 5} = \\frac{1}{5}$.", difficulty: 1.5 },
      { question: "Tính: $-2,75 - (-3,25)$", options: ["$0,5$", "$-0,5$", "$-6$", "$6$"], correct_index: 0, explanation: "$-2,75 + 3,25 = 0,5$.", difficulty: 1.0 },
      // New lesson 2 questions
      { question: "Kết quả của phép tính: $\\frac{-3}{5} - \\frac{1}{2}$ là:", options: ["$-1,1$", "$-\\frac{11}{10}$", "$-\\frac{4}{7}$", "$0,1$"], correct_index: 0, explanation: "$-\\frac{6}{10} - \\frac{5}{10} = -\\frac{11}{10} = -1,1$.", difficulty: 1.2 },
      { question: "Tính: $-0,3 : \\frac{9}{10}$", options: ["$-\\frac{1}{3}$", "$-\\frac{3}{100}$", "$-\\frac{27}{100}$", "$-\\frac{3}{9}$"], correct_index: 0, explanation: "$-\\frac{3}{10} \\cdot \\frac{10}{9} = -\\frac{1}{3}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + \\frac{5}{6} = \\frac{-1}{6}$", options: ["$-1$", "$-\\frac{4}{6}$", "$1$", "$-\\frac{2}{3}$"], correct_index: 0, explanation: "$x = -\\frac{1}{6} - \\frac{5}{6} = -\\frac{6}{6} = -1$.", difficulty: 1.5 },
      { question: "Tính: $-1,25 \\cdot (\\frac{-4}{5}) - 0,2$", options: ["$0,8$", "$0,6$", "$-1,2$", "$1$"], correct_index: 0, explanation: "$-\\frac{5}{4} \\cdot -\\frac{4}{5} - 0,2 = 1 - 0,2 = 0,8$.", difficulty: 1.5 },
      { question: "Tính nhanh: $\\frac{-5}{7} \\cdot \\frac{3}{13} + \\frac{-5}{7} \\cdot \\frac{10}{13}$", options: ["$-\\frac{5}{7}$", "$-\\frac{50}{91}$", "$\\frac{5}{7}$", "$0$"], correct_index: 0, explanation: "$-\\frac{5}{7} \\cdot (\\frac{3}{13} + \\frac{10}{13}) = -\\frac{5}{7}$.", difficulty: 1.5 },
      { question: "Thực hiện phép tính: $\\frac{-8}{15} \\cdot \\frac{5}{4}$", options: ["$-\\frac{2}{3}$", "$-\\frac{40}{60}$", "$-\\frac{1}{3}$", "$-\\frac{2}{5}$"], correct_index: 0, explanation: "Rút gọn chéo: $\\frac{-8}{4} = -2$ và $\\frac{5}{15} = \\frac{1}{3}$. Tích là $-\\frac{2}{3}$.", difficulty: 1.2 },
      { question: "Tính: $-0,625 : (-\\frac{5}{8})$", options: ["$1$", "$-1$", "$0,39$", "$-0,39$"], correct_index: 0, explanation: "$-0,625 = -\\frac{5}{8}$. Nên $-\\frac{5}{8} : -\\frac{5}{8} = 1$.", difficulty: 1.2 },
      { question: "Giá trị của biểu thức: $(\\frac{1}{2} - \\frac{1}{3}) \\cdot \\frac{-6}{5}$ là:", options: ["$-\\frac{1}{5}$", "$\\frac{1}{5}$", "$-\\frac{1}{6}$", "$-\\frac{1}{30}$"], correct_index: 0, explanation: "$\\frac{1}{6} \\cdot \\frac{-6}{5} = -\\frac{1}{5}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $x - \\frac{-3}{4} = -0,25$", options: ["$-1$", "$0,5$", "$0$", "$1$"], correct_index: 0, explanation: "$x = -0,25 - \\frac{3}{4} = -0,25 - 0,75 = -1$.", difficulty: 1.5 },
      { question: "Tính tổng: $-1,85 + (-2,15)$", options: ["$-4$", "$4$", "$-3,9$", "$-0,3$"], correct_index: 0, explanation: "$-(1,85 + 2,15) = -4$.", difficulty: 1.0 }
    ]
  }
];

// Define questions for Bai 3 (Luy thua)
const BAI_3_EXAMS = [
  {
    title: "Đề luyện tập số 1: Phép tính lũy thừa của một số hữu tỉ",
    questions: [
      { question: "Tính: $2^3$", options: ["$8$", "$6$", "$5$", "$9$"], correct_index: 0, explanation: "$2 \\cdot 2 \\cdot 2 = 8$.", difficulty: 1.0 },
      { question: "Tính: $(-3)^2$", options: ["$9$", "$-9$", "$6$", "$-6$"], correct_index: 0, explanation: "$(-3) \\cdot (-3) = 9$.", difficulty: 1.0 },
      { question: "Tính tích: $2^3 \\cdot 2^2$", options: ["$32$", "$64$", "$16$", "$2^5$"], correct_index: 0, explanation: "$2^{3+2} = 2^5 = 32$.", difficulty: 1.0 },
      { question: "Tính: $(\\frac{1}{2})^2$", options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{2}{4}$", "$1$"], correct_index: 0, explanation: "$\\frac{1^2}{2^2} = \\frac{1}{4}$.", difficulty: 1.2 },
      { question: "Tính: $(-\\frac{2}{3})^3$", options: ["$-\\frac{8}{27}$", "$\\frac{8}{27}$", "$-\\frac{6}{9}$", "$-\\frac{2}{9}$"], correct_index: 0, explanation: "$\\frac{(-2)^3}{3^3} = -\\frac{8}{27}$.", difficulty: 1.2 },
      { question: "Tính: $(0,1)^2$", options: ["$0,01$", "$0,1$", "$0,2$", "$0,001$"], correct_index: 0, explanation: "$0,1 \\cdot 0,1 = 0,01$.", difficulty: 1.0 },
      { question: "Tính thương: $5^4 : 5^2$", options: ["$25$", "$5$", "$125$", "$5^2$"], correct_index: 0, explanation: "$5^{4-2} = 5^2 = 25$.", difficulty: 1.0 },
      { question: "Viết kết quả dưới dạng một lũy thừa: $(\\frac{2}{3})^3 \\cdot \\frac{2}{3}$", options: ["$(\\frac{2}{3})^4$", "$(\\frac{2}{3})^3$", "$(\\frac{4}{9})^3$", "$(\\frac{2}{3})^2$"], correct_index: 0, explanation: "$(\\frac{2}{3})^{3+1} = (\\frac{2}{3})^4$.", difficulty: 1.2 },
      { question: "Tính giá trị: $[(-2)^2]^3$", options: ["$64$", "$32$", "$-64$", "$12$"], correct_index: 0, explanation: "$(-2)^{2 \\cdot 3} = (-2)^6 = 64$.", difficulty: 1.5 },
      { question: "So sánh: $2^6$ và $8^2$", options: ["$2^6 = 8^2$", "$2^6 > 8^2$", "$2^6 < 8^2$", "Không so sánh được"], correct_index: 0, explanation: "$8^2 = (2^3)^2 = 2^6$. Vậy hai lũy thừa bằng nhau.", difficulty: 1.5 },
      // New lesson 3 questions
      { question: "Số hữu tỉ $x$ thỏa mãn $x^2 = \\frac{9}{16}$ là:", options: ["$\\pm \\frac{3}{4}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$", "$\\frac{9}{256}$"], correct_index: 0, explanation: "Có hai giá trị: $(\\frac{3}{4})^2 = \\frac{9}{16}$ và $(-\\frac{3}{4})^2 = \\frac{9}{16}$.", difficulty: 1.5 },
      { question: "Tính: $(1,5)^2$", options: ["$2,25$", "$1,5$", "$3,0$", "$2,5$"], correct_index: 0, explanation: "$\\frac{3}{2} \\cdot \\frac{3}{2} = \\frac{9}{4} = 2,25$.", difficulty: 1.2 },
      { question: "Viết kết quả phép tính $(\\frac{-1}{2})^5 : (\\frac{-1}{2})^3$ dưới dạng phân số tối giản:", options: ["$\\frac{1}{4}$", "$-\\frac{1}{4}$", "$-\\frac{1}{8}$", "$\\frac{-1}{32}$"], correct_index: 0, explanation: "$(\\frac{-1}{2})^{5-3} = (\\frac{-1}{2})^2 = \\frac{1}{4}$.", difficulty: 1.2 },
      { question: "Tính giá trị biểu thức: $M = \\frac{2^7 \\cdot 9^3}{6^6}$", options: ["$2$", "$1$", "$\\frac{1}{2}$", "$3$"], correct_index: 0, explanation: "$\\frac{2^7 \\cdot (3^2)^3}{(2 \\cdot 3)^6} = \\frac{2^7 \\cdot 3^6}{2^6 \\cdot 3^6} = 2^{7-6} = 2$. (Note: correct_index 0 is '2')", difficulty: 1.8 },
      { question: "Tìm n biết: $(\\frac{1}{3})^n = \\frac{1}{81}$", options: ["$4$", "$3$", "$5$", "$2$"], correct_index: 0, explanation: "$\\frac{1}{81} = (\\frac{1}{3})^4$. Vậy $n=4$.", difficulty: 1.5 },
      { question: "Khẳng định nào đúng về lũy thừa bậc chẵn của số hữu tỉ âm?", options: ["Luôn là số dương", "Luôn là số âm", "Có thể âm hoặc dương", "Luôn bằng 0"], correct_index: 0, explanation: "Lũy thừa bậc chẵn (2, 4, 6...) của một số hữu tỉ âm luôn là một số hữu tỉ dương.", difficulty: 1.0 },
      { question: "Tính giá trị: $(-0,5)^3$", options: ["$-0,125$", "$0,125$", "$-0,25$", "$-0,75$"], correct_index: 0, explanation: "$(-0,5)^3 = -0,125$.", difficulty: 1.2 },
      { question: "Viết số $0,0001$ dưới dạng lũy thừa của $0,1$:", options: ["$(0,1)^4$", "$(0,1)^3$", "$(0,1)^5$", "$(0,1)^2$"], correct_index: 0, explanation: "$0,0001 = 0,1 \\cdot 0,1 \\cdot 0,1 \\cdot 0,1 = (0,1)^4$.", difficulty: 1.2 },
      { question: "Tính: $[(\\frac{-1}{3})^2]^2$", options: ["$\\frac{1}{81}$", "$-\\frac{1}{81}$", "$\\frac{1}{9}$", "$\\frac{-1}{9}$"], correct_index: 0, explanation: "$(\\frac{-1}{3})^{2 \\cdot 2} = (\\frac{-1}{3})^4 = \\frac{1}{81}$.", difficulty: 1.5 },
      { question: "Tính: $(\\frac{2}{5})^0$", options: ["$1$", "$0$", "$\\frac{2}{5}$", "Không xác định"], correct_index: 0, explanation: "Mọi số hữu tỉ khác 0 nâng lên lũy thừa 0 đều bằng 1.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Phép tính lũy thừa của một số hữu tỉ",
    questions: [
      { question: "Tính: $3^4$", options: ["$81$", "$12$", "$27$", "$64$"], correct_index: 0, explanation: "$3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.", difficulty: 1.0 },
      { question: "Tính: $(-2)^3$", options: ["$-8$", "$8$", "$-6$", "$6$"], correct_index: 0, explanation: "$(-2) \\cdot (-2) & \\cdot (-2) = -8$.", difficulty: 1.0 },
      { question: "Tính tích: $3^5 \\cdot 3^2$", options: ["$3^7$", "$3^3$", "$3^{10}$", "$2187$"], correct_index: 0, explanation: "$3^{5+2} = 3^7$.", difficulty: 1.0 },
      { question: "Tính: $(\\frac{-1}{3})^2$", options: ["$\\frac{1}{9}$", "$-\\frac{1}{9}$", "$\\frac{1}{6}$", "$\\frac{-1}{6}$"], correct_index: 0, explanation: "$(\\frac{-1}{3}) \\cdot (\\frac{-1}{3}) = \\frac{1}{9}$.", difficulty: 1.2 },
      { question: "Tính: $(\\frac{3}{4})^3$", options: ["$\\frac{27}{64}$", "$\\frac{9}{12}$", "$\\frac{27}{16}$", "$\\frac{9}{64}$"], correct_index: 0, explanation: "$\\frac{3^3}{4^3} = \\frac{27}{64}$.", difficulty: 1.2 },
      { question: "Tính: $(0,2)^3$", options: ["$0,008$", "$0,08$", "$0,6$", "$0,002$"], correct_index: 0, explanation: "$0,2 \\cdot 0,2 \\cdot 0,2 = 0,008$.", difficulty: 1.0 },
      { question: "Tính thương: $2^6 : 2^3$", options: ["$8$", "$2$", "$16$", "$2^3$"], correct_index: 0, explanation: "$2^{6-3} = 2^3 = 8$. (Note: options has 8 first, correct_index 0)", difficulty: 0.0 },
      { question: "Viết kết quả phép tính: $(\\frac{-4}{5})^4 : \\frac{-4}{5}$ under power form:", options: ["$(\\frac{-4}{5})^3$", "$(\\frac{-4}{5})^4$", "$(\\frac{-4}{5})^2$", "$(\\frac{4}{5})^3$"], correct_index: 0, explanation: "$(\\frac{-4}{5})^{4-1} = (\\frac{-4}{5})^3$.", difficulty: 1.2 },
      { question: "Tính giá trị: $[(-1)^3]^5$", options: ["$-1$", "$1$", "$15$", "$-15$"], correct_index: 0, explanation: "$(-1)^{3 \\cdot 5} = (-1)^{15} = -1$.", difficulty: 1.2 },
      { question: "So sánh: $3^4$ và $9^2$", options: ["$3^4 = 9^2$", "$3^4 > 9^2$", "$3^4 < 9^2$", "Không so sánh được"], correct_index: 0, explanation: "$9^2 = (3^2)^2 = 3^4$. Hai lũy thừa bằng nhau.", difficulty: 1.5 },
      // New lesson 3 questions
      { question: "Tìm x biết: $x^2 = \\frac{25}{36}$", options: ["$\\pm \\frac{5}{6}$", "$\\frac{5}{6}$", "$-\\frac{5}{6}$", "$\\frac{25}{72}$"], correct_index: 0, explanation: "$x = \\pm \\sqrt{\\frac{25}{36}} = \\pm \\frac{5}{6}$.", difficulty: 1.5 },
      { question: "Tính: $(2,5)^2$", options: ["$6,25$", "$5,0$", "$6,5$", "$0,625$"], correct_index: 0, explanation: "$2,5 \\cdot 2,5 = 6,25$.", difficulty: 1.2 },
      { question: "Tính giá trị phân số tối giản của: $(\\frac{-1}{3})^4 : (\\frac{-1}{3})^2$", options: ["$\\frac{1}{9}$", "$-\\frac{1}{9}$", "$\\frac{1}{27}$", "$-\\frac{1}{3}$"], correct_index: 0, explanation: "$(\\frac{-1}{3})^{4-2} = (\\frac{-1}{3})^2 = \\frac{1}{9}$.", difficulty: 1.2 },
      { question: "Rút gọn biểu thức: $N = \\frac{4^3 \\cdot 5^4}{20^3}$", options: ["$5$", "$1$", "$20$", "$4$"], correct_index: 0, explanation: "$\\frac{(2^2)^3 \\cdot 5^4}{(4 \\cdot 5)^3} = \\frac{2^6 \\cdot 5^4}{2^6 \\cdot 5^3} = 5^{4-3} = 5$.", difficulty: 1.8 },
      { question: "Tìm n biết: $2^n = 128$", options: ["$7$", "$6$", "$8$", "$5$"], correct_index: 0, explanation: "$128 = 2^7$. Vậy n=7.", difficulty: 1.2 },
      { question: "Khẳng định nào đúng về lũy thừa bậc lẻ của một số hữu tỉ âm?", options: ["Luôn là số âm", "Luôn là số dương", "Có thể âm hoặc dương", "Bằng 0"], correct_index: 0, explanation: "Lũy thừa bậc lẻ (1, 3, 5...) của một số hữu tỉ âm luôn là một số hữu tỉ âm.", difficulty: 1.0 },
      { question: "Tính: $(-0,1)^3$", options: ["$-0,001$", "$0,001$", "$-0,01$", "$-0,1$"], correct_index: 0, explanation: "$(-0,1)^3 = -0,001$.", difficulty: 1.0 },
      { question: "Viết $0,04$ dưới dạng lũy thừa của $0,2$:", options: ["$(0,2)^2$", "$(0,2)^3$", "$(0,2)^4$", "$0,2$"], correct_index: 0, explanation: "$0,04 = (0,2)^2$.", difficulty: 1.0 },
      { question: "Tính: $[(\\frac{-1}{2})^3]^2$", options: ["$\\frac{1}{64}$", "$-\\frac{1}{64}$", "$\\frac{1}{8}$", "$\\frac{-1}{8}$"], correct_index: 0, explanation: "$(\\frac{-1}{2})^{3 \\cdot 2} = (\\frac{-1}{2})^6 = \\frac{1}{64}$.", difficulty: 1.5 },
      { question: "Tính: $(-5)^0$", options: ["$1$", "$0$", "$-5$", "Không xác định"], correct_index: 0, explanation: "$x^0 = 1$ với mọi $x \\neq 0$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Phép tính lũy thừa của một số hữu tỉ",
    questions: [
      { question: "Tính: $5^3$", options: ["$125$", "$15$", "$25$", "$75$"], correct_index: 0, explanation: "$5 \\cdot 5 \\cdot 5 = 125$.", difficulty: 1.0 },
      { question: "Tính: $(-1)^4$", options: ["$1$", "$-1$", "$4$", "$-4$"], correct_index: 0, explanation: "Lũy thừa bậc chẵn của -1 là 1.", difficulty: 1.0 },
      { question: "Tính: $3^2 \\cdot 3^3$", options: ["$243$", "$27$", "$3^6$", "$9^5$"], correct_index: 0, explanation: "$3^{2+3} = 3^5 = 243$.", difficulty: 1.0 },
      { question: "Tính: $(\\frac{2}{3})^2$", options: ["$\\frac{4}{9}$", "$\\frac{2}{9}$", "$\\frac{4}{6}$", "$\\frac{4}{3}$"], correct_index: 0, explanation: "$\\frac{2^2}{3^2} = \\frac{4}{9}$.", difficulty: 1.2 },
      { question: "Tính: $(-\\frac{1}{2})^3$", options: ["$-\\frac{1}{8}$", "$\\frac{1}{8}$", "$-\\frac{1}{6}$", "$-\\frac{1}{4}$"], correct_index: 0, explanation: "$\\frac{(-1)^3}{2^3} = -\\frac{1}{8}$.", difficulty: 1.2 },
      { question: "Tính: $(0,3)^2$", options: ["$0,09$", "$0,9$", "$0,6$", "$0,009$"], correct_index: 0, explanation: "$0,3 \\cdot 0,3 = 0,09$.", difficulty: 1.0 },
      { question: "Tính thương: $10^5 : 10^2$", options: ["$1000$", "$10$", "$100$", "$10^3$"], correct_index: 0, explanation: "$10^{5-2} = 10^3 = 1000$.", difficulty: 1.0 },
      { question: "Tính: $(\\frac{-3}{4})^3 \\cdot \\frac{-3}{4}$ under power form:", options: ["$(\\frac{-3}{4})^4$", "$(\\frac{-3}{4})^3$", "$(\\frac{3}{4})^4$", "$(\\frac{-3}{4})^2$"], correct_index: 0, explanation: "$(\\frac{-3}{4})^{3+1} = (\\frac{-3}{4})^4$.", difficulty: 1.2 },
      { question: "Tính: $[(-3)^2]^2$", options: ["$81$", "$-81$", "$9$", "$12$"], correct_index: 0, explanation: "$(-3)^{2 \\cdot 2} = (-3)^4 = 81$.", difficulty: 1.2 },
      { question: "So sánh: $5^3$ và $25^2$", options: ["$5^3 < 25^2$", "$5^3 > 25^2$", "$5^3 = 25^2$", "Không so sánh được"], correct_index: 0, explanation: "$25^2 = (5^2)^2 = 5^4$. Vì $5^3 < 5^4$ nên $5^3 < 25^2$.", difficulty: 1.5 },
      // New lesson 3 questions
      { question: "Tìm x biết: $x^2 = \\frac{4}{25}$", options: ["$\\pm \\frac{2}{5}$", "$\\frac{2}{5}$", "$-\\frac{2}{5}$", "$\\frac{4}{50}$"], correct_index: 0, explanation: "$x = \\pm \\sqrt{\\frac{4}{25}} = \\pm \\frac{2}{5}$.", difficulty: 1.5 },
      { question: "Tính: $(0,5)^2$", options: ["$0,25$", "$0,5$", "$1,0$", "$0,025$"], correct_index: 0, explanation: "$0,5 \\cdot 0,5 = 0,25$.", difficulty: 1.0 },
      { question: "Viết kết quả phép tính $(\\frac{-2}{3})^5 : (\\frac{-2}{3})^2$ under power form:", options: ["$(\\frac{-2}{3})^3$", "$(\\frac{-2}{3})^2$", "$(\\frac{2}{3})^3$", "$(\\frac{-2}{3})^7$"], correct_index: 0, explanation: "$(\\frac{-2}{3})^{5-2} = (\\frac{-2}{3})^3$.", difficulty: 1.2 },
      { question: "Tính giá trị: $P = \\frac{3^8 \\cdot 2^5}{6^5}$", options: ["$27$", "$9$", "$3$", "$1$"], correct_index: 0, explanation: "$\\frac{3^8 \\cdot 2^5}{3^5 \\cdot 2^5} = 3^{8-5} = 3^3 = 27$.", difficulty: 1.8 },
      { question: "Tìm n biết: $3^n = 243$", options: ["$5$", "$4$", "$6$", "$3$"], correct_index: 0, explanation: "$243 = 3^5$. Vậy n=5.", difficulty: 1.2 },
      { question: "Số nào dưới đây bằng với $(-\\frac{1}{3})^3$?", options: ["$-\\frac{1}{27}$", "$\\frac{1}{27}$", "$-\\frac{1}{9}$", "$-\\frac{3}{9}$"], correct_index: 0, explanation: "$\\frac{(-1)^3}{3^3} = -\\frac{1}{27}$.", difficulty: 1.0 },
      { question: "Tính: $(-0,25)^2$", options: ["$0,0625$", "$-0,0625$", "$0,625$", "$-0,625$"], correct_index: 0, explanation: "$(-0,25) \\cdot (-0,25) = 0,0625$.", difficulty: 1.2 },
      { question: "Viết $0,001$ dưới dạng lũy thừa của $0,1$:", options: ["$(0,1)^3$", "$(0,1)^2$", "$(0,1)^4$", "$0,1$"], correct_index: 0, explanation: "$0,001 = (0,1)^3$.", difficulty: 1.0 },
      { question: "Tính: $[(\\frac{-1}{5})^2]^2$", options: ["$\\frac{1}{625}$", "$-\\frac{1}{625}$", "$\\frac{1}{25}$", "$-\\frac{1}{25}$"], correct_index: 0, explanation: "$(\\frac{-1}{5})^{2 \\cdot 2} = \\frac{1}{625}$.", difficulty: 1.5 },
      { question: "Tính: $(\\frac{-7}{8})^0$", options: ["$1$", "$0$", "$-\\frac{7}{8}$", "$-\\frac{8}{7}$"], correct_index: 0, explanation: "$x^0 = 1$ với $x \\neq 0$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Phép tính lũy thừa của một số hữu tỉ",
    questions: [
      { question: "Tính: $10^4$", options: ["$10000$", "$1000$", "$40$", "$100$"], correct_index: 0, explanation: "$10 \\cdot 10 \\cdot 10 \\cdot 10 = 10000$.", difficulty: 1.0 },
      { question: "Tính: $(-1)^{101}$", options: ["$-1$", "$1$", "$101$", "$-101$"], correct_index: 0, explanation: "Lũy thừa bậc lẻ của -1 là -1.", difficulty: 1.0 },
      { question: "Tính: $2^4 \\cdot 2^3$", options: ["$128$", "$64$", "$256$", "$2^7$"], correct_index: 0, explanation: "$2^{4+3} = 2^7 = 128$.", difficulty: 1.0 },
      { question: "Tính: $(\\frac{1}{3})^3$", options: ["$\\frac{1}{27}$", "$\\frac{1}{9}$", "$\\frac{3}{9}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "$\\frac{1^3}{3^3} = \\frac{1}{27}$.", difficulty: 1.2 },
      { question: "Tính: $(-\\frac{3}{5})^2$", options: ["$\\frac{9}{25}$", "$-\\frac{9}{25}$", "$\\frac{6}{10}$", "$-\\frac{6}{10}$"], correct_index: 0, explanation: "$\\frac{(-3)^2}{5^2} = \\frac{9}{25}$.", difficulty: 1.2 },
      { question: "Tính: $(0,4)^2$", options: ["$0,16$", "$1,6$", "$0,8$", "$0,08$"], correct_index: 0, explanation: "$0,4 \\cdot 0,4 = 0,16$.", difficulty: 1.0 },
      { question: "Tính thương: $3^7 : 3^4$", options: ["$27$", "$3$", "$9$", "$3^3$"], correct_index: 0, explanation: "$3^{7-4} = 3^3 = 27$.", difficulty: 1.0 },
      { question: "Viết kết quả phép tính: $(\\frac{2}{5})^5 : (\\frac{2}{5})^2$ under power form:", options: ["$(\\frac{2}{5})^3$", "$(\\frac{2}{5})^2$", "$(\\frac{2}{5})^7$", "$(\\frac{4}{25})^3$"], correct_index: 0, explanation: "$(\\frac{2}{5})^{5-2} = (\\frac{2}{5})^3$.", difficulty: 1.2 },
      { question: "Tính: $[(-2)^3]^2$", options: ["$64$", "$32$", "$-64$", "$12$"], correct_index: 0, explanation: "$(-2)^{3 \\cdot 2} = (-2)^6 = 64$.", difficulty: 1.2 },
      { question: "So sánh: $2^9$ và $8^3$", options: ["$2^9 = 8^3$", "$2^9 > 8^3$", "$2^9 < 8^3$", "Không so sánh được"], correct_index: 0, explanation: "$8^3 = (2^3)^3 = 2^9$. Hai lũy thừa bằng nhau.", difficulty: 1.5 },
      // New lesson 3 questions
      { question: "Tìm x biết: $x^2 = \\frac{81}{100}$", options: ["$\\pm \\frac{9}{10}$", "$\\frac{9}{10}$", "$-\\frac{9}{10}$", "$\\frac{81}{200}$"], correct_index: 0, explanation: "$x = \\pm \\sqrt{\\frac{81}{100}} = \\pm \\frac{9}{10}$.", difficulty: 1.5 },
      { question: "Tính: $(1,2)^2$", options: ["$1,44$", "$1,2$", "$2,4$", "$1,4$"], correct_index: 0, explanation: "$1,2 \\cdot 1,2 = 1,44$.", difficulty: 1.2 },
      { question: "Tìm phân số tối giản của kết quả: $(-\\frac{1}{2})^6 : (-\\frac{1}{2})^2$", options: ["$\\frac{1}{16}$", "$-\\frac{1}{16}$", "$\\frac{1}{8}$", "$-\\frac{1}{8}$"], correct_index: 0, explanation: "$(-\\frac{1}{2})^{6-2} = (-\\frac{1}{2})^4 = \\frac{1}{16}$.", difficulty: 1.2 },
      { question: "Rút gọn biểu thức: $Q = \\frac{9^4 \\cdot 2^9}{18^4}$", options: ["$32$", "$16$", "$2$", "$4$"], correct_index: 0, explanation: "$\\frac{9^4 \\cdot 2^9}{(9 \\cdot 2)^4} = \\frac{9^4 \\cdot 2^9}{9^4 \\cdot 2^4} = 2^{9-4} = 2^5 = 32$.", difficulty: 1.8 },
      { question: "Tìm n biết: $5^n = 625$", options: ["$4$", "$3$", "$5$", "$2$"], correct_index: 0, explanation: "$625 = 5^4$. Vậy n=4.", difficulty: 1.2 },
      { question: "Số nào dưới đây bằng với $(-\\frac{2}{5})^3$?", options: ["$-\\frac{8}{125}$", "$\\frac{8}{125}$", "$-\\frac{6}{15}$", "$-\\frac{4}{25}$"], correct_index: 0, explanation: "$\\frac{(-2)^3}{5^3} = -\\frac{8}{125}$.", difficulty: 1.0 },
      { question: "Tính: $(-0,1)^4$", options: ["$0,0001$", "$-0,0001$", "$0,001$", "$-0,001$"], correct_index: 0, explanation: "$(-0,1)^4 = 0,0001$.", difficulty: 1.2 },
      { question: "Viết $0,008$ dưới dạng lũy thừa của $0,2$:", options: ["$(0,2)^3$", "$(0,2)^2$", "$(0,2)^4$", "$0,2$"], correct_index: 0, explanation: "$0,008 = (0,2)^3$.", difficulty: 1.0 },
      { question: "Tính: $[(\\frac{-1}{2})^2]^3$", options: ["$\\frac{1}{64}$", "$-\\frac{1}{64}$", "$\\frac{1}{16}$", "$\\frac{-1}{16}$"], correct_index: 0, explanation: "$(\\frac{-1}{2})^{2 \\cdot 3} = \\frac{1}{64}$.", difficulty: 1.5 },
      { question: "Tính: $2026^0$", options: ["$1$", "$0$", "$2026$", "Không xác định"], correct_index: 0, explanation: "$x^0 = 1$ với $x \\neq 0$.", difficulty: 1.0 }
    ]
  }
];

// Define questions for Bai 4 (Chuyen ve)
const BAI_4_EXAMS = [
  {
    title: "Đề luyện tập số 1: Quy tắc chuyển vế",
    questions: [
      { question: "Tìm x biết: $x - 5 = 10$", options: ["$15$", "$5$", "$-5$", "$-15$"], correct_index: 0, explanation: "Chuyển vế đổi dấu: $x = 10 + 5 = 15$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + 3 = -2$", options: ["$-5$", "$1$", "$-1$", "$5$"], correct_index: 0, explanation: "Chuyển vế đổi dấu: $x = -2 - 3 = -5$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức sau: $-(a - b)$", options: ["$-a + b$", "$-a - b$", "$a - b$", "$a + b$"], correct_index: 0, explanation: "Đổi dấu tất cả số hạng trong ngoặc khi có dấu trừ đằng trước: $-a + b$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $x + (y - z)$", options: ["$x + y - z$", "$x - y + z$", "$x + y + z$", "$x - y - z$"], correct_index: 0, explanation: "Giữ nguyên dấu khi có dấu cộng đằng trước ngoặc: $x + y - z$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x - \\frac{1}{2} = \\frac{1}{2}$", options: ["$1$", "$0$", "$-1$", "$\\frac{1}{4}$"], correct_index: 0, explanation: "$x = \\frac{1}{2} + \\frac{1}{2} = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 1,5 = 0,5$", options: ["$-1$", "$1$", "$-2$", "$2$"], correct_index: 0, explanation: "$x = 0,5 - 1,5 = -1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $-x + 2 = -3$", options: ["$5$", "$-5$", "$1$", "$-1$"], correct_index: 0, explanation: "$-x = -3 - 2 = -5 \\Rightarrow x = 5$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{3}{4} = \\frac{-1}{4}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$1$", "$0$"], correct_index: 0, explanation: "$x = \\frac{-1}{4} + \\frac{3}{4} = \\frac{2}{4} = \\frac{1}{2}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{1}{2} - x = \\frac{1}{3}$", options: ["$\\frac{1}{6}$", "$-\\frac{1}{6}$", "$\\frac{5}{6}$", "$-\\frac{5}{6}$"], correct_index: 0, explanation: "$x = \\frac{1}{2} - \\frac{1}{3} = \\frac{3-2}{6} = \\frac{1}{6}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $2x = -10$", options: ["$-5$", "$5$", "$-12$", "$-8$"], correct_index: 0, explanation: "$x = -10 : 2 = -5$.", difficulty: 1.0 },
      // New lesson 4 questions
      { question: "Quy tắc chuyển vế phát biểu rằng khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải làm gì?", options: ["Đổi dấu số hạng đó", "Giữ nguyên dấu số hạng đó", "Nhân số hạng đó với -1", "Chia số hạng đó cho -1"], correct_index: 0, explanation: "Khi chuyển vế một số hạng ta phải đổi dấu của nó: cộng thành trừ, trừ thành cộng.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + \\frac{-2}{3} = \\frac{-1}{3}$", options: ["$\\frac{1}{3}$", "$-\\frac{1}{3}$", "$-1$", "$1$"], correct_index: 0, explanation: "$x = \\frac{-1}{3} - (\\frac{-2}{3}) = \\frac{-1+2}{3} = \\frac{1}{3}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 1,25 = \\frac{-3}{4}$", options: ["$0,5$", "$-0,5$", "$2$", "$-2$"], correct_index: 0, explanation: "$x = -0,75 + 1,25 = 0,5$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{2}{3} + x = -0,5$ dưới dạng phân số tối giản:", options: ["$-\\frac{7}{6}$", "$-\\frac{5}{6}$", "$\\frac{1}{6}$", "$-\\frac{1}{6}$"], correct_index: 0, explanation: "$x = -\\frac{1}{2} - \\frac{2}{3} = -\\frac{3}{6} - \\frac{4}{6} = -\\frac{7}{6}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $x - (\\frac{-1}{2}) = \\frac{3}{4} - \\frac{1}{2}$", options: ["$-\\frac{1}{4}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$"], correct_index: 0, explanation: "$x + \\frac{1}{2} = \\frac{1}{4} \\Rightarrow x = \\frac{1}{4} - \\frac{2}{4} = -\\frac{1}{4}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $-x - \\frac{1}{4} = -0,75$", options: ["$0,5$", "$-0,5$", "$1$", "$-1$"], correct_index: 0, explanation: "$-x = -0,75 + 0,25 = -0,5 \\Rightarrow x = 0,5$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 2 \\frac{1}{2} = -1 \\frac{1}{2}$", options: ["$-4$", "$-1$", "$4$", "$1$"], correct_index: 0, explanation: "$x = -\\frac{3}{2} - \\frac{5}{2} = -\\frac{8}{2} = -4$.", difficulty: 1.2 },
      { question: "Tìm x biết: $1,2 - x = -0,8$", options: ["$2$", "$-2$", "$0,4$", "$-0,4$"], correct_index: 0, explanation: "$x = 1,2 - (-0,8) = 1,2 + 0,8 = 2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + (\\frac{3}{4} - \\frac{1}{2}) = 1$", options: ["$\\frac{3}{4}$", "$\\frac{1}{4}$", "$-\\frac{3}{4}$", "$0$"], correct_index: 0, explanation: "$x + \\frac{1}{4} = 1 \\Rightarrow x = 1 - \\frac{1}{4} = \\frac{3}{4}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $3x - 1 = 8$", options: ["$3$", "$2$", "$4$", "$1$"], correct_index: 0, explanation: "$3x = 9 \\Rightarrow x = 3$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Quy tắc chuyển vế",
    questions: [
      { question: "Tìm x biết: $x - 7 = -2$", options: ["$5$", "$-9$", "$9$", "$-5$"], correct_index: 0, explanation: "$x = -2 + 7 = 5$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + 4 = 1$", options: ["$-3$", "$3$", "$5$", "$-5$"], correct_index: 0, explanation: "$x = 1 - 4 = -3$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $-( -x + y )$", options: ["$x - y$", "$x + y$", "$-x - y$", "$-x + y$"], correct_index: 0, explanation: "Đổi dấu số hạng bên trong: $x - y$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $a - (b - c)$", options: ["$a - b + c$", "$a - b - c$", "$a + b - c$", "$a + b + c$"], correct_index: 0, explanation: "Có dấu trừ đằng trước ngoặc nên đổi dấu các số hạng trong ngoặc: $a - b + c$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x - \\frac{2}{3} = \\frac{1}{3}$", options: ["$1$", "$0$", "$-\\frac{1}{3}$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "$x = \\frac{1}{3} + \\frac{2}{3} = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 2,4 = 1,2$", options: ["$-1,2$", "$1,2$", "$-3,6$", "$3,6$"], correct_index: 0, explanation: "$x = 1,2 - 2,4 = -1,2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $-x + 5 = 2$", options: ["$3$", "$-3$", "$7$", "$-7$"], correct_index: 0, explanation: "$-x = 2 - 5 = -3 \\Rightarrow x = 3$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{5}{6} = \\frac{-1}{6}$", options: ["$\\frac{2}{3}$", "$-\\frac{2}{3}$", "$1$", "$\\frac{4}{6}$"], correct_index: 0, explanation: "$x = \\frac{-1}{6} + \\frac{5}{6} = \\frac{4}{6} = \\frac{2}{3}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{3}{4} - x = \\frac{1}{2}$", options: ["$\\frac{1}{4}$", "$-\\frac{1}{4}$", "$\\frac{5}{4}$", "$-\\frac{5}{4}$"], correct_index: 0, explanation: "$x = \\frac{3}{4} - \\frac{1}{2} = \\frac{1}{4}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $3x = -15$", options: ["$-5$", "$5$", "$-18$", "$-12$"], correct_index: 0, explanation: "$x = -15 : 3 = -5$.", difficulty: 1.0 },
      // New lesson 4 questions
      { question: "Tìm x biết: $x + \\frac{-3}{4} = \\frac{-1}{4}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$1$", "$-1$"], correct_index: 0, explanation: "$x = \\frac{-1}{4} - (\\frac{-3}{4}) = \\frac{2}{4} = \\frac{1}{2}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,75 = \\frac{-1}{2}$", options: ["$0,25$", "$-0,25$", "$1,25$", "$-1,25$"], correct_index: 0, explanation: "$x = -0,5 + 0,75 = 0,25$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{1}{3} + x = -0,25$ dưới dạng phân số tối giản:", options: ["$-\\frac{7}{12}$", "$-\\frac{5}{12}$", "$\\frac{1}{12}$", "$-\\frac{1}{12}$"], correct_index: 0, explanation: "$x = -\\frac{1}{4} - \\frac{1}{3} = -\\frac{3}{12} - \\frac{4}{12} = -\\frac{7}{12}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $x - (\\frac{-3}{5}) = \\frac{1}{2} + \\frac{1}{10}$", options: ["$0$", "$1$", "$0,6$", "$-0,6$"], correct_index: 0, explanation: "$x + 0,6 = 0,5 + 0,1 \\Rightarrow x + 0,6 = 0,6 \\Rightarrow x = 0$.", difficulty: 1.5 },
      { question: "Tìm x biết: $-x - \\frac{1}{2} = -1,25$", options: ["$0,75$", "$-0,75$", "$1,75$", "$-1,75$"], correct_index: 0, explanation: "$-x = -1,25 + 0,5 = -0,75 \\Rightarrow x = 0,75$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 1 \\frac{1}{4} = -2,25$", options: ["$-3,5$", "$-1$", "$3,5$", "$1$"], correct_index: 0, explanation: "$x = -2,25 - 1,25 = -3,5$.", difficulty: 1.2 },
      { question: "Tìm x biết: $2,5 - x = -1,5$", options: ["$4$", "$-4$", "$1$", "$-1$"], correct_index: 0, explanation: "$x = 2,5 - (-1,5) = 4$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + (\\frac{2}{3} - \\frac{1}{6}) = 1$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{5}{6}$", "$0$"], correct_index: 0, explanation: "$x + \\frac{3}{6} = 1 \\Rightarrow x + \\frac{1}{2} = 1 \\Rightarrow x = \\frac{1}{2}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $2x - 3 = 5$", options: ["$4$", "$1$", "$8$", "$2$"], correct_index: 0, explanation: "$2x = 8 \\Rightarrow x = 4$.", difficulty: 1.0 },
      { question: "Tìm x biết: $-x + (-3) = -8$", options: ["$5$", "$-5$", "$11$", "$-11$"], correct_index: 0, explanation: "$-x - 3 = -8 \\Rightarrow -x = -5 \\Rightarrow x = 5$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Quy tắc chuyển vế",
    questions: [
      { question: "Tìm x biết: $x - 10 = -15$", options: ["$-5$", "$5$", "$-25$", "$25$"], correct_index: 0, explanation: "$x = -15 + 10 = -5$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + 8 = 5$", options: ["$-3$", "$3$", "$13$", "$-13$"], correct_index: 0, explanation: "$x = 5 - 8 = -3$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $-( a + b - c )$", options: ["$-a - b + c$", "$-a - b - c$", "$-a + b - c$", "$a - b + c$"], correct_index: 0, explanation: "Đổi dấu tất cả số hạng: $-a - b + c$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $x - (-y + z)$", options: ["$x + y - z$", "$x - y + z$", "$x + y + z$", "$x - y - z$"], correct_index: 0, explanation: "Có dấu trừ đằng trước nên đổi dấu trong ngoặc: $x + y - z$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x - \\frac{3}{5} = \\frac{2}{5}$", options: ["$1$", "$0$", "$-\\frac{1}{5}$", "$\\frac{1}{5}$"], correct_index: 0, explanation: "$x = \\frac{2}{5} + \\frac{3}{5} = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 1,8 = 0,8$", options: ["$-1$", "$1$", "$-2,6$", "$2,6$"], correct_index: 0, explanation: "$x = 0,8 - 1,8 = -1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $-x + 10 = 4$", options: ["$6$", "$-6$", "$14$", "$-14$"], correct_index: 0, explanation: "$-x = 4 - 10 = -6 \\Rightarrow x = 6$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{5}{8} = \\frac{-3}{8}$", options: ["$\\frac{1}{4}$", "$-\\frac{1}{4}$", "$1$", "$0$"], correct_index: 0, explanation: "$x = \\frac{-3}{8} + \\frac{5}{8} = \\frac{2}{8} = \\frac{1}{4}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{5}{6} - x = \\frac{1}{3}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{7}{6}$", "$-\\frac{7}{6}$"], correct_index: 0, explanation: "$x = \\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $4x = -20$", options: ["$-5$", "$5$", "$-24$", "$-16$"], correct_index: 0, explanation: "$x = -20 : 4 = -5$.", difficulty: 1.0 },
      // New lesson 4 questions
      { question: "Tìm x biết: $x + \\frac{-5}{6} = \\frac{-1}{3}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$-1$", "$1$"], correct_index: 0, explanation: "$x = -\\frac{2}{6} - (-\\frac{5}{6}) = \\frac{3}{6} = \\frac{1}{2}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,4 = \\frac{-1}{2}$", options: ["$-0,1$", "$0,1$", "$-0,9$", "$0,9$"], correct_index: 0, explanation: "$x = -0,5 + 0,4 = -0,1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{2}{5} + x = -0,75$ dưới dạng phân số tối giản:", options: ["$-\\frac{23}{20}$", "$-\\frac{7}{20}$", "$-\\frac{11}{20}$", "$-\\frac{1}{20}$"], correct_index: 0, explanation: "$x = -\\frac{3}{4} - \\frac{2}{5} = -\\frac{15}{20} - \\frac{8}{20} = -\\frac{23}{20}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $x - (\\frac{-1}{3}) = \\frac{1}{2} - \\frac{1}{6}$", options: ["$0$", "$1$", "$\\frac{2}{3}$", "$-\\frac{2}{3}$"], correct_index: 0, explanation: "$x + \\frac{1}{3} = \\frac{2}{6} = \\frac{1}{3} \\Rightarrow x = 0$.", difficulty: 1.5 },
      { question: "Tìm x biết: $-x - \\frac{3}{4} = -1,5$", options: ["$0,75$", "$-0,75$", "$2,25$", "$-2,25$"], correct_index: 0, explanation: "$-x = -1,5 + 0,75 = -0,75 \\Rightarrow x = 0,75$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 2 \\frac{1}{4} = -1,75$", options: ["$-4$", "$-0,5$", "$4$", "$0,5$"], correct_index: 0, explanation: "$x = -1,75 - 2,25 = -4$.", difficulty: 1.2 },
      { question: "Tìm x biết: $3,2 - x = -0,8$", options: ["$4$", "$-4$", "$2,4$", "$-2,4$"], correct_index: 0, explanation: "$x = 3,2 - (-0,8) = 4$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + (\\frac{4}{5} - \\frac{1}{2}) = 1$", options: ["$\\frac{7}{10}$", "$\\frac{3}{10}$", "$-\\frac{7}{10}$", "$0$"], correct_index: 0, explanation: "$x + \\frac{3}{10} = 1 \\Rightarrow x = 1 - \\frac{3}{10} = \\frac{7}{10}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $4x - 5 = 7$", options: ["$3$", "$1$", "$12$", "$2$"], correct_index: 0, explanation: "$4x = 12 \\Rightarrow x = 3$.", difficulty: 1.0 },
      { question: "Tìm x biết: $-x + (-5) = -12$", options: ["$7$", "$-7$", "$17$", "$-17$"], correct_index: 0, explanation: "$-x - 5 = -12 \\Rightarrow -x = -7 \\Rightarrow x = 7$.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Quy tắc chuyển vế",
    questions: [
      { question: "Tìm x biết: $x - 12 = -4$", options: ["$8$", "$-16$", "$16$", "$-8$"], correct_index: 0, explanation: "$x = -4 + 12 = 8$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + 10 = 2$", options: ["$-8$", "$8$", "$12$", "$-12$"], correct_index: 0, explanation: "$x = 2 - 10 = -8$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $-( u - v + w )$", options: ["$-u + v - w$", "$-u - v - w$", "$u - v + w$", "$-u + v + w$"], correct_index: 0, explanation: "Đổi dấu các số hạng trong ngoặc: $-u + v - w$.", difficulty: 1.0 },
      { question: "Bỏ ngoặc biểu thức: $p - (-q - r)$", options: ["$p + q + r$", "$p - q - r$", "$p + q - r$", "$p - q + r$"], correct_index: 0, explanation: "Đổi dấu các số hạng trong ngoặc: $p + q + r$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x - \\frac{5}{9} = \\frac{4}{9}$", options: ["$1$", "$0$", "$-\\frac{1}{9}$", "$\\frac{1}{9}$"], correct_index: 0, explanation: "$x = \\frac{4}{9} + \\frac{5}{9} = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 3,5 = 1,5$", options: ["$-2$", "$2$", "$-5$", "$5$"], correct_index: 0, explanation: "$x = 1,5 - 3,5 = -2$.", difficulty: 1.2 },
      { question: "Tìm x biết: $-x + 8 = -2$", options: ["$10$", "$-10$", "$6$", "$-6$"], correct_index: 0, explanation: "$-x = -2 - 8 = -10 \\Rightarrow x = 10$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - \\frac{7}{10} = \\frac{-1}{2}$", options: ["$\\frac{1}{5}$", "$-\\frac{1}{5}$", "$1$", "$0$"], correct_index: 0, explanation: "$x = \\frac{-5}{10} + \\frac{7}{10} = \\frac{2}{10} = \\frac{1}{5}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{2}{5} - x = \\frac{-1}{10}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{3}{10}$", "$-\\frac{3}{10}$"], correct_index: 0, explanation: "$x = \\frac{4}{10} - (-\\frac{1}{10}) = \\frac{5}{10} = \\frac{1}{2}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $5x = -25$", options: ["$-5$", "$5$", "$-30$", "$-20$"], correct_index: 0, explanation: "$x = -25 : 5 = -5$.", difficulty: 1.0 },
      // New lesson 4 questions
      { question: "Tìm x biết: $x + \\frac{-5}{8} = \\frac{-1}{8}$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$1$", "$-1$"], correct_index: 0, explanation: "$x = \\frac{-1}{8} - (\\frac{-5}{8}) = \\frac{4}{8} = \\frac{1}{2}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,6 = \\frac{-3}{5}$", options: ["$0$", "$1$", "$-1,2$", "$-0,2$"], correct_index: 0, explanation: "$x = -0,6 + 0,6 = 0$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\frac{1}{4} + x = -0,8$ dưới dạng phân số tối giản:", options: ["$-\\frac{21}{20}$", "$-\\frac{11}{20}$", "$-\\frac{9}{20}$", "$-\\frac{1}{20}$"], correct_index: 0, explanation: "$x = -\\frac{4}{5} - \\frac{1}{4} = -\\frac{16}{20} - \\frac{5}{20} = -\\frac{21}{20}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $x - (\\frac{-3}{4}) = \\frac{1}{2} + \\frac{1}{4}$", options: ["$0$", "$1$", "$1,5$", "$-1,5$"], correct_index: 0, explanation: "$x + 0,75 = 0,5 + 0,25 \\Rightarrow x + 0,75 = 0,75 \\Rightarrow x = 0$.", difficulty: 1.5 },
      { question: "Tìm x biết: $-x - \\frac{1}{5} = -1,2$", options: ["$1$", "$-1$", "$1,4$", "$-1,4$"], correct_index: 0, explanation: "$-x = -1,2 + 0,2 = -1 \\Rightarrow x = 1$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 3 \\frac{1}{2} = -2,5$", options: ["$-6$", "$-1$", "$6$", "$1$"], correct_index: 0, explanation: "$x = -2,5 - 3,5 = -6$.", difficulty: 1.2 },
      { question: "Tìm x biết: $4,5 - x = -1,5$", options: ["$6$", "$-6$", "$3$", "$-3$"], correct_index: 0, explanation: "$x = 4,5 - (-1,5) = 6$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + (\\frac{3}{5} - \\frac{1}{10}) = 1$", options: ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{7}{10}$", "$0$"], correct_index: 0, explanation: "$x + \\frac{5}{10} = 1 \\Rightarrow x + \\frac{1}{2} = 1 \\Rightarrow x = \\frac{1}{2}$.", difficulty: 1.5 },
      { question: "Tìm x biết: $5x - 8 = 7$", options: ["$3$", "$1$", "$15$", "$2$"], correct_index: 0, explanation: "$5x = 15 \\Rightarrow x = 3$.", difficulty: 1.0 },
      { question: "Tìm x biết: $-x + (-8) = -15$", options: ["$7$", "$-7$", "$23$", "$-23$"], correct_index: 0, explanation: "$-x - 8 = -15 \\Rightarrow -x = -7 \\Rightarrow x = 7$.", difficulty: 1.0 }
    ]
  }
];

async function seed() {
  console.log("🚀 Starting Chapter 1 assessments seeding...");

  const dataMapping = [
    { slug: 'bai-2-cong-tru-nhan-chia-so-huu-ti', conceptSlug: 'concept-bai-2-cong-tru-nhan-chia-so-huu-ti', data: BAI_2_EXAMS },
    { slug: 'bai-3-phep-tinh-luy-thua-so-mu-tu-nhien', conceptSlug: 'concept-bai-3-phep-tinh-luy-thua-so-mu-tu-nhien', data: BAI_3_EXAMS },
    { slug: 'bai-4-quy-tac-chuyen-ve', conceptSlug: 'concept-bai-4-quy-tac-chuyen-ve', data: BAI_4_EXAMS }
  ];

  // 1. Get collection ID
  const { data: collection } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('id', '1a3522d0-7aab-4d0b-bdbf-4b6db5904940')
    .single();

  if (!collection) {
    console.error("❌ Collection 'Toán 7 - Tập 1' (1a3522d0-7aab-4d0b-bdbf-4b6db5904940) not found!");
    process.exit(1);
  }

  const collectionId = collection.id;

  for (const lessonMapping of dataMapping) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing lesson: ${lessonMapping.slug}`);

    // Fetch lesson node
    const { data: lessonNode } = await supabase
      .from('curriculum_nodes')
      .select('id')
      .eq('slug', lessonMapping.slug)
      .single();

    if (!lessonNode) {
      console.error(`❌ Lesson node '${lessonMapping.slug}' not found!`);
      continue;
    }

    // Fetch concept
    const { data: concept } = await supabase
      .from('concepts')
      .select('id')
      .eq('slug', lessonMapping.conceptSlug)
      .single();

    if (!concept) {
      console.error(`❌ Concept '${lessonMapping.conceptSlug}' not found!`);
      continue;
    }

    console.log(`✅ Found Concept ID: ${concept.id}`);

    // Clear previous exercise sets linked to this node
    await supabase
      .from('exercise_sets')
      .delete()
      .eq('metadata->>node_id', lessonNode.id)
      .like('title', 'Đề luyện tập số%');

    // Also clear existing exams for this collection and titles to prevent duplication
    const examTitles = lessonMapping.data.map(d => d.title);
    const { data: existingExams } = await supabase
      .from('exams')
      .select('id')
      .eq('collection_id', collectionId)
      .in('title', examTitles);

    if (existingExams && existingExams.length > 0) {
      const examIds = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', examIds);
      await supabase.from('exams').delete().in('id', examIds);
      console.log(`🗑️ Cleared ${existingExams.length} existing exams for this lesson.`);
    }

    // Create exercise sets and exams
    for (let sIdx = 0; sIdx < lessonMapping.data.length; sIdx++) {
      const setInfo = lessonMapping.data[sIdx];
      console.log(`  -> Creating set/exam: ${setInfo.title}`);

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
        console.error(`  - ❌ Error creating exercise set:`, setError.message);
        continue;
      }

      // Create Exam
      const { data: exam, error: examError } = await supabase
        .from('exams')
        .insert({
          collection_id: collectionId,
          title: setInfo.title,
          exam_number: sIdx + 1,
          total_questions: 20,
          generation_mode: 'balanced'
        })
        .select()
        .single();

      if (examError) {
        console.error(`  - ❌ Error creating exam:`, examError.message);
        continue;
      }

      // Clear existing questions for this concept to prevent bloating if needed,
      // but since we want to insert handcrafted, let's insert and link them.
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
          console.error(`    - ❌ Error inserting question ${qIdx + 1}:`, qError.message);
          continue;
        }

        // Link to exercise set
        await supabase.from('exercise_questions').insert({
          set_id: exSet.id,
          question_id: newQ.id,
          sort_key: qIdx
        });

        // Link to exam
        await supabase.from('exam_questions').insert({
          exam_id: exam.id,
          question_bank_id: newQ.id,
          order_index: qIdx
        });
      }

      console.log(`  - ✅ Linked 20 questions successfully.`);
    }
  }

  console.log("\n🎉 Chapter 1 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
