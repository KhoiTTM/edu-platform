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

// Define questions for Bai 5
const BAI_5_EXAMS = [
  {
    title: "Đề luyện tập số 1: Làm quen với số thập phân vô hạn tuần hoàn",
    questions: [
      // 10 Prerequisite questions (Grade 6 math, decimals, basic fractions)
      { question: "Rút gọn phân số sau: $\\frac{12}{18}$", options: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{6}$", "$\\frac{1}{2}$"], correct_index: 0, explanation: "Chia cả tử và mẫu cho 6: $\\frac{12:6}{18:6} = \\frac{2}{3}$.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{3}{5}$ dưới dạng số thập phân:", options: ["$0,6$", "$0,3$", "$0,5$", "$1,6$"], correct_index: 0, explanation: "$\\frac{3}{5} = 3 : 5 = 0,6$.", difficulty: 1.0 },
      { question: "Tìm kết quả: $0,25 + 0,75$", options: ["$1$", "$0,5$", "$1,25$", "$0,1$"], correct_index: 0, explanation: "$0,25 + 0,75 = 1$.", difficulty: 1.0 },
      { question: "Làm tròn số $4,56$ đến hàng phần mười:", options: ["$4,6$", "$4,5$", "$5$", "$4,57$"], correct_index: 0, explanation: "Chữ số hàng phần trăm là 6 ($\\ge 5$), làm tròn lên thành 4,6.", difficulty: 1.0 },
      { question: "Viết số thập phân $1,25$ dưới dạng phân số tối giản:", options: ["$\\frac{5}{4}$", "$\\frac{25}{20}$", "$\\frac{125}{100}$", "$\\frac{4}{5}$"], correct_index: 0, explanation: "$1,25 = \\frac{125}{100} = \\frac{5}{4}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,4 = 0,6$", options: ["$1$", "$0,2$", "$-0,2$", "$0,24$"], correct_index: 0, explanation: "$x = 0,6 + 0,4 = 1$.", difficulty: 1.0 },
      { question: "Tính nhanh: $0,4 \\cdot 2,5$", options: ["$1$", "$10$", "$0,1$", "$0,01$"], correct_index: 0, explanation: "$0,4 \\cdot 2,5 = 1$.", difficulty: 1.0 },
      { question: "So sánh: $0,7$ và $0,69$", options: ["$0,7 > 0,69$", "$0,7 < 0,69$", "$0,7 = 0,69$", "Không so sánh được"], correct_index: 0, explanation: "$0,7 = 0,70 > 0,69$.", difficulty: 1.0 },
      { question: "Tính kết quả phép tính: $\\frac{1}{2} - 0,5$", options: ["$0$", "$1$", "$0,25$", "$-0,25$"], correct_index: 0, explanation: "$0,5 - 0,5 = 0$.", difficulty: 1.0 },
      { question: "Tìm mẫu số chung nhỏ nhất của hai phân số: $\\frac{1}{4}$ và $\\frac{5}{6}$", options: ["$12$", "$24$", "$6$", "$18$"], correct_index: 0, explanation: "BCNN(4, 6) = 12.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Trong các phân số sau, phân số nào viết được dưới dạng số thập phân vô hạn tuần hoàn?", options: ["$\\frac{7}{9}$", "$\\frac{3}{8}$", "$\\frac{21}{60}$", "$\\frac{37}{800}$"], correct_index: 0, explanation: "Xét mẫu của phân số tối giản: $\\frac{7}{9}$ có mẫu là $9 = 3^2$ chứa ước nguyên tố 3 khác 2 và 5.", difficulty: 1.2 },
      { question: "Chữ số lặp lại vô hạn trong số thập phân vô hạn tuần hoàn được gọi là gì?", options: ["Chu kì", "Mẫu số", "Thương", "Phần nguyên"], correct_index: 0, explanation: "Chữ số hoặc nhóm chữ số lặp lại vô hạn được gọi là chu kì.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{1}{6}$ dưới dạng số thập phân có sử dụng dấu ngoặc chu kì:", options: ["$0,1(6)$", "$0,(16)$", "$0,166...$", "$0,(6)$"], correct_index: 0, explanation: "$\\frac{1}{6} = 0,1666... = 0,1(6)$.", difficulty: 1.2 },
      { question: "Viết phân số $\\frac{5}{11}$ dưới dạng số thập phân có sử dụng dấu ngoặc chu kì:", options: ["$0,(45)$", "$0,4(5)$", "$0,(54)$", "$0,45$"], correct_index: 0, explanation: "$\\frac{5}{11} = 0,4545... = 0,(45)$.", difficulty: 1.2 },
      { question: "Số thập phân vô hạn tuần hoàn $1,1212...$ viết gọn là:", options: ["$1,(12)$", "$1,1(2)$", "$1,12(12)$", "$1,12$"], correct_index: 0, explanation: "Chu kì tuần hoàn là 12, nên ta viết gọn thành $1,(12)$.", difficulty: 1.0 },
      { question: "Phân số nào sau đây viết được dưới dạng số thập phân hữu hạn?", options: ["$\\frac{21}{60}$", "$\\frac{7}{30}$", "$\\frac{2}{9}$", "$\\frac{1}{15}$"], correct_index: 0, explanation: "Rút gọn phân số: $\\frac{21}{60} = \\frac{7}{20}$. Mẫu số $20 = 2^2 \\cdot 5$ chỉ chứa ước nguyên tố 2 và 5.", difficulty: 1.5 },
      { question: "Kết quả của phép chia $2 : 3$ viết dưới dạng số thập phân chu kì là:", options: ["$0,(6)$", "$0,6$", "$0,66$", "$0,1(6)$"], correct_index: 0, explanation: "$2 : 3 = \\frac{2}{3} = 0,666... = 0,(6)$.", difficulty: 1.0 },
      { question: "Độ dài chu kì của số thập phân vô hạn tuần hoàn $0,(142857)$ là:", options: ["$6$", "$7$", "$5$", "$1$"], correct_index: 0, explanation: "Chu kì gồm 6 chữ số: 1, 4, 2, 8, 5, 7.", difficulty: 1.0 },
      { question: "Số nào dưới đây là số thập phân vô hạn tuần hoàn?", options: ["$1,1(3)$", "$3,14$", "$0,12123...$", "$-0,75$"], correct_index: 0, explanation: "$1,1(3)$ có chu kì lặp lại, các số khác là số thập phân hữu hạn hoặc vô hạn không tuần hoàn.", difficulty: 1.2 },
      { question: "Nhận xét nào sau đây là ĐÚNG?", options: ["Mỗi số hữu tỉ đều biểu diễn được dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn", "Số thập phân vô hạn tuần hoàn không phải là số hữu tỉ", "Mọi phân số đều viết được dưới dạng số thập phân hữu hạn", "Số thập phân hữu hạn không biểu diễn được dưới dạng phân số"], correct_index: 0, explanation: "Theo tính chất, mỗi số hữu tỉ đều được biểu diễn bởi một số thập phân hữu hạn hoặc vô hạn tuần hoàn.", difficulty: 1.2 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Làm quen với số thập phân vô hạn tuần hoàn",
    questions: [
      // 10 Prerequisite questions
      { question: "Rút gọn phân số sau: $\\frac{15}{25}$", options: ["$\\frac{3}{5}$", "$\\frac{1}{5}$", "$\\frac{5}{3}$", "$\\frac{3}{4}$"], correct_index: 0, explanation: "$\\frac{15:5}{25:5} = \\frac{3}{5}$.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{1}{4}$ dưới dạng số thập phân:", options: ["$0,25$", "$0,4$", "$0,1$", "$0,5$"], correct_index: 0, explanation: "$\\frac{1}{4} = 0,25$.", difficulty: 1.0 },
      { question: "Tính kết quả phép tính: $1,5 - 0,75$", options: ["$0,75$", "$0,5$", "$1$", "$0,25$"], correct_index: 0, explanation: "$1,5 - 0,75 = 0,75$.", difficulty: 1.0 },
      { question: "Làm tròn số $0,123$ đến hàng phần trăm:", options: ["$0,12$", "$0,13$", "$0,1$", "$0,2$"], correct_index: 0, explanation: "Chữ số hàng phần nghìn là 3 < 5, làm tròn giữ nguyên thành 0,12.", difficulty: 1.0 },
      { question: "Viết số thập phân $0,8$ dưới dạng phân số tối giản:", options: ["$\\frac{4}{5}$", "$\\frac{8}{10}$", "$\\frac{2}{3}$", "$\\frac{3}{4}$"], correct_index: 0, explanation: "$0,8 = \\frac{8}{10} = \\frac{4}{5}$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x + 0,2 = 0,5$", options: ["$0,3$", "$0,7$", "$-0,3$", "$0,25$"], correct_index: 0, explanation: "$x = 0,5 - 0,2 = 0,3$.", difficulty: 1.0 },
      { question: "Tính kết quả phép nhân: $0,2 \\cdot 0,3$", options: ["$0,06$", "$0,6$", "$0,006$", "$6$"], correct_index: 0, explanation: "$0,2 \\cdot 0,3 = 0,06$.", difficulty: 1.0 },
      { question: "So sánh: $0,15$ và $0,2$", options: ["$0,15 < 0,2$", "$0,15 > 0,2$", "$0,15 = 0,2$", "Không so sánh được"], correct_index: 0, explanation: "$0,15 < 0,20$.", difficulty: 1.0 },
      { question: "Tính: $\\frac{3}{10} + 0,7$", options: ["$1$", "$0,37$", "$0,1$", "$0,4$"], correct_index: 0, explanation: "$0,3 + 0,7 = 1$.", difficulty: 1.0 },
      { question: "Chọn số bé nhất trong các số: $0,1; 0,09; 0,11; 0,089$", options: ["$0,089$", "$0,09$", "$0,1$", "$0,11$"], correct_index: 0, explanation: "$0,089 < 0,09 < 0,1 < 0,11$.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?", options: ["$\\frac{8}{15}$", "$\\frac{3}{20}$", "$\\frac{13}{25}$", "$\\frac{7}{40}$"], correct_index: 0, explanation: "Mẫu số của phân số tối giản $\\frac{8}{15}$ là $15 = 3 \\cdot 5$ có ước nguyên tố 3 khác 2 và 5.", difficulty: 1.2 },
      { question: "Số thập phân $0,08(3)$ biểu diễn phân số tối giản nào?", options: ["$\\frac{1}{12}$", "$\\frac{1}{15}$", "$\\frac{1}{9}$", "$\\frac{1}{6}$"], correct_index: 0, explanation: "Đặt $x = 0,08(3) \\Rightarrow 100x = 8,(3) = 8 + \\frac{1}{3} = \\frac{25}{3} \\Rightarrow x = \\frac{25}{300} = \\frac{1}{12}$.", difficulty: 1.8 },
      { question: "Viết phân số $\\frac{1}{3}$ dưới dạng số thập phân tuần hoàn:", options: ["$0,(3)$", "$0,3$", "$0,33$", "$0,1(3)$"], correct_index: 0, explanation: "$\\frac{1}{3} = 0,333... = 0,(3)$.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{-4}{9}$ dưới dạng số thập phân:", options: ["$-0,(4)$", "$-0,4$", "$-0,0(4)$", "$-0,44$"], correct_index: 0, explanation: "$\\frac{-4}{9} = -0,444... = -0,(4)$.", difficulty: 1.2 },
      { question: "Số thập phân vô hạn tuần hoàn $-0,02121...$ viết gọn dưới dạng chu kì là:", options: ["$-0,0(21)$", "$-0,(021)$", "$-0,02(1)$", "$-0,021$"], correct_index: 0, explanation: "Chu kì bắt đầu từ chữ số thứ hai sau dấu phẩy và lặp lại nhóm 21, nên viết là $-0,0(21)$.", difficulty: 1.5 },
      { question: "Tính kết quả phép tính $1 : 1,(3)$:", options: ["$0,75$", "$0,(75)$", "$0,3$", "$0,(3)$"], correct_index: 0, explanation: "$1,(3) = 1 + \\frac{1}{3} = \\frac{4}{3}$, nên $1 : \\frac{4}{3} = \\frac{3}{4} = 0,75$.", difficulty: 1.5 },
      { question: "Chữ số thứ 105 sau dấu phẩy của số thập phân biểu diễn $\\frac{1}{7}$ là chữ số nào?", options: ["$2$", "$4$", "$8$", "$1$"], correct_index: 0, explanation: "$\\frac{1}{7} = 0,(142857)$ có chu kì gồm 6 chữ số. Ta có $105 = 17 \\cdot 6 + 3$. Chữ số thứ 3 của chu kì là 2.", difficulty: 1.8 },
      { question: "So sánh hai số thập phân tuần hoàn sau: $0,91(6)$ và $0,958(3)$", options: ["$0,91(6) < 0,958(3)$", "$0,91(6) > 0,958(3)$", "$0,91(6) = 0,958(3)$", "Không so sánh được"], correct_index: 0, explanation: "$0,91(6) = 0,91666...$, $0,958(3) = 0,95833...$. Ở hàng phần trăm ta có 1 < 5 nên $0,91(6) < 0,958(3)$.", difficulty: 1.5 },
      { question: "Làm tròn số $0,958(3)$ với độ chính xác $0,005$:", options: ["$0,96$", "$0,958$", "$0,95$", "$1,0$"], correct_index: 0, explanation: "Độ chính xác 0,005 yêu cầu làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là 8 > 5, làm tròn lên thành 0,96.", difficulty: 1.5 },
      { question: "Phân số nào sau đây viết được thành số thập phân vô hạn tuần hoàn?", options: ["$\\frac{28}{-63}$", "$\\frac{21}{60}$", "$\\frac{-8}{125}$", "$\\frac{37}{800}$"], correct_index: 0, explanation: "Rút gọn phân số: $\\frac{28}{-63} = \\frac{-4}{9}$. Mẫu số $9 = 3^2$ có ước nguyên tố 3 khác 2 và 5.", difficulty: 1.5 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Làm quen với số thập phân vô hạn tuần hoàn",
    questions: [
      // 10 Prerequisite questions
      { question: "Tìm ước chung lớn nhất của 12 và 18:", options: ["$6$", "$3$", "$2$", "$12$"], correct_index: 0, explanation: "ƯCLN(12, 18) = 6.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{7}{20}$ dưới dạng số thập phân:", options: ["$0,35$", "$0,7$", "$0,035$", "$0,37$"], correct_index: 0, explanation: "$\\frac{7}{20} = \\frac{35}{100} = 0,35$.", difficulty: 1.0 },
      { question: "Tính: $0,6 - 0,15$", options: ["$0,45$", "$0,51$", "$0,5$", "$0,3$"], correct_index: 0, explanation: "$0,60 - 0,15 = 0,45$.", difficulty: 1.0 },
      { question: "Làm tròn số $12,345$ đến hàng đơn vị:", options: ["$12$", "$13$", "$12,3$", "$10$"], correct_index: 0, explanation: "Chữ số hàng phần mười là 3 < 5, làm tròn giữ nguyên là 12.", difficulty: 1.0 },
      { question: "Viết số thập phân $0,12$ dưới dạng phân số tối giản:", options: ["$\\frac{3}{25}$", "$\\frac{12}{100}$", "$\\frac{6}{50}$", "$\\frac{4}{25}$"], correct_index: 0, explanation: "$0,12 = \\frac{12}{100} = \\frac{3}{25}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x - 0,7 = -0,2$", options: ["$0,5$", "$-0,9$", "$0,9$", "$-0,5$"], correct_index: 0, explanation: "$x = -0,2 + 0,7 = 0,5$.", difficulty: 1.0 },
      { question: "Tính kết quả: $0,15 : 0,3$", options: ["$0,5$", "$0,05$", "$5$", "$1,5$"], correct_index: 0, explanation: "$0,15 : 0,3 = 1,5 : 3 = 0,5$.", difficulty: 1.2 },
      { question: "So sánh: $-0,3$ và $-0,31$", options: ["$-0,3 > -0,31$", "$-0,3 < -0,31$", "$-0,3 = -0,31$", "Không so sánh được"], correct_index: 0, explanation: "$0,3 = 0,30 < 0,31 \\Rightarrow -0,3 > -0,31$.", difficulty: 1.2 },
      { question: "Tính: $\\frac{4}{5} - 0,3$", options: ["$0,5$", "$0,1$", "$0,8$", "$0,4$"], correct_index: 0, explanation: "$0,8 - 0,3 = 0,5$.", difficulty: 1.0 },
      { question: "Tìm số lớn nhất trong các số sau: $0,4; 0,42; 0,399; 0,401$", options: ["$0,42$", "$0,4$", "$0,401$", "$0,399$"], correct_index: 0, explanation: "$0,42 > 0,401 > 0,400 > 0,399$.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Cặp phân số và số thập phân nào dưới đây được nối đúng?", options: ["$\\frac{3}{8} \\rightarrow 0,375$", "$\\frac{4}{9} \\rightarrow 0,(7)$", "$\\frac{5}{8} \\rightarrow 0,(4)$", "$\\frac{7}{9} \\rightarrow 0,625$"], correct_index: 0, explanation: "$\\frac{3}{8} = 0,375$ là phép nối chính xác.", difficulty: 1.2 },
      { question: "Số thập phân $0,0(6)$ tương ứng với phân số tối giản nào?", options: ["$\\frac{1}{15}$", "$\\frac{1}{12}$", "$\\frac{1}{6}$", "$\\frac{1}{30}$"], correct_index: 0, explanation: "$0,0(6) = \\frac{0,(6)}{10} = \\frac{2/3}{10} = \\frac{2}{30} = \\frac{1}{15}$.", difficulty: 1.5 },
      { question: "Viết phân số $\\frac{7}{9}$ dưới dạng số thập phân chu kì là:", options: ["$0,(7)$", "$0,7$", "$0,0(7)$", "$0,77$"], correct_index: 0, explanation: "$\\frac{7}{9} = 0,777... = 0,(7)$.", difficulty: 1.0 },
      { question: "Biến đổi phân số $\\frac{2}{15}$ sang số thập phân ta được:", options: ["$0,1(3)$", "$0,(13)$", "$0,13$", "$0,133$"], correct_index: 0, explanation: "$2 : 15 = 0,1333... = 0,1(3)$.", difficulty: 1.2 },
      { question: "Nhóm số thập phân nào dưới đây chỉ gồm các số thập phân vô hạn tuần hoàn?", options: ["$\\{0,(3); -1,2(5); 0,08(3)\\}$", "$\\{0,75; 1,(6); 3,14\\}$", "$\\{0,1212...; 0,5; 0,1\\}$", "$\\{1,(36); 0,375; 0,(4)\\}$"], correct_index: 0, explanation: "Tất cả các số trong tập đầu tiên đều có ngoặc chu kì, biểu thị số thập phân vô hạn tuần hoàn.", difficulty: 1.2 },
      { question: "Tính giá trị biểu thức: $0,(3) + 0,(6)$", options: ["$1$", "$0,(9)$", "$0,9$", "$0,8$"], correct_index: 0, explanation: "$0,(3) + 0,(6) = \\frac{1}{3} + \\frac{2}{3} = 1$. (Lưu ý $0,(9) = 1$)", correct_index: 0, difficulty: 1.5 },
      { question: "Tìm x biết: $x \\cdot 0,(3) = 1$", options: ["$3$", "$\\frac{1}{3}$", "$0,3$", "$0,(3)$"], correct_index: 0, explanation: "$x \\cdot \\frac{1}{3} = 1 \\Rightarrow x = 3$.", difficulty: 1.2 },
      { question: "Chữ số thứ 60 sau dấu phẩy của số thập phân $0,(12)$ là:", options: ["$2$", "$1$", "$0$", "$3$"], correct_index: 0, explanation: "Chu kì của $0,(12)$ có 2 chữ số (1 và 2). Vì 60 chia hết cho 2, chữ số thứ 60 là chữ số cuối của chu kì, tức là 2.", difficulty: 1.5 },
      { question: "Làm tròn số $0,958(3)$ đến hàng phần nghìn:", options: ["$0,958$", "$0,959$", "$0,96$", "$0,95$"], correct_index: 0, explanation: "$0,958(3) = 0,958333...$ Chữ số hàng phần vạn là 3 < 5, làm tròn giữ nguyên thành 0,958.", difficulty: 1.2 },
      { question: "Phân số nào sau đây KHÔNG viết được dưới dạng số thập phân vô hạn tuần hoàn?", options: ["$\\frac{9}{24}$", "$\\frac{5}{12}$", "$\\frac{2}{15}$", "$\\frac{-7}{18}$"], correct_index: 0, explanation: "Rút gọn phân số: $\\frac{9}{24} = \\frac{3}{8}$. Mẫu số $8 = 2^3$ chỉ có ước nguyên tố 2 nên viết được thành số thập phân hữu hạn.", difficulty: 1.5 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Làm quen với số thập phân vô hạn tuần hoàn",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính kết quả phép tính: $\\frac{7}{10} - \\frac{2}{5}$", options: ["$0,3$", "$0,5$", "$0,1$", "$0,2$"], correct_index: 0, explanation: "$0,7 - 0,4 = 0,3$.", difficulty: 1.0 },
      { question: "Viết phân số $\\frac{1}{8}$ dưới dạng số thập phân:", options: ["$0,125$", "$0,25$", "$0,12$", "$0,8$"], correct_index: 0, explanation: "$\\frac{1}{8} = 0,125$.", difficulty: 1.0 },
      { question: "Tính tích: $1,2 \\cdot 0,5$", options: ["$0,6$", "$6$", "$0,06$", "$0,12$"], correct_index: 0, explanation: "$1,2 \\cdot 0,5 = 0,6$.", difficulty: 1.0 },
      { question: "Làm tròn số $99,99$ đến hàng đơn vị:", options: ["$100$", "$99$", "$99,9$", "$90$"], correct_index: 0, explanation: "Chữ số hàng phần mười là 9 ($\\ge 5$), làm tròn lên thành 100.", difficulty: 1.0 },
      { question: "Viết số thập phân $0,35$ dưới dạng phân số tối giản:", options: ["$\\frac{7}{20}$", "$\\frac{35}{100}$", "$\\frac{3}{10}$", "$\\frac{7}{10}$"], correct_index: 0, explanation: "$0,35 = \\frac{35}{100} = \\frac{7}{20}$.", difficulty: 1.2 },
      { question: "Tìm x biết: $x + 0,15 = -0,85$", options: ["$-1$", "$-0,7$", "$0,7$", "$1$"], correct_index: 0, explanation: "$x = -0,85 - 0,15 = -1$.", difficulty: 1.0 },
      { question: "Tính kết quả phép chia: $0,36 : 0,9$", options: ["$0,4$", "$0,04$", "$4$", "$4.1$"], correct_index: 0, explanation: "$0,36 : 0,9 = 3,6 : 9 = 0,4$.", difficulty: 1.2 },
      { question: "So sánh hai số thập phân: $0,099$ và $0,1$", options: ["$0,099 < 0,1$", "$0,099 > 0,1$", "$0,099 = 0,1$", "Không so sánh được"], correct_index: 0, explanation: "$0,099 < 0,100$.", difficulty: 1.0 },
      { question: "Tính: $1 - \\frac{1}{4}$ dưới dạng số thập phân:", options: ["$0,75$", "$0,25$", "$0,5$", "$0,55$"], correct_index: 0, explanation: "$1 - 0,25 = 0,75$.", difficulty: 1.0 },
      { question: "Sắp xếp các số sau theo thứ tự tăng dần: $0,2; 0,195; 0,205$", options: ["$0,195 < 0,2 < 0,205$", "$0,2 < 0,195 < 0,205$", "$0,205 < 0,2 < 0,195$", "$0,195 < 0,205 < 0,2$"], correct_index: 0, explanation: "$0,195 < 0,200 < 0,205$.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?", options: ["$\\frac{5}{12}$", "$\\frac{3}{24}$", "$\\frac{11}{20}$", "$\\frac{17}{25}$"], correct_index: 0, explanation: "$\\frac{5}{12}$ tối giản, mẫu $12 = 2^2 \\cdot 3$ có ước nguyên tố 3 khác 2 và 5.", difficulty: 1.2 },
      { question: "Đổi số thập phân tuần hoàn $0,(15)$ ra phân số tối giản:", options: ["$\\frac{5}{33}$", "$\\frac{15}{99}$", "$\\frac{15}{100}$", "$\\frac{3}{20}$"], correct_index: 0, explanation: "$0,(15) = \\frac{15}{99} = \\frac{5}{33}$.", difficulty: 1.5 },
      { question: "Biến đổi phân số $\\frac{4}{3}$ sang số thập phân tuần hoàn ta được:", options: ["$1,(3)$", "$1,3$", "$0,(3)$", "$1,33$"], correct_index: 0, explanation: "$\\frac{4}{3} = 1 + \\frac{1}{3} = 1,333... = 1,(3)$.", difficulty: 1.0 },
      { question: "Tìm chữ số thứ 50 sau dấu phẩy của số thập phân biểu diễn $\\frac{1}{7} = 0,(142857)$:", options: ["$4$", "$1$", "$2$", "$8$"], correct_index: 0, explanation: "Chu kì có 6 chữ số. Ta có $50 = 8 \\cdot 6 + 2$. Chữ số thứ 2 của chu kì là 4.", difficulty: 1.5 },
      { question: "Giá trị của biểu thức $0,(3) \\cdot 3$ bằng bao nhiêu?", options: ["$1$", "$0,9$", "$0,(9)$", "$3$"], correct_index: 0, explanation: "$0,(3) \\cdot 3 = \\frac{1}{3} \\cdot 3 = 1$.", difficulty: 1.2 },
      { question: "Tính kết quả biểu thức dưới dạng phân số tối giản: $0,(6) - 0,(3)$", options: ["$\\frac{1}{3}$", "$0,(3)$", "$0,3$", "$\\frac{1}{9}$"], correct_index: 0, explanation: "$\\frac{2}{3} - \\frac{1}{3} = \\frac{1}{3}$.", difficulty: 1.5 },
      { question: "So sánh hai số thập phân tuần hoàn sau: $0,(31)$ và $0,313$", options: ["$0,(31) > 0,313$", "$0,(31) < 0,313$", "$0,(31) = 0,313$", "Không so sánh được"], correct_index: 0, explanation: "$0,(31) = 0,313131...$, còn $0,313 = 0,313000...$ Ở hàng phần chục nghìn, ta có 1 > 0 nên $0,(31) > 0,313$.", difficulty: 1.5 },
      { question: "Làm tròn số thập phân $2,3(45)$ đến hàng phần trăm:", options: ["$2,35$", "$2,34$", "$2,3(5)$", "$2,3$"], correct_index: 0, explanation: "$2,3(45) = 2,34545...$ Chữ số hàng phần nghìn là 5, làm tròn lên thành 2,35.", difficulty: 1.2 },
      { question: "Khi chia 10 cho 3 ta được kết quả là:", options: ["Số thập phân vô hạn tuần hoàn", "Số thập phân hữu hạn", "Số vô tỉ", "Số tự nhiên"], correct_index: 0, explanation: "$10 : 3 = \\frac{10}{3} = 3,(3)$ là số thập phân vô hạn tuần hoàn.", difficulty: 1.0 },
      { question: "Số nào dưới đây biểu diễn số hữu tỉ $\\frac{1}{15}$ dưới dạng thập phân?", options: ["$0,0(6)$", "$0,06$", "$0,(06)$", "$0,066$"], correct_index: 0, explanation: "$\\frac{1}{15} = 0,0666... = 0,0(6)$.", difficulty: 1.5 }
    ]
  }
];

// Define questions for Bai 6 (Can bac hai so hoc)
const BAI_6_EXAMS = [
  {
    title: "Đề luyện tập số 1: Số vô tỉ. Căn bậc hai số học",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính lũy thừa sau: $4^2$", options: ["$16$", "$8$", "$12$", "$64$"], correct_index: 0, explanation: "$4^2 = 4 \\cdot 4 = 16$.", difficulty: 1.0 },
      { question: "Tìm số nguyên dương có bình phương bằng 9:", options: ["$3$", "$-3$", "$9$", "$81$"], correct_index: 0, explanation: "$3^2 = 9$.", difficulty: 1.0 },
      { question: "Số nào dưới đây là số chính phương?", options: ["$25$", "$15$", "$5$", "$50$"], correct_index: 0, explanation: "$25 = 5^2$ là bình phương của số tự nhiên.", difficulty: 1.0 },
      { question: "Tính kết quả: $10^2$", options: ["$100$", "$20$", "$1000$", "$10$"], correct_index: 0, explanation: "$10 \\cdot 10 = 100$.", difficulty: 1.0 },
      { question: "Tìm số đối của $-4$:", options: ["$4$", "$-4$", "$0$", "$\\frac{1}{4}$"], correct_index: 0, explanation: "Số đối của $-4$ là $4$.", difficulty: 1.0 },
      { question: "Tính giá trị tuyệt đối: $|-9|$", options: ["$9$", "$-9$", "$0$", "$18$"], correct_index: 0, explanation: "$|-9| = 9$.", difficulty: 1.0 },
      { question: "Số tự nhiên nhỏ nhất có hai chữ số là số chính phương là:", options: ["$16$", "$10$", "$25$", "$9$"], correct_index: 0, explanation: "$16 = 4^2$ là số chính phương nhỏ nhất có 2 chữ số.", difficulty: 1.2 },
      { question: "Tính: $(-5)^2$", options: ["$25$", "$-25$", "$10$", "$-10$"], correct_index: 0, explanation: "$(-5) \\cdot (-5) = 25$.", difficulty: 1.0 },
      { question: "Rút gọn phân số: $\\frac{16}{64}$", options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{2}{8}$", "$\\frac{4}{16}$"], correct_index: 0, explanation: "$\\frac{16}{64} = \\frac{1}{4}$.", difficulty: 1.0 },
      { question: "Tìm x biết: $x^2 = 1$", options: ["$\\pm 1$", "$1$", "$-1$", "$0$"], correct_index: 0, explanation: "$1^2 = 1$ và $(-1)^2 = 1$.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Số vô tỉ là số viết được dưới dạng nào sau đây?", options: ["Số thập phân vô hạn không tuần hoàn", "Số thập phân hữu hạn", "Số thập phân vô hạn tuần hoàn", "Số tự nhiên"], correct_index: 0, explanation: "Định nghĩa số vô tỉ là số thập phân vô hạn không tuần hoàn.", difficulty: 1.0 },
      { question: "Kí hiệu căn bậc hai số học của một số $a$ không âm là:", options: ["$\\sqrt{a}$", "$a^2$", "$|a|$", "$\\sqrt{-a}$"], correct_index: 0, explanation: "Kí hiệu căn bậc hai số học của số không âm $a$ là $\\sqrt{a}$.", difficulty: 1.0 },
      { question: "Tính căn bậc hai số học của 81:", options: ["$9$", "$-9$", "$\\pm 9$", "$6561$"], correct_index: 0, explanation: "$\\sqrt{81} = 9$ vì $9 > 0$ và $9^2 = 81$.", difficulty: 1.0 },
      { question: "Số nào dưới đây có căn bậc hai số học?", options: ["$0,9$", "$-4$", "$-100$", "$-0,09$"], correct_index: 0, explanation: "Chỉ các số không âm mới có căn bậc hai số học.", difficulty: 1.2 },
      { question: "Trong các kết quả sau, kết quả nào ĐÚNG?", options: ["$\\sqrt{0,04} = 0,2$", "$\\sqrt{0,1} = 0,01$", "$\\sqrt{16} = -4$", "$\\sqrt{-0,09} = 0,3$"], correct_index: 0, explanation: "$\\sqrt{0,04} = 0,2$ vì $0,2^2 = 0,04$. Không có căn bậc hai số học của số âm, và căn bậc hai số học luôn không âm.", difficulty: 1.2 },
      { question: "Tính căn bậc hai số học của các số sau: $8\\,100$", options: ["$90$", "$9$", "$900$", "$\\pm 90$"], correct_index: 0, explanation: "$\\sqrt{8100} = 90$ vì $90^2 = 8100$.", difficulty: 1.2 },
      { question: "Nếu một hình vuông có diện tích bằng $49\\text{ cm}^2$ thì độ dài cạnh của hình vuông đó bằng:", options: ["$7\\text{ cm}$", "$14\\text{ cm}$", "$49\\text{ cm}$", "$3,5\\text{ cm}$"], correct_index: 0, explanation: "Độ dài cạnh hình vuông bằng $\\sqrt{S} = \\sqrt{49} = 7\\text{ cm}$.", difficulty: 1.2 },
      { question: "Giá trị của biểu thức $(\\sqrt{5})^2$ bằng:", options: ["$5$", "$\\sqrt{5}$", "$25$", "$2,236$"], correct_index: 0, explanation: "Theo tính chất, với mọi $a \\ge 0$, $(\\sqrt{a})^2 = a$.", difficulty: 1.0 },
      { question: "Số nào dưới đây là số vô tỉ?", options: ["$\\sqrt{2}$", "$0,75$", "$\\frac{-1}{3}$", "$1,(6)$"], correct_index: 0, explanation: "$\\sqrt{2} \\approx 1,4142...$ là số thập phân vô hạn không tuần hoàn.", difficulty: 1.0 },
      { question: "Làm tròn số vô tỉ $\\sqrt{3} \\approx 1,73205...$ đến chữ số thập phân thứ hai:", options: ["$1,73$", "$1,74$", "$1,7$", "$1,8$"], correct_index: 0, explanation: "Chữ số thứ ba sau dấu phẩy là 2 < 5, làm tròn giữ nguyên thành 1,73.", difficulty: 1.2 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Số vô tỉ. Căn bậc hai số học",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính lũy thừa: $6^2$", options: ["$36$", "$12$", "$18$", "$216$"], correct_index: 0, explanation: "$6^2 = 36$.", difficulty: 1.0 },
      { question: "Số nào dưới đây bình phương lên bằng 49?", options: ["$7$ hoặc $-7$", "$7$", "$-7$", "$14$"], correct_index: 0, explanation: "Cả $7^2 = 49$ và $(-7)^2 = 49$.", difficulty: 1.2 },
      { question: "Số nào không phải số chính phương?", options: ["$18$", "$1$", "$16$", "$36$"], correct_index: 0, explanation: "18 không phải là bình phương của bất kỳ số tự nhiên nào.", difficulty: 1.0 },
      { question: "Tìm x biết: $x^2 = 0$", options: ["$0$", "$1$", "$-1$", "Không có giá trị x"], correct_index: 0, explanation: "Chỉ có $0^2 = 0$.", difficulty: 1.0 },
      { question: "Tính: $|-1,5|$", options: ["$1,5$", "$-1,5$", "$0$", "$3$"], correct_index: 0, explanation: "$|-1,5| = 1,5$.", difficulty: 1.0 },
      { question: "Số nào dưới đây là số đối của số $5$?", options: ["$-5$", "$5$", "$0$", "$\\frac{1}{5}$"], correct_index: 0, explanation: "Số đối của 5 là -5.", difficulty: 1.0 },
      { question: "Tính nhẩm: $0,3^2$", options: ["$0,09$", "$0,9$", "$0,06$", "$0,6$"], correct_index: 0, explanation: "$0,3 \\cdot 0,3 = 0,09$.", difficulty: 1.0 },
      { question: "Tìm số nguyên âm lớn nhất là số chính phương?", options: ["Không tồn tại số chính phương âm", "$-1$", "$-4$", "$-9$"], correct_index: 0, explanation: "Bình phương của một số thực bất kỳ luôn không âm, nên không có số chính phương âm.", difficulty: 1.2 },
      { question: "Rút gọn phân số: $\\frac{25}{100}$", options: ["$\\frac{1}{4}$", "$\\frac{1}{5}$", "$\\frac{5}{20}$", "$\\frac{2}{5}$"], correct_index: 0, explanation: "$\\frac{25}{100} = \\frac{1}{4}$.", difficulty: 1.0 },
      { question: "So sánh: $5^2$ và $2^5$", options: ["$5^2 < 2^5$", "$5^2 > 2^5$", "$5^2 = 2^5$", "Không so sánh được"], correct_index: 0, explanation: "$5^2 = 25 < 2^5 = 32$.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Trong các khẳng định sau, khẳng định nào ĐÚNG?", options: ["Nếu a là số tự nhiên không chính phương thì $\\sqrt{a}$ là số vô tỉ", "Mọi số thập phân vô hạn đều là số vô tỉ", "Căn bậc hai số học của một số luôn có hai giá trị là âm và dương", "$\\sqrt{-25} = -5$"], correct_index: 0, explanation: "Nếu a là số tự nhiên không chính phương thì $\\sqrt{a}$ là số vô tỉ (ví dụ $\\sqrt{2}, \\sqrt{3}$).", difficulty: 1.5 },
      { question: "Tìm hai số vô tỉ $x, y$ sao cho tổng của chúng là số hữu tỉ:", options: ["$x = \\sqrt{2}, y = -\\sqrt{2}$", "$x = \\sqrt{2}, y = \\sqrt{3}$", "$x = \\sqrt{2}, y = \\sqrt{2}$", "$x = \\pi, y = \\pi$"], correct_index: 0, explanation: "$\\sqrt{2} + (-\\sqrt{2}) = 0$ là số hữu tỉ.", difficulty: 1.5 },
      { question: "Tính căn bậc hai số học của $0,81$:", options: ["$0,9$", "$-0,9$", "$0,09$", "$\\pm 0,9$"], correct_index: 0, explanation: "$\\sqrt{0,81} = 0,9$ vì $0,9^2 = 0,81$.", difficulty: 1.2 },
      { question: "Tính căn bậc hai số học của $81^2$:", options: ["$81$", "$9$", "$6561$", "$3$"], correct_index: 0, explanation: "$\\sqrt{81^2} = 81$ (vì $81 > 0$).", difficulty: 1.2 },
      { question: "Tính giá trị của biểu thức: $\\sqrt{64} + \\sqrt{36}$", options: ["$14$", "$10$", "$100$", "$2$"], correct_index: 0, explanation: "$\\sqrt{64} = 8$, $\\sqrt{36} = 6$. Tổng là $8 + 6 = 14$.", difficulty: 1.2 },
      { question: "Số nào trong các số sau là số vô tỉ? $-\\frac{16}{3}; \\sqrt{36}; \\sqrt{47}; \\sqrt{0,01}$", options: ["$\\sqrt{47}$", "$-\\frac{16}{3}$", "$\\sqrt{36}$", "$\\sqrt{0,01}$"], correct_index: 0, explanation: "$\\sqrt{47}$ là số vô tỉ vì 47 không phải số chính phương. $\\sqrt{36} = 6$ và $\\sqrt{0,01} = 0,1$ là số hữu tỉ.", difficulty: 1.5 },
      { question: "Cho hình vuông có diện tích $a = 15\\text{ cm}^2$. Độ dài cạnh hình vuông đó bằng:", options: ["$\\sqrt{15}\\text{ cm}$", "$15\\text{ cm}$", "$225\\text{ cm}$", "$3,87\\text{ cm}$"], correct_index: 0, explanation: "Cạnh hình vuông có độ dài là $\\sqrt{a} = \\sqrt{15}\\text{ cm}$.", difficulty: 1.2 },
      { question: "Số $\\pi = 3,14159265...$ là một số:", options: ["Số vô tỉ", "Số hữu tỉ", "Số tự nhiên", "Số nguyên"], correct_index: 0, explanation: "Số $\\pi$ có biểu diễn thập phân vô hạn không tuần hoàn nên là số vô tỉ.", difficulty: 1.0 },
      { question: "Tính căn bậc hai số học của 100:", options: ["$10$", "$-10$", "$50$", "$10000$"], correct_index: 0, explanation: "$\\sqrt{100} = 10$.", difficulty: 1.0 },
      { question: "Tính giá trị biểu thức: $3 \\cdot \\sqrt{25} - 4 \\cdot \\sqrt{9}$", options: ["$3$", "$11$", "$23$", "$27$"], correct_index: 0, explanation: "$3 \\cdot 5 - 4 \\cdot 3 = 15 - 12 = 3$.", difficulty: 1.5 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Số vô tỉ. Căn bậc hai số học",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính lũy thừa: $8^2$", options: ["$64$", "$16$", "$24$", "$512$"], correct_index: 0, explanation: "$8^2 = 64$.", difficulty: 1.0 },
      { question: "Số nào dưới đây bình phương lên bằng 100?", options: ["$10$ hoặc $-10$", "$10$", "$-10$", "$50$"], correct_index: 0, explanation: "$10^2 = 100$ và $(-10)^2 = 100$.", difficulty: 1.2 },
      { question: "Số nào không phải số chính phương?", options: ["$12$", "$4$", "$9$", "$16$"], correct_index: 0, explanation: "12 không phải số chính phương.", difficulty: 1.0 },
      { question: "Tìm x biết: $x^2 = 4$", options: ["$\\pm 2$", "$2$", "$-2$", "$16$"], correct_index: 0, explanation: "$x = 2$ hoặc $x = -2$.", difficulty: 1.2 },
      { question: "Tính: $|-2,5|$", options: ["$2,5$", "$-2,5$", "$0$", "$5$"], correct_index: 0, explanation: "$|-2,5| = 2,5$.", difficulty: 1.0 },
      { question: "Số đối của $-8$ là:", options: ["$8$", "$-8$", "$0$", "$\\frac{1}{8}$"], correct_index: 0, explanation: "Số đối của -8 là 8.", difficulty: 1.0 },
      { question: "Tính nhẩm: $0,5^2$", options: ["$0,25$", "$0,5$", "$2,5$", "$1$"], correct_index: 0, explanation: "$0,5 \\cdot 0,5 = 0,25$.", difficulty: 1.0 },
      { question: "Tích của 2 số chính phương bất kỳ có phải là số chính phương không?", options: ["Có", "Không", "Chỉ đúng với số chẵn", "Chỉ đúng với số lẻ"], correct_index: 0, explanation: "Có, vì $a^2 \\cdot b^2 = (a \\cdot b)^2$ là một số chính phương.", difficulty: 1.5 },
      { question: "Rút gọn phân số: $\\frac{36}{48}$", options: ["$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{6}{8}$", "$\\frac{12}{16}$"], correct_index: 0, explanation: "Chia cả tử và mẫu cho 12: $\\frac{36:12}{48:12} = \\frac{3}{4}$.", difficulty: 1.2 },
      { question: "So sánh: $3^3$ và $2^5$", options: ["$3^3 < 2^5$", "$3^3 > 2^5$", "$3^3 = 2^5$", "Không so sánh được"], correct_index: 0, explanation: "$3^3 = 27 < 2^5 = 32$.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Khẳng định nào đúng về mối quan hệ giữa các tập hợp số?", options: ["Mọi số tự nhiên đều có căn bậc hai số học là số tự nhiên", "Mọi số hữu tỉ không chính phương đều có căn bậc hai số học là số vô tỉ", "Số vô tỉ có thể biểu diễn dưới dạng phân số tối giản", "Căn bậc hai số học của một số hữu tỉ dương luôn là số vô tỉ"], correct_index: 1, explanation: "Với số hữu tỉ không chính phương (ví dụ $\\frac{1}{2}$), căn bậc hai của nó là số vô tỉ.", difficulty: 1.8 },
      { question: "Số nào sau đây KHÔNG có căn bậc hai số học?", options: ["$-25$", "$0$", "$1$", "$2,5$"], correct_index: 0, explanation: "Căn bậc hai số học chỉ được định nghĩa cho số không âm. $-25 < 0$ nên không có căn bậc hai số học.", difficulty: 1.0 },
      { question: "Tính giá trị biểu thức: $B = \\sqrt{144} - \\sqrt{121}$", options: ["$1$", "$2$", "$3$", "$4$"], correct_index: 0, explanation: "$\\sqrt{144} = 12$, $\\sqrt{121} = 11$. Vậy $12 - 11 = 1$.", difficulty: 1.2 },
      { question: "Tìm cạnh của một mảnh đất hình vuông có diện tích $64\\text{ m}^2$:", options: ["$8\\text{ m}$", "$16\\text{ m}$", "$32\\text{ m}$", "$4\\text{ m}$"], correct_index: 0, explanation: "Độ dài cạnh hình vuông là $\\sqrt{64} = 8\\text{ m}$.", difficulty: 1.0 },
      { question: "Tính căn bậc hai số học của $0,0001$:", options: ["$0,01$", "$0,1$", "$0,001$", "$0,0001$"], correct_index: 0, explanation: "$\\sqrt{0,0001} = 0,01$ vì $0,01^2 = 0,0001$.", difficulty: 1.5 },
      { question: "Số vô tỉ $2 + \\sqrt{7}$ là kết quả cộng của số hữu tỉ và số vô tỉ. Khẳng định nào sau đây đúng?", options: ["$2 + \\sqrt{7}$ là số vô tỉ", "$2 + \\sqrt{7}$ là số hữu tỉ", "$2 + \\sqrt{7}$ là số tự nhiên", "Không thể xác định được"], correct_index: 0, explanation: "Tổng của một số hữu tỉ và một số vô tỉ luôn là một số vô tỉ.", difficulty: 1.5 },
      { question: "Sử dụng máy tính cầm tay, hãy tính $\\sqrt{2,5}$ làm tròn đến chữ số thập phân thứ hai:", options: ["$1,58$", "$1,59$", "$1,57$", "$1,60$"], correct_index: 0, explanation: "$\\sqrt{2,5} \\approx 1,5811... \\approx 1,58$.", difficulty: 1.2 },
      { question: "Biết $\\sqrt{2} = 1,41421356...$. Hãy làm tròn $\\sqrt{2}$ đến chữ số thập phân thứ ba:", options: ["$1,414$", "$1,415$", "$1,41$", "$1,4$"], correct_index: 0, explanation: "Chữ số ở hàng thập phân thứ tư là 2 < 5, làm tròn giữ nguyên là 1,414.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\sqrt{x} = 5$", options: ["$25$", "$5$", "$-25$", "$10$"], correct_index: 0, explanation: "$\\sqrt{x} = 5 \\Rightarrow x = 5^2 = 25$.", difficulty: 1.2 },
      { question: "Số nào dưới đây có căn bậc hai số học là số tự nhiên?", options: ["$49$", "$0,49$", "$4,9$", "$0,049$"], correct_index: 0, explanation: "$\\sqrt{49} = 7$ là số tự nhiên. $\\sqrt{0,49} = 0,7$ không phải số tự nhiên.", difficulty: 1.2 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Số vô tỉ. Căn bậc hai số học",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính lũy thừa: $9^2$", options: ["$81$", "$18$", "$27$", "$729$"], correct_index: 0, explanation: "$9^2 = 81$.", difficulty: 1.0 },
      { question: "Số nào bình phương bằng 144?", options: ["$12$ hoặc $-12$", "$12$", "$-12$", "$72$"], correct_index: 0, explanation: "$12^2 = 144$ và $(-12)^2 = 144$.", difficulty: 1.2 },
      { question: "Số chính phương nhỏ nhất có ba chữ số là:", options: ["$100$", "$121$", "$144$", "$10$"], correct_index: 0, explanation: "$100 = 10^2$ là số chính phương nhỏ nhất có 3 chữ số.", difficulty: 1.2 },
      { question: "Tìm x biết: $x^2 = 9$", options: ["$\\pm 3$", "$3$", "$-3$", "$81$"], correct_index: 0, explanation: "$x = 3$ hoặc $x = -3$.", difficulty: 1.2 },
      { question: "Tính: $|-12|$", options: ["$12$", "$-12$", "$0$", "$24$"], correct_index: 0, explanation: "$|-12| = 12$.", difficulty: 1.0 },
      { question: "Số đối của $-15$ là:", options: ["$15$", "$-15$", "$0$", "$1$"], correct_index: 0, explanation: "Số đối của -15 là 15.", difficulty: 1.0 },
      { question: "Tính nhẩm: $0,1^2$", options: ["$0,01$", "$0,1$", "$0,2$", "$0,001$"], correct_index: 0, explanation: "$0,1 \\cdot 0,1 = 0,01$.", difficulty: 1.0 },
      { question: "Tích của $4$ và $9$ có phải số chính phương không?", options: ["Có, vì tích bằng 36", "Không, vì 4 và 9 là các số lẻ", "Chỉ đúng với số tự nhiên lớn", "Không xác định"], correct_index: 0, explanation: "$4 \\cdot 9 = 36 = 6^2$ là số chính phương.", difficulty: 1.2 },
      { question: "Rút gọn phân số: $\\frac{45}{60}$", options: ["$\\frac{3}{4}$", "$\\frac{15}{20}$", "$\\frac{9}{12}$", "$\\frac{2}{3}$"], correct_index: 0, explanation: "$\\frac{45:15}{60:15} = \\frac{3}{4}$.", difficulty: 1.2 },
      { question: "So sánh: $2^4$ và $4^2$", options: ["$2^4 = 4^2$", "$2^4 > 4^2$", "$2^4 < 4^2$", "Không so sánh được"], correct_index: 0, explanation: "$2^4 = 16$ và $4^2 = 16$.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Một số tự nhiên được ghi bằng cách viết các số tự nhiên liên tiếp từ 0: $a = 0,1234567891011...$ Số này thuộc tập số nào?", options: ["Số vô tỉ", "Số hữu tỉ", "Số nguyên", "Số tự nhiên"], correct_index: 0, explanation: "Dãy số tự nhiên kéo dài vô hạn không tạo ra chu kì tuần hoàn lặp lại mãi mãi, nên nó biểu diễn số thập phân vô hạn không tuần hoàn (số vô tỉ).", difficulty: 1.8 },
      { question: "Tính giá trị biểu thức: $C = 2 \\cdot \\sqrt{36} - 3 \\cdot \\sqrt{16}$", options: ["$0$", "$2$", "$4$", "$-2$"], correct_index: 0, explanation: "$2 \\cdot 6 - 3 \\cdot 4 = 12 - 12 = 0$.", difficulty: 1.2 },
      { question: "Tìm x biết: $\\sqrt{x} = 1,2$", options: ["$1,44$", "$1,2$", "$0,144$", "$2,4$"], correct_index: 0, explanation: "$\\sqrt{x} = 1,2 \\Rightarrow x = 1,2^2 = 1,44$.", difficulty: 1.5 },
      { question: "Tìm số có căn bậc hai số học là 15:", options: ["$225$", "$15$", "$30$", "$5$"], correct_index: 0, explanation: "Số đó là $15^2 = 225$.", difficulty: 1.0 },
      { question: "Tính căn bậc hai số học của $0,09$:", options: ["$0,3$", "$-0,3$", "$0,03$", "$\\pm 0,3$"], correct_index: 0, explanation: "$\\sqrt{0,09} = 0,3$ vì $0,3 > 0$ và $0,3^2 = 0,09$.", difficulty: 1.2 },
      { question: "Số nào trong các số sau là số hữu tỉ?", options: ["$\\sqrt{0,01}$", "$2+\\sqrt{7}$", "$-2\\pi$", "$\\sqrt{47}$"], correct_index: 0, explanation: "$\\sqrt{0,01} = 0,1$ là số hữu tỉ. Các số còn lại đều chứa căn không chính phương hoặc $\\pi$ nên là số vô tỉ.", difficulty: 1.5 },
      { question: "Tính cạnh của hình vuông biết diện tích của nó là $10,24\\text{ m}^2$:", options: ["$3,2\\text{ m}$", "$3,12\\text{ m}$", "$5,12\\text{ m}$", "$2,56\\text{ m}$"], correct_index: 0, explanation: "Độ dài cạnh hình vuông là $\\sqrt{10,24} = 3,2\\text{ m}$.", difficulty: 1.5 },
      { question: "Tính kết quả làm tròn của $\\sqrt{15}$ đến chữ số thập phân thứ hai:", options: ["$3,87$", "$3,88$", "$3,86$", "$3,90$"], correct_index: 0, explanation: "$\\sqrt{15} \\approx 3,87298... \\approx 3,87$.", difficulty: 1.2 },
      { question: "Tính: $(\\sqrt{7})^2 + (-\\sqrt{3})^2$ (với định nghĩa $(\\sqrt{x})^2 = x$):", options: ["$10$", "$4$", "$16$", "$\\sqrt{10}$"], correct_index: 0, explanation: "$7 + 3 = 10$. (Bình phương của số đối của căn cũng bằng số ban đầu)", correct_index: 0, difficulty: 1.8 },
      { question: "So sánh $\\sqrt{16}$ và $\\sqrt{9}$:", options: ["$\\sqrt{16} > \\sqrt{9}$", "$\\sqrt{16} < \\sqrt{9}$", "$\\sqrt{16} = \\sqrt{9}$", "Không so sánh được"], correct_index: 0, explanation: "$4 > 3 \\Rightarrow \\sqrt{16} > \\sqrt{9}$.", difficulty: 1.0 }
    ]
  }
];

// Define questions for Bai 7 (Tap hop cac so thuc)
const BAI_7_EXAMS = [
  {
    title: "Đề luyện tập số 1: Tập hợp các số thực",
    questions: [
      // 10 Prerequisite questions
      { question: "Ký hiệu tập hợp số hữu tỉ là:", options: ["$\\mathbb{Q}$", "$\\mathbb{Z}$", "$\\mathbb{N}$", "$\\mathbb{R}$"], correct_index: 0, explanation: "Tập hợp các số hữu tỉ ký hiệu là Q.", difficulty: 1.0 },
      { question: "Tính kết quả phép tính: $|-5| + 3$", options: ["$8$", "$-2$", "$2$", "$-8$"], correct_index: 0, explanation: "$|-5| + 3 = 5 + 3 = 8$.", difficulty: 1.0 },
      { question: "Tìm số đối của số hữu tỉ $2,5$:", options: ["$-2,5$", "$2,5$", "$0$", "$-5$"], correct_index: 0, explanation: "Số đối của 2,5 là -2,5.", difficulty: 1.0 },
      { question: "Tìm x biết: $|x| = 2$ và $x < 0$:", options: ["$-2$", "$2$", "$0$", "$-4$"], correct_index: 0, explanation: "Vì $|x| = 2$ nên $x = 2$ hoặc $x = -2$. Do $x < 0$, ta chọn $x = -2$.", difficulty: 1.2 },
      { question: "Sắp xếp các số sau theo thứ tự giảm dần: $-3; 0; -1; 2$", options: ["$2; 0; -1; -3$", "$-3; -1; 0; 2$", "$2; -1; 0; -3$", "$0; 2; -1; -3$"], correct_index: 0, explanation: "Ta có $2 > 0 > -1 > -3$.", difficulty: 1.0 },
      { question: "Tính: $|-1,2| \\cdot 5$", options: ["$6$", "$-6$", "$5$", "$1,2$"], correct_index: 0, explanation: "$1,2 \\cdot 5 = 6$.", difficulty: 1.0 },
      { question: "So sánh hai số: $0,25$ và $\\frac{1}{4}$", options: ["$0,25 = \\frac{1}{4}$", "$0,25 > \\frac{1}{4}$", "$0,25 < \\frac{1}{4}$", "Không so sánh được"], correct_index: 0, explanation: "$\\frac{1}{4} = 0,25$, nên chúng bằng nhau.", difficulty: 1.0 },
      { question: "Trong các số: $-3; 2,5; \\frac{1}{3}; \\sqrt{2}$, số nào không phải số hữu tỉ?", options: ["$\\sqrt{2}$", "$-3$", "$2,5$", "$\\frac{1}{3}$"], correct_index: 0, explanation: "$\\sqrt{2}$ là số vô tỉ.", difficulty: 1.0 },
      { question: "Tính hiệu: $|-7| - |-3|$", options: ["$4$", "$10$", "$-4$", "$-10$"], correct_index: 0, explanation: "$7 - 3 = 4$.", difficulty: 1.0 },
      { question: "Tìm số nguyên x lớn nhất thỏa mãn $x < 2,5$:", options: ["$2$", "$3$", "$1$", "$0$"], correct_index: 0, explanation: "Số nguyên lớn nhất nhỏ hơn 2,5 là 2.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Tập hợp các số thực gồm có:", options: ["Các số hữu tỉ và các số vô tỉ", "Chỉ các số tự nhiên và số nguyên", "Chỉ các số hữu tỉ và số nguyên", "Chỉ các số thập phân hữu hạn"], correct_index: 0, explanation: "Tập hợp số thực R bao gồm toàn bộ số hữu tỉ Q và số vô tỉ I.", difficulty: 1.0 },
      { question: "Kí hiệu của tập hợp các số thực là:", options: ["$\\mathbb{R}$", "$\\mathbb{I}$", "$\\mathbb{Q}$", "$\\mathbb{Z}$"], correct_index: 0, explanation: "Kí hiệu của tập số thực là R.", difficulty: 1.0 },
      { question: "Cách viết nào dưới đây biểu diễn một khẳng định ĐÚNG?", options: ["$\\mathbb{Q} \\subset \\mathbb{R}$", "$\\sqrt{2} \\in \\mathbb{Q}$", "$\\mathbb{R} \\subset \\mathbb{Q}$", "$-3 \\notin \\mathbb{R}$"], correct_index: 0, explanation: "Tập hợp số hữu tỉ Q là tập con của tập số thực R.", difficulty: 1.0 },
      { question: "Điền kí hiệu thích hợp vào ô trống: $\\sqrt{2} \\square \\mathbb{Q}$", options: ["$\\notin$", "$\\in$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "$\\sqrt{2}$ là số vô tỉ nên không thuộc tập số hữu tỉ Q.", difficulty: 1.0 },
      { question: "So sánh hai số thực sau: $2,1(22)$ và $2,122$", options: ["$2,1(22) > 2,122$", "$2,1(22) < 2,122$", "$2,1(22) = 2,122$", "Không so sánh được"], correct_index: 0, explanation: "$2,1(22) = 2,12222... > 2,12200$.", difficulty: 1.2 },
      { question: "Tìm số đối của $-\\sqrt{11}$:", options: ["$\\sqrt{11}$", "$-\\sqrt{11}$", "$11$", "$-11$"], correct_index: 0, explanation: "Số đối của $-a$ là $a$, vậy số đối của $-\\sqrt{11}$ là $\\sqrt{11}$.", difficulty: 1.2 },
      { question: "Tính giá trị tuyệt đối: $|-\\sqrt{8}|$", options: ["$\\sqrt{8}$", "$-\\sqrt{8}$", "$8$", "$-8$"], correct_index: 0, explanation: "Giá trị tuyệt đối của một số thực bất kỳ luôn là một số không âm, nên $|-\\sqrt{8}| = \\sqrt{8}$.", difficulty: 1.2 },
      { question: "Tính giá trị biểu thức: $A = |-5,13| + |4,56|$", options: ["$9,69$", "$0,57$", "$-9,69$", "$-0,57$"], correct_index: 0, explanation: "$|-5,13| = 5,13$, $|4,56| = 4,56$. Tổng là $5,13 + 4,56 = 9,69$.", difficulty: 1.2 },
      { question: "Cho tập hợp $A = \\{x \\mid x \\in \\mathbb{R}, |x| < 3\\}$. Các số nguyên thuộc tập hợp A là:", options: ["$-2; -1; 0; 1; 2$", "$-3; -2; -1; 0; 1; 2; 3$", "$1; 2$", "$-2; -1; 1; 2$"], correct_index: 0, explanation: "$|x| < 3 \\Rightarrow -3 < x < 3$. Các số nguyên thỏa mãn là -2, -1, 0, 1, 2.", difficulty: 1.5 },
      { question: "So sánh hai số thực: $\\sqrt{5}$ và $2,2360679...$ (biết $\\sqrt{5} = 2,2360679...$)", options: ["$\\sqrt{5} = 2,2360679...$", "$\\sqrt{5} > 2,2360679...$", "$\\sqrt{5} < 2,2360679...$", "Không so sánh được"], correct_index: 0, explanation: "Hai số thực này có cùng điểm biểu diễn trên trục số nên bằng nhau.", difficulty: 1.2 }
    ]
  },
  {
    title: "Đề luyện tập số 2: Tập hợp các số thực",
    questions: [
      // 10 Prerequisite questions
      { question: "Ký hiệu tập hợp số nguyên là:", options: ["$\\mathbb{Z}$", "$\\mathbb{N}$", "$\\mathbb{Q}$", "$\\mathbb{R}$"], correct_index: 0, explanation: "Tập số nguyên ký hiệu là Z.", difficulty: 1.0 },
      { question: "Tính giá trị: $|-10| - |4|$", options: ["$6$", "$14$", "$-6$", "$-14$"], correct_index: 0, explanation: "$10 - 4 = 6$.", difficulty: 1.0 },
      { question: "Tìm số đối của $-1,25$:", options: ["$1,25$", "$-1,25$", "$0$", "$1$"], correct_index: 0, explanation: "Số đối của -1,25 là 1,25.", difficulty: 1.0 },
      { question: "Tìm x biết: $|x| = 5$ và $x > 0$:", options: ["$5$", "$-5$", "$\\pm 5$", "$0$"], correct_index: 0, explanation: "$x = 5$ vì $x > 0$.", difficulty: 1.0 },
      { question: "Chọn số lớn nhất trong các số sau: $-2; -2,5; -3; -1,8$", options: ["$-1,8$", "-2", "-2,5", "-3"], correct_index: 0, explanation: "$-1,8 > -2 > -2,5 > -3$.", difficulty: 1.0 },
      { question: "Tính: $|-2,5| \\cdot (-4)$", options: ["$-10$", "$10$", "$-8$", "$8$"], correct_index: 0, explanation: "$2,5 \\cdot (-4) = -10$.", difficulty: 1.0 },
      { question: "So sánh: $\\frac{3}{5}$ và $0,61$", options: ["$\\frac{3}{5} < 0,61$", "$\\frac{3}{5} > 0,61$", "$\\frac{3}{5} = 0,61$", "Không so sánh được"], correct_index: 0, explanation: "$\\frac{3}{5} = 0,60 < 0,61$.", difficulty: 1.0 },
      { question: "Trong các số: $0; -4; \\sqrt{9}; \\pi$, số nào là số vô tỉ?", options: ["$\\pi$", "$0$", "$-4$", "$\\sqrt{9}$"], correct_index: 0, explanation: "$\\pi$ là số vô tỉ. $\\sqrt{9} = 3$ là số hữu tỉ.", difficulty: 1.0 },
      { question: "Tính tổng: $|-12| + |-8|$", options: ["$20$", "$4$", "$-20$", "$-4$"], correct_index: 0, explanation: "$12 + 8 = 20$.", difficulty: 1.0 },
      { question: "Số nguyên x nhỏ nhất thỏa mãn $x > -3,5$ là:", options: ["$-3$", "$-4$", "$-2$", "$0$"], correct_index: 0, explanation: "Số nguyên lớn hơn -3,5 lần lượt là -3, -2, -1... Số nguyên nhỏ nhất trong đó là -3.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Mỗi số thực được biểu diễn trên trục số bởi:", options: ["Một điểm duy nhất", "Nhiều điểm", "Hai điểm đối nhau", "Không có điểm biểu diễn"], correct_index: 0, explanation: "Mỗi số thực được biểu diễn bởi duy nhất một điểm trên trục số thực.", difficulty: 1.0 },
      { question: "Chọn cách viết đúng về quan hệ bao hàm giữa các tập hợp số:", options: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$", "$\\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{R}$", "$\\mathbb{R} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{N}$", "$\\mathbb{Q} \\subset \\mathbb{I} \\subset \\mathbb{R}$"], correct_index: 0, explanation: "Mối quan hệ đúng là N con Z, Z con Q, Q con R.", difficulty: 1.0 },
      { question: "So sánh hai số thực: $-2,678$ và $-2,6(7)$", options: ["$-2,678 < -2,6(7)$", "$-2,678 > -2,6(7)$", "$-2,678 = -2,6(7)$", "Không so sánh được"], correct_index: 0, explanation: "$-2,6(7) = -2,6777...$ Vì $-2,6780 < -2,6777$, nên $-2,678 < -2,6(7)$.", difficulty: 1.5 },
      { question: "Tìm số đối của số thực $\\sqrt{3}$:", options: ["$-\\sqrt{3}$", "$\\sqrt{3}$", "$3$", "$-3$"], correct_index: 0, explanation: "Số đối của $\\sqrt{3}$ là $-\\sqrt{3}$.", difficulty: 1.0 },
      { question: "Giá trị tuyệt đối của số thực $x$ được kí hiệu là $|x|$ biểu thị:", options: ["Khoảng cách từ điểm x đến điểm 0 trên trục số", "Giá trị bình phương của x", "Số đối của x", "Số nghịch đảo của x"], correct_index: 0, explanation: "Định nghĩa hình học của giá trị tuyệt đối là khoảng cách từ điểm x đến gốc 0 trên trục số.", difficulty: 1.0 },
      { question: "Tính giá trị của biểu thức: $B = |-10,2| - |-2,8|$", options: ["$7,4$", "$13$", "$-7,4$", "$-13$"], correct_index: 0, explanation: "$10,2 - 2,8 = 7,4$.", difficulty: 1.2 },
      { question: "Tính biểu thức: $C = |-3| \\cdot |-2,5| + |4|$", options: ["$11,5$", "$10,5$", "$-3,5$", "$14,5$"], correct_index: 0, explanation: "$3 \\cdot 2,5 + 4 = 7,5 + 4 = 11,5$.", difficulty: 1.5 },
      { question: "So sánh số thực dương $\\sqrt{5}$ và $2,36$:", options: ["$\\sqrt{5} < 2,36$", "$\\sqrt{5} > 2,36$", "$\\sqrt{5} = 2,36$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $2,36^2 = 5,5696 > 5 \\Rightarrow 2,36 > \\sqrt{5}$.", difficulty: 1.2 },
      { question: "Tìm tập hợp các số nguyên x thỏa mãn $|x| \\le 1$:", options: ["$\\{-1; 0; 1\\}$", "$\\{0; 1\\}$", "$\\{-1; 1\\}$", "$\\{x \\in \\mathbb{R} \\mid -1 \\le x \\le 1\\}$"], correct_index: 0, explanation: "$|x| \\le 1 \\Rightarrow -1 \\le x \\le 1$. Các số nguyên thỏa mãn là -1, 0, 1.", difficulty: 1.5 },
      { question: "Tìm khẳng định SAI trong các khẳng định dưới đây:", options: ["Tập hợp số thực không chứa số vô tỉ", "Mỗi số thực đều được biểu diễn trên trục số", "Số đối của số thực dương là một số thực âm", "Giá trị tuyệt đối của một số thực luôn không âm"], correct_index: 0, explanation: "Tập hợp số thực R bao gồm cả số hữu tỉ Q và số vô tỉ I.", difficulty: 1.0 }
    ]
  },
  {
    title: "Đề luyện tập số 3: Tập hợp các số thực",
    questions: [
      // 10 Prerequisite questions
      { question: "Ký hiệu tập hợp số tự nhiên là:", options: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{Q}$", "$\\mathbb{R}$"], correct_index: 0, explanation: "Tập số tự nhiên ký hiệu là N.", difficulty: 1.0 },
      { question: "Tính kết quả: $|-3| \\cdot |-8|$", options: ["$24$", "$-24$", "$11$", "$-11$"], correct_index: 0, explanation: "$3 \\cdot 8 = 24$.", difficulty: 1.0 },
      { question: "Tìm số đối của số hữu tỉ $\\frac{-3}{4}$:", options: ["$\\frac{3}{4}$", "$-\\frac{3}{4}$", "$-0,75$", "$\\frac{4}{3}$"], correct_index: 0, explanation: "Số đối của $-\\frac{3}{4}$ là $\\frac{3}{4}$.", difficulty: 1.0 },
      { question: "Tìm x biết: $|x| = 0$:", options: ["$0$", "$1$", "$-1$", "Không có giá trị x"], correct_index: 0, explanation: "Chỉ có $|0| = 0$.", difficulty: 1.0 },
      { question: "So sánh: $-0,5$ và $-\\frac{1}{2}$", options: ["$-0,5 = -\\frac{1}{2}$", "$-0,5 > -\\frac{1}{2}$", "$-0,5 < -\\frac{1}{2}$", "Không so sánh được"], correct_index: 0, explanation: "$-\\frac{1}{2} = -0,5$, chúng bằng nhau.", difficulty: 1.0 },
      { question: "Tính: $|-4,5| - 2$", options: ["$2,5$", "$-6,5$", "$-2,5$", "$6,5$"], correct_index: 0, explanation: "$4,5 - 2 = 2,5$.", difficulty: 1.0 },
      { question: "Tính: $0,25 \\cdot |-8|$", options: ["$2$", "$-2$", "$0,2$", "$0,02$"], correct_index: 0, explanation: "$0,25 \\cdot 8 = 2$.", difficulty: 1.0 },
      { question: "Số nào dưới đây không phải là số hữu tỉ?", options: ["Số $\\pi$", "$0,1212...$", "$0,75$", "$-4$"], correct_index: 0, explanation: "$\\pi$ là số vô tỉ.", difficulty: 1.0 },
      { question: "Tìm số đối của số đối của $-3$:", options: ["$-3$", "$3$", "$0$", "$1$"], correct_index: 0, explanation: "Số đối của -3 là 3, số đối của 3 là -3.", difficulty: 1.2 },
      { question: "Tìm số nguyên x lớn nhất thỏa mãn $x < -1,5$:", options: ["$-2$", "$-1$", "$-3$", "$0$"], correct_index: 0, explanation: "Các số nguyên nhỏ hơn -1,5 lần lượt là -2, -3... Số lớn nhất là -2.", difficulty: 1.2 },
      // 10 New lesson-specific questions
      { question: "Với 2 số thực a, b bất kỳ, khẳng định nào dưới đây đúng?", options: ["Hoặc a = b, hoặc a < b, hoặc a > b", "Luôn có a < b", "Luôn có a > b", "Không thể so sánh được"], correct_index: 0, explanation: "Đây là tính chất so sánh của 2 số thực bất kỳ.", difficulty: 1.0 },
      { question: "Khẳng định nào dưới đây đúng về tập hợp số vô tỉ $\\mathbb{I}$?", options: ["$\\mathbb{I} \\subset \\mathbb{R}$", "$\\mathbb{I} \\subset \\mathbb{Q}$", "$\\mathbb{R} \\subset \\mathbb{I}$", "$\\mathbb{I} = \\mathbb{R}$"], correct_index: 0, explanation: "Tập hợp các số vô tỉ I là tập con của tập số thực R.", difficulty: 1.0 },
      { question: "So sánh hai số thực âm sau: $-0,3131...$ và $-0,32$", options: ["$-0,3131... > -0,32$", "$-0,3131... < -0,32$", "$-0,3131... = -0,32$", "Không so sánh được"], correct_index: 0, explanation: "Vì $0,3131... < 0,32$ nên khi có dấu âm: $-0,3131... > -0,32$.", difficulty: 1.5 },
      { question: "Tìm số đối của $-\\sqrt{3}$:", options: ["$\\sqrt{3}$", "$-\\sqrt{3}$", "$3$", "$-3$"], correct_index: 0, explanation: "Số đối của $-\\sqrt{3}$ là $\\sqrt{3}$.", difficulty: 1.0 },
      { question: "Tính giá trị biểu thức: $M = |-\\sqrt{9}| - |-3|$", options: ["$0$", "$6$", "$-6$", "$3$"], correct_index: 0, explanation: "$|-\\sqrt{9}| = \\sqrt{9} = 3$, $|-3| = 3$. Hiệu $3 - 3 = 0$.", difficulty: 1.5 },
      { question: "Chọn kí hiệu thích hợp điền vào chỗ trống: $-3 \\square \\mathbb{Q}$", options: ["$\\in$", "$\\notin$", "$\\subset$", "$\\supset$"], correct_index: 0, explanation: "$-3$ là số nguyên nên cũng là số hữu tỉ.", difficulty: 1.0 },
      { question: "Chọn kí hiệu thích hợp điền vào chỗ trống: $\\mathbb{Q} \\square \\mathbb{R}$", options: ["$\\subset$", "$\\in$", "$\\notin$", "$\\supset$"], correct_index: 0, explanation: "Tập số hữu tỉ Q là con của tập số thực R.", difficulty: 1.0 },
      { question: "Tính giá trị biểu thức: $N = |\\sqrt{16}| + |-4|$", options: ["$8$", "$0$", "$16$", "$2$"], correct_index: 0, explanation: "$\\sqrt{16} = 4$, $|-4| = 4$. Tổng $4 + 4 = 8$.", difficulty: 1.2 },
      { question: "Tìm x biết: $|x| = \\sqrt{5}$", options: ["$\\pm \\sqrt{5}$", "$\\sqrt{5}$", "$-\\sqrt{5}$", "$5$"], correct_index: 0, explanation: "Giá trị tuyệt đối bằng $\\sqrt{5}$ có hai nghiệm là $\\sqrt{5}$ và $-\\sqrt{5}$.", difficulty: 1.2 },
      { question: "Chọn khẳng định SAI:", options: ["Điểm biểu diễn số thực $\\sqrt{2}$ trùng với điểm biểu diễn số thực $-\\sqrt{2}$ trên trục số", "Trục số thực biểu diễn đầy đủ tất cả các số thực", "Giá trị tuyệt đối của số thực dương bằng chính nó", "Số 0 là số đối của chính nó"], correct_index: 0, explanation: "Điểm biểu diễn $\\sqrt{2}$ và $-\\sqrt{2}$ nằm ở hai phía đối xứng nhau qua điểm 0 nên không thể trùng nhau.", difficulty: 1.2 }
    ]
  },
  {
    title: "Đề luyện tập số 4: Tập hợp các số thực",
    questions: [
      // 10 Prerequisite questions
      { question: "Tính giá trị: $|-8| : |2|$", options: ["$4$", "$-4$", "$16$", "$0,25$"], correct_index: 0, explanation: "$8 : 2 = 4$.", difficulty: 1.0 },
      { question: "Số đối của số $0$ là:", options: ["$0$", "$1$", "$-1$", "Không có số đối"], correct_index: 0, explanation: "Số 0 là số đối của chính nó.", difficulty: 1.0 },
      { question: "Tìm x biết $|x| = 1$:", options: ["$\\pm 1$", "$1$", "$-1$", "$0$"], correct_index: 0, explanation: "$x = 1$ hoặc $x = -1$.", difficulty: 1.0 },
      { question: "Sắp xếp các số sau theo thứ tự tăng dần: $-1,5; -2; 0; 0,5$", options: ["$-2 < -1,5 < 0 < 0,5$", "$-1,5 < -2 < 0 < 0,5$", "$0,5 < 0 < -1,5 < -2$", "$-2 < -1,5 < 0,5 < 0$"], correct_index: 0, explanation: "$-2 < -1,5 < 0 < 0,5$.", difficulty: 1.0 },
      { question: "Tính kết quả: $|-3,6| + |-1,4|$", options: ["$5$", "$2,2$", "$5,2$", "$-5$"], correct_index: 0, explanation: "$3,6 + 1,4 = 5$.", difficulty: 1.0 },
      { question: "So sánh hai phân số âm: $-\\frac{3}{4}$ và $-\\frac{1}{2}$", options: ["$-\\frac{3}{4} < -\\frac{1}{2}$", "$-\\frac{3}{4} > -\\frac{1}{2}$", "$-\\frac{3}{4} = -\\frac{1}{2}$", "Không so sánh được"], correct_index: 0, explanation: "$0,75 > 0,5 \\Rightarrow -0,75 < -0,5$.", difficulty: 1.2 },
      { question: "Số nào dưới đây là số hữu tỉ dương?", options: ["$0,08(3)$", "$-4$", "$0$", "$-\\sqrt{2}$"], correct_index: 0, explanation: "$0,08(3) = \\frac{1}{12} > 0$ là số hữu tỉ dương.", difficulty: 1.2 },
      { question: "Tính: $|-15| - 5 \\cdot 2$", options: ["$5$", "$20$", "$10$", "$0$"], correct_index: 0, explanation: "$15 - 10 = 5$.", difficulty: 1.0 },
      { question: "Tìm số nguyên x lớn nhất thỏa mãn $x < 0$:", options: ["$-1$", "$-2$", "$0$", "$1$"], correct_index: 0, explanation: "Số nguyên âm lớn nhất là -1.", difficulty: 1.0 },
      { question: "Chọn khẳng định ĐÚNG:", options: ["Bất kỳ số thực nào cũng là số hữu tỉ hoặc số vô tỉ", "Số vô tỉ không thể âm", "Giá trị tuyệt đối của một số âm là số âm", "Số đối của số thực âm là số âm"], correct_index: 0, explanation: "Tập số thực R được chia thành 2 nhóm là số hữu tỉ Q và số vô tỉ I.", difficulty: 1.0 },
      // 10 New lesson-specific questions
      { question: "Chọn kí hiệu thích hợp: $\\mathbb{I} \\square \\mathbb{R}$", options: ["$\\subset$", "$\\in$", "$\\notin$", "$\\supset$"], correct_index: 0, explanation: "Tập hợp các số vô tỉ I là tập con của tập số thực R.", difficulty: 1.0 },
      { question: "Chọn khẳng định SAI về quan hệ tập hợp:", options: ["$\\mathbb{R} \\subset \\mathbb{Q}$", "$\\mathbb{N} \\subset \\mathbb{R}$", "$\\mathbb{Z} \\subset \\mathbb{R}$", "$\\mathbb{Q} \\subset \\mathbb{R}$"], correct_index: 0, explanation: "Q là tập con của R, chứ R không phải tập con của Q.", difficulty: 1.2 },
      { question: "So sánh hai số thực: $\\sqrt{2}$ và $1,41$", options: ["$\\sqrt{2} > 1,41$", "$\\sqrt{2} < 1,41$", "$\\sqrt{2} = 1,41$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $\\sqrt{2} \\approx 1,4142... > 1,4100$.", difficulty: 1.2 },
      { question: "So sánh hai số thực: $-\\sqrt{5}$ và $-2,236$", options: ["$-\\sqrt{5} < -2,236$", "$-\\sqrt{5} > -2,236$", "$-\\sqrt{5} = -2,236$", "Không so sánh được"], correct_index: 0, explanation: "Ta có $\\sqrt{5} \\approx 2,236067... > 2,236 \\Rightarrow -\\sqrt{5} < -2,236$.", difficulty: 1.5 },
      { question: "Tìm số đối của số thực $-\\sqrt{7}$:", options: ["$\\sqrt{7}$", "$-\\sqrt{7}$", "$7$", "$-7$"], correct_index: 0, explanation: "Số đối của $-\\sqrt{7}$ là $\\sqrt{7}$.", difficulty: 1.0 },
      { question: "Tính giá trị tuyệt đối: $|-\\sqrt{11}|$", options: ["$\\sqrt{11}$", "$-\\sqrt{11}$", "$11$", "$-11$"], correct_index: 0, explanation: "Giá trị tuyệt đối của số thực âm $-\\sqrt{11}$ là $\\sqrt{11}$.", difficulty: 1.0 },
      { question: "Tính giá trị của biểu thức: $D = |-3| \\cdot |-\\sqrt{4}| + 2$", options: ["$8$", "$14$", "$6$", "$-4$"], correct_index: 0, explanation: "$3 \\cdot \\sqrt{4} + 2 = 3 \\cdot 2 + 2 = 8$.", difficulty: 1.5 },
      { question: "Cho tập hợp $A = \\{x \\mid x \\in \\mathbb{R}, |x| \\le 2\\}$. Các số nguyên thuộc tập hợp A là:", options: ["$-2; -1; 0; 1; 2$", "$-1; 0; 1$", "$1; 2$", "$-2; -1; 1; 2$"], correct_index: 0, explanation: "$|x| \\le 2 \\Rightarrow -2 \\le x \\le 2$. Các số nguyên là -2, -1, 0, 1, 2.", difficulty: 1.2 },
      { question: "Tìm x biết: $|x| - \\sqrt{9} = 0$", options: ["$\\pm 3$", "$3$", "$-3$", "$9$"], correct_index: 0, explanation: "$|x| = \\sqrt{9} = 3 \\Rightarrow x = \\pm 3$.", difficulty: 1.5 },
      { question: "Mỗi số thực được biểu diễn trên trục số thực bởi:", options: ["Một điểm duy nhất", "Nhiều điểm khác nhau", "Hai điểm đối xứng", "Một đoạn thẳng"], correct_index: 0, explanation: "Mỗi số thực được biểu diễn bởi một điểm duy nhất trên trục số.", difficulty: 1.0 }
    ]
  }
];

async function seed() {
  console.log("🚀 Starting Chapter 2 assessments seeding...");

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

  // 2. Ensure curriculum_units has Grade 7 Unit 2 entry
  console.log("Ensuring curriculum_units entry for Chapter 2...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 7)
    .eq('unit_number', 2)
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
        title: 'Chương 2: Số thực',
        unit_number: 2,
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

  // 3. Ensure assessment_collections has Grade 7 Unit 2 entry
  console.log("Ensuring assessment_collections entry for Unit 2...");
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 7)
    .eq('volume', 1)
    .contains('units', [2])
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    const { data: newCol, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: 'Toán 7 - Tập 1', // Will trigger auto-title to formatted name
        subject_slug: 'toan',
        grade: 7,
        volume: 1,
        units: [2],
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
      slug: 'bai-5-so-thap-phan-vo-han-tuan-hoan',
      conceptSlug: 'concept-bai-5-so-thap-phan-vo-han-tuan-hoan',
      data: BAI_5_EXAMS
    },
    {
      slug: 'bai-6-so-vo-ti-can-bac-hai-so-hoc',
      conceptSlug: 'concept-bai-6-so-vo-ti-can-bac-hai-so-hoc',
      data: BAI_6_EXAMS
    },
    {
      slug: 'bai-7-tap-hop-cac-so-thuc',
      conceptSlug: 'concept-bai-7-tap-hop-cac-so-thuc',
      data: BAI_7_EXAMS
    }
  ];

  for (const lessonMapping of LESSON_MAPPINGS) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing lesson: ${lessonMapping.slug}`);

    // Fetch the lesson node to retrieve its ID
    const { data: lessonNode } = await supabase
      .from('curriculum_nodes')
      .select('id')
      .eq('slug', lessonMapping.slug)
      .single();

    if (!lessonNode) {
      console.error(`❌ Lesson node with slug '${lessonMapping.slug}' not found! Skipping.`);
      continue;
    }

    // Fetch the concept ID associated with the concept slug
    const { data: concept } = await supabase
      .from('concepts')
      .select('id')
      .eq('slug', lessonMapping.conceptSlug)
      .single();

    if (!concept) {
      console.error(`❌ Concept with slug '${lessonMapping.conceptSlug}' not found! Skipping.`);
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

      // Insert and link questions
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

  console.log("\n🎉 Chapter 2 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
